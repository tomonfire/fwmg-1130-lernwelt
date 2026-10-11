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
  await step('Lerncode ohne Einrichtung ausgeblendet', async () => {
    await page.click('#welcome button.primary');
    assert(await page.locator('#lc').isHidden(), 'Lerncode-Bereich sichtbar');
  });
  await step('Keine Anfragen an fremde Server', async () => assert(!foreign.length, foreign.join(', ')));
  await step('Keine Fehler im Browser', async () => assert(!errors.length, errors.join(' | ')));

  // Lerncode mit nachgebildetem Supabase-Server: zwei Geräte, ein Code.
  const db = new Map();
  const calls = [];
  const CODE = /^[A-HJKMNP-TV-Z2-9]{16}$/;
  async function device() {
    const c = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    await c.addInitScript(() => { window.FW_SYNC = { url: 'https://test.supabase.co', key: 'test' }; });
    await c.route('https://test.supabase.co/**', async (route) => {
      const fn = new URL(route.request().url()).pathname.split('/').pop();
      const b = route.request().postDataJSON() || {};
      calls.push(fn + ':' + (b.p_key || ''));
      if (!CODE.test(b.p_code || '')) return route.fulfill({ status: 400, body: '{}' });
      const k = b.p_code + '/' + b.p_key;
      const json = (v) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(v) });
      if (fn === 'lernstand_get') return json(db.has(k) ? db.get(k) : null);
      if (fn === 'lernstand_set') { db.set(k, b.p_data); return route.fulfill({ status: 204, body: '' }); }
      if (fn === 'lernstand_exists') return json([...db.keys()].some((x) => x.startsWith(b.p_code + '/')));
      if (fn === 'lernstand_delete') { for (const x of [...db.keys()]) if (x.startsWith(b.p_code + '/')) db.delete(x); return route.fulfill({ status: 204, body: '' }); }
      return route.fulfill({ status: 404, body: '' });
    });
    const p = await c.newPage();
    p.on('pageerror', (e) => errors.push('Skriptfehler (Lerncode): ' + e.message));
    await p.goto(base);
    await p.click('#welcome button.primary');
    await p.waitForSelector('#lc:not([hidden])');
    return { c, p };
  }
  async function openTrainer(p, i) {
    await p.locator('#dash button:has-text("Öffnen")').nth(i).click();
    await p.waitForSelector('#mod:not([hidden])');
    await p.waitForTimeout(1500);
    await p.click('#m-home');
  }

  let code = '';
  const A = await device();
  await step('Lerncode erstellen', async () => {
    await A.p.click('[data-lc="create"]');
    await A.p.waitForSelector('#lc-code');
    code = (await A.p.textContent('#lc-code')).replace(/-/g, '');
    assert(CODE.test(code), 'Code hat falsches Format: ' + code);
    assert(db.has(code + '/meta'), 'Code nicht auf dem Server angelegt');
  });
  await step('Trainer sichern unter dem Lerncode', async () => {
    await A.p.evaluate(() => localStorage.setItem('bt-fwdv3', JSON.stringify({ sc: { probe: { n: 2, best: 80 } }, quiz: 7, hist: [], qh: [], cat: {}, fld: {}, upd: Date.now() })));
    for (let i = 0; i < 3; i++) await openTrainer(A.p, i);
    await A.p.waitForTimeout(500);
    assert(calls.includes('lernstand_get:progress-lk'), 'Gruppenführer liest nicht');
    assert(db.has(code + '/progress-zf'), 'Zugführer sichert nicht');
    assert(db.get(code + '/progress-bt')?.quiz === 7, 'Befehlstrainer sichert nicht');
  });

  const B = await device();
  await step('Falscher und unbekannter Code werden abgewiesen', async () => {
    await B.p.click('#lc summary');
    await B.p.fill('#lc-in', 'abc');
    await B.p.click('#lc-form button[type=submit]');
    await B.p.waitForSelector('#lc .msg.bad');
    await B.p.click('#lc summary').catch(() => {});
    await B.p.locator('#lc summary').click().catch(() => {});
    await B.p.evaluate(() => { const d = document.querySelector('#lc details'); if (d) d.open = true; });
    await B.p.fill('#lc-in', 'ZZZZ-ZZZZ-ZZZZ-ZZZZ');
    await B.p.click('#lc-form button[type=submit]');
    await B.p.waitForFunction(() => /nichts gespeichert/.test(document.querySelector('#lc .msg')?.textContent || ''));
  });
  await step('Zweites Gerät übernimmt den Lernstand', async () => {
    await B.p.evaluate(() => { const d = document.querySelector('#lc details'); if (d) d.open = true; });
    await B.p.fill('#lc-in', code.toLowerCase().replace(/(.{4})/g, '$1 '));
    await B.p.click('#lc-form button[type=submit]');
    await B.p.waitForSelector('#lc-code');
    await openTrainer(B.p, 2);
    const bt = await B.p.evaluate(() => JSON.parse(localStorage.getItem('bt-fwdv3') || '{}'));
    assert(bt.quiz === 7 && bt.sc && bt.sc.probe, 'Befehlstrainer-Stand nicht übernommen');
  });
  await step('Gesicherten Lernstand löschen', async () => {
    B.p.once('dialog', (d) => d.accept());
    await B.p.evaluate(() => { const d = document.querySelector('#lc details'); if (d) d.open = true; });
    await B.p.click('[data-lc="delete"]');
    await B.p.waitForSelector('[data-lc="create"]');
    const left = [...db.keys()].filter((k) => k.startsWith(code + '/')); assert(!left.length, 'Daten nicht gelöscht: ' + left.join(', ') + ' / ' + calls.slice(-8).join(' '));
    assert((await B.p.evaluate(() => localStorage.getItem('bt-fwdv3'))) !== null, 'Lokaler Stand fälschlich gelöscht');
  });
  await step('Keine Fehler beim Lerncode', async () => assert(!errors.length, errors.join(' | ')));
} finally {
  await browser.close();
  server.close();
}
console.log(failed ? `${failed} Test(s) fehlgeschlagen` : 'OK: Browser-Test bestanden');
process.exit(failed ? 1 : 0);
