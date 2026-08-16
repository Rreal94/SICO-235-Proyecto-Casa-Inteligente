# Proyecto Ejecutivo de Instalaciones Hidrosanitarias & Drenaje Pluvial

**Proyecto:** Residencia Domótica Inteligente ($153.19\text{ m}^2$ Terreno | $\approx 235\text{ m}^2$ Construcción en 3 Niveles)  
**Normativas de Cumplimiento:** NOM-001-CONAGUA-2011, Manual de Instalaciones Hidráulicas y Sanitarias (Criterios Neufert & Hunter).

---

## 1. Planos Técnicos Generados

* 📐 **[Plano Isométrico e Hidráulico Solar](file:///home/olethros1318/Escritorio/Proyecto_Casa_Inteligente/planos_y_diagramas/01_plano_isometrico_hidraulico_y_solar.svg)**
* 📐 **[Plano de Red Sanitaria, Ventilación y Pluvial](file:///home/olethros1318/Escritorio/Proyecto_Casa_Inteligente/planos_y_diagramas/02_plano_red_sanitaria_y_pluvial.svg)**

---

## 2. Memorias de Cálculo y Dimensionamiento

### 2.1. Cálculo de Demanda de Agua Potable Diaria
* **Ocupación:** 6 personas (Familia + Visitas).
* **Dotación Reglamentaria:** $200\text{ L/habitante/día}$.
* **Demanda Diaria Total:** $6 \times 200 = 1,200\text{ L/día}$.
* **Reserva de Emergencia (Cisterna):** $1,200\text{ L/día} \times 4\text{ días de autonomía} = 4,800\text{ L} \rightarrow$ **Cisterna Seleccionada: $5,000\text{ L}$**.

---

### 2.2. Sistema de Presurización Inverter
* **Bomba Sumergible Multietapas Inverter (Frecuencia Variable):**
  * **Caudal Nominal:** $60\text{ L/min}$ a $3.5\text{ bar}$ ($50\text{ PSI}$).
  * **Ventaja Inverter:** Solo consume la energía exacta requerida según cuántas llaves o regaderas estén abiertas; nivel de ruido $< 35\text{ dB}$ (inapreciable desde el interior).
  * **Filtración y Purificación:** Filtro de sedimentos de $5\,\mu\text{m}$, filtro de bloque de carbón activado y esterilizador de luz ultravioleta ($12\text{ GPM}$) garantizando agua potable en toda la casa.

---

### 2.3. Sistema Solar Térmico y Calentamiento Híbrido
* **Calentador Solar de Tubos de Vacío ($200\text{ L}$):**
  * 15 tubos de borosilicato tricapa ($58\text{ mm} \times 1,800\text{ mm}$) orientados al Sur con inclinación de $45^\circ$.
  * Temperatura de entrega promedio: $65^\circ\text{C}$ a $80^\circ\text{C}$.
* **Válvula Desviadora Termostática Inteligente (Bypass):**
  * Si el agua solar $\ge 42^\circ\text{C} \rightarrow$ Pasa directa al consumo (ahorro 100% de gas).
  * Si el agua solar $< 42^\circ\text{C} \rightarrow$ Pasa a través del calentador instantáneo modulante de respaldo para complementar los grados faltantes.
* **Anillo de Recirculación Inteligente:**
  * Tubería de retorno de $1/2"$ desde los baños de PA y Suite PB con bomba circuladora de $12\text{W}$ activada por los sensores de presencia mmWave de Home Assistant.

---

## 3. Red Sanitaria y Ventilación

### 3.1. Separación de Aguas y Diámetros Nominales
1. **Aguas Negras (BSN):**
   * Tubería de PVC Sanitario de $4"$ ($110\text{ mm}$) con pendiente mínima del $2.0\%$.
   * Descarga directa de inodoros con codos a $45^\circ$ hacia el registro principal.
2. **Aguas Grises / Jabonosas (BSG):**
   * Tubería de PVC Sanitario de $3"$ y $2"$ desde regaderas, lavamanos, vertedero de zinc y lavandería.
   * Trampa de grasas hermética bajo la tarja de cocina y trampa de pelusas en lavandería.
3. **Columna de Ventilación Sanitaria (CVS):**
   * Tubería vertical de PVC de $2"$ ($50\text{ mm}$) que corre por el shaft y remata en azotea a $+7.20\text{ m}$ con sombrero chino.
   * **Función Clave:** Equilibra las presiones hidrostáticas, evita que las trampas 'P' se vacíen por sifonamiento y expulsa los gases sanitarios al exterior.

---

## 4. Drenaje Pluvial y Captación de Lluvia

* **Pendientes de Losa:** $2.0\%$ hacia los embudos pluviales esquineros de azotea.
* **Bajadas de Agua Pluvial (BAP):** Tubería de PVC de $4"$ que baja oculta en muros y pasa por filtro interceptor de hojas y sedimentos antes de descargar en el jardín o drenaje pluvial.
