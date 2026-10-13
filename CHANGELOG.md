# Änderungsprotokoll

Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung nach [SemVer](https://semver.org/lang/de/).

## [Unveröffentlicht]

### Hinzugefügt (13.10.2026, Anforderung 0003)
- Befehlscoach: Feld `ext` an Lagen (Badge „Ergänzung“ in der Liste) und Feld `rb` (`{p, q}`: 2 bis 4 Stichpunkte, Quelle mit Abschnitt) für den Kasten „Menschenrettung nach Realbrand“ in der Auswertung (`rbBox()`, unter „Noch einmal ansehen“, Ausgabe über `esc()`); ohne Einfluss auf Punktzahl, Bestwert und Verlauf. `rb` an `zimmerbrand`, `z-wohnhaus`, `z-halle`. Neue Lagen `abc-austritt` (hilfe), `staffel-schuppen`, `bsw-buehne` mit eigener Lagen-ID, bestehende Lagen und IDs unverändert, kein neuer localStorage-Schlüssel. Quiz: 5 Ergänzungsfragen (sechstes Element `true`, Badge) mit Fundstelle aus der Fachempfehlung Realbrand 2019. `APPV` V2.16, Anzahl Übungen in der Shell 16.
- GF Kat. H: Hinweis `v` an 8.8, 8.10, 8.11, 8.14 (DIN-Typenliste, SW 2000/DLA (K)); Lösungen, `a` und `chg` unverändert. GF V3.38.
- `scripts/data.mjs`: Positivliste der Fahrzeugkürzel aus der DIN-FNFW-Typenliste (25. Fassung) gegen `app/apps/befehlstrainer.html`; Prüfung von `rb` (2 bis 4 Stichpunkte, Quelle mit Abschnitt, Pflicht an den drei Lagen), `ext` (nur Gruppenführer, mit Beurteilung und Kontrolle), `f`/`kw` je Befehl, Staffel-Lagen ohne Schlauchtrupp und Melder, mind. 4 Ergänzungs-Quizfragen mit Abschnitt.
- Prüfprotokoll in `docs/QUELLEN.md`. Service-Worker `VERSION` auf v51, `NEU` mit neuer id.

### Geändert (13.10.2026, Anforderung 0003)
- Befehlscoach: Listenüberschrift „Technische Hilfeleistung“ heißt „Hilfeleistung“, weil die ABC-Lage dort steht.

### Hinzugefügt (13.10.2026, Anforderung 0002)
- Freitext und Fallbeispiel (A-23) im Gruppenführer- und Zugführer-Coach: Abschnitt auf „Heute“ mit Badge „Ergänzung“, eigene Ansicht (Textfeld ab 5 Zeilen, Musterlösung mit Stichpunkten und Fundstelle, Selbstabgleich „hatte ich“/„fehlte“ in `--ok`/`--miss`, Ergebnis „x von y Stichpunkten“, `.actions.dock`), keine neuen Reiter. Ziffer n schaltet Stichpunkt n um (`app/tastatur.js`, `.ftrows[data-live]`; im Textfeld nichts). Gemeinsame Stile in `app/coach.css`.
- Daten: `app/data/freitext.json` (je Coach 10 Aufgaben, davon 4 Fallbeispiele; in `sw.js` im Cache), Prüfliste der Fundstellen in `docs/QUELLEN.md`. `scripts/data.mjs` prüft id-Präfix `ft-gf-`/`ft-zf-`, `typ`, `t`, `f`, `p` (2 bis 8 Texte), `lage` bei „fall“, mind. 10 Aufgaben und 3 Fallbeispiele je Coach.
- Lernstand als Teilobjekt `ft` (`{id: {d, x, y}}`) in `lernkompass-tagestraining-v1` bzw. `zf4tt.state.v1`, kein neuer Schlüssel; beim Einlesen und Zusammenführen auf Typen geprüft, ältere Stände ohne `ft` laden fehlerfrei. Der Text wird nicht gespeichert. Katalogstatistik, Tagesziel, Runden und Prüfung ändern sich nicht. GF V3.37, ZF V1.13, Service-Worker `VERSION` auf v50, `NEU` mit neuer id.

### Hinzugefügt (13.10.2026)
- Gruppenführer- und Zugführer-Coach: optionales Feld `f` („Fundstelle“) an Katalogfragen, angezeigt als Zeile „Ergänzung · Fundstelle: …“ unter der Auflösung (nach „Hinweis zur Vorschrift“) und in der Auswertung der Prüfung, nicht während der Prüfung; Ausgabe über `esc()` bzw. Textknoten. 46 Fragen belegt (GF Kat. A 11, GF Kat. J 2, ZF Kap. 3 33), 35 der 81 geprüften IDs ohne `f`. An den Katalogfragen ändert sich nur `f`. `scripts/data.mjs`: `f` nicht leerer Text, höchstens 80 Zeichen, an `own`-Fragen ein Fehler. Prüfliste in `docs/QUELLEN.md`; Reiter Quellen beider Coaches erklärt die Fundstellen in einem Satz. GF V3.36, ZF V1.12, Service-Worker `VERSION` auf v49, `NEU` mit neuer id.
- Gruppenführer: 50 Übungsfragen (own) in vier neuen Kategorien M–P „(Übungsfragen)“ – Recht NRW (12.1xx), Funk (13.1xx), ABC (14.1xx), Prüfung von Geräten und UVV (15.1xx) –, eigene Runden unter „Heute“ → „Übungsfragen“, Lernstand unter „Fortschritt“, Quelleneintrag. Abschnitt „Prüfung und Zulassung“ im Quellen-Reiter nach Prüfungsrichtlinie GF-Basis (12/2020) und Ausführungsvorschrift (RdErl. 02.12.2016).
- Zugführer: Abschnitt „Führungsstufen und Sachgebiete“ (FwDV 100, 3.2.5 und 3.2.2.2) im Bereich Führung.
- `docs/QUELLEN.md` (Quellenregister mit Status und abhängigen Fragen), Roadmap: jährliche Aktualitätsprüfung und Entscheidung zu fremden Inhalten.
- `scripts/data.mjs`: Übungsfragen nur in Kategorien „(Übungsfragen)“, mit Erklärung und passender Nummer; Katalogfragen nie dort; `chg` nur für Katalogfragen. `scripts/check.mjs`: optionale Sperrliste (`FWMG_SPERRLISTE`, ganze Wörter) gegen Namen aus internen und örtlichen Quellen.

### Geändert (13.10.2026)
- Gruppenführer: Katalogrunden, Themenwahl und Prüfung schließen Übungsfragen aus (bisher konnte die Kategorie L über die Themenwahl in Katalogrunde und Prüfung gelangen). Reiter Führung nutzt nur Kategorie L; „Weitere Runde“ nach einer Übungsrunde startet dieselbe Gruppe. Gruppenführer V3.35, Zugführer V1.11, Service-Worker `VERSION` auf v48.
- Changelog: Ortsname in einem älteren Eintrag neutral formuliert.

### Geändert (Inhalt)
- Gruppenführer: Gefahrenmatrix 4A-1C-4E mit der IdF-Lernunterlage B1-310 (10/2019) abgeglichen; Quellenangabe, Hinweiskasten und Erklärungen der 30 Übungsfragen 11.2xx angepasst (11.212, 11.217 präzisiert), Lösungen unverändert. Zugführer: Hinweis zu 1.149 nennt die Abstände nach B1-310; Stand der FwDV 100 im Bereich Führung belegt. Gruppenführer V3.34, Zugführer V1.10, Service-Worker `VERSION` auf v47.

### Hinzugefügt
- Gruppenführer- und Zugführer-Coach: optionales Feld `v` („Hinweis zur Vorschrift“) in `app/data/*.json`, angezeigt nach dem Prüfen und in der Auswertung, `scripts/data.mjs` prüft den Typ. Hinweise an 15 Fragen aus dem Abgleich mit dem Volltext der Quellen (FwDV 1 Neufassung 2026, FwDV 10 2019, FwDV 500 2022, BauO NRW 2018), siehe `docs/AUDIT-WISSENSBASIS.md`. Quellen-Reiter beider Coaches ergänzt. Gruppenführer V3.33, Zugführer V1.09, Service-Worker `VERSION` auf v46.

### Geändert
- Befehlscoach: Vorlesen und Aufnahme enden, wenn die Lernwelt den Coach ausblendet (Übersicht, anderer Coach, neu geladene Rahmen). Die Shell ruft dafür `fwmgHide()` im Rahmen auf, weil ein verstecktes iframe kein `visibilitychange` bekommt. Service-Worker `VERSION` auf v44.
- Befehlscoach: Gong vor der Alarmierung aus einer vom Autor bereitgestellten Tondatei (ca. 7 s) statt als erzeugter Zweiklang. Die Datei liegt nur verwürfelt als `app/audio/gong.bin` vor (`scripts/gong.mjs`), wird im Speicher entwürfelt und per Web Audio gespielt, damit sie sich nicht einfach speichern lässt. Die Durchsage startet nach dem Ausklingen, bei Fehler sofort; „Stopp“ hält auch den Gong an. Datei im Cache (`sw.js`), `scripts/check.mjs` prüft `app/audio/` (nur `.bin`). Service-Worker `VERSION` auf v39.
- Fenster „Was ist neu“ zeigt nur die neueste Ausgabe (`NEU`). Ältere Ausgaben stehen in `NEU_ALT` und erscheinen in der Übersicht unter „Neuigkeiten“ → „Frühere Neuigkeiten“ (aufklappbar). Service-Worker `VERSION` auf v36.

### Behoben
- Befehlscoach: In Safari wurde die Durchsage nach dem Gong nach einigen Sekunden abgebrochen. Der Rückfall (nächster Tipp ohne Gong) griff, weil Safari `onstart` nicht immer meldet; er zählt jetzt auch `onboundary` und greift nur, wenn nichts spricht oder wartet (`speaking`/`pending`). Service-Worker `VERSION` auf v45.
- Befehlscoach: Am iPhone (Safari) blieben Gong und Vorlesen stumm. Der Gong läuft jetzt über ein unsichtbares Audio-Element statt Web Audio (iOS hält Web Audio mit dem Stummschalter an und verlangt den Start direkt beim Tippen): Er wird beim Anzeigen der Lage geladen, im Speicher entwürfelt (Blob-Adresse, CSP `media-src 'self' blob:` im Befehlscoach) und startet sofort beim Tippen. Die leere Ansage, die iOS die Sprachausgabe freigibt, wird vor dem Gong gleich verworfen; sie dämpfte den Gong und blockierte die Durchsage. Service-Worker `VERSION` auf v43.
- Befehlscoach: In Safari blieb das Vorlesen nach dem Gong stumm. Der Gong nutzt jetzt je Abspielen einen eigenen Audio-Kontext, der vor der Durchsage geschlossen wird (Safari spricht nicht, solange Web Audio läuft). Startet die Durchsage trotzdem nicht, liest der nächste Tipp auf „Vorlesen“ ohne Gong vor. Service-Worker `VERSION` auf v42.
- Schriften: Lizenzdatei `app/fonts/OFL-ibm-plex-mono.txt` (SIL OFL 1.1, Copyright 2017 IBM Corp.) ergänzt, die OFL verlangt Copyright-Hinweis und Lizenz bei jeder Weitergabe. Unbenutzte Schrift Barlow (400/500/600, nicht Condensed) aus `app/fonts/`, `fonts.css` und dem Cache entfernt. Service-Worker `VERSION` auf v38.
- Anleitung Android: Bestätigen mit „Installieren“ bzw. „Hinzufügen“ (je nach Menüeintrag), Hinweis für Samsung Internet als eigener Absatz statt im Chrome-Schritt. Release Notes: Stimmen-Tipp gilt für iPhone und iPad. Service-Worker `VERSION` auf v35.

### Dokumentation
- Infrastruktur-Übersicht als Excalidraw-Datei (`docs/infrastruktur.excalidraw`, #43), Skript `scripts/render-excalidraw.mjs` zum Rendern als PNG (#44), Bild `docs/infrastruktur.png` in der README (#45). Das Zwischenprodukt `docs/infrastruktur.svg` ist in `.gitignore`.

### Hinzugefügt
- Anleitung „App auf dem Home-Bildschirm“ um Android (Chrome, Samsung Internet) ergänzt. Meldung „Was ist neu“ (`NEU`, id `2026-10-12`) und Release Notes. Service-Worker `VERSION` auf v34.

### Geändert (Design-Review)
- Leiste oben mit eigenen Tokens `--bar`/`--on-bar`: im Dunkelmodus dunkles Marineblau statt hellblau.
- Startseite: Die drei Coaches sind antippbar und öffnen den Coach direkt (ohne Namen geht der Fokus aufs Namensfeld).
- Übersicht: Nur der zuletzt genutzte Coach hat den roten Knopf. Befehlscoach-Karte mit Fortschritt (Übungen von 13). Link „Startseite“ oben rechts entfernt.
- Gruppen- und Zugführer: „Was heißt gemeistert?“ zum Aufklappen. „Vergleich zum Vortag“ erst, wenn es etwas zu vergleichen gibt.
- Befehlscoach-Auswertung: „Zurücksetzen“ nur bei vorhandenen Ergebnissen, zugeklappt und nur mit passenden Knöpfen. Service-Worker `VERSION` auf v33.

### Behoben (Code-Review)
- Tastatur: Enter auf einer per Tab angesteuerten Antwort hakt sie an, statt die Frage sofort zu prüfen. Nach einem Klick auf eine Antwort prüft Enter weiter.
- Einsprechen: Teile mit Leerzeichen verbunden, doppelte Teile (Android) entfernt, Tippen während der Aufnahme beendet sie (die Korrektur bleibt). Eine noch laufende Erkennung wird vor einem Neustart beendet.
- Vorlesen stoppt auch beim Wechsel zur Abschlussauswertung. Uhrzeiten ohne führende Null („3 Uhr 15“).
- Befehlscoach: kein Ziffern-Hinweis mehr, wo es nichts mehr zu wählen gibt. Kopfzeile wird nur bei Rollen- oder Datumswechsel neu aufgebaut.
- Gemeinsames `app/coach.css` für Leiste unten, Hover und Tastaturhinweis statt dreier Kopien.
- „Was ist neu“ bleibt beim Wiederherstellen einer Sicherung unverändert.
- `CLAUDE.md`: Sprachfunktionen im Befehlscoach als bewusste Ausnahme von „nur GitHub“ festgehalten. Befehlscoach V2.15, Service-Worker `VERSION` auf v32.

### Hinzugefügt (Was ist neu)
- Fenster „Was ist neu“: erscheint nach jedem Update mit neuer Ausgabe einmal beim Start der App (bzw. in der Übersicht), beim allerersten Start nicht. Unter „Neuigkeiten“ jederzeit wieder zu öffnen. Gesehene Ausgabe unter `fwmg.neu.v1` (in Sichern/Wiederherstellen enthalten). Release Notes für Nutzer in `docs/RELEASE-NOTES.md`. Service-Worker `VERSION` auf v31.

### Geändert (Befehlscoach V2.14)
- Musterbefehl zeigt immer alle Elemente der Befehlsart. Nicht benötigte stehen als „entfällt“ da, z. B. Verteiler und Weg „entfällt beim Schnellangriff“.
- Nach einem Befehl ohne Bereitstellung folgt zum Vergleich derselbe Einsatz als „Befehl mit Bereitstellung“ (beim Schnellangriff ein Hinweis, warum es den nicht gibt).
- Reiter „Schema“: ausgefüllte Beispiele (Kellerbrand mit Bereitstellung, Zimmerbrand ohne Bereitstellung), Vorlagen ohne doppelte Stichworte.
- Trennung der Beschriftungen nur noch an festen Stellen (iOS trennte „Wasserent-nahmestel-le“). Service-Worker `VERSION` auf v30.

### Behoben (Befehlscoach V2.13)
- Musterbefehl und „Dein Befehl“: Rechts steht nur noch der Inhalt („Angriffstrupp“), nicht noch einmal das Stichwort („Einheit Angriffstrupp“), das links schon steht. „Wasser-entnahme-stelle“ und „Lage-einweisung“ trennen sauber. Service-Worker `VERSION` auf v29.

### Geändert (Befehlscoach V2.12)
- Vorlesen klingt natürlicher und zügiger: beste deutsche Stimme des Geräts (Premium, erweitert, natürlich, keine Effektstimmen), Tempo 1,12, etwas tiefer, Satz für Satz mit kurzen Pausen. Uhrzeiten („19 Uhr 30“) und Abkürzungen („im zweiten Obergeschoss“, „Pkw“) werden ausgesprochen. Service-Worker `VERSION` auf v28.

### Behoben (Befehlscoach V2.11)
- „Einsprechen“ in der iPhone-App vom Home-Bildschirm: iOS startet die Spracherkennung dort scheinbar, liefert aber keinen Text und lässt sich nicht stoppen. Dort erscheint jetzt statt des Knopfs der Hinweis auf das Mikrofon der Tastatur. Überall gilt: „Aufnahme beenden“ stoppt sofort, und eine Aufnahme ohne Ton bricht nach 6 Sekunden mit Hinweis ab. Service-Worker `VERSION` auf v27.

### Hinzugefügt (Befehlscoach V2.10)
- „Vorlesen“ in der Lage: Das Gerät liest die Lage vor. Bei der Alarmierung wie eine Leitstellendurchsage mit Gong, Einsatzstichwort vorn und Wiederholung am Ende. Neue Lagen und Rückmeldungen werden ohne Gong vorgelesen.
- „Einsprechen“ beim Befehl: Spracheingabe über die Spracherkennung des Browsers, der Text erscheint im Feld und lässt sich vor dem Auswerten korrigieren. Ohne Spracherkennung bleibt der Hinweis auf das Mikrofon der Bildschirmtastatur.
- Impressum (alle vier Dateien): Datenschutzhinweis zu Vorlesen und Spracheingabe. Die Shell erlaubt den Coaches das Mikrofon (`allow="microphone"`). Service-Worker `VERSION` auf v26.

### Behoben (iPhone als App)
- Statusleiste als eigener Bereich (`apple-mobile-web-app-status-bar-style` „default“ statt „black-translucent“). Inhalte liegen nicht mehr unter Uhrzeit und Dynamic Island, der leere Abstand unter der Leiste und die Fläche, die erst beim Herunterscrollen erschien, entfallen. Die Höhenkorrektur `--app-h` aus v24 ist damit überflüssig und entfernt. Service-Worker `VERSION` auf v25.

### Behoben
- Befehlscoach: Kopf jetzt wie im Gruppen- und Zugführer-Coach, mit taktischem Zeichen der gewählten Rolle (ohne Rolle die Flamme), Zeile „Führungsausbildung · FwDV 3 · Rolle“, Titel in gleicher Größe, Datum und Versionsfeld (V2.00). Service-Worker `VERSION` auf v23.
- iPhone: Die blaue Leiste mit „←“ und den Coaches reicht jetzt bis unter Uhrzeit und Akku (vorher grauer Streifen). Als App auf dem Home-Bildschirm füllen Coaches und Startseite den ganzen Bildschirm; vorher blieb unten ein leerer Streifen, weil iOS die Höhe zu klein meldet. Service-Worker `VERSION` auf v24.

### Geändert (einheitliches Design)
- Befehlscoach nutzt jetzt dieselben Farben (hell und dunkel), Schriften und Bausteine wie Gruppen- und Zugführer-Coach: dunkelblaue Überschriften, IBM Plex Sans, Kopf mit Datum und Streifen darunter, Reiter, Knöpfe, Antwort-Etiketten „Richtig“/„Falsch“, Ergebniskasten mit Balken links und Überschrift „Richtig“/„Falsch“/„Nicht ganz“, roter Fokusrahmen, Fortschrittsbalken.
- Gleiche Reiterfolge in beiden Fragen-Coaches: Heute · Fortschritt · Führung · Quellen.
- Leiste oben heißt „Befehlscoach“ statt „Befehle“. Auf dem iPhone zeigt der Zurück-Knopf nur den Pfeil, damit alle drei Coaches ohne Scrollen in die Leiste passen.
- Zugführer-Coach: „Lösung fehlerhaft melden“ linksbündig wie im Gruppenführer-Coach. Gruppenführer-Coach: doppelte Viewport-Angabe entfernt, `viewport-fit=cover` wie in den anderen Dateien.
- Service-Worker `VERSION` auf v20.

### Hinzugefügt (iPad und Computer)
- Leiste unten in den Fragen- und Übungsansichten aller Coaches: „Prüfen“ und „Weiter“ bleiben auch bei langen Fragen sichtbar, z. B. auf dem iPad quer oder am Laptop. In der Lernwelt endet der Coach über dem Home-Balken des iPhones.
- Tastatur (`app/tastatur.js`): Ziffern 1–9 wählen eine Antwort, Enter löst „Prüfen“/„Weiter“ aus. Hinweis darauf und Hover-Rückmeldung nur bei Geräten mit Maus. Beim Öffnen eines Coaches mit Maus geht der Fokus direkt in den Coach.
- Service-Worker `VERSION` auf v21.

### Geändert (Layout für große Bildschirme)
- Übersicht: ab 768 px drei Coach-Karten nebeneinander (iPad hoch), ab 1000 px „Einstellungen“ und „Dein Lernstand“ nebeneinander. Die Anleitung „App auf dem Home-Bildschirm“ ist mit Maus zugeklappt, auf Touch-Geräten offen.
- Fortschritt im Gruppen- und Zugführer-Coach: Listen nach Thema bzw. Kapitel ab 1000 px zweispaltig.
- Befehlscoach: gleiche Breiten und ab 768 px größere Schrift und Tippflächen wie die anderen Coaches.
- Service-Worker `VERSION` auf v22.

### Entwicklung
- Debuggen in VS Code: Konfigurationen in `.vscode/` (Chrome/Edge mit iPhone-Größe, Anhängen, Browser-Test sichtbar mit `HEADED=1`, Prüfskript) und Aufgaben für Start und Prüfungen.
- `npm start` nutzt jetzt `scripts/serve.mjs` statt `serve@14`: Der alte Server leitete `.html`-Adressen um, dadurch luden lokal die Coaches nicht. Ohne Abhängigkeiten, auch vom Browser-Test genutzt.

### Geändert
- In der App heißen die Trainer jetzt „Coach“: „Deine Coaches“, „Befehlscoach“, „Coach wechseln“ (#24). Nur Texte; Dateinamen und Speicherschlüssel bleiben. Service-Worker `VERSION` auf v19.

### Hinzugefügt
- Claude per `@claude` in Issues, Kommentaren und Reviews (`.github/workflows/claude.yml`, Einrichtung in `docs/REPOSITORY.md`). Claude darf dabei `npm ci`, `npm run check` und `npm run csp:update` ausführen.

### Behoben
- „Lernstand sichern“ nimmt jetzt auch die Einstellungen mit (`fwmg.settings.v1`, Fragen pro Runde). `npm run check` prüft, dass jeder Speicherschlüssel der Shell gesichert wird (#20). Service-Worker `VERSION` auf v17.

### Sicherheit
- Content-Security-Policy gehärtet: Inline-Skripte nur noch per SHA-256-Prüfsumme statt `'unsafe-inline'` (`scripts/csp.mjs`, `npm run csp:update`, in `npm run check` geprüft).
- Befehlstrainer übernimmt gespeicherte und wiederhergestellte Daten nur mit den erwarteten Typen. Browser-Test prüft, dass eine präparierte Sicherungsdatei keinen Code ausführt. Service-Worker `VERSION` auf v16.

### Geändert
- Eigener Abschnitt „App auf dem Home-Bildschirm“ in der Übersicht (unter „Dein Lernstand“), nicht mehr bei den Einstellungen. Anleitung für iPhone und iPad angepasst: Teilen über „Mehr“ bei kompakter Leiste, „Aktionen bearbeiten“, „Als Web-App öffnen“, Hinweis zum getrennten Speicher. Service-Worker `VERSION` auf v15.
- „Direkt einsteigen“ in der Übersicht entfernt. Stattdessen Abschnitt „Einstellungen“ für alle Trainer, zunächst „Fragen pro Runde“ (gilt für Gruppenführer und Zugführer, Schlüssel `fwmg.settings.v1`). Eingebettet zeigen die Trainer die Einstellung nicht mehr selbst. Browser-Test ergänzt. Service-Worker `VERSION` auf v13.
- Weitergabe nur durch den Autor: Hinweis im Impressum (alle vier HTML-Dateien), in README, Projektbeschreibung, Veröffentlichungs-Doku und CLAUDE.md. „zur freien Weitergabe“ entfernt. CI prüft den Hinweis. Service-Worker `VERSION` auf v12.
- Gruppenführer-Trainer zeigt das Willkommensfenster jetzt auch in der Lernwelt (eingebettet), wie der Zugführer-Trainer. Gruß einheitlich: Hallo (bis 5 Uhr), Guten Morgen (bis 11), Guten Tag (bis 18), Guten Abend. Neuer Browser-Test dafür. Service-Worker `VERSION` auf v11.
- Kontakt im Impressum und in `SECURITY.md` läuft über GitHub (Issues, Profil, vertrauliche Sicherheitsmeldung) statt über eine E-Mail-Adresse. Service-Worker `VERSION` auf v10.
- Fragen des Gruppenführer- und Zugführer-Trainers liegen als JSON in `app/data/` statt im HTML. Neue Prüfung `scripts/data.mjs` (eindeutige IDs, gültige Antwort-Indizes). Service-Worker `VERSION` auf v9.
- CI prüft in Pull Requests, ob `VERSION` in `app/sw.js` erhöht wurde, sobald sich etwas in `app/` ändert (`scripts/version.mjs`).
- Gruppenführer-Trainer zeigt das taktische Zeichen Gruppenführer nach DV 102 (`app/icons/gruppenfuehrer.svg`) statt der Flamme.
- Früheres Logo einer Feuerwehr ersetzt: Startseite, Übersicht, Gruppenführer und App-Icons zeigen eine eigene Flamme (`app/icons/flamme.svg`), der Zugführer-Trainer das taktische Zeichen Zugführer nach DV 102 (`app/icons/zugfuehrer.svg`).

### Behoben
- Logo auf Startseite und Übersicht war auf dem iPhone hochkant gestaucht.

### Geändert
- Als private App gekennzeichnet: Hinweise auf Stadt, Feuerwehr und Einheit aus Impressum, Kopfzeilen, Bildbeschreibungen und Doku entfernt.
- Projektstruktur: App-Dateien liegen gesammelt in `app/`, Dokumentation in `docs/`.

- Öffentliche Veröffentlichung über GitHub Pages aus `tomonfire/fwmg-1130-lernwelt`.
- Schriften werden lokal aus `app/fonts/` geladen statt von Google Fonts (Datenschutz, vollständig offline ab dem ersten Start).
- Service Worker lädt eine neue Fassung am HTTP-Cache vorbei und speichert nur noch eigene Dateien.

### Hinzugefügt
- Name als Pflichtfeld beim ersten Start; Gruß und Übersicht zeigen ihn. Ohne Namen geht es nicht weiter.
- Lernstand sichern und wiederherstellen als Datei (Übersicht → „Dein Lernstand“), z. B. für den Gerätewechsel.
- Datenschutz-Hinweis im Impressum.
- Projektbeschreibung, Roadmap und Dokumentationsübersicht in `docs/`.
- Hinweis „Neue Version verfügbar – Neu laden“, sobald eine neue Fassung bereitsteht.
- Sicherheitsregeln (Content-Security-Policy) in allen HTML-Dateien, `id` im Manifest.
- `npm run check` prüft zusätzlich: gleiches Impressum in allen Dateien, keine Stadt im Text, keine Verbindungen zu fremden Servern.
- Browser-Test mit Playwright (`npm run test:browser`) in der CI; `npm run check` prüft zusätzlich noindex, CSP, Impressum und fremde Server.
- Repository-Grundgerüst: `.gitignore`, CODEOWNERS, Dependabot für npm, Prüfung vor jeder Veröffentlichung, Anleitung für die GitHub-Einstellungen (`docs/REPOSITORY.md`).
- Schutz vor Suchmaschinen: `noindex,nofollow,noarchive,nosnippet,noimageindex`, `no-referrer` und `robots.txt`; Adresse wird in der Doku nicht verlinkt.

## [1.0.0] - 2026-10-11

### Hinzugefügt
- Startseite und Dashboard mit Direkteinstieg in die Trainer.
- Gruppenführer Tagestraining (408 Fragen), Zugführer Tagestraining (369 Fragen), Befehlstrainer FwDV 3.
- Installierbare Web-App mit Offline-Betrieb (Service Worker, Manifest, Icons).
- Impressum mit Hinweis „keine offizielle App“, Haftungsausschluss und KI-Hinweis.
- Einheitliche Farblogik: grün richtig, rot falsch, orange übersehen / fehlt / nicht beantwortet.
- Veröffentlichung über GitHub Pages, CI-Prüfung.

### Behoben
- Mitscrollende Leisten auf dem iPhone überdeckten Inhalt im oberen Rand.
- „Weitermachen“ im Dashboard erscheint nur noch bei wirklich offener Runde oder Prüfung.
- Doppeltes Willkommensfenster im Gruppenführer-Trainer innerhalb der Lernwelt.
