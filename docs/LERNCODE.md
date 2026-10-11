# Lerncode

Mit dem Lerncode sichern Nutzer ihren Lernstand in einer Datenbank und lernen auf jedem Gerät weiter. Es gibt keine Anmeldung, keinen Namen und keine E-Mail: Der Code selbst ist der Schlüssel.

## So funktioniert es

- In der Übersicht unter **„Dein Lerncode“** tippt man auf **Lerncode erstellen**. Die App erzeugt einen zufälligen Code mit 16 Zeichen, z. B. `K7QF-2MXP-9TRA-4WZD` (etwa 78 Bit Zufall, nicht erratbar).
- Auf einem anderen Gerät: **Ich habe schon einen Lerncode** → Code eingeben. Groß-/Kleinschreibung, Leerzeichen und Bindestriche sind egal.
- Die Trainer gleichen beim Öffnen, beim Zurückkehren in die App und nach dem Speichern ab. Offline wird lokal weitergelernt und später abgeglichen.
  - **Gruppenführer und Zugführer** führen beide Stände zusammen (pro Frage gewinnt der Stand mit mehr Antworten).
  - **Befehlstrainer:** Der zuletzt gespeicherte Stand gewinnt als Ganzes, weil sich seine Zähler nicht sinnvoll addieren lassen.
- **Abmelden** vergisst den Code auf dem Gerät. **Löschen** entfernt den gesicherten Stand endgültig aus der Datenbank. Der Stand im Browser bleibt in beiden Fällen.
- Ohne Lerncode ändert sich nichts: Der Lernstand bleibt nur im Browser, und die App spricht mit keinem Server.

## Technik

| Teil | Datei |
| --- | --- |
| Code erzeugen, prüfen, Anbindung an Supabase | `app/lerncode.js` |
| Bereich „Dein Lerncode“ in der Übersicht | `app/index.html` (`renderLc`) |
| Datenbank: Tabelle und Funktionen | `docs/lernstand.sql` |

- Die Trainer erwarten aus ihrer Zeit als Claude-Artefakt eine Schnittstelle `window.claude.use('user' | 'db')` mit `doc(pfad).get()/set()`. `app/lerncode.js` stellt genau diese Schnittstelle bereit, mit Supabase dahinter. Die Trainer holen sie sich aus der Startseite (`window.parent.claude`).
- Gespeichert wird je Code und Trainer ein JSON-Dokument (`progress-lk`, `progress-zf`, `progress-bt`) plus `meta` mit dem Erstellzeitpunkt. Der Code selbst liegt in der Datenbank nur als SHA-256-Hash.
- Der Browser darf die Tabelle weder lesen noch auflisten. Er ruft nur vier Funktionen auf (`lernstand_get`, `lernstand_set`, `lernstand_exists`, `lernstand_delete`), die jeweils den vollständigen Code verlangen. Sie prüfen Code-Format, erlaubte Schlüssel und Größe (höchstens 500 KB je Dokument).
- Nur die Startseite darf mit `https://*.supabase.co` sprechen (`connect-src` in der CSP). `npm run check` prüft das.
- Im Browser liegt der Code unter dem Schlüssel `fwmg.lerncode.v1`.

## Einrichtung (einmalig)

1. Auf <https://supabase.com> ein kostenloses Konto anlegen und **New project** wählen:
   - Name z. B. `fwmg-lernwelt`, sicheres Datenbank-Passwort (wird hier nicht gebraucht, aber gut aufheben).
   - **Region: Central EU (Frankfurt)**.
2. Im Projekt **SQL Editor** → **New query** → Inhalt von [`lernstand.sql`](lernstand.sql) einfügen → **Run**. Es muss „Success“ erscheinen.
3. **Project Settings → Data API**: die **Project URL** (`https://xxxx.supabase.co`) kopieren. Unter **Project Settings → API Keys** den **Publishable key** (`sb_publishable_…`) kopieren; bei älteren Projekten den **anon public**-Schlüssel (`eyJ…`).
4. Beide Werte oben in `app/lerncode.js` eintragen:
   ```js
   var SUPABASE_URL = 'https://xxxx.supabase.co';
   var SUPABASE_KEY = 'sb_publishable_…';
   ```
   Dieser Schlüssel ist öffentlich und darf im Browser-Code stehen; geschützt wird über die Funktionen in der Datenbank. Den **Secret key** bzw. **service_role**-Schlüssel nie eintragen.
5. `VERSION` in `app/sw.js` erhöhen, Pull Request, mergen. Danach erscheint „Dein Lerncode“ in der Übersicht.
6. Optional: unten in `lernstand.sql` das Aufräumen alter Lernstände (ein Jahr ungenutzt) mit `pg_cron` einschalten.

## Grenzen

- Wer einen Code kennt, kann den Lernstand sehen, ändern und löschen. Nutzer sollen ihn nicht weitergeben.
- Es gibt keine Begrenzung der Anfragen pro Nutzer. Bei Missbrauch kann man in Supabase den öffentlichen Schlüssel erneuern (dann muss er in `app/lerncode.js` getauscht werden).
- Kostenlose Supabase-Projekte pausieren nach etwa einer Woche ohne Zugriff. Dann zeigt die App „Server nicht erreichbar“, der Lernstand im Browser bleibt. Im Supabase-Dashboard lässt sich das Projekt wieder starten.
