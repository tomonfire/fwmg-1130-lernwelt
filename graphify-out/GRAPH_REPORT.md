# Graph Report - fwmg-1130-lernwelt  (2026-10-12)

## Corpus Check
- 53 files · ~89,173 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .woff2 12, (none) 5, .css 2)

## Summary
- 291 nodes · 484 edges · 10 communities
- Extraction: 76% EXTRACTED · 23% INFERRED · 1% AMBIGUOUS · INFERRED: 111 edges (avg confidence: 0.8)
- Token cost: 233,146 input · 0 output

## Community Hubs (Navigation)
- Repo, CI und Vorgaben
- Prüf- und Testskripte
- Shell index.html
- Befehlscoach
- Zugführer-Coach
- Logo und taktische Zeichen
- Offline, Stil und Doku
- Gruppenführer-Coach
- package.json
- Fragenprüfung data.mjs

## God Nodes (most connected - your core abstractions)
1. `befehlstrainer.html (Befehlscoach)` - 35 edges
2. `index.html (Shell)` - 31 edges
3. `zugfuehrer.html (Zugführer Tagestraining)` - 28 edges
4. `gruppenfuehrer.html (Gruppenführer Tagestraining)` - 26 edges
5. `Infrastruktur-Diagramm FwMG Lernwelt` - 18 edges
6. `Projektregeln FwMG Lernwelt` - 17 edges
7. `Architektur` - 15 edges
8. `KEYS (Sichern/Wiederherstellen)` - 14 edges
9. `Mitarbeits-Ablauf (Branch, Prüfen, PR)` - 10 edges
10. `Abhängigkeiten` - 10 edges

## Surprising Connections (you probably didn't know these)
- `graphify Skill` --conceptually_related_to--> `Projektregeln FwMG Lernwelt`  [AMBIGUOUS]
  .claude/CLAUDE.md → CLAUDE.md
- `Service-Worker-VERSION-Prüfung (scripts/version.mjs)` --implements--> `VERSION in app/sw.js erhöhen`  [INFERRED]
  .github/workflows/ci.yml → CLAUDE.md
- `befehlstrainer.html (Befehlscoach)` --implements--> `CSP mit SHA-256-Prüfsummen`  [INFERRED]
  app/apps/befehlstrainer.html → docs/VEROEFFENTLICHUNG.md
- `gruppenfuehrer.html (Gruppenführer Tagestraining)` --implements--> `CSP mit SHA-256-Prüfsummen`  [INFERRED]
  app/apps/gruppenfuehrer.html → docs/VEROEFFENTLICHUNG.md
- `zugfuehrer.html (Zugführer Tagestraining)` --implements--> `CSP mit SHA-256-Prüfsummen`  [INFERRED]
  app/apps/zugfuehrer.html → docs/VEROEFFENTLICHUNG.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Prüf- und Veröffentlichungsablauf** — contributing_workflow, _github_pull_request_template_pruefliste, _github_workflows_ci_check_job, _github_workflows_ci_browser_job, _github_workflows_pages_deploy, claude_npm_run_check [INFERRED 0.85]
- **Shell mit drei Coaches** — readme_shell_index, readme_gruppenfuehrer_trainer, readme_zugfuehrer_trainer, readme_befehlscoach, readme_settings_key [EXTRACTED 1.00]
- **Lokaler Lernstand und Sicherung** — claude_localstorage_keys, claude_sichern_wiederherstellen_keys, readme_sicherungsdatei, changelog_was_ist_neu [INFERRED 0.85]
- **Einstellungs-Sync Shell → Gruppen-/Zugführer** — app_index_readset, app_index_ls_fwmg_settings_v1, app_apps_gruppenfuehrer, app_apps_zugfuehrer, docs_architektur_settings_sync [EXTRACTED 1.00]
- **Lernstand sichern und wiederherstellen** — app_index_keys, app_index_exportstate, app_index_importstate, app_index_closeframes, docs_architektur_sichern_wiederherstellen [EXTRACTED 1.00]
- **Öffentlicher Betrieb: CSP, noindex, keine fremden Server** — docs_veroeffentlichung_csp_hashes, docs_veroeffentlichung_nicht_auffindbar, docs_veroeffentlichung_keine_fremden_server, app_robots, app_index_fwmg_imp [INFERRED 0.85]
- **PWA-Icon-Satz (Flamme)** — app_icons_flamme_flamme, app_icons_apple_touch_icon_apple_touch_icon, app_icons_icon_192_icon_192, app_icons_icon_512_icon_512, app_icons_icon_maskable_512_icon_maskable_512 [INFERRED 0.85]
- **GitHub-Pipeline: Repository, CI, Deploy, Pages** — docs_infrastruktur_repository, docs_infrastruktur_ci, docs_infrastruktur_deploy, docs_infrastruktur_github_pages [EXTRACTED 1.00]
- **Die drei Coaches der Shell** — docs_infrastruktur_gruppenfuehrer, docs_infrastruktur_zugfuehrer, docs_infrastruktur_befehlscoach [EXTRACTED 1.00]

## Communities (10 total, 0 thin omitted)

### Community 0 - "Repo, CI und Vorgaben"
Cohesion: 0.07
Nodes (37): graphify Skill, Dependabot monatliche Updates (Actions, npm), Issue-Vorlage Fehler melden, Issue-Vorlage Idee oder Wunsch, PR-Prüfliste, CI-Job Browser-Test, CI-Job Dateien und Regeln, Service-Worker-VERSION-Prüfung (scripts/version.mjs) (+29 more)

### Community 1 - "Prüf- und Testskripte"
Cohesion: 0.05
Nodes (25): errors, foreign, launch, apps, footers, list, pages, shell (+17 more)

### Community 2 - "Shell index.html"
Cohesion: 0.10
Nodes (36): saveSess(), index.html (Shell), closeFrames(), ensureFrame(), esc(), exportState(), hasOpen(), importState() (+28 more)

### Community 3 - "Befehlscoach"
Cohesion: 0.10
Nodes (31): befehlstrainer.html (Befehlscoach), ARTS (Befehlsarten), coachFeedback(), deVoice()/voiceScore(), evalSpeech(), finishRun(), getSample() (window.claude sample), gong() (+23 more)

### Community 4 - "Zugführer-Coach"
Cohesion: 0.11
Nodes (24): buildSession(), DATA (Fragen per XHR), zugfuehrer.html (Zugführer Tagestraining), applyAnswer(), buildRound(), DATA (Fragen per XHR), init(), K_S/K_L Speicherschlüssel (+16 more)

### Community 5 - "Logo und taktische Zeichen"
Cohesion: 0.13
Nodes (28): Apple Touch Icon (Flamme), Flamme (Logo der Lernwelt), DV 102 Taktische Zeichen, @taktische-zeichen/core 0.11.0 (MIT), Taktisches Zeichen Gruppenführer (DV 102), PWA-Icon 192 px (Flamme), PWA-Icon 512 px (Flamme auf Marineblau), PWA-Icon maskable 512 px (Flamme verkleinert in Safe Zone) (+20 more)

### Community 6 - "Offline, Stil und Doku"
Cohesion: 0.11
Nodes (18): coach.css, OFL-Lizenz Barlow, OFL-Lizenz IBM Plex Sans, Service-Worker-Registrierung / Update-Hinweis, robots.txt (alle Crawler gesperrt), PRECACHE, Abhängigkeiten, npm run check (check/data/syntax/csp.mjs) (+10 more)

### Community 7 - "Gruppenführer-Coach"
Cohesion: 0.13
Nodes (19): gruppenfuehrer.html (Gruppenführer Tagestraining), initRemote() (window.claude db), LS = lernkompass-tagestraining-v1, mast() Kopf, record(), render(), renderExam(), renderHome() (+11 more)

### Community 8 - "package.json"
Cohesion: 0.12
Nodes (15): description, devDependencies, playwright, engines, node, name, private, scripts (+7 more)

### Community 9 - "Fragenprüfung data.mjs"
Cohesion: 0.33
Nodes (5): fail(), g, gids, pruefe(), z

## Ambiguous Edges - Review These
- `graphify Skill` → `Projektregeln FwMG Lernwelt`  [AMBIGUOUS]
  .claude/CLAUDE.md · relation: conceptually_related_to
- `icons/gruppenfuehrer.svg` → `renderHead()`  [AMBIGUOUS]
  app/apps/befehlstrainer.html · relation: references
- `icons/zugfuehrer.svg` → `renderHead()`  [AMBIGUOUS]
  app/apps/befehlstrainer.html · relation: references

## Knowledge Gaps
- **29 isolated node(s):** `graphify Skill`, `Issue-Vorlage Idee oder Wunsch`, `Dependabot monatliche Updates (Actions, npm)`, `Keep a Changelog / SemVer`, `Gemeinsames app/coach.css` (+24 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 89 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `befehlstrainer.html (Befehlscoach)` connect `Befehlscoach` to `Shell index.html`, `Offline, Stil und Doku`, `Gruppenführer-Coach`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `befehlstrainer.html (Befehlscoach)` (e.g. with `Impressum fwmg-imp` and `CSP mit SHA-256-Prüfsummen`) actually correct?**
  _`befehlstrainer.html (Befehlscoach)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `graphify Skill`, `Issue-Vorlage Idee oder Wunsch`, `Dependabot monatliche Updates (Actions, npm)` to the rest of the system?**
  _29 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Repo, CI und Vorgaben` be split into smaller, more focused modules?**
  _Cohesion score 0.07092198581560284 - nodes in this community are weakly interconnected._
- **Why does `index.html (Shell)` connect `Shell index.html` to `Befehlscoach`, `Offline, Stil und Doku`, `Gruppenführer-Coach`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `graphify Skill` and `Projektregeln FwMG Lernwelt`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `icons/gruppenfuehrer.svg` and `renderHead()`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._