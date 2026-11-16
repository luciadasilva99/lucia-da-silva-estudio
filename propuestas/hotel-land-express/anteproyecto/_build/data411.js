module.exports = {
  tipo: 'SUITE PRESIDENCIAL',
  layoutTxt: 'Distribución del dormitorio, el living y la cocina.',
  objetivos: [
    ['Muebles TV abiertos,', 'con huecos y sin puertas, pensados para pantallas grandes.'],
    ['Un living versátil,', 'protagonista de la suite, para reunirse o descansar.'],
    ['Más luz y siempre cálida,', 'con artefactos prácticos, fáciles de limpiar y con repuesto.'],
    ['Una cocina práctica,', 'ordenada y en línea con el resto de la suite.'],
    ['Tecnología integrada,', 'sin cables a la vista.'],
    ['Arte con raíz neuquina,', 'con paisajes o mapas de la provincia.']
  ],
  layout: [
    { t: 'Dormitorio', d: 'En desarrollo.' },
    { t: 'Living y cocina', d: 'En desarrollo.' }
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
