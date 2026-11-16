module.exports = {
  tipo: 'SUITE',
  layoutTxt: 'Distribución del dormitorio y del living.',
  objetivos: [
    ['Escritorio y mueble TV integrados,', 'en Roble Dakar, con el mueble bajo abierto y dos huecos, sin puertas.'],
    ['Un respaldo de pared a pared,', 'con luz cálida arriba y mesas de luz flotantes con tapa de piedra.'],
    ['Luz cálida en toda la suite,', 'con artefactos prácticos, fáciles de limpiar y con repuesto.'],
    ['Una coffee station en el nicho de ingreso,', 'para que el huésped tenga todo a mano.'],
    ['Paredes y cielorraso en blanco crudo,', 'una base limpia y luminosa.'],
    ['La raíz neuquina en los detalles,', 'con el telar, la piedra y la madera.']
  ],
  layout: [
    { t: 'Dormitorio', img: 'layout_dormitorio.webp', d: 'Cama con respaldo pared a pared, mesas de luz flotantes, escritorio y mueble TV integrados.' },
    { t: 'Living', img: 'layout_living.png', d: 'Sofá, dos mesas ratonas redondas y lámpara de pie.' }
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
