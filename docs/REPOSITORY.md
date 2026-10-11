# Repository-Einstellungen

Diese Einstellungen lassen sich nicht über Dateien festlegen und werden einmalig auf GitHub gesetzt (`tomonfire/fwmg-1130-lernwelt` → **Settings**).

## General
- **Description:** „Inoffizielle Lern- und Trainingsapp für die Feuerwehr (Gruppenführer, Zugführer, Befehlstrainer).“ Keine Adresse der App eintragen.
- **Website** (About, Zahnrad): **leer lassen**, damit Suchmaschinen die App nicht über GitHub finden.
- **Features:** Wikis, Projects und Discussions ausschalten, Issues anlassen.
- **Pull Requests:** nur **Allow squash merging** anlassen, **Automatically delete head branches** einschalten, „Always suggest updating pull request branches“ einschalten.

## Pages
- **Build and deployment → Source: GitHub Actions.**
- „Enforce HTTPS“ bleibt an (Standard bei `github.io`).

## Branch-Schutz für `main` (Rules → Rulesets → New branch ruleset)
- Ziel: Default branch, Status **Active**.
- **Restrict deletions** und **Block force pushes**.
- **Require a pull request before merging** (0 Freigaben reichen bei einer Person; mit weiteren Mitwirkenden 1 und „Require review from Code Owners“).
- **Require status checks to pass:** `Dateien und Regeln` und `Browser-Test` (erscheinen nach dem ersten CI-Lauf in der Auswahl).
- Dich selbst unter **Bypass list** eintragen, falls du im Notfall direkt auf `main` schreiben willst.

## Actions (Actions → General)
- **Workflow permissions:** „Read repository contents and packages permissions“.
- „Allow GitHub Actions to create and approve pull requests“ aus.

## Security (Advanced Security)
- **Private vulnerability reporting:** an (siehe `SECURITY.md`).
- **Dependabot alerts** und **Dependabot security updates:** an. Versions-Updates kommen über `.github/dependabot.yml`.
- **Secret Protection / Push protection:** an.

## Environments → github-pages
- **Deployment branches:** nur `main`.

## Claude per @-Erwähnung (`.github/workflows/claude.yml`)
Schreibt man `@claude` in ein Issue, einen Kommentar oder ein Review, bearbeitet Claude die Aufgabe und antwortet bzw. legt einen Branch oder Pull Request an. Auslösen können nur Personen mit Schreibrechten im Repository. Claude darf im Lauf nur `npm ci`, `npm run check` und `npm run csp:update` ausführen, um seine Änderungen zu prüfen; den Browser-Test übernimmt die CI im Pull Request.

Einmalig einrichten:
1. **Claude-GitHub-App installieren:** <https://github.com/apps/claude> → *Install* → nur dieses Repository auswählen.
2. **Zugang als Secret hinterlegen** (Settings → Secrets and variables → Actions → *New repository secret*), eines von beiden:
   - `CLAUDE_CODE_OAUTH_TOKEN` mit einem Claude-Abo (Pro/Max): auf dem eigenen Rechner `claude setup-token` ausführen und den angezeigten Token eintragen.
   - `ANTHROPIC_API_KEY` mit einem API-Schlüssel aus der Anthropic Console (Abrechnung nach Verbrauch).
3. Test: In einem Issue `@claude` mit einer Bitte kommentieren. Unter *Actions → Claude Code* ist der Lauf zu sehen.

Hinweis: Der Workflow ruft die Claude-API von GitHub Actions aus auf. Das betrifft nur die Entwicklung, nicht die App: Die App selbst spricht weiterhin mit keinem Server außer GitHub Pages.
