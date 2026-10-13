// Prüft die Fragen-Dateien in app/data/: gültiges JSON, eindeutige IDs, Antworten verweisen auf vorhandene Optionen, Fundstelle (f) nur als kurzer Text an Katalogfragen.
// Dazu freitext.json (Ergänzung, getrennt vom Katalog): Aufgaben mit Stichpunkten und Fundstelle, mind. 10 je Coach.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

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

// Befehlscoach: Fahrzeugkürzel nur aus der DIN-FNFW-Feuerwehrfahrzeug-Typenliste (25. Fassung, 26.10.2023) oder neutral
// („Löschfahrzeug“); Lagen mit `rb` (Realbrand-Kasten) brauchen Stichpunkte und Quelle; Ergänzung (`ext`) nur an neuen Lagen.
const TYPENLISTE = ['TSF', 'TSF-W', 'KLF', 'MLF', 'LF 10', 'HLF 10', 'LF 20', 'HLF 20', 'LF 20 KatS', 'TLF 2000', 'TLF 3000', 'TLF 4000',
  'DLK 12', 'DLK 18', 'DLK 23', 'DLAK 12/9', 'DLAK 18/12', 'DLAK 23/12', 'TGM 18/12', 'TGM 23/12', 'WLF', 'RW', 'GW-G', 'GW-L1', 'GW-L2', 'KdoW', 'ELW 1', 'ELW 2'];
// Kürzel, die als Fahrzeug gelten könnten (auch veraltete wie SW 2000, LF 16/12, DL 23-12), mit optionaler Typzahl und Zusatz.
const FZ = /(?<![\wÄÖÜäöüß-])(?:HLF|TLF|MLF|KLF|TSF-W|TSF|LF|DLAK|DLK|DLA\s?\(K\)|DLA|DL|TGM|WLF|RW|GW-[A-Z0-9ÄÖÜ]+|GW|ELW|KdoW|SW|MTF|MTW|VRW|ULF|RTW|NEF|KTW|MZF|LHF|TroLF|GTLF|GTLF|SLF|FLF|LKW)(?:\s\d+(?:[/-]\d+)*(?:\s?KatS)?|\s?\d+(?:[/-]\d+)*)?(?![\wÄÖÜäöüß])/g;
const bt = readFileSync('app/apps/befehlstrainer.html', 'utf8');
const unbekannt = new Set();
for (const m of bt.matchAll(FZ)) {
  const k = m[0].replace(/\s+/g, ' ').trim();
  if (!TYPENLISTE.includes(k)) unbekannt.add(k);
}
for (const k of unbekannt) fail('Fahrzeugkürzel im Befehlscoach nicht in der Typenliste (DIN-FNFW, 25. Fassung):', k);
{
  const mm = bt.match(/var SCEN = (\[[\s\S]*?\n  \]);\n\n  var QUIZ = (\[[\s\S]*?\n  \]);\n/);
  if (!mm) fail('Befehlscoach: SCEN oder QUIZ nicht gefunden');
  else {
    const RX_R1 = '(1\\.?|eins|ein|erst\\w*)\\s*(c\\s*)?rohr';
    const SCEN = vm.runInNewContext(`(${mm[1]})`, { RX_R1 });
    const QUIZ = vm.runInNewContext(`(${mm[2]})`, {});
    const text = (x) => typeof x === 'string' && x.trim() !== '';
    const sids = new Set();
    for (const sc of SCEN) {
      const wo = `befehlstrainer.html Lage ${sc.id}`;
      if (sids.has(sc.id)) fail('Doppelte Lagen-id:', wo);
      sids.add(sc.id);
      if (sc.ext && sc.role === 'zf') fail('Ergänzung (ext) nur für die Rolle Gruppenführer:', wo);
      if (sc.ext) {
        if (!sc.beur || !text(sc.beur.ok) || !sc.kon || !text(sc.kon.ok)) fail('Ergänzung ohne Beurteilung oder Kontrolle:', wo);
      }
      for (const st of sc.befehle || []) {
        if (!st.f || !st.kw || Object.keys(st.f).sort().join() !== Object.keys(st.kw).sort().join()) fail('Befehl: Felder (f) und Schlüsselwörter (kw) passen nicht zusammen:', `${wo} ${st.name}`);
        for (const [k, v] of Object.entries(st.kw || {})) { try { new RegExp(v, 'i'); } catch { fail('Ungültiges Schlüsselwort (kw):', `${wo} ${st.name} ${k}`); } }
      }
      if ('rb' in sc) {
        const r = sc.rb;
        if (!r || !Array.isArray(r.p) || r.p.length < 2 || r.p.length > 4 || !r.p.every(text)) fail('Realbrand (rb): 2 bis 4 Stichpunkte (p) erwartet:', wo);
        if (!r || !text(r.q)) fail('Realbrand (rb): Quelle (q) fehlt:', wo);
        if (r && text(r.q) && !/Fachempfehlung Brandbekämpfung zur Menschenrettung \(2019\), Abschn\. \d/.test(r.q)) fail('Realbrand (rb): Quelle ohne Abschnitt:', wo);
      }
    }
    for (const id of ['zimmerbrand', 'z-wohnhaus', 'z-halle']) if (!SCEN.some((s) => s.id === id && s.rb)) fail('Lage ohne Realbrand-Kasten (rb):', id);
    if (SCEN.filter((s) => s.ext).length < 3) fail('Weniger als 3 Lagen als Ergänzung (ext)');
    // Staffel: weder Schlauchtrupp noch Melder in den Auswahllisten.
    for (const sc of SCEN.filter((s) => /^staffel/.test(s.id))) {
      for (const st of sc.befehle) for (const l of Object.values(st.f)) if (l.some((o) => /Schlauchtrupp|Melder/.test(o))) fail('Staffel-Lage mit Schlauchtrupp oder Melder in den Auswahllisten:', `${sc.id} ${st.name}`);
    }
    const ergQ = QUIZ.filter((q) => q[5] === true);
    if (ergQ.length < 4) fail(`Befehlscoach-Quiz: nur ${ergQ.length} Ergänzungsfragen zur Menschenrettung nach Realbrand, mind. 4`);
    for (const q of QUIZ) {
      if (!text(q[0]) || !text(q[1]) || !Array.isArray(q[2]) || q[2].length !== 3 || !q[2].every(text) || !text(q[3])) fail('Befehlscoach-Quiz: Frage unvollständig:', String(q[0]).slice(0, 50));
      if (q[5] === true && !/Abschn\. \d/.test(q[3])) fail('Befehlscoach-Quiz: Ergänzungsfrage ohne Fundstelle mit Abschnitt:', q[0].slice(0, 50));
    }
    console.log(`OK: ${SCEN.length} Lagen (${SCEN.filter((s) => s.ext).length} Ergänzung), ${QUIZ.length} Quizfragen (${ergQ.length} Ergänzung), Fahrzeugkürzel nach Typenliste`);
  }
}

console.log(bad ? `${bad} Problem(e) in den Fragen` : `OK: ${g.qs.length} Gruppenführer-Fragen, ${z.length} Zugführer-Fragen, ${ft.gf.length} + ${ft.zf.length} Freitext-Aufgaben`);
process.exit(bad ? 1 : 0);
