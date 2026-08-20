# 📖 Guía Maestra: Fabricación, Catálogo, Vestimenta y Accesorios 3D para NPCs y Jugadores

> [!IMPORTANT]
> **ESPECIFICACIÓN TÉCNICA REUTILIZABLE (SDK7 & MOBILE-FIRST)**:  
> Esta guía documenta de forma exhaustiva la arquitectura de avatares `AvatarShape` de Decentraland SDK7, el descubrimiento del catálogo oficial de URNs mediante el API en vivo de Catalyst, la matriz de vestimentas temáticas **Steampunk Devastado / Mad Max**, la generación procedural de accesorios 3D GLB propios (`assets/wearables/`), el anclaje a huesos corporales mediante `AvatarAttach` (`src/objects/npcWearables.ts`) y la instanciación y distribución proporcional de los 50 NPCs por todo el terreno de 400m × 400m (`src/objects/npcGenerator.ts`).

---

## 📑 Tabla de Contenidos

1. [Resumen y Propósito del Sistema](#1-resumen-y-propósito-del-sistema)
2. [Descubrimiento Crucial del Catálogo Oficial del API de Catalyst](#2-descubrimiento-crucial-del-catálogo-oficial-del-api-de-catalyst)
   - [2.1 Causa Raíz de la Falta de Vestimenta (Desnudez)](#21-causa-raíz-de-la-falta-de-vestimenta-desnudez)
   - [2.2 Extracción de URNs en Vivo desde el Servidor Catalyst](#22-extracción-de-urns-en-vivo-desde-el-servidor-catalyst)
   - [2.3 Catálogo Maestro de URNs Off-Chain Válidas por Categoría](#23-catálogo-maestro-de-urns-off-chain-válidas-por-categoría)
3. [Reglas de Vestimenta Steampunk Devastado / Mad Max](#3-reglas-de-vestimenta-steampunk-devastado--mad-max)
4. [Generador Procedural de Accesorios 3D GLB (`scripts/generate_wearables.js`)](#4-generador-procedural-de-accesorios-3d-glb-scriptsgenerate_wearablesjs)
5. [Sistema de Anclaje a Huesos (`AvatarAttach` en `src/objects/npcWearables.ts`)](#5-sistema-de-anclaje-a-huesos-avatarattach-en-srcobjectsnpcwearablests)
6. [Distribución Espacial y Fábrica de los 50 NPCs (`src/objects/npcGenerator.ts`)](#6-distribución-espacial-y-fábrica-de-los-50-npcs-srcobjectsnpcgeneratorts)
7. [Manual de Prevención de Errores y Comandos CLI](#7-manual-de-prevención-de-errores-y-comandos-cli)

---

## 1. Resumen y Propósito del Sistema

El sistema de avatares y vestimenta de **Golems World** resuelve dos desafíos fundamentales:
1. **Eficiencia en Móvil (Mobile-First)**: Uso de avatares nativos `AvatarShape` que reutilizan las mallas precargadas en el cliente Godot/Móvil, garantizando un rendimiento alto a 60 FPS sin cargar mallas humanas externas pesadas.
2. **Identidad Visual Steampunk Devastada**: Garantiza que los 50 NPCs tengan vestimentas oscuras de cuero, hollín, vaqueros de chatarra y capas de armadura, complementadas con accesorios 3D GLB propios anclados a sus extremidades y cabeza.

---

## 2. Descubrimiento Crucial del Catálogo Oficial del API de Catalyst

### 2.1 Causa Raíz de la Falta de Vestimenta (Desnudez)
Cuando a un componente `AvatarShape` de SDK7 se le pasan identificadores ficticios o abreviados (como `'leather_jacket'`, `'camo_pants'` o `'boots'`), el renderizador de Decentraland **falla en silencio al no encontrar el recurso off-chain**, dejando el torso, piernas o calzado sin cargar. Como resultado, el cliente muestra al avatar en su estado base (ropa interior/desnudo o apariencia por defecto de suburbio).

### 2.2 Extracción de URNs en Vivo desde el Servidor Catalyst
Para obtener el catálogo 100% real de wearables que Decentraland reconoce oficialmente, se consulta el endpoint en vivo del Catalyst API:

```http
GET https://peer.decentraland.org/lambdas/collections/wearables?collectionId=urn:decentraland:off-chain:base-avatars
```

Este endpoint retorna exactamente **282 prendas off-chain válidas**. Todas las prendas deben formatearse con el prefijo canónico:
`urn:decentraland:off-chain:base-avatars:<item_id>`

### 2.3 Catálogo Maestro de URNs Off-Chain Válidas por Categoría

#### 👕 Prenda Superior (`upper_body`):
- `black_jacket` (Chaqueta negra de cuero/motorista)
- `sleeveless_punk_shirt` (Camiseta sin mangas destruida estilo Punk/Mad Max)
- `Red_topcoat` (Abrigo largo desgastado)
- `puffer_jacket` / `puffer_jacket_hoodie` (Chaqueta pesada de abrigo)
- `sport_jacket` (Chaqueta deportiva de cuero)
- `baggy_pullover` (Suéter holgado de trabajo)
- `poloblacktshirt` (Camiseta negra polo)
- `m_sweater` / `m_sweater_02` (Suéter masculino oscuro)
- `f_red_elegant_jacket` / `f_blue_jacket` (Chaquetas femeninas)
- `green_square_shirt` / `red_square_shirt` (Camisas a cuadros de trabajo)
- `croupier_shirt` (Camisa de chaleco)

#### 👖 Prenda Inferior (`lower_body`):
- `trash_jean` (Vaqueros destruidos/chatarra)
- `distressed_black_Jeans` (Vaqueros negros desgastados)
- `safari_pants` (Pantalones cargo/safari de exploración)
- `hip_hop_joggers` (Pantalones holgados de supervivencia)
- `grey_joggers` (Pantalones grises desgastados)
- `brown_pants` / `brown_pants_02` (Pantalones marrones de trabajo)
- `comfortablepants` (Pantalones cómodos de tela)
- `corduroysandypants` (Pantalones de pana arena)
- `f_jeans` / `f_country_pants` / `f_brown_trousers` (Pantalones femeninos)

#### 🥾 Calzado (`feet`):
- `m_mountainshoes.glb` (Botas pesadas de montaña/exploración)
- `citycomfortableshoes` (Zapatos cerrados urbanos)
- `classic_shoes` (Zapatos clásicos de cuero)
- `sport_black_shoes` (Tenis negros)
- `sneakers` (Tenis deportivos)

#### 💈 Cabello y Peinados (`hair`):
- `punk` / `hair_punk` (Corte mohawk/punk)
- `rasta` (Rastas de sobreviviente)
- `cool_hair` / `hair_coolshortstyle` (Cabello corto desordenado)
- `keanu_hair` (Cabello largo masculino)
- `slicked_hair` (Cabello peinado hacia atrás)
- `short_hair` / `modern_hair` (Cabello corto)
- `cornrows` / `curly_hair` / `pony_tail` / `shoulder_hair` / `shoulder_bob_hair`

#### 🧔 Barbas Masculinas (`facial_hair`):
- `beard` (Barba clásica)
- `full_beard` (Barba poblada)
- `balbo_beard` (Barba Balbo)
- `short_boxed_beard` (Barba recortada)
- `goatee_beard` (Perilla)
- `Mustache_Short_Beard` (Bigote y barba corta)
- `handlebar` (Bigote de manillar)

#### 👓 Accesorios Faciales y Manos (`eyewear` / `hands_wear`):
- `black_glove` (Guantes negros de cuero)
- `piratepatch` (Parche de ojo de saqueador)
- `aviatorstyle` (Gafas de aviador)
- `cyclope` (Visor de soldadura)

---

## 3. Reglas de Vestimenta Steampunk Devastado / Mad Max

1. **Cero Sudaderas/Hoodies Coloridas**: Prohibido usar prendas verdes fosforescentes, azules celestes o rosadas.
2. **Paleta de Color Oscura**: Cueros negros, marrones oxidados, telas oscuras, hollín, gris carbón y camuflaje.
3. **100 Vestimentas Únicas**: Cada NPC en [`src/data/npcCatalog.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/data/npcCatalog.ts) cuenta con una combinación propia de URNs oficializadas.

```typescript
// Ejemplo de especificación de avatar en npcCatalog.ts:
{
  id: 'NPC-001',
  name: 'Vance el Forjador',
  gender: 'male',
  avatarSpec: {
    bodyShape: URN_MALE,
    wearables: [
      'eyebrows_00', 'mouth_00', 'eyes_00',
      'punk', 'beard', 
      'black_jacket', 
      'trash_jean', 
      'm_mountainshoes.glb', 
      'black_glove'
    ].map(u),
    skinColor: { r: 0.65, g: 0.48, b: 0.35 },
    hairColor: { r: 0.3, g: 0.2, b: 0.1 },
    eyeColor: { r: 0.9, g: 0.4, b: 0.1 }
  }
}
```

---

## 4. Generador Procedural de Accesorios 3D GLB (`scripts/generate_wearables.js`)

Para complementar la ropa base, el script en Node.js [`scripts/generate_wearables.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_wearables.js) genera proceduralmente **18 modelos binarios 3D `.glb`** PBR en la carpeta [`assets/wearables/`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables):

| Archivo `.glb` | Nombre del Accesorio | Punto de Anclaje Recomendado |
| :--- | :--- | :--- |
| [`goggles_steampunk.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/goggles_steampunk.glb) | Gafas de Aviador de Latón y Lentes Cyan | `AvatarAnchorPointType.AAPT_HEAD` |
| [`welding_mask.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/welding_mask.glb) | Máscara de Soldar Blindada con Visor Naranja | `AvatarAnchorPointType.AAPT_HEAD` |
| [`steam_backpack.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/steam_backpack.glb) | Mochila de Caldera de Vapor y Manómetro | `AvatarAnchorPointType.AAPT_SPINE2` |
| [`tesla_backpack.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/tesla_backpack.glb) | Generador Galvánico Tesla con Bobinas Cyan | `AvatarAnchorPointType.AAPT_SPINE2` |
| [`wrench_heavy.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/wrench_heavy.glb) | Llave Mecatrónica Gigante de Chatarra | `AvatarAnchorPointType.AAPT_RIGHT_HAND` |
| [`flamethrower_pipe.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/flamethrower_pipe.glb) | Antorcha / Lanzallamas de Vapor Industrial | `AvatarAnchorPointType.AAPT_RIGHT_HAND` |
| [`shoulder_pad_spiked.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/shoulder_pad_spiked.glb) | Hombrera Blindada con Púas Metálicas | `AvatarAnchorPointType.AAPT_LEFT_SHOULDER` |
| [`aether_crown.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/aether_crown.glb) | Corona / Diadema de Cristales de Éter | `AvatarAnchorPointType.AAPT_HEAD` |
| [`monocle_brass.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/monocle_brass.glb) | Monóculo de Latón con Lente Cyan | `AvatarAnchorPointType.AAPT_HEAD` |
| [`top_hat_steam.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/top_hat_steam.glb) | Sombrero de Copa a Vapor con Tubo y Engranaje | `AvatarAnchorPointType.AAPT_HEAD` |
| [`neck_cog_collar.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/neck_cog_collar.glb) | Collarín de Engranajes al Cuello | `AvatarAnchorPointType.AAPT_NECK` |
| [`chest_armor_plate.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/chest_armor_plate.glb) | Peto Blindado Remachado con Núcleo Éter | `AvatarAnchorPointType.AAPT_SPINE1` |
| [`belt_utility_pouch.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/belt_utility_pouch.glb) | Cinturón de Herramientas con Bolsas | `AvatarAnchorPointType.AAPT_HIP` |
| [`gauntlet_left.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/gauntlet_left.glb) | Guantelete Blindado Izquierdo | `AvatarAnchorPointType.AAPT_LEFT_FOREARM` |
| [`gauntlet_right.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/gauntlet_right.glb) | Guantelete Blindado Derecho | `AvatarAnchorPointType.AAPT_RIGHT_FOREARM` |
| [`mechanical_arm_left.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/mechanical_arm_left.glb) | Brazo Mecánico con Pistón de Cobre | `AvatarAnchorPointType.AAPT_LEFT_ARM` |
| [`shoulder_cannon.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/shoulder_cannon.glb) | Cañón de Vapor al Hombro | `AvatarAnchorPointType.AAPT_RIGHT_SHOULDER` |
| [`boot_plated_right.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables/boot_plated_right.glb) | Bota Blindada con Grebas | `AvatarAnchorPointType.AAPT_RIGHT_FOOT` |

---

## 5. Sistema de Anclaje a Huesos (`AvatarAttach` en `src/objects/npcWearables.ts`)

El módulo [`src/objects/npcWearables.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/objects/npcWearables.ts) administra la colocación de accesorios 3D tanto en NPCs como en el Jugador Local mediante el componente `AvatarAttach`.

### Regla Crucial del Parámetro `avatarId`
En Decentraland SDK7, el componente `AvatarAttach` requiere un identificador de cadena (`avatarId: string`):
- **Para un NPC**: Pasar la cadena del ID asignado en su `AvatarShape` (ej. `'NPC-001'`).
- **Para el Jugador Local**: Pasar una cadena vacía `''` o la dirección wallet del usuario.

```typescript
import { engine, Entity, Transform, GltfContainer, AvatarAttach } from '@dcl/sdk/ecs'
import { Quaternion } from '@dcl/sdk/math'
import { registerEntityForLoading } from '../systems/sceneLoaderSystem'

export function equipCustomWearable(avatarId: string, wearableId: string): Entity | undefined {
  const itemDef = CUSTOM_WEARABLES[wearableId]
  if (!itemDef) return undefined

  // 1. Entidad contenedora anclada al hueso corporal del avatar
  const parentEntity = engine.addEntity()
  AvatarAttach.create(parentEntity, {
    avatarId: avatarId,
    anchorPointId: itemDef.anchorPoint
  })

  // 2. Entidad hija con la malla 3D GLB y ajustes de posición/rotación
  const modelEntity = engine.addEntity()
  Transform.create(modelEntity, {
    parent: parentEntity,
    position: itemDef.offsetPos,
    rotation: Quaternion.fromEulerDegrees(itemDef.offsetRot.x, itemDef.offsetRot.y, itemDef.offsetRot.z),
    scale: itemDef.scale
  })

  GltfContainer.create(modelEntity, {
    src: itemDef.modelSrc
  })

  // 3. Registrar la malla GLTF del accesorio en el sistema de carga inicial
  registerEntityForLoading(modelEntity)

  return modelEntity
}
```

> [!NOTE]
> **Monitoreo de Carga de Accesorios 3D**: Toda entidad con malla `.glb` creada mediante `equipCustomWearable` se registra en `sceneLoaderSystem` mediante `registerEntityForLoading(modelEntity)`. Esto permite que la pantalla de carga considere la descarga de los accesorios de los 50 NPCs antes de liberar la visión del jugador.


---

## 6. Distribución Espacial y Fábrica de los 50 NPCs (`src/objects/npcGenerator.ts`)

En [`src/objects/npcGenerator.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/objects/npcGenerator.ts), se instancian los **50 NPCs** distribuidos proporcionalmente por todo el mapa de **400m × 400m**, utilizando las coordenadas deterministas de [`src/data/npcPositions.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/data/npcPositions.ts):

- **Zonas de Exclusión Estrictas**:
  - **Poblado Inicial (Distrito de la Forja Hub)**: `X: 0..140m, Z: 0..140m` *(0 NPCs instanciados en el área inicial de bienvenida)*.
  - **Gran Arena Central (Interior)**: `Radio < 42m` de `(X: 200m, Z: 200m)` *(0 NPCs instanciados dentro del Cell Ring)*.
- **Cobertura del Terreno**: Repartidos homogéneamente en los 8 distritos (Desierto Chatarra, Reserva Minería, Calderas Fundición, Subestación, Torre de Radio, Los Chatarrales, Fábrica y Bulevares Exteriores) con separaciones de **15m a 35m** entre personajes.
- **Estado IDLE Estático**: `expressionTriggerId: ''` en `AvatarShape` para mantener estabilidad de renderizado.
- **Rótulo Flotante**: `TextShape` en tono dorado/ámbar elevado a $Y = +2.25\text{m}$ con `Billboard`.
- **Accesorios 3D**: Cada NPC recibe automáticamente un accesorio `.glb` anclado a su cuerpo (`equipCustomWearable(npcData.id, wearableId)`).

---

## 7. Manual de Prevención de Errores y Comandos CLI

Para asegurar que no se repitan errores de avatares desnudos o fallos de compilación en el futuro:

1. **Verificar URNs antes de editar**: Consultar siempre la sección 2.3 de esta guía o ejecutar la consulta a Catalyst si se desea añadir una prenda nueva.
2. **Re-generar Accesorios 3D GLB**:
   ```bash
   node scripts/generate_wearables.js
   ```
3. **Verificar Compilación TypeScript del Proyecto**:
   ```bash
   npm run build
   ```
