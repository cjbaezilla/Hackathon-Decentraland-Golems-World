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
  }
}
