# Master Golem Recipe Catalog (150 Deterministic Designs)

![cover](golems_cover_eng.png)

> **Official Recipe Document and Algorithmic Specification**
> This catalog contains the detailed specification of **150 unique golems** forgeable in the Decentraland *Wreckage Lab* (*world*: `golems.dcl.eth`).
> Each golem derives its stats, algorithmic name, elemental affinity, visual scale, and PBR tint directly from the **32-bit FNV-1a** hash of its serialized canonical recipe.

---

## 📊 1. Executive Summary and Tier Distribution

| Tier | Classification | Golem Range | Parts per Recipe | Dominant Rarity | Tactical Focus |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | Basic Scavengers | `#001` to `#040` (40) | 5 to 6 parts | Common / Uncommon | Onboarding, safe exploration, early combat |
| **Tier 2** | Mid Mechatronics | `#041` to `#090` (50) | 6 to 8 parts | Uncommon / Rare | Versatile squads, mid-zone combat |
| **Tier 3** | Electromechanical Veterans | `#091` to `#125` (35) | 7 to 10 parts | Rare / Epic | Ladder Tournament, PK zone raids |
| **Tier 4** | Titans & Aether Reactors | `#126` to `#150` (25) | 8 to 12 parts | Epic / Legendary | Grand Arena and Scrap Desert domination |

---

## ⚡ 2. The Elemental Affinity Pentagon

```text
         [ STEAM ] (Vapor)
          /       \
         /         \  (Beats Mechanical x1.40)
   [ AETHER ]      [ MECHANICAL ]
   (Éter)            (Mecánica)
       \             /
        \           /   (Beats Galvanic x1.40)
     [ LUMINOUS ]---[ GALVANIC ]
     (Luminosa)      (Galvánica)
```

---

## 🛠️ 3. Complete Catalog of 150 Recipes

### Golem #001 — Electric Bulwark

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.09m` (In-scene visual ratio)
- **Tactical Role**: *Thermal sustain and boiler control*

#### 🧩 Required Components (5 Part Types):
- **2x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **2x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **2x** Iron Chains (`cadenas_hierro`) — *[Common]*
- **2x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **2x** Screws & Bolts (`tornillos_pernos`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cadenas_hierro:2|manometros:2|palancas_interruptor:2|tornillos_pernos:2|tuercas_gigantes:2`
- **Hexadecimal FNV-1a Hash**: `0x3192BC8B` | **Decimal**: `831700107`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **24** | **117** | **4** |

---

### Golem #002 — Filament Hunter

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.03m` (In-scene visual ratio)
- **Tactical Role**: *Versatile exploration automaton*

#### 🧩 Required Components (6 Part Types):
- **1x** Brass Plates (`placas_laton`) — *[Common]*
- **1x** Iron Chains (`cadenas_hierro`) — *[Common]*
- **1x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **2x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*
- **2x** Worn Gears (`engranajes_desgastados`) — *[Common]*
- **2x** Frying Pans (`sartenes`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bombillas_filamento:2|cadenas_hierro:1|engranajes_desgastados:2|placas_laton:1|sartenes:2|tuercas_gigantes:1`
- **Hexadecimal FNV-1a Hash**: `0x5E2836C9` | **Decimal**: `1579693769`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **23** | **109** | **6** |

---

### Golem #003 — Boiler Gunner

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `0.95m` (In-scene visual ratio)
- **Tactical Role**: *Impenetrable containment colossus*

#### 🧩 Required Components (4 Part Types):
- **1x** Coal Residue (`residuos_carbon`) — *[Common]*
- **1x** Screws & Bolts (`tornillos_pernos`) — *[Common]*
- **2x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **1x** Brass Plates (`placas_laton`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `placas_laton:1|residuos_carbon:1|tornillos_pernos:1|tuercas_gigantes:2`
- **Hexadecimal FNV-1a Hash**: `0xC437C53B` | **Decimal**: `3291989307`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **16** | **88** | **4** |

---

### Golem #004 — Mechanical Wraith

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `1.10m` (In-scene visual ratio)
- **Tactical Role**: *High-frequency galvanic disruptor*

#### 🧩 Required Components (5 Part Types):
- **2x** Frying Pans (`sartenes`) — *[Common]*
- **2x** Manhole Covers (`tapas_alcantarilla`) — *[Common]*
- **1x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **1x** Worn Gears (`engranajes_desgastados`) — *[Common]*
- **1x** Copper Wire (`alambre_cobre`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `alambre_cobre:1|engranajes_desgastados:1|palancas_interruptor:1|sartenes:2|tapas_alcantarilla:2`
- **Hexadecimal FNV-1a Hash**: `0x7E59D602` | **Decimal**: `2119816706`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **23** | **87** | **7** |

---

### Golem #005 — Pressurized Colossus

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `0.97m` (In-scene visual ratio)
- **Tactical Role**: *Vanguard unit for PK zones*

#### 🧩 Required Components (5 Part Types):
- **1x** Coal Residue (`residuos_carbon`) — *[Common]*
- **2x** Cooking Pots (`ollas_cocinar`) — *[Common]*
- **1x** Worn Gears (`engranajes_desgastados`) — *[Common]*
- **1x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **1x** Rusty Nails (`clavos_oxidados`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `clavos_oxidados:1|engranajes_desgastados:1|ollas_cocinar:2|residuos_carbon:1|tuercas_gigantes:1`
- **Hexadecimal FNV-1a Hash**: `0x01713109` | **Decimal**: `24195337`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **15** | **15** | **97** | **5** |

---

### Golem #006 — Bright Destroyer

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.01m` (In-scene visual ratio)
- **Tactical Role**: *Swift-striking agile assassin*

#### 🧩 Required Components (6 Part Types):
- **1x** Transistors (`transistores`) — *[Uncommon]*
- **2x** Brass Plates (`placas_laton`) — *[Common]*
- **1x** Worn Gears (`engranajes_desgastados`) — *[Common]*
- **2x** Old TV Lenses (`lentes_tv_viejo`) — *[Uncommon]*
- **2x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **2x** Manhole Covers (`tapas_alcantarilla`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `engranajes_desgastados:1|lentes_tv_viejo:2|placas_laton:2|tapas_alcantarilla:2|transistores:1|tubos_vacio:2`
- **Hexadecimal FNV-1a Hash**: `0xEF9D26EE` | **Decimal**: `4020053742`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **24** | **20** | **82** | **11** |

---

### Golem #007 — Igneous Servant

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `0.91m` (In-scene visual ratio)
- **Tactical Role**: *Fast front-line attacker*

#### 🧩 Required Components (5 Part Types):
- **2x** Coal Residue (`residuos_carbon`) — *[Common]*
- **2x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*
- **1x** Old TV Lenses (`lentes_tv_viejo`) — *[Uncommon]*
- **2x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **1x** Tin Cans (`latas_conserva`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bombillas_filamento:2|fusibles_fundidos:2|latas_conserva:1|lentes_tv_viejo:1|residuos_carbon:2`
- **Hexadecimal FNV-1a Hash**: `0xD352DC01` | **Decimal**: `3545422849`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **19** | **8** | **124** | **7** |

---

### Golem #008 — Sparkling Forger

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.12m` (In-scene visual ratio)
- **Tactical Role**: *Photonic pulse sniper*

#### 🧩 Required Components (5 Part Types):
- **1x** Rusty Nails (`clavos_oxidados`) — *[Common]*
- **1x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **1x** Cooking Pots (`ollas_cocinar`) — *[Common]*
- **1x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **2x** Iron Chains (`cadenas_hierro`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cadenas_hierro:2|clavos_oxidados:1|ollas_cocinar:1|tubos_vacio:1|tuercas_gigantes:1`
- **Hexadecimal FNV-1a Hash**: `0xD169D26D` | **Decimal**: `3513373293`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **18** | **16** | **86** | **4** |

---

### Golem #009 — Raying Executor

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.05m` (In-scene visual ratio)
- **Tactical Role**: *Heavy endurance for arena combat*

#### 🧩 Required Components (5 Part Types):
- **2x** Frying Pans (`sartenes`) — *[Common]*
- **1x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **2x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **1x** Worn Gears (`engranajes_desgastados`) — *[Common]*
- **2x** Copper Pipes (`tubos_cobre`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `engranajes_desgastados:1|fusibles_fundidos:1|resortes_reloj:2|sartenes:2|tubos_cobre:2`
- **Hexadecimal FNV-1a Hash**: `0xC159E906` | **Decimal**: `3243895046`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **18** | **15** | **107** | **13** |

---

### Golem #010 — Geared Tracker

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `0.92m` (In-scene visual ratio)
- **Tactical Role**: *High-armor frontal defensive tank*

#### 🧩 Required Components (6 Part Types):
- **2x** Worn Gears (`engranajes_desgastados`) — *[Common]*
- **2x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **1x** Iron Chains (`cadenas_hierro`) — *[Common]*
- **2x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **1x** Copper Wire (`alambre_cobre`) — *[Common]*
- **1x** Frying Pans (`sartenes`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `alambre_cobre:1|brujulas_magneticas:2|cadenas_hierro:1|engranajes_desgastados:2|manometros:2|sartenes:1`
- **Hexadecimal FNV-1a Hash**: `0x55BF77CD` | **Decimal**: `1438611405`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **15** | **14** | **109** | **13** |

---

### Golem #011 — Electric Titan

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.19m` (In-scene visual ratio)
- **Tactical Role**: *Thermal sustain and boiler control*

#### 🧩 Required Components (3 Part Types):
- **1x** Manhole Covers (`tapas_alcantarilla`) — *[Common]*
- **1x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **1x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `fusibles_fundidos:1|tapas_alcantarilla:1|tuercas_gigantes:1`
- **Hexadecimal FNV-1a Hash**: `0x7CBED73C` | **Decimal**: `2092881724`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **19** | **14** | **89** | **4** |

---

### Golem #012 — Thermal Walker

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.24m` (In-scene visual ratio)
- **Tactical Role**: *Versatile exploration automaton*

#### 🧩 Required Components (4 Part Types):
- **2x** Steam Valves (`valvulas_vapor`) — *[Uncommon]*
- **2x** Copper Pipes (`tubos_cobre`) — *[Common]*
- **1x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **1x** Transistors (`transistores`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `manometros:1|transistores:1|tubos_cobre:2|valvulas_vapor:2`
- **Hexadecimal FNV-1a Hash**: `0x9BA4AFBF` | **Decimal**: `2611261375`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **24** | **8** | **124** | **4** |

---

### Golem #013 — Astral Golem

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `0.94m` (In-scene visual ratio)
- **Tactical Role**: *Impenetrable containment colossus*

#### 🧩 Required Components (5 Part Types):
- **1x** Broken Pocket Watches (`relojes_bolsillo`) — *[Uncommon]*
- **2x** Screws & Bolts (`tornillos_pernos`) — *[Common]*
- **1x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **2x** Rusty Nails (`clavos_oxidados`) — *[Common]*
- **1x** Frying Pans (`sartenes`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cables_deshilachados:1|clavos_oxidados:2|relojes_bolsillo:1|sartenes:1|tornillos_pernos:2`
- **Hexadecimal FNV-1a Hash**: `0xA046639B` | **Decimal**: `2688967579`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **15** | **16** | **82** | **9** |

---

### Golem #014 — Pneumatic Sentinel

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `0.91m` (In-scene visual ratio)
- **Tactical Role**: *High-frequency galvanic disruptor*

#### 🧩 Required Components (5 Part Types):
- **2x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **1x** Manhole Covers (`tapas_alcantarilla`) — *[Common]*
- **2x** Cooking Pots (`ollas_cocinar`) — *[Common]*
- **2x** Copper Wire (`alambre_cobre`) — *[Common]*
- **2x** Coal Residue (`residuos_carbon`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `alambre_cobre:2|brujulas_magneticas:2|ollas_cocinar:2|residuos_carbon:2|tapas_alcantarilla:1`
- **Hexadecimal FNV-1a Hash**: `0x942182D0` | **Decimal**: `2485224144`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **15** | **109** | **14** |

---

### Golem #015 — Singular Defender

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.09m` (In-scene visual ratio)
- **Tactical Role**: *Vanguard unit for PK zones*

#### 🧩 Required Components (4 Part Types):
- **2x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **1x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **1x** Brass Plates (`placas_laton`) — *[Common]*
- **2x** Copper Pipes (`tubos_cobre`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cables_deshilachados:2|placas_laton:1|tubos_cobre:2|tuercas_gigantes:1`
- **Hexadecimal FNV-1a Hash**: `0xEBBBA912` | **Decimal**: `3954944274`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **13** | **106** | **8** |

---

### Golem #016 — Bright Assembly

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.25m` (In-scene visual ratio)
- **Tactical Role**: *Swift-striking agile assassin*

#### 🧩 Required Components (4 Part Types):
- **1x** Rusty Nails (`clavos_oxidados`) — *[Common]*
- **1x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*
- **2x** Copper Pipes (`tubos_cobre`) — *[Common]*
- **2x** Tin Cans (`latas_conserva`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bombillas_filamento:1|clavos_oxidados:1|latas_conserva:2|tubos_cobre:2`
- **Hexadecimal FNV-1a Hash**: `0x018349FC` | **Decimal**: `25381372`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **9** | **133** | **4** |

---

### Golem #017 — Articulated Guardian

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `1.07m` (In-scene visual ratio)
- **Tactical Role**: *Fast front-line attacker*

#### 🧩 Required Components (5 Part Types):
- **2x** Broken Pocket Watches (`relojes_bolsillo`) — *[Uncommon]*
- **2x** Cooking Pots (`ollas_cocinar`) — *[Common]*
- **1x** Worn Gears (`engranajes_desgastados`) — *[Common]*
- **2x** Rusty Nails (`clavos_oxidados`) — *[Common]*
- **2x** Manhole Covers (`tapas_alcantarilla`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `clavos_oxidados:2|engranajes_desgastados:1|ollas_cocinar:2|relojes_bolsillo:2|tapas_alcantarilla:2`
- **Hexadecimal FNV-1a Hash**: `0x3712FB9D` | **Decimal**: `923990941`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **21** | **95** | **11** |

---

### Golem #018 — Batterion Crusader

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.05m` (In-scene visual ratio)
- **Tactical Role**: *Photonic pulse sniper*

#### 🧩 Required Components (6 Part Types):
- **2x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **2x** Frying Pans (`sartenes`) — *[Common]*
- **1x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **2x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **2x** Brass Plates (`placas_laton`) — *[Common]*
- **1x** Iron Chains (`cadenas_hierro`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cadenas_hierro:1|manometros:2|palancas_interruptor:2|placas_laton:2|sartenes:2|tuercas_gigantes:1`
- **Hexadecimal FNV-1a Hash**: `0x8A8EB1CD` | **Decimal**: `2324607437`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **17** | **29** | **120** | **4** |

---

### Golem #019 — Mirrored Settler

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.05m` (In-scene visual ratio)
- **Tactical Role**: *Heavy endurance for arena combat*

#### 🧩 Required Components (5 Part Types):
- **1x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **2x** Iron Chains (`cadenas_hierro`) — *[Common]*
- **1x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **2x** Screws & Bolts (`tornillos_pernos`) — *[Common]*
- **2x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cables_deshilachados:1|cadenas_hierro:2|palancas_interruptor:2|tornillos_pernos:2|tubos_vacio:1`
- **Hexadecimal FNV-1a Hash**: `0xA27E4485` | **Decimal**: `2726184069`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **19** | **20** | **84** | **6** |

---

### Golem #020 — Aetheric Smelter

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `0.98m` (In-scene visual ratio)
- **Tactical Role**: *High-armor frontal defensive tank*

#### 🧩 Required Components (4 Part Types):
- **2x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **2x** Copper Pipes (`tubos_cobre`) — *[Common]*
- **2x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **1x** Screws & Bolts (`tornillos_pernos`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `resortes_reloj:2|tornillos_pernos:1|tubos_cobre:2|tuercas_gigantes:2`
- **Hexadecimal FNV-1a Hash**: `0xBD867C61` | **Decimal**: `3179707489`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **14** | **102** | **12** |

---

### Golem #021 — Smoky Watcher

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.08m` (In-scene visual ratio)
- **Tactical Role**: *Thermal sustain and boiler control*

#### 🧩 Required Components (6 Part Types):
- **2x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **2x** Screws & Bolts (`tornillos_pernos`) — *[Common]*
- **1x** Copper Pipes (`tubos_cobre`) — *[Common]*
- **1x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **2x** Coal Residue (`residuos_carbon`) — *[Common]*
- **2x** Frying Pans (`sartenes`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `palancas_interruptor:2|residuos_carbon:2|sartenes:2|tornillos_pernos:2|tubos_cobre:1|tuercas_gigantes:1`
- **Hexadecimal FNV-1a Hash**: `0x93C44D85` | **Decimal**: `2479115653`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **24** | **105** | **4** |

---

### Golem #022 — Reliquary Leviathan

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.01m` (In-scene visual ratio)
- **Tactical Role**: *Versatile exploration automaton*

#### 🧩 Required Components (6 Part Types):
- **2x** Manhole Covers (`tapas_alcantarilla`) — *[Common]*
- **2x** Frying Pans (`sartenes`) — *[Common]*
- **1x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **2x** Old TV Lenses (`lentes_tv_viejo`) — *[Uncommon]*
- **2x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **1x** Brass Plates (`placas_laton`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cables_deshilachados:2|lentes_tv_viejo:2|placas_laton:1|sartenes:2|tapas_alcantarilla:2|tuercas_gigantes:1`
- **Hexadecimal FNV-1a Hash**: `0xFA46FC3E` | **Decimal**: `4198956094`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **25** | **83** | **14** |

---

### Golem #023 — Boiler Vanguard

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.22m` (In-scene visual ratio)
- **Tactical Role**: *Impenetrable containment colossus*

#### 🧩 Required Components (5 Part Types):
- **1x** Frying Pans (`sartenes`) — *[Common]*
- **2x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **2x** Coal Residue (`residuos_carbon`) — *[Common]*
- **1x** Copper Wire (`alambre_cobre`) — *[Common]*
- **2x** Manhole Covers (`tapas_alcantarilla`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `alambre_cobre:1|fusibles_fundidos:2|residuos_carbon:2|sartenes:1|tapas_alcantarilla:2`
- **Hexadecimal FNV-1a Hash**: `0xCA17E69A` | **Decimal**: `3390563994`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **20** | **17** | **96** | **6** |

---

### Golem #024 — Pneumatic Automaton

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.27m` (In-scene visual ratio)
- **Tactical Role**: *High-frequency galvanic disruptor*

#### 🧩 Required Components (5 Part Types):
- **1x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **2x** Copper Wire (`alambre_cobre`) — *[Common]*
- **1x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **1x** Iron Chains (`cadenas_hierro`) — *[Common]*
- **2x** Copper Pipes (`tubos_cobre`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `alambre_cobre:2|cadenas_hierro:1|resortes_reloj:1|tubos_cobre:2|tuercas_gigantes:1`
- **Hexadecimal FNV-1a Hash**: `0x40794150` | **Decimal**: `1081688400`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **15** | **12** | **101** | **12** |

---

### Golem #025 — Rotor Protector

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `0.98m` (In-scene visual ratio)
- **Tactical Role**: *Vanguard unit for PK zones*

#### 🧩 Required Components (4 Part Types):
- **1x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **1x** Copper Pipes (`tubos_cobre`) — *[Common]*
- **2x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **1x** Frying Pans (`sartenes`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cables_deshilachados:2|palancas_interruptor:1|sartenes:1|tubos_cobre:1`
- **Hexadecimal FNV-1a Hash**: `0x1C52735B` | **Decimal**: `475165531`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **13** | **95** | **8** |

---

### Golem #026 — Pinion Bearer

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `1.05m` (In-scene visual ratio)
- **Tactical Role**: *Swift-striking agile assassin*

#### 🧩 Required Components (5 Part Types):
- **2x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **2x** Iron Chains (`cadenas_hierro`) — *[Common]*
- **1x** Screws & Bolts (`tornillos_pernos`) — *[Common]*
- **1x** Rusty Nails (`clavos_oxidados`) — *[Common]*
- **2x** Brass Plates (`placas_laton`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cables_deshilachados:2|cadenas_hierro:2|clavos_oxidados:1|placas_laton:2|tornillos_pernos:1`
- **Hexadecimal FNV-1a Hash**: `0x14B6C49E` | **Decimal**: `347522206`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **17** | **22** | **88** | **8** |

---

### Golem #027 — Igneous Monolith

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.05m` (In-scene visual ratio)
- **Tactical Role**: *Fast front-line attacker*

#### 🧩 Required Components (6 Part Types):
- **2x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **1x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **1x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **1x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*
- **2x** Coal Residue (`residuos_carbon`) — *[Common]*
- **2x** Tin Cans (`latas_conserva`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bombillas_filamento:1|cables_deshilachados:1|fusibles_fundidos:1|latas_conserva:2|residuos_carbon:2|tuercas_gigantes:2`
- **Hexadecimal FNV-1a Hash**: `0xC9BFF469` | **Decimal**: `3384800361`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **19** | **12** | **129** | **6** |

---

### Golem #028 — Piston Scavenger

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `0.99m` (In-scene visual ratio)
- **Tactical Role**: *Photonic pulse sniper*

#### 🧩 Required Components (4 Part Types):
- **2x** Coal Residue (`residuos_carbon`) — *[Common]*
- **1x** Steam Valves (`valvulas_vapor`) — *[Uncommon]*
- **1x** Cooking Pots (`ollas_cocinar`) — *[Common]*
- **2x** Clock Springs (`resortes_reloj`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `ollas_cocinar:1|residuos_carbon:2|resortes_reloj:2|valvulas_vapor:1`
- **Hexadecimal FNV-1a Hash**: `0xC6F5FDE9` | **Decimal**: `3338010089`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **18** | **10** | **104** | **12** |

---

### Golem #029 — Mirrored Excavator

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.00m` (In-scene visual ratio)
- **Tactical Role**: *Heavy endurance for arena combat*

#### 🧩 Required Components (4 Part Types):
- **2x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **2x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **2x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **1x** Screws & Bolts (`tornillos_pernos`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cables_deshilachados:2|manometros:2|tornillos_pernos:1|tuercas_gigantes:2`
- **Hexadecimal FNV-1a Hash**: `0x02EF7032` | **Decimal**: `49246258`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **14** | **116** | **8** |

---

### Golem #030 — Luminous Patroller

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.07m` (In-scene visual ratio)
- **Tactical Role**: *High-armor frontal defensive tank*

#### 🧩 Required Components (5 Part Types):
- **2x** Worn Gears (`engranajes_desgastados`) — *[Common]*
- **1x** Brass Plates (`placas_laton`) — *[Common]*
- **2x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **1x** Screws & Bolts (`tornillos_pernos`) — *[Common]*
- **1x** Cooking Pots (`ollas_cocinar`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `engranajes_desgastados:2|manometros:2|ollas_cocinar:1|placas_laton:1|tornillos_pernos:1`
- **Hexadecimal FNV-1a Hash**: `0xE77B23C2` | **Decimal**: `3883606978`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **17** | **18** | **125** | **6** |

---

### Golem #031 — Smoky Basilisk

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.12m` (In-scene visual ratio)
- **Tactical Role**: *Thermal sustain and boiler control*

#### 🧩 Required Components (5 Part Types):
- **1x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **2x** Steam Valves (`valvulas_vapor`) — *[Uncommon]*
- **1x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*
- **2x** Manhole Covers (`tapas_alcantarilla`) — *[Common]*
- **2x** Broken Pocket Watches (`relojes_bolsillo`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bombillas_filamento:1|manometros:1|relojes_bolsillo:2|tapas_alcantarilla:2|valvulas_vapor:2`
- **Hexadecimal FNV-1a Hash**: `0x793BAEF5` | **Decimal**: `2033954549`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **19** | **13** | **106** | **10** |

---

### Golem #032 — Thermal Guard

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `0.92m` (In-scene visual ratio)
- **Tactical Role**: *Versatile exploration automaton*

#### 🧩 Required Components (5 Part Types):
- **1x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **1x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **2x** Screws & Bolts (`tornillos_pernos`) — *[Common]*
- **2x** Coal Residue (`residuos_carbon`) — *[Common]*
- **1x** Manhole Covers (`tapas_alcantarilla`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cables_deshilachados:1|residuos_carbon:2|tapas_alcantarilla:1|tornillos_pernos:2|tubos_vacio:1`
- **Hexadecimal FNV-1a Hash**: `0x55377679` | **Decimal**: `1429698169`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **20** | **16** | **101** | **6** |

---

### Golem #033 — Boiler Bulwark

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `0.90m` (In-scene visual ratio)
- **Tactical Role**: *Impenetrable containment colossus*

#### 🧩 Required Components (5 Part Types):
- **1x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **1x** Cooking Pots (`ollas_cocinar`) — *[Common]*
- **1x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **1x** Coal Residue (`residuos_carbon`) — *[Common]*
- **1x** Clock Springs (`resortes_reloj`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cables_deshilachados:1|ollas_cocinar:1|palancas_interruptor:1|residuos_carbon:1|resortes_reloj:1`
- **Hexadecimal FNV-1a Hash**: `0x122D70F2` | **Decimal**: `304967922`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **12** | **97** | **10** |

---

### Golem #034 — Diodic Hunter

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `0.93m` (In-scene visual ratio)
- **Tactical Role**: *High-frequency galvanic disruptor*

#### 🧩 Required Components (6 Part Types):
- **2x** Frying Pans (`sartenes`) — *[Common]*
- **2x** Worn Gears (`engranajes_desgastados`) — *[Common]*
- **2x** Screws & Bolts (`tornillos_pernos`) — *[Common]*
- **1x** Brass Plates (`placas_laton`) — *[Common]*
- **2x** Iron Chains (`cadenas_hierro`) — *[Common]*
- **1x** Copper Pipes (`tubos_cobre`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cadenas_hierro:2|engranajes_desgastados:2|placas_laton:1|sartenes:2|tornillos_pernos:2|tubos_cobre:1`
- **Hexadecimal FNV-1a Hash**: `0xEC1A4F0C` | **Decimal**: `3961147148`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **26** | **92** | **6** |

---

### Golem #035 — Sparking Gunner

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.15m` (In-scene visual ratio)
- **Tactical Role**: *Vanguard unit for PK zones*

#### 🧩 Required Components (5 Part Types):
- **2x** Copper Wire (`alambre_cobre`) — *[Common]*
- **2x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **1x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **1x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **2x** Cooking Pots (`ollas_cocinar`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `alambre_cobre:2|cables_deshilachados:1|manometros:2|ollas_cocinar:2|resortes_reloj:1`
- **Hexadecimal FNV-1a Hash**: `0x36BFF5CA` | **Decimal**: `918549962`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **15** | **11** | **119** | **13** |

---

### Golem #036 — Pinion Wraith

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `1.18m` (In-scene visual ratio)
- **Tactical Role**: *Swift-striking agile assassin*

#### 🧩 Required Components (6 Part Types):
- **2x** Rusty Nails (`clavos_oxidados`) — *[Common]*
- **2x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **1x** Transistors (`transistores`) — *[Uncommon]*
- **2x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **1x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **2x** Copper Wire (`alambre_cobre`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `alambre_cobre:2|brujulas_magneticas:2|clavos_oxidados:2|resortes_reloj:1|transistores:1|tuercas_gigantes:2`
- **Hexadecimal FNV-1a Hash**: `0xBC9AE523` | **Decimal**: `3164267811`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **18** | **13** | **82** | **17** |

---

### Golem #037 — Articulated Colossus

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `1.25m` (In-scene visual ratio)
- **Tactical Role**: *Fast front-line attacker*

#### 🧩 Required Components (4 Part Types):
- **1x** Worn Gears (`engranajes_desgastados`) — *[Common]*
- **1x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **1x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **2x** Screws & Bolts (`tornillos_pernos`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `brujulas_magneticas:1|engranajes_desgastados:1|manometros:1|tornillos_pernos:2`
- **Hexadecimal FNV-1a Hash**: `0x08CC7119` | **Decimal**: `147616025`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **13** | **102** | **8** |

---

### Golem #038 — Batterion Destroyer

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.13m` (In-scene visual ratio)
- **Tactical Role**: *Photonic pulse sniper*

#### 🧩 Required Components (5 Part Types):
- **1x** Brass Plates (`placas_laton`) — *[Common]*
- **2x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **2x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **2x** Manhole Covers (`tapas_alcantarilla`) — *[Common]*
- **2x** Screws & Bolts (`tornillos_pernos`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cables_deshilachados:2|fusibles_fundidos:2|placas_laton:1|tapas_alcantarilla:2|tornillos_pernos:2`
- **Hexadecimal FNV-1a Hash**: `0x51093E24` | **Decimal**: `1359560228`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **20** | **21** | **84** | **8** |

---

### Golem #039 — Vaporized Servant

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.19m` (In-scene visual ratio)
- **Tactical Role**: *Heavy endurance for arena combat*

#### 🧩 Required Components (6 Part Types):
- **1x** Transistors (`transistores`) — *[Uncommon]*
- **1x** Coal Residue (`residuos_carbon`) — *[Common]*
- **1x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **2x** Steam Valves (`valvulas_vapor`) — *[Uncommon]*
- **1x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **2x** Old TV Lenses (`lentes_tv_viejo`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cables_deshilachados:1|lentes_tv_viejo:2|residuos_carbon:1|transistores:1|tuercas_gigantes:1|valvulas_vapor:2`
- **Hexadecimal FNV-1a Hash**: `0xADE1CE82` | **Decimal**: `2917256834`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **24** | **10** | **94** | **12** |

---

### Golem #040 — Luminous Forger

- **Classification**: Tier 1 (Basic)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.22m` (In-scene visual ratio)
- **Tactical Role**: *High-armor frontal defensive tank*

#### 🧩 Required Components (5 Part Types):
- **1x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*
- **2x** Cooking Pots (`ollas_cocinar`) — *[Common]*
- **1x** Broken Pocket Watches (`relojes_bolsillo`) — *[Uncommon]*
- **1x** Rusty Nails (`clavos_oxidados`) — *[Common]*
- **1x** Worn Gears (`engranajes_desgastados`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bombillas_filamento:1|clavos_oxidados:1|engranajes_desgastados:1|ollas_cocinar:2|relojes_bolsillo:1`
- **Hexadecimal FNV-1a Hash**: `0x41BF626D` | **Decimal**: `1103061613`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **14** | **107** | **8** |

---

### Golem #041 — Electric Executor

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.09m` (In-scene visual ratio)
- **Tactical Role**: *Thermal sustain and boiler control*

#### 🧩 Required Components (7 Part Types):
- **1x** Tesla Coils (`bobinas_tesla`) — *[Rare]*
- **2x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **2x** Worn Gears (`engranajes_desgastados`) — *[Common]*
- **1x** Iron Chains (`cadenas_hierro`) — *[Common]*
- **2x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **2x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **1x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bobinas_tesla:1|brujulas_magneticas:2|cadenas_hierro:1|condensador_presion:1|engranajes_desgastados:2|fusibles_fundidos:2|tubos_vacio:2`
- **Hexadecimal FNV-1a Hash**: `0xEA25E45E` | **Decimal**: `3928351838`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **38** | **16** | **129** | **14** |

---

### Golem #042 — Thermal Tracker

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.06m` (In-scene visual ratio)
- **Tactical Role**: *Versatile exploration automaton*

#### 🧩 Required Components (6 Part Types):
- **1x** Coal Residue (`residuos_carbon`) — *[Common]*
- **2x** Screws & Bolts (`tornillos_pernos`) — *[Common]*
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*
- **2x** Worn Gears (`engranajes_desgastados`) — *[Common]*
- **2x** Transistors (`transistores`) — *[Uncommon]*
- **1x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `condensador_presion:1|engranajes_desgastados:2|motor_vapor:1|residuos_carbon:1|tornillos_pernos:2|transistores:2`
- **Hexadecimal FNV-1a Hash**: `0xC37B9C33` | **Decimal**: `3279658035`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **33** | **18** | **136** | **8** |

---

### Golem #043 — Boiler Titan

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.09m` (In-scene visual ratio)
- **Tactical Role**: *Impenetrable containment colossus*

#### 🧩 Required Components (5 Part Types):
- **1x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **1x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **2x** Brass Plates (`placas_laton`) — *[Common]*
- **1x** Steam Valves (`valvulas_vapor`) — *[Uncommon]*
- **1x** Old TV Lenses (`lentes_tv_viejo`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `brujulas_magneticas:1|cables_deshilachados:1|lentes_tv_viejo:1|placas_laton:2|valvulas_vapor:1`
- **Hexadecimal FNV-1a Hash**: `0x5EE50887` | **Decimal**: `1592068231`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **24** | **18** | **111** | **14** |

---

### Golem #044 — Mechanical Walker

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `1.08m` (In-scene visual ratio)
- **Tactical Role**: *High-frequency galvanic disruptor*

#### 🧩 Required Components (6 Part Types):
- **1x** Broken Pocket Watches (`relojes_bolsillo`) — *[Uncommon]*
- **2x** Steam Valves (`valvulas_vapor`) — *[Uncommon]*
- **1x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **2x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **2x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **2x** Frayed Cables (`cables_deshilachados`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `brujulas_magneticas:2|cables_deshilachados:2|fusibles_fundidos:1|giroscopio_precision:2|relojes_bolsillo:1|valvulas_vapor:2`
- **Hexadecimal FNV-1a Hash**: `0x48CCFE74` | **Decimal**: `1221394036`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **28** | **22** | **110** | **19** |

---

### Golem #045 — Pressurized Golem

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `0.97m` (In-scene visual ratio)
- **Tactical Role**: *Vanguard unit for PK zones*

#### 🧩 Required Components (6 Part Types):
- **2x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **2x** Tin Cans (`latas_conserva`) — *[Common]*
- **2x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **1x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **2x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **2x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `brujulas_magneticas:2|condensador_presion:2|dinamo_galvanica:2|latas_conserva:2|manometros:1|palancas_interruptor:2`
- **Hexadecimal FNV-1a Hash**: `0xE052941B` | **Decimal**: `3763508251`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **33** | **16** | **186** | **12** |

---

### Golem #046 — Volcanic Sentinel

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.19m` (In-scene visual ratio)
- **Tactical Role**: *Swift-striking agile assassin*

#### 🧩 Required Components (6 Part Types):
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*
- **1x** Tesla Coils (`bobinas_tesla`) — *[Rare]*
- **1x** Steam Valves (`valvulas_vapor`) — *[Uncommon]*
- **1x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **1x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **1x** Screws & Bolts (`tornillos_pernos`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bobinas_tesla:1|condensador_presion:1|motor_vapor:1|resortes_reloj:1|tornillos_pernos:1|valvulas_vapor:1`
- **Hexadecimal FNV-1a Hash**: `0x9D737C1D` | **Decimal**: `2641591325`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **37** | **15** | **137** | **11** |

---

### Golem #047 — Conductive Defender

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `0.95m` (In-scene visual ratio)
- **Tactical Role**: *Fast front-line attacker*

#### 🧩 Required Components (5 Part Types):
- **2x** Brass Plates (`placas_laton`) — *[Common]*
- **2x** Coal Residue (`residuos_carbon`) — *[Common]*
- **2x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **2x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **1x** Copper Wire (`alambre_cobre`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `alambre_cobre:1|dinamo_galvanica:2|placas_laton:2|residuos_carbon:2|resortes_reloj:2`
- **Hexadecimal FNV-1a Hash**: `0xDD374926` | **Decimal**: `3711387942`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **33** | **19** | **127** | **17** |

---

### Golem #048 — Brazen Assembly

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `1.15m` (In-scene visual ratio)
- **Tactical Role**: *Photonic pulse sniper*

#### 🧩 Required Components (6 Part Types):
- **2x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **2x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **1x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **2x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **2x** Tin Cans (`latas_conserva`) — *[Common]*
- **1x** Cooking Pots (`ollas_cocinar`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `engranajes_bronce:2|fusibles_fundidos:2|latas_conserva:2|ollas_cocinar:1|palancas_interruptor:2|tuercas_gigantes:1`
- **Hexadecimal FNV-1a Hash**: `0x069AE1ED` | **Decimal**: `110813677`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **27** | **33** | **134** | **6** |

---

### Golem #049 — Raying Guardian

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.07m` (In-scene visual ratio)
- **Tactical Role**: *Heavy endurance for arena combat*

#### 🧩 Required Components (8 Part Types):
- **2x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*
- **1x** Tesla Coils (`bobinas_tesla`) — *[Rare]*
- **2x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **2x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **1x** Tin Cans (`latas_conserva`) — *[Common]*
- **2x** Copper Wire (`alambre_cobre`) — *[Common]*
- **1x** Rusty Nails (`clavos_oxidados`) — *[Common]*
- **2x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `alambre_cobre:2|bobinas_tesla:1|bombillas_filamento:2|clavos_oxidados:1|dinamo_galvanica:2|fusibles_fundidos:2|latas_conserva:1|palancas_interruptor:2`
- **Hexadecimal FNV-1a Hash**: `0x6F105FC9` | **Decimal**: `1863344073`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **43** | **18** | **146** | **10** |

---

### Golem #050 — Galvanic Crusader

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `0.90m` (In-scene visual ratio)
- **Tactical Role**: *High-armor frontal defensive tank*

#### 🧩 Required Components (5 Part Types):
- **1x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **1x** Copper Pipes (`tubos_cobre`) — *[Common]*
- **2x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **2x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **2x** Coal Residue (`residuos_carbon`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `dinamo_galvanica:2|fusibles_fundidos:2|residuos_carbon:2|resortes_reloj:1|tubos_cobre:1`
- **Hexadecimal FNV-1a Hash**: `0x0D74AB87` | **Decimal**: `225749895`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **37** | **12** | **136** | **10** |

---

### Golem #051 — Electric Settler

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.08m` (In-scene visual ratio)
- **Tactical Role**: *Thermal sustain and boiler control*

#### 🧩 Required Components (7 Part Types):
- **1x** LED Diodes (`diodos_led`) — *[Rare]*
- **2x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **1x** Screws & Bolts (`tornillos_pernos`) — *[Common]*
- **1x** Frying Pans (`sartenes`) — *[Common]*
- **1x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **2x** Cooking Pots (`ollas_cocinar`) — *[Common]*
- **1x** Copper Wire (`alambre_cobre`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `alambre_cobre:1|dinamo_galvanica:1|diodos_led:1|fusibles_fundidos:2|ollas_cocinar:2|sartenes:1|tornillos_pernos:1`
- **Hexadecimal FNV-1a Hash**: `0xDADD71ED` | **Decimal**: `3671945709`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **34** | **21** | **118** | **8** |

---

### Golem #052 — Filament Smelter

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.12m` (In-scene visual ratio)
- **Tactical Role**: *Versatile exploration automaton*

#### 🧩 Required Components (6 Part Types):
- **2x** Brass Plates (`placas_laton`) — *[Common]*
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*
- **1x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **1x** Rusty Nails (`clavos_oxidados`) — *[Common]*
- **2x** LED Diodes (`diodos_led`) — *[Rare]*
- **2x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `clavos_oxidados:1|diodos_led:2|manometros:1|motor_vapor:1|palancas_interruptor:2|placas_laton:2`
- **Hexadecimal FNV-1a Hash**: `0xF6C2A1FA` | **Decimal**: `4139950586`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **34** | **22** | **121** | **6** |

---

### Golem #053 — Optical Watcher

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.15m` (In-scene visual ratio)
- **Tactical Role**: *Impenetrable containment colossus*

#### 🧩 Required Components (6 Part Types):
- **2x** Resonating Quartz Crystal (`cristal_fuerza`) — *[Rare]*
- **1x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **2x** Copper Wire (`alambre_cobre`) — *[Common]*
- **1x** Transistors (`transistores`) — *[Uncommon]*
- **1x** Worn Gears (`engranajes_desgastados`) — *[Common]*
- **1x** Cooking Pots (`ollas_cocinar`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `alambre_cobre:2|brujulas_magneticas:1|cristal_fuerza:2|engranajes_desgastados:1|ollas_cocinar:1|transistores:1`
- **Hexadecimal FNV-1a Hash**: `0xFEEE95BF` | **Decimal**: `4277048767`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **24** | **15** | **112** | **23** |

---

### Golem #054 — Pneumatic Leviathan

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.10m` (In-scene visual ratio)
- **Tactical Role**: *High-frequency galvanic disruptor*

#### 🧩 Required Components (7 Part Types):
- **1x** Brass Plates (`placas_laton`) — *[Common]*
- **2x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **1x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **2x** Steam Engine (`motor_vapor`) — *[Rare]*
- **1x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **1x** Broken Pocket Watches (`relojes_bolsillo`) — *[Uncommon]*
- **2x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `baterias_alquimicas:2|condensador_presion:2|engranajes_bronce:1|motor_vapor:2|placas_laton:1|relojes_bolsillo:1|tubos_vacio:1`
- **Hexadecimal FNV-1a Hash**: `0x3FA91689` | **Decimal**: `1068045961`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **35** | **21** | **198** | **9** |

---

### Golem #055 — Pressurized Vanguard

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `0.94m` (In-scene visual ratio)
- **Tactical Role**: *Vanguard unit for PK zones*

#### 🧩 Required Components (7 Part Types):
- **2x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **1x** Copper Wire (`alambre_cobre`) — *[Common]*
- **1x** Iron Chains (`cadenas_hierro`) — *[Common]*
- **1x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **2x** Steam Engine (`motor_vapor`) — *[Rare]*
- **2x** Broken Pocket Watches (`relojes_bolsillo`) — *[Uncommon]*
- **1x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `alambre_cobre:1|cadenas_hierro:1|engranajes_bronce:1|fusibles_fundidos:1|motor_vapor:2|relojes_bolsillo:2|resortes_reloj:2`
- **Hexadecimal FNV-1a Hash**: `0x67ABCE41` | **Decimal**: `1739312705`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **35** | **21** | **114** | **23** |

---

### Golem #056 — Plasmatic Automaton

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.05m` (In-scene visual ratio)
- **Tactical Role**: *Swift-striking agile assassin*

#### 🧩 Required Components (7 Part Types):
- **1x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **2x** Old TV Lenses (`lentes_tv_viejo`) — *[Uncommon]*
- **2x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **2x** Transistors (`transistores`) — *[Uncommon]*
- **2x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **1x** Coal Residue (`residuos_carbon`) — *[Common]*
- **2x** Tesla Coils (`bobinas_tesla`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `baterias_alquimicas:2|bobinas_tesla:2|giroscopio_precision:1|lentes_tv_viejo:2|residuos_carbon:1|transistores:2|tuercas_gigantes:2`
- **Hexadecimal FNV-1a Hash**: `0xEA386292` | **Decimal**: `3929563794`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **39** | **20** | **161** | **12** |

---

### Golem #057 — Lumen Protector

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.17m` (In-scene visual ratio)
- **Tactical Role**: *Fast front-line attacker*

#### 🧩 Required Components (8 Part Types):
- **2x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **1x** Manhole Covers (`tapas_alcantarilla`) — *[Common]*
- **1x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **1x** Transistors (`transistores`) — *[Uncommon]*
- **2x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **2x** Broken Pocket Watches (`relojes_bolsillo`) — *[Uncommon]*
- **1x** Resonating Quartz Crystal (`cristal_fuerza`) — *[Rare]*
- **2x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:2|brujulas_magneticas:1|cristal_fuerza:1|palancas_interruptor:2|relojes_bolsillo:2|tapas_alcantarilla:1|transistores:1|tubos_vacio:2`
- **Hexadecimal FNV-1a Hash**: `0x72168904` | **Decimal**: `1914079492`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **31** | **19** | **111** | **32** |

---

### Golem #058 — Batterion Bearer

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `0.92m` (In-scene visual ratio)
- **Tactical Role**: *Photonic pulse sniper*

#### 🧩 Required Components (5 Part Types):
- **2x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **2x** Iron Chains (`cadenas_hierro`) — *[Common]*
- **2x** Tin Cans (`latas_conserva`) — *[Common]*
- **2x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **1x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `baterias_alquimicas:1|brujulas_magneticas:2|cadenas_hierro:2|fusibles_fundidos:2|latas_conserva:2`
- **Hexadecimal FNV-1a Hash**: `0x22D62172` | **Decimal**: `584458610`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **27** | **17** | **159** | **13** |

---

### Golem #059 — Raying Monolith

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.14m` (In-scene visual ratio)
- **Tactical Role**: *Heavy endurance for arena combat*

#### 🧩 Required Components (7 Part Types):
- **1x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **2x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **2x** Broken Pocket Watches (`relojes_bolsillo`) — *[Uncommon]*
- **1x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **2x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **1x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **1x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:2|baterias_alquimicas:2|dinamo_galvanica:1|manometros:1|palancas_interruptor:1|relojes_bolsillo:2|tubos_vacio:1`
- **Hexadecimal FNV-1a Hash**: `0xE0A1785B` | **Decimal**: `3768678491`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **30** | **14** | **177** | **24** |

---

### Golem #060 — Galvanic Scavenger

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.27m` (In-scene visual ratio)
- **Tactical Role**: *High-armor frontal defensive tank*

#### 🧩 Required Components (5 Part Types):
- **1x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **1x** Broken Pocket Watches (`relojes_bolsillo`) — *[Uncommon]*
- **1x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **1x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **2x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `brujulas_magneticas:1|dinamo_galvanica:2|engranajes_bronce:1|palancas_interruptor:1|relojes_bolsillo:1`
- **Hexadecimal FNV-1a Hash**: `0x070BE752` | **Decimal**: `118220626`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **33** | **20** | **112** | **12** |

---

### Golem #061 — Electric Excavator

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.13m` (In-scene visual ratio)
- **Tactical Role**: *Thermal sustain and boiler control*

#### 🧩 Required Components (5 Part Types):
- **2x** Iron Chains (`cadenas_hierro`) — *[Common]*
- **2x** Transistors (`transistores`) — *[Uncommon]*
- **2x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **1x** Tin Cans (`latas_conserva`) — *[Common]*
- **1x** Clock Springs (`resortes_reloj`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cadenas_hierro:2|fusibles_fundidos:2|latas_conserva:1|resortes_reloj:1|transistores:2`
- **Hexadecimal FNV-1a Hash**: `0x19196226` | **Decimal**: `421093926`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **30** | **15** | **112** | **10** |

---

### Golem #062 — Thermal Patroller

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.29m` (In-scene visual ratio)
- **Tactical Role**: *Versatile exploration automaton*

#### 🧩 Required Components (6 Part Types):
- **2x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **1x** Transistors (`transistores`) — *[Uncommon]*
- **2x** Steam Engine (`motor_vapor`) — *[Rare]*
- **1x** Old TV Lenses (`lentes_tv_viejo`) — *[Uncommon]*
- **1x** Tesla Coils (`bobinas_tesla`) — *[Rare]*
- **2x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bobinas_tesla:1|bombillas_filamento:2|lentes_tv_viejo:1|manometros:2|motor_vapor:2|transistores:1`
- **Hexadecimal FNV-1a Hash**: `0xA99305D7` | **Decimal**: `2844984791`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **39** | **11** | **156** | **9** |

---

### Golem #063 — Boiler Basilisk

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.03m` (In-scene visual ratio)
- **Tactical Role**: *Impenetrable containment colossus*

#### 🧩 Required Components (5 Part Types):
- **2x** LED Diodes (`diodos_led`) — *[Rare]*
- **2x** Coal Residue (`residuos_carbon`) — *[Common]*
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*
- **1x** Frying Pans (`sartenes`) — *[Common]*
- **2x** Steam Valves (`valvulas_vapor`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `diodos_led:2|motor_vapor:1|residuos_carbon:2|sartenes:1|valvulas_vapor:2`
- **Hexadecimal FNV-1a Hash**: `0x7E9FD10F` | **Decimal**: `2124402959`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **40** | **15** | **126** | **6** |

---

### Golem #064 — Pneumatic Guard

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.29m` (In-scene visual ratio)
- **Tactical Role**: *High-frequency galvanic disruptor*

#### 🧩 Required Components (7 Part Types):
- **1x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **2x** Transistors (`transistores`) — *[Uncommon]*
- **1x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **2x** Steam Valves (`valvulas_vapor`) — *[Uncommon]*
- **1x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **1x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **2x** Resonating Quartz Crystal (`cristal_fuerza`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `brujulas_magneticas:1|condensador_presion:1|cristal_fuerza:2|manometros:1|transistores:2|tuercas_gigantes:1|valvulas_vapor:2`
- **Hexadecimal FNV-1a Hash**: `0x23D16696` | **Decimal**: `600925846`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **32** | **14** | **144** | **19** |

---

### Golem #065 — Resonant Bulwark

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.04m` (In-scene visual ratio)
- **Tactical Role**: *Vanguard unit for PK zones*

#### 🧩 Required Components (7 Part Types):
- **1x** Tin Cans (`latas_conserva`) — *[Common]*
- **2x** Frying Pans (`sartenes`) — *[Common]*
- **1x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **1x** Cooking Pots (`ollas_cocinar`) — *[Common]*
- **1x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **2x** LED Diodes (`diodos_led`) — *[Rare]*
- **1x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `baterias_alquimicas:1|brujulas_magneticas:1|diodos_led:2|latas_conserva:1|ollas_cocinar:1|sartenes:2|tubos_vacio:1`
- **Hexadecimal FNV-1a Hash**: `0x315EEEC9` | **Decimal**: `828305097`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **33** | **20** | **147** | **9** |

---

### Golem #066 — Plasmatic Hunter

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.05m` (In-scene visual ratio)
- **Tactical Role**: *Swift-striking agile assassin*

#### 🧩 Required Components (5 Part Types):
- **2x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **1x** Tin Cans (`latas_conserva`) — *[Common]*
- **1x** Transistors (`transistores`) — *[Uncommon]*
- **2x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **1x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `dinamo_galvanica:1|fusibles_fundidos:2|latas_conserva:1|transistores:1|tubos_vacio:2`
- **Hexadecimal FNV-1a Hash**: `0x82BC15A3` | **Decimal**: `2193364387`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **40** | **12** | **118** | **6** |

---

### Golem #067 — Conductive Gunner

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.14m` (In-scene visual ratio)
- **Tactical Role**: *Fast front-line attacker*

#### 🧩 Required Components (6 Part Types):
- **2x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **1x** Coal Residue (`residuos_carbon`) — *[Common]*
- **1x** Old TV Lenses (`lentes_tv_viejo`) — *[Uncommon]*
- **1x** Steam Valves (`valvulas_vapor`) — *[Uncommon]*
- **2x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **1x** Brass Plates (`placas_laton`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `baterias_alquimicas:2|fusibles_fundidos:2|lentes_tv_viejo:1|placas_laton:1|residuos_carbon:1|valvulas_vapor:1`
- **Hexadecimal FNV-1a Hash**: `0xC64D4AE0` | **Decimal**: `3326954208`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **28** | **15** | **168** | **9** |

---

### Golem #068 — Sparkling Wraith

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.18m` (In-scene visual ratio)
- **Tactical Role**: *Photonic pulse sniper*

#### 🧩 Required Components (6 Part Types):
- **2x** Broken Pocket Watches (`relojes_bolsillo`) — *[Uncommon]*
- **1x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **2x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **2x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*
- **1x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **2x** Screws & Bolts (`tornillos_pernos`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bombillas_filamento:2|cables_deshilachados:1|palancas_interruptor:1|relojes_bolsillo:2|resortes_reloj:2|tornillos_pernos:2`
- **Hexadecimal FNV-1a Hash**: `0x2D7E7A02` | **Decimal**: `763263490`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **21** | **17** | **127** | **21** |

---

### Golem #069 — Titanic Colossus

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `0.94m` (In-scene visual ratio)
- **Tactical Role**: *Heavy endurance for arena combat*

#### 🧩 Required Components (7 Part Types):
- **2x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **1x** LED Diodes (`diodos_led`) — *[Rare]*
- **1x** Screws & Bolts (`tornillos_pernos`) — *[Common]*
- **1x** Brass Plates (`placas_laton`) — *[Common]*
- **1x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **2x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **2x** Transistors (`transistores`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `brujulas_magneticas:2|cables_deshilachados:2|diodos_led:1|palancas_interruptor:1|placas_laton:1|tornillos_pernos:1|transistores:2`
- **Hexadecimal FNV-1a Hash**: `0x94618C19` | **Decimal**: `2489420825`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **31** | **18** | **106** | **15** |

---

### Golem #070 — Geared Destroyer

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `1.25m` (In-scene visual ratio)
- **Tactical Role**: *High-armor frontal defensive tank*

#### 🧩 Required Components (6 Part Types):
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*
- **2x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **2x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **1x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **2x** Transistors (`transistores`) — *[Uncommon]*
- **2x** Old TV Lenses (`lentes_tv_viejo`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `engranajes_bronce:2|lentes_tv_viejo:2|motor_vapor:1|transistores:2|tubos_vacio:1|tuercas_gigantes:2`
- **Hexadecimal FNV-1a Hash**: `0x19CCD6B2` | **Decimal**: `432854706`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **37** | **29** | **114** | **12** |

---

### Golem #071 — Photonic Servant

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.10m` (In-scene visual ratio)
- **Tactical Role**: *Thermal sustain and boiler control*

#### 🧩 Required Components (7 Part Types):
- **2x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **2x** Copper Wire (`alambre_cobre`) — *[Common]*
- **1x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **1x** LED Diodes (`diodos_led`) — *[Rare]*
- **2x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **1x** Rusty Nails (`clavos_oxidados`) — *[Common]*
- **1x** Screws & Bolts (`tornillos_pernos`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `alambre_cobre:2|clavos_oxidados:1|diodos_led:1|giroscopio_precision:1|tornillos_pernos:1|tubos_vacio:2|tuercas_gigantes:2`
- **Hexadecimal FNV-1a Hash**: `0x2C1F137E` | **Decimal**: `740234110`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **30** | **23** | **105** | **10** |

---

### Golem #072 — Automaton Forger

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `1.13m` (In-scene visual ratio)
- **Tactical Role**: *Versatile exploration automaton*

#### 🧩 Required Components (6 Part Types):
- **2x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **2x** Screws & Bolts (`tornillos_pernos`) — *[Common]*
- **1x** Old TV Lenses (`lentes_tv_viejo`) — *[Uncommon]*
- **2x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **1x** Rusty Nails (`clavos_oxidados`) — *[Common]*
- **1x** Coal Residue (`residuos_carbon`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `clavos_oxidados:1|engranajes_bronce:2|lentes_tv_viejo:1|residuos_carbon:1|resortes_reloj:2|tornillos_pernos:2`
- **Hexadecimal FNV-1a Hash**: `0x8020B8C0` | **Decimal**: `2149628096`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **21** | **28** | **110** | **16** |

---

### Golem #073 — Ferrous Executor

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `1.06m` (In-scene visual ratio)
- **Tactical Role**: *Impenetrable containment colossus*

#### 🧩 Required Components (7 Part Types):
- **2x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **2x** Broken Pocket Watches (`relojes_bolsillo`) — *[Uncommon]*
- **1x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **2x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **2x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **2x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **1x** Frying Pans (`sartenes`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:2|cables_deshilachados:2|giroscopio_precision:1|manometros:2|relojes_bolsillo:2|resortes_reloj:2|sartenes:1`
- **Hexadecimal FNV-1a Hash**: `0x43C2713E` | **Decimal**: `1136816446`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **22** | **20** | **143** | **37** |

---

### Golem #074 — Voltaic Tracker

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.01m` (In-scene visual ratio)
- **Tactical Role**: *High-frequency galvanic disruptor*

#### 🧩 Required Components (6 Part Types):
- **1x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **1x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **2x** Copper Wire (`alambre_cobre`) — *[Common]*
- **1x** Brass Plates (`placas_laton`) — *[Common]*
- **2x** Transistors (`transistores`) — *[Uncommon]*
- **1x** Tesla Coils (`bobinas_tesla`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `alambre_cobre:2|bobinas_tesla:1|placas_laton:1|resortes_reloj:1|transistores:2|tuercas_gigantes:1`
- **Hexadecimal FNV-1a Hash**: `0xD3BBA169` | **Decimal**: `3552289129`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **34** | **17** | **109** | **14** |

---

### Golem #075 — Pressurized Titan

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.19m` (In-scene visual ratio)
- **Tactical Role**: *Vanguard unit for PK zones*

#### 🧩 Required Components (6 Part Types):
- **2x** Iron Chains (`cadenas_hierro`) — *[Common]*
- **2x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **1x** LED Diodes (`diodos_led`) — *[Rare]*
- **2x** Brass Plates (`placas_laton`) — *[Common]*
- **2x** Coal Residue (`residuos_carbon`) — *[Common]*
- **1x** Frying Pans (`sartenes`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cadenas_hierro:2|diodos_led:1|placas_laton:2|residuos_carbon:2|resortes_reloj:2|sartenes:1`
- **Hexadecimal FNV-1a Hash**: `0x0B3A4B96` | **Decimal**: `188369814`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **26** | **25** | **123** | **14** |

---

### Golem #076 — Volcanic Walker

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.15m` (In-scene visual ratio)
- **Tactical Role**: *Swift-striking agile assassin*

#### 🧩 Required Components (7 Part Types):
- **2x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **2x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **2x** Transistors (`transistores`) — *[Uncommon]*
- **1x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **1x** Coal Residue (`residuos_carbon`) — *[Common]*
- **2x** Cooking Pots (`ollas_cocinar`) — *[Common]*
- **1x** Screws & Bolts (`tornillos_pernos`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `condensador_presion:2|manometros:1|ollas_cocinar:2|residuos_carbon:1|tornillos_pernos:1|transistores:2|tuercas_gigantes:2`
- **Hexadecimal FNV-1a Hash**: `0xB138A6E0` | **Decimal**: `2973279968`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **29** | **23** | **190** | **6** |

---

### Golem #077 — Lumen Golem

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.20m` (In-scene visual ratio)
- **Tactical Role**: *Fast front-line attacker*

#### 🧩 Required Components (5 Part Types):
- **2x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*
- **1x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **1x** Coal Residue (`residuos_carbon`) — *[Common]*
- **1x** Worn Gears (`engranajes_desgastados`) — *[Common]*
- **1x** Frying Pans (`sartenes`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bombillas_filamento:2|engranajes_desgastados:1|manometros:1|residuos_carbon:1|sartenes:1`
- **Hexadecimal FNV-1a Hash**: `0xD4D903CD` | **Decimal**: `3570992077`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **22** | **16** | **153** | **7** |

---

### Golem #078 — Brazen Sentinel

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `1.02m` (In-scene visual ratio)
- **Tactical Role**: *Photonic pulse sniper*

#### 🧩 Required Components (8 Part Types):
- **1x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **2x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **2x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **1x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*
- **1x** Brass Plates (`placas_laton`) — *[Common]*
- **1x** Frayed Cables (`cables_deshilachados`) — *[Common]*
- **2x** Coal Residue (`residuos_carbon`) — *[Common]*
- **2x** Copper Wire (`alambre_cobre`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `alambre_cobre:2|bombillas_filamento:1|cables_deshilachados:1|engranajes_bronce:2|manometros:2|palancas_interruptor:1|placas_laton:1|residuos_carbon:2`
- **Hexadecimal FNV-1a Hash**: `0xFAB261F3` | **Decimal**: `4205994483`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **23** | **30** | **171** | **12** |

---

### Golem #079 — Vaporized Defender

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.01m` (In-scene visual ratio)
- **Tactical Role**: *Heavy endurance for arena combat*

#### 🧩 Required Components (6 Part Types):
- **1x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **1x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **1x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **1x** Transistors (`transistores`) — *[Uncommon]*
- **2x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **1x** Broken Pocket Watches (`relojes_bolsillo`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `baterias_alquimicas:1|condensador_presion:1|palancas_interruptor:2|relojes_bolsillo:1|transistores:1|tubos_vacio:1`
- **Hexadecimal FNV-1a Hash**: `0x1AC5AFA2` | **Decimal**: `449163170`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **28** | **16** | **155** | **9** |

---

### Golem #080 — Galvanic Assembly

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.17m` (In-scene visual ratio)
- **Tactical Role**: *High-armor frontal defensive tank*

#### 🧩 Required Components (6 Part Types):
- **1x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **2x** Manhole Covers (`tapas_alcantarilla`) — *[Common]*
- **1x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*
- **1x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **1x** Frying Pans (`sartenes`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `baterias_alquimicas:1|dinamo_galvanica:1|motor_vapor:1|resortes_reloj:1|sartenes:1|tapas_alcantarilla:2`
- **Hexadecimal FNV-1a Hash**: `0x2C2BA939` | **Decimal**: `741058873`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **32** | **21** | **135** | **10** |

---

### Golem #081 — Electric Guardian

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `0.93m` (In-scene visual ratio)
- **Tactical Role**: *Thermal sustain and boiler control*

#### 🧩 Required Components (6 Part Types):
- **1x** Manhole Covers (`tapas_alcantarilla`) — *[Common]*
- **1x** Tin Cans (`latas_conserva`) — *[Common]*
- **2x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **2x** Transistors (`transistores`) — *[Uncommon]*
- **2x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **2x** Frayed Cables (`cables_deshilachados`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cables_deshilachados:2|dinamo_galvanica:2|latas_conserva:1|tapas_alcantarilla:1|transistores:2|tubos_vacio:2`
- **Hexadecimal FNV-1a Hash**: `0x089550F7` | **Decimal**: `144003319`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **46** | **16** | **123** | **10** |

---

### Golem #082 — Automaton Crusader

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `1.09m` (In-scene visual ratio)
- **Tactical Role**: *Versatile exploration automaton*

#### 🧩 Required Components (8 Part Types):
- **1x** Tin Cans (`latas_conserva`) — *[Common]*
- **2x** Cooking Pots (`ollas_cocinar`) — *[Common]*
- **2x** Iron Chains (`cadenas_hierro`) — *[Common]*
- **1x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **2x** Copper Pipes (`tubos_cobre`) — *[Common]*
- **1x** Steam Valves (`valvulas_vapor`) — *[Uncommon]*
- **1x** Broken Pocket Watches (`relojes_bolsillo`) — *[Uncommon]*
- **2x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `brujulas_magneticas:1|cadenas_hierro:2|engranajes_bronce:2|latas_conserva:1|ollas_cocinar:2|relojes_bolsillo:1|tubos_cobre:2|valvulas_vapor:1`
- **Hexadecimal FNV-1a Hash**: `0x7630071A` | **Decimal**: `1982859034`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **23** | **31** | **144** | **12** |

---

### Golem #083 — Boiler Settler

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.05m` (In-scene visual ratio)
- **Tactical Role**: *Impenetrable containment colossus*

#### 🧩 Required Components (7 Part Types):
- **1x** Frying Pans (`sartenes`) — *[Common]*
- **1x** Old TV Lenses (`lentes_tv_viejo`) — *[Uncommon]*
- **1x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **1x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **1x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **2x** Tin Cans (`latas_conserva`) — *[Common]*
- **2x** Iron Chains (`cadenas_hierro`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cadenas_hierro:2|condensador_presion:1|fusibles_fundidos:1|latas_conserva:2|lentes_tv_viejo:1|resortes_reloj:1|sartenes:1`
- **Hexadecimal FNV-1a Hash**: `0x7FB6CCFC` | **Decimal**: `2142686460`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **23** | **18** | **142** | **13** |

---

### Golem #084 — Diodic Smelter

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.23m` (In-scene visual ratio)
- **Tactical Role**: *High-frequency galvanic disruptor*

#### 🧩 Required Components (7 Part Types):
- **1x** Tin Cans (`latas_conserva`) — *[Common]*
- **2x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **2x** Coal Residue (`residuos_carbon`) — *[Common]*
- **2x** Worn Gears (`engranajes_desgastados`) — *[Common]*
- **2x** LED Diodes (`diodos_led`) — *[Rare]*
- **1x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **1x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `brujulas_magneticas:1|diodos_led:2|engranajes_desgastados:2|latas_conserva:1|palancas_interruptor:1|residuos_carbon:2|resortes_reloj:2`
- **Hexadecimal FNV-1a Hash**: `0x1D84CBF7` | **Decimal**: `495242231`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **29** | **15** | **124** | **18** |

---

### Golem #085 — Pressurized Watcher

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.06m` (In-scene visual ratio)
- **Tactical Role**: *Vanguard unit for PK zones*

#### 🧩 Required Components (8 Part Types):
- **1x** Rusty Nails (`clavos_oxidados`) — *[Common]*
- **2x** Copper Wire (`alambre_cobre`) — *[Common]*
- **2x** Steam Valves (`valvulas_vapor`) — *[Uncommon]*
- **1x** Tesla Coils (`bobinas_tesla`) — *[Rare]*
- **1x** Tin Cans (`latas_conserva`) — *[Common]*
- **2x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **2x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **2x** Cooking Pots (`ollas_cocinar`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `alambre_cobre:2|bobinas_tesla:1|clavos_oxidados:1|latas_conserva:1|manometros:2|ollas_cocinar:2|resortes_reloj:2|valvulas_vapor:2`
- **Hexadecimal FNV-1a Hash**: `0xBBEA32B8` | **Decimal**: `3152687800`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **33** | **18** | **164** | **19** |

---

### Golem #086 — Plasmatic Leviathan

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `0.98m` (In-scene visual ratio)
- **Tactical Role**: *Swift-striking agile assassin*

#### 🧩 Required Components (8 Part Types):
- **2x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **2x** Cooking Pots (`ollas_cocinar`) — *[Common]*
- **1x** Steam Valves (`valvulas_vapor`) — *[Uncommon]*
- **2x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **1x** Copper Pipes (`tubos_cobre`) — *[Common]*
- **1x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **2x** Rusty Nails (`clavos_oxidados`) — *[Common]*
- **2x** Tin Cans (`latas_conserva`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:2|clavos_oxidados:2|dinamo_galvanica:2|latas_conserva:2|ollas_cocinar:2|tubos_cobre:1|tubos_vacio:1|valvulas_vapor:1`
- **Hexadecimal FNV-1a Hash**: `0xC7F44E8B` | **Decimal**: `3354676875`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **35** | **17** | **139** | **17** |

---

### Golem #087 — Articulated Vanguard

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `0.93m` (In-scene visual ratio)
- **Tactical Role**: *Fast front-line attacker*

#### 🧩 Required Components (7 Part Types):
- **1x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **2x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **2x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*
- **2x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **2x** Tin Cans (`latas_conserva`) — *[Common]*
- **2x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **1x** Coal Residue (`residuos_carbon`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bombillas_filamento:2|brujulas_magneticas:2|latas_conserva:2|manometros:1|palancas_interruptor:2|residuos_carbon:1|resortes_reloj:2`
- **Hexadecimal FNV-1a Hash**: `0x915AC831` | **Decimal**: `2438645809`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **22** | **16** | **173** | **20** |

---

### Golem #088 — Sparkling Automaton

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.29m` (In-scene visual ratio)
- **Tactical Role**: *Photonic pulse sniper*

#### 🧩 Required Components (5 Part Types):
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*
- **2x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **2x** Old TV Lenses (`lentes_tv_viejo`) — *[Uncommon]*
- **2x** LED Diodes (`diodos_led`) — *[Rare]*
- **1x** Resonating Quartz Crystal (`cristal_fuerza`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cristal_fuerza:1|diodos_led:2|lentes_tv_viejo:2|motor_vapor:1|tuercas_gigantes:2`
- **Hexadecimal FNV-1a Hash**: `0x895DA93B` | **Decimal**: `2304616763`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **36** | **17** | **114** | **18** |

---

### Golem #089 — Titanic Protector

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `1.13m` (In-scene visual ratio)
- **Tactical Role**: *Heavy endurance for arena combat*

#### 🧩 Required Components (7 Part Types):
- **1x** Worn Gears (`engranajes_desgastados`) — *[Common]*
- **1x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **2x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **1x** Brass Plates (`placas_laton`) — *[Common]*
- **2x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **1x** Rusty Nails (`clavos_oxidados`) — *[Common]*
- **2x** Giant Nuts (`tuercas_gigantes`) — *[Common]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `clavos_oxidados:1|engranajes_bronce:1|engranajes_desgastados:1|palancas_interruptor:2|placas_laton:1|tubos_vacio:2|tuercas_gigantes:2`
- **Hexadecimal FNV-1a Hash**: `0x1A48A703` | **Decimal**: `440968963`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **28** | **31** | **111** | **7** |

---

### Golem #090 — Geared Bearer

- **Classification**: Tier 2 (Mid)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `1.09m` (In-scene visual ratio)
- **Tactical Role**: *High-armor frontal defensive tank*

#### 🧩 Required Components (7 Part Types):
- **1x** Tin Cans (`latas_conserva`) — *[Common]*
- **2x** Old TV Lenses (`lentes_tv_viejo`) — *[Uncommon]*
- **2x** Copper Wire (`alambre_cobre`) — *[Common]*
- **2x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **2x** Giant Nuts (`tuercas_gigantes`) — *[Common]*
- **2x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*
- **2x** Clock Springs (`resortes_reloj`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `alambre_cobre:2|bombillas_filamento:2|brujulas_magneticas:2|latas_conserva:1|lentes_tv_viejo:2|resortes_reloj:2|tuercas_gigantes:2`
- **Hexadecimal FNV-1a Hash**: `0xC7FDE643` | **Decimal**: `3355305539`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **22** | **16** | **139** | **29** |

---

### Golem #091 — Primordial Monolith

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.23m` (In-scene visual ratio)
- **Tactical Role**: *Thermal sustain and boiler control*

#### 🧩 Required Components (6 Part Types):
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*
- **2x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **2x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **2x** Resonating Quartz Crystal (`cristal_fuerza`) — *[Rare]*
- **2x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **1x** Automaton Brain (`cerebro_automata`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `brujulas_magneticas:2|cerebro_automata:1|cristal_fuerza:2|dinamo_galvanica:2|motor_vapor:1|nucleo_mana:2`
- **Hexadecimal FNV-1a Hash**: `0xE35B53CE` | **Decimal**: `3814413262`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **64** | **15** | **133** | **24** |

---

### Golem #092 — Thermal Scavenger

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `0.94m` (In-scene visual ratio)
- **Tactical Role**: *Versatile exploration automaton*

#### 🧩 Required Components (8 Part Types):
- **2x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*
- **1x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **1x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **2x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **2x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **2x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **2x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:1|bateria_plasma:2|condensador_presion:1|corazon_caldera:2|engranajes_bronce:2|manometros:2|motor_vapor:1|resortes_reloj:2`
- **Hexadecimal FNV-1a Hash**: `0x88272D78` | **Decimal**: `2284268920`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **51** | **46** | **200** | **24** |

---

### Golem #093 — Boiler Excavator

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.17m` (In-scene visual ratio)
- **Tactical Role**: *Impenetrable containment colossus*

#### 🧩 Required Components (9 Part Types):
- **1x** Aether Reactor (`reactor_eter`) — *[Epic]*
- **2x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **2x** Steam Engine (`motor_vapor`) — *[Rare]*
- **2x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **2x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **1x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **2x** Old TV Lenses (`lentes_tv_viejo`) — *[Uncommon]*
- **1x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **1x** LED Diodes (`diodos_led`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:2|condensador_presion:2|diodos_led:1|lentes_tv_viejo:2|manometros:1|motor_vapor:2|nucleo_mana:1|palancas_interruptor:2|reactor_eter:1`
- **Hexadecimal FNV-1a Hash**: `0x8734D83C` | **Decimal**: `2268387388`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **58** | **20** | **191** | **26** |

---

### Golem #094 — Manatic Patroller

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.26m` (In-scene visual ratio)
- **Tactical Role**: *High-frequency galvanic disruptor*

#### 🧩 Required Components (6 Part Types):
- **1x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **1x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **2x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **2x** Old TV Lenses (`lentes_tv_viejo`) — *[Uncommon]*
- **1x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **2x** Aether Reactor (`reactor_eter`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:1|condensador_presion:1|dinamo_galvanica:2|giroscopio_precision:1|lentes_tv_viejo:2|reactor_eter:2`
- **Hexadecimal FNV-1a Hash**: `0xA0D37A02` | **Decimal**: `2698213890`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **58** | **22** | **166** | **22** |

---

### Golem #095 — Sparking Basilisk

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.05m` (In-scene visual ratio)
- **Tactical Role**: *Vanguard unit for PK zones*

#### 🧩 Required Components (8 Part Types):
- **2x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **1x** Tesla Coils (`bobinas_tesla`) — *[Rare]*
- **2x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*
- **1x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*
- **1x** Resonating Quartz Crystal (`cristal_fuerza`) — *[Rare]*
- **2x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **2x** Steam Valves (`valvulas_vapor`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:2|bateria_plasma:2|bobinas_tesla:1|cristal_fuerza:1|embolo_titanio:1|matriz_optica_solar:2|motor_vapor:1|valvulas_vapor:2`
- **Hexadecimal FNV-1a Hash**: `0xC9C46A2A` | **Decimal**: `3385092650`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **59** | **23** | **140** | **40** |

---

### Golem #096 — Volcanic Guard

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.19m` (In-scene visual ratio)
- **Tactical Role**: *Swift-striking agile assassin*

#### 🧩 Required Components (7 Part Types):
- **2x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **1x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*
- **1x** Automaton Brain (`cerebro_automata`) — *[Epic]*
- **2x** Steam Engine (`motor_vapor`) — *[Rare]*
- **1x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **2x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **2x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bombillas_filamento:1|cerebro_automata:1|embolo_titanio:2|giroscopio_precision:2|matriz_optica_solar:1|motor_vapor:2|nucleo_mana:2`
- **Hexadecimal FNV-1a Hash**: `0xC0CBE35E` | **Decimal**: `3234587486`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **64** | **42** | **158** | **17** |

---

### Golem #097 — Lumen Bulwark

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.02m` (In-scene visual ratio)
- **Tactical Role**: *Fast front-line attacker*

#### 🧩 Required Components (8 Part Types):
- **1x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **2x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **1x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **2x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **2x** Tesla Coils (`bobinas_tesla`) — *[Rare]*
- **1x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **2x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **2x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:2|bobinas_tesla:2|corazon_caldera:1|giroscopio_precision:2|matriz_optica_solar:1|nucleo_mana:1|resortes_reloj:2|tubos_vacio:2`
- **Hexadecimal FNV-1a Hash**: `0x2F0FC2A6` | **Decimal**: `789562022`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **55** | **35** | **143** | **37** |

---

### Golem #098 — Piston Hunter

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.11m` (In-scene visual ratio)
- **Tactical Role**: *Photonic pulse sniper*

#### 🧩 Required Components (6 Part Types):
- **2x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **1x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **2x** Tesla Coils (`bobinas_tesla`) — *[Rare]*
- **2x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **1x** Transistors (`transistores`) — *[Uncommon]*
- **2x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bobinas_tesla:2|condensador_presion:2|corazon_caldera:2|engranajes_bronce:1|nucleo_mana:2|transistores:1`
- **Hexadecimal FNV-1a Hash**: `0x5642F67A` | **Decimal**: `1447229050`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **58** | **37** | **176** | **9** |

---

### Golem #099 — Raying Gunner

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.11m` (In-scene visual ratio)
- **Tactical Role**: *Heavy endurance for arena combat*

#### 🧩 Required Components (6 Part Types):
- **2x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **2x** LED Diodes (`diodos_led`) — *[Rare]*
- **2x** Steam Engine (`motor_vapor`) — *[Rare]*
- **2x** Tesla Coils (`bobinas_tesla`) — *[Rare]*
- **2x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **2x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:2|bobinas_tesla:2|dinamo_galvanica:2|diodos_led:2|motor_vapor:2|nucleo_mana:2`
- **Hexadecimal FNV-1a Hash**: `0xE5DE43B2` | **Decimal**: `3856548786`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **81** | **16** | **136** | **20** |

---

### Golem #100 — Steamy Wraith

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.03m` (In-scene visual ratio)
- **Tactical Role**: *High-armor frontal defensive tank*

#### 🧩 Required Components (5 Part Types):
- **2x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **2x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **2x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **1x** Tesla Coils (`bobinas_tesla`) — *[Rare]*
- **1x** Radio Antennas (`antenas_radio`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:1|bobinas_tesla:1|corazon_caldera:2|dinamo_galvanica:2|nucleo_mana:2`
- **Hexadecimal FNV-1a Hash**: `0xE2898353` | **Decimal**: `3800662867`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **58** | **31** | **134** | **14** |

---

### Golem #101 — Smoky Colossus

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `0.93m` (In-scene visual ratio)
- **Tactical Role**: *Thermal sustain and boiler control*

#### 🧩 Required Components (6 Part Types):
- **2x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **1x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **2x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **2x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **2x** Automaton Brain (`cerebro_automata`) — *[Epic]*
- **2x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:2|brujulas_magneticas:2|cerebro_automata:2|condensador_presion:1|embolo_titanio:2|resortes_reloj:2`
- **Hexadecimal FNV-1a Hash**: `0xD2ED5188` | **Decimal**: `3538768264`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **46** | **31** | **166** | **36** |

---

### Golem #102 — Teslic Destroyer

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.26m` (In-scene visual ratio)
- **Tactical Role**: *Versatile exploration automaton*

#### 🧩 Required Components (6 Part Types):
- **2x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **1x** Resonating Quartz Crystal (`cristal_fuerza`) — *[Rare]*
- **1x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **1x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*
- **2x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:2|cristal_fuerza:1|dinamo_galvanica:2|embolo_titanio:1|manometros:1|motor_vapor:1`
- **Hexadecimal FNV-1a Hash**: `0x55212E29` | **Decimal**: `1428237865`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **62** | **24** | **163** | **15** |

---

### Golem #103 — Boiler Servant

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `0.93m` (In-scene visual ratio)
- **Tactical Role**: *Impenetrable containment colossus*

#### 🧩 Required Components (6 Part Types):
- **1x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **2x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **1x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **2x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **1x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*
- **2x** Tesla Coils (`bobinas_tesla`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:1|bobinas_tesla:2|condensador_presion:2|embolo_titanio:1|giroscopio_precision:2|matriz_optica_solar:1`
- **Hexadecimal FNV-1a Hash**: `0x972E38B0` | **Decimal**: `2536388784`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **48** | **33** | **182** | **16** |

---

### Golem #104 — Diodic Forger

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.26m` (In-scene visual ratio)
- **Tactical Role**: *High-frequency galvanic disruptor*

#### 🧩 Required Components (8 Part Types):
- **1x** Aether Reactor (`reactor_eter`) — *[Epic]*
- **2x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **2x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **2x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **2x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*
- **2x** LED Diodes (`diodos_led`) — *[Rare]*
- **1x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **2x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `baterias_alquimicas:2|bombillas_filamento:2|diodos_led:2|engranajes_bronce:1|giroscopio_precision:2|matriz_optica_solar:2|nucleo_mana:2|reactor_eter:1`
- **Hexadecimal FNV-1a Hash**: `0x2758BCFD` | **Decimal**: `660126973`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **58** | **30** | **203** | **22** |

---

### Golem #105 — Pressurized Executor

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.00m` (In-scene visual ratio)
- **Tactical Role**: *Vanguard unit for PK zones*

#### 🧩 Required Components (7 Part Types):
- **2x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **1x** Steam Valves (`valvulas_vapor`) — *[Uncommon]*
- **2x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **1x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*
- **1x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*
- **1x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `baterias_alquimicas:2|bombillas_filamento:1|corazon_caldera:2|embolo_titanio:1|manometros:1|motor_vapor:1|valvulas_vapor:1`
- **Hexadecimal FNV-1a Hash**: `0x87458522` | **Decimal**: `2269480226`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **34** | **38** | **210** | **9** |

---

### Golem #106 — Plasmatic Tracker

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.03m` (In-scene visual ratio)
- **Tactical Role**: *Swift-striking agile assassin*

#### 🧩 Required Components (8 Part Types):
- **2x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **1x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **1x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **1x** Aether Reactor (`reactor_eter`) — *[Epic]*
- **1x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **2x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **2x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:1|baterias_alquimicas:2|bombillas_filamento:2|dinamo_galvanica:2|giroscopio_precision:1|matriz_optica_solar:1|motor_vapor:1|reactor_eter:1`
- **Hexadecimal FNV-1a Hash**: `0xF2F666F6` | **Decimal**: `4076234486`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **60** | **21** | **214** | **16** |

---

### Golem #107 — Igneous Titan

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.04m` (In-scene visual ratio)
- **Tactical Role**: *Fast front-line attacker*

#### 🧩 Required Components (8 Part Types):
- **1x** Resonating Quartz Crystal (`cristal_fuerza`) — *[Rare]*
- **1x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **2x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **2x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **1x** Aether Reactor (`reactor_eter`) — *[Epic]*
- **2x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **2x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **2x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:1|baterias_alquimicas:2|condensador_presion:2|corazon_caldera:2|cristal_fuerza:1|manometros:2|reactor_eter:1|resortes_reloj:2`
- **Hexadecimal FNV-1a Hash**: `0x7511FBA4` | **Decimal**: `1964112804`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **45** | **32** | **260** | **22** |

---

### Golem #108 — Dragonic Walker

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.17m` (In-scene visual ratio)
- **Tactical Role**: *Photonic pulse sniper*

#### 🧩 Required Components (8 Part Types):
- **1x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **1x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **1x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **2x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **1x** LED Diodes (`diodos_led`) — *[Rare]*
- **2x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **2x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **1x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:2|condensador_presion:1|diodos_led:1|engranajes_bronce:1|fusibles_fundidos:1|nucleo_mana:2|resortes_reloj:1|tubos_vacio:2`
- **Hexadecimal FNV-1a Hash**: `0x6CE36B1F` | **Decimal**: `1826843423`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **58** | **23** | **166** | **26** |

---

### Golem #109 — Vaporized Golem

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `0.92m` (In-scene visual ratio)
- **Tactical Role**: *Heavy endurance for arena combat*

#### 🧩 Required Components (8 Part Types):
- **2x** LED Diodes (`diodos_led`) — *[Rare]*
- **1x** Automaton Brain (`cerebro_automata`) — *[Epic]*
- **1x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*
- **1x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*
- **1x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **2x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **1x** Resonating Quartz Crystal (`cristal_fuerza`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cerebro_automata:1|condensador_presion:2|corazon_caldera:1|cristal_fuerza:1|diodos_led:2|embolo_titanio:1|motor_vapor:1|resortes_reloj:1`
- **Hexadecimal FNV-1a Hash**: `0xF332D8E5` | **Decimal**: `4080195813`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **47** | **30** | **173** | **17** |

---

### Golem #110 — Geared Sentinel

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `1.25m` (In-scene visual ratio)
- **Tactical Role**: *High-armor frontal defensive tank*

#### 🧩 Required Components (7 Part Types):
- **1x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **2x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **1x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **2x** Resonating Quartz Crystal (`cristal_fuerza`) — *[Rare]*
- **2x** Steam Engine (`motor_vapor`) — *[Rare]*
- **1x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **1x** Radio Antennas (`antenas_radio`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:1|baterias_alquimicas:1|cristal_fuerza:2|engranajes_bronce:2|giroscopio_precision:1|motor_vapor:2|nucleo_mana:1`
- **Hexadecimal FNV-1a Hash**: `0xC5E014C3` | **Decimal**: `3319796931`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **44** | **31** | **157** | **24** |

---

### Golem #111 — Clockwork Defender

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `0.91m` (In-scene visual ratio)
- **Tactical Role**: *Thermal sustain and boiler control*

#### 🧩 Required Components (7 Part Types):
- **1x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **2x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **2x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **2x** LED Diodes (`diodos_led`) — *[Rare]*
- **2x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **1x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **1x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:1|bombillas_filamento:1|diodos_led:2|engranajes_bronce:2|giroscopio_precision:2|matriz_optica_solar:1|palancas_interruptor:2`
- **Hexadecimal FNV-1a Hash**: `0x50F44EBF` | **Decimal**: `1358188223`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **45** | **43** | **155** | **16** |

---

### Golem #112 — Filament Assembly

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Luminous** (`LUMINOUS`) — *Vacuum photonics, beats Aether (+40%)*
- **Emissive PBR Color**: `#2ECC71` (RGB: `46, 204, 113`)
- **Height Scale**: `1.17m` (In-scene visual ratio)
- **Tactical Role**: *Versatile exploration automaton*

#### 🧩 Required Components (5 Part Types):
- **2x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **1x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **2x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **2x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **2x** Pressure Gauges (`manometros`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:2|baterias_alquimicas:2|corazon_caldera:1|manometros:2|matriz_optica_solar:2`
- **Hexadecimal FNV-1a Hash**: `0xA23FCBAF` | **Decimal**: `2722089903`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **28** | **24** | **220** | **35** |

---

### Golem #113 — Ferrous Guardian

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `0.91m` (In-scene visual ratio)
- **Tactical Role**: *Impenetrable containment colossus*

#### 🧩 Required Components (8 Part Types):
- **2x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **1x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **1x** Magnetic Compasses (`brujulas_magneticas`) — *[Uncommon]*
- **1x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **2x** Transistors (`transistores`) — *[Uncommon]*
- **2x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*
- **1x** LED Diodes (`diodos_led`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:2|baterias_alquimicas:1|brujulas_magneticas:1|dinamo_galvanica:1|diodos_led:1|giroscopio_precision:2|motor_vapor:1|transistores:2`
- **Hexadecimal FNV-1a Hash**: `0x911E9C5B` | **Decimal**: `2434702427`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **47** | **25** | **162** | **24** |

---

### Golem #114 — Pneumatic Crusader

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.09m` (In-scene visual ratio)
- **Tactical Role**: *High-frequency galvanic disruptor*

#### 🧩 Required Components (7 Part Types):
- **2x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **1x** Broken Pocket Watches (`relojes_bolsillo`) — *[Uncommon]*
- **1x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **1x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **1x** Resonating Quartz Crystal (`cristal_fuerza`) — *[Rare]*
- **2x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **2x** Boiler Heart (`corazon_caldera`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `corazon_caldera:2|cristal_fuerza:1|engranajes_bronce:2|nucleo_mana:2|palancas_interruptor:1|relojes_bolsillo:1|tubos_vacio:1`
- **Hexadecimal FNV-1a Hash**: `0x09594F6B` | **Decimal**: `156847979`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **46** | **45** | **136** | **16** |

---

### Golem #115 — Singular Settler

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.08m` (In-scene visual ratio)
- **Tactical Role**: *Vanguard unit for PK zones*

#### 🧩 Required Components (6 Part Types):
- **1x** LED Diodes (`diodos_led`) — *[Rare]*
- **1x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **2x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **1x** Steam Valves (`valvulas_vapor`) — *[Uncommon]*
- **1x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **2x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `condensador_presion:2|diodos_led:1|engranajes_bronce:1|matriz_optica_solar:1|nucleo_mana:2|valvulas_vapor:1`
- **Hexadecimal FNV-1a Hash**: `0x59F38689` | **Decimal**: `1509131913`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **49** | **22** | **176** | **16** |

---

### Golem #116 — Mystic Smelter

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.02m` (In-scene visual ratio)
- **Tactical Role**: *Swift-striking agile assassin*

#### 🧩 Required Components (6 Part Types):
- **1x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **1x** Aether Reactor (`reactor_eter`) — *[Epic]*
- **1x** LED Diodes (`diodos_led`) — *[Rare]*
- **1x** Automaton Brain (`cerebro_automata`) — *[Epic]*
- **1x** Resonating Quartz Crystal (`cristal_fuerza`) — *[Rare]*
- **1x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `baterias_alquimicas:1|cerebro_automata:1|cristal_fuerza:1|diodos_led:1|nucleo_mana:1|reactor_eter:1`
- **Hexadecimal FNV-1a Hash**: `0x64A8237A` | **Decimal**: `1688740730`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **58** | **16** | **167** | **14** |

---

### Golem #117 — Igneous Watcher

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.13m` (In-scene visual ratio)
- **Tactical Role**: *Fast front-line attacker*

#### 🧩 Required Components (5 Part Types):
- **2x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **2x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **1x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **2x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*
- **1x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:2|condensador_presion:1|embolo_titanio:2|engranajes_bronce:2|manometros:1`
- **Hexadecimal FNV-1a Hash**: `0xCFFB2DBD` | **Decimal**: `3489344957`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **46** | **44** | **184** | **9** |

---

### Golem #118 — Piston Leviathan

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.28m` (In-scene visual ratio)
- **Tactical Role**: *Photonic pulse sniper*

#### 🧩 Required Components (9 Part Types):
- **2x** Steam Engine (`motor_vapor`) — *[Rare]*
- **2x** Broken Pocket Watches (`relojes_bolsillo`) — *[Uncommon]*
- **1x** Automaton Brain (`cerebro_automata`) — *[Epic]*
- **2x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **1x** Clock Springs (`resortes_reloj`) — *[Uncommon]*
- **2x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **2x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **2x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **2x** Aether Reactor (`reactor_eter`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:2|cerebro_automata:1|condensador_presion:2|dinamo_galvanica:2|engranajes_bronce:2|motor_vapor:2|reactor_eter:2|relojes_bolsillo:2|resortes_reloj:1`
- **Hexadecimal FNV-1a Hash**: `0xE0B894BE` | **Decimal**: `3770193086`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **70** | **27** | **171** | **29** |

---

### Golem #119 — Vaporized Vanguard

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.02m` (In-scene visual ratio)
- **Tactical Role**: *Heavy endurance for arena combat*

#### 🧩 Required Components (6 Part Types):
- **2x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **2x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **2x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*
- **2x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **1x** Pressure Gauges (`manometros`) — *[Uncommon]*
- **2x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:2|baterias_alquimicas:2|condensador_presion:2|embolo_titanio:2|manometros:1|matriz_optica_solar:2`
- **Hexadecimal FNV-1a Hash**: `0xD900D358` | **Decimal**: `3640709976`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **27** | **29** | **238** | **34** |

---

### Golem #120 — Galvanic Automaton

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.21m` (In-scene visual ratio)
- **Tactical Role**: *High-armor frontal defensive tank*

#### 🧩 Required Components (6 Part Types):
- **1x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **1x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **1x** Transistors (`transistores`) — *[Uncommon]*
- **1x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **2x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*
- **1x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:1|baterias_alquimicas:1|condensador_presion:1|matriz_optica_solar:1|palancas_interruptor:2|transistores:1`
- **Hexadecimal FNV-1a Hash**: `0x4555E4A0` | **Decimal**: `1163256992`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **40** | **20** | **189** | **16** |

---

### Golem #121 — Primordial Protector

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.13m` (In-scene visual ratio)
- **Tactical Role**: *Thermal sustain and boiler control*

#### 🧩 Required Components (9 Part Types):
- **2x** Aether Reactor (`reactor_eter`) — *[Epic]*
- **1x** Tesla Coils (`bobinas_tesla`) — *[Rare]*
- **2x** Filament Bulbs (`bombillas_filamento`) — *[Uncommon]*
- **1x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **2x** Steam Valves (`valvulas_vapor`) — *[Uncommon]*
- **1x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **1x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **1x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **2x** Switch Levers (`palancas_interruptor`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:1|bobinas_tesla:1|bombillas_filamento:2|condensador_presion:1|engranajes_bronce:1|matriz_optica_solar:1|palancas_interruptor:2|reactor_eter:2|valvulas_vapor:2`
- **Hexadecimal FNV-1a Hash**: `0x8E4F5829` | **Decimal**: `2387564585`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **67** | **27** | **193** | **17** |

---

### Golem #122 — Thermal Bearer

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.05m` (In-scene visual ratio)
- **Tactical Role**: *Versatile exploration automaton*

#### 🧩 Required Components (8 Part Types):
- **2x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*
- **2x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*
- **2x** Steam Engine (`motor_vapor`) — *[Rare]*
- **1x** Resonating Quartz Crystal (`cristal_fuerza`) — *[Rare]*
- **1x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **1x** Aether Reactor (`reactor_eter`) — *[Epic]*
- **2x** Tesla Coils (`bobinas_tesla`) — *[Rare]*
- **2x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `baterias_alquimicas:1|bobinas_tesla:2|cristal_fuerza:1|dinamo_galvanica:2|embolo_titanio:2|motor_vapor:2|reactor_eter:1|tubos_vacio:2`
- **Hexadecimal FNV-1a Hash**: `0xB7CA0C0E` | **Decimal**: `3083471886`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **71** | **29** | **157** | **13** |

---

### Golem #123 — Ferrous Monolith

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Mechanical** (`MECHANICAL`) — *Rigid clockwork structure, beats Galvanic (+40%)*
- **Emissive PBR Color**: `#F1C40F` (RGB: `241, 196, 15`)
- **Height Scale**: `0.98m` (In-scene visual ratio)
- **Tactical Role**: *Impenetrable containment colossus*

#### 🧩 Required Components (8 Part Types):
- **1x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **1x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **2x** Resonating Quartz Crystal (`cristal_fuerza`) — *[Rare]*
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*
- **2x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **2x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **2x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **2x** Automaton Brain (`cerebro_automata`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `baterias_alquimicas:2|cerebro_automata:2|cristal_fuerza:2|dinamo_galvanica:1|fusibles_fundidos:2|giroscopio_precision:1|motor_vapor:1|nucleo_mana:2`
- **Hexadecimal FNV-1a Hash**: `0x4FE69888` | **Decimal**: `1340512392`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **78** | **22** | **200** | **20** |

---

### Golem #124 — Voltaic Scavenger

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.16m` (In-scene visual ratio)
- **Tactical Role**: *High-frequency galvanic disruptor*

#### 🧩 Required Components (8 Part Types):
- **1x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **2x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **1x** Blown Fuses (`fusibles_fundidos`) — *[Uncommon]*
- **2x** Tesla Coils (`bobinas_tesla`) — *[Rare]*
- **2x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **2x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **1x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*
- **1x** Aether Reactor (`reactor_eter`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:2|baterias_alquimicas:2|bobinas_tesla:2|condensador_presion:2|embolo_titanio:1|fusibles_fundidos:1|giroscopio_precision:1|reactor_eter:1`
- **Hexadecimal FNV-1a Hash**: `0xC64DC114` | **Decimal**: `3326984468`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **51** | **28** | **230** | **21** |

---

### Golem #125 — Singular Excavator

- **Classification**: Tier 3 (Advanced)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.30m` (In-scene visual ratio)
- **Tactical Role**: *Vanguard unit for PK zones*

#### 🧩 Required Components (9 Part Types):
- **2x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **2x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **2x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **1x** Transistors (`transistores`) — *[Uncommon]*
- **1x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **1x** Old TV Lenses (`lentes_tv_viejo`) — *[Uncommon]*
- **1x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **2x** Aether Reactor (`reactor_eter`) — *[Epic]*
- **1x** Vacuum Tubes (`tubos_vacio`) — *[Uncommon]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:1|corazon_caldera:2|dinamo_galvanica:1|engranajes_bronce:2|lentes_tv_viejo:1|nucleo_mana:2|reactor_eter:2|transistores:1|tubos_vacio:1`
- **Hexadecimal FNV-1a Hash**: `0x6D27819E` | **Decimal**: `1831305630`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **69** | **42** | **133** | **17** |

---

### Golem #126 — Mystic Patroller

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.06m` (In-scene visual ratio)
- **Tactical Role**: *Swift-striking agile assassin*

#### 🧩 Required Components (6 Part Types):
- **3x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **3x** Aether Reactor (`reactor_eter`) — *[Epic]*
- **3x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **3x** LED Diodes (`diodos_led`) — *[Rare]*
- **2x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **1x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:3|bateria_plasma:3|corazon_caldera:2|diodos_led:3|nucleo_mana:1|reactor_eter:3`
- **Hexadecimal FNV-1a Hash**: `0xEBCFA13F` | **Decimal**: `3956252991`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **111** | **40** | **187** | **31** |

---

### Golem #127 — Conductive Basilisk

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Galvanic** (`GALVANIC`) — *High impulsive voltage, beats Luminous (+40%)*
- **Emissive PBR Color**: `#3498DB` (RGB: `52, 152, 219`)
- **Height Scale**: `1.22m` (In-scene visual ratio)
- **Tactical Role**: *Fast front-line attacker*

#### 🧩 Required Components (6 Part Types):
- **1x** Resonating Quartz Crystal (`cristal_fuerza`) — *[Rare]*
- **3x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **1x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **2x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **2x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **2x** Tesla Coils (`bobinas_tesla`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `baterias_alquimicas:3|bobinas_tesla:2|cristal_fuerza:1|dinamo_galvanica:2|matriz_optica_solar:1|nucleo_mana:2`
- **Hexadecimal FNV-1a Hash**: `0x24CAA3B0` | **Decimal**: `617259952`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **71** | **21** | **245** | **23** |

---

### Golem #128 — Dragonic Guard

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.12m` (In-scene visual ratio)
- **Tactical Role**: *Photonic pulse sniper*

#### 🧩 Required Components (9 Part Types):
- **2x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **2x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **1x** LED Diodes (`diodos_led`) — *[Rare]*
- **2x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **1x** Aetheric Singularity (`singularidad_eterica`) — *[Legendary]*
- **3x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **1x** Tesla Coils (`bobinas_tesla`) — *[Rare]*
- **2x** Aether Reactor (`reactor_eter`) — *[Epic]*
- **3x** Celestial Gear Reliquary (`relicario_astral`) — *[Legendary]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bobinas_tesla:1|corazon_caldera:2|diodos_led:1|engranajes_bronce:2|matriz_optica_solar:2|nucleo_mana:3|reactor_eter:2|relicario_astral:3|singularidad_eterica:1`
- **Hexadecimal FNV-1a Hash**: `0x46D47FAB` | **Decimal**: `1188331435`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **100** | **80** | **270** | **32** |

---

### Golem #129 — Arcane Bulwark

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.02m` (In-scene visual ratio)
- **Tactical Role**: *Heavy endurance for arena combat*

#### 🧩 Required Components (7 Part Types):
- **2x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **2x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **3x** Celestial Gear Reliquary (`relicario_astral`) — *[Legendary]*
- **2x** Primordial Golem Heart (`corazon_primigenio`) — *[Legendary]*
- **2x** Aetheric Singularity (`singularidad_eterica`) — *[Legendary]*
- **2x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **3x** Aether Reactor (`reactor_eter`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `corazon_caldera:2|corazon_primigenio:2|engranajes_bronce:2|nucleo_mana:2|reactor_eter:3|relicario_astral:3|singularidad_eterica:2`
- **Hexadecimal FNV-1a Hash**: `0x19B207C0` | **Decimal**: `431097792`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **112** | **89** | **307** | **30** |

---

### Golem #130 — Steamy Hunter

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.02m` (In-scene visual ratio)
- **Tactical Role**: *High-armor frontal defensive tank*

#### 🧩 Required Components (7 Part Types):
- **1x** Aetheric Singularity (`singularidad_eterica`) — *[Legendary]*
- **2x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **3x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **2x** Steam Engine (`motor_vapor`) — *[Rare]*
- **2x** Mechanical Dragon Eye (`ojo_dragon`) — *[Legendary]*
- **1x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*
- **1x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:2|condensador_presion:3|dinamo_galvanica:1|embolo_titanio:1|motor_vapor:2|ojo_dragon:2|singularidad_eterica:1`
- **Hexadecimal FNV-1a Hash**: `0x583C0DB6` | **Decimal**: `1480330678`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **104** | **28** | **233** | **17** |

---

### Golem #131 — Primordial Gunner

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.20m` (In-scene visual ratio)
- **Tactical Role**: *Thermal sustain and boiler control*

#### 🧩 Required Components (8 Part Types):
- **3x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **2x** Automaton Brain (`cerebro_automata`) — *[Epic]*
- **2x** Tesla Coils (`bobinas_tesla`) — *[Rare]*
- **3x** Aether Reactor (`reactor_eter`) — *[Epic]*
- **1x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **2x** Primordial Golem Heart (`corazon_primigenio`) — *[Legendary]*
- **3x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **2x** Resonating Quartz Crystal (`cristal_fuerza`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:1|bobinas_tesla:2|cerebro_automata:2|corazon_caldera:3|corazon_primigenio:2|cristal_fuerza:2|giroscopio_precision:3|reactor_eter:3`
- **Hexadecimal FNV-1a Hash**: `0xBC507BAE` | **Decimal**: `3159391150`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **107** | **70** | **216** | **27** |

---

### Golem #132 — Reliquary Wraith

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.00m` (In-scene visual ratio)
- **Tactical Role**: *Versatile exploration automaton*

#### 🧩 Required Components (7 Part Types):
- **1x** Primordial Golem Heart (`corazon_primigenio`) — *[Legendary]*
- **2x** Mechanical Dragon Eye (`ojo_dragon`) — *[Legendary]*
- **2x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **1x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **1x** Celestial Gear Reliquary (`relicario_astral`) — *[Legendary]*
- **2x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **3x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:3|corazon_caldera:1|corazon_primigenio:1|dinamo_galvanica:2|nucleo_mana:2|ojo_dragon:2|relicario_astral:1`
- **Hexadecimal FNV-1a Hash**: `0x570CD718` | **Decimal**: `1460459288`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **115** | **44** | **223** | **15** |

---

### Golem #133 — Astral Colossus

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `0.96m` (In-scene visual ratio)
- **Tactical Role**: *Impenetrable containment colossus*

#### 🧩 Required Components (7 Part Types):
- **3x** Primordial Golem Heart (`corazon_primigenio`) — *[Legendary]*
- **1x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **1x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **3x** Celestial Gear Reliquary (`relicario_astral`) — *[Legendary]*
- **1x** Tesla Coils (`bobinas_tesla`) — *[Rare]*
- **1x** Automaton Brain (`cerebro_automata`) — *[Epic]*
- **1x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:1|bateria_plasma:1|bobinas_tesla:1|cerebro_automata:1|corazon_primigenio:3|matriz_optica_solar:1|relicario_astral:3`
- **Hexadecimal FNV-1a Hash**: `0x95B790BA` | **Decimal**: `2511835322`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **74** | **68** | **337** | **35** |

---

### Golem #134 — Manatic Destroyer

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.17m` (In-scene visual ratio)
- **Tactical Role**: *High-frequency galvanic disruptor*

#### 🧩 Required Components (8 Part Types):
- **2x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **2x** Celestial Gear Reliquary (`relicario_astral`) — *[Legendary]*
- **2x** Steam Engine (`motor_vapor`) — *[Rare]*
- **3x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **3x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **2x** Aetheric Singularity (`singularidad_eterica`) — *[Legendary]*
- **2x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **3x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:3|bateria_plasma:3|corazon_caldera:2|matriz_optica_solar:2|motor_vapor:2|nucleo_mana:3|relicario_astral:2|singularidad_eterica:2`
- **Hexadecimal FNV-1a Hash**: `0x846868FB` | **Decimal**: `2221435131`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **116** | **57** | **235** | **55** |

---

### Golem #135 — Singular Servant

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.14m` (In-scene visual ratio)
- **Tactical Role**: *Vanguard unit for PK zones*

#### 🧩 Required Components (9 Part Types):
- **3x** Tesla Coils (`bobinas_tesla`) — *[Rare]*
- **3x** Celestial Gear Reliquary (`relicario_astral`) — *[Legendary]*
- **2x** Aetheric Singularity (`singularidad_eterica`) — *[Legendary]*
- **1x** Primordial Golem Heart (`corazon_primigenio`) — *[Legendary]*
- **2x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **1x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **3x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **2x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **2x** Mechanical Dragon Eye (`ojo_dragon`) — *[Legendary]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:1|bateria_plasma:3|bobinas_tesla:3|condensador_presion:2|corazon_primigenio:1|giroscopio_precision:2|ojo_dragon:2|relicario_astral:3|singularidad_eterica:2`
- **Hexadecimal FNV-1a Hash**: `0x53641CE0` | **Decimal**: `1399069920`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **136** | **68** | **333** | **33** |

---

### Golem #136 — Mystic Forger

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.27m` (In-scene visual ratio)
- **Tactical Role**: *Swift-striking agile assassin*

#### 🧩 Required Components (9 Part Types):
- **2x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **3x** Celestial Gear Reliquary (`relicario_astral`) — *[Legendary]*
- **1x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **1x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **3x** Mechanical Dragon Eye (`ojo_dragon`) — *[Legendary]*
- **3x** Primordial Golem Heart (`corazon_primigenio`) — *[Legendary]*
- **2x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **3x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **1x** Tesla Coils (`bobinas_tesla`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `baterias_alquimicas:1|bobinas_tesla:1|condensador_presion:2|corazon_caldera:1|corazon_primigenio:3|engranajes_bronce:3|matriz_optica_solar:2|ojo_dragon:3|relicario_astral:3`
- **Hexadecimal FNV-1a Hash**: `0xD9CCF339` | **Decimal**: `3654087481`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **94** | **88** | **375** | **33** |

---

### Golem #137 — Cosmic Executor

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `0.93m` (In-scene visual ratio)
- **Tactical Role**: *Fast front-line attacker*

#### 🧩 Required Components (7 Part Types):
- **3x** Aether Reactor (`reactor_eter`) — *[Epic]*
- **1x** Celestial Gear Reliquary (`relicario_astral`) — *[Legendary]*
- **1x** Mechanical Dragon Eye (`ojo_dragon`) — *[Legendary]*
- **1x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **2x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **3x** Steam Engine (`motor_vapor`) — *[Rare]*
- **1x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:1|corazon_caldera:2|matriz_optica_solar:1|motor_vapor:3|ojo_dragon:1|reactor_eter:3|relicario_astral:1`
- **Hexadecimal FNV-1a Hash**: `0xCED90932` | **Decimal**: `3470330162`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **97** | **47** | **204** | **18** |

---

### Golem #138 — Piston Tracker

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.25m` (In-scene visual ratio)
- **Tactical Role**: *Photonic pulse sniper*

#### 🧩 Required Components (8 Part Types):
- **1x** Primordial Golem Heart (`corazon_primigenio`) — *[Legendary]*
- **3x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **2x** Aether Reactor (`reactor_eter`) — *[Epic]*
- **2x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **2x** Alchemical Batteries (`baterias_alquimicas`) — *[Rare]*
- **3x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **3x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*
- **3x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:2|baterias_alquimicas:2|condensador_presion:3|corazon_caldera:3|corazon_primigenio:1|embolo_titanio:3|engranajes_bronce:3|reactor_eter:2`
- **Hexadecimal FNV-1a Hash**: `0xE9896061` | **Decimal**: `3918094433`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **56** | **86** | **295** | **26** |

---

### Golem #139 — Arcane Titan

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `0.98m` (In-scene visual ratio)
- **Tactical Role**: *Heavy endurance for arena combat*

#### 🧩 Required Components (7 Part Types):
- **2x** Automaton Brain (`cerebro_automata`) — *[Epic]*
- **2x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **1x** Mechanical Dragon Eye (`ojo_dragon`) — *[Legendary]*
- **2x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **3x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **3x** Celestial Gear Reliquary (`relicario_astral`) — *[Legendary]*
- **2x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:2|bateria_plasma:3|cerebro_automata:2|embolo_titanio:2|giroscopio_precision:2|ojo_dragon:1|relicario_astral:3`
- **Hexadecimal FNV-1a Hash**: `0xC94B6412` | **Decimal**: `3377161234`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **92** | **78** | **275** | **24** |

---

### Golem #140 — Aetheric Walker

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `0.90m` (In-scene visual ratio)
- **Tactical Role**: *High-armor frontal defensive tank*

#### 🧩 Required Components (6 Part Types):
- **3x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*
- **2x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **1x** Aetheric Singularity (`singularidad_eterica`) — *[Legendary]*
- **1x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **2x** Aether Reactor (`reactor_eter`) — *[Epic]*
- **2x** Primordial Golem Heart (`corazon_primigenio`) — *[Legendary]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:1|corazon_primigenio:2|embolo_titanio:3|nucleo_mana:2|reactor_eter:2|singularidad_eterica:1`
- **Hexadecimal FNV-1a Hash**: `0xB5270716` | **Decimal**: `3039233814`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **96** | **51** | **211** | **23** |

---

### Golem #141 — Primordial Golem

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `0.96m` (In-scene visual ratio)
- **Tactical Role**: *Thermal sustain and boiler control*

#### 🧩 Required Components (7 Part Types):
- **2x** Aether Reactor (`reactor_eter`) — *[Epic]*
- **3x** Automaton Brain (`cerebro_automata`) — *[Epic]*
- **1x** LED Diodes (`diodos_led`) — *[Rare]*
- **3x** Aetheric Singularity (`singularidad_eterica`) — *[Legendary]*
- **1x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **1x** Mechanical Dragon Eye (`ojo_dragon`) — *[Legendary]*
- **1x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cerebro_automata:3|condensador_presion:1|dinamo_galvanica:1|diodos_led:1|ojo_dragon:1|reactor_eter:2|singularidad_eterica:3`
- **Hexadecimal FNV-1a Hash**: `0x63744B5E` | **Decimal**: `1668565854`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **144** | **23** | **210** | **32** |

---

### Golem #142 — Reliquary Sentinel

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.01m` (In-scene visual ratio)
- **Tactical Role**: *Versatile exploration automaton*

#### 🧩 Required Components (7 Part Types):
- **2x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **2x** Mechanical Dragon Eye (`ojo_dragon`) — *[Legendary]*
- **3x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **2x** Celestial Gear Reliquary (`relicario_astral`) — *[Legendary]*
- **2x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*
- **3x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:2|dinamo_galvanica:3|engranajes_bronce:3|motor_vapor:1|nucleo_mana:2|ojo_dragon:2|relicario_astral:2`
- **Hexadecimal FNV-1a Hash**: `0xAAA9CD70` | **Decimal**: `2863254896`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **118** | **61** | **245** | **12** |

---

### Golem #143 — Astral Defender

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.22m` (In-scene visual ratio)
- **Tactical Role**: *Impenetrable containment colossus*

#### 🧩 Required Components (8 Part Types):
- **3x** Celestial Gear Reliquary (`relicario_astral`) — *[Legendary]*
- **1x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **1x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **1x** Mechanical Dragon Eye (`ojo_dragon`) — *[Legendary]*
- **1x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **3x** LED Diodes (`diodos_led`) — *[Rare]*
- **3x** Aetheric Singularity (`singularidad_eterica`) — *[Legendary]*
- **3x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:1|corazon_caldera:1|dinamo_galvanica:1|diodos_led:3|embolo_titanio:3|ojo_dragon:1|relicario_astral:3|singularidad_eterica:3`
- **Hexadecimal FNV-1a Hash**: `0x12A99ACD` | **Decimal**: `313105101`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **99** | **78** | **259** | **35** |

---

### Golem #144 — Pneumatic Assembly

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Steam** (`STEAM`) — *Pressurized thermal force, beats Mechanical (+40%)*
- **Emissive PBR Color**: `#E67E22` (RGB: `230, 126, 34`)
- **Height Scale**: `1.15m` (In-scene visual ratio)
- **Tactical Role**: *High-frequency galvanic disruptor*

#### 🧩 Required Components (7 Part Types):
- **3x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **2x** Steam Engine (`motor_vapor`) — *[Rare]*
- **3x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **2x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*
- **3x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **3x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **1x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:3|corazon_caldera:3|dinamo_galvanica:3|embolo_titanio:1|giroscopio_precision:2|motor_vapor:2|nucleo_mana:3`
- **Hexadecimal FNV-1a Hash**: `0xA273016D` | **Decimal**: `2725445997`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **114** | **66** | **189** | **13** |

---

### Golem #145 — Singular Guardian

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `0.91m` (In-scene visual ratio)
- **Tactical Role**: *Vanguard unit for PK zones*

#### 🧩 Required Components (10 Part Types):
- **3x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **3x** Aetheric Singularity (`singularidad_eterica`) — *[Legendary]*
- **2x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **3x** Mechanical Dragon Eye (`ojo_dragon`) — *[Legendary]*
- **2x** Steam Engine (`motor_vapor`) — *[Rare]*
- **3x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **2x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **1x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **3x** Automaton Brain (`cerebro_automata`) — *[Epic]*
- **3x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:3|cerebro_automata:3|condensador_presion:3|corazon_caldera:3|engranajes_bronce:2|matriz_optica_solar:2|motor_vapor:2|nucleo_mana:1|ojo_dragon:3|singularidad_eterica:3`
- **Hexadecimal FNV-1a Hash**: `0x6AEFA1B7` | **Decimal**: `1794089399`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **176** | **57** | **235** | **43** |

---

### Golem #146 — Mystic Crusader

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.01m` (In-scene visual ratio)
- **Tactical Role**: *Swift-striking agile assassin*

#### 🧩 Required Components (5 Part Types):
- **1x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **1x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **1x** Automaton Brain (`cerebro_automata`) — *[Epic]*
- **2x** Celestial Gear Reliquary (`relicario_astral`) — *[Legendary]*
- **2x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `cerebro_automata:1|condensador_presion:2|matriz_optica_solar:1|nucleo_mana:1|relicario_astral:2`
- **Hexadecimal FNV-1a Hash**: `0xAB1270DA` | **Decimal**: `2870112474`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **54** | **44** | **291** | **20** |

---

### Golem #147 — Cosmic Settler

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `0.90m` (In-scene visual ratio)
- **Tactical Role**: *Fast front-line attacker*

#### 🧩 Required Components (10 Part Types):
- **3x** Celestial Gear Reliquary (`relicario_astral`) — *[Legendary]*
- **1x** Primordial Golem Heart (`corazon_primigenio`) — *[Legendary]*
- **3x** Aetheric Singularity (`singularidad_eterica`) — *[Legendary]*
- **3x** Automaton Brain (`cerebro_automata`) — *[Epic]*
- **1x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **1x** LED Diodes (`diodos_led`) — *[Rare]*
- **1x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **3x** Condensed Mana Core (`nucleo_mana`) — *[Epic]*
- **2x** Forged Titanium Piston (`embolo_titanio`) — *[Epic]*
- **2x** Precision Gyroscope (`giroscopio_precision`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:1|cerebro_automata:3|corazon_primigenio:1|dinamo_galvanica:1|diodos_led:1|embolo_titanio:2|giroscopio_precision:2|nucleo_mana:3|relicario_astral:3|singularidad_eterica:3`
- **Hexadecimal FNV-1a Hash**: `0xB12A5C7D` | **Decimal**: `2972343421`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **139** | **79** | **284** | **32** |

---

### Golem #148 — Dragonic Smelter

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.14m` (In-scene visual ratio)
- **Tactical Role**: *Photonic pulse sniper*

#### 🧩 Required Components (10 Part Types):
- **3x** Primordial Golem Heart (`corazon_primigenio`) — *[Legendary]*
- **2x** Mechanical Dragon Eye (`ojo_dragon`) — *[Legendary]*
- **1x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **3x** High-Pressure Condenser (`condensador_presion`) — *[Rare]*
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*
- **1x** Perfect Bronze Gears (`engranajes_bronce`) — *[Rare]*
- **1x** Celestial Gear Reliquary (`relicario_astral`) — *[Legendary]*
- **3x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **3x** LED Diodes (`diodos_led`) — *[Rare]*
- **1x** Boiler Heart (`corazon_caldera`) — *[Epic]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:3|condensador_presion:3|corazon_caldera:1|corazon_primigenio:3|diodos_led:3|engranajes_bronce:1|matriz_optica_solar:1|motor_vapor:1|ojo_dragon:2|relicario_astral:1`
- **Hexadecimal FNV-1a Hash**: `0xF16CF4BD` | **Decimal**: `4050449597`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **122** | **62** | **337** | **29** |

---

### Golem #149 — Arcane Watcher

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `0.91m` (In-scene visual ratio)
- **Tactical Role**: *Heavy endurance for arena combat*

#### 🧩 Required Components (10 Part Types):
- **1x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **3x** Automaton Brain (`cerebro_automata`) — *[Epic]*
- **3x** Solar Optical Array (`matriz_optica_solar`) — *[Epic]*
- **3x** Aether Reactor (`reactor_eter`) — *[Epic]*
- **2x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **3x** Mechanical Dragon Eye (`ojo_dragon`) — *[Legendary]*
- **1x** Radio Antennas (`antenas_radio`) — *[Rare]*
- **3x** Celestial Gear Reliquary (`relicario_astral`) — *[Legendary]*
- **2x** Aetheric Singularity (`singularidad_eterica`) — *[Legendary]*
- **2x** Resonating Quartz Crystal (`cristal_fuerza`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `antenas_radio:1|bateria_plasma:2|cerebro_automata:3|corazon_caldera:1|cristal_fuerza:2|matriz_optica_solar:3|ojo_dragon:3|reactor_eter:3|relicario_astral:3|singularidad_eterica:2`
- **Hexadecimal FNV-1a Hash**: `0xCB04388B` | **Decimal**: `3406051467`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **169** | **60** | **270** | **61** |

---

### Golem #150 — Aetheric Leviathan

- **Classification**: Tier 4 (Legendary)
- **Elemental Affinity**: **Aether** (`AETHER`) — *Primordial resonance, beats Steam (+40%)*
- **Emissive PBR Color**: `#9B59B6` (RGB: `155, 89, 182`)
- **Height Scale**: `1.15m` (In-scene visual ratio)
- **Tactical Role**: *High-armor frontal defensive tank*

#### 🧩 Required Components (8 Part Types):
- **2x** Primordial Golem Heart (`corazon_primigenio`) — *[Legendary]*
- **2x** Boiler Heart (`corazon_caldera`) — *[Epic]*
- **2x** Mechanical Dragon Eye (`ojo_dragon`) — *[Legendary]*
- **1x** Galvanic Dynamo (`dinamo_galvanica`) — *[Rare]*
- **2x** Supercharged Plasma Battery (`bateria_plasma`) — *[Epic]*
- **1x** Aether Reactor (`reactor_eter`) — *[Epic]*
- **3x** Automaton Brain (`cerebro_automata`) — *[Epic]*
- **1x** Steam Engine (`motor_vapor`) — *[Rare]*

#### ⚙️ Serialization & FNV-1a Deterministic Hash:
- **Canonical String**: `bateria_plasma:2|cerebro_automata:3|corazon_caldera:2|corazon_primigenio:2|dinamo_galvanica:1|motor_vapor:1|ojo_dragon:2|reactor_eter:1`
- **Hexadecimal FNV-1a Hash**: `0xAF891A74` | **Decimal**: `2944998004`

#### 📈 Base Attributes and Stats:
| Attack (ATK) | Defense (DEF) | Vitality (HP) | Speed (SPD) |
| :---: | :---: | :---: | :---: |
| **130** | **47** | **216** | **18** |

---
