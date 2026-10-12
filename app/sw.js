/* Service Worker: macht die Lernwelt offline nutzbar.
   Bei jeder Änderung an den Dateien VERSION erhöhen, damit Geräte neu laden. */
const VERSION = 'fwmg-lernwelt-v44';
const PRECACHE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'apps/gruppenfuehrer.html',
  'apps/zugfuehrer.html',
  'apps/befehlstrainer.html',
  'tastatur.js',
  'coach.css',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/flamme.svg',
  'icons/zugfuehrer.svg',
  'icons/gruppenfuehrer.svg',
  'data/gruppenfuehrer.json',
  'data/zugfuehrer.json',
  'audio/gong.bin',
  'fonts/fonts.css',
  'fonts/barlow-condensed-latin-500-normal.woff2',
  'fonts/barlow-condensed-latin-600-normal.woff2',
  'fonts/barlow-condensed-latin-700-normal.woff2',
  'fonts/ibm-plex-mono-latin-400-normal.woff2',
  'fonts/ibm-plex-mono-latin-500-normal.woff2',
  'fonts/ibm-plex-mono-latin-600-normal.woff2',
  'fonts/ibm-plex-sans-latin-400-normal.woff2',
  'fonts/ibm-plex-sans-latin-500-normal.woff2',
  'fonts/ibm-plex-sans-latin-600-normal.woff2'
];

self.addEventListener('install', (e) => {
  /* cache: 'reload' umgeht den HTTP-Cache des Browsers, damit die neue Fassung wirklich frisch geladen wird. */
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => c.addAll(PRECACHE.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Eigene Dateien: Cache zuerst, im Hintergrund aktualisieren. Fremde Adressen laufen am Cache vorbei. */
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const hit = await cache.match(req, { ignoreSearch: true });
      const refresh = fetch(req)
        .then((res) => {
          if (res && res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => null);
      if (hit) { e.waitUntil(refresh); return hit; }
      const res = await refresh;
      if (res) return res;
      if (req.mode === 'navigate') return (await cache.match('index.html')) || Response.error();
      return Response.error();
    })
  );
});
