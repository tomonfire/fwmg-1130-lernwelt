# Änderungsprotokoll

Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung nach [SemVer](https://semver.org/lang/de/).

## [Unveröffentlicht]

### Geändert (einheitliches Design)
- Befehlscoach nutzt jetzt dieselben Farben (hell und dunkel), Schriften und Bausteine wie Gruppen- und Zugführer-Coach: dunkelblaue Überschriften, IBM Plex Sans, Kopf mit Datum und Streifen darunter, Reiter, Knöpfe, Antwort-Etiketten „Richtig“/„Falsch“, Ergebniskasten mit Balken links und Überschrift „Richtig“/„Falsch“/„Nicht ganz“, roter Fokusrahmen, Fortschrittsbalken.
- Gleiche Reiterfolge in beiden Fragen-Coaches: Heute · Fortschritt · Führung · Quellen.
- Leiste oben heißt „Befehlscoach“ statt „Befehle“. Auf dem iPhone zeigt der Zurück-Knopf nur den Pfeil, damit alle drei Coaches ohne Scrollen in die Leiste passen.
- Zugführer-Coach: „Lösung fehlerhaft melden“ linksbündig wie im Gruppenführer-Coach. Gruppenführer-Coach: doppelte Viewport-Angabe entfernt, `viewport-fit=cover` wie in den anderen Dateien.
- Service-Worker `VERSION` auf v20.

### Hinzugefügt (iPad und Computer)
- Leiste unten in den Fragen- und Übungsansichten aller Coaches: „Prüfen“ und „Weiter“ bleiben auch bei langen Fragen sichtbar, z. B. auf dem iPad quer oder am Laptop. In der Lernwelt endet der Coach über dem Home-Balken des iPhones.
- Tastatur (`app/tastatur.js`): Ziffern 1–9 wählen eine Antwort, Enter löst „Prüfen“/„Weiter“ aus. Hinweis darauf und Hover-Rückmeldung nur bei Geräten mit Maus. Beim Öffnen eines Coaches mit Maus geht der Fokus direkt in den Coach.
- Service-Worker `VERSION` auf v21.

### Geändert (Layout für große Bildschirme)
- Übersicht: ab 768 px drei Coach-Karten nebeneinander (iPad hoch), ab 1000 px „Einstellungen“ und „Dein Lernstand“ nebeneinander. Die Anleitung „App auf dem Home-Bildschirm“ ist mit Maus zugeklappt, auf Touch-Geräten offen.
- Fortschritt im Gruppen- und Zugführer-Coach: Listen nach Thema bzw. Kapitel ab 1000 px zweispaltig.
- Befehlscoach: gleiche Breiten und ab 768 px größere Schrift und Tippflächen wie die anderen Coaches.
- Service-Worker `VERSION` auf v22.

### Entwicklung
- Debuggen in VS Code: Konfigurationen in `.vscode/` (Chrome/Edge mit iPhone-Größe, Anhängen, Browser-Test sichtbar mit `HEADED=1`, Prüfskript) und Aufgaben für Start und Prüfungen.
- `npm start` nutzt jetzt `scripts/serve.mjs` statt `serve@14`: Der alte Server leitete `.html`-Adressen um, dadurch luden lokal die Coaches nicht. Ohne Abhängigkeiten, auch vom Browser-Test genutzt.

### Geändert
- In der App heißen die Trainer jetzt „Coach“: „Deine Coaches“, „Befehlscoach“, „Coach wechseln“ (#24). Nur Texte; Dateinamen und Speicherschlüssel bleiben. Service-Worker `VERSION` auf v19.

### Hinzugefügt
- Claude per `@claude` in Issues, Kommentaren und Reviews (`.github/workflows/claude.yml`, Einrichtung in `docs/REPOSITORY.md`). Claude darf dabei `npm ci`, `npm run check` und `npm run csp:update` ausführen.

### Behoben
- „Lernstand sichern“ nimmt jetzt auch die Einstellungen mit (`fwmg.settings.v1`, Fragen pro Runde). `npm run check` prüft, dass jeder Speicherschlüssel der Shell gesichert wird (#20). Service-Worker `VERSION` auf v17.

### Sicherheit
- Content-Security-Policy gehärtet: Inline-Skripte nur noch per SHA-256-Prüfsumme statt `'unsafe-inline'` (`scripts/csp.mjs`, `npm run csp:update`, in `npm run check` geprüft).
- Befehlstrainer übernimmt gespeicherte und wiederhergestellte Daten nur mit den erwarteten Typen. Browser-Test prüft, dass eine präparierte Sicherungsdatei keinen Code ausführt. Service-Worker `VERSION` auf v16.

### Geändert
- Eigener Abschnitt „App auf dem Home-Bildschirm“ in der Übersicht (unter „Dein Lernstand“), nicht mehr bei den Einstellungen. Anleitung für iPhone und iPad angepasst: Teilen über „Mehr“ bei kompakter Leiste, „Aktionen bearbeiten“, „Als Web-App öffnen“, Hinweis zum getrennten Speicher. Service-Worker `VERSION` auf v15.
- „Direkt einsteigen“ in der Übersicht entfernt. Stattdessen Abschnitt „Einstellungen“ für alle Trainer, zunächst „Fragen pro Runde“ (gilt für Gruppenführer und Zugführer, Schlüssel `fwmg.settings.v1`). Eingebettet zeigen die Trainer die Einstellung nicht mehr selbst. Browser-Test ergänzt. Service-Worker `VERSION` auf v13.
- Weitergabe nur durch den Autor: Hinweis im Impressum (alle vier HTML-Dateien), in README, Projektbeschreibung, Veröffentlichungs-Doku und CLAUDE.md. „zur freien Weitergabe“ entfernt. CI prüft den Hinweis. Service-Worker `VERSION` auf v12.
- Gruppenführer-Trainer zeigt das Willkommensfenster jetzt auch in der Lernwelt (eingebettet), wie der Zugführer-Trainer. Gruß einheitlich: Hallo (bis 5 Uhr), Guten Morgen (bis 11), Guten Tag (bis 18), Guten Abend. Neuer Browser-Test dafür. Service-Worker `VERSION` auf v11.
- Kontakt im Impressum und in `SECURITY.md` läuft über GitHub (Issues, Profil, vertrauliche Sicherheitsmeldung) statt über eine E-Mail-Adresse. Service-Worker `VERSION` auf v10.
- Fragen des Gruppenführer- und Zugführer-Trainers liegen als JSON in `app/data/` statt im HTML. Neue Prüfung `scripts/data.mjs` (eindeutige IDs, gültige Antwort-Indizes). Service-Worker `VERSION` auf v9.
- CI prüft in Pull Requests, ob `VERSION` in `app/sw.js` erhöht wurde, sobald sich etwas in `app/` ändert (`scripts/version.mjs`).
- Gruppenführer-Trainer zeigt das taktische Zeichen Gruppenführer nach DV 102 (`app/icons/gruppenfuehrer.svg`) statt der Flamme.
- Logo der Feuerwehr Mönchengladbach ersetzt: Startseite, Übersicht, Gruppenführer und App-Icons zeigen eine eigene Flamme (`app/icons/flamme.svg`), der Zugführer-Trainer das taktische Zeichen Zugführer nach DV 102 (`app/icons/zugfuehrer.svg`).

### Behoben
- Logo auf Startseite und Übersicht war auf dem iPhone hochkant gestaucht.

### Geändert
- Als private App gekennzeichnet: Hinweise auf Stadt, Feuerwehr und Einheit aus Impressum, Kopfzeilen, Bildbeschreibungen und Doku entfernt.
- Projektstruktur: App-Dateien liegen gesammelt in `app/`, Dokumentation in `docs/`.

- Öffentliche Veröffentlichung über GitHub Pages aus `tomonfire/fwmg-1130-lernwelt`.
- Schriften werden lokal aus `app/fonts/` geladen statt von Google Fonts (Datenschutz, vollständig offline ab dem ersten Start).
- Service Worker lädt eine neue Fassung am HTTP-Cache vorbei und speichert nur noch eigene Dateien.

### Hinzugefügt
- Name als Pflichtfeld beim ersten Start; Gruß und Übersicht zeigen ihn. Ohne Namen geht es nicht weiter.
- Lernstand sichern und wiederherstellen als Datei (Übersicht → „Dein Lernstand“), z. B. für den Gerätewechsel.
- Datenschutz-Hinweis im Impressum.
- Projektbeschreibung, Roadmap und Dokumentationsübersicht in `docs/`.
- Hinweis „Neue Version verfügbar – Neu laden“, sobald eine neue Fassung bereitsteht.
- Sicherheitsregeln (Content-Security-Policy) in allen HTML-Dateien, `id` im Manifest.
- `npm run check` prüft zusätzlich: gleiches Impressum in allen Dateien, keine Stadt im Text, keine Verbindungen zu fremden Servern.
- Browser-Test mit Playwright (`npm run test:browser`) in der CI; `npm run check` prüft zusätzlich noindex, CSP, Impressum und fremde Server.
- Repository-Grundgerüst: `.gitignore`, CODEOWNERS, Dependabot für npm, Prüfung vor jeder Veröffentlichung, Anleitung für die GitHub-Einstellungen (`docs/REPOSITORY.md`).
- Schutz vor Suchmaschinen: `noindex,nofollow,noarchive,nosnippet,noimageindex`, `no-referrer` und `robots.txt`; Adresse wird in der Doku nicht verlinkt.

## [1.0.0] - 2026-10-11

### Hinzugefügt
- Startseite und Dashboard mit Direkteinstieg in die Trainer.
- Gruppenführer Tagestraining (408 Fragen), Zugführer Tagestraining (369 Fragen), Befehlstrainer FwDV 3.
- Installierbare Web-App mit Offline-Betrieb (Service Worker, Manifest, Icons).
- Impressum mit Hinweis „keine offizielle App“, Haftungsausschluss und KI-Hinweis.
- Einheitliche Farblogik: grün richtig, rot falsch, orange übersehen / fehlt / nicht beantwortet.
- Veröffentlichung über GitHub Pages, CI-Prüfung.

### Behoben
- Mitscrollende Leisten auf dem iPhone überdeckten Inhalt im oberen Rand.
- „Weitermachen“ im Dashboard erscheint nur noch bei wirklich offener Runde oder Prüfung.
- Doppeltes Willkommensfenster im Gruppenführer-Trainer innerhalb der Lernwelt.
