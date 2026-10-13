// Prüft die App-Dateien: Vollständigkeit, Manifest und die Regeln für den öffentlichen Betrieb.
import { readFileSync, existsSync, readdirSync } from 'node:fs';

const sw = readFileSync('app/sw.js', 'utf8');
const list = [...sw.matchAll(/'([^']+\.(?:html|js|png|svg|webmanifest|css|json|woff2|bin))'/g)].map((m) => m[1]);
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
for (const f of readdirSync('app/audio')) {
  if (!list.includes('audio/' + f)) fail('Tondatei nicht im Cache-Verzeichnis (sw.js):', f);
  // Töne nur verwürfelt ablegen (scripts/gong.mjs), keine direkt abspielbaren Dateien.
  if (!f.endsWith('.bin')) fail('Tondatei nicht verwürfelt (scripts/gong.mjs):', f);
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
// Was ist neu: „Frühere Neuigkeiten“ bleibt kurz (NEU_ALT höchstens NEU_ALT_MAX Punkte), Älteres steht in docs/RELEASE-NOTES.md.
{
  const max = Number((shell.match(/NEU_ALT_MAX=(\d+)/) || [])[1]);
  const alt = (shell.match(/var NEU_ALT=\[([\s\S]*?)\n  \];/) || [])[1];
  if (!max || alt === undefined) fail('Was ist neu: NEU_ALT oder NEU_ALT_MAX nicht gefunden (app/index.html)');
  else {
    const n = [...alt.matchAll(/^\s*\['/gm)].length;
    if (n > max) fail(`Was ist neu: NEU_ALT hat ${n} Punkte, erlaubt sind ${max}. Überholte oder älteste Punkte streichen (stehen in docs/RELEASE-NOTES.md).`);
  }
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

// Reiter in Gruppenführer- und Zugführer-Coach: gleiche Reihenfolge.
const TABS = 'Heute,Führung,Fortschritt,Quellen';
const gfTabs = [...(readFileSync('app/apps/gruppenfuehrer.html', 'utf8').match(/function tabs\(\)\{[\s\S]*?<\/nav>/) || [''])[0].matchAll(/'>([^<']+)<\/button>/g)].map((m) => m[1]).join(',');
const zfTabs = [...((readFileSync('app/apps/zugfuehrer.html', 'utf8').match(/\[\['heute'[^\n]*?\]\]\.forEach/) || [''])[0]).matchAll(/,'([^']+)'\]/g)].map((m) => m[1]).join(',');
if (gfTabs !== TABS) fail(`Reiter im Gruppenführer-Coach: ${gfTabs || 'nicht gefunden'} (erwartet ${TABS})`);
if (zfTabs !== TABS) fail(`Reiter im Zugführer-Coach: ${zfTabs || 'nicht gefunden'} (erwartet ${TABS})`);

// Sperrliste: Begriffe aus internen oder örtlichen Quellen (Namen, Orte, Einheiten), die nie in app/ oder docs/ stehen dürfen.
// Die Liste liegt bewusst nicht im Repository: FWMG_SPERRLISTE=<Pfad zu einer Textdatei, ein Begriff je Zeile>.
// Ohne Liste wird die Prüfung übersprungen.
if (process.env.FWMG_SPERRLISTE) {
  let begriffe = [];
  try {
    begriffe = readFileSync(process.env.FWMG_SPERRLISTE, 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
  } catch {
    fail('FWMG_SPERRLISTE nicht lesbar:', process.env.FWMG_SPERRLISTE);
  }
  if (!begriffe.length) fail('FWMG_SPERRLISTE enthält keine Begriffe');
  const walk = (d) => (existsSync(d) ? readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(`${d}/${e.name}`) : [`${d}/${e.name}`])) : []);
  const dateien = [...walk('app'), ...walk('docs'), ...walk('scripts'), ...walk('.github'), 'README.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'SECURITY.md']
    .filter((f) => existsSync(f) && /\.(html|js|mjs|json|md|css|webmanifest|txt|svg|ya?ml)$/.test(f));
  for (const f of dateien) {
    const zeilen = readFileSync(f, 'utf8').normalize('NFC').toLowerCase().split('\n');
    for (const b of begriffe) {
      const esc = b.normalize('NFC').toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const wort = new RegExp(`(^|[^\\p{L}\\p{N}])${esc}($|[^\\p{L}\\p{N}])`, 'u');
      const anfang = new RegExp(`(^|[^\\p{L}\\p{N}])${esc}`, 'u');
      zeilen.forEach((z, i) => {
        if (wort.test(z)) fail(`Begriff aus der Sperrliste in ${f}:${i + 1}`);
        else if (anfang.test(z)) console.warn(`Hinweis: Wortanfang aus der Sperrliste in ${f}:${i + 1} (z. B. Zusammensetzung), bitte prüfen`);
      });
    }
  }
}

console.log(bad ? `${bad} Problem(e)` : 'OK: Dateien vollständig, Regeln für den öffentlichen Betrieb eingehalten');
process.exit(bad ? 1 : 0);
