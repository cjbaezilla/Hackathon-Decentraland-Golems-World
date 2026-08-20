# 📖 Guía Maestra: Fabricación, Catálogo y Generador de NPCs (NPC Avatar Generator)

> [!IMPORTANT]
> **ESPECIFICACIÓN TÉCNICA REUTILIZABLE (SDK7 & MOBILE-FIRST)**:  
> Esta guía documenta la arquitectura técnica, catálogo de wearables nativos, esquemas de color, etiquetado 3D flotante y el generador modular de avatares `AvatarShape` de Decentraland SDK7 para los **50 NPCs** de **Golems World**. Sirve como manual de referencia para crear, personalizar y distribuir personajes no jugadores en el mapa de 25x25 (400m × 400m).

---

## 📑 Tabla de Contenidos

1. [Resumen y Propósito del Sistema](#1-resumen-y-propósito-del-sistema)
2. [Componente AvatarShape de SDK7](#2-componente-avatarshape-de-sdk7)
3. [Catálogo de Wearables Nativos Base-Avatars](#3-catálogo-de-wearables-nativos-base-avatars)
4. [Esquema de Colores HSL/RGB para Avatares](#4-esquema-de-colores-hslrgb-para-avatares)
5. [Sistema de Rótulos Flotantes 3D (TextShape + Billboard)](#5-sistema-de-rótulos-flotantes-3d-textshape--billboard)
6. [Arquitectura del Catálogo Tipado (src/data/npcCatalog.ts)](#6-arquitectura-del-catálogo-tipado-srcdatanpccatalogts)
7. [Fábrica Generadora de Avatares (src/objects/npcGenerator.ts)](#7-fábrica-generadora-de-avatares-srcobjectsnpcgeneratorts)
8. [Buenas Prácticas y Restricciones Mobile-First](#8-buenas-prácticas-y-restricciones-mobile-first)
9. [Internacionalización y Textos Bilingües (i18n)](#9-internacionalización-y-textos-bilingües-i18n)
10. [Guía de Distribución Futura en la Escena](#10-guía-de-distribución-futura-en-la-escena)

---

## 1. Resumen y Propósito del Sistema

El sistema de **Fabricación de NPCs** de Golems World permite instanciar de forma programática avatares humanos estilizados sin depender de modelos 3D externos pesados.

- **Eficiencia en Móvil**: Al utilizar `AvatarShape`, los avatares aprovechan los assets nativos precargados en el motor del cliente (Godot Explorer / Decentraland Mobile), garantizando una tasa de fotogramas fluida incluso en dispositivos de gama media.
- **Diversidad Visual**: Mediante combinaciones de la vestimenta `urn:decentraland:off-chain:base-avatars:...`, tonos de piel curtida, cabellos steampunk y accesorios, se generan 50 identidades únicas.
- **Desacoplamiento Modular**: Toda la información lógica está separada en `src/data/npcCatalog.ts`, mientras que la instanciación ocurre mediante la fábrica `src/objects/npcGenerator.ts`.

---

## 2. Componente AvatarShape de SDK7

El componente `AvatarShape` define la apariencia de un personaje no jugador en la escena.

```typescript
import { AvatarShape, engine } from '@dcl/sdk/ecs'

const npcEntity = engine.addEntity()

AvatarShape.create(npcEntity, {
  id: 'npc-vance-blacksmith',
  name: 'Vance el Forjador',
  bodyShape: 'urn:decentraland:off-chain:base-avatars:BaseMale',
  wearables: [
    'urn:decentraland:off-chain:base-avatars:eyebrows_00',
    'urn:decentraland:off-chain:base-avatars:mouth_00',
    'urn:decentraland:off-chain:base-avatars:eyes_00',
    'urn:decentraland:off-chain:base-avatars:beard',
    'urn:decentraland:off-chain:base-avatars:messy_hair',
    'urn:decentraland:off-chain:base-avatars:leather_jacket',
    'urn:decentraland:off-chain:base-avatars:brown_pants',
    'urn:decentraland:off-chain:base-avatars:boots'
  ],
  emotes: [],
  skinColor: { r: 0.82, g: 0.68, b: 0.55 },
  hairColor: { r: 0.42, g: 0.32, b: 0.22 },
  eyeColor: { r: 0.35, g: 0.65, b: 0.85 }
})
```

---

## 3. Catálogo de Wearables Nativos Base-Avatars

Decentraland proporciona un conjunto oficial de wearables `off-chain` compatibles con todos los clientes:

### Cuerpos Base (`bodyShape`)
- `urn:decentraland:off-chain:base-avatars:BaseMale` (Masculino)
- `urn:decentraland:off-chain:base-avatars:BaseFemale` (Femenino)

### Faciales Básicos
- `urn:decentraland:off-chain:base-avatars:eyebrows_00`
- `urn:decentraland:off-chain:base-avatars:mouth_00`
- `urn:decentraland:off-chain:base-avatars:eyes_00`
- `urn:decentraland:off-chain:base-avatars:beard` (Barba ligera)
- `urn:decentraland:off-chain:base-avatars:beard_full` (Barba poblada)

### Cabello y Estilos
- `messy_hair`, `short_hair`, `pixie_cut`, `bob_hair`, `pony_tail`, `braid_hair`, `bald_head`, `buzz_cut`, `curly_hair`, `mohawk_hair`

### Vestimenta y Torso
- `leather_jacket`, `trench_coat`, `turtleneck`, `casual_hair_01`, `lab_coat`, `work_shirt`, `overall`, `heavy_apron`, `windbreaker`, `vest`

### Calzado y Piernas
- `brown_pants`, `denim_pants`, `cargo_pants`, `torn_jeans`, `slacks`, `shorts`, `boots`, `work_boots`, `heavy_boots`, `sneakers`, `flats`

---

## 4. Esquema de Colores HSL/RGB para Avatares

Para mantener el realismo inmersivo en el mundo steampunk post-apocalíptico de Golems World, se utilizan paletas de colores especificadas en la estructura `{ r: number, g: number, b: number }` (valores estandarizados de `0.0` a `1.0`):

| Tipo de Tono | Concepto / Ambiente | Valor RGB Normado (`r, g, b`) |
| :--- | :--- | :--- |
| **Piel Curtida Sol/Hollín** | Forjadores y chatarreros de intemperie | `{ r: 0.82, g: 0.68, b: 0.55 }` |
| **Piel pálida de Laboratorio** | Alquimistas y técnicos galvánicos | `{ r: 0.92, g: 0.82, b: 0.75 }` |
| **Piel Bronceada del Desierto** | Mercenarios y cazadores PK | `{ r: 0.70, g: 0.52, b: 0.40 }` |
| **Pelo Castaño Ceniciento** | Habitantes comunes del páramo | `{ r: 0.42, g: 0.32, b: 0.22 }` |
| **Pelo Pelirrojo Fuego** | Piromantes y operadoras de calderas | `{ r: 0.78, g: 0.25, b: 0.15 }` |
| **Pelo Cano / Plateado** | Sabios, cronistas y veteranos | `{ r: 0.88, g: 0.88, b: 0.90 }` |
| **Ojos Azul Acerado** | Forjadores y mecánicos | `{ r: 0.35, g: 0.65, b: 0.85 }` |
| **Ojos Ámbar Engranaje** | Habitantes galvánicos | `{ r: 0.90, g: 0.70, b: 0.20 }` |

---

## 5. Sistema de Rótulos Flotantes 3D (TextShape + Billboard)

Cada NPC lleva una entidad hija con un rótulo 3D situado a $Y = +2.25\text{m}$ sobre los pies del avatar:

```typescript
const labelEntity = engine.addEntity()

Transform.create(labelEntity, {
  parent: npcEntity,
  position: Vector3.create(0, 2.25, 0)
})

TextShape.create(labelEntity, {
  text: `⚙️ ${npcData.name}\n[${npcData.title}]`,
  fontSize: 2.2,
  textColor: Color4.create(1.0, 0.85, 0.35, 1.0) // Dorado cálido Steampunk
})

Billboard.create(labelEntity, {})
```

---

## 6. Arquitectura del Catálogo Tipado (`src/data/npcCatalog.ts`)

Las 50 definiciones están guardadas en un arreglo tipado `NPC_CATALOG`:

```typescript
export interface NpcAvatarSpec {
  bodyShape: string
  wearables: string[]
  skinColor: { r: number; g: number; b: number }
  hairColor: { r: number; g: number; b: number }
  eyeColor: { r: number; g: number; b: number }
}

export interface NpcDefinition {
  id: string
  name: string
  title: string
  zone: string
  role: string
  gender: 'male' | 'female'
  avatarSpec: NpcAvatarSpec
  phraseEs: string
  phraseEn: string
}
```

---

## 7. Fábrica Generadora de Avatares (`src/objects/npcGenerator.ts`)

La función principal `createNpcAvatar` instancia la entidad y sus componentes visuales:

```typescript
export function createNpcAvatar(
  npcData: NpcDefinition,
  spawnPosition: Vector3 = Vector3.Zero(),
  rotationAngle: number = 0
): Entity {
  const npcEntity = engine.addEntity()

  Transform.create(npcEntity, {
    position: spawnPosition,
    rotation: Quaternion.fromEulerDegrees(0, rotationAngle, 0)
  })

  AvatarShape.create(npcEntity, {
    id: npcData.id,
    name: '',
    bodyShape: npcData.avatarSpec.bodyShape,
    wearables: npcData.avatarSpec.wearables,
    emotes: [],
    skinColor: npcData.avatarSpec.skinColor,
    hairColor: npcData.avatarSpec.hairColor,
    eyeColor: npcData.avatarSpec.eyeColor
  })

  // Rótulo Flotante
  const labelEntity = engine.addEntity()
  Transform.create(labelEntity, {
    parent: npcEntity,
    position: Vector3.create(0, 2.25, 0)
  })

  TextShape.create(labelEntity, {
    text: `⚙️ ${npcData.name}\n[${npcData.title}]`,
    fontSize: 2.2,
    textColor: Color4.create(1.0, 0.85, 0.35, 1.0)
  })

  Billboard.create(labelEntity, {})

  return npcEntity
}
```

---

## 8. Buenas Prácticas y Restricciones Mobile-First

1. 🚫 **No usar `PBPointLight` ni Luces Dinámicas**: Godot Explorer en móvil desactiva la iluminación puntual por rendimiento. Se deben utilizar colores PBR u opacidad plana.
2. 🚫 **No usar `AssetLoad`**: No soportado en móvil. Utilizar `AvatarShape` nativo o `GltfContainer` directo.
3. 📱 **Hitboxes Táctiles Generosas**: Colocar disparadores de proximidad ($\ge 3.5\text{m}$) o colisionadores de puntero holgados ($\ge 1.5\text{m}$) para tocar cómodamente desde smartphones.
4. ⚡ **Manejo Inmutable de Datos (DOP)**: Usar `Component.get()` para lecturas frecuentes de posición en sistemas ECS y `getMutable()` solo al modificar la rotación o emote.

---

## 9. Internacionalización y Textos Bilingües (i18n)

Para cambiar dinámicamente el idioma del rótulo o modal de diálogo según el Selector global (`🌐 ES | EN`), se consulta la propiedad `phraseEs` o `phraseEn` del `npcData` mediante la función `t()` de `src/i18n`.

---

## 10. Guía de Distribución Futura en la Escena

Cuando decida instanciar y distribuir los 50 NPCs en el mapa de 25x25 (400m × 400m), simplemente importe `NPC_CATALOG` y ejecute un bucle en el script del distrito correspondiente:

```typescript
import { NPC_CATALOG } from '../data/npcCatalog'
import { createNpcAvatar } from '../objects/npcGenerator'
import { Vector3 } from '@dcl/sdk/math'

// Ejemplo de instanciación en el Distrito de la Forja
const vanceData = NPC_CATALOG.find(n => n.id === 'NPC-001')
if (vanceData) {
  createNpcAvatar(vanceData, Vector3.create(22.5, 0.25, 18.0), 90)
}
```
