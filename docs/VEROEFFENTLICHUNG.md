# Veröffentlichung

Die App läuft über **GitHub Pages** aus dem Repository `tomonfire/fwmg-1130-lernwelt`. Adresse: `https://<benutzer>.github.io/<repository>/`. Sie wird nur direkt weitergegeben und hier bewusst nicht verlinkt (siehe „Nicht auffindbar“).

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
- **Lernstand** bleibt lokal im Browser (`localStorage`) und ist an die Adresse gebunden. Wer die App vorher unter einer anderen Adresse genutzt hat, beginnt hier mit leerem Lernstand.

## Nicht auffindbar
Die App soll nicht in Suchmaschinen erscheinen und nicht gecrawlt werden. Dafür:
- **`<meta name="robots" content="noindex,nofollow,noarchive,nosnippet,noimageindex">`** in allen vier HTML-Dateien: nicht aufnehmen, keinen Links folgen, keine Kopie, keine Vorschau, keine Bilder.
- **`<meta name="referrer" content="no-referrer">`**: Wer in der App einen Quellen-Link anklickt (z. B. Lernkompass), verrät der Zielseite die Adresse der App nicht.
- **`app/robots.txt`** sperrt alle Crawler. Wirksam wird sie nur, wenn die App auf einer eigenen Domain im Wurzelverzeichnis liegt; unter `github.io/<repository>/` lesen Crawler nur `github.io/robots.txt`.
- **Adresse nicht verlinken:** nicht in README, Repository-Beschreibung („About“ → Website), Social Media oder öffentlichen Seiten. Die Weitergabe der App erfolgt ausschließlich durch den Autor, nur direkt (Messenger, E-Mail, QR-Code im Unterricht). Nutzer geben Link und Installationsadresse nicht weiter.

Grenzen:
- Die Regeln sind eine Bitte, an die sich Google, Bing und Co. halten, unseriöse Crawler nicht. Wirklich verborgen wäre die App nur mit Anmeldung, das kann GitHub Pages nicht.
- Das Repository selbst ist öffentlich und auf GitHub durchsuchbar. Wer es findet, kann die Adresse ableiten und die Fragen im Code lesen.

## Auf dem iPhone installieren
Safari → Adresse öffnen → Teilen → **Zum Home-Bildschirm**.
