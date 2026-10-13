// Prüft die Fragen-Dateien in app/data/: gültiges JSON, eindeutige IDs, Antworten verweisen auf vorhandene Optionen.
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

console.log(bad ? `${bad} Problem(e) in den Fragen` : `OK: ${g.qs.length} Gruppenführer-Fragen, ${z.length} Zugführer-Fragen`);
process.exit(bad ? 1 : 0);
