# 0004 Machbarkeit: Lernwelt in Frontdoor-Infrastruktur (Plesk, SSO, Subdomains)

Keine Bau-Spezifikation, sondern eine Bewertung zur Entscheidung. Es ist noch nichts beauftragt.

## Ziel
Der Autor soll entscheiden können, ob und wie weit die Lernwelt als `lernwelt.`-App in eine Plattform mit Frontdoor, SSO, Rollen und eigener Datenbank eingebunden wird, und welche Grundregeln sich dafür ändern müssten.

## 1. Technisch machbar?
**Ja.** Die Lernwelt besteht nur aus statischen Dateien ohne Build-Schritt (README „Eigenschaften“) und nutzt relative Pfade (`app/sw.js` PRECACHE `'./'`, `app/manifest.webmanifest` `start_url`/`scope` `./`).

**Läuft ohne Code-Änderung:**
- `app/` als Webroot der Subdomain ausliefern (Plesk Git-Erweiterung: `main` → Produktiv, `develop` → Staging). Ein Webserver ohne `.html`-Umleitungen ist nötig (README „Lokal starten“).
- Service Worker, Offline-Betrieb, CSP-Meta (`default-src 'self'`, `connect-src 'self'`), Schriften aus `app/fonts/`, `robots.txt`.
- Deep Link aus der Frontdoor auf die Startseite der Lernwelt (`./`).

**Bräuchte Änderungen:**
- **SSO vor der App:** Per Reverse Proxy machbar, aber der Service Worker liefert aus dem Cache, ohne neu zu fragen („Cache zuerst“, `app/sw.js` fetch). Wer einmal geladen hat, kommt offline und nach Ablauf der Sitzung weiter hinein. Eine abgelaufene Sitzung kann außerdem dazu führen, dass die Login-Seite statt der App im Cache landet, weil die Prüfung nur `res.ok` abfragt. Eine kleine Anpassung am Service Worker ist deshalb auch bei Stufe B ratsam.
- **Lernstand auf dem Server statt in localStorage:** Neue Server-Schnittstelle, eine Datenbank, Abgleich bei offline/online, Übernahme der neun Schlüssel aus `KEYS` (`app/index.html` L566) ohne sie umzubenennen.
- **Name aus dem SSO statt Namenspflicht:** Die Shell erzwingt einen Namen (`app/index.html` L522/L556, Schlüssel `fwmg.name.v1`). Den Namen aus der Anmeldung zu übernehmen braucht eine Schnittstelle „wer bin ich“.
- **Rollen** (z. B. nur Mitglieder, Ausbilder sieht Fortschritt): neu, betrifft Shell und alle drei Coaches.
- **Push:** Server mit Push-Schlüsseln und Versand. Auf dem iPhone geht Push nur mit installierter PWA.

## 2. Konflikte mit bewussten Regeln
| Regel (Fundstelle) | Konflikt |
| --- | --- |
| „Nur GitHub: kein eigener Server, keine Datenbank, keine Dienste außer GitHub Pages (`connect-src 'self'`)“ (CLAUDE.md; geprüft in `scripts/check.mjs` L42–43) | Plesk-Hosting widerspricht schon dem Wortlaut. `connect-src 'self'` bleibt nur haltbar, wenn die API unter derselben Subdomain liegt. |
| Impressum „private App, keine offizielle App einer Feuerwehr, Stadt oder Behörde“, „Weitergabe ausschließlich durch den Autor“ (CLAUDE.md; Footer `fwmg-imp` in 4 Dateien) | Steht im Widerspruch zu einem Betrieb in einer Plattform, die eine Organisation betreibt. Anbieter und Verantwortung müssten klar werden. |
| „Keine Hinweise auf eine bestimmte Stadt, Feuerwehr oder Einheit“ (CLAUDE.md) | Die Domain, die Frontdoor und die Login-Seite der Organisation wären solche Hinweise. |
| Datenschutzteil des Impressums: „Name und Lernstand nur im Browser, nicht an einen Server übertragen“; „über GitHub Pages ausgeliefert“ | Bei Stufe A ist er schon falsch (anderer Hoster), bei C grundsätzlich falsch. Bei C kommen personenbezogene Lerndaten von Mitgliedern hinzu: Rechtsgrundlage, Löschkonzept, Auftragsverarbeitung mit dem Hoster und gegebenenfalls Mitbestimmung, falls Lernstände Vorgesetzten sichtbar sind. |
| „Adresse der App nirgends im Repository verlinken“, `noindex` (CLAUDE.md) | Bleibt erfüllbar; die Plesk-Konfiguration gehört nicht ins Repository. |
| Lernstand „nur lokal“, Sichern/Wiederherstellen als Datei (README, `docs/ARCHITEKTUR.md`) | Bei C nicht mehr nötig oder doppelt vorhanden. |

## 3. Stufen als Optionen
| Stufe | Inhalt | Aufwand grob | Regeln, die sich ändern müssten |
| --- | --- | --- | --- |
| **A: nur Hosting** | `app/` als statische Subdomain, Deploy per Webhook, GitHub Pages kann bleiben oder entfallen | 0,5–1 Tag, keine Änderung an der App | „Nur GitHub“ lockern (Hoster), Datenschutztext im Impressum (4 Dateien), Prüfung in `scripts/check.mjs` |
| **B: A + SSO am Proxy** | Zugriff nur für Mitglieder per Login vor der Subdomain; App bleibt lokal, Namenspflicht bleibt | 1–2 Tage Infrastruktur, kleine Anpassung am Service Worker | wie A, zusätzlich Impressum oder Kennzeichnung der Organisation („private App“, „keine Hinweise auf eine Einheit“), Datenschutz um die Anmeldedaten ergänzen |
| **C: volle Integration** | Lernstand auf dem Server (MariaDB), Name und Rollen aus dem SSO, Push, Übersicht für Ausbilder | mehrere Wochen: Server-Code, Abgleich, Übernahme der Daten, Tests, Datenschutzkonzept | Grundsatzwechsel: „kein Server, keine DB“, „Lernstand nur lokal“, Namenspflicht, Impressum und Datenschutz, Prüfungen in CI, Architektur-Dokumentation |

Empfehlung: Mit **B** anfangen, wenn die Organisation die App tatsächlich betreiben will. C nur dann, wenn ein konkreter Nutzen (z. B. Ausbilder sehen den Fortschritt) die Datenschutzpflichten rechtfertigt.

## 4. Offene Entscheidungen (nur der Nutzer)
1. Bleibt die Lernwelt eine private App des Autors oder wird sie ein Angebot der Organisation? Davon hängen Impressum, Weitergabe-Hinweis und Ortsneutralität ab.
2. Welche Stufe: A, B oder C? Bleibt GitHub Pages parallel bestehen?
3. Soll der Lernstand das Gerät verlassen? Wenn ja, wer darf ihn sehen (nur die Person selbst oder auch Ausbilder/Führung)?
4. Wer betreibt den Server und ist datenschutzrechtlich verantwortlich (Updates, Backup, Auftragsverarbeitung)?
5. Muss die Lernwelt nach Ablauf der Sitzung offline nutzbar bleiben, oder hat ein strikter Login-Schutz Vorrang?

## Annahmen
- Plesk-Webserver liefert statische Dateien ohne `.html`-Umleitungen aus; API und SSO liegen bei C unter derselben Subdomain oder werden per CSP ausdrücklich erlaubt.
- Aufwände sind grobe Schätzungen ohne Zeit für Datenschutz und Abstimmungen in der Organisation.
