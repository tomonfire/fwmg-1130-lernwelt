# 0002 Freitext und Fallbeispiel üben (A-23)

## Ziel

Lernende üben neben dem Ankreuzen auch das freie Formulieren, wie es Facharbeit, Fallbeispiel und mündliche Prüfung verlangen. Sie tippen eine eigene Antwort, vergleichen sie danach selbst mit einer Musterlösung in Stichpunkten; das ist eine gekennzeichnete Ergänzung mit eigenem Lernstand, getrennt vom Katalog.

## User Stories

1. Als Lehrgangsteilnehmer möchte ich eine offene Frage oder ein kurzes Fallbeispiel in eigenen Worten beantworten, damit ich mich auf die schriftlichen und mündlichen Prüfungsteile vorbereite.
2. Als Lehrgangsteilnehmer möchte ich je Stichpunkt der Musterlösung markieren „hatte ich“ oder „fehlte“, damit ich ehrlich sehe, was mir fehlt.
3. Als Lehrgangsteilnehmer möchte ich im Fortschritt sehen, wie viele Aufgaben ich bearbeitet habe, ohne dass das meine Katalogstatistik verändert.

## Akzeptanzkriterien

1. **Platzierung:** Given GF- oder ZF-Coach, When ich den Reiter „Heute“ öffne, Then gibt es den Abschnitt „Freitext und Fallbeispiel“ mit Badge „Ergänzung“ an gleicher Stelle in beiden Coaches; es entstehen keine neuen Reiter.
2. **Ablauf:** Given eine Aufgabe, When ich eine Antwort tippe und „Musterlösung zeigen“ wähle, Then bleibt meine Antwort sichtbar und darunter erscheinen die Stichpunkte mit Fundstelle. „Musterlösung zeigen“ geht auch mit leerem Feld.
3. **Selbstabgleich:** Given die Musterlösung, When ich je Stichpunkt „hatte ich“ oder „fehlte“ wähle, Then wird er in `--ok` bzw. `--miss` markiert; beim Abschließen gelten nicht markierte Stichpunkte als „fehlte“ (`--miss`). Es gibt keine automatische Bewertung des Textes.
4. **Tastatur:** Given iPad oder Computer, When die Stichpunkte sichtbar sind, Then schaltet Ziffer n Stichpunkt n zwischen „hatte ich“ und „fehlte“ um (`kb`, `app/tastatur.js`); Hauptknöpfe stehen in `.actions.dock`. Im Textfeld lösen Ziffern nichts aus.
5. **Ergebnis:** Given ich schließe ab, Then sehe ich „x von y Stichpunkten“ und kann die nächste Aufgabe oder dieselbe noch einmal wählen.
6. **Eigener Lernstand:** Given ich habe Aufgaben bearbeitet, When ich „Fortschritt“ öffne, Then steht dort eine eigene Zeile „Freitext und Fallbeispiel: n von N bearbeitet“; Katalog-Quote, Tagesziel und Lernstand der Katalogfragen bleiben unverändert.
7. **Trennung:** Given Tagesrunde, Kapitelrunde, Übungsfragen-Runden und Prüfung, When sie gestartet werden, Then enthalten sie nie Freitext-Aufgaben; die Fragendateien des Katalogs bleiben unverändert.
8. **Umfang:** Given die Daten, Then gibt es mind. 10 Aufgaben je Coach, davon mind. 3 Fallbeispiele je Coach; jede Aufgabe hat eine Fundstelle aus der Wissensbasis (Datei und Seite in der Prüfliste in `docs/QUELLEN.md`), eigene Formulierung, keine Orte, Personen oder Einheiten.
9. **Check:** Given `npm run check` (`scripts/data.mjs`), Then werden geprüft: eindeutige `id` mit Präfix `ft-gf-`/`ft-zf-`, `typ` ist „frage“ oder „fall“, `t` und `f` nicht leer, `p` mit 2 bis 8 nicht leeren Strings, `lage` Pflicht bei „fall“, mind. 10 Aufgaben je Coach.
10. **Speichern:** Given ich schließe eine Aufgabe ab, Then wird nur das Ergebnis gespeichert (Datum, x, y), nicht der getippte Text; kein neuer localStorage-Schlüssel, Sichern/Wiederherstellen enthält den Stand.
11. **Pflicht-Nacharbeit:** Ausgabe aller Texte über `esc()`, keine Inline-Handler, `npm run csp:update`, `VERSION`, `NEU`, `docs/RELEASE-NOTES.md`, `docs/ARCHITEKTUR.md`; `npm run check` grün.

## Nicht im Umfang

- Automatische oder KI-Bewertung des Textes, Speichern der Antworttexte, Wiederholplanung nach Ergebnis.
- Freitext-Aufgaben im Befehlscoach; Wertung in der Prüfung.

## Datenformat

Eigene Datei `app/data/freitext.json`, getrennt von den Katalogdateien:

```json
{ "gf": [ { "id": "ft-gf-1", "typ": "fall",
    "lage": "Kurze Lage in zwei bis drei Sätzen, ohne Ortsbezug.",
    "t": "Welche Gefahren erkennst du und was ordnest du zuerst an?",
    "p": ["Menschen vor Sachwerten", "Atemschutz und Sicherheitstrupp", "Lagemeldung absetzen"],
    "f": "FwDV 3, 5.2.1; FwDV 100, 3.3" } ],
  "zf": [ ] }
```

Lernstand je Coach als neues Teilobjekt `ft` im bestehenden Schlüssel (`lernkompass-tagestraining-v1` bzw. `zf4tt.state.v1`), z. B. `"ft": { "ft-gf-1": { "d": "2026-10-13", "x": 2, "y": 3 } }`; ältere Stände ohne `ft` laden fehlerfrei.

## UI/UX-Hinweise

Mobil zuerst: Textfeld mindestens 5 Zeilen, wächst mit; Stichpunkte als Liste mit zwei Knöpfen je Zeile, Farbe nur zusammen mit Text („hatte ich“/„fehlte“). Fallbeispiele zeigen die Lage abgesetzt über der Frage. Gleicher Aufbau in GF und ZF.

## Annahmen & offene Fragen

- Annahme: Ein Teilobjekt im vorhandenen Schlüssel genügt; ein neuer Schlüssel wäre nicht nötig.
- Annahme: Themen GF: FwDV 3, 7, 100, 500, BHKG; ZF: FwDV 100 (Führungsstufen, Raumordnung), FwDV 3 (Zug), BHKG Einsatzleitung, B2-330.

## Aufteilung

1. **senior-developer:** Datei, Laden, Check in `scripts/data.mjs`, Lernstand `ft`, Fortschrittszeile, Ausschluss aus allen Runden, `sw.js` (Datei in den Cache, `VERSION`), CSP.
2. **ui-ux-experte:** Ansicht in GF und ZF (Textfeld, Stichpunkte, `dock`, `kb`), Texte, `NEU`, Release Notes.
3. **senior-developer:** 2 × 10 Aufgaben aus dem Volltext formulieren, Prüfliste in `docs/QUELLEN.md`.
