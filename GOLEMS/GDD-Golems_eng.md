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

### 4.1 Tactical Heat Radar & 2D Sonar (React-ECS UI - 200px × 200px)
- **Screen Position & Layout**: Designed as a **`200px × 200px` square tactical scope** placed in the top right HUD (`top: 80, right: 238`), positioned symmetrically beside the Minimap HUD (`top: 80, right: 28`).
- **Circular Sonar Scope (140px × 140px)**: Scope featuring axial X/Z crosshairs and 4 concentric range rings (30m, 20m, 10m, and 4m harvest zone).
- **Animated Sweep Wave**: Continuous expanding radar pulse wave driven in real-time via `Date.now()`.
- **Heading-UP Vector Projection**: Projects a pulsating target dot (*Target Blip*) at the exact relative direction and distance derived from camera/avatar orientation vectors.
- **Thermal Gradient & Digital Distance Readout**:
  - **Far (> 30m)**: Cool blue inactive sensor (`#3380CC`) with `>30m` badge readout.
  - **Medium Distance (15m - 30m)**: Gentle yellow pulse (`#E6E633`) with readout badge (e.g., `📡 24.5m`).
  - **Close (4m - 15m)**: Accelerated bright orange pulse (`#FF8C1A`) with readout badge (e.g., `⚡ 12.4m`).
  - **Immediate Proximity (< 4m)**: Intense emissive red/gold pulse (`#FF401A`) with readout badge (e.g., `🔥 3.1m`) and item identification. Scrap part visually emerges from ground ($Y = -0.5\text{m} \rightarrow Y = 0.25\text{m}$) with emissive PBR glow.
- **Mobile-First Touch Scavenging**: Wide pointer hitbox ($\ge 1.5\text{m}$) collected with a single touchscreen tap (`pointerEventsSystem.onPointerDown`).

### 4.2 Real-Time 2D Minimap & Cartography
The React-ECS HUD features a **2D Minimap** widget (`top: 80, right: 28`) projecting avatar position on the 25x25 grid (400m × 400m). Tapping it expands to a full-screen view displaying resource signals, danger zones, and the Grand Arena location.

---

## 5. Materials & 150 Active Items Spawner

The complete catalog consists of **forty-six (46) collectable material types**, categorized across 5 rarity tiers, all styled as scrap, mechatronics, and post-industrial artifacts.

### 5.1 Spawner Rules & Lifecycle (150 Active Items)
- **Constant Population of 150 Items**: The map maintains a fixed density of **exactly 150 active materials** distributed proportionally across all 8 sectors.
- **Strict PK Zone Isolation**: Free-PK danger zone materials (**Scrap Desert PK** and **Smelting Boilers PK**) **NEVER** spawn outside their assigned zone coordinates.
- **Unique Instance Capping (`isUniqueInstance: true`)**: Epic and Legendary materials are capped at **only 1 active instance at a time** across the world.
- **30-Minute Rotation Timeout**: Any item remaining undiscovered for 30 minutes automatically despawns and rotates to a new random location within its zone.

### 5.2 Zone Item Breakdown (150 Concurrent Items)

| Spawn Zone | X Range (m) | Z Range (m) | Zone Type | Weight | Target Active Items | Thematic Material Category |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **The Junklands** | `4` to `136` | `144` to `256` | 🟢 Safe Zone | 14.0% | **21 items** | Commons (Wire, Screws, Pots) |
| **Abandoned Factory** | `144` to `256` | `144` to `256` | 🟡 Medium | 14.0% | **21 items** | Uncommons (Transistors, Gauges) |
| **South Corridor & Grand Way**| `144` to `256` | `4` to `136` | 🟢 Safe Zone | 10.0% | **15 items** | South Transition (Commons / Uncommons) |
| **Electrical Substation** | `144` to `256` | `264` to `396` | 🟠 High Risk | 12.6% | **19 items** | Galvanic & Electric (Tesla Coils, Batteries) |
| **Radio Tower** | `264` to `396` | `144` to `256` | 🟠 High Risk | 12.6% | **19 items** | Luminous & Optical (Antennas, LEDs) |
| **Mining Reserve** | `264` to `396` | `264` to `396` | 🟢 Safe Zone | 12.6% | **19 items** | Mechanical & Bronze (Gears, Gyroscopes) |
| **Smelting Boilers (PK)**| `264` to `396` | `4` to `136` | 🔴 **Free PK** | 12.1% | **18 items** (Free PK) | Smelting & Thermal Epics (`reactor_eter`) |
| **Scrap Desert (PK)** | `4` to `136` | `264` to `396` | 🔴 **Free PK** | 12.1% | **18 items** (Free PK) | Legendaries & Aether Relics (`ojo_dragon`) |

---

### 5.3 Complete Materials Catalog (46 Items)


| Icon | Material | Rarity | Weight | Respawn | Zone | Primary Contribution |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
| <img src="../showcase/common/alambre_cobre.png" width="40" alt="Copper Wire" /> | Copper Wire | Common | 3.7% | 1 to 3 minutes | Junklands | Speed +2 |
| <img src="../showcase/common/tornillos_pernos.png" width="40" alt="Screws & Bolts" /> | Screws & Bolts | Common | 3.7% | 1 to 3 minutes | Junklands | Defense +2 |
| <img src="../showcase/common/engranajes_desgastados.png" width="40" alt="Worn Gears" /> | Worn Gears | Common | 3.7% | 1 to 3 minutes | Junklands | Speed +1, Defense +1 |
| <img src="../showcase/common/tubos_cobre.png" width="40" alt="Copper Pipes" /> | Copper Pipes | Common | 3.7% | 1 to 3 minutes | Junklands | Vitality +10 |
| <img src="../showcase/common/sartenes.png" width="40" alt="Frying Pans" /> | Frying Pans | Common | 3.7% | 1 to 3 minutes | Junklands | Defense +3 |
| <img src="../showcase/common/ollas_cocinar.png" width="40" alt="Cooking Pots" /> | Cooking Pots | Common | 3.7% | 1 to 3 minutes | Junklands | Defense +2, Vitality +5 |
| <img src="../showcase/common/placas_laton.png" width="40" alt="Brass Plates" /> | Brass Plates | Common | 3.7% | 1 to 3 minutes | Junklands | Defense +3 |
| <img src="../showcase/common/clavos_oxidados.png" width="40" alt="Rusty Nails" /> | Rusty Nails | Common | 3.7% | 1 to 3 minutes | Junklands | Defense +1 |
| <img src="../showcase/common/latas_conserva.png" width="40" alt="Tin Cans" /> | Tin Cans | Common | 3.4% | 1 to 3 minutes | Junklands | Vitality +8 |
| <img src="../showcase/common/cadenas_hierro.png" width="40" alt="Iron Chains" /> | Iron Chains | Common | 3.4% | 1 to 3 minutes | Junklands | Defense +2 |
| <img src="../showcase/common/tuercas_gigantes.png" width="40" alt="Giant Nuts" /> | Giant Nuts | Common | 3.4% | 1 to 3 minutes | Junklands | Defense +2 |
| <img src="../showcase/common/tapas_alcantarilla.png" width="40" alt="Manhole Covers" /> | Manhole Covers | Common | 3.4% | 1 to 3 minutes | Junklands | Defense +3 |
| <img src="../showcase/common/cables_deshilachados.png" width="40" alt="Frayed Cables" /> | Frayed Cables | Common | 3.4% | 1 to 3 minutes | Junklands | Speed +2 |
| <img src="../showcase/common/residuos_carbon.png" width="40" alt="Coal Residue" /> | Coal Residue | Common | 3.4% | 1 to 3 minutes | Junklands | Vitality +6, Steam Affinity |
| <img src="../showcase/uncommon/transistores.png" width="40" alt="Transistors" /> | Transistors | Uncommon | 2.6% | 4 to 7 minutes | Abandoned Factory | Attack +3 |
| <img src="../showcase/uncommon/bombillas_filamento.png" width="40" alt="Filament Bulbs" /> | Filament Bulbs | Uncommon | 2.6% | 4 to 7 minutes | Abandoned Factory | Vitality +12, Luminous Affinity |
| <img src="../showcase/uncommon/resortes_reloj.png" width="40" alt="Clock Springs" /> | Clock Springs | Uncommon | 2.6% | 4 to 7 minutes | Abandoned Factory | Speed +4 |
| <img src="../showcase/uncommon/manometros.png" width="40" alt="Pressure Gauges" /> | Pressure Gauges | Uncommon | 2.6% | 4 to 7 minutes | Abandoned Factory | Vitality +15 |
| <img src="../showcase/uncommon/valvulas_vapor.png" width="40" alt="Steam Valves" /> | Steam Valves | Uncommon | 2.6% | 4 to 7 minutes | Abandoned Factory | Attack +2, Steam Affinity |
| <img src="../showcase/uncommon/lentes_tv_viejo.png" width="40" alt="Old TV Lenses" /> | Old TV Lenses | Uncommon | 2.6% | 4 to 7 minutes | Abandoned Factory | Speed +3 |
| <img src="../showcase/uncommon/fusibles_fundidos.png" width="40" alt="Blown Fuses" /> | Blown Fuses | Uncommon | 2.6% | 4 to 7 minutes | Abandoned Factory | Attack +2, Galvanic Affinity |
| <img src="../showcase/uncommon/relojes_bolsillo.png" width="40" alt="Broken Pocket Watches" /> | Broken Pocket Watches | Uncommon | 2.45% | 4 to 7 minutes | Abandoned Factory | Speed +3 |
| <img src="../showcase/uncommon/brujulas_magneticas.png" width="40" alt="Magnetic Compasses" /> | Magnetic Compasses | Uncommon | 2.45% | 4 to 7 minutes | Abandoned Factory | Speed +3, Mechanical Affinity |
| <img src="../showcase/uncommon/tubos_vacio.png" width="40" alt="Vacuum Tubes" /> | Vacuum Tubes | Uncommon | 2.45% | 4 to 7 minutes | Abandoned Factory | Attack +3, Luminous Affinity |
| <img src="../showcase/uncommon/palancas_interruptor.png" width="40" alt="Switch Levers" /> | Switch Levers | Uncommon | 2.45% | 4 to 7 minutes | Abandoned Factory | Defense +2 |
| <img src="../showcase/rare/motor_vapor.png" width="40" alt="Steam Engine" /> | Steam Engine | Rare | 1.5% | 10 to 15 minutes | Electrical Substation | Attack +5, Steam Affinity |
| <img src="../showcase/rare/bobinas_tesla.png" width="40" alt="Tesla Coils" /> | Tesla Coils | Rare | 1.5% | 10 to 15 minutes | Electrical Substation | Attack +6, Galvanic Affinity |
| <img src="../showcase/rare/antenas_radio.png" width="40" alt="Radio Antennas" /> | Radio Antennas | Rare | 1.5% | 10 to 15 minutes | Radio Tower | Speed +6 |
| <img src="../showcase/rare/diodos_led.png" width="40" alt="LED Diodes" /> | LED Diodes | Rare | 1.5% | 10 to 15 minutes | Radio Tower | Attack +4, Luminous Affinity |
| <img src="../showcase/rare/baterias_alquimicas.png" width="40" alt="Alchemical Batteries" /> | Alchemical Batteries | Rare | 1.5% | 10 to 15 minutes | Electrical Substation | Vitality +25, Galvanic Affinity |
| <img src="../showcase/rare/engranajes_bronce.png" width="40" alt="Perfect Bronze Gears" /> | Perfect Bronze Gears | Rare | 1.5% | 10 to 15 minutes | Mining Reserve | Defense +6, Mechanical Affinity |
| <img src="../showcase/rare/dinamo_galvanica.png" width="40" alt="Galvanic Dynamo" /> | Galvanic Dynamo | Rare | 1.5% | 10 to 15 minutes | Electrical Substation | Attack +5, Galvanic Affinity |
| <img src="../showcase/rare/cristal_fuerza.png" width="40" alt="Resonating Quartz Crystal" /> | Resonating Quartz Crystal | Rare | 1.5% | 10 to 15 minutes | Radio Tower | Speed +5, Luminous Affinity |
| <img src="../showcase/rare/giroscopio_precision.png" width="40" alt="Precision Gyroscope" /> | Precision Gyroscope | Rare | 1.5% | 10 to 15 minutes | Mining Reserve | Defense +5, Mechanical Affinity |
| <img src="../showcase/rare/condensador_presion.png" width="40" alt="High-Pressure Condenser" /> | High-Pressure Condenser | Rare | 1.5% | 10 to 15 minutes | Electrical Substation | Vitality +20, Steam Affinity |
| <img src="../showcase/epic/nucleo_mana.png" width="40" alt="Condensed Mana Core" /> | Condensed Mana Core | Epic | 0.8% | 20 a 30 minutes | Mining Reserve | Attack +8, Aether Affinity |
| <img src="../showcase/epic/cerebro_automata.png" width="40" alt="Automaton Brain" /> | Automaton Brain | Epic | 0.8% | 20 a 30 minutes | Mining Reserve | Attack +8, Mechanical Affinity |
| <img src="../showcase/epic/reactor_eter.png" width="40" alt="Aether Reactor" /> | Aether Reactor | Epic | 0.8% | 20 a 30 minutes | Smelting Boilers (PK) | Attack +9, Aether Affinity |
| <img src="../showcase/epic/corazon_caldera.png" width="40" alt="Boiler Heart" /> | Boiler Heart | Epic | 0.8% | 20 a 30 minutes | Smelting Boilers (PK) | Defense +8, Steam Affinity |
| <img src="../showcase/epic/bateria_plasma.png" width="40" alt="Supercharged Plasma Battery" /> | Supercharged Plasma Battery | Epic | 0.8% | 20 a 30 minutes | Electrical Substation | Attack +8, Galvanic Affinity |
| <img src="../showcase/epic/matriz_optica_solar.png" width="40" alt="Solar Optical Array" /> | Solar Optical Array | Epic | 0.8% | 20 a 30 minutes | Radio Tower | Speed +7, Luminous Affinity |
| <img src="../showcase/epic/embolo_titanio.png" width="40" alt="Forged Titanium Piston" /> | Forged Titanium Piston | Epic | 0.8% | 20 a 30 minutes | Smelting Boilers (PK) | Defense +7, Steam Affinity |
| <img src="../showcase/legendary/ojo_dragon.png" width="40" alt="Mechanical Dragon Eye" /> | Mechanical Dragon Eye | Legendary | 0.35% | 45 to 60 minutes | Scrap Desert (PK) | Attack +14, Aether Affinity |
| <img src="../showcase/legendary/corazon_primigenio.png" width="40" alt="Primordial Golem Heart" /> | Primordial Golem Heart | Legendary | 0.35% | 45 to 60 minutes | Scrap Desert (PK) | All Stats |
| <img src="../showcase/legendary/singularidad_eterica.png" width="40" alt="Aetheric Singularity" /> | Aetheric Singularity | Legendary | 0.35% | 45 to 60 minutes | Scrap Desert (PK) | Attack +12, Speed +6, Aether Affinity |
| <img src="../showcase/legendary/relicario_astral.png" width="40" alt="Celestial Gear Reliquary" /> | Celestial Gear Reliquary | Legendary | 0.35% | 45 to 60 minutes | Scrap Desert (PK) | Defense +10, Vitality +30, Aether Affinity |

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

### 🤖 Master Catalog of 150 Golems and Recipes

The system features **150 unique golem models** derived from deterministic recipes of 5 to 12 components. Below is the complete catalog table with 3D render, affinity, base attributes, and recipe requirements:

| # | Render | Golem Name | Affinity | Tier | Height | ATK | DEF | HP | SPD | Required Recipe Components |
| :-: | :-: | :--- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :--- |
| #001 | <img src="golems_imgs/galvanic/golem_001.png" width="44" alt="golem_001" /> | **Electric Bulwark** | ⚡ Galvanic | Tier 1 | 1.09m | 16 | 24 | 117 | 4 | 2x Switch Levers, 2x Giant Nuts, 2x Iron Chains, 2x Pressure Gauges, 2x Screws & Bolts |
| #002 | <img src="golems_imgs/luminous/golem_002.png" width="44" alt="golem_002" /> | **Filament Hunter** | ☀️ Luminous | Tier 1 | 1.03m | 16 | 23 | 109 | 6 | 1x Brass Plates, 1x Iron Chains, 1x Giant Nuts, 2x Filament Bulbs, 2x Worn Gears, 2x Frying Pans |
| #003 | <img src="golems_imgs/steam/golem_003.png" width="44" alt="golem_003" /> | **Boiler Gunner** | ♨️ Steam | Tier 1 | 0.95m | 16 | 16 | 88 | 4 | 1x Coal Residue, 1x Screws & Bolts, 2x Giant Nuts, 1x Brass Plates |
| #004 | <img src="golems_imgs/mechanical/golem_004.png" width="44" alt="golem_004" /> | **Mechanical Wraith** | ⚙️ Mechanical | Tier 1 | 1.10m | 16 | 23 | 87 | 7 | 2x Frying Pans, 2x Manhole Covers, 1x Switch Levers, 1x Worn Gears, 1x Copper Wire |
| #005 | <img src="golems_imgs/steam/golem_005.png" width="44" alt="golem_005" /> | **Pressurized Colossus** | ♨️ Steam | Tier 1 | 0.97m | 15 | 15 | 97 | 5 | 1x Coal Residue, 2x Cooking Pots, 1x Worn Gears, 1x Giant Nuts, 1x Rusty Nails |
| #006 | <img src="golems_imgs/luminous/golem_006.png" width="44" alt="golem_006" /> | **Bright Destroyer** | ☀️ Luminous | Tier 1 | 1.01m | 24 | 20 | 82 | 11 | 1x Transistors, 2x Brass Plates, 1x Worn Gears, 2x Old TV Lenses, 2x Vacuum Tubes, 2x Manhole Covers |
| #007 | <img src="golems_imgs/steam/golem_007.png" width="44" alt="golem_007" /> | **Igneous Servant** | ♨️ Steam | Tier 1 | 0.91m | 19 | 8 | 124 | 7 | 2x Coal Residue, 2x Filament Bulbs, 1x Old TV Lenses, 2x Blown Fuses, 1x Tin Cans |
| #008 | <img src="golems_imgs/luminous/golem_008.png" width="44" alt="golem_008" /> | **Sparkling Forger** | ☀️ Luminous | Tier 1 | 1.12m | 18 | 16 | 86 | 4 | 1x Rusty Nails, 1x Giant Nuts, 1x Cooking Pots, 1x Vacuum Tubes, 2x Iron Chains |
| #009 | <img src="golems_imgs/galvanic/golem_009.png" width="44" alt="golem_009" /> | **Raying Executor** | ⚡ Galvanic | Tier 1 | 1.05m | 18 | 15 | 107 | 13 | 2x Frying Pans, 1x Blown Fuses, 2x Clock Springs, 1x Worn Gears, 2x Copper Pipes |
| #010 | <img src="golems_imgs/mechanical/golem_010.png" width="44" alt="golem_010" /> | **Geared Tracker** | ⚙️ Mechanical | Tier 1 | 0.92m | 15 | 14 | 109 | 13 | 2x Worn Gears, 2x Magnetic Compasses, 1x Iron Chains, 2x Pressure Gauges, 1x Copper Wire, 1x Frying Pans |
| #011 | <img src="golems_imgs/galvanic/golem_011.png" width="44" alt="golem_011" /> | **Electric Titan** | ⚡ Galvanic | Tier 1 | 1.19m | 19 | 14 | 89 | 4 | 1x Manhole Covers, 1x Giant Nuts, 1x Blown Fuses |
| #012 | <img src="golems_imgs/steam/golem_012.png" width="44" alt="golem_012" /> | **Thermal Walker** | ♨️ Steam | Tier 1 | 1.24m | 24 | 8 | 124 | 4 | 2x Steam Valves, 2x Copper Pipes, 1x Pressure Gauges, 1x Transistors |
| #013 | <img src="golems_imgs/aether/golem_013.png" width="44" alt="golem_013" /> | **Astral Golem** | 🔮 Aether | Tier 1 | 0.94m | 15 | 16 | 82 | 9 | 1x Broken Pocket Watches, 2x Screws & Bolts, 1x Frayed Cables, 2x Rusty Nails, 1x Frying Pans |
| #014 | <img src="golems_imgs/steam/golem_014.png" width="44" alt="golem_014" /> | **Pneumatic Sentinel** | ♨️ Steam | Tier 1 | 0.91m | 16 | 15 | 109 | 14 | 2x Magnetic Compasses, 1x Manhole Covers, 2x Cooking Pots, 2x Copper Wire, 2x Coal Residue |
| #015 | <img src="golems_imgs/aether/golem_015.png" width="44" alt="golem_015" /> | **Singular Defender** | 🔮 Aether | Tier 1 | 1.09m | 16 | 13 | 106 | 8 | 2x Frayed Cables, 1x Giant Nuts, 1x Brass Plates, 2x Copper Pipes |
| #016 | <img src="golems_imgs/luminous/golem_016.png" width="44" alt="golem_016" /> | **Bright Assembly** | ☀️ Luminous | Tier 1 | 1.25m | 16 | 9 | 133 | 4 | 1x Rusty Nails, 1x Filament Bulbs, 2x Copper Pipes, 2x Tin Cans |
| #017 | <img src="golems_imgs/mechanical/golem_017.png" width="44" alt="golem_017" /> | **Articulated Guardian** | ⚙️ Mechanical | Tier 1 | 1.07m | 16 | 21 | 95 | 11 | 2x Broken Pocket Watches, 2x Cooking Pots, 1x Worn Gears, 2x Rusty Nails, 2x Manhole Covers |
| #018 | <img src="golems_imgs/galvanic/golem_018.png" width="44" alt="golem_018" /> | **Batterion Crusader** | ⚡ Galvanic | Tier 1 | 1.05m | 17 | 29 | 120 | 4 | 2x Pressure Gauges, 2x Frying Pans, 1x Giant Nuts, 2x Switch Levers, 2x Brass Plates, 1x Iron Chains |
| #019 | <img src="golems_imgs/luminous/golem_019.png" width="44" alt="golem_019" /> | **Mirrored Settler** | ☀️ Luminous | Tier 1 | 1.05m | 19 | 20 | 84 | 6 | 1x Vacuum Tubes, 2x Iron Chains, 1x Frayed Cables, 2x Screws & Bolts, 2x Switch Levers |
| #020 | <img src="golems_imgs/aether/golem_020.png" width="44" alt="golem_020" /> | **Aetheric Smelter** | 🔮 Aether | Tier 1 | 0.98m | 16 | 14 | 102 | 12 | 2x Clock Springs, 2x Copper Pipes, 2x Giant Nuts, 1x Screws & Bolts |
| #021 | <img src="golems_imgs/steam/golem_021.png" width="44" alt="golem_021" /> | **Smoky Watcher** | ♨️ Steam | Tier 1 | 1.08m | 16 | 24 | 105 | 4 | 2x Switch Levers, 2x Screws & Bolts, 1x Copper Pipes, 1x Giant Nuts, 2x Coal Residue, 2x Frying Pans |
| #022 | <img src="golems_imgs/aether/golem_022.png" width="44" alt="golem_022" /> | **Reliquary Leviathan** | 🔮 Aether | Tier 1 | 1.01m | 16 | 25 | 83 | 14 | 2x Manhole Covers, 2x Frying Pans, 1x Giant Nuts, 2x Old TV Lenses, 2x Frayed Cables, 1x Brass Plates |
| #023 | <img src="golems_imgs/steam/golem_023.png" width="44" alt="golem_023" /> | **Boiler Vanguard** | ♨️ Steam | Tier 1 | 1.22m | 20 | 17 | 96 | 6 | 1x Frying Pans, 2x Blown Fuses, 2x Coal Residue, 1x Copper Wire, 2x Manhole Covers |
| #024 | <img src="golems_imgs/steam/golem_024.png" width="44" alt="golem_024" /> | **Pneumatic Automaton** | ♨️ Steam | Tier 1 | 1.27m | 15 | 12 | 101 | 12 | 1x Clock Springs, 2x Copper Wire, 1x Giant Nuts, 1x Iron Chains, 2x Copper Pipes |
| #025 | <img src="golems_imgs/mechanical/golem_025.png" width="44" alt="golem_025" /> | **Rotor Protector** | ⚙️ Mechanical | Tier 1 | 0.98m | 16 | 13 | 95 | 8 | 1x Switch Levers, 1x Copper Pipes, 2x Frayed Cables, 1x Frying Pans |
| #026 | <img src="golems_imgs/mechanical/golem_026.png" width="44" alt="golem_026" /> | **Pinion Bearer** | ⚙️ Mechanical | Tier 1 | 1.05m | 17 | 22 | 88 | 8 | 2x Frayed Cables, 2x Iron Chains, 1x Screws & Bolts, 1x Rusty Nails, 2x Brass Plates |
| #027 | <img src="golems_imgs/steam/golem_027.png" width="44" alt="golem_027" /> | **Igneous Monolith** | ♨️ Steam | Tier 1 | 1.05m | 19 | 12 | 129 | 6 | 2x Giant Nuts, 1x Frayed Cables, 1x Blown Fuses, 1x Filament Bulbs, 2x Coal Residue, 2x Tin Cans |
| #028 | <img src="golems_imgs/steam/golem_028.png" width="44" alt="golem_028" /> | **Piston Scavenger** | ♨️ Steam | Tier 1 | 0.99m | 18 | 10 | 104 | 12 | 2x Coal Residue, 1x Steam Valves, 1x Cooking Pots, 2x Clock Springs |
| #029 | <img src="golems_imgs/luminous/golem_029.png" width="44" alt="golem_029" /> | **Mirrored Excavator** | ☀️ Luminous | Tier 1 | 1.00m | 16 | 14 | 116 | 8 | 2x Frayed Cables, 2x Giant Nuts, 2x Pressure Gauges, 1x Screws & Bolts |
| #030 | <img src="golems_imgs/luminous/golem_030.png" width="44" alt="golem_030" /> | **Luminous Patroller** | ☀️ Luminous | Tier 1 | 1.07m | 17 | 18 | 125 | 6 | 2x Worn Gears, 1x Brass Plates, 2x Pressure Gauges, 1x Screws & Bolts, 1x Cooking Pots |
| #031 | <img src="golems_imgs/steam/golem_031.png" width="44" alt="golem_031" /> | **Smoky Basilisk** | ♨️ Steam | Tier 1 | 1.12m | 19 | 13 | 106 | 10 | 1x Pressure Gauges, 2x Steam Valves, 1x Filament Bulbs, 2x Manhole Covers, 2x Broken Pocket Watches |
| #032 | <img src="golems_imgs/steam/golem_032.png" width="44" alt="golem_032" /> | **Thermal Guard** | ♨️ Steam | Tier 1 | 0.92m | 20 | 16 | 101 | 6 | 1x Vacuum Tubes, 1x Frayed Cables, 2x Screws & Bolts, 2x Coal Residue, 1x Manhole Covers |
| #033 | <img src="golems_imgs/steam/golem_033.png" width="44" alt="golem_033" /> | **Boiler Bulwark** | ♨️ Steam | Tier 1 | 0.90m | 16 | 12 | 97 | 10 | 1x Frayed Cables, 1x Cooking Pots, 1x Switch Levers, 1x Coal Residue, 1x Clock Springs |
| #034 | <img src="golems_imgs/luminous/golem_034.png" width="44" alt="golem_034" /> | **Diodic Hunter** | ☀️ Luminous | Tier 1 | 0.93m | 16 | 26 | 92 | 6 | 2x Frying Pans, 2x Worn Gears, 2x Screws & Bolts, 1x Brass Plates, 2x Iron Chains, 1x Copper Pipes |
| #035 | <img src="golems_imgs/galvanic/golem_035.png" width="44" alt="golem_035" /> | **Sparking Gunner** | ⚡ Galvanic | Tier 1 | 1.15m | 15 | 11 | 119 | 13 | 2x Copper Wire, 2x Pressure Gauges, 1x Clock Springs, 1x Frayed Cables, 2x Cooking Pots |
| #036 | <img src="golems_imgs/mechanical/golem_036.png" width="44" alt="golem_036" /> | **Pinion Wraith** | ⚙️ Mechanical | Tier 1 | 1.18m | 18 | 13 | 82 | 17 | 2x Rusty Nails, 2x Magnetic Compasses, 1x Transistors, 2x Giant Nuts, 1x Clock Springs, 2x Copper Wire |
| #037 | <img src="golems_imgs/mechanical/golem_037.png" width="44" alt="golem_037" /> | **Articulated Colossus** | ⚙️ Mechanical | Tier 1 | 1.25m | 16 | 13 | 102 | 8 | 1x Worn Gears, 1x Pressure Gauges, 1x Magnetic Compasses, 2x Screws & Bolts |
| #038 | <img src="golems_imgs/galvanic/golem_038.png" width="44" alt="golem_038" /> | **Batterion Destroyer** | ⚡ Galvanic | Tier 1 | 1.13m | 20 | 21 | 84 | 8 | 1x Brass Plates, 2x Frayed Cables, 2x Blown Fuses, 2x Manhole Covers, 2x Screws & Bolts |
| #039 | <img src="golems_imgs/steam/golem_039.png" width="44" alt="golem_039" /> | **Vaporized Servant** | ♨️ Steam | Tier 1 | 1.19m | 24 | 10 | 94 | 12 | 1x Transistors, 1x Coal Residue, 1x Frayed Cables, 2x Steam Valves, 1x Giant Nuts, 2x Old TV Lenses |
| #040 | <img src="golems_imgs/luminous/golem_040.png" width="44" alt="golem_040" /> | **Luminous Forger** | ☀️ Luminous | Tier 1 | 1.22m | 16 | 14 | 107 | 8 | 1x Filament Bulbs, 2x Cooking Pots, 1x Broken Pocket Watches, 1x Rusty Nails, 1x Worn Gears |
| #041 | <img src="golems_imgs/galvanic/golem_041.png" width="44" alt="golem_041" /> | **Electric Executor** | ⚡ Galvanic | Tier 2 | 1.09m | 38 | 16 | 129 | 14 | 1x Tesla Coils, 2x Magnetic Compasses, 2x Worn Gears, 1x Iron Chains, 2x Blown Fuses, 2x Vacuum Tubes, 1x High-Pressure Condenser |
| #042 | <img src="golems_imgs/steam/golem_042.png" width="44" alt="golem_042" /> | **Thermal Tracker** | ♨️ Steam | Tier 2 | 1.06m | 33 | 18 | 136 | 8 | 1x Coal Residue, 2x Screws & Bolts, 1x Steam Engine, 2x Worn Gears, 2x Transistors, 1x High-Pressure Condenser |
| #043 | <img src="golems_imgs/steam/golem_043.png" width="44" alt="golem_043" /> | **Boiler Titan** | ♨️ Steam | Tier 2 | 1.09m | 24 | 18 | 111 | 14 | 1x Frayed Cables, 1x Magnetic Compasses, 2x Brass Plates, 1x Steam Valves, 1x Old TV Lenses |
| #044 | <img src="golems_imgs/mechanical/golem_044.png" width="44" alt="golem_044" /> | **Mechanical Walker** | ⚙️ Mechanical | Tier 2 | 1.08m | 28 | 22 | 110 | 19 | 1x Broken Pocket Watches, 2x Steam Valves, 1x Blown Fuses, 2x Precision Gyroscope, 2x Magnetic Compasses, 2x Frayed Cables |
| #045 | <img src="golems_imgs/steam/golem_045.png" width="44" alt="golem_045" /> | **Pressurized Golem** | ♨️ Steam | Tier 2 | 0.97m | 33 | 16 | 186 | 12 | 2x Magnetic Compasses, 2x Tin Cans, 2x Galvanic Dynamo, 1x Pressure Gauges, 2x Switch Levers, 2x High-Pressure Condenser |
| #046 | <img src="golems_imgs/steam/golem_046.png" width="44" alt="golem_046" /> | **Volcanic Sentinel** | ♨️ Steam | Tier 2 | 1.19m | 37 | 15 | 137 | 11 | 1x Steam Engine, 1x Tesla Coils, 1x Steam Valves, 1x Clock Springs, 1x High-Pressure Condenser, 1x Screws & Bolts |
| #047 | <img src="golems_imgs/galvanic/golem_047.png" width="44" alt="golem_047" /> | **Conductive Defender** | ⚡ Galvanic | Tier 2 | 0.95m | 33 | 19 | 127 | 17 | 2x Brass Plates, 2x Coal Residue, 2x Galvanic Dynamo, 2x Clock Springs, 1x Copper Wire |
| #048 | <img src="golems_imgs/mechanical/golem_048.png" width="44" alt="golem_048" /> | **Brazen Assembly** | ⚙️ Mechanical | Tier 2 | 1.15m | 27 | 33 | 134 | 6 | 2x Blown Fuses, 2x Switch Levers, 1x Giant Nuts, 2x Perfect Bronze Gears, 2x Tin Cans, 1x Cooking Pots |
| #049 | <img src="golems_imgs/galvanic/golem_049.png" width="44" alt="golem_049" /> | **Raying Guardian** | ⚡ Galvanic | Tier 2 | 1.07m | 43 | 18 | 146 | 10 | 2x Filament Bulbs, 1x Tesla Coils, 2x Blown Fuses, 2x Switch Levers, 1x Tin Cans, 2x Copper Wire, 1x Rusty Nails, 2x Galvanic Dynamo |
| #050 | <img src="golems_imgs/galvanic/golem_050.png" width="44" alt="golem_050" /> | **Galvanic Crusader** | ⚡ Galvanic | Tier 2 | 0.90m | 37 | 12 | 136 | 10 | 1x Clock Springs, 1x Copper Pipes, 2x Blown Fuses, 2x Galvanic Dynamo, 2x Coal Residue |
| #051 | <img src="golems_imgs/galvanic/golem_051.png" width="44" alt="golem_051" /> | **Electric Settler** | ⚡ Galvanic | Tier 2 | 1.08m | 34 | 21 | 118 | 8 | 1x LED Diodes, 2x Blown Fuses, 1x Screws & Bolts, 1x Frying Pans, 1x Galvanic Dynamo, 2x Cooking Pots, 1x Copper Wire |
| #052 | <img src="golems_imgs/luminous/golem_052.png" width="44" alt="golem_052" /> | **Filament Smelter** | ☀️ Luminous | Tier 2 | 1.12m | 34 | 22 | 121 | 6 | 2x Brass Plates, 1x Steam Engine, 1x Pressure Gauges, 1x Rusty Nails, 2x LED Diodes, 2x Switch Levers |
| #053 | <img src="golems_imgs/luminous/golem_053.png" width="44" alt="golem_053" /> | **Optical Watcher** | ☀️ Luminous | Tier 2 | 1.15m | 24 | 15 | 112 | 23 | 2x Resonating Quartz Crystal, 1x Magnetic Compasses, 2x Copper Wire, 1x Transistors, 1x Worn Gears, 1x Cooking Pots |
| #054 | <img src="golems_imgs/steam/golem_054.png" width="44" alt="golem_054" /> | **Pneumatic Leviathan** | ♨️ Steam | Tier 2 | 1.10m | 35 | 21 | 198 | 9 | 1x Brass Plates, 2x Alchemical Batteries, 1x Vacuum Tubes, 2x Steam Engine, 1x Perfect Bronze Gears, 1x Broken Pocket Watches, 2x High-Pressure Condenser |
| #055 | <img src="golems_imgs/steam/golem_055.png" width="44" alt="golem_055" /> | **Pressurized Vanguard** | ♨️ Steam | Tier 2 | 0.94m | 35 | 21 | 114 | 23 | 2x Clock Springs, 1x Copper Wire, 1x Iron Chains, 1x Perfect Bronze Gears, 2x Steam Engine, 2x Broken Pocket Watches, 1x Blown Fuses |
| #056 | <img src="golems_imgs/galvanic/golem_056.png" width="44" alt="golem_056" /> | **Plasmatic Automaton** | ⚡ Galvanic | Tier 2 | 1.05m | 39 | 20 | 161 | 12 | 1x Precision Gyroscope, 2x Old TV Lenses, 2x Alchemical Batteries, 2x Transistors, 2x Giant Nuts, 1x Coal Residue, 2x Tesla Coils |
| #057 | <img src="golems_imgs/luminous/golem_057.png" width="44" alt="golem_057" /> | **Lumen Protector** | ☀️ Luminous | Tier 2 | 1.17m | 31 | 19 | 111 | 32 | 2x Vacuum Tubes, 1x Manhole Covers, 1x Magnetic Compasses, 1x Transistors, 2x Radio Antennas, 2x Broken Pocket Watches, 1x Resonating Quartz Crystal, 2x Switch Levers |
| #058 | <img src="golems_imgs/galvanic/golem_058.png" width="44" alt="golem_058" /> | **Batterion Bearer** | ⚡ Galvanic | Tier 2 | 0.92m | 27 | 17 | 159 | 13 | 2x Blown Fuses, 2x Iron Chains, 2x Tin Cans, 2x Magnetic Compasses, 1x Alchemical Batteries |
| #059 | <img src="golems_imgs/galvanic/golem_059.png" width="44" alt="golem_059" /> | **Raying Monolith** | ⚡ Galvanic | Tier 2 | 1.14m | 30 | 14 | 177 | 24 | 1x Pressure Gauges, 2x Radio Antennas, 2x Broken Pocket Watches, 1x Vacuum Tubes, 2x Alchemical Batteries, 1x Galvanic Dynamo, 1x Switch Levers |
| #060 | <img src="golems_imgs/galvanic/golem_060.png" width="44" alt="golem_060" /> | **Galvanic Scavenger** | ⚡ Galvanic | Tier 2 | 1.27m | 33 | 20 | 112 | 12 | 1x Perfect Bronze Gears, 1x Broken Pocket Watches, 1x Switch Levers, 1x Magnetic Compasses, 2x Galvanic Dynamo |
| #061 | <img src="golems_imgs/galvanic/golem_061.png" width="44" alt="golem_061" /> | **Electric Excavator** | ⚡ Galvanic | Tier 2 | 1.13m | 30 | 15 | 112 | 10 | 2x Iron Chains, 2x Transistors, 2x Blown Fuses, 1x Tin Cans, 1x Clock Springs |
| #062 | <img src="golems_imgs/steam/golem_062.png" width="44" alt="golem_062" /> | **Thermal Patroller** | ♨️ Steam | Tier 2 | 1.29m | 39 | 11 | 156 | 9 | 2x Pressure Gauges, 1x Transistors, 2x Steam Engine, 1x Old TV Lenses, 1x Tesla Coils, 2x Filament Bulbs |
| #063 | <img src="golems_imgs/steam/golem_063.png" width="44" alt="golem_063" /> | **Boiler Basilisk** | ♨️ Steam | Tier 2 | 1.03m | 40 | 15 | 126 | 6 | 2x LED Diodes, 2x Coal Residue, 1x Steam Engine, 1x Frying Pans, 2x Steam Valves |
| #064 | <img src="golems_imgs/steam/golem_064.png" width="44" alt="golem_064" /> | **Pneumatic Guard** | ♨️ Steam | Tier 2 | 1.29m | 32 | 14 | 144 | 19 | 1x Magnetic Compasses, 2x Transistors, 1x Giant Nuts, 2x Steam Valves, 1x Pressure Gauges, 1x High-Pressure Condenser, 2x Resonating Quartz Crystal |
| #065 | <img src="golems_imgs/luminous/golem_065.png" width="44" alt="golem_065" /> | **Resonant Bulwark** | ☀️ Luminous | Tier 2 | 1.04m | 33 | 20 | 147 | 9 | 1x Tin Cans, 2x Frying Pans, 1x Vacuum Tubes, 1x Cooking Pots, 1x Magnetic Compasses, 2x LED Diodes, 1x Alchemical Batteries |
| #066 | <img src="golems_imgs/galvanic/golem_066.png" width="44" alt="golem_066" /> | **Plasmatic Hunter** | ⚡ Galvanic | Tier 2 | 1.05m | 40 | 12 | 118 | 6 | 2x Vacuum Tubes, 1x Tin Cans, 1x Transistors, 2x Blown Fuses, 1x Galvanic Dynamo |
| #067 | <img src="golems_imgs/galvanic/golem_067.png" width="44" alt="golem_067" /> | **Conductive Gunner** | ⚡ Galvanic | Tier 2 | 1.14m | 28 | 15 | 168 | 9 | 2x Alchemical Batteries, 1x Coal Residue, 1x Old TV Lenses, 1x Steam Valves, 2x Blown Fuses, 1x Brass Plates |
| #068 | <img src="golems_imgs/luminous/golem_068.png" width="44" alt="golem_068" /> | **Sparkling Wraith** | ☀️ Luminous | Tier 2 | 1.18m | 21 | 17 | 127 | 21 | 2x Broken Pocket Watches, 1x Frayed Cables, 2x Clock Springs, 2x Filament Bulbs, 1x Switch Levers, 2x Screws & Bolts |
| #069 | <img src="golems_imgs/mechanical/golem_069.png" width="44" alt="golem_069" /> | **Titanic Colossus** | ⚙️ Mechanical | Tier 2 | 0.94m | 31 | 18 | 106 | 15 | 2x Frayed Cables, 1x LED Diodes, 1x Screws & Bolts, 1x Brass Plates, 1x Switch Levers, 2x Magnetic Compasses, 2x Transistors |
| #070 | <img src="golems_imgs/mechanical/golem_070.png" width="44" alt="golem_070" /> | **Geared Destroyer** | ⚙️ Mechanical | Tier 2 | 1.25m | 37 | 29 | 114 | 12 | 1x Steam Engine, 2x Giant Nuts, 2x Perfect Bronze Gears, 1x Vacuum Tubes, 2x Transistors, 2x Old TV Lenses |
| #071 | <img src="golems_imgs/luminous/golem_071.png" width="44" alt="golem_071" /> | **Photonic Servant** | ☀️ Luminous | Tier 2 | 1.10m | 30 | 23 | 105 | 10 | 2x Vacuum Tubes, 2x Copper Wire, 1x Precision Gyroscope, 1x LED Diodes, 2x Giant Nuts, 1x Rusty Nails, 1x Screws & Bolts |
| #072 | <img src="golems_imgs/mechanical/golem_072.png" width="44" alt="golem_072" /> | **Automaton Forger** | ⚙️ Mechanical | Tier 2 | 1.13m | 21 | 28 | 110 | 16 | 2x Perfect Bronze Gears, 2x Screws & Bolts, 1x Old TV Lenses, 2x Clock Springs, 1x Rusty Nails, 1x Coal Residue |
| #073 | <img src="golems_imgs/mechanical/golem_073.png" width="44" alt="golem_073" /> | **Ferrous Executor** | ⚙️ Mechanical | Tier 2 | 1.06m | 22 | 20 | 143 | 37 | 2x Radio Antennas, 2x Broken Pocket Watches, 1x Precision Gyroscope, 2x Clock Springs, 2x Pressure Gauges, 2x Frayed Cables, 1x Frying Pans |
| #074 | <img src="golems_imgs/galvanic/golem_074.png" width="44" alt="golem_074" /> | **Voltaic Tracker** | ⚡ Galvanic | Tier 2 | 1.01m | 34 | 17 | 109 | 14 | 1x Giant Nuts, 1x Clock Springs, 2x Copper Wire, 1x Brass Plates, 2x Transistors, 1x Tesla Coils |
| #075 | <img src="golems_imgs/steam/golem_075.png" width="44" alt="golem_075" /> | **Pressurized Titan** | ♨️ Steam | Tier 2 | 1.19m | 26 | 25 | 123 | 14 | 2x Iron Chains, 2x Clock Springs, 1x LED Diodes, 2x Brass Plates, 2x Coal Residue, 1x Frying Pans |
| #076 | <img src="golems_imgs/steam/golem_076.png" width="44" alt="golem_076" /> | **Volcanic Walker** | ♨️ Steam | Tier 2 | 1.15m | 29 | 23 | 190 | 6 | 2x High-Pressure Condenser, 2x Giant Nuts, 2x Transistors, 1x Pressure Gauges, 1x Coal Residue, 2x Cooking Pots, 1x Screws & Bolts |
| #077 | <img src="golems_imgs/luminous/golem_077.png" width="44" alt="golem_077" /> | **Lumen Golem** | ☀️ Luminous | Tier 2 | 1.20m | 22 | 16 | 153 | 7 | 2x Filament Bulbs, 1x Pressure Gauges, 1x Coal Residue, 1x Worn Gears, 1x Frying Pans |
| #078 | <img src="golems_imgs/mechanical/golem_078.png" width="44" alt="golem_078" /> | **Brazen Sentinel** | ⚙️ Mechanical | Tier 2 | 1.02m | 23 | 30 | 171 | 12 | 1x Switch Levers, 2x Pressure Gauges, 2x Perfect Bronze Gears, 1x Filament Bulbs, 1x Brass Plates, 1x Frayed Cables, 2x Coal Residue, 2x Copper Wire |
| #079 | <img src="golems_imgs/steam/golem_079.png" width="44" alt="golem_079" /> | **Vaporized Defender** | ♨️ Steam | Tier 2 | 1.01m | 28 | 16 | 155 | 9 | 1x Vacuum Tubes, 1x High-Pressure Condenser, 1x Alchemical Batteries, 1x Transistors, 2x Switch Levers, 1x Broken Pocket Watches |
| #080 | <img src="golems_imgs/galvanic/golem_080.png" width="44" alt="golem_080" /> | **Galvanic Assembly** | ⚡ Galvanic | Tier 2 | 1.17m | 32 | 21 | 135 | 10 | 1x Clock Springs, 2x Manhole Covers, 1x Galvanic Dynamo, 1x Steam Engine, 1x Alchemical Batteries, 1x Frying Pans |
| #081 | <img src="golems_imgs/galvanic/golem_081.png" width="44" alt="golem_081" /> | **Electric Guardian** | ⚡ Galvanic | Tier 2 | 0.93m | 46 | 16 | 123 | 10 | 1x Manhole Covers, 1x Tin Cans, 2x Vacuum Tubes, 2x Transistors, 2x Galvanic Dynamo, 2x Frayed Cables |
| #082 | <img src="golems_imgs/mechanical/golem_082.png" width="44" alt="golem_082" /> | **Automaton Crusader** | ⚙️ Mechanical | Tier 2 | 1.09m | 23 | 31 | 144 | 12 | 1x Tin Cans, 2x Cooking Pots, 2x Iron Chains, 1x Magnetic Compasses, 2x Copper Pipes, 1x Steam Valves, 1x Broken Pocket Watches, 2x Perfect Bronze Gears |
| #083 | <img src="golems_imgs/steam/golem_083.png" width="44" alt="golem_083" /> | **Boiler Settler** | ♨️ Steam | Tier 2 | 1.05m | 23 | 18 | 142 | 13 | 1x Frying Pans, 1x Old TV Lenses, 1x Blown Fuses, 1x High-Pressure Condenser, 1x Clock Springs, 2x Tin Cans, 2x Iron Chains |
| #084 | <img src="golems_imgs/luminous/golem_084.png" width="44" alt="golem_084" /> | **Diodic Smelter** | ☀️ Luminous | Tier 2 | 1.23m | 29 | 15 | 124 | 18 | 1x Tin Cans, 2x Clock Springs, 2x Coal Residue, 2x Worn Gears, 2x LED Diodes, 1x Magnetic Compasses, 1x Switch Levers |
| #085 | <img src="golems_imgs/steam/golem_085.png" width="44" alt="golem_085" /> | **Pressurized Watcher** | ♨️ Steam | Tier 2 | 1.06m | 33 | 18 | 164 | 19 | 1x Rusty Nails, 2x Copper Wire, 2x Steam Valves, 1x Tesla Coils, 1x Tin Cans, 2x Clock Springs, 2x Pressure Gauges, 2x Cooking Pots |
| #086 | <img src="golems_imgs/galvanic/golem_086.png" width="44" alt="golem_086" /> | **Plasmatic Leviathan** | ⚡ Galvanic | Tier 2 | 0.98m | 35 | 17 | 139 | 17 | 2x Galvanic Dynamo, 2x Cooking Pots, 1x Steam Valves, 2x Radio Antennas, 1x Copper Pipes, 1x Vacuum Tubes, 2x Rusty Nails, 2x Tin Cans |
| #087 | <img src="golems_imgs/mechanical/golem_087.png" width="44" alt="golem_087" /> | **Articulated Vanguard** | ⚙️ Mechanical | Tier 2 | 0.93m | 22 | 16 | 173 | 20 | 1x Pressure Gauges, 2x Switch Levers, 2x Filament Bulbs, 2x Clock Springs, 2x Tin Cans, 2x Magnetic Compasses, 1x Coal Residue |
| #088 | <img src="golems_imgs/luminous/golem_088.png" width="44" alt="golem_088" /> | **Sparkling Automaton** | ☀️ Luminous | Tier 2 | 1.29m | 36 | 17 | 114 | 18 | 1x Steam Engine, 2x Giant Nuts, 2x Old TV Lenses, 2x LED Diodes, 1x Resonating Quartz Crystal |
| #089 | <img src="golems_imgs/mechanical/golem_089.png" width="44" alt="golem_089" /> | **Titanic Protector** | ⚙️ Mechanical | Tier 2 | 1.13m | 28 | 31 | 111 | 7 | 1x Worn Gears, 1x Perfect Bronze Gears, 2x Vacuum Tubes, 1x Brass Plates, 2x Switch Levers, 1x Rusty Nails, 2x Giant Nuts |
| #090 | <img src="golems_imgs/mechanical/golem_090.png" width="44" alt="golem_090" /> | **Geared Bearer** | ⚙️ Mechanical | Tier 2 | 1.09m | 22 | 16 | 139 | 29 | 1x Tin Cans, 2x Old TV Lenses, 2x Copper Wire, 2x Magnetic Compasses, 2x Giant Nuts, 2x Filament Bulbs, 2x Clock Springs |
| #091 | <img src="golems_imgs/aether/golem_091.png" width="44" alt="golem_091" /> | **Primordial Monolith** | 🔮 Aether | Tier 3 | 1.23m | 64 | 15 | 133 | 24 | 1x Steam Engine, 2x Galvanic Dynamo, 2x Magnetic Compasses, 2x Resonating Quartz Crystal, 2x Condensed Mana Core, 1x Automaton Brain |
| #092 | <img src="golems_imgs/steam/golem_092.png" width="44" alt="golem_092" /> | **Thermal Scavenger** | ♨️ Steam | Tier 3 | 0.94m | 51 | 46 | 200 | 24 | 2x Supercharged Plasma Battery, 1x Steam Engine, 1x High-Pressure Condenser, 1x Radio Antennas, 2x Clock Springs, 2x Boiler Heart, 2x Pressure Gauges, 2x Perfect Bronze Gears |
| #093 | <img src="golems_imgs/steam/golem_093.png" width="44" alt="golem_093" /> | **Boiler Excavator** | ♨️ Steam | Tier 3 | 1.17m | 58 | 20 | 191 | 26 | 1x Aether Reactor, 2x Switch Levers, 2x Steam Engine, 2x High-Pressure Condenser, 2x Radio Antennas, 1x Pressure Gauges, 2x Old TV Lenses, 1x Condensed Mana Core, 1x LED Diodes |
| #094 | <img src="golems_imgs/aether/golem_094.png" width="44" alt="golem_094" /> | **Manatic Patroller** | 🔮 Aether | Tier 3 | 1.26m | 58 | 22 | 166 | 22 | 1x High-Pressure Condenser, 1x Radio Antennas, 2x Galvanic Dynamo, 2x Old TV Lenses, 1x Precision Gyroscope, 2x Aether Reactor |
| #095 | <img src="golems_imgs/galvanic/golem_095.png" width="44" alt="golem_095" /> | **Sparking Basilisk** | ⚡ Galvanic | Tier 3 | 1.05m | 59 | 23 | 140 | 40 | 2x Radio Antennas, 1x Tesla Coils, 2x Supercharged Plasma Battery, 1x Steam Engine, 1x Forged Titanium Piston, 1x Resonating Quartz Crystal, 2x Solar Optical Array, 2x Steam Valves |
| #096 | <img src="golems_imgs/steam/golem_096.png" width="44" alt="golem_096" /> | **Volcanic Guard** | ♨️ Steam | Tier 3 | 1.19m | 64 | 42 | 158 | 17 | 2x Condensed Mana Core, 1x Filament Bulbs, 1x Automaton Brain, 2x Steam Engine, 1x Solar Optical Array, 2x Precision Gyroscope, 2x Forged Titanium Piston |
| #097 | <img src="golems_imgs/luminous/golem_097.png" width="44" alt="golem_097" /> | **Lumen Bulwark** | ☀️ Luminous | Tier 3 | 1.02m | 55 | 35 | 143 | 37 | 1x Condensed Mana Core, 2x Radio Antennas, 1x Solar Optical Array, 2x Vacuum Tubes, 2x Tesla Coils, 1x Boiler Heart, 2x Clock Springs, 2x Precision Gyroscope |
| #098 | <img src="golems_imgs/steam/golem_098.png" width="44" alt="golem_098" /> | **Piston Hunter** | ♨️ Steam | Tier 3 | 1.11m | 58 | 37 | 176 | 9 | 2x Condensed Mana Core, 1x Perfect Bronze Gears, 2x Tesla Coils, 2x Boiler Heart, 1x Transistors, 2x High-Pressure Condenser |
| #099 | <img src="golems_imgs/galvanic/golem_099.png" width="44" alt="golem_099" /> | **Raying Gunner** | ⚡ Galvanic | Tier 3 | 1.11m | 81 | 16 | 136 | 20 | 2x Galvanic Dynamo, 2x LED Diodes, 2x Steam Engine, 2x Tesla Coils, 2x Radio Antennas, 2x Condensed Mana Core |
| #100 | <img src="golems_imgs/steam/golem_100.png" width="44" alt="golem_100" /> | **Steamy Wraith** | ♨️ Steam | Tier 3 | 1.03m | 58 | 31 | 134 | 14 | 2x Condensed Mana Core, 2x Galvanic Dynamo, 2x Boiler Heart, 1x Tesla Coils, 1x Radio Antennas |
| #101 | <img src="golems_imgs/steam/golem_101.png" width="44" alt="golem_101" /> | **Smoky Colossus** | ♨️ Steam | Tier 3 | 0.93m | 46 | 31 | 166 | 36 | 2x Magnetic Compasses, 1x High-Pressure Condenser, 2x Radio Antennas, 2x Clock Springs, 2x Automaton Brain, 2x Forged Titanium Piston |
| #102 | <img src="golems_imgs/galvanic/golem_102.png" width="44" alt="golem_102" /> | **Teslic Destroyer** | ⚡ Galvanic | Tier 3 | 1.26m | 62 | 24 | 163 | 15 | 2x Galvanic Dynamo, 1x Resonating Quartz Crystal, 1x Pressure Gauges, 1x Forged Titanium Piston, 1x Steam Engine, 2x Supercharged Plasma Battery |
| #103 | <img src="golems_imgs/steam/golem_103.png" width="44" alt="golem_103" /> | **Boiler Servant** | ♨️ Steam | Tier 3 | 0.93m | 48 | 33 | 182 | 16 | 1x Supercharged Plasma Battery, 2x Precision Gyroscope, 1x Solar Optical Array, 2x High-Pressure Condenser, 1x Forged Titanium Piston, 2x Tesla Coils |
| #104 | <img src="golems_imgs/luminous/golem_104.png" width="44" alt="golem_104" /> | **Diodic Forger** | ☀️ Luminous | Tier 3 | 1.26m | 58 | 30 | 203 | 22 | 1x Aether Reactor, 2x Condensed Mana Core, 2x Precision Gyroscope, 2x Alchemical Batteries, 2x Filament Bulbs, 2x LED Diodes, 1x Perfect Bronze Gears, 2x Solar Optical Array |
| #105 | <img src="golems_imgs/steam/golem_105.png" width="44" alt="golem_105" /> | **Pressurized Executor** | ♨️ Steam | Tier 3 | 1.00m | 34 | 38 | 210 | 9 | 2x Boiler Heart, 1x Steam Valves, 2x Alchemical Batteries, 1x Filament Bulbs, 1x Forged Titanium Piston, 1x Pressure Gauges, 1x Steam Engine |
| #106 | <img src="golems_imgs/galvanic/golem_106.png" width="44" alt="golem_106" /> | **Plasmatic Tracker** | ⚡ Galvanic | Tier 3 | 1.03m | 60 | 21 | 214 | 16 | 2x Alchemical Batteries, 1x Supercharged Plasma Battery, 1x Solar Optical Array, 1x Aether Reactor, 1x Precision Gyroscope, 2x Galvanic Dynamo, 2x Filament Bulbs, 1x Steam Engine |
| #107 | <img src="golems_imgs/steam/golem_107.png" width="44" alt="golem_107" /> | **Igneous Titan** | ♨️ Steam | Tier 3 | 1.04m | 45 | 32 | 260 | 22 | 1x Resonating Quartz Crystal, 1x Supercharged Plasma Battery, 2x Pressure Gauges, 2x Boiler Heart, 1x Aether Reactor, 2x Alchemical Batteries, 2x Clock Springs, 2x High-Pressure Condenser |
| #108 | <img src="golems_imgs/aether/golem_108.png" width="44" alt="golem_108" /> | **Dragonic Walker** | 🔮 Aether | Tier 3 | 1.17m | 58 | 23 | 166 | 26 | 1x Blown Fuses, 1x Clock Springs, 1x High-Pressure Condenser, 2x Radio Antennas, 1x LED Diodes, 2x Vacuum Tubes, 2x Condensed Mana Core, 1x Perfect Bronze Gears |
| #109 | <img src="golems_imgs/steam/golem_109.png" width="44" alt="golem_109" /> | **Vaporized Golem** | ♨️ Steam | Tier 3 | 0.92m | 47 | 30 | 173 | 17 | 2x LED Diodes, 1x Automaton Brain, 1x Clock Springs, 1x Steam Engine, 1x Forged Titanium Piston, 1x Boiler Heart, 2x High-Pressure Condenser, 1x Resonating Quartz Crystal |
| #110 | <img src="golems_imgs/mechanical/golem_110.png" width="44" alt="golem_110" /> | **Geared Sentinel** | ⚙️ Mechanical | Tier 3 | 1.25m | 44 | 31 | 157 | 24 | 1x Precision Gyroscope, 2x Perfect Bronze Gears, 1x Condensed Mana Core, 2x Resonating Quartz Crystal, 2x Steam Engine, 1x Alchemical Batteries, 1x Radio Antennas |
| #111 | <img src="golems_imgs/mechanical/golem_111.png" width="44" alt="golem_111" /> | **Clockwork Defender** | ⚙️ Mechanical | Tier 3 | 0.91m | 45 | 43 | 155 | 16 | 1x Supercharged Plasma Battery, 2x Precision Gyroscope, 2x Switch Levers, 2x LED Diodes, 2x Perfect Bronze Gears, 1x Solar Optical Array, 1x Filament Bulbs |
| #112 | <img src="golems_imgs/luminous/golem_112.png" width="44" alt="golem_112" /> | **Filament Assembly** | ☀️ Luminous | Tier 3 | 1.17m | 28 | 24 | 220 | 35 | 2x Alchemical Batteries, 1x Boiler Heart, 2x Solar Optical Array, 2x Radio Antennas, 2x Pressure Gauges |
| #113 | <img src="golems_imgs/mechanical/golem_113.png" width="44" alt="golem_113" /> | **Ferrous Guardian** | ⚙️ Mechanical | Tier 3 | 0.91m | 47 | 25 | 162 | 24 | 2x Radio Antennas, 1x Alchemical Batteries, 1x Magnetic Compasses, 1x Galvanic Dynamo, 2x Transistors, 2x Precision Gyroscope, 1x Steam Engine, 1x LED Diodes |
| #114 | <img src="golems_imgs/steam/golem_114.png" width="44" alt="golem_114" /> | **Pneumatic Crusader** | ♨️ Steam | Tier 3 | 1.09m | 46 | 45 | 136 | 16 | 2x Perfect Bronze Gears, 1x Broken Pocket Watches, 1x Switch Levers, 1x Vacuum Tubes, 1x Resonating Quartz Crystal, 2x Condensed Mana Core, 2x Boiler Heart |
| #115 | <img src="golems_imgs/aether/golem_115.png" width="44" alt="golem_115" /> | **Singular Settler** | 🔮 Aether | Tier 3 | 1.08m | 49 | 22 | 176 | 16 | 1x LED Diodes, 1x Solar Optical Array, 2x High-Pressure Condenser, 1x Steam Valves, 1x Perfect Bronze Gears, 2x Condensed Mana Core |
| #116 | <img src="golems_imgs/aether/golem_116.png" width="44" alt="golem_116" /> | **Mystic Smelter** | 🔮 Aether | Tier 3 | 1.02m | 58 | 16 | 167 | 14 | 1x Alchemical Batteries, 1x Aether Reactor, 1x LED Diodes, 1x Automaton Brain, 1x Resonating Quartz Crystal, 1x Condensed Mana Core |
| #117 | <img src="golems_imgs/steam/golem_117.png" width="44" alt="golem_117" /> | **Igneous Watcher** | ♨️ Steam | Tier 3 | 1.13m | 46 | 44 | 184 | 9 | 2x Supercharged Plasma Battery, 2x Perfect Bronze Gears, 1x Pressure Gauges, 2x Forged Titanium Piston, 1x High-Pressure Condenser |
| #118 | <img src="golems_imgs/steam/golem_118.png" width="44" alt="golem_118" /> | **Piston Leviathan** | ♨️ Steam | Tier 3 | 1.28m | 70 | 27 | 171 | 29 | 2x Steam Engine, 2x Broken Pocket Watches, 1x Automaton Brain, 2x High-Pressure Condenser, 1x Clock Springs, 2x Galvanic Dynamo, 2x Perfect Bronze Gears, 2x Radio Antennas, 2x Aether Reactor |
| #119 | <img src="golems_imgs/steam/golem_119.png" width="44" alt="golem_119" /> | **Vaporized Vanguard** | ♨️ Steam | Tier 3 | 1.02m | 27 | 29 | 238 | 34 | 2x Solar Optical Array, 2x Radio Antennas, 2x Forged Titanium Piston, 2x High-Pressure Condenser, 1x Pressure Gauges, 2x Alchemical Batteries |
| #120 | <img src="golems_imgs/galvanic/golem_120.png" width="44" alt="golem_120" /> | **Galvanic Automaton** | ⚡ Galvanic | Tier 3 | 1.21m | 40 | 20 | 189 | 16 | 1x Supercharged Plasma Battery, 1x Solar Optical Array, 1x Transistors, 1x High-Pressure Condenser, 2x Switch Levers, 1x Alchemical Batteries |
| #121 | <img src="golems_imgs/aether/golem_121.png" width="44" alt="golem_121" /> | **Primordial Protector** | 🔮 Aether | Tier 3 | 1.13m | 67 | 27 | 193 | 17 | 2x Aether Reactor, 1x Tesla Coils, 2x Filament Bulbs, 1x Solar Optical Array, 2x Steam Valves, 1x Perfect Bronze Gears, 1x Supercharged Plasma Battery, 1x High-Pressure Condenser, 2x Switch Levers |
| #122 | <img src="golems_imgs/steam/golem_122.png" width="44" alt="golem_122" /> | **Thermal Bearer** | ♨️ Steam | Tier 3 | 1.05m | 71 | 29 | 157 | 13 | 2x Vacuum Tubes, 2x Forged Titanium Piston, 2x Steam Engine, 1x Resonating Quartz Crystal, 1x Alchemical Batteries, 1x Aether Reactor, 2x Tesla Coils, 2x Galvanic Dynamo |
| #123 | <img src="golems_imgs/mechanical/golem_123.png" width="44" alt="golem_123" /> | **Ferrous Monolith** | ⚙️ Mechanical | Tier 3 | 0.98m | 78 | 22 | 200 | 20 | 1x Galvanic Dynamo, 1x Precision Gyroscope, 2x Resonating Quartz Crystal, 1x Steam Engine, 2x Alchemical Batteries, 2x Condensed Mana Core, 2x Blown Fuses, 2x Automaton Brain |
| #124 | <img src="golems_imgs/galvanic/golem_124.png" width="44" alt="golem_124" /> | **Voltaic Scavenger** | ⚡ Galvanic | Tier 3 | 1.16m | 51 | 28 | 230 | 21 | 1x Precision Gyroscope, 2x Radio Antennas, 1x Blown Fuses, 2x Tesla Coils, 2x Alchemical Batteries, 2x High-Pressure Condenser, 1x Forged Titanium Piston, 1x Aether Reactor |
| #125 | <img src="golems_imgs/aether/golem_125.png" width="44" alt="golem_125" /> | **Singular Excavator** | 🔮 Aether | Tier 3 | 1.30m | 69 | 42 | 133 | 17 | 2x Perfect Bronze Gears, 2x Condensed Mana Core, 2x Boiler Heart, 1x Transistors, 1x Radio Antennas, 1x Old TV Lenses, 1x Galvanic Dynamo, 2x Aether Reactor, 1x Vacuum Tubes |
| #126 | <img src="golems_imgs/aether/golem_126.png" width="44" alt="golem_126" /> | **Mystic Patroller** | 🔮 Aether | Tier 4 | 1.06m | 111 | 40 | 187 | 31 | 3x Supercharged Plasma Battery, 3x Aether Reactor, 3x Radio Antennas, 3x LED Diodes, 2x Boiler Heart, 1x Condensed Mana Core |
| #127 | <img src="golems_imgs/galvanic/golem_127.png" width="44" alt="golem_127" /> | **Conductive Basilisk** | ⚡ Galvanic | Tier 4 | 1.22m | 71 | 21 | 245 | 23 | 1x Resonating Quartz Crystal, 3x Alchemical Batteries, 1x Solar Optical Array, 2x Condensed Mana Core, 2x Galvanic Dynamo, 2x Tesla Coils |
| #128 | <img src="golems_imgs/aether/golem_128.png" width="44" alt="golem_128" /> | **Dragonic Guard** | 🔮 Aether | Tier 4 | 1.12m | 100 | 80 | 270 | 32 | 2x Solar Optical Array, 2x Boiler Heart, 1x LED Diodes, 2x Perfect Bronze Gears, 1x Aetheric Singularity, 3x Condensed Mana Core, 1x Tesla Coils, 2x Aether Reactor, 3x Celestial Gear Reliquary |
| #129 | <img src="golems_imgs/aether/golem_129.png" width="44" alt="golem_129" /> | **Arcane Bulwark** | 🔮 Aether | Tier 4 | 1.02m | 112 | 89 | 307 | 30 | 2x Condensed Mana Core, 2x Perfect Bronze Gears, 3x Celestial Gear Reliquary, 2x Primordial Golem Heart, 2x Aetheric Singularity, 2x Boiler Heart, 3x Aether Reactor |
| #130 | <img src="golems_imgs/steam/golem_130.png" width="44" alt="golem_130" /> | **Steamy Hunter** | ♨️ Steam | Tier 4 | 1.02m | 104 | 28 | 233 | 17 | 1x Aetheric Singularity, 2x Supercharged Plasma Battery, 3x High-Pressure Condenser, 2x Steam Engine, 2x Mechanical Dragon Eye, 1x Forged Titanium Piston, 1x Galvanic Dynamo |
| #131 | <img src="golems_imgs/aether/golem_131.png" width="44" alt="golem_131" /> | **Primordial Gunner** | 🔮 Aether | Tier 4 | 1.20m | 107 | 70 | 216 | 27 | 3x Boiler Heart, 2x Automaton Brain, 2x Tesla Coils, 3x Aether Reactor, 1x Supercharged Plasma Battery, 2x Primordial Golem Heart, 3x Precision Gyroscope, 2x Resonating Quartz Crystal |
| #132 | <img src="golems_imgs/aether/golem_132.png" width="44" alt="golem_132" /> | **Reliquary Wraith** | 🔮 Aether | Tier 4 | 1.00m | 115 | 44 | 223 | 15 | 1x Primordial Golem Heart, 2x Mechanical Dragon Eye, 2x Condensed Mana Core, 1x Boiler Heart, 1x Celestial Gear Reliquary, 2x Galvanic Dynamo, 3x Supercharged Plasma Battery |
| #133 | <img src="golems_imgs/aether/golem_133.png" width="44" alt="golem_133" /> | **Astral Colossus** | 🔮 Aether | Tier 4 | 0.96m | 74 | 68 | 337 | 35 | 3x Primordial Golem Heart, 1x Radio Antennas, 1x Supercharged Plasma Battery, 3x Celestial Gear Reliquary, 1x Tesla Coils, 1x Automaton Brain, 1x Solar Optical Array |
| #134 | <img src="golems_imgs/aether/golem_134.png" width="44" alt="golem_134" /> | **Manatic Destroyer** | 🔮 Aether | Tier 4 | 1.17m | 116 | 57 | 235 | 55 | 2x Boiler Heart, 2x Celestial Gear Reliquary, 2x Steam Engine, 3x Radio Antennas, 3x Condensed Mana Core, 2x Aetheric Singularity, 2x Solar Optical Array, 3x Supercharged Plasma Battery |
| #135 | <img src="golems_imgs/aether/golem_135.png" width="44" alt="golem_135" /> | **Singular Servant** | 🔮 Aether | Tier 4 | 1.14m | 136 | 68 | 333 | 33 | 3x Tesla Coils, 3x Celestial Gear Reliquary, 2x Aetheric Singularity, 1x Primordial Golem Heart, 2x High-Pressure Condenser, 1x Radio Antennas, 3x Supercharged Plasma Battery, 2x Precision Gyroscope, 2x Mechanical Dragon Eye |
| #136 | <img src="golems_imgs/aether/golem_136.png" width="44" alt="golem_136" /> | **Mystic Forger** | 🔮 Aether | Tier 4 | 1.27m | 94 | 88 | 375 | 33 | 2x High-Pressure Condenser, 3x Celestial Gear Reliquary, 1x Alchemical Batteries, 1x Boiler Heart, 3x Mechanical Dragon Eye, 3x Primordial Golem Heart, 2x Solar Optical Array, 3x Perfect Bronze Gears, 1x Tesla Coils |
| #137 | <img src="golems_imgs/aether/golem_137.png" width="44" alt="golem_137" /> | **Cosmic Executor** | 🔮 Aether | Tier 4 | 0.93m | 97 | 47 | 204 | 18 | 3x Aether Reactor, 1x Celestial Gear Reliquary, 1x Mechanical Dragon Eye, 1x Supercharged Plasma Battery, 2x Boiler Heart, 3x Steam Engine, 1x Solar Optical Array |
| #138 | <img src="golems_imgs/steam/golem_138.png" width="44" alt="golem_138" /> | **Piston Tracker** | ♨️ Steam | Tier 4 | 1.25m | 56 | 86 | 295 | 26 | 1x Primordial Golem Heart, 3x Boiler Heart, 2x Aether Reactor, 2x Radio Antennas, 2x Alchemical Batteries, 3x Perfect Bronze Gears, 3x Forged Titanium Piston, 3x High-Pressure Condenser |
| #139 | <img src="golems_imgs/aether/golem_139.png" width="44" alt="golem_139" /> | **Arcane Titan** | 🔮 Aether | Tier 4 | 0.98m | 92 | 78 | 275 | 24 | 2x Automaton Brain, 2x Radio Antennas, 1x Mechanical Dragon Eye, 2x Precision Gyroscope, 3x Supercharged Plasma Battery, 3x Celestial Gear Reliquary, 2x Forged Titanium Piston |
| #140 | <img src="golems_imgs/aether/golem_140.png" width="44" alt="golem_140" /> | **Aetheric Walker** | 🔮 Aether | Tier 4 | 0.90m | 96 | 51 | 211 | 23 | 3x Forged Titanium Piston, 2x Condensed Mana Core, 1x Aetheric Singularity, 1x Supercharged Plasma Battery, 2x Aether Reactor, 2x Primordial Golem Heart |
| #141 | <img src="golems_imgs/aether/golem_141.png" width="44" alt="golem_141" /> | **Primordial Golem** | 🔮 Aether | Tier 4 | 0.96m | 144 | 23 | 210 | 32 | 2x Aether Reactor, 3x Automaton Brain, 1x LED Diodes, 3x Aetheric Singularity, 1x Galvanic Dynamo, 1x Mechanical Dragon Eye, 1x High-Pressure Condenser |
| #142 | <img src="golems_imgs/aether/golem_142.png" width="44" alt="golem_142" /> | **Reliquary Sentinel** | 🔮 Aether | Tier 4 | 1.01m | 118 | 61 | 245 | 12 | 2x Condensed Mana Core, 2x Mechanical Dragon Eye, 3x Perfect Bronze Gears, 2x Celestial Gear Reliquary, 2x Supercharged Plasma Battery, 1x Steam Engine, 3x Galvanic Dynamo |
| #143 | <img src="golems_imgs/aether/golem_143.png" width="44" alt="golem_143" /> | **Astral Defender** | 🔮 Aether | Tier 4 | 1.22m | 99 | 78 | 259 | 35 | 3x Celestial Gear Reliquary, 1x Radio Antennas, 1x Boiler Heart, 1x Mechanical Dragon Eye, 1x Galvanic Dynamo, 3x LED Diodes, 3x Aetheric Singularity, 3x Forged Titanium Piston |
| #144 | <img src="golems_imgs/steam/golem_144.png" width="44" alt="golem_144" /> | **Pneumatic Assembly** | ♨️ Steam | Tier 4 | 1.15m | 114 | 66 | 189 | 13 | 3x Condensed Mana Core, 2x Steam Engine, 3x Boiler Heart, 2x Precision Gyroscope, 3x Supercharged Plasma Battery, 3x Galvanic Dynamo, 1x Forged Titanium Piston |
| #145 | <img src="golems_imgs/aether/golem_145.png" width="44" alt="golem_145" /> | **Singular Guardian** | 🔮 Aether | Tier 4 | 0.91m | 176 | 57 | 235 | 43 | 3x High-Pressure Condenser, 3x Aetheric Singularity, 2x Perfect Bronze Gears, 3x Mechanical Dragon Eye, 2x Steam Engine, 3x Boiler Heart, 2x Solar Optical Array, 1x Condensed Mana Core, 3x Automaton Brain, 3x Supercharged Plasma Battery |
| #146 | <img src="golems_imgs/aether/golem_146.png" width="44" alt="golem_146" /> | **Mystic Crusader** | 🔮 Aether | Tier 4 | 1.01m | 54 | 44 | 291 | 20 | 1x Solar Optical Array, 1x Condensed Mana Core, 1x Automaton Brain, 2x Celestial Gear Reliquary, 2x High-Pressure Condenser |
| #147 | <img src="golems_imgs/aether/golem_147.png" width="44" alt="golem_147" /> | **Cosmic Settler** | 🔮 Aether | Tier 4 | 0.90m | 139 | 79 | 284 | 32 | 3x Celestial Gear Reliquary, 1x Primordial Golem Heart, 3x Aetheric Singularity, 3x Automaton Brain, 1x Galvanic Dynamo, 1x LED Diodes, 1x Supercharged Plasma Battery, 3x Condensed Mana Core, 2x Forged Titanium Piston, 2x Precision Gyroscope |
| #148 | <img src="golems_imgs/aether/golem_148.png" width="44" alt="golem_148" /> | **Dragonic Smelter** | 🔮 Aether | Tier 4 | 1.14m | 122 | 62 | 337 | 29 | 3x Primordial Golem Heart, 2x Mechanical Dragon Eye, 1x Solar Optical Array, 3x High-Pressure Condenser, 1x Steam Engine, 1x Perfect Bronze Gears, 1x Celestial Gear Reliquary, 3x Supercharged Plasma Battery, 3x LED Diodes, 1x Boiler Heart |
| #149 | <img src="golems_imgs/aether/golem_149.png" width="44" alt="golem_149" /> | **Arcane Watcher** | 🔮 Aether | Tier 4 | 0.91m | 169 | 60 | 270 | 61 | 1x Boiler Heart, 3x Automaton Brain, 3x Solar Optical Array, 3x Aether Reactor, 2x Supercharged Plasma Battery, 3x Mechanical Dragon Eye, 1x Radio Antennas, 3x Celestial Gear Reliquary, 2x Aetheric Singularity, 2x Resonating Quartz Crystal |
| #150 | <img src="golems_imgs/aether/golem_150.png" width="44" alt="golem_150" /> | **Aetheric Leviathan** | 🔮 Aether | Tier 4 | 1.15m | 130 | 47 | 216 | 18 | 2x Primordial Golem Heart, 2x Boiler Heart, 2x Mechanical Dragon Eye, 1x Galvanic Dynamo, 2x Supercharged Plasma Battery, 1x Aether Reactor, 3x Automaton Brain, 1x Steam Engine |


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

### 10.1 Wearables and Equippable 3D Accessories (18 Pieces)

In addition to native `base-avatars` clothing, the project procedurally generates **18 `.glb` 3D accessories** in `assets/wearables/`, equippable on both NPCs and players via `AvatarAttach` (mobile-first PBR, emissive-only glow material, no dynamic lights):

| # | Render | Wearable | Anchor (`AAPT_`) | Category | Tris |
| :-: | :-: | :--- | :--- | :--- | :-: |
| 1 | <img src="wearables_imgs/goggles_steampunk.png" width="70" /> | Steampunk Aviator Goggles | `HEAD` | Eyewear | 788 |
| 2 | <img src="wearables_imgs/welding_mask.png" width="70" /> | Mad Max Welding Mask | `HEAD` | Mask | 684 |
| 3 | <img src="wearables_imgs/steam_backpack.png" width="70" /> | Steam Boiler Backpack | `SPINE2` | Back | 884 |
| 4 | <img src="wearables_imgs/tesla_backpack.png" width="70" /> | Tesla Galvanic Generator | `SPINE2` | Back | 996 |
| 5 | <img src="wearables_imgs/wrench_heavy.png" width="70" /> | Giant Mechatronic Wrench | `RIGHT_HAND` | Hand | 372 |
| 6 | <img src="wearables_imgs/flamethrower_pipe.png" width="70" /> | Industrial Steam Flamethrower | `RIGHT_HAND` | Hand | 604 |
| 7 | <img src="wearables_imgs/shoulder_pad_spiked.png" width="70" /> | Spiked Armored Shoulder Pad | `LEFT_SHOULDER` | Shoulder | 644 |
| 8 | <img src="wearables_imgs/aether_crown.png" width="70" /> | Aether Crystal Crown | `HEAD` | Tiara | 176 |
| 9 | <img src="wearables_imgs/monocle_brass.png" width="70" /> | Brass Monocle | `HEAD` | Eyewear | 680 |
| 10 | <img src="wearables_imgs/top_hat_steam.png" width="70" /> | Steam Top Hat | `HEAD` | Hat | 938 |
| 11 | <img src="wearables_imgs/neck_cog_collar.png" width="70" /> | Cog Collar | `NECK` | Neck | 1200 |
| 12 | <img src="wearables_imgs/chest_armor_plate.png" width="70" /> | Riveted Chest Armor Plate | `SPINE1` | Chest | 1040 |
| 13 | <img src="wearables_imgs/belt_utility_pouch.png" width="70" /> | Utility Belt Pouch | `HIP` | Hip | 956 |
| 14 | <img src="wearables_imgs/gauntlet_left.png" width="70" /> | Left Armored Gauntlet | `LEFT_FOREARM` | Handwear | 768 |
| 15 | <img src="wearables_imgs/gauntlet_right.png" width="70" /> | Right Armored Gauntlet | `RIGHT_FOREARM` | Handwear | 768 |
| 16 | <img src="wearables_imgs/mechanical_arm_left.png" width="70" /> | Mechanical Piston Arm | `LEFT_ARM` | Arm | 992 |
| 17 | <img src="wearables_imgs/shoulder_cannon.png" width="70" /> | Steam Shoulder Cannon | `RIGHT_SHOULDER` | Shoulder | 840 |
| 18 | <img src="wearables_imgs/boot_plated_right.png" width="70" /> | Plated Boot with Greaves | `RIGHT_FOOT` | Feet | 648 |

- 📖 *Master guide*: [`guias/guia-fabricacion-y-catalogo-npcs.md`](guias/guia-fabricacion-y-catalogo-npcs.md) · Full catalog: [`GOLEMS/Golems-Wearables-18.md`](Golems-Wearables-18.md).

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
