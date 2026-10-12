# Abhängigkeiten

Welche Datei welche lädt, wer welchen Lernstand liest oder schreibt und welches Skript was prüft. Ergänzt [ARCHITEKTUR.md](ARCHITEKTUR.md). GitHub zeigt die Diagramme direkt an.

Bei neuen Dateien, Schlüsseln oder Prüfungen hier mitpflegen.

## Laufzeit: Shell, Coaches, Dateien, Speicher

Durchgezogene Pfeile: lädt bzw. bettet ein. Gestrichelte Pfeile: liest oder schreibt im `localStorage`.

```mermaid
flowchart LR
  subgraph Shell
    index["index.html<br/>Shell"]
    sw["sw.js<br/>Service Worker"]
    manifest["manifest.webmanifest"]
  end

  subgraph Coaches["Coaches (iframes)"]
    gf["apps/gruppenfuehrer.html"]
    zf["apps/zugfuehrer.html"]
    bt["apps/befehlstrainer.html"]
  end

  subgraph Dateien["Gemeinsame Dateien"]
    coachcss["coach.css"]
    tastatur["tastatur.js"]
    fonts["fonts/fonts.css"]
    flamme["icons/flamme.svg"]
    gfsvg["icons/gruppenfuehrer.svg"]
    zfsvg["icons/zugfuehrer.svg"]
    gfjson["data/gruppenfuehrer.json"]
    zfjson["data/zugfuehrer.json"]
  end

  subgraph Speicher["localStorage"]
    k_gfv[("lernkompass-tagestraining-v1")]
    k_gfs[("lernkompass-tagestraining-session")]
    k_zfs[("zf4tt.state.v1")]
    k_zfl[("zf4tt.local.v1")]
    k_bt[("bt-fwdv3")]
    k_last[("lzf.last.v1")]
    k_name[("fwmg.name.v1")]
    k_set[("fwmg.settings.v1")]
    k_neu[("fwmg.neu.v1")]
  end

  index --> gf & zf & bt
  index --> sw & manifest & fonts & flamme

  gf --> coachcss & tastatur & fonts & gfsvg & gfjson
  zf --> coachcss & tastatur & fonts & zfsvg & zfjson
  bt --> coachcss & tastatur & fonts & flamme

  gf -.-> k_gfv & k_gfs
  zf -.-> k_zfs & k_zfl
  bt -.-> k_bt
  gf & zf -.->|liest| k_set

  index -.->|schreibt| k_set
  index -.-> k_last & k_name & k_neu
  index -.->|Fortschritt, Sichern| k_gfv & k_gfs & k_zfs & k_zfl & k_bt
```

- Jeder Coach schreibt nur seine eigenen Schlüssel. Die Shell liest sie für Fortschritt und „Weitermachen“ und schreibt sie nur beim Wiederherstellen einer Sicherung (alle Schlüssel aus `KEYS`).
- Einziger geteilter Schlüssel ist `fwmg.settings.v1`: Die Shell schreibt ihn, Gruppen- und Zugführer übernehmen ihn beim Start, wenn er neuer ist.
- `sw.js` legt alle Dateien aus den Blöcken „Shell“, „Coaches“ und „Gemeinsame Dateien“ in den Cache, dazu die Schriftdateien und App-Icons.

## Prüfen und Veröffentlichen

```mermaid
flowchart LR
  subgraph Workflows[".github/workflows"]
    ci["ci.yml"]
    pages["pages.yml"]
    claude["claude.yml"]
  end

  subgraph Skripte["scripts/"]
    check["check.mjs<br/>Dateien, Regeln, KEYS"]
    data["data.mjs<br/>Fragen"]
    syntax["syntax.mjs<br/>Inline-JS"]
    csp["csp.mjs<br/>CSP-Prüfsummen"]
    version["version.mjs<br/>VERSION erhöht?"]
    browser["browser.mjs<br/>Playwright"]
    serve["serve.mjs<br/>npm start"]
  end

  subgraph App["app/"]
    html["index.html<br/>apps/*.html"]
    json["data/*.json"]
    swjs["sw.js"]
    rest["manifest, fonts/"]
  end

  ci -->|npm run check| check & data & syntax & csp
  ci -->|im Pull Request| version
  ci -->|npm run test:browser| browser
  pages -->|npm run check| check
  pages -->|veröffentlicht| App
  claude --> check & csp

  check --> html & swjs & rest
  data --> json
  syntax --> html
  csp --> html
  version --> swjs
  browser --> html
  serve --> App
```

`npm run check` führt `check.mjs`, `data.mjs`, `syntax.mjs` und `csp.mjs` nacheinander aus (`package.json`).
