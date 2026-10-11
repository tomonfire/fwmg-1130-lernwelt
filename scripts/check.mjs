// Prüft die App-Dateien: Vollständigkeit, Manifest und die Regeln für den öffentlichen Betrieb.
import { readFileSync, existsSync, readdirSync } from 'node:fs';

const sw = readFileSync('app/sw.js', 'utf8');
const list = [...sw.matchAll(/'([^']+\.(?:html|png|webmanifest|css|woff2))'/g)].map((m) => m[1]);
const shell = readFileSync('app/index.html', 'utf8');
const apps = [...shell.matchAll(/file:'([^']+)'/g)].map((m) => m[1]);
const pages = ['app/index.html', ...readdirSync('app/apps').filter((f) => f.endsWith('.html')).map((f) => 'app/apps/' + f)];

let bad = 0;
const fail = (...msg) => { console.error(...msg); bad++; };

for (const f of new Set([...list, ...apps])) {
  if (!existsSync('app/' + f)) fail('FEHLT:', f);
}
for (const a of apps) {
  if (!list.includes(a)) fail('Nicht im Cache-Verzeichnis (sw.js):', a);
}
for (const f of readdirSync('app/fonts').filter((f) => f.endsWith('.woff2'))) {
  if (!list.includes('fonts/' + f)) fail('Schrift nicht im Cache-Verzeichnis (sw.js):', f);
}
JSON.parse(readFileSync('app/manifest.webmanifest', 'utf8'));

// Öffentlicher Betrieb: nicht auffindbar, keine fremden Server, Impressum vorhanden.
for (const f of pages) {
  const html = readFileSync(f, 'utf8');
  if (!/<meta name="robots" content="noindex,nofollow[^"]*">/.test(html)) fail('robots-noindex fehlt:', f);
  if (!html.includes('<meta name="referrer" content="no-referrer">')) fail('no-referrer fehlt:', f);
  if (!html.includes('http-equiv="Content-Security-Policy"')) fail('Content-Security-Policy fehlt:', f);
  if (/<(?:link|script|img|iframe)\b[^>]*\b(?:href|src)="https?:/i.test(html)) fail('Lädt Dateien von fremden Servern:', f);
  if (!html.includes('keine offizielle App der Feuerwehr') || !html.includes('KI-Hinweis')) fail('Impressum oder KI-Hinweis fehlt:', f);
}
if (!/Disallow: \/\s*$/m.test(readFileSync('app/robots.txt', 'utf8'))) fail('robots.txt sperrt Crawler nicht');

console.log(bad ? `${bad} Problem(e)` : 'OK: Dateien vollständig, Regeln für den öffentlichen Betrieb eingehalten');
process.exit(bad ? 1 : 0);
