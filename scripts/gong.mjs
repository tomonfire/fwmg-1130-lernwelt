// Legt den Alarmgong für den Befehlscoach verwürfelt ab: node scripts/gong.mjs <pfad/zum/gong.mp3>
// Die Original-Tondatei kommt nicht ins Repository. Der Befehlscoach entwürfelt sie erst im Speicher
// (gleicher Schlüsselstrom wie in gongBytes() in app/apps/befehlstrainer.html) und spielt sie per Web Audio.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const src = process.argv[2];
if (!src) { console.error('Aufruf: node scripts/gong.mjs <pfad/zum/gong.mp3>'); process.exit(1); }
const b = readFileSync(src);
let x = 0x46774d47;
for (let i = 0; i < b.length; i++) {
  x ^= x << 13; x >>>= 0; x ^= x >>> 17; x ^= x << 5; x >>>= 0;
  b[i] ^= x & 255;
}
mkdirSync('app/audio', { recursive: true });
writeFileSync('app/audio/gong.bin', b);
console.log('app/audio/gong.bin geschrieben (' + b.length + ' Bytes). Danach VERSION in app/sw.js erhöhen.');
