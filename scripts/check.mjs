// Einfache Prüfung: Sind alle im Service Worker und in der Shell genannten Dateien vorhanden?
import { readFileSync, existsSync } from 'node:fs';

const sw = readFileSync('app/sw.js', 'utf8');
const list = [...sw.matchAll(/'([^']+\.(?:html|png|webmanifest))'/g)].map((m) => m[1]);
const shell = readFileSync('app/index.html', 'utf8');
const apps = [...shell.matchAll(/file:'([^']+)'/g)].map((m) => m[1]);

let bad = 0;
for (const f of new Set([...list, ...apps])) {
  if (!existsSync('app/' + f)) { console.error('FEHLT:', f); bad++; }
}
for (const a of apps) {
  if (!list.includes(a)) { console.error('Nicht im Cache-Verzeichnis (sw.js):', a); bad++; }
}
JSON.parse(readFileSync('app/manifest.webmanifest', 'utf8'));
console.log(bad ? `${bad} Problem(e)` : 'OK: alle Dateien vorhanden');
process.exit(bad ? 1 : 0);
