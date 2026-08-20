# 📚 Librería de Generación Procedural de Golems (`scripts/lib/`)

> **Documentación técnica detallada de la librería compartida** que sustenta el generador
> [`scripts/generate_models.js`](../generate_models.js). Esta carpeta contiene los módulos
> reutilizables que permiten ensamblar **150 golems deterministas** a partir del catálogo de
> recetas oficial y de las formas de los **46 materiales coleccionables**.

---

## 📑 Tabla de Contenidos

1. [Visión General](#-visión-general)
2. [Estructura de Archivos](#-estructura-de-archivos)
3. [`glbBuilder.js` — Constructor GLB glTF 2.0](#-glbbuilderjs--constructor-glb-gltf-20)
4. [`itemShapes.js` — Catálogo de Formas de los 46 Ítems](#-itemshapesjs--catálogo-de-formas-de-los-46-ítems)
5. [`affinityPalette.js` — Esquema de Color por Afinidad](#-affinitypalettejs--esquema-de-color-por-afinidad)
6. [`golemRecipes.js` — Parser del Catálogo de 150 Recetas](#-golemrecipesjs--parser-del-catálogo-de-150-recetas)
7. [Pipeline de Ensamblaje del Golem](#-pipeline-de-ensamblaje-del-golem)
8. [Flujo de Generación Paso a Paso](#-flujo-de-generación-paso-a-paso)
9. [Convenciones y Restricciones Mobile-First](#-convenciones-y-restricciones-mobile-first)
10. [Cómo Extender la Librería](#-cómo-extender-la-librería)
11. [Verificación de Salida](#-verificación-de-salida)

---

## 🎯 Visión General

La librería separa el pipeline de generación de modelos 3D en **cuatro módulos de
responsabilidad única**, todos con **cero dependencias externas** (solo APIs nativas de
Node.js: `fs` y `path`):

| Módulo | Responsabilidad | ¿Qué produce? |
| :--- | :--- | :--- |
| `glbBuilder.js` | Motor de escritura binaria glTF 2.0 | Archivos `.glb` autocontenidos |
| `itemShapes.js` | Siluetas low-poly de los 46 materiales | Descriptores de primitivas por ítem |
| `affinityPalette.js` | Colores de las 5 afinidades elementales | Paleta PBR (body / detail / glow) |
| `golemRecipes.js` | Lectura del catálogo de 150 recetas | Objetos de receta estructurados |

`generate_models.js` actúa como **orquestador**: importa estos módulos, parsea las recetas,
ensambla cada golem combinando las formas de sus materiales con la paleta de su afinidad y
escribe los `.glb` resultantes en `assets/golems/<afinidad>/golem_<NNN>.glb`.

---

## 📁 Estructura de Archivos

```text
scripts/
├── generate_models.js          # Orquestador + ensamblador de golems + CLI
├── generate_items.js           # Generador de ítems (usa su propia copia de primitivas)
└── lib/
    ├── glbBuilder.js           # Clase GlbBuilder + primitivas + escritura GLB
    ├── itemShapes.js           # getItemShapes(itemId) → { body, detail, glow }
    ├── affinityPalette.js      # getAffinityPalette(affinity) → 3 materiales PBR
    ├── golemRecipes.js         # parseRecipes() / getRecipesByAffinity()
    └── README.md               # Este documento
```

---

## 🧱 `glbBuilder.js` — Constructor GLB glTF 2.0

`glbBuilder.js` exporta la clase **`GlbBuilder`** y la utilidad **`axisBasis`**. Es el único
punto del proyecto que conoce el formato binario GLB y construye mallas a partir de primitivas.

### API de `GlbBuilder`

| Método | Descripción |
| :--- | :--- |
| `addBufferData(buffer, target?)` | Registra un `Buffer` alineado a 4 bytes y crea su `bufferView` (target `34962` = ARRAY_BUFFER, `34963` = ELEMENT_ARRAY_BUFFER). |
| `addMaterial(opts)` | Añade un material PBR `pbrMetallicRoughness` con `baseColorFactor`, `roughnessFactor`, `metallicFactor` y `emissiveFactor`. Devuelve su índice. |
| `createBoxMesh(w, h, d, x, y, z)` | Caja de 24 vértices (6 caras con normales planas). |
| `createCylinderMesh(rT, rB, h, seg, x, y, z, axis, capTop, capBottom)` | Cilindro/tronco de cono con tapas y normales suavizadas; orientable por `axis` (`'x'`/`'y'`/`'z'`). |
| `createConeMesh(r, h, seg, x, y, z, axis)` | Cono (alias de cilindro con `rTop = 0`). |
| `createSphereMesh(r, lat, lon, x, y, z)` | Esfera UV low-poly con normales suavizadas. |
| `createTorusMesh(R, r, sR, sT, x, y, z, axis)` | Toro/anillo/eslabón, orientable por `axis`. |
| `extrudePolygon(profile, h, x, y, z, axis)` | Extrusión de un polígono 2D (base de engranajes, tuercas y placas). |
| `createGearMesh(outer, root, h, teeth, x, y, z, axis)` | Engranaje dentado real (disco con `teeth` dientes). |
| `createHexPrismMesh(r, h, x, y, z, axis)` | Prisma hexagonal (tuercas). |
| `createOctahedronMesh(size, x, y, z)` | Octaedro (cristales y acentos). |
| `combineGeometries(list)` | Fusiona varias geometrías en una sola (reindexa los índices). |
| `addMeshNode(name, geom, matIndex)` | Convierte una geometría combinada en `bufferViews`, `accessors` y un nodo de malla. |
| `buildGlbBuffer()` | Serializa el JSON + BIN en un `Buffer` GLB válido. |

### Formato binario estricto

- **Cabecera GLB** de 12 bytes: magic `0x46546C67`, versión `2`, longitud total.
- **Chunk JSON** (type `0x4E4F534A`) con `scenes`, `nodes`, `materials`, `meshes`,
  `primitives`, `accessors`, `bufferViews` y `buffers`.
- **Chunk BIN** (type `0x004E4942`) con los buffers alineados a 4 bytes.
- **Accessors**: posiciones `VEC3` (`FLOAT 5126`), normales `VEC3` (`FLOAT 5126`) e índices
  `SCALAR` (`UNSIGNED_SHORT 5123`, modo `TRIANGLES`).

> 💡 Usa índices `UNSIGNED_SHORT` (máx. 65 535 vértices por malla). Cada golem ronda entre
> ~2 000 y ~5 000 triángulos, muy por debajo del límite.

### `axisBasis(axis)`

Devuelve una base ortonormal `{ a, b, c }` para orientar cilindros, toros, engranajes y
prismas a lo largo del eje deseado:

| `axis` | Vector axial `c` | Plano radial (`a`, `b`) |
| :--- | :--- | :--- |
| `'y'` (por defecto) | `[0,1,0]` | plano XZ |
| `'x'` | `[1,0,0]` | plano YZ |
| `'z'` | `[0,0,1]` | plano XY |

---

## 🧩 `itemShapes.js` — Catálogo de Formas de los 46 Ítems

`itemShapes.js` exporta **`getItemShapes(itemId)`**, que devuelve las siluetas de un material
en forma de **descriptores de primitivas independientes de cualquier color**:

```js
getItemShapes('ollas_cocinar')
// → {
//     body:   [ { t:'cyl', rT:0.13, rB:0.12, h:0.18, seg:16, x:0, y:0.09, z:0, axis:'y', ... } ],
//     detail: [ { t:'torus', R:0.05, r:0.011, ... }, ... ],
//     glow:   []
//   }
```

### Formato de descriptor

Cada descriptor es un objeto plano `{ t, ...params }` donde `t` identifica la primitiva:

| `t` | Parámetros | Primitiva equivalente |
| :--- | :--- | :--- |
| `box` | `w, h, d, x, y, z` | Caja |
| `cyl` | `rT, rB, h, seg, x, y, z, axis, capTop, capBottom` | Cilindro / tronco de cono |
| `cone` | `r, h, seg, x, y, z, axis` | Cono |
| `sphere` | `r, lat, lon, x, y, z` | Esfera UV |
| `torus` | `R, r, sR, sT, x, y, z, axis` | Toro |
| `gear` | `outer, root, h, teeth, x, y, z, axis` | Engranaje dentado |
| `hex` | `r, h, x, y, z, axis` | Prisma hexagonal |
| `octa` | `size, x, y, z` | Octaedro |

### Los tres grupos de cada ítem

| Grupo | Propósito en el golem |
| :--- | :--- |
| `body` | Volumen dominante → material `body` (color de clase metálico). |
| `detail` | Detalle estructural → material `detail` (tono oscurecido ×0.45). |
| `glow` | Acentos emisivos → material `glow` (color de clase emisivo). |

Los ítems **comunes y poco comunes** no tienen geometría `glow` (antisaturación); los
**raros, épicos y legendarios** sí, por lo que solo los golems de tier altos emiten luz.

### Lista completa de los 46 ítems soportados

| Rareza | Ítems |
| :--- | :--- |
| **Común** (14) | `alambre_cobre`, `tornillos_pernos`, `engranajes_desgastados`, `tubos_cobre`, `sartenes`, `ollas_cocinar`, `placas_laton`, `clavos_oxidados`, `latas_conserva`, `cadenas_hierro`, `tuercas_gigantes`, `tapas_alcantarilla`, `cables_deshilachados`, `residuos_carbon` |
| **Poco común** (11) | `transistores`, `bombillas_filamento`, `resortes_reloj`, `manometros`, `valvulas_vapor`, `lentes_tv_viejo`, `fusibles_fundidos`, `relojes_bolsillo`, `brujulas_magneticas`, `tubos_vacio`, `palancas_interruptor` |
| **Raro** (10) | `motor_vapor`, `bobinas_tesla`, `antenas_radio`, `diodos_led`, `baterias_alquimicas`, `engranajes_bronce`, `dinamo_galvanica`, `cristal_fuerza`, `giroscopio_precision`, `condensador_presion` |
| **Épico** (7) | `nucleo_mana`, `cerebro_automata`, `reactor_eter`, `corazon_caldera`, `bateria_plasma`, `matriz_optica_solar`, `embolo_titanio` |
| **Legendario** (4) | `ojo_dragon`, `corazon_primigenio`, `singularidad_eterica`, `relicario_astral` |

---

## 🎨 `affinityPalette.js` — Esquema de Color por Afinidad

`affinityPalette.js` exporta **`getAffinityPalette(affinity)`** y las constantes
**`AFFINITY_CLASS_COLORS`** / **`AFFINITY_KEYS`**. Define el **esquema de clases** canónico
(coincide con `AGENTS.md` y con `getAffinityTextColor` en `src/objects/golemFactory.ts`).

| Clave | Afinidad | Hex | RGB (normalizado) |
| :--- | :--- | :--- | :--- |
| `steam` | ♨️ Vapor | `#FF7000` | `1.00, 0.44, 0.00` |
| `galvanic` | ⚡ Galvánico | `#00E5FF` | `0.00, 0.90, 1.00` |
| `mechanical` | ⚙️ Mecánico | `#FFBF00` | `1.00, 0.75, 0.00` |
| `luminous` | ☀️ Luminoso | `#FFFF33` | `1.00, 1.00, 0.20` |
| `aether` | 🔮 Éter | `#B833FF` | `0.72, 0.20, 1.00` |

### Los 3 materiales por afinidad

`getAffinityPalette()` devuelve un objeto con **tres materiales PBR**:

```js
{
  key: 'steam',
  hex: '#FF7000',
  materials: {
    body:   { baseColor:[1, 0.44, 0, 1], roughness:0.42, metallic:0.8,  emissive:[0,0,0] },
    detail: { baseColor:[r*0.45, g*0.45, b*0.45, 1], roughness:0.6, metallic:0.85, emissive:[0,0,0] },
    glow:   { baseColor:[1, 0.44, 0, 1], roughness:0.2,  metallic:0.1,  emissive:[1,0.44,0] }
  }
}
```

| Material | Rol | Emisivo |
| :--- | :--- | :--- |
| `body` | Color de clase metálico (dominante) | ❌ |
| `detail` | Mismo tono oscurecido ×0.45, más rugoso | ❌ |
| `glow` | Acento emisivo del color de clase | ✅ |

> ⚠️ Solo `glow` emite luz. Esto cumple la regla **«no luces dinámicas»** del cliente móvil y
> evita sobresaturar el modelo: únicamente el núcleo, el ojo y las piezas raras+ brillan.

---

## 📜 `golemRecipes.js` — Parser del Catálogo de 150 Recetas

`golemRecipes.js` exporta **`parseRecipes(filePath?)`**, **`getRecipesByAffinity(recipes)`** y
**`AFFINITY_KEY_MAP`**. Lee el documento oficial
`GOLEMS/Golems-Recetas-150_eng.md` (4 147 líneas, 150 bloques regulares) y lo convierte en
objetos estructurados.

### `parseRecipes(filePath?)`

```js
const { parseRecipes } = require('./lib/golemRecipes')
const recipes = parseRecipes()
// recipes.length === 150
```

Cada receta devuelta tiene la forma:

```js
{
  number: 1,                 // número 1..150
  numberStr: '001',          // con padding de 3 dígitos
  name: 'Electric Bulwark',  // nombre algorítmico
  tier: 1,                   // 1..4
  affinity: 'galvanic',      // 'steam' | 'galvanic' | 'mechanical' | 'luminous' | 'aether'
  height: 1.09,              // escala en metros (0.90..1.29)
  components: [              // lista de componentes en orden
    { id: 'palancas_interruptor', qty: 2 },
    { id: 'tuercas_gigantes', qty: 2 }
    // ...
  ]
}
```

### `getRecipesByAffinity(recipes)`

Agrupa los números de receta por afinidad:

```js
{
  steam:      [3, 5, 7, ...],   // 46 recetas
  galvanic:   [1, 9, 11, ...],  // 29 recetas
  mechanical: [4, 10, 17, ...], // 22 recetas
  luminous:   [2, 6, 8, ...],   // 21 recetas
  aether:     [13, 15, 20, ...] // 32 recetas
}
```

### `AFFINITY_KEY_MAP`

Mapea el código de afinidad del documento (`STEAM`, `GALVANIC`, …) a la clave de carpeta
(`steam`, `galvanic`, …) usada en todo el pipeline.

### Robustez

- El parsing usa un `split` por bloques `### Golem #\d{3}` con lookahead, de modo que la
  cabecera de cada receta se conserva íntegra.
- Los `itemId` de las recetas se validan contra `itemShapes.js` durante la generación: si una
  receta referencia un ítem inexistente, el generador cae al descriptor por defecto.

---

## 🦾 Pipeline de Ensamblaje del Golem

`generate_models.js` es el orquestador que une los tres módulos anteriores. Su lógica central
se resume en estas etapas:

### 1. Transformación de descriptores

`transformShape(d, s, tx, ty, tz)` escala las dimensiones lineales del descriptor por `s` y
traslada sus coordenadas a `(tx, ty, tz)`. Las claves dimensionales por tipo son:

| Tipo | Claves escaladas |
| :--- | :--- |
| `box` | `w, h, d` |
| `cyl` | `rT, rB, h` |
| `cone` | `r, h` |
| `sphere` | `r` |
| `torus` | `R, r` |
| `gear` | `outer, root, h` |
| `hex` | `r, h` |
| `octa` | `size` |

Las claves no dimensionales (`seg`, `lat`, `lon`, `sR`, `sT`, `teeth`, `axis`, `capTop`,
`capBottom`) se conservan intactas.

### 2. Medición (`halfExtents` + `computeBounds`)

Para centrar y escalar un ítem al montarlo en el esqueleto, se calcula su **caja envolvente
aproximada** a partir de los semi-extents de cada primitiva (conscientes del `axis`). De ahí se
obtienen el centro `(cx, cy, cz)` y la dimensión máxima `maxDim`.

### 3. Montaje con `placeItem(itemId, x, y, z, targetSize)`

Escala el ítem para que su dimensión máxima coincida con `targetSize`, lo centra en la posición
de montaje y devuelve sus descriptores transformados por grupo (`body`, `detail`, `glow`).

### 4. Esqueleto humanoidal y `ITEM_SLOT_MAP`

Cada ítem tiene un **slot** asignado que determina dónde se monta en el golem:

| Slot | Posición de referencia (× altura) | Rol |
| :--- | :--- | :--- |
| `head` | `(0, 0.95, 0)` | Cabeza/casco |
| `eye` | `(0, 0.95, 0.18)` | Ojo/visor (opcional) |
| `core` | `(0, 0.55, 0)` | Núcleo central |
| `torso` | `(0, 0.58, 0)` | Torso/armadura |
| `shoulder` | `(±0.42, 0.82, 0)` | Hombros (izq/der) |
| `arm` | `(±0.5, 0.48, 0)` | Brazos (opcional) |
| `leg` | `(±0.2, 0.28, 0)` | Piernas |
| `foot` | `(±0.2, 0.06, 0.06)` | Pies (opcional) |
| `back` | `(0, 0.85, -0.35)` | Espalda (opcional) |
| `accent` | — | Acentos (actualmente no montados) |

**Asignación de slot por ítem** (resumen — ver `ITEM_SLOT_MAP` en `generate_models.js`):

| Slot | Ítems asignados |
| :--- | :--- |
| `head` | `ollas_cocinar`, `cerebro_automata` |
| `eye` | `bombillas_filamento`, `lentes_tv_viejo`, `relojes_bolsillo`, `tubos_vacio`, `ojo_dragon` |
| `core` | `motor_vapor`, `baterias_alquimicas`, `condensador_presion`, `nucleo_mana`, `reactor_eter`, `corazon_caldera`, `bateria_plasma`, `corazon_primigenio`, `singularidad_eterica` |
| `torso` | `sartenes`, `placas_laton`, `latas_conserva`, `tapas_alcantarilla`, `manometros`, `brujulas_magneticas`, `relicario_astral` |
| `shoulder` | `engranajes_desgastados`, `tuercas_gigantes`, `valvulas_vapor`, `bobinas_tesla`, `engranajes_bronce`, `giroscopio_precision` |
| `arm` | `alambre_cobre`, `fusibles_fundidos`, `palancas_interruptor`, `dinamo_galvanica` |
| `leg` | `tornillos_pernos`, `tubos_cobre`, `clavos_oxidados`, `cadenas_hierro`, `resortes_reloj`, `embolo_titanio` |
| `foot` | `residuos_carbon` |
| `back` | `antenas_radio`, `matriz_optica_solar` |
| `accent` | `cables_deshilachados`, `transistores`, `diodos_led`, `cristal_fuerza` |

### 5. Llenado de slots con fallback determinista

`bucketize()` reparte los componentes en colas por slot (respetando `qty`, tope 6 copias), y
`resolveItem()` extrae de la cola preferida o cae a una cadena de fallback hasta llegar a la
**firma** de la receta (el primer componente). Así, incluso recetas con pocas piezas producen
un golem completo y coherente.

### 6. Ojo emisivo de identidad y antisaturación

Siempre se añade una pequeña esfera `glow` en el ojo para dar identidad de clase, y la
**reducción low-poly** limita los segmentos (`cyl ≤ 10`, `sphere ≤ 6×8`, `torus ≤ 12×6`) sin
alterar la silueta.

---

## 🔄 Flujo de Generación Paso a Paso

```text
node scripts/generate_models.js [--type steam] [--recipe 1] [--output-dir ...]
        │
        ├─ 1. parseRecipes()  → 150 recetas { number, affinity, height, components }
        │
        ├─ 2. Filtrar por afinidad / receta (CLI)
        │
        ├─ 3. Por cada receta:
        │     a. getAffinityPalette(affinity)  → 3 materiales PBR
        │     b. bucketize(components)          → colas por slot
        │     c. Montar slots (head, core, torso, shoulders, legs, …)
        │     d. placeItem() por montaje        → descriptores transformados
        │     e. renderDescriptor() low-poly    → geometrías por material
        │     f. addMeshNode() × 3 (body/detail/glow)
        │     g. buildGlbBuffer()
        │
        └─ 4. Escribir assets/golems/<afinidad>/golem_<NNN>.glb
```

---

## 📱 Convenciones y Restricciones Mobile-First

- **Cero dependencias**: solo `fs` y `path`; sin librerías externas.
- **Sin luces dinámicas**: el brillo se logra únicamente con `emissiveFactor` PBR.
- **Antisaturación**: solo `glow` emite; `body` y `detail` son apagados.
- **Low-poly**: segmentos limitados; ~2 000–5 000 triángulos por golem.
- **Determinismo**: misma receta ⇒ mismo modelo (el ensamblaje es puramente procedimental,
  sin aleatoriedad).
- **Auto-contenido**: los `.glb` no referencian texturas ni archivos externos.

---

## 🔧 Cómo Extender la Librería

### Añadir un nuevo ítem / material

1. En `itemShapes.js`, añade un `case` a `getItemShapes` con sus descriptores `body`,
   `detail` y `glow`.
2. En `generate_models.js`, añade la entrada correspondiente a `ITEM_SLOT_MAP`.
3. Si el material tiene rareza alta, dale geometría `glow` para que emita.

### Añadir una nueva afinidad

1. En `affinityPalette.js`, añade la clave y su `hex`/`rgb` a `AFFINITY_CLASS_COLORS`.
2. En `golemRecipes.js`, mapea el código de afinidad del documento en `AFFINITY_KEY_MAP`.

### Añadir una nueva receta

Añade un bloque `### Golem #NNN — …` al catálogo markdown siguiendo el formato existente; el
parser lo detectará automáticamente en la siguiente ejecución.

---

## ✅ Verificación de Salida

Para validar los `.glb` generados (cabecera y conteo de triángulos) puede usarse:

```bash
node scripts/generate_models.js

node -e "const fs=require('fs'),p=require('path');let n=0,t=0;function w(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=p.join(d,e.name);e.isDirectory()?w(f):e.name.endsWith('.glb')&&(n++,(()=>{const b=fs.readFileSync(f);if(b.readUInt32LE(0)!==0x46546C67){console.log('BAD',f);return}const j=JSON.parse(b.slice(20,20+b.readUInt32LE(12)).toString('utf8'));for(const a of j.accessors)if(a.type==='SCALAR')t+=a.count/3})())}}w('assets/golems');console.log('modelos',n,'triángulos totales',t)"
```

Resultado esperado: `modelos 150` y un total de triángulos bajo (cada golem ≤ ~5 000).

---

*Documentación generada para el proyecto Golems — Decentraland SDK7 (Mobile First).*
