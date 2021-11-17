self.addEventListener('install', (e) => {
    // console.log('Service worker installing...');
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
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// // event listener for fetching a web page, if they are offline get the cached version
// self.addEventListener('fetch', (e) => {
//     if (e.request.url.indexOf('/api/') === 0) {
//         e.respondWith(
//             fetch(e.request).then((res) => {
//                 caches.open('todolist').then((cache) => {
//                     cache.put(e.request, res.clone());
//                     return res;
//                 });
//             }).catch(() => caches.match(e.request))
//         )
//     } else {
//         e.respondWith(caches.match(e.request).then((res) => {
//             return res || fetch(e.request);
//         }));
//     }
// });