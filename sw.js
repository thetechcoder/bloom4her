/* Bloom service worker: cache-first so the app works offline. Bump VERSION on every release. */
var VERSION = 'bloom-v9';
var ASSETS = [
  './', './styles.css', './manifest.webmanifest',
  './js/checkup.js', './js/content.js', './js/engine.js', './js/app.js', './js/lock.js', './js/care.js', './js/finder.js', './js/labels.js', './js/modules/m1.js', './js/modules/m2.js', './js/modules/m3.js', './js/modules/m4.js', './js/modules/m5.js', './js/modules/m6.js', './js/modules/m7.js', './js/modules/m8.js', './js/modules/m9.js', './js/modules/m10.js', './js/modules/m11.js', './js/modules/m12.js',
  './icons/icon.svg', './icons/mark.svg', './icons/icon-192.png', './icons/icon-512.png',
  './icons/icon-maskable-512.png', './icons/apple-touch-icon.png'
];

/* Hosts like Cloudflare Pages redirect /index.html to /. A cached redirect breaks navigation
   ("This site can't be reached"), so always store a clean 200 copy and key the page as './'. */
function clean(res) {
  if (!res.redirected) return Promise.resolve(res);
  return res.blob().then(function (b) { return new Response(b, { status: 200, statusText: 'OK', headers: res.headers }); });
}
function store(cache, key, res) { return clean(res).then(function (r) { return cache.put(key, r); }); }

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (cache) {
    return Promise.all(ASSETS.map(function (url) {
      return fetch(url, { cache: 'reload' }).then(function (res) {
        if (!res.ok) throw new Error('Failed to cache ' + url);
        return store(cache, url, res);
      });
    }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    e.respondWith(caches.match('./').then(function (hit) {
      return hit || fetch(req).then(function (res) { return clean(res); });
    }));
    return;
  }
  e.respondWith(caches.match(req).then(function (hit) {
    return hit || fetch(req).then(function (res) {
      var copy = res.clone();
      if (res.ok && new URL(req.url).origin === location.origin) caches.open(VERSION).then(function (c) { store(c, req, copy); });
      return res;
    });
  }));
});
