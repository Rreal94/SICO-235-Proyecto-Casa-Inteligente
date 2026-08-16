# Manual de Administración de Obra, Control de Estimaciones y Aseguramiento de Calidad (QA/QC)

**Proyecto:** Residencia Inteligente en 3 Niveles ($153.19\text{ m}^2$ Terreno | $235.0\text{ m}^2$ Construcción)  
**Metodología:** Gestión Constructiva Integral (Lean Construction + PMBOK Residencial + Normativa NMX/RCDF/CFE/CONAGUA)  
**Objetivo:** Garantizar el control total de tiempos, presupuesto sin sobrecostos, calidad estructural y habitabilidad progresiva.

---

## 1. Estructura de Desglose de Trabajo (EDT / WBS)

La obra se gestiona bajo una jerarquía estricta de 4 niveles:
```
NIVEL 1: PROYECTO MAESTRO RESIDENCIA INTELIGENTE (235 m²)
 └── NIVEL 2: FASES PROGRESIVAS (4 Fases)
      ├── Fase 1: Casa Núcleo Habitable (Meses 1-6 | $1,980,000 MXN)
      ├── Fase 2: Confort Planta Alta & Cocina (Meses 7-12 | $580,000 MXN)
      ├── Fase 3: Roof Garden Frontal & Amenidades (Meses 13-18 | $420,000 MXN)
      └── Fase 4: Ecosistema Solar, Climas & Domótica Pro (Meses 19-24 | $362,000 MXN)
           └── NIVEL 3: ETAPAS CONSTRUCTIVAS (16 Etapas)
                └── NIVEL 4: SUB-ETAPAS, HITOS & CHECKLISTS (48 Sub-etapas)
```

---

## 2. Protocolo de Control de Estimaciones y Pago por Destajo

Para evitar desvíos financieros y reclamos de mano de obra, **todo pago semanal debe cumplir con este ciclo de 5 pasos**:

```
┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 CICLO DE LIBERACIÓN DE ESTIMACIONES                               │
│                                                                                                   │
│  [1. Medición en Campo] ──► [2. Conciliación PU] ──► [3. Deducciones] ──► [4. Dictamen DRO] ──► [5. Pago]│
│  (Números Generadores)       (Catálogo Pactado)       (Anticipo + 5% Fondo)  (Firma de Calidad)   (Transfer)│
└───────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Fórmula de Pago Líquido por Estimación Semanal:
$$\text{Monto Neto a Pagar} = \text{Monto Bruto Estimado} - \text{Amortización de Anticipo (30\%)} - \text{Fondo de Garantía (5\%)}$$

* **Amortización de Anticipo (30%):** Se descuenta en cada semana para recuperar el anticipo entregado al inicio de la fase.
* **Fondo de Garantía Retenido (5%):** Se retiene en una cuenta bancaria separada y **solo se devuelve 90 días después de la entrega física**, una vez comprobado que no existen goteras, fisuras o vicios ocultos en instalaciones.

---

## 3. Matriz de Aseguramiento y Control de Calidad (QA/QC)

### Criterios de Aceptación y Rechazo por Partida Crítica:

| Partida | Prueba / Inspección | Norma / Criterio de Aceptación | Criterio de Rechazo Inmediato |
| :--- | :--- | :--- | :--- |
| **Cimentación & Concreto** | Resistencia a compresión en cilindros a los 7, 14 y 28 días. | $f\x27c \ge 250\text{ kg/cm}^2$ (NMX-C-083). Revenimiento $14 \pm 3.5\text{ cm}$. | $f\x27c < 225\text{ kg/cm}^2$ o presencia de nidos de grava (coqueras) en armados. |
| **Estructura & Acero** | Traslapes de varilla corrugada Grado 42 ($fy=4200\text{ kg/cm}^2$). | Traslape mínimo de $40 \times \text{diámetro}$ de varilla. Recubrimiento libre $\ge 2.5\text{ cm}$. | Varillas oxidadas con escamas, traslapes menores a $40\Phi$ o varillas pegadas a la cimbra sin calzas. |
| **Albañilería & Muros** | Plomada, alineamiento y escuadra de muros. | Desplome máximo $\le 3\text{ mm}$ por cada $3\text{ m}$ de altura. Juntas de mortero de $1.0\text{ a }1.5\text{ cm}$. | Muro desplomado $>5\text{ mm}$, mortero suelto o castillos sin amarre de estribos. |
| **Red Hidráulica PPR** | Prueba hidrostática con bomba de prueba. | Presión sostenida a $10\text{ bar}$ ($145\text{ PSI}$) durante **24 horas continuas** sin caída de aguja. | Caída de presión $>0.2\text{ bar}$, gotas en uniones termofusionadas. |
| **Red Sanitaria PVC** | Prueba de humo o columna de agua a tubo lleno. | Pendiente uniforme del $2\%$ hacia registro exterior. Sin retorno de olores (CVS funcional). | Pendientes $<1\%$, estancamiento de agua o fuga en coples. |
| **Red Eléctrica & Domótica** | Megger de aislamiento y prueba de resistencia de tierra física. | Resistencia de aislamiento $>50\text{ M}\Omega$. Resistencia de electrodo de tierra $<5\text{ }\Omega$ (NOM-001). | Cables sin canalizar, ausencia de neutro en chalupas, tierra $>25\text{ }\Omega$. |
| **Impermeabilización** | Prueba de estanqueidad (inundación de azotea). | Diques de arena e inundación de $5\text{ cm}$ de agua durante **48 horas continuas**. | Cualquier mancha de humedad o goteo en la cara inferior de la losa. |

---

## 4. Gestión de Riesgos y Plan de Mitigación

1. **Riesgo: Incremento de precios en Acero y Cemento:**
   * *Mitigación:* Comprar el 100% del acero de la Fase 1 en la Semana 1 con el anticipo y almacenarlo bajo techo elevado sobre tarimas.
2. **Riesgo: Temporada de Lluvias durante Cimentación:**
   * *Mitigación:* Excavación por tramos, achique con bomba sumergible, y colado de plantilla de concreto pobre ($f\x27c=100$) el mismo día de la excavación para evitar deslaves.
3. **Riesgo: Vicios Ocultos en Tuberías Empotradas:**
   * *Mitigación:* Ninguna ranura o muro se cierra con mortero sin que la prueba hidrostática a 10 bar esté firmada en bitácora por el DRO.
4. **Riesgo: Abandono de Cuadrilla o Lentitud:**
   * *Mitigación:* Pago estrictamente por destajo terminado y revisado; nunca pagar por "día trabajado" o "raya" sin avance cuantificable.

---

## 5. Protocolo de Recepción de Obra y Finiquito

Para firmar el **Acta de Entrega-Recepción** de cada fase se deben entregar:
1. Planos "As-Built" (planos de cómo quedaron realmente las tuberías y cables ocultos con fotos geolocalizadas).
2. Carpeta de garantías de equipos (bomba presurizadora, calentador, cerraduras, impermeabilizante).
3. Bitácora de Obra foliada con todas las firmas de liberación del DRO.
4. Finiquito firmado por el contratista liberando al propietario de cualquier obligación laboral (IMSS/Infonavit).
