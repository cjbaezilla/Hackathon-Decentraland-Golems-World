import { TranslationSchema } from '../types'

/**
 * ============================================================================
 * DICCIONARIO EN INGLÉS (CANÓNICO)
 * ============================================================================
 */
export const en: TranslationSchema = {
  common: {
    interact: 'Interact',
    collect: 'Collect',
    close: 'Close',
    open: 'Open',
    back: 'Back',
    confirm: 'Confirm',
    cancel: 'Cancel',
    level: 'Level',
    levelShort: 'Lv.',
    hp: 'Health',
    attack: 'Attack',
    defense: 'Defense',
    speed: 'Speed',
    exp: 'EXP',
    kills: 'Kills',
    languageToggle: '🌐 es | EN',
    parcel: 'Parcel',
    coords: 'Coord.'
  },
  zones: {
    forgeDistrict: 'Forge District',
    scrapDesert: 'Scrap Desert',
    miningReserve: 'Mining Reserve',
    foundryBoilers: 'Foundry Boilers',
    southCorridor: 'South Corridor & Grand Way',
    chatarrales: 'The Scrapyards',
    abandonedFactory: 'Abandoned Factory',
    substation: 'Electrical Substation',
    radioTower: 'Radio Tower',
    arena: 'Steampunk Grand Tournament Arena'
  },
  affinities: {
    steam: 'Steam',
    galvanic: 'Galvanic',
    mechanical: 'Mechanical',
    luminous: 'Luminous',
    aether: 'Aether'
  },
  golems: {
    steamNames: [
      'Steam Boiler',
      'Copper Stoker',
      'Armored Vaporizer',
      'Automaton Water Heater',
      'Pressure Titan'
    ],
    galvanicNames: [
      'Galvanic Spark',
      'Flash Voltamp',
      'Electrified Coil',
      'Galvanoid Arc',
      'Induction Flare'
    ],
    mechanicalNames: [
      'Mechanical Ironclad',
      'Iron Gear',
      'Scrap Arm',
      'Riveted Automaton',
      'Crankshaft Bastion'
    ],
    luminousNames: [
      'Luminous Solar Beacon',
      'Refractor Prism',
      'Filament Sentinel',
      'Quartz Beacon',
      'Spectral Flash'
    ],
    aetherNames: [
      'Aether Automaton',
      'Mystic Resonator',
      'Void Wraith',
      'Fossil Mana Orb',
      'Alchemical Vortex'
    ]
  },
  combat: {
    arenaEnter: '⚔️ You entered the Arena! Your golems engage in FFA combat.',
    arenaExit: '🛡️ You left the Arena. Your golems resume following you.',
    attackLog: '⚔️ {attacker} attacked {target} (-{damage} HP) {advantage}',
    elementalAdvantage: '⚡ [ELEMENTAL ADVANTAGE]',
    defeatLog: '🏆 {attacker} destroyed {target}! (+{exp} EXP)',
    golemFallen: '💥 A golem has fallen in the arena!',
    levelUp: '⭐ {name} reached Level {level}!',
    victory: 'Victory!',
    defeat: 'Defeat'
  },
  trampoline: {
    hoverText: 'Jump through the air! (Steam Trampoline)',
    signTitle: '♨️ STEAM TRAMPOLINE ⚡',
    signSubtitle: 'Step on or touch to soar into the air!'
  },
  radar: {
    searching: 'Scanning for heat signatures...',
    cold: 'Distant signature detected',
    warm: 'Thermal signature nearby',
    hot: 'Material just a few meters away!',
    detected: 'Component emerged from the ground!',
    distanceMeters: '{distance}m away'
  },
  forge: {
    title: 'GOLEM FORGE',
    subtitle: 'Combine 5 to 12 pieces of scrap',
    craftButton: 'Breathe Life',
    insufficientMaterials: 'Requires between 5 and 12 materials',
    successCraft: 'New golem successfully forged!',
    slotsCount: 'Parts: {count}/12'
  },
  npc: {
    name: 'Silas',
    role: 'Wasteland Survivor',
    floatingLabel: '⚙️ Silas • Wasteland Survivor',
    hoverText: 'Talk to Silas',
    companionName: 'Piston',
    dialogTitle: '⚙️ SILAS, THE SURVIVOR',
    dialogIntro: 'Well, well, another newcomer who made it in one piece to the Forge! I am Silas. I have been surviving for years in this wasteland of scrap and steam. If you want to last more than two days alive out here, you better listen closely.',
    optLore: '📖 What is this place and how do I survive?',
    optGolems: '🤖 How do I craft and fight with Golems?',
    optZones: '🗺️ What dangers and zones are on the map?',
    optTips: '💡 Give me a survival tip',
    optClose: '🚪 Thanks Silas, I will be on my way!',
    loreText: 'Before the Great Overload, this land was a colossal network of foundries and workshops. When the reactors collapsed, residual magical energy fused with scrap metal, bringing the first automatons to life. To survive, use your heat radar: it tracks buried parts that rise from the earth as you approach.',
    golemsText: 'You will not get far out there without a squad. In the Forge you can combine 5 to 12 scrap components. Each unique recipe yields a golem with elemental affinity: Steam beats Mechanical, Mechanical beats Galvanic, Galvanic beats Luminous, Luminous beats Aether, and Aether beats Steam. In the Grand Arena at (200m, 200m) you will test their might!',
    zonesText: 'The Forge District (Southwest) and Mining Reserve (Northeast) are safe havens. But beware if you venture into the Scrap Desert (Northwest) or Foundry Boilers (Southeast): they are lawless free-PK zones where legendary loot and deadly battles reign.',
    tipsText: 'A veteran scrapper tip: use steam trampolines to travel at high speeds across the terrain. And never discard common parts like copper pipes or clock springs: a smart combination can create a faster, better-balanced golem than an unwieldy colossus.',
    backButton: '◀ Ask something else',
    optReplayCinematic: '🎬 Replay camp showcase'
  },
  cinematic: {
    title: '⚙️ SILAS, THE SURVIVOR',
    subtitle: 'Your veteran mentor in the Forge District and Wastelands',
    skipButton: 'Skip ⏭️',
    hintPrompt: '💡 Tap on Silas to begin your crafting adventure!'
  },
  map: {
    title: 'WORLD MAP',
    subtitle: '25x25 Parcels Grid (400m × 400m)',
    enlarge: 'Enlarge Map ⛶',
    minimize: 'Minimize Map 🗕',
    close: 'Close ✖',
    north: 'N',
    south: 'S',
    east: 'E',
    west: 'W',
    legendTitle: 'Zoning & Hazard Levels',
    safeZone: 'Safe Zone (No PK)',
    pkZone: 'Hazard Zone (Free PK)',
    arenaZone: 'Tournament Grand Arena',
    playerTooltip: 'Your Position'
  }
}


