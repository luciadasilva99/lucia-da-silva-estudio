module.exports = {
  tipo: 'SUITE',
  layoutTxt: 'Distribución del dormitorio y del living.',
  objetivos: [
    ["Diseñar espacios funcionales y estéticamente coherentes.", "", 1],
    ["Proponer una identidad espacial clara.", "", 5],
    ["Optimizar la distribución y el uso del espacio.", "", 4],
    ["Seleccionar materiales y paleta de colores a modo referencial.", "", 6]
  ],
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
    { zona: "Dormitorio", img: "v_dormitorio.jpg", ar: 2.263, items: ["Respaldo de madera de pared a pared, con mesas de luz flotantes.", "Empapelado símil lino blanco crudo en la parte superior.", "Apliques redondos dorados, de luz cálida.", "Tomacorrientes y llaves integrados al respaldo.", "Banco de madera al pie de la cama."],
      pins: [
        { x: 65.1, y: 30, img: "m_simil_lino.jpg", t: "Empapelado símil lino blanco crudo" },
        { x: 32.8, y: 57.5, img: "o_aplique.jpg", t: "Aplique dorado de luz cálida" },
        { x: 68, y: 56, img: "o_respaldo.jpg", t: "Respaldo de madera con mesas flotantes" },
        { x: 59.8, y: 63.9, img: "o_toma.jpg", t: "Tomacorriente integrado al respaldo" },
        { x: 46.5, y: 80.6, img: "o_banco.jpg", t: "Banco de madera al pie de la cama" }
      ] },
    { zona: 'Escritorio y rack TV', items: ['Escritorio, mueble y panel TV en Roble Dakar.', 'Mueble bajo abierto, con un estante que forma dos huecos.', 'Silla tapizada con cuero de cordero.', 'Colgante de chapa con lámpara cálida E27.'] },
    { zona: 'Living', items: ['Sofá con almohadones nuevos.', 'Dos mesas ratonas redondas: mármol verde y tono tierra.', 'Lámpara de pie de luz cálida.'] },
    { zona: 'Coffee station', items: ['Nicho de ingreso con mueble en Roble Dakar.', 'Espacio para frigobar, microondas y cafetera.', 'Luz cálida sobre la mesada.'] },
    { zona: 'Vanity', items: ['Mesada y espejo con luz cálida.', 'Terminaciones en línea con el resto de la suite.'] }
  ]
};
