// Proyecto 201: opción completa (A, modelo "201 OPCION A completa") y opción esencial (B, "201 OPCION B esencial").
const AB = (a, b) => ({ t: 'Opción', a: 'Completa', as: 'opción A', opts: [{ img: b, n: 'Esencial', s: 'opción B' }] });
const R = 1.637; // proporción de las vistas

module.exports = {
  tipo: 'SUITE',
  fondo: 'fondo_pana.jpg',

  opciones: [
    { z: 'Opción A', t: 'Completa', img: 'A_dorm.jpg',
      p: 'Renovamos la suite completa: respaldo nuevo, varillado de madera, luz indirecta y mobiliario nuevo en el living.',
      items: [
        'Respaldo alto tapizado en panne verde inglés, con varillado en melamina Sándalo (Faplac).',
        'Gargantas LED de luz cálida en la pared de la cama, en las cortinas y en el pasillo de ingreso.',
        'Rack TV giratorio con varillado en Sándalo, que separa dormitorio y living.',
        'Sofá y sillones individuales nuevos, en tonos neutros.',
        'Escritorio a medida con varillado sobre la pared, en diálogo con el rack.',
        'Blackout en el dormitorio hasta el cielo raso; en el living, voile con textura de gasa en dos paños y persiana exterior de aluminio.'
      ] },
    { z: 'Opción B', t: 'Esencial', img: 'B_dorm.jpg',
      p: 'Conservamos la estructura existente y la renovamos con papel, pintura, tapizados y piezas puntuales.',
      items: [
        'Papel Muresco Riviera Maison 219954, verde salvia claro, en la pared de la cama y el resto de las paredes pintadas en un tono acorde.',
        'Respaldo existente retapizado en verde, apliques de pared blanco y dorado sobre las mesas de luz y pie de cama en panne verde inglés.',
        'Rack TV bajo en Sándalo, a la altura del escritorio, con la placa recortada al contorno del TV.',
        'Sillones existentes retapizados en Tucson Beige.',
        'El mismo escritorio (a medida o Ravello), las mismas cortinas y la persiana.'
      ] }
  ],

  paleta: [
    { n: 60, t: 'Base', p: 'Paredes y cielo raso en tonos cálidos y claros. Es el fondo de toda la suite.',
      sw: [{ img: 'sw_crema.jpg', n: 'Paredes A<br>crema' }, { img: 'sw_pared_b.jpg', n: 'Paredes B<br>tono Riviera' }, { img: 'sw_tiznado.jpg', n: 'Cielo raso<br>blanco tiznado' }, { img: 'tx_riviera.jpg', n: 'Papel Riviera<br>219954 (B)' }] },
    { n: 30, t: 'Maderas y textiles neutros', p: 'Lino Chiaro y Sándalo en los muebles, tapizados Tucson y blackout arena. Dan calidez sin cargar.',
      sw: [{ img: 'm_sandalo.jpg', n: 'Sándalo<br>(Faplac)' }, { img: 'm_lino_chiaro.jpg', n: 'Lino Chiaro<br>(Faplac)' }, { img: 'tx_t5.jpg', n: 'Tucson<br>Beige' }, { img: 'tx_t4.jpg', n: 'Tucson<br>Sand' }, { img: 'sw_blackout.jpg', n: 'Blackout<br>arena' }] },
    { n: 10, t: 'Acentos', p: 'El verde, el lima y el dorado aparecen en pocos lugares: respaldo, cubrecama, almohadones y metales.',
      sw: [{ img: 'tx_t3.jpg', n: 'Panne<br>verde inglés' }, { img: 'tx_t2.jpg', n: 'Panne lima<br>almohadones' }, { img: 'tx_t0.jpg', n: 'Cubrecama<br>jacquard' }, { img: 'sw_dorado.jpg', n: 'Dorado<br>mate' }, { img: 'sw_cobre.jpg', n: 'Cobre<br>(colgantes)' }] }
  ],

  conjunto: {
    cols: ['Dormitorio', 'Escritorio y rack', 'Living', 'Vanity'],
    rows: [
      { o: 'Completa', imgs: ['A_dorm.jpg', 'A_esc.jpg', 'A_liv.jpg', 'A_vanity.jpg'] },
      { o: 'Esencial', imgs: ['B_dorm.jpg', 'B_esc.jpg', 'B_liv.jpg', 'B_vanity.jpg'] }
    ]
  },

  zonas: [
    { zona: 'Dormitorio', img: 'A_dorm.jpg', ar: R, alt: AB('A_dorm.jpg', 'B_dorm.jpg'), zt: 'Qué cambia', st: 'Dormitorio',
      items: ['<b>Completa:</b> respaldo alto en panne verde inglés con varillado Sándalo y gargantas LED cálidas.', '<b>Esencial:</b> papel Riviera Maison 219954 verde salvia claro en la cabecera, paredes en tono acorde, apliques de pared blanco y dorado (Devotion) sobre las mesas de luz y pie de cama en panne verde inglés.', 'En las dos: set de 6 cuadros de Neuquén en blanco y negro en la pared lateral, blackout textil para dormir a oscuras, voile, cielo raso blanco tiznado y spots de luz cálida.'],
      pins: [
        { img: 'c_respaldo_a.jpg', t: 'Completa · Respaldo alto tapizado en panne verde inglés, con faldón' },
        { img: 'm_sandalo.jpg', t: 'Completa · Varillado del respaldo en melamina Sándalo (Faplac)' },
        { img: 'c_led.jpg', t: 'Completa · Gargantas LED de luz cálida: pared de la cama, cortinas y pasillo de ingreso' },
        { img: 'tx_riviera.jpg', t: 'Esencial · Papel Muresco Riviera Maison 219954, verde salvia claro, textura tipo lino, en la pared de la cama' },
        { img: 'sw_pared_b.jpg', t: 'Esencial · Resto de las paredes pintadas en un tono acorde al papel; molduras y cielo raso en blanco tiznado' },
        { img: 'c_mesa_luz.jpg', t: 'Las dos · Mesas de luz Hanoi: base en melamina lisa Sándalo, más cálida que el blanco y sin vetas' },
        { img: 'o_calvin.jpg', t: 'Las dos, opción 2 · Mesa de luz Calvin II (C-Home), 0,70 × 0,45 × h 0,70, laqueada (color a elección) con estructura de metal', url: 'https://www.c-home.com.ar/productos/mesa-de-luz-cattelan-p7w51/' },
        { img: 'c_cuadros.jpg', t: 'Las dos · Set de 6 cuadros de Neuquén en blanco y negro en la pared lateral, alineados con el placard' },
        { img: 'o_devotion.jpg', t: 'Esencial · Apliques de pared Devotion blanco con portalámpara dorado mate, brazo corto de 20 cm y campana de 14 × 16, todo de chapa. A 1,15 m, donde termina el respaldo', url: 'https://www.devotion.com.ar/productos/aplique-de-pared-blanco-detalles-dorados-y-multiples-movimientos-verticales-en-2-sectores/' },
        { img: 'c_aplique_b.jpg', t: 'Esencial · Un aplique a cada lado de la cama, en el mismo punto de luz que en la opción completa' },
        { img: 'c_pie_cama.jpg', t: 'Esencial · Pie de cama en panne verde inglés, 0,50 de ancho, cae a los costados' },
        { img: 'c_respaldo_b.jpg', t: 'Esencial · Respaldo existente: se conserva y se retapiza en verde' },
        { img: 'tx_t0.jpg', t: 'Las dos · Cubrecama jacquard en verde grisáceo' },
        { img: 'c_blackout.jpg', t: 'Las dos · Cortina blackout textil color arena, en riel doble con el voile: de noche no entra luz' }
      ] },

    { zona: 'Escritorio y rack TV', img: 'A_esc.jpg', ar: R, alt: AB('A_esc.jpg', 'B_esc.jpg'), zt: 'Qué cambia', st: 'Escritorio y rack TV',
      items: ['<b>Completa:</b> rack giratorio alto con varillado, que sigue sobre la pared del escritorio.', '<b>Esencial:</b> rack bajo en Sándalo, a la altura del escritorio, con la placa recortada al contorno del TV, y columna de 3 cuadritos junto a los colgantes.', 'En las dos: el mismo escritorio (a medida o Ravello), dos colgantes Milan a distinta altura, dos opciones de silla y el mapa de Neuquén en relieve detrás del TV.'],
      pins: [
        { img: 'o_milan.jpg', t: 'Las dos · Colgantes Milan (Kolor Iluminación), Ø 0,12 × 0,18, negro con detalles cobre. Dos unidades a distinta altura' },
        { img: 'o_colgante.jpg', t: 'Alternativa · Colgante Rain (Indigo Lumières) en dorado, el de la propuesta anterior', url: 'https://indigolumieres.com/productos/rain/' },
        { img: 'o_687.webp', t: 'Las dos · Silla Simet 687, 0,52 × 0,59 × h 0,765, estructura dorada, tapizado Pana Donn antimancha color arena', url: 'https://simet.com.ar/silla687/' },
        { img: 'o_oslo.webp', t: 'Las dos, opción 2 · Silla Oslo (Antequera), 0,48 × 0,48 × h 0,78, lenga lustrada y asiento tapizado', url: 'https://antequeramuebles.com.ar/productos/silla-oslo/' },
        { img: 'c_escritorio_a.jpg', t: 'Las dos · Escritorio a medida: tapa y pata cilindro en melamina lisa Sándalo (Faplac)' },
        { img: 'c_varillado_esc.jpg', t: 'Completa · Varillado Sándalo sobre la pared del escritorio, desde la tapa hacia arriba: continúa el del rack. El cuadro que estaba ahí se reemplaza por el set de 4 de la pared lateral del dormitorio' },
        { img: 'c_cuadros_esc.jpg', t: 'Esencial · Columna de 3 cuadritos de 0,22 × 0,26 en blanco y negro (Lago, Bardas y Villa La Angostura), centrada a la altura de los colgantes para equilibrar la pared' },
        { img: 'o_ravello.jpg', t: 'Las dos, opción estandarizada · Escritorio Ravello (Dellacasa), 1,40 × 0,50 × h 0,75. Viene en petiribí: consultar a Dellacasa un lustre más claro, tipo Sándalo, como en el modelado', url: 'https://dellacasa.com.ar/producto/office/escritorios/escritorio-ravello/' },
        { img: 'c_mapa_neuquen.jpg', t: 'Las dos · Mapa de la provincia de Neuquén en relieve detrás del TV: capas de MDF de 3 mm laqueado crudo, caladas a láser, con los ríos Limay y Neuquén, los lagos y los volcanes grabados' },
        { img: 'c_rack_a.jpg', t: 'Completa · Rack TV giratorio con varillado, marco sobre la viga y laterales en melamina lisa Sándalo' },
        { img: 'c_rack_b.jpg', t: 'Esencial · Rack bajo en melamina lisa Sándalo: a la altura del escritorio, estante a cada lado con división central (por ahí sube el caño del giro) y placa recortada al contorno del TV' }
      ],
      alts: [
      ] },

    { zona: 'Living', img: 'A_liv.jpg', ar: R, alt: AB('A_liv.jpg', 'B_liv.jpg'), zt: 'Qué cambia', st: 'Living',
      items: ['<b>Completa:</b> sofá nuevo con almohadones verdes y lima, y dos sillones Blau, uno a cada lado de la mesa ratona, con paso cómodo por detrás.', '<b>Esencial:</b> sillones existentes retapizados en Tucson Beige.', 'En las dos: mesas ratonas Antequera en dos opciones, cuadros de Neuquén alternando paisaje y mapa, voile con textura de gasa y persiana exterior para oscurecer.'],
      pins: [
        { img: 'o_bold.webp', t: 'Completa · Sofá Bold (Antequera), 1,90 × 0,70 × h 0,82, en Tucson Beige', url: 'https://antequeramuebles.com.ar/productos/sofa-bolt-1o9vi/' },
        { img: 'o_sofa.jpg', t: 'Completa, opción 2 · Sofá Curvey existente, retapizado en Tucson Beige', url: 'https://antequeramuebles.com.ar/productos/2026-sofa-curvey-eplry/' },
        { img: 'o_blau.webp', t: 'Completa · Sillones Blau (Antequera), 0,64 × 0,68 × h 0,85, madera Sándalo y Tucson Sand. Dejan 0,83 m de paso por detrás', url: 'https://antequeramuebles.com.ar/productos/sillon-de-living-blau-7b5ae/' },
        { img: 'o_napoli.jpg', t: 'Completa, opción 2 · Sillones Napoli (Dellacasa), 0,94 × 0,88 × h 0,73, en Tucson Sand. Más envolventes, pero el paso de atrás queda en 0,72 m', url: 'https://dellacasa.com.ar/producto/living/sillones-de-1-cuerpo/sillon-napoli/' },
        { img: 'c_sillones_b.jpg', t: 'Esencial · Sillones existentes de 2 y 1 cuerpo, retapizados en Tucson Beige, almohadones en panne verde y lima' },
        { img: 'o_nina.webp', t: 'Las dos · Mesas ratonas Nina (Antequera), 1,05 × 0,90 en verde Safari y 0,59 × 0,65 en dorado', url: 'https://antequeramuebles.com.ar/productos/mesa-centro-nina-15i0t/' },
        { img: 'o_italian.webp', t: 'Las dos, opción 2 · Mesas Italian (Antequera) en dorado: Ø 0,50 × h 0,50 y Ø 0,40 × h 0,65', url: 'https://antequeramuebles.com.ar/productos/2026-mesa-italian-zf1m6/' },
        { img: 'c_almohadones.jpg', t: 'Completa · Almohadones en panne verde inglés y lima en el sofá, y uno lima en cada sillón' },
        { img: 'c_cuadro_traful.jpg', t: 'Completa · Cuadro horizontal sobre el sofá: Lago Traful en blanco y negro, una imagen de agua que transmite calma' },
        { img: 'c_cuadros_living_b.jpg', t: 'Esencial · Dos cuadros: mapa del Lago Nahuel Huapi con Villa La Angostura y, al lado, el muelle del lago en blanco y negro' },
        { img: 'c_cortina_gasa.jpg', t: 'Las dos · Voile Trevira CS con textura de gasa de lino, en dos paños que abren desde el centro: liviano, lavable e ignífugo (apto hotel). Deja ver el balcón' },
        { img: 'c_persiana.jpg', t: 'Las dos · Persiana exterior de aluminio en ventana y balcón, para oscurecer del todo (a confirmar con el consorcio)' }
      ],
      alts: [
        { zona: 'Living', h: 'Otra vista', s: 'Living hacia el balcón', img: 'A_liv2.jpg', ar: R, alt: AB('A_liv2.jpg', 'B_liv2.jpg'), zt: 'Vista', st: 'Hacia el balcón',
          items: ['La lámpara de pie y la luz natural del balcón iluminan el sector de estar.', 'Mesas ratonas en el centro, con paso libre hacia el balcón.'] }
      ] },

    { zona: 'Vanity, antebaño y coffee', img: 'A_vanity.jpg', ar: R, alt: AB('A_vanity.jpg', 'B_vanity.jpg'), zt: 'Qué cambia', st: 'Vanity y antebaño',
      items: ['En las dos: vinilo con marco dorado finito en los espejos del vanity y del antebaño.', 'Banqueta a medida de 0,70 o puff Iron (Dellacasa), los dos entran en el nicho del vanity (0,85).', 'Coffee station en melamina Lino Chiaro (Faplac).'],
      pins: [
        { img: 'o_vinilo.jpg', t: 'Las dos · Vinilo marco dorado de 12 mm sobre los espejos del vanity y del antebaño' },
        { img: 'c_banqueta.jpg', t: 'Las dos · Banqueta a medida de 0,70 de ancho, tapizada (Tucson Sand en A, Tucson Beige en B). Entra en el nicho del vanity, que mide 0,85' },
        { img: 'o_puff_iron.jpg', t: 'Las dos, opción estandarizada · Puff Iron (Dellacasa), Ø 0,45 × h 0,44, patas de hierro negro', url: 'https://dellacasa.com.ar/producto/living/puff/puff-iron/' },
        { img: 'c_apliques.jpg', t: 'Las dos · Apliques verticales tubo opal con base dorada, Ø 0,06 × 0,21, luz cálida' },
        { img: 'c_coffee.jpg', t: 'Las dos · Coffee station completa en melamina Lino Chiaro (Faplac), con spot de luz cálida' }
      ],
      alts: [
        { zona: 'Vanity, antebaño y coffee', h: 'Otra vista', s: 'Antebaño', img: 'A_antebano.jpg', ar: R, alt: AB('A_antebano.jpg', 'B_antebano.jpg'), zt: 'Vista', st: 'Antebaño',
          items: ['Espejo con tira LED cálida y vinilo con marco dorado finito.', 'En la opción esencial, las paredes del antebaño van pintadas como el resto de la suite.'] },
        { zona: 'Vanity, antebaño y coffee', h: 'Otra vista', s: 'Coffee station', img: 'A_coffee.jpg', ar: R, alt: AB('A_coffee.jpg', 'B_coffee.jpg'), zt: 'Vista', st: 'Coffee station',
          items: ['Nicho de ingreso completo en melamina Lino Chiaro (Faplac).', 'Cafetera y microondas en los estantes, frigobar debajo.'] }
      ] }
  ],

  // variantes dentro de cada opción (botones sobre la imagen)
  variantes: {
    'Dormitorio': {
      A: { t: 'Ver', a: 'Mesas Hanoi', as: 'Sándalo', opts: [{ img: 'A_dorm_calvin.jpg', n: 'Calvin II', s: 'C-Home' }] },
      B: { t: 'Ver', a: 'Mesas Hanoi', as: 'Sándalo', opts: [{ img: 'B_dorm_calvin.jpg', n: 'Calvin II', s: 'C-Home' }] } },
    'Escritorio y rack TV': {
      A: { t: 'Ver', a: 'Silla 687', as: 'a medida', opts: [{ img: 'A_esc_oslo.jpg', n: 'Silla Oslo', s: 'variante' }, { img: 'A_esc_ravello.jpg', n: 'Ravello', s: 'escritorio' }] },
      B: { t: 'Ver', a: 'Silla 687', as: 'a medida', opts: [{ img: 'B_esc_oslo.jpg', n: 'Silla Oslo', s: 'variante' }, { img: 'B_esc_ravello.jpg', n: 'Ravello', s: 'escritorio' }] } },
    'Living': {
      A: { t: 'Ver', a: 'Bold + Blau', as: 'mesas Nina', opts: [{ img: 'A_liv_curvey.jpg', n: 'Sofá Curvey', s: 'variante' }, { img: 'A_liv_napoli.jpg', n: 'Sillones Napoli', s: 'variante' }, { img: 'A_liv_italian.jpg', n: 'Mesas Italian', s: 'variante' }] },
      B: { t: 'Ver', a: 'Mesas Nina', as: 'Safari y dorado', opts: [{ img: 'B_liv_italian.jpg', n: 'Mesas Italian', s: 'variante' }] } },
    'Vanity, antebaño y coffee': {
      A: { t: 'Ver', a: 'A medida', as: 'banqueta', opts: [{ img: 'A_vanity_iron.jpg', n: 'Puff Iron', s: 'Dellacasa' }] },
      B: { t: 'Ver', a: 'A medida', as: 'banqueta', opts: [{ img: 'B_vanity_iron.jpg', n: 'Puff Iron', s: 'Dellacasa' }] } }
  },

  plantas: { zona: 'Plantas', h: 'Plantas de interiorismo', s: 'Completa y esencial, antes de recorrer los modelados', img: 'A_planta.jpg', ar: 1.415, alt: AB('A_planta.jpg', 'B_planta.jpg'), zt: 'Medidas', st: 'Planta de interiorismo',
    items: ['Plantas en AutoCAD, con cotas generales en metros. Cada mueble estandarizado está dibujado con las medidas reales de la marca.', '<b>Paleta 60 · 30 · 10:</b> 60 % base clara (paredes y cielo raso), 30 % maderas y textiles neutros (Sándalo, Lino Chiaro, Tucson), 10 % acentos (verde, lima, dorado y negro).', 'La misma regla vale para todas las variantes de cada opción.'] },

  pasos: [
    ['Elegir opción<br>y alternativas', 'Definimos esencial o completa, y en cada zona la alternativa de sofá, sillones, mesas, silla, escritorio y banqueta.'],
    ['Renders<br>fotorrealistas', 'Con la elección hecha, emitimos los renders de las vistas principales.'],
    ['Presupuestos<br>y compras', 'Pedimos precios de lo estandarizado y de lo que se hace a medida, incluido el vinilo de los espejos.'],
    ['Ejecución<br>en obra', 'Coordinamos los gremios y supervisamos cada etapa hasta entregar la suite terminada.']
  ]
};
