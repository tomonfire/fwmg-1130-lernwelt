# Veröffentlichung

Die App läuft öffentlich über **GitHub Pages** aus dem öffentlichen Repository `tomonfire/fwmg-1130-lernwelt`:

**https://tomonfire.github.io/fwmg-1130-lernwelt/**

## Einmalig einrichten
1. Repository → **Settings** → **Pages** → *Build and deployment* → Source: **GitHub Actions**.
2. Danach veröffentlicht jeder Push auf `main` den Ordner `app/` (`.github/workflows/pages.yml`). Den ersten Lauf kann man unter **Actions** → *Deploy to GitHub Pages* → **Run workflow** auch von Hand starten.

## Neue Fassung ausliefern
1. Änderungen per Pull Request nach `main`.
2. `VERSION` in `app/sw.js` erhöht? Sonst behalten Geräte die alte Fassung im Cache.
3. Geöffnete Apps zeigen nach dem Update unten „Neue Version verfügbar – Neu laden“. Installierte Apps prüfen beim Zurückholen in den Vordergrund, ob es eine neue Fassung gibt.

## Was für den öffentlichen Betrieb gilt
- **Keine fremden Server:** Schriften liegen in `app/fonts/` (SIL Open Font License). Es gehen keine IP-Adressen an Google oder andere Dienste.
- **Sicherheitsregeln (CSP)** stehen als `<meta>` in jeder HTML-Datei: Skripte, Bilder, Schriften und Verbindungen nur von der eigenen Adresse.
- **Nicht in Suchmaschinen:** `<meta name="robots" content="noindex">` in jeder HTML-Datei, damit die inoffizielle App nicht unter „Feuerwehr Mönchengladbach“ gefunden wird. Zum Freigeben die Zeile in allen vier Dateien entfernen.
- **Lernstand** bleibt lokal im Browser (`localStorage`) und ist an die Adresse gebunden. Wer die App vorher unter einer anderen Adresse genutzt hat, beginnt hier mit leerem Lernstand.

## Auf dem iPhone installieren
Safari → Adresse öffnen → Teilen → **Zum Home-Bildschirm**.
