const staticCache = "static-cache-v4";
const assets = [
    "index.html",
    "js/main.js",
    "manifest.json",
    "img/icon-144x144.png",
    "img/logo.png",
    "pages/success.html",
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js",
    "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js",
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
];


self.addEventListener('install', evt => {
    //console.log('service worker installed');
    evt.waitUntil(
      caches.open(staticCache).then((cache) => {
        console.log('caching shell assets');
        cache.addAll(assets);
      })
    );
  });


self.addEventListener('activate', evt => {
    //console.log('service worker activated');
    evt.waitUntil(
      caches.keys().then(keys => {
        //console.log(keys);
        return Promise.all(keys
          .filter(key => key !== staticCache)
          .map(key => caches.delete(key))
        );
      })
    );
  });


self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request);
      })
    );
  });