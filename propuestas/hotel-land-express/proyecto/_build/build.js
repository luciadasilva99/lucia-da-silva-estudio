// Arma un anteproyecto por habitación a partir de la propuesta publicada (mismo formato).
const fs = require('fs');
const path = require('path');
const base = process.argv[2]; // carpeta propuestas/hotel-land-express
const room = process.argv[3]; // "201" o "411"
const src = fs.readFileSync(path.join(base, 'index.html'), 'utf8').split('\n');
const css = fs.readFileSync(path.join(__dirname, '..', '..', 'anteproyecto', '_build', 'css.txt'), 'utf8') + fs.readFileSync(path.join(__dirname, 'extra.css'), 'utf8');

// cabecera: todo hasta </style> (sin incluirlo), con meta y título propios
let head = src.slice(0, src.indexOf('</style>')).join('\n');
const t = `Proyecto de interiorismo · Habitación ${room} · Opción simple y elaborada · Hotel Land Express`;
head = head
  .replace(/<title>.*<\/title>/, `<title>${t}</title>`)
  .replace(/(name="description" content=")[^"]*/, `$1${t} · Lucía Da Silva Estudio`)
  .replace(/(property="og:title" content=")[^"]*/, `$1${t}`)
  .replace(/(property="og:image" content=")[^"]*/, `$1https://luciadasilvaestudio.com.ar/propuestas/hotel-land-express/proyecto/${room}/img/A_dorm.jpg`)
  .replace(/(property="og:url" content=")[^"]*/, `$1https://luciadasilvaestudio.com.ar/propuestas/hotel-land-express/proyecto/${room}/`)
  .replace(/clarity\("set", "propuesta", "hotel-land-express"\)/, `clarity("set", "propuesta", "hotel-land-express-proyecto-${room}")`);

// motor de láminas: el mismo de la propuesta, sin las animaciones propias de cada lámina
const tailStart = src.findIndex(l => l.startsWith('<div id="sec"></div>'));
let tail = src.slice(tailStart).join('\n');
const a = tail.indexOf('  // ===== comportamientos por lámina =====');
const b = tail.indexOf('  function enter(i)');
tail = tail.slice(0, a) + '  var hooks = {};\n  function clearT(){}\n' + tail.slice(b);

const by = `<div class="fl">Arq. Clara Tacco Carulli &amp; D.I. Lucía Da Silva</div><div class="fr">Cliente · Hotel Land Express</div>`;
const cam = `<svg viewBox="0 0 46 46" fill="none" stroke="#a0583a" stroke-width="1.2"><path d="M23 6 L39 15 L39 33 L23 42 L7 33 L7 15 Z"/><path d="M7 15 L23 24 L39 15 M23 24 L23 42"/></svg>Vista en proceso`;

// Lámina de modelado 3D por zona. Si la zona tiene "pins", se agrega una segunda lámina
// con la MISMA vista en el mismo lugar (queda fija al pasar), y solo cambia el lateral:
// desaparece el texto, aparecen las fotos de los detalles y se dibujan flechas a lápiz por fuera de la imagen.
function sk(k) {
  // círculo blanco, liso y finito
  return `<svg viewBox="-24 -24 48 48"><path d="M15 0 A15 15 0 1 1 -15 0 A15 15 0 1 1 15 0" transform="rotate(${-60 + k * 47})"/></svg>`;
}
function vista(id, r) {
  const pic = (inner) => `<div class="pic" style="--ar:${r.ar || 1.6}"><img src="img/${r.img}" alt="Modelado 3D ${r.zona}">${inner || ''}</div>`;
  // Opciones de material (ej. armario): la principal es la vista base; cada opción es otra imagen que se desliza encima
  const altLayer = r.alt ? r.alt.opts.map((o, k) => `<img class="altimg" data-o="${k + 1}" src="img/${o.img}" alt="Modelado 3D ${r.zona} · opción ${o.n}">`).join('') +
    `<div class="opt"><span>${r.alt.t || 'Opción'}</span><button class="on" data-o="0">${r.alt.a}<small>${r.alt.as || 'principal'}</small></button>${r.alt.opts.map((o, k) => `<button data-o="${k + 1}">${o.n}<small>${o.s || 'opción'}</small></button>`).join('')}</div>` : '';
  const fr = r.img ? pic(altLayer) : cam;
  const pair = !!(r.img && r.pins && r.pins.length);
  let out = `
<!-- MODELADO 3D ${r.zona.toUpperCase()} -->
<section class="slide${pair ? ' pairA' : ''}" id="${id}">
  ${by}
  <div class="t rv"><h1>${r.h || 'Modelado 3D'} <span>· ${r.zona}</span></h1><div class="s">${r.s || 'Habitación ' + room}</div></div>
  <div class="pad">${pair ? `<div class="rnd full">
    <div class="frame has">${fr}</div>
  </div>` : `<div class="rnd">
    <div class="frame${r.img ? ' has' : ' rv'}" style="--d:.1s">${fr}</div>
    <div class="side rv" style="--d:.3s"><div class="z">${r.zt || 'Zona'}</div><h3>${r.st || r.zona}</h3><ul>${r.items.map(i => `<li>${i}</li>`).join('')}</ul></div>
  </div>`}</div>
  <div class="num"></div>
</section>`;
  if (pair) {
    out += `
<!-- MODELADO 3D ${r.zona.toUpperCase()} · DETALLES -->
<section class="slide pinsl" id="${id}d">
  ${by}
  <div class="t"><h1>Modelado 3D <span>· ${r.zona}</span></h1><div class="s">${r.ds || 'Ítem por ítem · Habitación ' + room}</div></div>
  <div class="pad"><div class="rnd pins">
    <div class="frame has">${pic(r.pins.map((p, k) => p.x == null ? '' : `<i class="pin" data-k="${k}" style="left:${p.x}%;top:${p.y}%;--d:${(.5 + k * .12).toFixed(2)}s">${sk(k)}<b>${k + 1}</b></i>`).join(''))}</div>
    <div class="side"><div class="z rv" style="--d:.15s">Zona</div><h3 class="rv" style="--d:.2s">${r.dt || 'Qué lleva'}</h3><div class="objs${r.pins.length > 8 ? " many" : ""}">${r.pins.map((p, k) => `<figure class="rv" data-k="${k}" style="--d:${(.3 + k * .12).toFixed(2)}s"><div class="ph" style="background-image:url('img/${p.img}')"></div><figcaption><b>${k + 1}</b>${p.t}</figcaption>${p.url ? `<a class="lnk" href="${p.url}" target="_blank" rel="noopener">Ver producto ↗</a>` : ""}</figure>`).join('')}</div></div>
  </div></div>
  <div class="num"></div>
</section>`;
  }
  return out;
}

// 1) Flechas a lápiz: salen de cada foto, bajan por el costado y rodean la imagen por fuera
//    (arriba, abajo o por la izquierda), y entran al objeto con un tramo corto. Curvas y temblorosas, finitas.
// 2) Imagen fija: entre la vista y sus detalles la imagen no se funde; solo cambia el lateral.
const pinsScript = `<script>
(function () {
  // al pasar el mouse por una foto se marca su objeto en la imagen, y al revés
  document.querySelectorAll(".slide.pinsl").forEach(function (sec) {
    function hl(k, on) { sec.querySelectorAll("[data-k='" + k + "']").forEach(function (el) { el.classList.toggle("hi", on); }); }
    sec.querySelectorAll("[data-k]").forEach(function (el) {
      el.addEventListener("mouseenter", function () { hl(el.dataset.k, true); });
      el.addEventListener("mouseleave", function () { hl(el.dataset.k, false); });
    });
  });
  // Opciones de armario: la elegida se desliza por encima; las anteriores se esconden recién cuando quedan tapadas
  function hideNow(i) { i.style.transition = "none"; i.classList.remove("show"); void i.offsetWidth; i.style.transition = ""; }
  function setOpt(pic, o, instant) {
    pic.dataset.o = o; pic.classList.toggle("alt-on", o !== "0");
    pic.querySelectorAll(".opt button").forEach(function (b) { b.classList.toggle("on", b.dataset.o === o); });
    var imgs = pic.querySelectorAll(".altimg");
    if (o === "0") { imgs.forEach(function (i) { instant ? hideNow(i) : i.classList.remove("show"); }); return; }
    var t = pic.querySelector(".altimg[data-o='" + o + "']");
    imgs.forEach(function (i) { i.style.zIndex = i === t ? 2 : 1; });
    t.classList.add("show");
    setTimeout(function () { if (pic.dataset.o === o) imgs.forEach(function (i) { if (i !== t) hideNow(i); }); }, 1050);
  }
  document.querySelectorAll(".pic .opt button").forEach(function (bt) {
    bt.addEventListener("click", function (e) { e.stopPropagation(); setOpt(bt.closest(".pic"), bt.dataset.o); });
  });
  // Ampliar: foto de detalle grande al pasar el mouse, clic para verla en pantalla completa.
  // Lupa sobre el modelado 3D al pasar el mouse, clic para verlo grande.
  var lbx = document.createElement("div"); lbx.className = "lbx";
  lbx.innerHTML = '<span class="x">×</span><img alt=""><div class="cap"></div>';
  document.body.appendChild(lbx);
  function openL(src, cap, url) { lbx.querySelector("img").src = src; var c = lbx.querySelector(".cap"); c.textContent = cap || ""; if (url) { var a = document.createElement("a"); a.href = url; a.target = "_blank"; a.rel = "noopener"; a.textContent = "Ver producto ↗"; a.addEventListener("click", function (e) { e.stopPropagation(); }); c.appendChild(a); } lbx.classList.add("on"); }
  function closeL() { lbx.classList.remove("on"); }
  lbx.addEventListener("click", function (e) { e.stopPropagation(); closeL(); });
  function block(e) { if (!lbx.classList.contains("on")) return; e.stopImmediatePropagation(); if (e.type === "keydown" && e.key === "Escape") closeL(); if (e.type === "wheel") e.preventDefault(); }
  window.addEventListener("keydown", block, true); window.addEventListener("wheel", block, { capture: true, passive: false });
  function srcOf(el) { var m = (el.style.backgroundImage || "").replace(/url|[()"']/g, ""); return m; }
  document.querySelectorAll(".rnd.pins").forEach(function (box) {
    var pk = document.createElement("div"); pk.className = "peek"; pk.appendChild(document.createElement("img")); box.appendChild(pk);
    box.querySelectorAll(".objs figure").forEach(function (f) {
      var src = srcOf(f.querySelector(".ph")), cap = f.querySelector("figcaption").lastChild.textContent;
      var pin = box.querySelector(".pin[data-k='" + f.dataset.k + "']");
      f.addEventListener("mouseenter", function () { pk.querySelector("img").src = src; pk.classList.toggle("l", !!pin && parseFloat(pin.style.left) > 50); pk.classList.add("on"); });
      f.addEventListener("mouseleave", function () { pk.classList.remove("on"); });
      var lk = f.querySelector(".lnk"); if (lk) lk.addEventListener("click", function (e) { e.stopPropagation(); });
      f.addEventListener("click", function (e) { if (e.target.closest(".lnk")) return; e.stopPropagation(); pk.classList.remove("on"); openL(src, cap, lk && lk.href); });
    });
  });
  var Z = 2.5;
  document.querySelectorAll(".rnd:not(.plg) .pic").forEach(function (pic) {
    var lens = document.createElement("div"); lens.className = "lens"; pic.appendChild(lens);
    function cur() { var o = pic.dataset.o, a = o && o !== "0" && pic.querySelector(".altimg[data-o='" + o + "']"); return a ? a.getAttribute("src") : pic.querySelector("img").getAttribute("src"); }
    pic.addEventListener("mousemove", function (e) {
      if (document.documentElement.classList.contains("mobile") || e.target.closest(".opt")) { lens.classList.remove("on"); return; }
      var r = pic.getBoundingClientRect(), k = r.width / pic.offsetWidth, w = pic.offsetWidth, h = pic.offsetHeight;
      var x = (e.clientX - r.left) / k, y = (e.clientY - r.top) / k;
      lens.style.left = x + "px"; lens.style.top = y + "px";
      lens.style.backgroundImage = "url('" + cur() + "')";
      lens.style.backgroundSize = (w * Z) + "px " + (h * Z) + "px";
      lens.style.backgroundPosition = (95 - x * Z) + "px " + (95 - y * Z) + "px";
      lens.classList.add("on");
    });
    pic.addEventListener("mouseleave", function () { lens.classList.remove("on"); });
    pic.addEventListener("click", function (e) { if (e.target.closest(".opt")) return; e.stopPropagation(); lens.classList.remove("on"); openL(cur(), ""); });
  });
  // Materiales: efecto "dock" de Mac, los círculos se agrandan según la cercanía del mouse
  if (!document.documentElement.classList.contains("mobile")) document.querySelectorAll(".sw").forEach(function (sw) {
    var its = sw.querySelectorAll(":scope > div");
    sw.addEventListener("mousemove", function (e) {
      var k = sw.getBoundingClientRect().width / sw.offsetWidth || 1;
      its.forEach(function (d) {
        var r = d.getBoundingClientRect(), dist = Math.abs(e.clientX - (r.left + r.width / 2)) / k;
        var m = 1 + 0.9 * Math.max(0, Math.cos(Math.min(dist / 240, 1) * Math.PI / 2));
        d.style.setProperty("--m", m.toFixed(3));
      });
    });
    sw.addEventListener("mouseleave", function () { its.forEach(function (d) { d.style.setProperty("--m", 1); }); });
  });
  function resetAlt() { setTimeout(function () { document.querySelectorAll(".slide:not(.on) .pic.alt-on").forEach(function (p) { setOpt(p, "0", true); }); }, 800); }
  // Vista (A, grande y sin lateral) y detalles (B, achicada con fotos): la imagen no se funde,
  // se agranda o se achica desde donde estaba hasta su lugar nuevo.
  function morph(from, to, i) {
    var pf = from.querySelector(".frame .pic"), pt = to.querySelector(".frame .pic");
    if (!pf || !pt) { base(i); return; }
    var a = pf.getBoundingClientRect();
    from.classList.add("snap"); to.classList.add("keep");
    pt.style.transition = "none"; pt.style.transform = "";
    base(i);
    var b = pt.getBoundingClientRect();
    if (!b.width) return;
    var k = b.width / pt.offsetWidth, s = a.width / b.width;
    pt.style.transition = "none"; pt.style.transformOrigin = "0 0";
    pt.style.transform = "translate(" + ((a.left - b.left) / k) + "px," + ((a.top - b.top) / k) + "px) scale(" + s + ")";
    void pt.offsetWidth;
    pt.style.transition = "transform .85s cubic-bezier(.65,0,.25,1)"; pt.style.transform = "";
    setTimeout(function () { from.classList.remove("snap"); to.classList.remove("keep"); pt.style.transition = ""; pt.style.transformOrigin = ""; }, 900);
  }
  if (typeof window.go === "function" && !document.documentElement.classList.contains("mobile")) {
    var base = window.go, slides = [].slice.call(document.querySelectorAll(".slide"));
    window.go = function (i) {
      var from = slides.indexOf(document.querySelector(".slide.on"));
      var A = slides[from], Bs = slides[i];
      var fwd = A && Bs && A.classList.contains("pairA") && Bs.id === A.id + "d";
      var back = A && Bs && Bs.classList.contains("pairA") && A.id === Bs.id + "d";
      if (fwd || back) { morph(A, Bs, i); resetAlt(); return; }
      base(i); resetAlt();
    };
  }
})();
</script>`;

const D = require(path.join(__dirname, `data${room}.js`));
const body = require("./body.js")({ D, room, by, vista });

// Alineación óptica: los textos de la columna izquierda del índice quedan a ras de los de la derecha
// (arriba: tope de mayúsculas de CONTENIDO = tope del primer ítem; abajo: última línea = última línea del índice).
const align = `<script>
(function(){
  var cv = document.createElement('canvas').getContext('2d');
  function met(el){ var cs = getComputedStyle(el), f = cs.fontWeight + ' 100px ' + cs.fontFamily, k = parseFloat(cs.fontSize) / 100; cv.font = f; var m = cv.measureText('H'); return { cap: m.actualBoundingBoxAscent * k, asc: m.fontBoundingBoxAscent * k, desc: m.fontBoundingBoxDescent * k }; }
  function rects(el){ var r = document.createRange(); r.selectNodeContents(el); return [].slice.call(r.getClientRects()); }
  function capTop(el){ var m = met(el), r = rects(el)[0]; return r.top + (m.asc - m.cap) * (r.height / (m.asc + m.desc)); }
  function base(el){ var m = met(el), rs = rects(el), r = rs[rs.length - 1]; return r.bottom - m.desc * (r.height / (m.asc + m.desc)); }
  function ink(el){ var t = el.firstChild, cs = getComputedStyle(el), r = document.createRange(); r.setStart(t, 0); r.setEnd(t, 1); cv.font = cs.fontWeight + ' 100px ' + cs.fontFamily; return r.getClientRects()[0].left - cv.measureText(t.data[0]).actualBoundingBoxLeft * parseFloat(cs.fontSize) / 100; }
  function run(){
    [].slice.call(document.querySelectorAll('.idx')).forEach(function(idx){
      var b = idx.querySelector('.l b'), s = idx.querySelector('.l span'), its = idx.querySelectorAll('.r a');
      if (!b || !s || !its.length) return;
      var k = idx.getBoundingClientRect().width / idx.offsetWidth || 1;
      b.style.transform = s.style.transform = '';
      b.style.display = s.style.display = 'block';
      var dt = (capTop(its[0].querySelector('b')) - capTop(b)) / k;
      var db = (base(its[its.length - 1].querySelector('span') || its[its.length - 1]) - base(s)) / k;
      var dx = (ink(b) - ink(s)) / k;
      b.style.transform = 'translateY(' + dt.toFixed(2) + 'px)';
      s.style.transform = 'translate(' + dx.toFixed(2) + 'px,' + db.toFixed(2) + 'px)';
    });
  }
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(run);
  window.addEventListener('resize', function(){ setTimeout(run, 50); });
})();
</script>`;
tail = tail.replace('</body>', align + '\n' + pinsScript + '\n</body>');

const out = head + '\n' + css + '</style>\n</head>\n<body>\n<nav id="mnav"></nav>\n<div id="stage">\n' + body + '\n' + tail + '\n';
const dest = path.join(base, 'proyecto', room, 'index.html');
fs.writeFileSync(dest, out);
console.log('ok', dest, out.length);
