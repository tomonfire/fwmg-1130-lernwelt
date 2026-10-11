// Browser-Test (Playwright, Chromium, iPhone-Größe): Startseite, alle Trainer, Offline-Betrieb.
// Startet einen eigenen kleinen Server für app/ und prüft, dass keine Fehler auftreten
// und keine Anfrage an fremde Server geht.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml',
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
    await page.waitForSelector('#w-name-in');
    assert((await page.title()).includes('Lernwelt'), 'Titel fehlt');
  });
  await step('Ohne Namen geht es nicht weiter', async () => {
    assert(await page.locator('#w-go').isHidden(), 'Start-Knopf ohne Namen sichtbar');
    await page.fill('#w-name-in', ' x ');
    await page.click('#w-name button[type=submit]');
    assert((await page.getAttribute('#w-name-in', 'aria-invalid')) === 'true', 'Fehler nicht markiert');
    assert(await page.locator('#dash').isHidden(), 'Übersicht trotz fehlendem Namen');
  });
  await step('Name eingeben öffnet die Übersicht', async () => {
    await page.fill('#w-name-in', '  Alex   Muster ');
    await page.click('#w-name button[type=submit]');
    await page.waitForSelector('#dash:not([hidden])');
    assert((await page.textContent('#ls-name')) === 'Alex Muster', 'Name nicht übernommen');
    assert((await page.textContent('#greet')).endsWith(', Alex Muster'), 'Gruß ohne Namen');
  });
  const n = await page.locator('#dash button:has-text("Öffnen")').count();
  await step('Logos in Startseite und Übersicht laden und sind rund', async () => {
    await page.waitForFunction(() => [...document.querySelectorAll('#welcome img, #dash img')].every((i) => i.complete));
    const bad = await page.$$eval('#welcome img, #dash img', (is) => is.filter((i) => !i.naturalWidth || (i.offsetWidth && Math.abs(i.offsetWidth - i.offsetHeight) > 1)).map((i) => i.className + ' ' + i.offsetWidth + 'x' + i.offsetHeight + (i.naturalWidth ? '' : ' (lädt nicht)')));
    assert(!bad.length, bad.join(', '));
  });
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
  await step('Willkommensfenster in Gruppenführer und Zugführer gleich (eingebettet und direkt)', async () => {
    const p2 = await ctx.newPage();
    for (const f of ['gruppenfuehrer', 'zugfuehrer']) {
      await p2.goto(base + 'apps/' + f + '.html');
      await p2.waitForSelector('.wl-card', { timeout: 5000 }).catch(() => {});
      assert((await p2.locator('.wl-card').count()) === 1, f + ': kein Willkommensfenster direkt');
      await p2.goto(base + 'index.html');
      await p2.evaluate((src) => { const i = document.createElement('iframe'); i.id = 'wt'; i.src = src; i.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:99'; document.body.appendChild(i); }, base + 'apps/' + f + '.html');
      const fr = await (await p2.waitForSelector('#wt')).contentFrame();
      await fr.waitForSelector('.wl-card', { timeout: 5000 }).catch(() => {});
      assert((await fr.locator('.wl-card').count()) === 1, f + ': kein Willkommensfenster eingebettet');
    }
    await p2.close();
  });
  await step('Einstellungen in der Übersicht gelten für beide Fragen-Trainer', async () => {
    assert((await page.locator('#picks').count()) === 0, 'Direkteinstieg noch vorhanden');
    await page.click('#set-goal button[data-goal="20"]');
    assert((await page.getAttribute('#set-goal button[data-goal="20"]', 'aria-pressed')) === 'true', 'Auswahl nicht markiert');
    for (const i of [0, 1]) {
      await page.locator('#dash button:has-text("Öffnen")').nth(i).click();
      await page.waitForSelector('#mod:not([hidden])');
      await page.waitForTimeout(1200);
      const fr = page.frames().filter((f) => f.url().includes('/apps/')).pop();
      await fr.waitForSelector('.wl-card, #main, #app', { timeout: 5000 });
      assert((await fr.locator('#l-goal').count()) === 0, 'Trainer zeigt eigene Einstellung eingebettet');
      await page.click('#m-home');
      await page.waitForSelector('#dash:not([hidden])');
    }
    const st = await page.evaluate(() => ({ g: JSON.parse(localStorage.getItem('lernkompass-tagestraining-v1')).goal, z: JSON.parse(localStorage.getItem('zf4tt.state.v1')).set.size }));
    assert(st.g === 20 && st.z === 20, 'Rundengröße nicht übernommen: ' + JSON.stringify(st));
  });
  await step('Service Worker aktiv', async () => {
    const ok = await page.evaluate(async () => { const r = await navigator.serviceWorker.ready; return !!r.active; });
    assert(ok, 'kein aktiver Service Worker');
  });
  await step('Offline nutzbar', async () => {
    await page.reload();
    await page.waitForFunction(() => !!navigator.serviceWorker.controller);
    await ctx.setOffline(true);
    await page.reload();
    await page.waitForSelector('#w-go:not([hidden])');
    await ctx.setOffline(false);
  });
  await step('Name bleibt nach Neustart, Formular erscheint nicht erneut', async () => {
    assert(await page.locator('#w-name').isHidden(), 'Namensformular erneut sichtbar');
  });
  await step('Lernstand sichern und auf neuem Gerät wiederherstellen', async () => {
    await page.click('#w-go');
    await page.evaluate(() => localStorage.setItem('bt-fwdv3', JSON.stringify({ sc: { probe: { n: 2, best: 80 } }, quiz: 7 })));
    const [dl] = await Promise.all([page.waitForEvent('download'), page.click('[data-ls="export"]')]);
    const file = await dl.path();
    assert(/^FwMG-Lernstand-Alex-Muster-\d{4}-\d{2}-\d{2}\.json$/.test(dl.suggestedFilename()), 'Dateiname: ' + dl.suggestedFilename());
    const neu = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const p2 = await neu.newPage();
    p2.on('pageerror', (e) => errors.push('Skriptfehler (Gerät 2): ' + e.message));
    await p2.goto(base);
    await p2.fill('#w-name-in', 'Neu');
    await p2.click('#w-name button[type=submit]');
    p2.once('dialog', (d) => d.accept());
    await p2.setInputFiles('#ls-file', file);
    await p2.waitForFunction(() => /wiederhergestellt/.test(document.getElementById('ls-msg').textContent));
    const bt = await p2.evaluate(() => JSON.parse(localStorage.getItem('bt-fwdv3') || '{}'));
    assert(bt.quiz === 7, 'Befehlstrainer-Stand nicht übernommen');
    assert((await p2.textContent('#ls-name')) === 'Alex Muster', 'Name nicht übernommen');
    p2.once('dialog', (d) => d.accept());
    await p2.setInputFiles('#ls-file', { name: 'x.json', mimeType: 'application/json', buffer: Buffer.from('{"app":"anders"}') });
    await p2.waitForFunction(() => /keine Sicherung/.test(document.getElementById('ls-msg').textContent));
    await neu.close();
  });
  await step('Keine Anfragen an fremde Server', async () => assert(!foreign.length, foreign.join(', ')));
  await step('Keine Fehler im Browser', async () => assert(!errors.length, errors.join(' | ')));
} finally {
  await browser.close();
  server.close();
}
console.log(failed ? `${failed} Test(s) fehlgeschlagen` : 'OK: Browser-Test bestanden');
process.exit(failed ? 1 : 0);
