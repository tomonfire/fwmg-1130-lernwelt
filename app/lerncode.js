/* Lerncode: persönlicher, zufälliger Code, unter dem der Lernstand in einer Datenbank (Supabase, EU) gesichert wird.
   Ohne Name, ohne E-Mail. Wer den Code kennt, kommt an den Lernstand; deshalb ist er lang und zufällig.

   Einrichtung: SUPABASE_URL und SUPABASE_KEY (öffentlicher „publishable“- oder „anon“-Schlüssel) eintragen, siehe docs/LERNCODE.md.
   Bleiben beide leer, ist der Lerncode ausgeschaltet und alles bleibt nur im Browser.

   Die Trainer bringen ihren Abgleich (lesen, zusammenführen, schreiben) schon mit und erwarten von der
   Lernwelt die Schnittstelle window.claude.use('user' | 'db') aus ihrer Zeit als Claude-Artefakt.
   Diese Datei stellt genau diese Schnittstelle bereit, nur mit Supabase dahinter. */
(function () {
  var SUPABASE_URL = '';
  var SUPABASE_KEY = '';

  var CFG = window.FW_SYNC || { url: SUPABASE_URL, key: SUPABASE_KEY };
  var LS = 'fwmg.lerncode.v1';
  var ALPHA = 'ABCDEFGHJKMNPQRSTVWXYZ23456789'; /* ohne 0/O, 1/I/L, U: nicht verwechselbar */
  var LEN = 16;                                 /* 30^16, rund 78 Bit Zufall */

  function enabled() { return !!(CFG.url && CFG.key && window.fetch && window.crypto && crypto.getRandomValues); }
  function normalize(s) { return String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }
  function valid(c) { return typeof c === 'string' && c.length === LEN && c.split('').every(function (ch) { return ALPHA.indexOf(ch) >= 0; }); }
  function format(c) { return c.match(/.{4}/g).join('-'); }
  function getCode() { try { var c = localStorage.getItem(LS); return valid(c) ? c : null; } catch (e) { return null; } }
  function storeCode(c) { try { if (c) localStorage.setItem(LS, c); else localStorage.removeItem(LS); return true; } catch (e) { return false; } }
  function generate() {
    var out = '', buf = new Uint8Array(1);
    while (out.length < LEN) {
      crypto.getRandomValues(buf);
      if (buf[0] < 240) out += ALPHA[buf[0] % 30]; /* 240 = 8 * 30: gleichverteilt */
    }
    return out;
  }

  function rpc(fn, body) {
    /* Alter „anon“-Schlüssel (JWT, beginnt mit eyJ) geht auch als Authorization; neuer „publishable“-Schlüssel nur als apikey. */
    var headers = { 'content-type': 'application/json', apikey: CFG.key };
    if (/^eyJ/.test(CFG.key)) headers.authorization = 'Bearer ' + CFG.key;
    return fetch(CFG.url.replace(/\/+$/, '') + '/rest/v1/rpc/' + fn, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
      cache: 'no-store'
    }).then(function (r) {
      if (!r.ok) throw new Error('Lerncode-Server: HTTP ' + r.status);
      return r.text();
    }).then(function (t) { return t ? JSON.parse(t) : null; });
  }

  /* Schnittstelle für die Trainer: doc('data/users/<code>/progress-xx') mit get() und set(). */
  function doc(path) {
    var parts = String(path).split('/'), code = parts[2], key = parts[3];
    return {
      get: function () {
        return rpc('lernstand_get', { p_code: code, p_key: key }).then(function (d) {
          return { exists: d !== null && d !== undefined, data: function () { return d; } };
        });
      },
      /* Nur unter dem aktiven Code schreiben: nach Abmelden oder Löschen sichert ein Trainer, der gerade
         geschlossen wird, seinen Stand nicht noch einmal. */
      set: function (data) {
        if (getCode() !== code) return Promise.reject(new Error('Lerncode nicht mehr aktiv'));
        return rpc('lernstand_set', { p_code: code, p_key: key, p_data: data }).then(function () {});
      }
    };
  }
  if (!window.claude) {
    window.claude = {
      use: function (name) {
        var code = enabled() ? getCode() : null;
        if (!code) return Promise.resolve(null);
        if (name === 'user') return Promise.resolve({ id: function () { return Promise.resolve(code); } });
        if (name === 'db') return Promise.resolve({ doc: doc });
        return Promise.resolve(null);
      }
    };
  }

  /* Neue Trainer-Rahmen laden, damit sie mit dem neuen Code abgleichen. */
  function changed() { try { window.dispatchEvent(new Event('fw-lerncode')); } catch (e) {} }

  window.FwLerncode = {
    enabled: enabled,
    code: getCode,
    format: format,
    /* Neuen Code erzeugen und mit einem ersten Eintrag anlegen, damit er auf anderen Geräten gefunden wird. */
    create: function () {
      var c = generate();
      return rpc('lernstand_set', { p_code: c, p_key: 'meta', p_data: { created: Date.now() } }).then(function () {
        if (!storeCode(c)) throw new Error('Speichern im Browser ist blockiert.');
        changed();
        return c;
      });
    },
    /* Vorhandenen Code übernehmen. Ergebnis: 'ok', 'invalid' oder 'unknown'. */
    use: function (input) {
      var c = normalize(input);
      if (!valid(c)) return Promise.resolve('invalid');
      return rpc('lernstand_exists', { p_code: c }).then(function (ok) {
        if (!ok) return 'unknown';
        if (!storeCode(c)) throw new Error('Speichern im Browser ist blockiert.');
        changed();
        return 'ok';
      });
    },
    /* Nur dieses Gerät abmelden: der Lernstand im Browser und in der Datenbank bleibt. */
    forget: function () { storeCode(null); changed(); },
    /* Gesicherten Lernstand in der Datenbank löschen und Code vergessen. Der Stand im Browser bleibt. */
    remove: function () {
      var c = getCode();
      if (!c) return Promise.resolve();
      storeCode(null);
      return rpc('lernstand_delete', { p_code: c }).then(changed, function (e) { storeCode(c); throw e; });
    }
  };
})();
