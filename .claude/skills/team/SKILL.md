---
name: team
description: "Arbeitet eine Aufgabe an der Lernwelt als kleines Team ab: Plan, parallele Umsetzung durch Subagenten, unabhängiges Review, Prüfungen, Commit. Trigger: /team <Aufgabe>."
---

# /team

Der Nutzer hat mit `/team <Aufgabe>` ausdrücklich ein Team aus Subagenten angefordert. Du leitest es, setzt selbst um, wo es schneller geht, und verantwortest das Ergebnis.

## Ablauf

1. **Verstehen.** `CLAUDE.md`, `README.md` und die betroffenen Stellen lesen (bei Bedarf `graphify query`). Aufgabe in 2–5 unabhängige Teilaufgaben zerlegen. Ist die Aufgabe klein (eine Datei, wenige Zeilen), ohne Team direkt erledigen.
2. **Umsetzen.** Unabhängige Teilaufgaben parallel an Subagenten (`Agent`, `general-purpose`) geben, jede mit:
   - genauem Ziel und betroffenen Dateien,
   - den einschlägigen Regeln aus `CLAUDE.md` (Du-Form, Farblogik `--ok`/`--bad`/`--miss`, gleiche Reiter in GF- und ZF-Coach, Speicherschlüssel nie umbenennen, `esc()`, keine Inline-Handler, Mobile zuerst),
   - dem Hinweis, nicht zu committen und keine anderen Dateien anzufassen.
   Teilaufgaben, die dieselbe Datei ändern, nicht parallel vergeben.
3. **Review.** Einen frischen Subagenten den gesamten Diff (`git diff`) gegen `CLAUDE.md` prüfen lassen: Fehler, Regelverstöße, fehlende Gegenstücke (GF/ZF, `KEYS`, `NEU`). Berechtigte Funde selbst beheben.
4. **Abschließen** (immer selbst, nicht delegieren):
   - `VERSION` in `app/sw.js` erhöhen, wenn App-Dateien geändert wurden,
   - nach Änderungen an Inline-Skripten `npm run csp:update`,
   - neue Funktion für Nutzer: `NEU`/`NEU_ALT` (Grenze `NEU_ALT_MAX`) und `docs/RELEASE-NOTES.md`; technische Notiz in `CHANGELOG.md`,
   - `npm run check` muss grün sein; bei Oberflächenänderungen im Browser in iPhone-Größe ansehen (`npm start`, Playwright mit `executablePath` des vorinstallierten Chromium),
   - `graphify update .`,
   - committen und auf den Arbeitsbranch pushen. Einen PR nur auf Wunsch des Nutzers anlegen.
5. **Bericht** an den Nutzer auf Deutsch: was geändert ist, wie geprüft, was offen bleibt.
