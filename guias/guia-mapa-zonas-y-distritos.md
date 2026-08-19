# 🗺️ Guía Maestra: Mapa, Distritos, Zonas y Coordenadas del Mundo de Golems (Grid 25x25 / 400m × 400m)

Esta guía técnica y documental detalla exhaustivamente la arquitectura espacial, zonificación, límites métricos, sistemas de coordenadas, distribución de distritos, trazado vial y catálogo de archivos constructores del mapa de **Golems** en Decentraland SDK7.

---

## 📑 Tabla de Contenidos

1. [Visión General y Dimensiones Globales](#1-visión-general-y-dimensiones-globales)
2. [Estructura de Archivos del Mapa y Código Fuente](#2-estructura-de-archivos-del-mapa-y-código-fuente)
3. [Mapa ASCII Maestro y Coordenadas del Mundo](#3-mapa-ascii-maestro-y-coordenadas-del-mundo)
4. [Las 4 Esquinas Simétricas del Mundo (140m × 140m c/u)](#4-las-4-esquinas-simétricas-del-mundo-140m--140m-cu)
   - [4.1 Distrito de la Forja (Suroeste: 0..140m X, 0..140m Z)](#41-distrito-de-la-forja-suroeste-0140m-x-0140m-z)
   - [4.2 Desierto de Chatarra (Noroeste: 0..140m X, 260..400m Z)](#42-desierto-de-chatarra-noroeste-0140m-x-260400m-z)
   - [4.3 Reserva de Minería Segura (Noreste: 260..400m X, 260..400m Z)](#43-reserva-de-minería-segura-noreste-260400m-x-260400m-z)
   - [4.4 Calderas de la Fundición (Sureste: 260..400m X, 0..140m Z)](#44-calderas-de-la-fundición-sureste-260400m-x-0140m-z)
5. [Zonas Intermedias, Anillos Concéntricos y Centro](#5-zonas-intermedias-anillos-concéntricos-y-centro)
   - [5.1 Los Chatarrales (Anillo 1 - Comunes)](#51-los-chatarrales-anillo-1---comunes)
   - [5.2 Fábrica Abandonada (Anillo 2 - Poco Comunes)](#52-fábrica-abandonada-anillo-2---poco-comunes)
   - [5.3 Subestación Eléctrica (Norte)](#53-subestación-eléctrica-norte)
   - [5.4 Torre de Radio (Este)](#54-torre-de-radio-este)
   - [5.5 Gran Arena Circular de Torneo Steampunk (Centro 200m, 200m)](#55-gran-arena-circular-de-torneo-steampunk-centro-200m-200m)
6. [Tabla de Coordenadas, Superficies y Niveles de Riesgo](#6-tabla-de-coordenadas-superficies-y-niveles-de-riesgo)
7. [Patrones de Construcción y Principios Mobile-First](#7-patrones-de-construcción-y-principios-mobile-first)

---

## 1. Visión General y Dimensiones Globales

El mundo de **Golems** se despliega sobre un Decentraland World (`worldConfiguration: golems.dcl.eth`, con paisaje natural `landscapeTerrain: true`).

### Dimensiones Definitivas:
- **Cuadrícula de Parcelas**: $25 \times 25$ parcelas oficiales de Decentraland (de `0,0` a `24,24`, totalizando **625 parcelas**).
- **Límites Métricos en el Espacio**:
  - **Eje X (Ancho / Oeste $\rightarrow$ Este)**: $0\text{m}$ a $400\text{m}$ ($25 \times 16\text{m}$).
  - **Eje Z (Profundidad / Sur $\rightarrow$ Norte)**: $0\text{m}$ a $400\text{m}$ ($25 \times 16\text{m}$).
  - **Eje Y (Elevación)**: Terreno base en $Y \approx 0.0\text{m}$, calzadas y plataformas en $Y \approx 0.02\text{m} - 0.05\text{m}$, estructuras elevadas hasta $Y \approx 12.0\text{m}$.
- **Superficie Total Útil**: **160.000 m²** ($400\text{m} \times 400\text{m}$).
- **Centro Geométrico del Mundo**: Coordenadas `(X: 200m, Z: 200m)`.

---

## 2. Estructura de Archivos del Mapa y Código Fuente

El diseño del mapa sigue estrictamente el patrón oficial **Game Objects / Factory** de Decentraland SDK7, separando la parametrización de datos en `src/config/` y la construcción modular de entidades en `src/objects/`:

```
d:/DECENTRALAND/Scenes/Hackathon/
├── scene.json                              # Configuración de parcels (25x25), spawnPoints y permisos
├── src/
│   ├── index.ts                            # Orquestador del ciclo de vida (main)
│   ├── config/
│   │   ├── forgeDistrictConfig.ts          # Coordenadas y assets del Distrito de la Forja (0..140, 0..140)
│   │   ├── scrapDesertConfig.ts            # Coordenadas y assets del Desierto de Chatarra (0..140, 260..400)
│   │   ├── miningReserveConfig.ts          # Coordenadas y assets de la Reserva de Minería (260..400, 260..400)
│   │   ├── foundryBoilersConfig.ts         # Coordenadas y assets de las Calderas de Fundición (260..400, 0..140)
│   │   └── arenaConfig.ts                  # Parámetros geométricos de la Gran Arena Central (200, 200)
│   └── objects/
│       ├── forgeDistrictBuilder.ts         # Fábrica constructora del Distrito de la Forja
│       ├── scrapDesertBuilder.ts           # Fábrica constructora del Desierto de Chatarra
│       ├── miningReserveBuilder.ts         # Fábrica constructora de la Reserva de Minería
│       ├── foundryBoilersBuilder.ts        # Fábrica constructora de las Calderas de la Fundición
│       └── arenaBuilder.ts                 # Fábrica constructora de la Gran Arena de Torneo
```

---

## 3. Mapa ASCII Maestro y Coordenadas del Mundo

```text
(0m, 400m)                                                                   (400m, 400m)
┌──────────────────────────────────────┬──────────────────────────────────────┐
│  DESIERTO DE CHATARRA (Noroeste)     │  RESERVA DE MINERÍA (Noreste)        │
│  - Dimensiones: 140m x 140m          │  - Dimensiones: 140m x 140m          │
│  - X: [0..140m] | Z: [260..400m]     │  - X: [260..400m] | Z: [260..400m]   │
│  - Hito: Cráter Primigenio (70, 330) │  - Hito: Cantera Central (340, 340)  │
│  - Nido del Dragón (40, 370)         │  - Taller Relojería/Bronce (360, 375)│
│  - Portal: (130, 270) [Marcador 06]  │  - Portal: (270, 270) [Marcador 03]  │
│  - ZONA PK LIBRE (Legendarios)       │  - ZONA SEGURA (Épicos y Raros)      │
├──────────────────────────────────────┴──────────────────────────────────────┤
│               SUBESTACIÓN ELÉCTRICA (Norte: X: 140..260m, Z: 280..400m)     │
│               - Bobinas de Tesla, Baterías Alquímicas, Motores de Vapor     │
├─────────────────────────────────────────────────────────────────────────────┤
│               GRAN ARENA CIRCULAR DE TORNEO STEAMPUNK (Centro)              │
│               - Centro: (200m, 200m) | Diámetro: 72m (Radio: 36m)           │
│               - Torneo Escalera 1v1 y 2v2 | Ring-Out & Pilares de Cell      │
├─────────────────────────────────────────────────────────────────────────────┤
│               TORRE DE RADIO (Este: X: 280..400m, Z: 140..260m)             │
│               - Antenas de Radio, Diodos LED (Luminosos y Velocidad)        │
├──────────────────────────────────────┬──────────────────────────────────────┤
│  DISTRITO DE LA FORJA (Suroeste)     │  CALDERAS DE FUNDICIÓN (Sureste)     │
│  - Dimensiones: 140m x 140m          │  - Dimensiones: 140m x 140m          │
│  - X: [0..140m] | Z: [0..140m]       │  - X: [260..400m] | Z: [0..140m]     │
│  - Spawn Inicial: (16m, 5m)          │  - Hito: Gran Horno Central (330, 70)│
│  - Plaza Mayor Forja: (70, 70)       │  - Reactor de Éter (370, 100)        │
│  - Puerta Norte: (70, 140) [01]      │  - Pabellón Enfriamiento (295, 40)   │
│  - Puerta Este: (140, 70) [02]       │  - Portal: (270, 130) [Marcador 07]  │
│  - ZONA SEGURA ABSOLUTA (Hub Inicial)│  - ZONA PK LIBRE (Épicos de Caldera) │
└──────────────────────────────────────┴──────────────────────────────────────┘
(0m, 0m)                                                                     (400m, 0m)
```

---

## 4. Las 4 Esquinas Simétricas del Mundo (140m × 140m c/u)

Las cuatro esquinas del mapa están diseñadas con **dimensiones simétricas idénticas de 140m × 140m** ($19.600\text{ m²}$ cada una, totalizando $78.400\text{ m²}$ entre las 4 esquinas), albergando las mayores concentraciones de infraestructuras de forja, minería y extracción especializada:

### 4.1 Distrito de la Forja (Suroeste: `0..140m X`, `0..140m Z`)
- **Superficie**: $19.600\text{ m²}$ (Parcelas `0,0` a `8,8`).
- **Nivel de Riesgo**: 🟢 **Zona Segura Absoluta** (Spawn, Hub, Crafting, Sin PK).
- **Punto de Spawn Oficial**: `(X: 16m, Y: 0.05m, Z: 6m)`. El jugador aparece con vista al norte orientada hacia la Plaza Mayor.
- **Plaza Mayor de la Gran Forja (`(70, 70)`)**:
  - Plataforma monumental de 12x12m elevada sobre losas de madera y metal.
  - Gran eje vertical (`Gear Shaft.glb`), rueda de engranaje masiva (`Gear Big.glb`), engranajes de tracción (`Gear 10 Teeth.glb`, `Gear Angled 10 Teeth.glb`).
  - 4 chimeneas industriales humeantes (`Smoker.glb`), tanques gigantes de vapor (`Tank.glb`), cofres de forja y mecanismos de palancas.
- **Red Vial y Puertas de Acceso**:
  - Ejes troncales ortogonales $X=70$ y $Z=70$ cruzando en `(70, 70)`.
  - **Puerta Norte ("Puerta de la Chatarra") en `(70, 140)`**: Bastiones industriales con marcador `SteamPunk_Number_01`.
  - **Puerta Este ("Puerta de las Calderas") en `(140, 70)`**: Bastiones industriales con marcador `SteamPunk_Number_02`.
- **4 Talleres Satélites**:
  - *Taller Mecánico* `(40, 105)`: Techado con techos elevados (`Ceiling 4x4M.glb`), bancos de engranajes finos y tanques.
  - *Taller de Vapor y Calderería* `(105, 40)`: Tanques de presión y cofres de placas blindadas.
  - *Pabellón de Maestros Forjadores* `(35, 45)`: Mesas de ensamble de golems.
  - *Puesto de Guardia y Vigía* `(105, 105)`: Plataforma con farolas de vigilancia y suministros.
- **Escombros y Transición**: Cúmulos de tablones rotos y engranajes semienterrados en los exteriores de las puertas `(70, 146)` y `(146, 70)`.

---

### 4.2 Desierto de Chatarra (Noroeste: `0..140m X`, `260..400m Z`)
- **Superficie**: $19.600\text{ m²}$ (Parcelas `0,16` a `8,24`).
- **Nivel de Riesgo**: 🔴 **Zona PK Libre de Máximo Peligro** (Materiales Legendarios, Guardianes Élite).
- **Materiales Exclusivos**: `ojo_dragon` (Ojo de dragón mecánico) y `corazon_primigenio` (Corazón de golem primigenio).
- **Hitos Arquitectónicos**:
  - **Portal del Desierto (`(130, 270)`)**: Entrada flanqueada por bastiones de tanques, chimeneas, farolas y marcador `SteamPunk_Number_06`.
  - **Cráter del Autómata Primigenio (`(70, 330)`)**: Plataforma monumental de despiece de 12x12m con engranaje colosal de 2.6m (`Gear Big.glb`), eje de transmisión de 2.2m (`Gear Shaft.glb`), engranajes de tracción y 4 chimeneas de escape de gases.
  - **Nido del Dragón Mecánico (`(40, 370)`)**: Estructura techada elevada con engranajes angulares y la reliquia ancestral (`Arthur Sword.glb`).
  - **Pabellón de Desguace Pesado (`(100, 360)`)**: Taller industrial con tanques de presión, palancas e interruptores.
- **Delimitación Perimetral**: Barricadas defensivas de vallas pesadas (`Tree Fence.glb`) y barriles a lo largo de $Z=260\text{m}$ y $X=140\text{m}$.

---

### 4.3 Reserva de Minería Segura (Noreste: `260..400m X`, `260..400m Z`)
- **Superficie**: $19.600\text{ m²}$ (Parcelas `16,16` a `24,24`).
- **Nivel de Riesgo**: 🟢 **Zona Segura Sin Combate** (Sin PK, Sin asaltos, Alta recompensa).
- **Materiales Exclusivos**: `nucleo_mana` (Núcleo de maná condensado), `cerebro_automata` (Cerebro de autómata) y `engranajes_bronce` (Engranajes de bronce perfectos).
- **Hitos Arquitectónicos**:
  - **Portal de la Reserva Minera (`(270, 270)`)**: Entrada monumental con torres gemelas de tanques, chimeneas y marcador `SteamPunk_Number_03`.
  - **Cantera Central de Extracción de Éter (`(340, 340)`)**: Plataforma de 12x12m con torno vertical gigante de extracción, 4 chimeneas subterráneas, tanques de compresión y mesas de catalogación de núcleos de maná.
  - **Taller de Relojería y Engranajes de Bronce (`(360, 375)`)**: Pabellón techado con bancos de clasificación de piezas finas (`Gear 8 Teeth`, `Gear 5 Teeth`, `Gear Small 01..03`), almacén de aleaciones y marcador `SteamPunk_Number_04`.
  - **Pozo de Prospección Profunda de Éter (`(375, 295)`)**: Torre vertical de perforación a 4.4m de altura y marcador `SteamPunk_Number_05`.
  - **Refugio de los Exploradores (`(290, 340)`)**: Pabellón techado de descanso con hidrante, farolas de mesa y pedestal con la reliquia de prospección.
- **Delimitación Perimetral**: Barricadas a lo largo de las fronteras $Z=260\text{m}$ y $X=260\text{m}$.

---

### 4.4 Calderas de la Fundición (Sureste: `260..400m X`, `0..140m Z`)
- **Superficie**: $19.600\text{ m²}$ (Parcelas `16,0` a `24,8`).
- **Nivel de Riesgo**: 🔴 **Zona PK Libre de Máximo Peligro** (Materiales Épicos de Fusión, Guardianes Élite).
- **Materiales Exclusivos**: `corazon_caldera` (Corazón de caldera) y `reactor_eter` (Reactor de éter).
- **Hitos Arquitectónicos**:
  - **Portal de las Calderas (`(270, 130)`)**: Entrada monumental flanqueada por torres de compresión térmica, chimeneas y marcador `SteamPunk_Number_07`.
  - **El Gran Horno / Caldera Central (`(330, 70)`)**: Plataforma colosal de 12x12m con 4 chimeneas industriales emitiendo vapor constante (`Smoker.glb`), tanques gigantes de caldera (`Tank.glb`), eje de bombeo de calor y mecanismos de control térmico.
  - **Complejo del Reactor de Éter y Fusión (`(370, 100)`)**: Torre vertical de compresión a 4.4m de altura, engranajes cónicos y depósitos blindados.
  - **Pabellón de Enfriamiento y Vaciado de Placas (`(295, 40)`)**: Estructura techada con mesas de enfriamiento, hidrantes, cofres de placas (`Chest Plates.glb`) y barriles de refrigerante.
- **Delimitación Perimetral**: Barricadas defensivas a lo largo de $Z=140\text{m}$ y $X=260\text{m}$.

---

## 5. Zonas Intermedias, Anillos Concéntricos y Centro

El espacio central entre las 4 esquinas simétricas ($81.600\text{ m²}$ restantes) conforma las rutas de progresión concéntrica del juego:

```text
                  (X: 140..260m, Z: 280..400m)
                  ┌───────────────────────────┐
                  │   SUBESTACIÓN ELÉCTRICA   │
                  │   (Galvánicos / Raros)    │
(X: 0..140m,      └─────────────┬─────────────┘      (X: 280..400m,
 Z: 140..260m)                  │                     Z: 140..260m)
┌──────────────┐  ┌─────────────┴─────────────┐  ┌──────────────┐
│ LOS          │  │     GRAN ARENA CENTRAL    │  │ TORRE DE     │
│ CHATARRALES  │──│     (X: 200m, Z: 200m)    │──│ RADIO        │
│ (Comunes)    │  │    (Torneo Escalera DCL)  │  │ (Luminosos)  │
└──────────────┘  └─────────────┬─────────────┘  └──────────────┘
                  ┌─────────────┴─────────────┐
                  │    FÁBRICA ABANDONADA     │
                  │    (Poco Comunes)         │
                  └───────────────────────────┘
                  (X: 140..260m, Z: 140..260m)
```

### 5.1 Los Chatarrales (Anillo 1 - Comunes)
- **Ubicación**: Pasillos abiertos y llanuras entre el Distrito de la Forja y los anillos exteriores.
- **Materiales**: `alambre_cobre`, `tornillos_pernos`, `engranajes_desgastados`, `tubos_cobre`, `sartenes`, `ollas_cocinar`, `placas_laton`.
- **Dinámica**: Terreno despejado y seguro para familiarizarse con el radar de calor.

### 5.2 Fábrica Abandonada (Anillo 2 - Poco Comunes)
- **Ubicación**: Anillo concéntrico intermedio alrededor del centro.
- **Materiales**: `transistores`, `bombillas_filamento`, `resortes_reloj`, `manometros`, `valvulas_vapor`, `lentes_tv_viejo`.
- **Dinámica**: Estructuras derruidas y componentes de nivel medio.

### 5.3 Subestación Eléctrica (Norte)
- **Ubicación**: Sector Norte `X: 140m a 260m`, `Z: 280m a 400m`.
- **Materiales**: `motor_vapor`, `bobinas_tesla`, `baterias_alquimicas`.
- **Dinámica**: Complejo de alta tensión con afinidad galvánica y vapor.

### 5.4 Torre de Radio (Este)
- **Ubicación**: Sector Este `X: 280m a 400m`, `Z: 140m a 260m`.
- **Materiales**: `antenas_radio`, `diodos_led`.
- **Dinámica**: Torres de comunicación y materiales luminosos de velocidad.

### 5.5 Gran Arena Circular de Torneo Steampunk (Centro: `200m, 200m`)
- **Ubicación**: Coordenadas exactas `(X: 200.0m, Y: 0.0m, Z: 200.0m)`.
- **Dimensiones**: Plataforma circular colosal de **72m de diámetro** (Radio $R = 36\text{m}$) elevada a $0.6\text{m}$.
- **Hitos**: 4 Pilares monumentales de esquina de 12m de altura, sistema planetario de engranajes centrales giratorios, 16 balizas perimetrales y 4 grandes rampas cardinales (Norte, Sur, Este, Oeste).
- **Función**: Sede del Torneo Escalera competitivo 1v1 (3 vs 3 golems) y 2v2 (6 vs 6 golems).
- **Guía Técnica de la Arena**: [`guias/guia-arena-torneo-steampunk.md`](file:///d:/DECENTRALAND/Scenes/Hackathon/guias/guia-arena-torneo-steampunk.md).

---

## 6. Tabla de Coordenadas, Superficies y Niveles de Riesgo

| Zona / Distrito | Rango X (m) | Rango Z (m) | Superficie (m²) | Parcelas DCL | Nivel de Riesgo | Afinidad y Materiales Dominantes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Distrito de la Forja** | `0` a `140` | `0` a `140` | 19.600 m² | `0,0` a `8,8` | 🟢 Seguro (Spawn) | Taller, Yunque de Forja, Spawn, Gestión de Misiones |
| **Desierto de Chatarra** | `0` a `140` | `260` a `400` | 19.600 m² | `0,16` a `8,24` | 🔴 Peligro (PK) | Legendarios (`ojo_dragon`, `corazon_primigenio`) |
| **Reserva de Minería** | `260` a `400` | `260` a `400` | 19.600 m² | `16,16` a `24,24`| 🟢 Seguro (No PK) | Épicos (`nucleo_mana`, `cerebro_automata`, `engranajes_bronce`) |
| **Calderas Fundición** | `260` a `400` | `0` a `140` | 19.600 m² | `16,0` a `24,8` | 🔴 Peligro (PK) | Épicos (`corazon_caldera`, `reactor_eter`) |
| **Los Chatarrales** | Pasillos | Pasillos | ~25.000 m² | Anillo 1 | 🟢 Muy Bajo | Comunes (Alambre, Tornillos, Ollas, Latón) |
| **Fábrica Abandonada** | `140` a `260` | `140` a `260`| ~20.000 m² | Anillo 2 | 🟡 Medio | Poco Comunes (Transistores, Manómetros, Válvulas) |
| **Subestación Eléctrica**| `140` a `260` | `280` a `400`| ~14.400 m² | Norte | 🟠 Alto | Raros Galvánicos (Bobinas Tesla, Baterías) |
| **Torre de Radio** | `280` a `400` | `140` a `260`| ~14.400 m² | Este | 🟠 Alto | Raros Luminosos (Antenas de Radio, Diodos LED) |
| **Gran Arena Torneo** | `164` a `236` | `164` a `236`| ~4.071 m² | Centro `12,12` | 🏆 Torneo Escalera | Arena Circular Steampunk 72m diámetro |

---

## 7. Patrones de Construcción y Principios Mobile-First

1. **Arquitectura Modular (Factory Pattern)**:
   - Todo el entorno 3D está descompuesto en fábricas independientes dentro de `src/objects/`.
   - El archivo `src/index.ts` se mantiene estrictamente como un orquestador limpio.
2. **Cero Luces Dinámicas (`PBPointLight`)**:
   - Para garantizar 60 FPS en la aplicación móvil de Decentraland (Godot Explorer), no se utilizan fuentes de luz dinámica en tiempo real. Se emplean materiales PBR con texturas horneadas y canales de auto-iluminación emisiva.
3. **Calzadas y Vías de Gran Amplitud ($\ge 8\text{m}$)**:
   - Todas las arterias y caminos principales tienen entre $8\text{m}$ y $12\text{m}$ de ancho para permitir el libre tránsito simultáneo de avatares con sus formaciones de 3 golems acompañantes sin colisiones ni atascos de cámara.
4. **Colisionadores Físicos Transparentes y Eficientes**:
   - Únicamente las estructuras sólidas visibles (muros, vallas, bastiones, tanques) poseen colisión física; el suelo y las áreas abiertas están completamente despejadas de mallas de colisión invisibles que puedan trabar el movimiento táctil.
