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
    { img: "t_lampara.jpg", t: "Luz cálida", d: "Una luz baja y envolvente para el descanso." },
    { img: "n_telar.jpg", t: "El telar", d: "Los hilados crudos del pie de cama." },
    { img: "n_basalto.jpg", t: "La piedra", d: "Texturas de la piedra volcánica neuquina." },
    { img: "t_cafe.jpg", t: "El café", d: "Un ritual simple, al alcance de la mano." }
  ],
  materiales: [
    { n: 'Melamina Faplac<br>Roble Dakar', img: 'm_dakar.jpg' },
    { n: 'Piedra verde<br>oscuro', css: 'background:radial-gradient(circle at 30% 30%, #4d5b4f, #2c3530 70%)' },
    { n: 'Piso roble<br>natural', img: 'm_roble.jpg' },
    { n: 'Pintura<br>blanco crudo', css: 'background:#efe9df; box-shadow: inset 0 0 0 1px rgba(17,17,17,.08)' },
    { n: 'Pie de cama<br>de telar', img: 'n_telar.jpg' },
    { n: 'Apliques<br>dorados', img: 't_bronce.jpg' }
  ],
  renders: [
    { zona: 'Dormitorio', items: ['Respaldo de pared a pared en Roble Dakar.', 'Tira LED cálida en el borde superior.', 'Mesas de luz flotantes con tapa de piedra verde oscuro.', 'Apliques redondos dorados, de luz cálida.', 'Pie de cama de telar con guarda pampa.'] },
    { zona: 'Escritorio y rack TV', items: ['Escritorio, mueble y panel TV en Roble Dakar.', 'Mueble bajo abierto, con un estante que forma dos huecos.', 'Silla tapizada con cuero de cordero.', 'Colgante de chapa con lámpara cálida E27.'] },
    { zona: 'Living', items: ['Sofá con almohadones nuevos.', 'Dos mesas ratonas redondas: piedra verde y tono tierra.', 'Lámpara de pie de luz cálida.'] },
    { zona: 'Coffee station', items: ['Nicho de ingreso con mueble en Roble Dakar.', 'Espacio para frigobar, microondas y cafetera.', 'Luz cálida sobre la mesada.'] },
    { zona: 'Vanity', items: ['Mesada y espejo con luz cálida.', 'Terminaciones en línea con el resto de la suite.'] }
  ]
};
