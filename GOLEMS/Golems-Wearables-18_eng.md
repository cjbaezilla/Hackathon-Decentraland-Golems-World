# 🧰 Master Catalog of 18 3D Wearables and Accessories: Golems World

> [!IMPORTANT]
> **EQUIPPABLE ACCESSORIES SPECIFICATION (SDK7 & MOBILE-FIRST)**:  
> This document contains the official catalog of **18 3D wearables and accessories** procedurally generated in [`assets/wearables/`](file:///d:/DECENTRALAND/Scenes/Hackathon/assets/wearables) to be equipped on NPCs and players via `AvatarAttach`. Each piece is modeled with a **Devastated Steampunk / Mad Max** theme, utilizes PBR materials with emissive glow on a separate material (no dynamic lights, compatible with the Godot Explorer mobile client), and respects official Decentraland wearable guidelines (triangle budget by category, closed single-sided meshes, and maximum dimensions of 2.42 m).

---

## 📑 Table of Contents

1. [Architecture and Design Considerations](#1-architecture-and-design-considerations)
2. [Summary Table of the 18 Wearables](#2-summary-table-of-the-18-wearables)
3. [Detailed Catalog of the 18 Wearables](#3-detailed-catalog-of-the-18-wearables)
4. [Distribution by Elemental Affinity and Emissive Color](#4-distribution-by-elemental-affinity-and-emissive-color)
5. [Generation and Integration Instructions](#5-generation-and-integration-instructions)

---

## 1. Architecture and Design Considerations

All wearables in this catalog are generated using the script [`scripts/generate_wearables.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_wearables.js), which reuses the shared library [`scripts/lib/glbBuilder.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/lib/glbBuilder.js) (spheres, toruses, gears, octahedrons, cones, and 2D extrusion) to produce **self-contained binary GLB (glTF 2.0) files without external textures**.

### Applied Official Guidelines (Decentraland Wearables)

| Consideration | Applied Value |
| :--- | :--- |
| **Triangle budget** | ≤ 500 tris (eyewear/mask/tiara), ≤ 1000 tris (hand accessories), ≤ 1500 tris (large items) |
| **Maximum dimensions** | Height/Width ≤ 2.42 m · Depth ≤ 1.40 m |
| **Materials** | 1 to 3 PBR materials per item (base + detail + separate glow) |
| **Emissive** | Only the `glow` material emits light (no dynamic lights, mobile-first) |
| **Normals** | Closed meshes (single-sided rendering in client) |
| **Textures** | None: geometry + flat PBR colors (maximum mobile compatibility) |

### Bone Attachment System (`AvatarAttach`)

Each wearable is registered in [`src/objects/npcWearables.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/objects/npcWearables.ts) within the `CUSTOM_WEARABLES` map, defining its `anchorPoint` (skeleton bone), `offsetPos`, `offsetRot`, and `scale`. The available anchor points verified in `@dcl/ecs` are:

```text
HEAD · NECK · SPINE · SPINE1 · SPINE2 · HIP
LEFT/RIGHT_ARM · LEFT/RIGHT_FOREARM · LEFT/RIGHT_HAND · LEFT/RIGHT_HAND_INDEX
LEFT/RIGHT_SHOULDER · LEFT/RIGHT_LEG · LEFT/RIGHT_UP_LEG · LEFT/RIGHT_FOOT · LEFT/RIGHT_TOE_BASE
```

---

## 2. Summary Table of the 18 Wearables

| # | Render | ID / File | Name | Anchor (`AAPT_`) | Category | Triangles | Size |
| :-: | :-: | :--- | :--- | :--- | :--- | :-: | :-: |
| 1 | <img src="wearables_imgs/goggles_steampunk.png" width="80" /> | `goggles_steampunk.glb` | Steampunk Aviator Goggles | `HEAD` | Eyewear | 788 | 24.2 KB |
| 2 | <img src="wearables_imgs/welding_mask.png" width="80" /> | `welding_mask.glb` | Mad Max Welding Mask | `HEAD` | Mask | 684 | 20.4 KB |
| 3 | <img src="wearables_imgs/steam_backpack.png" width="80" /> | `steam_backpack.glb` | Steam Boiler Backpack | `SPINE2` | Back | 884 | 32.4 KB |
| 4 | <img src="wearables_imgs/tesla_backpack.png" width="80" /> | `tesla_backpack.glb` | Tesla Galvanic Generator | `SPINE2` | Back | 996 | 28.8 KB |
| 5 | <img src="wearables_imgs/wrench_heavy.png" width="80" /> | `wrench_heavy.glb` | Giant Mechatronic Wrench | `RIGHT_HAND` | Hand | 372 | 15.0 KB |
| 6 | <img src="wearables_imgs/flamethrower_pipe.png" width="80" /> | `flamethrower_pipe.glb` | Industrial Steam Torch | `RIGHT_HAND` | Hand | 604 | 20.0 KB |
| 7 | <img src="wearables_imgs/shoulder_pad_spiked.png" width="80" /> | `shoulder_pad_spiked.glb` | Spiked Armored Shoulder Pad | `LEFT_SHOULDER` | Shoulder | 644 | 19.1 KB |
| 8 | <img src="wearables_imgs/aether_crown.png" width="80" /> | `aether_crown.glb` | Aether Crystal Crown | `HEAD` | Tiara | 176 | 9.0 KB |
| 9 | <img src="wearables_imgs/monocle_brass.png" width="80" /> | `monocle_brass.glb` | Brass Monocle | `HEAD` | Eyewear | 680 | 18.8 KB |
| 10 | <img src="wearables_imgs/top_hat_steam.png" width="80" /> | `top_hat_steam.glb` | Steam-Powered Top Hat | `HEAD` | Hat | 938 | 30.6 KB |
| 11 | <img src="wearables_imgs/neck_cog_collar.png" width="80" /> | `neck_cog_collar.glb` | Gear Neck Collar | `NECK` | Neck | 1200 | 34.8 KB |
| 12 | <img src="wearables_imgs/chest_armor_plate.png" width="80" /> | `chest_armor_plate.glb` | Riveted Chest Armor Plate | `SPINE1` | Chest | 1040 | 28.9 KB |
| 13 | <img src="wearables_imgs/belt_utility_pouch.png" width="80" /> | `belt_utility_pouch.glb` | Utility Tool Belt | `HIP` | Hip | 956 | 29.9 KB |
| 14 | <img src="wearables_imgs/gauntlet_left.png" width="80" /> | `gauntlet_left.glb` | Left Armored Gauntlet | `LEFT_FOREARM` | Handwear | 768 | 21.8 KB |
| 15 | <img src="wearables_imgs/gauntlet_right.png" width="80" /> | `gauntlet_right.glb` | Right Armored Gauntlet | `RIGHT_FOREARM` | Handwear | 768 | 21.8 KB |
| 16 | <img src="wearables_imgs/mechanical_arm_left.png" width="80" /> | `mechanical_arm_left.glb` | Piston Mechanical Arm | `LEFT_ARM` | Arm | 992 | 32.3 KB |
| 17 | <img src="wearables_imgs/shoulder_cannon.png" width="80" /> | `shoulder_cannon.glb` | Shoulder Steam Cannon | `RIGHT_SHOULDER` | Shoulder | 840 | 25.7 KB |
| 18 | <img src="wearables_imgs/boot_plated_right.png" width="80" /> | `boot_plated_right.glb` | Armored Boot with Greaves | `RIGHT_FOOT` | Feet | 648 | 21.7 KB |

---

## 3. Detailed Catalog of the 18 Wearables

### 1. `goggles_steampunk.glb` — Steampunk Aviator Goggles

<img src="wearables_imgs/goggles_steampunk.png" width="256" />

- **Official Category**: Eyewear
- **Anchor Point**: `AvatarAnchorPointType.AAPT_HEAD`
- **Equipped Offset**: `position (0, 0.08, 0.05)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Brass (frame), Dark Leather (strap), Emissive Cyan Lens
- **Emissive Color**: `#00E5FF` (Galvanic Affinity)
- **Budget**: 788 triangles · 24.2 KB
- **Description**: Aviator goggles with a riveted brass frame and cyan plasma lenses. Features side copper rivets and decorative rings around the rims.

### 2. `welding_mask.glb` — Mad Max Welding Mask

<img src="wearables_imgs/welding_mask.png" width="256" />

- **Official Category**: Mask
- **Anchor Point**: `AvatarAnchorPointType.AAPT_HEAD`
- **Equipped Offset**: `position (0, 0.05, 0.02)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Dark Iron (plate), Brass (rim), Glowing Orange Visor
- **Emissive Color**: `#FF6600` (Steam Affinity)
- **Budget**: 684 triangles · 20.4 KB
- **Description**: Armored welder's mask with lower cowl dome and glowing thermal visor. Brass rivets on four corners and a decorative ring on the cowl.

### 3. `steam_backpack.glb` — Steam Boiler Backpack

<img src="wearables_imgs/steam_backpack.png" width="256" />

- **Official Category**: Back
- **Anchor Point**: `AvatarAnchorPointType.AAPT_SPINE2`
- **Equipped Offset**: `position (0, 0, -0.05)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Bronze (tanks), Iron (frame), Copper (smokestack), Emissive Orange
- **Emissive Color**: `#FFAA00` (Steam Affinity)
- **Budget**: 884 triangles · 32.4 KB
- **Description**: Backpack featuring dual bronze boilers with top domes, exhaust stack, brass valve, steel gear, and glowing emissive gauge core.

### 4. `tesla_backpack.glb` — Tesla Galvanic Generator

<img src="wearables_imgs/tesla_backpack.png" width="256" />

- **Official Category**: Back
- **Anchor Point**: `AvatarAnchorPointType.AAPT_SPINE2`
- **Equipped Offset**: `position (0, 0, -0.05)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Dark Iron (case), Brass (coils), Copper (rings), Emissive Cyan
- **Emissive Color**: `#00E5FF` (Galvanic Affinity)
- **Budget**: 996 triangles · 28.8 KB
- **Description**: Portable Tesla generator with twin vertical cyan plasma coils, copper rings, reinforcement plate, and top emissive electric arc.

### 5. `wrench_heavy.glb` — Giant Mechatronic Wrench

<img src="wearables_imgs/wrench_heavy.png" width="256" />

- **Official Category**: Hand (hand accessory)
- **Anchor Point**: `AvatarAnchorPointType.AAPT_RIGHT_HAND`
- **Equipped Offset**: `position (0, 0, 0)` · `rotation (90°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Dark Iron (handle), Brass (head), Leather (grip), Emissive Orange
- **Emissive Color**: `#FFAA00` (Steam Affinity)
- **Budget**: 372 triangles · 15.0 KB
- **Description**: Giant scrap wrench featuring a brass hammerhead, leather handle wrap, and an emissive orange core inside the wrench head.

### 6. `flamethrower_pipe.glb` — Industrial Steam Torch

<img src="wearables_imgs/flamethrower_pipe.png" width="256" />

- **Official Category**: Hand (hand accessory)
- **Anchor Point**: `AvatarAnchorPointType.AAPT_RIGHT_HAND`
- **Equipped Offset**: `position (0, 0, 0)` · `rotation (90°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Brass (barrel), Leather (grip), Iron (tank), Emissive Orange Flame
- **Emissive Color**: `#FF5522` (Steam Affinity)
- **Budget**: 604 triangles · 20.0 KB
- **Description**: Industrial torch/flamethrower with brass barrel, conical nozzle, ringed leather grip, and an emissive flame cone at the tip.

### 7. `shoulder_pad_spiked.glb` — Spiked Armored Shoulder Pad

<img src="wearables_imgs/shoulder_pad_spiked.png" width="256" />

- **Official Category**: Shoulder
- **Anchor Point**: `AvatarAnchorPointType.AAPT_LEFT_SHOULDER`
- **Equipped Offset**: `position (0, 0, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Dark Iron (dome), Brass (rim), Spikes and Emissive Orange Cores
- **Emissive Color**: `#FF6600` (Steam Affinity)
- **Budget**: 644 triangles · 19.1 KB
- **Description**: Mad Max style armored shoulder pad with iron dome, brass rim, three metallic spikes, and glowing orange spheres on the spike tips.

### 8. `aether_crown.glb` — Aether Crystal Crown

<img src="wearables_imgs/aether_crown.png" width="256" />

- **Official Category**: Tiara
- **Anchor Point**: `AvatarAnchorPointType.AAPT_HEAD`
- **Equipped Offset**: `position (0, 0.1, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Brass (band & mounts), Emissive Violet Crystals
- **Emissive Color**: `#BB67FF` (Aether Affinity)
- **Budget**: 176 triangles · 9.0 KB
- **Description**: Brass circlet featuring five octahedral violet aether crystals (one major center crystal and four side crystals) mounted on brass prongs.

### 9. `monocle_brass.glb` — Brass Monocle

<img src="wearables_imgs/monocle_brass.png" width="256" />

- **Official Category**: Eyewear
- **Anchor Point**: `AvatarAnchorPointType.AAPT_HEAD`
- **Equipped Offset**: `position (0, 0.05, 0.04)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Brass (ring & chain), Emissive Cyan Lens
- **Emissive Color**: `#00E5FF` (Galvanic Affinity)
- **Budget**: 680 triangles · 18.8 KB
- **Description**: Brass monocle with cyan plasma lens, mounting stem, and a three-link brass chain.

### 10. `top_hat_steam.glb` — Steam-Powered Top Hat

<img src="wearables_imgs/top_hat_steam.png" width="256" />

- **Official Category**: Hat
- **Anchor Point**: `AvatarAnchorPointType.AAPT_HEAD`
- **Equipped Offset**: `position (0, 0.1, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Dark Leather (crown), Brass (brim), Copper (band), Emissive Amber
- **Emissive Color**: `#FFAA00` (Mechanical Affinity)
- **Budget**: 938 triangles · 30.6 KB
- **Description**: Steampunk top hat with brass brim, copper hatband, side steel gear, steam pipe with ring, and glowing amber sphere.

### 11. `neck_cog_collar.glb` — Gear Neck Collar

<img src="wearables_imgs/neck_cog_collar.png" width="256" />

- **Official Category**: Neck
- **Anchor Point**: `AvatarAnchorPointType.AAPT_NECK`
- **Equipped Offset**: `position (0, 0, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Dark Iron (collar), Brass (ring), Steel (gears), Emissive Cyan
- **Emissive Color**: `#00E5FF` (Galvanic Affinity)
- **Budget**: 1200 triangles · 34.8 KB
- **Description**: Toroidal iron collar with brass ring and three mounted steel gears, featuring a cyan emissive core on the main gear.

### 12. `chest_armor_plate.glb` — Riveted Chest Armor Plate

<img src="wearables_imgs/chest_armor_plate.png" width="256" />

- **Official Category**: Chest
- **Anchor Point**: `AvatarAnchorPointType.AAPT_SPINE1`
- **Equipped Offset**: `position (0, 0.02, 0.02)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Dark Iron (plates), Brass (center badge), Copper (rivets), Emissive Violet
- **Emissive Color**: `#BB67FF` (Aether Affinity)
- **Budget**: 1040 triangles · 28.9 KB
- **Description**: Chest armor constructed from iron plates secured with six copper rivets, a circular brass emblem, and a center spherical violet aether core.

### 13. `belt_utility_pouch.glb` — Utility Tool Belt

<img src="wearables_imgs/belt_utility_pouch.png" width="256" />

- **Official Category**: Hip
- **Anchor Point**: `AvatarAnchorPointType.AAPT_HIP`
- **Equipped Offset**: `position (0, -0.02, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Leather (belt), Brass (buckle), Iron (pouches), Copper (sheath), Emissive Amber
- **Emissive Color**: `#FFAA00` (Mechanical Affinity)
- **Budget**: 956 triangles · 29.9 KB
- **Description**: Tool belt with brass buckle and center gear, twin iron side pouches, cylindrical copper tool sheath, and amber emissive indicators.

### 14. `gauntlet_left.glb` — Left Armored Gauntlet

<img src="wearables_imgs/gauntlet_left.png" width="256" />

- **Official Category**: Handwear
- **Anchor Point**: `AvatarAnchorPointType.AAPT_LEFT_FOREARM`
- **Equipped Offset**: `position (0, 0, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Dark Iron (cuff), Brass (plates), Emissive Cyan Cores
- **Emissive Color**: `#00E5FF` (Galvanic Affinity)
- **Budget**: 768 triangles · 21.8 KB
- **Description**: Armored forearm gauntlet with iron cuff, brass plating, spherical knuckles, and cyan power conduit.

### 15. `gauntlet_right.glb` — Right Armored Gauntlet

<img src="wearables_imgs/gauntlet_right.png" width="256" />

- **Official Category**: Handwear
- **Anchor Point**: `AvatarAnchorPointType.AAPT_RIGHT_FOREARM`
- **Equipped Offset**: `position (0, 0, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Dark Iron (cuff), Brass (plates), Emissive Cyan Cores
- **Emissive Color**: `#00E5FF` (Galvanic Affinity)
- **Budget**: 768 triangles · 21.8 KB
- **Description**: Symmetrical right-arm version of the left gauntlet. Shares identical plating, knuckles, and cyan energy conduit.

### 16. `mechanical_arm_left.glb` — Piston Mechanical Arm

<img src="wearables_imgs/mechanical_arm_left.png" width="256" />

- **Official Category**: Arm
- **Anchor Point**: `AvatarAnchorPointType.AAPT_LEFT_ARM`
- **Equipped Offset**: `position (0, 0, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Dark Iron (sleeve), Brass (shoulder & elbow), Copper (piston), Emissive Orange
- **Emissive Color**: `#FF6600` (Steam Affinity)
- **Budget**: 992 triangles · 32.3 KB
- **Description**: Full mechanical arm with spherical brass shoulder, iron sleeve, elbow gear, copper pneumatic piston, and glowing orange leather conduits.

### 17. `shoulder_cannon.glb` — Shoulder Steam Cannon

<img src="wearables_imgs/shoulder_cannon.png" width="256" />

- **Official Category**: Shoulder
- **Anchor Point**: `AvatarAnchorPointType.AAPT_RIGHT_SHOULDER`
- **Equipped Offset**: `position (0, 0, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Dark Iron (base), Brass (cannon), Copper (tank), Emissive Orange
- **Emissive Color**: `#FF5522` (Steam Affinity)
- **Budget**: 840 triangles · 25.7 KB
- **Description**: Shoulder-mounted steam cannon featuring iron base plate, brass swivel joint, reinforced cannon barrel, copper pressure tank, and glowing orange muzzle.

### 18. `boot_plated_right.glb` — Armored Boot with Greaves

<img src="wearables_imgs/boot_plated_right.png" width="256" />

- **Official Category**: Feet
- **Anchor Point**: `AvatarAnchorPointType.AAPT_RIGHT_FOOT`
- **Equipped Offset**: `position (0, 0.05, 0)` · `rotation (0°, 0°, 0°)` · `scale (1, 1, 1)`
- **PBR Materials**: Dark Iron (sole & greaves), Brass (toe cap), Leather (straps), Emissive Amber
- **Emissive Color**: `#FFAA00` (Mechanical Affinity)
- **Budget**: 648 triangles · 21.7 KB
- **Description**: Armored boot with iron sole and heel, shin greaves, brass toe cap, leather fastening straps, and amber power tube.

---

## 4. Distribution by Elemental Affinity and Emissive Color

| Affinity | Emissive Color | Wearables |
| :--- | :--- | :--- |
| ♨️ **Steam** | `#FF6600` / `#FF5522` / `#FFAA00` | `welding_mask`, `steam_backpack`, `wrench_heavy`, `flamethrower_pipe`, `shoulder_pad_spiked`, `mechanical_arm_left`, `shoulder_cannon` (7) |
| ⚡ **Galvanic** | `#00E5FF` | `goggles_steampunk`, `tesla_backpack`, `monocle_brass`, `neck_cog_collar`, `gauntlet_left`, `gauntlet_right` (6) |
| ⚙️ **Mechanical** | `#FFAA00` | `top_hat_steam`, `belt_utility_pouch`, `boot_plated_right` (3) |
| 🔮 **Aether** | `#BB67FF` | `aether_crown`, `chest_armor_plate` (2) |

---

## 5. Generation and Integration Instructions

### 5.1 GLB Model Generation

```bash
node scripts/generate_wearables.js
```

Generates (or regenerates) all 18 `.glb` files in `assets/wearables/` and outputs the triangle count for each piece along with budget validation.

### 5.2 PNG Renders (1024×1024 preview)

```bash
node scripts/generate_wearables_pngs.js
```

Generates catalog preview images in `GOLEMS/wearables_imgs/` using a headless WebGL browser with custom background and accent themes defined per item.

### 5.3 Scene Equipping

```typescript
import { equipCustomWearable, equipWearableToPlayer } from './objects/npcWearables'

// Equip an accessory onto an NPC (avatarId = AvatarShape entity ID)
equipCustomWearable('NPC-001', 'goggles_steampunk')

// Equip an accessory onto the Local Player
equipWearableToPlayer('shoulder_cannon')
```

### 5.4 Typed TypeScript Catalog

The full catalog of 18 wearables is registered in the `CUSTOM_WEARABLES` constant inside [`src/objects/npcWearables.ts`](file:///d:/DECENTRALAND/Scenes/Hackathon/src/objects/npcWearables.ts), including `modelSrc`, `anchorPoint`, `offsetPos`, `offsetRot`, and `scale`.

> [!NOTE]
> The `offsetPos`/`offsetRot` values for new accessories are default approximations. If an item appears misaligned when testing in-scene, adjust its `offsetPos`/`offsetRot` in `CUSTOM_WEARABLES` and re-run `npm run build`.
