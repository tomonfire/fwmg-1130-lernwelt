// Browser-Test (Playwright, Chromium, iPhone-Größe): Startseite, alle Trainer, Offline-Betrieb.
// Startet einen eigenen kleinen Server für app/ und prüft, dass keine Fehler auftreten
// und keine Anfrage an fremde Server geht.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png',
  '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain; charset=utf-8' };
const server = createServer(async (req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  if (path.endsWith('/')) path += 'index.html';
  try {
    const body = await readFile(join('app', path));
    res.writeHead(200, { 'content-type': TYPES[extname(path)] || 'application/octet-stream' }).end(body);
  } catch { res.writeHead(404).end('nicht gefunden'); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/`;

const launch = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
const browser = await chromium.launch(launch);
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const errors = [];
const foreign = [];
page.on('pageerror', (e) => errors.push('Skriptfehler: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('Konsole: ' + m.text()); });
ctx.on('request', (r) => { if (!r.url().startsWith(base) && !r.url().startsWith('data:')) foreign.push(r.url()); });

let failed = 0;
async function step(name, fn) {
  try { await fn(); console.log('OK   ' + name); }
  catch (e) { failed++; console.error('FEHL ' + name + ': ' + e.message); }
}
const assert = (cond, msg) => { if (!cond) throw new Error(msg); };

try {
  await step('Startseite lädt', async () => {
    await page.goto(base);
    await page.waitForSelector('#welcome button.primary');
    assert((await page.title()).includes('Lernwelt'), 'Titel fehlt');
  });
  await step('Übersicht öffnet', async () => {
    await page.click('#welcome button.primary');
    await page.waitForSelector('#dash:not([hidden])');
  });
  const n = await page.locator('#dash button:has-text("Öffnen")').count();
  await step('Drei Trainer in der Übersicht', async () => assert(n === 3, `${n} statt 3`));
  for (let i = 0; i < n; i++) {
    await step(`Trainer ${i + 1} öffnet`, async () => {
      await page.locator('#dash button:has-text("Öffnen")').nth(i).click();
      await page.waitForSelector('#mod:not([hidden])');
      await page.waitForTimeout(1200);
      const frames = page.frames().filter((f) => f.url().includes('/apps/'));
      assert(frames.length >= i + 1, 'Trainer-Rahmen fehlt');
      for (const f of frames) assert((await f.evaluate(() => document.body.innerText.trim().length)) > 200, 'Trainer leer: ' + f.url());
      await page.click('#m-home');
      await page.waitForSelector('#dash:not([hidden])');
    });
  }
  await step('Service Worker aktiv', async () => {
    const ok = await page.evaluate(async () => { const r = await navigator.serviceWorker.ready; return !!r.active; });
    assert(ok, 'kein aktiver Service Worker');
  });
  await step('Offline nutzbar', async () => {
    await page.reload();
    await page.waitForFunction(() => !!navigator.serviceWorker.controller);
    await ctx.setOffline(true);
    await page.reload();
    await page.waitForSelector('#welcome button.primary');
    await ctx.setOffline(false);
  });
  await step('Keine Anfragen an fremde Server', async () => assert(!foreign.length, foreign.join(', ')));
  await step('Keine Fehler im Browser', async () => assert(!errors.length, errors.join(' | ')));
} finally {
  await browser.close();
  server.close();
}
console.log(failed ? `${failed} Test(s) fehlgeschlagen` : 'OK: Browser-Test bestanden');
process.exit(failed ? 1 : 0);
