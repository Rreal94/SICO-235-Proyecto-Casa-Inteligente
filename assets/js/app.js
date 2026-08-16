/**
 * RESIDENCIA INTELIGENTE - PLANEADOR MAESTRO DE CONSTRUCCIÓN & FINANZAS
 * Gestión Integral en 4 Fases Progresivas con Habitabilidad Inmediata
 */

// ==========================================================================
// 1. ESTADO GLOBAL & CONFIGURACIÓN FINANCIERA
// ==========================================================================
let currentCurrency = 'MXN';
const exchangeRate = 20.0; // 1 USD = 20.00 MXN

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

// ==========================================================================
// 2. CATÁLOGO MAESTRO DE CONCEPTOS DE OBRA POR FASES
// ==========================================================================
const budgetItems = [
  // FASE 1: CASA NÚCLEO HABITABLE
  { phase: "fase1", name: "Gestoría, Licencia de Construcción, Alineamiento & DRO", spec: "Trámites municipales, dictamen perito DRO, número oficial y licencias", qty: 1, costMXN: 145000 },
  { phase: "fase1", name: "Estudio Mecánica Suelos & Trazo Estación Total", spec: "3 sondeos a 4.00m, cálculo estructural y delimitación de linderos", qty: 1, costMXN: 26000 },
  { phase: "fase1", name: "Limpieza, Excavación Masiva & Rellenos Compactados", spec: "Excavación para zapatas a 1.20m y zanjas de drenajes maestros", qty: 1, costMXN: 55000 },
  { phase: "fase1", name: "Cisterna Subterránea 5,000 L Concreto Hidrófugo", spec: "Cisterna armada f'c=250 bajo cochera con sensor de nivel ultrasónico", qty: 1, costMXN: 68000 },
  { phase: "fase1", name: "Cimentación Concreto Armado f'c=250 & Fumigación", spec: "Zapatas corridas, contratrabes de liga y barrera química antitermitas", qty: 1, costMXN: 326000 },
  { phase: "fase1", name: "Muros de Carga, Castillos & Columnas (3 Niveles)", spec: "Block térmico / ladrillo confinado con columnas de concreto armado", qty: 1, costMXN: 340000 },
  { phase: "fase1", name: "Losa Entrepiso PB-PA (Vigueta/Bovedilla Poliestireno)", spec: "Capa compresión 5cm concreto premezclado y aislamiento acústico", qty: 1, costMXN: 230000 },
  { phase: "fase1", name: "Losa Azotea General (+6.00m) & Caseta Escalera", spec: "Losa estructural completa de azotea y caseta de cubo de escalera", qty: 1, costMXN: 185000 },
  { phase: "fase1", name: "Escalera de Concreto Armada (34 Escalones PB-Roof)", spec: "Estructura monolítica continua con descanso intermedio", qty: 1, costMXN: 52000 },
  { phase: "fase1", name: "Pretiles de Seguridad en Azotea (1.05m Alto)", spec: "Pretiles perimetrales en bloque de concreto con remate de pecho paloma", qty: 1, costMXN: 35000 },
  { phase: "fase1", name: 'Canalizaciones Conduit Pesadas, Cajas 4x4" & Neutro', spec: 'Manguera 1" y 3/4", chalupas 50mm y cable neutro en 100% de chalupas', qty: 1, costMXN: 148000 },
  { phase: "fase1", name: "Red Hidráulica PPR Termofusionada & Drenajes PVC", spec: 'Tuberías TuboPlus aisladas, subida a azotea, BSN 4", BSG 3" y CVS 2"', qty: 1, costMXN: 105000 },
  { phase: "fase1", name: "Aplanados de Yeso PB & Zarpeo Exterior Hidrófugo", spec: "Yeso a plomo en interiores de PB y repelado impermeable en fachadas", qty: 1, costMXN: 95000 },
  { phase: "fase1", name: "Impermeabilización Termofusionada Azotea (10 Años)", spec: "Membrana prefabricada 4.5mm gravillada con poliéster y pendientes 2%", qty: 1, costMXN: 48000 },
  { phase: "fase1", name: "Piso Porcelánico PB, Puerta Seguridad & Canceles Ext.", spec: "Piso en PB, puerta principal de seguridad y ventanas exteriores con vidrio", qty: 1, costMXN: 122000 },

  // FASE 2: CONFORT & ACABADOS EN PLANTA ALTA
  { phase: "fase2", name: "Cocina Integral de Diseño con Isla & Cuarzo", spec: "Muebles hidrófugos, herrajes Blum de cierre suave y cubiertas de cuarzo", qty: 1, costMXN: 185000 },
  { phase: "fase2", name: "Baño Master Spa (Doble Vanity, Canceles 9.5mm, Lluvia)", spec: "Vanity cuarzo, regadera lluvia spa, canceles templados y WC suspendido", qty: 1, costMXN: 75000 },
  { phase: "fase2", name: "Baño Compartido PA Completo & Zinc de Servicio", spec: "WC ecológico, regadera con cancel templado, vanity y mueble zinc", qty: 1, costMXN: 55000 },
  { phase: "fase2", name: "Carpintería 8 Puertas Interiores Semisólidas", spec: "Puertas con marco envolvente y sellos perimetrales acústicos", qty: 8, costMXN: 56000 },
  { phase: "fase2", name: "Clósets Empotrados Recámaras & Walk-in Closet Master", spec: "Clósets en recámaras secundarias y vestidor con iluminación LED", qty: 1, costMXN: 78000 },
  { phase: "fase2", name: "Piso Porcelánico Rectificado Gran Formato PA (92 m²)", spec: "Porcelanato 60x120cm en recámaras, pasillo y Family Room con boquilla", qty: 1, costMXN: 85000 },
  { phase: "fase2", name: "Pintura Vinílica Lavable Interior de Primera Calidad", spec: "Comex Vinimex Total en muros interiores y plafones de Planta Alta", qty: 1, costMXN: 46000 },

  // FASE 3: ROOF GARDEN FRONTAL & 1/2 BAÑO
  { phase: "fase3", name: "Piso Deck Exterior / Porcelanato Antiderrapante (45 m²)", spec: "Deck tecnológico de polímero o porcelánico antideslizante para intemperie", qty: 1, costMXN: 58000 },
  { phase: "fase3", name: "Pérgola Bioclimática de Acero Estructural", spec: "Estructura metálica con vigas de sombra y preparación para enredadera/toldo", qty: 1, costMXN: 45000 },
  { phase: "fase3", name: "Estación Asador Grill Inox con Tarja & Barra Periquera", spec: "Asador empotrado a gas/carbón, tarja monomando y barra con 3 bancos", qty: 1, costMXN: 48000 },
  { phase: "fase3", name: "Acabados & Muebles 1/2 Baño Social de Azotea", spec: "WC suspendido, vanity compacto, espejo LED y puerta de acceso al deck", qty: 1, costMXN: 38000 },
  { phase: "fase3", name: "Barandal Frontal Cristal Templado hacia la Calle", spec: "Cristal templado 9.5mm con postes de acero inox sobre pretil frontal", qty: 1, costMXN: 42000 },
  { phase: "fase3", name: "Celosías Louvers Antilluvia en Cubierta Sobreelevada", spec: "Aluminio anodizado con lamas a 45° en Monitor Roof para ventilación cenital", qty: 1, costMXN: 30000 },
  { phase: "fase3", name: "Sala Lounge Modular Exterior & Mesa Fogatero Firepit", spec: "Sillones intemperie con cojines hidrófugos y mesa firepit a gas", qty: 1, costMXN: 48000 },
  { phase: "fase3", name: "Jardineras Perimetrales Decorativas & Riego Goteo", spec: "Macetones y jardineras de concreto con iluminación cálida indirecta", qty: 1, costMXN: 21000 },
  { phase: "fase3", name: "Iluminación Cálida Indirecta & Contactos GFCI Azotea", spec: "Tiras LED IP65 bajo barra y escalones, con contactos impermeables", qty: 1, costMXN: 90000 },

  // FASE 4: SOLAR, CLIMAS & DOMÓTICA PRO
  { phase: "fase4", name: "Arreglo Fotovoltaico Solar 3.3 kWp (6 Paneles 550W)", spec: "Módulos monocristalinos bifaciales + microinversores smart (Ahorro 90% CFE)", qty: 1, costMXN: 78000 },
  { phase: "fase4", name: "Calentador Solar de Agua 200 L (15 Tubos de Vacío Inox)", spec: "Termotanque inox 304, bypass termostático y respaldo modulante (Ahorro 80% Gas)", qty: 1, costMXN: 19000 },
  { phase: "fase4", name: "Sistema Climatización Multi-Split Inverter (3 Condensadoras)", spec: "3 condensadoras en azotea + 4 evaporadoras para PB, Master y Secundarias", qty: 1, costMXN: 98000 },
  { phase: "fase4", name: "Bomba Presurizadora Inverter + Filtro Dual + Lámpara UV", spec: "3.5 bar constante silenciosa, filtro 5µm, carbón activado y esterilizador UV", qty: 1, costMXN: 34000 },
  { phase: "fase4", name: "Rack 12U Equipado (Gateway UniFi, Switch PoE+, UPS)", spec: "Cloud Gateway Ultra, Switch 16p PoE+, UPS Online 1500VA y Home Assistant", qty: 1, costMXN: 46000 },
  { phase: "fase4", name: "Iluminación Inteligente Circadiana & Sensores mmWave", spec: "Tiras COB LED 24V, Dimmers DALI, apagadores Zigbee/Matter con neutro", qty: 1, costMXN: 45000 },
  { phase: "fase4", name: "CCTV 4K PoE con IA Local, Videoportero & Cerradura Smart", spec: "4 cámaras 4K, NVR local 4TB sin cuotas, timbre con chapa eléc. y huella", qty: 1, costMXN: 42000 }
];


const blueprintData = {
    pb: [
      {
        id: 'recamara_suite_pb',
        name: 'Recámara Suite Principal PB (Opción B)',
        tags: ['3.16 x 4.00 m (12.6 m²)', 'Cama King Size', 'Baño en L Privado', 'Cancel 2.85m al Jardín'],
        specs: {
          'Ubicación': 'Crujía Nor-Poniente (X = 3.00m a 6.16m, Y = -1.05m a -5.05m)',
          'Equipamiento': 'Cama King Size (2.00 x 2.00 m), 2 burós de noche, cancel corredizo de 2.85 m al jardín posterior privado y acceso directo a vestidor y baño en L'
        }
      },
      {
        id: 'gran_area_social_pb',
        name: 'Gran Área Social Integrada (Cocina al Sur)',
        tags: ['4.66 x 4.75 m (22.2 m²)', 'Techo 3.15m Alto', 'Isla con 3 Bancos', 'Gran Cancel 3.75m'],
        specs: {
          'Ubicación': 'Crujía Sur-Poniente en Nivel -0.15 m (X = 3.00m a 7.66m, Y = -5.05m a -9.80m)',
          'Zonificación': 'Sala de Estar en L (Nor-Poniente), Cocina Integral en Lado Sur con Isla desayunadora y Comedor Familiar de 6 plazas frente al gran cancel de 3.75 m'
        }
      },
      {
        id: 'bano_suite_vestidor_pb',
        name: 'Baño Completo en L + Vestidor Privado PB',
        tags: ['5.72 m² Polígono en L', 'Regadera 1.20x0.90m', 'Clóset 1.50m', 'Ventana Norte'],
        specs: {
          'Ubicación': 'Detrás del Medio Baño y Cuarto de Lavandería (X = 6.16m a 8.67m)',
          'Configuración': 'Brazo Norte con Regadera amplia (1.20x0.90m), WC y Vanity (3.77 m²); Brazo Sur con Clóset Vestidor privado de 1.50 x 1.30 m (1.95 m²)'
        }
      },
      {
        id: 'medio_bano_pb',
        name: 'Medio Baño de Visitas PB (Alineado a Cochera)',
        tags: ['1.50 x 1.30 m (1.60 m²)', 'Vanity Flotante', 'WC', '1.01m Vestíbulo Libre'],
        specs: {
          'Ubicación': 'Alineado al fin del estacionamiento (X = 7.66m a 9.16m, Y = -2.55m a -3.85m)',
          'Equipamiento': 'Inodoro y lavabo vanity para visitas, dejando 1.01 m libres de vestíbulo frente a la escalera'
        }
      },
      {
        id: 'lavanderia_maquinas_pb',
        name: 'Cuarto de Lavandería & Cuarto de Máquinas / Rack 12U',
        tags: ['4.00 x 1.50 m (6.00 m²)', 'Rack 12U + Solar', 'Lavadora / Secadora', 'Puertas Alineadas'],
        specs: {
          'Ubicación': 'Crujía Norte Frontal (X = 8.67m a 12.67m, Y = -1.05m a -2.55m)',
          'Equipamiento': 'Lavandería de 3.60 m² (X: 8.67 a 11.07m) con centro de lavado, tarja y ventilación directa; Cuarto de Máquinas de 2.40 m² (X: 11.07 a 12.67m) con Rack 12U, Inversor Solar y Filtros UV'
        }
      },
      {
        id: 'escalera_confinada_pb',
        name: 'Escalera Compensada Confinada (Cero Invasión)',
        tags: ['2.50 x 2.25 m (5.62 m²)', '17 Escalones', 'Desembarco +3.00m', 'Fórmula Blondel'],
        specs: {
          'Ubicación': 'Crujía Nor-Oriente (X = 10.17m a 12.67m, Y = -2.55m a -4.80m)',
          'Diseño': 'Tramo Sur recto (4 escalones), vuelta compensada en abanico este (6 escalones) y tramo Norte recto (6 escalones + llegada 17 a +3.00m en X = 10.17m)'
        }
      },
      {
        id: 'estacionamiento_cochera_pb',
        name: 'Estacionamiento / Cochera Techada',
        tags: ['30.28 m² Superficie', 'SUV 4.90m + Compacto', 'Cargador EV 240V', 'Ángulo Recto 90°'],
        specs: {
          'Ubicación': 'Frente a Banqueta Oriente (X = 7.66m a 13.66m Norte / 13.00m Sur)',
          'Capacidad': '2 cajones en batería (SUV 4.90m en lado norte de 6.00m y Compacto en lado sur de 5.34m) con punto de carga para auto eléctrico'
        }
      }
    ],
pa: [
      {
        id: 'habitacion_principal_pa',
        name: 'Habitación Principal Master (Planta Alta)',
        tags: ['3.50 x 3.25 m (11.38 m²)', 'Cama King Size', 'Balcón Frontal 4.75m', 'Conexión Privada'],
        specs: {
          'Ubicación': 'Crujía Sur-Oriente (X = 7.67m a 11.17m, Y = -6.55m a -9.80m)',
          'Equipamiento': 'Cama King Size (2.00 x 2.00 m), 2 burós flotantes, TV 65", cancel hacia el Balcón Frontal y conexión exclusiva con el Pasillo-Clóset'
        }
      },
      {
        id: 'pasillo_closet_master_pa',
        name: 'Pasillo-Clóset Vestidor Master Suite',
        tags: ['1.50 x 2.67 m (4.00 m²)', 'Clóset Empotrado 60cm', 'Única Conexión Privada', 'Muro Sur'],
        specs: {
          'Ubicación': 'Crujía Sur Intermedia (X = 5.00m a 7.67m, Y = -8.30m a -9.80m)',
          'Función': 'Eje privado exclusivo que conecta la Habitación Master con el Baño Principal con clóset empotrado de 60 cm en muro sur'
        }
      },
      {
        id: 'bano_principal_master_pa',
        name: 'Baño Principal Master Suite (Reorganizado)',
        tags: ['2.00 x 3.25 m (6.50 m²)', 'Regadera Spa 2.0x1.2m', 'Doble Vanity 1.40m', 'WC Privado'],
        specs: {
          'Ubicación': 'Crujía Sur-Poniente (X = 3.00m a 5.00m, Y = -6.55m a -9.80m)',
          'Distribución': 'Entrada única por vestidor, Regadera Spa norte (2.00 x 1.20 m), WC suspendido central y Doble Vanity sur (1.40 m)'
        }
      },
      {
        id: 'family_room_abierto_pa',
        name: 'Family Room Diáfano y Abierto',
        tags: ['2.67 x 2.35 m (6.27 m²)', 'Concepto Abierto', 'Pasillo 90cm Libre', 'Sin Pared Norte'],
        specs: {
          'Ubicación': 'Crujía Central Sur (X = 5.00m a 7.67m, Y = -5.95m a -8.30m)',
          'Cualidades': 'Expandido 60 cm al norte, abierto sin paredes para máxima luminosidad, paso libre continuo de 90 cm'
        }
      },
      {
        id: 'recamara_secundaria_1_pa',
        name: 'Recámara Secundaria 1 (Planta Alta Poniente)',
        tags: ['2.76 x 4.00 m (11.04 m²)', 'Cama Queen Size', 'Escritorio', 'Clóset 60cm'],
        specs: {
          'Ubicación': 'Crujía Nor-Poniente (X = 3.00m a 5.76m, Y = -1.05m a -5.05m)',
          'Equipamiento': 'Cama Queen Size (1.50 x 2.00 m), escritorio de estudio, clóset empotrado y ventana al pasillo norte'
        }
      },
      {
        id: 'recamara_secundaria_2_pa',
        name: 'Recámara Secundaria 2 (Planta Alta Centro-Norte)',
        tags: ['2.76 x 4.00 m (11.04 m²)', 'Cama Queen Size', 'Escritorio', 'Clóset 60cm'],
        specs: {
          'Ubicación': 'Crujía Norte Central (X = 5.76m a 8.52m, Y = -1.05m a -5.05m)',
          'Equipamiento': 'Cama Queen Size (1.50 x 2.00 m), escritorio de estudio, clóset empotrado y ventana al pasillo norte'
        }
      },
      {
        id: 'balcon_frontal_pa',
        name: 'Gran Balcón Frontal (Fachada Este)',
        tags: ['1.50 x 4.75 m (7.13 m²)', 'Deck Exterior', 'Barandal Cristal Templado', 'Sala Lounge'],
        specs: {
          'Ubicación': 'Fachada Este (X = 11.17m a 12.67m, Y = -5.05m a -9.80m)',
          'Cualidades': 'Abarca el ancho del pasillo (1.50m) + crujía sur (3.25m) con acceso directo desde la Recámara Principal y vestíbulo'
        }
      },
      {
        id: 'zinc_servicio_pa',
        name: 'Zinc de Servicio (Fondo Pasillo)',
        tags: ['1.50 x 0.60 m (0.90 m²)', 'Tarja Vertedero', 'Mueble Blancos', 'Ventana Ventilación'],
        specs: {
          'Ubicación': 'Remate Poniente del Pasillo (X = 3.00m a 3.60m, Y = -5.05m a -6.55m)',
          'Equipamiento': 'Tarja vertedero para limpieza, mueble de blancos y ventana alta de ventilación cruzada'
        }
      },
      {
        id: 'bano_compartido_pa',
        name: 'Baño Completo Compartido',
        tags: ['4.00 x 1.50 m (6.00 m²)', 'Regadera Spa', 'Vanity 1.20m', 'Sobre Lavandería/Máquinas'],
        specs: {
          'Ubicación': 'Crujía Nor-Oriente (X = 8.67m a 12.67m, Y = -1.05m a -2.55m)',
          'Equipamiento': 'Regadera Spa, WC, Vanity y ducto vertical directo al Rack 12U de Planta Baja'
        }
      }
    ],
    ext: [
      {
        id: 'roof_garden_frontal_ext',
        name: 'Roof Garden Frontal Panorámico con 1/2 Baño Social',
        tags: ['40.5 m² Deck Social', 'Pérgola Sombra', 'Asador Grill & Barra', 'Lounge Firepit'],
        specs: {
          'Ubicación': 'Frente de la casa orientado a la calle (X = 8.52m a 12.67m, Y = -2.55m a -9.80m)',
          'Ventaja': 'Terraza lounge panorámica con vista abierta a la calle sin colindancias laterales molestas, equipada con sala lounge con fogatero, asador de acero inoxidable, tarja, barra y acceso directo al 1/2 baño exclusivo'
        }
      },
      {
        id: 'medio_bano_roof_ext',
        name: 'Medio Baño de Visitas del Roof Garden',
        tags: ['1.65 x 2.25 m (3.71 m²)', 'Vanity & WC Suspendido', 'Alineado a Ducto Hidrosanitario', 'Privacidad Total'],
        specs: {
          'Ubicación': 'Anexo a la Caseta de Escalera (X = 8.52m a 10.17m, Y = -2.55m a -4.80m)',
          'Beneficio': 'Brinda servicio sanitario completo a los invitados y familiares en la azotea sin que nadie tenga que entrar a las recámaras de Planta Alta ni bajar a Planta Baja'
        }
      },
      {
        id: 'caseta_escalera_ext',
        name: 'Caseta de Salida y Cubo de Escalera Interior',
        tags: ['2.50 x 2.25 m (5.62 m²)', 'Puerta Hermética Exterior', 'Salida Directa al Roof Garden'],
        specs: {
          'Ubicación': 'Crujía Nor-Oriente (X = 10.17m a 12.67m, Y = -2.55m a -4.80m, Cota +6.00m a +8.20m)',
          'Función': 'Salida directa y bajo techo desde la escalera interior al Roof Garden frontal, garantizando seguridad, confort y hermeticidad'
        }
      },
      {
        id: 'cubierta_sobreelevada_ext',
        name: 'Cubierta Sobreelevada (Monitor Roof - Zona Posterior)',
        tags: ['X = 3.00m a 8.52m (5.52m largo)', 'Termina en Hab. Secundarias', 'Nivel +6.70m', 'Celosías Louvers'],
        specs: {
          'Ubicación': 'Eje Central de Azotea sobre el pasillo de recámaras secundarias (X = 3.00m a 8.52m)',
          'Diseño': 'Finaliza exactamente donde terminan las habitaciones secundarias para dejar todo el frente libre para el Roof Garden; provee luz cenital y tiro térmico convectivo'
        }
      },
      {
        id: 'calentador_solar_ext',
        name: 'Calentador Solar de Agua Termosifónico (200 L)',
        tags: ['15 Tubos de Vacío', 'Losa Técnica Norte', 'Ahorro 80% Gas', 'Agua Caliente Sanitaria'],
        specs: {
          'Ubicación': 'Al lado norte de la cubierta sobreelevada (X = 7.00m a 8.50m, Y = -1.05m a -3.00m)',
          'Capacidad': 'Termotanque de acero inoxidable 304 de 200 L con 15 tubos de borosilicato tricapa orientado al Sur a 45°'
        }
      },
      {
        id: 'paneles_solares_ext',
        name: 'Arreglo Fotovoltaico Solar (6 Paneles Tier 1)',
        tags: ['3.3 kWp Potencia', 'Losa Técnica Norte', '6 Módulos de 550W', 'Autosuficiencia'],
        specs: {
          'Ubicación': 'Al lado norte de la cubierta sobreelevada (X = 3.00m a 6.70m, Y = -1.05m a -3.65m)',
          'Producción': '~450 kWh/mes de generación limpia para consumo residencial y carga EV'
        }
      },
      {
        id: 'clima_condensadoras_ext',
        name: 'Condensadoras A/C Inverter (Losa Técnica Sur)',
        tags: ['3 Unidades Exteriores', 'Losa Técnica Sur', 'Ocultas de Fachada', 'Anti-vibración'],
        specs: {
          'Ubicación': 'Al lado sur de la cubierta sobreelevada (X = 3.00m a 8.52m, Y = -6.55m a -9.80m)',
          'Ventaja': 'Agrupadas discretamente al sur de la cubierta para no invadir el Roof Garden frontal ni ser visibles desde la calle'
        }
      }
    ]
  };

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
// 3. CONTROLADOR DEL PLANEADOR FINANCIERO & SIMULADOR DE AHORRO
// ==========================================================================
function initFinancialPlanner() {
  const inputSavings = document.getElementById('input-savings-month');
  const inputInitial = document.getElementById('input-initial-capital');
  const selectPhase = document.getElementById('select-target-phase');
  const phaseCards = document.querySelectorAll('.phase-card');
  const btnMXN = document.getElementById('btn-cur-mxn');
  const btnUSD = document.getElementById('btn-cur-usd');

  function calculateFinance() {
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

  function updateCurrencyUI() {
    document.querySelectorAll('.currency-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cur === currentCurrency);
    });

    const prefix = document.getElementById('lbl-prefix-cur');
    if (prefix) prefix.textContent = currentCurrency === 'USD' ? 'USD $' : '$';

    for (let i = 1; i <= 4; i++) {
      const p = phasesData[i];
      const costEl = document.getElementById('cost-phase-' + i);
      const subcostEl = document.getElementById('subcost-phase-' + i);
      const reqEl = document.getElementById('req-phase-' + i);

      if (costEl) costEl.textContent = formatMoney(p.totalMXN);
      if (subcostEl) {
        const otherCur = currentCurrency === 'MXN' ? 'USD' : 'MXN';
        subcostEl.textContent = '~' + formatMoney(p.totalMXN, otherCur);
      }
      if (reqEl) reqEl.textContent = formatMoney(p.totalMXN * p.anticipoPct);
    }

    const sumF1 = document.getElementById('sum-fase-1');
    const sumF2 = document.getElementById('sum-fase-2');
    const sumF34 = document.getElementById('sum-fase-3-4');
    const sumTot = document.getElementById('sum-total');

    if (sumF1) sumF1.textContent = formatMoney(phasesData[1].totalMXN);
    if (sumF2) sumF2.textContent = formatMoney(phasesData[2].totalMXN);
    if (sumF34) sumF34.textContent = formatMoney(phasesData[3].totalMXN + phasesData[4].totalMXN);
    if (sumTot) sumTot.textContent = formatMoney(3572000);

    calculateFinance();
    renderBudgetTable();
  }

  if (btnMXN) {
    btnMXN.addEventListener('click', () => {
      if (currentCurrency !== 'MXN') {
        currentCurrency = 'MXN';
        if (inputSavings) inputSavings.value = Math.round(parseFloat(inputSavings.value) * exchangeRate);
        if (inputInitial) inputInitial.value = Math.round(parseFloat(inputInitial.value) * exchangeRate);
        updateCurrencyUI();
      }
    });
  }

  if (btnUSD) {
    btnUSD.addEventListener('click', () => {
      if (currentCurrency !== 'USD') {
        currentCurrency = 'USD';
        if (inputSavings) inputSavings.value = Math.round(parseFloat(inputSavings.value) / exchangeRate);
        if (inputInitial) inputInitial.value = Math.round(parseFloat(inputInitial.value) / exchangeRate);
        updateCurrencyUI();
      }
    });
  }

  phaseCards.forEach(card => {
    card.addEventListener('click', () => {
      phaseCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const pId = card.dataset.phase;
      if (selectPhase) {
        selectPhase.value = pId;
        calculateFinance();
      }
    });
  });

  if (selectPhase) {
    selectPhase.addEventListener('change', () => {
      phaseCards.forEach(c => {
        c.classList.toggle('active', c.dataset.phase === selectPhase.value);
      });
      calculateFinance();
    });
  }

  if (inputSavings) inputSavings.addEventListener('input', calculateFinance);
  if (inputInitial) inputInitial.addEventListener('input', calculateFinance);

  updateCurrencyUI();
}

// ==========================================================================
// 4. CONTROLADOR DEL PRESUPUESTO & TABLA DE PAGOS
// ==========================================================================
let currentBudgetFilter = 'all';

function renderBudgetTable() {
  const tableBody = document.getElementById('budget-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = '';
  const filtered = budgetItems.filter(item => {
    return currentBudgetFilter === 'all' || item.phase === currentBudgetFilter;
  });

  filtered.forEach(item => {
    const row = document.createElement('tr');
    
    let phaseBadge = '';
    if (item.phase === 'fase1') phaseBadge = '<span class="phase-badge phase-1">Fase 1: Núcleo</span>';
    else if (item.phase === 'fase2') phaseBadge = '<span class="phase-badge phase-2">Fase 2: Planta Alta</span>';
    else if (item.phase === 'fase3') phaseBadge = '<span class="phase-badge phase-3">Fase 3: Roof</span>';
    else if (item.phase === 'fase4') phaseBadge = '<span class="phase-badge phase-4">Fase 4: Solar</span>';

    const unitFormatted = formatMoney(item.costMXN / item.qty);
    const subtotalFormatted = formatMoney(item.costMXN);

    row.innerHTML = `
      <td>${phaseBadge}</td>
      <td><strong>${item.name}</strong></td>
      <td class="text-muted" style="font-size: 0.8rem;">${item.spec}</td>
      <td style="text-align: center; font-weight: 700;">${item.qty}</td>
      <td style="font-family: var(--font-mono); font-size: 0.85rem;">${unitFormatted}</td>
      <td style="font-family: var(--font-mono); font-weight: 800; color: var(--color-primary);">${subtotalFormatted}</td>
    `;
    tableBody.appendChild(row);
  });
}

function initBudget() {
  const filterButtons = document.querySelectorAll('#budget-filters .filter-btn');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentBudgetFilter = btn.dataset.filter;
      renderBudgetTable();
    });
  });

  renderBudgetTable();
}

// ==========================================================================
// 5. CONTROLADOR DEL VISOR DE PLANOS ARQUITECTÓNICOS (PB, PA, ROOF)
// ==========================================================================
function renderFloor(floorKey) {
  const display = document.getElementById('blueprint-display');
  const terrainWrapper = document.getElementById('terrain-svg-wrapper');
  if (!display) return;

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
        <text x="393.4" y="280" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">HUELLA CONSTRUIDA EN 3 NIVELES</text>
        <text x="393.4" y="300" font-size="9" font-weight="700" fill="#94a3b8" text-anchor="middle">Área Terreno: 153.19 m² • Perímetro: 50.57 m</text>
      </svg>
    `;
  }

  attachRoomInteractivity(floorKey);
}

function attachRoomInteractivity(floorKey) {
  const display = document.getElementById('blueprint-display');
  if (!display) return;

  const roomGroups = display.querySelectorAll('g[id^="room-"]');
  roomGroups.forEach(group => {
    group.style.cursor = 'pointer';
    group.addEventListener('click', (e) => {
      e.stopPropagation();
      const roomId = group.id.replace('room-', '');
      showRoomDetails(floorKey, roomId);
    });
  });
}

function showRoomDetails(floorKey, roomId) {
  const roomNameEl = document.getElementById('room-name');
  const roomBadgeEl = document.getElementById('room-badge');
  const roomSpecsEl = document.getElementById('room-specs');

  const floorData = blueprintData[floorKey];
  if (!floorData) return;

  let room = null;
  if (Array.isArray(floorData)) {
    room = floorData.find(r => r.id === roomId);
  } else if (floorData.rooms && floorData.rooms[roomId]) {
    room = floorData.rooms[roomId];
  }

  if (!room) return;

  if (roomNameEl) roomNameEl.textContent = room.name;
  if (roomBadgeEl) roomBadgeEl.textContent = floorKey === 'pb' ? 'Planta Baja' : floorKey === 'pa' ? 'Planta Alta' : 'Roof Garden';

  if (roomSpecsEl) {
    const tagsHTML = (room.tags || []).map(t => `<span class="badge" style="margin-right:4px;">${t}</span>`).join(' ');
    const descHTML = room.desc ? `<p style="margin-top:8px; font-size:0.85rem; color:var(--text-muted);">${room.desc}</p>` : '';
    roomSpecsEl.innerHTML = tagsHTML + descHTML;
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
// 6. BITÁCORA DE SUPERVISIÓN & CHECKLIST DE CALIDAD EN OBRA
// ==========================================================================
const checklistItems = [
  { id: 'chk-1', phase: 'Fase 1', title: 'Estudio de Mecánica de Suelos & Trazo Estación Total', desc: "Validar capacidad de carga q_adm >= 1.5 kg/cm2 y linderos exactos (153.19 m2)." },
  { id: 'chk-2', phase: 'Fase 1', title: 'Cisterna 5,000 L & Prueba de Estanqueidad', desc: "Concreto armado f'c=250 con aditivo hidrófugo integral y prueba de llenado por 48h sin fugas." },
  { id: 'chk-3', phase: 'Fase 1', title: 'Cimentación & Fumigación Antitermitas', desc: "Verificar armados de acero, zapatas corridas y aplicación de barrera química." },
  { id: 'chk-4', phase: 'Fase 1', title: 'Muros de Carga & Losa Entrepiso PB-PA', desc: "Castillos colados a plomo, vigueta/bovedilla poliestireno y losa con f'c=250." },
  { id: 'chk-5', phase: 'Fase 1', title: 'Canalizaciones Conduit & Cable Neutro al 100%', desc: 'Mangueras de 1" para red Cat6A, 3/4" para fuerza y cable neutro en todas las chalupas profundas (50mm).' },
  { id: 'chk-6', phase: 'Fase 1', title: 'Prueba Hidrostática en Tuberías PPR Termofusionadas', desc: "Presurizar tuberías de agua fría y caliente a 10 bar (145 PSI) por 24 horas antes de colar o aplanar." },
  { id: 'chk-7', phase: 'Fase 1', title: 'Impermeabilización Termofusionada en Azotea (+6.00m)', desc: "Membrana prefabricada 4.5mm con poliéster y prueba de encharcamiento por 24 horas." },
  { id: 'chk-8', phase: 'Fase 2', title: 'Prueba de Inundación en Bases de Regaderas PA', desc: "Colocación de membrana elastomérica en área de regaderas y prueba de agua por 24h." },
  { id: 'chk-9', phase: 'Fase 2', title: 'Colocación de Cocina Integral con Isla & Canceles', desc: "Canceles de cristal templado 9.5mm con herrajes inox y cocina a nivel con cierre suave." },
  { id: 'chk-10', phase: 'Fase 3', title: 'Piso Deck & Barandal de Cristal en Roof Garden', desc: "Fijación de postes de acero inox en pretil frontal y pendientes de drenaje pluvial 2%." },
  { id: 'chk-11', phase: 'Fase 4', title: 'Instalación de Paneles Solares (3.3 kWp) & Calentador Solar', desc: "Estructuras de aluminio ancladas a dados de concreto sin perforar la membrana impermeable." },
  { id: 'chk-12', phase: 'Fase 4', title: 'Comisionamiento de Rack 12U & Home Assistant', desc: "Certificación de cableado Cat6A con tester digital, roaming Wi-Fi 7 y pruebas de CCTV 4K." }
];

function initChecklist() {
  const container = document.getElementById('checklist-container');
  const progressText = document.getElementById('checklist-progress-text');
  if (!container) return;

  container.innerHTML = '';
  let completed = 0;

  checklistItems.forEach(item => {
    const isChecked = localStorage.getItem('chk_' + item.id) === 'true';
    if (isChecked) completed++;

    const card = document.createElement('div');
    card.className = 'checklist-card' + (isChecked ? ' checked' : '');
    card.innerHTML = `
      <div class="checklist-item-header">
        <input type="checkbox" id="${item.id}" class="checklist-checkbox" ${isChecked ? 'checked' : ''}>
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label for="${item.id}" class="checklist-item-title">${item.title}</label>
            <span class="phase-badge phase-1" style="font-size: 0.65rem;">${item.phase}</span>
          </div>
          <p class="checklist-item-desc">${item.desc}</p>
        </div>
      </div>
    `;

    const checkbox = card.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      localStorage.setItem('chk_' + item.id, checkbox.checked);
      card.classList.toggle('checked', checkbox.checked);
      updateChecklistProgress();
    });

    container.appendChild(card);
  });

  function updateChecklistProgress() {
    const total = checklistItems.length;
    const currentChecked = document.querySelectorAll('.checklist-checkbox:checked').length;
    if (progressText) {
      progressText.textContent = `${currentChecked} de ${total} Verificaciones Completadas (${Math.round((currentChecked/total)*100)}%)`;
    }
  }

  updateChecklistProgress();
}

// ==========================================================================
// 7. BIBLIOTECA DE DOCUMENTOS Y DOSSIER TÉCNICO OFICIAL (01 a 14)
// ==========================================================================
const docsContent = {
  vision: `
    <h2>01. Visión Estratégica y Cronograma Maestro</h2>
    <p>La estrategia se basa en ejecutar la <strong>Fase 1 (Casa Núcleo Habitable)</strong> en los primeros 6 meses, mudarse de inmediato para eliminar el gasto de renta, y habilitar el crecimiento modular por fases a lo largo de 3 años sin demoliciones ni retrabajos.</p>
  `,
  dossier: `
    <h2>02. Dossier Técnico de Obra Negra para Electricista y Arquitecto</h2>
    <p>Normas obligatorias para canalizaciones en obra negra:</p>
    <ul>
      <li><strong>Cable Neutro Obligatorio:</strong> En el 100% de las cajas de apagadores para compatibilidad con micro-módulos Zigbee/Matter.</li>
      <li><strong>Chalupas Profundas (50 mm):</strong> Cajas metálicas galvanizadas de 50mm de profundidad mínima.</li>
      <li><strong>Ductos Pesados Cat6A:</strong> Manguera conduit de 1 pulgada exclusiva para red, sin compartir canalización con cables de alta tensión.</li>
    </ul>
  `,
  network: `
    <h2>03. Arquitectura de Red, Rack 12U y Telecomunicaciones</h2>
    <p>Infraestructura cableada Cat6A con topología en estrella hacia el Rack 12U en el Cuarto de Máquinas de PB. 3 Puntos de Acceso Wi-Fi 7 (PB, PA, Roof Top) y 4 Cámaras 4K PoE perimetrales.</p>
  `,
  subsystems: `
    <h2>04. Subsistemas Domóticos y Sensores de Presencia</h2>
    <p>Integración de iluminación circadiana DALI/Zigbee, sensores de presencia milimétrica mmWave (24GHz) para detección de presencia estática y automatización de clima.</p>
  `,
  budget: `
    <h2>05. Catálogo de Dispositivos y Especificaciones</h2>
    <p>Listado de componentes certificados Matter, Zigbee 3.0 y equipos de red grado empresarial.</p>
  `,
  neufert: `
    <h2>06. Dictamen de Estándares Neufert y Criterios Arquitectónicos</h2>
    <p>Cumplimiento de alturas libres mínimas (2.60m a 2.75m), circulaciones fluidas (pasillos de 1.15m), iluminación natural cenital y ventilación cruzada.</p>
  `,
  topography: `
    <h2>07. Levantamiento Topográfico y Geometría Real del Terreno</h2>
    <p>Polígono de 153.19 m² (Perímetro: 50.57 m) con ángulos reales y servidumbres respetadas (arriate de 60 cm y banqueta de 90 cm).</p>
  `,
  zoning: `
    <h2>08. Programa Arquitectónico y Zonificación en 3 Niveles</h2>
    <p>Distribución en 3 niveles con 4 recámaras (Suite en PB + Master Suite + 2 Secundarias), 3.5 baños, Gran Área Social, Cuarto de Máquinas y Roof Garden Frontal.</p>
  `,
  mep: `
    <h2>09. Ingenierías MEP & Domótica Integrada</h2>
    <p>Tablero QO-24 bifásico (220V/110V), circuito EV 40A, circuito UPS para servidores, iluminación circadiana, red estructurada Cat6A y fontanería presurizada a 3.5 bar.</p>
  `,
  plumbing: `
    <h2>10. Planos e Ingeniería Hidrosanitaria & Drenaje Pluvial</h2>
    <p>Planos ejecutivos unifilares e isométricos de agua potable, solar y drenaje:</p>
    <ul>
      <li><a href="planos_y_diagramas/01_plano_isometrico_hidraulico_y_solar.svg" target="_blank" style="color: #38bdf8; font-weight: 700;">Ver Plano Isométrico Hidráulico & Solar SVG ↗</a></li>
      <li><a href="planos_y_diagramas/02_plano_red_sanitaria_y_pluvial.svg" target="_blank" style="color: #f87171; font-weight: 700;">Ver Plano de Red Sanitaria & Pluvial SVG ↗</a></li>
    </ul>
  `,
  civilbudget: `
    <h2>11. Presupuesto Paramétrico de Obra Civil Completa (235 m²)</h2>
    <p>Estimación desglosada por capítulos para construcción residencial medio-alto ($15,200 MXN/m²): <strong>$3,572,000 MXN</strong> ($178,600 USD).</p>
  `,
  masterplan: `
    <h2>12. Plan Maestro de Construcción Paso a Paso (10 Meses)</h2>
    <p>Ruta crítica desde mecánica de suelos y trámites de licencias hasta colado de losas, acabados finos y entrega de llaves en mano.</p>
  `,
  progressive: `
    <h2>13. Estrategia de Construcción Progresiva & Habitabilidad Inmediata</h2>
    <p>Plan en 4 fases para mudarse en el mes 6, eliminar gastos de renta e ir completando acabados y tecnología en el tiempo sin demoliciones ni retrabajos.</p>
  `,
  cashflow: `
    <h2>14. Guía Financiera & Flujo de Caja por Fases</h2>
    <p>Desglose de anticipos requeridos (Fase 1: $594k MXN | Fase 2: $174k MXN | Fase 3: $126k MXN | Fase 4: $108k MXN) y ministraciones semanales durante la obra.</p>
  `
};

function initDocsViewer() {
  const navItems = document.querySelectorAll('#docs-nav-list .docs-nav-item');
  const viewer = document.getElementById('doc-viewer-content');

  function renderDoc(docKey) {
    if (!viewer) return;
    const content = docsContent[docKey] || '<p>Documento en preparación...</p>';
    viewer.innerHTML = content;
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      renderDoc(item.dataset.doc);
    });
  });

  renderDoc('vision');
}

// ==========================================================================
// 8. CONTROLADOR DE PESTAÑAS PRINCIPALES (TABS)
// ==========================================================================
function initNavigationTabs() {
  const tabButtons = document.querySelectorAll('.nav-tabs .nav-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = 'sec-' + btn.dataset.tab;
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });
}

// ==========================================================================
// 9. INICIALIZACIÓN GLOBAL
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavigationTabs();
  initFinancialPlanner();
  initBudget();
  initBlueprintViewer();
  initChecklist();
  initDocsViewer();
});
