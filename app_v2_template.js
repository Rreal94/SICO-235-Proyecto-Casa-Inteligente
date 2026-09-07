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
// __GROUND_FLOOR_SVG__

// __UPPER_FLOOR_SVG__

// __EXTERIOR_ROOF_SVG__

// =========================================================
// DOCS CONTENT INJECTION (Generated)
// =========================================================
// __DOCS_CONTENT__

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
    terrainWrapper.innerHTML = `<svg viewBox="0 0 920 380" width="100%" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#070d1e; border-radius:8px;">
      <!-- Retícula tenue -->
      <line x1="60" y1="50" x2="60" y2="330" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,4"/>
      
      <!-- Polígono del Terreno (153.19 m²) -->
      <polygon points="100,60 630,60 588,320 100,314" fill="#0d1f3d" stroke="#38bdf8" stroke-width="2.5"/>

      <!-- Servidumbre Trasera (3.00 m) -->
      <polygon points="100,60 200,60 200,315.1 100,314" fill="#10b981" fill-opacity="0.18" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="150" y="190" font-size="9" font-weight="800" fill="#34d399" text-anchor="middle" transform="rotate(-90, 150, 190)">SERV. TRASERA (3.00 m)</text>

      <!-- Huella Construcción PB (78.36 m²) -->
      <polygon points="200,70 475,70 475,305 200,305" fill="#0284c7" fill-opacity="0.25" stroke="#38bdf8" stroke-width="2"/>
      <text x="337" y="185" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle">HUELLA PB (78.36 m²)</text>
      <text x="337" y="202" font-size="8.5" fill="#94a3b8" text-anchor="middle">C.O.S. = 51.1% (Máx 70%)</text>

      <!-- Servidumbre Delantera (2.50 m Oblicua siguiendo L2-3) -->
      <polygon points="545,60 630,60 588,320 505,318.5" fill="#fbbf24" fill-opacity="0.18" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="565" y="190" font-size="8.5" font-weight="800" fill="#fbbf24" text-anchor="middle" transform="rotate(97, 565, 190)">SERV. DELANTERA (2.50 m)</text>

      <!-- Vialidad al Este: Banqueta, Arriate y Calle -->
      <!-- Banqueta (1.50 m) -->
      <polygon points="630,60 680,60 638,320 588,320" fill="#1e293b" fill-opacity="0.6" stroke="#64748b" stroke-width="1"/>
      <text x="635" y="190" font-size="7.5" font-weight="700" fill="#cbd5e1" text-anchor="middle" transform="rotate(97, 635, 190)">BANQUETA (1.50m)</text>

      <!-- Arriate (0.80 m) -->
      <polygon points="680,60 707,60 665,320 638,320" fill="#065f46" fill-opacity="0.5" stroke="#10b981" stroke-width="1"/>
      <circle cx="692" cy="110" r="6" fill="#10b981"/>
      <circle cx="653" cy="270" r="6" fill="#10b981"/>

      <!-- Arroyo de Calle y Eje -->
      <polygon points="707,60 860,60 818,320 665,320" fill="#0f172a" stroke="#334155" stroke-width="1"/>
      <line x1="770" y1="60" x2="728" y2="320" stroke="#fbbf24" stroke-width="1.8" stroke-dasharray="8,4"/>
      <text x="755" y="190" font-size="8" font-weight="800" fill="#fbbf24" text-anchor="middle" transform="rotate(97, 755, 190)">EJE DE CALLE (ESTE)</text>

      <!-- Cotas Linderos -->
      <text x="365" y="45" font-size="10.5" font-weight="900" fill="#38bdf8" text-anchor="middle">L1-2 (NORTE): 15.74 m</text>
      <text x="345" y="340" font-size="10.5" font-weight="900" fill="#38bdf8" text-anchor="middle">L3-4 (SUR): 14.49 m</text>
      <text x="50" y="190" font-size="10" font-weight="900" fill="#38bdf8" text-anchor="middle" transform="rotate(-90, 50, 190)">L4-1 (FONDO): 10.04 m</text>
      <text x="615" y="348" font-size="10" font-weight="900" fill="#fbbf24" text-anchor="middle">L2-3 (FRENTE ESTE): 10.30 m</text>

      <!-- Vértices -->
      <circle cx="100" cy="60" r="4" fill="#fbbf24"/>
      <text x="90" y="52" font-size="9" font-weight="900" fill="#fbbf24">P1 (90°)</text>
      <circle cx="630" cy="60" r="4" fill="#10b981"/>
      <text x="640" y="52" font-size="9" font-weight="900" fill="#10b981">P2 (83°)</text>
      <circle cx="588" cy="320" r="4" fill="#38bdf8"/>
      <text x="598" y="332" font-size="9" font-weight="900" fill="#38bdf8">P3 (96°)</text>
      <circle cx="100" cy="314" r="4" fill="#ec4899"/>
      <text x="88" y="330" font-size="9" font-weight="900" fill="#ec4899">P4 (91°)</text>
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
