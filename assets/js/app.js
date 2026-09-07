// =========================================================
// CASA 235 – app_v2_template.js
// Sistema Integral de Ahorro, Inversión & Construcción Progresiva
// =========================================================

// --- STORAGE & HELPERS ---
const DB = {
  get: (k, def) => { try { return JSON.parse(localStorage.getItem('casa235_' + k)) ?? def; } catch { return def; } },
  set: (k, v)   => localStorage.setItem('casa235_' + k, JSON.stringify(v)),
};

function fmx(n, short=false) {
  if (n === undefined || n === null || isNaN(n)) return '$0';
  const val = Math.round(n);
  if (short) {
    if (Math.abs(val) >= 1000000) return '$' + (val / 1000000).toFixed(2) + 'M';
    if (Math.abs(val) >= 1000) return '$' + (val / 1000).toFixed(0) + 'k';
  }
  return '$' + val.toLocaleString('es-MX');
}

function today() { return new Date().toISOString().slice(0, 10); }

// =========================================================
// BLUEPRINT DATA (Planta Baja con Home Office)
// =========================================================
const blueprintData = {
  pb: [
    { 
      id: 'escalera-confinada-sin-invasion', 
      name: '💼 Despacho / Home Office Provisorio (5.62 m²)', 
      tags: ['2.10 × 2.65 m', 'Home Office', 'Losa Desmontable', 'Cero Invasión'], 
      specs: { 
        'Función Actual': 'Despacho privado de trabajo para 1 persona. Cabe escritorio en L, 2 pantallas, silla ergonómica y librero empotrado.', 
        'Estrategia Evolutiva': 'El techo en este cuadrante exacto se cuela con bovedilla de poliestireno desmontable. En el futuro, abrir el hueco toma 2 días en seco para instalar la escalera hacia Planta Alta sin demolición.',
        'Acústica y Ubicación': 'Ubicado en la transición de estancia a recámara, protegido del ruido de calle y con máxima privacidad.'
      } 
    },
    { 
      id: 'recamara-suite-pb', 
      name: '🛏️ Recámara Suite Principal PB', 
      tags: ['3.16 × 4.00 m', '12.6 m²', 'Cama King', 'Acceso a Jardín'], 
      specs: { 
        'Equipamiento': 'Cama King Size, cancel corredizo de 2.85 m con salida directa al jardín posterior, conexión privada a vestidor y baño en L.',
        'Ventilación': 'Cruzada Nor-Poniente, vista libre al jardín privado sin servidumbres invasivas.'
      } 
    },
    { 
      id: 'bano-completo-en-l-y-vestidor', 
      name: '🚿 Baño Suite en "L" + Vestidor Privado', 
      tags: ['5.72 m²', 'Regadera Spa 1.20×0.90m', 'Privado'], 
      specs: { 
        'Distribución': 'Regadera amplia con nicho jabonero, WC ecológico, Vanity suspendido y Vestidor independiente.',
        'Exclusividad': 'Uso 100% privado para ti. Las visitas no tienen acceso a este baño.'
      } 
    },
    { 
      id: 'medio-bano-visitas', 
      name: '🚽 Medio Baño de Visitas PB', 
      tags: ['1.60 m²', 'Vanity flotante', 'Ventilación'], 
      specs: { 
        'Ubicación': 'Junto al área social y acceso principal. Tus visitas no invaden tu recámara ni ven tus artículos personales.'
      } 
    },
    { 
      id: 'gran-area-social-integrada', 
      name: '🍳 Gran Área Social (Sala + Comedor + Cocina con Isla)', 
      tags: ['22.2 m²', 'Altura 3.15 m', 'Isla con barra', 'Open Concept'], 
      specs: { 
        'Diseño': 'Concepto abierto sin columnas intermedias, cocina con isla desayunadora y cubierta de cuarzo/granito, sala amplia con vista al frente.'
      } 
    },
    { 
      id: 'cuarto-maquinas-y-lavanderia', 
      name: '🧺 Lavandería & Cuarto de Máquinas', 
      tags: ['6.00 m²', 'Centro de lavado', 'Rack de Redes', 'Boiler'], 
      specs: { 
        'Equipamiento': 'Instalación para lavadora/secadora, calentador de paso, presurizador y espacio para Rack de internet y domótica.'
      } 
    },
    { 
      id: 'area-estacionamiento-marcada', 
      name: '🚗 Cochera Techada (2 Autos)', 
      tags: ['30.28 m²', 'SUV + Sedán', 'Frente 10.04 m'], 
      specs: { 
        'Capacidad': '2 cajones independientes sobre servidumbre frontal con preparación para cargador de auto eléctrico (240V).'
      } 
    },
    { 
      id: 'jardin-posterior-7x3', 
      name: '🌿 Jardín Posterior Privado', 
      tags: ['21.0 m²', 'Cancel 2.85 m', 'Asador', 'Privacidad'], 
      specs: { 
        'Amenidad': 'Jardín con pasto natural, preparación para asador exterior y cancel corredizo de piso a techo que integra el jardín a tu recámara.'
      } 
    }
  ],
  pa: [
    { id: 'habitacion-principal-pa', name: 'Habitación Principal Master PA (Futura)', tags: ['11.38 m²', 'Balcón Frontal'], specs: { 'Nota': 'Módulo de expansión futura para cuando requieras más espacio.' } }
  ],
  ext: [
    { id: 'zona-roof-garden-frontal', name: 'Roof Garden Frontal (Futuro)', tags: ['40.5 m²', 'Deck Social'], specs: { 'Nota': 'Módulo de amenidad futura en 3er nivel.' } }
  ]
};

let currentFloor = 'pb';

// =========================================================
// SVG FLOOR PLAN INJECTIONS (Generated)
// =========================================================
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

// =========================================================
// DOCS CONTENT INJECTION (Generated)
// =========================================================
var docsContent = {"vision": "<h2>Visión Estratégica y Cronograma a 3 Años</h2>\n<p><strong>Proyecto:</strong> Residencia Inteligente</p>\n<p><strong>Horizonte Temporal:</strong> 3 Años (Fase de Ahorro, Liquidación de Terreno y Preparación Técnica)</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Los 3 Pilares del Plan a 3 Años</h3>\n<pre><code class=\"language-mermaid\">\ntimeline\n    title Cronograma de 3 Años hacia la Construcción\n    section Año 1 : Liquidación Terreno : Definición Arquitectónica : Ahorro Base\n    section Año 2 : Finalización Terreno : Planos Ejecutivos Eléctricos/Red : Pruebas Home Assistant\n    section Año 3 : Trámite Crédito Construcción : Licitación Obra : Inicio Obra Negra\n</code></pre>\n<ol>\n<li><strong>Pilar Financiero:</strong></li>\n<li>Amortización y liquidación total del crédito del terreno.</li>\n<li>Acumulación del fondo inicial para enganche/gastos notariales del crédito de construcción.</li>\n<li>Fondo reservado de infraestructura domótica en obra ($800 – $1,200 USD para cableado y tuberías).</li>\n<li><strong>Pilar Arquitectónico & Técnico:</strong></li>\n<li>Diseño de planos arquitectónicos con cuartos técnicos y canalizaciones integradas desde el día 1.</li>\n<li>Sin improvisaciones ni sobrecostos por demolición o ranurados tardíos.</li>\n<li><strong>Pilar de Aprendizaje & Experimentación:</strong></li>\n<li>Durante estos 3 años puedes experimentar con un Mini-PC y Home Assistant en tu vivienda actual para familiarizarte con automatizaciones antes de construir.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Metas por Año</h3>\n<h4>Año 1: Enfoque Financiero & Concepto de Espacios</h4>\n<ul>\n<li>[ ] Mantener pagos puntuales del crédito del terreno (adelanto de capital si es posible).</li>\n<li>[ ] Crear una carpeta de inspiración arquitectónica y lista de deseos para la casa (ambientes, recámaras, terraza).</li>\n<li>[ ] Definir requerimientos básicos de iluminación por estancia (luz cálida, circuitos independientes).</li>\n</ul>\n<h4>Año 2: Anteproyecto Arquitectónico & Pruebas Locales</h4>\n<ul>\n<li>[ ] Contactar o seleccionar al arquitecto para iniciar anteproyecto y distribución de plantas.</li>\n<li>[ ] Diseñar la ubicación del <strong>Rack Central (MDF)</strong> en los planos de planta baja.</li>\n<li>[ ] Integrar en planos la simbología de puntos Cat6 en techos (Access Points), cámaras perimetrales y timbre.</li>\n<li>[ ] <em>(Opcional)</em> Instalar Home Assistant en un Mini-PC para probar bombillas, sensores o enchufes en tu casa actual.</li>\n</ul>\n<h4>Año 3: Trámite de Crédito, Contratación y Arranque de Obra</h4>\n<ul>\n<li>[ ] <strong>Mes 1–3:</strong> Liquidación final del crédito del terreno y trámite de liberación de gravamen / escrituración.</li>\n<li>[ ] <strong>Mes 4–6:</strong> Solicitud y aprobación del crédito de construcción (banco / entidad financiera).</li>\n<li>[ ] <strong>Mes 7–8:</strong> Entrega del Dossier Técnico al constructor y electricista.</li>\n<li>[ ] <strong>Mes 9–12:</strong> Arranque de obra negra: Colocación de tuberías conduit de $3/4\"$, $1\"$ y $2\"$, cajas de $50\\text{ mm}$ y cableado Cat6 100% Cobre.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Matriz de Ahorro y Presupuesto</h3>\n<div class=\"table-responsive\"><table class=\"data-table\">\n<thead><tr><th>Concepto</th><th>Monto Estimado</th><th>Plazo Sugerido</th></tr></thead><tbody>\n<tr><td><strong>Materiales de Canalización y Cable Cat6 (Obra Negra)</strong></td><td>$700 – $900 USD (~$14,000 – $18,000 MXN)</td><td>Mes de inicio de obra (Año 3)</td></tr>\n<tr><td><strong>Equipamiento de Red Base (Rack, Switch PoE, APs, Mini-PC)</strong></td><td>$1,000 – $1,200 USD (~$20,000 – $24,000 MXN)</td><td>Fin de obra gris / inicios de acabados</td></tr>\n<tr><td><strong>Seguridad, Micromódulos y Sensores</strong></td><td>$1,000 – $1,800 USD (~$20,000 – $36,000 MXN)</td><td>Al habitar la casa (modular)</td></tr>\n<tr><td><strong>Audio Multi-Room y Confort Térmico</strong></td><td>$800 – $1,500 USD (~$16,000 – $30,000 MXN)</td><td>Etapa posterior según presupuesto</td></tr>\n</tbody></table></div>", "dossier": "<h2>Dossier Técnico de Obra para Arquitecto y Electricista</h2>\n<p><strong>Proyecto:</strong> Residencia 2 Plantas con Jardín</p>\n<p><strong>Normas de Instalación:</strong> Infraestructura Eléctrica y Red Estructurada</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Reglas Innegociables en Obra</h3>\n<pre><code class=\"language-\">\n┌────────────────────────────────────────────────────────────────────────┐\n│  REGLAS CRÍTICAS PARA PLANOS E INSTALACIONES:                          │\n│                                                                        │\n│  1. HILO NEUTRO en el 100% de las cajas de apagadores (chalupas).     │\n│  2. CHALUPAS PROFUNDAS (Mínimo 50mm de fondo en todos los apagadores). │\n│  3. RACK CENTRAL (MDF): Todas las tuberías de red convergen a él.      │\n│  4. SEPARACIÓN: Mínimo 20cm entre tubería eléctrica y tubería Cat6.    │\n│  5. CABLE CAT6 100% COBRE: Prohibido usar cable CCA (aluminio-cobre).  │\n└────────────────────────────────────────────────────────────────────────┘\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Ubicación y Especificaciones del Rack Central (MDF)</h3>\n<ul>\n<li><strong>Espacio:</strong> Gabinete de 9U a 12U empotrado o fijado a muro en zona ventilada de Planta Baja (clóset de blancos, cuarto de servicio o bajo escalera cerrada).</li>\n<li><strong>Alimentación:</strong> 1 circuito eléctrico dedicado exclusivo (Pastilla de 20A) con 2 contactos dobles y cable de tierra física.</li>\n<li><strong>Tuberías de llegada:</strong></li>\n<li>2 tubos de $3/4\"$ hacia techos de Planta Baja y Planta Alta (Access Points).</li>\n<li>4 tubos de $3/4\"$ hacia las 4 esquinas exteriores (Cámaras PoE).</li>\n<li>1 tubo de $3/4\"$ hacia la entrada principal (Timbre con Video PoE).</li>\n<li>2 tubos de $3/4\"$ hacia zonas de audio en techo (Sala, Cocina, Terraza).</li>\n<li>1 tubo de $3/4\"$ hacia cisterna (Sensor de nivel).</li>\n<li>1 tubo de $1\"$ de reserva hacia cuadro general eléctrico.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Guía de Tuberías y Alturas de Colocación</h3>\n<div class=\"table-responsive\"><table class=\"data-table\">\n<thead><tr><th>Elemento</th><th>Altura Recomendada</th><th>Tipo de Tubería</th><th>Cable Requerido</th></tr></thead><tbody>\n<tr><td><strong>Apagadores de Pared</strong></td><td>1.10 m – 1.20 m sobre NPT</td><td>Poliducto / Conduit $3/4\"$</td><td>Fase + Neutro + Retornos + Tierra</td></tr>\n<tr><td><strong>Access Points Wi-Fi</strong></td><td>Centro de techo de cada planta</td><td>Tubo $3/4\"$ hacia el Rack</td><td>1 cable Cat6 UTP por piso</td></tr>\n<tr><td><strong>Cámaras Exteriores PoE</strong></td><td>2.80 m – 3.50 m en esquinas</td><td>Tubo $3/4\"$ hacia el Rack</td><td>1 cable Cat6 exterior con filtro UV</td></tr>\n<tr><td><strong>Timbre con Video PoE</strong></td><td>1.45 m junto a chapa principal</td><td>Tubo $3/4\"$ hacia el Rack</td><td>1 cable Cat6 + par 18 AWG para chapa</td></tr>\n<tr><td><strong>Pasacables para TV</strong></td><td>1.30 m (tras TV) a 0.45 m (mueble)</td><td><strong>Tubo de 2 Pulgadas</strong></td><td>Pasacables HDMI + 2 cables Cat6</td></tr>\n<tr><td><strong>Bocinas de Techo</strong></td><td>Distribuidas en cielo raso</td><td>Tubo $3/4\"$ hacia el Rack</td><td>Cable libre de oxígeno 14/2</td></tr>\n<tr><td><strong>Persianas Motorizadas</strong></td><td>Esquina superior de dintel</td><td>Tubo $1/2\"$ a caja cercana</td><td>110V (Fase + Neutro + Tierra)</td></tr>\n<tr><td><strong>Cargador Auto Eléctrico</strong></td><td>1.20 m en muro de cochera</td><td><strong>Tubo conduit pesado 1\"</strong></td><td>3 cables Calibre 6 AWG (240V / 40A)</td></tr>\n<tr><td><strong>Acometida Paneles Solares</strong></td><td>Azotea a Cuadro General</td><td><strong>Tubo conduit pesado 1\"</strong></td><td>Guía plástica lista para cableado DC</td></tr>\n</tbody></table></div>", "network": "<h2>Arquitectura de Red y Rack Central (MDF)</h2>\n<p><strong>Proyecto:</strong> Residencia Inteligente</p>\n<p><strong>Enfoque:</strong> Red Estructurada Cat6, Alimentación PoE+ y Aislamiento de Red (VLANs)</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Diagrama de Conexiones del Rack</h3>\n<pre><code class=\"language-mermaid\">\ngraph TD\n    ISP[Acometida Fibra Óptica / Internet] --&gt; ONT[Módem ISP Modo Puente]\n    ONT --&gt; RTR[Router / Gateway Gigabit]\n    \n    RTR --&gt; SW[Switch 16/24 Puertos PoE+ Gigabit]\n    \n    SW --&gt;|PoE| AP1[AP Wi-Fi 6 Techo Planta Baja]\n    SW --&gt;|PoE| AP2[AP Wi-Fi 6 Techo Planta Alta]\n    SW --&gt;|PoE| CAM1[Cámara Frontal 4K]\n    SW --&gt;|PoE| CAM2[Cámara Patio/Jardín 4K]\n    SW --&gt;|PoE| CAM3[Cámara Lateral 4K]\n    SW --&gt;|PoE| CAM4[Cámara Cochera 4K]\n    SW --&gt;|PoE| DOOR[Timbre con Video PoE]\n    \n    SW --&gt; HA[Mini PC Intel N100: Home Assistant]\n    SW --&gt; NVR[NVR / Almacenamiento 24/7]\n    SW --&gt; TV1[Smart TV Sala Cat6]\n    SW --&gt; TV2[Smart TV Recámara Ppal Cat6]\n    \n    HA -.-&gt;|USB Dongle| ZIG[Coordinador Zigbee 3.0 & Matter/Thread]\n    \n    UPS[No-Break / UPS 1500VA] --- RTR\n    UPS --- SW\n    UPS --- HA\n    UPS --- NVR\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Segmentación de Red Recomendada (VLANs)</h3>\n<p>Para máxima seguridad y evitar que un foco o dispositivo hackeado acceda a tus computadoras o cuentas bancarias, la red se divide en 3 redes virtuales:</p>\n<ol>\n<li><strong>VLAN 10 - Principal (Trusted):</strong> Computadoras de trabajo, teléfonos personales, tablets y el servidor Home Assistant.</li>\n<li><strong>VLAN 20 - IoT (Dispositivos Domóticos):</strong> Apagadores Wi-Fi, persianas, electrodomésticos, Mini-splits e inversores solares (sin acceso a la red principal, solo a Home Assistant).</li>\n<li><strong>VLAN 30 - Seguridad (Cámaras y NVR):</strong> Cámaras PoE y timbre (bloqueadas para que no transmitan video a servidores chinos/externos sin autorización).</li>\n<li><strong>VLAN 40 - Invitados (Guests):</strong> Red Wi-Fi aislada para visitas.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Lista de Equipos Recomendados para el Rack</h3>\n<ul>\n<li><strong>Gabinete:</strong> Rack de pared de 9U a 12U con puerta de cristal templado y cerradura (ej. Tripp Lite / NavePoint).</li>\n<li><strong>Switch PoE:</strong> Switch Gigabit gestionable con 16 a 24 puertos (al menos 8 con PoE+) como <strong>TP-Link Omada SG2218P</strong> o <strong>Ubiquiti UniFi USW-Lite-16-PoE</strong>.</li>\n<li><strong>Puntos de Acceso:</strong> 2x <strong>UniFi U6+ / U7 Pro</strong> o <strong>TP-Link EAP610</strong> (montaje estético en cielo raso, similar a un detector de humo).</li>\n<li><strong>Servidor Local:</strong> Mini PC con procesador Intel N100, 16 GB de RAM DDR5 y 512 GB SSD NVMe corriendo <strong>Home Assistant OS</strong>.</li>\n<li><strong>Respaldo Eléctrico:</strong> UPS de 1000VA a 1500VA con regulación automática de voltaje (AVR).</li>\n</ul>", "subsystems": "<h2>Guía de Subsistemas Domóticos</h2>\n<p><strong>Proyecto:</strong> Residencia Inteligente</p>\n<p><strong>Detalle Técnico:</strong> Iluminación, Clima, Audio, Accesos, Cisterna y Riego</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Iluminación Oculta (Micromódulos)</h3>\n<ul>\n<li><strong>Concepto:</strong> Mecanismos de pared normales de marcas de prestigio (Bticino Living Now, Schneider Unica, Simon 100).</li>\n<li><strong>Módulo:</strong> Detrás de la placa se conecta un <strong>Shelly Plus 1</strong> o <strong>Sonoff ZBMini Extreme (Zigbee 3.0)</strong>.</li>\n<li><strong>Comportamiento:</strong></li>\n<li>Al presionar el botón físico: La luz prende/apaga al instante por contacto seco.</li>\n<li>Por automatización o voz: Home Assistant manda el comando sin importar en qué posición esté el apagador de pared.</li>\n<li>Si el servidor se apaga: El interruptor sigue funcionando normalmente.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Climatización y Persianas</h3>\n<ul>\n<li><strong>Mini-splits:</strong> Equipos Inverter (Midea, Carrier, Daikin o Mitsubishi) integrados con dongles USB de control local (protocolo UART/CN105 o módulos ESPHome).</li>\n<li><strong>Automatización:</strong> Ajuste de temperatura según si hay personas en la habitación (sensores de presencia) o apagado automático si una ventana permanece abierta más de 3 minutos.</li>\n<li><strong>Persianas:</strong> Motores tubulares de 110V controlados por micromódulos <strong>Shelly Plus 2PM</strong> (permite abrir al 25%, 50%, 75% o 100% automáticamente al amanecer/atardecer).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Audio Multi-Room Distribuido</h3>\n<ul>\n<li><strong>Zona 1:</strong> Sala y Comedor (2 bocinas de techo).</li>\n<li><strong>Zona 2:</strong> Cocina (2 bocinas de techo).</li>\n<li><strong>Zona 3:</strong> Terraza y Jardín (2 bocinas de techo para intemperie).</li>\n<li><strong>Equipo:</strong> Todas las bocinas van cableadas con cable libre de oxígeno 14/2 directo al Rack. En el rack, 2 o 3 amplificadores <strong>WiiM Amp</strong> permiten reproducir música sincronizada en toda la casa o canciones distintas en cada habitación mediante AirPlay 2, Spotify o Home Assistant.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>4. Control de Accesos y Seguridad</h3>\n<ul>\n<li><strong>Cerradura:</strong> <em>Aqara U200 / U100</em> con soporte para Apple HomeKey, huella digital biométrica, teclado PIN y llave física.</li>\n<li><strong>Cámaras:</strong> 4 Cámaras IP 4K PoE (Reolink 4K) conectadas al Switch PoE del Rack. Detección de personas, vehículos y mascotas procesada localmente sin enviar video a servidores de terceros.</li>\n<li><strong>Timbre:</strong> <em>Reolink Doorbell PoE</em> con audio bidireccional y video fluido en tiempo real en teléfonos y pantallas.</li>\n<li><strong>Portón Vehicular:</strong> Módulo relevador de contacto seco conectado al motor del portón (LiftMaster / Merik) para apertura desde el auto con CarPlay / Android Auto o geocerca al llegar a casa.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>5. Gestión del Agua y Prevención de Fugas</h3>\n<ul>\n<li><strong>Cisterna:</strong> Sensor ultrasónico impermeable en la tapa de la cisterna conectado a un microcontrolador ESP32. Te muestra en el teléfono el porcentaje exacto de agua y los litros disponibles.</li>\n<li><strong>Corte por Fuga:</strong> Válvula motorizada de latón en la tubería principal. Si un sensor de humedad bajo el fregadero o lavadora detecta agua, la válvula corta el suministro en 3 segundos y envía una alerta crítica a los celulares.</li>\n<li><strong>Riego:</strong> Controlador de electroválvulas que consulta el pronóstico del tiempo: si va a llover o llovió ayer, cancela el riego automáticamente para ahorrar agua.</li>\n</ul>", "budget": "<h2>Catálogo de Equipos y Presupuesto de Referencia</h2>\n<p><strong>Proyecto:</strong> Residencia Inteligente</p>\n<p><strong>Moneda de Referencia:</strong> USD y Pesos Mexicanos (MXN)</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Materiales de Obra Negra (Imprescindibles para arrancar)</h3>\n<div class=\"table-responsive\"><table class=\"data-table\">\n<thead><tr><th>Cantidad</th><th>Material / Especificación</th><th>Costo Estimado (USD)</th><th>Costo Estimado (MXN)</th></tr></thead><tbody>\n<tr><td>1</td><td>Bobina 305m Cable Cat6 UTP 100% Cobre Interior</td><td>$110</td><td>$2,200</td></tr>\n<tr><td>1</td><td>Bobina 305m Cable Cat6 UTP Exterior Cobre (Filtro UV)</td><td>$120</td><td>$2,400</td></tr>\n<tr><td>1</td><td>Bobina 100m Cable para Altavoz 14 AWG Libre de Oxígeno</td><td>$75</td><td>$1,500</td></tr>\n<tr><td>30</td><td>Cajas chalupa galvanizadas extra-profundas (50mm+)</td><td>$60</td><td>$1,200</td></tr>\n<tr><td>Lote</td><td>Poliducto naranja reforzado / Conduit 3/4\", 1\" y 2\"</td><td>$120</td><td>$2,400</td></tr>\n<tr><td>Lote</td><td>Mano de obra extra de electricista (tendido de red y datos)</td><td>$300</td><td>$6,000</td></tr>\n<tr><td><strong>TOTAL</strong></td><td><strong>Fase 1: Infraestructura en Obra Negra</strong></td><td><strong>~$785 USD</strong></td><td><strong>~$15,700 MXN</strong></td></tr>\n</tbody></table></div>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Equipamiento Tecnológico (Fase de Acabados / Habitación)</h3>\n<div class=\"table-responsive\"><table class=\"data-table\">\n<thead><tr><th>Subsistema</th><th>Equipo Recomendado</th><th>Costo Estimado (USD)</th><th>Costo Estimado (MXN)</th></tr></thead><tbody>\n<tr><td><strong>Rack</strong></td><td>Gabinete 9U-12U + Patch Panel Cat6 + PDU</td><td>$140</td><td>$2,800</td></tr>\n<tr><td><strong>Switch</strong></td><td>TP-Link Omada SG2218P o UniFi PoE+ 16 Puertos</td><td>$250</td><td>$5,000</td></tr>\n<tr><td><strong>Router</strong></td><td>Gateway Gigabit UniFi / Omada ER605</td><td>$130</td><td>$2,600</td></tr>\n<tr><td><strong>Wi-Fi</strong></td><td>2x Access Points Wi-Fi 6 de techo (UniFi U6+ / Omada EAP610)</td><td>$240</td><td>$4,800</td></tr>\n<tr><td><strong>Servidor</strong></td><td>Mini-PC Intel N100 (16GB RAM / 512GB SSD)</td><td>$160</td><td>$3,200</td></tr>\n<tr><td><strong>UPS</strong></td><td>No-Break 1500VA con AVR</td><td>$130</td><td>$2,600</td></tr>\n<tr><td><strong>Zigbee/Matter</strong></td><td>Coordinador USB Sonoff Dongle Plus</td><td>$35</td><td>$700</td></tr>\n<tr><td><strong>Cámaras</strong></td><td>Kit 4 Cámaras 4K PoE + Disco Duro 2TB (Reolink 4K)</td><td>$450</td><td>$9,000</td></tr>\n<tr><td><strong>Timbre</strong></td><td>Timbre Reolink Video Doorbell PoE</td><td>$110</td><td>$2,200</td></tr>\n<tr><td><strong>Cerradura</strong></td><td>Aqara U200 / U100 (Huella, PIN, Apple HomeKey)</td><td>$230</td><td>$4,600</td></tr>\n<tr><td><strong>Iluminación</strong></td><td>18x Micromódulos Shelly Plus 1 / Sonoff ZBMini</td><td>$270</td><td>$5,400</td></tr>\n<tr><td><strong>Persianas</strong></td><td>4x Módulos de motor de persiana Shelly 2PM</td><td>$100</td><td>$2,000</td></tr>\n<tr><td><strong>Audio</strong></td><td>6x Bocinas empotrables de techo 6.5\"/8\" (3 pares)</td><td>$300</td><td>$6,000</td></tr>\n<tr><td><strong>Amplificación</strong></td><td>2x Amplificadores Wi-Fi/AirPlay WiiM Amp</td><td>$600</td><td>$12,000</td></tr>\n<tr><td><strong>Clima</strong></td><td>3x Módulos ESPHome / Dongle para Mini-split Inverter</td><td>$100</td><td>$2,000</td></tr>\n<tr><td><strong>Cisterna & Fugas</strong></td><td>Sensor ultrasónico + Válvula motorizada + 4 sensores fuga</td><td>$180</td><td>$3,600</td></tr>\n<tr><td><strong>Riego</strong></td><td>Controlador de electroválvulas inteligente de jardín</td><td>$80</td><td>$1,600</td></tr>\n<tr><td><strong>Presencia</strong></td><td>3x Sensores de presencia radar mmWave Aqara FP2</td><td>$150</td><td>$3,000</td></tr>\n<tr><td><strong>TOTAL</strong></td><td><strong>Fase 2: Equipos Tecnológicos Completos</strong></td><td><strong>~$3,655 USD</strong></td><td><strong>~$73,100 MXN</strong></td></tr>\n</tbody></table></div>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Inversión Global del Proyecto de Domótica</h3>\n<ul>\n<li><strong>Inversión Total Llave en Mano:</strong> <strong>~$4,440 USD</strong> (~$88,800 MXN).</li>\n<li><strong>Distribución en el tiempo:</strong></li>\n<li><strong>Año 1 y 2:</strong> $0 USD en compras de equipos (100% enfocado en el crédito del terreno y diseño arquitectónico).</li>\n<li><strong>Año 3 (Obra):</strong> ~$785 USD en materiales de tuberías y cableado.</li>\n<li><strong>Año 3 (Entrega):</strong> ~$3,655 USD en equipos (se pueden comprar gradualmente).</li>\n</ul>", "neufert": "<h2>Estándares Arquitectónicos y Antropometría: Ernst Neufert</h2>\n<p><strong>Proyecto:</strong> Residencia Inteligente</p>\n<p><strong>Referencia:</strong> <em>El Arte de Proyectar en Arquitectura (Bauentwurfslehre) — Ernst Neufert</em></p>\n<p>Este documento establece las dimensiones mínimas, óptimas y funcionales para cada espacio, basadas en la escala humana, la ergonomía y la eficiencia espacial.</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Antropometría y Circulaciones Humanas</h3>\n<pre><code class=\"language-\">\n┌────────────────────────────────────────────────────────┐\n│  MEDIDAS BASE DE CIRCULACIÓN (NEUFERT):               │\n│                                                        │\n│  • Paso de 1 persona:            0.80 m a 0.90 m       │\n│  • Cruce de 2 personas:          1.20 m a 1.30 m       │\n│  • Cruce con carga / maletas:    1.50 m                │\n│  • Paso de servicio lateral:     0.60 m                │\n│  • Altura libre de puertas:      2.10 m a 2.40 m       │\n│  • Altura libre de piso a techo: 2.70 m a 3.00 m       │\n└────────────────────────────────────────────────────────┘\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Escaleras y Circulaciones Verticales</h3>\n<h4>Ley de Blondel (Comodidad del Paso Humano):</h4>\n<p>$$2 \\times \\text{Contrahuella (Peralte)} + \\text{Huella} = 63\\text{ a }65\\text{ cm}$$</p>\n<ul>\n<li><strong>Contrahuella (Peralte):</strong> $16.5\\text{ a }17.5\\text{ cm}$ (máximo $18.0\\text{ cm}$ para vivienda cómoda).</li>\n<li><strong>Huella:</strong> $28.0\\text{ a }30.0\\text{ cm}$ (para apoyo total de la planta del pie).</li>\n<li><strong>Ancho libre de escalera:</strong> Mínimo $0.90\\text{ m}$; óptimo $1.05\\text{ a }1.20\\text{ m}$.</li>\n<li><strong>Gálibo (Altura libre vertical de paso):</strong> Mínimo $2.15\\text{ m}$ libres sin vigas que golpeen la cabeza.</li>\n<li><strong>Descanso intermedio:</strong> Mínimo igual al ancho de la escalera ($0.90\\text{ a }1.10\\text{ m}$) cada 12 a 16 escalones.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Dimensionamiento Óptimo por Espacio</h3>\n<h4>A. Cochera / Estacionamiento</h4>\n<ul>\n<li><strong>1 Auto:</strong> Mínimo $2.50\\text{ m} \\times 5.00\\text{ m}$ | Óptimo $3.00\\text{ m} \\times 5.50\\text{ m}$.</li>\n<li><strong>2 Autos en batería:</strong> Mínimo $5.00\\text{ m} \\times 5.00\\text{ m}$ | Óptimo $5.50\\text{ m} \\text{ a } 6.00\\text{ m} \\times 5.50\\text{ m} \\text{ a } 6.00\\text{ m}$.</li>\n<li><strong>Holgura para abrir puertas:</strong> Mínimo $0.60\\text{ a }0.80\\text{ m}$ entre vehículos y contra muros.</li>\n</ul>\n<h4>B. Cocina y Lavandería (El Triángulo de Trabajo)</h4>\n<ul>\n<li><strong>Triángulo Funcional:</strong></li>\n<li>Almacenamiento (Refrigerador) $≤ftrightarrow$ Lavado (Fregadero) $≤ftrightarrow$ Cocción (Estufa).</li>\n<li>La suma de las 3 distancias debe estar entre <strong>$4.00\\text{ m}$ y $7.50\\text{ m}$</strong> para evitar fatiga innecesaria.</li>\n<li><strong>Altura de encimeras/mesetas:</strong> $90\\text{ a }92\\text{ cm}$.</li>\n<li><strong>Profundidad de barra de trabajo:</strong> $60\\text{ a }65\\text{ cm}$ ($90\\text{ a }100\\text{ cm}$ en islas con desayunador).</li>\n<li><strong>Pasillo libre en cocina:</strong> Mínimo $1.00\\text{ m}$ (1 cocinero); óptimo $1.20\\text{ a }1.30\\text{ m}$ (para abrir el horno o lavavajillas y permitir que otra persona pase).</li>\n</ul>\n<h4>C. Comedor y Sala de Estar</h4>\n<ul>\n<li><strong>Comedor:</strong></li>\n<li>Espacio por comensal en mesa: Ancho $60\\text{ a }70\\text{ cm}$, profundidad $40\\text{ cm}$.</li>\n<li>Borde de mesa a pared: Mínimo $85\\text{ cm}$ para retirar la silla; $1.10\\text{ a }1.20\\text{ m}$ para permitir el paso de alguien sirviendo.</li>\n<li><strong>Sala:</strong></li>\n<li>Distancia sofá a mesa de centro: $40\\text{ a }45\\text{ cm}$.</li>\n<li>Distancia de visión a TV 4K: $2.20\\text{ a }3.20\\text{ m}$ para pantallas de 65\" a 75\".</li>\n<li>Pasillo de circulación principal: Mínimo $0.90\\text{ a }1.00\\text{ m}$.</li>\n</ul>\n<h4>D. Dormitorios y Clósets</h4>\n<ul>\n<li><strong>Holgura perimetral de cama:</strong> Mínimo $65\\text{ a }75\\text{ cm}$ a los lados; óptimo $85\\text{ a }100\\text{ cm}$.</li>\n<li><strong>Profundidad de clóset para colgar:</strong> $60\\text{ cm}$ útiles.</li>\n<li><strong>Espacio frente a clóset:</strong> Mínimo $90\\text{ cm}$ para abrir puertas batientes y vestirse.</li>\n<li><strong>Vestidor (Walk-in Closet):</strong> Pasillo central libre de $90\\text{ a }110\\text{ cm}$ entre muebles.</li>\n</ul>\n<h4>E. Baños y Sanitarios</h4>\n<ul>\n<li><strong>Medio Baño de Visitas:</strong> Mínimo $0.90\\text{ m} \\times 1.40\\text{ m} = 1.26\\text{ m}^2$ | Óptimo $1.10\\text{ m} \\times 1.60\\text{ m}$.</li>\n<li><strong>Inodoro:</strong> Espacio frontal libre mínimo $60\\text{ cm}$, separación lateral mínima de $20\\text{ cm}$ a cada lado (eje del WC a muro: $40\\text{ a }45\\text{ cm}$).</li>\n<li><strong>Regadera:</strong> Mínimo $0.80\\text{ m} \\times 0.80\\text{ m}$ | Óptimo $0.90\\text{ m} \\times 1.20\\text{ m} \\text{ a } 1.50\\text{ m}$.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>4. Zonificación Bioclimática y Orientaciones Solares</h3>\n<pre><code class=\"language-mermaid\">\ngraph TD\n    N[NORTE: Luz Difusa y Fresca] --&gt; N_ESP[Estudio / Home Office / Cuarto Rack / Alacena / Lavado]\n    S[SUR: Máxima Luz y Calor Invernal] --&gt; S_ESP[Sala / Comedor / Terraza con Aleros de Protección]\n    E[ESTE: Sol Matutino Agradable] --&gt; E_ESP[Recámaras / Desayunador]\n    O[OESTE: Sol Intenso de Tarde] --&gt; O_ESP[Baños / Clósets / Muros Ciegos / Protección con Celosía]\n</code></pre>", "topography": "<h2>Levantamiento Geométrico Exacto y Calibración Cadastral</h2>\n<p><strong>Proyecto:</strong> Residencia Domótica Inteligente (153.19 m²)</p>\n<p><strong>Norma de Dibujo:</strong> Cartesiano Exacto con Vértice Recto ($90.00^\\circ$) en P1 (Norte-Poniente)</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Geometría Exacta del Polígono (Coordenadas en Metros)</h3>\n<p>Tomando el <strong>Vértice P1 (Esquina Nor-Poniente)</strong> como el origen $(0.00, 0.00)$ con un <strong>ángulo recto exacto de $90.00^\\circ$</strong> entre el lindero Fondo (Poniente) y el lindero Norte:</p>\n<div class=\"table-responsive\"><table class=\"data-table\">\n<thead><tr><th>Vértice</th><th>Nombre / Ubicación</th><th>Coordenada $X$ (m)</th><th>Coordenada $Y$ (m)</th><th>Ángulo Interior</th></tr></thead><tbody>\n<tr><td><strong>P1</strong></td><td>Esquina Nor-Poniente (Fondo Norte)</td><td><strong>$0.000\\text{ m}$</strong></td><td><strong>$0.000\\text{ m}$</strong></td><td><strong>$90.00^\\circ$ (Ángulo Recto Exacto)</strong></td></tr>\n<tr><td><strong>P2</strong></td><td>Esquina Nor-Oriente (Frente Norte / Calle)</td><td><strong>$15.740\\text{ m}$</strong></td><td><strong>$0.000\\text{ m}$</strong></td><td><strong>$83.02^\\circ$</strong></td></tr>\n<tr><td><strong>P3</strong></td><td>Esquina Sur-Oriente (Frente Sur / Calle)</td><td><strong>$14.489\\text{ m}$</strong></td><td><strong>$-10.224\\text{ m}$</strong></td><td><strong>$96.25^\\circ$</strong></td></tr>\n<tr><td><strong>P4</strong></td><td>Esquina Sur-Poniente (Fondo Sur)</td><td><strong>$0.000\\text{ m}$</strong></td><td><strong>$-10.040\\text{ m}$</strong></td><td><strong>$90.73^\\circ$</strong></td></tr>\n</tbody></table></div>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Verificación de Distancias y Linderos Reales</h3>\n<div class=\"table-responsive\"><table class=\"data-table\">\n<thead><tr><th>Lado</th><th>Descripción</th><th>Distancia Medida</th><th>Distancia Calculada</th><th>Holgura / Error</th></tr></thead><tbody>\n<tr><td><strong>L1-2</strong></td><td><strong>Lado Norte</strong></td><td>$15.74\\text{ m}$</td><td><strong>$15.740\\text{ m}$</strong></td><td>$0.00\\text{ cm}$ (Exacto)</td></tr>\n<tr><td><strong>L2-3</strong></td><td><strong>Frente a Calle (Oriente)</strong></td><td>$10.30\\text{ m}$</td><td><strong>$10.300\\text{ m}$</strong></td><td>$0.00\\text{ cm}$ (Exacto)</td></tr>\n<tr><td><strong>L3-4</strong></td><td><strong>Lado Sur</strong></td><td>$14.49\\text{ m}$</td><td><strong>$14.489\\text{ m}$</strong></td><td>$< 0.1\\text{ cm}$ (Exacto)</td></tr>\n<tr><td><strong>L4-1</strong></td><td><strong>Fondo (Poniente)</strong></td><td>$10.04\\text{ m}$</td><td><strong>$10.040\\text{ m}$</strong></td><td>$0.00\\text{ cm}$ (Exacto)</td></tr>\n</tbody></table></div>\n<ul>\n<li><strong>Superficie Total:</strong> <strong>153.19 m²</strong></li>\n<li><strong>Perímetro Total:</strong> <strong>$50.57\\text{ m}$</strong></li>\n<li><strong>Desfase de Inclinación de la Calle:</strong> El frente a la calle avanza hacia el interior del lote en $\\Delta X = -1.25\\text{ m}$ a lo largo de los $10.30\\text{ m}$ de fachada (inclinación de $6.98^\\circ$ respecto a la vertical).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Solución Arquitectónica: Cochera Irregular Trapezoidal</h3>\n<p>Para absorber la irregularidad natural del terreno sin perder espacio útil:</p>\n<ol>\n<li><strong>Cajón 1 (Lado Norte - Largo):</strong> Fondo de <strong>$5.80\\text{ m}$ a $6.00\\text{ m}$</strong>, diseñado para una <strong>Camioneta SUV grande</strong> ($5.00\\text{ m}$ de largo).</li>\n<li><strong>Cajón 2 (Lado Sur - Corto):</strong> Fondo de <strong>$4.80\\text{ m}$ a $5.00\\text{ m}$</strong>, diseñado para un <strong>Auto Compacto / Hatchback / Sedan</strong> ($4.00 - 4.40\\text{ m}$ de largo).</li>\n<li><strong>Punto de Carga EV:</strong> Ubicado en el muro sur protegido, con pastilla de 40A y tubo conduit de 1\".</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>4. Servidumbres Frontal y Posterior con Inclinación Real</h3>\n<ul>\n<li><strong>Servidumbre Frontal ($2.50\\text{ m}$ paralela a la calle inclinada):</strong></li>\n<li><strong>Arriate Verde ($0.60\\text{ m}$):</strong> Pegado a la calle para absorción de agua pluvial y vegetación frontal.</li>\n<li><strong>Banqueta Peatonal ($0.90\\text{ m}$):</strong> Andador continuo de concreto estampado.</li>\n<li><strong>Servidumbre Libre ($1.00\\text{ m}$):</strong> Área absorbida por el frente de la cochera y acceso peatonal.</li>\n<li><strong>Servidumbre Posterior ($3.00\\text{ m}$):</strong></li>\n<li>Paralela al muro trasero perpendicular ($10.04\\text{ m}$ de ancho por $3.00\\text{ m}$ de fondo = <strong>$30.12\\text{ m}^2$</strong> de jardín y terraza libre).</li>\n</ul>", "zoning": "<h2>Programa Arquitectónico Oficial: Planta Baja, Planta Alta y Roof Garden con 1/2 Baño</h2>\n<p><strong>Proyecto:</strong> Residencia Domótica Inteligente (153.19 m² Terreno | ≈235 m² Superficie Total Útil)</p>\n<p><strong>Niveles:</strong> Planta Baja ($\\pm0.00\\text{ m}$ / $-0.15\\text{ m}$) • Planta Alta ($+3.00\\text{ m}$) • Roof Garden Frontal ($+6.00\\text{ m}$)</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Copias de Seguridad Guardadas</h3>\n<ul>\n<li>💾 [<code>assets/js/app.backup_before_roofgarden.js</code>](file:///home/olethros1318/Escritorio/Proyecto_Casa_Inteligente/assets/js/app.backup_before_roofgarden.js)</li>\n<li>💾 [<code>assets/js/app.backup_perfect_pb_pa.js</code>](file:///home/olethros1318/Escritorio/Proyecto_Casa_Inteligente/assets/js/app.backup_perfect_pb_pa.js)</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Planta Baja (Nivel $\\pm0.00\\text{ m}$ / $-0.15\\text{ m}$) — 100% Intacta</h3>\n<pre><code class=\"language-\">\n ◄── 3.16 m (RECÁMARA PB) ──► ◄──────── 2.51 m (BRAZO NORTE BAÑO) ────────► ◄── 2.40 m (LAVANDERÍA) ──► ◄── 1.60 m (MÁQUINAS) ──►\n ┌───────────────────────────┬───────────────────────────────────────────┬──────────────────────────┬─────────────────────────┐ ▲ (Y = -1.05 m)\n │                           │ Vanity (0.80m)  WC  │ REGADERA (1.20x0.9) │                          │ CUARTO DE               │ │\n │   RECÁMARA SUITE PB       │ 1. BAÑO COMPLETO EN 'L' (3.77 m²)         │   CUARTO DE LAVANDERÍA   │ MÁQUINAS 12U/UV         │ │ 1.50 m\n │   (3.16 m x 4.00 m)       ├───────────────────────────────────────────┼──────────────────────────┤ (1.60 x 1.50 m = 2.4 m²)│ │\n │   Superficie: 12.64 m²    │ 2. VESTIDOR / CLÓSET (1.95 m²)            │ 3. MEDIO BAÑO DE VISITAS ├─────────────────────────┤ ▼ (Y = -2.55 m)\n │   Nivel: N.P.T. ±0.00 m   │    • Clóset empotrado 1.50 x 0.60m        │    (1.50 x 1.30 m netos) │ ◄─ SUBIDA A PLANTA ALTA │ ▲\n │   • Cama King Size        ├───────────────────────────────────────────┴──────────────────────────┤    (Tramo Norte: 11-17) │ │ 2.25 m\n │   • 2 Burós + Mueble TV   │ ◄── PASILLO QUEBRADO (NIVEL ±0.00 m) ─────┬──────────────────────────┤    Escalera Confinada   │ │\n │   • Cancel 2.85m al Jardín├───────────────────────────────────────────┤ [CLARO LIBRE DE 1.01 m]  │    (2.50 x 2.25 m)      │ │\n ╞═══════════════════════════╡ [BAJA 1 ESCALÓN: -15 cm DE DESNIVEL] ═════╧══════════════════════════┴─────────────────────────┤ ▼ (Y = -4.80 m)\n │ 4. GRAN ÁREA SOCIAL       │ ◄── VESTÍBULO DE LLEGADA DIÁFANO                                     │ 7. COCHERA TECHADA      │ ▲\n │    (22.15 m² a -0.15 m)   │      • Circulación abierta de 4.20 m²                                │    (30.28 m² Superficie)│ │\n │    • Techo 3.15 m Alto    │      • Conexión sin muros hacia la Sala y Comedor                    │    • SUV Grande (4.90m) │ │\n │    • Sala Seccional en 'L'│                                                                      │    • Compacto (4.20m)   │ │ 4.75 m\n │    • Comedor Familiar (6) │ 5. COCINA INTEGRAL CON ISLA EN LADO SUR                              │    • Punto EV 240V/40A  │ │\n │    • Cancel 3.75m al Jardín    • Barra desayunadora (3 bancos) + Mueble bajo en muro sur         │                         │ │\n └───────────────────────────┴──────────────────────────────────────────────────────────────────────┴─────────────────────────┘ ▼ (Y = -9.80 m)\n (X = 3.00 m)                (X = 6.16 m)                                                           (X = 7.66 m)              (X = 12.67 m)\n ▲ PARED TRASERA JARDÍN      ▲ MURO SUR SUITE (LÍNEA DESNIVEL)                                      ▲ ENRASE COCHERA          ▲ FACHADA PRINCIPAL\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Planta Alta (Nivel $+3.00\\text{ m}$) — 100% Intacta</h3>\n<pre><code class=\"language-\">\n ◄── 2.76 m (RECÁMARA 1) ──► ◄── 2.76 m (RECÁMARA 2) ──► ◄────── 4.00 m (BAÑO COMPARTIDO) ──────►\n ┌───────────────────────────┬───────────────────────────┬───────────────────────────────────────┐ ▲ (Y = -1.05 m)\n │ 1. RECÁMARA SECUNDARIA 1  │ 2. RECÁMARA SECUNDARIA 2  │ 3. BAÑO COMPLETO COMPARTIDO (6.00 m²) │ │\n │    (2.76 m x 4.00 m)      │    (2.76 m x 4.00 m)      │    • Vanity (1.20m) │ WC │ Regadera   │ │\n │    • Techo Nivel +2.70 m  │    • Techo Nivel +2.70 m  ├───────────────────────────────────────┤ │ 4.00 m\n │    • Cama Queen + Burós   │    • Cama Queen + Burós   │ 4. CUBO ESCALERA (PB ◄► AZOTEA)       │ │ (Ala Norte)\n │    • Escritorio + Clóset  │    • Escritorio + Clóset  │    (2.50 m x 2.25 m = 5.62 m²)        │ │\n │    ├──────────────────────┴───────────────────────────┤    • Desembarco Nivel +3.00m (PB)     │ │\n │    │ [CLÓSET 60cm] [PUERTA 1] │ [PUERTA 2] [CLÓSET 60cm] │    • Arranque hacia Azotea (+6.00m)   │ │\n ╞════╧══════════════════════════════════════════════════╧═══════════════════════════════╤═══════╡ ▼ (Y = -5.05 m)\n │ 5. ZINC (1.50 m) │ PASILLO DE DISTRIBUCIÓN (1.50 m extremos / 0.90 m libre central)   │ 7.    │ ▲\n │    0.60m fondo   │ ◄── CUBIERTA SOBREELEVADA (+3.40 m libre) / LINTERNILLA CORRIDA ──►│ GRAN  │ │ 1.50 m\n │    Ventana Alta  │     (Se extiende únicamente a lo largo de Recámaras Secundarias)   │ BALCÓN│ │ Galería\n ╞══════════════════╪════════════════════════════════════════════════════════════════════╡ (1.50 │ ▼ (Y = -6.55 m)\n │ 8. BAÑO PRINCIPAL│ 9. FAMILY ROOM DIÁFANO             │ 11. HABITACIÓN PRINCIPAL      │   x   │ ▲\n │    (2.00x3.25m)  │    (2.67 m x 2.35 m = 6.27 m²)     │     (3.50 m x 3.25 m = 11.38m²)│ 4.75m)│ │ 3.25 m\n │    • Regadera Spa│    • Concepto Abierto sin Muro N.  │     • Cama King Size + Burós  │       │ │ Crujía\n │    • WC Privado  │    • Paso Libre de 90 cm           │     • Salida Directa a Balcón │       │ │ Sur\n │    • Doble Vanity├────────────────────────────────────┤     [PUERTA EXCLUSIVA MASTER] │       │ │\n │    • [PUERTA]    │ 10. PASILLO-CLÓSET MASTER (1.50 m) ┼───────────────────────────────►│       │ │\n └──────────────────┴────────────────────────────────────┴───────────────────────────────┴───────┘ ▼ (Y = -9.80 m)\n (X = 3.00 m)        (X = 5.00 m)                         (X = 7.67 m)                    (X=11.17) (X=12.67)\n ▲ PARED DEL JARDÍN (PONIENTE)                                                            ▲ FACHADA PRINCIPAL (ESTE)\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>4. Azotea Oficial: Roof Garden Frontal con 1/2 Baño Social (Nivel $+6.00\\text{ m}$)</h3>\n<pre><code class=\"language-\">\n ◄── 5.52 m (ZONA TÉCNICA Y CUBIERTA SOBREELEVADA POSTERIOR) ──► ◄── 1.65 m (1/2 BAÑO) ──► ◄── 2.50 m (CASETA) ──►\n ┌───────────────────────────────────────────────────────────────┬─────────────────────────┬──────────────────────┐ ▲ (Y = -1.05 m)\n │ 1. ZONA TÉCNICA NORTE (Al lado de la Cubierta Sobreelevada)   │                         │ 5. CASETA ESCALERA   │ │\n │    • 6x Paneles Solares Fotovoltaicos 3.3 kWp (550W c/u)      │                         │    (2.50 x 2.25 m)   │ │\n │    • Calentador Solar de Agua Termosifónico (200 L / 15 tubos)│ 4. MEDIO BAÑO DE VISITAS│    • Puerta Hermética│ │ 3.75 m\n │    • Orientación óptima al Sur (180°) e inclinación 45°       │    (1.65 x 2.25 = 3.7m²)│    • Salida Interior │ │\n ├───────────────────────────────────────────────────────────────┤    • Vanity Lavamanos   ├──────────────────────┤ ▼ (Y = -4.80 m)\n │ 2. CUBIERTA SOBREELEVADA DEL PASILLO (+6.70 m / Linternilla)  │    • Inodoro WC         │                      │ ▲\n │    • Longitud: 5.52 m (Termina en Hab. Secundarias: X = 8.52m)│    • Puerta al Deck     │                      │ │\n │    • Aleros Volados de 30 cm • Celosías Louvers Norte y Sur   ├─────────────────────────┴──────────────────────┤ │\n ├───────────────────────────────────────────────────────────────┤ 6. ROOF GARDEN SOCIAL FRONTAL (40.5 m²)        │ │\n │ 3. ZONA TÉCNICA SUR (Al lado de la Cubierta Sobreelevada)     │    • Pérgola bioclimática de sombra            │ │ 5.00 m\n │    • 3x Condensadoras A/C Inverter (PB, Master, Secundarias)  │    • Sala Modular Lounge Exterior con Firepit  │ │ Crujía Sur\n │    • Ocultas de la vista frontal y sobre gomas antivibratorias│    • Asador Grill Inox + Tarja + Barra Bancos  │ │ y Frente\n │                                                               │    • Barandal Frontal Cristal Templado         │ │\n └───────────────────────────────────────────────────────────────┴────────────────────────────────────────────────┘ ▼ (Y = -9.80 m)\n (X = 3.00 m)                                                    (X = 8.52 m)              (X = 10.17 m)  (X = 12.67 m)\n ▲ FONDO / COLINDANCIA POSTERIOR                                 ▲ LÍMITE HAB. SECUNDARIAS ▲ EJE CASETA   ▲ FACHADA (CALLE)\n</code></pre>\n<h4>🌟 Ventajas del Medio Baño en Azotea:</h4>\n<ol>\n<li><strong>Privacidad Total en la Casa:</strong></li>\n<li>Las visitas en el Roof Garden cuentan con su propio medio baño independiente sin invadir las recámaras ni los baños familiares de Planta Alta.</li>\n<li><strong>Eficiencia Hidrosanitaria Vertical:</strong></li>\n<li>Ubicado verticalmente sobre el ducto y shaft del baño de Planta Alta, facilitando la bajada sanitaria y la alimentación de agua desde el calentador solar.</li>\n</ul>", "mep": "<h2>Proyecto Ejecutivo de Ingenierías MEP & Domótica Integrada</h2>\n<p><strong>Residencia Inteligente:</strong> Terreno 153.19 m² | Construcción ≈235 m² (3 Niveles)</p>\n<p><strong>Normativas Aplicables:</strong> NOM-001-SEDE-2012 (Instalaciones Eléctricas), NOM-008-SCFI, Criterios ASHRAE / IEEE 802.11be (Wi-Fi 7) / Zigbee 3.0 / Matter over Thread.</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Cuadro de Cargas y Diseño Eléctrico (220V / 110V Bifásico)</h3>\n<h4>1.1. Centro de Carga Principal (QO-24 en Cuarto de Máquinas de PB)</h4>\n<ul>\n<li><strong>Acometida Eléctrica:</strong> Bifásica 2F-3H (Fase 1, Fase 2, Neutro y Tierra Física Calibre 4 AWG).</li>\n<li><strong>Medidor:</strong> Bidireccional CFE con conexión al inversor solar fotovoltaico ($3.3\\text{ kWp}$).</li>\n<li><strong>Sistema de Puesta a Tierra:</strong> 2 Electrodos de cobre Copperweld ($5/8\" \\times 3.00\\text{ m}$) con pozo de registro, compuesto mejorador y barra colectora equipotencial en el Rack.</li>\n</ul>\n<pre><code class=\"language-\">\n┌────────────────────────────────────────────────────────────────────────────────────────┐\n│                        TABLERO DE DISTRIBUCIÓN PRINCIPAL (QO-24)                       │\n├────┬─────────────────────────────┬───────────┬─────────┬──────────────┬────────────────┤\n│ Ckt│ Descripción                 │ Tensión   │ Amperaje│ Calibre Cable│ Protección / GF│\n├────┼─────────────────────────────┼───────────┼─────────┼──────────────┼────────────────┤\n│ 1-2│ Cargador Vehículo Eléctrico │ 240V (2F) │ 40 A    │ 2x 8 AWG + T │ Termomagnético │\n│ 3-4│ Climas Inverter Master & PB │ 240V (2F) │ 30 A    │ 2x 10 AWG + T│ Termomagnético │\n│ 5-6│ Climas Inverter Secundarias │ 240V (2F) │ 20 A    │ 2x 12 AWG + T│ Termomagnético │\n│ 7  │ Rack Domótico & Servidores  │ 120V (1F) │ 20 A    │ 12 AWG + T   │ UPS Online Doble│\n│ 8  │ Bomba Presurizadora & UV    │ 120V (1F) │ 15 A    │ 12 AWG + T   │ GFCI           │\n│ 9  │ Cocina (Refrigerador & Isla)│ 120V (1F) │ 20 A    │ 12 AWG + T   │ GFCI           │\n│ 10 │ Microondas & Horno Empotrado│ 120V (1F) │ 20 A    │ 12 AWG + T   │ Termomagnético │\n│ 11 │ Lavadora & Centro de Lavado │ 120V (1F) │ 20 A    │ 12 AWG + T   │ GFCI           │\n│ 12 │ Iluminación Planta Baja     │ 120V (1F) │ 15 A    │ 14 AWG (Neut)│ Domótico/DALI  │\n│ 13 │ Iluminación Planta Alta     │ 120V (1F) │ 15 A    │ 14 AWG (Neut)│ Domótico/DALI  │\n│ 14 │ Iluminación Roof Garden     │ 120V (1F) │ 15 A    │ 14 AWG (Neut)│ GFCI Exterior  │\n│ 15 │ Contactos Uso General PB    │ 120V (1F) │ 20 A    │ 12 AWG + T   │ GFCI Húmedas   │\n│ 16 │ Contactos Uso General PA    │ 120V (1F) │ 20 A    │ 12 AWG + T   │ Termomagnético │\n│ 17 │ Contactos & Grill Roof Top  │ 120V (1F) │ 20 A    │ 12 AWG + T   │ GFCI Exterior  │\n│ 18 │ Calentador Respaldo (Gas)   │ 120V (1F) │ 15 A    │ 14 AWG + T   │ Termomagnético │\n│19-2│ Reserva para Expansión      │ 120V/240V │ -       │ -            │ -              │\n└────┴─────────────────────────────┴───────────┴─────────┴──────────────┴────────────────┘\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Iluminación Inteligente y Sensores de Presencia (mmWave)</h3>\n<h4>2.1. Tipología de Alumbrado y Control</h4>\n<ol>\n<li><strong>Luz General y Acentuación:</strong> Tiras LED COB 24V continuas (sin puntos visibles) empotradas en cajillos de tablaroca y cornisas arquitectónicas con difusor opalino.</li>\n<li><strong>Ritmo Circadiano:</strong> Temperatura de color dinámica (CCT 2700K ámbar cálido al anochecer $\\rightarrow$ 4000K neutro energizante durante el día).</li>\n<li><strong>Apagadores Inteligentes con Neutro (Zigbee 3.0 / Matter):</strong></li>\n<li>Placas tipo touch / botones mecánicos con grabado láser y retroiluminación configurable.</li>\n<li>Funcionan de forma 100% manual e independiente si el servidor central se apaga.</li>\n</ul>\n<h4>2.2. Sensores de Presencia Humana por Microondas (mmWave 24GHz / 60GHz)</h4>\n<ul>\n<li><strong>Ventaja:</strong> Detectan microrrespiración y presencia estática (a diferencia de los sensores PIR tradicionales que apagan la luz si la persona está quieta en el sillón, cama o inodoro).</li>\n<li><strong>Distribución de Sensores mmWave:</strong></li>\n<li><strong>PB:</strong> Área Social (Sala/Comedor), Cocina, Pasillo, Medio Baño, Baño Suite y Cuarto de Lavandería.</li>\n<li><strong>PA:</strong> Pasillo de distribución, Family Room, Baño Compartido y Baño Master.</li>\n<li><strong>Roof Garden:</strong> Escalera y Medio Baño Social.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Red Estructurada, CCTV y Ciberseguridad</h3>\n<pre><code class=\"language-\">\n  INTERNET (Fibra Óptica 1 Gbps)\n            │\n            ▼\n ┌─────────────────────────────────────────────────────────────┐\n │ RACK 12U - CUARTO DE MÁQUINAS (Planta Baja X=12.67m, Y=-1.05m)│\n │  • PDU 8 Tomas Regulada con Supresor de Picos (15A)        │\n │  • UPS Online 1500VA / 900W Doble Conversión               │\n │  • Router / Gateway UniFi Cloud Gateway Ultra (1 Gbps IPS)  │\n │  • Switch PoE+ Gigabit 16 Puertos (120W Budget)            │\n │  • Patch Panel Cat6A 24 Puertos UTP 100% Cobre             │\n │  • Servidor Home Assistant Yellow / Mini PC Proxmox N100   │\n │  • NVR / Disco 4TB Grabación Local 24/7 (Cero Nubes Pagas) │\n │  • Coordinador Zigbee 3.0 / Matter over Thread (SLZB-06 PoE)│\n └──────────────────────────────┬──────────────────────────────┘\n                                │\n       ┌────────────────────────┼────────────────────────┐\n       ▼                        ▼                        ▼\n┌──────────────┐         ┌──────────────┐         ┌──────────────┐\n│ PUNTOS DE    │         │ CÁMARAS CCTV │         │ CONTROL DE   │\n│ ACCESO WI-FI7│         │ 4K POE LOCAL │         │ ACCESOS      │\n├──────────────┤         ├──────────────┤         ├──────────────┤\n│ • AP1 (PB)   │         │ • CAM 1: Ext │         │ • Cerradura  │\n│ • AP2 (PA)   │         │   Cochera/Calle│       │   Biométrica │\n│ • AP3 (Roof) │         │ • CAM 2: Acc.│         │ • Videoporter│\n│              │         │   Peatonal   │         │   PoE 2K     │\n│              │         │ • CAM 3: Jard│         │ • Chapa Eléc.│\n│              │         │ • CAM 4: Roof│         │              │\n└──────────────┘         └──────────────┘         └──────────────┘\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>4. Ingeniería Hidrosanitaria y Calentamiento Solar</h3>\n<h4>4.1. Red de Agua Potable y Presurización Constante</h4>\n<ul>\n<li><strong>Cisterna:</strong> Capacidad $5,000\\text{ L}$ subterránea con sensor ultrasónico de nivel en tiempo real.</li>\n<li><strong>Bomba Presurizadora Inverter Sumergible:</strong> Presión constante regulable a $3.5\\text{ bar}$ ($50\\text{ PSI}$) en todas las regaderas y tarjas de manera simultánea.</li>\n<li><strong>Purificación:</strong> Filtro de sedimentos de 5 micras + Filtro de carbón activado + Lámpara de desinfección Ultravioleta (UV) en el Cuarto de Máquinas.</li>\n</ul>\n<h4>4.2. Sistema Híbrido Solar + Recirculación Cero Desperdicio</h4>\n<ol>\n<li><strong>Calentador Solar de Tubos de Vacío ($200\\text{ L}$):</strong></li>\n<li>Genera agua a $65^\\circ\\text{C}-80^\\circ\\text{C}$ sin consumir gas.</li>\n<li><strong>Válvula Desviadora Termostática Inteligente:</strong></li>\n<li>Si el agua solar está a más de $42^\\circ\\text{C} \\rightarrow$ Pasa directo a las regaderas (Consumo de gas = 0%).</li>\n<li>Si es un día nublado ($<42^\\circ\\text{C}$) $\\rightarrow$ Se enciende automáticamente el calentador instantáneo modulante de respaldo para alcanzar la temperatura deseada.</li>\n<li><strong>Bomba Recirculadora Inteligente de Agua Caliente:</strong></li>\n<li>Evita esperar 1-2 minutos a que salga agua caliente en las regaderas de Planta Alta o PB.</li>\n<li>Se activa por sensor de presencia mmWave al entrar al baño, purgando la tubería fría hacia la cisterna en 15 segundos para tener agua caliente instantánea en cuanto abres la llave.</li>\n</ul>", "plumbing": "<h2>Proyecto Ejecutivo de Instalaciones Hidrosanitarias & Drenaje Pluvial</h2>\n<p><strong>Proyecto:</strong> Residencia Domótica Inteligente (153.19 m² Terreno | ≈235 m² Construcción en 3 Niveles)</p>\n<p><strong>Normativas de Cumplimiento:</strong> NOM-001-CONAGUA-2011, Manual de Instalaciones Hidráulicas y Sanitarias (Criterios Neufert & Hunter).</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Planos Técnicos Generados</h3>\n<ul>\n<li>📐 <strong>[Plano Isométrico e Hidráulico Solar](file:///home/olethros1318/Escritorio/Proyecto_Casa_Inteligente/planos_y_diagramas/01_plano_isometrico_hidraulico_y_solar.svg)</strong></li>\n<li>📐 <strong>[Plano de Red Sanitaria, Ventilación y Pluvial](file:///home/olethros1318/Escritorio/Proyecto_Casa_Inteligente/planos_y_diagramas/02_plano_red_sanitaria_y_pluvial.svg)</strong></li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Memorias de Cálculo y Dimensionamiento</h3>\n<h4>2.1. Cálculo de Demanda de Agua Potable Diaria</h4>\n<ul>\n<li><strong>Ocupación:</strong> 6 personas (Familia + Visitas).</li>\n<li><strong>Dotación Reglamentaria:</strong> $200\\text{ L/habitante/día}$.</li>\n<li><strong>Demanda Diaria Total:</strong> $6 \\times 200 = 1,200\\text{ L/día}$.</li>\n<li><strong>Reserva de Emergencia (Cisterna):</strong> $1,200\\text{ L/día} \\times 4\\text{ días de autonomía} = 4,800\\text{ L} \\rightarrow$ <strong>Cisterna Seleccionada: $5,000\\text{ L}$</strong>.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>2.2. Sistema de Presurización Inverter</h4>\n<ul>\n<li><strong>Bomba Sumergible Multietapas Inverter (Frecuencia Variable):</strong></li>\n<li><strong>Caudal Nominal:</strong> $60\\text{ L/min}$ a $3.5\\text{ bar}$ ($50\\text{ PSI}$).</li>\n<li><strong>Ventaja Inverter:</strong> Solo consume la energía exacta requerida según cuántas llaves o regaderas estén abiertas; nivel de ruido $< 35\\text{ dB}$ (inapreciable desde el interior).</li>\n<li><strong>Filtración y Purificación:</strong> Filtro de sedimentos de $5\\,\\mu\\text{m}$, filtro de bloque de carbón activado y esterilizador de luz ultravioleta ($12\\text{ GPM}$) garantizando agua potable en toda la casa.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>2.3. Sistema Solar Térmico y Calentamiento Híbrido</h4>\n<ul>\n<li><strong>Calentador Solar de Tubos de Vacío ($200\\text{ L}$):</strong></li>\n<li>15 tubos de borosilicato tricapa ($58\\text{ mm} \\times 1,800\\text{ mm}$) orientados al Sur con inclinación de $45^\\circ$.</li>\n<li>Temperatura de entrega promedio: $65^\\circ\\text{C}$ a $80^\\circ\\text{C}$.</li>\n<li><strong>Válvula Desviadora Termostática Inteligente (Bypass):</strong></li>\n<li>Si el agua solar $≥ 42^\\circ\\text{C} \\rightarrow$ Pasa directa al consumo (ahorro 100% de gas).</li>\n<li>Si el agua solar $< 42^\\circ\\text{C} \\rightarrow$ Pasa a través del calentador instantáneo modulante de respaldo para complementar los grados faltantes.</li>\n<li><strong>Anillo de Recirculación Inteligente:</strong></li>\n<li>Tubería de retorno de $1/2\"$ desde los baños de PA y Suite PB con bomba circuladora de $12\\text{W}$ activada por los sensores de presencia mmWave de Home Assistant.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Red Sanitaria y Ventilación</h3>\n<h4>3.1. Separación de Aguas y Diámetros Nominales</h4>\n<ol>\n<li><strong>Aguas Negras (BSN):</strong></li>\n<li>Tubería de PVC Sanitario de $4\"$ ($110\\text{ mm}$) con pendiente mínima del $2.0\\%$.</li>\n<li>Descarga directa de inodoros con codos a $45^\\circ$ hacia el registro principal.</li>\n<li><strong>Aguas Grises / Jabonosas (BSG):</strong></li>\n<li>Tubería de PVC Sanitario de $3\"$ y $2\"$ desde regaderas, lavamanos, vertedero de zinc y lavandería.</li>\n<li>Trampa de grasas hermética bajo la tarja de cocina y trampa de pelusas en lavandería.</li>\n<li><strong>Columna de Ventilación Sanitaria (CVS):</strong></li>\n<li>Tubería vertical de PVC de $2\"$ ($50\\text{ mm}$) que corre por el shaft y remata en azotea a $+7.20\\text{ m}$ con sombrero chino.</li>\n<li><strong>Función Clave:</strong> Equilibra las presiones hidrostáticas, evita que las trampas 'P' se vacíen por sifonamiento y expulsa los gases sanitarios al exterior.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>4. Drenaje Pluvial y Captación de Lluvia</h3>\n<ul>\n<li><strong>Pendientes de Losa:</strong> $2.0\\%$ hacia los embudos pluviales esquineros de azotea.</li>\n<li><strong>Bajadas de Agua Pluvial (BAP):</strong> Tubería de PVC de $4\"$ que baja oculta en muros y pasa por filtro interceptor de hojas y sedimentos antes de descargar en el jardín o drenaje pluvial.</li>\n</ul>", "civilbudget": "<h2>Presupuesto Paramétrico Integral y Catálogo de Conceptos de Obra Civil</h2>\n<p><strong>Proyecto:</strong> Residencia Domótica Inteligente (153.19 m² Terreno | 235.0 m² Construcción Total en 3 Niveles)</p>\n<p><strong>Calidad de Obra:</strong> Residencial Medio-Alto / Smart Home Sustentable</p>\n<p><strong>Costo Paramétrico Estimado:</strong> $\\$15,200\\text{ MXN/m}^2$ ($\\$760\\text{ USD/m}^2$ | Tipo de Cambio Ref.: $\\$20.00\\text{ MXN/USD}$)</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Resumen Ejecutivo por Etapas de Construcción</h3>\n<pre><code class=\"language-\">\n┌─────────────────────────────────────────────────────────────────────────────────────────────┐\n│                    DESGLOSE GENERAL DE INVERSIÓN POR ETAPAS DE CONSTRUCCIÓN                 │\n├──────┬──────────────────────────────────────────┬──────────────┬───────────────┬────────────┤\n│Etapa │ Descripción de la Partida Constructiva   │ Inversión MXN│ Inversión USD │ % del Total│\n├──────┼──────────────────────────────────────────┼──────────────┼───────────────┼────────────┤\n│ 00   │ Trámites, Licencias, DRO & Proyecto Ejec.│ $145,000 MXN │ $7,250 USD    │ 4.0 %      │\n│ 01   │ Preliminares, Cimentación & Cisterna 5kL │ $475,000 MXN │ $23,750 USD   │ 13.3 %     │\n│ 02   │ Obra Negra: Muros, Losas, Linternilla    │ $890,000 MXN │ $44,500 USD   │ 24.9 %     │\n│ 03   │ Instalaciones Ocultas MEP (Ductos, PPR)  │ $285,000 MXN │ $14,250 USD   │ 8.0 %      │\n│ 04   │ Aplanados, Yeso, Impermeabilización Azot.│ $260,000 MXN │ $13,000 USD   │ 7.3 %      │\n│ 05   │ Pisos Porcelánicos, Azulejos & Baños     │ $390,000 MXN │ $19,500 USD   │ 10.9 %     │\n│ 06   │ Carpintería Fina (Cocina Isla, Clósets)  │ $380,000 MXN │ $19,000 USD   │ 10.6 %     │\n│ 07   │ Cancelería Aluminio Serie Euro & Vidrios │ $245,000 MXN │ $12,250 USD   │ 6.9 %      │\n│ 08   │ Equipamiento Domótico, Solar & Climas A/C│ $362,000 MXN │ $18,100 USD   │ 10.1 %     │\n│ 09   │ Pintura, Limpieza Fina & Puesta en Marcha│ $140,000 MXN │ $7,000 USD    │ 4.0 %      │\n├──────┴──────────────────────────────────────────┼──────────────┼───────────────┼────────────┤\n│      TOTAL ESTIMADO DE CONSTRUCCIÓN (235 m²)    │$3,572,000 MXN│ $178,600 USD  │ 100.0 %    │\n└─────────────────────────────────────────────────┴──────────────┴───────────────┴────────────┘\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Catálogo Detallado de Conceptos por Partida</h3>\n<h4>ETAPA 00: Gestoría, Permisos y Estudios Preliminares ($145,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Estudio de Mecánica de Suelos (3 sondeos a $4.00\\text{ m}$):</strong> $\\$18,000\\text{ MXN}$ ($\\$900\\text{ USD}$).</li>\n<li><strong>Levantamiento Topográfico & Deslinde Notarial:</strong> $\\$8,000\\text{ MXN}$ ($\\$400\\text{ USD}$).</li>\n<li><strong>Cálculo Estructural y Firma de Perito DRO (Director Responsable de Obra):</strong> $\\$45,000\\text{ MXN}$ ($\\$2,250\\text{ USD}$).</li>\n<li><strong>Licencia Municipal de Construcción, Número Oficial y Alineamiento:</strong> $\\$54,000\\text{ MXN}$ ($\\$2,700\\text{ USD}$).</li>\n<li><strong>Contratos Provisionales de Agua (Agua y Drenaje) y Luz (CFE 220V):</strong> $\\$20,000\\text{ MXN}$ ($\\$1,000\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 01: Preliminares, Cimentación y Cisterna ($475,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Limpieza, Deshierbe, Trazo y Nivelación con Estación Total (153.19 m²):</strong> $\\$16,000\\text{ MXN}$ ($\\$800\\text{ USD}$).</li>\n<li><strong>Excavación para Zapatas Corridas / Losa de Cimentación ($1.20\\text{ m}$ prof.):</strong> $\\$65,000\\text{ MXN}$ ($\\$3,250\\text{ USD}$).</li>\n<li><strong>Cisterna Subterránea de $5,000\\text{ L}$ en Concreto Armado Impermeabilizado:</strong> $\\$68,000\\text{ MXN}$ ($\\$3,400\\text{ USD}$).</li>\n<li><strong>Armado de Acero (Varilla $3/8\", 1/2\", 5/8\"$) y Colado de Cimentación Concreto f'c=$250\\text{ kg/cm}^2$:</strong> $\\$270,000\\text{ MXN}$ ($\\$13,500\\text{ USD}$).</li>\n<li><strong>Rellenos Compactados con Bailarina Mecánica por Capas de $20\\text{ cm}$:</strong> $\\$32,000\\text{ MXN}$ ($\\$1,600\\text{ USD}$).</li>\n<li><strong>Fumigación Antitermitas en Terreno:</strong> $\\$24,000\\text{ MXN}$ ($\\$1,200\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 02: Obra Negra y Estructura en 3 Niveles ($890,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Muros de Block de Concreto Térmico / Ladrillo Rojo Recocido con Castillos y Dalas de Concreto:</strong> $\\$340,000\\text{ MXN}$ ($\\$17,000\\text{ USD}$).</li>\n<li><strong>Losa de Entrepiso PB-PA (Vigueta y Bovedilla de Poliestireno / Concreto f'c=$250\\text{ kg/cm}^2$):</strong> $\\$230,000\\text{ MXN}$ ($\\$11,500\\text{ USD}$).</li>\n<li><strong>Losa de Azotea General ($84.6\\text{ m}^2$) + Caseta de Escalera y 1/2 Baño:</strong> $\\$185,000\\text{ MXN}$ ($\\$9,250\\text{ USD}$).</li>\n<li><strong>Estructura de la Cubierta Sobreelevada (<em>Monitor Roof</em>) con Aleros Volados:</strong> $\\$48,000\\text{ MXN}$ ($\\$2,400\\text{ USD}$).</li>\n<li><strong>Escalera de Concreto Armado Continua (PB a PA y PA a Roof Garden - 34 escalones):</strong> $\\$52,000\\text{ MXN}$ ($\\$2,600\\text{ USD}$).</li>\n<li><strong>Pretiles de Seguridad en Azotea ($1.05\\text{ m}$ alto):</strong> $\\$35,000\\text{ MXN}$ ($\\$1,750\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 03: Instalaciones Ocultas MEP & Domótica en Obra Negra ($285,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Canalizaciones Conduit Pesadas ($1\"$ y $3/4\"$), Chalupas Profundas y Cajas 4x4\":</strong> $\\$42,000\\text{ MXN}$ ($\\$2,100\\text{ USD}$).</li>\n<li><strong>Cableado Eléctrico Cobre Antiflama (Calibres 8, 10, 12 y 14 AWG con Neutro al 100%):</strong> $\\$78,000\\text{ MXN}$ ($\\$3,900\\text{ USD}$).</li>\n<li><strong>Cableado Estructurado Cat6A UTP 100% Cobre a Todas las Estancias y APs Wi-Fi 7:</strong> $\\$28,000\\text{ MXN}$ ($\\$1,400\\text{ USD}$).</li>\n<li><strong>Red Hidráulica de Agua Fría y Caliente Solar en Tubería PPR Termofusionada Aislada:</strong> $\\$56,000\\text{ MXN}$ ($\\$2,800\\text{ USD}$).</li>\n<li><strong>Red Sanitaria PVC 4\" y 3\", Columna de Ventilación 2\" y Bajadas Pluviales BAP 4\":</strong> $\\$49,000\\text{ MXN}$ ($\\$2,450\\text{ USD}$).</li>\n<li><strong>Líneas Frigoríficas de Cobre y Desagües Embebidos para 3 Equipos A/C Inverter:</strong> $\\$32,000\\text{ MXN}$ ($\\$1,600\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 04: Obra Gris, Aplanados e Impermeabilización ($260,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Aplanados de Yeso Muestreado en Muros Interiores y Plafones:</strong> $\\$95,000\\text{ MXN}$ ($\\$4,750\\text{ USD}$).</li>\n<li><strong>Zarpeo y Afine en Muros Exteriores y Fachadas con Hidrófugo:</strong> $\\$78,000\\text{ MXN}$ ($\\$3,900\\text{ USD}$).</li>\n<li><strong>Impermeabilización Prefabricada Termofusionada $4.5\\text{ mm}$ con Poliéster en Azotea (Garantía 10 Años):</strong> $\\$48,000\\text{ MXN}$ ($\\$2,400\\text{ USD}$).</li>\n<li><strong>Contrapisos Nivelados y Membrana Impermeable en Zonas Húmedas de Baños:</strong> $\\$39,000\\text{ MXN}$ ($\\$1,950\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 05: Pisos, Recubrimientos y Muebles de Baño ($390,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Piso Porcelánico Rectificado Gran Formato ($60\\times 120\\text{ cm}$) en PB y PA ($185\\text{ m}^2$):</strong> $\\$165,000\\text{ MXN}$ ($\\$8,250\\text{ USD}$).</li>\n<li><strong>Piso Deck Exterior / Porcelanato Antiderrapante en Roof Garden y Balcón ($55\\text{ m}^2$):</strong> $\\$58,000\\text{ MXN}$ ($\\$2,900\\text{ USD}$).</li>\n<li><strong>Azulejos de Muro a Techo en Regaderas y Muros de Acento:</strong> $\\$42,000\\text{ MXN}$ ($\\$2,100\\text{ USD}$).</li>\n<li><strong>4 Inodoros Suspendidos / One-Piece Ecológicos de Doble Descarga:</strong> $\\$32,000\\text{ MXN}$ ($\\$1,600\\text{ USD}$).</li>\n<li><strong>Vanities de Baño con Cubiertas de Cuarzo y Grifería Monomando Negro Mate:</strong> $\\$58,000\\text{ MXN}$ ($\\$2,900\\text{ USD}$).</li>\n<li><strong>Regaderas Tipo Lluvia Spa con Monomandos Termostáticos Embebidos:</strong> $\\$35,000\\text{ MXN}$ ($\\$1,750\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 06: Carpintería Integral & Herrería ($380,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Cocina Integral de Diseño con Isla Central, Cierres Suaves y Cubierta de Granito/Cuarzo:</strong> $\\$185,000\\text{ MXN}$ ($\\$9,250\\text{ USD}$).</li>\n<li><strong>Puerta Principal Monumental de Seguridad en Madera Sólida / Acero con Chapa Biométrica:</strong> $\\$38,000\\text{ MXN}$ ($\\$1,900\\text{ USDParsing}$):<em></em> $\\$38,000\\text{ MXN}$ ($\\$1,900\\text{ USD}$).</li>\n<li><strong>Puertas Interiores Semisólidas con Marco Envolvente y Sellos Acústicos (8 piezas):</strong> $\\$56,000\\text{ MXN}$ ($\\$2,800\\text{ USD}$).</li>\n<li><strong>Clósets Empotrados en Recámaras 1, 2 y Suite PB + Vestidor Walk-in Master Suite:</strong> $\\$78,000\\text{ MXN}$ ($\\$3,900\\text{ USD}$).</li>\n<li><strong>Pérgola Metálica de Acero Estructural y Vigas de Sombra en Roof Garden:</strong> $\\$23,000\\text{ MXN}$ ($\\$1,150\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 07: Cancelería de Aluminio, Cristales Templados y Barandales ($245,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Cancelería de Aluminio Negro Serie Eurovent 70/80 con Cristal Templado $6\\text{ mm}$:</strong> $\\$135,000\\text{ MXN}$ ($\\$6,750\\text{ USD}$).</li>\n<li><strong>Canceles de Cristal Templado $9.5\\text{ mm}$ en Regaderas con Herrajes de Acero Inox:</strong> $\\$38,000\\text{ MXN}$ ($\\$1,900\\text{ USD}$).</li>\n<li><strong>Barandal de Cristal Templado en Balcón Frontal y Roof Garden ($1.05\\text{ m}$ alto):</strong> $\\$42,000\\text{ MXN}$ ($\\$2,100\\text{ USD}$).</li>\n<li><strong>Celosías Louvers Antilluvia en Cubierta Sobreelevada del Pasillo:</strong> $\\$30,000\\text{ MXN}$ ($\\$1,500\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 08: Equipamiento Tecnológico, Energías Limpias & Climas ($362,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Arreglo Fotovoltaico Solar 3.3 kWp (6 Paneles 550W + Microinversores):</strong> $\\$78,000\\text{ MXN}$ ($\\$3,900\\text{ USD}$).</li>\n<li><strong>Calentador Solar de Agua Termosifónico (200 L con 15 Tubos de Vacío Inox):</strong> $\\$19,000\\text{ MXN}$ ($\\$950\\text{ USD}$).</li>\n<li><strong>Sistema de Climatización A/C Multi-Split Inverter (3 Condensadoras + 4 Evaporadoras):</strong> $\\$98,000\\text{ MXN}$ ($\\$4,900\\text{ USD}$).</li>\n<li><strong>Bomba Presurizadora Inverter Sumergible + Filtros + Lámpara UV:</strong> $\\$34,000\\text{ MXN}$ ($\\$1,700\\text{ USD}$).</li>\n<li><strong>Rack 12U Equipado (Gateway UniFi, Switch PoE+, Servidor Home Assistant, UPS Online):</strong> $\\$46,000\\text{ MXN}$ ($\\$2,300\\text{ USD}$).</li>\n<li><strong>Iluminación Inteligente (Tiras COB LED, Dimmers DALI, Apagadores Zigbee/Matter):</strong> $\\$45,000\\text{ MXN}$ ($\\$2,250\\text{ USD}$).</li>\n<li><strong>CCTV 4K PoE, Videoportero, Cerradura Biométrica y Sensores mmWave:</strong> $\\$42,000\\text{ MXN}$ ($\\$2,100\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>ETAPA 09: Pintura, Limpieza Fina y Entrega Llave en Mano ($140,000\\text{ MXN}$)</h4>\n<ul>\n<li><strong>Pintura Vinílica Lavable de Primera Calidad (Comex Vinimex Total / Berel Kalos):</strong> $\\$65,000\\text{ MXN}$ ($\\$3,250\\text{ USD}$).</li>\n<li><strong>Jardinería Frontal y Trasera con Césped San Agustín y Sistema de Riego:</strong> $\\$28,000\\text{ MXN}$ ($\\$1,400\\text{ USD}$).</li>\n<li><strong>Limpieza Fina de Obra Profunda (Retiro de etiquetas, pulido de pisos y cristales):</strong> $\\$18,000\\text{ MXN}$ ($\\$900\\text{ USD}$).</li>\n<li><strong>Pruebas de Presión Hidráulica, Calibración de Escenas Domóticas y Trámite de Cierre:</strong> $\\$31,000\\text{ MXN}$ ($\\$1,550\\text{ USD}$).</li>\n</ul>", "masterplan": "<h2>Plan Maestro de Construcción Paso a Paso: Desde la Planeación hasta Abrir la Puerta</h2>\n<p><strong>Proyecto:</strong> Residencia Domótica Inteligente (153.19 m² Terreno | 235.0 m² Construcción en 3 Niveles)</p>\n<p><strong>Duración Total Estimada:</strong> 10 Meses de Obra Civil + 3 Meses de Gestoría y Licitación Previa</p>\n<p><strong>Modalidad de Ejecución:</strong> Administración Directa / Contrato a Precio Alzado por Etapas</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<pre><code class=\"language-\">\n                                CRONOGRAMA DE EJECUCIÓN MAESTRO (10 MESES DE OBRA)\n ┌───────────────────────────────────────────────┬───┬───┬───┬───┬───┬───┬───┬───┬───┬────┐\n │ FASE / PARTIDA CONSTRUCTIVA                   │M1 │M2 │M3 │M4 │M5 │M6 │M7 │M8 │M9 │M10 │\n ├───────────────────────────────────────────────┼───┼───┼───┼───┼───┼───┼───┼───┼───┼────┤\n │ 0. Gestoría, Permisos y Contratos Preliminares│███│   │   │   │   │   │   │   │   │    │ (Pre-obra)\n │ 1. Trazo, Cimentación & Cisterna 5,000 L      │███│███│   │   │   │   │   │   │   │    │\n │ 2. Muros, Castillos y Losa Entrepiso PB-PA    │   │   │███│███│   │   │   │   │   │    │\n │ 3. Muros PA, Losa Azotea, Caseta & Linternilla│   │   │   │███│███│   │   │   │   │    │\n │ 4. Instalaciones Ocultas MEP, Ductos y Cat6A  │   │   │   │   │███│███│   │   │   │    │\n │ 5. Aplanados, Yesos & Impermeabilización Azot.│   │   │   │   │   │███│███│   │   │    │\n │ 6. Pisos Porcelánicos, Azulejos & Muebles Baño│   │   │   │   │   │   │███│███│   │    │\n │ 7. Cancelería Eurovent, Vidrios & Carpintería │   │   │   │   │   │   │   │███│███│    │\n │ 8. Equipamiento Solar, Climas, Rack & Domótica│   │   │   │   │   │   │   │   │███│███ │\n │ 9. Pintura, Pruebas, Limpieza Fina & LLAVE    │   │   │   │   │   │   │   │   │   │████│\n └───────────────────────────────────────────────┴───┴───┴───┴───┴───┴───┴───┴───┴───┴────┘\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>🏗️ Guía Operativa Paso a Paso de la Construcción</h3>\n<h4>FASE 0: Planeación, Financiamiento y Gestoría Legal (Mes -3 a Mes 0)</h4>\n<ol>\n<li><strong>Paso 1: Mecánica de Suelos y Topografía:</strong></li>\n<li>Ejecución de 3 sondeos para determinar la capacidad de carga del suelo ($q_{adm}$) y cálculo estructural exacto de zapatas.</li>\n<li><strong>Paso 2: Aprobación del Proyecto Ejecutivo & Firma DRO:</strong></li>\n<li>Integración de planos arquitectónicos, estructurales e hidrosanitarios con firma de Director Responsable de Obra.</li>\n<li><strong>Paso 3: Trámite de Licencia de Construcción Municipal:</strong></li>\n<li>Ingreso de expediente en Desarrollo Urbano y pago de derechos de construcción y número oficial.</li>\n<li><strong>Paso 4: Contratos de Servicios Provisionales:</strong></li>\n<li>Instalación de toma provisional de agua de obra y mufa provisional CFE (220V).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 1: Preliminares, Cimentación y Estructura Subterránea (Mes 1 y Mes 2)</h4>\n<ol>\n<li><strong>Paso 5: Limpieza, Tapial Perimetral y Trazo con Estación Total:</strong></li>\n<li>Delimitación exacta del terreno (153.19 m²) respetando servidumbres (arriate de $60\\text{ cm}$ y banqueta de $90\\text{ cm}$).</li>\n<li><strong>Paso 6: Excavación y Construcción de Cisterna de 5,000 L:</strong></li>\n<li>Excavación masiva y colado en concreto armado f'c=$250\\text{ kg/cm}^2$ con aditivo hidrófugo integral bajo la cochera.</li>\n<li><strong>Paso 7: Armado de Acero y Colado de Cimentación:</strong></li>\n<li>Habilitado de zapatas corridas, contratrabes y dados de concreto. Fumigación antitermitas en terreno natural.</li>\n<li><strong>Paso 8: Rellenos Compactados y Losa de Cimentación / Firme:</strong></li>\n<li>Tendido de tuberías sanitarias maestras bajo firme y colado del firme de concreto en Planta Baja con el desnivel de $-15\\text{ cm}$ en el área social.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 2: Obra Negra y Estructura en los 3 Niveles (Mes 3 a Mes 5)</h4>\n<ol>\n<li><strong>Paso 9: Levantamiento de Muros y Castillos en Planta Baja:</strong></li>\n<li>Muros de carga confinados, cuarto de máquinas, lavandería y suite PB.</li>\n<li><strong>Paso 10: Cimbrado, Armado y Colado de Losa de Entrepiso PB-PA:</strong></li>\n<li>Sistema de vigueta y bovedilla de poliestireno (aislamiento acústico superior) con capa de compresión de $5\\text{ cm}$ de concreto premezclado.</li>\n<li><strong>Paso 11: Levantamiento de Muros de Planta Alta y 1er Tramo de Escalera:</strong></li>\n<li>Recámaras secundarias, baño compartido, Master Suite, Family Room y colado de los 17 escalones de concreto.</li>\n<li><strong>Paso 12: Colado de Losa de Azotea General, Caseta de Escalera y Monitor Roof:</strong></li>\n<li>Colado de la losa a $+6.00\\text{ m}$, caseta de salida a azotea, pretiles perimetrales de $1.05\\text{ m}$ y cubierta sobreelevada (<em>Monitor Roof</em>) a $+6.70\\text{ m}$.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 3: Instalaciones Ocultas MEP y Domótica en Obra Negra (Mes 5 y Mes 6)</h4>\n<ol>\n<li><strong>Paso 13: Ranurado y Tendido de Canalizaciones Conduit:</strong></li>\n<li>Colocación de manguera conduit pesada de $1\"$ para red/datos y $3/4\"$ para fuerza eléctrica; empotrado de chalupas profundas ($50\\text{ mm}$) en cada punto.</li>\n<li><strong>Paso 14: Tendido de Fontanería en PPR Termofusionado:</strong></li>\n<li>Líneas de agua fría y agua caliente aislada térmicamente, subida a azotea y anillo de retorno de recirculación.</li>\n<li><strong>Paso 15: Cableado Eléctrico con Cable Neutro y Cableado Cat6A:</strong></li>\n<li>Cableado de circuitos con neutro en todas las chalupas; tendido de 12 líneas Cat6A desde cada estancia hacia el Rack 12U en el Cuarto de Máquinas.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 4: Obra Gris, Aplanados e Impermeabilización (Mes 6 y Mes 7)</h4>\n<ol>\n<li><strong>Paso 16: Aplanados Interiores de Yeso y Exteriores de Cemento:</strong></li>\n<li>Muros a plomo y regla con esquineros metálicos en aristas para acabados de alta definición.</li>\n<li><strong>Paso 17: Impermeabilización Prefabricada Termofusionada en Azotea:</strong></li>\n<li>Aplicación de membrana asfáltica de $4.5\\text{ mm}$ gravillada con poliéster y pendientes pluviales al $2.0\\%$.</li>\n<li><strong>Paso 18: Bases de Regadera con Membrana Impermeabilizante:</strong></li>\n<li>Prueba de inundación de 24 horas en los 3 baños para certificar cero filtraciones.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 5: Pisos, Recubrimientos y Carpintería Fina (Mes 8 y Mes 9)</h4>\n<ol>\n<li><strong>Paso 19: Instalación de Pisos Porcelánicos de Gran Formato:</strong></li>\n<li>Colocación de porcelanato rectificado ($60\\times 120\\text{ cm}$) con boquilla epóxica y piso deck en Roof Garden.</li>\n<li><strong>Paso 20: Montaje de Cocina Integral con Isla y Cubiertas de Granito/Cuarzo:</strong></li>\n<li>Muebles hidrófugos con herrajes Blum de cierre suave y preparación para electrodomésticos empotrados.</li>\n<li><strong>Paso 21: Puertas Semisólidas, Clósets y Vestidor Master:</strong></li>\n<li>Instalación de carpintería a medida con sellos perimetrales acústicos en recámaras.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 6: Cancelería, Vidrio Templado y Equipamiento Tecnológico (Mes 9 y Mes 10)</h4>\n<ol>\n<li><strong>Paso 22: Cancelería de Aluminio Eurovent y Barandales de Cristal Templado:</strong></li>\n<li>Ventanas, canceles corredizos al jardín, barandal de cristal en balcón y Roof Garden, y louvers en linternilla.</li>\n<li><strong>Paso 23: Instalación Solar Fotovoltaica, Calentador Solar y Climas A/C:</strong></li>\n<li>Montaje de los 6 paneles fotovoltaicos ($3.3\\text{ kWp}$), calentador solar ($200\\text{ L}$) y 3 condensadoras inverter en azotea.</li>\n<li><strong>Paso 24: Armado del Rack 12U, Switches PoE, Wi-Fi 7 y Home Assistant:</strong></li>\n<li>Conexionado del Gateway UniFi, 3 Puntos de Acceso, cámaras 4K, cerradura biométrica y calibración de apagadores Zigbee/Matter.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 7: Pruebas, Limpieza Fina y Entrega \"Llave en Mano\" (Mes 10 - Semana 4)</h4>\n<ol>\n<li><strong>Paso 25: Pruebas Integrales de Funcionamiento:</strong></li>\n<li>Verificación de presión hidroneumática constante ($3.5\\text{ bar}$), pruebas de carga eléctrica y balanceo de fases.</li>\n<li><strong>Paso 26: Limpieza Fina de Obra y Retiro de Protecciones:</strong></li>\n<li>Pulido de vidrios, pisos y desinfección profunda de cisterna y tuberías.</li>\n<li><strong>Paso 27: Entrega de Carpeta Técnica, Planos As-Built y LLAVE EN MANO:</strong></li>\n<li>Configuración de la app de Home Assistant en los teléfonos de la familia y entrega formal de la casa.</li>\n</ul>", "progressive": "<h2>Estrategia de Construcción Progresiva: Habitabilidad Inmediata y Crecimiento Modular</h2>\n<p><strong>Proyecto:</strong> Residencia Domótica Inteligente (153.19 m² Terreno | 235.0 m² Construcción en 3 Niveles)</p>\n<p><strong>Objetivo:</strong> Reducir la barrera de entrada inicial, lograr <strong>habitabilidad inmediata con 0 pago de renta</strong> y habilitar el crecimiento modular por fases a lo largo de 3 a 5 años sin demoliciones ni retrabajos.</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. La Regla de Oro de la Construcción Progresiva Inteligente</h3>\n<pre><code class=\"language-\">\n ┌─────────────────────────────────────────────────────────────────────────────────────────────┐\n │                         MATRIZ DE DECISIÓN: ¿QUÉ SE HACE HOY VS QUÉ SE POSTERGA?            │\n ├──────────────────────────────────────────────┬──────────────────────────────────────────────┤\n │  INNEGOCIABLE EN DÍA 1 (CERO RETRABAJOS)     │  MODULAR / POSTERGABLE EN FASES (PLUG & PLAY)│\n ├──────────────────────────────────────────────┼──────────────────────────────────────────────┤\n │ • Toda la cimentación y losas en 3 niveles   │ • Paneles solares fotovoltaicos (dejar tubo) │\n │ • Cisterna 5,000 L bajo cochera              │ • Calentador solar (dejar preparación PPR)   │\n │ • Tuberías conduit pesadas (1\" y 3/4\") vacías│ • Climas A/C (dejar línea de cobre y desagüe)│\n │ • Cable neutro en 100% de chalupas profundas │ • Pérgola y asador de Roof Garden            │\n │ • Tuberías de agua PPR aisladas y drenajes   │ • Cocina de alta gama (usar básica al inicio)│\n │ • Impermeabilización termofusionada en techo │ • Clósets a medida y vestidores carpintería  │\n └──────────────────────────────────────────────┴──────────────────────────────────────────────┘\n</code></pre>\n<div class=\"stat-callout\">[!IMPORTANT]</div>\n<div class=\"stat-callout\"><strong>El secreto del éxito:</strong> Dejar instalada toda la tubería vacía, registros, mangueras y cajas profundas durante la obra negra cuesta <strong>menos del 2% del presupuesto</strong>, pero te ahorra el 100% de ranurar, demoler o repintar muros en el futuro.</div>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Desglose Financiero por Fases de Crecimiento</h3>\n<pre><code class=\"language-\">\n┌─────────────────────────────────────────────────────────────────────────────────────────────┐\n│                    PLAN FINANCIERO EN 4 FASES MODULARES (HABITABILIDAD PRIMERO)             │\n├──────┬──────────────────────────────────────────┬──────────────┬───────────────┬────────────┤\n│Fase  │ Alcance y Propósito de la Fase           │ Inversión MXN│ Inversión USD │ Acumulado  │\n├──────┼──────────────────────────────────────────┼──────────────┼───────────────┼────────────┤\n│ 1    │ Casa Núcleo Habitable (PB completa + PA) │$1,980,000 MXN│ $99,000 USD   │ 55.4 %     │\n│ 2    │ Acabados Finos & Confort Planta Alta     │ $580,000 MXN │ $29,000 USD   │ 71.7 %     │\n│ 3    │ Roof Garden Frontal, Pérgola & 1/2 Baño  │ $420,000 MXN │ $21,000 USD   │ 83.4 %     │\n│ 4    │ Ecosistema Solar, Climas & Domótica Pro  │ $362,000 MXN │ $18,100 USD   │ 100.0 %    │\n├──────┴──────────────────────────────────────────┼──────────────┼───────────────┼────────────┤\n│      TOTAL GLOBAL CONSOLIDADO (A LO LARGO DE AÑOS)$3,572,000 MXN│$178,600 USD  │ 100.0 %    │\n└─────────────────────────────────────────────────┴──────────────┴───────────────┴────────────┘\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Detalle Operativo de Cada Fase</h3>\n<h4>FASE 1: Casa Núcleo Habitable ($1,980,000\\text{ MXN}$ / $\\$99,000\\text{ USD}$)</h4>\n<p><strong>Meta:</strong> Terminar la estructura completa, impermeabilizar, habilitar servicios básicos y <strong>mudarse de inmediato para dejar de pagar renta</strong>.</p>\n<ul>\n<li><strong>Estructura Completa:</strong> Cimentación, cisterna $5,000\\text{ L}$, muros y losas de los 3 niveles (PB, PA y Azotea techada e impermeabilizada).</li>\n<li><strong>MEP Oculto:</strong> 100% de tuberías eléctricas con neutro, tuberías de agua PPR, drenajes y cableado estructurado Cat6A.</li>\n<li><strong>Habitabilidad en Planta Baja:</strong></li>\n<li>Recámara Suite PB lista para dormir (piso, ventanas y puerta).</li>\n<li>Baño Completo de PB 100% funcional (WC, regadera y lavabo).</li>\n<li>Cocina funcional básica (tarja, estufa, refrigerador y conexiones).</li>\n<li>Área social con piso básico nivelado.</li>\n<li><strong>Seguridad Externa:</strong> Puerta principal de seguridad y cancelería exterior con vidrios colocados.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 2: Acabados Finos y Confort en Planta Alta ($580,000\\text{ MXN}$ / $\\$29,000\\text{ USD}$)</h4>\n<p><strong>Meta:</strong> Equipar la zona íntima de la familia mientras ya vives en la casa (Año 1 habitando).</p>\n<ul>\n<li><strong>Baño Master Spa:</strong> Colocación de canceles de cristal templado, doble vanity con cubierta de cuarzo y azulejos decorativos.</li>\n<li><strong>Carpintería Residencial:</strong> Clósets empotrados en recámaras 1 y 2, vestidor walk-in en Master Suite y puertas interiores semisólidas.</li>\n<li><strong>Cocina Integral de Alta Gama:</strong> Montaje de isla central con cubierta de granito/cuarzo y muebles de cierre suave.</li>\n<li><strong>Pisos Porcelánicos Definitivos:</strong> Acabado porcelánico gran formato ($60\\times 120\\text{ cm}$) en Planta Alta y Family Room.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 3: Roof Garden Frontal, Pérgola y 1/2 Baño Social ($420,000\\text{ MXN}$ / $\\$21,000\\text{ USD}$)</h4>\n<p><strong>Meta:</strong> Habilitar la terraza lounge panorámica para eventos sociales y reuniones (Año 2).</p>\n<ul>\n<li><strong>Piso Deck Exterior:</strong> $45\\text{ m}^2$ de deck tecnológico o porcelanato antiderrapante en el frente.</li>\n<li><strong>Pérgola Bioclimática:</strong> Estructura de acero y vigas de sombra.</li>\n<li><strong>Grill Station:</strong> Asador de acero inoxidable empotrado, tarja exterior y barra de bebidas con bancos.</li>\n<li><strong>Medio Baño de Azotea:</strong> Habilitación de acabados, WC y vanity en el baño anexo a la caseta de escalera.</li>\n<li><strong>Barandal de Cristal Templado Frontal:</strong> Vista panorámica abierta hacia la calle.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>FASE 4: Ecosistema Solar, Climatización y Domótica Avanzada ($362,000\\text{ MXN}$ / $\\$18,100\\text{ USD}$)</h4>\n<p><strong>Meta:</strong> Lograr autosuficiencia energética y máxima inteligencia (Año 3).</p>\n<ul>\n<li><strong>Arreglo Solar Fotovoltaico ($3.3\\text{ kWp}$):</strong> 6 Paneles bifaciales de $550\\text{W}$ con microinversores (ahorro del 90% en recibo CFE).</li>\n<li><strong>Calentador Solar de Agua ($200\\text{ L}$):</strong> Termotanque de acero inoxidable con 15 tubos de vacío y bypass termostático (ahorro 80% en gas).</li>\n<li><strong>Climatización Multi-Split Inverter:</strong> Instalación de las 3 condensadoras en azotea y 4 evaporadoras en recámaras y sala.</li>\n<li><strong>Equipamiento del Rack 12U & CCTV:</strong> Gateway UniFi, Switch PoE+, 3 APs Wi-Fi 7, 4 cámaras 4K con IA y servidor Home Assistant.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>4. Comparativa de Flujo de Efectivo</h3>\n<div class=\"table-responsive\"><table class=\"data-table\">\n<thead><tr><th>Escenario</th><th>Desembolso Inicial</th><th>Ventaja Clave</th><th>Riesgo Financiero</th></tr></thead><tbody>\n<tr><td><strong>Tradicional (Todo de Golpe)</strong></td><td>$\\$3,572,000\\text{ MXN}$ ($\\$178,600\\text{ USD}$)</td><td>Casa 100% terminada día 1</td><td>Alto endeudamiento o atraso por falta de liquidez</td></tr>\n<tr><td><strong>Estrategia Progresiva (4 Fases)</strong></td><td><strong>$\\$1,980,000\\text{ MXN}$ ($\\$99,000\\text{ USD}$)</strong></td><td><strong>Te mudas en el mes 6, ahorras renta y pagas acabados con tus ingresos corrientes</strong></td><td><strong>Mínimo y 100% controlado</strong></td></tr>\n</tbody></table></div>", "cashflow": "<h2>Guía Financiera y Plan de Flujo de Caja para Construcción por Etapas</h2>\n<p><strong>Proyecto:</strong> Residencia Domótica Inteligente (153.19 m² Terreno | 235.0 m² Construcción en 3 Niveles)</p>\n<p><strong>Monto Total Consolidado:</strong> $\\$3,572,000\\text{ MXN}$ ($\\$178,600\\text{ USD}$ | TC Ref.: $\\$20.00\\text{ MXN/USD}$)</p>\n<p><strong>Estrategia:</strong> 4 Fases Progresivas con <strong>Habitabilidad Inmediata en el Mes 6</strong> (Cero Gasto de Renta).</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Tabla Maestra de Arranque por Fases: \"¿Cuánto necesito para iniciar cada etapa?\"</h3>\n<pre><code class=\"language-\">\n┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐\n│                           PLAN MAESTRO DE CAPITAL DE ARRANQUE Y FLUJO DE CAJA                           │\n├──────┬───────────────────────┬──────────────┬──────────────┬──────────────┬──────────────┬──────────────┤\n│ Fase │ Nombre de la Etapa    │ Costo Total  │ Anticipo (30%)│ Flujo Mensual│ Duración     │ Meta / Hito  │\n├──────┼───────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤\n│  1   │ Casa Núcleo Habitable │$1,980,000 MXN│ $594,000 MXN │ $231,000 MXN │ 6 Meses      │ ¡MUDANZA!    │\n│      │ (Estructura + PB Viva)│ ($99,000 USD)│ ($29,700 USD)│ ($11,550 USD)│ (24 semanas) │ 0 Renta      │\n├──────┼───────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤\n│  2   │ Acabados Planta Alta  │ $580,000 MXN │ $174,000 MXN │  $67,666 MXN │ 6 Meses      │ Confort &    │\n│      │ & Cocina de Cuarzo    │ ($29,000 USD)│  ($8,700 USD)│  ($3,383 USD)│ (Año 1 viva) │ Cocina Alta  │\n├──────┼───────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤\n│  3   │ Roof Garden Frontal,  │ $420,000 MXN │ $126,000 MXN │  $70,000 MXN │ 6 Meses      │ Terraza Social│\n│      │ Pérgola & 1/2 Baño    │ ($21,000 USD)│  ($6,300 USD)│  ($3,500 USD)│ (Año 2)      │ Panorámica   │\n├──────┼───────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤\n│  4   │ Ecosistema Solar 3.3k,│ $362,000 MXN │ $108,600 MXN │  $60,333 MXN │ 6 Meses      │ Autosuficien-│\n│      │ Climas & Domótica Pro │ ($18,100 USD)│  ($5,430 USD)│  ($3,016 USD)│ (Año 3)      │ cia & 0 CFE  │\n├──────┴───────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤\n│      TOTAL CONSOLIDADO       │$3,572,000 MXN│$1,002,600 MXN│       -      │ 24 a 36 Meses│ Residencia   │\n│                              │($178,600 USD)│ ($50,130 USD)│              │ en el tiempo │ Inteligente  │\n└──────────────────────────────┴──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Desglose Detallado de Gastos por Etapa</h3>\n<h4>🟢 FASE 1: Casa Núcleo Habitable ($1,980,000\\text{ MXN}$ / $\\$99,000\\text{ USD}$)</h4>\n<ul>\n<li><strong>Requisito para iniciar:</strong> Juntar <strong>$\\$594,000\\text{ MXN}$</strong> (Anticipo para trámites, mecánica de suelos, excavación, acero inicial y cisterna).</li>\n<li><strong>Flujo semanal durante los 6 meses de obra:</strong> $\\approx \\$57,750\\text{ MXN/semana}$.</li>\n</ul>\n<p>#### Lista Exacta de Conceptos a Pagar en Fase 1:</p>\n<ol>\n<li><strong>Gestoría, Licencia de Construcción, Número Oficial y DRO:</strong> $\\$145,000\\text{ MXN}$ ($\\$7,250\\text{ USD}$).</li>\n<li><strong>Trazo con Estación Total, Limpieza y Excavación:</strong> $\\$81,000\\text{ MXN}$ ($\\$4,050\\text{ USD}$).</li>\n<li><strong>Cisterna Subterránea de $5,000\\text{ L}$ en Concreto Hidrófugo:</strong> $\\$68,000\\text{ MXN}$ ($\\$3,400\\text{ USD}$).</li>\n<li><strong>Cimentación (Zapatas, Acero f'c=$250$, Fumigación Antitermitas):</strong> $\\$326,000\\text{ MXN}$ ($\\$16,300\\text{ USD}$).</li>\n<li><strong>Muros de Carga Confinados y Castillos en 3 Niveles:</strong> $\\$340,000\\text{ MXN}$ ($\\$17,000\\text{ USD}$).</li>\n<li><strong>Losa de Entrepiso PB-PA y Losa de Azotea General (Techada):</strong> $\\$415,000\\text{ MXN}$ ($\\$20,750\\text{ USD}$).</li>\n<li><strong>Escalera de Concreto Armada (34 escalones de PB a Roof):</strong> $\\$52,000\\text{ MXN}$ ($\\$2,600\\text{ USD}$).</li>\n<li><strong>Pretiles de Seguridad en Azotea ($1.05\\text{ m}$ de alto):</strong> $\\$35,000\\text{ MXN}$ ($\\$1,750\\text{ USD}$).</li>\n<li><strong>Canalizaciones Conduit Pesadas ($1\"$ y $3/4\"$), Cajas $4\\times 4\"$, Chalupas Profundas ($50\\text{ mm}$), Cable Neutro en Toda la Casa y 12 Líneas Cat6A:</strong> $\\$148,000\\text{ MXN}$ ($\\$7,400\\text{ USD}$).</li>\n<li><strong>Red Hidráulica PPR Termofusionada Aislada y Drenajes PVC:</strong> $\\$105,000\\text{ MXN}$ ($\\$5,250\\text{ USD}$).</li>\n<li><strong>Aplanados de Yeso en PB y Zarpeo Exterior con Hidrófugo:</strong> $\\$95,000\\text{ MXN}$ ($\\$4,750\\text{ USD}$).</li>\n<li><strong>Impermeabilización Prefabricada Termofusionada en Azotea ($4.5\\text{ mm}$ con Poliéster - Garantía 10 Años):</strong> $\\$48,000\\text{ MXN}$ ($\\$2,400\\text{ USD}$).</li>\n<li><strong>Piso Porcelánico en PB, Puerta Principal de Seguridad y Canceles Exteriores con Vidrio:</strong> $\\$122,000\\text{ MXN}$ ($\\$6,100\\text{ USD}$).</li>\n<li><strong>Resultado:</strong> <strong>¡Te mudas en el Mes 6 a tu Suite de PB con cocina funcional, baño completo y servicios activos!</strong></li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>🔵 FASE 2: Acabados Finos & Confort en Planta Alta ($580,000\\text{ MXN}$ / $\\$29,000\\text{ USD}$)</h4>\n<ul>\n<li><strong>Requisito para iniciar:</strong> Juntar <strong>$\\$174,000\\text{ MXN}$</strong> (Anticipo para carpintería a medida, cubiertas de cuarzo y canceles templados).</li>\n<li><strong>Tiempo de ejecución:</strong> 6 meses viviendo ya en la casa (Año 1).</li>\n</ul>\n<p>#### Lista Exacta de Conceptos a Pagar en Fase 2:</p>\n<ol>\n<li><strong>Cocina Integral de Diseño con Isla Central y Cubiertas de Cuarzo:</strong> $\\$185,000\\text{ MXN}$ ($\\$9,250\\text{ USD}$).</li>\n<li><strong>Baño Master Spa (Doble Vanity de Cuarzo, Canceles Templados $9.5\\text{ mm}$, Regadera Lluvia):</strong> $\\$75,000\\text{ MXN}$ ($\\$3,750\\text{ USD}$).</li>\n<li><strong>Baño Compartido de PA Completo:</strong> $\\$55,000\\text{ MXN}$ ($\\$2,750\\text{ USD}$).</li>\n<li><strong>Carpintería de 8 Puertas Interiores Semisólidas con Sellos Acústicos:</strong> $\\$56,000\\text{ MXN}$ ($\\$2,800\\text{ USD}$).</li>\n<li><strong>Clósets Empotrados en Recámaras 1, 2 y Suite PB + Walk-in Closet Master:</strong> $\\$78,000\\text{ MXN}$ ($\\$3,900\\text{ USD}$).</li>\n<li><strong>Piso Porcelánico Rectificado ($60\\times 120\\text{ cm}$) en Planta Alta y Family Room ($92\\text{ m}^2$):</strong> $\\$85,000\\text{ MXN}$ ($\\$4,250\\text{ USD}$).</li>\n<li><strong>Pintura Vinílica Lavable Interior y Remates:</strong> $\\$46,000\\text{ MXN}$ ($\\$2,300\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>🟡 FASE 3: Roof Garden Frontal, Pérgola & 1/2 Baño ($420,000\\text{ MXN}$ / $\\$21,000\\text{ USD}$)</h4>\n<ul>\n<li><strong>Requisito para iniciar:</strong> Juntar <strong>$\\$126,000\\text{ MXN}$</strong> (Anticipo de estructura metálica, piso deck y barandales).</li>\n<li><strong>Tiempo de ejecución:</strong> 6 meses en el Año 2.</li>\n</ul>\n<p>#### Lista Exacta de Conceptos a Pagar en Fase 3:</p>\n<ol>\n<li><strong>Piso Deck Exterior / Porcelanato Antiderrapante en Roof Top ($45\\text{ m}^2$):</strong> $\\$58,000\\text{ MXN}$ ($\\$2,900\\text{ USD}$).</li>\n<li><strong>Pérgola Bioclimática de Acero Estructural y Vigas de Sombra:</strong> $\\$45,000\\text{ MXN}$ ($\\$2,250\\text{ USD}$).</li>\n<li><strong>Grill Station (Asador Inox Empotrado, Tarja Monomando y Barra con 3 Bancos):</strong> $\\$48,000\\text{ MXN}$ ($\\$2,400\\text{ USD hostility}$):<em></em> $\\$48,000\\text{ MXN}$ ($\\$2,400\\text{ USD}$).</li>\n<li><strong>Acabados y Muebles del 1/2 Baño de Visitas en Azotea:</strong> $\\$38,000\\text{ MXN}$ ($\\$1,900\\text{ USD}$).</li>\n<li><strong>Barandal Frontal de Cristal Templado hacia la Calle:</strong> $\\$42,000\\text{ MXN}$ ($\\$2,100\\text{ USD}$).</li>\n<li><strong>Celosías Louvers Antilluvia en Cubierta Sobreelevada (<em>Monitor Roof</em>):</strong> $\\$30,000\\text{ MXN}$ ($\\$1,500\\text{ USD}$).</li>\n<li><strong>Sala Lounge Modular de Exterior con Mesa Fogatero (<em>Firepit</em> a Gas):</strong> $\\$48,000\\text{ MXN}$ ($\\$2,400\\text{ USD}$).</li>\n<li><strong>Jardineras Perimetrales Decorativas:</strong> $\\$21,000\\text{ MXN}$ ($\\$1,050\\text{ USD}$).</li>\n<li><strong>Iluminación Cálida Indirecta y Contactos de Intemperie GFCI:</strong> $\\$90,000\\text{ MXN}$ ($\\$4,500\\text{ USD}$).</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h4>🟣 FASE 4: Ecosistema Solar, Climatización & Domótica Avanzada ($362,000\\text{ MXN}$ / $\\$18,100\\text{ USD}$)</h4>\n<ul>\n<li><strong>Requisito para iniciar:</strong> Juntar <strong>$\\$108,600\\text{ MXN}$</strong> (Anticipo para compra de paneles, inversor y equipos de clima).</li>\n<li><strong>Tiempo de ejecución:</strong> Año 3.</li>\n</ul>\n<p>#### Lista Exacta de Conceptos a Pagar en Fase 4:</p>\n<ol>\n<li><strong>Arreglo Solar Fotovoltaico $3.3\\text{ kWp}$ (6 Paneles 550W + Microinversores):</strong> $\\$78,000\\text{ MXN}$ ($\\$3,900\\text{ USD}$) $\\rightarrow$ Ahorro del 90% en CFE.</li>\n<li><strong>Calentador Solar de Agua ($200\\text{ L}$ con 15 Tubos de Vacío Inox):</strong> $\\$19,000\\text{ MXN}$ ($\\$950\\text{ USD}$) $\\rightarrow$ Ahorro del 80% en gas.</li>\n<li><strong>Sistema Clima Multi-Split Inverter (3 Condensadoras + 4 Evaporadoras):</strong> $\\$98,000\\text{ MXN}$ ($\\$4,900\\text{ USD}$).</li>\n<li><strong>Bomba Presurizadora Inverter Sumergible + Filtro Dual + Lámpara UV:</strong> $\\$34,000\\text{ MXN}$ ($\\$1,700\\text{ USD}$).</li>\n<li><strong>Rack 12U Equipado (Gateway UniFi, Switch PoE+, UPS 1500VA Online, Servidor Home Assistant):</strong> $\\$46,000\\text{ MXN}$ ($\\$2,300\\text{ USD}$).</li>\n<li><strong>Iluminación Inteligente Circadiana COB LED 24V y Sensores mmWave:</strong> $\\$45,000\\text{ MXN}$ ($\\$2,250\\text{ USD}$).</li>\n<li><strong>CCTV 4K con IA Local, Videoportero PoE y Cerradura Biométrica:</strong> $\\$42,000\\text{ MXN}$ ($\\$2,100\\text{ USD}$).</li>\n</ul>", "management": "<h2>Manual de Administración de Obra, Control de Estimaciones y Aseguramiento de Calidad (QA/QC)</h2>\n<p><strong>Proyecto:</strong> Residencia Inteligente en 3 Niveles (153.19 m² Terreno | 235.0 m² Construcción)</p>\n<p><strong>Metodología:</strong> Gestión Constructiva Integral (Lean Construction + PMBOK Residencial + Normativa NMX/RCDF/CFE/CONAGUA)</p>\n<p><strong>Objetivo:</strong> Garantizar el control total de tiempos, presupuesto sin sobrecostos, calidad estructural y habitabilidad progresiva.</p>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>1. Estructura de Desglose de Trabajo (EDT / WBS)</h3>\n<p>La obra se gestiona bajo una jerarquía estricta de 4 niveles:</p>\n<pre><code class=\"language-\">\nNIVEL 1: PROYECTO MAESTRO RESIDENCIA INTELIGENTE (235 m²)\n └── NIVEL 2: FASES PROGRESIVAS (4 Fases)\n      ├── Fase 1: Casa Núcleo Habitable (Meses 1-6 | $1,980,000 MXN)\n      ├── Fase 2: Confort Planta Alta & Cocina (Meses 7-12 | $580,000 MXN)\n      ├── Fase 3: Roof Garden Frontal & Amenidades (Meses 13-18 | $420,000 MXN)\n      └── Fase 4: Ecosistema Solar, Climas & Domótica Pro (Meses 19-24 | $362,000 MXN)\n           └── NIVEL 3: ETAPAS CONSTRUCTIVAS (16 Etapas)\n                └── NIVEL 4: SUB-ETAPAS, HITOS & CHECKLISTS (48 Sub-etapas)\n</code></pre>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>2. Protocolo de Control de Estimaciones y Pago por Destajo</h3>\n<p>Para evitar desvíos financieros y reclamos de mano de obra, <strong>todo pago semanal debe cumplir con este ciclo de 5 pasos</strong>:</p>\n<pre><code class=\"language-\">\n┌───────────────────────────────────────────────────────────────────────────────────────────────────┐\n│                                 CICLO DE LIBERACIÓN DE ESTIMACIONES                               │\n│                                                                                                   │\n│  [1. Medición en Campo] ──► [2. Conciliación PU] ──► [3. Deducciones] ──► [4. Dictamen DRO] ──► [5. Pago]│\n│  (Números Generadores)       (Catálogo Pactado)       (Anticipo + 5% Fondo)  (Firma de Calidad)   (Transfer)│\n└───────────────────────────────────────────────────────────────────────────────────────────────────┘\n</code></pre>\n<h4>Fórmula de Pago Líquido por Estimación Semanal:</h4>\n<p>$$\\text{Monto Neto a Pagar} = \\text{Monto Bruto Estimado} - \\text{Amortización de Anticipo (30\\%)} - \\text{Fondo de Garantía (5\\%)}$$</p>\n<ul>\n<li><strong>Amortización de Anticipo (30%):</strong> Se descuenta en cada semana para recuperar el anticipo entregado al inicio de la fase.</li>\n<li><strong>Fondo de Garantía Retenido (5%):</strong> Se retiene en una cuenta bancaria separada y <strong>solo se devuelve 90 días después de la entrega física</strong>, una vez comprobado que no existen goteras, fisuras o vicios ocultos en instalaciones.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>3. Matriz de Aseguramiento y Control de Calidad (QA/QC)</h3>\n<h4>Criterios de Aceptación y Rechazo por Partida Crítica:</h4>\n<div class=\"table-responsive\"><table class=\"data-table\">\n<thead><tr><th>Partida</th><th>Prueba / Inspección</th><th>Norma / Criterio de Aceptación</th><th>Criterio de Rechazo Inmediato</th></tr></thead><tbody>\n<tr><td><strong>Cimentación & Concreto</strong></td><td>Resistencia a compresión en cilindros a los 7, 14 y 28 días.</td><td>f'c ≥ 250\\text{ kg/cm}^2$ (NMX-C-083). Revenimiento $14 \\pm 3.5\\text{ cm}$.</td><td>f'c < 225\\text{ kg/cm}^2$ o presencia de nidos de grava (coqueras) en armados.</td></tr>\n<tr><td><strong>Estructura & Acero</strong></td><td>Traslapes de varilla corrugada Grado 42 ($fy=4200\\text{ kg/cm}^2$).</td><td>Traslape mínimo de $40 \\times \\text{diámetro}$ de varilla. Recubrimiento libre $≥ 2.5\\text{ cm}$.</td><td>Varillas oxidadas con escamas, traslapes menores a $40Φ$ o varillas pegadas a la cimbra sin calzas.</td></tr>\n<tr><td><strong>Albañilería & Muros</strong></td><td>Plomada, alineamiento y escuadra de muros.</td><td>Desplome máximo $≤ 3\\text{ mm}$ por cada $3\\text{ m}$ de altura. Juntas de mortero de $1.0\\text{ a }1.5\\text{ cm}$.</td><td>Muro desplomado $>5\\text{ mm}$, mortero suelto o castillos sin amarre de estribos.</td></tr>\n<tr><td><strong>Red Hidráulica PPR</strong></td><td>Prueba hidrostática con bomba de prueba.</td><td>Presión sostenida a $10\\text{ bar}$ ($145\\text{ PSI}$) durante <strong>24 horas continuas</strong> sin caída de aguja.</td><td>Caída de presión $>0.2\\text{ bar}$, gotas en uniones termofusionadas.</td></tr>\n<tr><td><strong>Red Sanitaria PVC</strong></td><td>Prueba de humo o columna de agua a tubo lleno.</td><td>Pendiente uniforme del $2\\%$ hacia registro exterior. Sin retorno de olores (CVS funcional).</td><td>Pendientes $<1\\%$, estancamiento de agua o fuga en coples.</td></tr>\n<tr><td><strong>Red Eléctrica & Domótica</strong></td><td>Megger de aislamiento y prueba de resistencia de tierra física.</td><td>Resistencia de aislamiento $>50\\text{ M}Ω$. Resistencia de electrodo de tierra $<5\\text{ }Ω$ (NOM-001).</td><td>Cables sin canalizar, ausencia de neutro en chalupas, tierra $>25\\text{ }Ω$.</td></tr>\n<tr><td><strong>Impermeabilización</strong></td><td>Prueba de estanqueidad (inundación de azotea).</td><td>Diques de arena e inundación de $5\\text{ cm}$ de agua durante <strong>48 horas continuas</strong>.</td><td>Cualquier mancha de humedad o goteo en la cara inferior de la losa.</td></tr>\n</tbody></table></div>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>4. Gestión de Riesgos y Plan de Mitigación</h3>\n<ol>\n<li><strong>Riesgo: Incremento de precios en Acero y Cemento:</strong></li>\n<li><em>Mitigación:</em> Comprar el 100% del acero de la Fase 1 en la Semana 1 con el anticipo y almacenarlo bajo techo elevado sobre tarimas.</li>\n<li><strong>Riesgo: Temporada de Lluvias durante Cimentación:</strong></li>\n<li><em>Mitigación:</em> Excavación por tramos, achique con bomba sumergible, y colado de plantilla de concreto pobre (f'c=100$) el mismo día de la excavación para evitar deslaves.</li>\n<li><strong>Riesgo: Vicios Ocultos en Tuberías Empotradas:</strong></li>\n<li><em>Mitigación:</em> Ninguna ranura o muro se cierra con mortero sin que la prueba hidrostática a 10 bar esté firmada en bitácora por el DRO.</li>\n<li><strong>Riesgo: Abandono de Cuadrilla o Lentitud:</strong></li>\n<li><em>Mitigación:</em> Pago estrictamente por destajo terminado y revisado; nunca pagar por \"día trabajado\" o \"raya\" sin avance cuantificable.</li>\n</ul>\n<hr style=\"border:0; border-top:1px solid var(--color-border); margin:1.5rem 0;\">\n<h3>5. Protocolo de Recepción de Obra y Finiquito</h3>\n<p>Para firmar el <strong>Acta de Entrega-Recepción</strong> de cada fase se deben entregar:</p>\n<ol>\n<li>Planos \"As-Built\" (planos de cómo quedaron realmente las tuberías y cables ocultos con fotos geolocalizadas).</li>\n<li>Carpeta de garantías de equipos (bomba presurizadora, calentador, cerraduras, impermeabilizante).</li>\n<li>Bitácora de Obra foliada con todas las firmas de liberación del DRO.</li>\n<li>Finiquito firmado por el contratista liberando al propietario de cualquier obligación laboral (IMSS/Infonavit).</li>\n</ul>"};

// =========================================================
// MODULE 1: SIMULADOR DE AHORRO, INVERSIÓN & GASTOS
// =========================================================
const DEFAULT_SIM = {
  salaryWeek: 6400,
  expHousing: 5000,
  expUtilities: 1500,
  expFood: 5200,
  expTransport: 2600,
  expPersonal: 3500,
  expBuffer: 1000,
  extraFondo: 50000,
  extraAguinaldo: 25000,
  extraUtilidades: 35000,
  extraBonos: 40000,
  extraPct: 75,
  interestRate: 9.5,
  initCapital: 0
};

function getSimParams() {
  return DB.get('sim_params', DEFAULT_SIM);
}

function saveSimParams(params) {
  DB.set('sim_params', params);
}

function initSimulator() {
  const p = getSimParams();

  const setV = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
  setV('in-salary-week', p.salaryWeek);
  setV('in-exp-housing', p.expHousing);
  setV('in-exp-utilities', p.expUtilities);
  setV('in-exp-food', p.expFood);
  setV('in-exp-transport', p.expTransport);
  setV('in-exp-personal', p.expPersonal);
  setV('in-exp-buffer', p.expBuffer);
  setV('in-extra-fondo', p.extraFondo);
  setV('in-extra-aguinaldo', p.extraAguinaldo);
  setV('in-extra-utilidades', p.extraUtilidades);
  setV('in-extra-bonos', p.extraBonos);
  setV('in-extra-pct', p.extraPct);
  setV('in-interest-rate', p.interestRate);
  setV('in-init-capital', p.initCapital);

  // Attach live calculation listeners to all inputs
  const inputIds = [
    'in-salary-week', 'in-exp-housing', 'in-exp-utilities', 'in-exp-food', 
    'in-exp-transport', 'in-exp-personal', 'in-exp-buffer', 'in-extra-fondo', 
    'in-extra-aguinaldo', 'in-extra-utilidades', 'in-extra-bonos', 'in-extra-pct', 
    'in-interest-rate', 'in-init-capital'
  ];

  inputIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        readAndRunSimulation();
      });
    }
  });

  runSimulation(p);
}

function readAndRunSimulation() {
  const getNum = (id, def=0) => { const el = document.getElementById(id); return el ? (+el.value || 0) : def; };

  const p = {
    salaryWeek:       getNum('in-salary-week', 6400),
    expHousing:       getNum('in-exp-housing', 5000),
    expUtilities:     getNum('in-exp-utilities', 1500),
    expFood:          getNum('in-exp-food', 5200),
    expTransport:     getNum('in-exp-transport', 2600),
    expPersonal:      getNum('in-exp-personal', 3500),
    expBuffer:        getNum('in-exp-buffer', 1000),
    extraFondo:       getNum('in-extra-fondo', 50000),
    extraAguinaldo:   getNum('in-extra-aguinaldo', 25000),
    extraUtilidades:  getNum('in-extra-utilidades', 35000),
    extraBonos:       getNum('in-extra-bonos', 40000),
    extraPct:         getNum('in-extra-pct', 75),
    interestRate:     getNum('in-interest-rate', 9.5),
    initCapital:      getNum('in-init-capital', 0),
  };

  // Update slider text indicators
  const valExtraEl = document.getElementById('val-extra-pct');
  if (valExtraEl) valExtraEl.textContent = p.extraPct + '%';

  const valRateEl = document.getElementById('val-interest-rate');
  if (valRateEl) valRateEl.textContent = p.interestRate.toFixed(1) + '% anual';

  saveSimParams(p);
  runSimulation(p);
}

function runSimulation(p) {
  // 1. Cálculos de Presupuesto Base
  const monthlySalary = (p.salaryWeek * 52) / 12;
  const totalExpenses = p.expHousing + p.expUtilities + p.expFood + p.expTransport + p.expPersonal + p.expBuffer;
  const monthlyOrdinarySaving = Math.max(0, monthlySalary - totalExpenses);
  const weeklySaving = (monthlyOrdinarySaving * 12) / 52;

  const totalExtrasAnnual = p.extraFondo + p.extraAguinaldo + p.extraUtilidades + p.extraBonos;
  const extraAllocatedAnnual = totalExtrasAnnual * (p.extraPct / 100);
  const extraFreeAnnual = totalExtrasAnnual - extraAllocatedAnnual;
  const monthlyExtraAllocated = extraAllocatedAnnual / 12;

  const totalMonthlySavingsPower = monthlyOrdinarySaving + monthlyExtraAllocated;
  const totalAnnualSavingsPower = totalMonthlySavingsPower * 12;

  // Actualizar indicadores del formulario
  const setT = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  setT('calc-salary-month', '=' + fmx(monthlySalary) + '/mes');
  setT('calc-total-expenses', fmx(totalExpenses) + ' MXN');
  setT('calc-monthly-ordinary-saving', fmx(monthlyOrdinarySaving) + ' / mes (~' + fmx(weeklySaving) + '/sem)');
  setT('calc-extra-allocated', 'Aportas ' + fmx(extraAllocatedAnnual) + ' de los ' + fmx(totalExtrasAnnual) + ' extras (te quedan ' + fmx(extraFreeAnnual) + ' para uso libre)');

  // 2. Simulación Proyectada Mes a Mes (24 meses)
  const H1_GOAL = 330000;
  const H2_GOAL = 680000;
  const H3_GOAL = 1165000;

  const monthlyRate = (p.interestRate / 100) / 12;
  const rows = [];

  let balInvested = p.initCapital;
  let balZero = p.initCapital;
  let totalInterest = 0;
  let h1Month = null;
  let h2Month = null;
  let h3Month = null;

  const startDate = new Date();

  for (let m = 1; m <= 36; m++) {
    const curDate = new Date(startDate.getFullYear(), startDate.getMonth() + m, 1);
    const monthName = curDate.toLocaleDateString('es-MX', { month: 'short', year: '2-digit' });
    const calMonth = curDate.getMonth(); // 0 = Ene, 4 = Mayo, 6 = Jul, 11 = Dic

    // Distribución estacional realista de los bonos en México:
    let extraMonth = 0;
    let extraLabel = '';
    if (calMonth === 4) { // Mayo: Utilidades PTU
      extraMonth = p.extraUtilidades * (p.extraPct / 100);
      extraLabel = 'PTU';
    } else if (calMonth === 6) { // Julio: Fondo de Ahorro mitad
      extraMonth = (p.extraFondo * 0.5) * (p.extraPct / 100);
      extraLabel = 'Fondo (1/2)';
    } else if (calMonth === 8) { // Septiembre: Bonos desempeño
      extraMonth = p.extraBonos * (p.extraPct / 100);
      extraLabel = 'Bono';
    } else if (calMonth === 11) { // Diciembre: Aguinaldo + Fondo restante
      extraMonth = (p.extraAguinaldo + (p.extraFondo * 0.5)) * (p.extraPct / 100);
      extraLabel = 'Aguinaldo+Fdo';
    }

    const depositMonth = monthlyOrdinarySaving + extraMonth;
    const interestMonth = balInvested * monthlyRate;

    balInvested += depositMonth + interestMonth;
    balZero += depositMonth;
    totalInterest += interestMonth;

    let hitoTag = '';
    if (!h1Month && balInvested >= H1_GOAL) {
      h1Month = { monthNum: m, date: monthName, totalInterest: totalInterest };
      hitoTag = '🎯 Hito 1 ($330k)';
    }
    if (!h2Month && balInvested >= H2_GOAL) {
      h2Month = { monthNum: m, date: monthName };
      hitoTag = '🏗️ Hito 2 ($680k)';
    }
    if (!h3Month && balInvested >= H3_GOAL) {
      h3Month = { monthNum: m, date: monthName };
      hitoTag = '🏡 Suite PB Lista';
    }

    if (m <= 24) {
      rows.push({
        monthNum: m,
        label: monthName,
        ordinary: monthlyOrdinarySaving,
        extra: extraMonth,
        extraLabel: extraLabel,
        totalDeposit: depositMonth,
        interest: interestMonth,
        balInvested: balInvested,
        balZero: balZero,
        gain: balInvested - balZero,
        hito: hitoTag
      });
    }
  }

  // Si Hito 1 no se alcanzó en 36 meses
  const h1MonthsDisplay = h1Month ? h1Month.monthNum + ' Meses' : '+36 Meses';
  const h1DateDisplay = h1Month ? 'Llegada estimada: ' + h1Month.date : 'Ajusta tu ahorro';
  const interestAtH1 = h1Month ? fmx(h1Month.totalInterest) : fmx(totalInterest);

  // Cuánto tiempo para la casa completa
  let fullHouseDisplay = '—';
  if (h3Month) {
    const yrs = (h3Month.monthNum / 12).toFixed(1);
    fullHouseDisplay = yrs + ' Años (' + h3Month.date + ')';
  } else {
    const estMonths = Math.ceil((H3_GOAL - p.initCapital) / (totalMonthlySavingsPower * 1.05));
    fullHouseDisplay = (estMonths / 12).toFixed(1) + ' Años';
  }

  // Actualizar Tarjetas KPI de la Simulación
  setT('sim-kpi-h1-months', h1MonthsDisplay);
  setT('sim-kpi-h1-date', h1DateDisplay);
  setT('sim-kpi-annual-savings', fmx(totalAnnualSavingsPower) + ' MXN');
  setT('sim-kpi-monthly-avg', 'Aprox. ' + fmx(totalMonthlySavingsPower) + ' MXN / mes');
  setT('sim-kpi-interest-earned', '+' + interestAtH1 + ' MXN');
  setT('sim-kpi-full-house', fullHouseDisplay);

  // Actualizar Header KPIs
  setT('hdr-monthly-cap', fmx(totalMonthlySavingsPower) + ' MXN');
  setT('hdr-eta', h1MonthsDisplay);

  // Renderizar Gráfico de Barras Compuesto
  renderCompoundChart(rows, H1_GOAL);

  // Renderizar Tabla Mes a Mes
  renderSimulationTable(rows);
}

function renderCompoundChart(rows, h1Goal) {
  const chart = document.getElementById('sim-chart-bars');
  if (!chart) return;

  const maxVal = Math.max(h1Goal * 1.15, ...rows.map(r => r.balInvested));

  chart.innerHTML = rows.map(r => {
    const totalHeightPct = Math.min(100, Math.max(6, (r.balInvested / maxVal) * 100));
    const interestRatio = r.balInvested > 0 ? (r.gain / r.balInvested) : 0;
    const interestHeightPct = totalHeightPct * interestRatio;
    const capitalHeightPct = totalHeightPct - interestHeightPct;

    const isReached = r.balInvested >= h1Goal;

    return `
      <div class="compound-bar-wrap ${isReached ? 'reached-h1' : ''}" title="${r.label}: ${fmx(r.balInvested)} (Interés: ${fmx(r.gain)})">
        <div class="compound-bar-stack" style="height: ${totalHeightPct}%;">
          <div class="cbar-invested" style="height: ${(capitalHeightPct / totalHeightPct) * 100}%;"></div>
          <div class="cbar-interest" style="height: ${(interestHeightPct / totalHeightPct) * 100}%;"></div>
        </div>
        <div class="cbar-label">${r.label}</div>
      </div>
    `;
  }).join('');
}

function renderSimulationTable(rows) {
  const tbody = document.getElementById('sim-table-body');
  if (!tbody) return;

  tbody.innerHTML = rows.map(r => `
    <tr>
      <td><strong>${r.label}</strong></td>
      <td>${fmx(r.ordinary)}</td>
      <td>${r.extra > 0 ? `<span class="badge badge-warning">${fmx(r.extra)} (${r.extraLabel})</span>` : '—'}</td>
      <td class="text-success font-mono">${fmx(r.totalDeposit)}</td>
      <td class="text-warning font-mono">+${fmx(r.interest)}</td>
      <td><strong style="color:var(--text-main); font-family:var(--font-mono);">${fmx(r.balInvested)}</strong></td>
      <td style="color:var(--text-muted); font-family:var(--font-mono);">${fmx(r.balZero)}</td>
      <td class="text-success font-mono"><strong>+${fmx(r.gain)}</strong></td>
      <td>${r.hito ? `<span class="badge badge-success">${r.hito}</span>` : '—'}</td>
    </tr>
  `).join('');
}

// =========================================================
// MODULE 2: MIS BÓVEDAS & REGISTRO REAL
// =========================================================
function initVaultsModule() {
  const dateEl = document.getElementById('reg-date');
  if (dateEl) dateEl.value = today();

  document.getElementById('btn-save-movement')?.addEventListener('click', () => {
    const date   = document.getElementById('reg-date').value;
    const vault  = document.getElementById('reg-vault').value;
    const type   = document.getElementById('reg-type').value;
    const amount = +document.getElementById('reg-amount').value || 0;
    const note   = document.getElementById('reg-note').value.trim();

    if (!date || amount <= 0) {
      showToast('⚠️ Ingresa una fecha y monto válido', 'warning');
      return;
    }

    const movs = DB.get('movements', []);
    movs.push({ id: Date.now(), date, vault, type, amount, note });
    movs.sort((a, b) => b.date.localeCompare(a.date));
    DB.set('movements', movs);

    document.getElementById('reg-amount').value = '';
    document.getElementById('reg-note').value = '';

    renderVaults();
    showToast('✅ Movimiento registrado en bóveda');
  });

  document.getElementById('btn-clear-movements')?.addEventListener('click', () => {
    if (confirm('¿Deseas limpiar todo el historial de movimientos de bóvedas?')) {
      DB.set('movements', []);
      renderVaults();
    }
  });

  renderVaults();
}

function renderVaults() {
  const movs = DB.get('movements', []);

  // Calcular saldos
  const balances = { cetes: 0, sofipo: 0, emergency: 0 };
  movs.forEach(m => {
    if (m.type === 'retiro') balances[m.vault] -= m.amount;
    else balances[m.vault] += m.amount;
  });

  const totalVaults = balances.cetes + balances.sofipo + balances.emergency;

  // Actualizar tarjetas de bóvedas
  const setT = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  setT('vbal-cetes', fmx(balances.cetes) + ' MXN');
  setT('vbal-sofipo', fmx(balances.sofipo) + ' MXN');
  setT('vbal-emergency', fmx(balances.emergency) + ' MXN');

  // Actualizar Header KPI
  setT('hdr-capital', fmx(totalVaults) + ' MXN');

  // Actualizar barra de avance en tab Hitos
  const HITO_FULL = 1165000;
  const pct = Math.min(100, Math.round((totalVaults / HITO_FULL) * 100));
  setT('hitos-overall-pct', pct + '%');
  setT('hitos-overall-amount', fmx(totalVaults) + ' de ' + fmx(HITO_FULL));
  const barEl = document.getElementById('hitos-overall-bar');
  if (barEl) barEl.style.width = pct + '%';

  // Tabla de historial
  const tbody = document.getElementById('movements-table-body');
  if (!tbody) return;

  if (!movs.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Sin movimientos registrados aún. ¡Agrega tu primer depósito!</td></tr>';
    return;
  }

  const vaultNames = { cetes: '🏛️ Cetesdirecto', sofipo: '⚡ Finsus / SOFIPO', emergency: '🛡️ Emergencia' };
  const typeLabels = {
    ahorro: '<span class="badge badge-success">Ahorro Semanal</span>',
    extra: '<span class="badge badge-warning">Bono / Extra</span>',
    rendimiento: '<span class="badge badge-primary">Rendimiento</span>',
    retiro: '<span class="badge badge-danger">Retiro</span>'
  };

  tbody.innerHTML = movs.map(m => `
    <tr>
      <td><strong>${m.date}</strong></td>
      <td>${vaultNames[m.vault] || m.vault}</td>
      <td>${typeLabels[m.type] || m.type}</td>
      <td class="${m.type === 'retiro' ? 'text-danger' : 'text-success'} font-mono">${m.type === 'retiro' ? '-' : '+'}${fmx(m.amount)}</td>
      <td style="color:var(--text-muted);">${m.note || '—'}</td>
      <td><button onclick="deleteMovement(${m.id})" style="background:none;border:none;cursor:pointer;" title="Eliminar">🗑️</button></td>
    </tr>
  `).join('');
}

window.deleteMovement = function(id) {
  if (!confirm('¿Eliminar este movimiento?')) return;
  const movs = DB.get('movements', []).filter(m => m.id !== id);
  DB.set('movements', movs);
  renderVaults();
};

// =========================================================
// MODULE 3: HITOS SUITE PB (78.36 m²)
// =========================================================
function initHitosModule() {
  const saved = DB.get('pb_hitos', {});
  document.querySelectorAll('.hito-checkbox').forEach(chk => {
    const id = chk.id.replace('chk-', '');
    chk.checked = !!saved[id];
  });
}

window.togglePBHito = function(id, checked) {
  const saved = DB.get('pb_hitos', {});
  saved[id] = checked;
  DB.set('pb_hitos', saved);
};

// =========================================================
// MODULE 4: BLUEPRINT VIEWER & INTERACTION
// =========================================================
function renderFloor(floorKey) {
  const display = document.getElementById('blueprint-display');
  const terrainWrapper = document.getElementById('terrain-svg-wrapper');
  if (!display) return;

  currentFloor = floorKey;
  if (floorKey === 'pb') display.innerHTML = getGroundFloorSVG();
  else if (floorKey === 'pa') display.innerHTML = getUpperFloorSVG();
  else if (floorKey === 'ext') display.innerHTML = getExteriorRoofSVG();

      if (terrainWrapper && !terrainWrapper.hasChildNodes()) {
    terrainWrapper.innerHTML = `<svg viewBox="0 0 940 400" width="100%" height="230" xmlns="http://www.w3.org/2000/svg" style="background:#080e1e; border-radius:8px;">
      <!-- Calle pegada al Oriente / Este -->
      <polygon points="630,70 760,70 718,330 588,330" fill="#0f172a" stroke="#1e293b" stroke-width="1.2"/>
      <line x1="695" y1="70" x2="653" y2="330" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="8,4" stroke-opacity="0.7"/>
      <text x="680" y="200" font-size="8" font-weight="900" font-family="'JetBrains Mono', monospace" fill="#fbbf24" text-anchor="middle" transform="rotate(97, 680, 200)">CALLE DE ACCESO (ESTE)</text>

      <!-- Polígono Principal del Terreno (153.19 m²) -->
      <polygon points="100,70 630,70 588,330 100,324" fill="#0d1f3d" stroke="#38bdf8" stroke-width="2.5"/>

      <!-- Servidumbre Trasera (3.00 m en Fondo Poniente) -->
      <polygon points="100,70 200,70 200,325.1 100,324" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="150" y="200" font-size="8" font-weight="800" fill="#34d399" text-anchor="middle" transform="rotate(-90, 150, 200)">SERV. TRASERA (3.00 m)</text>

      <!-- Área Construible en medio -->
      <polygon points="200,70 545,70 505,328.5 200,325.1" fill="#0284c7" fill-opacity="0.1" stroke="#0284c7" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="360" y="195" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle">ÁREA CONSTRUIBLE (98.3 m²)</text>
      <text x="360" y="212" font-size="8.5" font-family="'JetBrains Mono', monospace" fill="#38bdf8" text-anchor="middle">Norte: 10.22 m • Sur: 8.97 m</text>

      <!-- Servidumbre Delantera 2.50m (Arriate 0.6m + Banqueta 0.9m + Franja 1.0m) -->
      <!-- Franja interior (1.00 m) -->
      <polygon points="545,70 580,70 540,330 505,328.5" fill="#fbbf24" fill-opacity="0.1" stroke="#fbbf24" stroke-width="1" stroke-dasharray="3,3"/>
      
      <!-- Banqueta (0.90 m) -->
      <polygon points="580,70 610,70 570,330 540,330" fill="#1e293b" fill-opacity="0.6" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="560" y="200" font-size="7" font-weight="700" fill="#cbd5e1" text-anchor="middle" transform="rotate(97, 560, 200)">BANQUETA 0.9m</text>

      <!-- Arriate (0.60 m pegado a calle) -->
      <polygon points="610,70 630,70 588,330 570,330" fill="#065f46" fill-opacity="0.6" stroke="#10b981" stroke-width="1"/>
      <text x="600" y="200" font-size="7" font-weight="800" fill="#34d399" text-anchor="middle" transform="rotate(97, 600, 200)">ARRIATE 0.6m</text>

      <!-- Línea Límite Servidumbre 2.50m -->
      <line x1="545" y1="58" x2="505" y2="342" stroke="#fbbf24" stroke-width="1.8" stroke-dasharray="6,4"/>

      <!-- Cotas Linderos y Desgloses -->
      <!-- Norte Total y Libre -->
      <text x="365" y="38" font-size="10" font-weight="900" font-family="'JetBrains Mono', monospace" fill="#38bdf8" text-anchor="middle">L1-2 (NORTE): 15.74 m</text>
      <text x="365" y="55" font-size="8.5" font-weight="800" font-family="'JetBrains Mono', monospace" fill="#ffffff" text-anchor="middle">[ Trasera: 3.0m | LIBRE: 10.22 m | Delantera: 2.5m ]</text>

      <!-- Sur Total y Libre -->
      <text x="345" y="360" font-size="8.5" font-weight="800" font-family="'JetBrains Mono', monospace" fill="#ffffff" text-anchor="middle">[ Trasera: 3.0m | LIBRE: 8.97 m | Delantera: 2.5m ]</text>
      <text x="345" y="378" font-size="10" font-weight="900" font-family="'JetBrains Mono', monospace" fill="#38bdf8" text-anchor="middle">L3-4 (SUR): 14.49 m</text>

      <text x="50" y="200" font-size="9.5" font-weight="900" font-family="'JetBrains Mono', monospace" fill="#38bdf8" text-anchor="middle" transform="rotate(-90, 50, 200)">L4-1 (FONDO): 10.04 m</text>
      <text x="615" y="358" font-size="9.5" font-weight="900" font-family="'JetBrains Mono', monospace" fill="#fbbf24" text-anchor="middle">L2-3 (FRENTE ESTE): 10.30 m</text>

      <!-- Vértices -->
      <circle cx="100" cy="70" r="3.5" fill="#fbbf24"/>
      <text x="90" y="62" font-size="8.5" font-weight="900" fill="#fbbf24">P1 (90°)</text>
      <circle cx="630" cy="70" r="3.5" fill="#10b981"/>
      <text x="638" y="62" font-size="8.5" font-weight="900" fill="#10b981">P2 (83°)</text>
      <circle cx="588" cy="330" r="3.5" fill="#38bdf8"/>
      <text x="596" y="342" font-size="8.5" font-weight="900" fill="#38bdf8">P3 (96°)</text>
      <circle cx="100" cy="324" r="3.5" fill="#ec4899"/>
      <text x="88" y="340" font-size="8.5" font-weight="900" fill="#ec4899">P4 (91°)</text>
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
      g.addEventListener('mouseenter', () => g.style.filter = 'brightness(0.85) drop-shadow(0 0 6px rgba(59,130,246,0.8))');
      g.addEventListener('mouseleave', () => g.style.filter = '');
      g.addEventListener('click', e => { e.stopPropagation(); showRoomDetails(floorKey, g.id); });
    }
  });

  // Mostrar automáticamente el Home Office por defecto en PB
  if (floorKey === 'pb') {
    showRoomDetails('pb', 'escalera-confinada-sin-invasion');
  }
}

function showRoomDetails(floorKey, roomId) {
  const room = (blueprintData[floorKey] || []).find(r => r.id === roomId);
  if (!room) return;
  const nameEl  = document.getElementById('room-name');
  const badgeEl = document.getElementById('room-badge');
  const specsEl = document.getElementById('room-specs');

  if (nameEl)  nameEl.textContent  = room.name;
  if (badgeEl) badgeEl.textContent = floorKey === 'pb' ? 'Planta Baja' : floorKey === 'pa' ? 'Planta Alta' : 'Roof Garden';
  if (specsEl) {
    const tags = (room.tags || []).map(t => `<span class="badge badge-primary" style="margin:2px;">${t}</span>`).join('');
    const specs = room.specs ? Object.entries(room.specs).map(([k, v]) => `
      <div style="margin-top:8px; font-size:0.83rem; line-height:1.4;">
        <strong style="color:var(--text-main);">${k}:</strong> 
        <span style="color:var(--text-muted);">${v}</span>
      </div>
    `).join('') : '';
    specsEl.innerHTML = tags + specs;
  }
}

function initBlueprintModule() {
  document.querySelectorAll('.level-selector .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.level-selector .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderFloor(btn.dataset.floor);
    });
  });
}

// =========================================================
// MODULE 5: DOCS VIEWER
// =========================================================
function initDocsModule() {
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
// NAVIGATION & GLOBAL TOASTS
// =========================================================
function initNavigation() {
  const btns = document.querySelectorAll('.nav-btn');
  const tabs = document.querySelectorAll('.tab-content');

  function switchTab(tabId) {
    btns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    tabs.forEach(t => t.classList.toggle('active', t.id === 'sec-' + tabId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (tabId === 'planos') renderFloor(currentFloor);
  }

  btns.forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
  window.appNavTo = (id) => switchTab(id);
}

function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `
    position:fixed; bottom:1.5rem; right:1.5rem; z-index:9999;
    background:${type === 'warning' ? '#92400e' : '#065f46'};
    color:#fff; padding:0.65rem 1.25rem; border-radius:10px;
    font-size:0.85rem; font-weight:700;
    box-shadow:0 4px 20px rgba(0,0,0,0.4);
    animation: fadeIn 0.2s ease;
  `;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// =========================================================
// DOM CONTENT LOADED INITIALIZATION
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSimulator();
  initVaultsModule();
  initHitosModule();
  initBlueprintModule();
  initDocsModule();
});
