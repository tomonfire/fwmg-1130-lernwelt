# Projektbeschreibung: FwMG - Lernwelt

## Kurzbeschreibung
Die FwMG - Lernwelt ist eine Lern- und Trainingsapp für Führungskräfte der Feuerwehr. Sie bündelt drei Trainer an einem Ort und läuft als installierbare Web-App auf dem Smartphone, auch ohne Netz.

## Hintergrund und Ziel
Wer sich auf Führungslehrgänge (Gruppenführer, Zugführer) vorbereitet, muss viel Stoff regelmäßig wiederholen und Befehle nach FwDV 3 sicher sprechen können. Ziel der App:
- täglich in kurzer Zeit üben statt einmalig pauken (Tagesrunden mit Wiederholungsabständen),
- Prüfungssituationen vorab simulieren,
- Befehle nach Schema trainieren und auswerten,
- alles auf dem Telefon verfügbar haben, ohne Anmeldung und ohne Datenweitergabe.

## Zielgruppe
Feuerwehrangehörige in der Ausbildung oder Vorbereitung auf Führungslehrgänge, besonders in Nordrhein-Westfalen. Die Apps wurden zuerst für die Einheit Stadtmitte der Freiwilligen Feuerwehr Mönchengladbach gebaut und werden frei weitergegeben.

## Funktionsumfang

| Bereich | Funktionen |
| --- | --- |
| Startseite und Dashboard | Begrüßung, Übersicht der Trainer mit Lernstand, Direkteinstieg in Bereiche, „Weitermachen“ bei offener Runde |
| Gruppenführer Tagestraining | 408 Fragen in 11 Themengebieten, Tagesrunde, Themen-Test, Prüfung, Fortschritt, Quellen |
| Zugführer Tagestraining | 369 Fragen in 4 Kapiteln, Tagesrunde, Prüfung (15 min), Fortschritt, Quellen |
| Befehlstrainer FwDV 3 | Befehle sprechen, Quiz, Befehlsschema, Auswertung der eigenen Befehle |
| Querschnitt | Hell/Dunkel, iPhone-optimiert, Offline, einheitliche Farblogik (grün richtig, rot falsch, orange übersehen) |

## Abgrenzung
- **Keine offizielle App** der Feuerwehr Mönchengladbach oder der Stadt.
- **Kein Ersatz** für Lehrgangsunterlagen, FwDV und Prüfungsrichtlinien.
- **Ohne Gewähr** für Richtigkeit, Vollständigkeit und Aktualität.
- Mit Unterstützung von KI erstellt; Inhalte gegen offizielle Quellen prüfen.

## Technik in Kürze
Statische Web-App (HTML, CSS, JavaScript), kein Server, kein Build-Schritt. Lernstand nur lokal im Browser. Veröffentlichung über GitHub Pages. Details: [Architektur](ARCHITEKTUR.md).

## Beteiligte
- Idee, Fachinhalt, Pflege: Tom Wolff, Freiwillige Feuerwehr Mönchengladbach, Einheit Stadtmitte
- Umsetzung mit Unterstützung von Claude (Anthropic)

## Stand
Version 1.0.0 (11.10.2026). Siehe [Änderungsprotokoll](../CHANGELOG.md) und [Roadmap](ROADMAP.md).
