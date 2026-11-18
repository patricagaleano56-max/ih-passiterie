/* IH Pâtisserie — interacciones */
(function () {
  'use strict';

  var WA = '595984985176';

  /* =========================================================
     CATÁLOGO — editá aquí productos, precios y fotos.
     Precios en guaraníes. img: ruta a la foto (o '' si no hay).
     tone: color de fondo cuando no hay foto.
     ========================================================= */
  var CATS = {
    tortas: 'Tortas de autor', entremets: 'Entremets', petit: 'Petit gâteau',
    chocolateria: 'Chocolatería', boxes: 'Boxes y regalos', temporada: 'Temporada'
  };
  var PRODUCTS = [
    { id: 'corona', cat: 'tortas', name: 'Corona de Frutillas', em: '& Chocolate', img: 'assets/img/p-corona.jpg', badge: 'Favorita',
      desc: 'Bizcocho de cacao, crema de chocolate con leche y frutillas frescas, rodeada de una corona de bombones crocantes.',
      opts: [['12 porciones', 320000], ['20 porciones', 450000]] },
    { id: 'lavanda', cat: 'tortas', name: 'Lavanda', em: 'Marmolada', img: 'assets/img/p-lavanda.jpg', badge: 'Línea floral', soft: true,
      desc: 'Bizcocho de vainilla, cremoso de frutos rojos y glaseado marmolado lila con flores comestibles y almendras.',
      opts: [['12 porciones', 360000], ['20 porciones', 520000]] },
    { id: 'choco', cat: 'tortas', name: 'Chocolate', em: 'Intenso', img: 'assets/img/p-chocolate.jpg', tags: ['Opción sin gluten'],
      desc: 'Bizcocho húmedo de cacao, ganache de chocolate amargo y rosetas de crema de cacao.',
      opts: [['10 porciones', 260000], ['16 porciones', 380000]] },
    { id: 'limon', cat: 'entremets', name: 'Limón', em: "Trompe-l'œil", img: 'assets/img/p-limon.jpg', badge: 'Firma de la casa',
      desc: 'Un limón que no es un limón: mousse de limón, cremoso de maracuyá y corazón de almendra, pintado a mano.',
      opts: [['Individual', 48000], ['Caja x4', 180000]] },
    { id: 'sublime', cat: 'entremets', name: 'Sublime', em: 'floral', img: '', tone: 'blush',
      desc: 'Mousse de chocolate blanco y jazmín sobre un crocante de almendras. Delicado y nada empalagoso.',
      opts: [['8 porciones', 290000], ['14 porciones', 410000]] },
    { id: 'frutos', cat: 'entremets', name: 'Tarta de', em: 'Frutos Rojos', img: '', tone: 'berry',
      desc: 'Masa sablée de almendras, crema diplomática de vainilla y frutos rojos frescos de estación.',
      opts: [['8 porciones', 230000], ['12 porciones', 330000]] },
    { id: 'eclairs', cat: 'petit', name: 'Éclairs', em: 'de la Casa', img: '', tone: 'caramel', badge: 'Clásico IH',
      desc: 'Pâte à choux crocante, crema pastelera y glaseado brillante. Chocolate, café, caramelo salado o maracuyá.',
      opts: [['Unidad', 26000], ['Caja x6', 145000]] },
    { id: 'verrines', cat: 'petit', name: 'Verrines', em: 'en frasco', img: '', tone: 'cream',
      desc: 'Tiramisú o cheesecake de frutos rojos en frasquitos individuales, listos para llevar o para la mesa dulce.',
      opts: [['Unidad', 32000], ['Caja x6', 180000]] },
    { id: 'scones', cat: 'petit', name: 'Scones', em: 'de Queso', img: '', tone: 'gold',
      desc: 'Horneados cada mañana con queso y manteca. El salado que siempre acompaña al café.',
      opts: [['Media docena', 45000], ['Docena', 85000]] },
    { id: 'bombones', cat: 'chocolateria', name: 'Caja de', em: 'Bombones', img: 'assets/img/p-bombones.jpg', badge: 'Para regalar',
      desc: 'Bombones pintados a mano con rellenos de frutos rojos, praliné de almendras, caramelo salado y gianduja.',
      opts: [['Caja x12', 150000], ['Caja x24', 280000]] },
    { id: 'trufas', cat: 'chocolateria', name: 'Trufas', em: 'de Cacao', img: '', tone: 'cocoa', tags: ['Sin gluten'],
      desc: 'Ganache de chocolate amargo cubierta de cacao puro. Pequeñas, intensas y difíciles de compartir.',
      opts: [['Caja x9', 95000], ['Caja x18', 180000]] },
    { id: 'boxm', cat: 'boxes', name: 'IH Box', em: 'Desayuno', img: 'assets/img/p-box.jpg', badge: 'Sorpresa',
      desc: 'Desayuno para regalar: croissants, scones, muffins, budín, jugos naturales y mermelada, con tarjeta personalizada.',
      opts: [['Box M · 2 personas', 260000], ['Box L · 4 personas', 420000]] },
    { id: 'popurri', cat: 'boxes', name: 'Caja', em: 'Popurrí', img: '', tone: 'terra', tags: ['Personalizable con tu logo'],
      desc: 'Selección de bocados de la casa, pensada para regalos empresariales y fechas especiales.',
      opts: [['16 bocados', 190000], ['30 bocados', 340000]] },
    { id: 'flor', cat: 'temporada', name: 'Flor', em: 'de Coco', img: '', tone: 'coco', badge: 'Navidad', dark: true,
      desc: 'La torta con forma de la flor de coco, emblema de la Navidad paraguaya: maracuyá, chocolate con leche y coco.',
      opts: [['10 porciones', 340000], ['16 porciones', 480000]] },
    { id: 'cosmos', cat: 'temporada', name: 'Huevo', em: 'Cosmos', img: '', tone: 'night', badge: 'Pascua', dark: true,
      desc: 'Huevo de chocolate pintado a mano, con praliné de almendras y bombones planetarios escondidos adentro.',
      opts: [['400 g', 295000]] },
    { id: 'dark', cat: 'temporada', name: 'Dark', em: 'sin Azúcar', img: '', tone: 'cocoa', badge: 'Pascua', dark: true, tags: ['Vegano', 'Sin gluten', 'Sin azúcar'],
      desc: 'Chocolate 100% cacao endulzado sin azúcar agregada. Intenso y limpio.',
      opts: [['180 g', 150000]] }
  ];

  var root = document.documentElement;
  var noIntro = root.classList.contains('no-intro');
  var fine = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function gs(n) { return 'Gs. ' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function safe(fn, n) { try { fn(); } catch (e) { if (window.console) console.warn('[IH] ' + n, e); } }
  function store(k, v) {
    try { if (v === undefined) return JSON.parse(localStorage.getItem(k) || 'null'); localStorage.setItem(k, JSON.stringify(v)); }
    catch (e) { return null; }
  }
  function wa(lines) { window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener'); }

  /* ---------- Intro ---------- */
  function initIntro() {
    var el = $('.intro'); if (!el) return;
    if (noIntro) { el.remove(); return; }
    setTimeout(function () { el.classList.add('is-done'); }, 1700);
    setTimeout(function () { el.remove(); }, 2900);
  }

  /* ---------- Catálogo (render) ---------- */
  function renderCatalog() {
    var grid = $('[data-grid]'), bar = $('[data-filters]');
    if (!grid || !bar) return;
    grid.innerHTML = PRODUCTS.map(function (p) {
      var media = p.img
        ? '<img src="' + esc(p.img) + '" alt="' + esc(p.name + ' ' + p.em) + '" loading="lazy">'
        : '<div class="art art--' + esc(p.tone || 'cream') + '"><img src="assets/mark-cream.png" alt=""><span>' + esc(p.em) + '</span></div>';
      var badge = p.badge ? '<span class="card__badge' + (p.soft ? ' is-soft' : '') + (p.dark ? ' is-dark' : '') + '">' + esc(p.badge) + '</span>' : '';
      var tags = p.tags ? '<ul class="card__tags">' + p.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '';
      var opt = p.opts.length > 1
        ? '<select class="card__opt" aria-label="Presentación">' + p.opts.map(function (o, i) { return '<option value="' + i + '">' + esc(o[0]) + '</option>'; }).join('') + '</select>'
        : '<span class="card__opt is-static">' + esc(p.opts[0][0]) + '</span>';
      return '<article class="card reveal" data-cat="' + p.cat + '" data-id="' + p.id + '">' +
        '<div class="card__media">' + media + badge + '</div>' +
        '<div class="card__body"><p class="card__cat">' + esc(CATS[p.cat]) + '</p>' +
        '<h3 class="card__name">' + esc(p.name) + ' <em>' + esc(p.em) + '</em></h3>' +
        '<p class="card__desc">' + esc(p.desc) + '</p>' + tags +
        '<div class="card__buy">' + opt + '<p class="card__price">' + gs(p.opts[0][1]) + '</p></div>' +
        '<button class="card__add" type="button"><span>Agregar al pedido</span><svg><use href="#i-bag"/></svg></button></div></article>';
    }).join('');

    var keys = ['all'].concat(Object.keys(CATS));
    bar.innerHTML = keys.map(function (k) {
      var n = k === 'all' ? PRODUCTS.length : PRODUCTS.filter(function (p) { return p.cat === k; }).length;
      return '<button class="chip' + (k === 'all' ? ' is-active' : '') + '" type="button" data-filter="' + k + '">' + (k === 'all' ? 'Todo' : CATS[k]) + ' <sup>' + n + '</sup></button>';
    }).join('');

    bar.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip'); if (!chip) return;
      var f = chip.getAttribute('data-filter');
      $$('.chip', bar).forEach(function (c) { c.classList.toggle('is-active', c === chip); });
      var cards = $$('.card', grid);
      cards.forEach(function (c) { c.classList.add('is-fading'); });
      setTimeout(function () {
        cards.forEach(function (c, i) {
          c.hidden = !(f === 'all' || c.getAttribute('data-cat') === f);
          c.classList.add('is-in');
          setTimeout(function () { c.classList.remove('is-fading'); }, 30 + i * 22);
        });
      }, 240);
    });

    grid.addEventListener('change', function (e) {
      if (!e.target.matches('.card__opt')) return;
      var card = e.target.closest('.card');
      var p = find(card.getAttribute('data-id'));
      $('.card__price', card).textContent = gs(p.opts[+e.target.value][1]);
    });
  }
  function find(id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; }

  /* ---------- Pedido ---------- */
  var cart = [];
  function initCart() {
    var saved = store('ih-cart-v2'); if (Array.isArray(saved)) cart = saved;
    var list = $('[data-cart-list]'), total = $('[data-cart-total]'), send = $('[data-send-order]'), toast = $('[data-toast]'), tt;

    function save() { store('ih-cart-v2', cart); }
    function render() {
      var count = 0, sum = 0;
      cart.forEach(function (c) { count += c.qty; sum += c.qty * c.price; });
      $$('[data-badge]').forEach(function (b) { b.textContent = count; });
      document.body.classList.toggle('has-items', count > 0);
      total.textContent = gs(sum);
      send.disabled = count === 0;
      list.innerHTML = cart.map(function (c, i) {
        var p = find(c.id) || {};
        var thumb = p.img ? '<img src="' + esc(p.img) + '" alt="">' : '<span class="thumb art--' + esc(p.tone || 'cream') + '"><img src="assets/mark-cream.png" alt=""></span>';
        return '<li class="ditem">' + thumb + '<div><h4>' + esc(c.name) + '</h4><small>' + esc(c.label) + '</small><span>' + gs(c.price * c.qty) + '</span></div>' +
          '<div class="qty"><button type="button" data-q="-1" data-i="' + i + '" aria-label="Quitar uno">−</button><b>' + c.qty + '</b><button type="button" data-q="1" data-i="' + i + '" aria-label="Agregar uno">+</button></div></li>';
      }).join('');
    }
    function showToast(html) {
      toast.innerHTML = html; toast.classList.add('is-on');
      clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('is-on'); }, 2300);
    }

    $('[data-grid]').addEventListener('click', function (e) {
      var btn = e.target.closest('.card__add'); if (!btn) return;
      var card = btn.closest('.card'), p = find(card.getAttribute('data-id'));
      var sel = $('select.card__opt', card), o = p.opts[sel ? +sel.value : 0];
      var key = p.id + '|' + o[0];
      var ex = cart.filter(function (c) { return c.key === key; })[0];
      if (ex) ex.qty++; else cart.push({ key: key, id: p.id, name: p.name + ' ' + p.em, label: o[0], price: o[1], qty: 1 });
      save(); render();
      btn.classList.add('is-added'); $('span', btn).textContent = 'Agregado ✓';
      setTimeout(function () { btn.classList.remove('is-added'); $('span', btn).textContent = 'Agregar al pedido'; }, 1500);
      var nc = $('.nav__cart'); nc.classList.remove('is-bump'); void nc.offsetWidth; nc.classList.add('is-bump');
      showToast('<b>' + esc(p.name + ' ' + p.em) + '</b> se sumó a tu pedido');
    });

    list.addEventListener('click', function (e) {
      var b = e.target.closest('[data-q]'); if (!b) return;
      var i = +b.getAttribute('data-i');
      cart[i].qty += +b.getAttribute('data-q');
      if (cart[i].qty <= 0) cart.splice(i, 1);
      save(); render();
    });

    function open(v) {
      document.body.classList.toggle('cart-open', v);
      document.body.classList.toggle('is-locked', v);
      $('[data-drawer]').setAttribute('aria-hidden', !v);
    }
    $$('[data-open-cart]').forEach(function (b) { b.addEventListener('click', function () { open(true); }); });
    $$('[data-close-cart]').forEach(function (b) { b.addEventListener('click', function () { open(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') open(false); });

    send.addEventListener('click', function () {
      if (!cart.length) return;
      var f = $('[data-cart-form]');
      var lines = ['¡Hola IH Pâtisserie! Quisiera hacer este pedido:', ''];
      cart.forEach(function (c) { lines.push('• ' + c.qty + ' × ' + c.name + ' (' + c.label + ') — ' + gs(c.price * c.qty)); });
      lines.push('', 'Total referencial: ' + total.textContent);
      if (f.nombre.value.trim()) lines.push('Nombre: ' + f.nombre.value.trim());
      lines.push('Entrega: ' + f.entrega.value);
      if (f.fecha.value) lines.push('Fecha deseada: ' + f.fecha.value.split('-').reverse().join('/'));
      if (f.nota.value.trim()) lines.push('Nota: ' + f.nota.value.trim());
      wa(lines);
    });

    render();
  }

  /* ---------- Contacto ---------- */
  function initContact() {
    var f = $('[data-contact-form]'); if (!f) return;
    var err = $('[data-form-error]');
    try {
      var d = new Date(), iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      $$('input[type=date]').forEach(function (i) { i.min = iso; });
    } catch (e) {}
    $$('[data-preset]').forEach(function (a) { a.addEventListener('click', function () { f.motivo.value = a.getAttribute('data-preset'); }); });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = f.nombre.value.trim();
      f.nombre.parentNode.classList.toggle('is-invalid', !n); err.hidden = !!n;
      if (!n) { f.nombre.focus(); return; }
      var lines = ['¡Hola IH Pâtisserie! Soy ' + n + '.', 'Motivo: ' + f.motivo.value];
      if (f.fecha.value) lines.push('Fecha: ' + f.fecha.value.split('-').reverse().join('/'));
      if (f.cantidad.value) lines.push('Personas / unidades: ' + f.cantidad.value);
      if (f.mensaje.value.trim()) lines.push('', f.mensaje.value.trim());
      wa(lines);
    });
  }

  /* ---------- Abierto / cerrado (hora de Asunción) ---------- */
  function initStatus() {
    var H = { 0: [10, 17], 1: [8, 18], 2: [8, 18], 3: [8, 18], 4: [8, 18], 5: [8, 18], 6: [8, 18] };
    var N = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    function now() {
      try {
        var o = {};
        new Intl.DateTimeFormat('en-US', { timeZone: 'America/Asuncion', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false })
          .formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
        return { d: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday), h: (+o.hour % 24) + (+o.minute) / 60 };
      } catch (e) { var x = new Date(); return { d: x.getDay(), h: x.getHours() + x.getMinutes() / 60 }; }
    }
    function pad(h) { return (h < 10 ? '0' : '') + h + ':00'; }
    function u() {
      var t = now(), r = H[t.d], open = t.h >= r[0] && t.h < r[1], label;
      if (open) label = 'Abierto · cierra ' + pad(r[1]);
      else if (t.h < r[0]) label = 'Cerrado · abre ' + pad(r[0]);
      else { var nd = (t.d + 1) % 7; label = 'Cerrado · abre ' + N[nd] + ' ' + pad(H[nd][0]); }
      $$('[data-status]').forEach(function (s) {
        s.classList.toggle('is-closed', !open);
        $('b', s).textContent = s.closest('.nav') ? (open ? 'Abierto ahora' : 'Cerrado ahora') : label;
      });
      $$('[data-hours] li').forEach(function (li) { li.classList.toggle('is-today', +li.getAttribute('data-day') === t.d); });
    }
    u(); setInterval(u, 60000);
  }

  /* ---------- Reveal ---------- */
  function initReveal() {
    var els = $$('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (!x.isIntersecting) return;
        var el = x.target, sib = $$(':scope > .reveal', el.parentNode);
        el.style.transitionDelay = Math.min(Math.max(0, sib.indexOf(el)) * 0.07, 0.42) + 's';
        el.classList.add('is-in'); io.unobserve(el);
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
    setTimeout(function () { els.forEach(function (e) { e.classList.add('is-in'); }); }, 7000);
  }

  /* ---------- Manifiesto palabra por palabra ---------- */
  function initWords() {
    var m = $('[data-words]'); if (!m) return;
    var acc = ['idea.', 'concepto,', 'intenso,', 'francés', 'paraguaya.'];
    m.innerHTML = m.textContent.trim().split(/\s+/).map(function (w) {
      return '<span class="w' + (acc.indexOf(w) > -1 ? ' acc' : '') + '">' + esc(w) + '</span>';
    }).join(' ');
    var ws = $$('.w', m);
    function u() {
      var r = m.getBoundingClientRect(), vh = innerHeight;
      var p = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (r.height + vh * 0.3)));
      var n = Math.round(p * ws.length);
      for (var i = 0; i < ws.length; i++) ws[i].classList.toggle('on', i < n);
    }
    addEventListener('scroll', u, { passive: true }); addEventListener('resize', u); u();
  }

  /* ---------- Contadores ---------- */
  function initCounters() {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (!x.isIntersecting) return;
        var el = x.target; io.unobserve(el);
        var to = +el.getAttribute('data-count'), from = to > 1000 ? to - 30 : 0, suf = el.getAttribute('data-suffix') || '';
        var t0 = performance.now();
        (function tick(t) {
          var p = Math.min(1, (t - t0) / 1700), e = 1 - Math.pow(1 - p, 4);
          el.textContent = Math.round(from + (to - from) * e) + suf;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.01 });
    $$('[data-count]').forEach(function (e) { io.observe(e); });
  }

  /* ---------- Scroll: nav, progreso, parallax ---------- */
  function initScroll() {
    var nav = $('.nav'), bar = $('.progress span'), fab = $('.fab'), last = scrollY, tick = false;
    var stage = $('.hero__stage');
    function run() {
      var y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
      nav.classList.toggle('is-scrolled', y > 30);
      var menu = document.body.classList.contains('menu-open');
      if (!menu && y > 520 && y > last + 4) nav.classList.add('is-hidden');
      else if (y < last - 4 || y < 520) nav.classList.remove('is-hidden');
      document.body.classList.toggle('nav-hidden', nav.classList.contains('is-hidden'));
      bar.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
      fab.classList.toggle('is-visible', y > innerHeight * 0.8 || document.body.classList.contains('has-items'));
      if (stage && y < innerHeight * 1.2) stage.style.translate = '0 ' + (y * 0.12).toFixed(1) + 'px';
      last = y; tick = false;
    }
    addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(run); } }, { passive: true });
    run();

    var links = $$('.nav__links a');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (x) {
          if (x.isIntersecting) links.forEach(function (a) { a.classList.toggle('is-current', a.getAttribute('href') === '#' + x.target.id); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      $$('main section[id]').forEach(function (s) { io.observe(s); });
    }
  }

  /* ---------- Menú móvil ---------- */
  function initMenu() {
    var b = $('[data-burger]'), m = $('[data-menu]');
    function set(o) {
      document.body.classList.toggle('menu-open', o); document.body.classList.toggle('is-locked', o);
      b.setAttribute('aria-expanded', o); m.setAttribute('aria-hidden', !o);
    }
    b.addEventListener('click', function () { set(!document.body.classList.contains('menu-open')); });
    $$('a', m).forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  }

  /* ---------- Botones magnéticos y tilt ---------- */
  function initPointer() {
    if (!fine) return;
    $$('.magnetic').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.translate = ((e.clientX - r.left - r.width / 2) * 0.2).toFixed(1) + 'px ' + ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + 'px';
      });
      el.addEventListener('mouseleave', function () { el.style.translate = '0 0'; });
    });
    var arch = $('.arch');
    if (arch) addEventListener('mousemove', function (e) {
      var x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      arch.style.transform = 'rotateY(' + (x * 8).toFixed(2) + 'deg) rotateX(' + (-y * 8).toFixed(2) + 'deg)';
    });
  }

  function initYear() { $$('[data-year]').forEach(function (y) { y.textContent = new Date().getFullYear(); }); }

  function boot() {
    safe(initIntro, 'intro');
    safe(renderCatalog, 'catalogo');
    safe(initCart, 'pedido');
    safe(initContact, 'contacto');
    safe(initStatus, 'horario');
    safe(initReveal, 'reveal');
    safe(initWords, 'manifiesto');
    safe(initCounters, 'contadores');
    safe(initScroll, 'scroll');
    safe(initMenu, 'menu');
    safe(initPointer, 'puntero');
    safe(initYear, 'año');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
