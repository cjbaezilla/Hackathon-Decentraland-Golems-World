# 🏭 Guía Técnica: Fábrica de Golems (Golem Factory) y Mecánicas de Instanciación en Decentraland SDK7

Esta guía documenta en detalle el diseño, arquitectura y funcionamiento del patrón **Factory** implementado en `src/objects/golemFactory.ts`, el sistema de parametrización en `src/config/golems.ts`, la jerarquía de entidades padre-hijo con componentes `Billboard`/`TextShape`, la relación con los modelos 3D generados y la futura integración con la **Forja Determinista** del GDD de Golems.

---

## 📑 Tabla de Contenidos

1. [El Patrón Factory en Decentraland SDK7](#1-el-patrón-factory-en-decentraland-sdk7)
   - [1.1 Principio de Responsabilidad Única y Arquitectura Modular](#11-principio-de-responsabilidad-única-y-arquitectura-modular)
   - [1.2 Ciclo de Vida de una Entidad Golem](#12-ciclo-de-vida-de-una-entidad-golem)
2. [Estructura y Jerarquía de la Entidad Golem](#2-estructura-y-jerarquía-de-la-entidad-golem)
   - [2.1 Entidad Raíz (`golemEntity`)](#21-entidad-raíz-golementity)
   - [2.2 Entidad Hija de Interfaz In-World (`labelEntity`)](#22-entidad-hija-de-interfaz-in-world-labelentity)
   - [2.3 Paleta de Colores Semántica por Afinidad](#23-paleta-de-colores-semántica-por-afinidad)
3. [Tipado y Configuración Centralizada (`src/config/golems.ts`)](#3-tipado-y-configuración-centralizada-srcconfiggolemsts)
   - [3.1 Interfaz `GolemConfig`](#31-interfaz-golemconfig)
   - [3.2 Enumeración `GolemAffinity`](#32-enumeración-golemaffinity)
   - [3.3 Configuración de los 3 Golems Iniciales](#33-configuración-de-los-3-golems-iniciales)
4. [Modelos 3D `.glb` y Carga en Escena](#4-modelos-3d-glb-y-carga-en-escena)
   - [4.1 Vinculación con `GltfContainer`](#41-vinculación-con-gltfcontainer)
   - [4.2 Escalas y Proporciones](#42-escalas-y-proporciones)
5. [Integración con la Forja Determinista del GDD](#5-integración-con-la-forja-determinista-del-gdd)
   - [5.1 De la Receta al Hash FNV-1a](#51-de-la-receta-al-hash-fnv-1a)
   - [5.2 Derivación de Parámetros para la Factory](#52-derivación-de-parámetros-para-la-factory)
   - [5.3 Diagrama de Flujo: Forja $\rightarrow$ Factory $\rightarrow$ Mundo 3D](#53-diagrama-de-flujo-forja-rightarrow-factory-rightarrow-mundo-3d)
6. [Buenas Prácticas Mobile-First y Rendimiento](#6-buenas-prácticas-mobile-first-y-rendimiento)
   - [6.1 Ausencia de Colisionadores Físicos en Seguidores](#61-ausencia-de-colisionadores-físicos-en-seguidores)
   - [6.2 Jerarquías Livianas (`Transform.parent`)](#62-jerarquías-livianas-transformparent)
   - [6.3 Cumplimiento de Restricciones Móviles](#63-cumplimiento-de-restricciones-móviles)
7. [Guía Paso a Paso para Desarrolladores: Cómo Añadir un Nuevo Golem](#7-guía-paso-a-paso-para-desarrolladores-cómo-añadir-un-nuevo-golem)

---

## 1. El Patrón Factory en Decentraland SDK7

### 1.1 Principio de Responsabilidad Única y Arquitectura Modular
Siguiendo las recomendaciones oficiales de Decentraland ([`game-objects.md`](file:///d:/DECENTRALAND/Scenes/Hackathon/docs/dcl-docs-main/creator/sdk7/programming-patterns/game-objects.md)), el archivo `src/index.ts` debe mantenerse limpio y actuar únicamente como inicializador y orquestador.

La lógica de instanciación, asignación de componentes, cálculo de jerarquías y configuración de estilos reside de forma exclusiva en el módulo **Factory** ([`src/objects/golemFactory.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/objects/golemFactory.ts)).

```
                    ┌───────────────────────────────┐
                    │    Configuración / Receta     │
                    │   (GolemConfig / Forja Hash)  │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │      createFollowerGolem()    │
                    │   (src/objects/golemFactory)  │
                    └───────────────┬───────────────┘
                                    │
            ┌───────────────────────┴───────────────────────┐
            │                                               │
            ▼                                               ▼
┌───────────────────────┐                       ┌───────────────────────┐
│ Entidad Raíz Golem    │                       │ Entidad Hija Etiqueta │
│ - Transform           │ ─── (parent) ──────── │ - Transform (local)   │
│ - GltfContainer (.glb)│                       │ - TextShape           │
│ - GolemFollowerComp   │                       │ - Billboard           │
└───────────────────────┘                       └───────────────────────┘
```

### 1.2 Ciclo de Vida de una Entidad Golem
1. **Definición / Solicitud**: Se provee un objeto de configuración `GolemConfig` (generado por la forja o predefinido en la lista inicial).
2. **Instanciación Raíz**: Se crea la entidad principal en el motor con `engine.addEntity()` y se le asocian `Transform`, `GltfContainer` y `GolemFollowerComponent`.
3. **Instanciación de la UI In-World**: Se genera una entidad hija vinculada con `Transform.parent`, a la que se le añade `TextShape` y `Billboard`.
4. **Registro en el Bucle ECS**: El sistema de seguimiento (`golemFollowerSystem`) detecta automáticamente la presencia de `GolemFollowerComponent` en la consulta `engine.getEntitiesWith(GolemFollowerComponent, Transform)` e inicia el movimiento coordinado.

---

## 2. Estructura y Jerarquía de la Entidad Golem

### 2.1 Entidad Raíz (`golemEntity`)
La entidad principal representa el cuerpo físico y la identidad del autómata en la escena:

```typescript
const golemEntity = engine.addEntity()

// 1. Posición, rotación y escala proporcional
Transform.create(golemEntity, {
  position: spawnPosition,
  rotation: Quaternion.Identity(),
  scale: Vector3.create(config.scale, config.scale, config.scale)
})

// 2. Carga del modelo 3D binario glTF 2.0
GltfContainer.create(golemEntity, {
  src: config.modelSrc
})

// 3. Componente de seguimiento en formación
GolemFollowerComponent.create(golemEntity, {
  golemId: config.id,
  orderIndex,
  targetDistance: config.followDistance,
  moveSpeed: config.moveSpeed,
  rotationSpeed: config.rotationSpeed,
  isMoving: false
})
```

### 2.2 Entidad Hija de Interfaz In-World (`labelEntity`)
Para mostrar el nombre del golem y su afinidad elemental flotando sobre su cabeza sin interferir con la orientación del cuerpo 3D, se utiliza una **entidad hija emparentada**:

```typescript
const labelEntity = engine.addEntity()

// Emparentamiento relativo a la cabeza del golem
Transform.create(labelEntity, {
  parent: golemEntity,
  position: Vector3.create(0, 1.45, 0)
})

// Renderizado de texto 3D con salto de línea
TextShape.create(labelEntity, {
  text: `${config.name}\n[${config.affinity}]`,
  fontSize: 2.2,
  textColor: getAffinityTextColor(config.affinity)
})

// Orientación automática continua hacia la cámara
Billboard.create(labelEntity, {})
```

#### Ventajas del Emparentamiento con `Billboard`:
- **Movimiento Automático**: Al desplazarse o rotar `golemEntity`, la etiqueta `labelEntity` se traslada exactamente a la misma velocidad sin necesidad de código adicional en el `engine.addSystem`.
- **Rotación Desacoplada**: Mientras que el cuerpo del golem rota hacia la dirección de su marcha (`lookRotation`), el componente `Billboard` orienta el texto directamente hacia la cámara del usuario en cualquier ángulo (primera o tercera persona), garantizando legibilidad total.

### 2.3 Paleta de Colores Semántica por Afinidad
La fábrica incluye la función auxiliar `getAffinityTextColor()` para asociar cada una de las 5 afinidades del GDD con un color semántico de alta visibilidad:

```typescript
function getAffinityTextColor(affinity: GolemAffinity): Color4 {
  switch (affinity) {
    case GolemAffinity.STEAM:
      return Color4.create(1.0, 0.55, 0.1, 1.0) // 💨 Naranja Fuego / Vapor (#FF8C1A)
    case GolemAffinity.GALVANIC:
      return Color4.create(0.2, 0.9, 1.0, 1.0)  // ⚡ Cian Eléctrico (#33E5FF)
    case GolemAffinity.MECHANICAL:
      return Color4.create(1.0, 0.85, 0.3, 1.0) // ⚙️ Ámbar / Dorado Engranaje (#FFD94D)
    case GolemAffinity.LUMINOUS:
      return Color4.create(1.0, 1.0, 0.6, 1.0)  // 💡 Amarillo Luminoso (#FFFF99)
    case GolemAffinity.AETHER:
      return Color4.create(0.8, 0.4, 1.0, 1.0)  // 🔮 Violeta Místico / Éter (#CC66FF)
    default:
      return Color4.White()
  }
}
```

---

## 3. Tipado y Configuración Centralizada (`src/config/golems.ts`)

Toda la definición de datos se encuentra desacoplada de la implementación en [`src/config/golems.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/config/golems.ts).

### 3.1 Interfaz `GolemConfig`
```typescript
export interface GolemConfig {
  /** Identificador único alfanumérico */
  id: string
  /** Nombre descriptivo o procedural del autómata */
  name: string
  /** Afinidad energética elemental */
  affinity: GolemAffinity
  /** Ruta del archivo 3D .glb en assets */
  modelSrc: string
  /** Multiplicador de escala geométrica (0.8m a 1.4m) */
  scale: number
  /** Distancia objetivo en metros respecto al avatar en el buffer de trayectoria */
  followDistance: number
  /** Multiplicador de velocidad de traslación (factor LERP) */
  moveSpeed: number
  /** Multiplicador de velocidad de giro (factor SLERP) */
  rotationSpeed: number
}
```

### 3.2 Enumeración `GolemAffinity`
Representa el pentágono de afinidades elementales definido en la Sección 7 del GDD:
```typescript
export enum GolemAffinity {
  STEAM = 'Vapor',
  GALVANIC = 'Galvánico',
  MECHANICAL = 'Mecánico',
  LUMINOUS = 'Luminoso',
  AETHER = 'Éter'
}
```

### 3.3 Configuración de los 3 Golems Iniciales
```typescript
export const INITIAL_GOLEMS_CONFIG: GolemConfig[] = [
  {
    id: 'golem_steam_01',
    name: 'Calderón de Vapor',
    affinity: GolemAffinity.STEAM,
    modelSrc: 'assets/models/golem_steam.glb',
    scale: 1.1,
    followDistance: 1.8,
    moveSpeed: 4.5,
    rotationSpeed: 6.0
  },
  {
    id: 'golem_galvanic_01',
    name: 'Chispazo Galvánico',
    affinity: GolemAffinity.GALVANIC,
    modelSrc: 'assets/models/golem_galvanic.glb',
    scale: 0.95,
    followDistance: 3.6,
    moveSpeed: 4.8,
    rotationSpeed: 6.5
  },
  {
    id: 'golem_mechanical_01',
    name: 'Acorazado Mecánico',
    affinity: GolemAffinity.MECHANICAL,
    modelSrc: 'assets/models/golem_mechanical.glb',
    scale: 1.2,
    followDistance: 5.4,
    moveSpeed: 4.2,
    rotationSpeed: 5.5
  }
]
```

---

## 4. Modelos 3D `.glb` y Carga en Escena

### 4.1 Vinculación con `GltfContainer`
La fábrica utiliza el componente estándar `GltfContainer.create(golemEntity, { src: config.modelSrc })`. 

Los modelos generados por [`scripts/generate_models.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_models.js) son binarios glTF 2.0 (`.glb`) autocontenidos:

| Archivo | Peso | Materiales PBR | Propiedades Emisivas |
| :--- | :--- | :--- | :--- |
| `assets/models/golem_steam.glb` | 12.2 KB | Cobre, Hierro Fundido, Fuego | Horno central con `emissiveFactor: [1.0, 0.45, 0.0]` |
| `assets/models/golem_galvanic.glb` | 11.4 KB | Acero Azulado, Cobre Bobinas | Reactor con `emissiveFactor: [0.0, 0.9, 1.0]` |
| `assets/models/golem_mechanical.glb` | 13.3 KB | Hierro de Chatarra, Latón | Monóculo con `emissiveFactor: [1.0, 0.75, 0.0]` |

### 4.2 Escalas y Proporciones
- Cada golem posee una escala configurable (`scale: 0.95` a `1.2`).
- La fábrica aplica esta escala simétricamente en los tres ejes (`Vector3.create(config.scale, config.scale, config.scale)`), lo que permite que golems más pesados (como el Acorazado) luzcan visualmente más imponentes que los ágiles (como el Galvánico).

---

## 5. Integración con la Forja Determinista del GDD

La `golemFactory` está diseñada para acoplarse directamente al sistema de **Forja por Hash** descrito en la Sección 6 del GDD de Golems:

```mermaid
graph TD
    A["Jugador selecciona 5 a 12 Materiales"] --> B["Serialización Canónica (ej. 'alambre:2|olla:3|...')"]
    B --> C["Función Hash FNV-1a (32 bits)"]
    C --> D["Derivador Algorítmico: Stats, Nombre, Afinidad, Escala"]
    D --> E["Construcción de GolemConfig"]
    E --> F["createFollowerGolem(config, orderIndex, spawnPos)"]
    F --> G["Golem instanciado en el mundo 3D"]
```

### 5.1 De la Receta al Hash FNV-1a
Cuando el jugador combina materiales en la forja, se genera un hash numérico entero de 32 bits mediante la función:
```typescript
function calcularHashReceta(recetaCanonica: string): number {
  let hash = 0x811c9dc5
  for (let i = 0; i < recetaCanonica.length; i++) {
    hash ^= recetaCanonica.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}
```

### 5.2 Derivación de Parámetros para la Factory
A partir de los bits del hash determinista, se derivan automáticamente los atributos requeridos por `GolemConfig`:
1. **Afinidad Dominante**: Evaluada por la suma de aportes de las piezas (Vapor, Galvánico, Mecánico, etc.).
2. **Modelo 3D Base**: Seleccionado según la afinidad (`golem_steam.glb`, `golem_galvanic.glb`, etc.).
3. **Escala Relativa**: Calculada entre $0.9\text{m}$ y $1.3\text{m}$ a partir del peso de las piezas.
4. **Nombre Procedural**: Combinación de prefijo de afinidad y sufijo estructural (ej. *«Calderón Blindado»*).
5. **Velocidad de Movimiento**: Proporcional a la estadística `SPD` resultante ($4.0 + \text{SPD} \times 0.05$).

---

## 6. Buenas Prácticas Mobile-First y Rendimiento

### 6.1 Ausencia de Colisionadores Físicos en Seguidores
- **Diseño Ergonómico**: A los golems acompañantes **NO se les añade `MeshCollider`**.
- **Razón Mobile-First**: Si los 3 golems tuvieran colisionadores de bloqueo físico, podrían atrapar o bloquear accidentalmente al avatar en esquinas estrechas o pasillos, especialmente en pantallas táctiles con joystick virtual. Al no tener colisionador físico, el jugador puede moverse con total fluidez sin riesgo de atascos.

### 6.2 Jerarquías Livianas (`Transform.parent`)
- El motor Decentraland SDK7 optimiza internamente las jerarquías de entidades. El emparentamiento de la etiqueta (`labelEntity`) con el golem (`golemEntity`) no produce recálculos costosos en JavaScript, ya que el motor C++/Rust subyacente propaga la matriz de transformación automáticamente.

### 6.3 Cumplimiento de Restricciones Móviles
- ✅ **Sin Luces Dinámicas**: El resplandor de los núcleos proviene de materiales PBR emisivos puros.
- ✅ **Sin Nine-Slice Complejo**: Las etiquetas usan texto vectorial nativo con `TextShape` y `Billboard`.
- ✅ **Draw Calls Reducidas**: Modelos binarios de una sola malla combinada por material.

---

## 7. Guía Paso a Paso para Desarrolladores: Cómo Añadir un Nuevo Golem

Para agregar un nuevo tipo o variante de Golem en el proyecto:

### Paso 1: Generar o Añadir el Modelo 3D `.glb`
Colocar el archivo `.glb` en `assets/models/nuevo_golem.glb` (o añadir su generador geométrico en `scripts/generate_models.js`).

### Paso 2: Registrar la Configuración en `src/config/golems.ts`
```typescript
export const MI_NUEVO_GOLEM: GolemConfig = {
  id: 'golem_aether_01',
  name: 'Titán de Éter',
  affinity: GolemAffinity.AETHER,
  modelSrc: 'assets/models/golem_aether.glb',
  scale: 1.25,
  followDistance: 1.8,
  moveSpeed: 4.6,
  rotationSpeed: 6.0
}
```

### Paso 3: Instanciar mediante la Factory
```typescript
import { createFollowerGolem } from './objects/golemFactory'
import { MI_NUEVO_GOLEM } from './config/golems'

const miGolem = createFollowerGolem(MI_NUEVO_GOLEM, 0, Vector3.create(16, 0, 16))
```

El nuevo golem se integrará automáticamente al sistema de seguimiento, mostrará su etiqueta coloreada correspondiente (`Violeta Místico`) y marchará en la formación del escuadrón.
