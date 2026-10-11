# Mitarbeiten

1. Branch von `main` anlegen (`feature/…` oder `fix/…`).
2. Änderungen machen. Regeln stehen in `CLAUDE.md` (Farben, Reihenfolge, Impressum, Speicherschlüssel).
3. Nach Änderungen an Inline-Skripten `npm run csp:update`. Dann `npm run check` und `npm run test:browser` ausführen, auf dem iPhone testen, hell und dunkel.
4. `VERSION` in `app/sw.js` erhöhen und `CHANGELOG.md` ergänzen.
5. Pull Request öffnen. Die CI prüft Dateien, Regeln und den Browser-Test; erst wenn beides grün ist, wird gemergt. `main` bleibt immer lauffähig und wird automatisch veröffentlicht.

Commit-Nachrichten auf Deutsch, im Präsens („Füge … hinzu“, „Behebe …“).
