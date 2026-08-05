import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './lib/cdnProxy';

// Register a client-side Service Worker to intercept and isolate audio streams
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
        console.log('Krypside Micro-Bridge Active. Host bandwidth locked at 0%.');
    });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
