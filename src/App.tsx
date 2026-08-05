import React, { useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { AuthProvider } from './context/AuthContext';
import { AudioPlayerProvider } from './context/AudioPlayerContext';
import { AnalyticsTracker } from './components/AnalyticsTracker';
import Layout from './components/Layout';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Player from './pages/Player';
import Storefront from './pages/Storefront';
import Uploader from './pages/Uploader';
import Admin from './pages/Admin';
import AdminPortal from './pages/AdminPortal';
import EnterpriseMusicPlatform from './pages/Enterprise';

class GlobalErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("GLOBAL ERROR CAUGHT:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-indigo-500">Something went wrong.</h1>
          <p className="text-neutral-400 mb-8">The application encountered an unexpected error. We've been notified.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full font-bold transition-all"
          >
            Return to Safety
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export const KRYPSIDE_STREAM_VARIABLES = {
  previewAudio: '',
  musicAssets: ['/beats/123.m4a', '/beats/456.m4a']
};

export default function App() {
  const currentAudio = useRef<HTMLAudioElement | null>(null);
  const currentPlayBtn = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let visitorId = localStorage.getItem('KRYPSIDE_VISITOR_ID');
    if (!visitorId) {
      visitorId = `v_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem('KRYPSIDE_VISITOR_ID', visitorId);
    }
    let sessionId = sessionStorage.getItem('KRYPSIDE_SESSION_ID');
    if (!sessionId) {
      sessionId = `s_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      sessionStorage.setItem('KRYPSIDE_SESSION_ID', sessionId);
    }
    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId, sessionId })
    }).catch(err => console.error('Visit log error:', err));
  }, []);

  // Intercept all local link clicks and ensure they open in the same tab/container view
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Handle checkout button delegation
      if (target.matches('.checkout-btn')) {
        const beatId = (target as any).dataset.beatId;
        const price = (target as any).dataset.price;
        console.log('Triggering checkout for beat:', beatId, 'price:', price);
        window.dispatchEvent(new CustomEvent('trigger-checkout', { detail: { beatId, price } }));
      }

      // Handle play button delegation
      const playBtn = target.closest('.play-pause-btn');
      if (playBtn) {
        const card = target.closest('.beat-card') as HTMLElement;
        const audioUrl = card?.dataset.audioUrl;
        if (audioUrl) {
          // If there's already an active global audio instance playing another track
          if (currentAudio.current && currentAudio.current.src.includes(audioUrl)) {
            if (currentAudio.current.paused) {
              currentAudio.current.play().catch(err => console.warn('Audio play notice:', err));
              playBtn.classList.add('playing');
            } else {
              currentAudio.current.pause();
              playBtn.classList.remove('playing');
            }
          } else {
            // Stop previous audio if playing
            if (currentAudio.current) {
              currentAudio.current.pause();
              if (currentPlayBtn.current) currentPlayBtn.current.classList.remove('playing');
            }

            // Play new track
            currentAudio.current = new Audio(audioUrl);
            currentPlayBtn.current = playBtn as HTMLElement;
            
            currentAudio.current.play().catch(err => console.warn('Audio play notice:', err));
            playBtn.classList.add('playing');

            currentAudio.current.onended = () => {
              playBtn.classList.remove('playing');
            };
          }
        }
      }

      const link = target.closest('a');
      if (link) {
        if (link.hostname === window.location.hostname) {
          link.setAttribute('target', '_self');
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return (
    <GlobalErrorBoundary>
      <AuthProvider>
        <StoreProvider>
          <AnalyticsTracker />
          <AudioPlayerProvider>
            <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="videos" element={<Videos />} />
                <Route path="player" element={<Player />} />
                <Route path="player/:track" element={<Player />} />
                <Route path="audio-player" element={<Player />} />
                <Route path="audio-player/:track" element={<Player />} />
                <Route path="beat/:id" element={<Player />} />
                <Route path="beats/:id" element={<Player />} />
                <Route path="track/:id" element={<Player />} />
                <Route path="music/:id" element={<Player />} />
                <Route path="beats/:beatId" element={<Storefront />} />
                <Route path="storefront" element={<Storefront />} />
                <Route path="admin-portal" element={<AdminPortal />} />
                <Route path="upload" element={<Uploader />} />
                <Route path="uploader" element={<Uploader />} />
                <Route path="admin" element={<Admin />} />
                <Route path="enterprise" element={<EnterpriseMusicPlatform />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </HashRouter>
        </AudioPlayerProvider>
      </StoreProvider>
    </AuthProvider>
    </GlobalErrorBoundary>
  );
}
