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

// self.addEventListener('fetch', (e) => {
//     // console.log(e.request.url); // Logs all URLS

//     e.respondWith(
//         caches.match(e.request).then((res) => {
//             return res || fetch(e.request);
//         })
//     )
// });


// fetch event listener for all requests
self.addEventListener('fetch', function(event) {
    // console.log('fetch event', event);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // caches.match() always resolves but in case of success response will have value
            if (response !== undefined) {
                return response;
            } else {
                return fetch(event.request).then(function(response) {
                    // response may be used only once
                    // we need to save clone to put one copy in cache and serve second one
                    let responseClone = response.clone();

                    caches.open('todolist').then(function(cache) {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                    
                }).catch(function() {
                    return caches.match('/index.html');
                });
            }
        })
    );
});
