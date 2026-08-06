import React, { useEffect, useRef, useState } from 'react';
import { Beat } from '../types';
import { useStore } from '../context/StoreContext';
import { Trash2 } from 'lucide-react';

interface PermanentPlayerCardProps {
  beat: Beat;
}

export default function PermanentPlayerCard({ beat }: PermanentPlayerCardProps) {
  const { removeBeat } = useStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const isAdmin = localStorage.getItem('KRYPSIDE_ADMIN_AUTH') === 'true';
  
  // Persistence Key
  const storageKey = `deleted_beat_${beat.id}`;
  
  // State for local hide and animation
  const [isDeleted, setIsDeleted] = useState(() => localStorage.getItem(storageKey) === 'true');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isDeleted) return;

    const audio = audioRef.current;
    if (!audio) return;

    // 1. Lock in Volume Persistence
    const savedVolume = localStorage.getItem('krypside_audio_volume');
    if (savedVolume !== null) {
      audio.volume = parseFloat(savedVolume);
    }

    // 2. Lock in Playback Progress Memory
    const savedTime = localStorage.getItem('krypside_audio_time');
    if (savedTime !== null) {
      const time = parseFloat(savedTime);
      if (time > 0) {
        audio.currentTime = time;
      }
    }
  }, [beat.id, isDeleted]);

  const handleVolumeChange = () => {
    if (audioRef.current) {
      localStorage.setItem('krypside_audio_volume', audioRef.current.volume.toString());
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.currentTime > 0) {
      localStorage.setItem('krypside_audio_time', audioRef.current.currentTime.toString());
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="%2364748b" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>';
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this permanent track?')) {
      // 1. Pause audio immediately
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // 2. Trigger fade out animation
      setIsFadingOut(true);

      // 3. Persist deletion state in browser storage
      localStorage.setItem(storageKey, 'true');

      // 4. Remove element after animation duration
      setTimeout(async () => {
        setIsDeleted(true);
        // Also perform global cleanup if needed
        await removeBeat(beat.id);
      }, 300);
    }
  };

  if (isDeleted) return null;

  return (
    <div 
      className={`krypside-hardcoded-player bg-[#090d16] border border-[#1e293b] rounded-[14px] p-4 w-full max-w-[400px] flex items-center gap-4 shadow-[0_8px_24px_rgba(0,0,0,0.6)] mx-auto relative group transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Hardcoded Permanent Artwork */}
      <img 
        src={beat.coverArtUrl || 'https://via.placeholder.com/400'} 
        alt="Krypside Beat Artwork" 
        className="player-art w-[90px] h-[90px] object-cover rounded-lg flex-shrink-0 border border-white/10"
        onError={handleImageError}
      />
      
      <div className="player-content flex flex-col gap-[10px] w-full min-w-0">
        <div className="player-header flex items-start justify-between gap-2">
          <div className="track-meta flex flex-col gap-[2px] min-w-0">
            <span className="artist-tag text-[0.75rem] text-[#38bdf8] font-semibold uppercase tracking-wider truncate">
              {beat.producer || 'Krypside'}
            </span>
            <h3 className="track-title m-0 text-[1rem] text-[#f8fafc] font-medium truncate">
              {beat.title}
            </h3>
          </div>

          {isAdmin && (
            <button 
              onClick={handleDelete}
              className="delete-beat-btn p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              title="Delete Beat"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>

        {/* Hardcoded Permanent Audio Element with Preload */}
        <audio 
          ref={audioRef}
          controls 
          preload="auto" 
          className="native-audio-player w-full h-[36px]"
          onVolumeChange={handleVolumeChange}
          onTimeUpdate={handleTimeUpdate}
          src={beat.audioUrl}
        >
          <source src={beat.audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}
