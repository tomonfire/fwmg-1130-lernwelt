# Änderungsprotokoll

Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung nach [SemVer](https://semver.org/lang/de/).

## [Unveröffentlicht]

### Geändert
- Projektstruktur: App-Dateien liegen gesammelt in `app/`, Dokumentation in `docs/`.

- Öffentliche Veröffentlichung über GitHub Pages aus `tomonfire/fwmg-1130-lernwelt`.
- Schriften werden lokal aus `app/fonts/` geladen statt von Google Fonts (Datenschutz, vollständig offline ab dem ersten Start).
- Service Worker lädt eine neue Fassung am HTTP-Cache vorbei und speichert nur noch eigene Dateien.

### Hinzugefügt
- Projektbeschreibung, Roadmap und Dokumentationsübersicht in `docs/`.
- Hinweis „Neue Version verfügbar – Neu laden“, sobald eine neue Fassung bereitsteht.
- Sicherheitsregeln (Content-Security-Policy) und `noindex` in allen HTML-Dateien, `id` im Manifest.

## [1.0.0] - 2026-10-11

### Hinzugefügt
- Startseite und Dashboard mit Direkteinstieg in die Trainer.
- Gruppenführer Tagestraining (408 Fragen), Zugführer Tagestraining (369 Fragen), Befehlstrainer FwDV 3.
- Installierbare Web-App mit Offline-Betrieb (Service Worker, Manifest, Icons).
- Impressum mit Hinweis „keine offizielle App der Feuerwehr Mönchengladbach“, Haftungsausschluss und KI-Hinweis.
- Einheitliche Farblogik: grün richtig, rot falsch, orange übersehen / fehlt / nicht beantwortet.
- Veröffentlichung über GitHub Pages, CI-Prüfung.

### Behoben
- Mitscrollende Leisten auf dem iPhone überdeckten Inhalt im oberen Rand.
- „Weitermachen“ im Dashboard erscheint nur noch bei wirklich offener Runde oder Prüfung.
- Doppeltes Willkommensfenster im Gruppenführer-Trainer innerhalb der Lernwelt.
