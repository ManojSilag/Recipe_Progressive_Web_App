    const staticCache = 'site-static-v2';
    const dynamicCache = 'site-dynamic-v1';
    const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2)',
    ];

    // install event
    self.addEventListener('install', evt => {
    //console.log('service worker installed');
    evt.waitUntil(
        caches.open(staticCache).then((cache) => {
        console.log('caching shell assets');
        cache.addAll(assets);
        })
    );
    });

    // activate event
    self.addEventListener('activate', evt => {
    //console.log('service worker activated');
    });

    // fetch event
    self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request)
            .then(cacheRes => {
                return cacheRes || fetch(evt.request)
                .then(fetchRes => {
                    return caches.open(dynamicCache).then(cache => {
                        cache .put(evt.request.url, fetchRes.clone());
                        return fetchRes;
                    })
                });
            })
    );
    });