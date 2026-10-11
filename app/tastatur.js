/* Tastatur für Coaches am Computer: Ziffern 1–9 wählen eine Antwort, Enter löst den Hauptknopf der Leiste unten aus (Prüfen, Weiter),
   solange kein Knopf den Fokus hat.
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

  /* Kam der Fokus zuletzt per Maus/Finger oder per Tab? */
  var viaPointer = false;
  document.addEventListener('pointerdown', function () { viaPointer = true; }, true);
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Tab') viaPointer = false; }, true);

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
      /* Auf Knöpfen und Links bleibt Enter beim Browser. Eine per Tab angesteuerte Antwort wird damit an- oder abgehakt;
         nach einem Klick auf eine Antwort löst Enter weiter Prüfen/Weiter aus. */
      var el = t && t.closest ? t.closest('button, a, summary') : null;
      if (el && (!el.closest('.opt') || !viaPointer)) return;
      var dock = document.querySelector('.actions.dock');
      var b = dock && dock.querySelector(PRIMARY + ':not([disabled])');
      if (!b) return;
      ev.preventDefault();
      b.click();
    }
  });
})();
