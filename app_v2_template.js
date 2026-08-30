// =========================================================
// CASA 235 – app_v2_template.js
// Sistema de Planificación Financiera → Constructiva
// =========================================================

// --- STATE & HELPERS ---
const DB = {
  get: (k, def) => { try { return JSON.parse(localStorage.getItem('casa235_' + k)) ?? def; } catch { return def; } },
  set: (k, v)   => localStorage.setItem('casa235_' + k, JSON.stringify(v)),
};

function fmx(n, short=false) {
  if (n === undefined || n === null) return '—';
  const formatted = Math.round(n).toLocaleString('es-MX');
  return short ? '$' + (n >= 1000000 ? (n/1000000).toFixed(1)+'M' : n >= 1000 ? (n/1000).toFixed(0)+'k' : formatted) : '$' + formatted;
}

function today() { return new Date().toISOString().slice(0,10); }
function thisMonth() { return new Date().toISOString().slice(0,7); }

// =========================================================
// PHASE DATA
// =========================================================
const PHASES = [
  {
    num: 0, key: 'f0',
    label: 'F0: Pre-Obra',
    icon: '💰',
    title: 'Capital & Pre-Obra',
    budget: 700000,
    desc: 'Reunir el anticipo, liquidar trámites, DRO, levantamiento topográfico y permisos.',
    color: '#fbbf24',
    months: '3–12 meses de ahorro',
    hitos: [
      { id:'f0-1', title:'Cuenta de ahorro dedicada abierta para la obra', acceptance:'Número de cuenta exclusivo para depósitos del proyecto. NO mezclar con gastos personales.', material:'Cuenta bancaria separada, preferiblemente CETES o SOFIPO', risk:'Confundir fondos personales con los de obra puede descapitalizarte en momentos críticos.', tags:['Financiero','Prioritario'] },
      { id:'f0-2', title:'Terreno 100% liquidado, escriturado y libre de gravamen', acceptance:'Escritura con folio real, predial al corriente, sin hipotecas ni embargos. Certificado de libertad de gravamen vigente.', material:'Escritura notarial, predial pagado, certificado libre de gravamen', risk:'Iniciar obra sobre un terreno con adeudos puede detener la construcción por orden judicial.', tags:['Legal','Crítico'] },
      { id:'f0-3', title:'Arquitecto/DRO contratado y planos aprobados por municipio', acceptance:'Contrato firmado con DRO. Licencia de construcción vigente. Planos sellados con número de aprobación municipal.', material:'Licencia de construcción, planos ejecutivos, contrato DRO', risk:'Construir sin licencia expone a demolición, multas y problemas de escrituración futura.', tags:['Legal','Crítico'] },
      { id:'f0-4', title:'Estudio de mecánica de suelos realizado', acceptance:'Dictamen firmado por laboratorio certificado indicando tipo de suelo, capacidad de carga y recomendación de cimentación.', material:'Dictamen de mecánica de suelos', risk:'Sin este estudio, la cimentación puede estar subdimensionada causando hundimientos diferenciales.', tags:['Técnico','Crítico'] },
      { id:'f0-5', title:'Programa de obra y presupuesto detallado acordado', acceptance:'Documento firmado por arquitecto/constructor con desglose por partida, costos unitarios, cantidades y calendarización.', material:'Programa de obra fechado y firmado, presupuesto por partida', risk:'Sin presupuesto detallado, los cambios de precio y "extras" pueden disparar el costo 30-40%.', tags:['Financiero','Técnico'] },
      { id:'f0-6', title:'Contrato de construcción firmado con penalizaciones', acceptance:'Contrato con precio fijo o mixto, plazos, especificaciones, forma de pago (30% anticipo + estimaciones), retención del 5% y cláusula de penalización por retraso.', material:'Contrato legal revisado por notario o abogado', risk:'Sin contrato, cualquier modificación oral puede costar caro. La retención del 5% es tu garantía de calidad.', tags:['Legal','Financiero'] },
      { id:'f0-7', title:'Capital mínimo acumulado para iniciar Fase 1 ($700,000 MXN)', acceptance:'Saldo verificable en cuenta de obra igual o superior a la meta acordada. Idealmente 35% del costo total de F1 + 10% de buffer.', material:'Estado de cuenta bancario', risk:'Iniciar sin capital suficiente obliga a detener la obra, lo cual deteriora la obra gris expuesta.', tags:['Financiero','Prioritario'] },
    ]
  },
  {
    num: 1, key: 'f1',
    label: 'F1: Estructura PB',
    icon: '🏗️',
    title: 'Estructura & Núcleo Habitable PB',
    budget: 1980000,
    desc: 'Cimentación, estructura, muros, losa, instalaciones básicas y acabados para habitar Planta Baja al mes 6.',
    color: '#3b82f6',
    months: '6 meses de construcción',
    hitos: [
      { id:'f1-1', title:'Trazo y nivelación de ejes conforme a planos', acceptance:'Verificar que los ejes N-S y E-O coinciden con el plano DRO con tolerancia ±2cm. Utilizar nivel láser o de manguera.', material:'Cal, estacas, hilo de nylon, nivel láser', risk:'Un trazo incorrecto desplaza toda la construcción. Error de 5cm puede invalidar las servidumbres legales.', tags:['Maestro Albañil','Semana 1'] },
      { id:'f1-2', title:'Excavación y cisterna de 5,000 L a profundidad indicada', acceptance:'Profundidad mínima según estudio de suelos. Cisterna con paredes de concreto f\'c=200 y aditivo impermeabilizante. Prueba de llenado 48h sin filtraciones.', material:'Concreto premezclado f\'c=200, aditivo hidróstop, malla electrosoldada', risk:'Cisterna mal impermeabilizada pierde agua constantemente. Profundidad insuficiente de cimentación causa fallas estructurales.', tags:['Maestro Albañil','Semana 2-4'] },
      { id:'f1-3', title:'Cimentación: zapatas corridas y aisladas f\'c=250', acceptance:'Concreto f\'c=250 kg/cm² verificado con cono de Abrams (revenimiento 14±2cm). Acero ASTM A615 Gr60 diámetros según plano. Descanso mínimo 7 días para cimbrado.', material:'Concreto premezclado f\'c=250, acero 3/8" y 1/2", alambre recocido, cimbra metálica', risk:'Usar concreto f\'c=200 en cimentación de 3 niveles es error CRÍTICO. Exige nota de remisión de la planta de concreto.', tags:['Maestro Albañil','Semana 5-7','CRÍTICO'] },
      { id:'f1-4', title:'Muros de carga PB: block 15×20×40, castillos y dalas', acceptance:'Block tipo estructural (no tabique). Castillos cada 2.5m máximo. Dalas de amarre en cada entrepiso. Verificar aplomo ±1cm por metro de altura.', material:'Block 15×20×40 clase A, cemento, arena, acero 3/8" para castillos', risk:'Usar block de menor resistencia o eliminar castillos compromete la capacidad de carga para 3 niveles.', tags:['Maestro Albañil','Semana 8-10'] },
      { id:'f1-5', title:'Instalación hidráulica PPR y sanitaria PVC enterrada', acceptance:'Tuberías PPR PN-20 termofusionadas (NO roscadas). Prueba hidrostática 10 bar durante 24h sin pérdida de presión. PVC sanitario con pendientes mínimas 2%.', material:'Tubo PPR PN-20, conectores termofusibles, PVC sanitario 4" y 2"', risk:'Fugas en instalación oculta son costosísimas de reparar. La prueba hidrostática es OBLIGATORIA antes de rellenar.', tags:['Plomero PPR','Semana 11-13','VERIFICAR'] },
      { id:'f1-6', title:'Losa de entrepiso PB-PA: concreto colado in situ', acceptance:'Espesor mínimo 12cm según cálculo. Concreto f\'c=250 con curado mínimo 28 días antes de cargar. Verificar retiro de cimbra solo después de prueba de resonancia o 28 días.', material:'Concreto premezclado f\'c=250, varilla 3/8" y 1/2", alambre, cimbra', risk:'Descimbrar antes de tiempo es causa frecuente de colapsos. El curado del concreto es CRÍTICO.', tags:['Maestro Albañil','Semana 14-16','CRÍTICO'] },
      { id:'f1-7', title:'Tablero eléctrico QO-24 y cableado alimentador instalados', acceptance:'Tablero marca Square D o Siemens con capacidad 125A. Calibre 10 AWG THW para circuitos de iluminación, calibre 12 para contactos especiales. Tierra física verificada.', material:'Tablero QO-24, breakers 20A GFCI, cable THW cal.10/12, tubo conduit', risk:'Instalación eléctrica sin tierra física es peligro de electrocución. Verificar que el electricista tenga certificación CFE.', tags:['Electricista','Semana 17-19'] },
      { id:'f1-8', title:'Impermeabilización azotea: 3 capas mínimo + pendientes', acceptance:'Sistema bicapa o tricapa con membrana de poliuretano o acrílica elastomérica. Pendientes mínimas 2% hacia bajadas pluviales. Prueba de inundación 72h.', material:'Impermeabilizante elastomérico (Fester, Sika, o similar), malla de refuerzo', risk:'Una azotea mal impermeabilizada destruye acabados interiores y estructuras metálicas en 1-2 temporadas de lluvia.', tags:['Impermeabilizador','Semana 20-21','VERIFICAR'] },
      { id:'f1-9', title:'Aplanados, pisos porcelánicos y acabados PB terminados', acceptance:'Aplanados con plomada y regla. Piso porcelánico 60×60 con crucetas y nivel. Azulejos en baños con lechada sellada. Puertas y ventanas instaladas y selladas.', material:'Cemento cola, porcelánico 60×60, crucetas, lechada, sellador', risk:'Pisos sin nivel causan charcos y estética deficiente. Verificar que la humedad del concreto sea <4% antes de instalar pisos.', tags:['Yesero/Pisero','Semana 22-24'] },
      { id:'f1-10', title:'🔑 HITO FINAL: Mudanza y habitabilidad Planta Baja (Mes 6)', acceptance:'Agua corriente fría/caliente, energía eléctrica con tablero, baño funcional, cocina con fregadero, ventanas selladas, puertas con llave. DEBEN estar completos ANTES de mudanza.', material:'Revisión final con DRO', risk:'Mudarse sin acabados básicos extiende el plazo de F2-F3 indefinidamente. La incomodidad desmotiva y frena el ahorro.', tags:['Hito Crítico','Mes 6'] },
    ]
  },
  {
    num: 2, key: 'f2',
    label: 'F2: Planta Alta',
    icon: '🏠',
    title: 'Planta Alta & Confort Familiar',
    budget: 580000,
    desc: '3 recámaras, 2 baños completos, family room, cocina integral y balcón frontal.',
    color: '#8b5cf6',
    months: '6 meses (viviendo abajo)',
    hitos: [
      { id:'f2-1', title:'Muros PA y estructura completa al nivel de azotea', acceptance:'Muros de block estructural, castillos y dalas al nivel +6.00m. Escalera confinada funcional y segura para acceso a PA.', material:'Block 15×20×40, concreto f\'c=250, acero ASTM Gr60', risk:'La escalera sin pasamanos es riesgo de accidente durante la obra. Exigir barandal provisional inmediatamente.', tags:['Maestro Albañil','Mes 7-8'] },
      { id:'f2-2', title:'Instalaciones hidráulicas y sanitarias PA terminadas', acceptance:'Prueba hidrostática 10 bar en red nueva. Ramales a 3 baños completos y zinc de servicio. Ventilación sanitaria con CVS visible en azotea.', material:'PPR PN-20, PVC 4"/2"/1.5", CVS en azotea', risk:'Una fuga en PA gotea directo a PB ya habitada. IMPERATIVO hacer prueba antes de cubrir instalaciones.', tags:['Plomero PPR','Mes 8'] },
      { id:'f2-3', title:'Losa de azotea PA (+6.00m) colada y curada', acceptance:'Concreto f\'c=250, espesor 12cm, curado 28 días. No cargar hasta curado completo.', material:'Concreto premezclado f\'c=250, acero 3/8"', risk:'Descimbrado prematuro en PA puede colapsar sobre PB habitada. CRÍTICO.', tags:['Maestro Albañil','Mes 9','CRÍTICO'] },
      { id:'f2-4', title:'Carpintería: cocina integral, clósets y puertas PA', acceptance:'Cocina con herraje blum, acabado MDF lacado o melamina de alta presión. Clósets con medidas según plano. Puertas macizas o MDF con marco metálico.', material:'Carpintería MDF, herrajes Blum/Hafele, jaladera barra', risk:'Carpintería barata se hincha con humedad. Pedir garantía de 1 año por escrito al carpintero.', tags:['Carpintero','Mes 10-11'] },
      { id:'f2-5', title:'Pisos, azulejos y acabados PA terminados', acceptance:'Pisos nivelados, lechada sellada en juntas, azulejos en duchas hasta plafón o guarnición. Sin fisuras en aplanados.', material:'Porcelánico 60×60, azulejo 30×60 para duchas, lechada Cementica', risk:'Lechada sin sellar en duchas provoca infiltración que daña la estructura.', tags:['Yesero/Pisero','Mes 11-12'] },
    ]
  },
  {
    num: 3, key: 'f3',
    label: 'F3: Roof Garden',
    icon: '🌿',
    title: 'Roof Garden & Entretenimiento',
    budget: 420000,
    desc: 'Terraza lounge frontal 40.5 m², pérgola, asador, 1/2 baño y caseta de escalera.',
    color: '#10b981',
    months: '4 meses',
    hitos: [
      { id:'f3-1', title:'Caseta de escalera y 1/2 baño Roof Garden terminados', acceptance:'Caseta hermética con puerta exterior. Medio baño con agua fría/caliente, wc suspendido y ventilación. Impermeabilizado.', material:'Block, concreto f\'c=200, impermeabilizante, wc suspendido', risk:'Sin el 1/2 baño, los invitados deben bajar a PA, comprometiendo privacidad.', tags:['Maestro Albañil','Mes 19-20'] },
      { id:'f3-2', title:'Impermeabilización total de azotea Roof Garden', acceptance:'Sistema bicapa con refuerzo en juntas y esquinas. Prueba de inundación 72h. Pendientes hacia coladeras visibles.', material:'Impermeabilizante elastomérico, malla de refuerzo, zoclo perimetral 10cm', risk:'Una filtración en Roof Garden daña directamente la Habitación Master de PA.', tags:['Impermeabilizador','Mes 19','CRÍTICO'] },
      { id:'f3-3', title:'Pérgola, piso deck y mobiliario Roof Garden instalados', acceptance:'Pérgola de acero o aluminio anclada correctamente. Piso deck antiderrapante. Asador de acero inoxidable con salida de gas.', material:'Pérgola metálica, deck de madera sintética, asador acero inoxidable', risk:'Pérgola sin ancla suficiente puede caer con viento fuerte. Exigir cálculo estructural de anclajes.', tags:['Herrero/Instalador','Mes 21-22'] },
    ]
  },
  {
    num: 4, key: 'f4',
    label: 'F4: Solar & Smart',
    icon: '⚡',
    title: 'Sistema Solar & Domótica',
    budget: 362000,
    desc: 'Arreglo fotovoltaico 3.3 kWp, calentador solar, cargador EV y domótica básica.',
    color: '#f59e0b',
    months: '2 meses',
    hitos: [
      { id:'f4-1', title:'Calentador solar termosifónico 200L instalado en losa técnica', acceptance:'15 tubos de vacío orientados al sur a 45°. Termotanque acero inoxidable 304. Conexión a red hidráulica con bypass para gas.', material:'Calentador solar 200L Solahart o similar, tubería cobre', risk:'Orientación incorrecta reduce eficiencia hasta 60%. Verificar azimut sur ±15°.', tags:['Plomero Solar','Mes 30'] },
      { id:'f4-2', title:'Sistema fotovoltaico 3.3 kWp instalado y CFE aprobado', acceptance:'6 paneles 550W Tier 1 (Longi, JA Solar, Jinko). Inversor híbrido Growatt o SolarEdge. Dictamen CFE para interconexión. Medidor bidireccional instalado.', material:'6 paneles 550W, inversor 3kW, cableado DC/AC, medidor bidireccional', risk:'Sin dictamen CFE la instalación solar es ilegal. El proceso tarda 30-60 días: iniciarlo antes.', tags:['Instalador Solar','Mes 30-31'] },
      { id:'f4-3', title:'Cargador EV 240V y circuito dedicado instalado', acceptance:'EVSE nivel 2 (240V, 32A mínimo) con circuito dedicado 40A. Tierra física. UL listed. Instalación por electricista certificado.', material:'Cargador EVSE J1772, breaker 40A, cable THHN calibre 8', risk:'Sin tierra física, el cargador EV puede electrocutar. OBLIGATORIO verificar con voltímetro.', tags:['Electricista','Mes 31'] },
      { id:'f4-4', title:'Hub domótico y automatizaciones básicas operando', acceptance:'Hub instalado en Rack 12U PB. Apagadores inteligentes en zonas principales. App configurada en celulares del hogar. Respaldo de configuración en nube.', material:'Hub Hubitat/Home Assistant, apagadores Zigbee/Z-Wave, Rack 12U', risk:'Sin backup de configuración, un reinicio del hub borra todas las automatizaciones.', tags:['NextGen Smart','Mes 32'] },
    ]
  }
];

// =========================================================
// PROPERTY OWNER GUIDE DATA
// =========================================================
const GUIDE_DATA = [
  {
    phase: 'F0: Pre-Obra', icon: '📜',
    sections: [
      { type: 'critical', label: 'ANTES DE FIRMAR CONTRATO', items: [
        'Pide 3 cotizaciones de diferentes constructores. El precio más bajo NO siempre es el mejor.',
        'Exige que el contrato sea con precio fijo o precio máximo garantizado. Sin esto, los "extras" serán infinitos.',
        'Incluye cláusula de penalización por retraso: mínimo 0.5% del contrato por semana de retraso.',
        'La retención del 5% (fondo de garantía) debe liberarse SOLO 12 meses después de terminada la obra. Esto motiva al constructor a resolver defectos.',
        'Pide referencias de obras anteriores y ve a verlas físicamente. Habla con los dueños.',
      ]},
      { type: 'warning', label: 'DOCUMENTOS QUE DEBES EXIGIR ANTES DE INICIAR', items: [
        'Licencia de construcción vigente (con número de expediente, no solo el recibo de trámite).',
        'Planos ejecutivos sellados por DRO con número de aprobación municipal.',
        'Dictamen de mecánica de suelos firmado por laboratorio certificado.',
        'Póliza de responsabilidad civil del constructor (accidentes de trabajadores).',
        'Programa de obra con calendario semanal firmado.',
      ]},
    ]
  },
  {
    phase: 'F1: Durante Construcción (Hitos Críticos)', icon: '🔍',
    sections: [
      { type: 'critical', label: 'CIMENTACIÓN — LO MÁS CRÍTICO', items: [
        'EXIGE la nota de remisión del concreto premezclado. Debe decir f\'c=250 kg/cm². Si el camión trae menos, RECHÁZALO.',
        'El revenimiento (fluidez) debe ser 14±2cm. Pide que lo midan con el cono de Abrams ante ti.',
        'Solicita al laboratorio que tome cilindros de prueba (mínimo 3 por colada) para rotura a los 28 días.',
        'NO aceptes que se "mejore" el concreto con agua en la obra. Esto lo debilita drásticamente.',
        'Fotografía el acero antes de colar. Verifica diámetros y separaciones según plano.',
      ]},
      { type: 'warning', label: 'INSTALACIONES HIDRÁULICAS', items: [
        'La prueba hidrostática a 10 bar durante 24h es OBLIGATORIA y debe hacerse ANTES de tapar las tuberías.',
        'Exige tubo PPR termofusionado, no roscado. Las uniones roscadas eventualmente gotean.',
        'Las bajadas pluviales deben estar conectadas y libres antes de impermeabilizar.',
        'Verifica que el diámetro de la cisterna sea el especificado y que tenga tapa hermética.',
      ]},
      { type: 'success', label: 'LIBERACIÓN DE ESTIMACIONES DE PAGO', items: [
        'NUNCA pagues una estimación sin antes verificar físicamente el avance en obra.',
        'Cada estimación debe venir con: resumen de avance, fotografías fechadas, memoria de cantidades.',
        'Descuenta automáticamente el 30% de amortización de anticipo y el 5% de retención de garantía.',
        'Si el avance no corresponde al pago solicitado, NEGOCIA o RETÉN el pago hasta completar.',
        'Pide factura por cada pago. Es tu comprobante y protección legal.',
      ]},
    ]
  },
  {
    phase: 'F2-F4: Fases Subsecuentes', icon: '🏗️',
    sections: [
      { type: 'warning', label: 'ANTES DE INICIAR CADA FASE NUEVA', items: [
        'NO inicies una fase nueva hasta tener el capital completo para finalizarla. Una obra detenida a medias se deteriora y cuesta más.',
        'Actualiza precios: los costos de construcción cambian 8-15% anual. Pide cotización actualizada para cada fase.',
        'Haz un "acta de entrega" de la fase anterior antes de iniciar la siguiente. Documenta cualquier defecto pendiente.',
        'Verifica que la retención del 5% de fase anterior esté activa. No la liberes hasta resolver todos los defectos.',
      ]},
      { type: 'success', label: 'PARA LOS SISTEMAS ESPECIALIZADOS (F4)', items: [
        'Solar: exige que el instalador tramite el dictamen CFE. Sin él, el medidor bidireccional no se instala y pagas doble.',
        'Sistema fotovoltaico: solicita garantía de 25 años del fabricante en paneles y 10 años en inversor.',
        'Domótica: exige documentación técnica del sistema y capacitación de uso. Pide backup de configuración.',
        'Cargador EV: instala un medidor submédico para monitorear el consumo de carga.',
      ]},
      { type: 'critical', label: 'CIERRE DE OBRA — ENTREGA FINAL', items: [
        'Pide carta de terminación de obra firmada por el DRO.',
        'Tramita la manifestación de terminación de obra ante el municipio (afecta el predial).',
        'Obtén las pólizas de garantía de todos los materiales y equipos instalados.',
        'Documenta todo: planos as-built (como quedó construido realmente), manuales de equipos.',
        'El 5% de retención se libera 12 MESES después de la entrega formal, no antes.',
      ]},
    ]
  },
  {
    phase: 'Errores Comunes a Evitar', icon: '⚠️',
    sections: [
      { type: 'critical', label: 'LOS 10 ERRORES MÁS CAROS EN AUTOCONSTRUCCIÓN', items: [
        '1. Dar anticipos excesivos (más del 30%) sin avance correspondiente — riesgo de abandono.',
        '2. No tener contrato escrito — sin él, no puedes exigir nada legalmente.',
        '3. Cambiar el diseño durante la obra — cada cambio cuesta 3-5 veces más que planificarlo desde el inicio.',
        '4. Usar materiales de menor especificación sin notificarte — exige notas de remisión de todo material.',
        '5. No hacer prueba hidrostática — las fugas ocultas se descubren hasta que ya hay daño estructural.',
        '6. Descimbrar la losa antes de 28 días — es la causa principal de colapsos en obra.',
        '7. No supervisar el nivel y aplomo — una pared chueca afecta toda la carpintería posterior.',
        '8. Pagar sin factura — pierdes protección legal y comprobación de gastos.',
        '9. Iniciar sin capital completo para la fase — obra detenida = dinero tirado.',
        '10. No exigir planos as-built — al vender o remodelar, nadie sabe dónde están las tuberías.',
      ]},
    ]
  },
];

// =========================================================
// BLUEPRINT DATA (rooms mapped to SVG group IDs)
// =========================================================
const blueprintData = {
  pb: [
    { id:'recamara-suite-pb', name:'Recámara Suite Principal PB', tags:['3.16 x 4.00 m','12.6 m²','Cama King','Baño en L'], specs:{ 'Ubicación':'Crujía Nor-Poniente', 'Equipamiento':'Cama King Size, cancel 2.85m al jardín posterior, acceso directo a vestidor y baño en L' } },
    { id:'gran-area-social-integrada', name:'Gran Área Social Integrada (Sala + Cocina)', tags:['22.2 m²','Techo 3.15m','Isla 3 bancos'], specs:{ 'Ubicación':'Crujía Sur-Poniente', 'Zonificación':'Sala, Cocina con isla y Comedor de 6 plazas' } },
    { id:'bano-completo-en-l-y-vestidor', name:'Baño en L + Vestidor PB', tags:['5.72 m²','Regadera 1.20×0.90m'], specs:{ 'Configuración':'Regadera, WC, Vanity y Vestidor privado' } },
    { id:'medio-bano-visitas', name:'Medio Baño de Visitas PB', tags:['1.60 m²','Vanity flotante','WC'], specs:{ 'Ubicación':'Alineado al estacionamiento' } },
    { id:'cuarto-maquinas-y-lavanderia', name:'Lavandería & Cuarto de Máquinas', tags:['6.00 m²','Rack 12U','Solar'], specs:{ 'Equipamiento':'Centro de lavado, Rack 12U e inversor solar' } },
    { id:'escalera-confinada-sin-invasion', name:'Escalera Compensada (17 escalones)', tags:['5.62 m²','Cero invasión'], specs:{ 'Diseño':'Tramo sur, vuelta en abanico y tramo norte. Fórmula Blondel.' } },
    { id:'area-estacionamiento-marcada', name:'Cochera (2 cajones)', tags:['30.28 m²','SUV + Compacto','EV 240V'], specs:{ 'Capacidad':'2 cajones + punto de carga para auto eléctrico' } },
    { id:'jardin-posterior-7x3', name:'Jardín Posterior Privado', tags:['21.0 m²','Cancel 2.85m'], specs:{ 'Diseño':'Jardín privado con vegetación, acceso desde recámara y área social' } },
  ],
  pa: [
    { id:'habitacion-principal-pa', name:'Habitación Principal Master PA', tags:['11.38 m²','Cama King','Balcón'], specs:{ 'Equipamiento':'King Size, TV 65", acceso a balcón frontal y vestidor' } },
    { id:'pasillo-closet-master-pa', name:'Pasillo-Clóset Vestidor Master', tags:['4.00 m²','Clóset 60cm'], specs:{ 'Función':'Conexión privada exclusiva Master↔Baño Principal' } },
    { id:'bano-principal-pa', name:'Baño Principal Master Suite', tags:['6.50 m²','Regadera Spa 2×1.2m'], specs:{ 'Distribución':'Regadera Spa, WC suspendido, Doble Vanity' } },
    { id:'family-room-abierto-pa', name:'Family Room Abierto', tags:['6.27 m²','Concepto abierto'], specs:{ 'Cualidades':'Sin paredes al norte, máxima luminosidad' } },
    { id:'recamara-secundaria-1-pa', name:'Recámara Secundaria 1', tags:['11.04 m²','Cama Queen','Escritorio'], specs:{ 'Equipamiento':'Queen Size, escritorio de estudio, clóset empotrado' } },
    { id:'recamara-secundaria-2-pa', name:'Recámara Secundaria 2', tags:['11.04 m²','Cama Queen','Escritorio'], specs:{ 'Equipamiento':'Queen Size, escritorio de estudio, clóset empotrado' } },
    { id:'balcon-frontal-pa', name:'Balcón Frontal (Fachada Este)', tags:['7.13 m²','Cristal templado','Lounge'], specs:{ 'Cualidades':'Acceso desde Recámara Master, vista a calle' } },
    { id:'zinc-fondo-pasillo-pa', name:'Zinc de Servicio', tags:['0.90 m²','Tarja','Ventilación'], specs:{ 'Equipamiento':'Tarja vertedero, mueble blancos, ventana de ventilación' } },
    { id:'bano-completo-compartido-pa', name:'Baño Compartido Recámaras', tags:['6.00 m²','Regadera Spa'], specs:{ 'Equipamiento':'Regadera Spa, WC, Vanity. Sobre lavandería PB.' } },
  ],
  ext: [
    { id:'zona-roof-garden-frontal', name:'Roof Garden Frontal (Deck Social)', tags:['40.5 m²','Pérgola','Asador','Lounge'], specs:{ 'Ventaja':'Vista panorámica, pérgola, grill de acero inoxidable, acceso a 1/2 baño' } },
    { id:'medio-bano-roof-garden', name:'Medio Baño Roof Garden', tags:['3.71 m²','Vanity','WC suspendido'], specs:{ 'Beneficio':'Servicio sanitario para invitados en azotea sin bajar a PA' } },
    { id:'caseta-escalera-azotea', name:'Caseta de Escalera (Cubo)', tags:['5.62 m²','Puerta hermética'], specs:{ 'Función':'Salida bajo techo desde escalera interior al Roof Garden' } },
    { id:'monitor-roof-pasillo', name:'Cubierta Sobreelevada (Monitor Roof)', tags:['Nivel +6.70m','Celosías Louvers'], specs:{ 'Diseño':'Luz cenital y tiro térmico convectivo para recámaras' } },
    { id:'calentador-solar-agua', name:'Calentador Solar 200L', tags:['15 tubos vacío','Ahorro 80% gas'], specs:{ 'Capacidad':'Termotanque 304 inox 200L, 15 tubos borosilicato, orientado Sur 45°' } },
    { id:'paneles-solares-norte', name:'Arreglo Fotovoltaico 3.3 kWp', tags:['6 paneles 550W','Tier 1'], specs:{ 'Producción':'~450 kWh/mes, para consumo residencial y carga EV' } },
    { id:'zona-tecnica-sur', name:'Condensadoras A/C (Losa Técnica Sur)', tags:['3 unidades inverter','Ocultas'], specs:{ 'Ventaja':'Agrupadas al sur, invisibles desde calle, sin invadir Roof Garden' } },
  ]
};

let currentFloor = 'pb';

// =========================================================
// SVG FLOOR PLAN FUNCTIONS (injected by generator)
// =========================================================
// __GROUND_FLOOR_SVG__

// __UPPER_FLOOR_SVG__

// __EXTERIOR_ROOF_SVG__

// =========================================================
// DOCS CONTENT (injected by generator)
// =========================================================
// __DOCS_CONTENT__

// =========================================================
// MODULE 1: NAVIGATION
// =========================================================
function initNavigation() {
  const btns = document.querySelectorAll('.nav-btn');
  const tabs = document.querySelectorAll('.tab-content');

  function switchTab(tabId) {
    btns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    tabs.forEach(t => t.classList.toggle('active', t.id === 'sec-' + tabId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Lazy-init blueprint when tab opened
    if (tabId === 'planos') renderFloor(currentFloor);
  }

  btns.forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
  window.appNavTo = (id) => switchTab(id);
}

// =========================================================
// MODULE 2: HEADER KPI UPDATER
// =========================================================
function updateHeaderKPIs() {
  const cfg = DB.get('config', { capitalGoal: 700000, monthlyGoal: 50000, initialCapital: 0 });
  const savings = DB.get('savings', []);
  const totalSaved = cfg.initialCapital + savings.reduce((s, e) => s + e.amount, 0);
  const remaining = Math.max(0, cfg.capitalGoal - totalSaved);
  const avg = savings.length > 0 ? savings.reduce((s,e)=>s+e.amount,0)/savings.length : cfg.monthlyGoal;
  const monthsLeft = avg > 0 ? Math.ceil(remaining / avg) : null;

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  set('hdr-capital', fmx(totalSaved));
  set('hdr-next-goal', fmx(cfg.capitalGoal));
  set('hdr-eta', monthsLeft !== null ? (monthsLeft <= 0 ? '¡Meta alcanzada!' : monthsLeft + ' meses') : '— meses');

  // Determine active phase label
  const phaseLabel = totalSaved >= cfg.capitalGoal ? 'Fase 1: Construcción' : 'Ahorro Pre-Obra';
  set('hdr-phase', phaseLabel);
}

// =========================================================
// MODULE 3: ROADMAP DASHBOARD
// =========================================================
function renderRoadmap() {
  const cfg = DB.get('config', { capitalGoal: 700000, monthlyGoal: 50000, initialCapital: 0 });
  const savings = DB.get('savings', []);
  const totalSaved = cfg.initialCapital + savings.reduce((s,e)=>s+e.amount,0);
  const avg = savings.length > 0 ? savings.reduce((s,e)=>s+e.amount,0)/savings.length : cfg.monthlyGoal;
  const remaining = Math.max(0, cfg.capitalGoal - totalSaved);
  const monthsLeft = avg > 0 ? Math.ceil(remaining / avg) : null;
  const pct = Math.min(100, Math.round((totalSaved / cfg.capitalGoal)*100));

  // Hero card
  const heroEl     = document.getElementById('hero-card');
  const heroEmoji  = document.getElementById('hero-emoji');
  const heroLabel  = document.getElementById('hero-stage-label');
  const heroHead   = document.getElementById('hero-headline');
  const heroSub    = document.getElementById('hero-sub');
  const heroPct    = document.getElementById('hero-pct-label');
  const heroBar    = document.getElementById('hero-progress-bar');
  const heroGoal   = document.getElementById('hero-goal-label');
  const heroSaved  = document.getElementById('hero-saved-amount');
  const heroRem    = document.getElementById('hero-remaining-amount');

  if (heroEl) {
    const reached = totalSaved >= cfg.capitalGoal;
    if (heroEmoji) heroEmoji.textContent = reached ? '🎉' : pct >= 50 ? '🔥' : pct >= 25 ? '📈' : '🌱';
    if (heroLabel) heroLabel.textContent = reached ? 'META FINANCIERA ALCANZADA' : 'ETAPA ACTIVA';
    if (heroHead) heroHead.textContent = reached ? '¡Capital Reunido! Listo para Arrancar Fase 1' : 'Reuniendo el Capital para Iniciar la Obra';
    if (heroSub)  heroSub.textContent  = reached
      ? 'Ya cuentas con el anticipo necesario. El siguiente paso es contratar al constructor y arrancar la Fase 1.'
      : monthsLeft ? 'A tu ritmo actual de ahorro, alcanzarás la meta en aprox. ' + monthsLeft + ' meses. ¡Cada peso cuenta!'
      : 'Registra tu ahorro mensual en el módulo Capital & Ahorro para ver tu proyección.';
    if (heroPct)  heroPct.textContent  = pct + '%';
    if (heroBar)  heroBar.style.width  = pct + '%';
    if (heroGoal) heroGoal.textContent = fmx(cfg.capitalGoal);
    if (heroSaved)heroSaved.textContent= fmx(totalSaved) + ' ahorrado';
    if (heroRem)  heroRem.textContent  = remaining > 0 ? 'Faltan ' + fmx(remaining) : '¡Meta superada! ✅';
  }

  // Phase cards
  const container = document.getElementById('phases-roadmap');
  if (!container) return;

  const f0reached = totalSaved >= cfg.capitalGoal;
  container.innerHTML = PHASES.map((ph, idx) => {
    let status = 'locked';
    if (idx === 0) status = f0reached ? 'done' : 'active';
    if (idx === 1 && f0reached) status = 'active';
    const hitos = DB.get('hitos_f' + ph.num, {});
    const total = ph.hitos.length;
    const done  = ph.hitos.filter(h => hitos[h.id]).length;
    const progPct = total > 0 ? Math.round((done/total)*100) : 0;
    const fillColor = ph.color;

    const statusLabel = status === 'active' ? 'EN CURSO' : status === 'done' ? '✅ LISTO' : '🔒 BLOQUEADO';
    return `
      <div class="phase-card ${status}-phase">
        <div class="phase-status-badge ${status}">${statusLabel}</div>
        <div class="phase-card-icon">${ph.icon}</div>
        <div class="phase-card-num">${ph.label}</div>
        <div class="phase-card-title">${ph.title}</div>
        <div class="phase-card-budget">${fmx(ph.budget, true)}</div>
        <div class="phase-card-desc">${ph.desc}</div>
        <div class="phase-progress-mini">
          <div class="phase-progress-mini-fill" style="width:${progPct}%; background:${fillColor}"></div>
        </div>
        <div style="font-size:0.68rem; color:var(--text-dim); margin-top:0.3rem;">${done}/${total} hitos • ${ph.months}</div>
      </div>
    `;
  }).join('');
}

// =========================================================
// MODULE 4: CAPITAL & SAVINGS
// =========================================================
function initCapitalModule() {
  // Load config
  const cfg = DB.get('config', { capitalGoal:700000, monthlyGoal:50000, initialCapital:0, startDate: thisMonth() });
  const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
  setVal('cfg-capital-goal', cfg.capitalGoal);
  setVal('cfg-monthly-goal', cfg.monthlyGoal);
  setVal('cfg-initial-capital', cfg.initialCapital);
  setVal('cfg-start-date', cfg.startDate || thisMonth());
  const monthEl = document.getElementById('sav-month');
  if (monthEl) monthEl.value = thisMonth();

  document.getElementById('btn-save-config')?.addEventListener('click', () => {
    const cfg2 = {
      capitalGoal:    +document.getElementById('cfg-capital-goal').value    || 700000,
      monthlyGoal:    +document.getElementById('cfg-monthly-goal').value    || 50000,
      initialCapital: +document.getElementById('cfg-initial-capital').value || 0,
      startDate:       document.getElementById('cfg-start-date').value      || thisMonth(),
    };
    DB.set('config', cfg2);
    renderCapital();
    renderRoadmap();
    updateHeaderKPIs();
    showToast('✅ Configuración guardada');
  });

  document.getElementById('btn-add-saving')?.addEventListener('click', () => {
    const month  = document.getElementById('sav-month').value;
    const amount = +document.getElementById('sav-amount').value;
    const note   = document.getElementById('sav-note').value.trim();
    if (!month || !amount || amount <= 0) { showToast('⚠️ Ingresa mes y monto', 'warning'); return; }
    const savings = DB.get('savings', []);
    savings.push({ id: Date.now(), month, amount, note, date: today() });
    savings.sort((a,b) => a.month.localeCompare(b.month));
    DB.set('savings', savings);
    document.getElementById('sav-amount').value = '';
    document.getElementById('sav-note').value = '';
    renderCapital();
    renderRoadmap();
    updateHeaderKPIs();

    // Check milestone
    const cfg3 = DB.get('config', { capitalGoal:700000 });
    const total = cfg3.initialCapital + savings.reduce((s,e)=>s+e.amount,0);
    if (total >= cfg3.capitalGoal) {
      showCelebration('🎉', '¡META ALCANZADA!', 'Has reunido el capital necesario para arrancar la Fase 1. ¡Es hora de llamar al constructor!');
    } else {
      showToast('✅ Ahorro registrado');
    }
  });

  document.getElementById('btn-clear-savings')?.addEventListener('click', () => {
    if (confirm('¿Eliminar todos los registros de ahorro?')) {
      DB.set('savings', []);
      renderCapital();
      renderRoadmap();
      updateHeaderKPIs();
    }
  });

  renderCapital();
}

function renderCapital() {
  const cfg     = DB.get('config', { capitalGoal:700000, monthlyGoal:50000, initialCapital:0 });
  const savings = DB.get('savings', []);
  const goal    = cfg.capitalGoal;
  const initCap = cfg.initialCapital;
  const total   = initCap + savings.reduce((s,e)=>s+e.amount,0);
  const pct     = Math.min(100, (total/goal)*100);
  const remaining = Math.max(0, goal - total);
  const avg     = savings.length > 0 ? savings.reduce((s,e)=>s+e.amount,0)/savings.length : cfg.monthlyGoal;
  const monthsLeft = avg > 0 ? Math.ceil(remaining/avg) : null;

  // ETA date
  let etaDate = '—';
  if (monthsLeft !== null && monthsLeft > 0) {
    const d = new Date();
    d.setMonth(d.getMonth() + monthsLeft);
    etaDate = d.toLocaleDateString('es-MX', { month:'long', year:'numeric' });
  } else if (total >= goal) {
    etaDate = '¡Meta alcanzada!';
  }

  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  const setW = (id, w) => { const el = document.getElementById(id); if (el) el.style.width = w; };

  set('thermo-pct', Math.round(pct) + '%');
  setW('thermo-fill', Math.max(pct, 1) + '%');
  set('thermo-saved', fmx(total) + ' MXN acumulado');
  set('thermo-goal-amount', 'Meta: ' + fmx(goal) + ' MXN');

  set('stat-months-elapsed', savings.length);
  set('stat-months-left', monthsLeft !== null ? (monthsLeft <= 0 ? '¡Listo!' : monthsLeft) : '—');
  set('stat-avg-monthly', avg > 0 ? fmx(avg, true) : '—');
  set('stat-eta-date', etaDate);

  // Milestone chips
  const milestones = [
    { pct: 25, label: '25% · ' + fmx(goal*0.25, true) },
    { pct: 50, label: '50% · ' + fmx(goal*0.50, true) },
    { pct: 75, label: '75% · ' + fmx(goal*0.75, true) },
    { pct:100, label: '100% · ' + fmx(goal, true) },
  ];
  const msRow = document.getElementById('savings-milestones-row');
  if (msRow) {
    msRow.innerHTML = milestones.map(m => {
      const reached = (total/goal*100) >= m.pct;
      return `<span class="savings-milestone-chip ${reached?'reached':'pending'}">${reached?'✅':'🔒'} ${m.label}</span>`;
    }).join('');
  }

  // Projection bars (12 months)
  const projEl = document.getElementById('projection-bars');
  if (projEl) {
    const months = [];
    let running = total;
    const now = new Date();

    // Past months from savings log
    savings.forEach(s => {
      months.push({ label: s.month, amount: s.amount, type: 'past', balance: 0 });
    });

    // Future projection (12 months)
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const label = d.toLocaleDateString('es-MX', { month:'short', year:'2-digit' });
      running += cfg.monthlyGoal;
      const isGoal = running >= goal && months.every(m => m.type !== 'goal');
      months.push({ label, amount: cfg.monthlyGoal, type: isGoal ? 'goal' : 'future', balance: running });
    }

    // Compute balances for past months
    let bal = initCap;
    months.forEach(m => { if (m.type === 'past') { bal += m.amount; m.balance = bal; } });

    const maxBal = Math.max(...months.map(m=>m.balance||0), goal);
    projEl.innerHTML = months.slice(-15).map(m => {
      const h = Math.max(4, Math.round((m.balance/maxBal)*100));
      return `<div class="proj-bar-wrap">
        <div class="proj-bar ${m.type}" style="height:${h}px" title="${fmx(m.balance)}"></div>
        <div class="proj-label">${m.label}</div>
      </div>`;
    }).join('');

    // Badge
    const pbadge = document.getElementById('projection-badge');
    if (pbadge) {
      const goalMonth = months.find(m=>m.type==='goal');
      pbadge.textContent = goalMonth ? 'Meta aprox: ' + goalMonth.label : (total>=goal ? '¡Meta alcanzada!' : 'Ahorrando ' + fmx(cfg.monthlyGoal,true) + '/mes');
    }
  }

  // Table
  const tbody = document.getElementById('savings-table-body');
  if (tbody) {
    if (!savings.length) {
      tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Sin registros. ¡Agrega tu primer ahorro!</td></tr>';
      return;
    }
    let running2 = initCap;
    tbody.innerHTML = [...savings].reverse().map(s => {
      running2 += s.amount;
      const pct2 = Math.min(100, Math.round((running2/goal)*100));
      return `<tr>
        <td><strong>${s.month}</strong></td>
        <td class="text-success">${fmx(s.amount)}</td>
        <td>${fmx(running2)}</td>
        <td><span class="badge ${pct2>=100?'badge-success':pct2>=50?'badge-warning':'badge-secondary'}">${pct2}%</span></td>
        <td style="color:var(--text-muted)">${s.note || '—'}</td>
        <td><button onclick="deleteSaving(${s.id})" style="background:none;border:none;cursor:pointer;font-size:0.9rem" title="Eliminar">🗑️</button></td>
      </tr>`;
    }).join('');
  }
}

window.deleteSaving = function(id) {
  if (!confirm('¿Eliminar este registro?')) return;
  const savings = DB.get('savings', []).filter(s => s.id !== id);
  DB.set('savings', savings);
  renderCapital();
  renderRoadmap();
  updateHeaderKPIs();
};

// =========================================================
// MODULE 5: HITOS CONSTRUCTIVOS
// =========================================================
let currentHitosPhase = 0;

function initHitos() {
  document.querySelectorAll('.phase-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.phase-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentHitosPhase = +btn.dataset.hphase;
      renderHitos();
    });
  });
  renderHitos();
}

function renderHitos() {
  const phase = PHASES[currentHitosPhase];
  const saved = DB.get('hitos_f' + currentHitosPhase, {});
  const total = phase.hitos.length;
  const done  = phase.hitos.filter(h => saved[h.id]).length;
  const pct   = total > 0 ? Math.round((done/total)*100) : 0;

  // Summary
  const summaryEl = document.getElementById('hitos-phase-summary');
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div style="flex:1">
        <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:0.3rem">${phase.icon} ${phase.label} — ${phase.months}</div>
        <div style="font-size:1.1rem;font-weight:800">${phase.title}</div>
        <div style="font-size:0.83rem;color:var(--text-muted);margin-top:0.25rem">${phase.desc}</div>
      </div>
      <div style="text-align:center;min-width:100px">
        <div style="font-size:2rem;font-weight:900;color:${phase.color}">${pct}%</div>
        <div style="font-size:0.72rem;color:var(--text-muted)">${done}/${total} completados</div>
        <div class="phase-progress-mini" style="margin-top:0.5rem">
          <div class="phase-progress-mini-fill" style="width:${pct}%;background:${phase.color}"></div>
        </div>
      </div>
    `;
  }

  // List
  const listEl = document.getElementById('hitos-list');
  if (!listEl) return;

  listEl.innerHTML = phase.hitos.map((h, idx) => {
    const isDone = !!saved[h.id];
    const tags   = (h.tags || []).map(t => `<span class="hito-chip">${t}</span>`).join('');
    return `
      <div class="hito-card ${isDone?'completed':''}" id="hcard-${h.id}">
        <div class="hito-header">
          <input type="checkbox" class="hito-checkbox" id="hchk-${h.id}" ${isDone?'checked':''} onchange="toggleHito(${currentHitosPhase},'${h.id}',this.checked)">
          <div style="flex:1">
            <label for="hchk-${h.id}" class="hito-title" style="cursor:pointer">${idx+1}. ${h.title}</label>
            <div class="hito-meta">${tags}</div>
          </div>
          <button onclick="toggleHitoExpand('${h.id}')" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:0.75rem;padding:0.25rem 0.5rem">▼ Ver</button>
        </div>
        <div class="hito-details" id="hdetail-${h.id}">
          <div class="hito-detail-section">
            <div class="hito-detail-label">✅ Criterio de Aceptación / Verificación</div>
            <div class="hito-detail-text">${h.acceptance}</div>
          </div>
          <div class="hito-detail-section" style="border-left-color:var(--color-warning)">
            <div class="hito-detail-label" style="color:var(--color-warning)">📦 Material / Recurso Requerido</div>
            <div class="hito-detail-text">${h.material}</div>
          </div>
          <div class="hito-detail-section" style="border-left-color:var(--color-danger)">
            <div class="hito-detail-label" style="color:var(--color-danger)">⚠️ Riesgo si No Se Verifica</div>
            <div class="hito-detail-text">${h.risk}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.toggleHito = function(phaseNum, hitoId, checked) {
  const saved = DB.get('hitos_f' + phaseNum, {});
  saved[hitoId] = checked;
  DB.set('hitos_f' + phaseNum, saved);
  const card = document.getElementById('hcard-' + hitoId);
  if (card) card.classList.toggle('completed', checked);
  renderHitos();
  renderRoadmap();
};

window.toggleHitoExpand = function(hitoId) {
  const card   = document.getElementById('hcard-' + hitoId);
  const detail = document.getElementById('hdetail-' + hitoId);
  if (card && detail) { card.classList.toggle('expanded'); }
};

// =========================================================
// MODULE 6: GUIDE
// =========================================================
function initGuide() {
  const el = document.getElementById('guide-accordion');
  if (!el) return;
  el.innerHTML = GUIDE_DATA.map((gd, i) => `
    <div class="guide-section" id="gsec-${i}">
      <div class="guide-section-header" onclick="toggleGuide(${i})">
        <div class="guide-section-title"><span>${gd.icon}</span> ${gd.phase}</div>
        <span class="guide-chevron">▼</span>
      </div>
      <div class="guide-section-body">
        ${gd.sections.map(sec => `
          <div class="guide-item ${sec.type}" style="margin-bottom:0.75rem">
            <div class="guide-item-label">${sec.label}</div>
            <ul style="margin-left:1.25rem; margin-top:0.5rem">
              ${sec.items.map(item => `<li class="guide-item-text" style="margin-bottom:0.35rem">${item}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Open first by default
  document.getElementById('gsec-0')?.classList.add('open');
}

window.toggleGuide = function(idx) {
  const el = document.getElementById('gsec-' + idx);
  if (el) el.classList.toggle('open');
};

// =========================================================
// MODULE 7: PAYMENTS / ESTIMACIONES
// =========================================================
function initPayments() {
  const grossEl = document.getElementById('est-gross');
  if (grossEl) {
    grossEl.addEventListener('input', () => {
      const gross   = +grossEl.value || 0;
      const advance = gross * 0.30;
      const ret     = gross * 0.05;
      const net     = gross - advance - ret;
      const setV = (id, v) => { const el = document.getElementById(id); if (el) el.value = Math.round(v); };
      setV('est-advance-deduct', advance);
      setV('est-retention', ret);
      setV('est-net', net);
    });
  }

  const dateEl = document.getElementById('est-date');
  if (dateEl) dateEl.value = today();

  document.getElementById('btn-save-est')?.addEventListener('click', () => {
    const date    = document.getElementById('est-date').value;
    const phase   = document.getElementById('est-phase').value;
    const concept = document.getElementById('est-concept').value.trim();
    const gross   = +document.getElementById('est-gross').value || 0;
    const status  = document.getElementById('est-status').value;

    if (!date || !concept || !gross) { showToast('⚠️ Completa los campos requeridos', 'warning'); return; }

    const ests  = DB.get('estimaciones', []);
    const folio = 'EST-' + String(ests.length + 1).padStart(3, '0');
    ests.push({ id: Date.now(), folio, date, phase, concept, gross, advance: gross*0.3, retention: gross*0.05, net: gross*0.65, status });
    DB.set('estimaciones', ests);

    // Reset
    ['est-gross','est-advance-deduct','est-retention','est-net'].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = '';
    });
    document.getElementById('est-concept').value = '';
    renderPayments();
    showToast('✅ Estimación registrada');
  });

  renderPayments();
}

function renderPayments() {
  const ests = DB.get('estimaciones', []);
  const totals = ests.reduce((acc, e) => {
    acc.gross     += e.gross || 0;
    acc.advance   += e.advance || 0;
    acc.retention += e.retention || 0;
    acc.net       += e.net || 0;
    return acc;
  }, { gross:0, advance:0, retention:0, net:0 });

  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = fmx(v); };
  set('fsum-gross',     totals.gross);
  set('fsum-advance',   totals.advance);
  set('fsum-retention', totals.retention);
  set('fsum-net',       totals.net);

  const tbody = document.getElementById('est-table-body');
  if (!tbody) return;

  if (!ests.length) {
    tbody.innerHTML = '<tr><td colspan="10" class="empty-state">Sin estimaciones registradas</td></tr>';
    return;
  }

  tbody.innerHTML = [...ests].reverse().map(e => {
    const statusClass = e.status === 'pagado' ? 'pagado' : e.status === 'revision' ? 'revision' : 'pendiente';
    return `<tr>
      <td><strong>${e.folio}</strong></td>
      <td>${e.date}</td>
      <td><span class="badge badge-secondary">${e.phase}</span></td>
      <td>${e.concept}</td>
      <td>${fmx(e.gross)}</td>
      <td>${fmx(e.advance)}</td>
      <td class="text-danger">${fmx(e.retention)}</td>
      <td class="text-success">${fmx(e.net)}</td>
      <td><span class="status-chip ${statusClass}">${e.status}</span></td>
      <td><button onclick="deleteEst(${e.id})" style="background:none;border:none;cursor:pointer" title="Eliminar">🗑️</button></td>
    </tr>`;
  }).join('');
}

window.deleteEst = function(id) {
  if (!confirm('¿Eliminar esta estimación?')) return;
  DB.set('estimaciones', DB.get('estimaciones', []).filter(e => e.id !== id));
  renderPayments();
};

// =========================================================
// MODULE 8: BLUEPRINT VIEWER
// =========================================================
function renderFloor(floorKey) {
  const display = document.getElementById('blueprint-display');
  const terrainWrapper = document.getElementById('terrain-svg-wrapper');
  if (!display) return;

  currentFloor = floorKey;
  if (floorKey === 'pb')  display.innerHTML = getGroundFloorSVG();
  else if (floorKey === 'pa')  display.innerHTML = getUpperFloorSVG();
  else if (floorKey === 'ext') display.innerHTML = getExteriorRoofSVG();

  if (terrainWrapper && !terrainWrapper.hasChildNodes()) {
    terrainWrapper.innerHTML = `<svg viewBox="0 0 760 520" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
      <polygon points="80,60 710,60 660,469 80,462" fill="rgba(56,189,248,0.06)" stroke="#38bdf8" stroke-width="2"/>
      <text x="395" y="45" font-size="10" font-weight="900" fill="#fbbf24" text-anchor="middle">L1-2 (SUR): 15.74 m</text>
      <line x1="80" y1="60" x2="710" y2="60" stroke="#f59e0b" stroke-width="2"/>
      <text x="710" y="270" font-size="9" font-weight="800" fill="#34d399" text-anchor="start" dx="6">L2-3 (ORIENTE): 10.30 m</text>
      <line x1="710" y1="60" x2="660" y2="469" stroke="#10b981" stroke-width="2"/>
      <text x="370" y="488" font-size="10" font-weight="900" fill="#38bdf8" text-anchor="middle">L3-4 (NORTE): 14.49 m</text>
      <line x1="660" y1="469" x2="80" y2="462" stroke="#38bdf8" stroke-width="2"/>
      <text x="55" y="260" font-size="9" font-weight="800" fill="#f472b6" text-anchor="end">L4-1 (PONIENTE): 10.04 m</text>
      <line x1="80" y1="462" x2="80" y2="60" stroke="#ec4899" stroke-width="2"/>
      <text x="393" y="268" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle">TERRENO: 153.19 m²</text>
      <text x="393" y="285" font-size="8" fill="#94a3b8" text-anchor="middle">Perímetro: 50.57 m • Servidumbre frontal: 1.50 m</text>
    </svg>`;
  }

  attachRoomInteractivity(floorKey);
}

function attachRoomInteractivity(floorKey) {
  const display = document.getElementById('blueprint-display');
  if (!display) return;
  const roomIds = new Set((blueprintData[floorKey] || []).map(r => r.id));
  display.querySelectorAll('g[id]').forEach(g => {
    if (roomIds.has(g.id)) {
      g.style.cursor = 'pointer';
      g.addEventListener('mouseenter', () => g.style.filter = 'brightness(0.85) drop-shadow(0 0 5px rgba(59,130,246,0.7))');
      g.addEventListener('mouseleave', () => g.style.filter = '');
      g.addEventListener('click', e => { e.stopPropagation(); showRoomDetails(floorKey, g.id); });
    }
  });
}

function showRoomDetails(floorKey, roomId) {
  const room = (blueprintData[floorKey] || []).find(r => r.id === roomId);
  if (!room) return;
  const nameEl  = document.getElementById('room-name');
  const badgeEl = document.getElementById('room-badge');
  const specsEl = document.getElementById('room-specs');
  if (nameEl)  nameEl.textContent  = room.name;
  if (badgeEl) badgeEl.textContent = floorKey==='pb'?'Planta Baja':floorKey==='pa'?'Planta Alta':'Roof Garden';
  if (specsEl) {
    const tags = (room.tags||[]).map(t=>`<span class="badge badge-primary" style="margin:2px">${t}</span>`).join('');
    const specs = room.specs ? Object.entries(room.specs).map(([k,v])=>`<div style="margin-top:6px;font-size:0.82rem"><strong style="color:var(--text-main)">${k}:</strong> <span style="color:var(--text-muted)">${v}</span></div>`).join('') : '';
    specsEl.innerHTML = tags + specs;
  }
}

function initBlueprint() {
  document.querySelectorAll('.level-selector .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.level-selector .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderFloor(btn.dataset.floor);
    });
  });
}

// =========================================================
// MODULE 9: DOCS VIEWER
// =========================================================
function initDocs() {
  const navList  = document.getElementById('docs-nav-list');
  const viewer   = document.getElementById('doc-viewer-content');
  const searchEl = document.getElementById('input-search-docs');
  if (!navList || !viewer) return;

  const items = navList.querySelectorAll('.docs-nav-item');

  function renderDoc(key) {
    viewer.innerHTML = (typeof docsContent !== 'undefined' && docsContent[key]) || '<p>Documento en preparación...</p>';
    viewer.scrollTop = 0;
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      renderDoc(item.dataset.doc);
    });
  });

  searchEl?.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    items.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });

  renderDoc('vision');
}

// =========================================================
// UTILITIES
// =========================================================
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `
    position:fixed; bottom:1.5rem; right:1.5rem; z-index:9999;
    background:${type==='warning'?'#92400e':'#065f46'};
    color:#fff; padding:0.65rem 1.25rem; border-radius:10px;
    font-size:0.85rem; font-weight:700;
    box-shadow:0 4px 20px rgba(0,0,0,0.4);
    animation: fadeIn 0.2s ease;
  `;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function showCelebration(emoji, title, msg) {
  const overlay = document.getElementById('celebration-overlay');
  if (!overlay) return;
  document.getElementById('celebration-emoji').textContent = emoji;
  document.getElementById('celebration-title').textContent = title;
  document.getElementById('celebration-msg').textContent   = msg;
  overlay.style.display = 'flex';
}

// =========================================================
// INIT
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  updateHeaderKPIs();
  renderRoadmap();
  initCapitalModule();
  initHitos();
  initGuide();
  initPayments();
  initBlueprint();
  initDocs();
});
