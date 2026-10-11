// Prüft, ob die Inline-Skripte aller HTML-Dateien syntaktisch gültiges JavaScript sind.
import { readFileSync, readdirSync } from 'node:fs';
import vm from 'node:vm';

const files = ['app/index.html', ...readdirSync('app/apps').filter((f) => f.endsWith('.html')).map((f) => 'app/apps/' + f)];
let bad = 0;
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
  let m, n = 0;
  while ((m = re.exec(html))) {
    n++;
    try { new vm.Script(m[1], { filename: `${f}#script${n}` }); }
    catch (e) { console.error(`SYNTAXFEHLER in ${f} (Skript ${n}): ${e.message}`); bad++; }
  }
  console.log(`${f}: ${n} Skript(e) geprüft`);
}
process.exit(bad ? 1 : 0);
