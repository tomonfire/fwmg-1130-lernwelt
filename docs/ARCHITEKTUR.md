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
| `fwmg.lerncode.v1` | Lerncode (falls genutzt) | Shell (`lerncode.js`) |

Diese Schlüssel nie umbenennen. Sonst verlieren Nutzer ihren Lernstand. Änderungen am Datenformat nur abwärtskompatibel.

## Farblogik

`--ok` grün (richtig), `--bad` rot (falsch), `--miss` orange (übersehen, fehlt, nicht beantwortet). Alle Farben sind Tokens mit Hell- und Dunkelwerten.

## Offline

`app/sw.js` legt alle Dateien beim Installieren in den Cache (`VERSION`). Eigene Dateien: Cache zuerst, im Hintergrund aktualisieren. Schriften liegen in `app/fonts/` und werden mit vorgeladen; fremde Adressen (Lerncode-Server) laufen am Cache vorbei. Übernimmt eine neue Fassung die Seite, zeigt die Shell den Hinweis „Neue Version verfügbar“.

## Herkunft der Artefakt-Funktionen

Die Trainer enthalten Code für Funktionen der Claude-Umgebung (`window.claude`: Speicher `db`, Nutzer `user`, KI `sample`). `app/lerncode.js` stellt `db` und `user` mit Supabase dahinter bereit (siehe [LERNCODE.md](LERNCODE.md)); `sample` gibt es nicht, der Befehlstrainer zeigt dann die regelbasierte Auswertung.

## Mögliche nächste Schritte

- Fragen aus den Dateien in eigene JSON-Dateien auslagern.
- Eigene KI-Rückmeldung über ein Backend.
