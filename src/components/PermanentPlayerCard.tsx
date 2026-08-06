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
  
  // Persistence Key matching requested logic
  const storageKey = `krypside_deleted_beat-${beat.id}`;
  
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
      const cardId = `beat-${beat.id}`;
      
      // 1. Reset and Pause audio immediately as per requested snippet
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // 2. Trigger fade out animation
      setIsFadingOut(true);

      // 3. Persist deletion state in browser storage using requested key format
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
      id={`beat-${beat.id}`}
      className={`krypside-beat-card bg-[#090d16] border border-[#1e293b] rounded-[14px] p-4 w-full max-w-[420px] flex items-center gap-4 shadow-[0_8px_24px_rgba(0,0,0,0.6)] mx-auto relative group transition-all duration-300 ${isFadingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
    >
      {/* Artwork Container with Discount Badge */}
      <div className="art-container relative w-[90px] h-[90px] flex-shrink-0">
        <img 
          src={beat.coverArtUrl || 'https://via.placeholder.com/400'} 
          alt="Krypside Beat Artwork" 
          className="player-art w-full h-full object-cover rounded-[8px] border border-white/8"
          onError={handleImageError}
        />
        {(beat.originalPrice && beat.originalPrice > beat.price) && (
          <span className="discount-badge absolute top-[-6px] left-[-6px] bg-[#38bdf8] text-[#090d16] text-[0.65rem] font-[800] px-[6px] py-[3px] rounded-[4px] uppercase tracking-[0.05em] shadow-[0_4px_12px_rgba(56,189,248,0.4)]">
            {Math.round(((beat.originalPrice - beat.price) / beat.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>
      
      <div className="player-content flex flex-col gap-[10px] w-full min-w-0">
        <div className="player-header flex items-start justify-between gap-2 w-full">
          <div className="track-meta flex flex-col gap-[2px] min-w-0">
            <span className="artist-tag text-[0.75rem] text-[#38bdf8] font-semibold uppercase tracking-[0.05em] truncate">
              {beat.producer || 'Krypside'}
            </span>
            <h3 className="track-title m-0 text-[1rem] text-[#f8fafc] font-medium truncate">
              {beat.title}
            </h3>
            <div className="price-container flex items-center gap-[8px] mt-[4px]">
              {beat.originalPrice && beat.originalPrice > beat.price && (
                <span className="old-price text-[#64748b] line-through text-[0.8rem]">
                  ${beat.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="new-price text-[#34d399] font-[700] text-[0.95rem]">
                ${beat.price.toFixed(2)}
              </span>
            </div>
          </div>

          {isAdmin && (
            <button 
              onClick={handleDelete}
              className="delete-beat-btn p-1 flex items-center justify-center text-[#64748b] hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded-lg transition-all cursor-pointer"
              title="Delete this beat"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>

        {/* Hardcoded Permanent Audio Element with Preload None */}
        <audio 
          ref={audioRef}
          controls 
          preload="none" 
          className="native-audio-player w-full h-[36px]"
          onVolumeChange={handleVolumeChange}
          onTimeUpdate={handleTimeUpdate}
        >
          {/* We use beat.audioUrl for the MP3 source, and fallback structure as requested */}
          <source src={beat.audioUrl} type="audio/mpeg" />
          {/* Fallback for wav if untaggedWavUrl existed, but using beat.audioUrl for mp3 is standard here */}
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}
