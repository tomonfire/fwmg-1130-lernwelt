/* Service Worker: macht die Lernwelt offline nutzbar.
   Bei jeder Änderung an den Dateien VERSION erhöhen, damit Geräte neu laden. */
const VERSION = 'fwmg-lernwelt-v1';
const PRECACHE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'apps/gruppenfuehrer.html',
  'apps/zugfuehrer.html',
  'apps/befehlstrainer.html',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Eigene Dateien: Cache zuerst, im Hintergrund aktualisieren.
   Schriften (Google Fonts): beim ersten Laden mitspeichern. */
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!sameOrigin && !isFont) return;

  e.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const hit = await cache.match(req, { ignoreSearch: sameOrigin });
      const refresh = fetch(req)
        .then((res) => {
          if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
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
