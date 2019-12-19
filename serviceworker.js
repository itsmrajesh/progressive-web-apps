const staticCache = "static-cache";
const assets = [
    "/",
    "/index.html",
    "/js/main.js",
    "/manifest.json",
    "img/icon-144x144.png",
    "img/logo.png",
    "pages/success.html",
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js",
    "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js",
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
];


self.addEventListener('activate', event => {
    event.waitUntil(
        caches.open(staticCache).then((cache) => {
          console.log('caching shell assets');
          cache.addAll(assets);
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