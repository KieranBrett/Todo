self.addEventListener('install', (e) => {
    console.log('Service worker installing...');
    self.skipWaiting(); // Activates the worker immediately

    e.waitUntil(
        caches.open('todolist').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                '/favicon.ico',
                '/logo192.png'
            ])
            
        })
    )
  });

self.addEventListener('activate', (e) => {
    console.log('Service worker activated');
});

self.addEventListener('fetch', (e) => {
    // console.log(e.request.url); // Logs all URLS

    e.respondWith(
        caches.match(e.request).then((res) => {
            return res || fetch(e.request);
        })
    )
});
