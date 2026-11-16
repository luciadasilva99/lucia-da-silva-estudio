module.exports = {
  tipo: 'SUITE',
  layoutTxt: 'Distribución del dormitorio y del living.',
  objetivos: [
    ["Diseñar espacios funcionales y estéticamente coherentes.", "", 1],
    ["Proponer una identidad espacial clara.", "", 5],
    ["Optimizar la distribución y el uso del espacio.", "", 4],
    ["Seleccionar materiales y paleta de colores a modo referencial.", "", 6]
  ],
  planta: { img: "planta_general.png", ar: 1.2, ingreso: { x: 38.2, y: 16.6 },
    zonas: [
      { t: "Dormitorio", go: "r0", x: 80.8, y: 66.1 },
      { t: "Escritorio y rack TV", go: "r1", x: 38.6, y: 72.2 },
      { t: "Living", go: "r2", x: 21.5, y: 57.9 },
      { t: "Coffee station", go: "r3", x: 16.6, y: 6.8 },
      { t: "Vanity", go: "r4", x: 67.2, y: 32.8 }
    ] },
  layout: [
    { t: 'Dormitorio', img: 'layout_dormitorio.png', d: 'Cama con respaldo pared a pared, mesas de luz flotantes, escritorio y mueble TV integrados.' },
    { t: 'Living', img: 'layout_living.png', d: 'Sofá, dos mesas ratonas redondas y lámpara de pie.' }
  ],
  inspiracion: [
    { img: "i_1.jpg" }, { img: "i_2.jpg" }, { img: "i_3.jpg" }, { img: "i_4.jpg" }
  ],
  materiales: [
    { n: "Melamina Faplac<br>Roble Dakar", img: "m_dakar.jpg" },
    { n: "Melamina Faplac<br>Sahara", img: "m_sahara.jpg" },
    { n: "Mármol<br>verde oscuro", img: "m_marmol_verde.jpg" },
    { n: "Piso roble natural<br>existente", img: "m_roble.jpg" },
    { n: "Pintura<br>blanco crudo", css: "background:#efe9df; box-shadow: inset 0 0 0 1px rgba(17,17,17,.08)" },
    { n: "Empapelado símil lino<br>blanco crudo", img: "m_simil_lino.jpg" },
    { n: "Apliques<br>dorados", img: "t_bronce.jpg" }
  ],
  renders: [
    { zona: "Dormitorio", img: "v_dormitorio.jpg", ar: 2.263, items: ["Respaldo de madera de pared a pared, con mesas de luz flotantes.", "Empapelado símil lino blanco crudo en la parte superior.", "Apliques redondos dorados, de luz cálida.", "Tomacorrientes y llaves integrados al respaldo.", "Banco de madera al pie de la cama.", "Cuadro de paisaje neuquino en blanco y negro."],
      pins: [
        { x: 61, y: 24, img: "m_simil_lino.jpg", t: "Empapelado símil lino blanco crudo" },
        { x: 46.6, y: 36, img: "o_cuadro.jpg", t: "Cuadro de paisaje neuquino en blanco y negro, marco negro fino" },
        { x: 32.8, y: 57.5, img: "o_aplique.jpg", t: "Aplique dorado de luz cálida" },
        { x: 68, y: 56, img: "o_respaldo.jpg", t: "Respaldo de madera con mesas flotantes" },
        { x: 59.8, y: 63.9, img: "o_toma.jpg", t: "Tomacorriente integrado al respaldo" },
        { x: 46.5, y: 80.6, img: "o_banco.jpg", t: "Banco de madera al pie de la cama" }
      ] },
    { zona: "Escritorio y rack TV", img: "v_escritorio.jpg", ar: 1.658, items: ["Escritorio de madera con pie cilíndrico.", "Rack TV bajo, con estante abierto.", "Silla de madera.", "Colgantes dorados de luz cálida sobre el escritorio.", "Tomacorrientes a la altura del escritorio."],
      pins: [
        { x: 26, y: 30.4, img: "o_colgante.jpg", t: "Colgantes dorados de luz cálida" },
        { x: 24.3, y: 62, img: "o_tomas.jpg", t: "Tomacorrientes sobre el escritorio" },
        { x: 24.7, y: 79.2, img: "o_escritorio.jpg", t: "Escritorio de madera con pie cilíndrico" },
        { x: 36.7, y: 84.9, img: "o_silla.jpg", t: "Silla de madera" },
        { x: 70, y: 84.9, img: "o_rack.jpg", t: "Rack TV bajo de madera" }
      ] },
    { zona: "Living", img: "v_living.jpg", ar: 1.544, items: ["Sofá curvo tapizado en tono claro.", "Dos mesas ratonas redondas: madera y mármol verde.", "Lámpara de pie de arco, de luz cálida.", "Cortinas de lino de piso a techo.", "Rack TV en madera oscura."],
      pins: [
        { x: 72.3, y: 30, img: "o_lampara_pie.jpg", t: "Lámpara de pie de arco, luz cálida" },
        { x: 47, y: 42, img: "m_lino.jpg", t: "Cortinas de lino de piso a techo" },
        { x: 14.9, y: 53, img: "o_rack.jpg", t: "Rack TV en madera oscura" },
        { x: 85.8, y: 72.5, img: "o_sofa.jpg", t: "Sofá curvo · Antequera Muebles" },
        { x: 51.9, y: 80.9, img: "m_marmol_verde.jpg", t: "Mesas ratonas en madera y mármol verde" }
      ] },
    { zona: "Coffee station", img: "v_coffee.jpg", ar: 0.311, items: ["Nicho con estantes en madera oscura.", "Espacio para cafetera y microondas.", "Frigobar bajo mesada con frente de madera.", "Spot de luz cálida en el nicho."],
      pins: [
        { x: 26.4, y: 34.2, img: "o_estantes.jpg", t: "Nicho con estantes de madera" },
        { x: 48.5, y: 43.8, img: "o_cafetera.jpg", t: "Cafetera" },
        { x: 48.5, y: 76.7, img: "o_frente.jpg", t: "Frigobar con frente de madera" }
      ] },
    { zona: "Vanity", img: "v_vanity.jpg", ar: 1.784, items: ["Mesada flotante de madera con cajón.", "Espejo redondo.", "Silla de madera.", "Placard en melamina Sahara.", "Spots de luz cálida."],
      pins: [
        { x: 16.5, y: 18, img: "m_simil_lino.jpg", t: "Empapelado símil lino blanco crudo" },
        { x: 56.6, y: 30, img: "o_espejo.jpg", t: "Espejo redondo" },
        { x: 83.2, y: 48, img: "m_sahara.jpg", t: "Placard en melamina Sahara" },
        { x: 60.9, y: 69.7, img: "o_mesada.jpg", t: "Mesada flotante de madera con cajón" },
        { x: 50.5, y: 76.7, img: "o_silla.jpg", t: "Silla de madera" }
      ] }
  ]
};
