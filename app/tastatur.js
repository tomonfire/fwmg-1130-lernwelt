/* Tastatur für Coaches am Computer: Ziffern 1–9 wählen eine Antwort, Enter löst den Hauptknopf der Leiste unten aus (Prüfen, Weiter).
   Gilt nur, wenn alle Antworten in einer Gruppe stehen und kein Eingabefeld und kein Willkommensfenster offen ist.
   Der Hauptknopf steht im Skript-Tag: data-primary=".btn.primary". */
(function () {
  var me = document.currentScript;
  var PRIMARY = (me && me.getAttribute('data-primary')) || '.btn.primary';

  function blocked(t) {
    var tag = t && t.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable)) return true;
    return !!document.querySelector('.wl:not([hidden]), #overlay:not(:empty)');
  }

  document.addEventListener('keydown', function (ev) {
    if (ev.defaultPrevented || ev.altKey || ev.ctrlKey || ev.metaKey || blocked(ev.target)) return;
    var t = ev.target;

    if (/^[1-9]$/.test(ev.key)) {
      var opts = document.querySelectorAll('.opt');
      if (!opts.length) return;
      var group = opts[0].parentNode;
      for (var i = 1; i < opts.length; i++) if (opts[i].parentNode !== group) return;
      var o = opts[+ev.key - 1];
      if (!o || o.disabled || o.classList.contains('locked')) return;
      ev.preventDefault();
      o.click();
      return;
    }

    if (ev.key === 'Enter' && !ev.repeat) {
      /* Auf anderen Knöpfen und Links bleibt Enter beim Browser. */
      if (t && t.closest && t.closest('button, a, summary') && !t.closest('.opt')) return;
      var dock = document.querySelector('.actions.dock');
      var b = dock && dock.querySelector(PRIMARY + ':not([disabled])');
      if (!b) return;
      ev.preventDefault();
      b.click();
    }
  });
})();
