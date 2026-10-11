# Änderungsprotokoll

Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung nach [SemVer](https://semver.org/lang/de/).

## [Unveröffentlicht]

### Geändert
- Fragen des Gruppenführer- und Zugführer-Trainers liegen als JSON in `app/data/` statt im HTML. Neue Prüfung `scripts/data.mjs` (eindeutige IDs, gültige Antwort-Indizes). Service-Worker `VERSION` auf v9.
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
