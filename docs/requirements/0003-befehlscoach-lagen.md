# 0003 Befehlscoach: Realbrand-Bezug, neue Lagen, Fahrzeuge (A-10, A-11, A-12)

## Ziel

Der Befehlscoach verbindet Lagen mit vermissten Personen mit der Fachempfehlung zur Brandbekämpfung zur Menschenrettung und deckt mit drei neuen Lagen ABC, Staffel und Brandsicherheitswache ab. Fahrzeugangaben entsprechen der DIN-Typenliste (25. Fassung, 26.10.2023); alle Erweiterungen sind als Ergänzung gekennzeichnet und verändern bestehende Lagen und ihren Lernstand nicht.

## User Stories

1. Als Gruppen- oder Zugführer möchte ich in der Auswertung einer Lage mit vermisster Person die Kernpunkte der Menschenrettung nach Realbrand sehen, damit ich Befehl und Taktik verknüpfe.
2. Als Gruppenführer möchte ich eine ABC-Lage, eine Staffel-Lage und eine Lage an einer Brandsicherheitswache üben, damit ich auch seltene Lagen sicher befehle.
3. Als Lernender möchte ich, dass Fahrzeugnamen der aktuellen Typenliste entsprechen, damit ich keine veralteten Bezeichnungen lerne.

## Akzeptanzkriterien

1. **Realbrand-Bezug:** Given eine Lage mit Feld `rb` (mind. `zimmerbrand`, `z-wohnhaus`, `z-halle`), When ich sie beende, Then zeigt die Auswertung den Kasten „Menschenrettung nach Realbrand“ (Badge „Ergänzung“) mit 2–4 eigenen Stichpunkten zu Ventilationsöffnung und Vorgehensweise, Rauchschutz und Angriffsweg sowie der Quelle „Fachempfehlung Brandbekämpfung zur Menschenrettung (2019)“ mit Abschnitt.
2. **Ohne Wertung:** Given der Kasten, Then ändert er Punktzahl, Bestwert und Verlauf der Lage nicht; Lagen ohne `rb` zeigen ihn nicht.
3. **Quiz:** Given das Quiz, Then enthält es mind. 4 neue Fragen zur Menschenrettung nach Realbrand mit Erklärung und Fundstelle, eigene Formulierung, keine Kopie der Taktikkarten.
4. **Drei neue Lagen:** Given die Lagenliste der Rolle Gruppenführer, Then gibt es (a) ABC-Lage mit Gefahrstoffaustritt nach FwDV 500 (Erkundung, Absperrung, GAMS), (b) Lage für eine Staffel (1/5/6: Angriffs- und Wassertrupp, ohne Schlauchtrupp und Melder in den Auswahllisten), (c) Brandsicherheitswache-nahe Lage (Entstehungsbrand bei einer Veranstaltung, Bezug BHKG § 27 bzw. BSW-Leitfaden). Jede Lage hat Beurteilung, mind. einen Befehl mit Feldern und Schlüsselwörtern (`f`, `kw`) und Kontrolle wie die vorhandenen.
5. **Kennzeichnung und Trennung:** Given die Lagenliste, Then tragen die drei neuen Lagen das Badge „Ergänzung“; IDs und Inhalte bestehender Lagen sind unverändert, ihr Lernstand in `bt-fwdv3` bleibt erhalten; neue Lagen speichern unter eigener neuer ID.
6. **Ohne Ortsbezug:** Given die Texte der neuen Lagen, Then nennen sie keine Stadt, Feuerwehr, Einheit, Person oder Firma.
7. **Fahrzeuge Befehlscoach:** Given alle Lagen und Quizfragen, When ein Fahrzeug genannt wird, Then ist es eine Bezeichnung der Typenliste (z. B. TSF-W, MLF, HLF 20) oder neutral („Löschfahrzeug“).
8. **Check:** Given `npm run check`, Then meldet ein Check Fahrzeugkürzel in `app/apps/befehlstrainer.html`, die nicht in einer Positivliste aus der Typenliste stehen, und prüft, dass jede Lage mit `rb` eine Quelle hat.
9. **Fahrzeuge GF Kat. H:** Given GF Kat. H, Then steht in `docs/QUELLEN.md` ein Prüfprotokoll je Frage mit Fahrzeugangabe (mind. 8.1, 8.9, 8.11, 8.14); veraltete Bezeichnungen (z. B. SW 2000, heute GW-L2) bekommen einen Hinweis `v`; Lösung, `a` und `chg` bleiben unverändert.
10. **Pflicht-Nacharbeit:** Kein neuer localStorage-Schlüssel, Ausgabe über `esc()`, keine Inline-Handler, `npm run csp:update`, `VERSION`, `NEU`, `docs/RELEASE-NOTES.md`; `npm run check` grün.

## Nicht im Umfang

- Neue Lagen für die Rolle Zugführer, eine Lage „BMA ausgelöst“ (A-27), Bilder oder Skizzen.
- Änderungen an Befehlsschema, Wertung oder Sprachfunktionen; Kopie der Taktikkarten.
- Lösungsänderungen in GF Kat. H.

## Datenformat

Neue Lagen im vorhandenen Format von `SCEN`, dazu optionale Felder:

```js
{ id: 'abc-austritt', kind: 'hilfe', ext: true, title: 'Gefahrstoff tritt aus', … }
{ id: 'zimmerbrand', …, rb: { p: ['Ventilationsöffnung erkennen und Vorgehen danach wählen', '…'],
                            q: 'Fachempfehlung Brandbekämpfung zur Menschenrettung (2019), Abschn. 11.4' } }
```

`ext: true` steuert das Badge „Ergänzung“; `rb` den Kasten in der Auswertung.

## UI/UX-Hinweise

Kasten in der Auswertung unter „Noch einmal ansehen“, Stil wie vorhandene Hinweise. Neue Lagen in der bestehenden Liste (ABC unter Hilfeleistung) mit Badge, ohne neuen Reiter.

## Annahmen & offene Fragen

- Annahme: ABC-Lage läuft als `kind: 'hilfe'`, damit keine neue Liste nötig ist.
- Annahme: Die drei Lagen gehören zur Rolle Gruppenführer; die Staffel führt ein Staffelführer mit GF-Qualifikation.

## Aufteilung

1. **senior-developer:** Felder `rb`/`ext`, Kasten in der Auswertung, Fahrzeug-Check, `VERSION`, CSP.
2. **senior-developer:** Drei Lagen und 4 Quizfragen aus Volltext (FwDV 3, FwDV 500, BHKG, BSW-Fachempfehlungen, Realbrand), Prüfprotokoll Kat. H mit `v`-Hinweisen.
3. **ui-ux-experte:** Texte der Lagen und Stichpunkte, Badge und Kasten, `NEU`, Release Notes.
