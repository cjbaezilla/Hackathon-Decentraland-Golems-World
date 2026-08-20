# 🧰 Catálogo Maestro de 18 Wearables y Accesorios 3D: Golems World

> [!IMPORTANT]
> **ESPECIFICACIÓN DE ACCESORIOS EQUIPABLES (SDK7 & MOBILE-FIRST)**:  
> Este documento contiene el catálogo oficial de **18 wearables y accesorios 3D** generados proceduralmente en [`assets/wearables/`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables) para equiparse en NPCs y jugadores mediante `AvatarAttach`. Cada pieza está modelada con temática **Steampunk Devastado / Mad Max**, utiliza materiales PBR con emisión en un material separado (sin luces dinámicas, compatible con el cliente móvil Godot Explorer) y respeta las consideraciones oficiales de Decentraland para wearables (presupuesto de triángulos por categoría, mallas cerradas de una sola cara y dimensiones máximas de 2.42 m).

---

## 📑 Tabla de Contenidos

1. [Arquitectura y Consideraciones de Diseño](#1-arquitectura-y-consideraciones-de-diseño)
2. [Tabla Resumen de los 18 Wearables](#2-tabla-resumen-de-los-18-wearables)
3. [Catálogo Detallado de los 18 Wearables](#3-catálogo-detallado-de-los-18-wearables)
4. [Distribución por Afinidad Elemental y Color Emisivo](#4-distribución-por-afinidad-elemental-y-color-emisivo)
5. [Instrucciones de Generación e Integración](#5-instrucciones-de-generación-e-integración)

---

## 1. Arquitectura y Consideraciones de Diseño

Todos los wearables de este catálogo se generan con el script [`scripts/generate_wearables.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_wearables.js), que reutiliza la librería compartida [`scripts/lib/glbBuilder.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/lib/glbBuilder.js) (esferas, toros, engranajes, octaedros, conos y extrusión 2D) y produce archivos **GLB (glTF 2.0) binarios autocontenidos sin texturas externas**.

### Reglas oficiales aplicadas (Decentraland Wearables)

| Consideración | Valor aplicado |
| :--- | :--- |
| **Presupuesto de triángulos** | ≤ 500 tris (eyewear/mask/tiara), ≤ 1000 tris (accesorios de mano), ≤ 1500 tris (piezas grandes) |
| **Dimensiones máximas** | Alto/Ancho ≤ 2.42 m · Profundidad ≤ 1.40 m |
| **Materiales** | 1 a 3 materiales PBR por pieza (base + detalle + emisión separada) |
| **Emisión** | Solo el material `glow` emite luz (sin luces dinámicas, mobile-first) |
| **Normales** | Mallas cerradas (renderizado de una sola cara en el cliente) |
| **Texturas** | Ninguna: geometría + color plano PBR (máxima compatibilidad móvil) |

### Sistema de Anclaje a Huesos (`AvatarAttach`)

Cada wearable se registra en [`src/objects/npcWearables.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/objects/npcWearables.ts) dentro del mapa `CUSTOM_WEARABLES`, definiendo su `anchorPoint` (hueso del esqueleto), `offsetPos`, `offsetRot` y `scale`. Los puntos de anclaje disponibles verificados en `@dcl/ecs` son:

```text
HEAD · NECK · SPINE · SPINE1 · SPINE2 · HIP
LEFT/RIGHT_ARM · LEFT/RIGHT_FOREARM · LEFT/RIGHT_HAND · LEFT/RIGHT_HAND_INDEX
LEFT/RIGHT_SHOULDER · LEFT/RIGHT_LEG · LEFT/RIGHT_UP_LEG · LEFT/RIGHT_FOOT · LEFT/RIGHT_TOE_BASE
```

---

## 2. Tabla Resumen de los 18 Wearables

| # | Render | ID / Archivo | Nombre | Anclaje (`AAPT_`) | Categoría | Triángulos | Tamaño |
| :-: | :-: | :--- | :--- | :--- | :--- | :-: | :-: |
| 1 | <img src="wearables_imgs/goggles_steampunk.png" width="80" /> | `goggles_steampunk.glb` | Gafas de Aviador Steampunk | `HEAD` | Eyewear | 788 | 24.2 KB |
| 2 | <img src="wearables_imgs/welding_mask.png" width="80" /> | `welding_mask.glb` | Máscara de Soldar Mad Max | `HEAD` | Mask | 684 | 20.4 KB |
| 3 | <img src="wearables_imgs/steam_backpack.png" width="80" /> | `steam_backpack.glb` | Mochila de Caldera de Vapor | `SPINE2` | Back | 884 | 32.4 KB |
| 4 | <img src="wearables_imgs/tesla_backpack.png" width="80" /> | `tesla_backpack.glb` | Generador Galvánico Tesla | `SPINE2` | Back | 996 | 28.8 KB |
| 5 | <img src="wearables_imgs/wrench_heavy.png" width="80" /> | `wrench_heavy.glb` | Llave Mecatrónica Gigante | `RIGHT_HAND` | Hand | 372 | 15.0 KB |
| 6 | <img src="wearables_imgs/flamethrower_pipe.png" width="80" /> | `flamethrower_pipe.glb` | Antorcha de Vapor Industrial | `RIGHT_HAND` | Hand | 604 | 20.0 KB |
| 7 | <img src="wearables_imgs/shoulder_pad_spiked.png" width="80" /> | `shoulder_pad_spiked.glb` | Hombrera Blindada con Púas | `LEFT_SHOULDER` | Shoulder | 644 | 19.1 KB |
| 8 | <img src="wearables_imgs/aether_crown.png" width="80" /> | `aether_crown.glb` | Corona de Cristal de Éter | `HEAD` | Tiara | 176 | 9.0 KB |
| 9 | <img src="wearables_imgs/monocle_brass.png" width="80" /> | `monocle_brass.glb` | Monóculo de Latón | `HEAD` | Eyewear | 680 | 18.8 KB |
| 10 | <img src="wearables_imgs/top_hat_steam.png" width="80" /> | `top_hat_steam.glb` | Sombrero de Copa a Vapor | `HEAD` | Hat | 938 | 30.6 KB |
| 11 | <img src="wearables_imgs/neck_cog_collar.png" width="80" /> | `neck_cog_collar.glb` | Collarín de Engranajes | `NECK` | Neck | 1200 | 34.8 KB |
| 12 | <img src="wearables_imgs/chest_armor_plate.png" width="80" /> | `chest_armor_plate.glb` | Peto Blindado Remachado | `SPINE1` | Chest | 1040 | 28.9 KB |
| 13 | <img src="wearables_imgs/belt_utility_pouch.png" width="80" /> | `belt_utility_pouch.glb` | Cinturón de Herramientas | `HIP` | Hip | 956 | 29.9 KB |
| 14 | <img src="wearables_imgs/gauntlet_left.png" width="80" /> | `gauntlet_left.glb` | Guantelete Blindado Izquierdo | `LEFT_FOREARM` | Handwear | 768 | 21.8 KB |
| 15 | <img src="wearables_imgs/gauntlet_right.png" width="80" /> | `gauntlet_right.glb` | Guantelete Blindado Derecho | `RIGHT_FOREARM` | Handwear | 768 | 21.8 KB |
| 16 | <img src="wearables_imgs/mechanical_arm_left.png" width="80" /> | `mechanical_arm_left.glb` | Brazo Mecánico con Pistón | `LEFT_ARM` | Arm | 992 | 32.3 KB |
| 17 | <img src="wearables_imgs/shoulder_cannon.png" width="80" /> | `shoulder_cannon.glb` | Cañón de Vapor al Hombro | `RIGHT_SHOULDER` | Shoulder | 840 | 25.7 KB |
| 18 | <img src="wearables_imgs/boot_plated_right.png" width="80" /> | `boot_plated_right.glb` | Bota Blindada con Grebas | `RIGHT_FOOT` | Feet | 648 | 21.7 KB |

---

## 3. Catálogo Detallado de los 18 Wearables

### 1. `goggles_steampunk.glb` — Gafas de Aviador Steampunk

<img src="wearables_imgs/goggles_steampunk.png" width="256" />

- **Categoría Oficial**: Eyewear (anteojos)
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_HEAD`
- **Offset de Equipado**: `position (0, 0.08, 0.05)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Latón (marco), Cuero oscuro (correa), Lente Cyan emisivo
- **Color Emisivo**: `#00E5FF` (Afinidad Galvánica)
- **Presupuesto**: 788 triángulos · 24.2 KB
- **Descripción**: Gafas de aviador con montura de latón remachada y lentes de plasma cian. Incluye remaches laterales de cobre y anillos decorativos en los marcos.

### 2. `welding_mask.glb` — Máscara de Soldar Mad Max

<img src="wearables_imgs/welding_mask.png" width="256" />

- **Categoría Oficial**: Mask (máscara)
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_HEAD`
- **Offset de Equipado**: `position (0, 0.05, 0.02)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Hierro oscuro (placa), Latón (borde), Visor naranja incandescente
- **Color Emisivo**: `#FF6600` (Afinidad Vapor)
- **Presupuesto**: 684 triángulos · 20.4 KB
- **Descripción**: Máscara blindada de soldador con cúpula inferior y visor térmico incandescente. Remaches de latón en las cuatro esquinas y aro decorativo en la cúpula.

### 3. `steam_backpack.glb` — Mochila de Caldera de Vapor

<img src="wearables_imgs/steam_backpack.png" width="256" />

- **Categoría Oficial**: Back (espalda)
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_SPINE2`
- **Offset de Equipado**: `position (0, 0, -0.05)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Bronce (tanques), Hierro (bastidor), Cobre (chimenea), Naranja emisivo
- **Color Emisivo**: `#FFAA00` (Afinidad Vapor)
- **Presupuesto**: 884 triángulos · 32.4 KB
- **Descripción**: Mochila de dos calderas de bronce con cúpulas superiores, chimenea de escape, válvula de latón, engranaje de acero y núcleo emisivo en el manómetro.

### 4. `tesla_backpack.glb` — Generador Galvánico Tesla

<img src="wearables_imgs/tesla_backpack.png" width="256" />

- **Categoría Oficial**: Back (espalda)
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_SPINE2`
- **Offset de Equipado**: `position (0, 0, -0.05)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Hierro oscuro (caja), Latón (bobinas), Cobre (anillos), Cyan emisivo
- **Color Emisivo**: `#00E5FF` (Afinidad Galvánica)
- **Presupuesto**: 996 triángulos · 28.8 KB
- **Descripción**: Generador Tesla portátil con dos bobinas verticales de plasma cian, anillos de cobre, placa de refuerzo y un arco eléctrico emisivo en la parte superior.

### 5. `wrench_heavy.glb` — Llave Mecatrónica Gigante

<img src="wearables_imgs/wrench_heavy.png" width="256" />

- **Categoría Oficial**: Hand (accesorio de mano)
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_RIGHT_HAND`
- **Offset de Equipado**: `position (0, 0, 0)` · `rotation (90°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Hierro oscuro (mango), Latón (maza), Cuero (empuñadura), Naranja emisivo
- **Color Emisivo**: `#FFAA00` (Afinidad Vapor)
- **Presupuesto**: 372 triángulos · 15.0 KB
- **Descripción**: Llave inglesa gigante de chatarra con maza de latón, empuñadura de cuero y núcleo emisivo naranja en la cabeza.

### 6. `flamethrower_pipe.glb` — Antorcha de Vapor Industrial

<img src="wearables_imgs/flamethrower_pipe.png" width="256" />

- **Categoría Oficial**: Hand (accesorio de mano)
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_RIGHT_HAND`
- **Offset de Equipado**: `position (0, 0, 0)` · `rotation (90°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Latón (cañón), Cuero (empuñadura), Hierro (tanque), Llama naranja emisiva
- **Color Emisivo**: `#FF5522` (Afinidad Vapor)
- **Presupuesto**: 604 triángulos · 20.0 KB
- **Descripción**: Antorcha/lanzallamas industrial con cañón de latón, boquilla cónica, empuñadura de cuero con anillo y cono de llama emisiva en la punta.

### 7. `shoulder_pad_spiked.glb` — Hombrera Blindada con Púas

<img src="wearables_imgs/shoulder_pad_spiked.png" width="256" />

- **Categoría Oficial**: Shoulder (hombro)
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_LEFT_SHOULDER`
- **Offset de Equipado**: `position (0, 0, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Hierro oscuro (cúpula), Latón (borde), Púas y núcleos naranja emisivo
- **Color Emisivo**: `#FF6600` (Afinidad Vapor)
- **Presupuesto**: 644 triángulos · 19.1 KB
- **Descripción**: Hombrera blindada Mad Max con cúpula de hierro, aro de latón, tres púas metálicas y esferas emisivas naranja en las puntas.

### 8. `aether_crown.glb` — Corona de Cristal de Éter

<img src="wearables_imgs/aether_crown.png" width="256" />

- **Categoría Oficial**: Tiara
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_HEAD`
- **Offset de Equipado**: `position (0, 0.1, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Latón (aro y monturas), Cristales violeta emisivos
- **Color Emisivo**: `#BB67FF` (Afinidad Éter)
- **Presupuesto**: 176 triángulos · 9.0 KB
- **Descripción**: Diadema de latón con cinco cristales octaédricos de éter violeta (uno central mayor y cuatro laterales) montados sobre soportes.

### 9. `monocle_brass.glb` — Monóculo de Latón

<img src="wearables_imgs/monocle_brass.png" width="256" />

- **Categoría Oficial**: Eyewear (anteojos)
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_HEAD`
- **Offset de Equipado**: `position (0, 0.05, 0.04)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Latón (aro y cadena), Lente Cyan emisivo
- **Color Emisivo**: `#00E5FF` (Afinidad Galvánica)
- **Presupuesto**: 680 triángulos · 18.8 KB
- **Descripción**: Monóculo de latón con lente de plasma cian, vástago de sujeción y cadena de tres eslabones de latón.

### 10. `top_hat_steam.glb` — Sombrero de Copa a Vapor

<img src="wearables_imgs/top_hat_steam.png" width="256" />

- **Categoría Oficial**: Hat (sombrero)
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_HEAD`
- **Offset de Equipado**: `position (0, 0.1, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Cuero oscuro (copa), Latón (ala), Cobre (banda), Ámbar emisivo
- **Color Emisivo**: `#FFAA00` (Afinidad Mecánica)
- **Presupuesto**: 938 triángulos · 30.6 KB
- **Descripción**: Sombrero de copa steampunk con ala de latón, banda de cobre, engranaje lateral de acero, tubo de vapor con anillo y esfera emisiva ámbar.

### 11. `neck_cog_collar.glb` — Collarín de Engranajes

<img src="wearables_imgs/neck_cog_collar.png" width="256" />

- **Categoría Oficial**: Neck (cuello)
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_NECK`
- **Offset de Equipado**: `position (0, 0, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Hierro oscuro (collar), Latón (anillo), Acero (engranajes), Cyan emisivo
- **Color Emisivo**: `#00E5FF` (Afinidad Galvánica)
- **Presupuesto**: 1200 triángulos · 34.8 KB
- **Descripción**: Collarín toroidal de hierro con anillo de latón y tres engranajes de acero montados alrededor, con núcleo emisivo cian en el engranaje principal.

### 12. `chest_armor_plate.glb` — Peto Blindado Remachado

<img src="wearables_imgs/chest_armor_plate.png" width="256" />

- **Categoría Oficial**: Chest (pecho)
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_SPINE1`
- **Offset de Equipado**: `position (0, 0.02, 0.02)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Hierro oscuro (placas), Latón (adorno central), Cobre (remaches), Violeta emisivo
- **Color Emisivo**: `#BB67FF` (Afinidad Éter)
- **Presupuesto**: 1040 triángulos · 28.9 KB
- **Descripción**: Peto de placas de hierro remachadas con seis remaches de cobre, adorno circular de latón y núcleo esférico de éter violeta en el centro.

### 13. `belt_utility_pouch.glb` — Cinturón de Herramientas

<img src="wearables_imgs/belt_utility_pouch.png" width="256" />

- **Categoría Oficial**: Hip (cadera)
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_HIP`
- **Offset de Equipado**: `position (0, -0.02, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Cuero (cinturón), Latón (hebilla), Hierro (bolsas), Cobre (funda), Ámbar emisivo
- **Color Emisivo**: `#FFAA00` (Afinidad Mecánica)
- **Presupuesto**: 956 triángulos · 29.9 KB
- **Descripción**: Cinturón de herramientas con hebilla de latón y engranaje central, dos bolsas laterales de hierro, funda cilíndrica de cobre e indicadores emisivos ámbar.

### 14. `gauntlet_left.glb` — Guantelete Blindado Izquierdo

<img src="wearables_imgs/gauntlet_left.png" width="256" />

- **Categoría Oficial**: Handwear (accesorio de mano)
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_LEFT_FOREARM`
- **Offset de Equipado**: `position (0, 0, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Hierro oscuro (cuff), Latón (placas), Núcleos Cyan emisivos
- **Color Emisivo**: `#00E5FF` (Afinidad Galvánica)
- **Presupuesto**: 768 triángulos · 21.8 KB
- **Descripción**: Guantelete blindado para antebrazo con cuff de hierro, placas de latón, nudillos esféricos y tubo de energía cian.

### 15. `gauntlet_right.glb` — Guantelete Blindado Derecho

<img src="wearables_imgs/gauntlet_right.png" width="256" />

- **Categoría Oficial**: Handwear (accesorio de mano)
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_RIGHT_FOREARM`
- **Offset de Equipado**: `position (0, 0, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Hierro oscuro (cuff), Latón (placas), Núcleos Cyan emisivos
- **Color Emisivo**: `#00E5FF` (Afinidad Galvánica)
- **Presupuesto**: 768 triángulos · 21.8 KB
- **Descripción**: Versión simétrica del guantelete izquierdo, para el antebrazo derecho. Mismas placas, nudillos y tubo de energía cian.

### 16. `mechanical_arm_left.glb` — Brazo Mecánico con Pistón

<img src="wearables_imgs/mechanical_arm_left.png" width="256" />

- **Categoría Oficial**: Arm (brazo)
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_LEFT_ARM`
- **Offset de Equipado**: `position (0, 0, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Hierro oscuro (manga), Latón (hombro y codo), Cobre (pistón), Naranja emisivo
- **Color Emisivo**: `#FF6600` (Afinidad Vapor)
- **Presupuesto**: 992 triángulos · 32.3 KB
- **Descripción**: Brazo mecánico completo con hombro esférico de latón, manga de hierro, engranaje de codo, pistón de cobre y tubos de cuero con energía naranja.

### 17. `shoulder_cannon.glb` — Cañón de Vapor al Hombro

<img src="wearables_imgs/shoulder_cannon.png" width="256" />

- **Categoría Oficial**: Shoulder (hombro)
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_RIGHT_SHOULDER`
- **Offset de Equipado**: `position (0, 0, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Hierro oscuro (base), Latón (cañón), Cobre (tanque), Naranja emisivo
- **Color Emisivo**: `#FF5522` (Afinidad Vapor)
- **Presupuesto**: 840 triángulos · 25.7 KB
- **Descripción**: Cañón de vapor montado al hombro con base de hierro, pivote de latón, cañón con anillo de refuerzo, tanque de cobre y boca emisiva naranja.

### 18. `boot_plated_right.glb` — Bota Blindada con Grebas

<img src="wearables_imgs/boot_plated_right.png" width="256" />

- **Categoría Oficial**: Feet (pie)
- **Punto de Anclaje**: `AvatarAnchorPointType.AAPT_RIGHT_FOOT`
- **Offset de Equipado**: `position (0, 0.05, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **Materiales PBR**: Hierro oscuro (suela y grebas), Latón (puntera), Cuero (correas), Ámbar emisivo
- **Color Emisivo**: `#FFAA00` (Afinidad Mecánica)
- **Presupuesto**: 648 triángulos · 21.7 KB
- **Descripción**: Bota blindada con suela y talón de hierro, grebas para la espinilla, puntera de latón, correas de cuero y tubo de energía ámbar.

---

## 4. Distribución por Afinidad Elemental y Color Emisivo

| Afinidad | Color Emisivo | Wearables |
| :--- | :--- | :--- |
| ♨️ **Vapor** | `#FF6600` / `#FF5522` / `#FFAA00` | `welding_mask`, `steam_backpack`, `wrench_heavy`, `flamethrower_pipe`, `shoulder_pad_spiked`, `mechanical_arm_left`, `shoulder_cannon` (7) |
| ⚡ **Galvánico** | `#00E5FF` | `goggles_steampunk`, `tesla_backpack`, `monocle_brass`, `neck_cog_collar`, `gauntlet_left`, `gauntlet_right` (6) |
| ⚙️ **Mecánico** | `#FFAA00` | `top_hat_steam`, `belt_utility_pouch`, `boot_plated_right` (3) |
| 🔮 **Éter** | `#BB67FF` | `aether_crown`, `chest_armor_plate` (2) |

---

## 5. Instrucciones de Generación e Integración

### 5.1 Generación de los modelos GLB

```bash
node scripts/generate_wearables.js
```

Genera (o regenera) los 18 archivos `.glb` en `assets/wearables/` y reporta el conteo de triángulos de cada pieza con validación de presupuesto.

### 5.2 Renders PNG (vista previa 1024×1024)

```bash
node scripts/generate_wearables_pngs.js
```

Genera las imágenes de catálogo en `GOLEMS/wearables_imgs/` usando un navegador headless con WebGL y el tema de fondo/acento definido para cada pieza.

### 5.3 Equipado en escena

```typescript
import { equipCustomWearable, equipWearableToPlayer } from './objects/npcWearables'

// Equipar un accesorio a un NPC (avatarId = id del AvatarShape)
equipCustomWearable('NPC-001', 'goggles_steampunk')

// Equipar un accesorio al Jugador Local
equipWearableToPlayer('shoulder_cannon')
```

### 5.4 Catálogo tipado en TypeScript

La lista completa de los 18 wearables está registrada en la constante `CUSTOM_WEARABLES` de [`src/objects/npcWearables.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/objects/npcWearables.ts), con su `modelSrc`, `anchorPoint`, `offsetPos`, `offsetRot` y `scale`.

> [!NOTE]
> Los `offsetPos`/`offsetRot` de los accesorios nuevos son valores aproximados por defecto. Si al probar en escena un accesorio queda desalineado, ajusta su `offsetPos`/`offsetRot` en `CUSTOM_WEARABLES` y re-ejecuta `npm run build`.
