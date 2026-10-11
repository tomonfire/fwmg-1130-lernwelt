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

Jede App-Datei ist vollständig eigenständig (HTML, CSS, JavaScript, Fragen) und läuft auch allein. Die Shell bettet sie nur ein. Das hält die Trainer unabhängig: Änderungen an einem berühren die anderen nicht.

## Die Shell

- `MODS` (in `app/index.html`) beschreibt jeden Trainer: Kennung, Datei, Namen, Kennzahlen, Einstiegspunkte.
- `ORDER` legt die Reihenfolge fest (Gruppenführer, Zugführer, Befehlstrainer).
- Direkteinstieg: `clickTab()` wartet, bis der Trainer geladen ist, und klickt den Tab mit passender Beschriftung. Das funktioniert, weil Shell und Trainer dieselbe Herkunft haben.
- Fortschrittsanzeige: `progress()` liest den gespeicherten Stand der Trainer (nur lesend).
- „Weitermachen“: `hasOpen()` prüft, ob im zuletzt geöffneten Trainer eine Runde oder Prüfung offen ist.
- Im Trainer erkennt eine Klasse `emb` am `<html>`, dass die Seite eingebettet läuft: Willkommensfenster und Impressum der Trainer sind dort ausgeblendet, die Leisten sitzen ganz oben.

## Gespeicherte Daten (localStorage)

| Schlüssel | Inhalt | Besitzer |
| --- | --- | --- |
| `zf4tt.state.v1` | Lernstand je Frage, Verlauf | Zugführer |
| `zf4tt.local.v1` | laufende Runde oder Prüfung | Zugführer |
| `lernkompass-tagestraining-v1` | Lernstand, laufende Prüfung | Gruppenführer |
| `lernkompass-tagestraining-session` | laufende Tagesrunde | Gruppenführer |
| `bt-fwdv3` | Szenarien, Quiz, Verlauf | Befehlstrainer |
| `lzf.last.v1` | zuletzt geöffneter Trainer | Shell |

Diese Schlüssel nie umbenennen. Sonst verlieren Nutzer ihren Lernstand. Änderungen am Datenformat nur abwärtskompatibel.

## Farblogik

`--ok` grün (richtig), `--bad` rot (falsch), `--miss` orange (übersehen, fehlt, nicht beantwortet). Alle Farben sind Tokens mit Hell- und Dunkelwerten.

## Offline

`app/sw.js` legt alle Dateien beim Installieren in den Cache (`VERSION`). Eigene Dateien: Cache zuerst, im Hintergrund aktualisieren. Schriften von Google Fonts werden beim ersten Laden mitgespeichert.

## Herkunft der Artefakt-Funktionen

Die Dateien enthalten noch Code für Funktionen der Claude-Umgebung (`window.claude`: Cloud-Speicher `db`, Nutzer `user`, KI `sample`). Außerhalb davon ist `window.claude` nicht vorhanden. Der Code fragt das ab und läuft ohne diese Funktionen weiter.

## Mögliche nächste Schritte

- Eigener Speicher für den Lernstand mit Export und Import als Datei (ohne Server machbar).
- Fragen aus den Dateien in eigene JSON-Dateien auslagern.
- Eigene KI-Rückmeldung über ein Backend.
- Automatisierte Browser-Tests (Playwright) für Dashboard und Direkteinstieg.
