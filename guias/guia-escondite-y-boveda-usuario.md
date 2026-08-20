# ⛺ Guía Maestra: Escondite y Bóveda del Jugador (User's Hideout & Vault) en el Distrito de la Forja

Esta guía técnica y documental detalla exhaustivamente la arquitectura espacial, el diseño escenográfico, la integración de assets steampunk, el posicionamiento métrico y las buenas prácticas de desarrollo del **Escondite y Bóveda del Jugador (User's Hideout & Vault)** en **Golems World** para **Decentraland SDK7**.

---

## 📑 Tabla de Contenidos

1. [Visión General, Fantasía y Propósito](#1-visión-general-fantasía-y-propósito)
2. [Ubicación Espacial, Cotas Métricas y Simetría](#2-ubicación-espacial-cotas-métricas-y-simetría)
3. [Estructura de Archivos y Código Fuente](#3-estructura-de-archivos-y-código-fuente)
4. [Bóveda Frontal: Los 3 Cofres Cerrados](#4-bóveda-frontal-los-3-cofres-cerrados)
5. [Rincón Interior de Descanso y Tejadillo](#5-rincón-interior-de-descanso-y-tejadillo)
6. [Pilas de Escombros, Chatarra y Desorden (Wreckages)](#6-pilas-de-escombros-chatarra-y-desorden-wreckages)
7. [Plano de Planta y Diagrama ASCII](#7-plano-de-planta-y-diagrama-ascii)
8. [Catálogo Completo de Modelos 3D y Assets](#8-catálogo-completo-de-modelos-3d-y-assets)
9. [Principios de Rendimiento y Mobile-First](#9-principios-de-rendimiento-y-mobile-first)

---

## 1. Visión General, Fantasía y Propósito

El **Escondite del Jugador** es un rincón escenográfico clandestino ambientado en la estética post-industrial del juego, diseñado como el taller improvisado y refugio personal de un chatarrero superviviente.

### Propósito Escenográfico:
- **Identidad Visual**: Un campamento de supervivencia construido con restos metálicos reciclados, maderas desparejas, barriles oxidados y maquinaria humeante.
- **Bóveda de Inventario**: Una plataforma frontal despejada con **3 cofres cerrados** de alta resistencia que representan el almacén y custodia de tesoros del jugador.
- **Enfoque Puramente Escenográfico**: Diseñado sin triggers invasivos ni lógicas funcionales pesadas, optimizado al 100% para la inmersión visual y el rendimiento en pantallas táctiles y dispositivos móviles.

---

## 2. Ubicación Espacial, Cotas Métricas y Simetría

El escondite se ubica en el lateral occidental del **Distrito de la Forja**, situado exactamente en el punto medio entre el **Trampolín de Vapor** y el **Paseo Comercial Oeste (Puesto #06)**:

```text
    (X: 0m, Z: 28.3m)                         (X: 6.4m, Z: 28.3m)
    Borde Oeste del Mapa                      [PUESTO DE MERCADO #06]
             │                                         │
             │           ◄────── 7.70m ──────►         │
             │                                         │
             │         ┌─────────────────────┐         │
             │         │ ESCONDITE & BÓVEDA  │         │
             │         │ (Centro Z: 17.70m)  │         │
             │         └─────────────────────┘         │
             │                                         │
             │           ◄────── 7.70m ──────►         │
             │                                         │
    (X: 0m, Z: 7.1m)                          (X: 5.1m, Z: 7.1m)
    Borde Oeste del Mapa                      [TRAMPOLÍN DE VAPOR]
```

### Cotas Métricas Definitivas:
- **Eje Z (Centro del Escondite)**: `Z = 17.70m` *(Punto medio exacto entre el Trampolín en Z=7.10m y el Puesto de Mercado #06 en Z=28.30m)*.
- **Espacio Libre al Sur**: `7.70 metros` despejados hacia el Trampolín de Vapor (`Z: 7.10m`), garantizando una zona amplia de aproximación y salto.
- **Espacio Libre al Norte**: `7.70 metros` despejados hacia el Puesto de Mercado #06 (`Z: 28.30m`), facilitando el tránsito de peatones hacia el paseo comercial.
- **Eje X (Separación del Borde del Mapa)**: Desplazado de `X: 3.8m` a `X: 8.0m` (dejando casi 4 metros libres respecto a la frontera `X = 0`, alineado de forma armónica con la hilera de los puestos comerciales).

---

## 3. Estructura de Archivos y Código Fuente

El escondite se implementó siguiendo estrictamente la arquitectura modular recomendada por Decentraland SDK7:

```
d:/DECENTRALAND/Scenes/Hackathon/
├── src/
│   ├── config/
│   │   └── userHideoutConfig.ts       # Definición de límites, coordenadas y catálogo de modelos GLB
│   ├── objects/
│   │   └── userHideoutBuilder.ts      # Constructor modular del escenario, props y bóveda
│   └── index.ts                       # Invocación de createUserHideout() en el ciclo de vida principal
```

---

## 4. Bóveda Frontal: Los 3 Cofres Cerrados

Los **3 cofres cerrados** constituyen la fachada principal de la bóveda de inventario del usuario. Están dispuestos en un arco frontal despejado (`X: 7.6m a 8.0m`), separados más de 2 metros de la pila de chatarra y distanciados entre sí por 2.3 metros:

| Cofre | Modelo 3D (.glb) | Coordenadas (X, Y, Z) | Rotación (Pitch, Yaw, Roll) | Separación |
| :--- | :--- | :--- | :--- | :--- |
| **Cofre 1 (Sur / Izquierdo)** | `assets/asset-packs/treasure_chest/chest_pirates.glb` | `(7.60m, 0.04m, 15.40m)` | `(0°, 15.0°, 0°)` | Tarima propia (`0.7m × 0.7m`) |
| **Cofre 2 (Centro)** | `assets/asset-packs/chest_plates/Chest Plates.glb` | `(8.00m, 0.04m, 17.70m)` | `(0°, 0.0°, 0°)` | **2.30m** del Cofre 1 |
| **Cofre 3 (Norte / Derecho)** | `assets/asset-packs/chest_gear/Chest Gear.glb` | `(7.60m, 0.04m, 20.00m)` | `(0°, -15.0°, 0°)` | **2.30m** del Cofre 2 |

### Inmovilidad y Estaticidad Total:
Para garantizar que los cofres permanezcan permanentemente cerrados y no ejecuten bucles de animación involuntarios al cargarse el modelo, el constructor aplica explícitamente:
```typescript
Animator.createOrReplace(entity, {
  states: []
})
```

---

## 5. Rincón Interior de Descanso y Tejadillo

Bajo la cubierta inclinada se ubica la zona de descanso y trabajo del chatarrero:
- **Silla Steampunk** ([`Steampunk Chair.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/asset-packs/steampunk_chair/Steampunk%20Chair.glb)): Situada en `(4.70m, 0.04m, 17.70m)` con rotación `Y: 50°`, mirando hacia los cofres y el camino.
- **Mesa de Trabajo de Engranaje** ([`Gear Table.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/asset-packs/gear_table/Gear%20Table.glb)): Ubicada en `(5.40m, 0.02m, 16.70m)` con su lámpara de mesa ([`Table Lamp.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/asset-packs/table_lamp/Table%20Lamp.glb)) en `(5.35m, 0.82m, 16.65m)`.
- **Taburete Auxiliar de Tambor** ([`Drumm Chair.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/asset-packs/drumm_chair/Drumm%20Chair.glb)): En `(5.30m, 0.03m, 18.80m)`.
- **Tejadillo Inclinado de Chapa** ([`Ceiling 4x4M.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/asset-packs/ceiling_4x4m/Ceiling%204x4M.glb)): Montado a $Y = 2.70\text{m}$ en `(4.80m, 2.70m, 17.70m)` con una inclinación angular de `(14°, 5°, -8°)`.
- **Calderín Humeante** ([`Smoker.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/asset-packs/smoker/Smoker.glb)): En `(4.00m, 0.02m, 17.70m)` emitiendo columnas de vapor que escapan por el lateral del tejadillo.

---

## 6. Pilas de Escombros, Chatarra y Desorden (Wreckages)

Para mantener la estética de desorden extremo (*disarray*) sin obstaculizar la vista frontal de los cofres, toda la chatarra se encuentra estrictamente confinada en los laterales y en la pared trasera (`X ≤ 5.5m`):

1. **Vagoneta Minera Descarrilada** ([`Mines Cart Empty.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/asset-packs/mines_cart_empty/Mines%20Cart%20Empty.glb)): Volcada a 16° en `(4.50m, 0.02m, 19.70m)`.
2. **Engranajes Monumentales Oxidados**:
   - `Gear Big` (1.4x) clavado a 68° en `(4.00m, 0.50m, 15.50m)`.
   - `Gear Big` (1.5x) apoyado a 72° en `(3.90m, 0.55m, 19.80m)`.
   - Engranajes secundarios (`gear10Teeth`, `gear8Teeth`, `gearAngled10`, `gearShaft`, piñones pequeños) esparcidos en los ángulos traseros.
3. **Cúmulos de Desechos y Basura** ([`Trash_Group.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/asset-packs/trash_group/Trash_Group.glb)): En `(4.50m, 0.02m, 15.50m)` y `(4.50m, 0.02m, 19.90m)`.
4. **Contenedores Abollados** ([`Trash_Can.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/asset-packs/trash_can/Trash_Can.glb)): Contenedor volcado a 80° en `(5.20m, 0.02m, 14.90m)` y contenedor erguido en `(4.40m, 0.02m, 18.90m)`.
5. **Barriles Industriales** ([`Barrel.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/asset-packs/barrel/Barrel.glb)): Barril en pie en `(4.10m, 0.02m, 16.20m)` y barril tumbado rodando en `(4.30m, 0.16m, 18.70m)`.
6. **Vallas de Madera Rota** ([`Mines Wood Fence Broken.glb`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/asset-packs/mines_wood_fence_broken/Mines%20Wood%20Fence%20Broken.glb)): Formando la pared trasera en `X = 3.80m`.

---

## 7. Plano de Planta y Diagrama ASCII

```text
 (Z: 20.6m) ┌──────────────────────────────────────────────────────────┐
            │  [Valla Norte]  [Engranaje 1.5m]  [Vagoneta Volcada]     │
            │  (4.4, 20.7)     (3.9, 19.8)       (4.5, 19.7)          │
            │                                                         │
            │                                  [COFRE DERECHO #3]     │
            │                                  (X: 7.6m, Z: 20.0m)    │
            │                                                         │
            │  [Pared Oeste]  [SILLA STEAMPUNK]  ◄── 2.30m ──►        │
            │  (X: 3.8m)      (4.7, 17.7)      [COFRE CENTRAL #2]     │
            │                 [Calderín Humo]  (X: 8.0m, Z: 17.7m)    │
            │                                                         │
            │                                  ◄── 2.30m ──►          │
            │  [Mesa Trabajo] [Trash Can]      [COFRE IZQUIERDO #1]   │
            │  (5.4, 16.7)    (5.2, 14.9)      (X: 7.6m, Z: 15.4m)    │
            │  [Valla Sur]    [Engranaje 1.4m]                        │
 (Z: 14.8m) └──────────────────────────────────────────────────────────┘
            (X: 3.8m)          (X: 5.5m)       (X: 7.6m a 8.0m)
            Pared Trasera     Pasillo Libre    Línea Frontal de Cofres
```

---

## 8. Catálogo Completo de Modelos 3D y Assets

Todos los modelos son archivos binarios `.glb` optimizados alojados en `assets/asset-packs/`:

| Componente | Nombre del Asset | Ruta Local |
| :--- | :--- | :--- |
| **Silla de Descanso** | `Steampunk Chair` | `assets/asset-packs/steampunk_chair/Steampunk Chair.glb` |
| **Mesa de Trabajo** | `Gear Table` | `assets/asset-packs/gear_table/Gear Table.glb` |
| **Lámpara de Mesa** | `Table Lamp` | `assets/asset-packs/table_lamp/Table Lamp.glb` |
| **Taburete Auxiliar** | `Drumm Chair` | `assets/asset-packs/drumm_chair/Drumm Chair.glb` |
| **Farol de Poste** | `Lamp` | `assets/asset-packs/lamp/Lamp.glb` |
| **Cofre Cerrado 1** | `Treasure Chest` | `assets/asset-packs/treasure_chest/chest_pirates.glb` |
| **Cofre Cerrado 2** | `Chest Plates` | `assets/asset-packs/chest_plates/Chest Plates.glb` |
| **Cofre Cerrado 3** | `Chest Gear` | `assets/asset-packs/chest_gear/Chest Gear.glb` |
| **Tejadillo** | `Ceiling 4x4M` | `assets/asset-packs/ceiling_4x4m/Ceiling 4x4M.glb` |
| **Suelo Desparejo** | `Wood Planks Broken 4x4M` | `assets/asset-packs/wood_planks_broken_4x4m/Wood Planks Broken_4x4M.glb` |
| **Tarima Individual** | `Wood Plank Floor 2x2M` | `assets/asset-packs/wood_plank_floor_2x2m/Wood Plank Floor 2x2M.glb` |
| **Valla Rota** | `Mines Wood Fence Broken` | `assets/asset-packs/mines_wood_fence_broken/Mines Wood Fence Broken.glb` |
| **Empalizada** | `Tree Fence` | `assets/asset-packs/tree_fence/Tree Fence.glb` |
| **Vagoneta Volcada** | `Mines Cart Empty` | `assets/asset-packs/mines_cart_empty/Mines Cart Empty.glb` |
| **Basura / Chatarra** | `Trash Group` | `assets/asset-packs/trash_group/Trash_Group.glb` |
| **Lata de Basura** | `Trash Can` | `assets/asset-packs/trash_can/Trash_Can.glb` |
| **Engranaje Gigante** | `Gear Big` | `assets/asset-packs/gear_big/Gear Big.glb` |
| **Engranajes Varios** | `Gear 10/8/5 Teeth, Angled, Shaft` | `assets/asset-packs/gear_*/...` |
| **Barriles** | `Barrel` | `assets/asset-packs/barrel/Barrel.glb` |
| **Calderín de Humo** | `Smoker` | `assets/asset-packs/smoker/Smoker.glb` |
| **Hidrante** | `Hidrant` | `assets/asset-packs/hidrant/Hidrant.glb` |

---

## 9. Principios de Rendimiento y Mobile-First

1. **Entidades Estáticas sin Sobrecarga CRDT**: Todos los elementos se crean como entidades estáticas sin sistemas de bucle tick-by-tick innecesarios, minimizando el consumo de CPU.
2. **Materiales PBR y Texturas Horneadas**: Sin luces dinámicas (`PBPointLight`), garantizando compatibilidad total con la aplicación móvil de Decentraland (Godot Explorer).
3. **Colisionadores Naturales**: El tejadillo, vallas traseras y vagoneta actúan como barreras físicas perimetrales sin bloquear el tránsito hacia el sur (trampolín) ni hacia el norte (mercado).
4. **Pasillos Amplios**: Más de 2.0 metros libres en todas las direcciones para evitar que el avatar del jugador o los golems acompañantes queden atascados.
