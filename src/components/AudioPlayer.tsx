import React, { useMemo, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Download, 
  Share2, 
  MessageSquare, 
  ChevronUp, 
  ChevronDown, 
  ShoppingCart,
  Clock,
  Send,
  X
} from 'lucide-react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { useStore } from '../context/StoreContext';
import ShareModal from './ShareModal';
import CheckoutModal from './CheckoutModal';
import CheckoutErrorBoundary from './CheckoutErrorBoundary';
import { downloadAudioFile } from '../lib/beatUtils';
import { krypsideMasterAudio } from '../lib/krypsideMasterAudio';
import { Beat } from '../types';

export default function AudioPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    currentTime, 
    duration, 
    togglePlay, 
    seek,
    playTrack
  } = useAudioPlayer();

  const { state, updateBeat, incrementAnalytics } = useStore();

  const [showShareModal, setShowShareModal] = useState(false);
  const [checkoutBeat, setCheckoutBeat] = useState<Beat | null>(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<{ name: string; text: string; time: string }[]>([]);
  const [countdownTime, setCountdownTime] = useState('00h : 00m : 00s');
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolumeState] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);

  // Load comments keyed by track ID
  useEffect(() => {
    if (currentTrack?.id) {
      try {
        const saved = localStorage.getItem(`KRYPSIDE_COMMENTS_${currentTrack.id}`);
        setComments(saved ? JSON.parse(saved) : []);
      } catch (err) {
        console.warn('Failed to parse saved comments:', err);
        setComments([]);
      }
      setCommentText('');
    }
  }, [currentTrack?.id]);

  // Flash sale countdown timer logic
  useEffect(() => {
    if (!currentTrack || !currentTrack.flashSaleEnabled) {
      setIsTimerExpired(true);
      return;
    }

    let targetTime: number;
    if (currentTrack.couponExpirationMode === 'date' && currentTrack.couponExpirationDate) {
      targetTime = new Date(currentTrack.couponExpirationDate).getTime();
    } else {
      const hours = Number(currentTrack.couponExpirationHours) || 12;
      const storageKey = `KRYPSIDE_COUPON_EXP_TIME_${currentTrack.id}`;
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        targetTime = Number(cached);
      } else {
        targetTime = Date.now() + hours * 3600 * 1000;
        localStorage.setItem(storageKey, targetTime.toString());
      }
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setIsTimerExpired(true);
        setCountdownTime('00h : 00m : 00s');
      } else {
        setIsTimerExpired(false);
        const totalSecs = Math.floor(diff / 1000);
        const hrs = Math.floor(totalSecs / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const secs = totalSecs % 60;
        setCountdownTime(`${hrs.toString().padStart(2, '0')}h : ${mins.toString().padStart(2, '0')}m : ${secs.toString().padStart(2, '0')}s`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [currentTrack?.id, currentTrack?.flashSaleEnabled, currentTrack?.couponExpirationMode, currentTrack?.couponExpirationDate, currentTrack?.couponExpirationHours]);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = useMemo(() => {
    if (!duration) return 0;
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    if (duration && width > 0) {
      seek((clickX / width) * duration);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolumeState(newVol);
    setIsMuted(newVol === 0);
    krypsideMasterAudio.setVolume(newVol);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    krypsideMasterAudio.setMuted(nextMuted);
  };

  const handlePrevTrack = () => {
    if (!state.beats || state.beats.length === 0 || !currentTrack) return;
    const currentIndex = state.beats.findIndex(b => b.id === currentTrack.id);
    if (currentIndex > 0) {
      playTrack(state.beats[currentIndex - 1]);
    } else {
      playTrack(state.beats[state.beats.length - 1]);
    }
  };

  const handleNextTrack = () => {
    if (!state.beats || state.beats.length === 0 || !currentTrack) return;
    const currentIndex = state.beats.findIndex(b => b.id === currentTrack.id);
    if (currentIndex >= 0 && currentIndex < state.beats.length - 1) {
      playTrack(state.beats[currentIndex + 1]);
    } else {
      playTrack(state.beats[0]);
    }
  };

  const handleDownload = () => {
    if (currentTrack && (currentTrack.audioUrl || currentTrack.watermarkedAudioUrl)) {
      updateBeat(currentTrack.id, { downloads: (currentTrack.downloads || 0) + 1 });
      incrementAnalytics('downloads');
      downloadAudioFile(currentTrack.audioUrl || currentTrack.watermarkedAudioUrl, currentTrack.title);
    }
  };

  const handlePurchaseSuccess = (beat: Beat) => {
    updateBeat(beat.id, { purchases: (beat.purchases || 0) + 1, earnings: (beat.earnings || 0) + beat.price });
    incrementAnalytics('totalEarnings', beat.price);
    incrementAnalytics('platformFees', beat.price * 0.25);
    if (beat.audioUrl) {
      downloadAudioFile(beat.audioUrl, beat.title);
    }
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !currentTrack) return;

    const subscriberName = localStorage.getItem('KRYPSIDE_SUBSCRIBER_NAME') || 'Anonymous Artist';
    const newComment = {
      name: subscriberName,
      text: commentText.substring(0, 240).trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    try {
      localStorage.setItem(`KRYPSIDE_COMMENTS_${currentTrack.id}`, JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to store comment locally:', err);
    }
    setCommentText('');
  };

  if (!currentTrack) return null;

  const uploadDate = currentTrack.releaseDate ? new Date(currentTrack.releaseDate) : new Date();
  const formattedDate = uploadDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const displayTags = currentTrack.tags && currentTrack.tags.length > 0 ? currentTrack.tags.slice(0, 4) : ['beat', 'instrumental', 'music'];

  return (
    <div className="docked-player-wrapper text-white font-sans select-none">
      
      {/* Collapsible Details Drawer above the music bar */}
      {isExpanded && (
        <div className="bg-[#0c0c0f]/98 backdrop-blur-xl border-t border-neutral-800 p-4 md:p-6 shadow-2xl max-h-[65vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            
            {/* Header / Track Info */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <img 
                  src={currentTrack.coverArtUrl || 'https://via.placeholder.com/150?text=Cover'} 
                  alt={currentTrack.title}
                  className="w-14 h-14 rounded-lg object-cover border border-neutral-800 shadow-md"
                />
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {currentTrack.title}
                    {currentTrack.bpm > 0 && <span className="text-xs bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full font-mono">🎹 {currentTrack.bpm} BPM</span>}
                    {currentTrack.key && currentTrack.key !== 'N/A' && <span className="text-xs bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full font-mono">🎵 {currentTrack.key}</span>}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Produced by <span className="text-purple-400 font-semibold">{currentTrack.producer || 'KRYPSIDE'}</span> • Released {formattedDate}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setIsExpanded(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Flash Sale Banner if enabled */}
            {currentTrack.flashSaleEnabled && !isTimerExpired && (
              <div className="bg-gradient-to-r from-purple-950/80 via-neutral-900 to-red-950/80 border border-purple-500/40 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-purple-600/30 rounded-lg text-purple-400">⚡</span>
                  <div>
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">Flash Sale Coupon Active</span>
                    <span className="text-sm font-mono font-bold text-white">CODE: {currentTrack.couponCode || 'SOUTHSIDE50'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-lg border border-neutral-800">
                  <Clock size={14} className="text-red-400" />
                  <span className="text-xs text-neutral-400">Ends in:</span>
                  <span className="text-xs font-bold font-mono text-red-400">{countdownTime}</span>
                </div>
              </div>
            )}

            {/* Tags & Metadata */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-neutral-500 font-medium">Tags:</span>
              {displayTags.map((tag, idx) => (
                <span key={idx} className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs px-2.5 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Rapper Chatroom / Comments Section */}
            <div className="flex flex-col gap-3 bg-neutral-900/50 border border-neutral-800/80 rounded-xl p-4">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                <MessageSquare size={14} className="text-purple-400" />
                Artist Chatroom Comments ({comments.length})
              </h4>

              <form onSubmit={handleSendComment} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Leave a comment or feedback on this track..." 
                  maxLength={240}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 placeholder-neutral-500"
                />
                <button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Send size={12} />
                  Send
                </button>
              </form>

              {comments.length > 0 ? (
                <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1 mt-1">
                  {comments.map((c, idx) => (
                    <div key={idx} className="bg-neutral-950 border border-neutral-800/60 p-2.5 rounded-lg flex justify-between items-start gap-2">
                      <div>
                        <span className="text-xs font-bold text-purple-400">{c.name}</span>
                        <p className="text-xs text-neutral-200 mt-0.5 leading-relaxed">{c.text}</p>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono shrink-0">{c.time}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-500 italic">No comments yet. Be the first to leave feedback on this beat!</p>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Permanently Sticky Bottom-Docked Music Bar */}
      <div className="bg-[#0a0a0c]/95 backdrop-blur-xl border-t border-neutral-800/80 shadow-[0_-8px_30px_rgba(0,0,0,0.8)] relative">
        
        {/* Interactive Top Border Timeline Scrubber */}
        <div 
          className="w-full bg-neutral-800/80 h-1.5 hover:h-2.5 transition-all cursor-pointer relative group"
          onClick={handleTimelineClick}
          title="Click or drag to seek"
        >
          <div 
            className="bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400 h-full relative transition-all"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Music Bar Control Grid */}
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3 md:gap-6">
          
          {/* LEFT: Artwork & Track Metadata */}
          <div className="flex items-center gap-3 min-w-0 max-w-[32%] sm:max-w-[35%]">
            <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-lg overflow-hidden bg-neutral-900 shrink-0 border border-neutral-800 group">
              <img 
                src={currentTrack.coverArtUrl || 'https://via.placeholder.com/150?text=Beat'} 
                alt={currentTrack.title} 
                className="w-full h-full object-cover"
              />
              {currentTrack.flashSaleEnabled && !isTimerExpired && (
                <div className="absolute top-0 right-0 bg-red-600 text-[8px] font-black px-1 text-white rounded-bl shadow">
                  SALE
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <h4 className="text-xs md:text-sm font-bold text-white truncate hover:text-purple-400 transition-colors">
                {currentTrack.title}
              </h4>
              <div className="flex items-center gap-2 text-[11px] text-neutral-400 truncate mt-0.5">
                <span className="font-semibold text-neutral-300 truncate">{currentTrack.producer || 'KRYPSIDE'}</span>
                {currentTrack.bpm > 0 && <span className="hidden sm:inline-block px-1.5 py-0.2 bg-neutral-900 border border-neutral-800 rounded text-[10px] text-neutral-400 font-mono">🎹 {currentTrack.bpm}</span>}
              </div>
            </div>
          </div>

          {/* CENTER: Audio Playback Controls & Timeline Counter */}
          <div className="flex flex-col items-center justify-center gap-0.5 flex-1 max-w-md">
            <div className="flex items-center gap-3 md:gap-5">
              <button 
                onClick={handlePrevTrack} 
                className="text-neutral-400 hover:text-white transition-colors p-1"
                title="Previous Track"
              >
                <SkipBack size={18} />
              </button>

              <button 
                onClick={togglePlay} 
                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all shrink-0"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause size={19} fill="currentColor" />
                ) : (
                  <Play size={19} fill="currentColor" className="ml-0.5" />
                )}
              </button>

              <button 
                onClick={handleNextTrack} 
                className="text-neutral-400 hover:text-white transition-colors p-1"
                title="Next Track"
              >
                <SkipForward size={18} />
              </button>
            </div>

            {/* Duration Display */}
            <div className="text-[10px] md:text-[11px] font-mono text-neutral-400 flex items-center gap-1">
              <span>{formatTime(currentTime)}</span>
              <span className="text-neutral-600">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* RIGHT: Price/Buy, Actions & Volume */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            
            {/* Price / Purchase Button */}
            {currentTrack.flashSaleEnabled && !isTimerExpired ? (
              <div className="flex items-center gap-1.5 bg-neutral-900/90 border border-neutral-800 p-1 pl-2 rounded-lg">
                <span className="line-through text-neutral-500 text-[10px] hidden sm:inline">
                  ${(Number(currentTrack.originalPrice) || (Number(currentTrack.price) / (1 - (Number(currentTrack.couponDiscountPercent) || 40) / 100))).toFixed(2)}
                </span>
                <button 
                  onClick={() => setCheckoutBeat(currentTrack)}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-2.5 py-1.5 rounded-md transition-all flex items-center gap-1 shadow-md shadow-purple-600/20"
                >
                  <ShoppingCart size={13} />
                  ${Number(currentTrack.price).toFixed(2)}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setCheckoutBeat(currentTrack)}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-2.5 md:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-md shadow-purple-600/20"
              >
                <ShoppingCart size={13} />
                <span>${(Number(currentTrack.originalPrice) || Number(currentTrack.price)).toFixed(2)}</span>
              </button>
            )}

            {/* Download Button */}
            <button 
              onClick={handleDownload}
              className="p-2 text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors hidden sm:flex items-center gap-1.5 text-xs font-semibold"
              title="Download Track"
            >
              <Download size={14} />
              <span className="hidden md:inline">Download</span>
            </button>

            {/* Share Button */}
            <button 
              onClick={() => setShowShareModal(true)}
              className="p-2 text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors hidden sm:flex items-center gap-1.5 text-xs font-semibold"
              title="Share Track"
            >
              <Share2 size={14} />
              <span className="hidden lg:inline">Share</span>
            </button>

            {/* Details & Comments Drawer Toggle */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-2 rounded-lg border transition-all flex items-center gap-1 text-xs font-semibold ${
                isExpanded 
                  ? 'bg-purple-600/20 border-purple-500/50 text-purple-300' 
                  : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white'
              }`}
              title="Toggle Track Details & Chat"
            >
              <MessageSquare size={14} />
              {comments.length > 0 && (
                <span className="bg-purple-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                  {comments.length}
                </span>
              )}
              {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>

            {/* Volume Control */}
            <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-neutral-800">
              <button 
                onClick={toggleMute} 
                className="text-neutral-400 hover:text-white transition-colors"
              >
                {isMuted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={isMuted ? 0 : volume} 
                onChange={handleVolumeChange}
                className="w-16 accent-purple-600 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

          </div>

        </div>
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)} 
        track={currentTrack} 
      />

      {/* Checkout Modal */}
      <CheckoutErrorBoundary>
        <CheckoutModal 
          beat={checkoutBeat} 
          onClose={() => setCheckoutBeat(null)} 
          onSuccess={handlePurchaseSuccess} 
        />
      </CheckoutErrorBoundary>

    </div>
  );
}
