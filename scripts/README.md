# 🛠️ Scripts y Utilidades de Generación y Descarga de Assets 3D para Golems

Este directorio contiene herramientas y utilidades en Node.js para la gestión, descarga y generación procedural de modelos 3D binarios **GLB (glTF 2.0)** optimizados para **Decentraland SDK7** y compatibles al 100% con la app móvil de Decentraland (**Mobile First / Godot Explorer**).

---

## 📑 Tabla de Contenidos

1. [Resumen de Scripts Disponibles](#1-resumen-de-scripts-disponibles)
2. [`download_steampunk_assets.js`: Descargador Automatizado de Assets de Decentraland](#2-download_steampunk_assetsjs-descargador-automatizado-de-assets-de-decentraland)
   - [2.1 Propósito y Funcionamiento](#21-propósito-y-funcionamiento)
   - [2.2 Red de Gateways IPFS con Fallback Automático](#22-red-de-gateways-ipfs-con-fallback-automático)
   - [2.3 Normalización de Slugs y Estructura en `assets/asset-packs/`](#23-normalización-de-slugs-y-estructura-en-assetsasset-packs)
   - [2.4 Ejecución](#24-ejecución)
3. [`generate_models.js`: Generador Procedural Binario de Golems](#3-generate_modelsjs-generador-procedural-binario-de-golems)
   - [3.1 Arquitectura glTF 2.0 Binaria Pura](#31-arquitectura-gltf-20-binaria-pura)
   - [3.2 Manual de Uso CLI](#32-manual-de-uso-cli)
   - [3.3 Catálogo de los 150 Modelos (por receta y afinidad)](#33-catálogo-de-los-150-modelos-por-receta-y-afinidad)
4. [`generate_items.js`: Generador Procedural Binario de Ítems Coleccionables (46 Ítems)](#4-generate_itemsjs-generador-procedural-binario-de-ítems-coleccionables-46-ítems)
   - [4.1 Arquitectura, Paleta por Rareza y Política de Color (v3)](#41-arquitectura-paleta-por-rareza-y-política-de-color-v3)
   - [4.2 Kit de Primitivas y Recetas Reconocibles (v3)](#42-kit-de-primitivas-y-recetas-reconocibles-v3)
   - [4.3 Manual de Uso y Ejecución](#43-manual-de-uso-y-ejecución)
   - [4.4 Catálogo Maestro de los 46 Ítems](#44-catálogo-maestro-de-los-46-ítems)
5. [`generate_item_htmls.js`: Generador de Fichas HTML Estáticas Bilingües y Showcase (46 Fichas)](#5-generate_item_htmlsjs-generador-de-fichas-html-estáticas-bilingües-y-showcase-46-fichas)
   - [5.1 Propósito y Características Principales](#51-propósito-y-características-principales)
   - [5.2 Estructura en `showcase/` e i18n](#52-estructura-en-showcase-e-i18n)
   - [5.3 Manual de Uso y Servidor Local PHP](#53-manual-de-uso-y-servidor-local-php)
6. [`generate_item_pngs.js`: Generador de Renders PNG por Rareza para Ítems (46 Imágenes)](#6-generate_item_pngsjs-generador-de-renders-png-por-rareza-para-ítems-46-imágenes)
   - [6.1 Propósito y Arquitectura Técnica](#61-propósito-y-arquitectura-técnica)
   - [6.2 Paletas de Color y Gradientes por Rareza](#62-paletas-de-color-y-gradientes-por-rareza)
   - [6.3 Estructura de Salida en `showcase/`](#63-estructura-de-salida-en-showcase)
   - [6.4 Manual de Uso y Ejecución CLI](#64-manual-de-uso-y-ejecución-cli)
7. [`generate_golem_pngs.js`: Generador de Renders PNG por Afinidad Elemental para Golems (150 Imágenes)](#7-generate_golem_pngsjs-generador-de-renders-png-por-afinidad-elemental-para-golems-150-imágenes)
   - [7.1 Propósito y Arquitectura Técnica](#71-propósito-y-arquitectura-técnica)
   - [7.2 Paletas de Color y Gradientes por Afinidad Elemental](#72-paletas-de-color-y-gradientes-por-afinidad-elemental)
   - [7.3 Estructura de Salida en `GOLEMS/golems_imgs/`](#73-estructura-de-salida-en-golemsgolems_imgs)
   - [7.4 Manual de Uso y Ejecución CLI](#74-manual-de-uso-y-ejecución-cli)
8. [`generate_wearables.js`: Generador Procedural Binario de Accesorios y Wearables 3D (18 Accesorios)](#8-generate_wearablesjs-generador-procedural-binario-de-accesorios-y-wearables-3d-18-accesorios)
   - [8.1 Propósito y Arquitectura Técnica](#81-propósito-y-arquitectura-técnica)
   - [8.2 Catálogo de los 18 Accesorios Generados](#82-catálogo-de-los-18-accesorios-generados)
   - [8.3 Manual de Uso y Ejecución CLI](#83-manual-de-uso-y-ejecución-cli)
9. [`generate_wearables_pngs.js`: Generador de Renders PNG para Accesorios y Wearables 3D (18 Imágenes)](#9-generate_wearables_pngsjs-generador-de-renders-png-para-accesorios-y-wearables-3d-18-imágenes)
   - [9.1 Propósito y Arquitectura Técnica](#91-propósito-y-arquitectura-técnica)
   - [9.2 Estructura de Salida en `GOLEMS/wearables_imgs/`](#92-estructura-de-salida-en-golemswearables_imgs)
   - [9.3 Manual de Uso y Ejecución CLI](#93-manual-de-uso-y-ejecución-cli)
10. [Integración en Decentraland SDK7 (`GltfContainer` & `AvatarAttach`)](#10-integración-en-decentraland-sdk7-gltfcontainer--avatarattach)

---

## 1. Resumen de Scripts Disponibles

| Script | Propósito Principal | Salida en Disco |
| :--- | :--- | :--- |
| [`download_steampunk_assets.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/download_steampunk_assets.js) | Descarga y organiza modelos `.glb` y texturas oficiales de DCL (Pack Steampunk) para la **Gran Arena de Torneo**. | `assets/asset-packs/<slug>/` |
| [`generate_models.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_models.js) | Genera **150 modelos binarios `.glb`** (uno por cada receta determinista) ensamblados desde las formas de sus materiales y coloreados por afinidad elemental. | `assets/models/<afinidad>/` |
| [`generate_items.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_items.js) | Genera proceduralmente los 46 modelos binarios `.glb` PBR organizados por rareza para los **materiales coleccionables**. | `assets/items/<rareza>/` |
| [`generate_item_htmls.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_item_htmls.js) | Genera las 46 fichas HTML estáticas bilingües (EN/ES) con visor 3D, navegación secuencial y botón de copiado de fotogramas a PNG. | `showcase/<rareza>/` y `showcase/index.html` |
| [`generate_item_pngs.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_item_pngs.js) | Genera imágenes PNG en alta resolución (1024×1024) para los 46 ítems 3D con fondo temático y resplandor según su rareza. | `showcase/<rareza>/<item_id>.png` |
| [`generate_golem_pngs.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_golem_pngs.js) | Genera imágenes PNG en alta resolución (1024×1024) para los 150 Golems 3D organizados por afinidad elemental. | `GOLEMS/golems_imgs/<afinidad>/<golem_id>.png` |
| [`generate_wearables.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_wearables.js) | Genera proceduralmente **18 modelos binarios 3D `.glb`** PBR autocompresos para accesorios y vestimenta equipable en NPCs y jugadores. | `assets/wearables/<wearable_id>.glb` |
| [`generate_wearables_pngs.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_wearables_pngs.js) | Genera imágenes PNG en alta resolución (1024×1024) en WebGL para los 18 accesorios 3D con fondo temático PBR. | `GOLEMS/wearables_imgs/<wearable_id>.png` |

---

## 2. `download_steampunk_assets.js`: Descargador Automatizado de Assets de Decentraland

### 2.1 Propósito y Funcionamiento
El script [`download_steampunk_assets.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/download_steampunk_assets.js) automatiza la obtención de todos los modelos 3D y texturas oficiales del paquete **Steampunk** de la Fundación Decentraland necesarios para construir la Gran Arena Circular de Torneo:

1. **Lectura del Catálogo Local**: Consulta `node_modules/@dcl/asset-packs/catalog.json` para extraer los hashes IPFS (`CID bafkrei...`) de cada pieza.
2. **Descarga Resiliente**: Utiliza reintentos y almacenamiento local estructurado en `assets/asset-packs/`.

---

## 3. `generate_models.js`: Generador Procedural Binario de Golems

Genera los 150 modelos `.glb` deterministas de los golems combinando las geometrías de sus ingredientes en formato glTF 2.0 binario directo.

```bash
node scripts/generate_models.js
```

---

## 4. `generate_items.js`: Generador Procedural Binario de Ítems Coleccionables (46 Ítems)

Genera los 46 materiales de chatarra organizados por rareza (`common`, `uncommon`, `rare`, `epic`, `legendary`).

```bash
node scripts/generate_items.js
```

---

## 5. `generate_item_htmls.js`: Generador de Fichas HTML Estáticas Bilingües y Showcase

Crea la galería de fichas e i18n para inspeccionar los 46 ítems coleccionables en el navegador.

---

## 6. `generate_item_pngs.js`: Generador de Renders PNG por Rareza para Ítems

Exporta imágenes PNG de alta resolución (1024×1024) para la UI del inventario y mercado.

---

## 7. `generate_golem_pngs.js`: Generador de Renders PNG por Afinidad Elemental para Golems

Exporta imágenes PNG en alta resolución para los 150 golems del juego.

---

## 8. `generate_wearables.js`: Generador Procedural Binario de Accesorios y Wearables 3D (18 Accesorios)

### 8.1 Propósito y Arquitectura Técnica
El script [`generate_wearables.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_wearables.js) genera de forma procedural **18 modelos binarios 3D `.glb`** PBR autocompresos sin dependencias externas. Estos accesorios están diseñados con temática **Steampunk Devastado / Mad Max** para ser anclados directamente al esqueleto de avatares mediante `AvatarAttach`.

Reutiliza la librería compartida [`scripts/lib/glbBuilder.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/lib/glbBuilder.js) (esferas, toros, engranajes, octaedros, conos y extrusión 2D) y aplica las consideraciones oficiales de Decentraland para wearables: mallas cerradas de una sola cara, emisión en material separado (sin luces dinámicas) y presupuesto de triángulos por categoría.

### 8.2 Catálogo de los 18 Accesorios Generados

| Archivo GLB | Nombre del Accesorio | Materiales PBR | Punto de Anclaje Recomendado |
| :--- | :--- | :--- | :--- |
| [`goggles_steampunk.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/goggles_steampunk.glb) | Gafas de Aviador Steampunk | Latón, Cuero Oscuro, Lente Cyan Emisivo | `AvatarAnchorPointType.AAPT_HEAD` |
| [`welding_mask.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/welding_mask.glb) | Máscara de Soldar Mad Max | Hierro Oscuro, Latón, Visor Naranja Incandescente | `AvatarAnchorPointType.AAPT_HEAD` |
| [`steam_backpack.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/steam_backpack.glb) | Mochila de Caldera de Vapor | Tanques de Bronce, Tubos de Hierro, Válvula Emisiva | `AvatarAnchorPointType.AAPT_SPINE2` |
| [`tesla_backpack.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/tesla_backpack.glb) | Generador Galvánico Tesla | Caja de Hierro, Bobinas de Latón, Plasma Cyan | `AvatarAnchorPointType.AAPT_SPINE2` |
| [`wrench_heavy.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/wrench_heavy.glb) | Llave Mecatrónica Gigante | Mango de Hierro, Maza de Latón, Núcleo Naranja | `AvatarAnchorPointType.AAPT_RIGHT_HAND` |
| [`flamethrower_pipe.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/flamethrower_pipe.glb) | Antorcha de Vapor Industrial | Cañón de Latón, Empuñadura de Cuero, Llama Naranja | `AvatarAnchorPointType.AAPT_RIGHT_HAND` |
| [`shoulder_pad_spiked.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/shoulder_pad_spiked.glb) | Hombrera Blindada con Púas | Placa de Hierro, Remaches de Bronce, Púas Naranjas | `AvatarAnchorPointType.AAPT_LEFT_SHOULDER` |
| [`aether_crown.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/aether_crown.glb) | Corona de Cristal de Éter | Aro de Latón, Cristales Violeta Emisivos | `AvatarAnchorPointType.AAPT_HEAD` |
| [`monocle_brass.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/monocle_brass.glb) | Monóculo de Latón | Aro de Latón, Lente Cyan, Cadena | `AvatarAnchorPointType.AAPT_HEAD` |
| [`top_hat_steam.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/top_hat_steam.glb) | Sombrero de Copa a Vapor | Cuero, Ala de Latón, Tubo y Engranaje | `AvatarAnchorPointType.AAPT_HEAD` |
| [`neck_cog_collar.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/neck_cog_collar.glb) | Collarín de Engranajes | Hierro, Acero, Núcleo Cyan | `AvatarAnchorPointType.AAPT_NECK` |
| [`chest_armor_plate.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/chest_armor_plate.glb) | Peto Blindado Remachado | Hierro, Latón, Núcleo Violeta | `AvatarAnchorPointType.AAPT_SPINE1` |
| [`belt_utility_pouch.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/belt_utility_pouch.glb) | Cinturón de Herramientas | Cuero, Hierro, Hebilla de Latón, Ámbar | `AvatarAnchorPointType.AAPT_HIP` |
| [`gauntlet_left.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/gauntlet_left.glb) | Guantelete Blindado Izquierdo | Hierro, Latón, Núcleos Cyan | `AvatarAnchorPointType.AAPT_LEFT_FOREARM` |
| [`gauntlet_right.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/gauntlet_right.glb) | Guantelete Blindado Derecho | Hierro, Latón, Núcleos Cyan | `AvatarAnchorPointType.AAPT_RIGHT_FOREARM` |
| [`mechanical_arm_left.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/mechanical_arm_left.glb) | Brazo Mecánico con Pistón | Hierro, Latón, Pistón de Cobre, Naranja | `AvatarAnchorPointType.AAPT_LEFT_ARM` |
| [`shoulder_cannon.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/shoulder_cannon.glb) | Cañón de Vapor al Hombro | Hierro, Latón, Boca Naranja | `AvatarAnchorPointType.AAPT_RIGHT_SHOULDER` |
| [`boot_plated_right.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/boot_plated_right.glb) | Bota Blindada con Grebas | Hierro, Latón, Cuero, Ámbar | `AvatarAnchorPointType.AAPT_RIGHT_FOOT` |

### 8.3 Manual de Uso y Ejecución CLI

Para generar o regenerar los 18 modelos binarios en `assets/wearables/`:

```bash
node scripts/generate_wearables.js
```

---

## 9. `generate_wearables_pngs.js`: Generador de Renders PNG para Accesorios y Wearables 3D (18 Imágenes)

### 9.1 Propósito y Arquitectura Técnica
El script [`generate_wearables_pngs.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_wearables_pngs.js) inicia un servidor HTTP estático local y lanza un navegador headless (Edge/Chrome) con aceleración WebGL en Puppeteer. Carga la librería `<model-viewer>` para renderizar cada modelo 3D GLB de `assets/wearables/` sobre un fondo temático con un anillo brillante y captura imágenes PNG de alta resolución (1024×1024).

### 9.2 Estructura de Salida en `GOLEMS/wearables_imgs/`

Las imágenes renderizadas se guardan en la carpeta asignada:

```text
GOLEMS/wearables_imgs/
├── aether_crown.png
├── belt_utility_pouch.png
├── boot_plated_right.png
├── chest_armor_plate.png
├── flamethrower_pipe.png
├── gauntlet_left.png
├── gauntlet_right.png
├── goggles_steampunk.png
├── mechanical_arm_left.png
├── monocle_brass.png
├── neck_cog_collar.png
├── shoulder_cannon.png
├── shoulder_pad_spiked.png
├── steam_backpack.png
├── tesla_backpack.png
├── top_hat_steam.png
├── welding_mask.png
└── wrench_heavy.png
```

### 9.3 Manual de Uso y Ejecución CLI

```bash
node scripts/generate_wearables_pngs.js
```

---

## 10. Integración en Decentraland SDK7 (`GltfContainer` & `AvatarAttach`)

### 10.1 Instanciación Estática en la Escena
Cualquier modelo descargado o generado puede instanciarse directamente mediante el componente `GltfContainer`:

```typescript
import { engine, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

// Instanciar una pieza de la Arena Steampunk
const arenaPillar = engine.addEntity()
Transform.create(arenaPillar, {
  position: Vector3.create(200, 0.6, 200),
  scale: Vector3.create(1.8, 1.8, 1.8)
})
GltfContainer.create(arenaPillar, {
  src: 'assets/asset-packs/tank/Tank.glb'
})
```

### 10.2 Anclaje a Avatares mediante `AvatarAttach`
Para equipar accesorios `.glb` generados por `generate_wearables.js` a un NPC o al Jugador Local, se utiliza la función helper de [`src/objects/npcWearables.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/objects/npcWearables.ts):

```typescript
import { equipCustomWearable, equipWearableToPlayer } from './objects/npcWearables'

// 1. Equipar gafas steampunk al NPC-001
equipCustomWearable('NPC-001', 'goggles_steampunk')

// 2. Equipar la mochila de vapor al Jugador Local
equipWearableToPlayer('steam_backpack')
```
