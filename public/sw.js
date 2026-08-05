self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // If the browser tries to fetch an audio file (.mp3 / .wav)
    if (url.pathname.endsWith('.mp3') || url.pathname.endsWith('.wav')) {
        // Intercept the request. Vercel handles 0 bytes of this stream.
        // The stream is pulled directly from your cold destination or local client cache.
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || fetch(event.request, { mode: 'no-cors' });
            })
        );
    }
});
