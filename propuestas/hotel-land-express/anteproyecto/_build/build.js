// Arma un anteproyecto por habitación a partir de la propuesta publicada (mismo formato).
const fs = require('fs');
const path = require('path');
const base = process.argv[2]; // carpeta propuestas/hotel-land-express
const room = process.argv[3]; // "201" o "411"
const src = fs.readFileSync(path.join(base, 'index.html'), 'utf8').split('\n');
const css = fs.readFileSync(path.join(__dirname, 'css.txt'), 'utf8');

// cabecera: todo hasta </style> (sin incluirlo), con meta y título propios
let head = src.slice(0, src.indexOf('</style>')).join('\n');
const t = `Anteproyecto de interiorismo · Habitación ${room} · Hotel Land Express`;
head = head
  .replace(/<title>.*<\/title>/, `<title>${t}</title>`)
  .replace(/(name="description" content=")[^"]*/, `$1${t} · Lucía Da Silva Estudio`)
  .replace(/(property="og:title" content=")[^"]*/, `$1${t}`)
  .replace(/(property="og:image" content=")[^"]*/, `$1https://luciadasilvaestudio.com.ar/propuestas/hotel-land-express/anteproyecto/${room}/img/m_dakar.jpg`)
  .replace(/(property="og:url" content=")[^"]*/, `$1https://luciadasilvaestudio.com.ar/propuestas/hotel-land-express/anteproyecto/${room}/`)
  .replace(/clarity\("set", "propuesta", "hotel-land-express"\)/, `clarity("set", "propuesta", "hotel-land-express-anteproyecto-${room}")`);

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
  const altLayer = r.alt ? `<img class="altimg" src="img/${r.alt.img}" alt="Modelado 3D ${r.zona} · opción ${r.alt.b}"><div class="opt"><span>Armario</span><button class="on" data-o="0">${r.alt.a}<small>principal</small></button><button data-o="1">${r.alt.b}<small>alternativa</small></button></div>` : '';
  const fr = r.img ? pic(altLayer) : cam;
  const pair = !!(r.img && r.pins && r.pins.length);
  let out = `
<!-- MODELADO 3D ${r.zona.toUpperCase()} -->
<section class="slide${pair ? ' pairA' : ''}" id="${id}">
  ${by}
  <div class="t rv"><h1>Modelado 3D <span>· ${r.zona}</span></h1><div class="s">Habitación ${room}</div></div>
  <div class="pad">${pair ? `<div class="rnd full">
    <div class="frame has">${fr}</div>
  </div>` : `<div class="rnd">
    <div class="frame${r.img ? ' has' : ' rv'}" style="--d:.1s">${fr}</div>
    <div class="side rv" style="--d:.3s"><div class="z">Zona</div><h3>${r.zona}</h3><ul>${r.items.map(i => `<li>${i}</li>`).join('')}</ul></div>
  </div>`}</div>
  <div class="num"></div>
</section>`;
  if (pair) {
    out += `
<!-- MODELADO 3D ${r.zona.toUpperCase()} · DETALLES -->
<section class="slide pinsl" id="${id}d">
  ${by}
  <div class="t"><h1>Modelado 3D <span>· ${r.zona}</span></h1><div class="s">Detalles · Habitación ${room}</div></div>
  <div class="pad"><div class="rnd pins">
    <div class="frame has">${pic(r.pins.map((p, k) => `<i class="pin" data-k="${k}" style="left:${p.x}%;top:${p.y}%;--d:${(.5 + k * .12).toFixed(2)}s">${sk(k)}<b>${k + 1}</b></i>`).join(''))}</div>
    <div class="side"><div class="z rv" style="--d:.15s">Zona</div><h3 class="rv" style="--d:.2s">Detalles</h3><div class="objs${r.pins.length > 8 ? " many" : ""}">${r.pins.map((p, k) => `<figure class="rv" data-k="${k}" style="--d:${(.3 + k * .12).toFixed(2)}s"><div class="ph" style="background-image:url('img/${p.img}')"></div><figcaption><b>${k + 1}</b>${p.t}</figcaption>${p.url ? `<a class="lnk" href="${p.url}" target="_blank" rel="noopener">Ver producto ↗</a>` : ""}</figure>`).join('')}</div></div>
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
  // Opción de armario: desliza la alternativa sobre la principal
  document.querySelectorAll(".pic .opt button").forEach(function (bt) {
    bt.addEventListener("click", function (e) {
      e.stopPropagation(); var pic = bt.closest(".pic");
      pic.classList.toggle("alt-on", bt.dataset.o === "1");
      pic.querySelectorAll(".opt button").forEach(function (o) { o.classList.toggle("on", o === bt); });
    });
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
    function cur() { var a = pic.querySelector(".altimg"); return (a && pic.classList.contains("alt-on")) ? a.getAttribute("src") : pic.querySelector("img").getAttribute("src"); }
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
  function resetAlt() { setTimeout(function () { document.querySelectorAll(".slide:not(.on) .pic.alt-on").forEach(function (p) { p.classList.remove("alt-on"); p.querySelectorAll(".opt button").forEach(function (o, n) { o.classList.toggle("on", n === 0); }); }); }, 800); }
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

// Planta general dibujada a lápiz, con un punto de color sobre cada zona. Click lleva a su lámina de modelado 3D.
const zcol = ['#a0583a', '#7f8f6e', '#c9a35c', '#6f8494', '#b97d7d', '#8a6d5a'];
function plantaGeneral(P) {
  return `<div class="rnd plg">
    <div class="frame has rv" style="--d:.1s"><div class="pic" style="--ar:${P.ar}"><img src="img/${P.img}" alt="Planta general">
      ${P.zonas.map((z, k) => `<a class="mk" data-go="${z.go}" title="${z.t}" style="left:${z.x}%;top:${z.y}%;--c:${zcol[k % zcol.length]};--d:${(.5 + k * .12).toFixed(2)}s"><b></b></a>`).join('')}
      ${P.ingreso ? `<span class="ing" style="left:${P.ingreso.x}%;top:${P.ingreso.y}%">Ingreso</span>` : ''}
    </div></div>
    <div class="side rv" style="--d:.3s"><div class="z">Zonas</div><h3>Planta general</h3>
      <ol class="zl">${P.zonas.map((z, k) => `<li><a data-go="${z.go}" style="--c:${zcol[k % zcol.length]}"><b></b>${z.t}</a></li>`).join('')}</ol>
    </div>
  </div>`;
}
const icons = [
  '<rect pathLength="1" x="3" y="6" width="24" height="15" rx="1"/><line pathLength="1" x1="15" y1="21" x2="15" y2="26"/><line pathLength="1" x1="9" y1="26" x2="21" y2="26"/>',
  '<path pathLength="1" d="M4 24 V10 H26 V24 M4 18 H26"/><path pathLength="1" d="M8 10 V6 H22 V10"/>',
  '<circle pathLength="1" cx="15" cy="12" r="7"/><path pathLength="1" d="M11 22 h8 M12 26 h6"/>',
  '<path pathLength="1" d="M6 11 h15 v8 a6 6 0 0 1 -6 6 h-3 a6 6 0 0 1 -6 -6 z M21 13 h2 a3 3 0 0 1 0 6 h-2"/><path pathLength="1" d="M11 4 q2 2 0 4 M15 4 q2 2 0 4"/>',
  '<path pathLength="1" d="M4 25 L4 8 L15 4 L26 8 L26 25 Z M4 13 h22"/>',
  '<path pathLength="1" d="M15 3 v24 M15 8 l-6 4 M15 8 l6 4 M15 14 l-8 5 M15 14 l8 5 M15 20 l-10 5 M15 20 l10 5"/>',
  '<rect pathLength="1" x="4" y="4" width="13" height="13"/><rect pathLength="1" x="13" y="13" width="13" height="13"/>'
];
const delays = ['.2', '.35', '.42', '.5', '.65', '.8'];
const objetivos = D.objetivos.map((o, k) =>
  `    <p class="rv" style="--d:${delays[k]}s"><svg class="draw" style="--d:${(k * .15).toFixed(2)}s" viewBox="0 0 30 30" fill="none" stroke="#a0583a" stroke-width="1.4">${icons[o[2] != null ? o[2] : k % icons.length]}</svg><b>/ ${o[0]}</b>${o[1] ? `<br>${o[1]}` : ``}</p>`).join('\n');

const layout = D.layout.map((f, k) =>
  `    <figure class="rv" style="--d:${(.15 + k * .15).toFixed(2)}s"><div class="ph cad">${f.img ? `<img src="img/${f.img}" alt="Planta ${f.t}">` : `<div class="frame" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#8a7d70;font-size:11px;letter-spacing:.24em;text-transform:uppercase;">Planta en proceso</div>`}</div>${f.t ? `<figcaption>${f.t}<small>${f.d}</small></figcaption>` : ``}</figure>`).join('\n');

const mats = D.materiales.map((m, k) =>
  `      <div class="rv" style="--d:${(.1 + k * .08).toFixed(2)}s"><i ${m.img ? `class="img" style="background-image:url('img/${m.img}')"` : `style="${m.css}"`}></i><span>${m.n}</span></div>`).join('\n');

const zonas = D.renders.map(r => r.zona.toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' y $1');

const body = `
<!-- PORTADA -->
<section class="slide" id="inicio" data-sec="Inicio">
  <div class="date">Noviembre 2026</div>
  <div class="cover">
    <h1 class="rv" style="--d:.2s">ANTEPROYECTO DE INTERIORISMO</h1>
    <div class="sub rv" style="--d:.5s">HABITACIÓN ${room} &nbsp;·&nbsp; ${D.tipo}<span class="dsk"> &nbsp;—&nbsp; </span><br class="mob">HOTEL LAND EXPRESS</div>
    <div class="city rv" style="--d:.7s">Neuquén Capital — Argentina</div>
  </div>
  <div class="by rv" style="--d:1s">Arquitecta <b>Clara Tacco Carulli</b> &nbsp;·&nbsp; Diseñadora de interiores <b>Lucía Da Silva</b></div>
</section>

<!-- CONTENIDO -->
<section class="slide" id="contenido">
  <div class="img bgfull" style="position:absolute; inset:0; background-image:url('img/m_dakar.jpg');"></div>
  <div class="fl ondark">Arq. Clara Tacco Carulli &amp; D.I. Lucía Da Silva</div>
  <div class="fr ondark">Cliente · Hotel Land Express</div>
  <div class="card rv" style="--d:.15s">
    <div class="idx">
      <div class="l"><b>CONTENIDO</b><span>ANTEPROYECTO<br>DE INTERIORISMO<br>HABITACIÓN ${room}</span></div>
      <div class="r">
        <a data-go="objetivos"><b>01 / Objetivos</b><br><span>Qué resuelve este anteproyecto.</span></a>
        <a data-go="layout"><b>02 / Layout</b><br><span>${D.layoutTxt}</span></a>
        <a data-go="insp"><b>03 / Inspiración</b><br><span>Las imágenes que guían el diseño.</span></a>
        <a data-go="mat"><b>04 / Materiales</b><br><span>Terminaciones a utilizar.</span></a>
        <a data-go="modelado"><b>05 / Modelado 3D</b><br><span>${zonas.charAt(0).toUpperCase() + zonas.slice(1)}.</span></a>
        <a data-go="pasos"><b>06 / Próximos pasos</b><br><span>Lo que sigue.</span></a>
      </div>
    </div>
  </div>
  <div class="num ondark"></div>
</section>

<!-- OBJETIVOS -->
<section class="slide" id="objetivos" data-sec="Objetivos">
  ${by}
  <div class="t rv"><h1>Objetivos <span>del anteproyecto</span></h1></div>
  <div class="pad"><div class="obj">
${objetivos}
  </div></div>
  <div class="num"></div>
</section>

<!-- LAYOUT -->
<section class="slide" id="layout" data-sec="Layout">
  ${by}
  <div class="t rv"><h1>Layout <span>· Habitación ${room}</span></h1><div class="s">${D.planta ? 'Planta general · zonas a intervenir' : 'Distribución en planta'}</div></div>
  <div class="pad">${D.planta ? plantaGeneral(D.planta) : `<div class="lay">
${layout}
  </div>`}</div>
  <div class="num"></div>
</section>

<!-- INSPIRACIÓN -->
<section class="slide" id="insp" data-sec="Inspiración">
  ${by}
  <div class="t rv"><h1>Inspiración</h1><div class="s">Habitación ${room}</div></div>
  <div class="pad"><div class="insp">
${D.inspiracion.map((f, k) => `    <figure class="rv" style="--d:${(.1 + k * .12).toFixed(2)}s"><div class="img" style="background-image:url('img/${f.img}')"></div>${f.t ? `<figcaption>${f.t}<small>${f.d}</small></figcaption>` : ``}</figure>`).join('\n')}
  </div></div>
  <div class="num"></div>
</section>

<!-- MATERIALES -->
<section class="slide" id="mat" data-sec="Materiales">
  ${by}
  <div class="t rv"><h1>Materiales <span>a utilizar</span></h1><div class="s">Habitación ${room}</div></div>
  <div class="pad"><div class="matg">
    <p class="disc rv">Las terminaciones de la suite. Los tonos finales los confirmamos con muestras físicas.</p>
    <div class="sw${D.materiales.length > 6 ? " n" + D.materiales.length : ""}">
${mats}
    </div>
  </div></div>
  <div class="num"></div>
</section>

<!-- CARÁTULA MODELADO 3D -->
<section class="slide" id="modelado" data-sec="Modelado 3D">
  <div class="cv-txt cv-c">
    <div class="n rv">${room}</div>
    <div class="h rv" style="--d:.15s">MODELADO 3D</div>
    <div class="k rv" style="--d:.25s">POR ZONA</div>
    <p class="rv" style="--d:.4s">${zonas.charAt(0).toUpperCase() + zonas.slice(1)}.</p>
  </div>
  <div class="num"></div>
</section>
${D.renders.map((r, k) => vista('r' + k, r)).join('\n')}

<!-- PRÓXIMOS PASOS -->
<section class="slide" id="pasos" data-sec="Pasos">
  ${by}
  <div class="t rv" style="top:110px;"><h1 style="font-size:32px;">Próximos <span>pasos</span></h1></div>
  <div class="pad" style="top:200px;"><div class="steps">
    <div class="rv" style="--d:.1s"><div class="n">01</div><div class="k">Revisión del<br>anteproyecto</div><p>Nos reunimos para revisar el layout, los materiales y el modelado 3D, y recibir su OK para avanzar.</p></div>
    <div class="rv" style="--d:.25s"><div class="n">02</div><div class="k">Renders<br>fotorrealistas</div><p>Con el diseño aprobado, ajustamos los detalles y emitimos los renders finales de cada zona.</p></div>
    <div class="rv" style="--d:.4s"><div class="n">03</div><div class="k">Documentación<br>y compras</div><p>Planos de los muebles a medida, listado de materiales y pedidos de lo que más demora.</p></div>
    <div class="rv" style="--d:.55s"><div class="n">04</div><div class="k">Ejecución<br>en obra</div><p>Coordinamos a los gremios y supervisamos cada instancia hasta entregar la suite terminada.</p></div>
  </div></div>
  <div class="num"></div>
</section>

<!-- GRACIAS -->
<section class="slide" id="gracias">
  <div class="img bgfull" style="position:absolute; inset:0; background-image:url('img/m_dakar.jpg');"></div>
  <div class="thx rv" style="--d:.15s">
    <div style="font-weight:700; letter-spacing:.2em; font-size:24px;">¡MUCHAS</div>
    <div style="font-weight:300; letter-spacing:.2em; font-size:24px;">GRACIAS!</div>
    <div style="margin-top:26px; font-size:13px; line-height:1.75;">
      <i>Quedamos a disposición</i><br><br>
      Arquitecta<br><b>Clara Tacco Carulli</b><br>+54 9 299 504-6147<br><br>
      Diseñadora de interiores<br><b>Lucía Da Silva</b><br>+54 9 11 3565-9808
    </div>
    <a class="web" href="https://luciadasilvaestudio.com.ar/" target="_blank" rel="noopener">Conocé nuestros proyectos →</a>
  </div>
</section>
`;

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
const dest = path.join(base, 'anteproyecto', room, 'index.html');
fs.writeFileSync(dest, out);
console.log('ok', dest, out.length);
