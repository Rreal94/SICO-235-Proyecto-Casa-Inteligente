# Proyecto Ejecutivo de Ingenierías MEP & Domótica Integrada

**Residencia Inteligente:** Terreno $153.19\text{ m}^2$ | Construcción $\approx 235\text{ m}^2$ (3 Niveles)  
**Normativas Aplicables:** NOM-001-SEDE-2012 (Instalaciones Eléctricas), NOM-008-SCFI, Criterios ASHRAE / IEEE 802.11be (Wi-Fi 7) / Zigbee 3.0 / Matter over Thread.

---

## 1. Cuadro de Cargas y Diseño Eléctrico (220V / 110V Bifásico)

### 1.1. Centro de Carga Principal (QO-24 en Cuarto de Máquinas de PB)
* **Acometida Eléctrica:** Bifásica 2F-3H (Fase 1, Fase 2, Neutro y Tierra Física Calibre 4 AWG).
* **Medidor:** Bidireccional CFE con conexión al inversor solar fotovoltaico ($3.3\text{ kWp}$).
* **Sistema de Puesta a Tierra:** 2 Electrodos de cobre Copperweld ($5/8" \times 3.00\text{ m}$) con pozo de registro, compuesto mejorador y barra colectora equipotencial en el Rack.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        TABLERO DE DISTRIBUCIÓN PRINCIPAL (QO-24)                       │
├────┬─────────────────────────────┬───────────┬─────────┬──────────────┬────────────────┤
│ Ckt│ Descripción                 │ Tensión   │ Amperaje│ Calibre Cable│ Protección / GF│
├────┼─────────────────────────────┼───────────┼─────────┼──────────────┼────────────────┤
│ 1-2│ Cargador Vehículo Eléctrico │ 240V (2F) │ 40 A    │ 2x 8 AWG + T │ Termomagnético │
│ 3-4│ Climas Inverter Master & PB │ 240V (2F) │ 30 A    │ 2x 10 AWG + T│ Termomagnético │
│ 5-6│ Climas Inverter Secundarias │ 240V (2F) │ 20 A    │ 2x 12 AWG + T│ Termomagnético │
│ 7  │ Rack Domótico & Servidores  │ 120V (1F) │ 20 A    │ 12 AWG + T   │ UPS Online Doble│
│ 8  │ Bomba Presurizadora & UV    │ 120V (1F) │ 15 A    │ 12 AWG + T   │ GFCI           │
│ 9  │ Cocina (Refrigerador & Isla)│ 120V (1F) │ 20 A    │ 12 AWG + T   │ GFCI           │
│ 10 │ Microondas & Horno Empotrado│ 120V (1F) │ 20 A    │ 12 AWG + T   │ Termomagnético │
│ 11 │ Lavadora & Centro de Lavado │ 120V (1F) │ 20 A    │ 12 AWG + T   │ GFCI           │
│ 12 │ Iluminación Planta Baja     │ 120V (1F) │ 15 A    │ 14 AWG (Neut)│ Domótico/DALI  │
│ 13 │ Iluminación Planta Alta     │ 120V (1F) │ 15 A    │ 14 AWG (Neut)│ Domótico/DALI  │
│ 14 │ Iluminación Roof Garden     │ 120V (1F) │ 15 A    │ 14 AWG (Neut)│ GFCI Exterior  │
│ 15 │ Contactos Uso General PB    │ 120V (1F) │ 20 A    │ 12 AWG + T   │ GFCI Húmedas   │
│ 16 │ Contactos Uso General PA    │ 120V (1F) │ 20 A    │ 12 AWG + T   │ Termomagnético │
│ 17 │ Contactos & Grill Roof Top  │ 120V (1F) │ 20 A    │ 12 AWG + T   │ GFCI Exterior  │
│ 18 │ Calentador Respaldo (Gas)   │ 120V (1F) │ 15 A    │ 14 AWG + T   │ Termomagnético │
│19-2│ Reserva para Expansión      │ 120V/240V │ -       │ -            │ -              │
└────┴─────────────────────────────┴───────────┴─────────┴──────────────┴────────────────┘
```

---

## 2. Iluminación Inteligente y Sensores de Presencia (mmWave)

### 2.1. Tipología de Alumbrado y Control
1. **Luz General y Acentuación:** Tiras LED COB 24V continuas (sin puntos visibles) empotradas en cajillos de tablaroca y cornisas arquitectónicas con difusor opalino.
2. **Ritmo Circadiano:** Temperatura de color dinámica (CCT 2700K ámbar cálido al anochecer $\rightarrow$ 4000K neutro energizante durante el día).
3. **Apagadores Inteligentes con Neutro (Zigbee 3.0 / Matter):**
   * Placas tipo touch / botones mecánicos con grabado láser y retroiluminación configurable.
   * Funcionan de forma 100% manual e independiente si el servidor central se apaga.

### 2.2. Sensores de Presencia Humana por Microondas (mmWave 24GHz / 60GHz)
* **Ventaja:** Detectan microrrespiración y presencia estática (a diferencia de los sensores PIR tradicionales que apagan la luz si la persona está quieta en el sillón, cama o inodoro).
* **Distribución de Sensores mmWave:**
  * **PB:** Área Social (Sala/Comedor), Cocina, Pasillo, Medio Baño, Baño Suite y Cuarto de Lavandería.
  * **PA:** Pasillo de distribución, Family Room, Baño Compartido y Baño Master.
  * **Roof Garden:** Escalera y Medio Baño Social.

---

## 3. Red Estructurada, CCTV y Ciberseguridad

```
  INTERNET (Fibra Óptica 1 Gbps)
            │
            ▼
 ┌─────────────────────────────────────────────────────────────┐
 │ RACK 12U - CUARTO DE MÁQUINAS (Planta Baja X=12.67m, Y=-1.05m)│
 │  • PDU 8 Tomas Regulada con Supresor de Picos (15A)        │
 │  • UPS Online 1500VA / 900W Doble Conversión               │
 │  • Router / Gateway UniFi Cloud Gateway Ultra (1 Gbps IPS)  │
 │  • Switch PoE+ Gigabit 16 Puertos (120W Budget)            │
 │  • Patch Panel Cat6A 24 Puertos UTP 100% Cobre             │
 │  • Servidor Home Assistant Yellow / Mini PC Proxmox N100   │
 │  • NVR / Disco 4TB Grabación Local 24/7 (Cero Nubes Pagas) │
 │  • Coordinador Zigbee 3.0 / Matter over Thread (SLZB-06 PoE)│
 └──────────────────────────────┬──────────────────────────────┘
                                │
       ┌────────────────────────┼────────────────────────┐
       ▼                        ▼                        ▼
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│ PUNTOS DE    │         │ CÁMARAS CCTV │         │ CONTROL DE   │
│ ACCESO WI-FI7│         │ 4K POE LOCAL │         │ ACCESOS      │
├──────────────┤         ├──────────────┤         ├──────────────┤
│ • AP1 (PB)   │         │ • CAM 1: Ext │         │ • Cerradura  │
│ • AP2 (PA)   │         │   Cochera/Calle│       │   Biométrica │
│ • AP3 (Roof) │         │ • CAM 2: Acc.│         │ • Videoporter│
│              │         │   Peatonal   │         │   PoE 2K     │
│              │         │ • CAM 3: Jard│         │ • Chapa Eléc.│
│              │         │ • CAM 4: Roof│         │              │
└──────────────┘         └──────────────┘         └──────────────┘
```

---

## 4. Ingeniería Hidrosanitaria y Calentamiento Solar

### 4.1. Red de Agua Potable y Presurización Constante
* **Cisterna:** Capacidad $5,000\text{ L}$ subterránea con sensor ultrasónico de nivel en tiempo real.
* **Bomba Presurizadora Inverter Sumergible:** Presión constante regulable a $3.5\text{ bar}$ ($50\text{ PSI}$) en todas las regaderas y tarjas de manera simultánea.
* **Purificación:** Filtro de sedimentos de 5 micras + Filtro de carbón activado + Lámpara de desinfección Ultravioleta (UV) en el Cuarto de Máquinas.

### 4.2. Sistema Híbrido Solar + Recirculación Cero Desperdicio
1. **Calentador Solar de Tubos de Vacío ($200\text{ L}$):**
   * Genera agua a $65^\circ\text{C}-80^\circ\text{C}$ sin consumir gas.
2. **Válvula Desviadora Termostática Inteligente:**
   * Si el agua solar está a más de $42^\circ\text{C} \rightarrow$ Pasa directo a las regaderas (Consumo de gas = 0%).
   * Si es un día nublado ($<42^\circ\text{C}$) $\rightarrow$ Se enciende automáticamente el calentador instantáneo modulante de respaldo para alcanzar la temperatura deseada.
3. **Bomba Recirculadora Inteligente de Agua Caliente:**
   * Evita esperar 1-2 minutos a que salga agua caliente en las regaderas de Planta Alta o PB.
   * Se activa por sensor de presencia mmWave al entrar al baño, purgando la tubería fría hacia la cisterna en 15 segundos para tener agua caliente instantánea en cuanto abres la llave.
