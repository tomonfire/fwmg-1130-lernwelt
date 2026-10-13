# FwMG - Lernwelt

Lern- und Trainingsapp für die Feuerwehr. Drei Trainer an einem Ort, mit Startseite und zentralem Dashboard:

| Trainer | Datei | Inhalt |
| --- | --- | --- |
| Gruppenführer Tagestraining | `app/apps/gruppenfuehrer.html` | 285 Katalogfragen in 10 Themengebieten und 173 Übungsfragen (`app/data/gruppenfuehrer.json`), Tagesrunden, Prüfungs- und Themen-Test |
| Zugführer Tagestraining | `app/apps/zugfuehrer.html` | 369 Fragen (`app/data/zugfuehrer.json`) in 4 Kapiteln, Tagesrunden, Prüfung (15 min) |
| Befehlscoach FwDV 3 | `app/apps/befehlstrainer.html` | Befehle nach Schema sprechen, Quiz, Schema, Auswertung |

> **Hinweis:** Die Weitergabe der App erfolgt **ausschließlich durch den Autor** (Tom Wolff). Dies ist eine **private App** und **keine offizielle App einer Feuerwehr, Stadt oder Behörde**. Inoffizielles Lernangebot ohne Gewähr, kein Ersatz für die offiziellen Unterlagen. Mit Unterstützung von KI (Claude) erstellt, Inhalte bitte gegen die offiziellen Quellen prüfen. Siehe „Impressum“ in der App.

Erstellt von Tom Wolff (privat).

## Eigenschaften

- Installierbare Web-App (PWA): auf dem iPhone über „Teilen → Zum Home-Bildschirm“, auf Android und Desktop über „Installieren“.
- Läuft **offline**, nachdem sie einmal geladen wurde (Service Worker).
- Kein Server, keine Anmeldung, kein Build-Schritt: reine statische Dateien. Schriften liegen in `app/fonts/`, die App ruft keine fremden Server auf.
- Beim ersten Start ist ein **Name Pflicht**; ohne ihn geht es nicht weiter. Er bleibt nur auf dem Gerät.
- Der Lernstand wird **nur lokal im Browser** des Geräts gespeichert (`localStorage`). Jeder Trainer hat eigene Schlüssel.
- **Lernstand sichern / wiederherstellen:** In der Übersicht als Datei sichern und auf einem neuen Gerät wieder einlesen. Kein Server, nur GitHub Pages.
- Heller und dunkler Modus folgen dem Gerät.

## Infrastruktur

![Infrastruktur der Lernwelt: GitHub (Repository, CI, Pages) und Gerät der Nutzer (Shell, Coaches, Service Worker, localStorage)](docs/infrastruktur.png)

Quelle: [`docs/infrastruktur.excalidraw`](docs/infrastruktur.excalidraw). Das PNG entsteht mit `node scripts/render-excalidraw.mjs`.

## Dokumentation

- [Release Notes](docs/RELEASE-NOTES.md): was neu ist, für Nutzer
- [Projektbeschreibung](docs/PROJEKTBESCHREIBUNG.md): Ziel, Zielgruppe, Funktionen, Abgrenzung
- [Architektur](docs/ARCHITEKTUR.md)
- [Veröffentlichung](docs/VEROEFFENTLICHUNG.md)
- [Repository-Einstellungen](docs/REPOSITORY.md)
- [Roadmap](docs/ROADMAP.md)
- [Mitarbeiten](CONTRIBUTING.md), [Änderungsprotokoll](CHANGELOG.md), [Sicherheit](SECURITY.md)

## Projektstruktur

```
app/                       alles, was veröffentlicht wird
  index.html               Shell: Startseite, Dashboard, lädt die Trainer als iframes
  apps/                    die drei Trainer, je eine eigenständige HTML-Datei
  manifest.webmanifest     PWA-Metadaten
  sw.js                    Service Worker (Offline-Cache)
  icons/                   App-Icons, Logo (flamme.svg), taktische Zeichen Gruppen-/Zugführer (DV 102)
  fonts/                   Schriften (lokal, SIL Open Font License)
  audio/                   Alarmgong des Befehlscoachs, nur verwürfelt (gong.bin, erzeugt mit scripts/gong.mjs)
  robots.txt               sperrt Crawler (wirksam auf eigener Domain)
docs/                      Projektbeschreibung, Architektur, Veröffentlichung, Roadmap
scripts/                   Prüfungen (Dateien, Regeln, JavaScript-Syntax, Browser-Test), Werkzeuge
.github/                   CI, Veröffentlichung, Vorlagen
CHANGELOG.md  CLAUDE.md  CONTRIBUTING.md  SECURITY.md
```

Faustregel: **Code liegt in `app/`, alles andere erklärt oder prüft ihn.**

Die Shell öffnet jeden Trainer in einem iframe. Einstellungen für alle Trainer stehen in der Übersicht unter „Einstellungen“ (derzeit: Fragen pro Runde für Gruppenführer und Zugführer). Sie liegen unter dem Schlüssel `fwmg.settings.v1` im Browser; die Trainer lesen sie beim Start, wenn sie neuer sind als ihr eigener Wert. Eingebettet zeigen die Trainer diese Einstellung nicht mehr selbst an.

## Lokal starten

```bash
npm start              # http://localhost:8080 (scripts/serve.mjs, ohne Installation)
npm run check          # Dateien, Regeln, Fragen, Syntax und CSP-Prüfsummen prüfen (ohne Installation)
npm run csp:update     # nach Änderungen an Inline-Skripten: CSP-Prüfsummen neu eintragen
npm install            # einmalig, für den Browser-Test
npm run test:browser   # Startseite, Trainer und Offline-Betrieb im Browser prüfen
```

Alternativ: `python3 -m http.server 8080 -d app`. Ein Server ist nötig, weil der Service Worker nicht über `file://` läuft. Server, die `.html`-Adressen umleiten (z. B. `serve`), sind ungeeignet: Der Service Worker lädt die Coaches dann nicht.

### Debuggen in VS Code

Das Repo bringt fertige Konfigurationen in `.vscode/` mit. Ordner in VS Code öffnen → **Ausführen und Debuggen** (Strg/Cmd+Umschalt+D) → Konfiguration wählen → **F5**:

| Konfiguration | Was passiert |
| --- | --- |
| Lernwelt in Chrome debuggen (iPhone-Größe) | startet `npm start`, öffnet Chrome mit eigenem Profil; Breakpoints in `app/index.html` und `app/apps/*.html` |
| Lernwelt in Edge debuggen | dasselbe mit Microsoft Edge |
| An laufendes Chrome anhängen (Port 9222) | für ein Chrome, das mit `--remote-debugging-port=9222` gestartet wurde |
| Browser-Test debuggen (sichtbares Fenster) | `scripts/browser.mjs` mit sichtbarem, verlangsamtem Browser (`HEADED=1`), Breakpoints im Test |
| Prüfskript debuggen (check.mjs) | Breakpoints in den Repo-Prüfungen |

Unter **Terminal → Aufgabe ausführen** stehen außerdem Start, Prüfen, Browser-Test und CSP-Aktualisierung bereit.

Tipp: Der Service Worker liefert Dateien aus dem Cache. Beim Debuggen in den DevTools unter **Application → Service Workers** „Update on reload“ oder „Bypass for network“ einschalten, sonst sieht man nach Änderungen kurz die alte Fassung.

## Veröffentlichen (GitHub Pages)

Adresse: `https://<benutzer>.github.io/<repository>/` (bewusst nicht verlinkt, siehe [Veröffentlichung](docs/VEROEFFENTLICHUNG.md#nicht-auffindbar)).

1. Repository-Einstellungen → **Pages** → Quelle **GitHub Actions** (einmalig).
2. Jeder Push auf `main` veröffentlicht die App automatisch (`.github/workflows/pages.yml`).

Details in [Veröffentlichung](docs/VEROEFFENTLICHUNG.md).

## Änderungen ausliefern

Nach Änderungen an App-Dateien in `app/sw.js` die Konstante `VERSION` um eins erhöhen (z. B. `fwmg-lernwelt-v5` → `fwmg-lernwelt-v6`), damit installierte Geräte die neue Fassung laden.

## Herkunft und Einschränkungen

Die Apps wurden zuerst als Claude-Artefakte entwickelt. In dieser Fassung stehen deren Zusatzfunktionen nicht zur Verfügung und werden übersprungen:

- **Geräteübergreifender Lernstand** (Cloud-Speicher): ohne eigenen Server nicht vorhanden. Stattdessen: Sicherungsdatei in der Übersicht. GitHub bietet keine Datenbank, in die anonyme Nutzer aus dem Browser sicher schreiben können.
- **KI-Rückmeldung im Befehlstrainer**: ohne KI-Anbindung zeigt der Trainer die regelbasierte Auswertung. Eine eigene Anbindung (z. B. über ein Backend mit API-Schlüssel) müsste in `app/apps/befehlstrainer.html` ergänzt werden. API-Schlüssel gehören nie in den Browser-Code.

Quellen der Fragen: Lernkompass des Instituts der Feuerwehr NRW, FwDV 100, FwDV 3 und weitere (jeweils in der App unter „Quellen“).

## Lizenz

Noch nicht festgelegt. Ohne Lizenz gilt „alle Rechte vorbehalten“.

**Weitergabe:** Die Weitergabe der App und ihrer Inhalte (Link, Kopie, Veröffentlichung an Dritte) erfolgt ausschließlich durch mich, Tom Wolff. Ohne meine ausdrückliche Zustimmung ist sie nicht gestattet. Das gilt auch für Link und Installationsadresse der App. Die Fragen und Inhalte stammen teils aus fremden Quellen; vor einer öffentlichen Weitergabe bitte Rechte klären.
