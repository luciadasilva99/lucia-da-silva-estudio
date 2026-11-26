// Cuerpo de la presentación de anteproyecto con modelado 3D (opción completa y opción esencial).
// Orden: portada, contenido, dos opciones, plantas, modelado por zona, vista de conjunto, pasos, gracias.
module.exports = function ({ D, room, by, vista }) {
  const zonasTxt = D.zonas.map(z => z.zona.toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' y $1');

  const dos = `<div class="dos">
${D.opciones.map((o, k) => `    <div class="op rv" style="--d:${(.15 + k * .15).toFixed(2)}s">
      <div class="ph" style="background-image:url('img/${o.img}')"></div>
      <div class="z">${o.z}</div><h3>${o.t}</h3><p>${o.p}</p>
      <ul>${o.items.map(i => `<li>${i}</li>`).join('')}</ul>
    </div>`).join('\n')}
  </div>`;

  const C = D.conjunto;
  const col = `<div class="cg2">
    <div></div>${C.cols.map((c, k) => `<div class="ch rv" style="--d:${(.05 + k * .05).toFixed(2)}s">${c}</div>`).join('')}
${C.rows.map((r, i) => `    <div class="rh rv" style="--d:${(.1 + i * .1).toFixed(2)}s"><span>${r.o}</span></div>${r.imgs.map((im, k) => `<figure class="rv" style="--d:${(.15 + i * .12 + k * .06).toFixed(2)}s" data-src="img/${im}" data-cap="${r.o} · ${C.cols[k]}"><div class="ph" style="background-image:url('img/${im}')"></div></figure>`).join('')}`).join('\n')}
  </div>`;

  let n = 0;
  const zonas = D.zonas.map(z => {
    let out = `\n<!-- ZONA ${z.zona.toUpperCase()} -->\n` + vista('z' + (n++), z);
    (z.alts || []).forEach(a => { out += '\n' + vista('z' + (n++), a); });
    return out;
  }).join('\n');

  return `
<!-- PORTADA -->
<section class="slide" id="inicio" data-sec="Inicio">
  <div class="date">Noviembre 2026</div>
  <div class="cover">
    <h1 class="rv" style="--d:.2s">ANTEPROYECTO DE INTERIORISMO</h1>
    <div class="sub rv" style="--d:.5s">HABITACIÓN ${room} &nbsp;·&nbsp; ${D.tipo}<span class="dsk"> &nbsp;—&nbsp; </span><br class="mob">HOTEL LAND EXPRESS</div>
    <div class="city rv" style="--d:.7s">Modelado 3D &nbsp;·&nbsp; Opción completa y opción esencial</div>
  </div>
  <div class="by rv" style="--d:1s">Arquitecta <b>Clara Tacco Carulli</b> &nbsp;·&nbsp; Diseñadora de interiores <b>Lucía Da Silva</b></div>
</section>

<!-- CONTENIDO -->
<section class="slide" id="contenido">
  <div class="img bgfull" style="position:absolute; inset:0; background-image:url('img/${D.fondo}');"></div>
  <div class="fl ondark">Arq. Clara Tacco Carulli &amp; D.I. Lucía Da Silva</div>
  <div class="fr ondark">Cliente · Hotel Land Express</div>
  <div class="card rv" style="--d:.15s">
    <div class="idx">
      <div class="l"><b>CONTENIDO</b><span>ANTEPROYECTO<br>DE INTERIORISMO<br>HABITACIÓN ${room}</span></div>
      <div class="r">
        <a data-go="opciones"><b>01 / Dos opciones</b><br><span>Completa y esencial, en qué se diferencian.</span></a>
        <a data-go="plantas"><b>02 / Plantas</b><br><span>Las dos opciones con sus medidas, para orientarse.</span></a>
        <a data-go="modelado"><b>03 / Modelado 3D por zona</b><br><span>${zonasTxt.charAt(0).toUpperCase() + zonasTxt.slice(1)}.</span></a>
        <a data-go="conjunto"><b>04 / Vista de conjunto</b><br><span>Toda la suite junta, opción por opción.</span></a>
        <a data-go="pasos"><b>05 / Próximos pasos</b><br><span>Lo que sigue.</span></a>
      </div>
    </div>
  </div>
  <div class="num ondark"></div>
</section>

<!-- DOS OPCIONES -->
<section class="slide" id="opciones" data-sec="Opciones">
  ${by}
  <div class="t rv"><h1>Dos opciones <span>· Habitación ${room}</span></h1><div class="s">La misma suite, dos niveles de detalle</div></div>
  <div class="pad">${dos}</div>
  <div class="num"></div>
</section>

<!-- PLANTAS -->
${vista('plantas', D.plantas).replace('<section class="slide', '<section data-sec="Plantas" class="slide')}

<!-- CARÁTULA MODELADO 3D -->
<section class="slide" id="modelado" data-sec="Modelado 3D">
  <div class="cv-txt cv-c">
    <div class="n rv">${room}</div>
    <div class="h rv" style="--d:.15s">MODELADO 3D</div>
    <div class="k rv" style="--d:.25s">COMPLETA Y ESENCIAL</div>
    <p class="rv" style="--d:.4s">En cada vista, los botones de la imagen cambian entre opciones. Después de cada vista, ítem por ítem.</p>
  </div>
  <div class="num"></div>
</section>
${zonas}

<!-- VISTA DE CONJUNTO -->
<section class="slide" id="conjunto" data-sec="Conjunto">
  ${by}
  <div class="t rv"><h1>Vista de conjunto</h1><div class="s">Cada zona, en las dos opciones</div></div>
  <div class="pad">${col}</div>
  <div class="num"></div>
</section>

<!-- PRÓXIMOS PASOS -->
<section class="slide" id="pasos" data-sec="Pasos">
  ${by}
  <div class="t rv" style="top:110px;"><h1 style="font-size:32px;">Próximos <span>pasos</span></h1></div>
  <div class="pad" style="top:200px;"><div class="steps">
${D.pasos.map((p, k) => `    <div class="rv" style="--d:${(.1 + k * .15).toFixed(2)}s"><div class="n">0${k + 1}</div><div class="k">${p[0]}</div><p>${p[1]}</p></div>`).join('\n')}
  </div></div>
  <div class="num"></div>
</section>

<!-- GRACIAS -->
<section class="slide" id="gracias">
  <div class="img bgfull" style="position:absolute; inset:0; background-image:url('img/${D.fondo}');"></div>
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

<script>
(function () {
  // Vista de conjunto: clic en una imagen la abre grande
  var o = document.createElement("div"); o.className = "cgl"; o.innerHTML = '<img alt=""><div class="cap"></div>'; document.body.appendChild(o);
  function close() { o.classList.remove("on"); }
  o.addEventListener("click", function (e) { e.stopPropagation(); close(); });
  window.addEventListener("keydown", function (e) { if (o.classList.contains("on")) { e.stopImmediatePropagation(); if (e.key === "Escape") close(); } }, true);
  document.querySelectorAll(".cg2 figure").forEach(function (f) {
    f.addEventListener("click", function (e) { e.stopPropagation(); o.querySelector("img").src = f.dataset.src; o.querySelector(".cap").textContent = f.dataset.cap; o.classList.add("on"); });
  });
})();
</script>
`;
};
