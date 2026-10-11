// Content-Security-Policy: Inline-Skripte nur per SHA-256-Prüfsumme erlauben, nicht per 'unsafe-inline'.
// So läuft kein eingeschleuster Code (z. B. Event-Handler aus eingelesenen Daten), nur die eigenen Skripte.
//   node scripts/csp.mjs          prüft, ob die Prüfsummen in allen HTML-Dateien stimmen
//   node scripts/csp.mjs --write  trägt die aktuellen Prüfsummen ein (nach Änderungen an Inline-Skripten)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const write = process.argv.includes('--write');
const files = ['app/index.html', ...readdirSync('app/apps').filter((f) => f.endsWith('.html')).map((f) => 'app/apps/' + f)];
const CSP = /(http-equiv="Content-Security-Policy" content="[^"]*?script-src )([^;"]*)/;

let bad = 0;
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const hashes = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => `'sha256-${createHash('sha256').update(m[1], 'utf8').digest('base64')}'`);
  const want = ["'self'", ...new Set(hashes)].join(' ');
  const m = html.match(CSP);
  if (!m) { console.error('Keine CSP mit script-src:', f); bad++; continue; }
  if (m[2] === want) continue;
  if (write) { writeFileSync(f, html.replace(CSP, `$1${want}`)); console.log('CSP aktualisiert:', f); continue; }
  console.error(`CSP-Prüfsummen passen nicht zu den Inline-Skripten: ${f}\n  → npm run csp:update`);
  bad++;
}
if (!write) console.log(bad ? `${bad} Problem(e)` : `OK: CSP-Prüfsummen stimmen (${files.length} Dateien)`);
process.exit(bad ? 1 : 0);
