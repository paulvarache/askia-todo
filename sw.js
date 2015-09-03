var CACHE_NAME = 'askia-todo-v1';
var urlsToCache = [
    '/askia-todo/',
    '/askia-todo/style.css'
];

// On SW install
self.addEventListener('install', function (event) {
    event.waitUntil(
        // Open cache and add all the files
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            }));
});

// On fetch event, catch the request
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                // The file is cached, return it
                if (response) {
                    return response;
                }

                // Otherwise, clone the request and send it
                var fetchRequest = event.request.clone();
                return fetch(fetchRequest);
            });
        }));
});
