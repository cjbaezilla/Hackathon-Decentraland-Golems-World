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
8. [Integración en Decentraland SDK7 (`GltfContainer`)](#8-integración-en-decentraland-sdk7-gltfcontainer)

---

## 1. Resumen de Scripts Disponibles

| Script | Propósito Principal | Salida en Disco |
| :--- | :--- | :--- |
| [`download_steampunk_assets.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/download_steampunk_assets.js) | Descarga y organiza modelos `.glb` y texturas oficiales de DCL (Pack Steampunk) para la **Gran Arena de Torneo**. | `assets/asset-packs/<slug>/` |
| [`generate_models.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_models.js) | Genera **150 modelos binarios `.glb`** (uno por cada receta determinista) ensamblados desde las formas de sus materiales y coloreados por afinidad elemental. | `assets/golems/<afinidad>/` |
| [`generate_items.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_items.js) | Genera proceduralmente los 46 modelos binarios `.glb` PBR organizados por rareza para los **materiales coleccionables**. | `assets/items/<rareza>/` |
| [`generate_item_htmls.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_item_htmls.js) | Genera las 46 fichas HTML estáticas bilingües (EN/ES) con visor 3D, navegación secuencial y botón de copiado de fotogramas a PNG. | `showcase/<rareza>/` y `showcase/index.html` |
| [`generate_item_pngs.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_item_pngs.js) | Genera imágenes PNG en alta resolución (1024×1024) para los 46 ítems 3D con fondo temático y resplandor según su rareza. | `showcase/<rareza>/<item_id>.png` |
| [`generate_golem_pngs.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_golem_pngs.js) | Genera imágenes PNG en alta resolución (1024×1024) para los 150 Golems 3D organizados por afinidad elemental. | `GOLEMS/golems_imgs/<afinidad>/<golem_id>.png` y `GOLEMS/golems_imgs/<golem_id>.png` |

---

## 2. `download_steampunk_assets.js`: Descargador Automatizado de Assets de Decentraland

### 2.1 Propósito y Funcionamiento
El script [`download_steampunk_assets.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/download_steampunk_assets.js) automatiza la obtención de todos los modelos 3D y texturas oficiales del paquete **Steampunk** de la Fundación Decentraland necesarios para construir la Gran Arena Circular de Torneo:

1. **Lectura del Catálogo Local**: Consulta `node_modules/@dcl/asset-packs/catalog.json` para extraer los hashes IPFS (`CID bafkrei...`) de cada pieza.
2. **Filtrado Eficiente**: Descarga exclusivamente los archivos de malla `.glb` y texturas de imagen (`.png`/`.jpg`), omitiendo metadatos innecesarios para máxima velocidad.
3. **Idempotencia**: Si el archivo ya existe localmente y su tamaño es mayor a 0 bytes, omite la descarga automáticamente.

### 2.2 Red de Gateways IPFS con Fallback Automático
Para evitar fallos por saturación o tiempo de espera en la red IPFS, el script implementa reintentos en cascada con timeout estricto de 4 segundos por petición:

```javascript
const GATEWAYS = [
  'https://builder-api.decentraland.org/v1/storage/contents/',
  'https://peer.decentraland.org/content/contents/',
  'https://dweb.link/ipfs/',
  'https://ipfs.io/ipfs/'
]
```

### 2.3 Normalización de Slugs y Estructura en `assets/asset-packs/`
Los assets se organizan siguiendo la convención canónica de Decentraland SDK7:
`assets/asset-packs/<nombre_slugificado>/<archivo>.glb`

```text
assets/asset-packs/
├── arthur_sword/             # Arthur Sword.glb (Espada relicario)
├── barrel/                   # Barrel.glb (Pedestales y sub-tanques)
├── ceiling_4x4m/             # Ceiling 4x4M.glb (Losas de metal)
├── chest_gear/               # Chest Gear.glb (Cofres mecánicos)
├── chest_plates/             # Chest Plates.glb (Blindajes de altar)
├── chest_tube/               # Chest Tube.glb (Collares de pilares)
├── gear_10_teeth/            # Gear 10 Teeth.glb (Engranajes de 10 dientes)
├── gear_5_teeth/             # Gear 5 Teeth.glb (Engranajes planetarios)
├── gear_8_teeth/             # Gear 8 Teeth.glb (Engranajes planetarios)
├── gear_angled_10_teeth/     # Gear Angled 10 Teeth.glb (Engranajes angulares)
├── gear_big/                 # Gear Big.glb (Engranaje central colosal)
├── gear_shaft/               # Gear Shaft.glb (Fustes verticales de 12m)
├── gear_small_01/02/03/      # Engranajes decorativos menores
├── hidrant/                  # Hidrant.glb (Bocas de presión en rampas)
├── lamp/                     # Lamp.glb (Faroles monumentales)
├── road_angle/               # Road Angle.glb (Esquinas de bordillo)
├── road_cobble_angled/       # Road Cobble Angled.glb (Bordillo curvo)
├── road_cobble_straight/     # Road Cobble Straight.glb (Rampas de acceso)
├── road_cross/               # Road Cross.glb (Intersecciones)
├── smoker/                   # Smoker.glb (Chimeneas superiores de 12m)
├── steampunk_number_00..08/  # Placas numéricas de combate
├── switch/                   # Switch.glb (Consolas con interruptor)
├── table_lamp/               # Table Lamp.glb (Farolas de balizas)
├── tank/                     # Tank.glb (Calderas base de pilares)
├── tree_fence/               # Tree Fence.glb (Barandillas de protección)
└── wood_plank_floor_4x4m/    # Wood Plank Floor 4x4M.glb (Piso radial de madera)
```

### 2.4 Ejecución
```bash
node scripts/download_steampunk_assets.js
```

---

## 3. `generate_models.js`: Generador de los 150 Golems por Recetas Deterministas

> 📚 **Documentación detallada de la librería subyacente**: la arquitectura interna
> (constructor GLB, catálogo de formas de ítems, paleta de afinidades y parser de recetas)
> está documentada en [`scripts/lib/README.md`](lib/README.md).

El script [`generate_models.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_models.js) lee el catálogo oficial de **150 recetas deterministas** ([`GOLEMS/Golems-Recetas-150_eng.md`](../GOLEMS/Golems-Recetas-150_eng.md)), ensambla **un golem por receta** combinando las siluetas de los materiales que lo componen con la paleta de color de su afinidad elemental, y escribe modelos binarios autocontenidos sin dependencias externas:

### 3.1 Arquitectura glTF 2.0 Binaria Pura
El script [`generate_models.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_models.js) construye modelos tridimensionales binarios autocontenidos sin dependencias externas:

1. **Cero Dependencias**: Funciona exclusivamente con APIs nativas de Node.js (`fs` y `path`).
2. **Estructura Binaria glTF 2.0 Estricta**:
   - **Encabezado GLB** de 12 bytes (`glTF` magic `0x46546C67`, versión 2, longitud total).
   - **Chunk JSON** estructurado con `scenes`, `nodes`, `materials`, `meshes`, `primitives`, `accessors` y `bufferViews`.
   - **Chunk BIN** con buffers binarios alineados a 4 bytes para posiciones `VEC3` (`FLOAT 5126`), normales `VEC3` (`FLOAT 5126`) e índices triangulares `SCALAR` (`UNSIGNED_SHORT 5123`).
3. **Materiales PBR y Canales Emisivos Puros (Mobile First)**:
   - Cumple con la restricción de **no usar luces dinámicas en escena (`PBPointLight`)** en móvil.
   - Aplica canales `emissiveFactor` nativos en el material PBR para producir visores, calderas, bobinas, faros y núcleos con brillo intenso sin penalización de rendimiento.

### 3.2 Manual de Uso CLI

```bash
# Sintaxis general
node scripts/generate_models.js [opciones]
node scripts/generate_models.js [afinidad]
```

| Opción Larga | Opción Corta | Valores Posibles | Valor por Defecto | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `--type <afinidad>` | `-t <afinidad>` | `steam`, `galvanic`, `mechanical`, `luminous`, `aether`, `all` | `all` | Especifica la afinidad elemental a generar. |
| `--recipe <num>` | `-r <num>` | `1` a `150` | *N/A* | Genera únicamente la receta específica. |
| `--output-dir <ruta>` | `-o <ruta>` | Ruta válida en disco | `assets/golems` | Directorio base de salida. |
| `--help` | `-h` | *N/A* | *N/A* | Muestra el manual de ayuda interactivo. |

#### Ejemplos de Ejecución
```bash
# Generar los 150 golems (uno por receta):
node scripts/generate_models.js

# Generar solo los golems de afinidad Vapor (46 recetas):
node scripts/generate_models.js --type steam

# Generar solo la receta #001:
node scripts/generate_models.js --recipe 1
```

### 3.3 Catálogo de los 150 Modelos (por receta y afinidad)

```text
assets/golems/
├── steam/        # 46 golems de Vapor (golem_003.glb, golem_005.glb, ... #FF7000)
├── galvanic/     # 29 golems Galvánicos (golem_001.glb, golem_009.glb, ... #00E5FF)
├── mechanical/   # 22 golems Mecánicos (golem_004.glb, golem_010.glb, ... #FFBF00)
├── luminous/     # 21 golems Luminosos (golem_002.glb, golem_006.glb, ... #FFFF33)
└── aether/       # 32 golems de Éter (golem_013.glb, golem_015.glb, ... #B833FF)
```

Cada archivo `golem_<NNN>.glb` corresponde a la receta `#NNN` del catálogo oficial. La silueta
del golem se ensambla a partir de las formas de los materiales listados en su receta (ollas
como cascos, sartenes como pecheras, engranajes como hombreras, tuberías como piernas, etc.) y
se colorea con el esquema de clases de su afinidad:

| Afinidad | Carpeta | Color de clase | Ejemplos de recetas |
| :--- | :--- | :--- | :--- |
| ♨️ **Vapor** | `assets/golems/steam/` | Naranja fuego `#FF7000` | `golem_003.glb`, `golem_005.glb`, `golem_012.glb` |
| ⚡ **Galvánico** | `assets/golems/galvanic/` | Cian eléctrico `#00E5FF` | `golem_001.glb`, `golem_009.glb`, `golem_041.glb` |
| ⚙️ **Mecánico** | `assets/golems/mechanical/` | Ámbar dorado `#FFBF00` | `golem_004.glb`, `golem_010.glb`, `golem_044.glb` |
| ☀️ **Luminoso** | `assets/golems/luminous/` | Luz solar `#FFFF33` | `golem_002.glb`, `golem_006.glb`, `golem_052.glb` |
| 🔮 **Éter** | `assets/golems/aether/` | Violeta amatista `#B833FF` | `golem_013.glb`, `golem_015.glb`, `golem_091.glb` |

> 📚 Para entender cómo se montan los slots (cabeza, núcleo, torso, hombros, brazos, piernas),
> el mapeo de ítem → slot, el esquema de color y el parser de recetas, consulta
> [`scripts/lib/README.md`](lib/README.md).

---

## 4. `generate_items.js`: Generador Procedural Binario de Ítems Coleccionables (46 Ítems)

### 4.1 Arquitectura, Paleta por Rareza y Política de Color (v3)
El script [`generate_items.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_items.js) construye los 46 modelos binarios `.glb` autocompresos para los materiales coleccionables del juego descritos en el GDD.

**Fuente única de color**: los valores de clase provienen de `src/config/items.ts` → `RARITY_COLOR_MAP` (constante `RARITY_CLASS_COLORS` en el script). Cada modelo usa **3 materiales PBR**:

| Material | Descripción |
| :--- | :--- |
| `matBody` | Cuerpo dominante con el **color exacto de su clase** (metallic 0.8, roughness 0.42, sin emisivo). |
| `matDetail` | Detalle estructural con el **mismo tono oscurecido ×0.45** (metallic 0.9, roughness 0.55). |
| `matGlow` | Acento emisivo del color de clase (metallic 0.15, roughness 0.25). |

**Política de emisivo (glow)** — solo las rarezas altas emiten luz para optimizar el rendimiento móvil y acentuar la progresión:

- 🟩 **Común** (`assets/items/common/` - 14 ítems): Gris Metálico `#A0A0A0` — **sin glow**.
- 🟩 **Poco Común** (`assets/items/uncommon/` - 11 ítems): Verde Neón `#00FF44` — **sin glow**.
- 🟦 **Raro** (`assets/items/rare/` - 10 ítems): Azul Galvánico `#00D4FF` — **glow**.
- 🟪 **Épico** (`assets/items/epic/` - 7 ítems): Violeta Éter `#C038FF` — **glow**.
- 🟧 **Legendario** (`assets/items/legendary/` - 4 ítems): Dorado Incandescente `#FFAA00` — **glow**.

### 4.2 Kit de Primitivas y Recetas Reconocibles (v3)

La revisión v3 sustituyó el antiguo kit de 3 primitivas (caja, cilindro sin tapas, octaedro) por un conjunto más rico **sin incrementar el presupuesto de polígonos** (cada ítem queda entre ~40 y ~1500 triángulos):

- **Cilindro/tronco de cono con tapas y normales suavizadas** (corrige los antiguos tubos abiertos que dejaban ver a través).
- **Cono**, **esfera UV low-poly**, **toro** (anillo/eslabón, con eje configurable `x`/`y`/`z`) y **octaedro**.
- **Extrusión de polígono 2D** (base de engranajes, tuercas hexagonales y placas).
- **Engranaje dentado real** (`createGearMesh`) y **prisma hexagonal** (`createHexPrismMesh`).

Cada ítem tiene una **silueta única y reconocible** (sartén con mango, tapa de alcantarilla con nervaduras en X, cadena de eslabones toroidales, manómetro con aguja, bobina Tesla con toroide, giroscopio de 3 anillos, cristal bipiramidal, etc.), eliminando las familias de modelos repetidos de la versión anterior.

### 4.3 Manual de Uso y Ejecución

```bash
node scripts/generate_items.js
```

El script genera automáticamente las 5 subcarpetas por rareza en `assets/items/` y guarda los 46 modelos en disco. Todos los `.glb` resultantes cumplen glTF 2.0 binario estricto (cabecera `0x46546C67`, chunks JSON/BIN alineados a 4 bytes) y son autocontenidos sin dependencias externas.

### 4.4 Catálogo Maestro de los 46 Ítems

```text
assets/items/
├── common/       # 14 ítems comunes (Alambre, Tornillos, Engranajes, Tubos, Clavos, etc.)
├── uncommon/     # 11 ítems poco comunes (Transistores, Bombillas, Fusibles, Relojes, etc.)
├── rare/         # 10 ítems raros (Motor Vapor, Tesla, Antenas, Diodos, Dínamos, etc.)
├── epic/         # 7 ítems épicos (Núcleo Maná, Cerebro, Reactor Éter, Batería Plasma, etc.)
└── legendary/    # 4 ítems legendarios (Ojo Dragón, Corazón Primigenio, Singularidad, Relicario)
```

---

## 5. `generate_item_htmls.js`: Generador de Fichas HTML Estáticas Bilingües y Showcase (46 Fichas)

### 5.1 Propósito y Características Principales
El script [`generate_item_htmls.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_item_htmls.js) compila la base de metadatos de los 46 materiales coleccionables (`src/config/items.ts`) y genera 46 páginas HTML estáticas independientes junto con un catálogo maestre central `showcase/index.html`.

Características destacadas:
- 🌐 **Soporte Bilingüe Dual (English Default / Español)**: Selector `[ ES | EN ]` en la cabecera con persistencia en `localStorage`.
- 📱 **Diseño Mobile Horizontal (Landscape First)**: Renderizador 3D WebGL basado en `<model-viewer>` ocupando el **55% de pantalla**, con tipografía ampliada y tarjetas responsivas.
- 📋 **Botón "Copy Rendered Photo"**: Extrae el fotograma 3D en resolución HD a formato PNG y lo copia directamente al portapapeles (`ClipboardItem`), con descarga de fallback.
- ↔️ **Navegación Secuencial Multicanal**: Botones de acceso directo `Previous` / `Next`, soporte para atajos de teclado (`←` / `→`) y gestos táctiles (*swipe*) en móviles.

### 5.2 Estructura en `showcase/` e i18n
Los archivos HTML generados se alojan en la carpeta aislada `showcase/` manteniendo la referencia relativa hacia los modelos `.glb` en `assets/items/`:

```text
showcase/
├── index.html        # Catálogo maestre bilingüe con buscador y filtro por rareza
├── common/           # 14 fichas (alambre_cobre.html, tornillos_pernos.html, etc.)
├── uncommon/         # 11 fichas (transistores.html, valvulas_vapor.html, etc.)
├── rare/             # 10 fichas (motor_vapor.html, bobinas_tesla.html, etc.)
├── epic/             # 7 fichas (nucleo_mana.html, reactor_eter.html, etc.)
└── legendary/        # 4 fichas (ojo_dragon.html, relicario_astral.html, etc.)
```

### 5.3 Manual de Uso y Servidor Local PHP

```bash
# Compilar las 46 fichas HTML y el catálogo showcase/
node scripts/generate_item_htmls.js

# Iniciar servidor web PHP (desde la raíz del proyecto para resolver showcase/ y assets/)
php -S localhost:8000
```

Acceso en el navegador:
👉 **`http://localhost:8000/showcase/`**

---

## 6. `generate_item_pngs.js`: Generador de Renders PNG por Rareza para Ítems (46 Imágenes)

### 6.1 Propósito y Arquitectura Técnica
El script [`generate_item_pngs.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_item_pngs.js) automatiza la generación de imágenes en formato **PNG a alta resolución (1024×1024 píxeles efectivos)** para los 46 materiales coleccionables del juego (`assets/items/<rareza>/*.glb`).

Características y flujo técnico:
- 📡 **Servidor HTTP Local Efímero**: Inicia de forma autónoma un servidor local en el puerto `8989` para servir los archivos `.glb` de forma transparente.
- 🌐 **Puppeteer + Aceleración WebGL**: Lanza Microsoft Edge / Chromium en modo *headless* con soporte WebGL nativo activado.
- 📷 **Renderizado 3D Preciso**: Utiliza el componente `<model-viewer>` con encuadre automático ajustado (`bounds="tight"`), sombras de contacto suaves (`shadow-intensity="1.6"`) e iluminación adaptativa.
- 🎨 **Ambiente por Rareza**: Aplica un fondo con gradiente radial y un anillo de resplandor neón derivado del color característico de la rareza del ítem.

### 6.2 Paletas de Color y Gradientes por Rareza

| Rareza | Tono Base de Fondo (Gradiente Radial) | Resplandor Neón (Glow) | Hex de Acento |
| :--- | :--- | :--- | :--- |
| **Común (`common`)** | Pizarra metálica industrial (`#2e3440` ➔ `#0f1115`) | Gris acero (`rgba(160,160,160,0.35)`) | `#A0A0A0` |
| **Poco Común (`uncommon`)** | Verde esmeralda oscuro (`#1b3a27` ➔ `#07120c`) | Verde neón (`rgba(0,255,68,0.4)`) | `#00FF44` |
| **Raro (`rare`)** | Azul zafiro profundo (`#13344b` ➔ `#050e15`) | Cian eléctrico (`rgba(0,212,255,0.4)`) | `#00D4FF` |
| **Épico (`epic`)** | Púrpura amatista nocturno (`#351c4e` ➔ `#0e0716`) | Violeta místico (`rgba(192,56,255,0.4)`) | `#C038FF` |
| **Legendario (`legendary`)** | Bronce y oro imperial (`#4a3515` ➔ `#140d04`) | Dorado radiante (`rgba(255,170,0,0.5)`) | `#FFAA00` |

### 6.3 Estructura de Salida en `showcase/`

Las imágenes PNG se almacenan de forma organizada en las subcarpetas por rareza dentro de `showcase/`:

```text
showcase/
├── common/       # 14 imágenes (alambre_cobre.png, cadenas_hierro.png, etc.)
├── uncommon/     # 11 imágenes (transistores.png, valvulas_vapor.png, etc.)
├── rare/         # 10 imágenes (motor_vapor.png, bobinas_tesla.png, etc.)
├── epic/         #  7 imágenes (nucleo_mana.png, reactor_eter.png, etc.)
└── legendary/    #  4 imágenes (corazon_primigenio.png, ojo_dragon.png, etc.)
```

### 6.4 Manual de Uso y Ejecución CLI

```bash
# Generar o actualizar las 46 imágenes PNG en showcase/
node scripts/generate_item_pngs.js
```

---

## 7. `generate_golem_pngs.js`: Generador de Renders PNG por Afinidad Elemental para Golems (150 Imágenes)

### 7.1 Propósito y Arquitectura Técnica
El script [`generate_golem_pngs.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_golem_pngs.js) automatiza la captura y renderizado tridimensional en alta resolución (1024×1024 px) de los **150 modelos de Golems** alojados en `assets/golems/<afinidad>/*.glb`:

1. **Servidor HTTP Local Estático**: Inicia un servidor HTTP local en el puerto `8990` para servir los modelos `.glb` sin problemas de CORS ni restricciones del protocolo `file://`.
2. **Navegador Headless con Aceleración GPU**: Utiliza `puppeteer-core` conectado a Microsoft Edge o Chrome local con argumentos WebGL `--use-gl=angle` y `--enable-webgl`.
3. **Model-Viewer WebGL**: Carga dinámicamente cada modelo mediante el componente `<model-viewer>` v3.4.0, aplicando iluminación PBR, ángulo de cámara cinemático (`camera-orbit="45deg 65deg 105%"`), sombras suaves (`shadow-intensity="1.6"`) y ajuste apretado de encuadre (`bounds="tight"`).

### 7.2 Paletas de Color y Gradientes por Afinidad Elemental

Cada una de las 5 afinidades elementales cuenta con un esquema de color personalizado en su fondo radial y anillo de resplandor (*glow ring*):

| Afinidad | Gradiente Radial de Fondo (`bg`) | Resplandor (`glow`) | Color Acento |
| :--- | :--- | :--- | :--- |
| **Vapor (`steam`)** | `radial-gradient(circle at center, #5c2010 0%, #2b0e06 70%, #120502 100%)` | `rgba(255, 85, 34, 0.45)` | `#FF5522` |
| **Galvánico (`galvanic`)** | `radial-gradient(circle at center, #103c5c 0%, #061c2b 70%, #020c12 100%)` | `rgba(0, 229, 255, 0.45)` | `#00E5FF` |
| **Mecánico (`mechanical`)**| `radial-gradient(circle at center, #5c4710 0%, #2b2006 70%, #120e02 100%)` | `rgba(255, 170, 0, 0.45)` | `#FFAA00` |
| **Luminoso (`luminous`)** | `radial-gradient(circle at center, #5c5810 0%, #2b2806 70%, #121102 100%)` | `rgba(255, 235, 59, 0.45)` | `#FFEE55` |
| **Éter (`aether`)** | `radial-gradient(circle at center, #48105c 0%, #21062b 70%, #0e0212 100%)` | `rgba(187, 107, 255, 0.45)`| `#BB67FF` |

### 7.3 Estructura de Salida en `GOLEMS/golems_imgs/`

Las imágenes renderizadas se guardan simultáneamente en la raíz de `GOLEMS/golems_imgs/` para rápido acceso y vinculación en documentación markdown, así como en subcarpetas clasificadas por afinidad:

```text
GOLEMS/golems_imgs/
├── golem_001.png ... golem_150.png   # Acceso directo por ID de golem (1024x1024)
├── aether/                           # Subcarpeta Éter (golem_013.png, etc.)
├── galvanic/                         # Subcarpeta Galvánico (golem_001.png, etc.)
├── luminous/                         # Subcarpeta Luminoso (golem_002.png, etc.)
├── mechanical/                       # Subcarpeta Mecánico (golem_004.png, etc.)
└── steam/                            # Subcarpeta Vapor (golem_003.png, etc.)
```

### 7.4 Manual de Uso y Ejecución CLI

```bash
# Sintaxis general
node scripts/generate_golem_pngs.js [opciones]

# Generar las 150 imágenes PNG
node scripts/generate_golem_pngs.js

# Generar solo los golems de afinidad Vapor
node scripts/generate_golem_pngs.js --affinity steam

# Generar solo un golem específico (ej: Golem #015)
node scripts/generate_golem_pngs.js --golem 015

# Especificar un puerto HTTP personalizado
node scripts/generate_golem_pngs.js --port 8995
```

---

## 8. Integración en Decentraland SDK7 (`GltfContainer`)

Cualquier modelo descargado o generado puede instanciarse directamente mediante el componente `GltfContainer`:

```typescript
import { engine, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

// 1. Instanciar una pieza de la Arena Steampunk
const arenaPillar = engine.addEntity()
Transform.create(arenaPillar, {
  position: Vector3.create(200, 0.6, 200),
  scale: Vector3.create(1.8, 1.8, 1.8)
})
GltfContainer.create(arenaPillar, {
  src: 'assets/asset-packs/tank/Tank.glb'
})

// 2. Instanciar un Golem acompañante
const golem = engine.addEntity()
Transform.create(golem, {
  position: Vector3.create(16, 0.1, 16),
  scale: Vector3.create(1.1, 1.1, 1.1)
})
GltfContainer.create(golem, {
  src: 'assets/golems/galvanic/golem_001.glb'
})

// 3. Instanciar un Ítem Coleccionable Épico (Reactor de Éter)
const itemNode = engine.addEntity()
Transform.create(itemNode, {
  position: Vector3.create(270, 0.3, 130),
  scale: Vector3.create(1.0, 1.0, 1.0)
})
GltfContainer.create(itemNode, {
  src: 'assets/items/epic/reactor_eter.glb'
})
```

