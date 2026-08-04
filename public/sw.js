/*
  Krypside Mobile Web Push Notification Service Worker
  Handles background push notifications for iOS Safari and Android Chrome.
*/

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push event received.');
  
  let payload = {
    title: '🔥 KRYPSIDE BEAT DROP',
    body: 'A new trap/hip-hop instrumental has just dropped! Stream it now on Krypside.',
    url: '/'
  };

  if (event.data) {
    try {
      const dataJson = event.data.json();
      payload = { ...payload, ...dataJson };
    } catch (err) {
      // Fallback to plain text if parsing JSON fails
      payload.body = event.data.text() || payload.body;
    }
  }

  const options = {
    body: payload.body,
    icon: '/favicon.png',
    badge: '/favicon.png',
    vibrate: [100, 50, 100],
    data: {
      url: payload.url || '/'
    },
    actions: [
      { action: 'open_url', title: '🔥 Open Beat' }
    ],
    tag: 'krypside-beat-drop-' + Date.now(),
    renotify: true
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification clicked.');
  event.notification.close();

  let clickUrl = '/';
  if (event.notification.data && event.notification.data.url) {
    clickUrl = event.notification.data.url;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
      // Look for an existing open window under our domain
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url.indexOf(location.host) !== -1 && 'focus' in client) {
          return client.navigate(clickUrl).then(c => c.focus());
        }
      }
      
      // If no window is open, launch a new one
      if (clients.openWindow) {
        return clients.openWindow(clickUrl);
      }
    })
  );
});
