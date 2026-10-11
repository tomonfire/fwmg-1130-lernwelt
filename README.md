# FwMG - Lernwelt

Lern- und Trainingsapp für die Feuerwehr. Drei Trainer an einem Ort, mit Startseite und zentralem Dashboard:

| Trainer | Datei | Inhalt |
| --- | --- | --- |
| Gruppenführer Tagestraining | `app/apps/gruppenfuehrer.html` | 408 Fragen in 11 Themengebieten, Tagesrunden, Prüfungs- und Themen-Test |
| Zugführer Tagestraining | `app/apps/zugfuehrer.html` | 369 Fragen in 4 Kapiteln, Tagesrunden, Prüfung (15 min) |
| Befehlstrainer FwDV 3 | `app/apps/befehlstrainer.html` | Befehle nach Schema sprechen, Quiz, Schema, Auswertung |

> **Hinweis:** Dies ist **keine offizielle App der Feuerwehr Mönchengladbach**. Inoffizielles Lernangebot ohne Gewähr, kein Ersatz für die offiziellen Unterlagen. Mit Unterstützung von KI (Claude) erstellt, Inhalte bitte gegen die offiziellen Quellen prüfen. Siehe „Impressum“ in der App.

Erstellt von Tom Wolff, Freiwillige Feuerwehr Mönchengladbach, Einheit Stadtmitte.

## Eigenschaften

- Installierbare Web-App (PWA): auf dem iPhone über „Teilen → Zum Home-Bildschirm“, auf Android und Desktop über „Installieren“.
- Läuft **offline**, nachdem sie einmal geladen wurde (Service Worker).
- Kein Server, keine Anmeldung, kein Build-Schritt: reine statische Dateien. Schriften liegen in `app/fonts/`, die App ruft keine fremden Server auf.
- Der Lernstand wird **nur lokal im Browser** des Geräts gespeichert (`localStorage`). Jeder Trainer hat eigene Schlüssel.
- Heller und dunkler Modus folgen dem Gerät.

## Dokumentation

- [Projektbeschreibung](docs/PROJEKTBESCHREIBUNG.md): Ziel, Zielgruppe, Funktionen, Abgrenzung
- [Architektur](docs/ARCHITEKTUR.md)
- [Veröffentlichung](docs/VEROEFFENTLICHUNG.md)
- [Roadmap](docs/ROADMAP.md)
- [Mitarbeiten](CONTRIBUTING.md), [Änderungsprotokoll](CHANGELOG.md), [Sicherheit](SECURITY.md)

## Projektstruktur

```
app/                       alles, was veröffentlicht wird
  index.html               Shell: Startseite, Dashboard, lädt die Trainer als iframes
  apps/                    die drei Trainer, je eine eigenständige HTML-Datei
  manifest.webmanifest     PWA-Metadaten
  sw.js                    Service Worker (Offline-Cache)
  icons/                   App-Icons
  fonts/                   Schriften (lokal, SIL Open Font License)
docs/                      Projektbeschreibung, Architektur, Veröffentlichung, Roadmap
scripts/                   Prüfskripte (Dateien, JavaScript-Syntax)
.github/                   CI, Veröffentlichung, Vorlagen
CHANGELOG.md  CLAUDE.md  CONTRIBUTING.md  SECURITY.md
```

Faustregel: **Code liegt in `app/`, alles andere erklärt oder prüft ihn.**

Die Shell öffnet jeden Trainer in einem iframe und springt über die Tabs (`Heute`, `Führung`, `Fortschritt`, `Quellen`, `Üben`, `Quiz`, `Schema`, `Auswertung`) direkt in den gewählten Bereich. Werden Tab-Beschriftungen in einem Trainer umbenannt, muss `MODS` in `app/index.html` angepasst werden.

## Lokal starten

```bash
npm start        # http://localhost:8080
npm run check    # Dateien prüfen
```

Alternativ: `python3 -m http.server 8080`. Ein Server ist nötig, weil der Service Worker nicht über `file://` läuft.

## Veröffentlichen (GitHub Pages)

Öffentliche Adresse: **https://tomonfire.github.io/fwmg-1130-lernwelt/**

1. Repository-Einstellungen → **Pages** → Quelle **GitHub Actions** (einmalig).
2. Jeder Push auf `main` veröffentlicht die App automatisch (`.github/workflows/pages.yml`).

Details in [Veröffentlichung](docs/VEROEFFENTLICHUNG.md).

## Änderungen ausliefern

Nach Änderungen an App-Dateien in `app/sw.js` die Konstante `VERSION` erhöhen (`fwmg-lernwelt-v3` …), damit installierte Geräte die neue Fassung laden.

## Herkunft und Einschränkungen

Die Apps wurden zuerst als Claude-Artefakte entwickelt. In dieser Fassung stehen deren Zusatzfunktionen nicht zur Verfügung und werden übersprungen:

- **Geräteübergreifender Lernstand** (Cloud-Speicher): ohne Backend nicht vorhanden, der Lernstand liegt nur lokal.
- **KI-Rückmeldung im Befehlstrainer**: ohne KI-Anbindung zeigt der Trainer die regelbasierte Auswertung. Eine eigene Anbindung (z. B. über ein Backend mit API-Schlüssel) müsste in `app/apps/befehlstrainer.html` ergänzt werden. API-Schlüssel gehören nie in den Browser-Code.

Quellen der Fragen: Lernkompass des Instituts der Feuerwehr NRW, FwDV 100, FwDV 3 und weitere (jeweils in der App unter „Quellen“).

## Lizenz

Noch nicht festgelegt. Ohne Lizenz gilt „alle Rechte vorbehalten“. Die Fragen und Inhalte stammen teils aus fremden Quellen; vor einer öffentlichen Weitergabe bitte Rechte klären.
