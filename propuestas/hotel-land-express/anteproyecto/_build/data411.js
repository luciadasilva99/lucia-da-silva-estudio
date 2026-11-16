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
    { img: "t_lampara.jpg", t: "Luz cálida", d: "Ambientes que invitan a quedarse." },
    { img: "t_tejido.jpg", t: "Tejidos", d: "Lana y texturas suaves para el confort." },
    { img: "n_basalto.jpg", t: "La piedra", d: "Texturas de la piedra volcánica neuquina." },
    { img: "n_lenga.jpg", t: "El bosque", d: "Los ocres y las maderas de las lengas." }
  ],
  materiales: [
    { n: 'Melamina Faplac<br>Roble Dakar', img: 'm_dakar.jpg' },
    { n: 'Piso roble<br>natural', img: 'm_roble.jpg' },
    { n: 'Pintura<br>blanco crudo', css: 'background:#efe9df; box-shadow: inset 0 0 0 1px rgba(17,17,17,.08)' },
    { n: 'Lino<br>natural', img: 'm_lino.jpg' },
    { n: 'Tejido<br>de lana', img: 't_lana2.jpg' },
    { n: 'Bronce<br>cepillado', img: 't_bronce.jpg' }
  ],
  renders: [
    { zona: 'Dormitorio', items: ['En desarrollo.'] },
    { zona: 'Living', items: ['En desarrollo.'] },
    { zona: 'Muebles TV', items: ['En desarrollo.'] },
    { zona: 'Cocina', items: ['En desarrollo.'] }
  ]
};
