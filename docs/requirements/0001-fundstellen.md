# 0001 Fundstellen je Katalogfrage (A-06)

## Ziel

Lernende sehen nach der Antwort, wo die Lösung einer Katalogfrage in der Vorschrift oder im Gesetz steht, und können gezielt nachlesen. Die Fundstelle ist eine gekennzeichnete Ergänzung; Fragetext, Optionen und Katalog-Lösung bleiben unverändert.

## User Stories

1. Als Lehrgangsteilnehmer möchte ich nach dem Prüfen einer Frage die Fundstelle sehen, damit ich die Begründung in der Vorschrift nachlesen kann.
2. Als Lehrgangsteilnehmer möchte ich in der Auswertung einer Prüfung die Fundstellen meiner falschen Fragen sehen, damit ich gezielt nacharbeite.
3. Als Autor möchte ich Fundstellen ohne Code in `app/data/*.json` pflegen, damit ich sie schrittweise ergänzen kann.

## Akzeptanzkriterien

1. **Startumfang:** Given GF Kat. A (FwDV 1, 23 Fragen), GF Kat. J (Recht, 5 Fragen) und ZF Kap. 3 (Recht, 53 Fragen), When der PR fertig ist, Then steht jede dieser 81 IDs in einer Prüfliste in `docs/QUELLEN.md` mit Ergebnis „Fundstelle“ (Text von `f`) oder „nicht belegbar“ (mit Grund).
2. **Nur belegt:** Given eine Frage hat `f`, When man die Fundstelle im Volltext der Wissensbasis (`_Volltext/`, Datei und Seite) aufschlägt, Then stützt die Stelle die Katalog-Lösung. Sonst bekommt die Frage kein `f`.
3. **Fassung:** Given die Fundstelle stammt aus einer anderen Fassung als der Katalog (z. B. FwDV 1 Ausgabe 2026), When `f` angezeigt wird, Then nennt `f` die Fassung (z. B. „FwDV 1 (2026), 5.4“).
4. **Trennung:** Given der PR, When man den Diff von `app/data/*.json` ansieht, Then ändern sich an Katalogfragen nur `f`-Felder; `id`, `t`/`q`, `o`, `a`, `v`, `chg` sind unverändert. Übungsfragen (`own`) bekommen kein `f` (ihre Fundstelle steht in `x`).
5. **Anzeige GF und ZF gleich:** Given eine Frage mit `f`, When sie in Tagesrunde, Kapitelrunde oder Führung geprüft wurde, Then erscheint unter der Auflösung (nach „Hinweis zur Vorschrift“, falls vorhanden) die Zeile „Fundstelle: …“ mit Kennzeichnung „Ergänzung“; ohne `f` erscheint nichts.
6. **Prüfung:** Given eine laufende Prüfung, When eine Frage angezeigt wird, Then ist `f` nicht sichtbar; erst die Auswertung nach Abgabe zeigt es.
7. **Kein Einfluss auf Lernstand:** Given Fragen mit und ohne `f`, When man Runden und Prüfung spielt, Then sind Punkte, Lernstand und Auswahl der Fragen identisch zum Stand vor dem PR.
8. **Check:** Given `npm run check` (`scripts/data.mjs`), When `f` vorhanden ist, Then muss es ein nicht leerer String (max. 80 Zeichen) sein, und `f` an einer Frage mit `own: true` ist ein Fehler.
9. **Sicherheit:** Given `f`, When es ausgegeben wird, Then nur über `esc()` bzw. Textknoten.
10. **Doku und Hinweise:** `docs/ARCHITEKTUR.md` beschreibt `f`; der Reiter Quellen beider Coaches erklärt Fundstellen in einem Satz; `NEU`, `docs/RELEASE-NOTES.md`, `VERSION` in `app/sw.js` sind ergänzt; `npm run check` ist grün.

## Nicht im Umfang

- Fundstellen für die übrigen Kategorien (folgen in eigenen PRs nach derselben Prüfliste).
- Wörtliche Zitate, Links auf Volltexte oder Dateien der Wissensbasis, Seitenzahlen der privaten PDFs in der App.
- Änderungen an Lösungen; neue Reiter; neuer localStorage-Schlüssel.

## Datenformat

Optionales Feld `f` (String) an Katalogfragen, Form „Quelle (Fassung, nur wenn abweichend), Abschnitt/§“:

```json
{ "id": "3.17", "k": 3, "q": "Welche Aussage(n) trifft das BHKG zu Brandsicherheitswachen?", "o": ["…"], "a": [0, 2], "f": "BHKG NRW, § 27" }
```

## UI/UX-Hinweise

Eine Zeile in Fußnotengröße unter der Auflösung, Kennzeichnung wie die vorhandenen „Ergänzung“-Badges, keine neue Farbe. Gleiche Position und Wortwahl in GF und ZF.

## Annahmen & offene Fragen

- Annahme: GG, VwVfG, StVO und GO NRW liegen nicht als Volltext vor; Fragen dazu bekommen nur dann `f`, wenn die IdF-Unterlage B1-201 die Aussage belegt, sonst „nicht belegbar“. Daher ist keine Mindestzahl an `f` festgelegt.
- Annahme: Für Kat. A gilt Kriterium 3, weil der Volltext die FwDV 1 (2026) enthält, NRW aber die Ausgabe 2006 führt.

## Aufteilung

1. **senior-developer:** Check für `f` in `scripts/data.mjs`, Anzeige in GF und ZF (Auflösung, Auswertung, nicht während der Prüfung), Doku `ARCHITEKTUR.md`, `VERSION`, CSP.
2. **senior-developer:** Prüfliste der 81 IDs gegen den Volltext und Eintragen von `f` (eigene Kurzangabe, keine Zitate).
3. **ui-ux-experte:** Gestaltung und Text der Fundstellenzeile, Satz im Reiter Quellen, `NEU` und Release Notes.
