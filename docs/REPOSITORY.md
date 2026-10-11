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
