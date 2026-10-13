// Prüft die Fragen-Dateien in app/data/: gültiges JSON, eindeutige IDs, Antworten verweisen auf vorhandene Optionen, Fundstelle (f) nur als kurzer Text an Katalogfragen.
// Dazu freitext.json (Ergänzung, getrennt vom Katalog): Aufgaben mit Stichpunkten und Fundstelle, mind. 10 je Coach.
import { readFileSync } from 'node:fs';

let bad = 0;
const fail = (...m) => { console.error(...m); bad++; };

function pruefe(datei, fragen, felder, kategorien) {
  const ids = new Set();
  for (const q of fragen) {
    const wo = `${datei} ${q.id}`;
    if (!q.id) { fail('Frage ohne id in', datei); continue; }
    if (ids.has(q.id)) fail('Doppelte id:', wo);
    ids.add(q.id);
    if (typeof q[felder.text] !== 'string' || !q[felder.text].trim()) fail('Fragetext fehlt:', wo);
    const opt = q[felder.opt];
    if (!Array.isArray(opt) || opt.length < 2) fail('Weniger als 2 Antwortoptionen:', wo);
    if (!Array.isArray(q.a) || !q.a.length) fail('Keine richtige Antwort angegeben:', wo);
    else for (const i of q.a) if (!Number.isInteger(i) || i < 0 || i >= (opt || []).length) fail('Antwort-Index außerhalb der Optionen:', wo, i);
    if ('v' in q && (typeof q.v !== 'string' || !q.v.trim())) fail('Hinweis zur Vorschrift (v) muss ein Text sein:', wo);
    // Fundstelle (f): Kurzangabe zur Vorschrift, nur an Katalogfragen (Übungsfragen nennen ihre Fundstelle in x).
    if ('f' in q) {
      if (typeof q.f !== 'string' || !q.f.trim()) fail('Fundstelle (f) muss ein nicht leerer Text sein:', wo);
      else if (q.f.length > 80) fail('Fundstelle (f) länger als 80 Zeichen:', wo);
      if (q.own) fail('Übungsfrage mit Fundstelle (f), die Fundstelle steht dort in x:', wo);
    }
    if (kategorien && !(q[felder.kat] in kategorien) && !(q[felder.kat] >= 0 && q[felder.kat] < kategorien.length)) fail('Unbekannte Kategorie:', wo);
  }
  return ids;
}

const lesen = (f) => JSON.parse(readFileSync(f, 'utf8'));
const g = lesen('app/data/gruppenfuehrer.json');
const gids = pruefe('gruppenfuehrer.json', g.qs, { text: 't', opt: 'o', kat: 'c' }, g.cats);
for (const id of g.chg) if (!gids.has(id)) fail('chg verweist auf unbekannte id:', id);
// Katalog und Ergänzung nicht mischen: Übungsfragen (own) nur in Kategorien „(Übungsfragen)“, mit Erklärung und
// passender Nummer; Katalogfragen nie in solchen Kategorien. chg gilt nur für Katalogfragen.
const uebung = (c) => /\(Übungsfragen\)$/.test(g.cats[c] || '');
for (const q of g.qs) {
  const wo = `gruppenfuehrer.json ${q.id}`;
  if (q.own) {
    if (!uebung(q.c)) fail('Übungsfrage in einer Katalogkategorie:', wo);
    if (typeof q.x !== 'string' || !q.x.trim()) fail('Übungsfrage ohne Erklärung (x):', wo);
    if (!q.id.startsWith(`${q.c + 1}.`)) fail('Nummer passt nicht zur Kategorie:', wo);
  } else if (uebung(q.c)) fail('Katalogfrage in einer Kategorie für Übungsfragen:', wo);
}
for (const id of g.chg) if (g.qs.some((q) => q.id === id && q.own)) fail('chg verweist auf eine Übungsfrage:', id);
// Die App setzt fest voraus: Kategorien 0–9 sind Katalog, Kategorie 10 ist der Reiter Führung, ab 10 nur Übungsfragen.
g.cats.forEach((n, i) => { if ((i >= 10) !== uebung(i)) fail(`Kategorie ${i} „${n}“: Index ab 10 nur für „(Übungsfragen)“, darunter nur Katalog`); });
for (const q of g.qs) if (!q.own && !q.id.startsWith(`${q.c + 1}.`)) fail('Nummer passt nicht zur Kategorie:', `gruppenfuehrer.json ${q.id}`);
const z = lesen('app/data/zugfuehrer.json');
pruefe('zugfuehrer.json', z, { text: 'q', opt: 'o', kat: 'k' }, null);

// Freitext und Fallbeispiel (Ergänzung): eigene Datei, nie Teil von Katalog, Runden oder Prüfung.
const MIN_FT = 10;
const ft = lesen('app/data/freitext.json');
const ftIds = new Set();
for (const [coach, pre] of [['gf', 'ft-gf-'], ['zf', 'ft-zf-']]) {
  const liste = ft[coach];
  if (!Array.isArray(liste)) { fail('freitext.json: Liste fehlt:', coach); continue; }
  if (liste.length < MIN_FT) fail(`freitext.json ${coach}: nur ${liste.length} Aufgaben, mind. ${MIN_FT}`);
  const text = (x) => typeof x === 'string' && x.trim() !== '';
  for (const a of liste) {
    const wo = `freitext.json ${a && a.id}`;
    if (!a || !text(a.id) || !a.id.startsWith(pre)) { fail(`freitext.json: id mit Präfix ${pre} fehlt:`, a && a.id); continue; }
    if (ftIds.has(a.id)) fail('Doppelte id:', wo);
    ftIds.add(a.id);
    if (a.typ !== 'frage' && a.typ !== 'fall') fail('typ muss „frage“ oder „fall“ sein:', wo);
    if (!text(a.t)) fail('Aufgabentext (t) fehlt:', wo);
    if (!text(a.f)) fail('Fundstelle (f) fehlt:', wo);
    if (!Array.isArray(a.p) || a.p.length < 2 || a.p.length > 8 || !a.p.every(text)) fail('Stichpunkte (p): 2 bis 8 nicht leere Texte erwartet:', wo);
    if (a.typ === 'fall' && !text(a.lage)) fail('Fallbeispiel ohne Lage (lage):', wo);
    if (a.typ === 'frage' && 'lage' in a) fail('Lage (lage) nur bei Fallbeispielen:', wo);
  }
  if (liste.filter((a) => a && a.typ === 'fall').length < 3) fail(`freitext.json ${coach}: mind. 3 Fallbeispiele erwartet`);
}

console.log(bad ? `${bad} Problem(e) in den Fragen` : `OK: ${g.qs.length} Gruppenführer-Fragen, ${z.length} Zugführer-Fragen, ${ft.gf.length} + ${ft.zf.length} Freitext-Aufgaben`);
process.exit(bad ? 1 : 0);
