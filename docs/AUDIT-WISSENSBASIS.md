# Audit: Lernwelt gegen Wissensbasis

Stand: 12.10.2026. Grundlage:

- Katalog der privaten Wissensbasis (`INDEX.md`, 60 Dateien in 7 Ordnern, Aktualität online geprüft am 12.10.2026),
- Wissensgraph der Wissensbasis (graphify über den Volltext: 1549 Knoten, davon 1401 Fachbegriffe, 4626 Kanten, 59 Themen-Communities, 33 Begriffsgruppen; `graph.json`, `GRAPH_REPORT.md`, `manifest.json`),
- Stand der App auf `main` (Fragen in `app/data/`, Texte der drei Coaches).

Ziel: prüfen, welche Quellen die App schon nutzt, wo sie veraltet oder lückenhaft ist, und daraus Anforderungen ableiten. Dieses Dokument ändert keinen Code.

## Methode und Grenzen

- Ausgewertet wurden Katalog, Wissensgraph und **Volltext** der Quellen (Markdown mit Seitenmarken, privat verwaltet). Seitenangaben „S.“ beziehen sich auf die Seitenmarken des Volltexts. Abbildungen und Tabellen fehlen im Volltext; was nur dort steht, ist als „nicht prüfbar, Original ansehen“ markiert. Interne Unterlagen wurden für die Ergebnisse unten nicht benötigt; aus ihnen steht nichts in diesem Dokument.
- Die Abdeckung ist maschinell gezählt: Für jeden Fachbegriff des Graphen wird geprüft, ob sein Name (ohne Klammerzusatz, Abkürzungen einzeln, Endungen gekürzt) in Fragen, Antworten oder Texten eines Coaches vorkommt. Stichproben zeigen falsch-negative Treffer (z. B. „Mayday“ in Anführungszeichen, „Rückmeldung nach MELDEN-Schema“). Die Prozentwerte sind **Richtwerte**; die Listen „fehlt“ sind Kandidaten, keine geprüften Lücken.
- Der `manifest.json` des Graphen enthält dieselben 60 Dateien wie der Katalog; Graph und Katalog sind also deckungsgleich.
- Quellen aus der Wissensbasis, die intern, urheberrechtlich geschützt oder örtlich sind, sind gekennzeichnet (siehe [Nicht übernehmen](#nicht-übernehmen)). Dieses Dokument nennt bewusst keine Orte, Einheiten oder Personen aus diesen Quellen.

## Ausgangslage der App

| Coach | Fachliche Quelle laut App | Umfang | Entspricht KB |
| --- | --- | --- | --- |
| Gruppenführer | Lernkompass-Lösungsbogen „Übersicht alle Fragen“ (38 S.), FwDV 100, Poster Führungsvorgang, Gefahrenmatrix (ohne Primärquelle) | 285 Katalogfragen + 123 Übungsfragen, 11 Kategorien | 2.2, 1.1, 4.1 |
| Zugführer | EvaExam „Vortest ZF-Basis mit Lösungen“ (45 S., Stand 2018), Prüfungsrichtlinie ZF-Basis (12/2020), Runderlass 2024 | 369 Fragen, 4 Kapitel | 3.1 |
| Befehlscoach | FwDV 3, FwDV 100 | 13 Lagen (9 Brand, 4 Hilfeleistung), Quiz, Schema | 1.2, 1.1 |

Fragen der Gruppenführer-Kategorien (Zahl der Fragen): A FwDV 1 (23), B FwDV 3 (39), C FwDV 7 (29), D FwDV 10 (14), E FwDV 500 (43), F Funk (7), G Einsatz-, Brand- und Löschlehre (81), H Fahrzeug- und Gerätekunde (27), J Rechtliche Grundlagen (5), K Wissenschaftliche Grundlagen (17), L Führungsvorgang (123).

## Abdeckung je Quelle

Legende: ● genutzt · ◐ teilweise / nur über Katalogfragen · ○ nicht genutzt · ✕ nicht übernehmen

| KB | Quelle (Stand) | App | Befund |
| --- | --- | --- | --- |
| 1.1 | FwDV 100 (1999) | ● | Grundlage Führung (GF Kat. L, ZF-Reiter „Führung“, Befehlscoach) |
| 1.2 | FwDV 3 (2008) | ● | GF Kat. B, Befehlscoach |
| 1.3 | FwDV 1 (**Neufassung 04/2026**) | ◐ | Fragen beruhen auf Ausgabe 2006; Neufassung nicht berücksichtigt → B1 |
| 1.4 | FwDV 2 (2012) | ○ | Ausbildungsstruktur fehlt fast ganz (1 ZF-Frage) |
| 1.5 | FwDV 7 (2004) | ● | GF Kat. C |
| 1.6 | FwDV 8 Tauchen (2014) | ◐ | Nur Einzelfragen; für Führungslehrgänge Randthema |
| 1.7 | FwDV 10 (2019) | ● | GF Kat. D |
| 1.8 | FwDV 500 (2022) | ● | GF Kat. E; Befehlscoach ohne ABC-Lage |
| 1.9, 1.10 | FwDV 800, Vordruck Kommunikationsplan | ○ | 1 Frage, kein Kommunikationsplan |
| 1.11 | FwDV 810 (2018) | ◐ | GF Kat. F nur 7 Fragen |
| 1.12–1.14 | Taktische Zeichen (2002) | ◐ | Nur als Logo genutzt (DV 102), keine Fragen |
| 1.15 | DGUV V 49 UVV Feuerwehren | ◐ | 2 GF- und 4 ZF-Fragen |
| 1.16 | DGUV G 305-002 Prüfgrundsätze | ○ | keine Fragen |
| 2.1 | GF-Fragenkatalog eines Arbeitskreises NRW (08/2023) | ○ | Großer zusätzlicher Fragenpool, Rechte ungeklärt → B9 |
| 2.2 | GF-Vortest mit Lösungen | ● | Quelle der 285 GF-Katalogfragen |
| 2.3 | IdF B1-310 Einsatztaktik GF (2019) | ○ | Als Prüfquelle für Kat. G und Erklärungen geeignet |
| 2.4 | IdF B1-201 Rechtsgrundlagen GF (2021) | ○ | GF Kat. J hat nur 5 Fragen → B4 |
| 2.5 | Musterstundenplan GF-Basis (2022) | ○ | Lernplan nach Lehrgangsablauf möglich → B7 |
| 2.6 | Prüfungsrichtlinie GF-Basis (12/2020) | ○ | GF-Prüfung (20 Fragen / 15 min) nicht gegen die Richtlinie belegt → B6 |
| 2.7 | Lehrplan GF-Vorbereitung (**INTERN**) | ✕ | enthält Namen |
| 2.8, 2.9 | Aufgabe und Lagebilder Brand- und Löschlehre | ✕ / ◐ | Fotos Dritter nicht übernehmen; Aufgabenformat als Idee → B8 |
| 3.1 | ZF-Vortest mit Lösungen (2018) | ● | Quelle der 369 ZF-Fragen |
| 3.2 | ZF-Zusammenfassung B4 (**INTERN**) | ✕ | nie ins Repository |
| 3.3 | IdF B2-330 VB für Einsatzleiter (2021) | ◐ | Nur verlinkt; ZF Kap. 4 als Prüfquelle |
| 4.1 | Poster Führungsvorgang | ● | GF Fragen 11.3xx |
| 5.1 | BHKG NRW (2021, **Novelle in Arbeit**) | ◐ | 5 GF-, 16 ZF-Fragen mit BHKG-Bezug → B2 |
| 5.2–5.4 | VOFF, Dienstgrade | ◐ | 3 Fragen; Dienstgrade nicht geübt |
| 5.5 | Ausführungsvorschrift GF-Basislehrgang (2016) | ○ | Zulassung GF fehlt in der App → B6 |
| 5.6–5.10 | Dienstgrad-/Funktionsabzeichen, Helmkennzeichnung (2017) | ○ | Bildquiz möglich → B10 |
| 5.11 | Erlass Ölspuren (2007) | ○ | Zuständigkeit als Rechtsfrage geeignet |
| 6.1–6.3 | Realbrand: Brandbekämpfung zur Menschenrettung + Taktikkarten (2019) | ◐ | 4 GF-, 8 ZF-Treffer; Befehlscoach-Lagen „Person vermisst“ ohne Bezug → B5 |
| 6.4, 6.5 | Brandsicherheitswache | ◐ | nur 5 ZF-Fragen |
| 6.6 | IdF-Lernunterlage BSW (©) | ✕ | nicht übernehmen |
| 6.7, 6.8 | Taschenkarte Funk, Merkblatt Digitalfunk (2021) | ○ | Funk-Coach (Roadmap) → B10 |
| 6.9 | Örtliche Standard-Einsatz-Regeln | ✕ | örtliche Regelung, CLAUDE.md verbietet Ortsbezug |
| 6.10 | DIN Fahrzeug-Typenliste (25. Fassung 10/2023) | ◐ | GF Kat. H; Fahrzeugangaben nicht gegen Typenliste geprüft → B3 |
| 7.1–7.10 | LFS BW F3/B3 (©) | ✕ | nur als Prüfhilfe lesen, keine Inhalte übernehmen; BW-Recht |

## Abgleich mit dem Wissensgraphen

Von 1401 Fachbegriffen der Wissensbasis kommen **536 (38 %)** in mindestens einem Coach vor. Der Wert ist niedrig, weil der Graph auch Organisations-, Norm- und Randthemen enthält (Tauchen, Feuerwehrmusik, Lehrgangsstunden). Aussagekräftig ist die Verteilung über die Communities.

**Gut abgedeckt (≥ 60 %)**

| Community | Begriffe | in der App |
| --- | --- | --- |
| Führungsvorgang | 11 | 82 % |
| ZF-Vortest Themen | 33 | 82 % |
| Führungssystem FwDV 100 | 23 | 74 % |
| Brennen und Löschen | 22 | 73 % |
| GF-Vortest und Maschinist | 28 | 71 % |
| Taktische Einheiten FwDV 3 | 29 | 69 % |
| Grundtätigkeiten FwDV 1 | 42 | 60 % |
| Persönliche Schutzausrüstung | 10 | 60 % |

Alle fünf Begriffsgruppen zum Führungsvorgang und beide zur Gliederung der Gruppe (1/8/9) sind vollständig enthalten. Der Kern der Führungsausbildung ist also gut abgebildet.

**Schwach abgedeckt (prüfungsrelevant, ≤ 35 %)**

| Community | Begriffe | in der App | Beispiele, die fehlen | Anforderung |
| --- | --- | --- | --- | --- |
| VOFF Freiwillige Feuerwehr | 19 | 0 % | Aufnahme, Ausscheiden, Dienstvergehen, Fortbildungspflicht, Funktionen | A-08 |
| ABC-Einsatzabschluss | 5 | 0 % | Abschließende Maßnahmen, Übergabe der Einsatzstelle, Dokumentation | A-25 |
| C-Einsatz / Gefahrengruppe III | 17 | 6–12 % | Gefahrengruppen IIIA–IIIC, Stufenkonzept Informationsgewinnung | A-25 |
| Dienstgrade und Abzeichen | 21 | 19 % | Funktionsabzeichen, Helmkennzeichnung, Schulterstücke | A-18 |
| IuK und Funk | 74 | 20 % | Digitalfunk BOS, Betriebsverzeichnis, Buchstabiertafel, Bevorrechtigtes Sprechen | A-09, A-16 |
| Hochhaus und Feuerwehraufzug | 10 | 20 % | Feuerwehraufzug, Depotgeschoss, Stoßtrupptaktik | A-27 |
| Taktische Ventilation | 9 | 22 % | Strömungspfad, Aktive Türkontrolle, Winddruckflamme | A-10 |
| Brandsicherheitswache | 26 | 23 % | Anforderungsstufen, Mindestpersonalstärke, Versammlungsstätte | A-11 |
| GF-Basislehrgang und Prüfung | 50 | 24 % | Prüfungsteile Facharbeit, Fallbeispiel, mündliche Prüfung | A-07, A-23 |
| Stabsarbeit und Führungsstufen | 20 | 25 % | Führungsstufen A–D, S1–S6, Einsatztagebuch, Lagekarte | A-24 |
| Ölspurbeseitigung | 8 | 25 % | Zuständigkeit nach OVG-Entscheidung, Ölbindemittel | A-08 |
| Realbrand Menschenrettung | 27 | 26 % | Prioritäten der Personensuche, Rauchgaskühlung, Knock down | A-10 |
| ABC-Einsatz und Dekontamination | 21 | 27–33 % | Dekon-Stufen I–III, Dekon-Platz, Einsatzhygiene | A-25 |
| Prüfgrundsätze DGUV 305-002 | 28 | 29 % | Prüfarten, befähigte / unterwiesene Person | A-28 |
| BHKG und Feuerwehrorganisation | 32 | 34 % | Brandschutzbedarfsplan, Befugnisse der Einsatzleitung (§ 34), Arten von Feuerwehren | A-08 |
| Rechtsgrundlagen Gruppenführer | 43 | 37 % (GF nur 5) | § 43 Inanspruchnahme, Nichtstörer, Örtlichkeitsprinzip, geschlossener Verband | A-08 |

**Begriffsgruppen mit Lücken** (Hyperkanten des Graphen, Anteil der enthaltenen Begriffe):

| Gruppe | enthalten | fehlt |
| --- | --- | --- |
| Aufbauende Führungsausbildung TF – GF – ZF – VF – Stabsarbeit | 0 / 5 | alle Lehrgänge |
| Sachgebiete der Führungsgruppe / des Stabes | 1 / 7 | S1 bis S6 |
| Einsatzmaßnahmen im ABC-Einsatz | 1 / 5 | Erst-, ergänzende, spezielle, abschließende Maßnahmen |
| Dekon-Stufenkonzept | 1 / 5 | Stufe II, Stufe III, Dekon-Platz, Übergangsbereich |
| Dienstgrade, Abzeichen, Helmkennzeichnung NRW | 1 / 6 | Funktionsabzeichen, Helmkennzeichnung |
| Ablauf Menschenrettung bei vorhandener Ventilationsöffnung | 1 / 5 | Fensterimpuls, Rauchvorhang, Angriffsventilation, Prioritäten der Suche |
| Vier Prüfungsteile der GF-Basis-Prüfung | 2 / 5 | Facharbeit (Freitext), mündliche Prüfung |
| Taktische Möglichkeiten beim Gebäudebrand | 2 / 5 | In Sicherheit bringen, Verteidigen, Angriff |
| Einsatzablauf ausgelöste Brandmeldeanlage | 2 / 5 | Schlüsseldepot, Objektschlüssel, Feuerwehrinformationszentrale |
| Brandphänomene der extremen Brandausbreitung | 2 / 4 | Roll-over, Backdraft |

**Bewusst nicht als Lücke gewertet:** Tauchen FwDV 8 (8 %, Randthema für Führungslehrgänge), Feuerwehrmusik, Lehrgangsstunden der FwDV 2, Begriffe aus den Communities „Zugführer B4 Zusammenfassung“ (interne Quelle), „Atemschutz und SER“ (örtliche Regeln) und „LFS BW Einsatztaktik“ (Landesrecht Baden-Württemberg, ©). Fachbegriffe aus diesen Communities dürfen nur über eine freie Quelle (FwDV, Gesetz, Fachempfehlung) in die App.

**Datenschutz im Graphen:** Der Graph enthält Personennamen (Ausbilder, Autoren) und Orts- und Einheitsnamen aus internen und örtlichen Quellen. Graph, Volltext und Katalog der Wissensbasis gehören darum **nicht** ins Repository; `graphify-out/` im Repository bleibt der Graph des Codes. Siehe A-22 und A-26.

## Inhaltliche Prüfung gegen den Volltext

Stand 12.10.2026. Geprüft wurden der Wortlaut aller Katalogfragen, das Prüfungsformat und gezielt die Fragen, deren Vorschrift seit dem Katalog neu erschienen ist oder deren Lösung von einer Rechtsnorm abhängt. Die Lösungen selbst stehen im Volltext der Vortests nicht (Haken und Kreuze sind Grafiken); sie wurden darum gegen die Vorschriften geprüft.

### Bestätigt

| Prüfung | Umfang | Ergebnis |
| --- | --- | --- |
| Wortlaut GF-Katalog gegen GF-Vortest (2.2) | 285 Fragen | alle Fragen gefunden; 8 Antworten weichen nur durch berichtigte Tippfehler ab (in der App als „Originalwortlaut“ ausgewiesen) |
| Wortlaut ZF-Katalog gegen ZF-Vortest (3.1) | 369 Fragen | alle Fragen gefunden; 2 Antworten (2.37) nur Schreibweise „m³“ |
| Prüfungsformat GF (A-05) | 20 Fragen, 15 min, 0,5 P | passt zur Prüfungsrichtlinie GF-Basis (2.6, S. 3–4): MC-Fragearbeit zum Vorwissen bis Truppführer, 15 Minuten, 10 Punkte, nur vollständig richtige Antworten. Die Fragenzahl 20 ist abgeleitet (10 P ÷ 0,5 P), nicht genannt. |
| FwDV 1 (2026) gegen GF Kat. A (A-02) | 23 Fragen | 20 Fragen gelten weiter, u. a. Mindestausstattung (S. 11), Schlauchreserve und C-Länge je Geschoss (S. 22), Kuppeln B-Schläuche (S. 27), leerer C-Schlauch über Leitern nur bis 1. OG (S. 29), Strahlrohre und Stützkrümmer (S. 32), Kombinationsschaumrohr nur auf Befehl (S. 35), Zumischer (S. 36), Leitungslänge 100 m (S. 74), Hebekissen mind. 75 % unter der Last (S. 89), Sicherheitsabstand 1,5-fache Seillänge (S. 96), Gleise erst auf Befehl (S. 152) |
| Rechtsfragen gegen BHKG (5.1) und B1-201 (2.4) | GF Kat. J (5) und ZF Kap. 3 (25) | keine Abweichung: Löschwasser Gemeinde, BSW § 27 (S. 16), Leitstelle, Fortbildung jährlich § 32 (S. 19–20), Platzverweis und Beauftragte § 34 (S. 20–21), Hilfeleistungspflicht ab 18 § 43 (S. 23), Grundrechte § 48, Sonderrechte § 35 StVO (B1-201 S. 19) |
| FwDV 7 (2004) gegen ZF-Fragen zu Einsatzgrundsätzen | 5 Fragen | keine Abweichung (S. 8–9: Sicherheitstrupp, Ausnahmen, Funkabbruch, Rückweg) |
| FwDV 500 (2022) gegen ZF-Fragen | 12 Fragen | Fahrzeugaufstellung mind. 50 m (S. 22), Anschlag wie Gefahrengruppe III (S. 10), Dekon als Grobreinigung (S. 26), Schutzkleidung Form 1 (S. 14–15) bestätigt; Abweichungen siehe unten |
| FwDV 10 (2019) gegen Einsatzgrundsätze | GF Kat. D, ZF 1.9 | Anstellwinkel 65°–75°, unbesetzte Leiter nicht entfernen, schadhafte Leitern sofort entziehen (S. 8–10) bestätigt |

### Abweichungen und Prüfbedarf

| Frage(n) | Befund | Quelle | Vorschlag |
| --- | --- | --- | --- |
| GF 1.9, ZF 1.114 | Lösung zählt „Selbstretten“ mit Halbmastwurf / Feuerwehrleine am Haltegurt als richtig. Die FwDV 1 (2026) erlaubt den Haltegurt mit Halbmastwurfsicherung nur noch für Halten und Rückhalten; Selbstrettungsübungen nach der Methode Auffangen; ein „Selbstretten“ ist nicht mehr beschrieben. | FwDV 1 (2026) S. 137–139 | Hinweis an der Frage: Lösung nach FwDV 1 (2006); bei Einführung der Neufassung in NRW Lösung ändern und IDs in `chg` |
| ZF 1.168 | Lösung: „zur Menschenrettung auch ohne Körperschutz Form 1, mindestens Isoliergeräte“. Die FwDV 500 (2022) lässt bei Transportunfällen nur Personendosimeter und Dosiswarngerät entfallen; mindestens Isoliergeräte mit Flammschutzhaube und Schutzkleidung nach EN 469. | FwDV 500 (2022) S. 45 | Hinweis „Katalog 2018, Wortlaut der FwDV 500 (2022) abweichend“ |
| ZF 1.149 | Frage nennt Abstände „nach der FwDV 10“ (1 m / 3 m). Die FwDV 10 (2019) nennt keine Werte mehr, sondern verweist auf DIN VDE 0105-100. | FwDV 10 (2019) S. 9–10 | Hinweis an der Frage; Werte nicht als FwDV-10-Wissen erklären |
| ZF 1.90, 1.167, 2.9 | Begriff „Not-Dekontamination“; die FwDV 500 (2022) spricht von „Sofort-Dekontamination (Dekon-Stufe I)“. Inhalt stimmt. | FwDV 500 (2022) S. 26 | Erklärung mit neuem Begriff |
| GF 1.13, ZF 1.118 | Feste 200 m Vorwarnung außerorts. Die FwDV 1 (2026) nennt als Faustregel die doppelte gefahrene Geschwindigkeit (80 km/h → 160 m); auf Autobahnen Vorwarnungen bei 200, 400, 600 und 800 m (GF 1.1 passt). | FwDV 1 (2026) S. 151 | Hinweis an der Frage |
| GF 1.18 | Antworten stimmen; die FwDV 1 (2026) verlangt beim Schaumeinsatz zusätzlich mindestens Gesichtsschutz. | FwDV 1 (2026) S. 34 | Erklärung ergänzen |
| GF 1.7 | Reihenfolge der Abgänge am Verteiler steht in der FwDV 1 (2026) nur in einer Abbildung. | FwDV 1 (2026) S. 31 | nicht prüfbar, Original ansehen |
| GF 4.3, 4.5; ZF 1.137, 1.144, 1.148 | Rettungshöhen der Leitern stehen in der FwDV 10 (2019) nur in Abbildung 1. | FwDV 10 (2019) S. 7 | nicht prüfbar, Original ansehen |

### Noch nicht geprüft

GF Kat. B (FwDV 3), E (FwDV 500), F (Funk), G, H, K und L (Übungsfragen zum Führungsvorgang gegen FwDV 100), die übrigen Fragen in ZF Kap. 1, 2 und 4 sowie die Texte des Befehlscoachs. Für diese Fragen ist der Katalog jünger als die Vorschrift oder die Vorschrift unverändert; das Risiko ist geringer.

## Befunde

**B1 – FwDV 1 neu gefasst.** Die Wissensbasis führt die Neufassung 04/2026 (156 S.); in NRW gilt formal noch 09/2006. Die 23 GF-Fragen der Kategorie A und weitere Fragen mit FwDV-1-Bezug (Schläuche, Verkehrsabsicherung, Mindestschutzausrüstung) beruhen auf der alten Ausgabe. Nutzer sehen nicht, welche Fassung gemeint ist.

**B2 – BHKG vor Novelle.** Die Novelle (LT-Drs. 18/18114) ist in Beratung. 21 Fragen mit BHKG-Bezug können nach der Verkündung falsch werden. Der ZF-Katalog (2018) erwähnt teils das FSHG-Umfeld; die App weist darauf schon allgemein hin.

**B3 – Aktualität der Kataloge nicht geprüft.** Der ZF-Katalog ist von 2018, die Vorschriften FwDV 10 (2019), FwDV 500 (2022), FwDV 810 (2018), DGUV G 305-002 (2021) und die Typenliste (2023) sind teils jünger. Ein Abgleich Frage für Frage gegen die aktuelle Fassung fehlt.

**B4 – Lücken in prüfungsrelevanten Themen.** Recht (GF Kat. J: 5 Fragen) ist im Verhältnis zur Lehrunterlage B1-201 dünn. Funk (7 Fragen), Kommunikationsplan (0), UVV/Prüfgrundsätze (0–2), taktische Zeichen (0) und Brandsicherheitswache (GF 0) kommen kaum vor, obwohl die Quellen vorliegen.

**B5 – Befehlscoach ohne neuere Taktik.** Die Lagen „Zimmerbrand, Person vermisst“ und „Wohnungsbrand, Kind vermisst“ passen zur Fachempfehlung Realbrand (6.1–6.3), die Auswertung bezieht sich aber nur auf FwDV 3. Es fehlen Lagen mit ABC-Bezug (FwDV 500, GAMS) und Lagen für die Staffel.

**B6 – Prüfung und Zulassung GF fehlen.** Der Zugführer-Coach erklärt Prüfung und Zulassung nach Richtlinie und Erlass, der Gruppenführer-Coach nicht. Beide Coaches sollen gleich aufgebaut sein. Das Format der GF-Prüfung in der App ist inzwischen gegen die Prüfungsrichtlinie belegt (siehe [Inhaltliche Prüfung](#inhaltliche-prüfung-gegen-den-volltext)).

**B7 – Lernen ohne Bezug zum Lehrgangsablauf.** Der Musterstundenplan (2.5) zeigt, in welcher Reihenfolge der Stoff im Lehrgang kommt. Die App kennt keine Lehrgangstermine (Roadmap-Idee „Prüfungstermine“).

**B8 – Nur Ankreuzfragen.** Die Wissensbasis enthält Lagebild-Aufgaben (2.8/2.9) und Taktikkarten. Die App bietet außer dem Befehlscoach keine Lageaufgaben mit Bild.

**B9 – Fragen ohne Fundstelle.** Katalogfragen haben in `app/data/*.json` keine Fundstelle (Vorschrift, Abschnitt, Seite). Die Wissensbasis hat Volltexte mit Seitenmarken; damit ließe sich jede Antwort belegen. Der zusätzliche Fragenkatalog 2.1 (2023) wäre ein großer Pool, die Rechte sind aber ungeklärt (Roadmap „Lizenz und Rechte“).

**B10 – Neue Coaches haben Quellen.** Die Roadmap nennt Funk und Atemschutz; die Wissensbasis deckt beides (1.5, 1.9–1.11, 6.7, 6.8). Dazu kämen taktische Zeichen (1.12–1.14) und Dienstgrade/Abzeichen (5.2–5.10).

**B12 – Nur der Vortest wird geübt.** Laut Wissensgraph hat die GF-Basisprüfung vier Teile (Vortest, Facharbeit mit Freitextfragen, Fallbeispiel, mündliche Prüfung); die ZF-Prüfung nach Richtlinie ebenso Facharbeit, zwei Fallbeispiele und mündliche Prüfung. Beide Coaches üben nur den Ankreuz-Vortest.

**B13 – Zugführer-Themen ohne Übung.** Stabsarbeit, Führungsstufen A–D, Sachgebiete S1–S6, Einsatztagebuch und Lagekarte sind im ZF-Coach kaum vorhanden, obwohl sie zum Übergang Gruppenführer → Zugführer gehören.

**B11 – Kein Quellenregister im Repository.** Welche App-Inhalte auf welcher Quelle und welchem Stand beruhen, steht verstreut in den Quellen-Reitern. Die Aktualitätsprüfung der Wissensbasis (online geprüft, „In Änderung“, „Ersetzt“) wird nicht in die App übertragen.

## Anforderungen

Priorität: **M** = muss (Richtigkeit, Pflege), **S** = soll (Lernwert), **K** = kann (Ausbau). Jede Anforderung nennt die Quelle aus der Wissensbasis und ein Abnahmekriterium. Alle Umsetzungen folgen den Regeln in `CLAUDE.md` (beide Coaches gleich, `VERSION`, `npm run check`, „Was ist neu“, Release Notes).

### Richtigkeit und Aktualität

| ID | Prio | Anforderung | KB | Abnahme |
| --- | --- | --- | --- | --- |
| A-01 | M | **Fassung der FwDV 1 kennzeichnen.** GF Kat. A und alle Fragen mit FwDV-1-Bezug zeigen „FwDV 1 (Ausgabe 2006, in NRW eingeführt)“; Quellen-Reiter erklärt, dass eine Neufassung 04/2026 existiert und in NRW noch nicht eingeführt ist. | 1.3 | Hinweis in GF und ZF sichtbar; Quellen-Reiter nennt beide Fassungen mit Stand. |
| A-02 | M | **Delta-Prüfung FwDV 1.** *(GF Kat. A erledigt, siehe Inhaltliche Prüfung; offen: Fragen mit FwDV-1-Bezug außerhalb Kat. A und im ZF-Katalog)* Jede FwDV-1-Frage gegen die Neufassung prüfen und eine Liste „gilt weiter / ändert sich / entfällt“ führen. Bei Einführung in NRW Lösungen anpassen und die IDs in `chg` eintragen, damit der Lernstand dieser Fragen zurückgesetzt wird. | 1.3 | Liste in `docs/` vorhanden; geänderte Fragen stehen in `chg`. |
| A-03 | M | **BHKG-Novelle beobachten.** Fragen mit BHKG-Bezug (GF und ZF) markieren (`docs/`-Liste der IDs). Nach Verkündung prüfen, anpassen, IDs in `chg`. | 5.1 | ID-Liste vorhanden; Wiedervorlage in der Roadmap. |
| A-04 | M | **Katalogfragen gegen aktuelle Vorschriften prüfen.** *(teilweise erledigt, siehe Inhaltliche Prüfung)* ZF-Katalog (2018) und GF-Katalog Frage für Frage gegen die in der KB als aktuell geprüften Fassungen (FwDV 3, 7, 10, 500, 810, DGUV, Typenliste) abgleichen. Abweichungen nicht stillschweigend ändern, sondern wie beim GF-Katalog mit Hinweis „Originalwortlaut / aktuelle Vorschrift“ zeigen. | 1.2–1.16, 6.10 | Prüfprotokoll je Kategorie; abweichende Fragen tragen einen sichtbaren Hinweis. |
| A-05 | M | **Prüfungsformat GF belegen.** *(belegt; offen: Angabe im Quellen-Reiter)* Dauer, Fragenzahl und Punkte der GF-Prüfung gegen Prüfungsrichtlinie GF-Basis und Ausführungsvorschrift prüfen und im Quellen-Reiter nennen; nicht belegte Werte als „aus der Richtlinie abgeleitet“ kennzeichnen (wie im ZF-Coach). | 2.6, 5.5 | GF-Quellen nennen Richtlinie mit Stand; Prüfung entspricht ihr oder ist gekennzeichnet. |
| A-06 | S | **Fundstellen je Frage.** Optionales Feld `f` in `app/data/*.json` (z. B. `"FwDV 3, 5.2.1"`), in der Auflösung nach der Antwort angezeigt. `npm run check` prüft, dass `f` ein String ist; Ausgabe mit `esc()`. Zuerst für Kategorien mit Vorschrift im Namen (GF A–F). | 1.x Volltext | Feld dokumentiert in `docs/ARCHITEKTUR.md`; Check und Anzeige in GF und ZF. |

### Inhalt und Lernwert

| ID | Prio | Anforderung | KB | Abnahme |
| --- | --- | --- | --- | --- |
| A-07 | S | **Prüfung und Zulassung im GF-Coach.** Abschnitt im Quellen-Reiter wie im ZF-Coach: Ablauf der GF-Basisprüfung und Zulassungsvoraussetzungen nach Ausführungsvorschrift, mit „Ergänzung“-Kennzeichnung. | 2.6, 5.5 | Abschnitt vorhanden, gleich aufgebaut wie im ZF-Coach. |
| A-08 | S | **Rechtsfragen ausbauen.** Eigene, als „Ergänzung“ gekennzeichnete Übungsfragen zu BHKG (Aufgaben, Pflichten, Einsatzleitung), VOFF (Laufbahn, Dienstgrade), UVV Feuerwehren und Zuständigkeit bei Ölspuren. Eigene Formulierung, Fundstelle je Frage. | 5.1–5.4, 5.11, 1.15, 2.4 (nur Prüfhilfe) | Mind. 25 neue Fragen in GF Kat. J; keine kopierten Texte aus IdF-Unterlagen. |
| A-09 | S | **Funk und Kommunikation ausbauen.** Übungsfragen zu FwDV 800/810 (Gesprächsdisziplin, Rufnamen, Betriebsarten, Kommunikationsplan). | 1.9–1.11, 6.7 | GF Kat. F mind. 25 Fragen; Kommunikationsplan als Übung „Was gehört dazu?“. |
| A-10 | S | **Befehlscoach: Menschenrettung nach Realbrand.** Lagen mit vermissten Personen bekommen in der Auswertung den Bezug zur Fachempfehlung (Wahl der Vorgehensweise nach Ventilationsöffnung, Rauchschutz, Angriffsweg). Eigene Zusammenfassung, keine Kopie der Taktikkarten. | 6.1–6.3 | Auswertung nennt die Fachempfehlung als Quelle; Quiz enthält Fragen dazu. |
| A-11 | S | **Befehlscoach: weitere Lagen.** Mindestens eine ABC-Lage (FwDV 500, Gefahrstoffaustritt), eine Lage für die Staffel und eine Brandsicherheitswache-nahe Lage. | 1.2, 1.8, 6.4 | 3 neue Lagen; Lagen ohne Ortsbezug. |
| A-12 | S | **Fahrzeugkunde gegen Typenliste.** Fahrzeugangaben in GF Kat. H und im Befehlscoach (Fahrzeuge der Lagen) gegen die DIN-Typenliste (25. Fassung) prüfen; veraltete Typbezeichnungen kennzeichnen. | 6.10 | Prüfprotokoll; Hinweise an betroffenen Fragen. |
| A-13 | K | **Lernplan nach Lehrgang.** Optional Lehrgangsbeginn eingeben; die Tagesrunde gewichtet Themen nach dem Musterstundenplan und zeigt die verbleibenden Tage. Neuer Schlüssel in `KEYS`. | 2.5 | Einstellung in der Übersicht; ohne Datum unverändertes Verhalten. |
| A-14 | K | **Lageaufgaben mit Bild.** Aufgabenformat „Lagebild beurteilen“ (Gefahren, Maßnahmen) mit eigenen oder freien Bildern bzw. Skizzen. | 2.8 (Format), 4.1 | Prototyp mit 3 Aufgaben; keine Fotos Dritter. |

| A-23 | S | **Freitext und Fallbeispiel üben.** Neuer Übungstyp in GF- und ZF-Coach: offene Frage oder kurzes Fallbeispiel, eigene Antwort eintippen, danach Musterlösung mit Stichpunkten zum Selbstabgleich (je Stichpunkt „hatte ich / fehlte“, Farben `--ok` / `--miss`). Keine automatische Bewertung. | 2.6, 5.5, ZF-Prüfungsrichtlinie | In beiden Coaches gleich; mind. 10 Aufgaben je Coach; `kb` für Ziffern-Auswahl. |
| A-24 | S | **Stabsarbeit und Führungsstufen im ZF-Coach.** Reiter „Führung“ um Führungsstufen A–D, Sachgebiete S1–S6, Führungsmittel (Einsatztagebuch, Lagekarte) erweitern; Übung „Was gehört dazu?“. | 1.1, 1.12 | Phase „Führungsebenen“ enthält diese Begriffe; Übungsfragen mit Fundstelle FwDV 100. |
| A-25 | S | **ABC-Ablauf vollständig.** In GF Kat. E Übungen zu Einsatzmaßnahmen (Erst-, ergänzende, spezielle, abschließende), Gefahrengruppen I–III mit A/B/C, Dekon-Stufen I–III und Bereichen (Gefahren-, Übergangs-, Absperrbereich). | 1.8 | Jede der vier Begriffsgruppen als Übung vorhanden. |
| A-27 | K | **Vorbeugender Brandschutz im Einsatz.** ZF Kap. 4 und Befehlscoach: ausgelöste Brandmeldeanlage (Laufkarte, Schlüsseldepot, Informationszentrale), Gebäudeklassen, Hochhaus und Feuerwehraufzug; Befehlscoach-Lage „BMA ausgelöst“. | 3.3 | Übung und eine Lage vorhanden. |
| A-28 | K | **Prüfgrundsätze.** Übungsfragen zu Prüfarten (Sicht-, Funktions-, regelmäßige Prüfung), befähigter und unterwiesener Person, Prüfnachweis; Bezug zur Verantwortung des Einheitsführers. | 1.16, 1.15 | GF Kat. H mind. 10 Fragen dazu. |

### Neue Coaches

| ID | Prio | Anforderung | KB | Abnahme |
| --- | --- | --- | --- | --- |
| A-15 | K | **Coach „Taktische Zeichen“.** Zeichen erkennen und zusammensetzen (Grundzeichen, Einheiten, Führungsstellen), erzeugt mit der schon genutzten Bibliothek. | 1.12–1.14 | Eigener Coach in `ORDER` hinter den bisherigen; Kopf `.mast` wie in allen Coaches. |
| A-16 | K | **Coach „Funk“.** Funkgespräche nach FwDV 810 üben (Rufnamen, Meldungen, Lagemeldung nach Schema). Kann Sprachfunktionen wie der Befehlscoach nutzen. | 1.11, 6.7, 6.8 | Roadmap-Punkt „Weitere Trainer“ teilweise erledigt. |
| A-17 | K | **Coach „Atemschutz“.** Überwachung, Einsatzgrundsätze, Rückzugszeit nach FwDV 7. | 1.5 | wie A-16. |
| A-18 | K | **Dienstgrade und Abzeichen.** Bildquiz Dienstgrad-/Funktionsabzeichen und Helmkennzeichnung NRW, Abbildungen selbst gezeichnet als SVG. | 5.3, 5.6–5.10 | Übung im GF-Coach oder eigener Coach. |

### Pflege und Nachweis

| ID | Prio | Anforderung | KB | Abnahme |
| --- | --- | --- | --- | --- |
| A-19 | M | **Quellenregister.** `docs/QUELLEN.md`: jede fachliche Quelle der App mit Stand, Status („aktuell“, „ersetzt“, „in Änderung“), Prüfdatum und betroffenen Fragen-IDs; Bezug zur KB-Nummer nur intern. Bei jeder Aktualitätsprüfung der Wissensbasis nachziehen. | INDEX „Aktualität“ | Datei vorhanden, verlinkt aus `docs/README.md`. |
| A-20 | S | **Jährliche Aktualitätsprüfung.** Wiederkehrender Punkt in der Roadmap: Quellenregister gegen neue Ausgaben prüfen, Quellen-Reiter der Coaches anpassen. | INDEX | Roadmap-Eintrag; Datum der letzten Prüfung in `docs/QUELLEN.md`. |
| A-21 | S | **Rechte klären vor Übernahme.** Vor Übernahme von Fragen aus 2.1 oder Inhalten aus IdF-Unterlagen Rechte klären (Roadmap „Lizenz und Rechte“). Bis dahin nur eigene Formulierungen mit Fundstelle. | 2.1, 2.3, 2.4, 3.3 | Entscheidung in der Roadmap dokumentiert. |
| A-22 | S | **Check gegen verbotene Inhalte.** `npm run check` erweitert um eine Liste von Begriffen aus internen und örtlichen Quellen (Ausbildernamen, Orts- und Einheitsnamen), die nie in `app/` oder `docs/` stehen dürfen. Die Liste selbst liegt nicht im Repository (z. B. Umgebungsvariable oder lokale Datei in `.gitignore`), damit sie die Begriffe nicht selbst veröffentlicht. | 2.7, 3.2, 6.9 | Check schlägt bei einem Treffer fehl; ohne Liste wird er übersprungen. |

| A-26 | K | **Abdeckung wiederholbar messen.** Skript `scripts/abdeckung.mjs`, das einen **lokalen** Wissensgraphen (Pfad als Argument, außerhalb des Repositorys) gegen `app/data/` und die Coaches abgleicht und die Tabelle je Community ausgibt. Nicht in der CI, keine Inhalte des Graphen ins Repository. | Graph | Skript läuft ohne Installation; Ausgabe entspricht dem Abschnitt „Abgleich mit dem Wissensgraphen“. |

## Nicht übernehmen

| KB | Grund |
| --- | --- |
| 2.7, 3.2 | Intern, enthält Namen bzw. ist nicht zur Veröffentlichung bestimmt. Nie in Repository, App oder geteilte Inhalte. |
| 6.6, 7.1–7.10 | Urheberrecht (IdF, LFS BW). Höchstens als Prüfhilfe für eigene Formulierungen lesen. LFS-BW-Unterlagen beziehen sich zudem auf das Landesrecht Baden-Württemberg. |
| 6.9 | Örtliche Einsatzregeln; widerspricht der Regel „keine Hinweise auf eine bestimmte Stadt, Feuerwehr oder Einheit“. Allgemeine Grundsätze daraus nur, wenn sie auch in FwDV oder Fachempfehlungen stehen. |
| 2.9 | Einsatzfotos Dritter; Rechte nicht geklärt. |

## Vorschlag zur Reihenfolge

1. **A-19, A-01, A-03, A-05, A-22**: wenig Aufwand, macht Stand und Grenzen der Inhalte sichtbar und schützt vor internen Inhalten.
2. **A-02, A-04, A-12**: fachliche Prüfung mit der Wissensbasis (Volltext mit Seitenmarken), Ergebnis als Protokoll in `docs/`.
3. **A-06, A-07, A-08, A-09, A-25**: Lernwert in den bestehenden Coaches, größte Lücken laut Graph (Recht, VOFF, Funk, ABC).
4. **A-23, A-24**: Prüfungsteile außer dem Vortest, Zugführer-Themen.
5. **A-10, A-11**: Befehlscoach.
6. **A-13 bis A-18, A-26 bis A-28**: Ausbau, nach Rückmeldung der Nutzer.
