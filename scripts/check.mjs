// Prüft die App-Dateien: Vollständigkeit, Manifest und die Regeln für den öffentlichen Betrieb.
import { readFileSync, existsSync, readdirSync } from 'node:fs';

const sw = readFileSync('app/sw.js', 'utf8');
const list = [...sw.matchAll(/'([^']+\.(?:html|js|png|svg|webmanifest|css|json|woff2))'/g)].map((m) => m[1]);
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
for (const f of readdirSync('app/data')) {
  if (!list.includes('data/' + f)) fail('Datendatei nicht im Cache-Verzeichnis (sw.js):', f);
}
for (const f of readdirSync('app/fonts').filter((f) => f.endsWith('.woff2'))) {
  if (!list.includes('fonts/' + f)) fail('Schrift nicht im Cache-Verzeichnis (sw.js):', f);
}
for (const f of readdirSync('app').filter((f) => f.endsWith('.js') && f !== 'sw.js')) {
  if (!list.includes(f)) fail('Skript nicht im Cache-Verzeichnis (sw.js):', f);
}
JSON.parse(readFileSync('app/manifest.webmanifest', 'utf8'));

// Öffentlicher Betrieb: nicht auffindbar, keine fremden Server, Impressum vorhanden und überall gleich.
const footers = new Set();
for (const f of pages) {
  const html = readFileSync(f, 'utf8');
  if (!/<meta name="robots" content="noindex,nofollow[^"]*">/.test(html)) fail('robots-noindex fehlt:', f);
  if (!html.includes('<meta name="referrer" content="no-referrer">')) fail('no-referrer fehlt:', f);
  const csp = (html.match(/http-equiv="Content-Security-Policy" content="([^"]*)"/) || [])[1];
  if (!csp) fail('Content-Security-Policy fehlt:', f);
  // Nur GitHub Pages: keine Verbindungen zu anderen Servern.
  else if (!csp.includes("connect-src 'self';")) fail('connect-src erlaubt fremde Server:', f);
  if (/<(?:link|script|img|iframe)\b[^>]*\b(?:href|src)="https?:/i.test(html)) fail('Lädt Dateien von fremden Servern:', f);
  if (!html.includes('keine offizielle App einer Feuerwehr') || !html.includes('ausschließlich durch mich, Tom Wolff') || !html.includes('KI-Hinweis') || !html.includes('<b>Datenschutz:</b>')) fail('Impressum, Datenschutz oder KI-Hinweis fehlt:', f);
  for (const m of html.matchAll(/<footer class="fwmg-imp">[\s\S]*?<\/footer>/g)) footers.add(m[0]);
  // Private App: keine Hinweise auf eine bestimmte Stadt oder Einheit in Texten (Logos ausgenommen).
  const text = html.replace(/data:[^"')]+/g, '');
  if (/M(?:ö|oe)nchengladbach|Stadtmitte/i.test(text)) fail('Hinweis auf Stadt oder Einheit im Text:', f);
}
// Sichern/Wiederherstellen: Jeder Speicherschlüssel der Shell (fwmg.*, lzf.*) muss in KEYS stehen.
{
  const vars = Object.fromEntries([...shell.matchAll(/(\w+)\s*=\s*'((?:fwmg|lzf)\.[\w-]+\.v\d+)'/g)].map((m) => [m[1], m[2]]));
  const keysSrc = (shell.match(/var KEYS=\[([^\]]*)\]/) || [])[1] || '';
  const inKeys = new Set(keysSrc.split(',').map((x) => x.trim()).map((x) => x.startsWith("'") ? x.slice(1, -1) : vars[x]).filter(Boolean));
  for (const k of new Set([...shell.matchAll(/'((?:fwmg|lzf)\.[\w-]+\.v\d+)'/g)].map((m) => m[1]))) {
    if (!inKeys.has(k)) fail('Speicherschlüssel fehlt in KEYS (Sichern/Wiederherstellen):', k);
  }
}
if (footers.size !== 1) fail(`Impressum ist nicht in allen Dateien gleich (${footers.size} Fassungen)`);
if (!/Disallow: \/\s*$/m.test(readFileSync('app/robots.txt', 'utf8'))) fail('robots.txt sperrt Crawler nicht');

console.log(bad ? `${bad} Problem(e)` : 'OK: Dateien vollständig, Regeln für den öffentlichen Betrieb eingehalten');
process.exit(bad ? 1 : 0);
