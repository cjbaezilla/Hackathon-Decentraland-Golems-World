# Golems: Game Design Document and Technical Specification

![cover](golems_cover_eng.png)

## 1. What the Game Is About

Golems is a multiplayer experience for Decentraland where every visitor enters a world of scrap metal, steam engines, and residual magic with a clear mission: explore a huge map, use a heat radar to find hidden parts, and assemble unique mechanical creatures. Fantasy and steampunk intersect in every design decision, because here you don't mine ore — you scavenge transistors, cooking pots, radio antennas, and old televisions among the rubble.

The heart of the game is the golem. Each golem is born from a specific recipe and, thanks to a deterministic hashing system, no combination accidentally produces the exact same result twice, though it can be reproduced at will if you memorize the recipe. A player can forge and carry up to three golems that follow them through the world. Golems not travelling with you don't sit idle: you send them on automated scavenging missions that continue working while you do something else.

Orbiting around that core idea are real-time stat-based combat, non-player characters patrolling the scene with their own hostile golems, level progression, and a competitive ladder-style tournament played in both 1v1 and 2v2 formats in a colossal 72-meter tournament arena.

The intention is for a newly arrived player to understand what to do in the first two minutes thanks to onboarding guided by the tutorial NPC **Silas the Survivor**, and for someone who has been playing for weeks to keep finding reasons to return — whether for a legendary part that hasn't spawned, a golem they want to forge with a secret recipe, or a rival beating them on the leaderboard.

![what_golems_is_about](golems_de_que_trata_eng.png)

## 2. The Core Game Loop

A typical session flow can be summarized as a self-reinforcing circular loop:

1. **Forge District (Spawn & Base)**: The player spawns in parcel `[0,0]` `(15.8m, 5.9m)`, optionally interacts with Silas the Survivor, visits their personal Hideout & Vault `(Z: 17.7m, X: 3.8m-8.0m)`, and equips the Heat Radar.
2. **Map Exploration (25x25 / 400m × 400m)**: Head out to explore guided by thermal radar pulses and the overlaid 2D Minimap in the HUD.
3. **Scrap Collection**: When approaching within 4m, the scrap part visually emerges from the ground and is collected via a touch tap.
4. **Deterministic Forging**: At the Wreckage Lab in the Forge District, combine 5 to 12 components to generate golems with algorithmically derived attributes and names.
5. **Squad & Combat**: Command up to 3 active golems following in Multi-Trail FIFO LERP formation and fight in real time against NPCs or players in the 72m Grand Arena.
6. **Automated Reserve Expeditions**: Assign reserve golems to offline scavenging missions generating persistent loot.

Each player decides whether to specialize in collecting rare parts, forging golems with unusual combinations, leveling up through combat, or climbing the competitive ladder.

![game_loop](golems_bucle_juego_eng.png)

## 3. The World and the Map (Grid 25x25 - 400m × 400m)

The experience is deployed across a twenty-five by twenty-five parcel Decentraland World (from `0,0` to `24,24`), covering four hundred by four hundred meters (160,000 m² of usable area with natural landscape terrain `landscapeTerrain: true`), featuring gentle hills and slope variations providing variety without complicating mobile navigation.

### 3.1 Spatial Distribution of Zones and the 4 Symmetrical Corners (140m × 140m each)

| Zone | Location (Coords Metros) | Dimension | Risk Level | Main Materials | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Forge District** | Southwest Corner `(0,0)` to `(140,140)` | 140m × 140m (19,600 m²) | 🟢 Safe Zone (No PK) | None (Workshop/Forge) | Spawn `(16, 6)`, **Silas** at `(15.8, 5.9)`, Main Plaza `(70, 70)`, 10 Trading Posts, Wreckage Lab `[1,2]`, Steam Trampoline, and **Player Hideout/Vault** at `(Z: 17.7m, X: 3.8m-8.0m)`. |
| **Scrap Desert** | Northwest Corner `(0,260)` to `(140,400)` | 140m × 140m (19,600 m²) | 🔴 Open PK Zone | Legendaries (`ojo_dragon`, `corazon_primigenio`) | Desolate, maximum difficulty wasteland, Primordial Automaton Crater `(70, 330)`, Dragon's Nest, and portal `(130, 270)`. |
| **Mining Reserve** | Northeast Corner `(260,260)` to `(400,400)` | 140m × 140m (19,600 m²) | 🟢 Safe Zone (No PK) | Epics (`nucleo_mana`, `cerebro_automata`, `engranajes_bronce`) | Protected aether quarry `(340, 340)`, watchmaking workshop, deep pit, explorers' shelter, and portal `(270, 270)`. |
| **Smelting Boilers** | Southeast Corner `(260,0)` to `(400,140)` | 140m × 140m (19,600 m²) | 🔴 Open PK Zone | Epics (`corazon_caldera`, `reactor_eter`) | Volcanic and thermal complex, Central Furnace `(330, 70)`, Aether Reactor, and portal `(270, 130)`. |
| **Corridor and South Highway**| South Sector `(140,0)` to `(260,140)` | ~16,800 m² | 🟢 Safe Zone (Transit) | Connection & infrastructure | Checkpoint Parcel 13,1 `(212, 24)`, Grand Junction `(200, 70)`, and Steam Station `(170, 40)`. |
| **The Junklands** | West Sector `(0,140)` to `(140,260)` | ~16,800 m² | 🟢 Low Difficulty | Commons (Wire, Screws, Pots) | Scavenger Camp `(70, 200)`, Brass Depot `(40, 170)`, and roadway $X=70$. |
| **Abandoned Factory** | Middle Ring `(140,140)` to `(260,260)` | ~20,000 m² | 🟡 Medium Difficulty | Uncommons (Transistors, Gauges) | Ruined industrial structures containing materials with advanced stats. |
| **Electrical Substation** | North Sector `(140,280)` to `(260,400)` | ~14,400 m² | 🟠 High Difficulty | Rares (Tesla Coils, Batteries, Engines) | High-voltage complex featuring galvanic and steam affinity components. |
| **Radio Tower** | East Sector `(280,140)` to `(400,260)` | ~14,400 m² | 🟠 High Difficulty | Rares (Radio antennas, LED Diodes) | Old telecommunication towers with luminous affinity materials. |
| **Grand Tournament Arena** | Center `(164,164)` to `(236,236)` | ~4,071 m² (Ø 72m) | 🏆 Competitive | 1v1 & 2v2 Ladder Tournament | Colossal circular steampunk tournament platform at `(200, 200)`. |

### 3.2 Forge District Landmarks & Infrastructure

- **Silas the Survivor Camp `(15.8m, 0.25m, 5.9m)`**: Onboarding camp in parcel `[0,0]`. Silas offers an interactive tutorial dialogue (React-ECS) and an **11-waypoint Guided Tour** with orbital camera sweeps (`silasTourSystem.ts`) showing the hideout, factory, and markets.
- **User's Hideout & Vault `(Z: 17.7m, X: 3.8m-8.0m)`**: Scenographic survival workshop featuring **3 locked chests** representing player vault storage and treasure custody.
- **Steam Booster Trampoline `(X: 5.2m, Z: 5.6m)`**: Steampunk vertical launch device propelling avatars upwards to cross terrain steps toward the main plaza.
- **10 Steampunk Trading Posts & Wreckage Lab**: Market infrastructure and main forging hall `[1,2]` equipped with thermal anvil and plasma reactor.

![map](golems_map_eng.png)
![map2](golems_map2_eng.png)

## 4. The Heat Radar, 2D Minimap, and Scavenging

Materials are camouflaged or buried, revealing themselves only when getting close using the **Heat Radar** and the **real-time 2D Minimap**.

### 4.1 Heat Radar (React-ECS)
- **Far (> 30m)**: Sensor inactive with cool blue tones and off pulse.
- **Medium Distance (15m - 30m)**: Gentle rhythmic pulse in yellow tones.
- **Close (< 15m)**: Accelerated pulse in bright red/orange tones.
- **Immediate Proximity (< 4m)**: Scrap part visually emerges from ground ($Y = -0.5\text{m} \rightarrow Y = 0.3\text{m}$) with emissive particle effects.
- **Touch Scavenging**: Wide pointer hitbox ($\ge 1.2\text{m}$) collected with a single tap.

### 4.2 Real-Time 2D Minimap & Cartography
The React-ECS HUD features a **2D Minimap** widget projecting avatar position on the 25x25 grid (400m × 400m). Tapping it expands to a full-screen view displaying resource signals, danger zones, and the Grand Arena location.

![radar](golems_radar_eng.png)

## 5. Materials Catalog

Twenty-five material types categorized across 5 rarity tiers:

| Material | Rarity | Weight | Respawn | Zone | Primary Contribution |
|---|---|---|---|---|---|
| Copper Wire | Common | 9% | 1 to 3 minutes | Junklands | Speed |
| Screws & Bolts | Common | 9% | 1 to 3 minutes | Junklands | Defense |
| Worn Gears | Common | 8% | 1 to 3 minutes | Junklands | Speed |
| Copper Pipes | Common | 8% | 1 to 3 minutes | Junklands | Vitality |
| Frying Pans | Common | 7% | 1 to 3 minutes | Junklands | Defense |
| Cooking Pots | Common | 7% | 1 to 3 minutes | Junklands | Defense |
| Brass Plates | Common | 6% | 1 to 3 minutes | Junklands | Defense |
| Transistors | Uncommon | 6% | 4 to 7 minutes | Abandoned Factory | Attack |
| Filament Bulbs | Uncommon | 6% | 4 to 7 minutes | Abandoned Factory | Vitality & Luminous Affinity |
| Clock Springs | Uncommon | 5% | 4 to 7 minutes | Abandoned Factory | Speed |
| Pressure Gauges | Uncommon | 5% | 4 to 7 minutes | Abandoned Factory | Vitality |
| Steam Valves | Uncommon | 5% | 4 to 7 minutes | Abandoned Factory | Steam Affinity |
| Old TV Lenses | Uncommon | 4% | 4 to 7 minutes | Abandoned Factory | Speed |
| Steam Engine | Rare | 4% | 10 to 15 minutes | Electrical Substation | Attack & Steam Affinity |
| Tesla Coils | Rare | 3% | 10 to 15 minutes | Electrical Substation | Attack & Galvanic Affinity |
| Radio Antennas | Rare | 3% | 10 to 15 minutes | Radio Tower | Speed |
| LED Diodes | Rare | 3% | 10 to 15 minutes | Radio Tower | Luminous Affinity |
| Alchemical Batteries | Rare | 3% | 10 to 15 minutes | Electrical Substation | Vitality & Galvanic Affinity |
| Perfect Bronze Gears | Rare | 2% | 10 to 15 minutes | Mining Reserve | Defense & Mechanical Affinity |
| Condensed Mana Core | Epic | 2% | 20 to 30 minutes | Mining Reserve | Aether Affinity |
| Automaton Brain | Epic | 2% | 20 to 30 minutes | Mining Reserve | Attack & Mechanical Affinity |
| Aether Reactor | Epic | 2% | 20 to 30 minutes | Smelting Boilers (PK) | Attack & Aether Affinity |
| Boiler Heart | Epic | 1% | 20 to 30 minutes | Smelting Boilers (PK) | Defense & Steam Affinity |
| Mechanical Dragon Eye | Legendary | 0.5% | 45 to 60 minutes | Scrap Desert (PK) | Attack & Aether Affinity |
| Primordial Golem Heart | Legendary | 0.5% | 45 to 60 minutes | Scrap Desert (PK) | All Stats |

Epic and legendary materials enforce a strict limit of **only one active instance at a time** across the entire map.

## 6. The Forge and Golem Uniqueness (Deterministic Hash)

1. **Selection**: Between 5 and 12 materials from inventory.
2. **Canonical Serialization**: Alphabetically sorted string (e.g., `antena:2|bobina:1|cobre:3`).
3. **FNV-1a 32-bit Hash**:
   ```typescript
   function calculateRecipeHash(canonicalRecipe: string): number {
     let hash = 0x811c9dc5
     for (let i = 0; i < canonicalRecipe.length; i++) {
       hash ^= canonicalRecipe.charCodeAt(i)
       hash = Math.imul(hash, 0x01000193)
     }
     return hash >>> 0
   }
   ```
4. **Deterministic Derivation**:
   - **Base Stats**: Weighted sum of components.
   - **Profile Variation**: Bounded variation ($\pm 5\%$).
   - **Color Hue & Scale**: PBR emissive tint and scale ($0.9\text{m}$ to $1.3\text{m}$).
   - **Procedural Name**: Derived from prefix/suffix tables (e.g., *"Titanic Steamchrome"*).

![forge](golems_forja_eng.png)

## 7. Stats, Affinities, and Real-Time Combat

Golems possess 5 fundamental stats:
- **Attack (ATK)**: Base hit damage ($20-38$).
- **Defense (DEF)**: Direct damage reduction ($10-22$).
- **Vitality (HP)**: Total health points ($100-160$).
- **Speed (SPD)**: Attack frequency ($T_{\text{cooldown}} = 2.2\text{s} / (1 + \text{SPD}\times 0.04)$) and movement.
- **Elemental Affinity (AFF)**: `STEAM`, `MECHANICAL`, `GALVANIC`, `LUMINOUS`, `AETHER`.

### Elemental Affinity Pentagon
- `Steam` beats `Mechanical` ($\times 1.40$) | Disadvantage vs `Aether` ($\times 0.75$)
- `Mechanical` beats `Galvanic` ($\times 1.40$) | Disadvantage vs `Steam` ($\times 0.75$)
- `Galvanic` beats `Luminous` ($\times 1.40$) | Disadvantage vs `Mechanical` ($\times 0.75$)
- `Luminous` beats `Aether` ($\times 1.40$) | Disadvantage vs `Galvanic` ($\times 0.75$)
- `Aether` beats `Steam` ($\times 1.40$) | Disadvantage vs `Luminous` ($\times 0.75$)

Damage equation: $\text{Damage} = \max\left(2, \text{round}\big((\text{ATK} - \text{DEF} \times 0.5) \times \text{Multiplier}\big)\right)$.

![stats](golems_stats_eng.png)

## 8. Golem Limit, Multi-Trail Following, and P2P Tags

- **Active Squad (Max 3)**: Players carry up to 3 golems in single-file formation.
- **Random Session Allocation**: Upon entering the scene, users receive 3 random golems of distinct affinities in volatile memory.
- **Multi-Trail Algorithm (FIFO LERP/SLERP)**: Computes trajectories at 60 FPS with staggered slot offsets at $1.8\text{m}$, $3.6\text{m}$, and $5.4\text{m}$ behind local and remote avatars.
- **`Billboard` Tags & ASCII Health**: Each golem displays a floating billboard tag with name, affinity, ASCII health bar `[████████░░]`, floating damage numbers, and owner wallet address.
- **P2P Handshake (`MessageBus`)**: Clients announce and request squad compositions via `golem_squad_announce` and `golem_squad_request`.

![limit_and_missions](golems_limite_y_misiones_eng.png)

## 9. Automated Scavenging Missions

Reserve golems can be dispatched on offline expeditions from the UI:
- **Destination & Duration**: From 15 minutes to 12 hours.
- **Efficiency**: Calculated based on speed and affinity.
- **Asynchronous Persistence**: Computed on the PHP/MySQL server to operate while offline.

## 10. Silas the Survivor and Non-Player Characters (NPCs)

- **Silas the Survivor**: Tutorial mentor NPC at spawn point `(15.8m, 5.9m)`.
- **Hostile NPCs & Zone Guardians**: Mechanical patrols with waypoint paths and aggression radii defending PK zones (*Scrap Desert* & *Boilers*), guarding epic and legendary materials with high-level golems.

## 11. Progression and Levels

- **Player Level**: Unlocks extra expedition slots, hideout vault storage, and extended radar range.
- **Golem Level**: Increases ATK, DEF, and HP proportionally to forge profile. Level cap depends on component rarity.

## 12. Ladder Tournament and the Grand Steampunk Arena (Colossal 72m - Cell Ring)

![tournament](golems_torneo_eng.png)

### 12.1 Competitive Formats (1v1 & 2v2)
- **1v1**: 3 golems vs 3 golems real-time stat resolution.
- **2v2**: 2 players per team (12 simultaneous golems in arena).
- **Elo Matchmaking**: Scores logged in MySQL via `signedFetch` Web3 signatures.

### 12.2 Grand Steampunk Tournament Arena Specification (Ø 72m)
Located at the geometric center `(X: 200m, Z: 200m)`:
- **Radial Elevated Platform (72m / $R=36\text{m}$)**: Elevated $+0.6\text{m}$ with 250+ reinforced planks and cobble curbs.
- **4 12-Meter Monumental Pillars**: At 4 diagonal corners (NW, NE, SE, SW), featuring enlarged base boilers (1.8x), triple gear shafts (`Gear Shaft.glb`), double counter-rotating gear rings, double streetlights, and smoking top chimneys (`Smoker.glb`).
- **Grand Central Planetary Sigil**: Colossal central gear (`Gear Big.glb` scale 4.8x / ~12m Ø) rotating at $+0.20\text{ rad/s}$ synchronized with 8 satellite gears in orbital formation and a sword reliquary altar (`Arthur Sword.glb`).
- **16 Perimeter Beacons & Ceremonial Ramps**: Barrel pedestals with Steampunk numbers (`00` to `08`) and 4 cardinal access ramps (North, South, East, West) with double safety guardrails (`Tree Fence.glb`).

## 13. Server Architecture and Persistence

Hybrid Architecture:
- **Runtime**: Decentraland SDK7 (`@dcl/sdk/ecs`, `@dcl/sdk/react-ecs`, `@dcl/sdk/math`).
- **P2P Multiplayer**: `MessageBus` for ephemeral attacks, defeats, and squad broadcasts.
- **Persistent Backend**: PHP 8.x REST API + MySQL Database authenticated via Web3 signatures (`signedFetch`).

## 14. SDK Code Architecture & Dual-Language Engine (i18n)

### 14.1 Modular Structure
Code is organized into dedicated source folders: `components/`, `config/`, `objects/`, `systems/`, and `i18n/`.

### 14.2 Dual-Language Engine (`src/i18n`)
- **Canonical Typed Dictionaries**: `src/i18n/locales/es.ts` and `en.ts` under `TranslationSchema`.
- **HUD Language Switcher**: Touch button `🌐 ES | EN` in top-right HUD React-ECS toggling language dynamically in real time without reloading the scene.
- **Reactive Subscriptions**: Instantly updates Silas dialogue modals, HUD texts, forge menus, and combat logs.

## 15. Live Multiplayer
Distributed P2P synchronization with strict separation between ephemeral network events (attacks, movements) and persistent database records (inventory, recipes, rankings).

## 16. Mobile-First Constraints
- 🚫 No dynamic lights (baked textures / unlit emissive materials).
- 🚫 No complex pointer raycasting (replaced by Euclidean proximity radar).
- 🚫 No complex 9-slice or audio FFT analysis.
- 🚫 100% touch controls with wide hitboxes ($\ge 1.2\text{m}$) respecting system safe zones.

## 17. Conclusion and Next Steps
The specified ecosystem provides a complete, battle-tested framework built within Decentraland SDK7, optimized for smooth 60 FPS performance across mobile devices and desktop clients.
