module.exports = {
  tipo: 'SUITE PRESIDENCIAL',
  layoutTxt: 'Distribución del dormitorio, el living y la cocina.',
  objetivos: [
    ["Diseñar espacios funcionales y estéticamente coherentes.", "", 1],
    ["Proponer una identidad espacial clara.", "", 5],
    ["Optimizar la distribución y el uso del espacio.", "", 4],
    ["Seleccionar materiales y paleta de colores a modo referencial.", "", 6]
  ],
  layout: [
    { t: 'Dormitorio', d: 'En desarrollo.' },
    { t: 'Living y cocina', d: 'En desarrollo.' }
  ],
  inspiracion: [
    { img: "i_1.jpg" }, { img: "i_2.jpg" }, { img: "i_3.jpg" }, { img: "i_4.jpg" }
  ],
  materiales: [
    { n: "Melamina Roble Dakar<br>(Faplac)", img: "m_dakar.jpg" },
    { n: "Melamina Sahara<br>(Faplac)", img: "m_sahara.jpg" },
    { n: "Melamina Safari<br>(Faplac) · opción", img: "m_safari.jpg" },
    { n: "Mármol<br>verde oscuro", img: "m_marmol_verde.jpg" },
    { n: "Piso roble natural<br>existente", img: "m_roble.jpg" },
    { n: "Pintura<br>blanco crudo", css: "background:#efe9df; box-shadow: inset 0 0 0 1px rgba(17,17,17,.08)" },
    { n: "Empapelado símil lino<br>blanco crudo", img: "m_simil_lino.jpg" },
    { n: "Apliques<br>dorados", img: "t_bronce.jpg" }
  ],
  renders: [
    { zona: 'Dormitorio', items: ['En desarrollo.'] },
    { zona: 'Living', items: ['En desarrollo.'] },
    { zona: 'Muebles TV', items: ['En desarrollo.'] },
    { zona: 'Cocina', items: ['En desarrollo.'] }
  ]
};
