# FwMG - Lernwelt

Statische PWA ohne Build-Schritt. Struktur und Befehle stehen in `README.md`, Hintergrund in `docs/`.
Code liegt ausschließlich in `app/`; `docs/`, `scripts/` und `.github/` erklären oder prüfen ihn.

## Regeln
- Sprache der App und der Texte: Deutsch (Du-Form), deutsches Datums- und Zahlenformat.
- Das Impressum (Footer `fwmg-imp` in `app/index.html` und in jeder Datei unter `app/apps/`) bleibt in allen vier Dateien inhaltlich identisch: keine offizielle App der Feuerwehr Mönchengladbach, keine Gewähr, KI-Hinweis, Kontakt.
- Farblogik in allen Trainern gleich: grün = richtig, rot = falsch, orange = übersehen / fehlt / nicht beantwortet (`--ok`, `--bad`, `--miss`).
- Reihenfolge der Trainer überall: Gruppenführer, Zugführer, Befehlstrainer (`ORDER` in `app/index.html`).
- localStorage-Schlüssel nie umbenennen, sonst geht der Lernstand der Nutzer verloren: `zf4tt.state.v1`, `zf4tt.local.v1`, `lernkompass-tagestraining-v1`, `lernkompass-tagestraining-session`, `bt-fwdv3`, `lzf.last.v1`.
- Nach Änderungen an App-Dateien `VERSION` in `app/sw.js` erhöhen und `npm run check` ausführen.
- Farben als Tokens, Hell/Dunkel über `prefers-color-scheme` und `[data-theme]`.
- Mobile zuerst (iPhone): Safe-Area-Abstände beachten, mitscrollende Leisten brauchen den Abdeckstreifen (`::before`).
