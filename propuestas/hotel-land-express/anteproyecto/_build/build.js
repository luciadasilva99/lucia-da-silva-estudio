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
const cam = `<svg viewBox="0 0 46 46" fill="none" stroke="#a0583a" stroke-width="1.2"><rect x="5" y="11" width="36" height="26" rx="2"/><circle cx="23" cy="24" r="7"/><path d="M16 11 l3 -5 h8 l3 5"/></svg>Render en proceso`;

function render(id, zona, items, img) {
  const fr = img ? `<img src="img/${img}" alt="Render ${zona}">` : cam;
  return `
<!-- RENDER ${zona.toUpperCase()} -->
<section class="slide" id="${id}">
  ${by}
  <div class="t rv"><h1>Render <span>· ${zona}</span></h1><div class="s">Habitación ${room}</div></div>
  <div class="pad"><div class="rnd">
    <div class="frame rv" style="--d:.1s">${fr}</div>
    <div class="side rv" style="--d:.3s"><div class="z">Zona</div><h3>${zona}</h3><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul></div>
  </div></div>
  <div class="num"></div>
</section>`;
}

const D = require(path.join(__dirname, `data${room}.js`));
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
  `    <figure class="rv" style="--d:${(.15 + k * .15).toFixed(2)}s"><div class="ph cad">${f.img ? `<img src="img/${f.img}" alt="Planta ${f.t}">` : `<div class="frame" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#8a7d70;font-size:11px;letter-spacing:.24em;text-transform:uppercase;">Planta en proceso</div>`}</div><figcaption>${f.t}<small>${f.d}</small></figcaption></figure>`).join('\n');

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
        <a data-go="renders"><b>05 / Renders por zona</b><br><span>${zonas.charAt(0).toUpperCase() + zonas.slice(1)}.</span></a>
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
  <div class="t rv"><h1>Layout <span>· Habitación ${room}</span></h1><div class="s">Distribución en planta</div></div>
  <div class="pad"><div class="lay">
${layout}
  </div></div>
  <div class="num"></div>
</section>

<!-- INSPIRACIÓN -->
<section class="slide" id="insp" data-sec="Inspiración">
  ${by}
  <div class="t rv"><h1>Inspiración</h1><div class="s">Habitación ${room}</div></div>
  <div class="pad"><div class="insp">
${D.inspiracion.map((f, k) => `    <figure class="rv" style="--d:${(.1 + k * .12).toFixed(2)}s"><div class="img" style="background-image:url('img/${f.img}')"></div><figcaption>${f.t}<small>${f.d}</small></figcaption></figure>`).join('\n')}
  </div></div>
  <div class="num"></div>
</section>

<!-- MATERIALES -->
<section class="slide" id="mat" data-sec="Materiales">
  ${by}
  <div class="t rv"><h1>Materiales <span>a utilizar</span></h1><div class="s">Habitación ${room}</div></div>
  <div class="pad"><div class="matg">
    <p class="disc rv">Las terminaciones de la suite. Los tonos finales los confirmamos con muestras físicas.</p>
    <div class="sw">
${mats}
    </div>
  </div></div>
  <div class="num"></div>
</section>

<!-- CARÁTULA RENDERS -->
<section class="slide" id="renders" data-sec="Renders">
  <div class="cv-txt cv-c">
    <div class="n rv">${room}</div>
    <div class="h rv" style="--d:.15s">RENDERS</div>
    <div class="k rv" style="--d:.25s">POR ZONA</div>
    <p class="rv" style="--d:.4s">${zonas.charAt(0).toUpperCase() + zonas.slice(1)}.</p>
  </div>
  <div class="num"></div>
</section>
${D.renders.map((r, k) => render('r' + k, r.zona, r.items, r.img)).join('\n')}

<!-- PRÓXIMOS PASOS -->
<section class="slide" id="pasos" data-sec="Pasos">
  ${by}
  <div class="t rv" style="top:110px;"><h1 style="font-size:32px;">Próximos <span>pasos</span></h1></div>
  <div class="pad" style="top:200px;"><div class="steps">
    <div class="rv" style="--d:.1s"><div class="n">01</div><div class="k">Revisión del<br>anteproyecto</div><p>Recibimos sus comentarios sobre el layout, los materiales y los renders.</p></div>
    <div class="rv" style="--d:.25s"><div class="n">02</div><div class="k">Proyecto<br>final</div><p>Ajustamos el diseño y entregamos la versión final con los renders definitivos.</p></div>
    <div class="rv" style="--d:.4s"><div class="n">03</div><div class="k">Documentación<br>y compras</div><p>Planos de los muebles a medida, listado de materiales y pedidos de lo que más demora.</p></div>
    <div class="rv" style="--d:.55s"><div class="n">04</div><div class="k">Ejecución<br>en obra</div><p>Coordinamos a los gremios y supervisamos cada instancia hasta entregar la suite terminada.</p></div>
  </div></div>
  <div class="num"></div>
</section>

<!-- GRACIAS -->
<section class="slide" id="gracias">
  <div class="img bgfull" style="position:absolute; inset:0; background-image:url('img/gracias.jpg');"></div>
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
tail = tail.replace('</body>', align + '\n</body>');

const out = head + '\n' + css + '</style>\n</head>\n<body>\n<nav id="mnav"></nav>\n<div id="stage">\n' + body + '\n' + tail + '\n';
const dest = path.join(base, 'anteproyecto', room, 'index.html');
fs.writeFileSync(dest, out);
console.log('ok', dest, out.length);
