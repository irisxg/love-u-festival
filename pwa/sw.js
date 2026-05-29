const CACHE_NAME = 'love-u-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.php',
  './info.php',
  './programma.php',
  './map.php',
  './manifest.json',
  './assets/css/global.css',
  './assets/css/home.css',
  './assets/css/info.css',
  './assets/css/map.css',
  './assets/css/programma.css',
  './assets/js/darkmode.js',
  './assets/js/home.js',
  './assets/js/language.js',
  './assets/js/map.js',
  './assets/js/programma.js',
  './assets/js/schedule.js',
  './assets/data/artists.json',
  './assets/img/logo.png',
  './assets/img/logo-512.jpg',
  './assets/img/hangar.png'
];

// Install Event - Pre-caches essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Precaching app shell...');
      // Use map or catch individual errors so caching continues even if some files fail
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) => {
          return cache.add(url).catch((err) => {
            console.warn(`[Service Worker] Failed to cache: ${url}`, err);
          });
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Cleans up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache...', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Dynamic caching strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Let navigation requests (or PHP pages) use Network-First, so updates are visible instantly
  if (event.request.mode === 'navigate' || event.request.url.includes('.php')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || caches.match('./index.php');
          });
        })
    );
  } else {
    // Assets use Cache-First, falling back to network
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        });
      })
    );
  }
});
