# Guía de Subsistemas Domóticos
**Proyecto:** Residencia Inteligente  
**Detalle Técnico:** Iluminación, Clima, Audio, Accesos, Cisterna y Riego

---

## 1. Iluminación Oculta (Micromódulos)

* **Concepto:** Mecanismos de pared normales de marcas de prestigio (Bticino Living Now, Schneider Unica, Simon 100).
* **Módulo:** Detrás de la placa se conecta un **Shelly Plus 1** o **Sonoff ZBMini Extreme (Zigbee 3.0)**.
* **Comportamiento:**
  * Al presionar el botón físico: La luz prende/apaga al instante por contacto seco.
  * Por automatización o voz: Home Assistant manda el comando sin importar en qué posición esté el apagador de pared.
  * Si el servidor se apaga: El interruptor sigue funcionando normalmente.

---

## 2. Climatización y Persianas

* **Mini-splits:** Equipos Inverter (Midea, Carrier, Daikin o Mitsubishi) integrados con dongles USB de control local (protocolo UART/CN105 o módulos ESPHome).
* **Automatización:** Ajuste de temperatura según si hay personas en la habitación (sensores de presencia) o apagado automático si una ventana permanece abierta más de 3 minutos.
* **Persianas:** Motores tubulares de 110V controlados por micromódulos **Shelly Plus 2PM** (permite abrir al 25%, 50%, 75% o 100% automáticamente al amanecer/atardecer).

---

## 3. Audio Multi-Room Distribuido

* **Zona 1:** Sala y Comedor (2 bocinas de techo).
* **Zona 2:** Cocina (2 bocinas de techo).
* **Zona 3:** Terraza y Jardín (2 bocinas de techo para intemperie).
* **Equipo:** Todas las bocinas van cableadas con cable libre de oxígeno 14/2 directo al Rack. En el rack, 2 o 3 amplificadores **WiiM Amp** permiten reproducir música sincronizada en toda la casa o canciones distintas en cada habitación mediante AirPlay 2, Spotify o Home Assistant.

---

## 4. Control de Accesos y Seguridad

* **Cerradura:** *Aqara U200 / U100* con soporte para Apple HomeKey, huella digital biométrica, teclado PIN y llave física.
* **Cámaras:** 4 Cámaras IP 4K PoE (Reolink 4K) conectadas al Switch PoE del Rack. Detección de personas, vehículos y mascotas procesada localmente sin enviar video a servidores de terceros.
* **Timbre:** *Reolink Doorbell PoE* con audio bidireccional y video fluido en tiempo real en teléfonos y pantallas.
* **Portón Vehicular:** Módulo relevador de contacto seco conectado al motor del portón (LiftMaster / Merik) para apertura desde el auto con CarPlay / Android Auto o geocerca al llegar a casa.

---

## 5. Gestión del Agua y Prevención de Fugas

* **Cisterna:** Sensor ultrasónico impermeable en la tapa de la cisterna conectado a un microcontrolador ESP32. Te muestra en el teléfono el porcentaje exacto de agua y los litros disponibles.
* **Corte por Fuga:** Válvula motorizada de latón en la tubería principal. Si un sensor de humedad bajo el fregadero o lavadora detecta agua, la válvula corta el suministro en 3 segundos y envía una alerta crítica a los celulares.
* **Riego:** Controlador de electroválvulas que consulta el pronóstico del tiempo: si va a llover o llovió ayer, cancela el riego automáticamente para ahorrar agua.
