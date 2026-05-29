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

// Activate Event - Cleans up old caches and claims clients
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

  // Handle page navigations and PHP files (Network-First, falling back to Cache)
  if (event.request.mode === 'navigate' || event.request.url.includes('.php')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // If network fails (completely offline), match the request in cache (ignoring query strings)
          return caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // Fallback to index.php if the specific page is not found in cache
            return caches.match('index.php', { ignoreSearch: true }).then((indexResponse) => {
              if (indexResponse) {
                return indexResponse;
              }
              
              // Extreme fallback: Return a custom friendly offline HTML response so the browser never crashes
              return new Response(
                `<!DOCTYPE html>
                <html lang="nl">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>❤️U Festival - Offline</title>
                  <style>
                    body { font-family: sans-serif; text-align: center; padding: 50px; background: #121414; color: white; }
                    h1 { color: #F03228; }
                    a { color: #247BA0; text-decoration: none; font-weight: bold; }
                  </style>
                </head>
                <body>
                  <h1>❤️U Festival</h1>
                  <p>Je bent offline en deze pagina is helaas nog niet opgeslagen op je apparaat.</p>
                  <p><a href="index.php">Ga terug naar de Startpagina</a></p>
                </body>
                </html>`,
                {
                  status: 200,
                  headers: { 'Content-Type': 'text/html; charset=utf-8' }
                }
              );
            });
          });
        })
    );
  } else {
    // Handle static assets (Cache-First, falling back to Network)
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request)
          .then((response) => {
            if (response && response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            // Return 404 for failed asset fetches when offline to prevent console crashes
            return new Response('Asset offline not available', { status: 404 });
          });
      })
    );
  }
});
