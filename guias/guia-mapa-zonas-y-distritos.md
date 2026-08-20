# 🗺️ Guía Maestra: Mapa, Distritos, Zonas y Coordenadas del Mundo de Golems (Grid 25x25 / 400m × 400m)

Esta guía técnica y documental detalla exhaustivamente la arquitectura espacial, zonificación, límites métricos, sistemas de coordenadas, distribución de distritos, trazado vial y catálogo completo de archivos constructores y assets del mapa de **Golems** en Decentraland SDK7.

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
   - [5.1 Los Chatarrales (Oeste: 0..140m X, 140..260m Z)](#51-los-chatarrales-oeste-0140m-x-140260m-z)
   - [5.2 Fábrica Abandonada (Anillo 2: 140..260m X, 140..260m Z)](#52-fábrica-abandonada-anillo-2-140260m-x-140260m-z)
   - [5.3 Subestación Eléctrica (Norte: 140..260m X, 280..400m Z)](#53-subestación-eléctrica-norte-140260m-x-280400m-z)
   - [5.4 Torre de Radio (Este: 280..400m X, 140..260m Z)](#54-torre-de-radio-este-280400m-x-140260m-z)
   - [5.5 Gran Arena Circular de Torneo Steampunk (Centro: 200m, 200m)](#55-gran-arena-circular-de-torneo-steampunk-centro-200m-200m)
   - [5.6 Corredor y Gran Vía del Sur (Parcelas 13,1 - X: 140..260m, Z: 0..140m)](#56-corredor-y-gran-vía-del-sur-parcelas-131---x-140260m-z-0140m)
6. [Tabla de Coordenadas, Superficies y Niveles de Riesgo](#6-tabla-de-coordenadas-superficies-y-niveles-de-riesgo)
7. [Catálogo Completo de Modelos 3D y Assets Utilizados](#7-catálogo-completo-de-modelos-3d-y-assets-utilizados)
8. [Patrones de Construcción y Principios Mobile-First](#8-patrones-de-construcción-y-principios-mobile-first)
9. [Sistema de Minimapa, Cartografía 2D y Orientación](#9-sistema-de-minimapa-cartografía-2d-y-orientación)
10. [Sistema de 150 Golems Ambientales y Patrullaje Orgánico](#10-sistema-de-150-golems-ambientales-y-patrullaje-orgánico)

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
│   │   ├── substationConfig.ts             # Coordenadas y assets de la Subestación Eléctrica (140..260, 280..400)
│   │   ├── radioTowerConfig.ts             # Coordenadas y assets de la Torre de Radio (280..400, 140..260)
│   │   ├── chatarralesConfig.ts            # Coordenadas y assets de Los Chatarrales (0..140, 140..260)
│   │   ├── abandonedFactoryConfig.ts       # Coordenadas y assets de la Fábrica Abandonada (140..260, 140..260)
│   │   ├── southCorridorConfig.ts          # Coordenadas y assets del Corredor Sur y Parcela 13,1 (140..260, 0..140)
│   │   ├── tradingPostsConfig.ts           # Coordenadas y assets de los 5 Puestos de Comercio (25..58, 6..11)
│   │   ├── wreckageLabConfig.ts            # Coordenadas y assets del Laboratorio Wreckage Lab (16..36, 30..39)
│   │   └── arenaConfig.ts                  # Parámetros geométricos de la Gran Arena Central (200, 200)
│   └── objects/
│       ├── forgeDistrictBuilder.ts         # Fábrica constructora del Distrito de la Forja
│       ├── scrapDesertBuilder.ts           # Fábrica constructora del Desierto de Chatarra
│       ├── miningReserveBuilder.ts         # Fábrica constructora de la Reserva de Minería
│       ├── foundryBoilersBuilder.ts        # Fábrica constructora de las Calderas de la Fundición
│       ├── substationBuilder.ts            # Fábrica constructora de la Subestación Eléctrica
│       ├── radioTowerBuilder.ts            # Fábrica constructora de la Torre de Radio
│       ├── chatarralesBuilder.ts           # Fábrica constructora de Los Chatarrales
│       ├── abandonedFactoryBuilder.ts      # Fábrica constructora de la Fábrica Abandonada
│       ├── southCorridorBuilder.ts         # Fábrica constructora del Corredor Sur y Parcela 13,1
│       ├── tradingPostsBuilder.ts          # Fábrica constructora de los 5 Puestos de Comercio
│       ├── wreckageLabBuilder.ts           # Fábrica constructora del Laboratorio Wreckage Lab (Creación de Golems)
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
│  - Spawn Inicial: (16m, 6m)          │  - Hito: Gran Horno Central (330, 70)│
│  - Plaza Mayor Forja: (70, 70)       │  - Reactor de Éter (370, 100)        │
│  - Puerta Norte: (70, 140) [01]      │  - Pabellón Enfriamiento (295, 40)   │
│  - Puerta Este: (140, 70) [02]       │  - Portal: (270, 130) [Marcador 07]  │
│  - Bulevar Sur & Paseo Oeste (10 P.) │  - ZONA PK LIBRE (Épicos de Caldera) │
│  - Trampolín de Vapor: (5.1m, 7.1m)  │                                      │
│  - ZONA SEGURA ABSOLUTA (Hub Inicial)│                                      │
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
  - **Calzada Sur-Central (Bulevar de Enlace [1,1] a [4,1])**: Camino adoquinado este-oeste continuo a lo largo de $Z \approx 25.5\text{m}$ desde $X = 19.1\text{m}$ (Parcela `[1, 1]`, empalme con ruta de Spawn $X=16\text{m}$) hasta $X = 66.5\text{m}$ (Parcela `[4, 1]`, empalme con Troncal Norte-Sur $X=70\text{m}$), equipado con farolas industriales triples a ambos márgenes.
  - **Puerta Norte ("Puerta de la Chatarra") en `(70, 140)`**: Bastiones industriales con marcador `SteamPunk_Number_01`.
  - **Puerta Este ("Puerta de las Calderas") en `(140, 70)`**: Bastiones industriales con marcador `SteamPunk_Number_02`.
- **4 Talleres Satélites**:
  - *Taller Mecánico* `(40, 105)`: Techado con techos elevados (`Ceiling 4x4M.glb`), bancos de engranajes finos y tanques.
  - *Taller de Vapor y Calderería* `(105, 40)`: Tanques de presión y cofres de placas blindadas.
  - *Pabellón de Maestros Forjadores* `(35, 45)`: Mesas de ensamble de golems.
  - *Puesto de Guardia y Vigía* `(105, 105)`: Plataforma con farolas de vigilancia y suministros.
- **Bulevares y Paseos Comerciales de Intercambio (10 Trading Posts)**:
  - *Sector 1 — Bulevar Comercial Sur (Eje X: 30.0m a 63.0m, Z: 7.0m a 10.6m)*:
    - *Puesto #01*: Parcela `[1, 0]` • `(X: 30.00m, Z: 7.00m)` con marcador `SteamPunk_Number_01`.
    - *Puesto #02*: Parcela `[2, 0]` • `(X: 38.25m, Z: 7.90m)` con marcador `SteamPunk_Number_02`.
    - *Puesto #03*: Parcela `[2, 0]` • `(X: 46.50m, Z: 8.80m)` con marcador `SteamPunk_Number_03`.
    - *Puesto #04*: Parcela `[3, 0]` • `(X: 54.75m, Z: 9.70m)` con marcador `SteamPunk_Number_04`.
    - *Puesto #05*: Parcela `[3, 0]` • `(X: 63.00m, Z: 10.60m)` con marcador `SteamPunk_Number_05`.
  - *Sector 2 — Paseo Comercial Oeste (Eje X: 6.4m, Z: 28.3m a 62.9m)*:
    - *Puesto #06*: Parcela `[0, 1]` • `(X: 6.40m, Z: 28.30m)` con marcador `SteamPunk_Number_06` (orientado al este).
    - *Puesto #07*: Parcela `[0, 2]` • `(X: 6.40m, Z: 36.95m)` con marcador `SteamPunk_Number_07` (orientado al este).
    - *Puesto #08*: Parcela `[0, 2]` • `(X: 6.40m, Z: 45.60m)` con marcador `SteamPunk_Number_08` (orientado al este).
    - *Puesto #09*: Parcela `[0, 3]` • `(X: 6.40m, Z: 54.25m)` con marcador `SteamPunk_Number_01` (orientado al este).
    - *Puesto #10*: Parcela `[0, 3]` • `(X: 6.40m, Z: 62.90m)` con marcador `SteamPunk_Number_02` (orientado al este).
- **Laboratorio Steampunk de Creación de Golems (*Wreckage Lab*)**:
  - *Ubicación*: Parcelas `[1, 2]` y `[2, 2]` • $X: [25.0\text{m} \rightarrow 45.0\text{m}]$, $Z: [30.0\text{m} \rightarrow 38.5\text{m}]$, anclaje frontal en `(24.9m, 38.3m)`.
  - *Estructura*: Pabellón monumental de desguace ($20\text{m} \times 8.5\text{m}$) con 8 columnas mecánicas de transmisión (`Gear Shaft.glb`), 6 paneles de cubierta industrial (`Ceiling 4x4M.glb`) a 4.1m y cerramientos de valla.
  - *Flujo y Zonas*:
    1. *Ala Oeste (Ingreso)*: Tolvas de descarga de chatarra (`Chest Plates.glb`, `Chest Tube.glb`), barriles de combustible, cascada de engranajes transportadores y panel de pesaje `SteamPunk_Number_01`.
    2. *Núcleo Central (Fusión)*: Tanque caldera presurizado masivo (`Tank.glb`), 2 chimeneas de humo activas (`Smoker.glb`), tren de transmisión mecánica con engranaje horizontal monumental (`Gear Big.glb`) y consola maestra de control.
    3. *Ala Este (Salida y Despliegue)*: Podio elevado con prototipo de golem de vapor en exhibición (`golem_steam.glb`), hidrante de purga (`Hidrant.glb`), barriles de enfriamiento y placa `SteamPunk_Number_02`.
- **Trampolín de Vapor**: Parcela `[0, 0]` • `(X: 5.1m, Z: 7.1m)` para propulsión vertical en la plaza inicial.
- **Escondite y Bóveda del Jugador (*User's Hideout & Vault*)**:
  - *Ubicación*: Punto medio exacto entre el Trampolín de Vapor y el Puesto de Mercado #06 • `(Z: 17.70m, X: 3.8m a 8.0m)` en Parcelas `[0, 0]` y `[0, 1]`.
  - *Estructura*: Taller clandestino bajo tejadillo inclinado (`Ceiling 4x4M.glb`), silla steampunk (`Steampunk Chair.glb`), mesa con lámpara, calderín y chatarra lateral.
  - *Bóveda Frontal*: **3 cofres cerrados** y estáticos (`chest_pirates.glb`, `Chest Plates.glb`, `Chest Gear.glb`) separados 2.3m entre sí y adelantados a la línea `X = 7.6m-8.0m`.
  - *Documentación detallada*: [📖 Leer Guía del Escondite](guia-escondite-y-boveda-usuario.md).
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
                  └─────────────┬─────────────┘
                  ┌─────────────┴─────────────┐
                  │  CORREDOR Y GRAN VÍA SUR  │
                  │  (Parcela 13,1 / Enlace)  │
                  └───────────────────────────┘
                  (X: 140..260m, Z: 0..140m)
```

### 5.1 Los Chatarrales (Oeste: `0..140m X`, `140..260m Z`)
- **Ubicación**: Llanura abierta de recolección de chatarra básica entre la Forja y el Desierto.
- **Materiales**: `alambre_cobre`, `tornillos_pernos`, `engranajes_desgastados`, `tubos_cobre`, `sartenes`, `ollas_cocinar`, `placas_laton`.
- **Hitos**: Campamento de Chatarreros `(70, 200)` techado con bancos de clasificación, Depósito de Latón `(40, 170)`, Taller de Fundición Menor `(100, 230)` y Calzada Troncal Norte-Sur $X=70$.

### 5.2 Fábrica Abandonada (Anillo 2: `140..260m X`, `140..260m Z`)
- **Ubicación**: Anillo industrial concéntrico que circunda la Gran Arena Central.
- **Materiales**: `transistores`, `bombillas_filamento`, `resortes_reloj`, `manometros`, `valvulas_vapor`, `lentes_tv_viejo`.
- **Hitos**: Nave de Montaje Colapsada `(200, 150)`, Pabellón de Calderas Industriales `(150, 200)`, Almacén de Transistores `(250, 200)` y calzadas de acceso a las rampas de la Arena.

### 5.3 Subestación Eléctrica (Norte: `140..260m X`, `280..400m Z`)
- **Ubicación**: Sector Norte del mundo, complejo de alta tensión.
- **Materiales**: `motor_vapor`, `bobinas_tesla`, `baterias_alquimicas`.
- **Hitos**: Plataforma Central de Transformadores Galvánicos `(200, 340)`, Banco de Baterías Alquímicas `(170, 320)` y Estación de Motores de Vapor `(230, 360)`.

### 5.4 Torre de Radio (Este: `280..400m X`, `140..260m Z`)
- **Ubicación**: Sector Este del mundo, complejo de telecomunicaciones.
- **Materiales**: `antenas_radio`, `diodos_led`.
- **Hitos**: Gran Mástil de Transmisión a 8m de altura `(340, 200)`, Estación de Señales LED `(320, 230)` y Puesto de Escucha `(360, 170)`.

### 5.5 Gran Arena Circular de Torneo Steampunk (Centro: `200m, 200m`)
- **Ubicación**: Coordenadas exactas `(X: 200.0m, Y: 0.0m, Z: 200.0m)`.
- **Dimensiones**: Plataforma circular colosal de **72m de diámetro** (Radio $R = 36\text{m}$) elevada a $0.6\text{m}$.
- **Hitos**: 4 Pilares monumentales de esquina de 12m de altura, sistema planetario de engranajes centrales giratorios, 16 balizas perimetrales y 4 grandes rampas cardinales (Norte, Sur, Este, Oeste).
- **Función**: Sede del Torneo Escalera competitivo 1v1 (3 vs 3 golems) y 2v2 (6 vs 6 golems).
- **Guía Técnica de la Arena**: [`guias/guia-arena-torneo-steampunk.md`](file:///d:/DECENTRALAND/Scenes/Hackathon/guias/guia-arena-torneo-steampunk.md).

### 5.6 Corredor y Gran Vía del Sur (Parcelas `13,1` - `X: 140..260m, Z: 0..140m`)
- **Ubicación**: Corredor intermedio sur entre el Distrito de la Forja (Oeste) y las Calderas de Fundición (Este).
- **Hitos Arquitectónicos**:
  - **Puesto de Control y Baliza del Sur (Parcela `13, 1` en `X: 212m, Z: 24m`)**: Plataforma techada (8x8m) con baliza de transmisión de engranajes (`Gear Big`, `Gear Shaft`), tanques de vapor, chimenea humeante, cofres de suministros, hidrante y farolas de señalización.
  - **Gran Vía Sur ($X = 200\text{m}, Z \in [4\text{m}, 150\text{m}]$)**: Calzada adoquinada recta con farolas gemelas cada 24m que conecta el borde sur del mundo directamente con la Fábrica y la Rampa Sur de la Gran Arena.
  - **Gran Cruce del Sur (`(200, 70)`)**: Intersección monumental con la calzada transversal $Z=70$ que une la Puerta Este de la Forja con las Calderas.
  - **Estación de Reabastecimiento de Vapor Sur (`(170, 40)`)**: Depósito de combustible y tanques de presión.

---

## 6. Tabla de Coordenadas, Superficies y Niveles de Riesgo

| Zona / Distrito | Rango X (m) | Rango Z (m) | Superficie (m²) | Parcelas DCL | Nivel de Riesgo | Afinidad y Materiales Dominantes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Distrito de la Forja** | `0` a `140` | `0` a `140` | 19.600 m² | `0,0` a `8,8` | 🟢 Seguro (Spawn) | Taller, Yunque de Forja, Spawn, 10 Puestos de Comercio (Bulevar Sur y Paseo Oeste), Trampolín de Vapor, Gestión de Misiones |
| **Desierto de Chatarra** | `0` a `140` | `260` a `400` | 19.600 m² | `0,16` a `8,24` | 🔴 Peligro (PK) | Legendarios (`ojo_dragon`, `corazon_primigenio`) |
| **Reserva de Minería** | `260` a `400` | `260` a `400` | 19.600 m² | `16,16` a `24,24`| 🟢 Seguro (No PK) | Épicos (`nucleo_mana`, `cerebro_automata`, `engranajes_bronce`) |
| **Calderas Fundición** | `260` a `400` | `0` a `140` | 19.600 m² | `16,0` a `24,8` | 🔴 Peligro (PK) | Épicos (`corazon_caldera`, `reactor_eter`) |
| **Corredor y Gran Vía Sur**| `140` a `260`| `0` a `140` | ~16.800 m² | `9,0` a `15,8` (incl. `13,1`)| 🟢 Seguro (Tránsito) | Puesto de Control `(212, 24)`, Cruce `(200, 70)`, Depósito Vapor |
| **Los Chatarrales** | `0` a `140` | `140` a `260` | ~16.800 m² | `0,9` a `8,15` | 🟢 Muy Bajo | Comunes (Alambre, Tornillos, Ollas, Latón) |
| **Fábrica Abandonada** | `140` a `260` | `140` a `260`| ~20.000 m² | `9,9` a `15,15`| 🟡 Medio | Poco Comunes (Transistores, Manómetros, Válvulas) |
| **Subestación Eléctrica**| `140` a `260` | `280` a `400`| ~14.400 m² | `9,17` a `15,24`| 🟠 Alto | Raros Galvánicos (Bobinas Tesla, Baterías) |
| **Torre de Radio** | `280` a `400` | `140` a `260`| ~14.400 m² | `17,9` a `24,15`| 🟠 Alto | Raros Luminosos (Antenas de Radio, Diodos LED) |
| **Gran Arena Torneo** | `164` a `236` | `164` a `236`| ~4.071 m² | Centro `12,12` | 🏆 Torneo Escalera | Arena Circular Steampunk 72m diámetro |

---

## 7. Catálogo Completo de Modelos 3D y Assets Utilizados

Todos los modelos 3D son archivos binarios glTF 2.0 (`.glb`) autocontenidos en `assets/asset-packs/`:

| Categoría | Nombre del Modelo | Ruta de Archivo GLB | Usos Principales en el Mapa |
| :--- | :--- | :--- | :--- |
| **Pisos y Calzadas** | Wood Plank Floor 4x4M | `assets/asset-packs/wood_plank_floor_4x4m/Wood Plank Floor 4x4M.glb` | Plataformas de talleres, puestos de control y bases |
| **Pisos y Calzadas** | Wood Planks Broken 4x4M | `assets/asset-packs/wood_planks_broken_4x4m/Wood Planks Broken_4x4M.glb` | Cúmulos de escombros, wreckages y bordes |
| **Pisos y Calzadas** | Ceiling 4x4M | `assets/asset-packs/ceiling_4x4m/Ceiling 4x4M.glb` | Techos elevados de pabellones y talleres |
| **Pisos y Calzadas** | Road Cobble Straight | `assets/asset-packs/road_cobble_straight/Road Cobble Straight.glb` | Calzadas adoquinadas rectas (Grandes Vías) |
| **Pisos y Calzadas** | Road Cross | `assets/asset-packs/road_cross/Road Cross.glb` | Cruces viales monumentales |
| **Pisos y Calzadas** | Road Angle / Angled | `assets/asset-packs/road_angle/Road Angle.glb` | Curvas y bifurcaciones viales |
| **Estructuras Pesadas**| Tank | `assets/asset-packs/tank/Tank.glb` | Tanques gigantes de vapor, bastiones y calderas |
| **Estructuras Pesadas**| Smoker | `assets/asset-packs/smoker/Smoker.glb` | Chimeneas industriales con emisión de vapor |
| **Estructuras Pesadas**| Tree Fence | `assets/asset-packs/tree_fence/Tree Fence.glb` | Vallas perimetrales y delimitación de distritos |
| **Estructuras Pesadas**| Barrel | `assets/asset-packs/barrel/Barrel.glb` | Barriles de combustible, escoria y barricadas |
| **Estructuras Pesadas**| Hidrant | `assets/asset-packs/hidrant/Hidrant.glb` | Hidrantes de refrigeración en talleres y spawn |
| **Iluminación** | Lamp | `assets/asset-packs/lamp/Lamp.glb` | Farolas de calzada para avenidas y accesos |
| **Iluminación** | Table Lamp | `assets/asset-packs/table_lamp/Table Lamp.glb` | Lámparas para bancos de trabajo y relés |
| **Mecanismos** | Gear Shaft | `assets/asset-packs/gear_shaft/Gear Shaft.glb` | Ejes verticales de transmisión y mástiles |
| **Mecanismos** | Gear Big | `assets/asset-packs/gear_big/Gear Big.glb` | Ruedas colosales de engranaje de 2.6m |
| **Mecanismos** | Gear 10 Teeth | `assets/asset-packs/gear_10_teeth/Gear 10 Teeth.glb` | Engranajes medianos de tracción |
| **Mecanismos** | Gear 8 Teeth | `assets/asset-packs/gear_8_teeth/Gear 8 Teeth.glb` | Engranajes de transmisión media |
| **Mecanismos** | Gear 5 Teeth | `assets/asset-packs/gear_5_teeth/Gear 5 Teeth.glb` | Engranajes pequeños de precisión |
| **Mecanismos** | Gear Angled 10 Teeth | `assets/asset-packs/gear_angled_10_teeth/Gear Angled 10 Teeth.glb` | Engranajes cónicos y bobinas galvánicas |
| **Mecanismos** | Gear Small 01, 02, 03 | `assets/asset-packs/gear_small_0*/Gear Small_0*.glb` | Engranajes de relojería y catalogación |
| **Almacenamiento** | Chest Gear | `assets/asset-packs/chest_gear/Chest Gear.glb` | Cofres de herramientas y componentes |
| **Almacenamiento** | Chest Plates | `assets/asset-packs/chest_plates/Chest Plates.glb` | Cofres de blindaje y placas |
| **Almacenamiento** | Chest Tube | `assets/asset-packs/chest_tube/Chest Tube.glb` | Cofres de condensadores y tuberías |
| **Interactivos/Control**| Switch & Lever | `assets/asset-packs/switch/Switch.glb`, `.../lever/Lever.glb` | Palancas e interruptores de control |
| **Señalización** | SteamPunk Numbers 00..08 | `assets/asset-packs/steampunk_number_0*/SteamPunk_Number_0*.glb` | Marcadores numéricos de puertas y balizas |
| **Reliquias** | Arthur Sword | `assets/asset-packs/arthur_sword/Arthur Sword.glb` | Reliquias de prospección y leyendas |

---

## 8. Patrones de Construcción y Principios Mobile-First

1. **Arquitectura Modular (Factory Pattern)**:
   - Todo el entorno 3D está descompuesto en fábricas independientes dentro de `src/objects/`.
   - El archivo `src/index.ts` se mantiene estrictamente como un orquestador limpio.
2. **Cero Luces Dinámicas (`PBPointLight`)**:
   - Para garantizar 60 FPS en la aplicación móvil de Decentraland (Godot Explorer), no se utilizan fuentes de luz dinámica en tiempo real. Se emplean materiales PBR con texturas horneadas y canales de auto-iluminación emisiva.
3. **Calzadas y Vías de Gran Amplitud ($\ge 8\text{m}$)**:
   - Todas las arterias y caminos principales tienen entre $8\text{m}$ y $12\text{m}$ de ancho para permitir el libre tránsito simultáneo de avatares con sus formaciones de 3 golems acompañantes sin colisiones ni atascos de cámara.
4. **Colisionadores Físicos Transparentes y Eficientes**:
   - Únicamente las estructuras sólidas visibles (muros, vallas, bastiones, tanques) poseen colisión física; el suelo y las áreas abiertas están completamente despejadas de mallas de colisión invisibles que puedan trabar el movimiento táctil.

---

## 9. Sistema de Minimapa, Cartografía 2D y Orientación

Para navegar por esta matriz espacial de 400m × 400m, la escena incorpora un sistema de navegación 2D en tiempo real sincronizado matemáticamente con las cotas métricas del mundo:

- **Minimapa HUD (`MinimapWidget`)**: Ubicado en `{ top: 80, right: 28 }`, muestra la textura bilingüe de parcelas (`minimap.jpg` / `minimap_en.jpg`), el *Glowing Dot* del avatar y el *Sight Cone* de rotación de cámara a 360°.
- **Modal de Mapa Completo (`BigMapModal`)**: Tarjeta panorámica en 2 columnas ($880\text{px} \times 480\text{px}$) con fondo semitransparente (`rgba(5, 8, 15, 0.86)`), diseñada específicamente para encajar en la resolución virtual de teléfonos móviles (`1600x720`).
- **Mapeo de Zonas y Distritos**: Refleja con precisión las 4 esquinas simétricas, los anillos intermedios y la Gran Arena Central, con leyenda de peligros en tiempo real.
- **Documentación Completa**: Consulta todos los algoritmos de proyección y código fuente en la [Guía Maestra: Sistema de Minimapa y Cartografía 2D](guia-sistema-minimapa-y-cartografia.md).

---

## 10. Sistema de 150 Golems Ambientales y Patrullaje Orgánico

Para dotar de vida orgánica a los 160.000 m² del mapa, la escena instancian **150 Golems ambientales** distribuidos proceduralmente en todas las zonas del mundo. Este sistema implementa un doble gradiente concéntrico partiendo de la zona inicial (**Distrito de la Forja / Home City** en `20m, 20m`):

### 10.1 Matriz de Distribución por Anillos Concéntricos (150 Golems)

| Anillo | Rango de Distancia ($d$) | Zonas Incluidas | Cantidad | Densidad | Rareza Dominante | Tiers de Recetas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Anillo 1 (Interior)** | $0 \le d \le 120\text{m}$ | Distrito de la Forja (15), Los Chatarrales (20), Corredor Sur (15) | **50** | 33.3% | 🟢 Común | Tier 1 (`#001` - `#040`) |
| **Anillo 2 (Medio)** | $120 < d \le 220\text{m}$ | Fábrica Abandonada (20), Periferia de la Arena (10) | **30** | 20.0% | 🟡 Poco Común | Tier 2 (`#041` - `#090`) |
| **Anillo 3 (Norte/Este)** | $220 < d \le 320\text{m}$ | Subestación Eléctrica (18), Torre de Radio (18) | **36** | 24.0% | 🟠 Raro | Tier 3 (`#091` - `#125`) |
| **Anillo 4 (Bordes/PK)** | $d > 320\text{m}$ | Desierto Chatarra (12), Calderas Fundición (11), Reserva Minería (11) | **34** | 22.7% | 🟣 Épico / 🔴 Legendario | Tier 4 (`#126` - `#150`) |

### 10.2 Características Principales
1. **Generación Procedural Dinámica (`src/data/mapGolemsCatalog.ts`)**:
   - En cada sesión/carga de la escena, las coordenadas $(X, Z)$ se calculan proceduralmente dentro de las cotas permitidas ($5\text{m} \le X, Z \le 395\text{m}$).
   - Los modelos 3D se seleccionan aleatoriamente a partir del pool del Tier del anillo correspondiente.
   - Exclusión estricta del suelo interior de la Gran Arena Central ($r < 38\text{m}$ de `(200, 200)`).
2. **Factoría de Entidades SDK7 (`src/objects/mapGolemsGenerator.ts`)**:
   - Carga del modelo GLTF `assets/models/<afinidad>/golem_<NNN>.glb`.
   - Etiqueta `Billboard` superior con texto `🤖 [Afinidad] Nombre Golem • Rareza` en los colores elementales (sin niveles ni estadísticas).
3. **Patrullaje Orgánico DOP (`src/systems/mapGolemPatrolSystem.ts`)**:
   - Componente `MapGolemPatrolComponent`: Controla desplazamientos de caminata suave ($0.9 - 1.4\text{ m/s}$) y reposos periódicos ($3.0 - 8.0\text{ s}$).
   - Radio de patrulla seguro entre $3.5\text{m}$ y $6.0\text{m}$ alrededor del origen.
   - Orientación suave encarando el sentido de marcha.

