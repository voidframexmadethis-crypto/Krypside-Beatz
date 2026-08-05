import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './lib/cdnProxy';

// Safe alert polyfill for iframe safety
if (typeof window !== 'undefined') {
  const originalAlert = window.alert;
  window.alert = function (msg?: any) {
    try {
      if (originalAlert) {
        originalAlert.call(window, msg);
      } else {
        console.log('[Alert Notice]:', msg);
      }
    } catch (e) {
      console.log('[Alert Suppressed]:', msg);
    }
  };
}

// Register a client-side Service Worker to intercept and isolate audio streams
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
        console.log('Krypside Micro-Bridge Active. Host bandwidth locked at 0%.');
    }).catch(err => console.warn('Service worker registration note:', err));
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

