# FwMG - Lernwelt

Statische PWA ohne Build-Schritt. Struktur und Befehle stehen in `README.md`, Hintergrund in `docs/`.
Code liegt ausschließlich in `app/`; `docs/`, `scripts/` und `.github/` erklären oder prüfen ihn.

## Regeln
- Sprache der App und der Texte: Deutsch (Du-Form), deutsches Datums- und Zahlenformat.
- Das Impressum (Footer `fwmg-imp` in `app/index.html` und in jeder Datei unter `app/apps/`) bleibt in allen vier Dateien inhaltlich identisch: private App, keine offizielle App einer Feuerwehr, Stadt oder Behörde, keine Gewähr, Hinweis „Weitergabe ausschließlich durch den Autor“, KI-Hinweis, Kontakt. Die App ist nicht zur freien Weitergabe bestimmt.
- Farblogik in allen Trainern gleich: grün = richtig, rot = falsch, orange = übersehen / fehlt / nicht beantwortet (`--ok`, `--bad`, `--miss`).
- Reihenfolge der Trainer überall: Gruppenführer, Zugführer, Befehlstrainer (`ORDER` in `app/index.html`).
- localStorage-Schlüssel nie umbenennen, sonst geht der Lernstand der Nutzer verloren: `zf4tt.state.v1`, `zf4tt.local.v1`, `lernkompass-tagestraining-v1`, `lernkompass-tagestraining-session`, `bt-fwdv3`, `lzf.last.v1`, `fwmg.name.v1`. Neue Schlüssel in `KEYS` (Sichern/Wiederherstellen in `app/index.html`) aufnehmen.
- Nach Änderungen an App-Dateien `VERSION` in `app/sw.js` erhöhen und `npm run check` ausführen.
- Farben als Tokens, Hell/Dunkel über `prefers-color-scheme` und `[data-theme]`.
- Öffentlicher Betrieb: keine Dateien von fremden Servern laden (Schriften liegen in `app/fonts/`), `noindex`/`no-referrer`/CSP-Meta in allen vier HTML-Dateien behalten, die Adresse der App nirgends im Repository verlinken. `npm run check` prüft das.
- Keine Hinweise auf eine bestimmte Stadt, Feuerwehr oder Einheit in Texten (Name „FwMG“ bleibt). Logo der Lernwelt (Startseite, Übersicht, App-Icons) ist die eigene Flamme `app/icons/flamme.svg`; die Trainer zeigen ihr taktisches Zeichen nach DV 102: `app/icons/gruppenfuehrer.svg` bzw. `app/icons/zugfuehrer.svg`.
- Nur GitHub: kein eigener Server, keine Datenbank, keine Dienste außer GitHub Pages (`connect-src 'self'`).
- Name beim ersten Start ist Pflicht; ohne Namen öffnet die Shell weder Übersicht noch Trainer.
- Mobile zuerst (iPhone): Safe-Area-Abstände beachten, mitscrollende Leisten brauchen den Abdeckstreifen (`::before`).
