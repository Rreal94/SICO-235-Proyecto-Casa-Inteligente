# Dossier Técnico de Obra para Arquitecto y Electricista
**Proyecto:** Residencia 2 Plantas con Jardín  
**Normas de Instalación:** Infraestructura Eléctrica y Red Estructurada

---

## 1. Reglas Innegociables en Obra

```
┌────────────────────────────────────────────────────────────────────────┐
│  REGLAS CRÍTICAS PARA PLANOS E INSTALACIONES:                          │
│                                                                        │
│  1. HILO NEUTRO en el 100% de las cajas de apagadores (chalupas).     │
│  2. CHALUPAS PROFUNDAS (Mínimo 50mm de fondo en todos los apagadores). │
│  3. RACK CENTRAL (MDF): Todas las tuberías de red convergen a él.      │
│  4. SEPARACIÓN: Mínimo 20cm entre tubería eléctrica y tubería Cat6.    │
│  5. CABLE CAT6 100% COBRE: Prohibido usar cable CCA (aluminio-cobre).  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Ubicación y Especificaciones del Rack Central (MDF)

* **Espacio:** Gabinete de 9U a 12U empotrado o fijado a muro en zona ventilada de Planta Baja (clóset de blancos, cuarto de servicio o bajo escalera cerrada).
* **Alimentación:** 1 circuito eléctrico dedicado exclusivo (Pastilla de 20A) con 2 contactos dobles y cable de tierra física.
* **Tuberías de llegada:**
  * 2 tubos de $3/4"$ hacia techos de Planta Baja y Planta Alta (Access Points).
  * 4 tubos de $3/4"$ hacia las 4 esquinas exteriores (Cámaras PoE).
  * 1 tubo de $3/4"$ hacia la entrada principal (Timbre con Video PoE).
  * 2 tubos de $3/4"$ hacia zonas de audio en techo (Sala, Cocina, Terraza).
  * 1 tubo de $3/4"$ hacia cisterna (Sensor de nivel).
  * 1 tubo de $1"$ de reserva hacia cuadro general eléctrico.

---

## 3. Guía de Tuberías y Alturas de Colocación

| Elemento | Altura Recomendada | Tipo de Tubería | Cable Requerido |
| :--- | :--- | :--- | :--- |
| **Apagadores de Pared** | 1.10 m – 1.20 m sobre NPT | Poliducto / Conduit $3/4"$ | Fase + Neutro + Retornos + Tierra |
| **Access Points Wi-Fi** | Centro de techo de cada planta | Tubo $3/4"$ hacia el Rack | 1 cable Cat6 UTP por piso |
| **Cámaras Exteriores PoE** | 2.80 m – 3.50 m en esquinas | Tubo $3/4"$ hacia el Rack | 1 cable Cat6 exterior con filtro UV |
| **Timbre con Video PoE** | 1.45 m junto a chapa principal | Tubo $3/4"$ hacia el Rack | 1 cable Cat6 + par 18 AWG para chapa |
| **Pasacables para TV** | 1.30 m (tras TV) a 0.45 m (mueble) | **Tubo de 2 Pulgadas** | Pasacables HDMI + 2 cables Cat6 |
| **Bocinas de Techo** | Distribuidas en cielo raso | Tubo $3/4"$ hacia el Rack | Cable libre de oxígeno 14/2 |
| **Persianas Motorizadas** | Esquina superior de dintel | Tubo $1/2"$ a caja cercana | 110V (Fase + Neutro + Tierra) |
| **Cargador Auto Eléctrico** | 1.20 m en muro de cochera | **Tubo conduit pesado 1"** | 3 cables Calibre 6 AWG (240V / 40A) |
| **Acometida Paneles Solares** | Azotea a Cuadro General | **Tubo conduit pesado 1"** | Guía plástica lista para cableado DC |
