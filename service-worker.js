const CACHE_VERSION = 'v1';
const CACHE_NAME = `pwa-boilerplate-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';
const PRECACHE_ASSETS = ['/', '/index.html', '/styles.css', '/app.js', OFFLINE_URL];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const req = event.request;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match(OFFLINE_URL)));
  } else {
    event.respondWith(caches.match(req).then(cached => cached || fetch(req)));
  }
});
