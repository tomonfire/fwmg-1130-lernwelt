# Sicherheit

Die App ist statisch und hat keine Anmeldung. Der Lernstand bleibt im Browser des Geräts. Nur wer einen Lerncode nutzt, sichert seinen Lernstand zusätzlich in einer Datenbank (Supabase, EU); der Zugriff ist nur über Datenbank-Funktionen mit dem vollständigen Code möglich, siehe [docs/LERNCODE.md](docs/LERNCODE.md).

- Keine API-Schlüssel, Passwörter oder personenbezogenen Daten in das Repository schreiben. Ausnahme: der öffentliche Supabase-Schlüssel („publishable“ bzw. „anon“) in `app/lerncode.js`. Der „Secret“- bzw. „service_role“-Schlüssel gehört nie in das Repository.
- Eine KI-Anbindung darf nur über ein Backend erfolgen, das den Schlüssel verwahrt.
- Probleme bitte nicht öffentlich als Issue melden, sondern vertraulich über **Security → Report a vulnerability** im Repository oder per E-Mail an mailanwolff@gmail.com.
