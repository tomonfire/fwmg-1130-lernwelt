# Quellenregister

Welche fachlichen Quellen die Lernwelt nutzt, in welcher Fassung, mit welchem Status und welche Fragen davon abhängen. Pflege: bei jeder Aktualitätsprüfung (siehe [Roadmap](ROADMAP.md)) und wenn eine neue Fassung erscheint.

Letzte Prüfung: **12.10.2026** (gegen den Volltext der privaten Wissensbasis, siehe [Audit](AUDIT-WISSENSBASIS.md)).

Status: **aktuell** = keine neuere Fassung bekannt · **ersetzt** = neuere Fassung erschienen · **in Änderung** = Neufassung in Arbeit.

## Fragenkataloge (Katalog, Lösungen unverändert)

| Quelle | Fassung | Status | Verwendet in |
| --- | --- | --- | --- |
| Fragenkatalog und Lösungsbogen Lernkompass (IdF NRW) | Stand 08.12.2025 | aktuell | GF Kategorien A–K (285 Fragen) |
| Vortest ZF-Basis mit Lösungen | Stand 05.02.2018 | Katalog älter als mehrere Vorschriften | ZF Kapitel 1–4 (369 Fragen) |

## Vorschriften und Gesetze

| Quelle | Fassung | Status | Abhängige Fragen / Inhalte |
| --- | --- | --- | --- |
| FwDV 1 Grundtätigkeiten | Ausgabe 2006 (in NRW eingeführt); Neufassung Stand 04/2026 | **ersetzt**, in NRW noch nicht eingeführt | GF 1.1–1.23, 5.17; ZF 1.114, 1.118, 1.136, 1.150, 1.151. Hinweise zur Vorschrift an GF 1.9, 1.13, 1.18, ZF 1.114, 1.118. Bei Einführung in NRW: Lösungen prüfen, geänderte IDs in `chg`. |
| FwDV 3 Einheiten im Lösch- und Hilfeleistungseinsatz | 02/2008 | aktuell | GF Kat. B, Befehlscoach (Quiz, Schema, Musterbefehle) |
| FwDV 7 Atemschutz | 08/2004 | aktuell | GF Kat. C, ZF |
| FwDV 10 Tragbare Leitern | 11/2019 | aktuell | GF Kat. D, ZF 1.9, 1.137, 1.144, 1.148, 1.149 (Hinweis) |
| FwDV 100 Führung und Leitung im Einsatz | Stand 10.03.1999 | aktuell | GF Kat. L (11.1xx), ZF Bereich Führung, Befehlscoach |
| FwDV 500 Einheiten im ABC-Einsatz | 01/2022 | aktuell | GF Kat. E und O (Übungsfragen); Hinweise an ZF 1.90, 1.167, 1.168, 2.9 |
| FwDV 800 / 810 IuK, Sprech- und Datenfunk | 11/2017 / 09/2018 | aktuell | GF Kat. F und N (Übungsfragen) |
| DGUV Vorschrift 49 / DGUV Grundsatz 305-002 | 2019 / 12/2021 | aktuell | GF Kat. P (Übungsfragen), ZF 1.172–1.175 |
| BHKG NRW | Stand 01.07.2021 | **in Änderung** (Novelle, LT-Drs. 18/18114) | GF 9.1–9.5 und M (Übungsfragen 12.101–12.116); ZF 3.9, 3.16–3.23, 3.37, 3.38, 3.41, 3.46, 3.51, 4.1, 4.41. Nach Verkündung: prüfen, geänderte Katalog-IDs in `chg`, Übungsfragen anpassen. |
| VOFF NRW | 09.05.2017 | aktuell | GF M (Übungsfragen) |
| Bauordnung NRW | 2018 | aktuell | Hinweise an ZF 4.10, 4.47–4.49, 4.54 (Gebäudeklassen statt „geringe/mittlere Höhe“) |

## Prüfung und Lehrgang

| Quelle | Fassung | Status | Verwendet in |
| --- | --- | --- | --- |
| Prüfungsrichtlinie GF-Basis (IdF NRW) | 12/2020, in Kraft 01.01.2021 | aktuell | GF Prüfung (15 min, 10 Punkte), GF Quellen „Prüfung und Zulassung“ |
| Ausführungsvorschrift GF-Basislehrgang (RdErl.) | 02.12.2016 | aktuell | GF Quellen „Prüfung und Zulassung“ |
| Prüfungsrichtlinie ZF-Basis, Runderlass Zugführerausbildung | 12/2020, 11.03.2024 | online gelesen, nicht im Volltext geprüft | ZF Quellen „Prüfung und Zulassung“ |

## Lernunterlagen und Fachempfehlungen (nur Abgleich, kein Text übernommen)

| Quelle | Fassung | Status | Verwendet in |
| --- | --- | --- | --- |
| IdF B1-310 Einsatztaktik für Gruppenführer | 10/2019 | aktuell | GF Gefahrenmatrix 11.2xx, Hinweis ZF 1.149 |
| IdF B1-201 Rechtsgrundlagen für Gruppenführer | 04/2021 | aktuell | Abgleich GF Kat. J |
| IdF B2-330 Vorbeugender Brandschutz für Einsatzleiter | 03/2021 | aktuell | Abgleich ZF Kap. 4 |
| IdF-Poster Führungsvorgang | – | aktuell | GF 11.3xx |
| IdF-Taschenkarte Funk | v3.0, 06.07.2021 | aktuell | GF N (Übungsfragen) |
| Erlass IM NRW zur Ölspurbeseitigung | 06.06.2007 | aktuell | GF M (Übungsfrage 12.115) |

## Regeln

- Katalogfragen und ihre Lösungen werden nicht geändert. Abweichungen neuerer Fassungen stehen im Feld `v` („Hinweis zur Vorschrift“).
- Übungsfragen (`own`) liegen nur in Kategorien „(Übungsfragen)“ und nennen in `x` die Fundstelle; `npm run check` prüft das.
- Aus Lernunterlagen (IdF, LFS) wird kein Text übernommen, nur eigene Formulierungen mit Fundstelle. Vor jeder Übernahme fremder Fragen sind die Rechte zu klären.
