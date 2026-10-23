# Graph Report - fwmg-1130-lernwelt  (2026-10-23)

## Corpus Check
- 51 files · ~112,033 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 19 file(s) not represented in the graph (top: .woff2 9, (none) 5, .css 2)

## Summary
- 438 nodes · 693 edges · 24 communities (19 shown, 5 thin omitted)
- Extraction: 82% EXTRACTED · 17% INFERRED · 0% AMBIGUOUS · INFERRED: 121 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a38344d4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Befehlscoach
- Shell index.html
- data.mjs
- zugfuehrer.html (Zugführer Tagestraining)
- Repo-Regeln und CI
- permissions
- steps
- package.json
- Logo und taktische Zeichen
- Quellenregister
- 0001 Fundstellen je Katalogfrage (A-06)
- Audit: Lernwelt gegen Wissensbasis
- /team – Feature mit dem virtuellen Team umsetzen
- steps
- updates
- version.mjs
- render-excalidraw.mjs
- browser.mjs
- csp.mjs
- serve.mjs
- session-start.sh

## God Nodes (most connected - your core abstractions)
1. `befehlstrainer.html (Befehlscoach)` - 44 edges
2. `index.html (Shell)` - 40 edges
3. `zugfuehrer.html (Zugführer Tagestraining)` - 36 edges
4. `gruppenfuehrer.html (Gruppenführer Tagestraining)` - 35 edges
5. `Infrastruktur-Diagramm FwMG Lernwelt` - 18 edges
6. `KEYS (Sichern/Wiederherstellen)` - 17 edges
7. `Projektregeln FwMG Lernwelt` - 17 edges
8. `Architektur` - 15 edges
9. `check` - 14 edges
10. `Audit: Lernwelt gegen Wissensbasis` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Richtigkeit und Aktualität` --references--> `esc()`  [INFERRED]
  docs/AUDIT-WISSENSBASIS.md → scripts/render-excalidraw.mjs
- `Oberflächenregeln: gelten in allen Coaches, auch in künftigen` --references--> `esc()`  [INFERRED]
  .claude/agents/ui-ux-experte.md → scripts/render-excalidraw.mjs
- `Akzeptanzkriterien` --references--> `esc()`  [INFERRED]
  docs/requirements/0001-fundstellen.md → scripts/render-excalidraw.mjs
- `Akzeptanzkriterien` --references--> `esc()`  [INFERRED]
  docs/requirements/0002-freitext-fallbeispiel.md → scripts/render-excalidraw.mjs
- `Akzeptanzkriterien` --references--> `esc()`  [INFERRED]
  docs/requirements/0003-befehlscoach-lagen.md → scripts/render-excalidraw.mjs

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

## Communities (24 total, 5 thin omitted)

### Community 0 - "Befehlscoach"
Cohesion: 0.10
Nodes (34): befehlstrainer.html (Befehlscoach), ARTS (Befehlsarten), coachFeedback(), deVoice()/voiceScore(), evalSpeech(), finishRun(), getSample() (window.claude sample), gong() (+26 more)

### Community 1 - "Shell index.html"
Cohesion: 0.10
Nodes (41): graphify Skill, K_S/K_L Speicherschlüssel, index.html (Shell), closeFrames(), ensureFrame(), esc(), exportState(), hasOpen() (+33 more)

### Community 2 - "data.mjs"
Cohesion: 0.13
Nodes (11): bt, fail(), ft, ftIds, g, gids, pruefe(), TYPENLISTE (+3 more)

### Community 3 - "zugfuehrer.html (Zugführer Tagestraining)"
Cohesion: 0.06
Nodes (42): Issue-Vorlage Fehler melden, Issue-Vorlage Idee oder Wunsch, gruppenfuehrer.html (Gruppenführer Tagestraining), buildSession(), DATA (Fragen per XHR), initRemote() (window.claude db), LS = lernkompass-tagestraining-v1, mast() Kopf (+34 more)

### Community 4 - "Repo-Regeln und CI"
Cohesion: 0.06
Nodes (36): Dependabot monatliche Updates (Actions, npm), PR-Prüfliste, CI-Job Browser-Test, CI-Job Dateien und Regeln, OFL-Lizenz Barlow, OFL-Lizenz IBM Plex Sans, Impressum fwmg-imp, Service-Worker-Registrierung / Update-Hinweis (+28 more)

### Community 5 - "permissions"
Cohesion: 0.07
Nodes (29): if, permissions, runs-on, steps, types, types, jobs, claude (+21 more)

### Community 6 - "steps"
Cohesion: 0.08
Nodes (28): name, needs, runs-on, steps, name, runs-on, steps, concurrency (+20 more)

### Community 7 - "package.json"
Cohesion: 0.22
Nodes (9): description, devDependencies, playwright@1.64.0, engines, node, name, private, version (+1 more)

### Community 8 - "Logo und taktische Zeichen"
Cohesion: 0.24
Nodes (11): LOGO, Apple Touch Icon (Flamme), icons/flamme.svg, icons/gruppenfuehrer.svg, DV 102 Taktische Zeichen, @taktische-zeichen/core 0.11.0 (MIT), PWA-Icon 192 px (Flamme), PWA-Icon 512 px (Flamme auf Marineblau) (+3 more)

### Community 9 - "Quellenregister"
Cohesion: 0.11
Nodes (19): Projektbeschreibung, FwDV 3 Befehlsschema, Befehlscoach: Realbrand, Ergänzungslagen, Fahrzeuge (Anforderung 0003): Prüfliste, Fragenkataloge (Katalog, Lösungen unverändert), Freitext und Fallbeispiel (Anforderung 0002): Prüfliste, Fundstellen (Feld `f`): Prüfliste, GF Kategorie A (FwDV 1), GF Kategorie J (Recht) (+11 more)

### Community 10 - "0001 Fundstellen je Katalogfrage (A-06)"
Cohesion: 0.06
Nodes (29): Oberflächenregeln: gelten in allen Coaches, auch in künftigen, 0001 Fundstellen je Katalogfrage (A-06), Akzeptanzkriterien, Annahmen & offene Fragen, Aufteilung, Datenformat, Nicht im Umfang, UI/UX-Hinweise (+21 more)

### Community 11 - "Audit: Lernwelt gegen Wissensbasis"
Cohesion: 0.11
Nodes (19): Abdeckung je Quelle, Abgleich mit dem Wissensgraphen, Abweichungen und Prüfbedarf, Anforderungen, Audit: Lernwelt gegen Wissensbasis, Ausgangslage der App, Befunde, Bestätigt (+11 more)

### Community 12 - "/team – Feature mit dem virtuellen Team umsetzen"
Cohesion: 0.50
Nodes (3): Ablauf, /team – Feature mit dem virtuellen Team umsetzen, Token-Regeln für alle Beteiligten

### Community 16 - "steps"
Cohesion: 0.07
Nodes (27): concurrency, cancel-in-progress, group, environment, runs-on, steps, name, url (+19 more)

### Community 17 - "updates"
Cohesion: 0.17
Nodes (11): patterns, patterns, actions, dev, interval, updates, directory, groups (+3 more)

### Community 18 - "version.mjs"
Cohesion: 0.22
Nodes (3): b, changed, now

### Community 19 - "render-excalidraw.mjs"
Cohesion: 0.22
Nodes (8): docs, els, h, out, pngFile, src, svgFile, w

### Community 20 - "browser.mjs"
Cohesion: 0.25
Nodes (5): Browser-Tests (Playwright), errors, foreign, launch, serveApp()

### Community 21 - "csp.mjs"
Cohesion: 0.25
Nodes (6): scripts, check:version, csp:update, start, files, write

## Ambiguous Edges - Review These
- `renderHead()` → `icons/gruppenfuehrer.svg`  [AMBIGUOUS]
  app/apps/befehlstrainer.html · relation: references
- `renderHead()` → `icons/zugfuehrer.svg`  [AMBIGUOUS]
  app/apps/befehlstrainer.html · relation: references
- `graphify Skill` → `Projektregeln FwMG Lernwelt`  [AMBIGUOUS]
  .claude/CLAUDE.md · relation: conceptually_related_to

## Knowledge Gaps
- **19 isolated node(s):** `ARTS (Befehlsarten)`, `LS = lernkompass-tagestraining-v1`, `welcome() Willkommensfenster`, `Vertrauliche Meldung (Report a vulnerability)`, `graphify Skill` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 194 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `esc()` connect `0001 Fundstellen je Katalogfrage (A-06)` to `render-excalidraw.mjs`, `Audit: Lernwelt gegen Wissensbasis`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `befehlstrainer.html (Befehlscoach)` (e.g. with `Impressum fwmg-imp` and `localStorage (nur lokal)`) actually correct?**
  _`befehlstrainer.html (Befehlscoach)` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `ARTS (Befehlsarten)`, `LS = lernkompass-tagestraining-v1`, `welcome() Willkommensfenster` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Befehlscoach` be split into smaller, more focused modules?**
  _Cohesion score 0.0960960960960961 - nodes in this community are weakly interconnected._
- **Why does `Infrastruktur-Diagramm FwMG Lernwelt` connect `Repo-Regeln und CI` to `Befehlscoach`, `Shell index.html`, `zugfuehrer.html (Zugführer Tagestraining)`, `render-excalidraw.mjs`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `renderHead()` and `icons/gruppenfuehrer.svg`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `renderHead()` and `icons/zugfuehrer.svg`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._