# FwMG - Lernwelt

Statische PWA ohne Build-Schritt. Struktur und Befehle stehen in `README.md`, Hintergrund in `docs/`.
Code liegt ausschließlich in `app/`; `docs/`, `scripts/` und `.github/` erklären oder prüfen ihn.

## Regeln
- Sprache der App und der Texte: Deutsch (Du-Form), deutsches Datums- und Zahlenformat.
- Das Impressum (Footer `fwmg-imp` in `app/index.html` und in jeder Datei unter `app/apps/`) bleibt in allen vier Dateien inhaltlich identisch: private App, keine offizielle App einer Feuerwehr, Stadt oder Behörde, keine Gewähr, Hinweis „Weitergabe ausschließlich durch den Autor“, KI-Hinweis, Kontakt. Die App ist nicht zur freien Weitergabe bestimmt.
- Farblogik in allen Trainern gleich: grün = richtig, rot = falsch, orange = übersehen / fehlt / nicht beantwortet (`--ok`, `--bad`, `--miss`).
- In der App heißen die Trainer „Coach“ (z. B. „Deine Coaches“, „Befehlscoach“); Dateinamen, IDs und Speicherschlüssel behalten „trainer“.
- Reihenfolge der Trainer überall: Gruppenführer, Zugführer, Befehlstrainer (`ORDER` in `app/index.html`).
- Reiter im Gruppenführer- und Zugführer-Coach gleich: Heute, Führung, Fortschritt, Quellen. Änderungen immer in beiden Dateien; `npm run check` prüft das.
- localStorage-Schlüssel nie umbenennen, sonst geht der Lernstand der Nutzer verloren: `zf4tt.state.v1`, `zf4tt.local.v1`, `lernkompass-tagestraining-v1`, `lernkompass-tagestraining-session`, `bt-fwdv3`, `lzf.last.v1`, `fwmg.name.v1`, `fwmg.settings.v1`, `fwmg.neu.v1`. Neue Schlüssel in `KEYS` (Sichern/Wiederherstellen in `app/index.html`) aufnehmen; `npm run check` prüft das für die Schlüssel der Shell.
- Nach Änderungen an App-Dateien `VERSION` in `app/sw.js` erhöhen und `npm run check` ausführen. Nach Änderungen an Inline-Skripten `npm run csp:update` (CSP erlaubt Skripte nur per SHA-256-Prüfsumme, kein `'unsafe-inline'`); keine Inline-Event-Handler (`onclick=` usw.) verwenden.
- Gespeicherte oder eingelesene Daten (localStorage, Sicherungsdatei) vor der Ausgabe als HTML auf erwartete Typen prüfen oder mit `esc()` maskieren.
- Farben als Tokens, Hell/Dunkel über `prefers-color-scheme` und `[data-theme]`.
- Öffentlicher Betrieb: keine Dateien von fremden Servern laden (Schriften liegen in `app/fonts/`), `noindex`/`no-referrer`/CSP-Meta in allen vier HTML-Dateien behalten, die Adresse der App nirgends im Repository verlinken. `npm run check` prüft das.
- Keine Hinweise auf eine bestimmte Stadt, Feuerwehr oder Einheit in Texten (Name „FwMG“ bleibt). Logo der Lernwelt (Startseite, Übersicht, App-Icons) ist die eigene Flamme `app/icons/flamme.svg`; die Trainer zeigen ihr taktisches Zeichen nach DV 102: `app/icons/gruppenfuehrer.svg` bzw. `app/icons/zugfuehrer.svg`; der Befehlscoach das Zeichen der gewählten Rolle, ohne Rolle die Flamme. Kopf in allen drei Coaches gleich aufgebaut (`.mast`: Zeichen, Zeile „Führungsausbildung“, Titel, Datum, Version).
- Töne (Alarmgong im Befehlscoach) nur verwürfelt als `.bin` in `app/audio/` ablegen (`node scripts/gong.mjs <datei>`), keine abspielbaren Tondateien ins Repository; `npm run check` prüft das.
- Nur GitHub: kein eigener Server, keine Datenbank, keine Dienste außer GitHub Pages (`connect-src 'self'`). Ausnahme, bewusst entschieden: Sprachfunktionen des Browsers im Befehlscoach (Vorlesen per `speechSynthesis`, „Einsprechen“ per `SpeechRecognition`). Sie starten nur auf Tippen und stehen im Datenschutzteil des Impressums.
- Name beim ersten Start ist Pflicht; ohne Namen öffnet die Shell weder Übersicht noch Trainer.
- Neue Funktionen für Nutzer: `NEU` (Fenster „Was ist neu“ in `app/index.html`, neue `id`, nur die neuen Punkte; die bisherige Ausgabe vorne in `NEU_ALT` verschieben; dort höchstens `NEU_ALT_MAX` Punkte, Überholtes und Ältestes streichen, `npm run check` prüft das) und `docs/RELEASE-NOTES.md` ergänzen.
- Mobile zuerst (iPhone): Safe-Area-Abstände beachten, mitscrollende Leisten brauchen den Abdeckstreifen (`::before`).
- iPad und Computer: Hauptknöpfe in Frage- und Übungsansichten stehen in `.actions.dock` (Leiste unten, Stil in `app/coach.css` für alle Coaches); `kb` ergänzen, wenn Ziffern eine Antwort wählen (`app/tastatur.js`). Hover nur unter `@media (hover:hover) and (pointer:fine)`. Ab 768 px größere Schrift wie in den drei Coaches.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
