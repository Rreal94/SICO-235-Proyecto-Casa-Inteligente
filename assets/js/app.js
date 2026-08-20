/**
 * SICO-235: SISTEMA INTEGRAL DE CONTROL DE OBRA & FINANZAS
 * Residencia Inteligente en 3 Niveles (153.19 m² Terreno | 235.0 m² Construcción)
 * Control Progresivo en 4 Fases con Habitabilidad Inmediata en Mes 6
 */

// ==========================================================================
// 1. ESTADO GLOBAL & CONFIGURACIÓN FINANCIERA
// ==========================================================================
let currentCurrency = 'MXN';
const exchangeRate = 20.0; // 1 USD = 20.00 MXN
let currentWbsPhase = 1;
let currentPuFilter = 'all';
let currentPuSearch = '';
let currentFloor = 'pb';

const phasesData = {
  1: {
    name: 'Casa Núcleo Habitable',
    badge: 'FASE 1 • PRIORIDAD ALTA',
    time: 'Meses 1 a 6',
    totalMXN: 1980000,
    anticipoPct: 0.30,
    desc: 'Estructura completa en 3 niveles techada e impermeable, cisterna 5kL, MEP oculto, Suite PB lista y cocina/baño funcional. ¡MUDANZA Y CERO RENTA!'
  },
  2: {
    name: 'Confort Planta Alta',
    badge: 'FASE 2 • AÑO 1',
    time: 'Meses 7 a 12',
    totalMXN: 580000,
    anticipoPct: 0.30,
    desc: 'Baño Master spa con canceles templados, cocina integral de diseño con isla de cuarzo, vestidor Master y clósets empotrados.'
  },
  3: {
    name: 'Roof Garden Frontal',
    badge: 'FASE 3 • AÑO 2',
    time: 'Meses 13 a 18',
    totalMXN: 420000,
    anticipoPct: 0.30,
    desc: 'Piso deck exterior (45 m²), pérgola bioclimática, grill con tarja/barra, 1/2 baño de azotea, lounge firepit y barandal de cristal.'
  },
  4: {
    name: 'Solar, Climas & Domótica',
    badge: 'FASE 4 • AÑO 3',
    time: 'Meses 19 a 24',
    totalMXN: 362000,
    anticipoPct: 0.30,
    desc: '6 paneles solares 3.3 kWp (0 CFE), calentador solar 200L (0 gas), 3 climas A/C inverter, Rack 12U, CCTV 4K e iluminación circadiana.'
  }
};

function formatMoney(amountMXN, currency = currentCurrency) {
  if (currency === 'USD') {
    const usd = amountMXN / exchangeRate;
    return '$' + Math.round(usd).toLocaleString('en-US') + ' USD';
  } else {
    return '$' + Math.round(amountMXN).toLocaleString('es-MX') + ' MXN';
  }
}

function formatMoneyExact(amountMXN, currency = currentCurrency) {
  if (currency === 'USD') {
    const usd = amountMXN / exchangeRate;
    return '$' + usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' USD';
  } else {
    return '$' + amountMXN.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' MXN';
  }
}

// ==========================================================================
// 2. HITOS DE LIBERACIÓN & CRONOGRAMA MAESTRO (MILESTONES)
// ==========================================================================
const milestonesData = [
  {
    id: 'm1',
    num: 'Hito 1',
    name: 'Trazo Topográfico & Mecánica de Suelos',
    phase: 'Fase 1',
    time: 'Semana 2',
    desc: 'Validación de linderos exactos (153.19 m²), banco de nivel fijado y dictamen geotécnico favorable (q_adm ≥ 1.5 kg/cm²).',
    status: 'completed'
  },
  {
    id: 'm2',
    num: 'Hito 2',
    name: 'Cisterna 5,000 L & Cimentación Colada',
    phase: 'Fase 1',
    time: 'Semana 9',
    desc: 'Prueba de estanqueidad de cisterna 48h sin fugas, acero Grado 42 verificado y concreto f\'c=250 kg/cm² colado.',
    status: 'in_progress'
  },
  {
    id: 'm3',
    num: 'Hito 3',
    name: 'Estructura Techada & Losa de Azotea (+6.00m)',
    phase: 'Fase 1',
    time: 'Semana 19',
    desc: 'Muros de carga a plomo, vigueta/bovedilla colocada, caseta de escalera y losa estructural de azotea colada.',
    status: 'pending'
  },
  {
    id: 'm4',
    num: 'Hito 4',
    name: 'Prueba Hidrostática MEP a 10 Bar (24h)',
    phase: 'Fase 1',
    time: 'Semana 21',
    desc: 'Cero caída de manómetro en redes PPR de agua fría/caliente antes de autorizar aplanados interiores.',
    status: 'pending'
  },
  {
    id: 'm5',
    num: 'Hito 5 (Crítico)',
    name: '🔑 Mudanza Inmediata & Cero Gasto de Renta',
    phase: 'Fase 1',
    time: 'Semana 24 (Mes 6)',
    desc: 'Suite PB terminada, baño completo funcional, agua presurizada, luz y gas activos. ¡Entrega de llaves!',
    status: 'pending'
  },
  {
    id: 'm6',
    num: 'Hito 6',
    name: 'Cocina Integral de Cuarzo & Baño Spa PA',
    phase: 'Fase 2',
    time: 'Mes 12',
    desc: 'Isla de cuarzo calacatta, canceles templados 9.5mm, regaderas spa y clósets terminados en Planta Alta.',
    status: 'pending'
  },
  {
    id: 'm7',
    num: 'Hito 7',
    name: 'Inauguración Roof Garden con Pérgola & Grill',
    phase: 'Fase 3',
    time: 'Mes 18',
    desc: 'Piso deck exterior de 45 m², asador inox con tarja/barra, 1/2 baño de azotea y barandal de cristal templado.',
    status: 'pending'
  },
  {
    id: 'm8',
    num: 'Hito 8',
    name: 'Ecosistema Solar 3.3 kWp & Domótica Pro',
    phase: 'Fase 4',
    time: 'Mes 24',
    desc: '0 CFE con 6 paneles solares, 0 gas con calentador solar, Rack 12U y servidor local Home Assistant operativo.',
    status: 'pending'
  }
];

// ==========================================================================
// 3. ESTRUCTURA DE DESGLOSE DE TRABAJO (EDT / WBS)
// ==========================================================================
const wbsData = {
  1: [
    {
      id: 'stg-1-1',
      stageNum: '1.1',
      title: 'Trámites, Licencias & Estudios Preliminares',
      costMXN: 171000,
      duration: '4 Semanas (S1 - S4)',
      contractor: 'DRO / Perito Supervisor & Topógrafo',
      substages: [
        {
          id: 'sub-1-1-1',
          code: '1.1.1',
          title: 'Gestoría Municipal, Licencia de Construcción & Alineamiento',
          costMXN: 145000,
          duration: '3 Semanas',
          contractor: 'Gestor DRO',
          acceptance: 'Licencia oficial expedida con número de folio y sello municipal.',
          material: 'Planos ejecutivos firmados por DRO y peritos.',
          risk: 'Retrasos en ventanilla única municipal; tramitar con anticipación.'
        },
        {
          id: 'sub-1-1-2',
          code: '1.1.2',
          title: 'Estudio de Mecánica de Suelos (3 Sondeos a 4.00m)',
          costMXN: 26000,
          duration: '1 Semana',
          contractor: 'Laboratorio Geotécnico',
          acceptance: 'Dictamen de capacidad admisible q_adm ≥ 1.5 kg/cm² y nivel freático.',
          material: 'Muestras inalteradas y reporte de laboratorio.',
          risk: 'Encontrar terreno blando no cohesivo que requiera mejoramiento con pedraplén.'
        },
        {
          id: 'sub-1-1-3',
          code: '1.1.3',
          title: 'Trazo Topográfico de Precisión con Estación Total',
          costMXN: 0,
          duration: '3 Días',
          contractor: 'Topógrafo Certificado',
          acceptance: 'Colocación de mojoneras en los 4 vértices del polígono (153.19 m²) y banco de nivel +0.00m.',
          material: 'Estacas de madera, varillas de referencia y crucetas.',
          risk: 'Invadir servidumbre frontal de arriate (60cm) o banqueta (90cm).'
        }
      ]
    },
    {
      id: 'stg-1-2',
      stageNum: '1.2',
      title: 'Cimentación, Cisterna Subterránea & Terracerías',
      costMXN: 449000,
      duration: '5 Semanas (S5 - S9)',
      contractor: 'Maestro Albañil / Cuadrilla de Obra Negra',
      substages: [
        {
          id: 'sub-1-2-1',
          code: '1.2.1',
          title: 'Limpieza, Excavación Masiva a 1.20m & Rellenos Compactados',
          costMXN: 55000,
          duration: '1.5 Semanas',
          contractor: 'Cuadrilla de Excavación',
          acceptance: 'Fondo de zanja nivelado y compactado al 95% Proctor.',
          material: 'Plantilla de concreto pobre f\'c=100 kg/cm² de 5 cm de espesor.',
          risk: 'Deslaves por lluvias; colocar plantilla el mismo día de la excavación.'
        },
        {
          id: 'sub-1-2-2',
          code: '1.2.2',
          title: 'Construcción de Cisterna 5,000 L en Concreto Hidrófugo',
          costMXN: 68000,
          duration: '2 Semanas',
          contractor: 'Maestro Albañil & Fierrero',
          acceptance: 'Prueba de llenado de 48 horas continuas sin filtración ni caída de nivel.',
          material: 'Concreto f\'c=250 con aditivo Festex Integral / Sika 1 y banda ojillada de PVC.',
          risk: 'Nidos de grava en juntas frías losa-muro; usar vibrador de inmersión.'
        },
        {
          id: 'sub-1-2-3',
          code: '1.2.3',
          title: 'Armado de Zapatas Corridas, Contratrabes & Fumigación Antitermitas',
          costMXN: 160000,
          duration: '1.5 Semanas',
          contractor: 'Fierrero & Aplicador Certificado',
          acceptance: 'Varilla corrugada Grado 42 con recubrimiento libre de 3 cm sobre calzas de concreto.',
          material: 'Varilla 3/8", 1/2" y barrera química antitermitas (Termidor Duo).',
          risk: 'Varilla en contacto con tierra húmeda que propicie corrosión acelerada.'
        },
        {
          id: 'sub-1-2-4',
          code: '1.2.4',
          title: 'Colado de Cimentación con Concreto Premezclado f\'c=250 kg/cm²',
          costMXN: 166000,
          duration: '1 Semana',
          contractor: 'Planta Concretera & Cuadrilla',
          acceptance: 'Toma de cilindros de prueba a 7, 14 y 28 días (Norma NMX-C-083). Revenimiento 14±3.5cm.',
          material: 'Concreto premezclado f\'c=250 kg/cm² con bombeo.',
          risk: 'Agregar agua no autorizada en camión revolvedora que reduzca la resistencia.'
        }
      ]
    },
    {
      id: 'stg-1-3',
      stageNum: '1.3',
      title: 'Muros de Carga, Columnas & Losa Entrepiso PB-PA',
      costMXN: 570000,
      duration: '6 Semanas (S10 - S15)',
      contractor: 'Maestro Albañil / Cuadrilla de Obra Negra',
      substages: [
        {
          id: 'sub-1-3-1',
          code: '1.3.1',
          title: 'Levantamiento de Muros Confinados & Castillos Colados',
          costMXN: 200000,
          duration: '3 Semanas',
          contractor: 'Oficiales Albañiles',
          acceptance: 'Desplome menor a 3 mm por cada 3 m de altura. Juntas de mortero 1:4 uniformes (1.2 cm).',
          material: 'Block térmico / tabique rojo recocido, castillos K-1, K-2 y mochetas.',
          risk: 'Castillos sin amarre de estribos en nodos críticos; supervisión estricta.'
        },
        {
          id: 'sub-1-3-2',
          code: '1.3.2',
          title: 'Cimbrado y Montaje de Vigueta Pretensada y Bovedilla Poliestireno',
          costMXN: 140000,
          duration: '1.5 Semanas',
          contractor: 'Cuadrilla Cimbreros',
          acceptance: 'Puntales con contraflecha de 1 cm al centro del claro y rigidizadores.',
          material: 'Vigueta pretensada 12-5, bovedilla de poliestireno 15x60x120cm y malla electrosoldada 6x6-10/10.',
          risk: 'Falta de apuntalamiento adecuado que provoque flechas permanentes en losa.'
        },
        {
          id: 'sub-1-3-3',
          code: '1.3.3',
          title: 'Sembrado de Canalizaciones Conduit Pesadas & Cajas 4x4"',
          costMXN: 70000,
          duration: '1 Semana',
          contractor: 'Electricista Instalador',
          acceptance: 'Manguera conduit de 1" para red Cat6A y 3/4" para fuerza; chalupas profundas (50mm).',
          material: 'Tubería poliducto naranja pesado o tubo conduit pared gruesa.',
          risk: 'Tuberías aplastadas durante el colado; colocar tapones y proteger mangueras.'
        },
        {
          id: 'sub-1-3-4',
          code: '1.3.4',
          title: 'Colado de Capa de Compresión (5 cm) en Losa Entrepiso PB-PA',
          costMXN: 160000,
          duration: '0.5 Semanas',
          contractor: 'Planta Concretera & Cuadrilla',
          acceptance: 'Espesor uniforme de 5 cm con concreto f\'c=250 kg/cm² y curado húmedo por 7 días.',
          material: 'Concreto bombeado f\'c=250 kg/cm² con fibra de polipropileno anti-agrietamiento.',
          risk: 'Fisuras por contracción plástica; regar con membrana de curado base agua.'
        }
      ]
    },
    {
      id: 'stg-1-4',
      stageNum: '1.4',
      title: 'Losa Estructural de Azotea (+6.00m), Caseta & Escalera Monolítica',
      costMXN: 272000,
      duration: '4 Semanas (S16 - S19)',
      contractor: 'Maestro Albañil & Cuadrilla',
      substages: [
        {
          id: 'sub-1-4-1',
          code: '1.4.1',
          title: 'Estructuración y Colado de Losa Azotea General (+6.00m) & Caseta (+8.20m)',
          costMXN: 185000,
          duration: '2.5 Semanas',
          contractor: 'Cuadrilla de Obra Negra',
          acceptance: 'Losa de azotea colada con pendientes mínimas del 2% hacia bajadas pluviales BAP 4".',
          material: 'Vigueta/bovedilla, malla 6x6, concreto f\'c=250 premezclado.',
          risk: 'Encharcamientos por mala pendiente; rectificar niveles con regla y nivel láser.'
        },
        {
          id: 'sub-1-4-2',
          code: '1.4.2',
          title: 'Colado Monolítico de Escalera Confinada de Concreto (34 Escalones PB-Roof)',
          costMXN: 52000,
          duration: '1 Semana',
          contractor: 'Oficial Escalero Especialista',
          acceptance: 'Huella exacta de 28 cm y peralte de 17.6 cm homogéneo (Fórmula de Blondel 2P+H = 63.2cm).',
          material: 'Varilla 3/8", estribos 1/4" y concreto f\'c=250 colado monolíticamente.',
          risk: 'Escalones disparejos en el arranque o desembarco; verificar cimbra milimétrica.'
        },
        {
          id: 'sub-1-4-3',
          code: '1.4.3',
          title: 'Pretiles Perimetrales en Azotea (1.05m Alto) & Chaflanes',
          costMXN: 35000,
          duration: '0.5 Semanas',
          contractor: 'Oficial Albañil',
          acceptance: 'Pretiles a plomo de 1.05 m de altura y chaflanes triangulares de 10x10 cm en esquinas losa-muro.',
          material: 'Block hueco 12x20x40cm, mortero cemento-arena 1:4 y goterones exteriores.',
          risk: 'Filtraciones en esquinas si no se construyen los chaflanes a 45° antes de impermeabilizar.'
        }
      ]
    },
    {
      id: 'stg-1-5',
      stageNum: '1.5',
      title: 'Instalaciones MEP Ocultas, Fontanería PPR & Tablero QO-24',
      costMXN: 253000,
      duration: '4 Semanas (S18 - S21)',
      contractor: 'Plomero Certificado & Electricista',
      substages: [
        {
          id: 'sub-1-5-1',
          code: '1.5.1',
          title: 'Red Hidráulica PPR Termofusionada & Prueba Hidrostática a 10 Bar (24h)',
          costMXN: 105000,
          duration: '2 Semanas',
          contractor: 'Plomero Certificado TuboPlus',
          acceptance: 'Presión sostenida de 10 bar (145 PSI) por 24 horas continuas sin caída de aguja en manómetro.',
          material: 'Tubería TuboPlus PPR termofusionada de 1", 3/4" y 1/2" con válvulas de esfera roscadas.',
          risk: 'Cerrar muros sin prueba de presión; PROHIBIDO aplanar sin acta firmada por DRO.'
        },
        {
          id: 'sub-1-5-2',
          code: '1.5.2',
          title: 'Red Sanitaria y Pluvial PVC con Columna de Ventilación CVS a +7.20m',
          costMXN: 0,
          duration: '1.5 Semanas',
          contractor: 'Plomero Sanitario',
          acceptance: 'Pendiente uniforme del 2% hacia registros exteriores, tubos BSN 4", BSG 3" y CVS 2" en azotea.',
          material: 'Tubería Sanitaria PVC Norma (cemento pegamento dorado) y registros con doble tapa.',
          risk: 'Retorno de malos olores si la columna de ventilación sanitaria no sobrepasa la azotea.'
        },
        {
          id: 'sub-1-5-3',
          code: '1.5.3',
          title: 'Cableado Eléctrico, Cable Neutro en 100% de Chalupas & Tablero QO-24',
          costMXN: 148000,
          duration: '1.5 Semanas',
          contractor: 'Electricista Especialista',
          acceptance: 'Tablero bifásico 220V/110V balanceado, tierra física < 5Ω y cable neutro en todas las cajas.',
          material: 'Centro de carga Square D QO-24, pastillas termomagnéticas QO, cable THW-LS Condumex Cal. 8, 10, 12, 14.',
          risk: 'Omitir cable neutro en cajas de apagadores (invalida micro-módulos domóticos Zigbee).'
        }
      ]
    },
    {
      id: 'stg-1-6',
      stageNum: '1.6',
      title: 'Acabados Básicos PB, Impermeabilización Azotea & Mudanza',
      costMXN: 265000,
      duration: '3 Semanas (S22 - S24)',
      contractor: 'Yesero, Pintor, Cancelero & Pisero',
      substages: [
        {
          id: 'sub-1-6-1',
          code: '1.6.1',
          title: 'Impermeabilización Termofusionada Prefabricada 4.5mm (Garantía 10 Años)',
          costMXN: 48000,
          duration: '1 Semana',
          contractor: 'Impermeabilizador Certificado',
          acceptance: 'Prueba de estanqueidad de 48 horas inundando azotea sin una sola mancha en losa inferior.',
          material: 'Membrana prefabricada SBS 4.5mm con refuerzo de poliéster y gravilla terracota.',
          risk: 'Sobrecalentar la membrana al termofusionar y quemar el alma de poliéster.'
        },
        {
          id: 'sub-1-6-2',
          code: '1.6.2',
          title: 'Aplanados de Yeso a Plomo en PB & Zarpeo Exterior Hidrófugo',
          costMXN: 95000,
          duration: '2 Semanas',
          contractor: 'Cuadrilla de Yeseros',
          acceptance: 'Muros interiores a plomo con yeso fino pulido y repelado exterior con aditivo impermeabilizante.',
          material: 'Yeso Maxymo / Yeso Supremo, cemento, arena cribada y aditivo hidrófugo integral.',
          risk: 'Desprendimiento de yeso por humedad residual; ventilar recintos adecuadamente.'
        },
        {
          id: 'sub-1-6-3',
          code: '1.6.3',
          title: 'Piso Porcelánico PB, Puerta Principal de Seguridad & Ventanas de Aluminio',
          costMXN: 122000,
          duration: '1.5 Semanas',
          contractor: 'Pisero & Cancelero',
          acceptance: 'Piso colocado sin cejas con boquilla epóxica, canceles herméticos y puerta de acero con chapa de seguridad.',
          material: 'Porcelanato 60x60cm, pegazulejo Crest Plata, cancelería línea Eurovent y puerta de seguridad de acero.',
          risk: 'Rayar o manchar pisos durante el cierre de obra; cubrir con cartón corrugado.'
        },
        {
          id: 'sub-1-6-4',
          code: '1.6.4',
          title: '🔑 Habilitación de Suite PB, Baño Funcional & Mudanza Inmediata (Día 180)',
          costMXN: 0,
          duration: 'Hito Clave',
          contractor: 'Propietario & DRO',
          acceptance: 'Entrega formal de llaves, servicios de agua, luz y drenaje 100% operativos. ¡CERO RENTA!',
          material: 'Acta de entrega-recepción de Fase 1.',
          risk: 'Habitar sin verificar que el drenaje y la cisterna funcionen a la perfección.'
        }
      ]
    }
  ],
  2: [
    {
      id: 'stg-2-1',
      stageNum: '2.1',
      title: 'Cocina Integral de Diseño con Isla & Cubiertas de Cuarzo',
      costMXN: 185000,
      duration: '6 Semanas (Meses 7-8)',
      contractor: 'Carpintero Ebanista & Marmolero',
      substages: [
        {
          id: 'sub-2-1-1',
          code: '2.1.1',
          title: 'Fabricación y Montaje de Muebles Hidrófugos con Herrajes Blum',
          costMXN: 110000,
          duration: '4 Semanas',
          contractor: 'Ebanista Especialista',
          acceptance: 'Cierres suaves en todas las puertas y cajones con nivelación milimétrica.',
          material: 'MDF melamínico hidrófugo de 18mm con cantos de PVC de 2mm.',
          risk: 'Filtraciones bajo tarja si no se sella la madera con silicona sanitaria.'
        },
        {
          id: 'sub-2-1-2',
          code: '2.1.2',
          title: 'Suministro e Instalación de Cubierta e Isla en Cuarzo Calacatta',
          costMXN: 75000,
          duration: '2 Semanas',
          contractor: 'Taller de Cubiertas de Cuarzo',
          acceptance: 'Juntas invisibles a 45° en faldón de isla y zoclo perimetral sellado.',
          material: 'Placa de cuarzo ingeniería 20mm, tarja de submontar de acero inoxidable.',
          risk: 'Fracturas en esquinas de cortes de tarja/parrilla si no se redondean los ángulos.'
        }
      ]
    },
    {
      id: 'stg-2-2',
      stageNum: '2.2',
      title: 'Equipamiento de Baño Master Spa & Baño Compartido PA',
      costMXN: 130000,
      duration: '4 Semanas (Meses 8-9)',
      contractor: 'Cancelero, Plomero & Marmolero',
      substages: [
        {
          id: 'sub-2-2-1',
          code: '2.2.1',
          title: 'Cancelería de Cristal Templado 9.5mm con Herrajes de Acero Inox',
          costMXN: 45000,
          duration: '2 Semanas',
          contractor: 'Cancelero de Cristal Templado',
          acceptance: 'Puertas corredizas y abatibles con sellos magnéticos y cero salpicadura exterior.',
          material: 'Cristal templado claro de 9.5mm, jaladeras tipo toallero y perfiles de acero 304.',
          risk: 'Cristales descuadrados por muros sin plomo; rectificar con plantillas antes de templar.'
        },
        {
          id: 'sub-2-2-2',
          code: '2.2.2',
          title: 'Regadera Tipo Lluvia Spa, Doble Vanity de Cuarzo & WC Suspendido Master',
          costMXN: 50000,
          duration: '2 Semanas',
          contractor: 'Plomero Certificado',
          acceptance: 'Presión de agua de 3.5 bar constante en regadera de techo y monomandos sin goteos.',
          material: 'Regadera de techo 30x30cm inox, doble ovalín de cerámica y grifería Helvex/Moen.',
          risk: 'Falta de soporte en bastidor de inodoro suspendido; fijar a muro de concreto.'
        },
        {
          id: 'sub-2-2-3',
          code: '2.2.3',
          title: 'Equipamiento Baño Compartido PA & Zinc de Servicio en Pasillo',
          costMXN: 35000,
          duration: '1.5 Semanas',
          contractor: 'Plomero & Albañil',
          acceptance: 'Tarja vertedero en zinc de servicio con llave de nariz y desagüe con trampa de olor.',
          material: 'Mueble de blancos con llave y vertedero cerámico.',
          risk: 'Salpicaduras en piso de pasillo; colocar zoclo de porcelanato de 15 cm.'
        }
      ]
    },
    {
      id: 'stg-2-3',
      stageNum: '2.3',
      title: 'Pisos Gran Formato, Carpintería de Puertas & Clósets PA',
      costMXN: 179000,
      duration: '6 Semanas (Meses 10-11)',
      contractor: 'Pisero & Carpintero',
      substages: [
        {
          id: 'sub-2-3-1',
          code: '2.3.1',
          title: 'Colocación de 92 m² de Porcelanato Rectificado 60x120cm en Planta Alta',
          costMXN: 85000,
          duration: '2.5 Semanas',
          contractor: 'Oficial Pisero',
          acceptance: 'Nivelación con sistema de cuñas autonivelantes y junta uniforme de 1.5mm.',
          material: 'Porcelanato pulido 60x120cm y adhesivo flexible Pegazulejo Crest Porcelánico.',
          risk: 'Cejas entre piezas; exigir uso obligatorio de crucetas autonivelantes.'
        },
        {
          id: 'sub-2-3-2',
          code: '2.3.2',
          title: 'Fabricación e Instalación de 8 Puertas Interiores Semisólidas con Marco Envolvente',
          costMXN: 56000,
          duration: '2 Semanas',
          contractor: 'Carpintero de Taller',
          acceptance: 'Holgura de 3 mm perimetral, cerraduras de manija de acero inoxidable y sellos acústicos.',
          material: 'Puertas de tambor con bastidor de pino estufado y caras de HDF enchapado en roble/nogal.',
          risk: 'Puertas que rozan el piso tras asentamiento; dejar 8 mm de holgura inferior.'
        },
        {
          id: 'sub-2-3-3',
          code: '2.3.3',
          title: 'Clósets Empotrados en Recámaras Secundarias & Walk-in Closet Master con LED',
          costMXN: 38000,
          duration: '2 Semanas',
          contractor: 'Carpintero Ebanista',
          acceptance: 'Zapateras extraíbles, barras para colgar ropa larga y cajones con iluminación LED indirecta.',
          material: 'Melamina textil de 16mm con correderas de extensión total.',
          risk: 'Falta de ventilación en vestidor; dejar ranuras de aire en zócalo inferior.'
        }
      ]
    },
    {
      id: 'stg-2-4',
      stageNum: '2.4',
      title: 'Pintura Vinílica Lavable & Detalles de Iluminación PA',
      costMXN: 86000,
      duration: '3 Semanas (Mes 12)',
      contractor: 'Pintor & Electricista',
      substages: [
        {
          id: 'sub-2-4-1',
          code: '2.4.1',
          title: 'Pintura Vinílica Lavable Interior de Primera Calidad (Comex Vinimex Total)',
          costMXN: 46000,
          duration: '2 Semanas',
          contractor: 'Cuadrilla de Pintores',
          acceptance: 'Muros lijados, sellador 5x1 aplicado y 2 manos de pintura con cobertura homogénea.',
          material: 'Pintura vinil-acrílica lavable抗菌 color blanco ostión / arena cálido.',
          risk: 'Pintar sobre yeso con humedad que genere eflorescencias o ampollas.'
        },
        {
          id: 'sub-2-4-2',
          code: '2.4.2',
          title: 'Luminarias LED Empotradas Antideslumbrantes & Placas de Contacto',
          costMXN: 40000,
          duration: '1 Semana',
          contractor: 'Electricista',
          acceptance: 'Focos LED cálidos 3000K con índice de reproducción cromática IRC > 90.',
          material: 'Downlights LED COB de 7W y placas de contacto Schneider Orion blanco mate.',
          risk: 'Diferencia en tonos de luz entre habitaciones; estandarizar a 3000K.'
        }
      ]
    }
  ],
  3: [
    {
      id: 'stg-3-1',
      stageNum: '3.1',
      title: 'Piso Deck Exterior & Pérgola Bioclimática Estructural',
      costMXN: 103000,
      duration: '4 Semanas (Meses 13-14)',
      contractor: 'Herrero Estructural & Instalador Deck',
      substages: [
        {
          id: 'sub-3-1-1',
          code: '3.1.1',
          title: 'Instalación de 45 m² de Piso Deck de Polímero para Intemperie en Terraza Frontal',
          costMXN: 58000,
          duration: '2 Semanas',
          contractor: 'Instalador Certificado de Deck',
          acceptance: 'Bastidor de aluminio elevado sobre dados de concreto sin perforar la membrana impermeable.',
          material: 'Deck sintético WPC texturizado antiderrapante resistente a rayos UV.',
          risk: 'Perforar la impermeabilización de la losa; fijar el bastidor flotado sobre calzas de EPDM.'
        },
        {
          id: 'sub-3-1-2',
          code: '3.1.2',
          title: 'Montaje de Pérgola Bioclimática de Acero Estructural con Vigas de Sombra',
          costMXN: 45000,
          duration: '2 Semanas',
          contractor: 'Herrero / Taller Estructural',
          acceptance: 'Estructura de PTR galvanizado con pintura electrostática horneada y anclaje antiviento.',
          material: 'Perfiles estructurales de acero, primario epóxico y pintura automotriz negro mate.',
          risk: 'Corrosión por intemperie si se omite la pintura electrostática de fondo.'
        }
      ]
    },
    {
      id: 'stg-3-2',
      stageNum: '3.2',
      title: 'Estación Grill con Asador Empotrado, Tarja Inox & Barra Periquera',
      costMXN: 48000,
      duration: '3 Semanas (Mes 15)',
      contractor: 'Albañil, Plomero & Marmolero',
      substages: [
        {
          id: 'sub-3-2-1',
          code: '3.2.1',
          title: 'Construcción de Barra de Mampostería con Cubierta de Granito San Gabriel',
          costMXN: 22000,
          duration: '1.5 Semanas',
          contractor: 'Albañil & Marmolero',
          acceptance: 'Barra periquera de 1.05 m de alto para 3 bancos con cubierta de granito negro sellado.',
          material: 'Block hueco, loseta de granito natural y zoclo impermeable.',
          risk: 'Manchas por grasa en granito; aplicar sellador penetrante hidrófugo y oleófugo.'
        },
        {
          id: 'sub-3-2-2',
          code: '3.2.2',
          title: 'Empotrado de Asador Inox 304, Tarja Monomando & Conexión de Gas/Agua',
          costMXN: 26000,
          duration: '1.5 Semanas',
          contractor: 'Plomero Gasista',
          acceptance: 'Conexión hermética de gas LP con regulador de segunda etapa y tarja con agua fría/caliente.',
          material: 'Asador empotrado con tapa termómetro inox 304 y tarja monomando chef.',
          risk: 'Fuga en mangueras de gas expuestas al sol; usar tubería de cobre rígido tipo L.'
        }
      ]
    },
    {
      id: 'stg-3-3',
      stageNum: '3.3',
      title: 'Acabados & Muebles del 1/2 Baño Social de Azotea',
      costMXN: 38000,
      duration: '3 Semanas (Mes 16)',
      contractor: 'Plomero & Cancelero',
      substages: [
        {
          id: 'sub-3-3-1',
          code: '3.3.1',
          title: 'Instalación de Inodoro Suspendido, Vanity Compacto & Espejo Touch LED',
          costMXN: 22000,
          duration: '1.5 Semanas',
          contractor: 'Plomero Especialista',
          acceptance: 'Servicio sanitario completo sin necesidad de bajar a Planta Alta o Baja durante reuniones.',
          material: 'Inodoro de 4.8 L/descarga, vanity flotante con monomando y espejo con sensor.',
          risk: 'Olores en tubería si no se instala trampa de grasa o sello hidráulico adecuado.'
        },
        {
          id: 'sub-3-3-2',
          code: '3.3.2',
          title: 'Puerta Exterior Hermética & Piso Cerámico Antiderrapante',
          costMXN: 16000,
          duration: '1.5 Semanas',
          contractor: 'Cancelero de Aluminio',
          acceptance: 'Puerta de aluminio anodizado línea pesada con sello perimetral contra viento y lluvia.',
          material: 'Aluminio anodizado negro, cerradura de manija y piso antiderrapante R11.',
          risk: 'Filtración de lluvia por el umbral inferior de la puerta; colocar sardinel de 5 cm.'
        }
      ]
    },
    {
      id: 'stg-3-4',
      stageNum: '3.4',
      title: 'Barandal de Cristal Templado, Sala Lounge Firepit & Louvers',
      costMXN: 231000,
      duration: '6 Semanas (Meses 17-18)',
      contractor: 'Cancelero, Paisajista & Electricista',
      substages: [
        {
          id: 'sub-3-4-1',
          code: '3.4.1',
          title: 'Barandal Frontal en Cristal Templado 9.5mm con Postes de Acero Inox',
          costMXN: 42000,
          duration: '2 Semanas',
          contractor: 'Cancelero Especialista',
          acceptance: 'Resistencia a carga horizontal de impacto (100 kg/m) según norma de seguridad.',
          material: 'Cristal templado de seguridad con cantos pulidos brillantes y postes de acero 304.',
          risk: 'Holguras en anclajes; utilizar taquetes químicos Hilti en pretil de concreto.'
        },
        {
          id: 'sub-3-4-2',
          code: '3.4.2',
          title: 'Celosías Louvers de Aluminio en Monitor Roof para Ventilación Cenital',
          costMXN: 30000,
          duration: '1.5 Semanas',
          contractor: 'Fabricante de Aluminio',
          acceptance: 'Lamas orientadas a 45° que permiten salida de aire caliente sin ingreso de gotas de lluvia.',
          material: 'Aluminio extruido con malla mosquitera de acero inoxidable interior.',
          risk: 'Entrada de insectos; verificar sello de la malla mosquitera perimetral.'
        },
        {
          id: 'sub-3-4-3',
          code: '3.4.3',
          title: 'Sala Lounge Modular para Intemperie con Mesa Fogatero (Firepit) a Gas',
          costMXN: 48000,
          duration: '1.5 Semanas',
          contractor: 'Mobiliario de Terraza',
          acceptance: 'Cojinería hidrófuga con tela Sunbrella y quemador de acero inoxidable con piedras volcánicas.',
          material: 'Estructura de aluminio tejido sintético y mesa de concreto pulido.',
          risk: 'Dejar el fuego encendido sin supervisión; instalar válvula de corte temporizada.'
        },
        {
          id: 'sub-3-4-4',
          code: '3.4.4',
          title: 'Jardineras Perimetrales con Riego por Goteo & Contactos GFCI Azotea',
          costMXN: 111000,
          duration: '2 Semanas',
          contractor: 'Paisajista & Electricista',
          acceptance: 'Tiras LED cálidas IP65 bajo barra y escalones, contactos GFCI impermeables con tapa hermética.',
          material: 'Tiras LED 24V IP67, macetones de concreto y electroválvula de riego 24V.',
          risk: 'Cortocircuito por lluvia en contactos exteriores; usar cajas selladas NEMA 3R.'
        }
      ]
    }
  ],
  4: [
    {
      id: 'stg-4-1',
      stageNum: '4.1',
      title: 'Sistema Solar Fotovoltaico 3.3 kWp & Calentador Solar 200L',
      costMXN: 97000,
      duration: '4 Semanas (Meses 19-20)',
      contractor: 'Instalador Solar Certificado',
      substages: [
        {
          id: 'sub-4-1-1',
          code: '4.1.1',
          title: 'Arreglo Fotovoltaico 3.3 kWp (6 Paneles Monocristalinos de 550W)',
          costMXN: 78000,
          duration: '2 Semanas',
          contractor: 'Ingeniero Solar Fotovoltaico',
          acceptance: 'Generación estimada de ~450 kWh/mes con microinversores inteligentes y monitoreo Wi-Fi.',
          material: '6 módulos solares Tier 1 de 550W bifaciales, estructura de aluminio anclada a losa técnica norte.',
          risk: 'Sombras proyectadas por tinacos o caseta; ubicar en losa técnica norte libre de obstáculos.'
        },
        {
          id: 'sub-4-1-2',
          code: '4.1.2',
          title: 'Calentador Solar de Agua 200L de 15 Tubos de Vacío con Bypass Termostático',
          costMXN: 19000,
          duration: '2 Semanas',
          contractor: 'Técnico Solar Térmico',
          acceptance: 'Termotanque de acero inoxidable 304 con válvula mezcladora termostática a 45°C (Ahorro 80% Gas).',
          material: 'Termotanque inox presurizado, 15 tubos borosilicato y válvula de alivio 3 bar.',
          risk: 'Choque térmico en tubos de vacío; llenar el equipo exclusivamente a primera hora de la mañana.'
        }
      ]
    },
    {
      id: 'stg-4-2',
      stageNum: '4.2',
      title: 'Climatización Multi-Split Inverter R32 de Alta Eficiencia',
      costMXN: 98000,
      duration: '4 Semanas (Meses 21-22)',
      contractor: 'Técnico en Refrigeración Certificado',
      substages: [
        {
          id: 'sub-4-2-1',
          code: '4.2.1',
          title: 'Montaje de 3 Condensadoras en Losa Técnica Sur con Bases Antivibratorias',
          costMXN: 48000,
          duration: '2 Semanas',
          contractor: 'Técnico HVAC',
          acceptance: 'Condensadoras ocultas de la vista frontal con tacones de neopreno y drenaje de condensados canalizado.',
          material: 'Bases de neopreno reforzado, tubería de cobre para refrigeración con forro Armaflex.',
          risk: 'Vibración transmitida a losas habitables; instalar resortes o amortiguadores de vibración.'
        },
        {
          id: 'sub-4-2-2',
          code: '4.2.2',
          title: 'Instalación de 4 Evaporadoras Minisplit Inverter (Suite PB, Master PA, Secundarias)',
          costMXN: 50000,
          duration: '2 Semanas',
          contractor: 'Técnico HVAC',
          acceptance: 'Vacío de líneas a 500 micrones sostenido antes de liberar refrigerante ecológico R32.',
          material: 'Unidades minisplit SEER 20+ con filtros de iones de plata y conectividad Wi-Fi.',
          risk: 'Fugas de gas por mal abocinado; usar torque exacto en tuercas flare.'
        }
      ]
    },
    {
      id: 'stg-4-3',
      stageNum: '4.3',
      title: 'Presurización Inteligente, Filtración Dual & Desinfección UV',
      costMXN: 34000,
      duration: '2 Semanas (Mes 22)',
      contractor: 'Plomero & Técnico Hidráulico',
      substages: [
        {
          id: 'sub-4-3-1',
          code: '4.3.1',
          title: 'Bomba Presurizadora Inverter Silenciosa (Presión Constante 3.5 bar)',
          costMXN: 22000,
          duration: '1 Semana',
          contractor: 'Plomero Especialista',
          acceptance: 'Presión homogénea de 3.5 bar con arranque suave sin golpes de ariete.',
          material: 'Bomba presurizadora inteligente (Scala2 / DAB E.sybox Mini) con sensor de flujo.',
          risk: 'Trabajo en seco; verificar sensor de nivel de cisterna interconectado.'
        },
        {
          id: 'sub-4-3-2',
          code: '4.3.2',
          title: 'Filtro Dual de Sedimentos (5µm) + Carbón Activado + Lámpara UV',
          costMXN: 12000,
          duration: '1 Semana',
          contractor: 'Técnico de Tratamiento de Agua',
          acceptance: 'Agua purificada y desinfectada en toda la red sin alterar sabor ni presión.',
          material: 'Portafiltros Big Blue 20", cartuchos de sedimentos y carbón activado, esterilizador UV de 12 GPM.',
          risk: 'Pérdida de efectividad de lámpara UV; programar recordatorio anual de cambio de bulbo.'
        }
      ]
    },
    {
      id: 'stg-4-4',
      stageNum: '4.4',
      title: 'Rack 12U MDF, Home Assistant, CCTV 4K & Iluminación Circadiana',
      costMXN: 133000,
      duration: '6 Semanas (Meses 23-24)',
      contractor: 'Integrador Domótico Certificado',
      substages: [
        {
          id: 'sub-4-4-1',
          code: '4.4.1',
          title: 'Equipamiento del Rack 12U (Gateway UniFi, Switch 16p PoE+, UPS 1500VA)',
          costMXN: 46000,
          duration: '2 Semanas',
          contractor: 'Ingeniero de Telecomunicaciones',
          acceptance: 'Certificación de cableado Cat6A con tester digital y respaldo de energía ininterrumpida por 45 min.',
          material: 'Rack 12U abatible, UniFi Cloud Gateway Ultra, Switch PoE+ y UPS APC Smart 1500VA.',
          risk: 'Sobrecalentamiento en rack; colocar termostato con ventiladores extractores superiores.'
        },
        {
          id: 'sub-4-4-2',
          code: '4.4.2',
          title: 'CCTV 4K PoE con IA Local, Videoportero & Cerradura Inteligente',
          costMXN: 42000,
          duration: '2 Semanas',
          contractor: 'Técnico en Seguridad Electrónica',
          acceptance: '4 cámaras 4K perimetrales con detección local de vehículos y personas, NVR de 4TB sin cuotas mensuales.',
          material: 'Cámaras 4K PoE tipo torreta con visión nocturna a color, timbre videoportero y cerradura biométrica.',
          risk: 'Exposición de cables de red al exterior; usar manguera metálica flexible en cámaras perimetrales.'
        },
        {
          id: 'sub-4-4-3',
          code: '4.4.3',
          title: 'Puesta en Marcha de Home Assistant, Iluminación Circadiana & Sensores mmWave',
          costMXN: 45000,
          duration: '2 Semanas',
          contractor: 'Integrador Domótico',
          acceptance: 'Automatizaciones locales sin dependencia de la nube para clima, presencia estática e iluminación circadiana.',
          material: 'Servidor Home Assistant Green, coordinadores Zigbee/Matter, sensores mmWave 24GHz y dimmers DALI.',
          risk: 'Automatizaciones lentas por nube; exigir que todo opere sobre protocolos locales (Matter/Zigbee).'
        }
      ]
    }
  ]
};

// ==========================================================================
// 4. CATÁLOGO DE PRECIOS UNITARIOS (PU) & PARTIDAS DE OBRA CIVIL
// ==========================================================================
const budgetItems = [
  // FASE 1: CASA NÚCLEO HABITABLE
  { phase: "fase1", code: "PRE-01", name: "Gestoría, Licencia de Construcción, Alineamiento & DRO", spec: "Trámites municipales, dictamen perito DRO, número oficial y licencias", unit: "Lote", qty: 1, costMXN: 145000 },
  { phase: "fase1", code: "PRE-02", name: "Estudio Mecánica Suelos & Trazo Estación Total", spec: "3 sondeos a 4.00m, cálculo geotécnico y delimitación de 153.19 m²", unit: "Lote", qty: 1, costMXN: 26000 },
  { phase: "fase1", code: "CIM-01", name: "Limpieza, Excavación Masiva & Rellenos Compactados", spec: "Excavación para zapatas a 1.20m y zanjas de drenajes maestros", unit: "m³", qty: 55, costMXN: 55000 },
  { phase: "fase1", code: "CIM-02", name: "Cisterna Subterránea 5,000 L Concreto Hidrófugo", spec: "Cisterna armada f'c=250 bajo cochera con sensor de nivel ultrasónico", unit: "Pza", qty: 1, costMXN: 68000 },
  { phase: "fase1", code: "CIM-03", name: "Cimentación Concreto Armado f'c=250 & Fumigación", spec: "Zapatas corridas, contratrabes de liga y barrera química antitermitas", unit: "m³", qty: 32, costMXN: 326000 },
  { phase: "fase1", code: "EST-01", name: "Muros de Carga, Castillos & Columnas (3 Niveles)", spec: "Block térmico confinado con columnas y castillos de concreto armado", unit: "m²", qty: 285, costMXN: 340000 },
  { phase: "fase1", code: "EST-02", name: "Losa Entrepiso PB-PA (Vigueta/Bovedilla Poliestireno)", spec: "Capa compresión 5cm concreto f'c=250 premezclado y aislamiento", unit: "m²", qty: 78, costMXN: 230000 },
  { phase: "fase1", code: "EST-03", name: "Losa Azotea General (+6.00m) & Caseta Escalera", spec: "Losa estructural completa de azotea y caseta de cubo de escalera", unit: "m²", qty: 65, costMXN: 185000 },
  { phase: "fase1", code: "EST-04", name: "Escalera de Concreto Armada (34 Escalones PB-Roof)", spec: "Estructura monolítica continua con descanso intermedio (2P+H=63cm)", unit: "Tramo", qty: 2, costMXN: 52000 },
  { phase: "fase1", code: "EST-05", name: "Pretiles de Seguridad en Azotea (1.05m Alto)", spec: "Pretiles perimetrales en bloque de concreto con remate de pecho paloma", unit: "ml", qty: 38, costMXN: 35000 },
  { phase: "fase1", code: "MEP-01", name: 'Canalizaciones Conduit Pesadas, Cajas 4x4" & Neutro', spec: 'Manguera 1" y 3/4", chalupas 50mm y cable neutro en 100% de chalupas', unit: "Salida", qty: 85, costMXN: 148000 },
  { phase: "fase1", code: "MEP-02", name: "Red Hidráulica PPR Termofusionada & Drenajes PVC", spec: 'Tuberías TuboPlus aisladas, subida a azotea, BSN 4", BSG 3" y CVS 2"', unit: "Lote", qty: 1, costMXN: 105000 },
  { phase: "fase1", code: "ACA-01", name: "Aplanados de Yeso PB & Zarpeo Exterior Hidrófugo", spec: "Yeso a plomo en interiores de PB y repelado impermeable en fachadas", unit: "m²", qty: 210, costMXN: 95000 },
  { phase: "fase1", code: "ACA-02", name: "Impermeabilización Termofusionada Azotea (10 Años)", spec: "Membrana prefabricada 4.5mm gravillada con poliéster y pendientes 2%", unit: "m²", qty: 65, costMXN: 48000 },
  { phase: "fase1", code: "ACA-03", name: "Piso Porcelánico PB, Puerta Seguridad & Canceles Ext.", spec: "Piso en PB, puerta principal de seguridad y ventanas exteriores con vidrio", unit: "Lote", qty: 1, costMXN: 122000 },

  // FASE 2: CONFORT & ACABADOS EN PLANTA ALTA
  { phase: "fase2", code: "COC-01", name: "Cocina Integral de Diseño con Isla & Cuarzo", spec: "Muebles hidrófugos, herrajes Blum de cierre suave y cubiertas de cuarzo", unit: "Lote", qty: 1, costMXN: 185000 },
  { phase: "fase2", code: "SAN-01", name: "Baño Master Spa (Doble Vanity, Canceles 9.5mm, Lluvia)", spec: "Vanity cuarzo, regadera lluvia spa, canceles templados y WC suspendido", unit: "Lote", qty: 1, costMXN: 75000 },
  { phase: "fase2", code: "SAN-02", name: "Baño Compartido PA Completo & Zinc de Servicio", spec: "WC ecológico, regadera con cancel templado, vanity y mueble zinc", unit: "Lote", qty: 1, costMXN: 55000 },
  { phase: "fase2", code: "CAR-01", name: "Carpintería 8 Puertas Interiores Semisólidas", spec: "Puertas con marco envolvente y sellos perimetrales acústicos", unit: "Pza", qty: 8, costMXN: 56000 },
  { phase: "fase2", code: "CAR-02", name: "Clósets Empotrados Recámaras & Walk-in Closet Master", spec: "Clósets en recámaras secundarias y vestidor con iluminación LED", unit: "Lote", qty: 1, costMXN: 78000 },
  { phase: "fase2", code: "PIS-01", name: "Piso Porcelánico Rectificado Gran Formato PA (92 m²)", spec: "Porcelanato 60x120cm en recámaras, pasillo y Family Room con boquilla", unit: "m²", qty: 92, costMXN: 85000 },
  { phase: "fase2", code: "PIN-01", name: "Pintura Vinílica Lavable Interior de Primera Calidad", spec: "Comex Vinimex Total en muros interiores y plafones de Planta Alta", unit: "m²", qty: 320, costMXN: 46000 },

  // FASE 3: ROOF GARDEN FRONTAL & 1/2 BAÑO
  { phase: "fase3", code: "ROO-01", name: "Piso Deck Exterior / Porcelanato Antiderrapante (45 m²)", spec: "Deck tecnológico de polímero o porcelánico antideslizante para intemperie", unit: "m²", qty: 45, costMXN: 58000 },
  { phase: "fase3", code: "ROO-02", name: "Pérgola Bioclimática de Acero Estructural", spec: "Estructura metálica con vigas de sombra y preparación para enredadera/toldo", unit: "Pza", qty: 1, costMXN: 45000 },
  { phase: "fase3", code: "ROO-03", name: "Estación Asador Grill Inox con Tarja & Barra Periquera", spec: "Asador empotrado a gas/carbón, tarja monomando y barra con 3 bancos", unit: "Lote", qty: 1, costMXN: 48000 },
  { phase: "fase3", code: "ROO-04", name: "Acabados & Muebles 1/2 Baño Social de Azotea", spec: "WC suspendido, vanity compacto, espejo LED y puerta de acceso al deck", unit: "Lote", qty: 1, costMXN: 38000 },
  { phase: "fase3", code: "ROO-05", name: "Barandal Frontal Cristal Templado hacia la Calle", spec: "Cristal templado 9.5mm con postes de acero inox sobre pretil frontal", unit: "ml", qty: 8.5, costMXN: 42000 },
  { phase: "fase3", code: "ROO-06", name: "Celosías Louvers Antilluvia en Cubierta Sobreelevada", spec: "Aluminio anodizado con lamas a 45° en Monitor Roof para ventilación cenital", unit: "Lote", qty: 1, costMXN: 30000 },
  { phase: "fase3", code: "ROO-07", name: "Sala Lounge Modular Exterior & Mesa Fogatero Firepit", spec: "Sillones intemperie con cojines hidrófugos y mesa firepit a gas", unit: "Lote", qty: 1, costMXN: 48000 },
  { phase: "fase3", code: "ROO-08", name: "Jardineras Perimetrales Decorativas & Riego Goteo", spec: "Macetones y jardineras de concreto con iluminación cálida indirecta", unit: "Lote", qty: 1, costMXN: 21000 },
  { phase: "fase3", code: "ROO-09", name: "Iluminación Cálida Indirecta & Contactos GFCI Azotea", spec: "Tiras LED IP65 bajo barra y escalones, con contactos impermeables", unit: "Lote", qty: 1, costMXN: 90000 },

  // FASE 4: SOLAR, CLIMAS & DOMÓTICA PRO
  { phase: "fase4", code: "SOL-01", name: "Arreglo Fotovoltaico Solar 3.3 kWp (6 Paneles 550W)", spec: "Módulos monocristalinos bifaciales + microinversores smart (Ahorro 90% CFE)", unit: "Sistema", qty: 1, costMXN: 78000 },
  { phase: "fase4", code: "SOL-02", name: "Calentador Solar de Agua 200 L (15 Tubos de Vacío Inox)", spec: "Termotanque inox 304, bypass termostático y respaldo modulante (Ahorro 80% Gas)", unit: "Pza", qty: 1, costMXN: 19000 },
  { phase: "fase4", code: "HVAC-01", name: "Sistema Climatización Multi-Split Inverter (3 Condensadoras)", spec: "3 condensadoras en azotea + 4 evaporadoras para PB, Master y Secundarias", unit: "Lote", qty: 1, costMXN: 98000 },
  { phase: "fase4", code: "HID-01", name: "Bomba Presurizadora Inverter + Filtro Dual + Lámpara UV", spec: "3.5 bar constante silenciosa, filtro 5µm, carbón activado y esterilizador UV", unit: "Lote", qty: 1, costMXN: 34000 },
  { phase: "fase4", code: "DOM-01", name: "Rack 12U Equipado (Gateway UniFi, Switch PoE+, UPS)", spec: "Cloud Gateway Ultra, Switch 16p PoE+, UPS Online 1500VA y Home Assistant", unit: "Lote", qty: 1, costMXN: 46000 },
  { phase: "fase4", code: "DOM-02", name: "Iluminación Inteligente Circadiana & Sensores mmWave", spec: "Tiras COB LED 24V, Dimmers DALI, apagadores Zigbee/Matter con neutro", unit: "Lote", qty: 1, costMXN: 45000 },
  { phase: "fase4", code: "SEC-01", name: "CCTV 4K PoE con IA Local, Videoportero & Cerradura Smart", spec: "4 cámaras 4K, NVR local 4TB sin cuotas, timbre con chapa eléc. y huella", unit: "Lote", qty: 1, costMXN: 42000 }
];

// ==========================================================================
// 5. DIRECTORIO DE CONTRATISTAS & MATRIZ RACI
// ==========================================================================
const contractorsData = [
  {
    role: 'Maestro Mayor de Obra Civil',
    name: 'Don Rosalío Méndez & Cuadrilla',
    specialty: 'Albañilería, Cimentación, Muros y Losas',
    contract: 'Destajo Semanal por Estimación Aprobada',
    retention: '5% Fondo de Garantía Retenido',
    phone: '+52 55 1234 5678',
    email: 'obracivil.mendez@sico235.local',
    deliverables: 'Cisterna 5kL, Zapatas f\'c=250, Muros a plomo, Losas de entrepiso y azotea, Aplanados.',
    raci: { r: 'Obra Negra, Cimentación, Colados', a: 'Calidad de mano de obra', c: 'Topógrafo y Plomero', i: 'Propietario' }
  },
  {
    role: 'Director Responsable de Obra (DRO)',
    name: 'Ing. Carlos Villarreal R.',
    specialty: 'Peritaje Estructural, Trámites Municipales y Bitácora Oficial',
    contract: 'Honorarios Profesionales por Visita y Firma',
    retention: 'Responsabilidad Legal Pericial',
    phone: '+52 55 8765 4321',
    email: 'dro.villarreal@peritajes.mx',
    deliverables: 'Licencia municipal, firmas de bitácora, dictámenes de cilindros y terminación de obra.',
    raci: { r: 'Firma de Bitácora y Cálculos', a: 'Seguridad Estructural Oficial', c: 'Laboratorio de Concreto', i: 'Municipio' }
  },
  {
    role: 'Plomero Especialista Certificado PPR',
    name: 'Téc. Héctor Domínguez',
    specialty: 'Redes TuboPlus Termofusionadas, Drenajes PVC y Presurización',
    contract: 'Destajo por Mueble y Tramo Instalado',
    retention: '5% Fondo de Garantía Retenido (90 Días)',
    phone: '+52 55 2345 6789',
    email: 'plomeria.hector@instalaciones.pro',
    deliverables: 'Prueba de presión a 10 bar por 24h, BSN 4", BSG 3", CVS +7.20m, Bomba 3.5 bar.',
    raci: { r: 'Termofusión PPR, Redes Sanitarias', a: 'Cero Fugas Hidrostáticas', c: 'DRO y Yesero', i: 'Propietario' }
  },
  {
    role: 'Electricista & Redes Estructuradas',
    name: 'Ing. Mateo Santillana',
    specialty: 'Instalaciones NOM-001, Tableros QO-24 y Cableado Cat6A',
    contract: 'Destajo por Salida y Centro de Carga',
    retention: '5% Fondo de Garantía Retenido',
    phone: '+52 55 3456 7890',
    email: 'electricidad.mateo@smartgrid.mx',
    deliverables: 'Cable neutro en 100% de chalupas, Tierra física < 5Ω, Tablero balanceado, Canalizaciones 1".',
    raci: { r: 'Alambrado, Cuadro QO, Cableado Cat6A', a: 'Cumplimiento NOM-001', c: 'Integrador Domótico', i: 'DRO' }
  },
  {
    role: 'Especialista en Impermeabilización',
    name: 'Impermeabilizaciones del Valle S.A.',
    specialty: 'Membranas Prefabricadas SBS Termofusionadas 4.5mm',
    contract: 'Suministro y Colocación con Póliza de 10 Años',
    retention: 'Póliza Escrita de Garantía',
    phone: '+52 55 4567 8901',
    email: 'contacto@impervalle.com.mx',
    deliverables: 'Membrana prefabricada gravillada, chaflanes 10x10cm, prueba de inundación 48h.',
    raci: { r: 'Termofusión de Membrana', a: 'Cero Goteras por 10 Años', c: 'Maestro Albañil', i: 'Propietario' }
  },
  {
    role: 'Cancelería de Aluminio & Templados',
    name: 'Aluminios & Cristales Eurovent S.A.',
    specialty: 'Ventanas Serie 70, Canceles 9.5mm y Barandales',
    contract: '50% Anticipo / 50% Colocado y Sellado',
    retention: 'Garantía de Hermeticidad',
    phone: '+52 55 5678 9012',
    email: 'ventas@aluminioseurovent.mx',
    deliverables: 'Ventanas línea Eurovent, canceles templados 9.5mm con acero inox, barandal de azotea.',
    raci: { r: 'Fabricación y Montaje de Canceles', a: 'Sellado Hermético contra Lluvia', c: 'Albañil y Marmolero', i: 'Propietario' }
  },
  {
    role: 'Carpintería Ebanistería & Cubiertas',
    name: 'Taller de Diseño & Madera Santoro',
    specialty: 'Cocinas Integrales de Cuarzo, Puertas y Clósets',
    contract: '50% Anticipo / 50% Instalado y Calibrado',
    retention: 'Ajuste de Herrajes y Garantía',
    phone: '+52 55 6789 0123',
    email: 'santoro.carpinteria@muebles.design',
    deliverables: 'Cocina con isla calacatta, 8 puertas semisólidas con sellos acústicos, vestidor con LED.',
    raci: { r: 'Fabricación y Montaje de Cocina/Clósets', a: 'Alineación de Herrajes Blum', c: 'Plomero y Electricista', i: 'Propietario' }
  },
  {
    role: 'Integrador Domótico & Solar',
    name: 'NextGen Smart Homes & Energy',
    specialty: 'Home Assistant, Paneles Solares 3.3 kWp, CCTV y Red Wi-Fi 7',
    contract: 'Ingeniería, Equipamiento y Puesta en Marcha',
    retention: 'Soporte Post-Entrega 12 Meses',
    phone: '+52 55 7890 1234',
    email: 'soporte@nextgenhomes.mx',
    deliverables: 'Arreglo solar 3.3 kWp, Home Assistant local, CCTV 4K, APs Wi-Fi 7, Dimmers DALI.',
    raci: { r: 'Programación y Puesta en Marcha', a: 'Autonomía Local 100% sin Nube', c: 'Electricista y Propietario', i: 'CFE' }
  }
];

// ==========================================================================
// 6. DATOS VECTORIALES DE ESPACIOS (BLUEPRINT DATA)
// ==========================================================================
const blueprintData = {
  pb: [
    {
      id: 'recamara-suite-pb',
      name: 'Recámara Suite Principal PB (Habitación Núcleo)',
      tags: ['3.16 x 4.00 m (12.6 m²)', 'Cama King Size', 'Baño en L Privado', 'Cancel 2.85m al Jardín'],
      specs: {
        'Ubicación': 'Crujía Nor-Poniente (X = 3.00m a 6.16m, Y = -1.05m a -5.05m)',
        'Equipamiento': 'Cama King Size (2.00 x 2.00 m), 2 burós de noche, cancel corredizo de 2.85 m al jardín posterior privado y acceso directo a vestidor y baño en L',
        'Criterio Fase 1': 'Espacio habitable en el mes 6 con piso porcelánico, ventana sellada y contactos inteligentes.'
      }
    },
    {
      id: 'gran-area-social-integrada',
      name: 'Gran Área Social Integrada (Sala + Cocina + Comedor)',
      tags: ['4.66 x 4.75 m (22.2 m²)', 'Techo 3.15m Alto', 'Isla con 3 Bancos', 'Gran Cancel 3.75m'],
      specs: {
        'Ubicación': 'Crujía Sur-Poniente en Nivel -0.15 m (X = 3.00m a 7.66m, Y = -5.05m a -9.80m)',
        'Zonificación': 'Sala de Estar en L (Nor-Poniente), Cocina Integral en Lado Sur con Isla desayunadora y Comedor Familiar de 6 plazas frente al gran cancel de 3.75 m'
      }
    },
    {
      id: 'bano-completo-en-l-y-vestidor',
      name: 'Baño Completo en L + Vestidor Privado PB',
      tags: ['5.72 m² Polígono en L', 'Regadera 1.20x0.90m', 'Clóset 1.50m', 'Ventana Norte'],
      specs: {
        'Ubicación': 'Detrás del Medio Baño y Cuarto de Lavandería (X = 6.16m a 8.67m)',
        'Configuración': 'Brazo Norte con Regadera amplia (1.20x0.90m), WC y Vanity (3.77 m²); Brazo Sur con Clóset Vestidor privado de 1.50 x 1.30 m (1.95 m²)'
      }
    },
    {
      id: 'medio-bano-visitas',
      name: 'Medio Baño de Visitas PB (Alineado a Cochera)',
      tags: ['1.50 x 1.30 m (1.60 m²)', 'Vanity Flotante', 'WC', '1.01m Vestíbulo Libre'],
      specs: {
        'Ubicación': 'Alineado al fin del estacionamiento (X = 7.66m a 9.16m, Y = -2.55m a -3.85m)',
        'Equipamiento': 'Inodoro y lavabo vanity para visitas, dejando 1.01 m libres de vestíbulo frente a la escalera'
      }
    },
    {
      id: 'cuarto-maquinas-y-lavanderia',
      name: 'Cuarto de Lavandería & Cuarto de Máquinas / Rack 12U',
      tags: ['4.00 x 1.50 m (6.00 m²)', 'Rack 12U + Solar', 'Lavadora / Secadora', 'Puertas Alineadas'],
      specs: {
        'Ubicación': 'Crujía Norte Frontal (X = 8.67m a 12.67m, Y = -1.05m a -2.55m)',
        'Equipamiento': 'Lavandería de 3.60 m² con centro de lavado y tarja; Cuarto de Máquinas de 2.40 m² con Rack 12U, Inversor Solar y Filtros UV'
      }
    },
    {
      id: 'escalera-confinada-sin-invasion',
      name: 'Escalera Compensada Confinada (Cero Invasión)',
      tags: ['2.50 x 2.25 m (5.62 m²)', '17 Escalones', 'Desembarco +3.00m', 'Fórmula Blondel'],
      specs: {
        'Ubicación': 'Crujía Nor-Oriente (X = 10.17m a 12.67m, Y = -2.55m a -4.80m)',
        'Diseño': 'Tramo Sur recto (4 escalones), vuelta compensada en abanico este (6 escalones) y tramo Norte recto (6 escalones + llegada 17 a +3.00m en X = 10.17m)'
      }
    },
    {
      id: 'area-estacionamiento-marcada',
      name: 'Estacionamiento / Cochera Techada',
      tags: ['30.28 m² Superficie', 'SUV 4.90m + Compacto', 'Cargador EV 240V', 'Ángulo Recto 90°'],
      specs: {
        'Ubicación': 'Frente a Banqueta Oriente (X = 7.66m a 13.66m Norte / 13.00m Sur)',
        'Capacidad': '2 cajones en batería (SUV 4.90m en lado norte de 6.00m y Compacto en lado sur de 5.34m) con punto de carga para auto eléctrico'
      }
    },
    {
      id: 'jardin-posterior-7x3',
      name: 'Jardín Posterior Privado',
      tags: ['7.00 x 3.00 m (21.0 m²)', 'Jardín Húmedo', 'Cancel Corredizo', 'Privacidad Total'],
      specs: {
        'Ubicación': 'Colindancia Poniente (Y = -5.05m a -9.80m, X = 0 a 3.00m)',
        'Diseño': 'Jardín privado con vegetación de bajo consumo, acceso directo desde la recámara suite y el área social mediante cancel de 2.85m'
      }
    }
  ],
  pa: [
    {
      id: 'habitacion-principal-pa',
      name: 'Habitación Principal Master (Planta Alta)',
      tags: ['3.50 x 3.25 m (11.38 m²)', 'Cama King Size', 'Balcón Frontal 4.75m', 'Conexión Privada'],
      specs: {
        'Ubicación': 'Crujía Sur-Oriente (X = 7.67m a 11.17m, Y = -6.55m a -9.80m)',
        'Equipamiento': 'Cama King Size (2.00 x 2.00 m), 2 burós flotantes, TV 65", cancel hacia el Balcón Frontal y conexión exclusiva con el Pasillo-Clóset'
      }
    },
    {
      id: 'pasillo-closet-master-pa',
      name: 'Pasillo-Clóset Vestidor Master Suite',
      tags: ['1.50 x 2.67 m (4.00 m²)', 'Clóset Empotrado 60cm', 'Única Conexión Privada', 'Muro Sur'],
      specs: {
        'Ubicación': 'Crujía Sur Intermedia (X = 5.00m a 7.67m, Y = -8.30m a -9.80m)',
        'Función': 'Eje privado exclusivo que conecta la Habitación Master con el Baño Principal con clóset empotrado de 60 cm en muro sur'
      }
    },
    {
      id: 'bano-principal-pa',
      name: 'Baño Principal Master Suite (Reorganizado)',
      tags: ['2.00 x 3.25 m (6.50 m²)', 'Regadera Spa 2.0x1.2m', 'Doble Vanity 1.40m', 'WC Privado'],
      specs: {
        'Ubicación': 'Crujía Sur-Poniente (X = 3.00m a 5.00m, Y = -6.55m a -9.80m)',
        'Distribución': 'Entrada única por vestidor, Regadera Spa norte (2.00 x 1.20 m), WC suspendido central y Doble Vanity sur (1.40 m)'
      }
    },
    {
      id: 'family-room-abierto-pa',
      name: 'Family Room Diáfano y Abierto',
      tags: ['2.67 x 2.35 m (6.27 m²)', 'Concepto Abierto', 'Pasillo 90cm Libre', 'Sin Pared Norte'],
      specs: {
        'Ubicación': 'Crujía Central Sur (X = 5.00m a 7.67m, Y = -5.95m a -8.30m)',
        'Cualidades': 'Expandido 60 cm al norte, abierto sin paredes para máxima luminosidad, paso libre continuo de 90 cm'
      }
    },
    {
      id: 'recamara-secundaria-1-pa',
      name: 'Recámara Secundaria 1 (Planta Alta Poniente)',
      tags: ['2.76 x 4.00 m (11.04 m²)', 'Cama Queen Size', 'Escritorio', 'Clóset 60cm'],
      specs: {
        'Ubicación': 'Crujía Nor-Poniente (X = 3.00m a 5.76m, Y = -1.05m a -5.05m)',
        'Equipamiento': 'Cama Queen Size (1.50 x 2.00 m), escritorio de estudio, clóset empotrado y ventana al pasillo norte'
      }
    },
    {
      id: 'recamara-secundaria-2-pa',
      name: 'Recámara Secundaria 2 (Planta Alta Centro-Norte)',
      tags: ['2.76 x 4.00 m (11.04 m²)', 'Cama Queen Size', 'Escritorio', 'Clóset 60cm'],
      specs: {
        'Ubicación': 'Crujía Norte Central (X = 5.76m a 8.52m, Y = -1.05m a -5.05m)',
        'Equipamiento': 'Cama Queen Size (1.50 x 2.00 m), escritorio de estudio, clóset empotrado y ventana al pasillo norte'
      }
    },
    {
      id: 'balcon-frontal-pa',
      name: 'Gran Balcón Frontal (Fachada Este)',
      tags: ['1.50 x 4.75 m (7.13 m²)', 'Deck Exterior', 'Barandal Cristal Templado', 'Sala Lounge'],
      specs: {
        'Ubicación': 'Fachada Este (X = 11.17m a 12.67m, Y = -5.05m a -9.80m)',
        'Cualidades': 'Abarca el ancho del pasillo (1.50m) + crujía sur (3.25m) con acceso directo desde la Recámara Principal y vestíbulo'
      }
    },
    {
      id: 'zinc-fondo-pasillo-pa',
      name: 'Zinc de Servicio (Fondo Pasillo)',
      tags: ['1.50 x 0.60 m (0.90 m²)', 'Tarja Vertedero', 'Mueble Blancos', 'Ventana Ventilación'],
      specs: {
        'Ubicación': 'Remate Poniente del Pasillo (X = 3.00m a 3.60m, Y = -5.05m a -6.55m)',
        'Equipamiento': 'Tarja vertedero para limpieza, mueble de blancos y ventana alta de ventilación cruzada'
      }
    },
    {
      id: 'bano-completo-compartido-pa',
      name: 'Baño Completo Compartido (Recámaras Secundarias)',
      tags: ['4.00 x 1.50 m (6.00 m²)', 'Regadera Spa', 'Vanity 1.20m', 'Sobre Lavandería/Máquinas'],
      specs: {
        'Ubicación': 'Crujía Nor-Oriente (X = 8.67m a 12.67m, Y = -1.05m a -2.55m)',
        'Equipamiento': 'Regadera Spa, WC, Vanity y ducto vertical directo al Rack 12U de Planta Baja'
      }
    }
  ],
  ext: [
    {
      id: 'zona-roof-garden-frontal',
      name: 'Roof Garden Frontal Panorámico con 1/2 Baño Social',
      tags: ['40.5 m² Deck Social', 'Pérgola Sombra', 'Asador Grill & Barra', 'Lounge Firepit'],
      specs: {
        'Ubicación': 'Frente de la casa orientado a la calle (X = 8.52m a 12.67m, Y = -2.55m a -9.80m)',
        'Ventaja': 'Terraza lounge panorámica con vista abierta a la calle sin colindancias laterales molestas, equipada con sala lounge con fogatero, asador de acero inoxidable, tarja, barra y acceso directo al 1/2 baño exclusivo'
      }
    },
    {
      id: 'medio-bano-roof-garden',
      name: 'Medio Baño de Visitas del Roof Garden',
      tags: ['1.65 x 2.25 m (3.71 m²)', 'Vanity & WC Suspendido', 'Alineado a Ducto Hidrosanitario', 'Privacidad Total'],
      specs: {
        'Ubicación': 'Anexo a la Caseta de Escalera (X = 8.52m a 10.17m, Y = -2.55m a -4.80m)',
        'Beneficio': 'Brinda servicio sanitario completo a los invitados y familiares en la azotea sin que nadie tenga que entrar a las recámaras de Planta Alta ni bajar a Planta Baja'
      }
    },
    {
      id: 'caseta-escalera-azotea',
      name: 'Caseta de Salida y Cubo de Escalera Interior',
      tags: ['2.50 x 2.25 m (5.62 m²)', 'Puerta Hermética Exterior', 'Salida Directa al Roof Garden'],
      specs: {
        'Ubicación': 'Crujía Nor-Oriente (X = 10.17m a 12.67m, Y = -2.55m a -4.80m, Cota +6.00m a +8.20m)',
        'Función': 'Salida directa y bajo techo desde la escalera interior al Roof Garden frontal, garantizando seguridad, confort y hermeticidad'
      }
    },
    {
      id: 'monitor-roof-pasillo',
      name: 'Cubierta Sobreelevada (Monitor Roof - Zona Posterior)',
      tags: ['X = 3.00m a 8.52m (5.52m largo)', 'Termina en Hab. Secundarias', 'Nivel +6.70m', 'Celosías Louvers'],
      specs: {
        'Ubicación': 'Eje Central de Azotea sobre el pasillo de recámaras secundarias (X = 3.00m a 8.52m)',
        'Diseño': 'Finaliza exactamente donde terminan las habitaciones secundarias para dejar todo el frente libre para el Roof Garden; provee luz cenital y tiro térmico convectivo'
      }
    },
    {
      id: 'calentador-solar-agua',
      name: 'Calentador Solar de Agua Termosifónico (200 L)',
      tags: ['15 Tubos de Vacío', 'Losa Técnica Norte', 'Ahorro 80% Gas', 'Agua Caliente Sanitaria'],
      specs: {
        'Ubicación': 'Al lado norte de la cubierta sobreelevada (X = 7.00m a 8.50m, Y = -1.05m a -3.00m)',
        'Capacidad': 'Termotanque de acero inoxidable 304 de 200 L con 15 tubos de borosilicato tricapa orientado al Sur a 45°'
      }
    },
    {
      id: 'paneles-solares-norte',
      name: 'Arreglo Fotovoltaico Solar (6 Paneles Tier 1)',
      tags: ['3.3 kWp Potencia', 'Losa Técnica Norte', '6 Módulos de 550W', 'Autosuficiencia'],
      specs: {
        'Ubicación': 'Al lado norte de la cubierta sobreelevada (X = 3.00m a 6.70m, Y = -1.05m a -3.65m)',
        'Producción': '~450 kWh/mes de generación limpia para consumo residencial y carga EV'
      }
    },
    {
      id: 'zona-tecnica-sur',
      name: 'Condensadoras A/C Inverter (Losa Técnica Sur)',
      tags: ['3 Unidades Exteriores', 'Losa Técnica Sur', 'Ocultas de Fachada', 'Anti-vibración'],
      specs: {
        'Ubicación': 'Al lado sur de la cubierta sobreelevada (X = 3.00m a 8.52m, Y = -6.55m a -9.80m)',
        'Ventaja': 'Agrupadas discretamente al sur de la cubierta para no invadir el Roof Garden frontal ni ser visibles desde la calle'
      }
    }
  ]
};

// ==========================================================================
// 7. CRONOGRAMA GANTT DATA (24 SEMANAS FASE 1 + SUBSECUENTES)
// ==========================================================================
const ganttData = [
  { name: '1.1 Gestoría, Licencia & Topografía', phase: 'F1', startW: 1, endW: 4, dur: '4 sem', type: 'critical', contractor: 'DRO & Topógrafo' },
  { name: '1.2 Mecánica de Suelos & Dictamen', phase: 'F1', startW: 2, endW: 3, dur: '2 sem', type: 'critical', contractor: 'Laboratorio' },
  { name: '1.3 Excavación & Cisterna 5kL', phase: 'F1', startW: 5, endW: 7, dur: '3 sem', type: 'critical', contractor: 'Maestro Albañil' },
  { name: '1.4 Cimentación & Zapatas f\'c=250', phase: 'F1', startW: 7, endW: 9, dur: '3 sem', type: 'critical', contractor: 'Maestro Albañil' },
  { name: '1.5 Muros de Carga & Castillos PB', phase: 'F1', startW: 10, endW: 12, dur: '3 sem', type: 'critical', contractor: 'Maestro Albañil' },
  { name: '1.6 Losa Entrepiso PB-PA Colado', phase: 'F1', startW: 13, endW: 15, dur: '3 sem', type: 'critical', contractor: 'Maestro Albañil' },
  { name: '1.7 Muros PA & Losa Azotea (+6.00m)', phase: 'F1', startW: 16, endW: 19, dur: '4 sem', type: 'critical', contractor: 'Maestro Albañil' },
  { name: '1.8 Red Hidráulica PPR & Desagües', phase: 'F1', startW: 18, endW: 20, dur: '3 sem', type: 'standard', contractor: 'Plomero PPR' },
  { name: '1.9 Prueba Hidrostática 10 Bar (24h)', phase: 'F1', startW: 20, endW: 21, dur: '1 sem', type: 'critical', contractor: 'Plomero & DRO' },
  { name: '1.10 Cableado & Tablero QO-24', phase: 'F1', startW: 20, endW: 22, dur: '3 sem', type: 'standard', contractor: 'Electricista' },
  { name: '1.11 Impermeabilización Azotea', phase: 'F1', startW: 22, endW: 23, dur: '2 sem', type: 'critical', contractor: 'Impermeabilizador' },
  { name: '1.12 Aplanados & Pisos PB', phase: 'F1', startW: 22, endW: 24, dur: '3 sem', type: 'standard', contractor: 'Yesero & Pisero' },
  { name: '🔑 HITO FASE 1: Mudanza Mes 6', phase: 'F1', startW: 24, endW: 24, dur: 'Hito', type: 'milestone', contractor: 'Propietario' },
  { name: '2.0 Confort Planta Alta & Cocina', phase: 'F2', startW: 25, endW: 48, dur: '6 meses', type: 'standard', contractor: 'Carpintero & Pisero' },
  { name: '3.0 Roof Garden Frontal & Grill', phase: 'F3', startW: 49, endW: 72, dur: '6 meses', type: 'standard', contractor: 'Deck & Herrero' },
  { name: '4.0 Solar 3.3 kWp & Domótica Pro', phase: 'F4', startW: 73, endW: 96, dur: '6 meses', type: 'standard', contractor: 'NextGen Smart' }
];

// ==========================================================================
// 8. FUNCIONES VECTORIALES SVG DE PLANOS (PB, PA, ROOF)
// ==========================================================================
function getGroundFloorSVG() {
    return `<svg viewBox="0 0 920 580" width="100%" height="560" xmlns="http://www.w3.org/2000/svg" style="font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; background-color: #fafbfc; border-radius: 12px;">
        <defs>
          <!-- Patrones Arquitectónicos -->
          <pattern id="gridPatternPB" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(220, 15%, 92%)" stroke-width="0.75" />
          </pattern>
          <pattern id="gridPatternPB1m" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(220, 20%, 86%)" stroke-width="1" />
          </pattern>
          <linearGradient id="grassBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="hsl(145, 45%, 93%)" />
            <stop offset="100%" stop-color="hsl(145, 45%, 86%)" />
          </linearGradient>
          <linearGradient id="sidewalkBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="hsl(40, 25%, 92%)" />
            <stop offset="100%" stop-color="hsl(40, 25%, 85%)" />
          </linearGradient>
          <linearGradient id="streetBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="hsl(220, 15%, 88%)" />
            <stop offset="100%" stop-color="hsl(220, 15%, 80%)" />
          </linearGradient>
          <linearGradient id="garageFloor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="hsl(215, 25%, 95%)" />
            <stop offset="100%" stop-color="hsl(215, 25%, 88%)" />
          </linearGradient>
          <filter id="wallShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15" />
          </filter>
        </defs>

        <rect width="920" height="580" fill="url(#gridPatternPB)" />
        <rect width="920" height="580" fill="url(#gridPatternPB1m)" />

        <!-- ====================================================================
             1. CALLE ADYACENTE DIRECTA (ORIENTE - 10.30 m)
             ==================================================================== -->
        <g id="calle-acceso-oriente">
          <polygon points="710,60 840,60 790,469 660,469" fill="url(#streetBg)" stroke="hsl(220, 15%, 70%)" stroke-width="1.5" />
          <line x1="775" y1="60" x2="725" y2="469" stroke="#ffffff" stroke-width="2" stroke-dasharray="14,10" opacity="0.7" />
          <text x="765" y="265" text-anchor="middle" font-size="12" font-weight="800" fill="hsl(220, 25%, 30%)" transform="rotate(83, 765, 265)">◄ CALLE DE ACCESO (ORIENTE - 10.30 m) ►</text>
        </g>

        <!-- ====================================================================
             2. LÍMITE PERIMETRAL DEL TERRENO REAL (153.19 m²)
             ==================================================================== -->
        <polygon points="80,60 710,60 660,469 80,462" fill="#ffffff" stroke="hsl(220, 25%, 35%)" stroke-width="2.5" stroke-dasharray="8,5" />
        <polyline points="80,85 105,85 105,60" fill="none" stroke="hsl(0, 80%, 50%)" stroke-width="2" />
        <text x="112" y="80" font-size="11" font-weight="800" fill="hsl(0, 80%, 50%)">90.0°</text>

        <!-- ====================================================================
             3. ESPACIO DE 60cm (ARRIATE) PEGADO A LA CALLE
             ==================================================================== -->
        <g id="arriate-frontal-60cm">
          <polygon points="686,60 710,60 660,469 636,469" fill="hsl(145, 50%, 86%)" stroke="hsl(145, 45%, 65%)" stroke-width="1" />
          <circle cx="696" cy="100" r="5" fill="hsl(145, 55%, 45%)" />
          <circle cx="688" cy="180" r="5" fill="hsl(145, 55%, 45%)" />
          <circle cx="678" cy="260" r="5" fill="hsl(145, 55%, 45%)" />
          <circle cx="668" cy="340" r="5" fill="hsl(145, 55%, 45%)" />
          <circle cx="652" cy="420" r="5" fill="hsl(145, 55%, 45%)" />
          <text x="674" y="275" text-anchor="middle" font-size="6.5" font-weight="800" fill="hsl(145, 70%, 25%)" transform="rotate(83, 674, 275)">ARRIATE: 0.60 m</text>
        </g>

        <!-- ====================================================================
             4. BANQUETA PEATONAL DE 0.90 m
             ==================================================================== -->
        <g id="banqueta-peatonal-90cm">
          <polygon points="650,60 686,60 636,469 600,469" fill="url(#sidewalkBg)" stroke="hsl(40, 25%, 70%)" stroke-width="1" />
          <line x1="677" y1="140" x2="641" y2="140" stroke="hsl(40, 20%, 75%)" stroke-width="0.8" />
          <line x1="667" y1="220" x2="631" y2="220" stroke="hsl(40, 20%, 75%)" stroke-width="0.8" />
          <line x1="657" y1="300" x2="621" y2="300" stroke="hsl(40, 20%, 75%)" stroke-width="0.8" />
          <line x1="647" y1="380" x2="611" y2="380" stroke="hsl(40, 20%, 75%)" stroke-width="0.8" />
          <text x="642" y="275" text-anchor="middle" font-size="7" font-weight="800" fill="hsl(35, 55%, 35%)" transform="rotate(83, 642, 275)">BANQUETA: 0.90 m</text>
        </g>

        <!-- ====================================================================
             5. JARDÍN FRONTAL EN SERVIDUMBRE & PARED FRONTAL A 90° (X = 12.67 m / 586.8 px)
             ==================================================================== -->
        <g id="jardin-frontal-servidumbre">
          <polygon points="586.8,102 650,102 626.6,252 586.8,252" fill="url(#grassBg)" stroke="hsl(145, 50%, 55%)" stroke-width="1.5" />
          <circle cx="620" cy="135" r="12" fill="hsl(145, 50%, 60%)" opacity="0.8" />
          <circle cx="605" cy="180" r="10" fill="hsl(145, 50%, 60%)" opacity="0.8" />
          <circle cx="612" cy="220" r="9" fill="hsl(145, 50%, 60%)" opacity="0.8" />
          <rect x="592" y="146" width="46" height="16" rx="3" fill="#ffffff" stroke="hsl(145, 60%, 40%)" stroke-width="0.8" opacity="0.95" />
          <text x="615" y="157" text-anchor="middle" font-size="6.5" font-weight="900" fill="hsl(145, 75%, 25%)">JARDÍN</text>

          <!-- Pared Frontal a 90° en X = 12.67 m (586.8 px) -->
          <g filter="url(#wallShadow)">
            <line x1="586.8" y1="102" x2="586.8" y2="252" stroke="hsl(220, 25%, 20%)" stroke-width="8" stroke-linecap="square" />
          </g>
          <polyline points="566.8,102 566.8,122 586.8,122" fill="none" stroke="hsl(0, 80%, 50%)" stroke-width="2" />
          <text x="552" y="118" font-size="9" font-weight="800" fill="hsl(0, 80%, 50%)">90.0°</text>
          <circle cx="586.8" cy="102" r="5" fill="hsl(0, 80%, 50%)" stroke="#fff" stroke-width="1.5" />
        </g>

        <!-- ====================================================================
             6. PARED SUR (15 cm)
             ==================================================================== -->
        <g id="pared-sur-block" filter="url(#wallShadow)">
          <line x1="200" y1="463.1" x2="560.3" y2="467.7" stroke="hsl(220, 25%, 20%)" stroke-width="8" stroke-linecap="square" />
          <circle cx="200" cy="463.1" r="5" fill="hsl(200, 85%, 45%)" stroke="#fff" stroke-width="1.5" />
          <circle cx="560.3" cy="467.7" r="5" fill="hsl(0, 75%, 45%)" stroke="#fff" stroke-width="1.5" />
          <rect x="330" y="440" width="140" height="22" rx="5" fill="#ffffff" stroke="hsl(220, 25%, 20%)" stroke-width="1.5" />
          <text x="400" y="455" text-anchor="middle" font-size="10.5" font-weight="800" fill="hsl(220, 25%, 20%)">PARED SUR: 9.01 m</text>
        </g>

        <!-- ====================================================================
             7. PASILLO DE SERVICIO NORTE (1.05 m libre)
             ==================================================================== -->
        <g id="pasillo-servicio-norte">
          <polygon points="200,60 610.3,60 605.2,102 200,102" fill="hsl(220, 15%, 95%)" stroke="hsl(220, 15%, 80%)" stroke-width="1.2" />
          <line x1="200" y1="60" x2="610.3" y2="60" stroke="hsl(220, 25%, 20%)" stroke-width="8" stroke-linecap="square" />
          <line x1="200" y1="102" x2="605.2" y2="102" stroke="hsl(220, 25%, 20%)" stroke-width="8" stroke-linecap="square" />
          <text x="405" y="84" text-anchor="middle" font-size="7.5" font-weight="800" fill="hsl(220, 25%, 40%)">PASILLO DE SERVICIO NORTE (1.05 m libre)</text>
        </g>

        <!-- ====================================================================
             8. JARDÍN PRIVADO POSTERIOR (21.0 m²) & TERRAZA TECHADA (9.0 m²)
             ==================================================================== -->
        <g id="jardin-posterior-7x3">
          <polygon points="80,60 200,60 200,341.6 80,341.6" fill="url(#grassBg)" stroke="hsl(145, 50%, 55%)" stroke-width="1.2" />
          <!-- Cisterna Subterránea 5,000 L -->
          <g id="cisterna-subterranea" transform="translate(95, 80)">
            <rect x="0" y="0" width="36" height="36" rx="4" fill="hsl(200, 50%, 85%)" stroke="hsl(200, 70%, 45%)" stroke-width="1.5" stroke-dasharray="3,2" />
            <circle cx="18" cy="18" r="8" fill="none" stroke="hsl(200, 70%, 45%)" stroke-width="1" />
            <text x="18" y="21" text-anchor="middle" font-size="5.5" font-weight="800" fill="hsl(200, 80%, 30%)">Cisterna 5kL</text>
          </g>
          <!-- Gran Árbol Central -->
          <g id="gran-arbol-central" transform="translate(140, 200)">
            <ellipse cx="4" cy="6" rx="38" ry="38" fill="hsl(220, 25%, 15%)" opacity="0.18" />
            <circle cx="0" cy="0" r="16" fill="hsl(30, 45%, 35%)" stroke="hsl(30, 30%, 20%)" stroke-width="1.2" />
            <circle cx="0" cy="0" r="38" fill="hsl(145, 55%, 38%)" opacity="0.85" />
            <circle cx="-12" cy="-10" r="22" fill="hsl(140, 60%, 45%)" opacity="0.9" />
            <circle cx="14" cy="-8" r="20" fill="hsl(135, 65%, 48%)" opacity="0.9" />
            <circle cx="0" cy="0" r="6" fill="hsl(25, 60%, 25%)" />
            <text x="0" y="4" text-anchor="middle" font-size="5" font-weight="900" fill="#ffffff">ÁRBOL</text>
          </g>
          <rect x="88" y="295" width="104" height="28" rx="4" fill="#ffffff" stroke="hsl(145, 60%, 40%)" stroke-width="1.2" opacity="0.95" />
          <text x="140" y="308" text-anchor="middle" font-size="8.5" font-weight="800" fill="hsl(145, 70%, 25%)">JARDÍN PRIVADO</text>
          <text x="140" y="319" text-anchor="middle" font-size="7" font-weight="700" fill="hsl(145, 50%, 35%)">7.00 m × 3.00 m (21.0 m²)</text>
        </g>

        <!-- Terraza Techada Posterior -->
        <g id="terraza-techada-3x3">
          <rect x="80" y="341.6" width="120" height="120" fill="hsl(35, 35%, 90%)" stroke="hsl(35, 45%, 65%)" stroke-width="1.2" />
          <g id="lounge-terraza" transform="translate(140, 400)">
            <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="hsl(35, 45%, 45%)" stroke-width="1" />
            <circle cx="0" cy="-22" r="7" fill="hsl(220, 25%, 35%)" />
            <circle cx="0" cy="22" r="7" fill="hsl(220, 25%, 35%)" />
            <text x="0" y="3" text-anchor="middle" font-size="5" font-weight="800" fill="hsl(35, 60%, 30%)">Lounge</text>
          </g>
          <rect x="88" y="432" width="104" height="22" rx="3" fill="#ffffff" stroke="hsl(35, 60%, 45%)" stroke-width="0.8" opacity="0.95" />
          <text x="140" y="443" text-anchor="middle" font-size="7.5" font-weight="800" fill="hsl(35, 75%, 30%)">TERRAZA TECHADA</text>
          <text x="140" y="451" text-anchor="middle" font-size="6" font-weight="700" fill="hsl(220, 25%, 40%)">3.00 × 3.00 m (9.0 m²)</text>
        </g>

        <!-- ====================================================================
             9. PARED PONIENTE (Muro Posterior en X = 3.00 m / 200.0 px)
             ==================================================================== -->
        <g id="pared-poniente-block" filter="url(#wallShadow)">
          <line x1="200" y1="102" x2="200" y2="463.1" stroke="hsl(220, 25%, 20%)" stroke-width="8" stroke-linecap="square" />
          <circle cx="200" cy="102" r="5" fill="hsl(0, 80%, 50%)" stroke="#fff" stroke-width="1.5" />
          <polyline points="200,122 220,122 220,102" fill="none" stroke="hsl(0, 80%, 50%)" stroke-width="1.5" />
          <text x="224" y="118" font-size="8" font-weight="800" fill="hsl(0, 80%, 50%)">90.0°</text>
        </g>

        <!-- ====================================================================
             10. RECÁMARA SUITE PB (3.16 m x 4.00 m = 12.64 m² - LLEGA A 4.00 m AL SUR)
                 - Eje X: 3.00 m a 6.16 m (200.0 a 326.6 px) [Largo libre: 3.16 m]
                 - Eje Y: -1.05 m a -5.05 m (102.0 a 262.0 px) [Ancho libre: 4.00 m hacia el sur]
                 - Nivel de Piso Terminado: N.P.T. ±0.00 m
                 - Cama King Size con 2 Burós
                 - Acceso directo a Baño Completo en 'L' y Vestidor Privado
                 - Cancel Corredizo de 2.85 m al Jardín Posterior
             ==================================================================== -->
        <g id="recamara-suite-pb">
          <rect x="200" y="102" width="126.6" height="160" fill="hsl(38, 35%, 96%)" stroke="hsl(38, 30%, 80%)" stroke-width="1" />
          
          <!-- Muros de la Recámara (15 cm) -->
          <g filter="url(#wallShadow)">
            <!-- Muro Sur de la Recámara en Y = 262 px (-5.05 m) - Línea divisoria del desnivel -->
            <line x1="200" y1="262" x2="326.6" y2="262" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
            <!-- Muro Este de la Recámara en X = 326.6 px (6.16 m) -->
            <line x1="326.6" y1="214" x2="326.6" y2="262" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
          </g>

          <!-- Cama King Size -->
          <g id="cama-suite" transform="translate(225, 125)">
            <rect x="0" y="0" width="80" height="8" rx="2" fill="hsl(30, 40%, 45%)" stroke="hsl(30, 50%, 30%)" stroke-width="1" />
            <rect x="4" y="8" width="72" height="72" rx="4" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="1.2" />
            <rect x="8" y="12" width="28" height="18" rx="3" fill="hsl(215, 60%, 92%)" />
            <rect x="44" y="12" width="28" height="18" rx="3" fill="hsl(215, 60%, 92%)" />
            <rect x="4" y="58" width="72" height="22" rx="2" fill="hsl(38, 55%, 85%)" />
            <text x="40" y="55" text-anchor="middle" font-size="7" font-weight="800" fill="hsl(220, 25%, 30%)">CAMA KING SIZE</text>
            <rect x="-18" y="2" width="16" height="16" rx="2" fill="#ffffff" stroke="hsl(30, 40%, 45%)" stroke-width="1" />
            <rect x="82" y="2" width="16" height="16" rx="2" fill="#ffffff" stroke="hsl(30, 40%, 45%)" stroke-width="1" />
          </g>

          <rect x="235" y="246" width="56" height="10" rx="2" fill="hsl(30, 40%, 45%)" />
          <text x="263" y="253" text-anchor="middle" font-size="5" font-weight="700" fill="#ffffff">Mueble TV</text>

          <!-- Puerta Acceso Suite (Nivel ±0.00 m) -->
          <g id="puerta-suite-pb">
            <line x1="326.6" y1="230" x2="310" y2="245" stroke="hsl(38, 85%, 45%)" stroke-width="2" />
            <path d="M 326.6 230 A 18 18 0 0 1 326.6 248" fill="none" stroke="hsl(38, 85%, 45%)" stroke-dasharray="2,2" />
            <text x="295" y="255" font-size="6" font-weight="800" fill="hsl(38, 85%, 35%)">Acceso Suite (±0.00)</text>
          </g>

          <!-- Cancel Corredizo al Jardín (2.85 m) -->
          <line x1="200" y1="130" x2="200" y2="245" stroke="hsl(200, 90%, 55%)" stroke-width="4.5" />
          <text x="206" y="190" font-size="6.5" font-weight="800" fill="hsl(200, 90%, 35%)" transform="rotate(-90 206 190)">CANCEL AL JARDÍN (2.85m)</text>
          
          <rect x="210" y="222" width="105" height="15" rx="3" fill="#ffffff" stroke="hsl(38, 75%, 45%)" stroke-width="0.8" opacity="0.95" />
          <text x="262.5" y="233" text-anchor="middle" font-size="6.5" font-weight="900" fill="hsl(38, 85%, 30%)">RECÁMARA PB (3.16 × 4.00 m)</text>
        </g>

        <!-- ====================================================================
             11. BAÑO COMPLETO EN 'L' EXTENDIDO HASTA LA LAVANDERÍA + VESTIDOR (5.72 m²)
                 - Brazo Norte (Baño Completo): X = 6.16 m a 8.67 m (326.6 a 426.8 px) [2.51 m largo x 1.50 m ancho = 3.77 m²]
                 - Brazo Sur (Vestidor): X = 6.16 m a 7.66 m (326.6 a 386.6 px) [1.50 x 1.30 m = 1.95 m²]
             ==================================================================== -->
        <g id="bano-completo-en-l-y-vestidor">
          <rect x="326.6" y="102" width="100.2" height="60" fill="hsl(205, 30%, 95%)" stroke="hsl(205, 30%, 75%)" stroke-width="1.2" />
          <rect x="326.6" y="162" width="60" height="52" fill="hsl(35, 30%, 94%)" stroke="hsl(35, 30%, 75%)" stroke-width="1.2" />

          <!-- MUROS PERIMETRALES DEL POLÍGONO EN 'L' (15 cm) -->
          <g filter="url(#wallShadow)">
            <line x1="326.6" y1="102" x2="326.6" y2="214" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
            <line x1="326.6" y1="214" x2="386.6" y2="214" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
            <line x1="386.6" y1="162" x2="426.8" y2="162" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
            <line x1="426.8" y1="102" x2="426.8" y2="162" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
          </g>

          <!-- Regadera Amplia (1.20 x 0.90 m) -->
          <g id="regadera-suite" transform="translate(378, 105)">
            <rect x="0" y="0" width="46" height="34" rx="2" fill="hsl(200, 60%, 92%)" stroke="hsl(200, 70%, 50%)" stroke-width="1.2" />
            <circle cx="23" cy="17" r="4" fill="hsl(200, 70%, 65%)" />
            <line x1="0" y1="34" x2="46" y2="34" stroke="hsl(190, 90%, 45%)" stroke-width="2.2" stroke-dasharray="8,2" />
            <text x="23" y="20" text-anchor="middle" font-size="6" font-weight="800" fill="hsl(200, 80%, 30%)">REGADERA (1.20x0.90m)</text>
          </g>

          <!-- Inodoro (WC) Central -->
          <g id="wc-suite" transform="translate(352, 105)">
            <rect x="0" y="0" width="16" height="8" rx="2" fill="#ffffff" stroke="hsl(215, 30%, 50%)" stroke-width="1" />
            <ellipse cx="8" cy="14" rx="5" ry="6" fill="hsl(200, 60%, 92%)" />
            <text x="8" y="25" text-anchor="middle" font-size="5" font-weight="700" fill="hsl(220, 25%, 35%)">WC</text>
          </g>

          <!-- Lavabo Vanity Amplio -->
          <g id="vanity-suite" transform="translate(330, 105)">
            <rect x="0" y="0" width="18" height="30" rx="2" fill="#ffffff" stroke="hsl(215, 45%, 45%)" stroke-width="1.2" />
            <ellipse cx="9" cy="15" rx="6" ry="9" fill="hsl(200, 75%, 90%)" stroke="hsl(200, 60%, 60%)" stroke-width="0.8" />
            <circle cx="5" cy="15" r="1.5" fill="hsl(215, 75%, 45%)" />
            <text x="9" y="38" text-anchor="middle" font-size="5" font-weight="700" fill="hsl(220, 25%, 35%)">Vanity</text>
          </g>

          <!-- Ventana hacia Pasillo de Servicio Norte (80 cm) -->
          <line x1="380" y1="102" x2="410" y2="102" stroke="hsl(200, 90%, 55%)" stroke-width="3.5" />

          <!-- Título Baño Completo -->
          <rect x="340" y="146" width="68" height="13" rx="2" fill="#ffffff" stroke="hsl(205, 45%, 45%)" stroke-width="0.6" opacity="0.95" />
          <text x="374" y="155" text-anchor="middle" font-size="6" font-weight="800" fill="hsl(205, 75%, 35%)">BAÑO COMPLETO (3.8m²)</text>

          <!-- Clóset Empotrado (1.50 x 0.60 m) -->
          <g id="closet-vestidor" transform="translate(360, 164)">
            <rect x="0" y="0" width="24" height="46" rx="2" fill="hsl(30, 35%, 88%)" stroke="hsl(30, 45%, 55%)" stroke-width="1.2" />
            <line x1="12" y1="4" x2="12" y2="42" stroke="hsl(30, 50%, 45%)" stroke-width="1.2" stroke-dasharray="4,2" />
            <text x="12" y="25" text-anchor="middle" font-size="5" font-weight="800" fill="hsl(30, 60%, 35%)">CLÓSET</text>
          </g>

          <!-- Puerta de Acceso al Vestidor desde la Recámara -->
          <g id="puerta-recamara-vestidor">
            <line x1="326.6" y1="195" x2="340" y2="208" stroke="hsl(35, 85%, 45%)" stroke-width="1.6" />
            <path d="M 326.6 195 A 14 14 0 0 1 326.6 209" fill="none" stroke="hsl(35, 85%, 45%)" stroke-dasharray="2,2" />
          </g>
        </g>

        <!-- ====================================================================
             12. MEDIO BAÑO DE VISITAS ALINEADO AL FIN DEL ESTACIONAMIENTO (X = 7.66 m / 386.6 px)
                 - Eje X: 7.66 m a 9.16 m (386.6 a 446.6 px) [Largo: 1.50 m]
                 - Eje Y: -2.55 m a -3.85 m (162.0 a 214.0 px) [Fondo: 1.30 m]
                 - Deja 1.01 m libres entre el Baño y la Escalera (X: 9.16 a 10.17 m)
             ==================================================================== -->
        <g id="medio-bano-visitas">
          <rect x="386.6" y="162" width="60" height="52" fill="hsl(210, 30%, 96%)" stroke="hsl(215, 30%, 75%)" stroke-width="1.2" />

          <!-- MUROS PERIMETRALES DEL MEDIO BAÑO (15 cm) -->
          <g filter="url(#wallShadow)">
            <line x1="386.6" y1="214" x2="446.6" y2="214" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
            <line x1="386.6" y1="162" x2="386.6" y2="214" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
            <line x1="446.6" y1="162" x2="446.6" y2="214" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
          </g>

          <!-- Inodoro (WC) -->
          <g id="wc-medio-bano" transform="translate(394, 164)">
            <rect x="0" y="0" width="16" height="8" rx="2" fill="#ffffff" stroke="hsl(215, 30%, 50%)" stroke-width="1" />
            <ellipse cx="8" cy="14" rx="5" ry="6" fill="hsl(200, 60%, 92%)" />
            <text x="8" y="25" text-anchor="middle" font-size="5" font-weight="700" fill="hsl(220, 25%, 35%)">WC</text>
          </g>

          <!-- Lavamanos Vanity -->
          <g id="vanity-medio-bano" transform="translate(420, 164)">
            <rect x="0" y="0" width="22" height="15" rx="2" fill="#ffffff" stroke="hsl(215, 45%, 45%)" stroke-width="1.2" />
            <ellipse cx="11" cy="7" rx="8" ry="4.5" fill="hsl(200, 75%, 90%)" stroke="hsl(200, 60%, 60%)" stroke-width="0.8" />
            <circle cx="11" cy="4" r="1.5" fill="hsl(215, 75%, 45%)" />
            <text x="11" y="19" text-anchor="middle" font-size="5" font-weight="700" fill="hsl(220, 25%, 35%)">Lavabo</text>
          </g>

          <!-- Puerta del Medio Baño -->
          <g id="puerta-medio-bano">
            <line x1="446.6" y1="190" x2="458" y2="204" stroke="hsl(215, 85%, 45%)" stroke-width="1.6" />
            <path d="M 446.6 190 A 14 14 0 0 1 446.6 204" fill="none" stroke="hsl(215, 85%, 45%)" stroke-dasharray="2,2" />
            <text x="458" y="187" font-size="5.5" font-weight="800" fill="hsl(215, 85%, 35%)">P. 70cm</text>
          </g>

          <!-- Título Medio Baño -->
          <rect x="390" y="198" width="52" height="13" rx="2" fill="#ffffff" stroke="hsl(215, 45%, 45%)" stroke-width="0.6" opacity="0.95" />
          <text x="416" y="207" text-anchor="middle" font-size="5" font-weight="800" fill="hsl(215, 75%, 35%)">1/2 BAÑO (1.6m²)</text>

          <!-- Claro libre de 1.01 m entre Baño y Escalera -->
          <line x1="446.6" y1="180" x2="486.8" y2="180" stroke="hsl(215, 75%, 45%)" stroke-width="1.2" />
          <polyline points="451.6,177 446.6,180 451.6,183" fill="none" stroke="hsl(215, 75%, 45%)" stroke-width="1.2" />
          <polyline points="481.8,177 486.8,180 481.8,183" fill="none" stroke="hsl(215, 75%, 45%)" stroke-width="1.2" />
          <rect x="454" y="174" width="26" height="12" rx="2" fill="#ffffff" stroke="hsl(215, 75%, 45%)" stroke-width="0.6" />
          <text x="467" y="183" text-anchor="middle" font-size="6" font-weight="800" fill="hsl(215, 75%, 35%)">1.01 m</text>
        </g>

        <!-- ====================================================================
             13. CUARTO DE MÁQUINAS & LAVANDERÍA (1.50 m x 4.00 m = 6.00 m² ORIGINAL)
                 - Eje X: 8.67 m a 12.67 m (426.8 a 586.8 px) [Largo total: 4.00 m]
                 - Eje Y: -1.05 m a -2.55 m (102.0 a 162.0 px) [Ancho libre: 1.50 m]
                 - Cuarto de Lavandería: X = 8.67 a 11.07 m (2.40 x 1.50 m = 3.60 m²)
                 - Cuarto de Máquinas & Domótica: X = 11.07 a 12.67 m (1.60 x 1.50 m = 2.40 m²)
             ==================================================================== -->
        <g id="cuarto-maquinas-y-lavanderia">
          <!-- Suelo Lavandería (X: 426.8 a 522.8 px / 2.40 m de largo) -->
          <rect x="426.8" y="102" width="96" height="60" fill="hsl(215, 20%, 94%)" stroke="hsl(215, 30%, 75%)" stroke-width="1.2" />
          
          <!-- Suelo Cuarto de Máquinas (X: 522.8 a 586.8 px / 1.60 m de largo) -->
          <rect x="522.8" y="102" width="64" height="60" fill="hsl(220, 25%, 92%)" stroke="hsl(220, 30%, 70%)" stroke-width="1.2" />

          <!-- MUROS PERIMETRALES E INTERNOS DEL MÓDULO (15 cm) -->
          <g filter="url(#wallShadow)">
            <!-- Muro Sur del Módulo (Largo 4.00 m en Y = 162 px / -2.55 m) -->
            <line x1="426.8" y1="162" x2="586.8" y2="162" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
            <!-- Muro Oeste de Cierre de la Lavandería (en X = 426.8 px / 8.67 m) -->
            <line x1="426.8" y1="102" x2="426.8" y2="162" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
            <!-- Muro Divisorio Interno (en X = 522.8 px / 11.07 m) -->
            <line x1="522.8" y1="102" x2="522.8" y2="162" stroke="hsl(220, 25%, 20%)" stroke-width="5" stroke-dasharray="28,18,14" />
          </g>

          <!-- Centro de Lavado -->
          <g id="centro-lavado" transform="translate(432, 105)">
            <rect x="0" y="0" width="26" height="26" rx="3" fill="#ffffff" stroke="hsl(215, 45%, 45%)" stroke-width="1.2" />
            <circle cx="13" cy="13" r="8" fill="none" stroke="hsl(215, 65%, 55%)" stroke-width="1.2" />
            <circle cx="13" cy="13" r="5" fill="hsl(200, 75%, 85%)" />
            <text x="13" y="29" text-anchor="middle" font-size="5.5" font-weight="700" fill="hsl(220, 25%, 35%)">Lav.</text>

            <rect x="28" y="0" width="26" height="26" rx="3" fill="#ffffff" stroke="hsl(25, 65%, 45%)" stroke-width="1.2" />
            <circle cx="41" cy="13" r="8" fill="none" stroke="hsl(25, 75%, 55%)" stroke-width="1.2" />
            <circle cx="41" cy="13" r="5" fill="hsl(35, 85%, 85%)" />
            <text x="41" y="29" text-anchor="middle" font-size="5.5" font-weight="700" fill="hsl(220, 25%, 35%)">Sec.</text>
          </g>

          <!-- Tarja de Servicio -->
          <rect x="492" y="105" width="20" height="20" rx="2" fill="#ffffff" stroke="hsl(200, 60%, 45%)" stroke-width="1.2" />
          <rect x="495" y="108" width="14" height="14" rx="2" fill="hsl(200, 65%, 90%)" />
          <text x="502" y="132" text-anchor="middle" font-size="5.5" font-weight="700" fill="hsl(220, 25%, 35%)">Tarja</text>

          <!-- Puerta Exterior de Servicio al Pasillo Norte -->
          <g id="puerta-servicio-norte">
            <line x1="495" y1="102" x2="513" y2="92" stroke="hsl(150, 70%, 35%)" stroke-width="1.6" />
            <path d="M 495 102 A 18 18 0 0 1 513 102" fill="none" stroke="hsl(150, 70%, 40%)" stroke-dasharray="2,2" />
            <text x="504" y="90" text-anchor="middle" font-size="6" font-weight="800" fill="hsl(150, 70%, 30%)">P. Pasillo Norte</text>
          </g>

          <!-- Puerta Interior Lavandería (bajo escalera) -->
          <g id="puerta-interior-lavanderia">
            <line x1="495" y1="162" x2="513" y2="174" stroke="hsl(215, 85%, 45%)" stroke-width="1.6" />
            <path d="M 495 162 A 18 18 0 0 0 513 162" fill="none" stroke="hsl(215, 85%, 45%)" stroke-dasharray="2,2" />
            <text x="504" y="174" text-anchor="middle" font-size="5.5" font-weight="800" fill="hsl(215, 85%, 40%)">P. Bajo Escalera</text>
          </g>

          <!-- Flecha de Ventilación Cruzada Directa -->
          <line x1="504" y1="168" x2="504" y2="96" stroke="hsl(200, 85%, 45%)" stroke-width="1.2" stroke-dasharray="3,3" />
          <polyline points="501,100 504,96 507,100" fill="none" stroke="hsl(200, 85%, 45%)" stroke-width="1.2" />

          <!-- Título Lavandería -->
          <rect x="435" y="142" width="68" height="14" rx="2" fill="#ffffff" stroke="hsl(215, 45%, 45%)" stroke-width="0.6" opacity="0.95" />
          <text x="469" y="152" text-anchor="middle" font-size="6.5" font-weight="800" fill="hsl(215, 75%, 35%)">LAVANDERÍA (3.6m²)</text>

          <!-- Rack Domótico 12U/15U -->
          <rect x="556" y="106" width="24" height="24" rx="2" fill="hsl(220, 25%, 25%)" stroke="hsl(215, 85%, 55%)" stroke-width="1.2" />
          <rect x="559" y="109" width="18" height="18" fill="hsl(220, 20%, 35%)" />
          <circle cx="562" cy="112" r="1.5" fill="hsl(150, 80%, 50%)" /><circle cx="566" cy="112" r="1.5" fill="hsl(200, 80%, 50%)" />
          <text x="568" y="136" text-anchor="middle" font-size="6" font-weight="800" fill="hsl(220, 25%, 25%)">Rack 12U</text>

          <!-- Inversor Solar Híbrido -->
          <rect x="572" y="134" width="12" height="22" rx="2" fill="hsl(45, 95%, 50%)" stroke="hsl(35, 90%, 40%)" stroke-width="1.2" />
          <text x="578" y="148" text-anchor="middle" font-size="5" font-weight="800" fill="hsl(35, 90%, 30%)">Solar</text>

          <!-- Tren de Filtros UV -->
          <g id="filtros-agua" transform="translate(528, 140)">
            <circle cx="5" cy="5" r="4" fill="hsl(200, 80%, 65%)" stroke="hsl(200, 70%, 45%)" stroke-width="1" />
            <circle cx="14" cy="5" r="4" fill="hsl(200, 80%, 50%)" stroke="hsl(200, 70%, 35%)" stroke-width="1" />
            <rect x="21" y="2" width="14" height="6" rx="2" fill="hsl(280, 75%, 65%)" stroke-width="0.8" />
            <text x="16" y="15" text-anchor="middle" font-size="5" font-weight="800" fill="hsl(200, 80%, 30%)">Filtros UV</text>
          </g>

          <!-- Puerta Interior Cuarto de Máquinas -->
          <line x1="535" y1="162" x2="550" y2="175" stroke="hsl(220, 25%, 25%)" stroke-width="1.6" />
          <path d="M 535 162 A 15 15 0 0 0 550 162" fill="none" stroke="hsl(220, 25%, 25%)" stroke-dasharray="2,2" />

          <!-- Título Cuarto de Máquinas -->
          <rect x="526" y="106" width="26" height="30" rx="2" fill="#ffffff" stroke="hsl(220, 25%, 25%)" stroke-width="0.6" opacity="0.9" />
          <text x="539" y="118" text-anchor="middle" font-size="5.5" font-weight="800" fill="hsl(220, 25%, 25%)">RACK</text>
          <text x="539" y="126" text-anchor="middle" font-size="5" font-weight="800" fill="hsl(220, 25%, 25%)">&amp; TEC</text>
          <text x="539" y="133" text-anchor="middle" font-size="4.5" font-weight="800" fill="hsl(220, 25%, 25%)">2.4m²</text>
        </g>

        <!-- ====================================================================
             14. ESCALERA COMPENSADA CONFINADA (2.50 m x 2.25 m = 5.62 m²)
                 - Cuadrante Exclusivo: X = 10.17 m a 12.67 m (486.8 a 586.8 px) [Largo: 2.50 m]
                 - Ancho: Y = -2.55 m a -4.80 m (162.0 a 252.0 px) [Ancho: 2.25 m]
             ==================================================================== -->
        <g id="escalera-confinada-sin-invasion">
          <rect x="486.8" y="162" width="100" height="90" fill="hsl(35, 30%, 94%)" stroke="hsl(35, 30%, 75%)" stroke-width="1.2" />

          <!-- TRAMO 1: ARRANQUE SUR -->
          <g id="escalones-tramo-sur">
            <rect x="502.0" y="210" width="11.2" height="42" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="0.8" />
            <text x="507.6" y="233" text-anchor="middle" font-size="5.5" font-weight="700" fill="hsl(220, 25%, 35%)">1</text>
            <rect x="513.2" y="210" width="11.2" height="42" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="0.8" />
            <text x="518.8" y="233" text-anchor="middle" font-size="5.5" font-weight="700" fill="hsl(220, 25%, 35%)">2</text>
            <rect x="524.4" y="210" width="11.2" height="42" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="0.8" />
            <text x="530.0" y="233" text-anchor="middle" font-size="5.5" font-weight="700" fill="hsl(220, 25%, 35%)">3</text>
            <rect x="535.6" y="210" width="11.2" height="42" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="0.8" />
            <text x="541.2" y="233" text-anchor="middle" font-size="5.5" font-weight="700" fill="hsl(220, 25%, 35%)">4</text>
          </g>

          <!-- VUELTA COMPENSADA -->
          <line x1="546.8" y1="207" x2="558" y2="252" stroke="hsl(220, 20%, 65%)" stroke-width="1" />
          <line x1="546.8" y1="207" x2="586.8" y2="242" stroke="hsl(220, 20%, 65%)" stroke-width="1" />
          <line x1="546.8" y1="207" x2="586.8" y2="218" stroke="hsl(220, 20%, 65%)" stroke-width="1" />
          <line x1="546.8" y1="207" x2="586.8" y2="194" stroke="hsl(220, 20%, 65%)" stroke-width="1" />
          <line x1="546.8" y1="207" x2="586.8" y2="170" stroke="hsl(220, 20%, 65%)" stroke-width="1" />
          <line x1="546.8" y1="207" x2="558" y2="162" stroke="hsl(220, 20%, 65%)" stroke-width="1" />

          <text x="552" y="246" font-size="5" font-weight="800" fill="hsl(25, 85%, 45%)">5</text>
          <text x="578" y="247" font-size="5" font-weight="800" fill="hsl(25, 85%, 45%)">6</text>
          <text x="580" y="226" font-size="5" font-weight="800" fill="hsl(25, 85%, 45%)">7</text>
          <text x="580" y="202" font-size="5" font-weight="800" fill="hsl(25, 85%, 45%)">8</text>
          <text x="580" y="178" font-size="5" font-weight="800" fill="hsl(25, 85%, 45%)">9</text>
          <text x="552" y="170" font-size="5" font-weight="800" fill="hsl(25, 85%, 45%)">10</text>

          <!-- TRAMO 2: SUBIDA A PLANTA ALTA -->
          <g id="escalones-tramo-norte">
            <rect x="535.6" y="162" width="11.2" height="42" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="0.8" />
            <text x="541.2" y="185" text-anchor="middle" font-size="5.5" font-weight="700" fill="hsl(220, 25%, 35%)">11</text>
            <rect x="524.4" y="162" width="11.2" height="42" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="0.8" />
            <text x="530.0" y="185" text-anchor="middle" font-size="5.5" font-weight="700" fill="hsl(220, 25%, 35%)">12</text>
            <rect x="513.2" y="162" width="11.2" height="42" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="0.8" />
            <text x="518.8" y="185" text-anchor="middle" font-size="5.5" font-weight="700" fill="hsl(220, 25%, 35%)">13</text>
            <rect x="502.0" y="162" width="11.2" height="42" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="0.8" />
            <text x="507.6" y="185" text-anchor="middle" font-size="5.5" font-weight="700" fill="hsl(220, 25%, 35%)">14</text>
            <rect x="490.8" y="162" width="11.2" height="42" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="0.8" />
            <text x="496.4" y="185" text-anchor="middle" font-size="5.5" font-weight="700" fill="hsl(220, 25%, 35%)">15</text>
            <rect x="486.8" y="162" width="4.0" height="42" fill="hsl(35, 55%, 85%)" stroke="hsl(220, 20%, 65%)" stroke-width="0.8" />
            <text x="488.8" y="185" text-anchor="middle" font-size="4" font-weight="800" fill="hsl(25, 85%, 40%)">17</text>
          </g>

          <line x1="546.8" y1="207" x2="486.8" y2="207" stroke="hsl(220, 25%, 20%)" stroke-width="3" stroke-linecap="round" />
          <path d="M 504 231 L 565 231 Q 582 231 582 207 Q 582 183 565 183 L 488 183" fill="none" stroke="hsl(25, 95%, 45%)" stroke-width="1.8" stroke-linecap="round" />
          <polygon points="488,180 482,183 488,186" fill="hsl(25, 95%, 45%)" />
          <text x="515" y="198" font-size="6" font-weight="800" fill="hsl(25, 95%, 45%)">SUBE A P.A.</text>

          <rect x="492" y="215" width="60" height="13" rx="2" fill="#ffffff" stroke="hsl(25, 75%, 45%)" stroke-width="0.6" opacity="0.95" />
          <text x="522" y="224" text-anchor="middle" font-size="5.5" font-weight="800" fill="hsl(25, 85%, 40%)">ESCALERA (2.50m)</text>
        </g>

        <!-- ====================================================================
             15. PASILLO QUEBRADO & ESCALÓN DE DESNIVEL (-15 cm)
             ==================================================================== -->
        <g id="pasillo-desnivel">
          <polygon points="326.6,214 386.6,214 386.6,262 326.6,262" fill="hsl(215, 20%, 96%)" />
          <!-- Línea y Escalón de Desnivel en Y = 262 px (-5.05 m) -->
          <line x1="326.6" y1="262" x2="386.6" y2="262" stroke="hsl(25, 95%, 45%)" stroke-width="2.5" />
          <line x1="326.6" y1="265" x2="386.6" y2="265" stroke="hsl(45, 95%, 55%)" stroke-width="1.5" stroke-dasharray="3,2" />
          <rect x="330" y="270" width="65" height="14" rx="2" fill="#ffffff" stroke="hsl(25, 95%, 45%)" stroke-width="0.6" opacity="0.95" />
          <text x="362.5" y="279.5" text-anchor="middle" font-size="5" font-weight="900" fill="hsl(25, 95%, 40%)">BAJA 1 ESCALÓN (-15cm)</text>
        </g>

        <!-- ====================================================================
             16. GRAN ÁREA SOCIAL INTEGRADA (22.15 m² a Nivel -0.15 m)
             ==================================================================== -->
        <g id="gran-area-social-integrada">
          <rect x="200" y="262" width="186.6" height="190" fill="hsl(210, 25%, 98%)" stroke="hsl(215, 30%, 85%)" stroke-width="1.2" />

          <!-- Sala de Estar al Norte (pegada al muro de la recámara) -->
          <g id="sala-estar" transform="translate(210, 270)">
            <path d="M 0 0 L 70 0 L 70 18 L 18 18 L 18 55 L 0 55 Z" fill="hsl(215, 30%, 82%)" stroke="hsl(215, 35%, 50%)" stroke-width="1.2" />
            <rect x="26" y="24" width="34" height="20" rx="2" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="1" />
            <text x="43" y="12" text-anchor="middle" font-size="6.5" font-weight="800" fill="hsl(215, 65%, 35%)">SALA DE ESTAR</text>
          </g>

          <!-- Cocina Integral en Lado Sur -->
          <g id="cocina-sur" transform="translate(305, 426)">
            <rect x="0" y="0" width="81.6" height="24" rx="2" fill="hsl(220, 20%, 30%)" />
            <rect x="12" y="4" width="24" height="16" rx="2" fill="#111111" />
            <rect x="48" y="4" width="26" height="16" rx="2" fill="hsl(200, 60%, 85%)" />
            <text x="61" y="22" text-anchor="middle" font-size="4.5" font-weight="700" fill="#ffffff">Tarja</text>
          </g>

          <!-- Isla Central -->
          <g id="isla-sur" transform="translate(310, 365)">
            <rect x="0" y="0" width="72" height="34" rx="3" fill="hsl(215, 25%, 90%)" stroke="hsl(220, 25%, 40%)" stroke-width="1.2" />
            <circle cx="15" cy="-6" r="4.5" fill="hsl(30, 40%, 45%)" />
            <circle cx="36" cy="-6" r="4.5" fill="hsl(30, 40%, 45%)" />
            <circle cx="57" cy="-6" r="4.5" fill="hsl(30, 40%, 45%)" />
            <text x="36" y="20" text-anchor="middle" font-size="6.5" font-weight="800" fill="hsl(220, 25%, 35%)">ISLA / COCINA</text>
          </g>

          <!-- Comedor Familiar -->
          <g id="comedor-sur-poniente" transform="translate(215, 365)">
            <rect x="0" y="0" width="62" height="36" rx="3" fill="hsl(30, 35%, 85%)" stroke="hsl(30, 45%, 45%)" stroke-width="1.2" />
            <text x="31" y="21" text-anchor="middle" font-size="6.5" font-weight="800" fill="hsl(30, 55%, 30%)">COMEDOR</text>
          </g>

          <!-- Gran Cancel Corredizo al Jardín (3.75 m) -->
          <line x1="200" y1="275" x2="200" y2="435" stroke="hsl(200, 90%, 55%)" stroke-width="5" />
          <text x="206" y="355" font-size="7" font-weight="800" fill="hsl(200, 90%, 35%)" transform="rotate(-90 206 355)">GRAN CANCEL AL JARDÍN (3.75 m)</text>
          <rect x="235" y="438" width="120" height="15" rx="3" fill="#ffffff" stroke="hsl(215, 75%, 45%)" stroke-width="0.8" opacity="0.95" />
          <text x="295" y="449" text-anchor="middle" font-size="7" font-weight="900" fill="hsl(215, 85%, 30%)">GRAN ÁREA SOCIAL (22.2 m² a -0.15m)</text>
        </g>

        <!-- ====================================================================
             17. ESTACIONAMIENTO / COCHERA TECHADA (30.28 m²)
             ==================================================================== -->
        <g id="area-estacionamiento-marcada">
          <polygon points="386.6,252 626.6,252 600,468.2 386.6,465.5" fill="url(#garageFloor)" stroke="hsl(215, 85%, 45%)" stroke-width="2.5" />
          <text x="505" y="280" text-anchor="middle" font-size="11" font-weight="800" fill="hsl(215, 85%, 35%)">ESTACIONAMIENTO: 30.28 m²</text>

          <!-- SUV 4.90m -->
          <g id="car-suv" transform="translate(398, 298)">
            <rect x="0" y="0" width="195" height="72" rx="10" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="1.5" />
            <text x="110" y="41" text-anchor="middle" font-size="9.5" font-weight="800" fill="hsl(220, 25%, 35%)">1. SUV Grande (4.90 m)</text>
          </g>

          <!-- Compacto 4.20m -->
          <g id="car-compact" transform="translate(398, 376)">
            <rect x="0" y="0" width="168" height="66" rx="9" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="1.5" />
            <text x="95" y="38" text-anchor="middle" font-size="9" font-weight="800" fill="hsl(220, 25%, 35%)">2. Compacto (4.20 m)</text>
          </g>

          <!-- Punto EV 240V -->
          <circle cx="395" cy="445" r="6" fill="hsl(150, 70%, 40%)" stroke="#fff" stroke-width="1.5" />
          <text x="408" y="448" font-size="7" font-weight="800" fill="hsl(150, 70%, 30%)">Punto EV 240V</text>
        </g>

        <!-- ====================================================================
             18. COTAS EXTERIORES
             ==================================================================== -->
        <rect x="350" y="38" width="130" height="20" rx="10" fill="#ffffff" stroke="hsl(215, 85%, 45%)" />
        <text x="415" y="52" text-anchor="middle" font-size="10.5" font-weight="800" fill="hsl(215, 85%, 45%)">LADO NORTE: 15.74 m</text>

        <rect x="675" y="245" width="145" height="20" rx="10" fill="#ffffff" stroke="hsl(0, 75%, 45%)" transform="rotate(83, 747, 255)" />
        <text x="747" y="259" text-anchor="middle" font-size="10" font-weight="800" fill="hsl(0, 75%, 45%)" transform="rotate(83, 747, 259)">CALLE (ORIENTE): 10.30 m</text>

        <rect x="330" y="475" width="130" height="20" rx="10" fill="#ffffff" stroke="hsl(215, 85%, 45%)" />
        <text x="395" y="489" text-anchor="middle" font-size="10.5" font-weight="800" fill="hsl(215, 85%, 45%)">LADO SUR: 14.49 m</text>

        <rect x="15" y="250" width="130" height="20" rx="10" fill="#ffffff" stroke="hsl(220, 25%, 35%)" transform="rotate(-90, 80, 260)" />
        <text x="80" y="264" text-anchor="middle" font-size="10.5" font-weight="800" fill="hsl(220, 25%, 35%)" transform="rotate(-90, 80, 264)">FONDO (PONIENTE): 10.04 m</text>

        <!-- Rosa de los Vientos -->
        <g transform="translate(860, 50)">
          <circle cx="0" cy="0" r="22" fill="#ffffff" stroke="hsl(220, 15%, 80%)" stroke-width="1.5" filter="url(#wallShadow)" />
          <path d="M0 -14 L3 0 L0 3 L-3 0 Z" fill="hsl(0, 80%, 50%)" />
          <path d="M0 14 L3 0 L0 -3 L-3 0 Z" fill="hsl(220, 20%, 65%)" />
          <path d="M14 0 L0 3 L-3 0 L0 -3 Z" fill="hsl(215, 85%, 45%)" />
          <path d="M-14 0 L0 3 L3 0 L0 -3 Z" fill="hsl(220, 20%, 65%)" />
          <text x="0" y="-16" text-anchor="middle" font-size="8.5" font-weight="800" fill="hsl(0, 80%, 50%)">N</text>
          <text x="18" y="3" text-anchor="start" font-size="8.5" font-weight="800" fill="hsl(215, 85%, 45%)">E</text>
          <text x="0" y="22" text-anchor="middle" font-size="7.5" font-weight="800" fill="hsl(220, 20%, 50%)">S</text>
          <text x="-18" y="3" text-anchor="end" font-size="7.5" font-weight="800" fill="hsl(220, 20%, 50%)">O</text>
        </g>
      </svg>`;
  }

function getUpperFloorSVG() {
    return `<svg viewBox="0 0 880 580" width="100%" height="560" xmlns="http://www.w3.org/2000/svg" style="font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; background-color: #fafbfc; border-radius: 12px;">
        <defs>
          <pattern id="gridPatternPA" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(220, 15%, 92%)" stroke-width="0.75" />
          </pattern>
          <pattern id="gridPattern1m" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(220, 20%, 86%)" stroke-width="1" />
          </pattern>
          <linearGradient id="grassBgPA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="hsl(145, 45%, 95%)" />
            <stop offset="100%" stop-color="hsl(145, 45%, 90%)" />
          </linearGradient>
          <linearGradient id="terraceDeckPA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="hsl(35, 40%, 93%)" />
            <stop offset="100%" stop-color="hsl(35, 40%, 86%)" />
          </linearGradient>
          <filter id="wallShadowPA" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15" />
          </filter>
        </defs>

        <rect width="880" height="580" fill="url(#gridPatternPA)" />
        <rect width="880" height="580" fill="url(#gridPattern1m)" />

        <!-- 1. REFERENCIA DEL LÍMITE PERIMETRAL DEL TERRENO -->
        <polygon points="80,60 710,60 660,469 80,462" fill="none" stroke="hsl(220, 20%, 75%)" stroke-width="1.8" stroke-dasharray="6,4" opacity="0.6" />

        <!-- 2. REFERENCIAS SUBYACENTES DE PLANTA BAJA -->
        <g id="jardin-inferior-pa" opacity="0.45">
          <polygon points="80,60 200,60 200,341.6 80,341.6" fill="url(#grassBgPA)" stroke="hsl(145, 40%, 70%)" stroke-width="1" stroke-dasharray="4,3" />
          <circle cx="140" cy="200" r="38" fill="hsl(145, 50%, 55%)" opacity="0.35" />
          <circle cx="140" cy="200" r="14" fill="hsl(30, 40%, 45%)" opacity="0.45" />
          <text x="140" y="204" text-anchor="middle" font-size="6" font-weight="800" fill="hsl(145, 60%, 25%)">ÁRBOL (PB)</text>
          <text x="140" y="280" text-anchor="middle" font-size="7.5" font-weight="700" fill="hsl(145, 60%, 35%)">JARDÍN POSTERIOR (PB)</text>
        </g>

        <g id="terraza-inferior-pa" opacity="0.4">
          <rect x="80" y="341.6" width="120" height="120" fill="hsl(35, 30%, 93%)" stroke="hsl(35, 30%, 70%)" stroke-width="1" stroke-dasharray="4,3" />
          <text x="140" y="405" text-anchor="middle" font-size="7.5" font-weight="700" fill="hsl(35, 50%, 35%)">TERRAZA (PB)</text>
        </g>

        <polygon points="200,60 610.3,60 605.2,102 200,102" fill="hsl(220, 15%, 95%)" stroke="hsl(220, 15%, 80%)" stroke-width="1" stroke-dasharray="4,3" opacity="0.4" />
        <text x="380" y="85" text-anchor="middle" font-size="7.5" font-weight="700" fill="hsl(220, 25%, 45%)">PASILLO DE SERVICIO NORTE INFERIOR (1.05 m libre)</text>

        <polygon points="386.6,252 586.8,252 560.3,467.7 386.6,465.5" fill="hsl(220, 20%, 96%)" stroke="hsl(220, 20%, 75%)" stroke-width="1" stroke-dasharray="4,3" opacity="0.35" />
        <text x="480" y="460" text-anchor="middle" font-size="7" font-weight="700" fill="hsl(220, 25%, 45%)">PROYECCIÓN COCHERA TECHADA (PB)</text>

        <!-- 3. LOSA GENERAL Y MUROS EXTERIORES DE PLANTA ALTA (9.67 m x 8.75 m) -->
        <rect x="200" y="102" width="386.8" height="350" fill="#ffffff" stroke="hsl(215, 30%, 75%)" stroke-width="1.5" />

        <g id="muros-perimetrales-pa" filter="url(#wallShadowPA)">
          <line x1="200" y1="102" x2="586.8" y2="102" stroke="hsl(220, 25%, 20%)" stroke-width="8" stroke-linecap="square" />
          <line x1="200" y1="102" x2="200" y2="452" stroke="hsl(220, 25%, 20%)" stroke-width="8" stroke-linecap="square" />
          <line x1="200" y1="452" x2="526.8" y2="452" stroke="hsl(220, 25%, 20%)" stroke-width="8" stroke-linecap="square" />
          <line x1="586.8" y1="102" x2="586.8" y2="252" stroke="hsl(220, 25%, 20%)" stroke-width="8" stroke-linecap="square" />
        </g>

        <!-- 4. BAÑO COMPLETO COMPARTIDO (4.00 m x 1.50 m = 6.00 m²) -->
        <g id="bano-completo-compartido-pa">
          <rect x="426.8" y="102" width="160" height="60" fill="hsl(200, 30%, 96%)" stroke="hsl(200, 30%, 80%)" stroke-width="1.2" />

          <g filter="url(#wallShadowPA)">
            <line x1="426.8" y1="102" x2="426.8" y2="162" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
            <line x1="426.8" y1="162" x2="586.8" y2="162" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
          </g>

          <g id="regadera-compartida-pa" transform="translate(530, 105)">
            <rect x="0" y="0" width="54" height="54" rx="2" fill="hsl(200, 45%, 90%)" stroke="hsl(200, 60%, 55%)" stroke-width="1" />
            <circle cx="27" cy="27" r="4" fill="hsl(200, 75%, 45%)" />
            <line x1="0" y1="0" x2="0" y2="54" stroke="hsl(200, 90%, 50%)" stroke-width="2.5" />
            <text x="27" y="49" text-anchor="middle" font-size="4.5" font-weight="800" fill="hsl(200, 75%, 30%)">REGADERA SPA</text>
          </g>

          <g id="wc-compartido-pa" transform="translate(490, 110)">
            <rect x="0" y="0" width="18" height="9" rx="2" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="0.8" />
            <ellipse cx="9" cy="20" rx="8" ry="10" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="0.8" />
            <text x="9" y="22" text-anchor="middle" font-size="5" font-weight="700" fill="hsl(220, 25%, 45%)">WC</text>
          </g>

          <g id="vanity-compartido-pa" transform="translate(440, 108)">
            <rect x="0" y="0" width="45" height="20" rx="2" fill="#ffffff" stroke="hsl(200, 50%, 65%)" stroke-width="1" />
            <ellipse cx="22.5" cy="10" rx="14" ry="6.5" fill="hsl(200, 60%, 94%)" stroke="hsl(200, 60%, 50%)" stroke-width="0.8" />
            <text x="22.5" y="26" text-anchor="middle" font-size="4" font-weight="800" fill="hsl(200, 75%, 35%)">LAVABO</text>
          </g>

          <g id="closet-toallas-pa" transform="translate(427, 134)">
            <rect x="0" y="0" width="18" height="25" rx="1.5" fill="hsl(30, 35%, 85%)" stroke="hsl(30, 45%, 55%)" stroke-width="0.8" />
            <text x="9" y="23" text-anchor="middle" font-size="3" font-weight="900" fill="hsl(30, 60%, 25%)">DUCTO</text>
          </g>

          <g id="puerta-bano-compartido-pa">
            <line x1="450" y1="162" x2="465" y2="148" stroke="hsl(200, 85%, 45%)" stroke-width="2" />
            <path d="M 450 162 A 16 16 0 0 1 466 162" fill="none" stroke="hsl(200, 85%, 45%)" stroke-dasharray="2,2" />
          </g>

          <text x="512.5" y="156" text-anchor="middle" font-size="5.5" font-weight="900" fill="hsl(200, 85%, 30%)">BAÑO COMPARTIDO (6.0 m²)</text>
        </g>

        <!-- 5. RECÁMARAS SECUNDARIAS 1 Y 2 (2.76 m x 4.00 m = 11.04 m² c/u) -->
        <g id="muros-recamaras-secundarias" filter="url(#wallShadowPA)">
          <line x1="200" y1="262" x2="278.4" y2="262" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
          <line x1="348.4" y1="262" x2="426.8" y2="262" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
          <line x1="313.4" y1="102" x2="313.4" y2="262" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
        </g>

        <!-- RECÁMARA 1 -->
        <g id="recamara-secundaria-1-pa">
          <rect x="200" y="102" width="110.4" height="160" fill="hsl(38, 35%, 97%)" stroke="hsl(38, 30%, 82%)" stroke-width="1" />
          <g id="cama-rec1-pa" transform="translate(225, 110)">
            <rect x="0" y="0" width="60" height="8" rx="2" fill="hsl(30, 40%, 45%)" />
            <rect x="3" y="8" width="54" height="62" rx="3" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="1" />
            <rect x="6" y="12" width="18" height="14" rx="2" fill="hsl(215, 60%, 92%)" />
            <rect x="36" y="12" width="18" height="14" rx="2" fill="hsl(215, 60%, 92%)" />
            <rect x="3" y="50" width="54" height="20" rx="2" fill="hsl(145, 45%, 85%)" />
            <text x="30" y="46" text-anchor="middle" font-size="5.5" font-weight="800" fill="hsl(220, 25%, 35%)">CAMA QUEEN</text>
          </g>
          <g id="escritorio-rec1-pa" transform="translate(205, 185)">
            <rect x="0" y="0" width="36" height="18" rx="2" fill="hsl(30, 30%, 85%)" />
            <circle cx="18" cy="24" r="4.5" fill="hsl(220, 20%, 40%)" />
          </g>
          <g id="closet-rec1-pa" transform="translate(205, 238)">
            <rect x="0" y="0" width="70" height="24" rx="2" fill="hsl(30, 35%, 88%)" />
            <text x="35" y="15" text-anchor="middle" font-size="5" font-weight="800" fill="hsl(30, 60%, 35%)">CLÓSET 0.60m</text>
          </g>
          <g id="puerta-rec1-pa">
            <line x1="310.4" y1="262" x2="282" y2="240" stroke="hsl(38, 85%, 45%)" stroke-width="2" />
            <path d="M 310.4 262 A 28 28 0 0 1 282 262" fill="none" stroke="hsl(38, 85%, 45%)" stroke-dasharray="2,2" />
          </g>
          <text x="255" y="225" text-anchor="middle" font-size="6" font-weight="800" fill="hsl(38, 75%, 35%)">RECÁMARA 1 (11.0 m²)</text>
        </g>

        <!-- RECÁMARA 2 -->
        <g id="recamara-secundaria-2-pa">
          <rect x="316.4" y="102" width="110.4" height="160" fill="hsl(38, 35%, 97%)" stroke="hsl(38, 30%, 82%)" stroke-width="1" />
          <g id="cama-rec2-pa" transform="translate(341, 110)">
            <rect x="0" y="0" width="60" height="8" rx="2" fill="hsl(30, 40%, 45%)" />
            <rect x="3" y="8" width="54" height="62" rx="3" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="1" />
            <rect x="6" y="12" width="18" height="14" rx="2" fill="hsl(215, 60%, 92%)" />
            <rect x="36" y="12" width="18" height="14" rx="2" fill="hsl(215, 60%, 92%)" />
            <rect x="3" y="50" width="54" height="20" rx="2" fill="hsl(145, 45%, 85%)" />
            <text x="30" y="46" text-anchor="middle" font-size="5.5" font-weight="800" fill="hsl(220, 25%, 35%)">CAMA QUEEN</text>
          </g>
          <g id="escritorio-rec2-pa" transform="translate(385, 185)">
            <rect x="0" y="0" width="36" height="18" rx="2" fill="hsl(30, 30%, 85%)" />
            <circle cx="18" cy="24" r="4.5" fill="hsl(220, 20%, 40%)" />
          </g>
          <g id="closet-rec2-pa" transform="translate(352, 238)">
            <rect x="0" y="0" width="70" height="24" rx="2" fill="hsl(30, 35%, 88%)" />
            <text x="35" y="15" text-anchor="middle" font-size="5" font-weight="800" fill="hsl(30, 60%, 35%)">CLÓSET 0.60m</text>
          </g>
          <g id="puerta-rec2-pa">
            <line x1="316.4" y1="262" x2="344" y2="240" stroke="hsl(38, 85%, 45%)" stroke-width="2" />
            <path d="M 316.4 262 A 28 28 0 0 1 344 262" fill="none" stroke="hsl(38, 85%, 45%)" stroke-dasharray="2,2" />
          </g>
          <text x="371" y="225" text-anchor="middle" font-size="6" font-weight="800" fill="hsl(38, 75%, 35%)">RECÁMARA 2 (11.0 m²)</text>
        </g>

        <!-- 6. HUECO DE ESCALERA Y LLEGADA -->
        <g id="fijo-hueco-escalera">
          <rect x="486.8" y="162" width="100" height="90" fill="hsl(220, 18%, 93%)" stroke="hsl(220, 25%, 70%)" stroke-width="1.5" />
          <line x1="486.8" y1="252" x2="586.8" y2="252" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
          <line x1="486.8" y1="162" x2="486.8" y2="252" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
          <g id="tramo-norte-llegada-pa">
            <rect x="486.8" y="162" width="24" height="45" fill="hsl(25, 95%, 90%)" stroke="hsl(25, 95%, 45%)" stroke-width="1.2" />
            <text x="498.8" y="185" text-anchor="middle" font-size="6" font-weight="800" fill="hsl(25, 95%, 40%)">17</text>
            <text x="498.8" y="195" text-anchor="middle" font-size="4" font-weight="800" fill="hsl(25, 95%, 40%)">+3.00m</text>
          </g>
          <line x1="486.8" y1="207" x2="586.8" y2="207" stroke="hsl(200, 95%, 45%)" stroke-width="4" />
        </g>

        <!-- 7. PASILLO DE CIRCULACIÓN (1.50 m en extremos y 0.90 m frente al Family Room) -->
        <g id="pasillo-circulacion-pa">
          <rect x="224" y="262" width="56" height="60" fill="hsl(215, 25%, 96%)" />
          <rect x="280" y="262" width="106.8" height="36" fill="hsl(215, 25%, 96%)" />
          <rect x="386.8" y="262" width="140" height="60" fill="hsl(215, 25%, 96%)" />

          <!-- Muros Divisorios del Pasillo -->
          <g filter="url(#wallShadowPA)">
            <line x1="200" y1="322" x2="280" y2="322" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
            <line x1="280" y1="298" x2="280" y2="322" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
            <line x1="386.8" y1="298" x2="386.8" y2="322" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
            <line x1="386.8" y1="322" x2="415" y2="322" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
            <line x1="445" y1="322" x2="526.8" y2="322" stroke="hsl(220, 25%, 20%)" stroke-width="6" stroke-linecap="square" />
          </g>

          <rect x="310" y="266" width="55" height="13" rx="2.5" fill="#ffffff" stroke="hsl(215, 75%, 45%)" stroke-width="0.8" opacity="0.95" />
          <text x="337.5" y="275" text-anchor="middle" font-size="5" font-weight="900" fill="hsl(215, 85%, 35%)">PASILLO 90 cm</text>
        </g>

        <!-- 8. ZINC DE SERVICIO -->
        <g id="zinc-fondo-pasillo-pa">
          <rect x="200" y="262" width="24" height="60" fill="hsl(200, 30%, 93%)" stroke="hsl(200, 40%, 65%)" stroke-width="1.2" />
          <rect x="203" y="266" width="18" height="24" rx="2" fill="#ffffff" stroke="hsl(200, 50%, 55%)" stroke-width="0.8" />
          <circle cx="212" cy="278" r="2.5" fill="hsl(200, 80%, 45%)" />
          <text x="212" y="260" text-anchor="middle" font-size="4.5" font-weight="900" fill="hsl(200, 85%, 30%)">ZINC</text>
        </g>

        <!-- 9. BAÑO PRINCIPAL MASTER -->
        <g id="bano-principal-pa">
          <rect x="200" y="322" width="80" height="130" fill="hsl(210, 30%, 96%)" stroke="hsl(210, 30%, 80%)" stroke-width="1.2" />
          <g id="regadera-master-norte" transform="translate(203, 324)">
            <rect x="0" y="0" width="74" height="46" rx="2" fill="hsl(200, 45%, 90%)" stroke="hsl(200, 60%, 55%)" stroke-width="1" />
            <circle cx="37" cy="23" r="4.5" fill="hsl(200, 75%, 45%)" />
            <line x1="0" y1="46" x2="74" y2="46" stroke="hsl(200, 90%, 50%)" stroke-width="2.5" />
            <text x="37" y="41" text-anchor="middle" font-size="4.5" font-weight="800" fill="hsl(200, 75%, 30%)">REGADERA SPA</text>
          </g>
          <g id="wc-master-centro" transform="translate(205, 375)">
            <rect x="0" y="0" width="16" height="8" rx="2" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="0.8" />
            <ellipse cx="8" cy="16" rx="7.5" ry="9" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="0.8" />
            <text x="8" y="18" text-anchor="middle" font-size="4.5" font-weight="700" fill="hsl(220, 25%, 45%)">WC</text>
          </g>
          <g id="vanity-master-sur" transform="translate(205, 412)">
            <rect x="0" y="0" width="60" height="35" rx="2" fill="#ffffff" stroke="hsl(215, 40%, 55%)" stroke-width="1" />
            <ellipse cx="16" cy="18" rx="9" ry="6.5" fill="hsl(200, 60%, 94%)" />
            <ellipse cx="44" cy="18" rx="9" ry="6.5" fill="hsl(200, 60%, 94%)" />
            <text x="30" y="32" text-anchor="middle" font-size="3.5" font-weight="800" fill="hsl(215, 60%, 35%)">DOBLE LAVABO</text>
          </g>
          <g id="puerta-bano-master-exclusiva">
            <line x1="280" y1="395" x2="262" y2="415" stroke="hsl(210, 85%, 45%)" stroke-width="2.2" />
            <path d="M 280 395 A 22 22 0 0 1 280 417" fill="none" stroke="hsl(210, 85%, 45%)" stroke-dasharray="2,2" />
          </g>
          <text x="240" y="390" text-anchor="middle" font-size="5" font-weight="900" fill="hsl(210, 75%, 35%)" transform="rotate(-90 240 390)">BAÑO MASTER (6.5 m²)</text>
        </g>

        <!-- 10. FAMILY ROOM DIÁFANO -->
        <g id="family-room-abierto-pa">
          <rect x="280" y="298" width="106.8" height="94" fill="hsl(215, 35%, 97%)" stroke="hsl(215, 30%, 82%)" stroke-width="1.2" />
          <g id="sofa-seccional-family" transform="translate(290, 310)">
            <path d="M 0 0 L 80 0 L 80 20 L 22 20 L 22 68 L 0 68 Z" fill="hsl(215, 45%, 82%)" stroke="hsl(215, 45%, 45%)" stroke-width="1.2" />
            <rect x="32" y="30" width="36" height="24" rx="3" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="1" />
            <text x="50" y="45" text-anchor="middle" font-size="4" font-weight="700" fill="hsl(220, 25%, 45%)">Mesa</text>
          </g>
          <g id="tv-family-room" transform="translate(282, 335)">
            <rect x="0" y="0" width="4" height="40" rx="1" fill="hsl(220, 25%, 25%)" />
            <text x="7" y="22" font-size="4" font-weight="800" fill="hsl(215, 85%, 35%)" transform="rotate(90 7 22)">SMART TV</text>
          </g>
          <g transform="translate(333.4, 382)">
            <rect x="-45" y="-9" width="90" height="18" rx="3" fill="#ffffff" stroke="hsl(215, 75%, 45%)" stroke-width="0.8" opacity="0.95" />
            <text x="0" y="0" text-anchor="middle" font-size="5" font-weight="900" fill="hsl(215, 85%, 35%)">FAMILY ROOM ABIERTO</text>
            <text x="0" y="6" text-anchor="middle" font-size="3.8" font-weight="700" fill="hsl(215, 65%, 45%)">2.67 × 2.35 m (6.27 m²)</text>
          </g>
        </g>

        <!-- 11. PASILLO-CLÓSET MASTER -->
        <g id="pasillo-closet-master-pa">
          <rect x="280" y="392" width="106.8" height="60" fill="hsl(35, 25%, 95%)" stroke="hsl(35, 30%, 80%)" stroke-width="1" />
          <g id="closet-sur-vestidor-pa" transform="translate(283, 428)">
            <rect x="0" y="0" width="100.8" height="24" rx="2" fill="hsl(30, 35%, 86%)" stroke="hsl(30, 45%, 50%)" stroke-width="1" />
            <text x="50.4" y="16" text-anchor="middle" font-size="4" font-weight="800" fill="hsl(30, 60%, 30%)">CLÓSET 0.60m</text>
          </g>
          <g id="eje-conector-pasillo-master">
            <line x1="280" y1="410" x2="386.8" y2="410" stroke="hsl(35, 85%, 45%)" stroke-width="1.2" stroke-dasharray="3,2" />
            <text x="333.4" y="407" text-anchor="middle" font-size="3.8" font-weight="900" fill="hsl(35, 80%, 30%)">CONEXIÓN PRIVADA MASTER (1.50 m)</text>
          </g>
          <g id="puerta-vestidor-recamara">
            <line x1="386.8" y1="395" x2="368" y2="415" stroke="hsl(35, 85%, 45%)" stroke-width="2.2" />
            <path d="M 386.8 395 A 22 22 0 0 1 386.8 417" fill="none" stroke="hsl(35, 85%, 45%)" stroke-dasharray="2,2" />
          </g>
        </g>

        <!-- 12. HABITACIÓN PRINCIPAL MASTER -->
        <g id="habitacion-principal-pa">
          <rect x="386.8" y="322" width="140" height="130" fill="hsl(38, 30%, 97%)" stroke="hsl(38, 25%, 85%)" stroke-width="1" />
          <g id="cama-king-master-pa" transform="translate(405, 335)">
            <rect x="0" y="0" width="80" height="8" rx="2" fill="hsl(30, 45%, 40%)" />
            <rect x="4" y="8" width="72" height="68" rx="3" fill="#ffffff" stroke="hsl(220, 20%, 65%)" stroke-width="1.2" />
            <rect x="8" y="12" width="28" height="15" rx="2" fill="hsl(215, 60%, 92%)" />
            <rect x="44" y="12" width="28" height="15" rx="2" fill="hsl(215, 60%, 92%)" />
            <rect x="4" y="56" width="72" height="20" rx="2" fill="hsl(38, 60%, 85%)" />
            <text x="40" y="46" text-anchor="middle" font-size="6.5" font-weight="800" fill="hsl(220, 25%, 35%)">CAMA KING SIZE</text>
          </g>
          <g id="mueble-tv-master-pa" transform="translate(415, 436)">
            <rect x="0" y="0" width="65" height="10" rx="2" fill="hsl(220, 25%, 25%)" />
            <text x="32.5" y="7.5" text-anchor="middle" font-size="4" font-weight="800" fill="#ffffff">TV 65" SMART</text>
          </g>
          <g id="puerta-master-pasillo">
            <line x1="415" y1="322" x2="435" y2="338" stroke="hsl(38, 85%, 45%)" stroke-width="2" />
            <path d="M 415 322 A 20 20 0 0 1 435 322" fill="none" stroke="hsl(38, 85%, 45%)" stroke-dasharray="2,2" />
          </g>
          <line x1="526.8" y1="330" x2="526.8" y2="445" stroke="hsl(200, 95%, 45%)" stroke-width="5" />
          <text x="521" y="390" font-size="5" font-weight="800" fill="hsl(200, 85%, 35%)" transform="rotate(-90 521 390)">CANCEL CORREDIZO</text>
          <rect x="395" y="418" width="105" height="14" rx="2.5" fill="#ffffff" stroke="hsl(30, 60%, 45%)" stroke-width="0.8" opacity="0.95" />
          <text x="447.5" y="428" text-anchor="middle" font-size="6" font-weight="800" fill="hsl(30, 75%, 30%)">RECÁMARA PRINCIPAL (3.5 × 3.25 m)</text>
        </g>

        <!-- 13. GRAN BALCÓN FRONTAL -->
        <g id="balcon-frontal-pa">
          <rect x="526.8" y="262" width="60" height="190" fill="url(#terraceDeckPA)" stroke="hsl(35, 45%, 65%)" stroke-width="1.2" />
          <line x1="526.8" y1="262" x2="526.8" y2="452" stroke="hsl(200, 95%, 45%)" stroke-width="5" />
          <line x1="586.8" y1="252" x2="586.8" y2="452" stroke="hsl(200, 95%, 45%)" stroke-width="4" />
          <line x1="526.8" y1="452" x2="586.8" y2="452" stroke="hsl(200, 95%, 45%)" stroke-width="4" />
          <g id="lounge-balcon-pa" transform="translate(556, 357)">
            <circle cx="0" cy="0" r="12" fill="#ffffff" stroke="hsl(35, 45%, 45%)" stroke-width="1" />
            <circle cx="0" cy="-20" r="6" fill="hsl(220, 25%, 35%)" />
            <circle cx="0" cy="20" r="6" fill="hsl(220, 25%, 35%)" />
            <text x="0" y="3" text-anchor="middle" font-size="4" font-weight="800" fill="hsl(35, 60%, 30%)">Lounge</text>
          </g>
          <rect x="532" y="268" width="50" height="20" rx="3" fill="#ffffff" stroke="hsl(35, 60%, 45%)" stroke-width="0.8" opacity="0.95" />
          <text x="557" y="279" text-anchor="middle" font-size="5.5" font-weight="900" fill="hsl(35, 75%, 30%)">BALCÓN</text>
          <text x="557" y="286" text-anchor="middle" font-size="4" font-weight="800" fill="hsl(220, 25%, 40%)">1.50×4.75m (7.1m²)</text>
        </g>

        <!-- COTAS -->
        <g id="cota-bano-master-x">
          <line x1="200" y1="468" x2="280" y2="468" stroke="hsl(210, 85%, 45%)" stroke-width="1.2" />
          <rect x="215" y="458" width="50" height="18" rx="3" fill="#ffffff" stroke="hsl(210, 85%, 45%)" stroke-width="0.8" />
          <text x="240" y="470" text-anchor="middle" font-size="7.5" font-weight="800" fill="hsl(210, 85%, 35%)">2.00 m</text>
        </g>
        <g id="cota-espacio-intermedio-x">
          <line x1="280" y1="468" x2="386.8" y2="468" stroke="hsl(35, 85%, 45%)" stroke-width="1.2" />
          <rect x="308" y="458" width="50" height="18" rx="3" fill="#ffffff" stroke="hsl(35, 85%, 45%)" stroke-width="0.8" />
          <text x="333" y="470" text-anchor="middle" font-size="7.5" font-weight="800" fill="hsl(35, 85%, 35%)">2.67 m</text>
        </g>
        <g id="cota-master-bed-x">
          <line x1="386.8" y1="468" x2="526.8" y2="468" stroke="hsl(30, 75%, 45%)" stroke-width="1.2" />
          <rect x="431" y="458" width="50" height="18" rx="3" fill="#ffffff" stroke="hsl(30, 75%, 45%)" stroke-width="0.8" />
          <text x="456" y="470" text-anchor="middle" font-size="7.5" font-weight="800" fill="hsl(30, 75%, 35%)">3.50 m</text>
        </g>
        <g id="cota-balcon-x">
          <line x1="526.8" y1="468" x2="586.8" y2="468" stroke="hsl(35, 75%, 45%)" stroke-width="1.2" />
          <rect x="538" y="458" width="40" height="18" rx="3" fill="#ffffff" stroke="hsl(35, 75%, 45%)" stroke-width="0.8" />
          <text x="558" y="470" text-anchor="middle" font-size="7" font-weight="800" fill="hsl(35, 75%, 35%)">1.50 m</text>
        </g>

        <!-- BANNER SUPERIOR -->
        <g id="banner-planta-alta" transform="translate(200, 70)">
          <rect x="0" y="0" width="386.8" height="24" rx="4" fill="hsl(215, 85%, 35%)" />
          <text x="193.4" y="16" text-anchor="middle" font-size="7.5" font-weight="800" fill="#ffffff">PLANTA ALTA (NIVEL +3.00 m) • MASTER SUITE PRIVADA + FAMILY ROOM ABIERTO (6.27 m²)</text>
        </g>

        <!-- Rosa de los Vientos -->
        <g id="rosa-vientos-pa" transform="translate(800, 110)">
          <circle cx="0" cy="0" r="24" fill="#ffffff" stroke="hsl(220, 20%, 75%)" stroke-width="1.2" />
          <polygon points="0,-20 4,-6 0,0 -4,-6" fill="hsl(0, 80%, 50%)" />
          <polygon points="0,20 4,6 0,0 -4,6" fill="hsl(220, 25%, 35%)" />
          <polygon points="20,0 6,4 0,0 6,-4" fill="hsl(215, 85%, 45%)" />
          <polygon points="-20,0 -6,4 0,0 -6,-4" fill="hsl(220, 25%, 35%)" />
          <text x="0" y="-16" text-anchor="middle" font-size="8.5" font-weight="800" fill="hsl(0, 80%, 50%)">N</text>
          <text x="18" y="3" text-anchor="start" font-size="8.5" font-weight="800" fill="hsl(215, 85%, 45%)">E</text>
          <text x="0" y="22" text-anchor="middle" font-size="7.5" font-weight="800" fill="hsl(220, 20%, 50%)">S</text>
          <text x="-18" y="3" text-anchor="end" font-size="7.5" font-weight="800" fill="hsl(220, 20%, 50%)">O</text>
        </g>
      </svg>`;
  }

function getExteriorRoofSVG() {
    return `<svg viewBox="0 0 920 580" width="100%" height="560" xmlns="http://www.w3.org/2000/svg" style="font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; background-color: #fafbfc; border-radius: 12px;">
        <defs>
          <pattern id="gridPatternExt" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(220, 15%, 93%)" stroke-width="0.75" />
          </pattern>
          <pattern id="gridPatternExt1m" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(220, 20%, 88%)" stroke-width="1" />
          </pattern>
          <linearGradient id="roofDeckGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="hsl(35, 45%, 92%)" />
            <stop offset="100%" stop-color="hsl(35, 45%, 85%)" />
          </linearGradient>
          <linearGradient id="techRoofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="hsl(215, 20%, 94%)" />
            <stop offset="100%" stop-color="hsl(215, 20%, 88%)" />
          </linearGradient>
          <linearGradient id="monitorRoofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="hsl(35, 60%, 94%)" />
            <stop offset="100%" stop-color="hsl(35, 60%, 86%)" />
          </linearGradient>
          <filter id="roofShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.15" />
          </filter>
        </defs>

        <rect width="920" height="580" fill="url(#gridPatternExt)" />
        <rect width="920" height="580" fill="url(#gridPatternExt1m)" />

        <!-- Límite Terreno Real -->
        <polygon points="80,60 710,60 660,469 80,462" fill="none" stroke="hsl(220, 20%, 75%)" stroke-width="1.8" stroke-dasharray="6,4" />
        
        <!-- Calle y Banqueta Frontal de Referencia -->
        <polygon points="710,60 840,60 790,469 660,469" fill="hsl(220, 15%, 90%)" stroke="hsl(220, 15%, 80%)" stroke-width="1" opacity="0.5" />
        <polygon points="650,60 710,60 660,469 600,469" fill="hsl(40, 25%, 92%)" stroke="hsl(40, 20%, 80%)" stroke-width="1" opacity="0.6" />

        <!-- ====================================================================
             1. LOSA GENERAL DE AZOTEA (Nivel +6.00 m - 84.6 m²)
             ==================================================================== -->
        <g id="losa-azotea-general" filter="url(#roofShadow)">
          <!-- Zona Técnica Posterior (Poniente: X = 200 a 420.8 px) -->
          <polygon points="200,102 420.8,102 420.8,452 200,452" fill="url(#techRoofGrad)" stroke="hsl(215, 30%, 65%)" stroke-width="1.5" />
          <!-- Zona Social Roof Garden Frontal (Oriente: X = 420.8 a 586.8 px) -->
          <polygon points="420.8,102 586.8,102 586.8,452 420.8,452" fill="url(#roofDeckGrad)" stroke="hsl(35, 45%, 65%)" stroke-width="2" />
          <!-- Pretil Perimetral de Seguridad (1.05 m) -->
          <rect x="200" y="102" width="386.8" height="350" fill="none" stroke="hsl(220, 25%, 25%)" stroke-width="6" />
          <!-- Barandal Frontal de Cristal Templado (Vista abierta a la calle) -->
          <line x1="586.8" y1="102" x2="586.8" y2="452" stroke="hsl(195, 90%, 55%)" stroke-width="5" />
        </g>

        <!-- ====================================================================
             2. CUBIERTA SOBREELEVADA DEL PASILLO (MONITOR ROOF)
                - Termina en habitaciones secundarias (X = 3.00 m a 8.52 m / 200 a 420.8 px)
             ==================================================================== -->
        <g id="monitor-roof-pasillo" filter="url(#roofShadow)">
          <rect x="190" y="254" width="240.8" height="76" rx="6" fill="hsl(35, 40%, 88%)" stroke="hsl(35, 75%, 45%)" stroke-width="1.5" />

          <!-- Celosía Louvers Norte -->
          <g id="louvers-norte">
            <rect x="200" y="256" width="220.8" height="8" fill="hsl(200, 85%, 85%)" stroke="hsl(200, 80%, 45%)" stroke-width="0.8" />
            <text x="310.4" y="262" text-anchor="middle" font-size="4.5" font-weight="800" fill="hsl(200, 85%, 30%)">◄ LOUVERS NORTE (LUZ &amp; VENTILACIÓN CENITAL) ►</text>
          </g>

          <!-- Celosía Louvers Sur -->
          <g id="louvers-sur">
            <rect x="200" y="320" width="220.8" height="8" fill="hsl(200, 85%, 85%)" stroke="hsl(200, 80%, 45%)" stroke-width="0.8" />
            <text x="310.4" y="326" text-anchor="middle" font-size="4.5" font-weight="800" fill="hsl(200, 85%, 30%)">◄ LOUVERS SUR (EXTRACCIÓN TÉRMICA) ►</text>
          </g>

          <!-- Losa Sobreelevada con Alero Volado Protector de Lluvia -->
          <rect x="185" y="260" width="250.8" height="64" rx="4" fill="url(#monitorRoofGrad)" stroke="hsl(35, 85%, 40%)" stroke-width="2" />
          <line x1="185" y1="292" x2="435.8" y2="292" stroke="hsl(35, 60%, 65%)" stroke-width="1" stroke-dasharray="5,3" />

          <rect x="195" y="276" width="230" height="32" rx="4" fill="#ffffff" stroke="hsl(35, 85%, 45%)" stroke-width="1.2" opacity="0.96" />
          <text x="310" y="290" text-anchor="middle" font-size="7" font-weight="900" fill="hsl(35, 90%, 30%)">CUBIERTA SOBREELEVADA (+6.70 m)</text>
          <text x="310" y="302" text-anchor="middle" font-size="5.5" font-weight="700" fill="hsl(220, 25%, 35%)">Linternilla Pasillo PA (Termina en Hab. Secundarias)</text>
        </g>

        <!-- ====================================================================
             3. ZONA TÉCNICA NORTE (Al lado norte de la cubierta sobreelevada)
             ==================================================================== -->
        <g id="zona-tecnica-norte">
          <!-- 6x Paneles Solares Fotovoltaicos -->
          <g id="paneles-solares-norte" transform="translate(208, 112)">
            <rect x="0" y="0" width="132" height="132" rx="3" fill="hsl(215, 80%, 22%)" stroke="hsl(215, 90%, 50%)" stroke-width="1.2" />
            <line x1="44" y1="0" x2="44" y2="132" stroke="#ffffff" stroke-width="0.8" stroke-dasharray="2,2" />
            <line x1="88" y1="0" x2="88" y2="132" stroke="#ffffff" stroke-width="0.8" stroke-dasharray="2,2" />
            <line x1="0" y1="66" x2="132" y2="66" stroke="#ffffff" stroke-width="0.8" stroke-dasharray="2,2" />
            <rect x="10" y="50" width="112" height="28" rx="3" fill="hsl(215, 90%, 15%)" stroke="hsl(215, 90%, 60%)" stroke-width="0.8" />
            <text x="66" y="62" text-anchor="middle" font-size="6" font-weight="900" fill="#ffffff">6x PANELES SOLARES</text>
            <text x="66" y="72" text-anchor="middle" font-size="5" font-weight="700" fill="hsl(45, 95%, 60%)">3.3 kWp Fotovoltaico</text>
          </g>

          <!-- Calentador Solar de Agua (200 L - 15 Tubos al Vacío) -->
          <g id="calentador-solar-agua" transform="translate(348, 115)">
            <rect x="0" y="0" width="62" height="22" rx="5" fill="hsl(210, 15%, 85%)" stroke="hsl(210, 25%, 55%)" stroke-width="1.2" />
            <ellipse cx="6" cy="11" rx="3" ry="8" fill="hsl(200, 70%, 65%)" />
            <ellipse cx="56" cy="11" rx="3" ry="8" fill="hsl(200, 70%, 65%)" />
            <text x="31" y="15" text-anchor="middle" font-size="5.5" font-weight="900" fill="hsl(215, 80%, 30%)">TERMOTANQUE 200L</text>

            <rect x="3" y="24" width="56" height="52" rx="2" fill="hsl(220, 60%, 25%)" stroke="hsl(200, 75%, 45%)" stroke-width="1" />
            <line x1="10" y1="24" x2="10" y2="76" stroke="hsl(190, 80%, 65%)" stroke-width="1.2" />
            <line x1="17" y1="24" x2="17" y2="76" stroke="hsl(190, 80%, 65%)" stroke-width="1.2" />
            <line x1="24" y1="24" x2="24" y2="76" stroke="hsl(190, 80%, 65%)" stroke-width="1.2" />
            <line x1="31" y1="24" x2="31" y2="76" stroke="hsl(190, 80%, 65%)" stroke-width="1.2" />
            <line x1="38" y1="24" x2="38" y2="76" stroke="hsl(190, 80%, 65%)" stroke-width="1.2" />
            <line x1="45" y1="24" x2="45" y2="76" stroke="hsl(190, 80%, 65%)" stroke-width="1.2" />
            <line x1="52" y1="24" x2="52" y2="76" stroke="hsl(190, 80%, 65%)" stroke-width="1.2" />

            <rect x="0" y="80" width="62" height="20" rx="3" fill="#ffffff" stroke="hsl(15, 85%, 50%)" stroke-width="0.8" opacity="0.96" />
            <text x="31" y="90" text-anchor="middle" font-size="5.5" font-weight="800" fill="hsl(15, 85%, 40%)">CALENTADOR SOLAR</text>
            <text x="31" y="97" text-anchor="middle" font-size="4.5" font-weight="700" fill="hsl(200, 80%, 35%)">15 Tubos • 200 L</text>
          </g>
        </g>

        <!-- ====================================================================
             4. ZONA TÉCNICA SUR (Al lado sur de la cubierta sobreelevada)
             ==================================================================== -->
        <g id="zona-tecnica-sur" transform="translate(210, 345)">
          <rect x="0" y="0" width="190" height="95" rx="4" fill="hsl(215, 15%, 92%)" stroke="hsl(215, 20%, 75%)" stroke-width="1" />
          
          <g transform="translate(15, 20)">
            <rect x="0" y="0" width="44" height="26" rx="2" fill="hsl(220, 20%, 35%)" />
            <circle cx="22" cy="13" r="9" fill="#111111" />
            <text x="22" y="36" text-anchor="middle" font-size="5" font-weight="800" fill="hsl(220, 25%, 35%)">A/C Master</text>
          </g>

          <g transform="translate(70, 20)">
            <rect x="0" y="0" width="44" height="26" rx="2" fill="hsl(220, 20%, 35%)" />
            <circle cx="22" cy="13" r="9" fill="#111111" />
            <text x="22" y="36" text-anchor="middle" font-size="5" font-weight="800" fill="hsl(220, 25%, 35%)">A/C Secundarias</text>
          </g>

          <g transform="translate(125, 20)">
            <rect x="0" y="0" width="44" height="26" rx="2" fill="hsl(220, 20%, 35%)" />
            <circle cx="22" cy="13" r="9" fill="#111111" />
            <text x="22" y="36" text-anchor="middle" font-size="5" font-weight="800" fill="hsl(220, 25%, 35%)">A/C Planta Baja</text>
          </g>

          <rect x="25" y="68" width="140" height="16" rx="2" fill="#ffffff" stroke="hsl(220, 25%, 45%)" stroke-width="0.8" opacity="0.95" />
          <text x="95" y="79" text-anchor="middle" font-size="6" font-weight="800" fill="hsl(220, 25%, 25%)">3x CONDENSADORAS A/C INVERTER</text>
        </g>

        <!-- ====================================================================
             5. CASETA DE ACCESO Y CUBO DE ESCALERA A AZOTEA (+6.00 m a +8.20 m)
             ==================================================================== -->
        <g id="caseta-escalera-azotea" transform="translate(486.8, 162)" filter="url(#roofShadow)">
          <rect x="0" y="0" width="100" height="90" fill="hsl(215, 30%, 96%)" stroke="hsl(220, 25%, 20%)" stroke-width="5" />
          
          <rect x="4" y="4" width="36" height="38" fill="hsl(35, 55%, 85%)" stroke="hsl(220, 20%, 65%)" stroke-width="0.8" />
          <text x="22" y="24" text-anchor="middle" font-size="5" font-weight="800" fill="hsl(25, 85%, 40%)">LLEGADA +6.00m</text>

          <!-- Puerta de Salida Directa al Roof Garden Frontal -->
          <g id="puerta-caseta-roof">
            <line x1="20" y1="90" x2="4" y2="108" stroke="hsl(150, 75%, 35%)" stroke-width="2.5" />
            <path d="M 20 90 A 20 20 0 0 1 20 110" fill="none" stroke="hsl(150, 75%, 35%)" stroke-dasharray="2,2" />
            <rect x="26" y="88" width="68" height="14" rx="2" fill="#ffffff" stroke="hsl(150, 70%, 35%)" stroke-width="0.8" opacity="0.95" />
            <text x="60" y="98" text-anchor="middle" font-size="5" font-weight="900" fill="hsl(150, 80%, 25%)">SALIDA AL ROOF GARDEN</text>
          </g>

          <text x="50" y="48" text-anchor="middle" font-size="6.5" font-weight="900" fill="hsl(220, 25%, 25%)">CASETA ESCALERA</text>
          <text x="50" y="58" text-anchor="middle" font-size="5.5" font-weight="700" fill="hsl(215, 60%, 40%)">Acceso Interior (+6.00m)</text>
        </g>

        <!-- ====================================================================
             6. MEDIO BAÑO DE VISITAS DEL ROOF GARDEN (1.65 m x 2.25 m = 3.71 m²)
                - Ubicación: X = 420.8 a 486.8 px (1.65 m), Y = 162 a 252 px (2.25 m)
                - Alineado con el shaft hidrosanitario vertical
                - Equipamiento: Inodoro (WC), Vanity con lavabo y espejo
                - Puerta de acceso directo desde la terraza social
             ==================================================================== -->
        <g id="medio-bano-roof-garden" transform="translate(420.8, 162)" filter="url(#roofShadow)">
          <rect x="0" y="0" width="66" height="90" fill="hsl(200, 25%, 95%)" stroke="hsl(220, 25%, 20%)" stroke-width="4" />

          <!-- Vanity / Lavamanos -->
          <g id="vanity-roof-bath" transform="translate(8, 8)">
            <rect x="0" y="0" width="26" height="18" rx="2" fill="hsl(200, 50%, 88%)" stroke="hsl(200, 40%, 60%)" stroke-width="1" />
            <ellipse cx="13" cy="9" rx="8" ry="5.5" fill="#ffffff" stroke="hsl(200, 50%, 65%)" stroke-width="0.8" />
            <circle cx="13" cy="5" r="1.5" fill="hsl(215, 75%, 45%)" />
            <text x="13" y="24" text-anchor="middle" font-size="4" font-weight="800" fill="hsl(200, 60%, 30%)">Lavabo</text>
          </g>

          <!-- Inodoro (WC) Suspendido -->
          <g id="wc-roof-bath" transform="translate(8, 40)">
            <rect x="0" y="0" width="12" height="20" rx="2" fill="#ffffff" stroke="hsl(220, 20%, 60%)" stroke-width="1" />
            <ellipse cx="18" cy="10" rx="10" ry="7" fill="#ffffff" stroke="hsl(220, 20%, 60%)" stroke-width="1" />
            <text x="32" y="13" text-anchor="start" font-size="4.5" font-weight="800" fill="hsl(220, 25%, 35%)">WC</text>
          </g>

          <!-- Puerta del Baño -->
          <g id="puerta-bano-roof">
            <line x1="42" y1="90" x2="58" y2="74" stroke="hsl(25, 75%, 45%)" stroke-width="2" />
            <path d="M 42 90 A 18 18 0 0 0 60 90" fill="none" stroke="hsl(25, 75%, 45%)" stroke-dasharray="2,2" />
          </g>

          <rect x="4" y="70" width="58" height="16" rx="2" fill="#ffffff" stroke="hsl(200, 70%, 45%)" stroke-width="0.8" opacity="0.95" />
          <text x="33" y="78" text-anchor="middle" font-size="5" font-weight="900" fill="hsl(200, 80%, 25%)">1/2 BAÑO ROOF</text>
          <text x="33" y="84" text-anchor="middle" font-size="4" font-weight="700" fill="hsl(215, 60%, 40%)">Servicio Terraza</text>
        </g>

        <!-- ====================================================================
             7. ROOF GARDEN SOCIAL FRONTAL (ORIENTE - 40.5 m² DECK CON VISTA A CALLE)
             ==================================================================== -->
        <g id="zona-roof-garden-frontal">
          <g id="pergola-roof-frontal" transform="translate(426, 260)">
            <rect x="0" y="0" width="155" height="185" rx="4" fill="hsl(35, 50%, 88%)" stroke="hsl(30, 45%, 45%)" stroke-width="1.5" />
            <line x1="25" y1="0" x2="25" y2="185" stroke="hsl(30, 45%, 45%)" stroke-width="1.5" />
            <line x1="50" y1="0" x2="50" y2="185" stroke="hsl(30, 45%, 45%)" stroke-width="1.5" />
            <line x1="75" y1="0" x2="75" y2="185" stroke="hsl(30, 45%, 45%)" stroke-width="1.5" />
            <line x1="100" y1="0" x2="100" y2="185" stroke="hsl(30, 45%, 45%)" stroke-width="1.5" />
            <line x1="125" y1="0" x2="125" y2="185" stroke="hsl(30, 45%, 45%)" stroke-width="1.5" />

            <!-- Sala Lounge Frontal -->
            <g id="sofa-lounge-roof" transform="translate(15, 20)">
              <path d="M 0 0 L 80 0 L 80 20 L 20 20 L 20 70 L 0 70 Z" fill="hsl(215, 30%, 80%)" stroke="hsl(215, 40%, 45%)" stroke-width="1.2" />
              <rect x="32" y="32" width="38" height="28" rx="3" fill="#ffffff" stroke="hsl(25, 80%, 50%)" stroke-width="1.2" />
              <circle cx="51" cy="46" r="6" fill="hsl(25, 95%, 55%)" />
              <text x="51" y="49" text-anchor="middle" font-size="4" font-weight="800" fill="#ffffff">Fuego</text>
              <text x="48" y="12" text-anchor="middle" font-size="6.5" font-weight="800" fill="hsl(215, 70%, 30%)">SALA LOUNGE</text>
            </g>

            <!-- Grill Station & Barra Frontal Gourmet -->
            <g id="grill-station-roof" transform="translate(15, 115)">
              <rect x="0" y="0" width="125" height="35" rx="3" fill="hsl(220, 20%, 30%)" stroke="hsl(220, 25%, 15%)" stroke-width="1.2" />
              <rect x="8" y="5" width="34" height="25" rx="2" fill="hsl(0, 0%, 20%)" />
              <line x1="14" y1="9" x2="36" y2="9" stroke="hsl(0, 0%, 60%)" stroke-width="0.8" />
              <line x1="14" y1="15" x2="36" y2="15" stroke="hsl(0, 0%, 60%)" stroke-width="0.8" />
              <line x1="14" y1="21" x2="36" y2="21" stroke="hsl(0, 0%, 60%)" stroke-width="0.8" />
              <text x="25" y="28" text-anchor="middle" font-size="4" font-weight="800" fill="hsl(25, 95%, 55%)">GRILL</text>

              <rect x="48" y="7" width="24" height="21" rx="2" fill="hsl(200, 60%, 85%)" />
              <circle cx="60" cy="17" r="2.5" fill="hsl(200, 80%, 45%)" />
              <text x="60" y="25" text-anchor="middle" font-size="4" font-weight="700" fill="hsl(220, 25%, 35%)">Tarja</text>

              <rect x="78" y="5" width="40" height="25" rx="2" fill="hsl(35, 45%, 85%)" />
              <circle cx="88" cy="46" r="4.5" fill="hsl(30, 40%, 45%)" />
              <circle cx="98" cy="46" r="4.5" fill="hsl(30, 40%, 45%)" />
              <circle cx="108" cy="46" r="4.5" fill="hsl(30, 40%, 45%)" />
              <text x="98" y="20" text-anchor="middle" font-size="5" font-weight="800" fill="hsl(220, 25%, 25%)">BARRA</text>
            </g>
          </g>

          <!-- Jardineras Frontales -->
          <g id="jardineras-frontales">
            <rect x="426" y="446" width="155" height="6" rx="2" fill="hsl(145, 50%, 40%)" />
            <circle cx="450" cy="449" r="3.5" fill="hsl(145, 60%, 65%)" />
            <circle cx="500" cy="449" r="3.5" fill="hsl(145, 60%, 65%)" />
            <circle cx="550" cy="449" r="3.5" fill="hsl(145, 60%, 65%)" />
          </g>

          <!-- Título Roof Garden Frontal -->
          <rect x="430" y="112" width="150" height="36" rx="4" fill="#ffffff" stroke="hsl(145, 60%, 40%)" stroke-width="1.2" opacity="0.96" />
          <text x="505" y="126" text-anchor="middle" font-size="7.5" font-weight="900" fill="hsl(145, 75%, 25%)">ROOF GARDEN &amp; 1/2 BAÑO</text>
          <text x="505" y="136" text-anchor="middle" font-size="6" font-weight="700" fill="hsl(215, 85%, 35%)">Vista Panorámica a la Calle (40.5 m²)</text>
          <text x="505" y="144" text-anchor="middle" font-size="5" font-weight="700" fill="hsl(220, 25%, 45%)">Pérgola • Asador Grill • Lounge • Baño</text>
        </g>

        <!-- Banner Azotea -->
        <g id="banner-azotea" transform="translate(200, 68)">
          <rect x="0" y="0" width="386.8" height="24" rx="4" fill="hsl(145, 75%, 30%)" />
          <text x="193.4" y="16" text-anchor="middle" font-size="8" font-weight="800" fill="#ffffff">AZOTEA &amp; ROOF GARDEN CON BAÑO (NIVEL +6.00 m) • ZONA SOCIAL &amp; TÉCNICA</text>
        </g>

        <!-- Rosa de los Vientos -->
        <g id="rosa-vientos-ext" transform="translate(800, 110)">
          <circle cx="0" cy="0" r="24" fill="#ffffff" stroke="hsl(220, 20%, 75%)" stroke-width="1.2" />
          <polygon points="0,-20 4,-6 0,0 -4,-6" fill="hsl(0, 80%, 50%)" />
          <polygon points="0,20 4,6 0,0 -4,6" fill="hsl(220, 25%, 35%)" />
          <polygon points="20,0 6,4 0,0 6,-4" fill="hsl(215, 85%, 45%)" />
          <polygon points="-20,0 -6,4 0,0 -6,-4" fill="hsl(220, 25%, 35%)" />
          <text x="0" y="-16" text-anchor="middle" font-size="8.5" font-weight="800" fill="hsl(0, 80%, 50%)">N</text>
          <text x="18" y="3" text-anchor="start" font-size="8.5" font-weight="800" fill="hsl(215, 85%, 45%)">E</text>
          <text x="0" y="22" text-anchor="middle" font-size="7.5" font-weight="800" fill="hsl(220, 20%, 50%)">S</text>
          <text x="-18" y="3" text-anchor="end" font-size="7.5" font-weight="800" fill="hsl(220, 20%, 50%)">O</text>
        </g>
      </svg>`;
  }


// ==========================================================================
// 9. BIBLIOTECA DE DOCUMENTACIÓN TÉCNICA (01 A 15)
// ==========================================================================
const docsContent = {"vision": "<h2>Visión Estratégica y Cronograma a 3 Años</h2>\n<p><strong>Proyecto:</strong> Residencia Inteligente</p>\n<p><strong>Horizonte Temporal:</strong> 3 Años (Fase de Ahorro, Liquidación de Terreno y Preparación Técnica)</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Los 3 Pilares del Plan a 3 Años</h3>\n<pre><code class=\"language-mermaid\">\ntimeline\n    title Cronograma de 3 Años hacia la Construcción\n    section Año 1 : Liquidación Terreno : Definición Arquitectónica : Ahorro Base\n    section Año 2 : Finalización Terreno : Planos Ejecutivos Eléctricos/Red : Pruebas Home Assistant\n    section Año 3 : Trámite Crédito Construcción : Licitación Obra : Inicio Obra Negra\n</code></pre>\n<ol>\n<li><strong>Pilar Financiero:</strong></li>\n<li>Amortización y liquidación total del crédito del terreno.</li>\n<li>Acumulación del fondo inicial para enganche/gastos notariales del crédito de construcción.</li>\n<li>Fondo reservado de infraestructura domótica en obra ($800 – $1,200 USD para cableado y tuberías).</li>\n<li><strong>Pilar Arquitectónico & Técnico:</strong></li>\n<li>Diseño de planos arquitectónicos con cuartos técnicos y canalizaciones integradas desde el día 1.</li>\n<li>Sin improvisaciones ni sobrecostos por demolición o ranurados tardíos.</li>\n<li><strong>Pilar de Aprendizaje & Experimentación:</strong></li>\n<li>Durante estos 3 años puedes experimentar con un Mini-PC y Home Assistant en tu vivienda actual para familiarizarte con automatizaciones antes de construir.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Metas por Año</h3>\n<h4>Año 1: Enfoque Financiero & Concepto de Espacios</h4>\n<ul>\n<li>[ ] Mantener pagos puntuales del crédito del terreno (adelanto de capital si es posible).</li>\n<li>[ ] Crear una carpeta de inspiración arquitectónica y lista de deseos para la casa (ambientes, recámaras, terraza).</li>\n<li>[ ] Definir requerimientos básicos de iluminación por estancia (luz cálida, circuitos independientes).</li>\n</ul>\n<h4>Año 2: Anteproyecto Arquitectónico & Pruebas Locales</h4>\n<ul>\n<li>[ ] Contactar o seleccionar al arquitecto para iniciar anteproyecto y distribución de plantas.</li>\n<li>[ ] Diseñar la ubicación del <strong>Rack Central (MDF)</strong> en los planos de planta baja.</li>\n<li>[ ] Integrar en planos la simbología de puntos Cat6 en techos (Access Points), cámaras perimetrales y timbre.</li>\n<li>[ ] <em>(Opcional)</em> Instalar Home Assistant en un Mini-PC para probar bombillas, sensores o enchufes en tu casa actual.</li>\n</ul>\n<h4>Año 3: Trámite de Crédito, Contratación y Arranque de Obra</h4>\n<ul>\n<li>[ ] <strong>Mes 1–3:</strong> Liquidación final del crédito del terreno y trámite de liberación de gravamen / escrituración.</li>\n<li>[ ] <strong>Mes 4–6:</strong> Solicitud y aprobación del crédito de construcción (banco / entidad financiera).</li>\n<li>[ ] <strong>Mes 7–8:</strong> Entrega del Dossier Técnico al constructor y electricista.</li>\n<li>[ ] <strong>Mes 9–12:</strong> Arranque de obra negra: Colocación de tuberías conduit de $3/4\"$, $1\"$ y $2\"$, cajas de $50\\text{ mm}$ y cableado Cat6 100% Cobre.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Matriz de Ahorro y Presupuesto</h3>\n<div class=\"table-responsive\"><table class=\"data-table\">\n<thead><tr><th>Concepto</th><th>Monto Estimado</th><th>Plazo Sugerido</th></tr></thead><tbody>\n<tr><td><strong>Materiales de Canalización y Cable Cat6 (Obra Negra)</strong></td><td>$700 – $900 USD (~$14,000 – $18,000 MXN)</td><td>Mes de inicio de obra (Año 3)</td></tr>\n<tr><td><strong>Equipamiento de Red Base (Rack, Switch PoE, APs, Mini-PC)</strong></td><td>$1,000 – $1,200 USD (~$20,000 – $24,000 MXN)</td><td>Fin de obra gris / inicios de acabados</td></tr>\n<tr><td><strong>Seguridad, Micromódulos y Sensores</strong></td><td>$1,000 – $1,800 USD (~$20,000 – $36,000 MXN)</td><td>Al habitar la casa (modular)</td></tr>\n<tr><td><strong>Audio Multi-Room y Confort Térmico</strong></td><td>$800 – $1,500 USD (~$16,000 – $30,000 MXN)</td><td>Etapa posterior según presupuesto</td></tr>\n</tbody></table></div>", "dossier": "<h2>Dossier Técnico de Obra para Arquitecto y Electricista</h2>\n<p><strong>Proyecto:</strong> Residencia 2 Plantas con Jardín</p>\n<p><strong>Normas de Instalación:</strong> Infraestructura Eléctrica y Red Estructurada</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Reglas Innegociables en Obra</h3>\n<pre><code class=\"language-\">\n┌────────────────────────────────────────────────────────────────────────┐\n│  REGLAS CRÍTICAS PARA PLANOS E INSTALACIONES:                          │\n│                                                                        │\n│  1. HILO NEUTRO en el 100% de las cajas de apagadores (chalupas).     │\n│  2. CHALUPAS PROFUNDAS (Mínimo 50mm de fondo en todos los apagadores). │\n│  3. RACK CENTRAL (MDF): Todas las tuberías de red convergen a él.      │\n│  4. SEPARACIÓN: Mínimo 20cm entre tubería eléctrica y tubería Cat6.    │\n│  5. CABLE CAT6 100% COBRE: Prohibido usar cable CCA (aluminio-cobre).  │\n└────────────────────────────────────────────────────────────────────────┘\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Ubicación y Especificaciones del Rack Central (MDF)</h3>\n<ul>\n<li><strong>Espacio:</strong> Gabinete de 9U a 12U empotrado o fijado a muro en zona ventilada de Planta Baja (clóset de blancos, cuarto de servicio o bajo escalera cerrada).</li>\n<li><strong>Alimentación:</strong> 1 circuito eléctrico dedicado exclusivo (Pastilla de 20A) con 2 contactos dobles y cable de tierra física.</li>\n<li><strong>Tuberías de llegada:</strong></li>\n<li>2 tubos de $3/4\"$ hacia techos de Planta Baja y Planta Alta (Access Points).</li>\n<li>4 tubos de $3/4\"$ hacia las 4 esquinas exteriores (Cámaras PoE).</li>\n<li>1 tubo de $3/4\"$ hacia la entrada principal (Timbre con Video PoE).</li>\n<li>2 tubos de $3/4\"$ hacia zonas de audio en techo (Sala, Cocina, Terraza).</li>\n<li>1 tubo de $3/4\"$ hacia cisterna (Sensor de nivel).</li>\n<li>1 tubo de $1\"$ de reserva hacia cuadro general eléctrico.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Guía de Tuberías y Alturas de Colocación</h3>\n<div class=\"table-responsive\"><table class=\"data-table\">\n<thead><tr><th>Elemento</th><th>Altura Recomendada</th><th>Tipo de Tubería</th><th>Cable Requerido</th></tr></thead><tbody>\n<tr><td><strong>Apagadores de Pared</strong></td><td>1.10 m – 1.20 m sobre NPT</td><td>Poliducto / Conduit $3/4\"$</td><td>Fase + Neutro + Retornos + Tierra</td></tr>\n<tr><td><strong>Access Points Wi-Fi</strong></td><td>Centro de techo de cada planta</td><td>Tubo $3/4\"$ hacia el Rack</td><td>1 cable Cat6 UTP por piso</td></tr>\n<tr><td><strong>Cámaras Exteriores PoE</strong></td><td>2.80 m – 3.50 m en esquinas</td><td>Tubo $3/4\"$ hacia el Rack</td><td>1 cable Cat6 exterior con filtro UV</td></tr>\n<tr><td><strong>Timbre con Video PoE</strong></td><td>1.45 m junto a chapa principal</td><td>Tubo $3/4\"$ hacia el Rack</td><td>1 cable Cat6 + par 18 AWG para chapa</td></tr>\n<tr><td><strong>Pasacables para TV</strong></td><td>1.30 m (tras TV) a 0.45 m (mueble)</td><td><strong>Tubo de 2 Pulgadas</strong></td><td>Pasacables HDMI + 2 cables Cat6</td></tr>\n<tr><td><strong>Bocinas de Techo</strong></td><td>Distribuidas en cielo raso</td><td>Tubo $3/4\"$ hacia el Rack</td><td>Cable libre de oxígeno 14/2</td></tr>\n<tr><td><strong>Persianas Motorizadas</strong></td><td>Esquina superior de dintel</td><td>Tubo $1/2\"$ a caja cercana</td><td>110V (Fase + Neutro + Tierra)</td></tr>\n<tr><td><strong>Cargador Auto Eléctrico</strong></td><td>1.20 m en muro de cochera</td><td><strong>Tubo conduit pesado 1\"</strong></td><td>3 cables Calibre 6 AWG (240V / 40A)</td></tr>\n<tr><td><strong>Acometida Paneles Solares</strong></td><td>Azotea a Cuadro General</td><td><strong>Tubo conduit pesado 1\"</strong></td><td>Guía plástica lista para cableado DC</td></tr>\n</tbody></table></div>", "network": "<h2>Arquitectura de Red y Rack Central (MDF)</h2>\n<p><strong>Proyecto:</strong> Residencia Inteligente</p>\n<p><strong>Enfoque:</strong> Red Estructurada Cat6, Alimentación PoE+ y Aislamiento de Red (VLANs)</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Diagrama de Conexiones del Rack</h3>\n<pre><code class=\"language-mermaid\">\ngraph TD\n    ISP[Acometida Fibra Óptica / Internet] --&gt; ONT[Módem ISP Modo Puente]\n    ONT --&gt; RTR[Router / Gateway Gigabit]\n    \n    RTR --&gt; SW[Switch 16/24 Puertos PoE+ Gigabit]\n    \n    SW --&gt;|PoE| AP1[AP Wi-Fi 6 Techo Planta Baja]\n    SW --&gt;|PoE| AP2[AP Wi-Fi 6 Techo Planta Alta]\n    SW --&gt;|PoE| CAM1[Cámara Frontal 4K]\n    SW --&gt;|PoE| CAM2[Cámara Patio/Jardín 4K]\n    SW --&gt;|PoE| CAM3[Cámara Lateral 4K]\n    SW --&gt;|PoE| CAM4[Cámara Cochera 4K]\n    SW --&gt;|PoE| DOOR[Timbre con Video PoE]\n    \n    SW --&gt; HA[Mini PC Intel N100: Home Assistant]\n    SW --&gt; NVR[NVR / Almacenamiento 24/7]\n    SW --&gt; TV1[Smart TV Sala Cat6]\n    SW --&gt; TV2[Smart TV Recámara Ppal Cat6]\n    \n    HA -.-&gt;|USB Dongle| ZIG[Coordinador Zigbee 3.0 & Matter/Thread]\n    \n    UPS[No-Break / UPS 1500VA] --- RTR\n    UPS --- SW\n    UPS --- HA\n    UPS --- NVR\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Segmentación de Red Recomendada (VLANs)</h3>\n<p>Para máxima seguridad y evitar que un foco o dispositivo hackeado acceda a tus computadoras o cuentas bancarias, la red se divide en 3 redes virtuales:</p>\n<ol>\n<li><strong>VLAN 10 - Principal (Trusted):</strong> Computadoras de trabajo, teléfonos personales, tablets y el servidor Home Assistant.</li>\n<li><strong>VLAN 20 - IoT (Dispositivos Domóticos):</strong> Apagadores Wi-Fi, persianas, electrodomésticos, Mini-splits e inversores solares (sin acceso a la red principal, solo a Home Assistant).</li>\n<li><strong>VLAN 30 - Seguridad (Cámaras y NVR):</strong> Cámaras PoE y timbre (bloqueadas para que no transmitan video a servidores chinos/externos sin autorización).</li>\n<li><strong>VLAN 40 - Invitados (Guests):</strong> Red Wi-Fi aislada para visitas.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Lista de Equipos Recomendados para el Rack</h3>\n<ul>\n<li><strong>Gabinete:</strong> Rack de pared de 9U a 12U con puerta de cristal templado y cerradura (ej. Tripp Lite / NavePoint).</li>\n<li><strong>Switch PoE:</strong> Switch Gigabit gestionable con 16 a 24 puertos (al menos 8 con PoE+) como <strong>TP-Link Omada SG2218P</strong> o <strong>Ubiquiti UniFi USW-Lite-16-PoE</strong>.</li>\n<li><strong>Puntos de Acceso:</strong> 2x <strong>UniFi U6+ / U7 Pro</strong> o <strong>TP-Link EAP610</strong> (montaje estético en cielo raso, similar a un detector de humo).</li>\n<li><strong>Servidor Local:</strong> Mini PC con procesador Intel N100, 16 GB de RAM DDR5 y 512 GB SSD NVMe corriendo <strong>Home Assistant OS</strong>.</li>\n<li><strong>Respaldo Eléctrico:</strong> UPS de 1000VA a 1500VA con regulación automática de voltaje (AVR).</li>\n</ul>", "subsystems": "<h2>Guía de Subsistemas Domóticos</h2>\n<p><strong>Proyecto:</strong> Residencia Inteligente</p>\n<p><strong>Detalle Técnico:</strong> Iluminación, Clima, Audio, Accesos, Cisterna y Riego</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Iluminación Oculta (Micromódulos)</h3>\n<ul>\n<li><strong>Concepto:</strong> Mecanismos de pared normales de marcas de prestigio (Bticino Living Now, Schneider Unica, Simon 100).</li>\n<li><strong>Módulo:</strong> Detrás de la placa se conecta un <strong>Shelly Plus 1</strong> o <strong>Sonoff ZBMini Extreme (Zigbee 3.0)</strong>.</li>\n<li><strong>Comportamiento:</strong></li>\n<li>Al presionar el botón físico: La luz prende/apaga al instante por contacto seco.</li>\n<li>Por automatización o voz: Home Assistant manda el comando sin importar en qué posición esté el apagador de pared.</li>\n<li>Si el servidor se apaga: El interruptor sigue funcionando normalmente.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Climatización y Persianas</h3>\n<ul>\n<li><strong>Mini-splits:</strong> Equipos Inverter (Midea, Carrier, Daikin o Mitsubishi) integrados con dongles USB de control local (protocolo UART/CN105 o módulos ESPHome).</li>\n<li><strong>Automatización:</strong> Ajuste de temperatura según si hay personas en la habitación (sensores de presencia) o apagado automático si una ventana permanece abierta más de 3 minutos.</li>\n<li><strong>Persianas:</strong> Motores tubulares de 110V controlados por micromódulos <strong>Shelly Plus 2PM</strong> (permite abrir al 25%, 50%, 75% o 100% automáticamente al amanecer/atardecer).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Audio Multi-Room Distribuido</h3>\n<ul>\n<li><strong>Zona 1:</strong> Sala y Comedor (2 bocinas de techo).</li>\n<li><strong>Zona 2:</strong> Cocina (2 bocinas de techo).</li>\n<li><strong>Zona 3:</strong> Terraza y Jardín (2 bocinas de techo para intemperie).</li>\n<li><strong>Equipo:</strong> Todas las bocinas van cableadas con cable libre de oxígeno 14/2 directo al Rack. En el rack, 2 o 3 amplificadores <strong>WiiM Amp</strong> permiten reproducir música sincronizada en toda la casa o canciones distintas en cada habitación mediante AirPlay 2, Spotify o Home Assistant.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>4. Control de Accesos y Seguridad</h3>\n<ul>\n<li><strong>Cerradura:</strong> <em>Aqara U200 / U100</em> con soporte para Apple HomeKey, huella digital biométrica, teclado PIN y llave física.</li>\n<li><strong>Cámaras:</strong> 4 Cámaras IP 4K PoE (Reolink 4K) conectadas al Switch PoE del Rack. Detección de personas, vehículos y mascotas procesada localmente sin enviar video a servidores de terceros.</li>\n<li><strong>Timbre:</strong> <em>Reolink Doorbell PoE</em> con audio bidireccional y video fluido en tiempo real en teléfonos y pantallas.</li>\n<li><strong>Portón Vehicular:</strong> Módulo relevador de contacto seco conectado al motor del portón (LiftMaster / Merik) para apertura desde el auto con CarPlay / Android Auto o geocerca al llegar a casa.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>5. Gestión del Agua y Prevención de Fugas</h3>\n<ul>\n<li><strong>Cisterna:</strong> Sensor ultrasónico impermeable en la tapa de la cisterna conectado a un microcontrolador ESP32. Te muestra en el teléfono el porcentaje exacto de agua y los litros disponibles.</li>\n<li><strong>Corte por Fuga:</strong> Válvula motorizada de latón en la tubería principal. Si un sensor de humedad bajo el fregadero o lavadora detecta agua, la válvula corta el suministro en 3 segundos y envía una alerta crítica a los celulares.</li>\n<li><strong>Riego:</strong> Controlador de electroválvulas que consulta el pronóstico del tiempo: si va a llover o llovió ayer, cancela el riego automáticamente para ahorrar agua.</li>\n</ul>", "budget": "<h2>Catálogo de Equipos y Presupuesto de Referencia</h2>\n<p><strong>Proyecto:</strong> Residencia Inteligente</p>\n<p><strong>Moneda de Referencia:</strong> USD y Pesos Mexicanos (MXN)</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Materiales de Obra Negra (Imprescindibles para arrancar)</h3>\n<div class=\"table-responsive\"><table class=\"data-table\">\n<thead><tr><th>Cantidad</th><th>Material / Especificación</th><th>Costo Estimado (USD)</th><th>Costo Estimado (MXN)</th></tr></thead><tbody>\n<tr><td>1</td><td>Bobina 305m Cable Cat6 UTP 100% Cobre Interior</td><td>$110</td><td>$2,200</td></tr>\n<tr><td>1</td><td>Bobina 305m Cable Cat6 UTP Exterior Cobre (Filtro UV)</td><td>$120</td><td>$2,400</td></tr>\n<tr><td>1</td><td>Bobina 100m Cable para Altavoz 14 AWG Libre de Oxígeno</td><td>$75</td><td>$1,500</td></tr>\n<tr><td>30</td><td>Cajas chalupa galvanizadas extra-profundas (50mm+)</td><td>$60</td><td>$1,200</td></tr>\n<tr><td>Lote</td><td>Poliducto naranja reforzado / Conduit 3/4\", 1\" y 2\"</td><td>$120</td><td>$2,400</td></tr>\n<tr><td>Lote</td><td>Mano de obra extra de electricista (tendido de red y datos)</td><td>$300</td><td>$6,000</td></tr>\n<tr><td><strong>TOTAL</strong></td><td><strong>Fase 1: Infraestructura en Obra Negra</strong></td><td><strong>~$785 USD</strong></td><td><strong>~$15,700 MXN</strong></td></tr>\n</tbody></table></div>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Equipamiento Tecnológico (Fase de Acabados / Habitación)</h3>\n<div class=\"table-responsive\"><table class=\"data-table\">\n<thead><tr><th>Subsistema</th><th>Equipo Recomendado</th><th>Costo Estimado (USD)</th><th>Costo Estimado (MXN)</th></tr></thead><tbody>\n<tr><td><strong>Rack</strong></td><td>Gabinete 9U-12U + Patch Panel Cat6 + PDU</td><td>$140</td><td>$2,800</td></tr>\n<tr><td><strong>Switch</strong></td><td>TP-Link Omada SG2218P o UniFi PoE+ 16 Puertos</td><td>$250</td><td>$5,000</td></tr>\n<tr><td><strong>Router</strong></td><td>Gateway Gigabit UniFi / Omada ER605</td><td>$130</td><td>$2,600</td></tr>\n<tr><td><strong>Wi-Fi</strong></td><td>2x Access Points Wi-Fi 6 de techo (UniFi U6+ / Omada EAP610)</td><td>$240</td><td>$4,800</td></tr>\n<tr><td><strong>Servidor</strong></td><td>Mini-PC Intel N100 (16GB RAM / 512GB SSD)</td><td>$160</td><td>$3,200</td></tr>\n<tr><td><strong>UPS</strong></td><td>No-Break 1500VA con AVR</td><td>$130</td><td>$2,600</td></tr>\n<tr><td><strong>Zigbee/Matter</strong></td><td>Coordinador USB Sonoff Dongle Plus</td><td>$35</td><td>$700</td></tr>\n<tr><td><strong>Cámaras</strong></td><td>Kit 4 Cámaras 4K PoE + Disco Duro 2TB (Reolink 4K)</td><td>$450</td><td>$9,000</td></tr>\n<tr><td><strong>Timbre</strong></td><td>Timbre Reolink Video Doorbell PoE</td><td>$110</td><td>$2,200</td></tr>\n<tr><td><strong>Cerradura</strong></td><td>Aqara U200 / U100 (Huella, PIN, Apple HomeKey)</td><td>$230</td><td>$4,600</td></tr>\n<tr><td><strong>Iluminación</strong></td><td>18x Micromódulos Shelly Plus 1 / Sonoff ZBMini</td><td>$270</td><td>$5,400</td></tr>\n<tr><td><strong>Persianas</strong></td><td>4x Módulos de motor de persiana Shelly 2PM</td><td>$100</td><td>$2,000</td></tr>\n<tr><td><strong>Audio</strong></td><td>6x Bocinas empotrables de techo 6.5\"/8\" (3 pares)</td><td>$300</td><td>$6,000</td></tr>\n<tr><td><strong>Amplificación</strong></td><td>2x Amplificadores Wi-Fi/AirPlay WiiM Amp</td><td>$600</td><td>$12,000</td></tr>\n<tr><td><strong>Clima</strong></td><td>3x Módulos ESPHome / Dongle para Mini-split Inverter</td><td>$100</td><td>$2,000</td></tr>\n<tr><td><strong>Cisterna & Fugas</strong></td><td>Sensor ultrasónico + Válvula motorizada + 4 sensores fuga</td><td>$180</td><td>$3,600</td></tr>\n<tr><td><strong>Riego</strong></td><td>Controlador de electroválvulas inteligente de jardín</td><td>$80</td><td>$1,600</td></tr>\n<tr><td><strong>Presencia</strong></td><td>3x Sensores de presencia radar mmWave Aqara FP2</td><td>$150</td><td>$3,000</td></tr>\n<tr><td><strong>TOTAL</strong></td><td><strong>Fase 2: Equipos Tecnológicos Completos</strong></td><td><strong>~$3,655 USD</strong></td><td><strong>~$73,100 MXN</strong></td></tr>\n</tbody></table></div>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Inversión Global del Proyecto de Domótica</h3>\n<ul>\n<li><strong>Inversión Total Llave en Mano:</strong> <strong>~$4,440 USD</strong> (~$88,800 MXN).</li>\n<li><strong>Distribución en el tiempo:</strong></li>\n<li><strong>Año 1 y 2:</strong> $0 USD en compras de equipos (100% enfocado en el crédito del terreno y diseño arquitectónico).</li>\n<li><strong>Año 3 (Obra):</strong> ~$785 USD en materiales de tuberías y cableado.</li>\n<li><strong>Año 3 (Entrega):</strong> ~$3,655 USD en equipos (se pueden comprar gradualmente).</li>\n</ul>", "neufert": "<h2>Estándares Arquitectónicos y Antropometría: Ernst Neufert</h2>\n<p><strong>Proyecto:</strong> Residencia Inteligente</p>\n<p><strong>Referencia:</strong> <em>El Arte de Proyectar en Arquitectura (Bauentwurfslehre) — Ernst Neufert</em></p>\n<p>Este documento establece las dimensiones mínimas, óptimas y funcionales para cada espacio, basadas en la escala humana, la ergonomía y la eficiencia espacial.</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Antropometría y Circulaciones Humanas</h3>\n<pre><code class=\"language-\">\n┌────────────────────────────────────────────────────────┐\n│  MEDIDAS BASE DE CIRCULACIÓN (NEUFERT):               │\n│                                                        │\n│  • Paso de 1 persona:            0.80 m a 0.90 m       │\n│  • Cruce de 2 personas:          1.20 m a 1.30 m       │\n│  • Cruce con carga / maletas:    1.50 m                │\n│  • Paso de servicio lateral:     0.60 m                │\n│  • Altura libre de puertas:      2.10 m a 2.40 m       │\n│  • Altura libre de piso a techo: 2.70 m a 3.00 m       │\n└────────────────────────────────────────────────────────┘\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Escaleras y Circulaciones Verticales</h3>\n<h4>Ley de Blondel (Comodidad del Paso Humano):</h4>\n<p>$$2 \\times \\text{Contrahuella (Peralte)} + \\text{Huella} = 63\\text{ a }65\\text{ cm}$$</p>\n<ul>\n<li><strong>Contrahuella (Peralte):</strong> $16.5\\text{ a }17.5\\text{ cm}$ (máximo $18.0\\text{ cm}$ para vivienda cómoda).</li>\n<li><strong>Huella:</strong> $28.0\\text{ a }30.0\\text{ cm}$ (para apoyo total de la planta del pie).</li>\n<li><strong>Ancho libre de escalera:</strong> Mínimo $0.90\\text{ m}$; óptimo $1.05\\text{ a }1.20\\text{ m}$.</li>\n<li><strong>Gálibo (Altura libre vertical de paso):</strong> Mínimo $2.15\\text{ m}$ libres sin vigas que golpeen la cabeza.</li>\n<li><strong>Descanso intermedio:</strong> Mínimo igual al ancho de la escalera ($0.90\\text{ a }1.10\\text{ m}$) cada 12 a 16 escalones.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Dimensionamiento Óptimo por Espacio</h3>\n<h4>A. Cochera / Estacionamiento</h4>\n<ul>\n<li><strong>1 Auto:</strong> Mínimo $2.50\\text{ m} \\times 5.00\\text{ m}$ | Óptimo $3.00\\text{ m} \\times 5.50\\text{ m}$.</li>\n<li><strong>2 Autos en batería:</strong> Mínimo $5.00\\text{ m} \\times 5.00\\text{ m}$ | Óptimo $5.50\\text{ m} \\text{ a } 6.00\\text{ m} \\times 5.50\\text{ m} \\text{ a } 6.00\\text{ m}$.</li>\n<li><strong>Holgura para abrir puertas:</strong> Mínimo $0.60\\text{ a }0.80\\text{ m}$ entre vehículos y contra muros.</li>\n</ul>\n<h4>B. Cocina y Lavandería (El Triángulo de Trabajo)</h4>\n<ul>\n<li><strong>Triángulo Funcional:</strong></li>\n<li>Almacenamiento (Refrigerador) $≤ftrightarrow$ Lavado (Fregadero) $≤ftrightarrow$ Cocción (Estufa).</li>\n<li>La suma de las 3 distancias debe estar entre <strong>$4.00\\text{ m}$ y $7.50\\text{ m}$</strong> para evitar fatiga innecesaria.</li>\n<li><strong>Altura de encimeras/mesetas:</strong> $90\\text{ a }92\\text{ cm}$.</li>\n<li><strong>Profundidad de barra de trabajo:</strong> $60\\text{ a }65\\text{ cm}$ ($90\\text{ a }100\\text{ cm}$ en islas con desayunador).</li>\n<li><strong>Pasillo libre en cocina:</strong> Mínimo $1.00\\text{ m}$ (1 cocinero); óptimo $1.20\\text{ a }1.30\\text{ m}$ (para abrir el horno o lavavajillas y permitir que otra persona pase).</li>\n</ul>\n<h4>C. Comedor y Sala de Estar</h4>\n<ul>\n<li><strong>Comedor:</strong></li>\n<li>Espacio por comensal en mesa: Ancho $60\\text{ a }70\\text{ cm}$, profundidad $40\\text{ cm}$.</li>\n<li>Borde de mesa a pared: Mínimo $85\\text{ cm}$ para retirar la silla; $1.10\\text{ a }1.20\\text{ m}$ para permitir el paso de alguien sirviendo.</li>\n<li><strong>Sala:</strong></li>\n<li>Distancia sofá a mesa de centro: $40\\text{ a }45\\text{ cm}$.</li>\n<li>Distancia de visión a TV 4K: $2.20\\text{ a }3.20\\text{ m}$ para pantallas de 65\" a 75\".</li>\n<li>Pasillo de circulación principal: Mínimo $0.90\\text{ a }1.00\\text{ m}$.</li>\n</ul>\n<h4>D. Dormitorios y Clósets</h4>\n<ul>\n<li><strong>Holgura perimetral de cama:</strong> Mínimo $65\\text{ a }75\\text{ cm}$ a los lados; óptimo $85\\text{ a }100\\text{ cm}$.</li>\n<li><strong>Profundidad de clóset para colgar:</strong> $60\\text{ cm}$ útiles.</li>\n<li><strong>Espacio frente a clóset:</strong> Mínimo $90\\text{ cm}$ para abrir puertas batientes y vestirse.</li>\n<li><strong>Vestidor (Walk-in Closet):</strong> Pasillo central libre de $90\\text{ a }110\\text{ cm}$ entre muebles.</li>\n</ul>\n<h4>E. Baños y Sanitarios</h4>\n<ul>\n<li><strong>Medio Baño de Visitas:</strong> Mínimo $0.90\\text{ m} \\times 1.40\\text{ m} = 1.26\\text{ m}^2$ | Óptimo $1.10\\text{ m} \\times 1.60\\text{ m}$.</li>\n<li><strong>Inodoro:</strong> Espacio frontal libre mínimo $60\\text{ cm}$, separación lateral mínima de $20\\text{ cm}$ a cada lado (eje del WC a muro: $40\\text{ a }45\\text{ cm}$).</li>\n<li><strong>Regadera:</strong> Mínimo $0.80\\text{ m} \\times 0.80\\text{ m}$ | Óptimo $0.90\\text{ m} \\times 1.20\\text{ m} \\text{ a } 1.50\\text{ m}$.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>4. Zonificación Bioclimática y Orientaciones Solares</h3>\n<pre><code class=\"language-mermaid\">\ngraph TD\n    N[NORTE: Luz Difusa y Fresca] --&gt; N_ESP[Estudio / Home Office / Cuarto Rack / Alacena / Lavado]\n    S[SUR: Máxima Luz y Calor Invernal] --&gt; S_ESP[Sala / Comedor / Terraza con Aleros de Protección]\n    E[ESTE: Sol Matutino Agradable] --&gt; E_ESP[Recámaras / Desayunador]\n    O[OESTE: Sol Intenso de Tarde] --&gt; O_ESP[Baños / Clósets / Muros Ciegos / Protección con Celosía]\n</code></pre>", "topography": "<h2>Levantamiento Geométrico Exacto y Calibración Cadastral</h2>\n<p><strong>Proyecto:</strong> Residencia Domótica Inteligente (153.19 m²)</p>\n<p><strong>Norma de Dibujo:</strong> Cartesiano Exacto con Vértice Recto ($90.00^\\circ$) en P1 (Norte-Poniente)</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Geometría Exacta del Polígono (Coordenadas en Metros)</h3>\n<p>Tomando el <strong>Vértice P1 (Esquina Nor-Poniente)</strong> como el origen $(0.00, 0.00)$ con un <strong>ángulo recto exacto de $90.00^\\circ$</strong> entre el lindero Fondo (Poniente) y el lindero Norte:</p>\n<div class=\"table-responsive\"><table class=\"data-table\">\n<thead><tr><th>Vértice</th><th>Nombre / Ubicación</th><th>Coordenada $X$ (m)</th><th>Coordenada $Y$ (m)</th><th>Ángulo Interior</th></tr></thead><tbody>\n<tr><td><strong>P1</strong></td><td>Esquina Nor-Poniente (Fondo Norte)</td><td><strong>$0.000\\text{ m}$</strong></td><td><strong>$0.000\\text{ m}$</strong></td><td><strong>$90.00^\\circ$ (Ángulo Recto Exacto)</strong></td></tr>\n<tr><td><strong>P2</strong></td><td>Esquina Nor-Oriente (Frente Norte / Calle)</td><td><strong>$15.740\\text{ m}$</strong></td><td><strong>$0.000\\text{ m}$</strong></td><td><strong>$83.02^\\circ$</strong></td></tr>\n<tr><td><strong>P3</strong></td><td>Esquina Sur-Oriente (Frente Sur / Calle)</td><td><strong>$14.489\\text{ m}$</strong></td><td><strong>$-10.224\\text{ m}$</strong></td><td><strong>$96.25^\\circ$</strong></td></tr>\n<tr><td><strong>P4</strong></td><td>Esquina Sur-Poniente (Fondo Sur)</td><td><strong>$0.000\\text{ m}$</strong></td><td><strong>$-10.040\\text{ m}$</strong></td><td><strong>$90.73^\\circ$</strong></td></tr>\n</tbody></table></div>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Verificación de Distancias y Linderos Reales</h3>\n<div class=\"table-responsive\"><table class=\"data-table\">\n<thead><tr><th>Lado</th><th>Descripción</th><th>Distancia Medida</th><th>Distancia Calculada</th><th>Holgura / Error</th></tr></thead><tbody>\n<tr><td><strong>L1-2</strong></td><td><strong>Lado Norte</strong></td><td>$15.74\\text{ m}$</td><td><strong>$15.740\\text{ m}$</strong></td><td>$0.00\\text{ cm}$ (Exacto)</td></tr>\n<tr><td><strong>L2-3</strong></td><td><strong>Frente a Calle (Oriente)</strong></td><td>$10.30\\text{ m}$</td><td><strong>$10.300\\text{ m}$</strong></td><td>$0.00\\text{ cm}$ (Exacto)</td></tr>\n<tr><td><strong>L3-4</strong></td><td><strong>Lado Sur</strong></td><td>$14.49\\text{ m}$</td><td><strong>$14.489\\text{ m}$</strong></td><td>$< 0.1\\text{ cm}$ (Exacto)</td></tr>\n<tr><td><strong>L4-1</strong></td><td><strong>Fondo (Poniente)</strong></td><td>$10.04\\text{ m}$</td><td><strong>$10.040\\text{ m}$</strong></td><td>$0.00\\text{ cm}$ (Exacto)</td></tr>\n</tbody></table></div>\n<ul>\n<li><strong>Superficie Total:</strong> <strong>153.19 m²</strong></li>\n<li><strong>Perímetro Total:</strong> <strong>$50.57\\text{ m}$</strong></li>\n<li><strong>Desfase de Inclinación de la Calle:</strong> El frente a la calle avanza hacia el interior del lote en $\\Delta X = -1.25\\text{ m}$ a lo largo de los $10.30\\text{ m}$ de fachada (inclinación de $6.98^\\circ$ respecto a la vertical).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Solución Arquitectónica: Cochera Irregular Trapezoidal</h3>\n<p>Para absorber la irregularidad natural del terreno sin perder espacio útil:</p>\n<ol>\n<li><strong>Cajón 1 (Lado Norte - Largo):</strong> Fondo de <strong>$5.80\\text{ m}$ a $6.00\\text{ m}$</strong>, diseñado para una <strong>Camioneta SUV grande</strong> ($5.00\\text{ m}$ de largo).</li>\n<li><strong>Cajón 2 (Lado Sur - Corto):</strong> Fondo de <strong>$4.80\\text{ m}$ a $5.00\\text{ m}$</strong>, diseñado para un <strong>Auto Compacto / Hatchback / Sedan</strong> ($4.00 - 4.40\\text{ m}$ de largo).</li>\n<li><strong>Punto de Carga EV:</strong> Ubicado en el muro sur protegido, con pastilla de 40A y tubo conduit de 1\".</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>4. Servidumbres Frontal y Posterior con Inclinación Real</h3>\n<ul>\n<li><strong>Servidumbre Frontal ($2.50\\text{ m}$ paralela a la calle inclinada):</strong></li>\n<li><strong>Arriate Verde ($0.60\\text{ m}$):</strong> Pegado a la calle para absorción de agua pluvial y vegetación frontal.</li>\n<li><strong>Banqueta Peatonal ($0.90\\text{ m}$):</strong> Andador continuo de concreto estampado.</li>\n<li><strong>Servidumbre Libre ($1.00\\text{ m}$):</strong> Área absorbida por el frente de la cochera y acceso peatonal.</li>\n<li><strong>Servidumbre Posterior ($3.00\\text{ m}$):</strong></li>\n<li>Paralela al muro trasero perpendicular ($10.04\\text{ m}$ de ancho por $3.00\\text{ m}$ de fondo = <strong>$30.12\\text{ m}^2$</strong> de jardín y terraza libre).</li>\n</ul>", "zoning": "<h2>Programa Arquitectónico Oficial: Planta Baja, Planta Alta y Roof Garden con 1/2 Baño</h2>\n<p><strong>Proyecto:</strong> Residencia Domótica Inteligente (153.19 m² Terreno | ≈235 m² Superficie Total Útil)</p>\n<p><strong>Niveles:</strong> Planta Baja ($\\pm0.00\\text{ m}$ / $-0.15\\text{ m}$) • Planta Alta ($+3.00\\text{ m}$) • Roof Garden Frontal ($+6.00\\text{ m}$)</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Copias de Seguridad Guardadas</h3>\n<ul>\n<li>💾 [<code>assets/js/app.backup_before_roofgarden.js</code>](file:///home/olethros1318/Escritorio/Proyecto_Casa_Inteligente/assets/js/app.backup_before_roofgarden.js)</li>\n<li>💾 [<code>assets/js/app.backup_perfect_pb_pa.js</code>](file:///home/olethros1318/Escritorio/Proyecto_Casa_Inteligente/assets/js/app.backup_perfect_pb_pa.js)</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Planta Baja (Nivel $\\pm0.00\\text{ m}$ / $-0.15\\text{ m}$) — 100% Intacta</h3>\n<pre><code class=\"language-\">\n ◄── 3.16 m (RECÁMARA PB) ──► ◄──────── 2.51 m (BRAZO NORTE BAÑO) ────────► ◄── 2.40 m (LAVANDERÍA) ──► ◄── 1.60 m (MÁQUINAS) ──►\n ┌───────────────────────────┬───────────────────────────────────────────┬──────────────────────────┬─────────────────────────┐ ▲ (Y = -1.05 m)\n │                           │ Vanity (0.80m)  WC  │ REGADERA (1.20x0.9) │                          │ CUARTO DE               │ │\n │   RECÁMARA SUITE PB       │ 1. BAÑO COMPLETO EN 'L' (3.77 m²)         │   CUARTO DE LAVANDERÍA   │ MÁQUINAS 12U/UV         │ │ 1.50 m\n │   (3.16 m x 4.00 m)       ├───────────────────────────────────────────┼──────────────────────────┤ (1.60 x 1.50 m = 2.4 m²)│ │\n │   Superficie: 12.64 m²    │ 2. VESTIDOR / CLÓSET (1.95 m²)            │ 3. MEDIO BAÑO DE VISITAS ├─────────────────────────┤ ▼ (Y = -2.55 m)\n │   Nivel: N.P.T. ±0.00 m   │    • Clóset empotrado 1.50 x 0.60m        │    (1.50 x 1.30 m netos) │ ◄─ SUBIDA A PLANTA ALTA │ ▲\n │   • Cama King Size        ├───────────────────────────────────────────┴──────────────────────────┤    (Tramo Norte: 11-17) │ │ 2.25 m\n │   • 2 Burós + Mueble TV   │ ◄── PASILLO QUEBRADO (NIVEL ±0.00 m) ─────┬──────────────────────────┤    Escalera Confinada   │ │\n │   • Cancel 2.85m al Jardín├───────────────────────────────────────────┤ [CLARO LIBRE DE 1.01 m]  │    (2.50 x 2.25 m)      │ │\n ╞═══════════════════════════╡ [BAJA 1 ESCALÓN: -15 cm DE DESNIVEL] ═════╧══════════════════════════┴─────────────────────────┤ ▼ (Y = -4.80 m)\n │ 4. GRAN ÁREA SOCIAL       │ ◄── VESTÍBULO DE LLEGADA DIÁFANO                                     │ 7. COCHERA TECHADA      │ ▲\n │    (22.15 m² a -0.15 m)   │      • Circulación abierta de 4.20 m²                                │    (30.28 m² Superficie)│ │\n │    • Techo 3.15 m Alto    │      • Conexión sin muros hacia la Sala y Comedor                    │    • SUV Grande (4.90m) │ │\n │    • Sala Seccional en 'L'│                                                                      │    • Compacto (4.20m)   │ │ 4.75 m\n │    • Comedor Familiar (6) │ 5. COCINA INTEGRAL CON ISLA EN LADO SUR                              │    • Punto EV 240V/40A  │ │\n │    • Cancel 3.75m al Jardín    • Barra desayunadora (3 bancos) + Mueble bajo en muro sur         │                         │ │\n └───────────────────────────┴──────────────────────────────────────────────────────────────────────┴─────────────────────────┘ ▼ (Y = -9.80 m)\n (X = 3.00 m)                (X = 6.16 m)                                                           (X = 7.66 m)              (X = 12.67 m)\n ▲ PARED TRASERA JARDÍN      ▲ MURO SUR SUITE (LÍNEA DESNIVEL)                                      ▲ ENRASE COCHERA          ▲ FACHADA PRINCIPAL\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Planta Alta (Nivel $+3.00\\text{ m}$) — 100% Intacta</h3>\n<pre><code class=\"language-\">\n ◄── 2.76 m (RECÁMARA 1) ──► ◄── 2.76 m (RECÁMARA 2) ──► ◄────── 4.00 m (BAÑO COMPARTIDO) ──────►\n ┌───────────────────────────┬───────────────────────────┬───────────────────────────────────────┐ ▲ (Y = -1.05 m)\n │ 1. RECÁMARA SECUNDARIA 1  │ 2. RECÁMARA SECUNDARIA 2  │ 3. BAÑO COMPLETO COMPARTIDO (6.00 m²) │ │\n │    (2.76 m x 4.00 m)      │    (2.76 m x 4.00 m)      │    • Vanity (1.20m) │ WC │ Regadera   │ │\n │    • Techo Nivel +2.70 m  │    • Techo Nivel +2.70 m  ├───────────────────────────────────────┤ │ 4.00 m\n │    • Cama Queen + Burós   │    • Cama Queen + Burós   │ 4. CUBO ESCALERA (PB ◄► AZOTEA)       │ │ (Ala Norte)\n │    • Escritorio + Clóset  │    • Escritorio + Clóset  │    (2.50 m x 2.25 m = 5.62 m²)        │ │\n │    ├──────────────────────┴───────────────────────────┤    • Desembarco Nivel +3.00m (PB)     │ │\n │    │ [CLÓSET 60cm] [PUERTA 1] │ [PUERTA 2] [CLÓSET 60cm] │    • Arranque hacia Azotea (+6.00m)   │ │\n ╞════╧══════════════════════════════════════════════════╧═══════════════════════════════╤═══════╡ ▼ (Y = -5.05 m)\n │ 5. ZINC (1.50 m) │ PASILLO DE DISTRIBUCIÓN (1.50 m extremos / 0.90 m libre central)   │ 7.    │ ▲\n │    0.60m fondo   │ ◄── CUBIERTA SOBREELEVADA (+3.40 m libre) / LINTERNILLA CORRIDA ──►│ GRAN  │ │ 1.50 m\n │    Ventana Alta  │     (Se extiende únicamente a lo largo de Recámaras Secundarias)   │ BALCÓN│ │ Galería\n ╞══════════════════╪════════════════════════════════════════════════════════════════════╡ (1.50 │ ▼ (Y = -6.55 m)\n │ 8. BAÑO PRINCIPAL│ 9. FAMILY ROOM DIÁFANO             │ 11. HABITACIÓN PRINCIPAL      │   x   │ ▲\n │    (2.00x3.25m)  │    (2.67 m x 2.35 m = 6.27 m²)     │     (3.50 m x 3.25 m = 11.38m²)│ 4.75m)│ │ 3.25 m\n │    • Regadera Spa│    • Concepto Abierto sin Muro N.  │     • Cama King Size + Burós  │       │ │ Crujía\n │    • WC Privado  │    • Paso Libre de 90 cm           │     • Salida Directa a Balcón │       │ │ Sur\n │    • Doble Vanity├────────────────────────────────────┤     [PUERTA EXCLUSIVA MASTER] │       │ │\n │    • [PUERTA]    │ 10. PASILLO-CLÓSET MASTER (1.50 m) ┼───────────────────────────────►│       │ │\n └──────────────────┴────────────────────────────────────┴───────────────────────────────┴───────┘ ▼ (Y = -9.80 m)\n (X = 3.00 m)        (X = 5.00 m)                         (X = 7.67 m)                    (X=11.17) (X=12.67)\n ▲ PARED DEL JARDÍN (PONIENTE)                                                            ▲ FACHADA PRINCIPAL (ESTE)\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>4. Azotea Oficial: Roof Garden Frontal con 1/2 Baño Social (Nivel $+6.00\\text{ m}$)</h3>\n<pre><code class=\"language-\">\n ◄── 5.52 m (ZONA TÉCNICA Y CUBIERTA SOBREELEVADA POSTERIOR) ──► ◄── 1.65 m (1/2 BAÑO) ──► ◄── 2.50 m (CASETA) ──►\n ┌───────────────────────────────────────────────────────────────┬─────────────────────────┬──────────────────────┐ ▲ (Y = -1.05 m)\n │ 1. ZONA TÉCNICA NORTE (Al lado de la Cubierta Sobreelevada)   │                         │ 5. CASETA ESCALERA   │ │\n │    • 6x Paneles Solares Fotovoltaicos 3.3 kWp (550W c/u)      │                         │    (2.50 x 2.25 m)   │ │\n │    • Calentador Solar de Agua Termosifónico (200 L / 15 tubos)│ 4. MEDIO BAÑO DE VISITAS│    • Puerta Hermética│ │ 3.75 m\n │    • Orientación óptima al Sur (180°) e inclinación 45°       │    (1.65 x 2.25 = 3.7m²)│    • Salida Interior │ │\n ├───────────────────────────────────────────────────────────────┤    • Vanity Lavamanos   ├──────────────────────┤ ▼ (Y = -4.80 m)\n │ 2. CUBIERTA SOBREELEVADA DEL PASILLO (+6.70 m / Linternilla)  │    • Inodoro WC         │                      │ ▲\n │    • Longitud: 5.52 m (Termina en Hab. Secundarias: X = 8.52m)│    • Puerta al Deck     │                      │ │\n │    • Aleros Volados de 30 cm • Celosías Louvers Norte y Sur   ├─────────────────────────┴──────────────────────┤ │\n ├───────────────────────────────────────────────────────────────┤ 6. ROOF GARDEN SOCIAL FRONTAL (40.5 m²)        │ │\n │ 3. ZONA TÉCNICA SUR (Al lado de la Cubierta Sobreelevada)     │    • Pérgola bioclimática de sombra            │ │ 5.00 m\n │    • 3x Condensadoras A/C Inverter (PB, Master, Secundarias)  │    • Sala Modular Lounge Exterior con Firepit  │ │ Crujía Sur\n │    • Ocultas de la vista frontal y sobre gomas antivibratorias│    • Asador Grill Inox + Tarja + Barra Bancos  │ │ y Frente\n │                                                               │    • Barandal Frontal Cristal Templado         │ │\n └───────────────────────────────────────────────────────────────┴────────────────────────────────────────────────┘ ▼ (Y = -9.80 m)\n (X = 3.00 m)                                                    (X = 8.52 m)              (X = 10.17 m)  (X = 12.67 m)\n ▲ FONDO / COLINDANCIA POSTERIOR                                 ▲ LÍMITE HAB. SECUNDARIAS ▲ EJE CASETA   ▲ FACHADA (CALLE)\n</code></pre>\n<h4>🌟 Ventajas del Medio Baño en Azotea:</h4>\n<ol>\n<li><strong>Privacidad Total en la Casa:</strong></li>\n<li>Las visitas en el Roof Garden cuentan con su propio medio baño independiente sin invadir las recámaras ni los baños familiares de Planta Alta.</li>\n<li><strong>Eficiencia Hidrosanitaria Vertical:</strong></li>\n<li>Ubicado verticalmente sobre el ducto y shaft del baño de Planta Alta, facilitando la bajada sanitaria y la alimentación de agua desde el calentador solar.</li>\n</ul>", "mep": "<h2>Proyecto Ejecutivo de Ingenierías MEP & Domótica Integrada</h2>\n<p><strong>Residencia Inteligente:</strong> Terreno 153.19 m² | Construcción ≈235 m² (3 Niveles)</p>\n<p><strong>Normativas Aplicables:</strong> NOM-001-SEDE-2012 (Instalaciones Eléctricas), NOM-008-SCFI, Criterios ASHRAE / IEEE 802.11be (Wi-Fi 7) / Zigbee 3.0 / Matter over Thread.</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Cuadro de Cargas y Diseño Eléctrico (220V / 110V Bifásico)</h3>\n<h4>1.1. Centro de Carga Principal (QO-24 en Cuarto de Máquinas de PB)</h4>\n<ul>\n<li><strong>Acometida Eléctrica:</strong> Bifásica 2F-3H (Fase 1, Fase 2, Neutro y Tierra Física Calibre 4 AWG).</li>\n<li><strong>Medidor:</strong> Bidireccional CFE con conexión al inversor solar fotovoltaico ($3.3\\text{ kWp}$).</li>\n<li><strong>Sistema de Puesta a Tierra:</strong> 2 Electrodos de cobre Copperweld ($5/8\" \\times 3.00\\text{ m}$) con pozo de registro, compuesto mejorador y barra colectora equipotencial en el Rack.</li>\n</ul>\n<pre><code class=\"language-\">\n┌────────────────────────────────────────────────────────────────────────────────────────┐\n│                        TABLERO DE DISTRIBUCIÓN PRINCIPAL (QO-24)                       │\n├────┬─────────────────────────────┬───────────┬─────────┬──────────────┬────────────────┤\n│ Ckt│ Descripción                 │ Tensión   │ Amperaje│ Calibre Cable│ Protección / GF│\n├────┼─────────────────────────────┼───────────┼─────────┼──────────────┼────────────────┤\n│ 1-2│ Cargador Vehículo Eléctrico │ 240V (2F) │ 40 A    │ 2x 8 AWG + T │ Termomagnético │\n│ 3-4│ Climas Inverter Master & PB │ 240V (2F) │ 30 A    │ 2x 10 AWG + T│ Termomagnético │\n│ 5-6│ Climas Inverter Secundarias │ 240V (2F) │ 20 A    │ 2x 12 AWG + T│ Termomagnético │\n│ 7  │ Rack Domótico & Servidores  │ 120V (1F) │ 20 A    │ 12 AWG + T   │ UPS Online Doble│\n│ 8  │ Bomba Presurizadora & UV    │ 120V (1F) │ 15 A    │ 12 AWG + T   │ GFCI           │\n│ 9  │ Cocina (Refrigerador & Isla)│ 120V (1F) │ 20 A    │ 12 AWG + T   │ GFCI           │\n│ 10 │ Microondas & Horno Empotrado│ 120V (1F) │ 20 A    │ 12 AWG + T   │ Termomagnético │\n│ 11 │ Lavadora & Centro de Lavado │ 120V (1F) │ 20 A    │ 12 AWG + T   │ GFCI           │\n│ 12 │ Iluminación Planta Baja     │ 120V (1F) │ 15 A    │ 14 AWG (Neut)│ Domótico/DALI  │\n│ 13 │ Iluminación Planta Alta     │ 120V (1F) │ 15 A    │ 14 AWG (Neut)│ Domótico/DALI  │\n│ 14 │ Iluminación Roof Garden     │ 120V (1F) │ 15 A    │ 14 AWG (Neut)│ GFCI Exterior  │\n│ 15 │ Contactos Uso General PB    │ 120V (1F) │ 20 A    │ 12 AWG + T   │ GFCI Húmedas   │\n│ 16 │ Contactos Uso General PA    │ 120V (1F) │ 20 A    │ 12 AWG + T   │ Termomagnético │\n│ 17 │ Contactos & Grill Roof Top  │ 120V (1F) │ 20 A    │ 12 AWG + T   │ GFCI Exterior  │\n│ 18 │ Calentador Respaldo (Gas)   │ 120V (1F) │ 15 A    │ 14 AWG + T   │ Termomagnético │\n│19-2│ Reserva para Expansión      │ 120V/240V │ -       │ -            │ -              │\n└────┴─────────────────────────────┴───────────┴─────────┴──────────────┴────────────────┘\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Iluminación Inteligente y Sensores de Presencia (mmWave)</h3>\n<h4>2.1. Tipología de Alumbrado y Control</h4>\n<ol>\n<li><strong>Luz General y Acentuación:</strong> Tiras LED COB 24V continuas (sin puntos visibles) empotradas en cajillos de tablaroca y cornisas arquitectónicas con difusor opalino.</li>\n<li><strong>Ritmo Circadiano:</strong> Temperatura de color dinámica (CCT 2700K ámbar cálido al anochecer $\\rightarrow$ 4000K neutro energizante durante el día).</li>\n<li><strong>Apagadores Inteligentes con Neutro (Zigbee 3.0 / Matter):</strong></li>\n<li>Placas tipo touch / botones mecánicos con grabado láser y retroiluminación configurable.</li>\n<li>Funcionan de forma 100% manual e independiente si el servidor central se apaga.</li>\n</ul>\n<h4>2.2. Sensores de Presencia Humana por Microondas (mmWave 24GHz / 60GHz)</h4>\n<ul>\n<li><strong>Ventaja:</strong> Detectan microrrespiración y presencia estática (a diferencia de los sensores PIR tradicionales que apagan la luz si la persona está quieta en el sillón, cama o inodoro).</li>\n<li><strong>Distribución de Sensores mmWave:</strong></li>\n<li><strong>PB:</strong> Área Social (Sala/Comedor), Cocina, Pasillo, Medio Baño, Baño Suite y Cuarto de Lavandería.</li>\n<li><strong>PA:</strong> Pasillo de distribución, Family Room, Baño Compartido y Baño Master.</li>\n<li><strong>Roof Garden:</strong> Escalera y Medio Baño Social.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Red Estructurada, CCTV y Ciberseguridad</h3>\n<pre><code class=\"language-\">\n  INTERNET (Fibra Óptica 1 Gbps)\n            │\n            ▼\n ┌─────────────────────────────────────────────────────────────┐\n │ RACK 12U - CUARTO DE MÁQUINAS (Planta Baja X=12.67m, Y=-1.05m)│\n │  • PDU 8 Tomas Regulada con Supresor de Picos (15A)        │\n │  • UPS Online 1500VA / 900W Doble Conversión               │\n │  • Router / Gateway UniFi Cloud Gateway Ultra (1 Gbps IPS)  │\n │  • Switch PoE+ Gigabit 16 Puertos (120W Budget)            │\n │  • Patch Panel Cat6A 24 Puertos UTP 100% Cobre             │\n │  • Servidor Home Assistant Yellow / Mini PC Proxmox N100   │\n │  • NVR / Disco 4TB Grabación Local 24/7 (Cero Nubes Pagas) │\n │  • Coordinador Zigbee 3.0 / Matter over Thread (SLZB-06 PoE)│\n └──────────────────────────────┬──────────────────────────────┘\n                                │\n       ┌────────────────────────┼────────────────────────┐\n       ▼                        ▼                        ▼\n┌──────────────┐         ┌──────────────┐         ┌──────────────┐\n│ PUNTOS DE    │         │ CÁMARAS CCTV │         │ CONTROL DE   │\n│ ACCESO WI-FI7│         │ 4K POE LOCAL │         │ ACCESOS      │\n├──────────────┤         ├──────────────┤         ├──────────────┤\n│ • AP1 (PB)   │         │ • CAM 1: Ext │         │ • Cerradura  │\n│ • AP2 (PA)   │         │   Cochera/Calle│       │   Biométrica │\n│ • AP3 (Roof) │         │ • CAM 2: Acc.│         │ • Videoporter│\n│              │         │   Peatonal   │         │   PoE 2K     │\n│              │         │ • CAM 3: Jard│         │ • Chapa Eléc.│\n│              │         │ • CAM 4: Roof│         │              │\n└──────────────┘         └──────────────┘         └──────────────┘\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>4. Ingeniería Hidrosanitaria y Calentamiento Solar</h3>\n<h4>4.1. Red de Agua Potable y Presurización Constante</h4>\n<ul>\n<li><strong>Cisterna:</strong> Capacidad $5,000\\text{ L}$ subterránea con sensor ultrasónico de nivel en tiempo real.</li>\n<li><strong>Bomba Presurizadora Inverter Sumergible:</strong> Presión constante regulable a $3.5\\text{ bar}$ ($50\\text{ PSI}$) en todas las regaderas y tarjas de manera simultánea.</li>\n<li><strong>Purificación:</strong> Filtro de sedimentos de 5 micras + Filtro de carbón activado + Lámpara de desinfección Ultravioleta (UV) en el Cuarto de Máquinas.</li>\n</ul>\n<h4>4.2. Sistema Híbrido Solar + Recirculación Cero Desperdicio</h4>\n<ol>\n<li><strong>Calentador Solar de Tubos de Vacío ($200\\text{ L}$):</strong></li>\n<li>Genera agua a $65^\\circ\\text{C}-80^\\circ\\text{C}$ sin consumir gas.</li>\n<li><strong>Válvula Desviadora Termostática Inteligente:</strong></li>\n<li>Si el agua solar está a más de $42^\\circ\\text{C} \\rightarrow$ Pasa directo a las regaderas (Consumo de gas = 0%).</li>\n<li>Si es un día nublado ($<42^\\circ\\text{C}$) $\\rightarrow$ Se enciende automáticamente el calentador instantáneo modulante de respaldo para alcanzar la temperatura deseada.</li>\n<li><strong>Bomba Recirculadora Inteligente de Agua Caliente:</strong></li>\n<li>Evita esperar 1-2 minutos a que salga agua caliente en las regaderas de Planta Alta o PB.</li>\n<li>Se activa por sensor de presencia mmWave al entrar al baño, purgando la tubería fría hacia la cisterna en 15 segundos para tener agua caliente instantánea en cuanto abres la llave.</li>\n</ul>", "plumbing": "<h2>Proyecto Ejecutivo de Instalaciones Hidrosanitarias & Drenaje Pluvial</h2>\n<p><strong>Proyecto:</strong> Residencia Domótica Inteligente (153.19 m² Terreno | ≈235 m² Construcción en 3 Niveles)</p>\n<p><strong>Normativas de Cumplimiento:</strong> NOM-001-CONAGUA-2011, Manual de Instalaciones Hidráulicas y Sanitarias (Criterios Neufert & Hunter).</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Planos Técnicos Generados</h3>\n<ul>\n<li>📐 <strong>[Plano Isométrico e Hidráulico Solar](file:///home/olethros1318/Escritorio/Proyecto_Casa_Inteligente/planos_y_diagramas/01_plano_isometrico_hidraulico_y_solar.svg)</strong></li>\n<li>📐 <strong>[Plano de Red Sanitaria, Ventilación y Pluvial](file:///home/olethros1318/Escritorio/Proyecto_Casa_Inteligente/planos_y_diagramas/02_plano_red_sanitaria_y_pluvial.svg)</strong></li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Memorias de Cálculo y Dimensionamiento</h3>\n<h4>2.1. Cálculo de Demanda de Agua Potable Diaria</h4>\n<ul>\n<li><strong>Ocupación:</strong> 6 personas (Familia + Visitas).</li>\n<li><strong>Dotación Reglamentaria:</strong> $200\\text{ L/habitante/día}$.</li>\n<li><strong>Demanda Diaria Total:</strong> $6 \\times 200 = 1,200\\text{ L/día}$.</li>\n<li><strong>Reserva de Emergencia (Cisterna):</strong> $1,200\\text{ L/día} \\times 4\\text{ días de autonomía} = 4,800\\text{ L} \\rightarrow$ <strong>Cisterna Seleccionada: $5,000\\text{ L}$</strong>.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>2.2. Sistema de Presurización Inverter</h4>\n<ul>\n<li><strong>Bomba Sumergible Multietapas Inverter (Frecuencia Variable):</strong></li>\n<li><strong>Caudal Nominal:</strong> $60\\text{ L/min}$ a $3.5\\text{ bar}$ ($50\\text{ PSI}$).</li>\n<li><strong>Ventaja Inverter:</strong> Solo consume la energía exacta requerida según cuántas llaves o regaderas estén abiertas; nivel de ruido $< 35\\text{ dB}$ (inapreciable desde el interior).</li>\n<li><strong>Filtración y Purificación:</strong> Filtro de sedimentos de $5\\,\\mu\\text{m}$, filtro de bloque de carbón activado y esterilizador de luz ultravioleta ($12\\text{ GPM}$) garantizando agua potable en toda la casa.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>2.3. Sistema Solar Térmico y Calentamiento Híbrido</h4>\n<ul>\n<li><strong>Calentador Solar de Tubos de Vacío ($200\\text{ L}$):</strong></li>\n<li>15 tubos de borosilicato tricapa ($58\\text{ mm} \\times 1,800\\text{ mm}$) orientados al Sur con inclinación de $45^\\circ$.</li>\n<li>Temperatura de entrega promedio: $65^\\circ\\text{C}$ a $80^\\circ\\text{C}$.</li>\n<li><strong>Válvula Desviadora Termostática Inteligente (Bypass):</strong></li>\n<li>Si el agua solar $≥ 42^\\circ\\text{C} \\rightarrow$ Pasa directa al consumo (ahorro 100% de gas).</li>\n<li>Si el agua solar $< 42^\\circ\\text{C} \\rightarrow$ Pasa a través del calentador instantáneo modulante de respaldo para complementar los grados faltantes.</li>\n<li><strong>Anillo de Recirculación Inteligente:</strong></li>\n<li>Tubería de retorno de $1/2\"$ desde los baños de PA y Suite PB con bomba circuladora de $12\\text{W}$ activada por los sensores de presencia mmWave de Home Assistant.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Red Sanitaria y Ventilación</h3>\n<h4>3.1. Separación de Aguas y Diámetros Nominales</h4>\n<ol>\n<li><strong>Aguas Negras (BSN):</strong></li>\n<li>Tubería de PVC Sanitario de $4\"$ ($110\\text{ mm}$) con pendiente mínima del $2.0\\%$.</li>\n<li>Descarga directa de inodoros con codos a $45^\\circ$ hacia el registro principal.</li>\n<li><strong>Aguas Grises / Jabonosas (BSG):</strong></li>\n<li>Tubería de PVC Sanitario de $3\"$ y $2\"$ desde regaderas, lavamanos, vertedero de zinc y lavandería.</li>\n<li>Trampa de grasas hermética bajo la tarja de cocina y trampa de pelusas en lavandería.</li>\n<li><strong>Columna de Ventilación Sanitaria (CVS):</strong></li>\n<li>Tubería vertical de PVC de $2\"$ ($50\\text{ mm}$) que corre por el shaft y remata en azotea a $+7.20\\text{ m}$ con sombrero chino.</li>\n<li><strong>Función Clave:</strong> Equilibra las presiones hidrostáticas, evita que las trampas 'P' se vacíen por sifonamiento y expulsa los gases sanitarios al exterior.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>4. Drenaje Pluvial y Captación de Lluvia</h3>\n<ul>\n<li><strong>Pendientes de Losa:</strong> $2.0\\%$ hacia los embudos pluviales esquineros de azotea.</li>\n<li><strong>Bajadas de Agua Pluvial (BAP):</strong> Tubería de PVC de $4\"$ que baja oculta en muros y pasa por filtro interceptor de hojas y sedimentos antes de descargar en el jardín o drenaje pluvial.</li>\n</ul>", "civilbudget": "<h2>Presupuesto Paramétrico Integral y Catálogo de Conceptos de Obra Civil</h2>\n<p><strong>Proyecto:</strong> Residencia Domótica Inteligente (153.19 m² Terreno | 235.0 m² Construcción Total en 3 Niveles)</p>\n<p><strong>Calidad de Obra:</strong> Residencial Medio-Alto / Smart Home Sustentable</p>\n<p><strong>Costo Paramétrico Estimado:</strong> $\\$15,200\\text{ MXN/m}^2$ ($\\$760\\text{ USD/m}^2$ | Tipo de Cambio Ref.: $\\$20.00\\text{ MXN/USD}$)</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Resumen Ejecutivo por Etapas de Construcción</h3>\n<pre><code class=\"language-\">\n┌─────────────────────────────────────────────────────────────────────────────────────────────┐\n│                    DESGLOSE GENERAL DE INVERSIÓN POR ETAPAS DE CONSTRUCCIÓN                 │\n├──────┬──────────────────────────────────────────┬──────────────┬───────────────┬────────────┤\n│Etapa │ Descripción de la Partida Constructiva   │ Inversión MXN│ Inversión USD │ % del Total│\n├──────┼──────────────────────────────────────────┼──────────────┼───────────────┼────────────┤\n│ 00   │ Trámites, Licencias, DRO & Proyecto Ejec.│ $145,000 MXN │ $7,250 USD    │ 4.0 %      │\n│ 01   │ Preliminares, Cimentación & Cisterna 5kL │ $475,000 MXN │ $23,750 USD   │ 13.3 %     │\n│ 02   │ Obra Negra: Muros, Losas, Linternilla    │ $890,000 MXN │ $44,500 USD   │ 24.9 %     │\n│ 03   │ Instalaciones Ocultas MEP (Ductos, PPR)  │ $285,000 MXN │ $14,250 USD   │ 8.0 %      │\n│ 04   │ Aplanados, Yeso, Impermeabilización Azot.│ $260,000 MXN │ $13,000 USD   │ 7.3 %      │\n│ 05   │ Pisos Porcelánicos, Azulejos & Baños     │ $390,000 MXN │ $19,500 USD   │ 10.9 %     │\n│ 06   │ Carpintería Fina (Cocina Isla, Clósets)  │ $380,000 MXN │ $19,000 USD   │ 10.6 %     │\n│ 07   │ Cancelería Aluminio Serie Euro & Vidrios │ $245,000 MXN │ $12,250 USD   │ 6.9 %      │\n│ 08   │ Equipamiento Domótico, Solar & Climas A/C│ $362,000 MXN │ $18,100 USD   │ 10.1 %     │\n│ 09   │ Pintura, Limpieza Fina & Puesta en Marcha│ $140,000 MXN │ $7,000 USD    │ 4.0 %      │\n├──────┴──────────────────────────────────────────┼──────────────┼───────────────┼────────────┤\n│      TOTAL ESTIMADO DE CONSTRUCCIÓN (235 m²)    │$3,572,000 MXN│ $178,600 USD  │ 100.0 %    │\n└─────────────────────────────────────────────────┴──────────────┴───────────────┴────────────┘\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Catálogo Detallado de Conceptos por Partida</h3>\n<h4>ETAPA 00: Gestoría, Permisos y Estudios Preliminares ($145,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Estudio de Mecánica de Suelos (3 sondeos a $4.00\\text{ m}$):</strong> $\\$18,000\\text{ MXN}$ ($\\$900\\text{ USD}$).</li>\n<li><strong>Levantamiento Topográfico & Deslinde Notarial:</strong> $\\$8,000\\text{ MXN}$ ($\\$400\\text{ USD}$).</li>\n<li><strong>Cálculo Estructural y Firma de Perito DRO (Director Responsable de Obra):</strong> $\\$45,000\\text{ MXN}$ ($\\$2,250\\text{ USD}$).</li>\n<li><strong>Licencia Municipal de Construcción, Número Oficial y Alineamiento:</strong> $\\$54,000\\text{ MXN}$ ($\\$2,700\\text{ USD}$).</li>\n<li><strong>Contratos Provisionales de Agua (Agua y Drenaje) y Luz (CFE 220V):</strong> $\\$20,000\\text{ MXN}$ ($\\$1,000\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 01: Preliminares, Cimentación y Cisterna ($475,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Limpieza, Deshierbe, Trazo y Nivelación con Estación Total (153.19 m²):</strong> $\\$16,000\\text{ MXN}$ ($\\$800\\text{ USD}$).</li>\n<li><strong>Excavación para Zapatas Corridas / Losa de Cimentación ($1.20\\text{ m}$ prof.):</strong> $\\$65,000\\text{ MXN}$ ($\\$3,250\\text{ USD}$).</li>\n<li><strong>Cisterna Subterránea de $5,000\\text{ L}$ en Concreto Armado Impermeabilizado:</strong> $\\$68,000\\text{ MXN}$ ($\\$3,400\\text{ USD}$).</li>\n<li><strong>Armado de Acero (Varilla $3/8\", 1/2\", 5/8\"$) y Colado de Cimentación Concreto f'c=$250\\text{ kg/cm}^2$:</strong> $\\$270,000\\text{ MXN}$ ($\\$13,500\\text{ USD}$).</li>\n<li><strong>Rellenos Compactados con Bailarina Mecánica por Capas de $20\\text{ cm}$:</strong> $\\$32,000\\text{ MXN}$ ($\\$1,600\\text{ USD}$).</li>\n<li><strong>Fumigación Antitermitas en Terreno:</strong> $\\$24,000\\text{ MXN}$ ($\\$1,200\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 02: Obra Negra y Estructura en 3 Niveles ($890,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Muros de Block de Concreto Térmico / Ladrillo Rojo Recocido con Castillos y Dalas de Concreto:</strong> $\\$340,000\\text{ MXN}$ ($\\$17,000\\text{ USD}$).</li>\n<li><strong>Losa de Entrepiso PB-PA (Vigueta y Bovedilla de Poliestireno / Concreto f'c=$250\\text{ kg/cm}^2$):</strong> $\\$230,000\\text{ MXN}$ ($\\$11,500\\text{ USD}$).</li>\n<li><strong>Losa de Azotea General ($84.6\\text{ m}^2$) + Caseta de Escalera y 1/2 Baño:</strong> $\\$185,000\\text{ MXN}$ ($\\$9,250\\text{ USD}$).</li>\n<li><strong>Estructura de la Cubierta Sobreelevada (<em>Monitor Roof</em>) con Aleros Volados:</strong> $\\$48,000\\text{ MXN}$ ($\\$2,400\\text{ USD}$).</li>\n<li><strong>Escalera de Concreto Armado Continua (PB a PA y PA a Roof Garden - 34 escalones):</strong> $\\$52,000\\text{ MXN}$ ($\\$2,600\\text{ USD}$).</li>\n<li><strong>Pretiles de Seguridad en Azotea ($1.05\\text{ m}$ alto):</strong> $\\$35,000\\text{ MXN}$ ($\\$1,750\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 03: Instalaciones Ocultas MEP & Domótica en Obra Negra ($285,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Canalizaciones Conduit Pesadas ($1\"$ y $3/4\"$), Chalupas Profundas y Cajas 4x4\":</strong> $\\$42,000\\text{ MXN}$ ($\\$2,100\\text{ USD}$).</li>\n<li><strong>Cableado Eléctrico Cobre Antiflama (Calibres 8, 10, 12 y 14 AWG con Neutro al 100%):</strong> $\\$78,000\\text{ MXN}$ ($\\$3,900\\text{ USD}$).</li>\n<li><strong>Cableado Estructurado Cat6A UTP 100% Cobre a Todas las Estancias y APs Wi-Fi 7:</strong> $\\$28,000\\text{ MXN}$ ($\\$1,400\\text{ USD}$).</li>\n<li><strong>Red Hidráulica de Agua Fría y Caliente Solar en Tubería PPR Termofusionada Aislada:</strong> $\\$56,000\\text{ MXN}$ ($\\$2,800\\text{ USD}$).</li>\n<li><strong>Red Sanitaria PVC 4\" y 3\", Columna de Ventilación 2\" y Bajadas Pluviales BAP 4\":</strong> $\\$49,000\\text{ MXN}$ ($\\$2,450\\text{ USD}$).</li>\n<li><strong>Líneas Frigoríficas de Cobre y Desagües Embebidos para 3 Equipos A/C Inverter:</strong> $\\$32,000\\text{ MXN}$ ($\\$1,600\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 04: Obra Gris, Aplanados e Impermeabilización ($260,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Aplanados de Yeso Muestreado en Muros Interiores y Plafones:</strong> $\\$95,000\\text{ MXN}$ ($\\$4,750\\text{ USD}$).</li>\n<li><strong>Zarpeo y Afine en Muros Exteriores y Fachadas con Hidrófugo:</strong> $\\$78,000\\text{ MXN}$ ($\\$3,900\\text{ USD}$).</li>\n<li><strong>Impermeabilización Prefabricada Termofusionada $4.5\\text{ mm}$ con Poliéster en Azotea (Garantía 10 Años):</strong> $\\$48,000\\text{ MXN}$ ($\\$2,400\\text{ USD}$).</li>\n<li><strong>Contrapisos Nivelados y Membrana Impermeable en Zonas Húmedas de Baños:</strong> $\\$39,000\\text{ MXN}$ ($\\$1,950\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 05: Pisos, Recubrimientos y Muebles de Baño ($390,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Piso Porcelánico Rectificado Gran Formato ($60\\times 120\\text{ cm}$) en PB y PA ($185\\text{ m}^2$):</strong> $\\$165,000\\text{ MXN}$ ($\\$8,250\\text{ USD}$).</li>\n<li><strong>Piso Deck Exterior / Porcelanato Antiderrapante en Roof Garden y Balcón ($55\\text{ m}^2$):</strong> $\\$58,000\\text{ MXN}$ ($\\$2,900\\text{ USD}$).</li>\n<li><strong>Azulejos de Muro a Techo en Regaderas y Muros de Acento:</strong> $\\$42,000\\text{ MXN}$ ($\\$2,100\\text{ USD}$).</li>\n<li><strong>4 Inodoros Suspendidos / One-Piece Ecológicos de Doble Descarga:</strong> $\\$32,000\\text{ MXN}$ ($\\$1,600\\text{ USD}$).</li>\n<li><strong>Vanities de Baño con Cubiertas de Cuarzo y Grifería Monomando Negro Mate:</strong> $\\$58,000\\text{ MXN}$ ($\\$2,900\\text{ USD}$).</li>\n<li><strong>Regaderas Tipo Lluvia Spa con Monomandos Termostáticos Embebidos:</strong> $\\$35,000\\text{ MXN}$ ($\\$1,750\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 06: Carpintería Integral & Herrería ($380,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Cocina Integral de Diseño con Isla Central, Cierres Suaves y Cubierta de Granito/Cuarzo:</strong> $\\$185,000\\text{ MXN}$ ($\\$9,250\\text{ USD}$).</li>\n<li><strong>Puerta Principal Monumental de Seguridad en Madera Sólida / Acero con Chapa Biométrica:</strong> $\\$38,000\\text{ MXN}$ ($\\$1,900\\text{ USDParsing}$):<em></em> $\\$38,000\\text{ MXN}$ ($\\$1,900\\text{ USD}$).</li>\n<li><strong>Puertas Interiores Semisólidas con Marco Envolvente y Sellos Acústicos (8 piezas):</strong> $\\$56,000\\text{ MXN}$ ($\\$2,800\\text{ USD}$).</li>\n<li><strong>Clósets Empotrados en Recámaras 1, 2 y Suite PB + Vestidor Walk-in Master Suite:</strong> $\\$78,000\\text{ MXN}$ ($\\$3,900\\text{ USD}$).</li>\n<li><strong>Pérgola Metálica de Acero Estructural y Vigas de Sombra en Roof Garden:</strong> $\\$23,000\\text{ MXN}$ ($\\$1,150\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 07: Cancelería de Aluminio, Cristales Templados y Barandales ($245,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Cancelería de Aluminio Negro Serie Eurovent 70/80 con Cristal Templado $6\\text{ mm}$:</strong> $\\$135,000\\text{ MXN}$ ($\\$6,750\\text{ USD}$).</li>\n<li><strong>Canceles de Cristal Templado $9.5\\text{ mm}$ en Regaderas con Herrajes de Acero Inox:</strong> $\\$38,000\\text{ MXN}$ ($\\$1,900\\text{ USD}$).</li>\n<li><strong>Barandal de Cristal Templado en Balcón Frontal y Roof Garden ($1.05\\text{ m}$ alto):</strong> $\\$42,000\\text{ MXN}$ ($\\$2,100\\text{ USD}$).</li>\n<li><strong>Celosías Louvers Antilluvia en Cubierta Sobreelevada del Pasillo:</strong> $\\$30,000\\text{ MXN}$ ($\\$1,500\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 08: Equipamiento Tecnológico, Energías Limpias & Climas ($362,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Arreglo Fotovoltaico Solar 3.3 kWp (6 Paneles 550W + Microinversores):</strong> $\\$78,000\\text{ MXN}$ ($\\$3,900\\text{ USD}$).</li>\n<li><strong>Calentador Solar de Agua Termosifónico (200 L con 15 Tubos de Vacío Inox):</strong> $\\$19,000\\text{ MXN}$ ($\\$950\\text{ USD}$).</li>\n<li><strong>Sistema de Climatización A/C Multi-Split Inverter (3 Condensadoras + 4 Evaporadoras):</strong> $\\$98,000\\text{ MXN}$ ($\\$4,900\\text{ USD}$).</li>\n<li><strong>Bomba Presurizadora Inverter Sumergible + Filtros + Lámpara UV:</strong> $\\$34,000\\text{ MXN}$ ($\\$1,700\\text{ USD}$).</li>\n<li><strong>Rack 12U Equipado (Gateway UniFi, Switch PoE+, Servidor Home Assistant, UPS Online):</strong> $\\$46,000\\text{ MXN}$ ($\\$2,300\\text{ USD}$).</li>\n<li><strong>Iluminación Inteligente (Tiras COB LED, Dimmers DALI, Apagadores Zigbee/Matter):</strong> $\\$45,000\\text{ MXN}$ ($\\$2,250\\text{ USD}$).</li>\n<li><strong>CCTV 4K PoE, Videoportero, Cerradura Biométrica y Sensores mmWave:</strong> $\\$42,000\\text{ MXN}$ ($\\$2,100\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 09: Pintura, Limpieza Fina y Entrega Llave en Mano ($140,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Pintura Vinílica Lavable de Primera Calidad (Comex Vinimex Total / Berel Kalos):</strong> $\\$65,000\\text{ MXN}$ ($\\$3,250\\text{ USD}$).</li>\n<li><strong>Jardinería Frontal y Trasera con Césped San Agustín y Sistema de Riego:</strong> $\\$28,000\\text{ MXN}$ ($\\$1,400\\text{ USD}$).</li>\n<li><strong>Limpieza Fina de Obra Profunda (Retiro de etiquetas, pulido de pisos y cristales):</strong> $\\$18,000\\text{ MXN}$ ($\\$900\\text{ USD}$).</li>\n<li><strong>Pruebas de Presión Hidráulica, Calibración de Escenas Domóticas y Trámite de Cierre:</strong> $\\$31,000\\text{ MXN}$ ($\\$1,550\\text{ USD}$).</li>\n</ul>", "masterplan": "<h2>Plan Maestro de Construcción Paso a Paso: Desde la Planeación hasta Abrir la Puerta</h2>\n<p><strong>Proyecto:</strong> Residencia Domótica Inteligente (153.19 m² Terreno | 235.0 m² Construcción en 3 Niveles)</p>\n<p><strong>Duración Total Estimada:</strong> 10 Meses de Obra Civil + 3 Meses de Gestoría y Licitación Previa</p>\n<p><strong>Modalidad de Ejecución:</strong> Administración Directa / Contrato a Precio Alzado por Etapas</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<pre><code class=\"language-\">\n                                CRONOGRAMA DE EJECUCIÓN MAESTRO (10 MESES DE OBRA)\n ┌───────────────────────────────────────────────┬───┬───┬───┬───┬───┬───┬───┬───┬───┬────┐\n │ FASE / PARTIDA CONSTRUCTIVA                   │M1 │M2 │M3 │M4 │M5 │M6 │M7 │M8 │M9 │M10 │\n ├───────────────────────────────────────────────┼───┼───┼───┼───┼───┼───┼───┼───┼───┼────┤\n │ 0. Gestoría, Permisos y Contratos Preliminares│███│   │   │   │   │   │   │   │   │    │ (Pre-obra)\n │ 1. Trazo, Cimentación & Cisterna 5,000 L      │███│███│   │   │   │   │   │   │   │    │\n │ 2. Muros, Castillos y Losa Entrepiso PB-PA    │   │   │███│███│   │   │   │   │   │    │\n │ 3. Muros PA, Losa Azotea, Caseta & Linternilla│   │   │   │███│███│   │   │   │   │    │\n │ 4. Instalaciones Ocultas MEP, Ductos y Cat6A  │   │   │   │   │███│███│   │   │   │    │\n │ 5. Aplanados, Yesos & Impermeabilización Azot.│   │   │   │   │   │███│███│   │   │    │\n │ 6. Pisos Porcelánicos, Azulejos & Muebles Baño│   │   │   │   │   │   │███│███│   │    │\n │ 7. Cancelería Eurovent, Vidrios & Carpintería │   │   │   │   │   │   │   │███│███│    │\n │ 8. Equipamiento Solar, Climas, Rack & Domótica│   │   │   │   │   │   │   │   │███│███ │\n │ 9. Pintura, Pruebas, Limpieza Fina & LLAVE    │   │   │   │   │   │   │   │   │   │████│\n └───────────────────────────────────────────────┴───┴───┴───┴───┴───┴───┴───┴───┴───┴────┘\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>🏗️ Guía Operativa Paso a Paso de la Construcción</h3>\n<h4>FASE 0: Planeación, Financiamiento y Gestoría Legal (Mes -3 a Mes 0)</h4>\n<ol>\n<li><strong>Paso 1: Mecánica de Suelos y Topografía:</strong></li>\n<li>Ejecución de 3 sondeos para determinar la capacidad de carga del suelo ($q_{adm}$) y cálculo estructural exacto de zapatas.</li>\n<li><strong>Paso 2: Aprobación del Proyecto Ejecutivo & Firma DRO:</strong></li>\n<li>Integración de planos arquitectónicos, estructurales e hidrosanitarios con firma de Director Responsable de Obra.</li>\n<li><strong>Paso 3: Trámite de Licencia de Construcción Municipal:</strong></li>\n<li>Ingreso de expediente en Desarrollo Urbano y pago de derechos de construcción y número oficial.</li>\n<li><strong>Paso 4: Contratos de Servicios Provisionales:</strong></li>\n<li>Instalación de toma provisional de agua de obra y mufa provisional CFE (220V).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 1: Preliminares, Cimentación y Estructura Subterránea (Mes 1 y Mes 2)</h4>\n<ol>\n<li><strong>Paso 5: Limpieza, Tapial Perimetral y Trazo con Estación Total:</strong></li>\n<li>Delimitación exacta del terreno (153.19 m²) respetando servidumbres (arriate de $60\\text{ cm}$ y banqueta de $90\\text{ cm}$).</li>\n<li><strong>Paso 6: Excavación y Construcción de Cisterna de 5,000 L:</strong></li>\n<li>Excavación masiva y colado en concreto armado f'c=$250\\text{ kg/cm}^2$ con aditivo hidrófugo integral bajo la cochera.</li>\n<li><strong>Paso 7: Armado de Acero y Colado de Cimentación:</strong></li>\n<li>Habilitado de zapatas corridas, contratrabes y dados de concreto. Fumigación antitermitas en terreno natural.</li>\n<li><strong>Paso 8: Rellenos Compactados y Losa de Cimentación / Firme:</strong></li>\n<li>Tendido de tuberías sanitarias maestras bajo firme y colado del firme de concreto en Planta Baja con el desnivel de $-15\\text{ cm}$ en el área social.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 2: Obra Negra y Estructura en los 3 Niveles (Mes 3 a Mes 5)</h4>\n<ol>\n<li><strong>Paso 9: Levantamiento de Muros y Castillos en Planta Baja:</strong></li>\n<li>Muros de carga confinados, cuarto de máquinas, lavandería y suite PB.</li>\n<li><strong>Paso 10: Cimbrado, Armado y Colado de Losa de Entrepiso PB-PA:</strong></li>\n<li>Sistema de vigueta y bovedilla de poliestireno (aislamiento acústico superior) con capa de compresión de $5\\text{ cm}$ de concreto premezclado.</li>\n<li><strong>Paso 11: Levantamiento de Muros de Planta Alta y 1er Tramo de Escalera:</strong></li>\n<li>Recámaras secundarias, baño compartido, Master Suite, Family Room y colado de los 17 escalones de concreto.</li>\n<li><strong>Paso 12: Colado de Losa de Azotea General, Caseta de Escalera y Monitor Roof:</strong></li>\n<li>Colado de la losa a $+6.00\\text{ m}$, caseta de salida a azotea, pretiles perimetrales de $1.05\\text{ m}$ y cubierta sobreelevada (<em>Monitor Roof</em>) a $+6.70\\text{ m}$.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 3: Instalaciones Ocultas MEP y Domótica en Obra Negra (Mes 5 y Mes 6)</h4>\n<ol>\n<li><strong>Paso 13: Ranurado y Tendido de Canalizaciones Conduit:</strong></li>\n<li>Colocación de manguera conduit pesada de $1\"$ para red/datos y $3/4\"$ para fuerza eléctrica; empotrado de chalupas profundas ($50\\text{ mm}$) en cada punto.</li>\n<li><strong>Paso 14: Tendido de Fontanería en PPR Termofusionado:</strong></li>\n<li>Líneas de agua fría y agua caliente aislada térmicamente, subida a azotea y anillo de retorno de recirculación.</li>\n<li><strong>Paso 15: Cableado Eléctrico con Cable Neutro y Cableado Cat6A:</strong></li>\n<li>Cableado de circuitos con neutro en todas las chalupas; tendido de 12 líneas Cat6A desde cada estancia hacia el Rack 12U en el Cuarto de Máquinas.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 4: Obra Gris, Aplanados e Impermeabilización (Mes 6 y Mes 7)</h4>\n<ol>\n<li><strong>Paso 16: Aplanados Interiores de Yeso y Exteriores de Cemento:</strong></li>\n<li>Muros a plomo y regla con esquineros metálicos en aristas para acabados de alta definición.</li>\n<li><strong>Paso 17: Impermeabilización Prefabricada Termofusionada en Azotea:</strong></li>\n<li>Aplicación de membrana asfáltica de $4.5\\text{ mm}$ gravillada con poliéster y pendientes pluviales al $2.0\\%$.</li>\n<li><strong>Paso 18: Bases de Regadera con Membrana Impermeabilizante:</strong></li>\n<li>Prueba de inundación de 24 horas en los 3 baños para certificar cero filtraciones.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 5: Pisos, Recubrimientos y Carpintería Fina (Mes 8 y Mes 9)</h4>\n<ol>\n<li><strong>Paso 19: Instalación de Pisos Porcelánicos de Gran Formato:</strong></li>\n<li>Colocación de porcelanato rectificado ($60\\times 120\\text{ cm}$) con boquilla epóxica y piso deck en Roof Garden.</li>\n<li><strong>Paso 20: Montaje de Cocina Integral con Isla y Cubiertas de Granito/Cuarzo:</strong></li>\n<li>Muebles hidrófugos con herrajes Blum de cierre suave y preparación para electrodomésticos empotrados.</li>\n<li><strong>Paso 21: Puertas Semisólidas, Clósets y Vestidor Master:</strong></li>\n<li>Instalación de carpintería a medida con sellos perimetrales acústicos en recámaras.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 6: Cancelería, Vidrio Templado y Equipamiento Tecnológico (Mes 9 y Mes 10)</h4>\n<ol>\n<li><strong>Paso 22: Cancelería de Aluminio Eurovent y Barandales de Cristal Templado:</strong></li>\n<li>Ventanas, canceles corredizos al jardín, barandal de cristal en balcón y Roof Garden, y louvers en linternilla.</li>\n<li><strong>Paso 23: Instalación Solar Fotovoltaica, Calentador Solar y Climas A/C:</strong></li>\n<li>Montaje de los 6 paneles fotovoltaicos ($3.3\\text{ kWp}$), calentador solar ($200\\text{ L}$) y 3 condensadoras inverter en azotea.</li>\n<li><strong>Paso 24: Armado del Rack 12U, Switches PoE, Wi-Fi 7 y Home Assistant:</strong></li>\n<li>Conexionado del Gateway UniFi, 3 Puntos de Acceso, cámaras 4K, cerradura biométrica y calibración de apagadores Zigbee/Matter.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 7: Pruebas, Limpieza Fina y Entrega \"Llave en Mano\" (Mes 10 - Semana 4)</h4>\n<ol>\n<li><strong>Paso 25: Pruebas Integrales de Funcionamiento:</strong></li>\n<li>Verificación de presión hidroneumática constante ($3.5\\text{ bar}$), pruebas de carga eléctrica y balanceo de fases.</li>\n<li><strong>Paso 26: Limpieza Fina de Obra y Retiro de Protecciones:</strong></li>\n<li>Pulido de vidrios, pisos y desinfección profunda de cisterna y tuberías.</li>\n<li><strong>Paso 27: Entrega de Carpeta Técnica, Planos As-Built y LLAVE EN MANO:</strong></li>\n<li>Configuración de la app de Home Assistant en los teléfonos de la familia y entrega formal de la casa.</li>\n</ul>", "progressive": "<h2>Estrategia de Construcción Progresiva: Habitabilidad Inmediata y Crecimiento Modular</h2>\n<p><strong>Proyecto:</strong> Residencia Domótica Inteligente (153.19 m² Terreno | 235.0 m² Construcción en 3 Niveles)</p>\n<p><strong>Objetivo:</strong> Reducir la barrera de entrada inicial, lograr <strong>habitabilidad inmediata con 0 pago de renta</strong> y habilitar el crecimiento modular por fases a lo largo de 3 a 5 años sin demoliciones ni retrabajos.</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. La Regla de Oro de la Construcción Progresiva Inteligente</h3>\n<pre><code class=\"language-\">\n ┌─────────────────────────────────────────────────────────────────────────────────────────────┐\n │                         MATRIZ DE DECISIÓN: ¿QUÉ SE HACE HOY VS QUÉ SE POSTERGA?            │\n ├──────────────────────────────────────────────┬──────────────────────────────────────────────┤\n │  INNEGOCIABLE EN DÍA 1 (CERO RETRABAJOS)     │  MODULAR / POSTERGABLE EN FASES (PLUG & PLAY)│\n ├──────────────────────────────────────────────┼──────────────────────────────────────────────┤\n │ • Toda la cimentación y losas en 3 niveles   │ • Paneles solares fotovoltaicos (dejar tubo) │\n │ • Cisterna 5,000 L bajo cochera              │ • Calentador solar (dejar preparación PPR)   │\n │ • Tuberías conduit pesadas (1\" y 3/4\") vacías│ • Climas A/C (dejar línea de cobre y desagüe)│\n │ • Cable neutro en 100% de chalupas profundas │ • Pérgola y asador de Roof Garden            │\n │ • Tuberías de agua PPR aisladas y drenajes   │ • Cocina de alta gama (usar básica al inicio)│\n │ • Impermeabilización termofusionada en techo │ • Clósets a medida y vestidores carpintería  │\n └──────────────────────────────────────────────┴──────────────────────────────────────────────┘\n</code></pre>\n<div class=\"stat-callout\">[!IMPORTANT]</div>\n<div class=\"stat-callout\"><strong>El secreto del éxito:</strong> Dejar instalada toda la tubería vacía, registros, mangueras y cajas profundas durante la obra negra cuesta <strong>menos del 2% del presupuesto</strong>, pero te ahorra el 100% de ranurar, demoler o repintar muros en el futuro.</div>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Desglose Financiero por Fases de Crecimiento</h3>\n<pre><code class=\"language-\">\n┌─────────────────────────────────────────────────────────────────────────────────────────────┐\n│                    PLAN FINANCIERO EN 4 FASES MODULARES (HABITABILIDAD PRIMERO)             │\n├──────┬──────────────────────────────────────────┬──────────────┬───────────────┬────────────┤\n│Fase  │ Alcance y Propósito de la Fase           │ Inversión MXN│ Inversión USD │ Acumulado  │\n├──────┼──────────────────────────────────────────┼──────────────┼───────────────┼────────────┤\n│ 1    │ Casa Núcleo Habitable (PB completa + PA) │$1,980,000 MXN│ $99,000 USD   │ 55.4 %     │\n│ 2    │ Acabados Finos & Confort Planta Alta     │ $580,000 MXN │ $29,000 USD   │ 71.7 %     │\n│ 3    │ Roof Garden Frontal, Pérgola & 1/2 Baño  │ $420,000 MXN │ $21,000 USD   │ 83.4 %     │\n│ 4    │ Ecosistema Solar, Climas & Domótica Pro  │ $362,000 MXN │ $18,100 USD   │ 100.0 %    │\n├──────┴──────────────────────────────────────────┼──────────────┼───────────────┼────────────┤\n│      TOTAL GLOBAL CONSOLIDADO (A LO LARGO DE AÑOS)$3,572,000 MXN│$178,600 USD  │ 100.0 %    │\n└─────────────────────────────────────────────────┴──────────────┴───────────────┴────────────┘\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Detalle Operativo de Cada Fase</h3>\n<h4>FASE 1: Casa Núcleo Habitable ($1,980,000\\text{ MXN}$ / $\\$99,000\\text{ USD}$)</h4>\n<p><strong>Meta:</strong> Terminar la estructura completa, impermeabilizar, habilitar servicios básicos y <strong>mudarse de inmediato para dejar de pagar renta</strong>.</p>\n<ul>\n<li><strong>Estructura Completa:</strong> Cimentación, cisterna $5,000\\text{ L}$, muros y losas de los 3 niveles (PB, PA y Azotea techada e impermeabilizada).</li>\n<li><strong>MEP Oculto:</strong> 100% de tuberías eléctricas con neutro, tuberías de agua PPR, drenajes y cableado estructurado Cat6A.</li>\n<li><strong>Habitabilidad en Planta Baja:</strong></li>\n<li>Recámara Suite PB lista para dormir (piso, ventanas y puerta).</li>\n<li>Baño Completo de PB 100% funcional (WC, regadera y lavabo).</li>\n<li>Cocina funcional básica (tarja, estufa, refrigerador y conexiones).</li>\n<li>Área social con piso básico nivelado.</li>\n<li><strong>Seguridad Externa:</strong> Puerta principal de seguridad y cancelería exterior con vidrios colocados.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 2: Acabados Finos y Confort en Planta Alta ($580,000\\text{ MXN}$ / $\\$29,000\\text{ USD}$)</h4>\n<p><strong>Meta:</strong> Equipar la zona íntima de la familia mientras ya vives en la casa (Año 1 habitando).</p>\n<ul>\n<li><strong>Baño Master Spa:</strong> Colocación de canceles de cristal templado, doble vanity con cubierta de cuarzo y azulejos decorativos.</li>\n<li><strong>Carpintería Residencial:</strong> Clósets empotrados en recámaras 1 y 2, vestidor walk-in en Master Suite y puertas interiores semisólidas.</li>\n<li><strong>Cocina Integral de Alta Gama:</strong> Montaje de isla central con cubierta de granito/cuarzo y muebles de cierre suave.</li>\n<li><strong>Pisos Porcelánicos Definitivos:</strong> Acabado porcelánico gran formato ($60\\times 120\\text{ cm}$) en Planta Alta y Family Room.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 3: Roof Garden Frontal, Pérgola y 1/2 Baño Social ($420,000\\text{ MXN}$ / $\\$21,000\\text{ USD}$)</h4>\n<p><strong>Meta:</strong> Habilitar la terraza lounge panorámica para eventos sociales y reuniones (Año 2).</p>\n<ul>\n<li><strong>Piso Deck Exterior:</strong> $45\\text{ m}^2$ de deck tecnológico o porcelanato antiderrapante en el frente.</li>\n<li><strong>Pérgola Bioclimática:</strong> Estructura de acero y vigas de sombra.</li>\n<li><strong>Grill Station:</strong> Asador de acero inoxidable empotrado, tarja exterior y barra de bebidas con bancos.</li>\n<li><strong>Medio Baño de Azotea:</strong> Habilitación de acabados, WC y vanity en el baño anexo a la caseta de escalera.</li>\n<li><strong>Barandal de Cristal Templado Frontal:</strong> Vista panorámica abierta hacia la calle.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 4: Ecosistema Solar, Climatización y Domótica Avanzada ($362,000\\text{ MXN}$ / $\\$18,100\\text{ USD}$)</h4>\n<p><strong>Meta:</strong> Lograr autosuficiencia energética y máxima inteligencia (Año 3).</p>\n<ul>\n<li><strong>Arreglo Solar Fotovoltaico ($3.3\\text{ kWp}$):</strong> 6 Paneles bifaciales de $550\\text{W}$ con microinversores (ahorro del 90% en recibo CFE).</li>\n<li><strong>Calentador Solar de Agua ($200\\text{ L}$):</strong> Termotanque de acero inoxidable con 15 tubos de vacío y bypass termostático (ahorro 80% en gas).</li>\n<li><strong>Climatización Multi-Split Inverter:</strong> Instalación de las 3 condensadoras en azotea y 4 evaporadoras en recámaras y sala.</li>\n<li><strong>Equipamiento del Rack 12U & CCTV:</strong> Gateway UniFi, Switch PoE+, 3 APs Wi-Fi 7, 4 cámaras 4K con IA y servidor Home Assistant.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>4. Comparativa de Flujo de Efectivo</h3>\n<div class=\"table-responsive\"><table class=\"data-table\">\n<thead><tr><th>Escenario</th><th>Desembolso Inicial</th><th>Ventaja Clave</th><th>Riesgo Financiero</th></tr></thead><tbody>\n<tr><td><strong>Tradicional (Todo de Golpe)</strong></td><td>$\\$3,572,000\\text{ MXN}$ ($\\$178,600\\text{ USD}$)</td><td>Casa 100% terminada día 1</td><td>Alto endeudamiento o atraso por falta de liquidez</td></tr>\n<tr><td><strong>Estrategia Progresiva (4 Fases)</strong></td><td><strong>$\\$1,980,000\\text{ MXN}$ ($\\$99,000\\text{ USD}$)</strong></td><td><strong>Te mudas en el mes 6, ahorras renta y pagas acabados con tus ingresos corrientes</strong></td><td><strong>Mínimo y 100% controlado</strong></td></tr>\n</tbody></table></div>", "cashflow": "<h2>Guía Financiera y Plan de Flujo de Caja para Construcción por Etapas</h2>\n<p><strong>Proyecto:</strong> Residencia Domótica Inteligente (153.19 m² Terreno | 235.0 m² Construcción en 3 Niveles)</p>\n<p><strong>Monto Total Consolidado:</strong> $\\$3,572,000\\text{ MXN}$ ($\\$178,600\\text{ USD}$ | TC Ref.: $\\$20.00\\text{ MXN/USD}$)</p>\n<p><strong>Estrategia:</strong> 4 Fases Progresivas con <strong>Habitabilidad Inmediata en el Mes 6</strong> (Cero Gasto de Renta).</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Tabla Maestra de Arranque por Fases: \"¿Cuánto necesito para iniciar cada etapa?\"</h3>\n<pre><code class=\"language-\">\n┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐\n│                           PLAN MAESTRO DE CAPITAL DE ARRANQUE Y FLUJO DE CAJA                           │\n├──────┬───────────────────────┬──────────────┬──────────────┬──────────────┬──────────────┬──────────────┤\n│ Fase │ Nombre de la Etapa    │ Costo Total  │ Anticipo (30%)│ Flujo Mensual│ Duración     │ Meta / Hito  │\n├──────┼───────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤\n│  1   │ Casa Núcleo Habitable │$1,980,000 MXN│ $594,000 MXN │ $231,000 MXN │ 6 Meses      │ ¡MUDANZA!    │\n│      │ (Estructura + PB Viva)│ ($99,000 USD)│ ($29,700 USD)│ ($11,550 USD)│ (24 semanas) │ 0 Renta      │\n├──────┼───────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤\n│  2   │ Acabados Planta Alta  │ $580,000 MXN │ $174,000 MXN │  $67,666 MXN │ 6 Meses      │ Confort &    │\n│      │ & Cocina de Cuarzo    │ ($29,000 USD)│  ($8,700 USD)│  ($3,383 USD)│ (Año 1 viva) │ Cocina Alta  │\n├──────┼───────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤\n│  3   │ Roof Garden Frontal,  │ $420,000 MXN │ $126,000 MXN │  $70,000 MXN │ 6 Meses      │ Terraza Social│\n│      │ Pérgola & 1/2 Baño    │ ($21,000 USD)│  ($6,300 USD)│  ($3,500 USD)│ (Año 2)      │ Panorámica   │\n├──────┼───────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤\n│  4   │ Ecosistema Solar 3.3k,│ $362,000 MXN │ $108,600 MXN │  $60,333 MXN │ 6 Meses      │ Autosuficien-│\n│      │ Climas & Domótica Pro │ ($18,100 USD)│  ($5,430 USD)│  ($3,016 USD)│ (Año 3)      │ cia & 0 CFE  │\n├──────┴───────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤\n│      TOTAL CONSOLIDADO       │$3,572,000 MXN│$1,002,600 MXN│       -      │ 24 a 36 Meses│ Residencia   │\n│                              │($178,600 USD)│ ($50,130 USD)│              │ en el tiempo │ Inteligente  │\n└──────────────────────────────┴──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Desglose Detallado de Gastos por Etapa</h3>\n<h4>🟢 FASE 1: Casa Núcleo Habitable ($1,980,000\\text{ MXN}$ / $\\$99,000\\text{ USD}$)</h4>\n<ul>\n<li><strong>Requisito para iniciar:</strong> Juntar <strong>$\\$594,000\\text{ MXN}$</strong> (Anticipo para trámites, mecánica de suelos, excavación, acero inicial y cisterna).</li>\n<li><strong>Flujo semanal durante los 6 meses de obra:</strong> $\\approx \\$57,750\\text{ MXN/semana}$.</li>\n</ul>\n<p>#### Lista Exacta de Conceptos a Pagar en Fase 1:</p>\n<ol>\n<li><strong>Gestoría, Licencia de Construcción, Número Oficial y DRO:</strong> $\\$145,000\\text{ MXN}$ ($\\$7,250\\text{ USD}$).</li>\n<li><strong>Trazo con Estación Total, Limpieza y Excavación:</strong> $\\$81,000\\text{ MXN}$ ($\\$4,050\\text{ USD}$).</li>\n<li><strong>Cisterna Subterránea de $5,000\\text{ L}$ en Concreto Hidrófugo:</strong> $\\$68,000\\text{ MXN}$ ($\\$3,400\\text{ USD}$).</li>\n<li><strong>Cimentación (Zapatas, Acero f'c=$250$, Fumigación Antitermitas):</strong> $\\$326,000\\text{ MXN}$ ($\\$16,300\\text{ USD}$).</li>\n<li><strong>Muros de Carga Confinados y Castillos en 3 Niveles:</strong> $\\$340,000\\text{ MXN}$ ($\\$17,000\\text{ USD}$).</li>\n<li><strong>Losa de Entrepiso PB-PA y Losa de Azotea General (Techada):</strong> $\\$415,000\\text{ MXN}$ ($\\$20,750\\text{ USD}$).</li>\n<li><strong>Escalera de Concreto Armada (34 escalones de PB a Roof):</strong> $\\$52,000\\text{ MXN}$ ($\\$2,600\\text{ USD}$).</li>\n<li><strong>Pretiles de Seguridad en Azotea ($1.05\\text{ m}$ de alto):</strong> $\\$35,000\\text{ MXN}$ ($\\$1,750\\text{ USD}$).</li>\n<li><strong>Canalizaciones Conduit Pesadas ($1\"$ y $3/4\"$), Cajas $4\\times 4\"$, Chalupas Profundas ($50\\text{ mm}$), Cable Neutro en Toda la Casa y 12 Líneas Cat6A:</strong> $\\$148,000\\text{ MXN}$ ($\\$7,400\\text{ USD}$).</li>\n<li><strong>Red Hidráulica PPR Termofusionada Aislada y Drenajes PVC:</strong> $\\$105,000\\text{ MXN}$ ($\\$5,250\\text{ USD}$).</li>\n<li><strong>Aplanados de Yeso en PB y Zarpeo Exterior con Hidrófugo:</strong> $\\$95,000\\text{ MXN}$ ($\\$4,750\\text{ USD}$).</li>\n<li><strong>Impermeabilización Prefabricada Termofusionada en Azotea ($4.5\\text{ mm}$ con Poliéster - Garantía 10 Años):</strong> $\\$48,000\\text{ MXN}$ ($\\$2,400\\text{ USD}$).</li>\n<li><strong>Piso Porcelánico en PB, Puerta Principal de Seguridad y Canceles Exteriores con Vidrio:</strong> $\\$122,000\\text{ MXN}$ ($\\$6,100\\text{ USD}$).</li>\n<li><strong>Resultado:</strong> <strong>¡Te mudas en el Mes 6 a tu Suite de PB con cocina funcional, baño completo y servicios activos!</strong></li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>🔵 FASE 2: Acabados Finos & Confort en Planta Alta ($580,000\\text{ MXN}$ / $\\$29,000\\text{ USD}$)</h4>\n<ul>\n<li><strong>Requisito para iniciar:</strong> Juntar <strong>$\\$174,000\\text{ MXN}$</strong> (Anticipo para carpintería a medida, cubiertas de cuarzo y canceles templados).</li>\n<li><strong>Tiempo de ejecución:</strong> 6 meses viviendo ya en la casa (Año 1).</li>\n</ul>\n<p>#### Lista Exacta de Conceptos a Pagar en Fase 2:</p>\n<ol>\n<li><strong>Cocina Integral de Diseño con Isla Central y Cubiertas de Cuarzo:</strong> $\\$185,000\\text{ MXN}$ ($\\$9,250\\text{ USD}$).</li>\n<li><strong>Baño Master Spa (Doble Vanity de Cuarzo, Canceles Templados $9.5\\text{ mm}$, Regadera Lluvia):</strong> $\\$75,000\\text{ MXN}$ ($\\$3,750\\text{ USD}$).</li>\n<li><strong>Baño Compartido de PA Completo:</strong> $\\$55,000\\text{ MXN}$ ($\\$2,750\\text{ USD}$).</li>\n<li><strong>Carpintería de 8 Puertas Interiores Semisólidas con Sellos Acústicos:</strong> $\\$56,000\\text{ MXN}$ ($\\$2,800\\text{ USD}$).</li>\n<li><strong>Clósets Empotrados en Recámaras 1, 2 y Suite PB + Walk-in Closet Master:</strong> $\\$78,000\\text{ MXN}$ ($\\$3,900\\text{ USD}$).</li>\n<li><strong>Piso Porcelánico Rectificado ($60\\times 120\\text{ cm}$) en Planta Alta y Family Room ($92\\text{ m}^2$):</strong> $\\$85,000\\text{ MXN}$ ($\\$4,250\\text{ USD}$).</li>\n<li><strong>Pintura Vinílica Lavable Interior y Remates:</strong> $\\$46,000\\text{ MXN}$ ($\\$2,300\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>🟡 FASE 3: Roof Garden Frontal, Pérgola & 1/2 Baño ($420,000\\text{ MXN}$ / $\\$21,000\\text{ USD}$)</h4>\n<ul>\n<li><strong>Requisito para iniciar:</strong> Juntar <strong>$\\$126,000\\text{ MXN}$</strong> (Anticipo de estructura metálica, piso deck y barandales).</li>\n<li><strong>Tiempo de ejecución:</strong> 6 meses en el Año 2.</li>\n</ul>\n<p>#### Lista Exacta de Conceptos a Pagar en Fase 3:</p>\n<ol>\n<li><strong>Piso Deck Exterior / Porcelanato Antiderrapante en Roof Top ($45\\text{ m}^2$):</strong> $\\$58,000\\text{ MXN}$ ($\\$2,900\\text{ USD}$).</li>\n<li><strong>Pérgola Bioclimática de Acero Estructural y Vigas de Sombra:</strong> $\\$45,000\\text{ MXN}$ ($\\$2,250\\text{ USD}$).</li>\n<li><strong>Grill Station (Asador Inox Empotrado, Tarja Monomando y Barra con 3 Bancos):</strong> $\\$48,000\\text{ MXN}$ ($\\$2,400\\text{ USD hostility}$):<em></em> $\\$48,000\\text{ MXN}$ ($\\$2,400\\text{ USD}$).</li>\n<li><strong>Acabados y Muebles del 1/2 Baño de Visitas en Azotea:</strong> $\\$38,000\\text{ MXN}$ ($\\$1,900\\text{ USD}$).</li>\n<li><strong>Barandal Frontal de Cristal Templado hacia la Calle:</strong> $\\$42,000\\text{ MXN}$ ($\\$2,100\\text{ USD}$).</li>\n<li><strong>Celosías Louvers Antilluvia en Cubierta Sobreelevada (<em>Monitor Roof</em>):</strong> $\\$30,000\\text{ MXN}$ ($\\$1,500\\text{ USD}$).</li>\n<li><strong>Sala Lounge Modular de Exterior con Mesa Fogatero (<em>Firepit</em> a Gas):</strong> $\\$48,000\\text{ MXN}$ ($\\$2,400\\text{ USD}$).</li>\n<li><strong>Jardineras Perimetrales Decorativas:</strong> $\\$21,000\\text{ MXN}$ ($\\$1,050\\text{ USD}$).</li>\n<li><strong>Iluminación Cálida Indirecta y Contactos de Intemperie GFCI:</strong> $\\$90,000\\text{ MXN}$ ($\\$4,500\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>🟣 FASE 4: Ecosistema Solar, Climatización & Domótica Avanzada ($362,000\\text{ MXN}$ / $\\$18,100\\text{ USD}$)</h4>\n<ul>\n<li><strong>Requisito para iniciar:</strong> Juntar <strong>$\\$108,600\\text{ MXN}$</strong> (Anticipo para compra de paneles, inversor y equipos de clima).</li>\n<li><strong>Tiempo de ejecución:</strong> Año 3.</li>\n</ul>\n<p>#### Lista Exacta de Conceptos a Pagar en Fase 4:</p>\n<ol>\n<li><strong>Arreglo Solar Fotovoltaico $3.3\\text{ kWp}$ (6 Paneles 550W + Microinversores):</strong> $\\$78,000\\text{ MXN}$ ($\\$3,900\\text{ USD}$) $\\rightarrow$ Ahorro del 90% en CFE.</li>\n<li><strong>Calentador Solar de Agua ($200\\text{ L}$ con 15 Tubos de Vacío Inox):</strong> $\\$19,000\\text{ MXN}$ ($\\$950\\text{ USD}$) $\\rightarrow$ Ahorro del 80% en gas.</li>\n<li><strong>Sistema Clima Multi-Split Inverter (3 Condensadoras + 4 Evaporadoras):</strong> $\\$98,000\\text{ MXN}$ ($\\$4,900\\text{ USD}$).</li>\n<li><strong>Bomba Presurizadora Inverter Sumergible + Filtro Dual + Lámpara UV:</strong> $\\$34,000\\text{ MXN}$ ($\\$1,700\\text{ USD}$).</li>\n<li><strong>Rack 12U Equipado (Gateway UniFi, Switch PoE+, UPS 1500VA Online, Servidor Home Assistant):</strong> $\\$46,000\\text{ MXN}$ ($\\$2,300\\text{ USD}$).</li>\n<li><strong>Iluminación Inteligente Circadiana COB LED 24V y Sensores mmWave:</strong> $\\$45,000\\text{ MXN}$ ($\\$2,250\\text{ USD}$).</li>\n<li><strong>CCTV 4K con IA Local, Videoportero PoE y Cerradura Biométrica:</strong> $\\$42,000\\text{ MXN}$ ($\\$2,100\\text{ USD}$).</li>\n</ul>", "management": "<h2>Manual de Administración de Obra, Control de Estimaciones y Aseguramiento de Calidad (QA/QC)</h2>\n<p><strong>Proyecto:</strong> Residencia Inteligente en 3 Niveles (153.19 m² Terreno | 235.0 m² Construcción)</p>\n<p><strong>Metodología:</strong> Gestión Constructiva Integral (Lean Construction + PMBOK Residencial + Normativa NMX/RCDF/CFE/CONAGUA)</p>\n<p><strong>Objetivo:</strong> Garantizar el control total de tiempos, presupuesto sin sobrecostos, calidad estructural y habitabilidad progresiva.</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Estructura de Desglose de Trabajo (EDT / WBS)</h3>\n<p>La obra se gestiona bajo una jerarquía estricta de 4 niveles:</p>\n<pre><code class=\"language-\">\nNIVEL 1: PROYECTO MAESTRO RESIDENCIA INTELIGENTE (235 m²)\n └── NIVEL 2: FASES PROGRESIVAS (4 Fases)\n      ├── Fase 1: Casa Núcleo Habitable (Meses 1-6 | $1,980,000 MXN)\n      ├── Fase 2: Confort Planta Alta & Cocina (Meses 7-12 | $580,000 MXN)\n      ├── Fase 3: Roof Garden Frontal & Amenidades (Meses 13-18 | $420,000 MXN)\n      └── Fase 4: Ecosistema Solar, Climas & Domótica Pro (Meses 19-24 | $362,000 MXN)\n           └── NIVEL 3: ETAPAS CONSTRUCTIVAS (16 Etapas)\n                └── NIVEL 4: SUB-ETAPAS, HITOS & CHECKLISTS (48 Sub-etapas)\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Protocolo de Control de Estimaciones y Pago por Destajo</h3>\n<p>Para evitar desvíos financieros y reclamos de mano de obra, <strong>todo pago semanal debe cumplir con este ciclo de 5 pasos</strong>:</p>\n<pre><code class=\"language-\">\n┌───────────────────────────────────────────────────────────────────────────────────────────────────┐\n│                                 CICLO DE LIBERACIÓN DE ESTIMACIONES                               │\n│                                                                                                   │\n│  [1. Medición en Campo] ──► [2. Conciliación PU] ──► [3. Deducciones] ──► [4. Dictamen DRO] ──► [5. Pago]│\n│  (Números Generadores)       (Catálogo Pactado)       (Anticipo + 5% Fondo)  (Firma de Calidad)   (Transfer)│\n└───────────────────────────────────────────────────────────────────────────────────────────────────┘\n</code></pre>\n<h4>Fórmula de Pago Líquido por Estimación Semanal:</h4>\n<p>$$\\text{Monto Neto a Pagar} = \\text{Monto Bruto Estimado} - \\text{Amortización de Anticipo (30\\%)} - \\text{Fondo de Garantía (5\\%)}$$</p>\n<ul>\n<li><strong>Amortización de Anticipo (30%):</strong> Se descuenta en cada semana para recuperar el anticipo entregado al inicio de la fase.</li>\n<li><strong>Fondo de Garantía Retenido (5%):</strong> Se retiene en una cuenta bancaria separada y <strong>solo se devuelve 90 días después de la entrega física</strong>, una vez comprobado que no existen goteras, fisuras o vicios ocultos en instalaciones.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Matriz de Aseguramiento y Control de Calidad (QA/QC)</h3>\n<h4>Criterios de Aceptación y Rechazo por Partida Crítica:</h4>\n<div class=\"table-responsive\"><table class=\"data-table\">\n<thead><tr><th>Partida</th><th>Prueba / Inspección</th><th>Norma / Criterio de Aceptación</th><th>Criterio de Rechazo Inmediato</th></tr></thead><tbody>\n<tr><td><strong>Cimentación & Concreto</strong></td><td>Resistencia a compresión en cilindros a los 7, 14 y 28 días.</td><td>f'c ≥ 250\\text{ kg/cm}^2$ (NMX-C-083). Revenimiento $14 \\pm 3.5\\text{ cm}$.</td><td>f'c < 225\\text{ kg/cm}^2$ o presencia de nidos de grava (coqueras) en armados.</td></tr>\n<tr><td><strong>Estructura & Acero</strong></td><td>Traslapes de varilla corrugada Grado 42 ($fy=4200\\text{ kg/cm}^2$).</td><td>Traslape mínimo de $40 \\times \\text{diámetro}$ de varilla. Recubrimiento libre $≥ 2.5\\text{ cm}$.</td><td>Varillas oxidadas con escamas, traslapes menores a $40Φ$ o varillas pegadas a la cimbra sin calzas.</td></tr>\n<tr><td><strong>Albañilería & Muros</strong></td><td>Plomada, alineamiento y escuadra de muros.</td><td>Desplome máximo $≤ 3\\text{ mm}$ por cada $3\\text{ m}$ de altura. Juntas de mortero de $1.0\\text{ a }1.5\\text{ cm}$.</td><td>Muro desplomado $>5\\text{ mm}$, mortero suelto o castillos sin amarre de estribos.</td></tr>\n<tr><td><strong>Red Hidráulica PPR</strong></td><td>Prueba hidrostática con bomba de prueba.</td><td>Presión sostenida a $10\\text{ bar}$ ($145\\text{ PSI}$) durante <strong>24 horas continuas</strong> sin caída de aguja.</td><td>Caída de presión $>0.2\\text{ bar}$, gotas en uniones termofusionadas.</td></tr>\n<tr><td><strong>Red Sanitaria PVC</strong></td><td>Prueba de humo o columna de agua a tubo lleno.</td><td>Pendiente uniforme del $2\\%$ hacia registro exterior. Sin retorno de olores (CVS funcional).</td><td>Pendientes $<1\\%$, estancamiento de agua o fuga en coples.</td></tr>\n<tr><td><strong>Red Eléctrica & Domótica</strong></td><td>Megger de aislamiento y prueba de resistencia de tierra física.</td><td>Resistencia de aislamiento $>50\\text{ M}Ω$. Resistencia de electrodo de tierra $<5\\text{ }Ω$ (NOM-001).</td><td>Cables sin canalizar, ausencia de neutro en chalupas, tierra $>25\\text{ }Ω$.</td></tr>\n<tr><td><strong>Impermeabilización</strong></td><td>Prueba de estanqueidad (inundación de azotea).</td><td>Diques de arena e inundación de $5\\text{ cm}$ de agua durante <strong>48 horas continuas</strong>.</td><td>Cualquier mancha de humedad o goteo en la cara inferior de la losa.</td></tr>\n</tbody></table></div>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>4. Gestión de Riesgos y Plan de Mitigación</h3>\n<ol>\n<li><strong>Riesgo: Incremento de precios en Acero y Cemento:</strong></li>\n<li><em>Mitigación:</em> Comprar el 100% del acero de la Fase 1 en la Semana 1 con el anticipo y almacenarlo bajo techo elevado sobre tarimas.</li>\n<li><strong>Riesgo: Temporada de Lluvias durante Cimentación:</strong></li>\n<li><em>Mitigación:</em> Excavación por tramos, achique con bomba sumergible, y colado de plantilla de concreto pobre (f'c=100$) el mismo día de la excavación para evitar deslaves.</li>\n<li><strong>Riesgo: Vicios Ocultos en Tuberías Empotradas:</strong></li>\n<li><em>Mitigación:</em> Ninguna ranura o muro se cierra con mortero sin que la prueba hidrostática a 10 bar esté firmada en bitácora por el DRO.</li>\n<li><strong>Riesgo: Abandono de Cuadrilla o Lentitud:</strong></li>\n<li><em>Mitigación:</em> Pago estrictamente por destajo terminado y revisado; nunca pagar por \"día trabajado\" o \"raya\" sin avance cuantificable.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>5. Protocolo de Recepción de Obra y Finiquito</h3>\n<p>Para firmar el <strong>Acta de Entrega-Recepción</strong> de cada fase se deben entregar:</p>\n<ol>\n<li>Planos \"As-Built\" (planos de cómo quedaron realmente las tuberías y cables ocultos con fotos geolocalizadas).</li>\n<li>Carpeta de garantías de equipos (bomba presurizadora, calentador, cerraduras, impermeabilizante).</li>\n<li>Bitácora de Obra foliada con todas las firmas de liberación del DRO.</li>\n<li>Finiquito firmado por el contratista liberando al propietario de cualquier obligación laboral (IMSS/Infonavit).</li>\n</ul>"};

// ==========================================================================
// 10. CONTROLADOR DE PESTAÑAS (NAVIGATION) & ACCIONES GLOBALES
// ==========================================================================
function initNavigationTabs() {
  const tabButtons = document.querySelectorAll('.nav-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  function switchTab(tabId) {
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    tabContents.forEach(sec => {
      sec.classList.toggle('active', sec.id === 'sec-' + tabId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  // Global helper to navigate tabs from inline buttons
  window.appNavTo = function(tabId) {
    switchTab(tabId);
  };

  // Global helper to select phase and jump to WBS
  window.appSelectPhase = function(phaseNum) {
    currentWbsPhase = phaseNum;
    switchTab('wbs');
    
    // Update WBS filter buttons
    document.querySelectorAll('.wbs-filter-tabs .filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.wbsPhase === String(phaseNum));
    });
    renderWBSTree();
  };
}

// ==========================================================================
// 11. ACTUALIZADOR DE KPIS GLOBALES (HEADER & DASHBOARD)
// ==========================================================================
function updateGlobalKPIs() {
  // 1. Calculate physical progress based on WBS sub-etapas checked
  let totalSubstages = 0;
  let completedSubstages = 0;
  
  const phaseProgress = { 1: { total: 0, done: 0 }, 2: { total: 0, done: 0 }, 3: { total: 0, done: 0 }, 4: { total: 0, done: 0 } };

  for (let p = 1; p <= 4; p++) {
    const stages = wbsData[p] || [];
    stages.forEach(stg => {
      (stg.substages || []).forEach(sub => {
        totalSubstages++;
        phaseProgress[p].total++;
        const isChecked = localStorage.getItem('wbs_sub_' + sub.id) === 'true';
        if (isChecked) {
          completedSubstages++;
          phaseProgress[p].done++;
        }
      });
    });
  }

  const globalPhysPct = totalSubstages > 0 ? (completedSubstages / totalSubstages) * 100 : 0;
  
  const hdrPhysPct = document.getElementById('hdr-phys-pct');
  const hdrPhysBar = document.getElementById('hdr-phys-bar');
  if (hdrPhysPct) hdrPhysPct.textContent = globalPhysPct.toFixed(1) + '%';
  if (hdrPhysBar) hdrPhysBar.style.width = globalPhysPct.toFixed(1) + '%';

  // Update Phase Tiles on Dashboard
  for (let p = 1; p <= 4; p++) {
    const pct = phaseProgress[p].total > 0 ? (phaseProgress[p].done / phaseProgress[p].total) * 100 : 0;
    const tilePct = document.getElementById('tile-pct-' + p);
    const tileBar = document.getElementById('tile-bar-' + p);
    const tileCost = document.getElementById('tile-cost-' + p);

    if (tilePct) tilePct.textContent = `${Math.round(pct)}% completado (${phaseProgress[p].done}/${phaseProgress[p].total})`;
    if (tileBar) tileBar.style.width = pct.toFixed(1) + '%';
    if (tileCost) tileCost.textContent = formatMoney(phasesData[p].totalMXN);
  }

  // 2. Calculate financial progress based on approved estimations
  const estimations = JSON.parse(localStorage.getItem('sico_estimations') || '[]');
  const totalPaidMXN = estimations.reduce((acc, est) => acc + (est.status === 'Aprobada' ? est.grossMXN : 0), 0);
  const totalBudgetMXN = 3572000;
  const globalFinPct = (totalPaidMXN / totalBudgetMXN) * 100;

  const hdrFinPct = document.getElementById('hdr-fin-pct');
  const hdrFinBar = document.getElementById('hdr-fin-bar');
  if (hdrFinPct) hdrFinPct.textContent = globalFinPct.toFixed(1) + '%';
  if (hdrFinBar) hdrFinBar.style.width = Math.min(globalFinPct, 100).toFixed(1) + '%';

  const kpiPaidVal = document.getElementById('kpi-paid-val');
  const kpiPaidSub = document.getElementById('kpi-paid-sub');
  if (kpiPaidVal) kpiPaidVal.textContent = formatMoney(totalPaidMXN);
  if (kpiPaidSub) kpiPaidSub.textContent = 'Saldo por ejercer: ' + formatMoney(totalBudgetMXN - totalPaidMXN);

  // 3. Update Currency Texts in Header and Dashboard
  const hdrBudget = document.getElementById('hdr-total-budget');
  if (hdrBudget) hdrBudget.textContent = formatMoney(totalBudgetMXN);

  const kpiTotalVal = document.getElementById('kpi-total-val');
  const kpiTotalSub = document.getElementById('kpi-total-sub');
  if (kpiTotalVal) kpiTotalVal.textContent = formatMoney(totalBudgetMXN);
  if (kpiTotalSub) {
    const otherCur = currentCurrency === 'MXN' ? 'USD' : 'MXN';
    kpiTotalSub.textContent = `~${formatMoney(totalBudgetMXN, otherCur)} • $15,200/m² (235 m²)`;
  }

  const kpiAdvVal = document.getElementById('kpi-advance-val');
  if (kpiAdvVal) kpiAdvVal.textContent = formatMoney(phasesData[1].totalMXN * phasesData[1].anticipoPct);

  const kpiResVal = document.getElementById('kpi-reserve-val');
  if (kpiResVal) kpiResVal.textContent = formatMoney(totalBudgetMXN * 0.05);
}

// ==========================================================================
// 12. CONTROLADOR DE MONEDA (CURRENCY TOGGLE)
// ==========================================================================
function initCurrencyToggle() {
  const btnMXN = document.getElementById('btn-cur-mxn');
  const btnUSD = document.getElementById('btn-cur-usd');
  const prefix = document.getElementById('lbl-prefix-cur');

  function setCurrency(cur) {
    if (currentCurrency === cur) return;
    currentCurrency = cur;

    document.querySelectorAll('.currency-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cur === cur);
    });

    if (prefix) prefix.textContent = cur === 'USD' ? 'USD $' : '$';

    updateGlobalKPIs();
    if (typeof calculateFinance === 'function') calculateFinance();
    if (typeof renderEstimationsTable === 'function') renderEstimationsTable();
    if (typeof renderPUCatalogTable === 'function') renderPUCatalogTable();
    if (typeof renderWBSTree === 'function') renderWBSTree();
  }

  if (btnMXN) btnMXN.addEventListener('click', () => setCurrency('MXN'));
  if (btnUSD) btnUSD.addEventListener('click', () => setCurrency('USD'));
}

// ==========================================================================
// 13. RENDERIZADOR DE HITOS (MILESTONES EN DASHBOARD)
// ==========================================================================
function renderMilestonesList() {
  const container = document.getElementById('dashboard-milestones-list');
  if (!container) return;

  container.innerHTML = milestonesData.map(m => {
    let badgeClass = 'badge-secondary';
    let statusText = 'Pendiente';
    if (m.status === 'completed') {
      badgeClass = 'badge-success';
      statusText = 'Liberado';
    } else if (m.status === 'in_progress') {
      badgeClass = 'badge-warning';
      statusText = 'En Proceso';
    }

    return `
      <div class="milestone-item ${m.status}">
        <div class="milestone-dot"></div>
        <div class="milestone-content">
          <div class="milestone-header">
            <strong>${m.num}: ${m.name}</strong>
            <span class="badge ${badgeClass}">${statusText}</span>
          </div>
          <p class="milestone-desc">${m.desc}</p>
          <div class="milestone-meta">
            <span>🏷️ ${m.phase}</span>
            <span>⏱️ ${m.time}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// 14. CONTROLADOR DEL ÁRBOL WBS / EDT (MÓDULO 2)
// ==========================================================================
function renderWBSTree() {
  const container = document.getElementById('wbs-tree-display');
  if (!container) return;

  const stages = wbsData[currentWbsPhase] || [];
  container.innerHTML = '';

  stages.forEach(stg => {
    let stageTotal = stg.substages.length;
    let stageDone = stg.substages.filter(s => localStorage.getItem('wbs_sub_' + s.id) === 'true').length;
    let stagePct = stageTotal > 0 ? (stageDone / stageTotal) * 100 : 0;

    const block = document.createElement('div');
    block.className = 'wbs-stage-block';

    block.innerHTML = `
      <div class="wbs-stage-header">
        <div class="wbs-stage-title-wrap">
          <span class="wbs-stage-num">${stg.stageNum}</span>
          <div>
            <h3 class="wbs-stage-title">${stg.title}</h3>
            <div style="font-size: 0.78rem; color: var(--color-text-muted);">
              <span>⏱️ ${stg.duration}</span> • <span>👷 ${stg.contractor}</span>
            </div>
          </div>
        </div>
        <div style="text-align: right;">
          <div class="wbs-stage-cost">${formatMoney(stg.costMXN)}</div>
          <span class="badge ${stagePct === 100 ? 'badge-success' : stagePct > 0 ? 'badge-warning' : 'badge-secondary'}" style="font-size:0.7rem;">
            ${stageDone}/${stageTotal} Listo (${Math.round(stagePct)}%)
          </span>
        </div>
      </div>

      <div class="wbs-substages-list">
        ${stg.substages.map(sub => {
          const isChecked = localStorage.getItem('wbs_sub_' + sub.id) === 'true';
          return `
            <div class="wbs-substage-card ${isChecked ? 'completed' : ''}" id="card-${sub.id}">
              <div class="wbs-substage-top">
                <div style="display:flex; align-items:flex-start; gap:0.5rem; flex:1;">
                  <input type="checkbox" id="${sub.id}" class="wbs-checkbox" ${isChecked ? 'checked' : ''} data-sub-id="${sub.id}">
                  <div>
                    <label for="${sub.id}" class="substage-title" style="cursor:pointer;">
                      <span class="substage-id-badge">${sub.code}</span> ${sub.title}
                    </label>
                  </div>
                </div>
                <div class="substage-meta-pills">
                  ${sub.costMXN > 0 ? `<span class="substage-cost-pill">${formatMoney(sub.costMXN)}</span>` : ''}
                  <span class="substage-duration-pill">⏱️ ${sub.duration}</span>
                </div>
              </div>

              <div class="substage-details-grid">
                <div class="substage-detail-box">
                  <strong>✅ Criterio de Aceptación & Normativa:</strong>
                  <p>${sub.acceptance}</p>
                </div>
                <div class="substage-detail-box">
                  <strong>📦 Material Crítico & Suministro:</strong>
                  <p>${sub.material}</p>
                </div>
              </div>

              <div class="substage-checkpoints">
                <div class="checkpoints-header">⚠️ Riesgo de Obra & Control QA:</div>
                <p style="font-size: 0.8rem; color: var(--color-text-muted); margin:0;">${sub.risk}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.appendChild(block);
  });

  // Attach event listeners to checkboxes
  container.querySelectorAll('.wbs-checkbox').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const subId = e.target.dataset.subId;
      localStorage.setItem('wbs_sub_' + subId, e.target.checked);
      const card = document.getElementById('card-' + subId);
      if (card) card.classList.toggle('completed', e.target.checked);
      updateGlobalKPIs();
      renderWBSTree();
    });
  });
}

function initWBS() {
  const filterButtons = document.querySelectorAll('.wbs-filter-tabs .filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentWbsPhase = parseInt(btn.dataset.wbsPhase);
      renderWBSTree();
    });
  });

  renderWBSTree();
}

// ==========================================================================
// 15. CONTROLADOR DEL SIMULADOR FINANCIERO (MÓDULO 3)
// ==========================================================================
function calculateFinance() {
  const inputSavings = document.getElementById('input-savings-month');
  const inputInitial = document.getElementById('input-initial-capital');
  const selectPhase = document.getElementById('select-target-phase');
  if (!selectPhase) return;

  const currentPhaseId = parseInt(selectPhase.value);
  const phaseInfo = phasesData[currentPhaseId];
  if (!phaseInfo) return;

  let monthlySavings = parseFloat(inputSavings ? inputSavings.value : 0) || 0;
  let initialCapital = parseFloat(inputInitial ? inputInitial.value : 0) || 0;

  if (currentCurrency === 'USD') {
    monthlySavings *= exchangeRate;
    initialCapital *= exchangeRate;
  }

  const anticipoMeta = phaseInfo.totalMXN * phaseInfo.anticipoPct;
  const capitalGap = anticipoMeta - initialCapital;

  const valMonths = document.getElementById('val-months-to-start');
  const valGap = document.getElementById('val-capital-gap');
  const valPct = document.getElementById('val-anticipo-pct');
  const fillProgress = document.getElementById('fill-anticipo-progress');
  const callout = document.getElementById('callout-readiness');

  let pct = (initialCapital / anticipoMeta) * 100;
  if (pct > 100) pct = 100;
  if (pct < 0) pct = 0;

  if (fillProgress) fillProgress.style.width = pct.toFixed(1) + '%';
  if (valPct) valPct.textContent = pct.toFixed(1) + '% Reunido';

  if (capitalGap <= 0) {
    if (valMonths) {
      valMonths.textContent = '¡Listo para Iniciar!';
      valMonths.className = 'stat-value text-success';
    }
    if (valGap) valGap.textContent = 'Cuentas con el 100% del anticipo requerido (' + formatMoney(anticipoMeta) + ')';
    if (callout) {
      callout.innerHTML = '<strong>🎉 ¡Excelente!</strong> Tienes el capital inicial para dar el banderazo de salida a la <strong>' + phaseInfo.name + '</strong>. Puedes contratar albañilería, comprar los primeros materiales y comenzar de inmediato.';
    }
  } else {
    const months = monthlySavings > 0 ? (capitalGap / monthlySavings).toFixed(1) : '∞';
    if (valMonths) {
      valMonths.textContent = months + ' Meses';
      valMonths.className = 'stat-value text-primary';
    }
    if (valGap) valGap.textContent = 'Faltan ' + formatMoney(capitalGap) + ' para el anticipo del 30%';
    if (callout) {
      callout.innerHTML = '<strong>💡 Recomendación Estratégica:</strong> Ahorrando <strong>' + formatMoney(monthlySavings) + '/mes</strong>, alcanzarás el anticipo de <strong>' + formatMoney(anticipoMeta) + '</strong> en <strong>' + months + ' meses</strong> para arrancar la ' + phaseInfo.name + '.';
    }
  }
}

function initFinancialPlanner() {
  const inputSavings = document.getElementById('input-savings-month');
  const inputInitial = document.getElementById('input-initial-capital');
  const selectPhase = document.getElementById('select-target-phase');

  if (inputSavings) inputSavings.addEventListener('input', calculateFinance);
  if (inputInitial) inputInitial.addEventListener('input', calculateFinance);
  if (selectPhase) selectPhase.addEventListener('change', calculateFinance);

  calculateFinance();
}

// ==========================================================================
// 16. CONTROLADOR DE ESTIMACIONES DE PAGO (MÓDULO 3)
// ==========================================================================
function updateEstimationLiveCalculation() {
  const inputGross = document.getElementById('est-gross-amount');
  const gross = parseFloat(inputGross ? inputGross.value : 0) || 0;

  const advanceAmortization = gross * 0.30;
  const warrantyRetention = gross * 0.05;
  const netLiquid = gross - advanceAmortization - warrantyRetention;

  const elGross = document.getElementById('calc-est-gross');
  const elAdv = document.getElementById('calc-est-advance');
  const elWar = document.getElementById('calc-est-warranty');
  const elNet = document.getElementById('calc-est-net');

  if (elGross) elGross.textContent = formatMoneyExact(gross);
  if (elAdv) elAdv.textContent = '-' + formatMoneyExact(advanceAmortization);
  if (elWar) elWar.textContent = '-' + formatMoneyExact(warrantyRetention);
  if (elNet) elNet.textContent = formatMoneyExact(netLiquid);
}

function getSavedEstimations() {
  const stored = localStorage.getItem('sico_estimations');
  if (stored) {
    try { return JSON.parse(stored); } catch(e) {}
  }
  // Initial default estimations
  const initial = [
    {
      folio: 'EST-001',
      date: '2026-08-08',
      contractor: 'Maestro Albañil / Cuadrilla Obra Negra',
      concept: 'Excavación y plantilla de concreto pobre zapatas',
      grossMXN: 28000,
      warrantyMXN: 1400,
      netMXN: 18200,
      status: 'Aprobada'
    },
    {
      folio: 'EST-002',
      date: '2026-08-15',
      contractor: 'Plomero Certificado (Instalación PPR/PVC)',
      concept: 'Canalizaciones sanitarias subterráneas y cisterna',
      grossMXN: 18500,
      warrantyMXN: 925,
      netMXN: 12025,
      status: 'Aprobada'
    }
  ];
  localStorage.setItem('sico_estimations', JSON.stringify(initial));
  return initial;
}

function renderEstimationsTable() {
  const tableBody = document.getElementById('estimations-table-body');
  if (!tableBody) return;

  const estimations = getSavedEstimations();
  tableBody.innerHTML = '';

  if (estimations.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="7" class="text-center text-muted" style="padding:1.5rem;">No hay estimaciones registradas aún.</td></tr>';
    return;
  }

  estimations.forEach((est, idx) => {
    const row = document.createElement('tr');
    let badgeClass = est.status === 'Aprobada' ? 'badge-success' : est.status === 'Con Observaciones' ? 'badge-warning' : 'badge-danger';
    
    row.innerHTML = `
      <td><strong>${est.folio}</strong></td>
      <td style="font-size:0.75rem; color:var(--color-text-muted);">${est.date}</td>
      <td>
        <div style="font-weight:600;">${est.contractor}</div>
        <div style="font-size:0.72rem; color:var(--color-text-muted);">${est.concept}</div>
      </td>
      <td style="font-family:var(--font-mono); font-weight:700;">${formatMoney(est.grossMXN)}</td>
      <td style="font-family:var(--font-mono); color:var(--color-warning);">${formatMoney(est.warrantyMXN)}</td>
      <td style="font-family:var(--font-mono); font-weight:800; color:var(--color-success);">${formatMoney(est.netMXN)}</td>
      <td>
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <span class="badge ${badgeClass}" style="font-size:0.7rem;">${est.status}</span>
          <button class="btn btn-outline btn-xs" onclick="window.deleteEstimation(${idx})" title="Eliminar" style="padding:2px 6px; font-size:0.7rem; border-color:#ef4444; color:#ef4444;">🗑️</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

window.deleteEstimation = function(idx) {
  if (confirm('¿Deseas eliminar este registro de estimación?')) {
    const estimations = getSavedEstimations();
    estimations.splice(idx, 1);
    localStorage.setItem('sico_estimations', JSON.stringify(estimations));
    renderEstimationsTable();
    updateGlobalKPIs();
  }
};

function initEstimations() {
  const inputGross = document.getElementById('est-gross-amount');
  const btnSave = document.getElementById('btn-save-estimation');

  if (inputGross) {
    inputGross.addEventListener('input', updateEstimationLiveCalculation);
  }

  if (btnSave) {
    btnSave.addEventListener('click', () => {
      const contractor = document.getElementById('est-contractor').value;
      const concept = document.getElementById('est-concept').value.trim() || 'Avance semanal de obra civil';
      const gross = parseFloat(inputGross.value) || 0;
      const status = document.getElementById('est-status').value;

      if (gross <= 0) {
        alert('Por favor ingresa un monto bruto válido.');
        return;
      }

      const estimations = getSavedEstimations();
      const nextNum = estimations.length + 1;
      const folio = 'EST-' + String(nextNum).padStart(3, '0');
      const today = new Date().toISOString().split('T')[0];

      const newEst = {
        folio: folio,
        date: today,
        contractor: contractor,
        concept: concept,
        grossMXN: gross,
        warrantyMXN: gross * 0.05,
        netMXN: gross * 0.65,
        status: status
      };

      estimations.unshift(newEst);
      localStorage.setItem('sico_estimations', JSON.stringify(estimations));

      alert(`✅ Estimación ${folio} registrada exitosamente con un neto a pagar de ${formatMoneyExact(newEst.netMXN)}.`);
      document.getElementById('est-concept').value = '';
      
      renderEstimationsTable();
      updateGlobalKPIs();
    });
  }

  updateEstimationLiveCalculation();
  renderEstimationsTable();
}

// ==========================================================================
// 17. CONTROLADOR DEL CATÁLOGO DE PRECIOS UNITARIOS (MÓDULO 3)
// ==========================================================================
function renderPUCatalogTable() {
  const tableBody = document.getElementById('pu-catalog-table-body');
  if (!tableBody) return;

  const search = currentPuSearch.toLowerCase().trim();
  const filtered = budgetItems.filter(item => {
    const matchPhase = currentPuFilter === 'all' || item.phase === currentPuFilter;
    const matchSearch = !search || 
      item.name.toLowerCase().includes(search) || 
      item.spec.toLowerCase().includes(search) || 
      (item.code && item.code.toLowerCase().includes(search));
    return matchPhase && matchSearch;
  });

  tableBody.innerHTML = '';
  if (filtered.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="7" class="text-center text-muted" style="padding:1.5rem;">No se encontraron conceptos que coincidan con la búsqueda.</td></tr>';
    return;
  }

  filtered.forEach(item => {
    const row = document.createElement('tr');
    let phaseBadge = '';
    if (item.phase === 'fase1') phaseBadge = '<span class="badge badge-success" style="font-size:0.68rem;">Fase 1: Núcleo</span>';
    else if (item.phase === 'fase2') phaseBadge = '<span class="badge badge-primary" style="font-size:0.68rem;">Fase 2: PA</span>';
    else if (item.phase === 'fase3') phaseBadge = '<span class="badge badge-warning" style="font-size:0.68rem;">Fase 3: Roof</span>';
    else if (item.phase === 'fase4') phaseBadge = '<span class="badge badge-purple" style="font-size:0.68rem;">Fase 4: Solar</span>';

    const unitPrice = item.costMXN / item.qty;

    row.innerHTML = `
      <td>${phaseBadge}</td>
      <td>
        <div style="font-weight:700;">${item.code ? `<code>${item.code}</code> ` : ''}${item.name}</div>
      </td>
      <td style="font-size:0.8rem; color:var(--color-text-muted);">${item.spec}</td>
      <td style="text-align:center;">${item.unit || 'Lote'}</td>
      <td style="text-align:center; font-weight:700;">${item.qty}</td>
      <td style="font-family:var(--font-mono); font-size:0.82rem;">${formatMoney(unitPrice)}</td>
      <td style="font-family:var(--font-mono); font-weight:800; color:var(--color-primary);">${formatMoney(item.costMXN)}</td>
    `;
    tableBody.appendChild(row);
  });
}

function initPUCatalog() {
  const searchInput = document.getElementById('input-search-pu');
  const filterPills = document.querySelectorAll('#pu-filter-pills .filter-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentPuSearch = e.target.value;
      renderPUCatalogTable();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentPuFilter = pill.dataset.puFilter;
      renderPUCatalogTable();
    });
  });

  renderPUCatalogTable();
}

// ==========================================================================
// 18. CONTROLADOR DEL VISOR DE PLANOS ARQUITECTÓNICOS (MÓDULO 4)
// ==========================================================================
function renderFloor(floorKey) {
  const display = document.getElementById('blueprint-display');
  const terrainWrapper = document.getElementById('terrain-svg-wrapper');
  if (!display) return;

  currentFloor = floorKey;

  if (floorKey === 'pb') {
    display.innerHTML = getGroundFloorSVG();
  } else if (floorKey === 'pa') {
    display.innerHTML = getUpperFloorSVG();
  } else if (floorKey === 'ext') {
    display.innerHTML = getExteriorRoofSVG();
  }

  if (terrainWrapper && !terrainWrapper.hasChildNodes()) {
    terrainWrapper.innerHTML = `
      <svg viewBox="0 0 760 520" width="100%" height="220" xmlns="http://www.w3.org/2000/svg" style="background: #0f172a; border-radius: 8px;">
        <polygon points="80,60 710,60 660,469 80,462" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="2" />
        <line x1="80" y1="60" x2="710" y2="60" stroke="#f59e0b" stroke-width="2" />
        <text x="395" y="48" font-size="10" font-weight="900" fill="#fbbf24" text-anchor="middle">L1-2 (SUR): 15.74 m</text>
        <line x1="710" y1="60" x2="660" y2="469" stroke="#10b981" stroke-width="2" />
        <text x="700" y="270" font-size="10" font-weight="900" fill="#34d399" text-anchor="start">L2-3 (ORIENTE / CALLE): 10.30 m</text>
        <line x1="660" y1="469" x2="80" y2="462" stroke="#38bdf8" stroke-width="2" />
        <text x="370" y="485" font-size="10" font-weight="900" fill="#38bdf8" text-anchor="middle">L3-4 (NORTE): 14.49 m</text>
        <line x1="80" y1="462" x2="80" y2="60" stroke="#ec4899" stroke-width="2" />
        <text x="65" y="260" font-size="10" font-weight="900" fill="#f472b6" text-anchor="end">L4-1 (PONIENTE): 10.04 m</text>
        <circle cx="80" cy="60" r="4" fill="#fbbf24" />
        <circle cx="710" cy="60" r="4" fill="#10b981" />
        <circle cx="660" cy="469" r="4" fill="#38bdf8" />
        <circle cx="80" cy="462" r="4" fill="#f472b6" />
        <rect x="200" y="102" width="386.8" height="350" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,4" />
        <text x="393.4" y="280" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">HUELLA CONSTRUIDA EN 3 NIVELES (235.0 m²)</text>
        <text x="393.4" y="300" font-size="9" font-weight="700" fill="#94a3b8" text-anchor="middle">Área Terreno: 153.19 m² • Perímetro: 50.57 m • Servidumbre frontal: 1.50 m</text>
      </svg>
    `;
  }

  attachRoomInteractivity(floorKey);
}

function attachRoomInteractivity(floorKey) {
  const display = document.getElementById('blueprint-display');
  if (!display) return;

  // Build a Set of IDs that have data entries for this floor
  const floorRoomIds = new Set((blueprintData[floorKey] || []).map(r => r.id));

  // Query ALL <g> elements inside the SVG and attach click to those that have matching data
  const allGroups = display.querySelectorAll('g[id]');
  allGroups.forEach(group => {
    if (floorRoomIds.has(group.id)) {
      group.style.cursor = 'pointer';
      // Highlight on hover
      group.addEventListener('mouseenter', () => {
        group.style.filter = 'brightness(0.88) drop-shadow(0 0 4px rgba(56,189,248,0.7))';
      });
      group.addEventListener('mouseleave', () => {
        group.style.filter = '';
      });
      group.addEventListener('click', (e) => {
        e.stopPropagation();
        showRoomDetails(floorKey, group.id);
      });
    }
  });
}

function showRoomDetails(floorKey, roomId) {
  const roomNameEl = document.getElementById('room-name');
  const roomBadgeEl = document.getElementById('room-badge');
  const roomSpecsEl = document.getElementById('room-specs');

  const floorList = blueprintData[floorKey] || [];
  const room = floorList.find(r => r.id === roomId);

  if (!room) return;

  if (roomNameEl) roomNameEl.textContent = room.name;
  if (roomBadgeEl) roomBadgeEl.textContent = floorKey === 'pb' ? 'Planta Baja' : floorKey === 'pa' ? 'Planta Alta' : 'Roof Garden';

  if (roomSpecsEl) {
    const tagsHTML = (room.tags || []).map(t => `<span class="badge badge-primary" style="margin-right:4px; margin-bottom:4px;">${t}</span>`).join(' ');
    let specsRows = '';
    if (room.specs) {
      specsRows = Object.entries(room.specs).map(([k, v]) => `
        <div style="margin-top:6px; font-size:0.83rem;">
          <strong style="color:var(--color-text-main);">${k}:</strong> ${v}
        </div>
      `).join('');
    }
    roomSpecsEl.innerHTML = tagsHTML + specsRows;
  }
}

function initBlueprintViewer() {
  const floorButtons = document.querySelectorAll('.level-selector .pill-btn');
  floorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      floorButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const floorKey = btn.dataset.floor;
      renderFloor(floorKey);
    });
  });

  renderFloor('pb');
}

// ==========================================================================
// 19. CONTROLADOR DEL CRONOGRAMA GANTT (MÓDULO 5)
// ==========================================================================
function renderGanttTimeline() {
  const container = document.getElementById('gantt-timeline-display');
  if (!container) return;

  const totalWeeks = 24;

  let tableHTML = `
    <table class="gantt-table">
      <thead>
        <tr>
          <th style="width: 260px;">Actividad / Partida</th>
          <th style="width: 80px; text-align:center;">Fase</th>
          <th style="width: 140px;">Responsable</th>
          <th style="width: 80px; text-align:center;">Duración</th>
          <th style="min-width: 400px;">Semanas de Ejecución (S1 a S24)</th>
        </tr>
      </thead>
      <tbody>
  `;

  ganttData.forEach(task => {
    const leftPct = ((task.startW - 1) / totalWeeks) * 100;
    const widthPct = Math.max(((task.endW - task.startW + 1) / totalWeeks) * 100, 4);

    let barClass = task.type === 'critical' ? 'critical' : task.type === 'milestone' ? 'milestone' : 'standard';

    tableHTML += `
      <tr>
        <td><strong>${task.name}</strong></td>
        <td style="text-align:center;"><span class="badge badge-secondary" style="font-size:0.7rem;">${task.phase}</span></td>
        <td style="font-size:0.78rem; color:var(--color-text-muted);">${task.contractor}</td>
        <td style="text-align:center; font-weight:700; font-size:0.8rem;">${task.dur}</td>
        <td>
          <div class="gantt-bar-wrap">
            <div class="gantt-bar ${barClass}" style="left: ${leftPct}%; width: ${widthPct}%;">
              ${task.dur}
            </div>
          </div>
        </td>
      </tr>
    `;
  });

  tableHTML += `</tbody></table>`;
  container.innerHTML = tableHTML;
}

function initGantt() {
  renderGanttTimeline();
}

// ==========================================================================
// 20. CONTROLADOR DE BITÁCORA DIGITAL & QA/QC (MÓDULO 6)
// ==========================================================================
function getSavedLogbookEntries() {
  const stored = localStorage.getItem('sico_logbook');
  if (stored) {
    try { return JSON.parse(stored); } catch(e) {}
  }
  // Default initial logbook entries
  const initial = [
    {
      folio: 'BIT-001',
      date: '2026-08-10',
      weather: 'Soleado / Despejado',
      crew: '1 Maestro + 4 Oficiales + 2 Ayudantes',
      stage: '1.2 Cimentación y Cisterna 5kL',
      activities: 'Colado de plantilla de concreto pobre f\'c=100 en fondo de zapatas y habilitado de acero de refuerzo en cisterna subterránea.',
      notes: 'Se verificaron recubrimientos libres de 3 cm con calzas de mortero. DRO presente autorizó el armado.'
    },
    {
      folio: 'BIT-002',
      date: '2026-08-14',
      weather: 'Nublado sin lluvia',
      crew: '1 Maestro + 3 Oficiales + 1 Plomero',
      stage: '1.5 Red Sanitaria Subterránea',
      activities: 'Tendido de tubería sanitaria PVC Norma 4" y construcción de registros con pendiente del 2% hacia la calle.',
      notes: 'Prueba de escurrimiento con agua entintada exitosa; sin fugas ni contraniveles.'
    }
  ];
  localStorage.setItem('sico_logbook', JSON.stringify(initial));
  return initial;
}

function renderLogbookEntries() {
  const container = document.getElementById('logbook-entries-list');
  if (!container) return;

  const entries = getSavedLogbookEntries();
  if (entries.length === 0) {
    container.innerHTML = '<div class="text-center text-muted" style="padding:2rem;">No hay asientos en bitácora registrados aún.</div>';
    return;
  }

  container.innerHTML = entries.map((entry, idx) => `
    <div class="logbook-entry-card">
      <div class="logbook-entry-header">
        <div>
          <strong style="font-size:0.95rem; color:var(--color-primary);">${entry.folio}</strong> • 
          <span>📅 ${entry.date}</span> • 
          <span>${entry.weather}</span>
        </div>
        <div>
          <span class="badge badge-secondary">${entry.stage}</span>
          <button class="btn btn-outline btn-xs" onclick="window.deleteLogEntry(${idx})" style="margin-left:8px; border-color:#ef4444; color:#ef4444; padding:2px 6px; font-size:0.7rem;">🗑️</button>
        </div>
      </div>
      <div style="font-size:0.8rem; color:var(--color-text-muted); margin-bottom:0.5rem;">
        <strong>👷 Personal en sitio:</strong> ${entry.crew}
      </div>
      <div style="margin-bottom:0.5rem; font-size:0.88rem;">
        <strong>Avances del día:</strong> ${entry.activities}
      </div>
      ${entry.notes ? `
        <div style="background-color:var(--color-bg-subtle); padding:0.5rem 0.75rem; border-radius:var(--radius-sm); border-left:3px solid var(--color-primary); font-size:0.82rem;">
          <strong>📝 Acuerdos / Calidad:</strong> ${entry.notes}
        </div>
      ` : ''}
    </div>
  `).join('');
}

window.deleteLogEntry = function(idx) {
  if (confirm('¿Deseas eliminar este asiento de bitácora?')) {
    const entries = getSavedLogbookEntries();
    entries.splice(idx, 1);
    localStorage.setItem('sico_logbook', JSON.stringify(entries));
    renderLogbookEntries();
  }
};

function initLogbook() {
  const inputDate = document.getElementById('log-date');
  if (inputDate && !inputDate.value) {
    inputDate.value = new Date().toISOString().split('T')[0];
  }

  const btnSave = document.getElementById('btn-save-log');
  if (btnSave) {
    btnSave.addEventListener('click', () => {
      const date = document.getElementById('log-date').value;
      const weather = document.getElementById('log-weather').value;
      const crew = document.getElementById('log-crew').value.trim() || '1 Maestro + 3 Oficiales';
      const stage = document.getElementById('log-stage').value.trim() || 'Obra General';
      const activities = document.getElementById('log-activities').value.trim();
      const notes = document.getElementById('log-notes').value.trim();

      if (!activities) {
        alert('Por favor describe las actividades ejecutadas en la jornada.');
        return;
      }

      const entries = getSavedLogbookEntries();
      const nextNum = entries.length + 1;
      const folio = 'BIT-' + String(nextNum).padStart(3, '0');

      entries.unshift({
        folio: folio,
        date: date,
        weather: weather,
        crew: crew,
        stage: stage,
        activities: activities,
        notes: notes
      });

      localStorage.setItem('sico_logbook', JSON.stringify(entries));
      alert(`✅ Asiento ${folio} guardado en la Bitácora de Obra.`);

      document.getElementById('log-activities').value = '';
      document.getElementById('log-notes').value = '';
      renderLogbookEntries();
    });
  }

  const btnExport = document.getElementById('btn-export-logbook');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      const entries = getSavedLogbookEntries();
      const estimations = getSavedEstimations();
      const report = {
        proyecto: 'SICO-235 Residencia Inteligente en 3 Niveles',
        fechaExportacion: new Date().toISOString(),
        totalAsientosBitacora: entries.length,
        bitacora: entries,
        totalEstimaciones: estimations.length,
        estimaciones: estimations
      };

      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SICO235_Bitacora_y_Estimaciones_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  renderLogbookEntries();
}

// ==========================================================================
// 21. CONTROLADOR DE CONTRATISTAS & RACI (MÓDULO 7)
// ==========================================================================
function renderContractors() {
  const container = document.getElementById('contractors-display');
  if (!container) return;

  container.innerHTML = contractorsData.map(c => `
    <div class="contractor-card">
      <div class="contractor-role">${c.role}</div>
      <div class="contractor-name">${c.name}</div>
      <div class="contractor-info-row">
        <span>Especialidad:</span>
        <strong>${c.specialty}</strong>
      </div>
      <div class="contractor-info-row">
        <span>Modalidad Contrato:</span>
        <span>${c.contract}</span>
      </div>
      <div class="contractor-info-row">
        <span>Garantía:</span>
        <span style="color:var(--color-warning); font-weight:700;">${c.retention}</span>
      </div>
      <div class="contractor-info-row">
        <span>Contacto:</span>
        <span>📞 ${c.phone}</span>
      </div>
      
      <div style="margin-top:0.75rem; font-size:0.78rem; color:var(--color-text-muted);">
        <strong>Alcance Clave:</strong> ${c.deliverables}
      </div>

      <div style="margin-top:0.75rem; padding-top:0.5rem; border-top:1px dashed var(--color-border); display:flex; gap:0.35rem; flex-wrap:wrap; font-size:0.7rem;">
        <span class="badge badge-primary">R: ${c.raci.r}</span>
        <span class="badge badge-success">A: ${c.raci.a}</span>
      </div>
    </div>
  `).join('');
}

function initContractors() {
  renderContractors();
}

// ==========================================================================
// 22. CONTROLADOR DEL VISOR DE DOCUMENTACIÓN TÉCNICA (MÓDULO 8)
// ==========================================================================
function initDocsViewer() {
  const navList = document.getElementById('docs-nav-list');
  const viewer = document.getElementById('doc-viewer-content');
  const searchInput = document.getElementById('input-search-docs');
  if (!navList || !viewer) return;

  const navItems = navList.querySelectorAll('.docs-nav-item');

  function renderDoc(docKey) {
    const content = docsContent[docKey] || '<p>Documento en preparación...</p>';
    viewer.innerHTML = content;
    viewer.scrollTop = 0;
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      renderDoc(item.dataset.doc);
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      navItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'block' : 'none';
      });
    });
  }

  renderDoc('vision');
}

// ==========================================================================
// 23. INICIALIZACIÓN GLOBAL DE LA APLICACIÓN
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavigationTabs();
  initCurrencyToggle();
  renderMilestonesList();
  initWBS();
  initFinancialPlanner();
  initEstimations();
  initPUCatalog();
  initBlueprintViewer();
  initGantt();
  initLogbook();
  initContractors();
  initDocsViewer();
  updateGlobalKPIs();
});
