# Veröffentlichung

## GitHub Pages
1. Einstellungen → Pages → Quelle: **GitHub Actions**.
2. Push auf `main` startet `pages.yml` und veröffentlicht den Ordner `app/`.
3. Adresse: `https://<benutzer>.github.io/<repository>/`

Private Repositories: Pages nur mit bezahltem Plan.

## Neue Fassung ausliefern
1. Änderungen per Pull Request nach `main`.
2. `VERSION` in `app/sw.js` erhöht? Sonst behalten Geräte die alte Fassung im Cache.
3. Nach der Veröffentlichung die App einmal öffnen und neu laden; installierte Apps aktualisieren sich beim nächsten Start.

## Auf dem iPhone installieren
Safari → Teilen → **Zum Home-Bildschirm**.
