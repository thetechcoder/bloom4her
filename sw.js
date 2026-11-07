/* Bloom service worker: cache-first so the app works offline. Bump VERSION on every release. */
var VERSION = 'bloom-v8';
var ASSETS = [
  './', './index.html', './styles.css', './manifest.webmanifest',
  './js/checkup.js', './js/content.js', './js/engine.js', './js/app.js', './js/lock.js', './js/care.js', './js/finder.js', './js/labels.js', './js/modules/m1.js', './js/modules/m2.js', './js/modules/m3.js', './js/modules/m4.js', './js/modules/m5.js', './js/modules/m6.js', './js/modules/m7.js', './js/modules/m8.js', './js/modules/m9.js', './js/modules/m10.js', './js/modules/m11.js', './js/modules/m12.js',
  './icons/icon.svg', './icons/mark.svg', './icons/icon-192.png', './icons/icon-512.png',
  './icons/icon-maskable-512.png', './icons/apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(function (hit) {
    return hit || fetch(e.request).then(function (res) {
      var copy = res.clone();
      caches.open(VERSION).then(function (c) { c.put(e.request, copy); });
      return res;
    }).catch(function () { return caches.match('./index.html'); });
  }));
});
