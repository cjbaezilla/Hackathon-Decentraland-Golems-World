![Golems Cover](GOLEMS/golems_cover_eng.png)

# Golems: Multiplayer Experience in Decentraland

[![Decentraland SDK7](https://img.shields.io/badge/Decentraland-SDK7-ff2d55.svg)](https://docs.decentraland.org)
[![Decentraland World](https://img.shields.io/badge/World-golems.dcl.eth-6366f1.svg)](https://decentraland.org)
[![Dual Language](https://img.shields.io/badge/Language-ES%20%7C%20EN%20(i18n)-8b5cf6.svg)](guias/guia-soporte-bilingue-i18n.md)
[![Mobile First](https://img.shields.io/badge/Platform-Mobile%20First%20%26%20Desktop-10b981.svg)](https://docs.decentraland.org/creator/build-for-mobile/)
[![Grid Size](https://img.shields.io/badge/Grid-25x25%20(400m%20x%20400m)-f59e0b.svg)](https://docs.decentraland.org)
[![Backend](https://img.shields.io/badge/Backend-PHP%20%26%20MySQL%20(SignedFetch)-3b82f6.svg)](https://docs.decentraland.org)

**Golems** is a massive multiplayer experience built on **Decentraland SDK7**, set in a fascinating universe of scrap metal, steampunk technology, and residual magic. Players explore a vast 160,000 m² world, track down hidden mechanical parts using an innovative **Heat Radar**, forge unique combat automatons using a **deterministic hashing** system, lead automated expeditions, and fight in real time both in the open world and in a competitive **Ladder Tournament** (1v1 and 2v2).

> 📚 **Official Game Design Document (GDD) & Recipe Catalog**:
> - 🇬🇧 **English**: [GOLEMS/GDD-Golems_eng.md](GOLEMS/GDD-Golems_eng.md) (GDD) | 📜 [GOLEMS/Golems-Recetas-150_eng.md](GOLEMS/Golems-Recetas-150_eng.md) (150 Deterministic Recipe Catalog)
> - 🇪🇸 **Español**: [GOLEMS/GDD-Golems.md](GOLEMS/GDD-Golems.md) (GDD) | 📜 [GOLEMS/Golems-Recetas-150.md](GOLEMS/Golems-Recetas-150.md) (Catálogo Maestro de 150 Recetas)

---

## 📑 Table of Contents

1. [What the Game Is About](#-what-the-game-is-about)
2. [The Core Game Loop](#-the-core-game-loop)
3. [The World and Map (Grid 25x25 - 400m × 400m)](#-the-world-and-map-grid-25x25---400m--400m)
4. [The Heat Radar and Scavenging](#-the-heat-radar-and-scavenging)
5. [Complete Materials Catalog](#-complete-materials-catalog)
6. [The Forge and Golem Uniqueness (Deterministic Hash)](#-the-forge-and-golem-uniqueness-deterministic-hash)
7. [Stats, Affinities, and Real-Time Combat](#-stats-affinities-and-real-time-combat)
8. [Companion Golems and Real-Time Multiplayer Following](#-companion-golems-and-real-time-multiplayer-following)
9. [Hostile NPCs and Zone Guardians](#-hostile-npcs-and-zone-guardians)
10. [Progression and Level System](#-progression-and-level-system)
11. [Competitive Ladder Tournament (1v1 and 2v2)](#-competitive-ladder-tournament-1v1-and-2v2)
12. [Colossal 72m Steampunk Tournament Arena (Cell Games Ring)](#-colossal-72m-steampunk-tournament-arena-cell-games-ring)
13. [Technical Architecture and Persistence](#-technical-architecture-and-persistence)
14. [Mobile-First Design and Performance Constraints](#-mobile-first-design-and-performance-constraints)
15. [Installation, Development, and Deployment](#-installation-development-and-deployment)
16. [Project Structure](#-project-structure)

---

## ⚙️ What the Game Is About

In the world of **Golems**, civilization has left behind tons of disused machinery: transistors, boilers, pressure gauges, cooking pots, radio antennas, and alchemical batteries imbued with residual energy. 

![What Golems is about](GOLEMS/golems_de_que_trata_eng.png)

Explorers venture into this landscape to:
- **Scavenge Scrap**: Locate 25 types of parts via thermal proximity using the Heat Radar.
- **Forge Mechanical Creatures**: Combine 5 to 12 components in the Forge District to generate golems with unique appearances, names, and algorithmically derived attributes.
- **Command up to 3 Active Golems**: Creatures follow the player in formation and defend their creator in real time.
- **Automate Expeditions**: Assign reserve golems to offline scavenging missions that generate continuous loot.
- **Compete in the Ladder**: Challenge other players in network-synchronized 1v1 and 2v2 duels.

---

## 🔄 The Core Game Loop

The gameplay loop is designed as a continuous, organic cycle rewarding both casual players and competitive strategists:

```mermaid
graph TD
    A["Forge District (Spawn & Base)"] -->|"Equip Heat Radar"| B["Map Exploration (25x25)"]
    B -->|"Euclidean Detection & Touch"| C["Scrap Collection (25 Materials)"]
    C -->|"Return to Forge"| D["Golem Forging (Hash 5-12 Parts)"]
    D -->|"Assign Squad (Max 3)"| E["RT Combat vs NPCs and Players"]
    D -->|"Assign Reserve Golems"| F["Automated Scavenging Missions"]
    E -->|"Victory & Experience"| G["Level Up (Player & Golems)"]
    F -->|"Claim Remote Loot"| C
    G -->|"Climb Ranking"| H["Ladder Tournament (1v1 / 2v2)"]
    H -->|"Prestige & Resources"| A
```

![Game Loop](GOLEMS/golems_bucle_juego_eng.png)

---

## 🗺️ The World and Map (Grid 25x25 - 400m × 400m)

The experience takes place in the Decentraland World `golems.dcl.eth`, made of a **25x25 parcel grid** (from `0,0` to `24,24`), covering an area of **400 meters wide by 400 meters deep** (160,000 m² of usable surface with natural terrain `landscapeTerrain: true`).

![Zone Map](GOLEMS/golems_map_eng.png)

> 📘 **Detailed Map Documentation**: To learn about all metric elevations, file architecture, landmarks, and detailed ASCII diagrams, check the [Master Guide: Map, Districts, Zones, and Coordinates](guias/guia-mapa-zonas-y-distritos.md).

### Spatial Distribution of Zones and the 4 Symmetrical Corners (140m × 140m each)

| Zone | Location (Coords Metros) | Dimension | Risk Level | Main Materials | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Forge District** | Southwest Corner `(0,0)` to `(140,140)` | 140m × 140m (19,600 m²) | 🟢 Safe Zone (No PK) | None (Workshop/Forge) | Spawn `(16, 6)`, **Silas** at `(15.8, 5.9)`, Main Plaza `(70, 70)`, 10 Trading Posts, Wreckage Lab `[1,2]`, Trampoline, and **Player Hideout/Vault** at `(Z: 17.7m, X: 3.8m-8.0m)`. |
| **Scrap Desert** | Northwest Corner `(0,260)` to `(140,400)` | 140m × 140m (19,600 m²) | 🔴 Open PK Zone | Legendaries (`ojo_dragon`, `corazon_primigenio`) | Desolate, maximum difficulty wasteland, Primordial Automaton Crater `(70, 330)`, Dragon's Nest, and portal `(130, 270)`. |
| **Mining Reserve** | Northeast Corner `(260,260)` to `(400,400)` | 140m × 140m (19,600 m²) | 🟢 Safe Zone (No PK) | Epics (`nucleo_mana`, `cerebro_automata`, `engranajes_bronce`) | Protected aether quarry `(340, 340)`, watchmaking workshop, deep pit, explorers' shelter, and portal `(270, 270)`. |
| **Smelting Boilers** | Southeast Corner `(260,0)` to `(400,140)` | 140m × 140m (19,600 m²) | 🔴 Open PK Zone | Epics (`corazon_caldera`, `reactor_eter`) | Volcanic and thermal complex, Central Furnace `(330, 70)`, Aether Reactor, and portal `(270, 130)`. |
| **Corridor and South Highway**| South Sector `(140,0)` to `(260,140)` | ~16,800 m² | 🟢 Safe Zone (Transit) | Connection & infrastructure | Checkpoint Parcel 13,1 `(212, 24)`, Grand Junction `(200, 70)`, and Steam Station `(170, 40)`. |
| **The Junklands** | West Sector `(0,140)` to `(140,260)` | ~16,800 m² | 🟢 Low Difficulty | Commons (Wire, Screws, Pots) | Scavenger Camp `(70, 200)`, Brass Depot `(40, 170)`, and roadway $X=70$. |
| **Abandoned Factory** | Middle Ring `(140,140)` to `(260,260)` | ~20,000 m² | 🟡 Medium Difficulty | Uncommons (Transistors, Gauges) | Ruined industrial structures containing materials with advanced stats. |
| **Electrical Substation** | North Sector `(140,280)` to `(260,400)` | ~14,400 m² | 🟠 High Difficulty | Rares (Tesla Coils, Batteries, Engines) | High-voltage complex featuring galvanic and steam affinity components. |
| **Radio Tower** | East Sector `(280,140)` to `(400,260)` | ~14,400 m² | 🟠 High Difficulty | Rares (Radio antennas, LED Diodes) | Old telecommunication towers with luminous affinity materials. |
| **Grand Tournament Arena** | Center `(164,164)` to `(236,236)` | ~4,071 m² (Ø 72m) | 🏆 Competitive | 1v1 & 2v2 Ladder Tournament | Colossal circular steampunk tournament platform at `(200, 200)`. |

![Map Details and Rings](GOLEMS/golems_map2_eng.png)

---

## 📡 The Heat Radar and Scavenging

To ensure optimal performance on mobile devices, buried materials do not require complex aiming or *raycasting* systems. Instead, the **Heat Radar** (built with React-ECS) computes the Euclidean distance between the avatar and active resources:

![Heat Radar](GOLEMS/golems_radar_eng.png)

- **Radar Behavior**:
  - **Far (> 30m)**: Sensor inactive with cool blue tones and an off pulse.
  - **Medium Distance (15m - 30m)**: Gentle rhythmic pulse in yellow tones.
  - **Close (< 15m)**: Accelerated pulse in bright red/orange tones.
  - **Immediate Proximity (< 4m)**: The scrap part visually emerges from the ground with an emissive particle effect.
- **Touch Scavenging**: Upon emerging, the part features a wide pointer collider (a touch *hitbox* optimized for touchscreens) collected with a single tap.

---

## 🔩 Complete Materials Catalog

There are **46 types of materials**, categorized into 5 rarity tiers. Epic and Legendary materials are capped at **only one active instance at a time** across the entire map:

| # | Icon | Material | Rarity | Spawn Weight | Respawn Time | Zone | Attribute & Affinity Contribution |
| :-: | :-: | :--- | :--- | :-: | :-: | :--- | :--- |
| 1 | <img src="showcase/common/alambre_cobre.png" width="40" alt="alambre_cobre" /> | **Copper Wire** (`alambre_cobre`) | Common | 3.7% | 1 to 3 min | Junklands | +Speed (2) |
| 2 | <img src="showcase/common/tornillos_pernos.png" width="40" alt="tornillos_pernos" /> | **Screws & Bolts** (`tornillos_pernos`) | Common | 3.7% | 1 to 3 min | Junklands | +Defense (2) |
| 3 | <img src="showcase/common/engranajes_desgastados.png" width="40" alt="engranajes_desgastados" /> | **Worn Gears** (`engranajes_desgastados`) | Common | 3.7% | 1 to 3 min | Junklands | +Speed (1), +Defense (1) |
| 4 | <img src="showcase/common/tubos_cobre.png" width="40" alt="tubos_cobre" /> | **Copper Pipes** (`tubos_cobre`) | Common | 3.7% | 1 to 3 min | Junklands | +Vitality (10) |
| 5 | <img src="showcase/common/sartenes.png" width="40" alt="sartenes" /> | **Frying Pans** (`sartenes`) | Common | 3.7% | 1 to 3 min | Junklands | +Defense (3) |
| 6 | <img src="showcase/common/ollas_cocinar.png" width="40" alt="ollas_cocinar" /> | **Cooking Pots** (`ollas_cocinar`) | Common | 3.7% | 1 to 3 min | Junklands | +Defense (2), +Vitality (5) |
| 7 | <img src="showcase/common/placas_laton.png" width="40" alt="placas_laton" /> | **Brass Plates** (`placas_laton`) | Common | 3.7% | 1 to 3 min | Junklands | +Defense (3) |
| 8 | <img src="showcase/common/clavos_oxidados.png" width="40" alt="clavos_oxidados" /> | **Rusty Nails** (`clavos_oxidados`) | Common | 3.7% | 1 to 3 min | Junklands | +Defense (1) |
| 9 | <img src="showcase/common/latas_conserva.png" width="40" alt="latas_conserva" /> | **Tin Cans** (`latas_conserva`) | Common | 3.4% | 1 to 3 min | Junklands | +Vitality (8) |
| 10 | <img src="showcase/common/cadenas_hierro.png" width="40" alt="cadenas_hierro" /> | **Iron Chains** (`cadenas_hierro`) | Common | 3.4% | 1 to 3 min | Junklands | +Defense (2) |
| 11 | <img src="showcase/common/tuercas_gigantes.png" width="40" alt="tuercas_gigantes" /> | **Giant Nuts** (`tuercas_gigantes`) | Common | 3.4% | 1 to 3 min | Junklands | +Defense (2) |
| 12 | <img src="showcase/common/tapas_alcantarilla.png" width="40" alt="tapas_alcantarilla" /> | **Manhole Covers** (`tapas_alcantarilla`) | Common | 3.4% | 1 to 3 min | Junklands | +Defense (3) |
| 13 | <img src="showcase/common/cables_deshilachados.png" width="40" alt="cables_deshilachados" /> | **Frayed Cables** (`cables_deshilachados`) | Common | 3.4% | 1 to 3 min | Junklands | +Speed (2) |
| 14 | <img src="showcase/common/residuos_carbon.png" width="40" alt="residuos_carbon" /> | **Coal Residue** (`residuos_carbon`) | Common | 3.4% | 1 to 3 min | Junklands | +Vitality (6) & Steam Affinity |
| 15 | <img src="showcase/uncommon/transistores.png" width="40" alt="transistores" /> | **Transistors** (`transistores`) | Uncommon | 2.6% | 4 to 7 min | Abandoned Factory | +Attack (3) |
| 16 | <img src="showcase/uncommon/bombillas_filamento.png" width="40" alt="bombillas_filamento" /> | **Filament Bulbs** (`bombillas_filamento`) | Uncommon | 2.6% | 4 to 7 min | Abandoned Factory | +Vitality (12) & Luminous Affinity |
| 17 | <img src="showcase/uncommon/resortes_reloj.png" width="40" alt="resortes_reloj" /> | **Clock Springs** (`resortes_reloj`) | Uncommon | 2.6% | 4 to 7 min | Abandoned Factory | +Speed (4) |
| 18 | <img src="showcase/uncommon/manometros.png" width="40" alt="manometros" /> | **Pressure Gauges** (`manometros`) | Uncommon | 2.6% | 4 to 7 min | Abandoned Factory | +Vitality (15) |
| 19 | <img src="showcase/uncommon/valvulas_vapor.png" width="40" alt="valvulas_vapor" /> | **Steam Valves** (`valvulas_vapor`) | Uncommon | 2.6% | 4 to 7 min | Abandoned Factory | +Attack (2) & Steam Affinity |
| 20 | <img src="showcase/uncommon/lentes_tv_viejo.png" width="40" alt="lentes_tv_viejo" /> | **Old TV Lenses** (`lentes_tv_viejo`) | Uncommon | 2.6% | 4 to 7 min | Abandoned Factory | +Speed (3) |
| 21 | <img src="showcase/uncommon/fusibles_fundidos.png" width="40" alt="fusibles_fundidos" /> | **Blown Fuses** (`fusibles_fundidos`) | Uncommon | 2.6% | 4 to 7 min | Abandoned Factory | +Attack (2) & Galvanic Affinity |
| 22 | <img src="showcase/uncommon/relojes_bolsillo.png" width="40" alt="relojes_bolsillo" /> | **Broken Pocket Watches** (`relojes_bolsillo`) | Uncommon | 2.45% | 4 to 7 min | Abandoned Factory | +Speed (3) |
| 23 | <img src="showcase/uncommon/brujulas_magneticas.png" width="40" alt="brujulas_magneticas" /> | **Magnetic Compasses** (`brujulas_magneticas`) | Uncommon | 2.45% | 4 to 7 min | Abandoned Factory | +Speed (3) & Mechanical Affinity |
| 24 | <img src="showcase/uncommon/tubos_vacio.png" width="40" alt="tubos_vacio" /> | **Vacuum Tubes** (`tubos_vacio`) | Uncommon | 2.45% | 4 to 7 min | Abandoned Factory | +Attack (3) & Luminous Affinity |
| 25 | <img src="showcase/uncommon/palancas_interruptor.png" width="40" alt="palancas_interruptor" /> | **Switch Levers** (`palancas_interruptor`) | Uncommon | 2.45% | 4 to 7 min | Abandoned Factory | +Defense (2) |
| 26 | <img src="showcase/rare/motor_vapor.png" width="40" alt="motor_vapor" /> | **Steam Engine** (`motor_vapor`) | Rare | 1.5% | 10 to 15 min | Electrical Substation | +Attack (5) & Steam Affinity |
| 27 | <img src="showcase/rare/bobinas_tesla.png" width="40" alt="bobinas_tesla" /> | **Tesla Coils** (`bobinas_tesla`) | Rare | 1.5% | 10 to 15 min | Electrical Substation | +Attack (6) & Galvanic Affinity |
| 28 | <img src="showcase/rare/antenas_radio.png" width="40" alt="antenas_radio" /> | **Radio Antennas** (`antenas_radio`) | Rare | 1.5% | 10 to 15 min | Radio Tower | +Speed (6) |
| 29 | <img src="showcase/rare/diodos_led.png" width="40" alt="diodos_led" /> | **LED Diodes** (`diodos_led`) | Rare | 1.5% | 10 to 15 min | Radio Tower | +Attack (4) & Luminous Affinity |
| 30 | <img src="showcase/rare/baterias_alquimicas.png" width="40" alt="baterias_alquimicas" /> | **Alchemical Batteries** (`baterias_alquimicas`) | Rare | 1.5% | 10 to 15 min | Electrical Substation | +Vitality (25) & Galvanic Affinity |
| 31 | <img src="showcase/rare/engranajes_bronce.png" width="40" alt="engranajes_bronce" /> | **Perfect Bronze Gears** (`engranajes_bronce`) | Rare | 1.5% | 10 to 15 min | Mining Reserve | +Defense (6) & Mechanical Affinity |
| 32 | <img src="showcase/rare/dinamo_galvanica.png" width="40" alt="dinamo_galvanica" /> | **Galvanic Dynamo** (`dinamo_galvanica`) | Rare | 1.5% | 10 to 15 min | Electrical Substation | +Attack (5) & Galvanic Affinity |
| 33 | <img src="showcase/rare/cristal_fuerza.png" width="40" alt="cristal_fuerza" /> | **Resonating Quartz Crystal** (`cristal_fuerza`) | Rare | 1.5% | 10 to 15 min | Radio Tower | +Speed (5) & Luminous Affinity |
| 34 | <img src="showcase/rare/giroscopio_precision.png" width="40" alt="giroscopio_precision" /> | **Precision Gyroscope** (`giroscopio_precision`) | Rare | 1.5% | 10 to 15 min | Mining Reserve | +Defense (5) & Mechanical Affinity |
| 35 | <img src="showcase/rare/condensador_presion.png" width="40" alt="condensador_presion" /> | **High-Pressure Condenser** (`condensador_presion`) | Rare | 1.5% | 10 to 15 min | Electrical Substation | +Vitality (20) & Steam Affinity |
| 36 | <img src="showcase/epic/nucleo_mana.png" width="40" alt="nucleo_mana" /> | **Condensed Mana Core** (`nucleo_mana`) | Epic | 0.8% | 20 to 30 min | Mining Reserve | +Attack (8) & Aether Affinity |
| 37 | <img src="showcase/epic/cerebro_automata.png" width="40" alt="cerebro_automata" /> | **Automaton Brain** (`cerebro_automata`) | Epic | 0.8% | 20 to 30 min | Mining Reserve | +Attack (8) & Mechanical Affinity |
| 38 | <img src="showcase/epic/reactor_eter.png" width="40" alt="reactor_eter" /> | **Aether Reactor** (`reactor_eter`) | Epic | 0.8% | 20 to 30 min | Smelting Boilers (PK) | +Attack (9) & Aether Affinity |
| 39 | <img src="showcase/epic/corazon_caldera.png" width="40" alt="corazon_caldera" /> | **Boiler Heart** (`corazon_caldera`) | Epic | 0.8% | 20 to 30 min | Smelting Boilers (PK) | +Defense (8) & Steam Affinity |
| 40 | <img src="showcase/epic/bateria_plasma.png" width="40" alt="bateria_plasma" /> | **Supercharged Plasma Battery** (`bateria_plasma`) | Epic | 0.8% | 20 to 30 min | Electrical Substation | +Attack (8) & Galvanic Affinity |
| 41 | <img src="showcase/epic/matriz_optica_solar.png" width="40" alt="matriz_optica_solar" /> | **Solar Optical Array** (`matriz_optica_solar`) | Epic | 0.8% | 20 to 30 min | Radio Tower | +Speed (7) & Luminous Affinity |
| 42 | <img src="showcase/epic/embolo_titanio.png" width="40" alt="embolo_titanio" /> | **Forged Titanium Piston** (`embolo_titanio`) | Epic | 0.8% | 20 to 30 min | Smelting Boilers (PK) | +Defense (7) & Steam Affinity |
| 43 | <img src="showcase/legendary/ojo_dragon.png" width="40" alt="ojo_dragon" /> | **Mechanical Dragon Eye** (`ojo_dragon`) | Legendary | 0.35% | 45 to 60 min | Scrap Desert (PK) | +Attack (14) & Aether Affinity |
| 44 | <img src="showcase/legendary/corazon_primigenio.png" width="40" alt="corazon_primigenio" /> | **Primordial Golem Heart** (`corazon_primigenio`) | Legendary | 0.35% | 45 to 60 min | Scrap Desert (PK) | +All Stats |
| 45 | <img src="showcase/legendary/singularidad_eterica.png" width="40" alt="singularidad_eterica" /> | **Aetheric Singularity** (`singularidad_eterica`) | Legendary | 0.35% | 45 to 60 min | Scrap Desert (PK) | +Attack (12), +Speed (6) & Aether Affinity |
| 46 | <img src="showcase/legendary/relicario_astral.png" width="40" alt="relicario_astral" /> | **Celestial Gear Reliquary** (`relicario_astral`) | Legendary | 0.35% | 45 to 60 min | Scrap Desert (PK) | +Defense (10), +Vitality (30) & Aether Affinity |

### 🌐 Interactive 3D Showcase Pages

All 46 materials can be previewed in an interactive 3D showcase web application featuring rotating 3D glTF models, bilingual metadata (ES / EN), stat breakdowns, and high-resolution PNG exports.

To launch the local showcase server:

```bash
php -S localhost:8000
```

Then navigate to the showcase index or individual item pages in your web browser:
- **Main Showcase Catalog**: [http://localhost:8000/showcase/](http://localhost:8000/showcase/)
- **Sample Item Page (Precision Gyroscope)**: [http://localhost:8000/showcase/rare/giroscopio_precision.html](http://localhost:8000/showcase/rare/giroscopio_precision.html)

![Interactive 3D Material Showcase](GOLEMS/showcase.jpg)

---

## 🔨 The Forge and Golem Uniqueness (Deterministic Hash)

![The Forge](GOLEMS/golems_forja_eng.png)

### 🤖 Master Catalog of 150 Golems and Recipes

The system features **150 unique golem models** derived from deterministic recipes of 5 to 12 components. Below is the complete catalog table with 3D render, affinity, base attributes, and recipe requirements:

| # | Render | Golem Name | Affinity | Tier | Height | ATK | DEF | HP | SPD | Required Recipe Components |
| :-: | :-: | :--- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :--- |
| #001 | <img src="GOLEMS/golems_imgs/golem_001.png" width="44" alt="golem_001" /> | **Electric Bulwark** | ⚡ Galvanic | Tier 1 | 1.09m | 16 | 24 | 117 | 4 | 2x Switch Levers, 2x Giant Nuts, 2x Iron Chains, 2x Pressure Gauges, 2x Screws & Bolts |
| #002 | <img src="GOLEMS/golems_imgs/golem_002.png" width="44" alt="golem_002" /> | **Filament Hunter** | ☀️ Luminous | Tier 1 | 1.03m | 16 | 23 | 109 | 6 | 1x Brass Plates, 1x Iron Chains, 1x Giant Nuts, 2x Filament Bulbs, 2x Worn Gears, 2x Frying Pans |
| #003 | <img src="GOLEMS/golems_imgs/golem_003.png" width="44" alt="golem_003" /> | **Boiler Gunner** | ♨️ Steam | Tier 1 | 0.95m | 16 | 16 | 88 | 4 | 1x Coal Residue, 1x Screws & Bolts, 2x Giant Nuts, 1x Brass Plates |
| #004 | <img src="GOLEMS/golems_imgs/golem_004.png" width="44" alt="golem_004" /> | **Mechanical Wraith** | ⚙️ Mechanical | Tier 1 | 1.10m | 16 | 23 | 87 | 7 | 2x Frying Pans, 2x Manhole Covers, 1x Switch Levers, 1x Worn Gears, 1x Copper Wire |
| #005 | <img src="GOLEMS/golems_imgs/golem_005.png" width="44" alt="golem_005" /> | **Pressurized Colossus** | ♨️ Steam | Tier 1 | 0.97m | 15 | 15 | 97 | 5 | 1x Coal Residue, 2x Cooking Pots, 1x Worn Gears, 1x Giant Nuts, 1x Rusty Nails |
| #006 | <img src="GOLEMS/golems_imgs/golem_006.png" width="44" alt="golem_006" /> | **Bright Destroyer** | ☀️ Luminous | Tier 1 | 1.01m | 24 | 20 | 82 | 11 | 1x Transistors, 2x Brass Plates, 1x Worn Gears, 2x Old TV Lenses, 2x Vacuum Tubes, 2x Manhole Covers |
| #007 | <img src="GOLEMS/golems_imgs/golem_007.png" width="44" alt="golem_007" /> | **Igneous Servant** | ♨️ Steam | Tier 1 | 0.91m | 19 | 8 | 124 | 7 | 2x Coal Residue, 2x Filament Bulbs, 1x Old TV Lenses, 2x Blown Fuses, 1x Tin Cans |
| #008 | <img src="GOLEMS/golems_imgs/golem_008.png" width="44" alt="golem_008" /> | **Sparkling Forger** | ☀️ Luminous | Tier 1 | 1.12m | 18 | 16 | 86 | 4 | 1x Rusty Nails, 1x Giant Nuts, 1x Cooking Pots, 1x Vacuum Tubes, 2x Iron Chains |
| #009 | <img src="GOLEMS/golems_imgs/golem_009.png" width="44" alt="golem_009" /> | **Raying Executor** | ⚡ Galvanic | Tier 1 | 1.05m | 18 | 15 | 107 | 13 | 2x Frying Pans, 1x Blown Fuses, 2x Clock Springs, 1x Worn Gears, 2x Copper Pipes |
| #010 | <img src="GOLEMS/golems_imgs/golem_010.png" width="44" alt="golem_010" /> | **Geared Tracker** | ⚙️ Mechanical | Tier 1 | 0.92m | 15 | 14 | 109 | 13 | 2x Worn Gears, 2x Magnetic Compasses, 1x Iron Chains, 2x Pressure Gauges, 1x Copper Wire, 1x Frying Pans |
| #011 | <img src="GOLEMS/golems_imgs/golem_011.png" width="44" alt="golem_011" /> | **Electric Titan** | ⚡ Galvanic | Tier 1 | 1.19m | 19 | 14 | 89 | 4 | 1x Manhole Covers, 1x Giant Nuts, 1x Blown Fuses |
| #012 | <img src="GOLEMS/golems_imgs/golem_012.png" width="44" alt="golem_012" /> | **Thermal Walker** | ♨️ Steam | Tier 1 | 1.24m | 24 | 8 | 124 | 4 | 2x Steam Valves, 2x Copper Pipes, 1x Pressure Gauges, 1x Transistors |
| #013 | <img src="GOLEMS/golems_imgs/golem_013.png" width="44" alt="golem_013" /> | **Astral Golem** | 🔮 Aether | Tier 1 | 0.94m | 15 | 16 | 82 | 9 | 1x Broken Pocket Watches, 2x Screws & Bolts, 1x Frayed Cables, 2x Rusty Nails, 1x Frying Pans |
| #014 | <img src="GOLEMS/golems_imgs/golem_014.png" width="44" alt="golem_014" /> | **Pneumatic Sentinel** | ♨️ Steam | Tier 1 | 0.91m | 16 | 15 | 109 | 14 | 2x Magnetic Compasses, 1x Manhole Covers, 2x Cooking Pots, 2x Copper Wire, 2x Coal Residue |
| #015 | <img src="GOLEMS/golems_imgs/golem_015.png" width="44" alt="golem_015" /> | **Singular Defender** | 🔮 Aether | Tier 1 | 1.09m | 16 | 13 | 106 | 8 | 2x Frayed Cables, 1x Giant Nuts, 1x Brass Plates, 2x Copper Pipes |
| #016 | <img src="GOLEMS/golems_imgs/golem_016.png" width="44" alt="golem_016" /> | **Bright Assembly** | ☀️ Luminous | Tier 1 | 1.25m | 16 | 9 | 133 | 4 | 1x Rusty Nails, 1x Filament Bulbs, 2x Copper Pipes, 2x Tin Cans |
| #017 | <img src="GOLEMS/golems_imgs/golem_017.png" width="44" alt="golem_017" /> | **Articulated Guardian** | ⚙️ Mechanical | Tier 1 | 1.07m | 16 | 21 | 95 | 11 | 2x Broken Pocket Watches, 2x Cooking Pots, 1x Worn Gears, 2x Rusty Nails, 2x Manhole Covers |
| #018 | <img src="GOLEMS/golems_imgs/golem_018.png" width="44" alt="golem_018" /> | **Batterion Crusader** | ⚡ Galvanic | Tier 1 | 1.05m | 17 | 29 | 120 | 4 | 2x Pressure Gauges, 2x Frying Pans, 1x Giant Nuts, 2x Switch Levers, 2x Brass Plates, 1x Iron Chains |
| #019 | <img src="GOLEMS/golems_imgs/golem_019.png" width="44" alt="golem_019" /> | **Mirrored Settler** | ☀️ Luminous | Tier 1 | 1.05m | 19 | 20 | 84 | 6 | 1x Vacuum Tubes, 2x Iron Chains, 1x Frayed Cables, 2x Screws & Bolts, 2x Switch Levers |
| #020 | <img src="GOLEMS/golems_imgs/golem_020.png" width="44" alt="golem_020" /> | **Aetheric Smelter** | 🔮 Aether | Tier 1 | 0.98m | 16 | 14 | 102 | 12 | 2x Clock Springs, 2x Copper Pipes, 2x Giant Nuts, 1x Screws & Bolts |
| #021 | <img src="GOLEMS/golems_imgs/golem_021.png" width="44" alt="golem_021" /> | **Smoky Watcher** | ♨️ Steam | Tier 1 | 1.08m | 16 | 24 | 105 | 4 | 2x Switch Levers, 2x Screws & Bolts, 1x Copper Pipes, 1x Giant Nuts, 2x Coal Residue, 2x Frying Pans |
| #022 | <img src="GOLEMS/golems_imgs/golem_022.png" width="44" alt="golem_022" /> | **Reliquary Leviathan** | 🔮 Aether | Tier 1 | 1.01m | 16 | 25 | 83 | 14 | 2x Manhole Covers, 2x Frying Pans, 1x Giant Nuts, 2x Old TV Lenses, 2x Frayed Cables, 1x Brass Plates |
| #023 | <img src="GOLEMS/golems_imgs/golem_023.png" width="44" alt="golem_023" /> | **Boiler Vanguard** | ♨️ Steam | Tier 1 | 1.22m | 20 | 17 | 96 | 6 | 1x Frying Pans, 2x Blown Fuses, 2x Coal Residue, 1x Copper Wire, 2x Manhole Covers |
| #024 | <img src="GOLEMS/golems_imgs/golem_024.png" width="44" alt="golem_024" /> | **Pneumatic Automaton** | ♨️ Steam | Tier 1 | 1.27m | 15 | 12 | 101 | 12 | 1x Clock Springs, 2x Copper Wire, 1x Giant Nuts, 1x Iron Chains, 2x Copper Pipes |
| #025 | <img src="GOLEMS/golems_imgs/golem_025.png" width="44" alt="golem_025" /> | **Rotor Protector** | ⚙️ Mechanical | Tier 1 | 0.98m | 16 | 13 | 95 | 8 | 1x Switch Levers, 1x Copper Pipes, 2x Frayed Cables, 1x Frying Pans |
| #026 | <img src="GOLEMS/golems_imgs/golem_026.png" width="44" alt="golem_026" /> | **Pinion Bearer** | ⚙️ Mechanical | Tier 1 | 1.05m | 17 | 22 | 88 | 8 | 2x Frayed Cables, 2x Iron Chains, 1x Screws & Bolts, 1x Rusty Nails, 2x Brass Plates |
| #027 | <img src="GOLEMS/golems_imgs/golem_027.png" width="44" alt="golem_027" /> | **Igneous Monolith** | ♨️ Steam | Tier 1 | 1.05m | 19 | 12 | 129 | 6 | 2x Giant Nuts, 1x Frayed Cables, 1x Blown Fuses, 1x Filament Bulbs, 2x Coal Residue, 2x Tin Cans |
| #028 | <img src="GOLEMS/golems_imgs/golem_028.png" width="44" alt="golem_028" /> | **Piston Scavenger** | ♨️ Steam | Tier 1 | 0.99m | 18 | 10 | 104 | 12 | 2x Coal Residue, 1x Steam Valves, 1x Cooking Pots, 2x Clock Springs |
| #029 | <img src="GOLEMS/golems_imgs/golem_029.png" width="44" alt="golem_029" /> | **Mirrored Excavator** | ☀️ Luminous | Tier 1 | 1.00m | 16 | 14 | 116 | 8 | 2x Frayed Cables, 2x Giant Nuts, 2x Pressure Gauges, 1x Screws & Bolts |
| #030 | <img src="GOLEMS/golems_imgs/golem_030.png" width="44" alt="golem_030" /> | **Luminous Patroller** | ☀️ Luminous | Tier 1 | 1.07m | 17 | 18 | 125 | 6 | 2x Worn Gears, 1x Brass Plates, 2x Pressure Gauges, 1x Screws & Bolts, 1x Cooking Pots |
| #031 | <img src="GOLEMS/golems_imgs/golem_031.png" width="44" alt="golem_031" /> | **Smoky Basilisk** | ♨️ Steam | Tier 1 | 1.12m | 19 | 13 | 106 | 10 | 1x Pressure Gauges, 2x Steam Valves, 1x Filament Bulbs, 2x Manhole Covers, 2x Broken Pocket Watches |
| #032 | <img src="GOLEMS/golems_imgs/golem_032.png" width="44" alt="golem_032" /> | **Thermal Guard** | ♨️ Steam | Tier 1 | 0.92m | 20 | 16 | 101 | 6 | 1x Vacuum Tubes, 1x Frayed Cables, 2x Screws & Bolts, 2x Coal Residue, 1x Manhole Covers |
| #033 | <img src="GOLEMS/golems_imgs/golem_033.png" width="44" alt="golem_033" /> | **Boiler Bulwark** | ♨️ Steam | Tier 1 | 0.90m | 16 | 12 | 97 | 10 | 1x Frayed Cables, 1x Cooking Pots, 1x Switch Levers, 1x Coal Residue, 1x Clock Springs |
| #034 | <img src="GOLEMS/golems_imgs/golem_034.png" width="44" alt="golem_034" /> | **Diodic Hunter** | ☀️ Luminous | Tier 1 | 0.93m | 16 | 26 | 92 | 6 | 2x Frying Pans, 2x Worn Gears, 2x Screws & Bolts, 1x Brass Plates, 2x Iron Chains, 1x Copper Pipes |
| #035 | <img src="GOLEMS/golems_imgs/golem_035.png" width="44" alt="golem_035" /> | **Sparking Gunner** | ⚡ Galvanic | Tier 1 | 1.15m | 15 | 11 | 119 | 13 | 2x Copper Wire, 2x Pressure Gauges, 1x Clock Springs, 1x Frayed Cables, 2x Cooking Pots |
| #036 | <img src="GOLEMS/golems_imgs/golem_036.png" width="44" alt="golem_036" /> | **Pinion Wraith** | ⚙️ Mechanical | Tier 1 | 1.18m | 18 | 13 | 82 | 17 | 2x Rusty Nails, 2x Magnetic Compasses, 1x Transistors, 2x Giant Nuts, 1x Clock Springs, 2x Copper Wire |
| #037 | <img src="GOLEMS/golems_imgs/golem_037.png" width="44" alt="golem_037" /> | **Articulated Colossus** | ⚙️ Mechanical | Tier 1 | 1.25m | 16 | 13 | 102 | 8 | 1x Worn Gears, 1x Pressure Gauges, 1x Magnetic Compasses, 2x Screws & Bolts |
| #038 | <img src="GOLEMS/golems_imgs/golem_038.png" width="44" alt="golem_038" /> | **Batterion Destroyer** | ⚡ Galvanic | Tier 1 | 1.13m | 20 | 21 | 84 | 8 | 1x Brass Plates, 2x Frayed Cables, 2x Blown Fuses, 2x Manhole Covers, 2x Screws & Bolts |
| #039 | <img src="GOLEMS/golems_imgs/golem_039.png" width="44" alt="golem_039" /> | **Vaporized Servant** | ♨️ Steam | Tier 1 | 1.19m | 24 | 10 | 94 | 12 | 1x Transistors, 1x Coal Residue, 1x Frayed Cables, 2x Steam Valves, 1x Giant Nuts, 2x Old TV Lenses |
| #040 | <img src="GOLEMS/golems_imgs/golem_040.png" width="44" alt="golem_040" /> | **Luminous Forger** | ☀️ Luminous | Tier 1 | 1.22m | 16 | 14 | 107 | 8 | 1x Filament Bulbs, 2x Cooking Pots, 1x Broken Pocket Watches, 1x Rusty Nails, 1x Worn Gears |
| #041 | <img src="GOLEMS/golems_imgs/golem_041.png" width="44" alt="golem_041" /> | **Electric Executor** | ⚡ Galvanic | Tier 2 | 1.09m | 38 | 16 | 129 | 14 | 1x Tesla Coils, 2x Magnetic Compasses, 2x Worn Gears, 1x Iron Chains, 2x Blown Fuses, 2x Vacuum Tubes, 1x High-Pressure Condenser |
| #042 | <img src="GOLEMS/golems_imgs/golem_042.png" width="44" alt="golem_042" /> | **Thermal Tracker** | ♨️ Steam | Tier 2 | 1.06m | 33 | 18 | 136 | 8 | 1x Coal Residue, 2x Screws & Bolts, 1x Steam Engine, 2x Worn Gears, 2x Transistors, 1x High-Pressure Condenser |
| #043 | <img src="GOLEMS/golems_imgs/golem_043.png" width="44" alt="golem_043" /> | **Boiler Titan** | ♨️ Steam | Tier 2 | 1.09m | 24 | 18 | 111 | 14 | 1x Frayed Cables, 1x Magnetic Compasses, 2x Brass Plates, 1x Steam Valves, 1x Old TV Lenses |
| #044 | <img src="GOLEMS/golems_imgs/golem_044.png" width="44" alt="golem_044" /> | **Mechanical Walker** | ⚙️ Mechanical | Tier 2 | 1.08m | 28 | 22 | 110 | 19 | 1x Broken Pocket Watches, 2x Steam Valves, 1x Blown Fuses, 2x Precision Gyroscope, 2x Magnetic Compasses, 2x Frayed Cables |
| #045 | <img src="GOLEMS/golems_imgs/golem_045.png" width="44" alt="golem_045" /> | **Pressurized Golem** | ♨️ Steam | Tier 2 | 0.97m | 33 | 16 | 186 | 12 | 2x Magnetic Compasses, 2x Tin Cans, 2x Galvanic Dynamo, 1x Pressure Gauges, 2x Switch Levers, 2x High-Pressure Condenser |
| #046 | <img src="GOLEMS/golems_imgs/golem_046.png" width="44" alt="golem_046" /> | **Volcanic Sentinel** | ♨️ Steam | Tier 2 | 1.19m | 37 | 15 | 137 | 11 | 1x Steam Engine, 1x Tesla Coils, 1x Steam Valves, 1x Clock Springs, 1x High-Pressure Condenser, 1x Screws & Bolts |
| #047 | <img src="GOLEMS/golems_imgs/golem_047.png" width="44" alt="golem_047" /> | **Conductive Defender** | ⚡ Galvanic | Tier 2 | 0.95m | 33 | 19 | 127 | 17 | 2x Brass Plates, 2x Coal Residue, 2x Galvanic Dynamo, 2x Clock Springs, 1x Copper Wire |
| #048 | <img src="GOLEMS/golems_imgs/golem_048.png" width="44" alt="golem_048" /> | **Brazen Assembly** | ⚙️ Mechanical | Tier 2 | 1.15m | 27 | 33 | 134 | 6 | 2x Blown Fuses, 2x Switch Levers, 1x Giant Nuts, 2x Perfect Bronze Gears, 2x Tin Cans, 1x Cooking Pots |
| #049 | <img src="GOLEMS/golems_imgs/golem_049.png" width="44" alt="golem_049" /> | **Raying Guardian** | ⚡ Galvanic | Tier 2 | 1.07m | 43 | 18 | 146 | 10 | 2x Filament Bulbs, 1x Tesla Coils, 2x Blown Fuses, 2x Switch Levers, 1x Tin Cans, 2x Copper Wire, 1x Rusty Nails, 2x Galvanic Dynamo |
| #050 | <img src="GOLEMS/golems_imgs/golem_050.png" width="44" alt="golem_050" /> | **Galvanic Crusader** | ⚡ Galvanic | Tier 2 | 0.90m | 37 | 12 | 136 | 10 | 1x Clock Springs, 1x Copper Pipes, 2x Blown Fuses, 2x Galvanic Dynamo, 2x Coal Residue |
| #051 | <img src="GOLEMS/golems_imgs/golem_051.png" width="44" alt="golem_051" /> | **Electric Settler** | ⚡ Galvanic | Tier 2 | 1.08m | 34 | 21 | 118 | 8 | 1x LED Diodes, 2x Blown Fuses, 1x Screws & Bolts, 1x Frying Pans, 1x Galvanic Dynamo, 2x Cooking Pots, 1x Copper Wire |
| #052 | <img src="GOLEMS/golems_imgs/golem_052.png" width="44" alt="golem_052" /> | **Filament Smelter** | ☀️ Luminous | Tier 2 | 1.12m | 34 | 22 | 121 | 6 | 2x Brass Plates, 1x Steam Engine, 1x Pressure Gauges, 1x Rusty Nails, 2x LED Diodes, 2x Switch Levers |
| #053 | <img src="GOLEMS/golems_imgs/golem_053.png" width="44" alt="golem_053" /> | **Optical Watcher** | ☀️ Luminous | Tier 2 | 1.15m | 24 | 15 | 112 | 23 | 2x Resonating Quartz Crystal, 1x Magnetic Compasses, 2x Copper Wire, 1x Transistors, 1x Worn Gears, 1x Cooking Pots |
| #054 | <img src="GOLEMS/golems_imgs/golem_054.png" width="44" alt="golem_054" /> | **Pneumatic Leviathan** | ♨️ Steam | Tier 2 | 1.10m | 35 | 21 | 198 | 9 | 1x Brass Plates, 2x Alchemical Batteries, 1x Vacuum Tubes, 2x Steam Engine, 1x Perfect Bronze Gears, 1x Broken Pocket Watches, 2x High-Pressure Condenser |
| #055 | <img src="GOLEMS/golems_imgs/golem_055.png" width="44" alt="golem_055" /> | **Pressurized Vanguard** | ♨️ Steam | Tier 2 | 0.94m | 35 | 21 | 114 | 23 | 2x Clock Springs, 1x Copper Wire, 1x Iron Chains, 1x Perfect Bronze Gears, 2x Steam Engine, 2x Broken Pocket Watches, 1x Blown Fuses |
| #056 | <img src="GOLEMS/golems_imgs/golem_056.png" width="44" alt="golem_056" /> | **Plasmatic Automaton** | ⚡ Galvanic | Tier 2 | 1.05m | 39 | 20 | 161 | 12 | 1x Precision Gyroscope, 2x Old TV Lenses, 2x Alchemical Batteries, 2x Transistors, 2x Giant Nuts, 1x Coal Residue, 2x Tesla Coils |
| #057 | <img src="GOLEMS/golems_imgs/golem_057.png" width="44" alt="golem_057" /> | **Lumen Protector** | ☀️ Luminous | Tier 2 | 1.17m | 31 | 19 | 111 | 32 | 2x Vacuum Tubes, 1x Manhole Covers, 1x Magnetic Compasses, 1x Transistors, 2x Radio Antennas, 2x Broken Pocket Watches, 1x Resonating Quartz Crystal, 2x Switch Levers |
| #058 | <img src="GOLEMS/golems_imgs/golem_058.png" width="44" alt="golem_058" /> | **Batterion Bearer** | ⚡ Galvanic | Tier 2 | 0.92m | 27 | 17 | 159 | 13 | 2x Blown Fuses, 2x Iron Chains, 2x Tin Cans, 2x Magnetic Compasses, 1x Alchemical Batteries |
| #059 | <img src="GOLEMS/golems_imgs/golem_059.png" width="44" alt="golem_059" /> | **Raying Monolith** | ⚡ Galvanic | Tier 2 | 1.14m | 30 | 14 | 177 | 24 | 1x Pressure Gauges, 2x Radio Antennas, 2x Broken Pocket Watches, 1x Vacuum Tubes, 2x Alchemical Batteries, 1x Galvanic Dynamo, 1x Switch Levers |
| #060 | <img src="GOLEMS/golems_imgs/golem_060.png" width="44" alt="golem_060" /> | **Galvanic Scavenger** | ⚡ Galvanic | Tier 2 | 1.27m | 33 | 20 | 112 | 12 | 1x Perfect Bronze Gears, 1x Broken Pocket Watches, 1x Switch Levers, 1x Magnetic Compasses, 2x Galvanic Dynamo |
| #061 | <img src="GOLEMS/golems_imgs/golem_061.png" width="44" alt="golem_061" /> | **Electric Excavator** | ⚡ Galvanic | Tier 2 | 1.13m | 30 | 15 | 112 | 10 | 2x Iron Chains, 2x Transistors, 2x Blown Fuses, 1x Tin Cans, 1x Clock Springs |
| #062 | <img src="GOLEMS/golems_imgs/golem_062.png" width="44" alt="golem_062" /> | **Thermal Patroller** | ♨️ Steam | Tier 2 | 1.29m | 39 | 11 | 156 | 9 | 2x Pressure Gauges, 1x Transistors, 2x Steam Engine, 1x Old TV Lenses, 1x Tesla Coils, 2x Filament Bulbs |
| #063 | <img src="GOLEMS/golems_imgs/golem_063.png" width="44" alt="golem_063" /> | **Boiler Basilisk** | ♨️ Steam | Tier 2 | 1.03m | 40 | 15 | 126 | 6 | 2x LED Diodes, 2x Coal Residue, 1x Steam Engine, 1x Frying Pans, 2x Steam Valves |
| #064 | <img src="GOLEMS/golems_imgs/golem_064.png" width="44" alt="golem_064" /> | **Pneumatic Guard** | ♨️ Steam | Tier 2 | 1.29m | 32 | 14 | 144 | 19 | 1x Magnetic Compasses, 2x Transistors, 1x Giant Nuts, 2x Steam Valves, 1x Pressure Gauges, 1x High-Pressure Condenser, 2x Resonating Quartz Crystal |
| #065 | <img src="GOLEMS/golems_imgs/golem_065.png" width="44" alt="golem_065" /> | **Resonant Bulwark** | ☀️ Luminous | Tier 2 | 1.04m | 33 | 20 | 147 | 9 | 1x Tin Cans, 2x Frying Pans, 1x Vacuum Tubes, 1x Cooking Pots, 1x Magnetic Compasses, 2x LED Diodes, 1x Alchemical Batteries |
| #066 | <img src="GOLEMS/golems_imgs/golem_066.png" width="44" alt="golem_066" /> | **Plasmatic Hunter** | ⚡ Galvanic | Tier 2 | 1.05m | 40 | 12 | 118 | 6 | 2x Vacuum Tubes, 1x Tin Cans, 1x Transistors, 2x Blown Fuses, 1x Galvanic Dynamo |
| #067 | <img src="GOLEMS/golems_imgs/golem_067.png" width="44" alt="golem_067" /> | **Conductive Gunner** | ⚡ Galvanic | Tier 2 | 1.14m | 28 | 15 | 168 | 9 | 2x Alchemical Batteries, 1x Coal Residue, 1x Old TV Lenses, 1x Steam Valves, 2x Blown Fuses, 1x Brass Plates |
| #068 | <img src="GOLEMS/golems_imgs/golem_068.png" width="44" alt="golem_068" /> | **Sparkling Wraith** | ☀️ Luminous | Tier 2 | 1.18m | 21 | 17 | 127 | 21 | 2x Broken Pocket Watches, 1x Frayed Cables, 2x Clock Springs, 2x Filament Bulbs, 1x Switch Levers, 2x Screws & Bolts |
| #069 | <img src="GOLEMS/golems_imgs/golem_069.png" width="44" alt="golem_069" /> | **Titanic Colossus** | ⚙️ Mechanical | Tier 2 | 0.94m | 31 | 18 | 106 | 15 | 2x Frayed Cables, 1x LED Diodes, 1x Screws & Bolts, 1x Brass Plates, 1x Switch Levers, 2x Magnetic Compasses, 2x Transistors |
| #070 | <img src="GOLEMS/golems_imgs/golem_070.png" width="44" alt="golem_070" /> | **Geared Destroyer** | ⚙️ Mechanical | Tier 2 | 1.25m | 37 | 29 | 114 | 12 | 1x Steam Engine, 2x Giant Nuts, 2x Perfect Bronze Gears, 1x Vacuum Tubes, 2x Transistors, 2x Old TV Lenses |
| #071 | <img src="GOLEMS/golems_imgs/golem_071.png" width="44" alt="golem_071" /> | **Photonic Servant** | ☀️ Luminous | Tier 2 | 1.10m | 30 | 23 | 105 | 10 | 2x Vacuum Tubes, 2x Copper Wire, 1x Precision Gyroscope, 1x LED Diodes, 2x Giant Nuts, 1x Rusty Nails, 1x Screws & Bolts |
| #072 | <img src="GOLEMS/golems_imgs/golem_072.png" width="44" alt="golem_072" /> | **Automaton Forger** | ⚙️ Mechanical | Tier 2 | 1.13m | 21 | 28 | 110 | 16 | 2x Perfect Bronze Gears, 2x Screws & Bolts, 1x Old TV Lenses, 2x Clock Springs, 1x Rusty Nails, 1x Coal Residue |
| #073 | <img src="GOLEMS/golems_imgs/golem_073.png" width="44" alt="golem_073" /> | **Ferrous Executor** | ⚙️ Mechanical | Tier 2 | 1.06m | 22 | 20 | 143 | 37 | 2x Radio Antennas, 2x Broken Pocket Watches, 1x Precision Gyroscope, 2x Clock Springs, 2x Pressure Gauges, 2x Frayed Cables, 1x Frying Pans |
| #074 | <img src="GOLEMS/golems_imgs/golem_074.png" width="44" alt="golem_074" /> | **Voltaic Tracker** | ⚡ Galvanic | Tier 2 | 1.01m | 34 | 17 | 109 | 14 | 1x Giant Nuts, 1x Clock Springs, 2x Copper Wire, 1x Brass Plates, 2x Transistors, 1x Tesla Coils |
| #075 | <img src="GOLEMS/golems_imgs/golem_075.png" width="44" alt="golem_075" /> | **Pressurized Titan** | ♨️ Steam | Tier 2 | 1.19m | 26 | 25 | 123 | 14 | 2x Iron Chains, 2x Clock Springs, 1x LED Diodes, 2x Brass Plates, 2x Coal Residue, 1x Frying Pans |
| #076 | <img src="GOLEMS/golems_imgs/golem_076.png" width="44" alt="golem_076" /> | **Volcanic Walker** | ♨️ Steam | Tier 2 | 1.15m | 29 | 23 | 190 | 6 | 2x High-Pressure Condenser, 2x Giant Nuts, 2x Transistors, 1x Pressure Gauges, 1x Coal Residue, 2x Cooking Pots, 1x Screws & Bolts |
| #077 | <img src="GOLEMS/golems_imgs/golem_077.png" width="44" alt="golem_077" /> | **Lumen Golem** | ☀️ Luminous | Tier 2 | 1.20m | 22 | 16 | 153 | 7 | 2x Filament Bulbs, 1x Pressure Gauges, 1x Coal Residue, 1x Worn Gears, 1x Frying Pans |
| #078 | <img src="GOLEMS/golems_imgs/golem_078.png" width="44" alt="golem_078" /> | **Brazen Sentinel** | ⚙️ Mechanical | Tier 2 | 1.02m | 23 | 30 | 171 | 12 | 1x Switch Levers, 2x Pressure Gauges, 2x Perfect Bronze Gears, 1x Filament Bulbs, 1x Brass Plates, 1x Frayed Cables, 2x Coal Residue, 2x Copper Wire |
| #079 | <img src="GOLEMS/golems_imgs/golem_079.png" width="44" alt="golem_079" /> | **Vaporized Defender** | ♨️ Steam | Tier 2 | 1.01m | 28 | 16 | 155 | 9 | 1x Vacuum Tubes, 1x High-Pressure Condenser, 1x Alchemical Batteries, 1x Transistors, 2x Switch Levers, 1x Broken Pocket Watches |
| #080 | <img src="GOLEMS/golems_imgs/golem_080.png" width="44" alt="golem_080" /> | **Galvanic Assembly** | ⚡ Galvanic | Tier 2 | 1.17m | 32 | 21 | 135 | 10 | 1x Clock Springs, 2x Manhole Covers, 1x Galvanic Dynamo, 1x Steam Engine, 1x Alchemical Batteries, 1x Frying Pans |
| #081 | <img src="GOLEMS/golems_imgs/golem_081.png" width="44" alt="golem_081" /> | **Electric Guardian** | ⚡ Galvanic | Tier 2 | 0.93m | 46 | 16 | 123 | 10 | 1x Manhole Covers, 1x Tin Cans, 2x Vacuum Tubes, 2x Transistors, 2x Galvanic Dynamo, 2x Frayed Cables |
| #082 | <img src="GOLEMS/golems_imgs/golem_082.png" width="44" alt="golem_082" /> | **Automaton Crusader** | ⚙️ Mechanical | Tier 2 | 1.09m | 23 | 31 | 144 | 12 | 1x Tin Cans, 2x Cooking Pots, 2x Iron Chains, 1x Magnetic Compasses, 2x Copper Pipes, 1x Steam Valves, 1x Broken Pocket Watches, 2x Perfect Bronze Gears |
| #083 | <img src="GOLEMS/golems_imgs/golem_083.png" width="44" alt="golem_083" /> | **Boiler Settler** | ♨️ Steam | Tier 2 | 1.05m | 23 | 18 | 142 | 13 | 1x Frying Pans, 1x Old TV Lenses, 1x Blown Fuses, 1x High-Pressure Condenser, 1x Clock Springs, 2x Tin Cans, 2x Iron Chains |
| #084 | <img src="GOLEMS/golems_imgs/golem_084.png" width="44" alt="golem_084" /> | **Diodic Smelter** | ☀️ Luminous | Tier 2 | 1.23m | 29 | 15 | 124 | 18 | 1x Tin Cans, 2x Clock Springs, 2x Coal Residue, 2x Worn Gears, 2x LED Diodes, 1x Magnetic Compasses, 1x Switch Levers |
| #085 | <img src="GOLEMS/golems_imgs/golem_085.png" width="44" alt="golem_085" /> | **Pressurized Watcher** | ♨️ Steam | Tier 2 | 1.06m | 33 | 18 | 164 | 19 | 1x Rusty Nails, 2x Copper Wire, 2x Steam Valves, 1x Tesla Coils, 1x Tin Cans, 2x Clock Springs, 2x Pressure Gauges, 2x Cooking Pots |
| #086 | <img src="GOLEMS/golems_imgs/golem_086.png" width="44" alt="golem_086" /> | **Plasmatic Leviathan** | ⚡ Galvanic | Tier 2 | 0.98m | 35 | 17 | 139 | 17 | 2x Galvanic Dynamo, 2x Cooking Pots, 1x Steam Valves, 2x Radio Antennas, 1x Copper Pipes, 1x Vacuum Tubes, 2x Rusty Nails, 2x Tin Cans |
| #087 | <img src="GOLEMS/golems_imgs/golem_087.png" width="44" alt="golem_087" /> | **Articulated Vanguard** | ⚙️ Mechanical | Tier 2 | 0.93m | 22 | 16 | 173 | 20 | 1x Pressure Gauges, 2x Switch Levers, 2x Filament Bulbs, 2x Clock Springs, 2x Tin Cans, 2x Magnetic Compasses, 1x Coal Residue |
| #088 | <img src="GOLEMS/golems_imgs/golem_088.png" width="44" alt="golem_088" /> | **Sparkling Automaton** | ☀️ Luminous | Tier 2 | 1.29m | 36 | 17 | 114 | 18 | 1x Steam Engine, 2x Giant Nuts, 2x Old TV Lenses, 2x LED Diodes, 1x Resonating Quartz Crystal |
| #089 | <img src="GOLEMS/golems_imgs/golem_089.png" width="44" alt="golem_089" /> | **Titanic Protector** | ⚙️ Mechanical | Tier 2 | 1.13m | 28 | 31 | 111 | 7 | 1x Worn Gears, 1x Perfect Bronze Gears, 2x Vacuum Tubes, 1x Brass Plates, 2x Switch Levers, 1x Rusty Nails, 2x Giant Nuts |
| #090 | <img src="GOLEMS/golems_imgs/golem_090.png" width="44" alt="golem_090" /> | **Geared Bearer** | ⚙️ Mechanical | Tier 2 | 1.09m | 22 | 16 | 139 | 29 | 1x Tin Cans, 2x Old TV Lenses, 2x Copper Wire, 2x Magnetic Compasses, 2x Giant Nuts, 2x Filament Bulbs, 2x Clock Springs |
| #091 | <img src="GOLEMS/golems_imgs/golem_091.png" width="44" alt="golem_091" /> | **Primordial Monolith** | 🔮 Aether | Tier 3 | 1.23m | 64 | 15 | 133 | 24 | 1x Steam Engine, 2x Galvanic Dynamo, 2x Magnetic Compasses, 2x Resonating Quartz Crystal, 2x Condensed Mana Core, 1x Automaton Brain |
| #092 | <img src="GOLEMS/golems_imgs/golem_092.png" width="44" alt="golem_092" /> | **Thermal Scavenger** | ♨️ Steam | Tier 3 | 0.94m | 51 | 46 | 200 | 24 | 2x Supercharged Plasma Battery, 1x Steam Engine, 1x High-Pressure Condenser, 1x Radio Antennas, 2x Clock Springs, 2x Boiler Heart, 2x Pressure Gauges, 2x Perfect Bronze Gears |
| #093 | <img src="GOLEMS/golems_imgs/golem_093.png" width="44" alt="golem_093" /> | **Boiler Excavator** | ♨️ Steam | Tier 3 | 1.17m | 58 | 20 | 191 | 26 | 1x Aether Reactor, 2x Switch Levers, 2x Steam Engine, 2x High-Pressure Condenser, 2x Radio Antennas, 1x Pressure Gauges, 2x Old TV Lenses, 1x Condensed Mana Core, 1x LED Diodes |
| #094 | <img src="GOLEMS/golems_imgs/golem_094.png" width="44" alt="golem_094" /> | **Manatic Patroller** | 🔮 Aether | Tier 3 | 1.26m | 58 | 22 | 166 | 22 | 1x High-Pressure Condenser, 1x Radio Antennas, 2x Galvanic Dynamo, 2x Old TV Lenses, 1x Precision Gyroscope, 2x Aether Reactor |
| #095 | <img src="GOLEMS/golems_imgs/golem_095.png" width="44" alt="golem_095" /> | **Sparking Basilisk** | ⚡ Galvanic | Tier 3 | 1.05m | 59 | 23 | 140 | 40 | 2x Radio Antennas, 1x Tesla Coils, 2x Supercharged Plasma Battery, 1x Steam Engine, 1x Forged Titanium Piston, 1x Resonating Quartz Crystal, 2x Solar Optical Array, 2x Steam Valves |
| #096 | <img src="GOLEMS/golems_imgs/golem_096.png" width="44" alt="golem_096" /> | **Volcanic Guard** | ♨️ Steam | Tier 3 | 1.19m | 64 | 42 | 158 | 17 | 2x Condensed Mana Core, 1x Filament Bulbs, 1x Automaton Brain, 2x Steam Engine, 1x Solar Optical Array, 2x Precision Gyroscope, 2x Forged Titanium Piston |
| #097 | <img src="GOLEMS/golems_imgs/golem_097.png" width="44" alt="golem_097" /> | **Lumen Bulwark** | ☀️ Luminous | Tier 3 | 1.02m | 55 | 35 | 143 | 37 | 1x Condensed Mana Core, 2x Radio Antennas, 1x Solar Optical Array, 2x Vacuum Tubes, 2x Tesla Coils, 1x Boiler Heart, 2x Clock Springs, 2x Precision Gyroscope |
| #098 | <img src="GOLEMS/golems_imgs/golem_098.png" width="44" alt="golem_098" /> | **Piston Hunter** | ♨️ Steam | Tier 3 | 1.11m | 58 | 37 | 176 | 9 | 2x Condensed Mana Core, 1x Perfect Bronze Gears, 2x Tesla Coils, 2x Boiler Heart, 1x Transistors, 2x High-Pressure Condenser |
| #099 | <img src="GOLEMS/golems_imgs/golem_099.png" width="44" alt="golem_099" /> | **Raying Gunner** | ⚡ Galvanic | Tier 3 | 1.11m | 81 | 16 | 136 | 20 | 2x Galvanic Dynamo, 2x LED Diodes, 2x Steam Engine, 2x Tesla Coils, 2x Radio Antennas, 2x Condensed Mana Core |
| #100 | <img src="GOLEMS/golems_imgs/golem_100.png" width="44" alt="golem_100" /> | **Steamy Wraith** | ♨️ Steam | Tier 3 | 1.03m | 58 | 31 | 134 | 14 | 2x Condensed Mana Core, 2x Galvanic Dynamo, 2x Boiler Heart, 1x Tesla Coils, 1x Radio Antennas |
| #101 | <img src="GOLEMS/golems_imgs/golem_101.png" width="44" alt="golem_101" /> | **Smoky Colossus** | ♨️ Steam | Tier 3 | 0.93m | 46 | 31 | 166 | 36 | 2x Magnetic Compasses, 1x High-Pressure Condenser, 2x Radio Antennas, 2x Clock Springs, 2x Automaton Brain, 2x Forged Titanium Piston |
| #102 | <img src="GOLEMS/golems_imgs/golem_102.png" width="44" alt="golem_102" /> | **Teslic Destroyer** | ⚡ Galvanic | Tier 3 | 1.26m | 62 | 24 | 163 | 15 | 2x Galvanic Dynamo, 1x Resonating Quartz Crystal, 1x Pressure Gauges, 1x Forged Titanium Piston, 1x Steam Engine, 2x Supercharged Plasma Battery |
| #103 | <img src="GOLEMS/golems_imgs/golem_103.png" width="44" alt="golem_103" /> | **Boiler Servant** | ♨️ Steam | Tier 3 | 0.93m | 48 | 33 | 182 | 16 | 1x Supercharged Plasma Battery, 2x Precision Gyroscope, 1x Solar Optical Array, 2x High-Pressure Condenser, 1x Forged Titanium Piston, 2x Tesla Coils |
| #104 | <img src="GOLEMS/golems_imgs/golem_104.png" width="44" alt="golem_104" /> | **Diodic Forger** | ☀️ Luminous | Tier 3 | 1.26m | 58 | 30 | 203 | 22 | 1x Aether Reactor, 2x Condensed Mana Core, 2x Precision Gyroscope, 2x Alchemical Batteries, 2x Filament Bulbs, 2x LED Diodes, 1x Perfect Bronze Gears, 2x Solar Optical Array |
| #105 | <img src="GOLEMS/golems_imgs/golem_105.png" width="44" alt="golem_105" /> | **Pressurized Executor** | ♨️ Steam | Tier 3 | 1.00m | 34 | 38 | 210 | 9 | 2x Boiler Heart, 1x Steam Valves, 2x Alchemical Batteries, 1x Filament Bulbs, 1x Forged Titanium Piston, 1x Pressure Gauges, 1x Steam Engine |
| #106 | <img src="GOLEMS/golems_imgs/golem_106.png" width="44" alt="golem_106" /> | **Plasmatic Tracker** | ⚡ Galvanic | Tier 3 | 1.03m | 60 | 21 | 214 | 16 | 2x Alchemical Batteries, 1x Supercharged Plasma Battery, 1x Solar Optical Array, 1x Aether Reactor, 1x Precision Gyroscope, 2x Galvanic Dynamo, 2x Filament Bulbs, 1x Steam Engine |
| #107 | <img src="GOLEMS/golems_imgs/golem_107.png" width="44" alt="golem_107" /> | **Igneous Titan** | ♨️ Steam | Tier 3 | 1.04m | 45 | 32 | 260 | 22 | 1x Resonating Quartz Crystal, 1x Supercharged Plasma Battery, 2x Pressure Gauges, 2x Boiler Heart, 1x Aether Reactor, 2x Alchemical Batteries, 2x Clock Springs, 2x High-Pressure Condenser |
| #108 | <img src="GOLEMS/golems_imgs/golem_108.png" width="44" alt="golem_108" /> | **Dragonic Walker** | 🔮 Aether | Tier 3 | 1.17m | 58 | 23 | 166 | 26 | 1x Blown Fuses, 1x Clock Springs, 1x High-Pressure Condenser, 2x Radio Antennas, 1x LED Diodes, 2x Vacuum Tubes, 2x Condensed Mana Core, 1x Perfect Bronze Gears |
| #109 | <img src="GOLEMS/golems_imgs/golem_109.png" width="44" alt="golem_109" /> | **Vaporized Golem** | ♨️ Steam | Tier 3 | 0.92m | 47 | 30 | 173 | 17 | 2x LED Diodes, 1x Automaton Brain, 1x Clock Springs, 1x Steam Engine, 1x Forged Titanium Piston, 1x Boiler Heart, 2x High-Pressure Condenser, 1x Resonating Quartz Crystal |
| #110 | <img src="GOLEMS/golems_imgs/golem_110.png" width="44" alt="golem_110" /> | **Geared Sentinel** | ⚙️ Mechanical | Tier 3 | 1.25m | 44 | 31 | 157 | 24 | 1x Precision Gyroscope, 2x Perfect Bronze Gears, 1x Condensed Mana Core, 2x Resonating Quartz Crystal, 2x Steam Engine, 1x Alchemical Batteries, 1x Radio Antennas |
| #111 | <img src="GOLEMS/golems_imgs/golem_111.png" width="44" alt="golem_111" /> | **Clockwork Defender** | ⚙️ Mechanical | Tier 3 | 0.91m | 45 | 43 | 155 | 16 | 1x Supercharged Plasma Battery, 2x Precision Gyroscope, 2x Switch Levers, 2x LED Diodes, 2x Perfect Bronze Gears, 1x Solar Optical Array, 1x Filament Bulbs |
| #112 | <img src="GOLEMS/golems_imgs/golem_112.png" width="44" alt="golem_112" /> | **Filament Assembly** | ☀️ Luminous | Tier 3 | 1.17m | 28 | 24 | 220 | 35 | 2x Alchemical Batteries, 1x Boiler Heart, 2x Solar Optical Array, 2x Radio Antennas, 2x Pressure Gauges |
| #113 | <img src="GOLEMS/golems_imgs/golem_113.png" width="44" alt="golem_113" /> | **Ferrous Guardian** | ⚙️ Mechanical | Tier 3 | 0.91m | 47 | 25 | 162 | 24 | 2x Radio Antennas, 1x Alchemical Batteries, 1x Magnetic Compasses, 1x Galvanic Dynamo, 2x Transistors, 2x Precision Gyroscope, 1x Steam Engine, 1x LED Diodes |
| #114 | <img src="GOLEMS/golems_imgs/golem_114.png" width="44" alt="golem_114" /> | **Pneumatic Crusader** | ♨️ Steam | Tier 3 | 1.09m | 46 | 45 | 136 | 16 | 2x Perfect Bronze Gears, 1x Broken Pocket Watches, 1x Switch Levers, 1x Vacuum Tubes, 1x Resonating Quartz Crystal, 2x Condensed Mana Core, 2x Boiler Heart |
| #115 | <img src="GOLEMS/golems_imgs/golem_115.png" width="44" alt="golem_115" /> | **Singular Settler** | 🔮 Aether | Tier 3 | 1.08m | 49 | 22 | 176 | 16 | 1x LED Diodes, 1x Solar Optical Array, 2x High-Pressure Condenser, 1x Steam Valves, 1x Perfect Bronze Gears, 2x Condensed Mana Core |
| #116 | <img src="GOLEMS/golems_imgs/golem_116.png" width="44" alt="golem_116" /> | **Mystic Smelter** | 🔮 Aether | Tier 3 | 1.02m | 58 | 16 | 167 | 14 | 1x Alchemical Batteries, 1x Aether Reactor, 1x LED Diodes, 1x Automaton Brain, 1x Resonating Quartz Crystal, 1x Condensed Mana Core |
| #117 | <img src="GOLEMS/golems_imgs/golem_117.png" width="44" alt="golem_117" /> | **Igneous Watcher** | ♨️ Steam | Tier 3 | 1.13m | 46 | 44 | 184 | 9 | 2x Supercharged Plasma Battery, 2x Perfect Bronze Gears, 1x Pressure Gauges, 2x Forged Titanium Piston, 1x High-Pressure Condenser |
| #118 | <img src="GOLEMS/golems_imgs/golem_118.png" width="44" alt="golem_118" /> | **Piston Leviathan** | ♨️ Steam | Tier 3 | 1.28m | 70 | 27 | 171 | 29 | 2x Steam Engine, 2x Broken Pocket Watches, 1x Automaton Brain, 2x High-Pressure Condenser, 1x Clock Springs, 2x Galvanic Dynamo, 2x Perfect Bronze Gears, 2x Radio Antennas, 2x Aether Reactor |
| #119 | <img src="GOLEMS/golems_imgs/golem_119.png" width="44" alt="golem_119" /> | **Vaporized Vanguard** | ♨️ Steam | Tier 3 | 1.02m | 27 | 29 | 238 | 34 | 2x Solar Optical Array, 2x Radio Antennas, 2x Forged Titanium Piston, 2x High-Pressure Condenser, 1x Pressure Gauges, 2x Alchemical Batteries |
| #120 | <img src="GOLEMS/golems_imgs/golem_120.png" width="44" alt="golem_120" /> | **Galvanic Automaton** | ⚡ Galvanic | Tier 3 | 1.21m | 40 | 20 | 189 | 16 | 1x Supercharged Plasma Battery, 1x Solar Optical Array, 1x Transistors, 1x High-Pressure Condenser, 2x Switch Levers, 1x Alchemical Batteries |
| #121 | <img src="GOLEMS/golems_imgs/golem_121.png" width="44" alt="golem_121" /> | **Primordial Protector** | 🔮 Aether | Tier 3 | 1.13m | 67 | 27 | 193 | 17 | 2x Aether Reactor, 1x Tesla Coils, 2x Filament Bulbs, 1x Solar Optical Array, 2x Steam Valves, 1x Perfect Bronze Gears, 1x Supercharged Plasma Battery, 1x High-Pressure Condenser, 2x Switch Levers |
| #122 | <img src="GOLEMS/golems_imgs/golem_122.png" width="44" alt="golem_122" /> | **Thermal Bearer** | ♨️ Steam | Tier 3 | 1.05m | 71 | 29 | 157 | 13 | 2x Vacuum Tubes, 2x Forged Titanium Piston, 2x Steam Engine, 1x Resonating Quartz Crystal, 1x Alchemical Batteries, 1x Aether Reactor, 2x Tesla Coils, 2x Galvanic Dynamo |
| #123 | <img src="GOLEMS/golems_imgs/golem_123.png" width="44" alt="golem_123" /> | **Ferrous Monolith** | ⚙️ Mechanical | Tier 3 | 0.98m | 78 | 22 | 200 | 20 | 1x Galvanic Dynamo, 1x Precision Gyroscope, 2x Resonating Quartz Crystal, 1x Steam Engine, 2x Alchemical Batteries, 2x Condensed Mana Core, 2x Blown Fuses, 2x Automaton Brain |
| #124 | <img src="GOLEMS/golems_imgs/golem_124.png" width="44" alt="golem_124" /> | **Voltaic Scavenger** | ⚡ Galvanic | Tier 3 | 1.16m | 51 | 28 | 230 | 21 | 1x Precision Gyroscope, 2x Radio Antennas, 1x Blown Fuses, 2x Tesla Coils, 2x Alchemical Batteries, 2x High-Pressure Condenser, 1x Forged Titanium Piston, 1x Aether Reactor |
| #125 | <img src="GOLEMS/golems_imgs/golem_125.png" width="44" alt="golem_125" /> | **Singular Excavator** | 🔮 Aether | Tier 3 | 1.30m | 69 | 42 | 133 | 17 | 2x Perfect Bronze Gears, 2x Condensed Mana Core, 2x Boiler Heart, 1x Transistors, 1x Radio Antennas, 1x Old TV Lenses, 1x Galvanic Dynamo, 2x Aether Reactor, 1x Vacuum Tubes |
| #126 | <img src="GOLEMS/golems_imgs/golem_126.png" width="44" alt="golem_126" /> | **Mystic Patroller** | 🔮 Aether | Tier 4 | 1.06m | 111 | 40 | 187 | 31 | 3x Supercharged Plasma Battery, 3x Aether Reactor, 3x Radio Antennas, 3x LED Diodes, 2x Boiler Heart, 1x Condensed Mana Core |
| #127 | <img src="GOLEMS/golems_imgs/golem_127.png" width="44" alt="golem_127" /> | **Conductive Basilisk** | ⚡ Galvanic | Tier 4 | 1.22m | 71 | 21 | 245 | 23 | 1x Resonating Quartz Crystal, 3x Alchemical Batteries, 1x Solar Optical Array, 2x Condensed Mana Core, 2x Galvanic Dynamo, 2x Tesla Coils |
| #128 | <img src="GOLEMS/golems_imgs/golem_128.png" width="44" alt="golem_128" /> | **Dragonic Guard** | 🔮 Aether | Tier 4 | 1.12m | 100 | 80 | 270 | 32 | 2x Solar Optical Array, 2x Boiler Heart, 1x LED Diodes, 2x Perfect Bronze Gears, 1x Aetheric Singularity, 3x Condensed Mana Core, 1x Tesla Coils, 2x Aether Reactor, 3x Celestial Gear Reliquary |
| #129 | <img src="GOLEMS/golems_imgs/golem_129.png" width="44" alt="golem_129" /> | **Arcane Bulwark** | 🔮 Aether | Tier 4 | 1.02m | 112 | 89 | 307 | 30 | 2x Condensed Mana Core, 2x Perfect Bronze Gears, 3x Celestial Gear Reliquary, 2x Primordial Golem Heart, 2x Aetheric Singularity, 2x Boiler Heart, 3x Aether Reactor |
| #130 | <img src="GOLEMS/golems_imgs/golem_130.png" width="44" alt="golem_130" /> | **Steamy Hunter** | ♨️ Steam | Tier 4 | 1.02m | 104 | 28 | 233 | 17 | 1x Aetheric Singularity, 2x Supercharged Plasma Battery, 3x High-Pressure Condenser, 2x Steam Engine, 2x Mechanical Dragon Eye, 1x Forged Titanium Piston, 1x Galvanic Dynamo |
| #131 | <img src="GOLEMS/golems_imgs/golem_131.png" width="44" alt="golem_131" /> | **Primordial Gunner** | 🔮 Aether | Tier 4 | 1.20m | 107 | 70 | 216 | 27 | 3x Boiler Heart, 2x Automaton Brain, 2x Tesla Coils, 3x Aether Reactor, 1x Supercharged Plasma Battery, 2x Primordial Golem Heart, 3x Precision Gyroscope, 2x Resonating Quartz Crystal |
| #132 | <img src="GOLEMS/golems_imgs/golem_132.png" width="44" alt="golem_132" /> | **Reliquary Wraith** | 🔮 Aether | Tier 4 | 1.00m | 115 | 44 | 223 | 15 | 1x Primordial Golem Heart, 2x Mechanical Dragon Eye, 2x Condensed Mana Core, 1x Boiler Heart, 1x Celestial Gear Reliquary, 2x Galvanic Dynamo, 3x Supercharged Plasma Battery |
| #133 | <img src="GOLEMS/golems_imgs/golem_133.png" width="44" alt="golem_133" /> | **Astral Colossus** | 🔮 Aether | Tier 4 | 0.96m | 74 | 68 | 337 | 35 | 3x Primordial Golem Heart, 1x Radio Antennas, 1x Supercharged Plasma Battery, 3x Celestial Gear Reliquary, 1x Tesla Coils, 1x Automaton Brain, 1x Solar Optical Array |
| #134 | <img src="GOLEMS/golems_imgs/golem_134.png" width="44" alt="golem_134" /> | **Manatic Destroyer** | 🔮 Aether | Tier 4 | 1.17m | 116 | 57 | 235 | 55 | 2x Boiler Heart, 2x Celestial Gear Reliquary, 2x Steam Engine, 3x Radio Antennas, 3x Condensed Mana Core, 2x Aetheric Singularity, 2x Solar Optical Array, 3x Supercharged Plasma Battery |
| #135 | <img src="GOLEMS/golems_imgs/golem_135.png" width="44" alt="golem_135" /> | **Singular Servant** | 🔮 Aether | Tier 4 | 1.14m | 136 | 68 | 333 | 33 | 3x Tesla Coils, 3x Celestial Gear Reliquary, 2x Aetheric Singularity, 1x Primordial Golem Heart, 2x High-Pressure Condenser, 1x Radio Antennas, 3x Supercharged Plasma Battery, 2x Precision Gyroscope, 2x Mechanical Dragon Eye |
| #136 | <img src="GOLEMS/golems_imgs/golem_136.png" width="44" alt="golem_136" /> | **Mystic Forger** | 🔮 Aether | Tier 4 | 1.27m | 94 | 88 | 375 | 33 | 2x High-Pressure Condenser, 3x Celestial Gear Reliquary, 1x Alchemical Batteries, 1x Boiler Heart, 3x Mechanical Dragon Eye, 3x Primordial Golem Heart, 2x Solar Optical Array, 3x Perfect Bronze Gears, 1x Tesla Coils |
| #137 | <img src="GOLEMS/golems_imgs/golem_137.png" width="44" alt="golem_137" /> | **Cosmic Executor** | 🔮 Aether | Tier 4 | 0.93m | 97 | 47 | 204 | 18 | 3x Aether Reactor, 1x Celestial Gear Reliquary, 1x Mechanical Dragon Eye, 1x Supercharged Plasma Battery, 2x Boiler Heart, 3x Steam Engine, 1x Solar Optical Array |
| #138 | <img src="GOLEMS/golems_imgs/golem_138.png" width="44" alt="golem_138" /> | **Piston Tracker** | ♨️ Steam | Tier 4 | 1.25m | 56 | 86 | 295 | 26 | 1x Primordial Golem Heart, 3x Boiler Heart, 2x Aether Reactor, 2x Radio Antennas, 2x Alchemical Batteries, 3x Perfect Bronze Gears, 3x Forged Titanium Piston, 3x High-Pressure Condenser |
| #139 | <img src="GOLEMS/golems_imgs/golem_139.png" width="44" alt="golem_139" /> | **Arcane Titan** | 🔮 Aether | Tier 4 | 0.98m | 92 | 78 | 275 | 24 | 2x Automaton Brain, 2x Radio Antennas, 1x Mechanical Dragon Eye, 2x Precision Gyroscope, 3x Supercharged Plasma Battery, 3x Celestial Gear Reliquary, 2x Forged Titanium Piston |
| #140 | <img src="GOLEMS/golems_imgs/golem_140.png" width="44" alt="golem_140" /> | **Aetheric Walker** | 🔮 Aether | Tier 4 | 0.90m | 96 | 51 | 211 | 23 | 3x Forged Titanium Piston, 2x Condensed Mana Core, 1x Aetheric Singularity, 1x Supercharged Plasma Battery, 2x Aether Reactor, 2x Primordial Golem Heart |
| #141 | <img src="GOLEMS/golems_imgs/golem_141.png" width="44" alt="golem_141" /> | **Primordial Golem** | 🔮 Aether | Tier 4 | 0.96m | 144 | 23 | 210 | 32 | 2x Aether Reactor, 3x Automaton Brain, 1x LED Diodes, 3x Aetheric Singularity, 1x Galvanic Dynamo, 1x Mechanical Dragon Eye, 1x High-Pressure Condenser |
| #142 | <img src="GOLEMS/golems_imgs/golem_142.png" width="44" alt="golem_142" /> | **Reliquary Sentinel** | 🔮 Aether | Tier 4 | 1.01m | 118 | 61 | 245 | 12 | 2x Condensed Mana Core, 2x Mechanical Dragon Eye, 3x Perfect Bronze Gears, 2x Celestial Gear Reliquary, 2x Supercharged Plasma Battery, 1x Steam Engine, 3x Galvanic Dynamo |
| #143 | <img src="GOLEMS/golems_imgs/golem_143.png" width="44" alt="golem_143" /> | **Astral Defender** | 🔮 Aether | Tier 4 | 1.22m | 99 | 78 | 259 | 35 | 3x Celestial Gear Reliquary, 1x Radio Antennas, 1x Boiler Heart, 1x Mechanical Dragon Eye, 1x Galvanic Dynamo, 3x LED Diodes, 3x Aetheric Singularity, 3x Forged Titanium Piston |
| #144 | <img src="GOLEMS/golems_imgs/golem_144.png" width="44" alt="golem_144" /> | **Pneumatic Assembly** | ♨️ Steam | Tier 4 | 1.15m | 114 | 66 | 189 | 13 | 3x Condensed Mana Core, 2x Steam Engine, 3x Boiler Heart, 2x Precision Gyroscope, 3x Supercharged Plasma Battery, 3x Galvanic Dynamo, 1x Forged Titanium Piston |
| #145 | <img src="GOLEMS/golems_imgs/golem_145.png" width="44" alt="golem_145" /> | **Singular Guardian** | 🔮 Aether | Tier 4 | 0.91m | 176 | 57 | 235 | 43 | 3x High-Pressure Condenser, 3x Aetheric Singularity, 2x Perfect Bronze Gears, 3x Mechanical Dragon Eye, 2x Steam Engine, 3x Boiler Heart, 2x Solar Optical Array, 1x Condensed Mana Core, 3x Automaton Brain, 3x Supercharged Plasma Battery |
| #146 | <img src="GOLEMS/golems_imgs/golem_146.png" width="44" alt="golem_146" /> | **Mystic Crusader** | 🔮 Aether | Tier 4 | 1.01m | 54 | 44 | 291 | 20 | 1x Solar Optical Array, 1x Condensed Mana Core, 1x Automaton Brain, 2x Celestial Gear Reliquary, 2x High-Pressure Condenser |
| #147 | <img src="GOLEMS/golems_imgs/golem_147.png" width="44" alt="golem_147" /> | **Cosmic Settler** | 🔮 Aether | Tier 4 | 0.90m | 139 | 79 | 284 | 32 | 3x Celestial Gear Reliquary, 1x Primordial Golem Heart, 3x Aetheric Singularity, 3x Automaton Brain, 1x Galvanic Dynamo, 1x LED Diodes, 1x Supercharged Plasma Battery, 3x Condensed Mana Core, 2x Forged Titanium Piston, 2x Precision Gyroscope |
| #148 | <img src="GOLEMS/golems_imgs/golem_148.png" width="44" alt="golem_148" /> | **Dragonic Smelter** | 🔮 Aether | Tier 4 | 1.14m | 122 | 62 | 337 | 29 | 3x Primordial Golem Heart, 2x Mechanical Dragon Eye, 1x Solar Optical Array, 3x High-Pressure Condenser, 1x Steam Engine, 1x Perfect Bronze Gears, 1x Celestial Gear Reliquary, 3x Supercharged Plasma Battery, 3x LED Diodes, 1x Boiler Heart |
| #149 | <img src="GOLEMS/golems_imgs/golem_149.png" width="44" alt="golem_149" /> | **Arcane Watcher** | 🔮 Aether | Tier 4 | 0.91m | 169 | 60 | 270 | 61 | 1x Boiler Heart, 3x Automaton Brain, 3x Solar Optical Array, 3x Aether Reactor, 2x Supercharged Plasma Battery, 3x Mechanical Dragon Eye, 1x Radio Antennas, 3x Celestial Gear Reliquary, 2x Aetheric Singularity, 2x Resonating Quartz Crystal |
| #150 | <img src="GOLEMS/golems_imgs/golem_150.png" width="44" alt="golem_150" /> | **Aetheric Leviathan** | 🔮 Aether | Tier 4 | 1.15m | 130 | 47 | 216 | 18 | 2x Primordial Golem Heart, 2x Boiler Heart, 2x Mechanical Dragon Eye, 1x Galvanic Dynamo, 2x Supercharged Plasma Battery, 1x Aether Reactor, 3x Automaton Brain, 1x Steam Engine |


1. **Recipe Composition**: The player selects between **5 and 12 parts** from their inventory. Identical materials can be stacked or varied parts balanced.
2. **Canonical Serialization**: The recipe is sorted alphabetically by material identifier and quantity (e.g., `antena:2|bobina:1|cobre:3|engranaje:2|sarten:1`).
3. **Deterministic Hash**: A 32-bit numerical hash is calculated (FNV-1a / truncated SHA).
4. **Derivation of Attributes and Features**:
   - **Base Stats**: Weighted sum of constituent materials.
   - **Profile Variation**: The hash applies controlled percentage adjustments.
   - **Visual Features**: Emissive color hue, proportional scale, and cosmetic details.
   - **Procedural Naming**: Prefix and suffix generated from predominant components (e.g., *"Titanic Steamchrome"*, *"Armored Galvanoid"*).
5. **Determinism and Collectibility**: The exact same material combination yields **the exact same golem**, allowing players to discover, document, and share secret recipes with one another.

> 📜 **Complete 150 Deterministic Recipe Catalog**:
> - 🇬🇧 **English**: [GOLEMS/Golems-Recetas-150_eng.md](GOLEMS/Golems-Recetas-150_eng.md) — 150 Master Golem Recipe Catalog (Deterministic FNV-1a designs)
> - 🇪🇸 **Español**: [GOLEMS/Golems-Recetas-150.md](GOLEMS/Golems-Recetas-150.md) — Catálogo Maestro de 150 Recetas de Golems (Especificación algorítmica)

---

## ⚔️ Stats, Affinities, and Real-Time Combat (FFA in the Grand Arena)

![Stats and Combat](GOLEMS/golems_stats_eng.png)

Each golem has 5 core stats generated procedurally or via forging:
- **Attack (ATK)**: Base damage delivered per hit ($20-38$).
- **Defense (DEF)**: Direct reduction of incoming damage ($10-22$).
- **Vitality (HP)**: Total health points of the automaton ($100-160$).
- **Speed (SPD)**: Attack frequency ($T_{\text{cooldown}} = 2.2\text{s} / (1 + \text{SPD}\times 0.04)$) and movement speed.
- **Elemental Affinity (AFF)**: Energy type of the golem (`STEAM`, `MECHANICAL`, `GALVANIC`, `LUMINOUS`, `AETHER`).

### The Elemental Affinity Pentagon

The combat system features a cyclical pentagon of energy advantages and disadvantages:

```mermaid
graph LR
    STEAM["💨 Steam"] -->|"Rusts and disables (x1.40)"| MECHANICAL["⚙️ Mechanical"]
    MECHANICAL -->|"Insulates and deflects (x1.40)"| GALVANIC["⚡ Galvanic"]
    GALVANIC -->|"Overloads filaments (x1.40)"| LUMINOUS["💡 Luminous"]
    LUMINOUS -->|"Disperses and refracts (x1.40)"| AETHER["🔮 Aether"]
    AETHER -->|"Condenses pressure (x1.40)"| STEAM
```

- **Affinity Advantage**: `×1.40` damage multiplier when striking the weak type with golden text `⚡ CRITICAL`.
- **Affinity Disadvantage**: Damage reduction to `×0.75` when striking the strong type.
- **Damage per Tick Equation**: $\text{Damage} = \max\left(2, \text{round}\big((\text{ATK} - \text{DEF} \times 0.5) \times \text{Multiplier}\big)\right)$.
- **Canonical Team Architecture (`GOLEM_TEAMS`)**: Complete friendly fire immunity (`TEAM_PLAYER` vs `TEAM_REMOTE_*`).
- **Boids Physical Separation & Combat Ring**: Horizontal repulsion (`1.6m`) and distance stopping (`1.8m`) to prevent 3D models from overlapping.
- **P2P Synchronization via MessageBus**: Instant broadcast of attacks (`golem_combat_attack`) and defeats (`golem_combat_defeat`).
- **Progression and Rewards**: $+60$ to $+120$ EXP per kill; leveling up restores health and increases ATK, DEF, and HP.
- 📖 *Master technical guide:* [FFA Combat System and Battles Guide](guias/guia-sistema-combate-y-batallas.md).

---

## 🤖 Companion Golems and Real-Time Multiplayer Following

![Golem Limit and Missions](GOLEMS/golems_limite_y_misiones_eng.png)

- **Active Squad in Line (Maximum 3)**: The player can carry up to 3 golems simultaneously.
- **Random Assignment of 3 Different Types (Per Session / Non-Persistent)**: Every player who enters or re-enters the scene automatically receives a random set of **3 golems of completely distinct types** (selected at random with no duplicates among the 5 elemental affinities: Steam, Galvanic, Mechanical, Luminous, and Aether). Upon reloading or rejoining the scene, a new unique set is generated in volatile memory.
- **Real-Time P2P Multiplayer Visualization (Multi-Trail System)**: All players present in the scene can see each user's 3 companion golems in real time. The system uses a distributed architecture processing independent trajectories for the local avatar (`engine.PlayerEntity`) and for all remote avatars (`PlayerIdentityData` + `Transform`), performing smooth interpolation (*LERP/SLERP*) at 60 FPS with staggered slots at $1.8\text{m}$, $3.6\text{m}$, and $5.4\text{m}$ without saturating the CRDT bus.
- **P2P Handshake and Identification Tags**: Via lightweight `MessageBus` events (`golem_squad_announce` and `golem_squad_request`), each client broadcasts and stores the squad composition of other avatars, displaying floating `Billboard` tags with the owner's name, affinity, level, ASCII health bar `[████████░░]`, and abbreviated wallet address.
  - 📖 *Master technical guides:*
    - ⚔️ [FFA Combat System and Battles Guide](guias/guia-sistema-combate-y-batallas.md)
    - 🏟️ [Steampunk Tournament Grand Circular Arena Guide (72m)](guias/guia-arena-torneo-steampunk.md)
    - 🏭 [Golem Factory and Hierarchies Guide](guias/guia-fabrica-de-golems-y-mecanicas.md)
    - 🤖 [Single-File Following System Guide](guias/guia-sistema-seguimiento-y-mecanicas.md)
    - 🌐 [Multiplayer Network and Mobile-First Guide](guias/guia-multijugador-mobile.md)
- **Catalog of 150 Recipe-Based Golem Models (.glb) in 5 Affinity Folders**: Each of the 150 deterministic recipes from the official catalog produces its own mobile-optimized glTF 2.0 binary model, assembled from the shapes of its constituent materials and colored by its elemental affinity class (PBR materials with pure emissive channels, no dynamic lights):
  - ♨️ **Steam (`assets/models/steam/`, 46 golems)**: Copper, boilers, chimneys, and orange fire (`#FF7000`).
  - ⚡ **Galvanic (`assets/models/galvanic/`, 29 golems)**: Angular chassis, Tesla coils, and electric cyan (`#00E5FF`).
  - ⚙️ **Mechanical (`assets/models/mechanical/`, 22 golems)**: Scrap armor, gears, and amber (`#FFBF00`).
  - ☀️ **Luminous (`assets/models/luminous/`, 21 golems)**: Silver chrome, prismatic headlights, and sunlight (`#FFFF33`).
  - 🔮 **Aether (`assets/models/aether/`, 32 golems)**: Mystical obsidian, floating resonators, and amethyst (`#B833FF`).
- **Reserve Golems (Expeditions)**: Golems not travelling with the avatar can be sent on automated missions by selecting:
  - **Destination Zone**: Determines the loot table and part rarity.
  - **Duration**: From 15 minutes to 12 hours.
  - **Efficiency**: Calculated based on the assigned golem's speed and affinity.
  - **Asynchronous Persistence**: Mission progress is computed on the PHP/MySQL server, enabling them to operate while the player is offline.

---

## 🛡️ Hostile NPCs and Zone Guardians

The world features mechanical NPC patrols and guardians guarding the most valuable areas:

- **Waypoint Behavior**: Optimized patrol routes without overloading mobile device CPUs.
- **Aggression Radius**: When a player approaches, the NPC enters combat mode against the user's golems.
- **Elite Guardians**: In the *Scrap Desert* and *Smelting Boilers*, NPC golems have advanced stats to protect epic and legendary parts.
- **Rewards**: Defeating NPCs awards experience to the player and golems, along with a chance for direct material drops.

---

## 📈 Progression and Level System

- **Player Level**: Increased by scavenging, forging, winning battles, and completing expeditions. Unlocks more simultaneous mission slots, larger vault capacity, and extended radar range.
- **Golem Level**: Earned in combat and missions. Proportionally increases stats based on their forge profile.
- **Level Cap by Rarity**: A golem forged with epic or legendary materials has a higher level ceiling than one made of common scrap.

---

## 🏆 Competitive Ladder Tournament (1v1 and 2v2)

![Ladder Tournament](GOLEMS/golems_torneo_eng.png)

The Forge District houses the podium and interactive panel for the **Competitive Ladder**:

- **1v1 Format**: 3 golems vs 3 golems (resolved in real time by comparing stats and affinities).
- **2v2 Format**: 2 players per team with 3 golems each (12 simultaneous golems in the combat arena).
- **Elo Rating**: Matchmaking pairs combatants with similar scores and logs results to the MySQL database via cryptographic signatures.
- **No Reliance on Reflexes/Shooting**: By resolving via stats and affinities, the tournament guarantees absolute equal footing between mobile and desktop players.

---

## 🏟️ Colossal 72m Steampunk Tournament Arena (Cell Games Ring)

Located at the geometric center of the world (`X: 200m, Z: 200m`), this colossal **72-meter diameter** ($R = 36\text{m}$) structure is inspired by the ring architecture from Cell's Tournament (*Dragon Ball Z*) reinterpreted with a post-industrial steam-and-gear aesthetic:

- **Radial Elevated Platform (72m)**: Over 250 reinforced wooden planks and metal elevated $+0.6\text{m}$ above the terrain, with 56 continuous cobble curb segments.
- **Four 12-Meter Monumental Pillars**: At the 4 diagonal corners (NW, NE, SE, SW), built with enlarged base boilers (1.8x), triple vertical gear shafts (`Gear Shaft.glb`), double counter-rotating gear rings (`Gear 10 Teeth` and `Gear 8 Teeth`), double streetlights, and smoking top chimneys (`Smoker.glb`).
- **Grand Central Planetary Sigil**: A colossal central gear (`Gear Big.glb` scale 4.8x / ~12m diameter) rotating at $+0.20\text{ rad/s}$ synchronized with 8 satellite gears in orbital formation and a reliquary altar with sword (`Arthur Sword.glb`).
- **16 Perimeter Beacons and Ceremonial Ramps**: Barrel pedestals with Steampunk numbers (`00` to `08`) and 4 large cardinal access ramps (North, South, East, West) with double safety guardrails (`Tree Fence.glb`).
- **Detailed Technical Guide**: See [`guias/guia-arena-torneo-steampunk.md`](file:///d:/DECENTRALAND/Scenes/Hackathon/guias/guia-arena-torneo-steampunk.md).

---

## 🏗️ Technical Architecture and Persistence

The project implements a hybrid architecture optimized for decentralized and high-performance environments:

```mermaid
graph TD
    subgraph Decentraland_Client["Decentraland Client (Mobile / Desktop)"]
        ECS["SDK7 ECS Engine (TypeScript)"]
        UI["React-ECS UI (Radar, HUD, Inventory)"]
        Multi["P2P Comms (MessageBus Handshake & Multi-Trail)"]
    end

    subgraph Persistent_Backend["Persistent Backend"]
        API["REST API (PHP 8.x)"]
        AUTH["Web3 Signature Verification (signedFetch)"]
        DB[(MySQL Database)]
    end

    ECS <-->|"Local Interaction & Audio"| UI
    ECS <-->|"Live P2P Sync"| Multi
    ECS -->|"Signed Requests (signedFetch)"| API
    API --> AUTH
    AUTH -->|"Read / Write"| DB
```

- **Scene Runtime**: Decentraland SDK7 (`@dcl/sdk/ecs`, `@dcl/sdk/react-ecs`, `@dcl/sdk/math`).
- **Autonomous P2P Multiplayer**: Lightweight squad broadcast via `MessageBus` and distributed local simulation without relying on external servers for live movement.
- **Data Persistence**: Signed requests via `signedFetch` to the PHP API for critical operations (inventory, golem recipes, expeditions, and ranking).

---

## 📱 Mobile-First Design and Performance Constraints

To guarantee a stable 60 FPS and complete compatibility with the Decentraland mobile app (Godot Explorer), the scene strictly complies with official guidelines:

- 🚫 **No Dynamic Lights**: Materials with baked textures and unlit emissives are used for radar and energy effects.
- 🚫 **No Advanced Pointer Raycasting**: Replaced by Euclidean distance detection from the radar.
- 🚫 **No Complex Nine-Slice**: Flat UI backgrounds or textures with fixed dimensions.
- 🚫 **No Audio Frequency Analysis (FFT)**: Lightweight spatial audio using `AudioSource` components.
- 🚫 **No Physical Keyboard / Mouse Dependency**: 100% touch controls with oversized hitboxes respecting safe zones (avoiding collision with virtual on-screen joysticks).

---

## 🚀 Installation, Development, and Deployment

### Prerequisites
- **Node.js**: Version `>= 18.0.0`
- **NPM**: Version `>= 8.0.0`
- **Decentraland CLI**: Installed automatically with the SDK

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/cjbaezilla/Hackathon-Decentraland-Scene.git
cd Hackathon-Decentraland-Scene

# 2. Install dependencies
npm install

# 3. Start local development environment with hot reload
npm start
```

### Available Commands

| Command | Description |
| :--- | :--- |
| `npm start` | Starts local test server with web interface and debugging. |
| `npm run build` | Compiles TypeScript code to JavaScript in `bin/index.js`. |
| `npm run deploy` | Deploys scene to assigned Decentraland World (`golems.dcl.eth`). |
| `npm run upgrade-sdk` | Upgrades `@dcl/sdk` to latest available version. |
| `php -S localhost:8000` | Launches a local PHP server to view the interactive 3D material showcase at `http://localhost:8000/showcase/`. |
| `node scripts/download_steampunk_assets.js` | Automatically downloads and organizes official Decentraland Steampunk package 3D models and textures. |
| `node scripts/generate_models.js` | Generates the 150 recipe-based golem GLB models (one per deterministic recipe) organized by affinity (`--help` to see CLI options). |
| `node scripts/generate_item_htmls.js` | Generates the 46 bilingual HTML showcase pages and index catalog in `showcase/`. |
| `node scripts/generate_item_pngs.js` | Generates 1024x1024 PNG showcase cards for all 46 materials in `showcase/`. |

### 🌐 Viewing the 3D Material Showcase

To inspect all 46 collectible scrap materials with interactive 3D viewports, stat breakdown cards, and bilingual descriptions:

```bash
php -S localhost:8000
```

Access the showcase in your browser at:
- **Catalog Index**: [http://localhost:8000/showcase/](http://localhost:8000/showcase/)
- **Example Item Showcase Page**: [http://localhost:8000/showcase/rare/giroscopio_precision.html](http://localhost:8000/showcase/rare/giroscopio_precision.html)

---

## 📁 Project Structure

```text
Hackathon/
├── assets/                     # 3D models (.glb), textures, sounds, and icons
│   ├── asset-packs/            # Official Decentraland models (Steampunk pack & arena)
│   ├── golems/                 # GLB golem models organized by affinity (150 models, one per recipe)
│   │   ├── steam/              # Steam Golems (46 — golem_003.glb, golem_005.glb, ...)
│   │   ├── galvanic/           # Galvanic Golems (29 — golem_001.glb, golem_009.glb, ...)
│   │   ├── mechanical/         # Mechanical Golems (22 — golem_004.glb, golem_010.glb, ...)
│   │   ├── luminous/           # Luminous Golems (21 — golem_002.glb, golem_006.glb, ...)
│   │   └── aether/             # Aether Golems (32 — golem_013.glb, golem_015.glb, ...)
│   └── items/                  # Collectible material models organized by rarity (46 items)
├── GOLEMS/                     # Official GDD, diagrams, schemas, and Golems cover
│   ├── GDD-Golems.md           # Comprehensive game design document (Spanish)
│   ├── GDD-Golems_eng.md       # Comprehensive game design document (English)
│   ├── Golems-Recetas-150.md   # Master 150 deterministic golem recipe catalog (Spanish)
│   ├── Golems-Recetas-150_eng.md # Master 150 deterministic golem recipe catalog (English)
│   ├── golems_cover_eng.png    # Official experience cover (English version)
│   └── *.png                   # Conceptual illustrations and infographics
├── guias/                      # Technical guides and master documentation
│   ├── README.md               # Master Index and Directory of All Technical Guides
│   ├── guia-npc-bienvenida-silas.md           # Welcome NPC Silas the Survivor & Camp Master Guide
│   ├── guia-mapa-zonas-y-distritos.md         # 25x25 Map, 9 Zones, Trampolines & Posts Master Guide
│   ├── guia-arena-torneo-steampunk.md         # Steampunk Tournament Grand Circular Arena (72m) Guide
│   ├── guia-fabrica-de-golems-y-mecanicas.md   # Wreckage Lab and Golem Forge Guide
│   ├── guia-sistema-combate-y-batallas.md     # Real-Time FFA Combat System Guide
│   ├── guia-sistema-seguimiento-y-mecanicas.md # Multi-Trail FIFO LERP Following System Guide
│   ├── guia-multijugador-mobile.md             # MessageBus P2P Network and Mobile-First Guide
│   └── guia-soporte-bilingue-i18n.md          # Dual-Language System & i18n Guide (ES / EN)
├── docs/                       # Official Decentraland documentation and SDK Skills
│   ├── dcl-docs-main/          # Official Decentraland SDK7 documentation
│   └── sdk-skills-main/        # Master catalog of skills and patterns
├── scripts/                    # Asset generation scripts and utilities
│   ├── download_steampunk_assets.js # Automated downloader for official Decentraland GLB models
│   ├── generate_models.js      # Recipe-based procedural generator for the 150 golem .glb models (parametric CLI)
│   ├── lib/                    # Shared generation library (GLB builder, item shapes, affinity palette, recipe parser)
│   └── README.md               # Detailed CLI generator manual and model catalog
├── src/                        # SDK7 TypeScript source code
│   ├── index.ts                # Main initializer and systems orchestrator
│   ├── state.ts                # Scene reactive global state (EXP, kills, logs, NPC dialogue)
│   ├── ui.tsx                  # React-ECS user interface (HUD, Language Selector, Silas Modal)
│   ├── multiplayer.ts          # P2P infrastructure (MessageBus handshake, attacks & defeats)
│   ├── i18n/                   # Internationalization engine and bilingual dictionaries
│   │   ├── types.ts            # Type schemas and TranslationSchema
│   │   ├── index.ts            # Engine t(), toggleLanguage() and reactive subscriptions
│   │   └── locales/            # Canonical typed dictionaries (es.ts and en.ts)
│   ├── config/                 # Master configurations and constants
│   │   ├── arenaConfig.ts      # Spatial configuration, dimensions & models for Steampunk Arena
│   │   ├── userHideoutConfig.ts# Player Hideout and Vault configuration (3 locked chests)
│   │   ├── forgeDistrictConfig.ts # Forge District configuration and road layout
│   │   └── golems.ts           # Golems configuration, affinities, pentagon & RPG generator
│   ├── components/             # Custom ECS components (Schemas)
│   │   ├── arena.ts            # ArenaRotatorComponent (Continuous deterministic rotation)
│   │   ├── combat.ts           # GolemCombatComponent, FloatingDamageComponent & GOLEM_TEAMS
│   │   └── follower.ts         # GolemFollowerComponent (with ownerAddress & squad DTOs)
│   ├── objects/                # GameObjects Factory Pattern
│   │   ├── welcomeNpc.ts       # Welcome NPC Silas factory, camp & reactive animation
│   │   ├── userHideoutBuilder.ts# Player Hideout & Vault builder factory
│   │   ├── arenaBuilder.ts     # Steampunk Tournament Grand Arena procedural builder
│   │   ├── wreckageLabBuilder.ts# Wreckage Lab builder
│   │   ├── tradingPostsBuilder.ts# Steampunk trading posts builder (10 posts)
│   │   ├── golemFactory.ts     # Entities factory, billboards, ASCII health & floating numbers
│   │   └── trampoline.ts       # Steampunk steam booster trampoline
│   └── systems/                # ECS Systems
│       ├── arenaAnimationSystem.ts # Arena gears and crowns continuous animation system
│       ├── followerSystem.ts   # Multi-Trail FIFO LERP/SLERP following system & arena leap
│       ├── golemCombatSystem.ts# FFA Combat ECS system, tactical AI, ring & Boids repulsion
│       └── trampolineSystem.ts # Trampoline detection and jump system
├── scene.json                  # World metadata (25x25 parcels, spawn, rating)
├── package.json                # Dependencies and build scripts
├── tsconfig.json               # TypeScript compiler configuration
├── AGENTS.md                   # AI master instructions and context
└── README.md                   # Main repository documentation
```

---

## 👥 Credits and Contact

- **Creator and Developer**: Carlos Baeza (`baeza.eth`)
- **Contact**: `hola@cbaeza.com`
- **Deployed World**: `golems.dcl.eth`