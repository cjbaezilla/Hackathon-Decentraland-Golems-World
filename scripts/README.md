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
   - [3.3 Catálogo Maestro de los 25 Modelos de Golems](#33-catálogo-maestro-de-los-25-modelos-de-golems)
4. [`generate_items.js`: Generador Procedural Binario de Ítems Coleccionables (46 Ítems)](#4-generate_itemsjs-generador-procedural-binario-de-ítems-coleccionables-46-ítems)
   - [4.1 Arquitectura y Paleta por Rareza](#41-arquitectura-y-paleta-por-rareza)
   - [4.2 Manual de Uso y Ejecución](#42-manual-de-uso-y-ejecución)
   - [4.3 Catálogo Maestro de los 46 Ítems](#43-catálogo-maestro-de-los-46-ítems)
5. [`generate_item_htmls.js`: Generador de Fichas HTML Estáticas Bilingües y Showcase (46 Fichas)](#5-generate_item_htmlsjs-generador-de-fichas-html-estáticas-bilingües-y-showcase-46-fichas)
   - [5.1 Propósito y Características Principales](#51-propósito-y-características-principales)
   - [5.2 Estructura en `showcase/` e i18n](#52-estructura-en-showcase-e-i18n)
   - [5.3 Manual de Uso y Servidor Local PHP](#53-manual-de-uso-y-servidor-local-php)
6. [Integración en Decentraland SDK7 (`GltfContainer`)](#6-integración-en-decentraland-sdk7-gltfcontainer)

---

## 1. Resumen de Scripts Disponibles

| Script | Propósito Principal | Salida en Disco |
| :--- | :--- | :--- |
| [`download_steampunk_assets.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/download_steampunk_assets.js) | Descarga y organiza modelos `.glb` y texturas oficiales de DCL (Pack Steampunk) para la **Gran Arena de Torneo**. | `assets/asset-packs/<slug>/` |
| [`generate_models.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_models.js) | Genera proceduralmente los 25 modelos binarios `.glb` PBR con canales emisivos para los **5 tipos de Golems**. | `assets/models/<tipo>/` |
| [`generate_items.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_items.js) | Genera proceduralmente los 46 modelos binarios `.glb` PBR organizados por rareza para los **materiales coleccionables**. | `assets/items/<rareza>/` |
| [`generate_item_htmls.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_item_htmls.js) | Genera las 46 fichas HTML estáticas bilingües (EN/ES) con visor 3D, navegación secuencial y botón de copiado de fotogramas a PNG. | `showcase/<rareza>/` y `showcase/index.html` |

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

## 3. `generate_models.js`: Generador Procedural Binario de Golems

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
node scripts/generate_models.js [tipo] [cantidad]
```

| Opción Larga | Opción Corta | Valores Posibles | Valor por Defecto | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `--type <tipo>` | `-t <tipo>` | `steam`, `galvanic`, `mechanical`, `luminous`, `aether`, `all` | `all` | Especifica el tipo o afinidad elemental. |
| `--count <num>` | `-c <num>` | `1` a `5` | `5` | Número de variantes a generar por tipo. |
| `--variant <num>`| `-v <num>` | `1` a `5` | *N/A* | Genera exclusivamente una variante específica. |
| `--output-dir <ruta>`| `-o <ruta>` | Ruta válida en disco | `assets/models` | Directorio de salida. |
| `--help` | `-h` | *N/A* | *N/A* | Muestra el manual de ayuda interactivo. |

#### Ejemplos de Ejecución
```bash
# Generar los 25 modelos (5 tipos x 5 variantes)
node scripts/generate_models.js

# Generar solo el tipo Vapor (5 variantes)
node scripts/generate_models.js --type steam

# Generar variante 5 del tipo Éter
node scripts/generate_models.js --type aether --variant 5
```

### 3.3 Catálogo Maestro de los 25 Modelos de Golems

```text
assets/models/
├── steam/        # Golems de Vapor (Calderas, chimeneas, fuego naranja #FF7000)
├── galvanic/     # Golems Galvánicos (Bobinas de Tesla, arcos voltaicos cian #00E5FF)
├── mechanical/   # Golems Mecánicos (Engranajes, blindaje de chatarra, ámbar #FFBF00)
├── luminous/     # Golems Luminosos (Cúpulas de faro, prismas, luz solar #FFFF33)
└── aether/       # Golems de Éter (Obsidiana, resonadores flotantes, violeta #B833FF)
```

| Tipo | Archivo | Rol / Arquetipo | Paleta PBR y Emisivo | Rasgos Distintivos 3D |
| :--- | :--- | :--- | :--- | :--- |
| **Vapor** | `golem_steam_01.glb` | Equilibrado Base | Cobre / Hierro (`#FF7000`) | Caldera central, chimenea superior de escape y visor incandescente. |
| **Vapor** | `golem_steam_02.glb` | Tanque Blindado | Cobre reforzado (`#FF7000`) | Caldera ancha ensanchada, doble chimenea y hombreras gruesas. |
| **Vapor** | `golem_steam_03.glb` | Vástago a Presión (Ágil) | Cobre pulido (`#FF7000`) | Chasis esbelto, chimenea alta y extremidades de pistón ligero. |
| **Vapor** | `golem_steam_04.glb` | Mortero de Vapor (Artillero) | Cobre / Hierro (`#FF7000`) | Cañones de escape montados en brazos y doble escape trasero. |
| **Vapor** | `golem_steam_05.glb` | Coloso de Fundición (Élite) | Cobre / Aleación (`#FF7000`) | Triple chimenea monumental, torso reforzado y caldera dual. |
| **Galvánico** | `golem_galvanic_01.glb`| Chispazo Base | Acero azul / Cobre (`#00E5FF`) | Bobinas Tesla en hombros y reactor de arco voltaico central. |
| **Galvánico** | `golem_galvanic_02.glb`| Acorazado Dínamo (Tanque)| Acero reforzado (`#00E5FF`) | Bobinas de gran calibre, aislador dorsal y placas pectorales. |
| **Galvánico** | `golem_galvanic_03.glb`| Relámpago Veloz (Ágil) | Acero ligero (`#00E5FF`) | Doble antena de alta frecuencia y chasis estilizado. |
| **Galvánico** | `golem_galvanic_04.glb`| Conductor de Rayos (Artillero)| Acero / Cobre (`#00E5FF`) | Cañones de bobina proyectores de descarga en ambos brazos. |
| **Galvánico** | `golem_galvanic_05.glb`| Titán de Tesla (Élite) | Aleación galvánica (`#00E5FF`) | Cuádruple terminal de alta tensión y corona de descarga. |
| **Mecánico** | `golem_mechanical_01.glb`| Acorazado Base | Chatarra / Latón (`#FFBF00`) | Hombreras de engranaje dentado, visor monóculo y placas remachadas. |
| **Mecánico** | `golem_mechanical_02.glb`| Bastión de Chatarra (Tanque)| Placas de hierro (`#FFBF00`) | Escudo frontal ensanchado y hombreras masivas de blindaje. |
| **Mecánico** | `golem_mechanical_03.glb`| Engranaje Relojero (Ágil) | Latón pulido (`#FFBF00`) | Engranajes de precisión expuestos en hombros y espalda. |
| **Mecánico** | `golem_mechanical_04.glb`| Martillo Neumático (Artillero)| Hierro macizo (`#FFBF00`) | Puños de mazo neumático ensanchados para demolición. |
| **Mecánico** | `golem_mechanical_05.glb`| Gran Autómata (Élite) | Latón / Chatarra (`#FFBF00`) | Rueda dentada monumental en espalda, monóculos múltiples y hombros dobles. |
| **Luminoso** | `golem_luminous_01.glb`| Faro Solar Base | Cromo / Oro (`#FFFF33`) | Cúpula faro reflectante superior, núcleo solar y diodos en hombros. |
| **Luminoso** | `golem_luminous_02.glb`| Reflector Acorazado (Tanque)| Cromo reforzado (`#FFFF33`) | Bloque reflector de prisma frontal y hombreras con bisel dorado. |
| **Luminoso** | `golem_luminous_03.glb`| Centella Fotónica (Ágil) | Cromo ligero (`#FFFF33`) | Cúpula esbelta con prismas estilizados y acelerador de luz. |
| **Luminoso** | `golem_luminous_04.glb`| Proyector de Plasma (Artillero)| Cromo / Oro (`#FFFF33`) | Cañones dobles de enfoque óptico láser en antebrazos. |
| **Luminoso** | `golem_luminous_05.glb`| Corona de Helios (Élite) | Cromo pulido (`#FFFF33`) | Corona de tres puntas luminosas, faro monumental y diodos triples. |
| **Éter** | `golem_aether_01.glb` | Autómata de Éter Base | Obsidiana / Amatista (`#B833FF`)| Cristal de maná central, resonadores en hombros y cuernos arcanos. |
| **Éter** | `golem_aether_02.glb` | Monolito de Vacío (Tanque) | Obsidiana maciza (`#B833FF`)| Chasis de diamante ensanchado y monolitos de resonancia en hombros. |
| **Éter** | `golem_aether_03.glb` | Aparición Astral (Ágil) | Obsidiana estilizada (`#B833FF`)| Silueta esbelta, antena de resonancia dorsal y núcleo cristalino. |
| **Éter** | `golem_aether_04.glb` | Resonador de Fractura (Artillero)| Obsidiana / Runas (`#B833FF`)| Prismas cañón de energía dimensional en ambos brazos. |
| **Éter** | `golem_aether_05.glb` | Señor Primigenio (Élite) | Obsidiana mística (`#B833FF`)| Corona de doble cuerno dimensional, anillo dorsal y núcleo triple. |

---

## 4. `generate_items.js`: Generador Procedural Binario de Ítems Coleccionables (46 Ítems)

### 4.1 Arquitectura y Paleta por Rareza
El script [`generate_items.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_items.js) construye los 46 modelos binarios `.glb` autocompresos para los materiales coleccionables del juego descritos en el GDD.

Aplica propiedades PBR y matices emisivos diferenciados según el nivel de rareza:

- 🟩 **Común** (`assets/items/common/` - 14 ítems): Base metálica/latón mate (`#A0A0A0`).
- 🟩 **Poco Común** (`assets/items/uncommon/` - 11 ítems): Resplandor Verde Neón incandescente (`#00FF44`).
- 🟦 **Raro** (`assets/items/rare/` - 10 ítems): Destellos Azul Galvánico / Eléctrico (`#00D4FF`).
- 🟪 **Épico** (`assets/items/epic/` - 7 ítems): Brillo Violeta Éter resplandeciente (`#C038FF`).
- 🟧 **Legendario** (`assets/items/legendary/` - 4 ítems): Aura Dorado Incandescente (`#FFAA00`).

### 4.2 Manual de Uso y Ejecución

```bash
node scripts/generate_items.js
```

El script genera automáticamente las 5 subcarpetas por rareza en `assets/items/` y guarda los 46 modelos en disco.

### 4.3 Catálogo Maestro de los 46 Ítems

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

## 6. Integración en Decentraland SDK7 (`GltfContainer`)

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
  src: 'assets/models/galvanic/golem_galvanic_03.glb'
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

