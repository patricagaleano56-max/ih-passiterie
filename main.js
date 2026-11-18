/* IH Pâtisserie — interacciones (IIFE, sin módulos) */
(function () {
  'use strict';

  var WA = '595984985176';
  var root = document.documentElement;
  var noSplash = root.classList.contains('no-splash');
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function safe(fn, name) {
    try { fn(); } catch (e) { if (window.console) console.warn('[IH] ' + name + ' falló:', e); }
  }
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function gs(n) { return 'Gs. ' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function store(key, val) {
    try {
      if (val === undefined) return JSON.parse(localStorage.getItem(key) || 'null');
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) { return null; }
  }

  /* ---------- Splash ---------- */
  function initSplash() {
    var s = $('#splash');
    if (!s || noSplash) return;
    setTimeout(function () { s.classList.add('is-done'); }, 1900);
    setTimeout(function () { s.style.display = 'none'; }, 3200);
  }

  /* ---------- Titular letra por letra ---------- */
  function initSplit() {
    var base = noSplash ? 0.15 : 2.15;
    var i = 0;
    $$('[data-split]').forEach(function (line) {
      if (line.querySelector('.char')) return; // idempotente
      var target = line.querySelector('em') || line;
      var text = target.textContent;
      target.textContent = '';
      text.split(' ').forEach(function (w, wi, arr) {
        var word = document.createElement('span');
        word.className = 'word';
        w.split('').forEach(function (ch) {
          var c = document.createElement('span');
          c.className = 'char';
          c.textContent = ch;
          c.style.animationDelay = (base + i * 0.035).toFixed(3) + 's';
          i++;
          word.appendChild(c);
        });
        target.appendChild(word);
        if (wi < arr.length - 1) target.appendChild(document.createTextNode(' '));
      });
      i += 3;
    });
  }

  /* ---------- Reveal al hacer scroll ---------- */
  function initReveal() {
    var els = $$('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var sibs = $$(':scope > .reveal', el.parentNode);
        var idx = Math.max(0, sibs.indexOf(el));
        el.style.transitionDelay = Math.min(idx * 0.08, 0.4) + 's';
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
    // red de seguridad: nada queda oculto
    setTimeout(function () { els.forEach(function (e) { e.classList.add('is-in'); }); }, 6000);
  }

  /* ---------- Manifiesto palabra por palabra ---------- */
  function initManifesto() {
    var m = $('[data-words]');
    if (!m || m.querySelector('.w')) return;
    var accents = ['idea.', 'concepto,', 'intenso,', 'francés', 'paraguaya.'];
    var words = m.textContent.trim().split(/\s+/);
    m.innerHTML = words.map(function (w) {
      var cls = 'w' + (accents.indexOf(w) > -1 ? ' accent' : '');
      return '<span class="' + cls + '">' + w + '</span>';
    }).join(' ');
    var spans = $$('.w', m);
    function update() {
      var r = m.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = (vh * 0.85 - r.top) / (r.height + vh * 0.35);
      p = Math.max(0, Math.min(1, p));
      var n = Math.round(p * spans.length);
      for (var k = 0; k < spans.length; k++) spans[k].classList.toggle('on', k < n);
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- Contadores ---------- */
  function initCounters() {
    var els = $$('[data-count]');
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target; io.unobserve(el);
        var to = parseFloat(el.getAttribute('data-count'));
        var from = to > 1000 ? to - 40 : 0;
        var suf = el.getAttribute('data-suffix') || '';
        var t0 = performance.now(), dur = 1800;
        (function tick(t) {
          var p = Math.min(1, (t - t0) / dur);
          var e = 1 - Math.pow(1 - p, 4);
          el.textContent = Math.round(from + (to - from) * e) + suf;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.01 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Parallax suave ---------- */
  function initParallax() {
    var els = $$('[data-parallax]');
    if (!els.length) return;
    var ticking = false;
    function run() {
      var vh = window.innerHeight;
      els.forEach(function (el) {
        var box = (el.parentElement || el).getBoundingClientRect();
        if (box.bottom < -100 || box.top > vh + 100) return;
        var f = parseFloat(el.getAttribute('data-parallax')) || 0.08;
        var c = box.top + box.height / 2 - vh / 2;
        el.style.translate = '0 ' + (-c * f).toFixed(1) + 'px';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
    window.addEventListener('resize', run);
    run();
  }

  /* ---------- Barra de progreso ---------- */
  function initProgress() {
    var bar = $('.progress span');
    if (!bar) return;
    function u() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? window.scrollY / h : 0) + ')';
    }
    window.addEventListener('scroll', u, { passive: true });
    u();
  }

  /* ---------- Navegación ---------- */
  function initNav() {
    var nav = $('.nav');
    var fab = $('.fab');
    var last = window.scrollY;
    function u() {
      var y = window.scrollY;
      nav.classList.toggle('is-scrolled', y > 40);
      var menuOpen = document.body.classList.contains('menu-open');
      nav.classList.toggle('is-hidden', !menuOpen && y > 500 && y > last + 4);
      if (y < last - 4 || y < 500) nav.classList.remove('is-hidden');
      document.body.classList.toggle('nav-hidden', nav.classList.contains('is-hidden'));
      if (fab) fab.classList.toggle('is-visible', y > window.innerHeight * 0.7 || document.body.classList.contains('has-items'));
      last = y;
    }
    window.addEventListener('scroll', u, { passive: true });
    u();

    // sección actual
    var links = $$('.nav__links a');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) { a.classList.toggle('is-current', a.getAttribute('href') === '#' + en.target.id); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      $$('main section[id]').forEach(function (s) { io.observe(s); });
    }
  }

  /* ---------- Menú móvil ---------- */
  function initMenu() {
    var b = $('[data-burger]'), m = $('[data-menu]');
    if (!b || !m) return;
    function set(open) {
      document.body.classList.toggle('menu-open', open);
      document.body.classList.toggle('is-locked', open);
      b.setAttribute('aria-expanded', open);
      m.setAttribute('aria-hidden', !open);
    }
    b.addEventListener('click', function () { set(!document.body.classList.contains('menu-open')); });
    $$('a', m).forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  }

  /* ---------- Cursor personalizado ---------- */
  function initCursor() {
    if (!finePointer) return;
    var c = $('.cursor'); if (!c) return;
    var dot = $('.cursor__dot', c), ring = $('.cursor__ring', c);
    var x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    window.addEventListener('mousemove', function (e) {
      x = e.clientX; y = e.clientY;
      dot.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    });
    (function loop() {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      ring.style.transform = 'translate(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', function (e) {
      var t = e.target;
      c.classList.toggle('is-view', !!t.closest('[data-cursor]'));
      c.classList.toggle('is-hover', !t.closest('[data-cursor]') && !!t.closest('a, button, select, input, textarea, .chip'));
    });
    document.addEventListener('mouseleave', function () { c.style.opacity = '0'; });
    document.addEventListener('mouseenter', function () { c.style.opacity = '1'; });
  }

  /* ---------- Botones magnéticos ---------- */
  function initMagnetic() {
    if (!finePointer) return;
    $$('.magnetic').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        el.style.translate = (dx * 0.22).toFixed(1) + 'px ' + (dy * 0.3).toFixed(1) + 'px';
      });
      el.addEventListener('mouseleave', function () { el.style.translate = '0 0'; });
    });
  }

  /* ---------- Línea de tiempo arrastrable ---------- */
  function initDrag() {
    var el = $('[data-drag]'); if (!el) return;
    var down = false, sx = 0, sl = 0, moved = false;
    el.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; sx = e.clientX; sl = el.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - sx;
      if (Math.abs(dx) > 4) { moved = true; el.classList.add('is-drag'); }
      el.scrollLeft = sl - dx;
    });
    window.addEventListener('pointerup', function () { down = false; el.classList.remove('is-drag'); });
    el.addEventListener('click', function (e) { if (moved) e.preventDefault(); }, true);
  }

  /* ---------- Filtros del catálogo ---------- */
  function initFilters() {
    var chips = $$('.chip');
    var cards = $$('.card');
    chips.forEach(function (chip) {
      var f = chip.getAttribute('data-filter');
      if (f !== 'all' && !chip.querySelector('sup')) {
        var n = cards.filter(function (c) { return c.getAttribute('data-cat').split(' ').indexOf(f) > -1; }).length;
        var sup = document.createElement('sup'); sup.textContent = n; chip.appendChild(sup);
      }
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); });
        cards.forEach(function (card) { card.classList.add('is-filtering'); });
        setTimeout(function () {
          cards.forEach(function (card) {
            var show = f === 'all' || card.getAttribute('data-cat').split(' ').indexOf(f) > -1;
            card.classList.toggle('is-hidden', !show);
            card.classList.add('is-in');
          });
          requestAnimationFrame(function () {
            cards.forEach(function (card, i) {
              setTimeout(function () { card.classList.remove('is-filtering'); }, 40 + i * 25);
            });
          });
        }, 260);
      });
    });
  }

  /* ---------- Pedido / carrito ---------- */
  var cart = [];
  function initCart() {
    var saved = store('ih-cart');
    if (Array.isArray(saved)) cart = saved;

    var list = $('[data-cart-list]');
    var totalEl = $('[data-cart-total]');
    var sendBtn = $('[data-send-order]');
    var toast = $('[data-toast]');
    var toastT;

    function cardInfo(card) {
      var sel = $('select.card__opt', card);
      var label, price;
      if (sel) { label = sel.options[sel.selectedIndex].text; price = parseInt(sel.value, 10); }
      else {
        var st = $('.card__opt--static', card);
        label = st ? st.getAttribute('data-label') : '';
        price = parseInt($('.card__price', card).getAttribute('data-price'), 10);
      }
      return {
        id: card.getAttribute('data-id'), name: card.getAttribute('data-name'),
        label: label, price: price, img: $('.card__media img', card).getAttribute('src')
      };
    }

    // precio según tamaño
    $$('.card').forEach(function (card) {
      var sel = $('select.card__opt', card);
      if (sel) sel.addEventListener('change', function () { $('.card__price', card).textContent = gs(parseInt(sel.value, 10)); });
      var btn = $('.card__add', card);
      btn.addEventListener('click', function () {
        var it = cardInfo(card);
        var key = it.id + '|' + it.label;
        var ex = cart.filter(function (c) { return c.key === key; })[0];
        if (ex) ex.qty++; else { it.key = key; it.qty = 1; cart.push(it); }
        save(); render();
        btn.classList.add('is-added');
        $('span', btn).textContent = 'Agregado ✓';
        setTimeout(function () { btn.classList.remove('is-added'); $('span', btn).textContent = 'Agregar al pedido'; }, 1600);
        $$('.nav__cart').forEach(function (b) { b.classList.remove('is-bump'); void b.offsetWidth; b.classList.add('is-bump'); });
        showToast('<b>' + it.name + '</b> se sumó a tu pedido');
      });
    });

    function showToast(html) {
      if (!toast) return;
      toast.innerHTML = html; toast.classList.add('is-on');
      clearTimeout(toastT); toastT = setTimeout(function () { toast.classList.remove('is-on'); }, 2400);
    }
    function save() { store('ih-cart', cart); }
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

    function render() {
      var count = cart.reduce(function (a, c) { return a + c.qty; }, 0);
      var total = cart.reduce(function (a, c) { return a + c.qty * c.price; }, 0);
      $$('[data-count-badge]').forEach(function (b) { b.textContent = count; });
      document.body.classList.toggle('has-items', count > 0);
      totalEl.textContent = gs(total);
      if (count > 0) sendBtn.removeAttribute('disabled'); else sendBtn.setAttribute('disabled', '');
      list.innerHTML = cart.map(function (c, i) {
        return '<li class="drawer__item"><img src="' + esc(c.img) + '" alt="">' +
          '<div><h4>' + esc(c.name) + '</h4><small>' + esc(c.label) + '</small><span class="price">' + gs(c.price * c.qty) + '</span></div>' +
          '<div class="qty"><button type="button" data-q="-1" data-i="' + i + '" aria-label="Quitar uno">−</button><span>' + c.qty + '</span>' +
          '<button type="button" data-q="1" data-i="' + i + '" aria-label="Agregar uno">+</button></div></li>';
      }).join('');
      if ($('.fab') && count > 0) $('.fab').classList.add('is-visible');
    }

    list.addEventListener('click', function (e) {
      var b = e.target.closest('[data-q]'); if (!b) return;
      var i = parseInt(b.getAttribute('data-i'), 10);
      cart[i].qty += parseInt(b.getAttribute('data-q'), 10);
      if (cart[i].qty <= 0) cart.splice(i, 1);
      save(); render();
    });

    // abrir / cerrar
    function open(v) {
      document.body.classList.toggle('cart-open', v);
      document.body.classList.toggle('is-locked', v);
      $('[data-drawer]').setAttribute('aria-hidden', !v);
    }
    $$('[data-open-cart]').forEach(function (b) { b.addEventListener('click', function () { open(true); }); });
    $$('[data-close-cart]').forEach(function (b) { b.addEventListener('click', function () { open(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') open(false); });

    sendBtn.addEventListener('click', function () {
      if (!cart.length) return;
      var f = $('[data-cart-form]');
      var lines = ['¡Hola IH Pâtisserie! Quisiera hacer este pedido:', ''];
      cart.forEach(function (c) { lines.push('• ' + c.qty + ' × ' + c.name + ' (' + c.label + ') — ' + gs(c.price * c.qty)); });
      lines.push('', 'Total referencial: ' + totalEl.textContent);
      var nombre = f.nombre.value.trim(), fecha = f.fecha.value, nota = f.nota.value.trim();
      if (nombre) lines.push('Nombre: ' + nombre);
      lines.push('Entrega: ' + f.entrega.value);
      if (fecha) lines.push('Fecha deseada: ' + fecha.split('-').reverse().join('/'));
      if (nota) lines.push('Nota: ' + nota);
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });

    render();
  }

  /* ---------- Formulario de contacto ---------- */
  function initContact() {
    var f = $('[data-contact-form]'); if (!f) return;
    var err = $('[data-form-error]');
    // fecha mínima: hoy
    try { var d = new Date(); var iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); $$('input[type=date]').forEach(function (i) { i.min = iso; }); } catch (e) {}
    $$('[data-preset]').forEach(function (a) {
      a.addEventListener('click', function () { f.motivo.value = 'Evento'; });
    });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = f.nombre.value.trim();
      f.nombre.parentNode.classList.toggle('is-invalid', !nombre);
      err.hidden = !!nombre;
      if (!nombre) { f.nombre.focus(); return; }
      var lines = ['¡Hola IH Pâtisserie! Soy ' + nombre + '.', 'Motivo: ' + f.motivo.value];
      if (f.fecha.value) lines.push('Fecha: ' + f.fecha.value.split('-').reverse().join('/'));
      if (f.cantidad.value) lines.push('Personas / unidades: ' + f.cantidad.value);
      if (f.mensaje.value.trim()) lines.push('', f.mensaje.value.trim());
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });
  }

  /* ---------- Abierto / cerrado (hora de Asunción) ---------- */
  function initStatus() {
    var HOURS = { 0: [10, 17], 1: [8, 18], 2: [8, 18], 3: [8, 18], 4: [8, 18], 5: [8, 18], 6: [8, 18] };
    var NAMES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    function now() {
      try {
        var parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Asuncion', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
        var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
        var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday);
        return { day: day, h: (parseInt(o.hour, 10) % 24) + parseInt(o.minute, 10) / 60 };
      } catch (e) { var d = new Date(); return { day: d.getDay(), h: d.getHours() + d.getMinutes() / 60 }; }
    }
    function pad(h) { return (h < 10 ? '0' : '') + h + ':00'; }
    function u() {
      var t = now(), r = HOURS[t.day], open = t.h >= r[0] && t.h < r[1], label;
      if (open) label = 'Abierto · cierra ' + pad(r[1]);
      else if (t.h < r[0]) label = 'Cerrado · abre ' + pad(r[0]);
      else { var nd = (t.day + 1) % 7; label = 'Cerrado · abre ' + NAMES[nd] + ' ' + pad(HOURS[nd][0]); }
      $$('[data-status]').forEach(function (s) {
        s.classList.toggle('is-closed', !open);
        $('b', s).textContent = s.closest('.nav') ? (open ? 'Abierto ahora' : 'Cerrado ahora') : label;
      });
      $$('[data-hours] li').forEach(function (li) { li.classList.toggle('is-today', parseInt(li.getAttribute('data-day'), 10) === t.day); });
    }
    u(); setInterval(u, 60000);
  }

  function initYear() { $$('[data-year]').forEach(function (y) { y.textContent = new Date().getFullYear(); }); }

  function boot() {
    safe(initSplash, 'splash');
    safe(initSplit, 'split');
    safe(initReveal, 'reveal');
    safe(initManifesto, 'manifesto');
    safe(initCounters, 'counters');
    safe(initParallax, 'parallax');
    safe(initProgress, 'progress');
    safe(initNav, 'nav');
    safe(initMenu, 'menu');
    safe(initCursor, 'cursor');
    safe(initMagnetic, 'magnetic');
    safe(initDrag, 'drag');
    safe(initFilters, 'filters');
    safe(initCart, 'cart');
    safe(initContact, 'contact');
    safe(initStatus, 'status');
    safe(initYear, 'year');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
