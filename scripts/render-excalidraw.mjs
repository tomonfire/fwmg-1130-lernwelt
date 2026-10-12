// Wandelt docs/infrastruktur.excalidraw in docs/infrastruktur.svg um und rendert docs/infrastruktur.png (Chromium).
// Aufruf: node scripts/render-excalidraw.mjs  (ohne Installation, braucht nur Node und Chromium)
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const docs = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs');
const src = join(docs, 'infrastruktur.excalidraw');
const svgFile = join(docs, 'infrastruktur.svg');
const pngFile = join(docs, 'infrastruktur.png');
const els = JSON.parse(readFileSync(src, 'utf8')).elements.filter(e => !e.isDeleted);

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pad = 30;
let maxX = 0, maxY = 0;
const out = [];

for (const e of els) {
  maxX = Math.max(maxX, e.x + Math.abs(e.width));
  maxY = Math.max(maxY, e.y + Math.abs(e.height));
  const dash = e.strokeStyle === 'dashed' ? ' stroke-dasharray="8 6"' : '';
  const fill = e.backgroundColor === 'transparent' ? 'none' : e.backgroundColor;
  if (e.type === 'rectangle') {
    out.push(`<rect x="${e.x}" y="${e.y}" width="${e.width}" height="${e.height}" rx="14" fill="${fill}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}"${dash}/>`);
  } else if (e.type === 'text') {
    const lines = e.text.split('\n');
    const lh = e.fontSize * (e.lineHeight || 1.25);
    const anchor = e.textAlign === 'center' ? 'middle' : 'start';
    const x = e.textAlign === 'center' ? e.x + e.width / 2 : e.x;
    const tspans = lines.map((l, i) => `<tspan x="${x}" y="${e.y + lh * i + e.fontSize}">${esc(l)}</tspan>`).join('');
    out.push(`<text font-family="Helvetica, Arial, sans-serif" font-size="${e.fontSize}" fill="${e.strokeColor}" text-anchor="${anchor}">${tspans}</text>`);
  } else if (e.type === 'arrow') {
    const pts = e.points.map(([px, py]) => [e.x + px, e.y + py]);
    out.push(`<polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}"${dash}/>`);
    const head = (from, to) => {
      const a = Math.atan2(to[1] - from[1], to[0] - from[0]), l = 12, w = 0.45;
      const p1 = [to[0] - l * Math.cos(a - w), to[1] - l * Math.sin(a - w)];
      const p2 = [to[0] - l * Math.cos(a + w), to[1] - l * Math.sin(a + w)];
      out.push(`<polyline points="${p1.join(',')} ${to.join(',')} ${p2.join(',')}" fill="none" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}"/>`);
    };
    if (e.endArrowhead) head(pts[pts.length - 2], pts[pts.length - 1]);
    if (e.startArrowhead) head(pts[1], pts[0]);
  }
}

const w = Math.ceil(maxX + pad), h = Math.ceil(maxY + pad);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="100%" height="100%" fill="#ffffff"/>${out.join('')}</svg>\n`;
writeFileSync(svgFile, svg);

execFileSync('chromium', [
  '--headless', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
  `--screenshot=${pngFile}`, `--window-size=${w},${h}`, '--force-device-scale-factor=1', `file://${svgFile}`,
], { stdio: 'inherit' });
console.log(`geschrieben: ${pngFile} (${w}x${h})`);
