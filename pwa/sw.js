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
  
  // Logos & General images
  './assets/img/logo.png',
  './assets/img/logo-512.jpg',
  './assets/img/logo-pwa.jpg',
  './assets/img/hangar.png',
  './assets/img/qr_code.png',
  
  // Artist images
  './assets/img/armin_van_buuren.png',
  './assets/img/chefspecial.png',
  './assets/img/de_staat.png',
  './assets/img/dotan.png',
  './assets/img/eefje.png',
  './assets/img/froukje.png',
  './assets/img/kensington.png',
  './assets/img/martin_garrix.png',
  './assets/img/navarone.png',
  './assets/img/spinvis.png',
  './assets/img/within_temptation.png',
  
  // SVG Map assets
  './assets/svg/festival-map.svg',
  './assets/svg/legenda.svg',
  './assets/svg/marker_bar.svg',
  './assets/svg/marker_entrance_exit.svg',
  './assets/svg/marker_first_aid.svg',
  './assets/svg/marker_food.svg',
  './assets/svg/marker_ice_cream.svg',
  './assets/svg/marker_locker.svg',
  './assets/svg/marker_merchandise.svg',
  './assets/svg/marker_stage1_ponton.svg',
  './assets/svg/marker_stage2_the_lake.svg',
  './assets/svg/marker_stage3_the_club.svg',
  './assets/svg/marker_stage4_hangar.svg',
  './assets/svg/marker_toilet.svg'
];

// Install Event - Pre-caches essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Precaching app shell...');
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
