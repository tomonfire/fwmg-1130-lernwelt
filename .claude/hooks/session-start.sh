#!/bin/bash
# Start einer Cloud-Sitzung: graphify (für die Hooks und den Code-Graphen) und
# die npm-Abhängigkeiten (Playwright für npm run test:browser) installieren.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}"

if ! command -v graphify >/dev/null 2>&1; then
  pip install -q graphifyy 2>/dev/null || pip install -q --break-system-packages graphifyy
fi

PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install --no-audit --no-fund --silent

# Vorinstalliertes Chromium der Cloud-Umgebung für scripts/browser.mjs.
if [ -x /opt/pw-browsers/chromium ] && [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo 'export CHROMIUM_PATH=/opt/pw-browsers/chromium' >> "$CLAUDE_ENV_FILE"
fi
