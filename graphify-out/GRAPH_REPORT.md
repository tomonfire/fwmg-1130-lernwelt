# Graph Report - fwmg-1130-lernwelt  (2026-10-12)

## Corpus Check
- 53 files · ~89,173 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .woff2 12, (none) 5, .css 2)

## Summary
- 254 nodes · 507 edges · 10 communities
- Extraction: 77% EXTRACTED · 23% INFERRED · 1% AMBIGUOUS · INFERRED: 116 edges (avg confidence: 0.81)
- Token cost: 233,146 input · 0 output

## Community Hubs (Navigation)
- Befehlscoach
- Shell index.html
- Prüf- und Testskripte
- Gruppenführer-Coach
- Repo-Regeln und CI
- Zugführer-Coach
- Offline und Doku
- package.json
- Logo und taktische Zeichen
- Infrastruktur-Diagramm

## God Nodes (most connected - your core abstractions)
1. `befehlstrainer.html (Befehlscoach)` - 44 edges
2. `index.html (Shell)` - 40 edges
3. `zugfuehrer.html (Zugführer Tagestraining)` - 36 edges
4. `gruppenfuehrer.html (Gruppenführer Tagestraining)` - 35 edges
5. `Infrastruktur-Diagramm FwMG Lernwelt` - 18 edges
6. `Projektregeln FwMG Lernwelt` - 17 edges
7. `KEYS (Sichern/Wiederherstellen)` - 17 edges
8. `Architektur` - 15 edges
9. `check` - 14 edges
10. `Mitarbeits-Ablauf (Branch, Prüfen, PR)` - 10 edges

## Surprising Connections (you probably didn't know these)
- `befehlstrainer.html (Befehlscoach)` --shares_data_with--> `localStorage (nur lokal)`  [INFERRED]
  app/apps/befehlstrainer.html → docs/infrastruktur.png
- `Apple Touch Icon (Flamme)` --semantically_similar_to--> `icons/flamme.svg`  [INFERRED] [semantically similar]
  app/icons/apple-touch-icon.png → app/index.html
- `PWA-Icon 192 px (Flamme)` --semantically_similar_to--> `icons/flamme.svg`  [INFERRED] [semantically similar]
  app/icons/icon-192.png → app/index.html
- `zugfuehrer.html (Zugführer Tagestraining)` --shares_data_with--> `localStorage (nur lokal)`  [INFERRED]
  app/apps/zugfuehrer.html → docs/infrastruktur.png
- `Abhängigkeiten` --references--> `check`  [EXTRACTED]
  docs/ABHAENGIGKEITEN.md → package.json

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Lernstand sichern und wiederherstellen** — app_index_keys, app_index_exportstate, app_index_importstate, app_index_closeframes, docs_architektur_sichern_wiederherstellen [EXTRACTED 1.00]
- **GitHub-Pipeline: Repository, CI, Deploy, Pages** — docs_infrastruktur_repository, docs_infrastruktur_ci, docs_veroeffentlichung_github_pages [EXTRACTED 1.00]
- **Die drei Coaches der Shell** — app_apps_gruppenfuehrer, app_apps_zugfuehrer, app_apps_befehlstrainer [EXTRACTED 1.00]
- **Einstellungs-Sync Shell → Gruppen-/Zugführer** — app_index_readset, app_index_ls_fwmg_settings_v1, app_apps_gruppenfuehrer, app_apps_zugfuehrer, docs_architektur_settings_sync [EXTRACTED 1.00]
- **Shell mit drei Coaches** — app_index, app_apps_gruppenfuehrer, app_apps_zugfuehrer, app_apps_befehlstrainer, app_index_ls_fwmg_settings_v1 [EXTRACTED 1.00]
- **Lokaler Lernstand und Sicherung** — docs_architektur_localstorage_keys_unveraenderlich, app_index_keys, docs_architektur_sichern_wiederherstellen, app_index_neu [INFERRED 0.85]
- **Öffentlicher Betrieb: CSP, noindex, keine fremden Server** — docs_veroeffentlichung_csp_hashes, docs_veroeffentlichung_nicht_auffindbar, docs_veroeffentlichung_keine_fremden_server, app_robots, app_index_fwmg_imp [INFERRED 0.85]
- **PWA-Icon-Satz (Flamme)** — app_icons_flamme, app_icons_apple_touch_icon_apple_touch_icon, app_icons_icon_192_icon_192, app_icons_icon_512_icon_512, app_icons_icon_maskable_512_icon_maskable_512 [INFERRED 0.85]
- **Prüf- und Veröffentlichungsablauf** — contributing_workflow, _github_pull_request_template_pruefliste, _github_workflows_ci_check_job, _github_workflows_ci_browser_job, docs_veroeffentlichung_github_pages, package_scripts_check [INFERRED 0.85]

## Communities (10 total, 0 thin omitted)

### Community 0 - "Befehlscoach"
Cohesion: 0.10
Nodes (31): befehlstrainer.html (Befehlscoach), ARTS (Befehlsarten), coachFeedback(), deVoice()/voiceScore(), evalSpeech(), finishRun(), getSample() (window.claude sample), gong() (+23 more)

### Community 1 - "Shell index.html"
Cohesion: 0.12
Nodes (33): saveSess(), index.html (Shell), closeFrames(), ensureFrame(), esc(), exportState(), hasOpen(), importState() (+25 more)

### Community 2 - "Prüf- und Testskripte"
Cohesion: 0.07
Nodes (20): scripts, check:version, csp:update, start, files, write, docs, els (+12 more)

### Community 3 - "Gruppenführer-Coach"
Cohesion: 0.09
Nodes (27): gruppenfuehrer.html (Gruppenführer Tagestraining), buildSession(), DATA (Fragen per XHR), LS = lernkompass-tagestraining-v1, mast() Kopf, record(), render(), renderExam() (+19 more)

### Community 4 - "Repo-Regeln und CI"
Cohesion: 0.10
Nodes (23): graphify Skill, Dependabot monatliche Updates (Actions, npm), PR-Prüfliste, CI-Job Browser-Test, CI-Job Dateien und Regeln, OFL-Lizenz Barlow, OFL-Lizenz IBM Plex Sans, Impressum fwmg-imp (+15 more)

### Community 5 - "Zugführer-Coach"
Cohesion: 0.11
Nodes (21): Issue-Vorlage Fehler melden, Issue-Vorlage Idee oder Wunsch, initRemote() (window.claude db), zugfuehrer.html (Zugführer Tagestraining), applyAnswer(), init(), initRemote() (window.claude db), K_S/K_L Speicherschlüssel (+13 more)

### Community 6 - "Offline und Doku"
Cohesion: 0.11
Nodes (19): Service-Worker-Registrierung / Update-Hinweis, manifest.webmanifest, robots.txt (alle Crawler gesperrt), PRECACHE, Abhängigkeiten, Architektur, Projektbeschreibung, FwDV 3 Befehlsschema (+11 more)

### Community 7 - "package.json"
Cohesion: 0.12
Nodes (13): Browser-Tests (Playwright), description, devDependencies, playwright, engines, node, name, private (+5 more)

### Community 8 - "Logo und taktische Zeichen"
Cohesion: 0.24
Nodes (11): LOGO, Apple Touch Icon (Flamme), icons/flamme.svg, icons/gruppenfuehrer.svg, DV 102 Taktische Zeichen, @taktische-zeichen/core 0.11.0 (MIT), PWA-Icon 192 px (Flamme), PWA-Icon 512 px (Flamme auf Marineblau) (+3 more)

### Community 9 - "Infrastruktur-Diagramm"
Cohesion: 0.39
Nodes (8): Autor (Push / Pull Request), Browser, installierte PWA (offline), CI (ci.yml): npm run check, SW-VERSION, Playwright, Infrastruktur-Diagramm FwMG Lernwelt, Gerät der Nutzer (iPhone, Android, Computer), GitHub, Repository (Branch main), GitHub Pages Deployment (pages.yml)

## Ambiguous Edges - Review These
- `graphify Skill` → `Projektregeln FwMG Lernwelt`  [AMBIGUOUS]
  .claude/CLAUDE.md · relation: conceptually_related_to
- `renderHead()` → `icons/gruppenfuehrer.svg`  [AMBIGUOUS]
  app/apps/befehlstrainer.html · relation: references
- `renderHead()` → `icons/zugfuehrer.svg`  [AMBIGUOUS]
  app/apps/befehlstrainer.html · relation: references

## Knowledge Gaps
- **19 isolated node(s):** `Dependabot monatliche Updates (Actions, npm)`, `graphify Skill`, `Keep a Changelog / SemVer`, `Service-Worker VERSION-Erhöhungen (v28–v36)`, `Vertrauliche Meldung (Report a vulnerability)` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 72 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `index.html (Shell)` connect `Shell index.html` to `Befehlscoach`, `Prüf- und Testskripte`, `Gruppenführer-Coach`, `Repo-Regeln und CI`, `Zugführer-Coach`, `Offline und Doku`, `Logo und taktische Zeichen`, `Infrastruktur-Diagramm`?**
  _High betweenness centrality (0.235) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `befehlstrainer.html (Befehlscoach)` (e.g. with `icons/flamme.svg` and `Impressum fwmg-imp`) actually correct?**
  _`befehlstrainer.html (Befehlscoach)` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Dependabot monatliche Updates (Actions, npm)`, `graphify Skill`, `Keep a Changelog / SemVer` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Befehlscoach` be split into smaller, more focused modules?**
  _Cohesion score 0.09682539682539683 - nodes in this community are weakly interconnected._
- **Why does `befehlstrainer.html (Befehlscoach)` connect `Befehlscoach` to `Shell index.html`, `Prüf- und Testskripte`, `Gruppenführer-Coach`, `Repo-Regeln und CI`, `Zugführer-Coach`, `Offline und Doku`, `Logo und taktische Zeichen`, `Infrastruktur-Diagramm`?**
  _High betweenness centrality (0.232) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `graphify Skill` and `Projektregeln FwMG Lernwelt`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `renderHead()` and `icons/gruppenfuehrer.svg`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._