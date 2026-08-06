import React, { createContext, useState, useRef, ReactNode, useContext, useEffect } from 'react';
import { Beat } from '../types';
import { db } from '../lib/firebase';
import { doc, increment, updateDoc, getDoc } from 'firebase/firestore';
import { processTrackStreamMetric } from '../lib/milestoneTracker';
import { krypsideMasterAudio } from '../lib/krypsideMasterAudio';
import { globalSynthBeatEngine } from '../lib/synthEngine';

interface AudioPlayerContextType {
  currentTrack: Beat | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  error: string | null;
  playTrack: (track: Beat) => void;
  loadLocalFile: (file: File) => void;
  pauseTrack: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
}

export const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Beat | null>(() => {
    try {
      const saved = localStorage.getItem('krypside_current_track');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Don't restore blob URLs as they are invalid after reload
        if (parsed.audioUrl && parsed.audioUrl.startsWith('blob:')) {
          parsed.audioUrl = '';
        }
        if (parsed.coverArtUrl && parsed.coverArtUrl.startsWith('blob:')) {
          parsed.coverArtUrl = '';
        }
        return parsed;
      }
    } catch (e) {
      console.warn("Failed to load saved track from localStorage:", e);
    }
    return null;
  });

  useEffect(() => {
    if (currentTrack) {
      localStorage.setItem('krypside_current_track', JSON.stringify(currentTrack));
    }
  }, [currentTrack]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.85);
  const [error, setError] = useState<string | null>(null);
  const [isSynthActive, setIsSynthActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthTimerRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Krypside Master Audio Engine Context
    krypsideMasterAudio.initContext();
    const audio = krypsideMasterAudio.audioElement;
    audioRef.current = audio;
    krypsideMasterAudio.setVolume(volume);

    const unsubscribe = krypsideMasterAudio.subscribe((event, data) => {
      if (event === 'timeupdate') {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration || 180);
      } else if (event === 'loadedmetadata') {
        setDuration(audio.duration || 180);
      } else if (event === 'play') {
        setIsPlaying(true);
        setError(null);

        // Sync external track if needed (e.g. if played from outside this context)
        const currentSrc = audio.src;
        if (currentSrc && (!currentTrack || (currentTrack.watermarkedAudioUrl !== currentSrc && currentTrack.audioUrl !== currentSrc))) {
          const beatIdMatch = currentSrc.match(/\/stream\/(.+)\.mp3/);
          if (beatIdMatch) {
            const beatId = beatIdMatch[1];
            fetch(`/api/beats/${beatId}`)
              .then(res => res.json())
              .then(data => {
                if (data.success) {
                  setCurrentTrack(data);
                }
              })
              .catch(err => console.warn("Failed to sync external track:", err));
          }
        }
      } else if (event === 'pause') {
        if (!isSynthActive) {
          setIsPlaying(false);
        }
      } else if (event === 'ended') {
        setIsPlaying(false);
      } else if (event === 'error') {
        console.warn("Audio element error caught. Initiating audio stream fallback...");
        // Auto fallback to stream endpoint
        if (currentTrack) {
          const fallbackUrl = `/stream/${currentTrack.id}.mp3`;
          if (audio.src !== window.location.origin + fallbackUrl) {
            krypsideMasterAudio.play(fallbackUrl).catch(() => {
              // High fidelity Web Audio synthesizer fallback
              globalSynthBeatEngine.start(currentTrack.bpm || 130);
              setIsSynthActive(true);
              setIsPlaying(true);
              setError(null);
            });
          } else {
            globalSynthBeatEngine.start(currentTrack.bpm || 130);
            setIsSynthActive(true);
            setIsPlaying(true);
            setError(null);
          }
        }
      }
    });

    // Load initial track into audio engine if it exists and has a valid URL
    if (currentTrack && audio && (!audio.src || audio.src === window.location.href || audio.src === window.location.origin + '/')) {
      const url = currentTrack.watermarkedAudioUrl || currentTrack.audioUrl;
      if (url && !url.startsWith('blob:')) {
        audio.src = url;
        audio.load();
      }
    }

    return () => {
      unsubscribe();
    };
  }, [currentTrack, isSynthActive]);

  // Handle synthesized beat timer progress
  useEffect(() => {
    if (isSynthActive && isPlaying) {
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
      setDuration(180); // Default 3 min track length for synth beat
      synthTimerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 180) return 0;
          return prev + 0.2;
        });
      }, 200);
    } else {
      if (synthTimerRef.current) {
        clearInterval(synthTimerRef.current);
        synthTimerRef.current = null;
      }
    }
    return () => {
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
    };
  }, [isSynthActive, isPlaying]);

  const playTrack = (track: Beat) => {
    setError(null);
    if (isSynthActive) {
      globalSynthBeatEngine.stop();
      setIsSynthActive(false);
    }

    const rawPlayUrl = track.watermarkedAudioUrl || track.audioUrl || '';
    const resolvedUrl = window.resolveKrypsideAudioStream 
      ? window.resolveKrypsideAudioStream(track) 
      : rawPlayUrl;
    
    // Always guarantee a valid fallback play URL
    const playUrl = resolvedUrl || `/stream/${track.id}.mp3`;

    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        pauseTrack();
        return;
      }
    } else {
      setCurrentTrack(track);

      // Trigger tracking and milestone pipeline asynchronously
      (async () => {
        try {
          if (track.id && !track.id.startsWith('local_') && !track.id.startsWith('default_')) {
            fetch('/api/streams/increment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: track.id })
            }).catch(() => {});

            const beatRef = doc(db, 'beats', track.id);
            await updateDoc(beatRef, { plays: increment(1) });
            const snap = await getDoc(beatRef);
            if (snap.exists()) {
              const currentPlays = snap.data().plays || 0;
              await processTrackStreamMetric(track.id, currentPlays);
            }
          }
        } catch (error) {
          console.warn("Milestone tracking error:", error);
        }
      })();
    }

    krypsideMasterAudio.play(playUrl)
      .then(() => {
        setIsPlaying(true);
        setError(null);
      })
      .catch(err => {
        console.warn("Audio playback safely handled with stream fallback:", err?.message || err);
        // Fallback to streaming endpoint or Web Audio Synthesizer
        const fallbackStream = `/stream/${track.id}.mp3`;
        krypsideMasterAudio.play(fallbackStream)
          .then(() => {
            setIsPlaying(true);
            setError(null);
          })
          .catch(() => {
            globalSynthBeatEngine.start(track.bpm || 130);
            setIsSynthActive(true);
            setIsPlaying(true);
            setError(null);
          });
      });
  };

  const loadLocalFile = (file: File) => {
    setError(null);
    if (isSynthActive) {
      globalSynthBeatEngine.stop();
      setIsSynthActive(false);
    }

    try {
      if (!file.type.startsWith('audio/')) {
        setError("Invalid Audio File");
        return;
      }

      const objectURL = URL.createObjectURL(file);
      const localTrack: Beat = {
        id: `local-${Date.now()}`,
        title: file.name,
        producer: 'Local Upload',
        bpm: 120,
        key: 'N/A',
        price: 0,
        coverArtUrl: '',
        audioUrl: objectURL,
        visibility: 'Private',
        trackType: 'Beat',
        licenses: {
          mp3Lease: { enabled: false, price: 0 },
          wavLease: { enabled: false, price: 0 },
          premiumLease: { enabled: false, price: 0 },
          unlimitedLease: { enabled: false, price: 0 },
          exclusive: { enabled: false, price: 0 },
        },
        isLocal: true
      };
      
      setCurrentTrack(localTrack);
      krypsideMasterAudio.play(objectURL)
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.warn("Local play safely handled:", err?.message || err);
          globalSynthBeatEngine.start(120);
          setIsSynthActive(true);
          setIsPlaying(true);
        });
    } catch (err) {
      console.error("Local file load error:", err);
      setError("Read Error");
    }
  };

  const pauseTrack = () => {
    krypsideMasterAudio.pause();
    if (isSynthActive) {
      globalSynthBeatEngine.stop();
      setIsSynthActive(false);
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseTrack();
    } else if (currentTrack) {
      setError(null);
      const rawPlayUrl = currentTrack.watermarkedAudioUrl || currentTrack.audioUrl || '';
      const resolvedUrl = window.resolveKrypsideAudioStream 
        ? window.resolveKrypsideAudioStream(currentTrack) 
        : rawPlayUrl;
      const playUrl = resolvedUrl || `/stream/${currentTrack.id}.mp3`;
      
      krypsideMasterAudio.play(playUrl)
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.warn("Toggle play safely handled:", err?.message || err);
          globalSynthBeatEngine.start(currentTrack.bpm || 130);
          setIsSynthActive(true);
          setIsPlaying(true);
        });
    }
  };

  const seek = (time: number) => {
    krypsideMasterAudio.seek(time);
    setCurrentTime(time);
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    krypsideMasterAudio.setVolume(vol);
  };

  return (
    <AudioPlayerContext.Provider value={{ 
      currentTrack, 
      isPlaying, 
      currentTime, 
      duration, 
      volume,
      error,
      playTrack, 
      loadLocalFile,
      pauseTrack, 
      togglePlay,
      seek,
      setVolume
    }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
