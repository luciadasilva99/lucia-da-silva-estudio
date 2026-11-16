module.exports = {
  tipo: 'SUITE PRESIDENCIAL',
  layoutTxt: 'Distribución del dormitorio, el living y la cocina.',
  objetivos: [
    ["Diseñar una suite versátil y coherente,", "que acompañe tanto una reunión de trabajo como el descanso del huésped.", 1],
    ["Darle a la suite presidencial una identidad propia,", "cálida y refinada, en línea con Land Hoteles y con raíz neuquina.", 5],
    ["Hacer del living el corazón del espacio,", "con una distribución flexible, buena luz y tecnología integrada.", 4],
    ["Definir materiales y colores de referencia,", "durables y fáciles de mantener, que sostengan el concepto general del proyecto.", 6]
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
