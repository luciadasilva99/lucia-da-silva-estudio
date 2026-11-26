// Proyecto 201: opción elaborada (A, modelo "201 OPCION A completa") y opción simple (B, "201 OPCION B simple").
const AB = (a, b) => ({ t: 'Opción', a: 'Elaborada', as: 'opción A', opts: [{ img: b, n: 'Simple', s: 'opción B' }] });
const R = 1.637; // proporción de las vistas

module.exports = {
  tipo: 'SUITE',
  fondo: 'A_dorm.jpg',

  opciones: [
    { z: 'Opción A', t: 'Elaborada', img: 'A_dorm.jpg',
      p: 'Renovamos la suite completa: respaldo nuevo, varillado de madera, luz indirecta y mobiliario nuevo en el living.',
      items: [
        'Respaldo alto tapizado en panne verde inglés, con varillado en melamina Sándalo (Faplac).',
        'Gargantas LED de luz cálida en la pared de la cama, en las cortinas y en el pasillo de ingreso.',
        'Rack TV giratorio con varillado, que separa dormitorio y living.',
        'Sofá y sillones individuales nuevos, en tonos neutros.',
        'Escritorio a medida, con opción de modelo estandarizado.'
      ] },
    { z: 'Opción B', t: 'Simple', img: 'B_dorm.jpg',
      p: 'Conservamos la estructura existente y la renovamos con papel, pintura, tapizados y piezas puntuales.',
      items: [
        'Papel Muresco Room 78615 en la pared de la cama y el resto de las paredes pintadas en un tono acorde.',
        'Cielo raso en blanco tiznado y trío de cuadros de Neuquén sobre el respaldo existente.',
        'Rack TV existente, con la base a la altura del escritorio y la placa recortada al contorno del TV.',
        'Sillones existentes retapizados en Tucson Beige.',
        'Escritorio existente.'
      ] }
  ],

  paleta: [
    { n: 60, t: 'Base', p: 'Paredes y cielo raso en tonos cálidos y claros. Es el fondo de toda la suite.',
      sw: [{ img: 'sw_crema.jpg', n: 'Paredes A<br>crema' }, { img: 'sw_pared_b.jpg', n: 'Paredes B<br>tono Room' }, { img: 'sw_tiznado.jpg', n: 'Cielo raso<br>blanco tiznado' }, { img: 'tx_r78615.jpg', n: 'Papel Room<br>78615 (B)' }] },
    { n: 30, t: 'Maderas y textiles neutros', p: 'Madera Sándalo, piso existente y tapizados Tucson. Dan calidez sin cargar.',
      sw: [{ img: 'm_sandalo.jpg', n: 'Sándalo<br>(Faplac)' }, { img: 'm_lino_chiaro.jpg', n: 'Lino Chiaro<br>(Faplac)' }, { img: 'tx_t5.jpg', n: 'Tucson<br>Beige' }, { img: 'tx_t4.jpg', n: 'Tucson<br>Sand' }] },
    { n: 10, t: 'Acentos', p: 'El verde y el dorado aparecen en pocos lugares: respaldo, cubrecama, almohadones y metales.',
      sw: [{ img: 'tx_t3.jpg', n: 'Panne<br>verde inglés' }, { img: 'tx_t0.jpg', n: 'Cubrecama<br>jacquard' }, { img: 'sw_dorado.jpg', n: 'Dorado<br>mate' }, { img: 'sw_cobre.jpg', n: 'Cobre<br>(colgantes)' }] }
  ],

  conjunto: [
    { img: 'A_aerea.jpg', o: 'Elaborada', t: 'Vista aérea', big: true },
    { img: 'B_aerea.jpg', o: 'Simple', t: 'Vista aérea', big: true },
    { img: 'A_dorm.jpg', o: 'Elaborada', t: 'Dormitorio' },
    { img: 'B_dorm.jpg', o: 'Simple', t: 'Dormitorio' },
    { img: 'A_esc.jpg', o: 'Elaborada', t: 'Escritorio y rack' },
    { img: 'B_esc.jpg', o: 'Simple', t: 'Escritorio y rack' },
    { img: 'A_ingreso.jpg', o: 'Elaborada', t: 'Desde el ingreso' },
    { img: 'B_ingreso.jpg', o: 'Simple', t: 'Desde el ingreso' },
    { img: 'A_liv3.jpg', o: 'Elaborada', t: 'Living hacia el rack' },
    { img: 'B_liv3.jpg', o: 'Simple', t: 'Living hacia el rack' },
    { img: 'A_vanity.jpg', o: 'Elaborada', t: 'Vanity' },
    { img: 'B_antebano.jpg', o: 'Simple', t: 'Antebaño' },
    { img: 'A_coffee.jpg', o: 'Elaborada', t: 'Coffee station' },
    { img: 'B_coffee.jpg', o: 'Simple', t: 'Coffee station' }
  ],

  zonas: [
    { zona: 'Dormitorio', img: 'A_dorm.jpg', ar: R, alt: AB('A_dorm.jpg', 'B_dorm.jpg'), zt: 'Qué cambia', st: 'Dormitorio',
      items: ['<b>Elaborada:</b> respaldo alto en panne verde inglés con varillado Sándalo y gargantas LED cálidas.', '<b>Simple:</b> papel Room 78615 en la cabecera, paredes en tono acorde y trío de cuadros de Neuquén.', 'En las dos: cielo raso blanco tiznado, spots de luz cálida y cortinas de piso a techo.'],
      pins: [
        { img: 'c_respaldo_a.jpg', t: 'Elaborada · Respaldo alto tapizado en panne verde inglés, con faldón' },
        { img: 'm_sandalo.jpg', t: 'Elaborada · Varillado del respaldo en melamina Sándalo (Faplac)' },
        { img: 'c_led.jpg', t: 'Elaborada · Gargantas LED de luz cálida: pared de la cama, cortinas y pasillo de ingreso' },
        { img: 'tx_r78615.jpg', t: 'Simple · Papel Muresco Room 78615 en la pared de la cama', url: 'https://muresco.com/producto/room-78615/' },
        { img: 'sw_pared_b.jpg', t: 'Simple · Resto de las paredes pintadas en tono acorde al papel (no blanco). Todo lo que es pared va pintado; molduras y cielo raso en blanco tiznado' },
        { img: 'c_cuadros.jpg', t: 'Simple · Trío de cuadros de Neuquén: Bardas, Río Limay y Villa La Angostura, con passepartout y marco blancos' },
        { img: 'c_respaldo_b.jpg', t: 'Simple · Respaldo de cuero existente, se conserva' },
        { img: 'tx_t0.jpg', t: 'Las dos · Cubrecama jacquard en verde grisáceo' },
        { img: 'o_cortinas.jpg', t: 'Las dos · Cortinas de piso a techo: blackout más gasa' }
      ] },

    { zona: 'Escritorio y rack TV', img: 'A_esc.jpg', ar: R, alt: AB('A_esc.jpg', 'B_esc.jpg'), zt: 'Qué cambia', st: 'Escritorio y rack TV',
      items: ['<b>Elaborada:</b> escritorio a medida y rack giratorio con varillado.', '<b>Simple:</b> escritorio existente; rack con la base a la altura del escritorio y la placa recortada al contorno del TV.', 'En las dos: dos colgantes Milan a distinta altura y dos opciones de silla.'],
      pins: [
        { img: 'o_milan.jpg', t: 'Las dos · Colgantes Milan (Kolor Iluminación), Ø 0,12 × 0,18, negro con detalles cobre. Dos unidades a distinta altura' },
        { img: 'o_colgante.jpg', t: 'Alternativa · Colgante Rain (Indigo Lumières) en dorado, el de la propuesta anterior', url: 'https://indigolumieres.com/productos/rain/' },
        { img: 'o_687.webp', t: 'Las dos · Silla Simet 687, 0,52 × 0,59 × h 0,765, estructura dorada, tapizado Pana Donn antimancha color arena', url: 'https://simet.com.ar/silla687/' },
        { img: 'o_oslo.webp', t: 'Las dos, opción 2 · Silla Oslo (Antequera), 0,48 × 0,48 × h 0,78, lenga lustrada y asiento tapizado', url: 'https://antequeramuebles.com.ar/productos/silla-oslo/' },
        { img: 'c_escritorio_a.jpg', t: 'Elaborada · Escritorio a medida' },
        { img: 'o_ravello.jpg', t: 'Elaborada, opción estandarizada · Escritorio Ravello (Dellacasa), 1,40 × 0,50 × h 0,75, petiribí', url: 'https://dellacasa.com.ar/producto/office/escritorios/escritorio-ravello/' },
        { img: 'c_rack_a.jpg', t: 'Elaborada · Rack TV giratorio con varillado, entre dormitorio y living' },
        { img: 'c_rack_b.jpg', t: 'Simple · Rack existente: base a la altura del escritorio, estante a cada lado con división central (por ahí sube el caño del giro) y placa recortada al contorno del TV' }
      ],
      alts: [
        { zona: 'Escritorio y rack TV', h: 'Alternativas', s: 'Opción elaborada · silla y escritorio', img: 'A_esc.jpg', ar: R, zt: 'Para elegir', st: 'Silla y escritorio',
          alt: { t: 'Ver', a: 'Simet 687', as: 'a medida', opts: [{ img: 'A_esc_oslo.jpg', n: 'Silla Oslo', s: 'opción' }, { img: 'A_esc_ravello.jpg', n: 'Ravello', s: 'escritorio' }] },
          items: ['Silla Simet 687 o silla Oslo: las dos sirven para las dos opciones.', 'Escritorio a medida o escritorio Ravello (Dellacasa): mismo lugar, misma medida.', 'Las medidas de cada mueble son las reales de cada marca.'] }
      ] },

    { zona: 'Living', img: 'A_liv.jpg', ar: R, alt: AB('A_liv.jpg', 'B_liv.jpg'), zt: 'Qué cambia', st: 'Living',
      items: ['<b>Elaborada:</b> sofá nuevo y dos sillones individuales, uno a cada lado de la mesa ratona.', '<b>Simple:</b> sillones existentes retapizados en Tucson Beige.', 'En las dos: mesas ratonas Antequera en dos opciones y lámpara de pie existente.'],
      pins: [
        { img: 'o_bold.webp', t: 'Elaborada · Sofá Bold (Antequera), 1,90 × 0,70 × h 0,82, en Tucson Beige', url: 'https://antequeramuebles.com.ar/productos/sofa-bolt-1o9vi/' },
        { img: 'o_sofa.jpg', t: 'Elaborada, opción 2 · Sofá Curvey existente, retapizado en Tucson Beige', url: 'https://antequeramuebles.com.ar/productos/2026-sofa-curvey-eplry/' },
        { img: 'o_napoli.jpg', t: 'Elaborada · Sillones Napoli (Dellacasa), 0,94 × 0,88 × h 0,73, en Tucson Sand', url: 'https://dellacasa.com.ar/producto/living/sillones-de-1-cuerpo/sillon-napoli/' },
        { img: 'o_blau.webp', t: 'Elaborada, opción 2 · Sillones Blau (Antequera), 0,64 × 0,68 × h 0,85, madera Sándalo y Tucson Sand', url: 'https://antequeramuebles.com.ar/productos/sillon-de-living-blau-7b5ae/' },
        { img: 'c_sillones_b.jpg', t: 'Simple · Sillones existentes de 2 y 1 cuerpo, retapizados en Tucson Beige, almohadones en panne verde y lima' },
        { img: 'o_nina.webp', t: 'Las dos · Mesas ratonas Nina (Antequera) en Sándalo: 1,05 × 0,90 × h 0,40 y 0,59 × 0,65 × h 0,46', url: 'https://antequeramuebles.com.ar/productos/mesa-centro-nina-15i0t/' },
        { img: 'o_italian.webp', t: 'Las dos, opción 2 · Mesas Italian (Antequera) en dorado: Ø 0,50 × h 0,50 y Ø 0,40 × h 0,65', url: 'https://antequeramuebles.com.ar/productos/2026-mesa-italian-zf1m6/' },
        { img: 'o_lampara_pie.jpg', t: 'Las dos · Lámpara de pie de arco existente, luz cálida' }
      ],
      alts: [
        { zona: 'Living', h: 'Alternativas', s: 'Opción elaborada · sofá, sillones y mesas', img: 'A_liv.jpg', ar: R, zt: 'Para elegir', st: 'Sofá, sillones y mesas',
          alt: { t: 'Ver', a: 'Bold + Napoli', as: 'Nina', opts: [{ img: 'A_liv_curvey.jpg', n: 'Sofá Curvey', s: 'opción' }, { img: 'A_liv_blau.jpg', n: 'Sillones Blau', s: 'opción' }, { img: 'A_liv_italian.jpg', n: 'Mesas Italian', s: 'opción' }] },
          items: ['Sofá Bold (nuevo) o Curvey (existente retapizado).', 'Sillones Napoli, envolventes, o Blau, más compactos y con marco de madera. Los dos entran con la mesa ratona en el medio.', 'Mesas Nina en Sándalo o Italian en dorado.'] },
        { zona: 'Living', h: 'Otra vista', s: 'Living hacia el balcón', img: 'A_liv2.jpg', ar: R, alt: AB('A_liv2.jpg', 'B_liv2.jpg'), zt: 'Vista', st: 'Hacia el balcón',
          items: ['La lámpara de pie y la luz natural del balcón iluminan el sector de estar.', 'Mesas ratonas en el centro, con paso libre hacia el balcón.'] }
      ] },

    { zona: 'Vanity, antebaño y coffee', img: 'A_vanity.jpg', ar: R, alt: AB('A_vanity.jpg', 'B_vanity.jpg'), zt: 'Qué cambia', st: 'Vanity y antebaño',
      items: ['En las dos: vinilo con marco dorado finito en los espejos del vanity y del antebaño.', 'Banqueta a medida o banqueta Iron (Dellacasa).', 'Coffee station en melamina Lino Chiaro (Faplac).'],
      pins: [
        { img: 'o_vinilo.jpg', t: 'Las dos · Vinilo marco dorado de 12 mm sobre los espejos del vanity y del antebaño' },
        { img: 'c_banqueta.jpg', t: 'Las dos · Banqueta a medida, tapizada (Tucson Sand en A, Tucson Beige en B)' },
        { img: 'o_iron.jpg', t: 'Las dos, opción estandarizada · Banqueta Iron (Dellacasa), 1,10 × 0,44 × h 0,46, patas de hierro', url: 'https://dellacasa.com.ar/producto/dormitorio/pie-de-cama/banqueta-iron/' },
        { img: 'c_apliques.jpg', t: 'Las dos · Apliques dorados con globo opal, luz cálida' },
        { img: 'c_coffee.jpg', t: 'Las dos · Coffee station completa en melamina Lino Chiaro (Faplac), con spot de luz cálida' }
      ],
      alts: [
        { zona: 'Vanity, antebaño y coffee', h: 'Alternativas', s: 'Banqueta del vanity', img: 'A_vanity.jpg', ar: R, zt: 'Para elegir', st: 'Banqueta',
          alt: { t: 'Ver', a: 'A medida', as: 'banqueta', opts: [{ img: 'A_vanity_iron.jpg', n: 'Iron', s: 'Dellacasa' }] },
          items: ['Banqueta a medida, tapizada, o banqueta Iron de Dellacasa, ya fabricada.', 'Las dos entran debajo de la mesada del vanity.'] },
        { zona: 'Vanity, antebaño y coffee', h: 'Otra vista', s: 'Antebaño', img: 'A_antebano.jpg', ar: R, alt: AB('A_antebano.jpg', 'B_antebano.jpg'), zt: 'Vista', st: 'Antebaño',
          items: ['Espejo con tira LED cálida y vinilo con marco dorado finito.', 'En la opción simple, las paredes del antebaño van pintadas como el resto de la suite.'] },
        { zona: 'Vanity, antebaño y coffee', h: 'Otra vista', s: 'Coffee station', img: 'A_coffee.jpg', ar: R, alt: AB('A_coffee.jpg', 'B_coffee.jpg'), zt: 'Vista', st: 'Coffee station',
          items: ['Nicho de ingreso completo en melamina Lino Chiaro (Faplac).', 'Cafetera y microondas en los estantes, frigobar debajo.'] }
      ] }
  ],

  plantas: { zona: 'Plantas', h: 'Plantas con medidas', s: 'Mobiliario con medidas reales', img: 'A_planta.jpg', ar: 1.467, alt: AB('A_planta.jpg', 'B_planta.jpg'), zt: 'Medidas', st: 'Planta de mobiliario',
    items: ['Cada mueble estandarizado está modelado con las medidas reales de la marca.', 'Las cotas muestran ancho y fondo; el texto indica la altura.', 'Los sillones individuales y las mesas entran con paso libre hacia el balcón y el ingreso.'] },

  pasos: [
    ['Elegir opción<br>y alternativas', 'Definimos simple o elaborada, y en cada zona la alternativa de sofá, sillones, mesas, silla, escritorio y banqueta.'],
    ['Renders<br>fotorrealistas', 'Con la elección hecha, emitimos los renders de las vistas principales.'],
    ['Presupuestos<br>y compras', 'Pedimos precios de lo estandarizado y de lo que se hace a medida, incluido el vinilo de los espejos.'],
    ['Ejecución<br>en obra', 'Coordinamos los gremios y supervisamos cada etapa hasta entregar la suite terminada.']
  ]
};
