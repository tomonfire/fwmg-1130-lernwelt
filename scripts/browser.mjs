// Browser-Test (Playwright, Chromium, iPhone-Größe): Startseite, alle Trainer, Offline-Betrieb.
// Startet einen eigenen kleinen Server für app/ und prüft, dass keine Fehler auftreten
// und keine Anfrage an fremde Server geht.
import { chromium } from 'playwright';
import { serveApp } from './serve.mjs';

const server = await serveApp();
const base = `http://127.0.0.1:${server.address().port}/`;

// HEADED=1: sichtbares Fenster und langsamer, zum Debuggen (VS Code: „Browser-Test debuggen“).
const launch = { ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), ...(process.env.HEADED ? { headless: false, slowMo: 150 } : {}) };
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
    const set = await p2.evaluate(() => JSON.parse(localStorage.getItem('fwmg.settings.v1') || 'null'));
    assert(set && set.goal === 20, 'Einstellung „Fragen pro Runde“ nicht übernommen: ' + JSON.stringify(set));
    assert((await p2.getAttribute('#set-goal button[data-goal="20"]', 'aria-pressed')) === 'true', 'Einstellung in der Übersicht nicht angezeigt');
    p2.once('dialog', (d) => d.accept());
    await p2.setInputFiles('#ls-file', { name: 'x.json', mimeType: 'application/json', buffer: Buffer.from('{"app":"anders"}') });
    await p2.waitForFunction(() => /keine Sicherung/.test(document.getElementById('ls-msg').textContent));
    await neu.close();
  });
  await step('Eingelesene Sicherung führt keinen fremden Code aus', async () => {
    // Präparierte Sicherung: HTML mit Event-Handler in Feldern, die der Befehlstrainer in der Auswertung anzeigt.
    const neu = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const p3 = await neu.newPage();
    let fired = false;
    await p3.exposeFunction('__fremderCode', () => { fired = true; });
    p3.on('dialog', (d) => d.accept());
    await p3.goto(base);
    await p3.fill('#w-name-in', 'Test');
    await p3.click('#w-name button[type=submit]');
    const evil = '<img src=x onerror="window.top.__fremderCode()">';
    const bt = { sc: { container: { n: evil, best: evil, last: evil } }, hist: [{ ts: 1, id: evil, role: 'gf', mode: 'speak', r: evil, t: 2 }], qh: [{ ts: 1, s: evil }], cat: { beur: [evil, 2] }, fld: { x: [evil, 1] }, quiz: evil };
    const file = { app: 'fwmg-lernwelt', format: 1, name: 'Test', saved: new Date().toISOString(), data: { 'bt-fwdv3': JSON.stringify(bt) } };
    await p3.setInputFiles('#ls-file', { name: 'b.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(file)) });
    await p3.waitForFunction(() => /wiederhergestellt/.test(document.getElementById('ls-msg').textContent));
    await p3.locator('#dash button:has-text("Öffnen")').nth(2).click();
    await p3.waitForTimeout(1200);
    const f = p3.frames().find((x) => x.url().includes('befehlstrainer'));
    for (const tab of ['Auswertung', 'Üben', 'Quiz']) {
      await f.locator('.tab, [role=tab]').filter({ hasText: tab }).first().click();
      await p3.waitForTimeout(300);
    }
    await neu.close();
    assert(!fired, 'eingeschleuster Code wurde ausgeführt');
  });
  // Ergänzungen (Fundstelle, Freitext): eigene Seiten im selben Kontext, Daten nur zum Test auf Fragen mit Fundstelle begrenzt.
  const neueSeite = async (pfad, nurMitF) => {
    const p = await ctx.newPage();
    p.on('pageerror', (e) => errors.push('Skriptfehler: ' + e.message));
    if (nurMitF) await p.route('**/data/' + nurMitF, async (r) => {
      const d = JSON.parse(await (await r.fetch()).text());
      const mitF = (qs) => qs.filter((q) => typeof q.f === 'string');
      await r.fulfill({ contentType: 'application/json', body: JSON.stringify(Array.isArray(d) ? mitF(d) : { ...d, qs: mitF(d.qs) }) });
    });
    p.laden = async (u) => {
      await p.goto(base + u);
      await p.waitForTimeout(1200);
      const um = p.getByRole('button', { name: 'Erst mal umschauen' });
      if (await um.count()) await um.click();
    };
    await p.laden(pfad);
    return p;
  };
  await step('Fundstelle („Nachlesen“) erscheint nach der Antwort, nicht während der Prüfung, wieder in der Auswertung (Gruppenführer)', async () => {
    const p = await neueSeite('apps/gruppenfuehrer.html', 'gruppenfuehrer.json');
    await p.locator('[data-act=start]').first().click();
    await p.locator('.opts .opt').first().click();
    await p.locator('[data-act=check]').first().click();
    assert(await p.locator('.fund').count() === 1, 'keine Fundstelle nach der Antwort');
    assert((await p.locator('.fund').textContent()).includes('Nachlesen:'), 'Zeile heißt nicht „Nachlesen“');
    await p.laden('apps/gruppenfuehrer.html');
    await p.locator('[data-act=exstart]').last().click();
    assert(await p.locator('.fund').count() === 0, 'Fundstelle während der Prüfung sichtbar');
    await p.locator('[data-act=egoto]').last().click();
    await p.locator('.actions [data-act=esubmit]').first().click();
    await p.locator('[data-act="esubmit-yes"]').click();
    await p.waitForTimeout(300);
    assert(await p.locator('.fund').count() > 0, 'keine Fundstelle in der Auswertung');
    await p.close();
  });
  await step('Freitext und Fallbeispiel: Musterlösung, Selbstabgleich, Ergebnis (Gruppenführer)', async () => {
    const p = await neueSeite('apps/gruppenfuehrer.html');
    await p.locator('[data-act=ftgo]').first().click();
    await p.fill('#ft-in', 'Testantwort');
    await p.locator('[data-act=ftshow]').click();
    const n = await p.locator('.ftrow').count();
    assert(n >= 2, 'keine Stichpunkte');
    await p.locator('[data-act=ftset][data-v="1"]').first().click();
    await p.locator('[data-act=ftdone]').click();
    assert((await p.locator('#ftres').textContent()).includes(`1 von ${n}`), 'Ergebnis falsch');
    const gespeichert = await p.evaluate(() => Object.values(localStorage).join(''));
    assert(!gespeichert.includes('Testantwort'), 'getippter Text gespeichert');
    await p.close();
  });
  await step('Freitext und Fallbeispiel: Ablauf im Zugführer-Coach', async () => {
    const p = await neueSeite('apps/zugfuehrer.html');
    await p.locator('#ftgo').click();
    await p.fill('#ft-in', 'Testantwort');
    await p.locator('#ftshow').click();
    assert(await p.locator('.ftrow').count() >= 2, 'keine Stichpunkte');
    await p.locator('#ftdone').click();
    assert(/0 von \d+/.test(await p.locator('#ftres').textContent()), 'Ergebnis falsch');
    await p.close();
  });
  await step('Keine Anfragen an fremde Server', async () => assert(!foreign.length, foreign.join(', ')));
  await step('Keine Fehler im Browser', async () => assert(!errors.length, errors.join(' | ')));
} finally {
  await browser.close();
  server.close();
}
console.log(failed ? `${failed} Test(s) fehlgeschlagen` : 'OK: Browser-Test bestanden');
process.exit(failed ? 1 : 0);
