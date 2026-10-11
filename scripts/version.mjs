// Prüft in Pull Requests: Wurde etwas in app/ geändert, muss VERSION in app/sw.js erhöht worden sein.
// Aufruf: node scripts/version.mjs origin/main
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const base = process.argv[2] || 'origin/main';
const sh = (c) => execSync(c, { encoding: 'utf8' }).trim();
const changed = sh(`git diff --name-only ${base}...HEAD -- app`).split('\n').filter(Boolean);
if (!changed.length) { console.log('OK: keine Änderungen in app/'); process.exit(0); }

const ver = (s) => (s.match(/const VERSION = '([^']+)'/) || [])[1];
const now = ver(readFileSync('app/sw.js', 'utf8'));
let before = '';
try { before = ver(sh(`git show ${base}:app/sw.js`)); } catch { /* neue Datei */ }

if (now === before) {
  console.error(`VERSION in app/sw.js ist unverändert (${now}), obwohl diese Dateien geändert wurden:\n  ${changed.join('\n  ')}`);
  console.error('Bitte VERSION erhöhen, sonst laden Geräte die neue Fassung nicht.');
  process.exit(1);
}
console.log(`OK: VERSION ${before} -> ${now}`);
