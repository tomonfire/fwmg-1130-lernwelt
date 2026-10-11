// Kleiner Server für app/ wie GitHub Pages: liefert Dateien unverändert aus, ohne Umleitungen
// (serve@14 leitet „x.html“ auf „x“ um; der Service Worker lädt die Coaches dann nicht).
// Keine Abhängigkeiten, kein Internet nötig.
//   npm start                → http://localhost:8080/
//   PORT=3000 npm start      → anderer Port
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('../app', import.meta.url)));
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json', '.txt': 'text/plain; charset=utf-8' };

export function serveApp(port = 0, host = '127.0.0.1') {
  const server = createServer(async (req, res) => {
    let path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    if (path.endsWith('/') || path.endsWith('\\')) path += 'index.html';
    const file = join(ROOT, path);
    if (!file.startsWith(ROOT)) { res.writeHead(403).end('verboten'); return; }
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream', 'cache-control': 'no-cache' }).end(body);
    } catch { res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('nicht gefunden'); }
  });
  return new Promise((r) => server.listen(port, host, () => r(server)));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT) || 8080;
  await serveApp(port, 'localhost');
  console.log(`Lernwelt läuft: http://localhost:${port}/  (Beenden mit Strg+C)`);
}
