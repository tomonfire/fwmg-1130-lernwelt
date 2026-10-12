# Architektur

## Überblick

```
Browser
 └─ app/index.html (Shell)
     ├─ Startseite (#welcome)
     ├─ Dashboard (#dash)
     └─ Trainer-Ansicht (#mod): Leiste + iframe je Trainer
         ├─ app/apps/gruppenfuehrer.html
         ├─ app/apps/zugfuehrer.html
         └─ app/apps/befehlstrainer.html
app/sw.js: Offline-Cache für alle Dateien
```

Die Infrastruktur als Bild (GitHub, Actions, Pages, Gerät mit Service Worker und localStorage): [infrastruktur.excalidraw](infrastruktur.excalidraw). Datei in excalidraw.com öffnen (Menü → Öffnen). Nach Änderungen das Bild `infrastruktur.png` (in der README) mit `node scripts/render-excalidraw.mjs` neu erzeugen.

Jede App-Datei ist eigenständig (HTML, CSS, JavaScript) und lädt ihre Fragen beim Start aus `app/data/*.json` (Gruppenführer und Zugführer). Die Fragen lassen sich so ohne Code pflegen; `npm run check` prüft IDs und Antwort-Indizes. Die Shell bettet sie nur ein. Das hält die Trainer unabhängig: Änderungen an einem berühren die anderen nicht.

## Die Shell

- `MODS` (in `app/index.html`) beschreibt jeden Trainer: Kennung, Datei, Namen, Kennzahlen.
- `ORDER` legt die Reihenfolge fest (Gruppenführer, Zugführer, Befehlstrainer).
- Einstellungen: Die Übersicht schreibt `fwmg.settings.v1` (`{goal, t}`). Gruppenführer und Zugführer übernehmen den Wert beim Start, wenn `t` neuer ist als ihr eigener Zeitstempel (`gu` bzw. `set.t`). Beim Ändern verwirft die Shell geladene Trainer-Rahmen, damit sie neu starten; Runden und Prüfungen liegen im Speicher und bleiben erhalten. Neue Einstellungen werden hier ergänzt und in den Trainern eingelesen.
- Fortschrittsanzeige: `progress()` liest den gespeicherten Stand der Trainer (nur lesend).
- „Weitermachen“: `hasOpen()` prüft, ob im zuletzt geöffneten Trainer eine Runde oder Prüfung offen ist.
- Im Trainer erkennt eine Klasse `emb` am `<html>`, dass die Seite eingebettet läuft: das Impressum der Trainer ist dort ausgeblendet; das Willkommensfenster erscheint in Gruppenführer und Zugführer gleich, eingebettet wie direkt, die Leisten sitzen ganz oben.

## Gespeicherte Daten (localStorage)

| Schlüssel | Inhalt | Besitzer |
| --- | --- | --- |
| `zf4tt.state.v1` | Lernstand je Frage, Verlauf | Zugführer |
| `zf4tt.local.v1` | laufende Runde oder Prüfung | Zugführer |
| `lernkompass-tagestraining-v1` | Lernstand, laufende Prüfung | Gruppenführer |
| `lernkompass-tagestraining-session` | laufende Tagesrunde | Gruppenführer |
| `bt-fwdv3` | Szenarien, Quiz, Verlauf | Befehlstrainer |
| `lzf.last.v1` | zuletzt geöffneter Trainer | Shell |
| `fwmg.name.v1` | Name (Pflicht beim ersten Start) | Shell |
| `fwmg.settings.v1` | Einstellungen für alle Trainer (`{goal, t}`) | Shell |

**Sichern/Wiederherstellen:** Die Shell schreibt alle Schlüssel aus `KEYS` als JSON-Datei (`{app:"fwmg-lernwelt", format:1, name, saved, data}`) und liest sie wieder ein. Vor dem Einlesen schließt sie die Trainer-Rahmen, weil diese beim Schließen speichern und sonst den wiederhergestellten Stand überschreiben würden.

Diese Schlüssel nie umbenennen. Sonst verlieren Nutzer ihren Lernstand. Änderungen am Datenformat nur abwärtskompatibel.

## Farblogik

`--ok` grün (richtig), `--bad` rot (falsch), `--miss` orange (übersehen, fehlt, nicht beantwortet). Alle Farben sind Tokens mit Hell- und Dunkelwerten.

## Offline

`app/sw.js` legt alle Dateien beim Installieren in den Cache (`VERSION`). Eigene Dateien: Cache zuerst, im Hintergrund aktualisieren. Schriften liegen in `app/fonts/` und werden mit vorgeladen; die App ruft keine fremden Server auf. Übernimmt eine neue Fassung die Seite, zeigt die Shell den Hinweis „Neue Version verfügbar“.

## Herkunft der Artefakt-Funktionen

Die Dateien enthalten noch Code für Funktionen der Claude-Umgebung (`window.claude`: Cloud-Speicher `db`, Nutzer `user`, KI `sample`). Außerhalb davon ist `window.claude` nicht vorhanden. Der Code fragt das ab und läuft ohne diese Funktionen weiter.

## Mögliche nächste Schritte

- Eigene KI-Rückmeldung über ein Backend.
- Automatisierte Browser-Tests (Playwright) für Dashboard und Einstellungen.
