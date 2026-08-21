/**
 * ============================================================================
 * CATÁLOGO MAESTRO DE 50 NPCS MAD MAX STEAMPUNK (NPC CATALOG) - GOLEMS WORLD
 * ============================================================================
 * Estructuras de datos tipadas con avatares de sobrevivientes, chatarreros,
 * guerreros del páramo, fogoneros y mecánicos Mad Max de Golems World.
 */

export interface ColorRGB {
  r: number
  g: number
  b: number
}

export interface NpcAvatarSpec {
  bodyShape: string
  wearables: string[]
  skinColor: ColorRGB
  hairColor: ColorRGB
  eyeColor: ColorRGB
}

export interface NpcDefinition {
  id: string
  name: string
  nameEn?: string
  title: string
  titleEn?: string
  zone: string
  zoneEn?: string
  role: string
  roleEn?: string
  gender: 'male' | 'female'
  avatarSpec: NpcAvatarSpec
  phraseEs: string
  phraseEn: string
}

export const URN_MALE = 'urn:decentraland:off-chain:base-avatars:BaseMale'
export const URN_FEMALE = 'urn:decentraland:off-chain:base-avatars:BaseFemale'

const u = (name: string) => `urn:decentraland:off-chain:base-avatars:${name}`

/**
 * Catálogo completo de 50 NPCs con estética Mad Max / Steampunk Wasteland.
 */
export const NPC_CATALOG: NpcDefinition[] = [
  {
    id: 'NPC-001',
    name: "Vance el Forjador",
    nameEn: "Vance el Forger",
    title: "Maestro de Calderas",
    titleEn: "Boiler Master",
    zone: "Distrito de la Forja",
    zoneEn: "Forge District",
    role: "Maestro Metalúrgico",
    roleEn: "Metallurgical Master",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'punk', 'beard', 'black_jacket', 'trash_jean', 'm_mountainshoes.glb', 'black_glove'].map(u),
      skinColor: { r: 0.65, g: 0.48, b: 0.35 },
      hairColor: { r: 0.3, g: 0.2, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.4, b: 0.1 }
    },
    phraseEs: "Si la chispa no prende en tres golpes, agrega carbón extra.",
    phraseEn: "If the spark doesn't catch in three hits, add extra coal."
  },
  {
    id: 'NPC-002',
    name: "Kaelen el Galvánico",
    nameEn: "Kaelen el Galvanic",
    title: "Técnico Tesla",
    titleEn: "Tesla Technician",
    zone: "Subestación Eléctrica",
    zoneEn: "Electric Substation",
    role: "Especialista en Alta Tensión",
    roleEn: "High Voltage Specialist",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_01', 'mouth_01', 'eyes_01', 'hair_punk', 'full_beard', 'sleeveless_punk_shirt', 'distressed_black_Jeans', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.72, g: 0.58, b: 0.44 },
      hairColor: { r: 0.15, g: 0.15, b: 0.2 },
      eyeColor: { r: 0.2, g: 0.8, b: 0.9 }
    },
    phraseEs: "¡Cuidado donde pisas! Las bobinas acumulan carga estática residual.",
    phraseEn: "Watch your step! The coils build up residual static charge."
  },
  {
    id: 'NPC-003',
    name: "Nora la Recolectora",
    nameEn: "Nora la Scavenger",
    title: "Rastreadora de Piezas",
    titleEn: "Parts Tracker",
    zone: "Los Chatarrales",
    zoneEn: "The Scrap Yards",
    role: "Recolectora de Repuestos",
    roleEn: "Spare Parts Scavenger",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_02', 'f_mouth_02', 'eyes_02', 'cornrows', 'f_blue_jacket', 'safari_pants', 'classic_shoes'].map(u),
      skinColor: { r: 0.68, g: 0.5, b: 0.36 },
      hairColor: { r: 0.5, g: 0.3, b: 0.15 },
      eyeColor: { r: 0.4, g: 0.7, b: 0.4 }
    },
    phraseEs: "Un ojo entrenado ve oro donde otros solo ven latas oxidadas.",
    phraseEn: "A trained eye sees gold where others only see rusted cans."
  },
  {
    id: 'NPC-004',
    name: "Gideon el Guardián",
    nameEn: "Gideon el Guardian",
    title: "Custodio de Bóveda",
    titleEn: "Vault Custodian",
    zone: "Reserva de Minería",
    zoneEn: "Mining Reserve",
    role: "Guardián de Yacimiento",
    roleEn: "Deposit Guardian",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_03', 'mouth_03', 'eyes_03', 'cool_hair', 'short_boxed_beard', 'puffer_jacket', 'hip_hop_joggers', 'sport_black_shoes', 'piratepatch'].map(u),
      skinColor: { r: 0.62, g: 0.45, b: 0.32 },
      hairColor: { r: 0.2, g: 0.15, b: 0.1 },
      eyeColor: { r: 0.3, g: 0.5, b: 0.7 }
    },
    phraseEs: "Esta reserva está protegida. Ningún asaltante tocará los cristales.",
    phraseEn: "This reserve is protected. No raider will touch the crystals."
  },
  {
    id: 'NPC-005',
    name: "Sora la Cazadora",
    nameEn: "Sora la Hunter",
    title: "Mercenaria de Éter",
    titleEn: "Aether Mercenary",
    zone: "Desierto de Chatarra",
    zoneEn: "Scrap Desert",
    role: "Exploradora PK Mad Max",
    roleEn: "Mad Max PK Explorer",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_04', 'f_mouth_04', 'eyes_04', 'pony_tail', 'f_white_shirt', 'f_country_pants', 'sneakers'].map(u),
      skinColor: { r: 0.64, g: 0.46, b: 0.32 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.7, b: 0.2 }
    },
    phraseEs: "En el desierto no hay reglas. Mantén tu arma lista y tu golem cerca.",
    phraseEn: "In the desert there are no rules. Keep your weapon ready and your golem close."
  },
  {
    id: 'NPC-006',
    name: "Tobias el Comerciante",
    nameEn: "Tobias el Merchant",
    title: "Mercader de Bronce",
    titleEn: "Bronze Merchant",
    zone: "Distrito de la Forja",
    zoneEn: "Forge District",
    role: "Vendedor de Chatarra",
    roleEn: "Scrap Vendor",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_05', 'mouth_00', 'eyes_05', 'keanu_hair', 'Mustache_Short_Beard', 'Red_topcoat', 'brown_pants', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.7, g: 0.52, b: 0.38 },
      hairColor: { r: 0.4, g: 0.25, b: 0.1 },
      eyeColor: { r: 0.4, g: 0.6, b: 0.3 }
    },
    phraseEs: "¡Tengo los mejores engranajes de bronce de todo el distrito!",
    phraseEn: "I've got the finest bronze gears in the entire district!"
  },
  {
    id: 'NPC-007',
    name: "Lyra la Ingeniera",
    nameEn: "Lyra la Engineer",
    title: "Mecánica de Precisión",
    titleEn: "Precision Mechanic",
    zone: "Fábrica Abandonada",
    zoneEn: "Abandoned Factory",
    role: "Diseñadora de Autómatas",
    roleEn: "Automaton Designer",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_06', 'f_mouth_06', 'eyes_06', 'shoulder_bob_hair', 'puffer_jacket', 'grey_joggers', 'citycomfortableshoes', 'cyclope'].map(u),
      skinColor: { r: 0.74, g: 0.56, b: 0.42 },
      hairColor: { r: 0.75, g: 0.25, b: 0.15 },
      eyeColor: { r: 0.3, g: 0.7, b: 0.9 }
    },
    phraseEs: "El secreto de una buena articulación radica en la viscosidad del aceite.",
    phraseEn: "The secret of a good joint lies in the viscosity of the oil."
  },
  {
    id: 'NPC-008',
    name: "Barton el Chatarrero",
    nameEn: "Barton el Scrapper",
    title: "Desguazador de Tuberías",
    titleEn: "Pipe Scrapper",
    zone: "Los Chatarrales",
    zoneEn: "The Scrap Yards",
    role: "Desmontador Metalúrgico",
    roleEn: "Metallurgical Dismantler",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_07', 'mouth_02', 'eyes_07', 'short_hair', 'granpa_beard', 'baggy_pullover', 'comfortablepants', 'classic_shoes'].map(u),
      skinColor: { r: 0.6, g: 0.42, b: 0.28 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.5, g: 0.4, b: 0.3 }
    },
    phraseEs: "Todo se reutiliza en el páramo. Nada se tira a la basura.",
    phraseEn: "Everything is reused in the wasteland. Nothing goes to waste."
  },
  {
    id: 'NPC-009',
    name: "Cora la Operadora",
    nameEn: "Cora la Operator",
    title: "Transmisora de Ondas",
    titleEn: "Wave Transmitter",
    zone: "Torre de Radio",
    zoneEn: "Radio Tower",
    role: "Operadora de Baliza",
    roleEn: "Beacon Operator",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_00', 'f_mouth_00', 'eyes_08', 'double_bun', 'red_square_shirt', 'trash_jean', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.72, g: 0.54, b: 0.4 },
      hairColor: { r: 0.25, g: 0.15, b: 0.3 },
      eyeColor: { r: 0.2, g: 0.6, b: 0.8 }
    },
    phraseEs: "Las antenas captan susurros de otros mundos entre la estática.",
    phraseEn: "The antennas pick up whispers of other worlds through the static."
  },
  {
    id: 'NPC-010',
    name: "Darius el Gladiador",
    nameEn: "Darius el Gladiator",
    title: "Campeón Veterano",
    titleEn: "Veteran Champion",
    zone: "Gran Arena Steampunk",
    zoneEn: "Grand Steampunk Arena",
    role: "Gladiador Mad Max",
    roleEn: "Mad Max Gladiator",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_01', 'mouth_04', 'eyes_09', 'moptop', 'full_beard', 'm_sweater_02', 'oxford_pants', 'sneakers', 'aviatorstyle'].map(u),
      skinColor: { r: 0.58, g: 0.4, b: 0.26 },
      hairColor: { r: 0.85, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.2, b: 0.1 }
    },
    phraseEs: "Demuestra tu valor en la arena o regresa a calentar calderas.",
    phraseEn: "Prove your worth in the arena or go back to warming boilers."
  },
  {
    id: 'NPC-011',
    name: "Eliza la Alquimista",
    nameEn: "Eliza la Alchemist",
    title: "Química de Baterías",
    titleEn: "Battery Chemist",
    zone: "Subestación Eléctrica",
    zoneEn: "Electric Substation",
    role: "Sintetizadora Galvánica",
    roleEn: "Galvanic Synthesizer",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_02', 'f_mouth_02', 'eyes_00', 'short_hair', 'black_jacket', 'safari_pants', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.76, g: 0.6, b: 0.48 },
      hairColor: { r: 0.4, g: 0.15, b: 0.5 },
      eyeColor: { r: 0.3, g: 0.8, b: 0.7 }
    },
    phraseEs: "Una gota mal calculada y la reacción galvánica fundirá el crisol.",
    phraseEn: "One miscalculated drop and the galvanic reaction will melt the crucible."
  },
  {
    id: 'NPC-012',
    name: "Finn el Aprendiz",
    nameEn: "Finn el Apprentice",
    title: "Ayudante de Silas",
    titleEn: "Silas's Helper",
    zone: "Distrito de la Forja",
    zoneEn: "Forge District",
    role: "Aprendiz de Forjador",
    roleEn: "Blacksmith Apprentice",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_03', 'mouth_01', 'eyes_01', 'semi_bold', 'short_boxed_beard', 'red_square_shirt', 'distressed_black_Jeans', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.7, g: 0.52, b: 0.38 },
      hairColor: { r: 0.6, g: 0.4, b: 0.15 },
      eyeColor: { r: 0.4, g: 0.6, b: 0.8 }
    },
    phraseEs: "Silas me enseñó que la paciencia forja los mejores autómatas.",
    phraseEn: "Silas taught me that patience forges the finest automatons."
  },
  {
    id: 'NPC-013',
    name: "Greta la Fogonera",
    nameEn: "Greta la Stoker",
    title: "Operadora de Presión",
    titleEn: "Pressure Operator",
    zone: "Calderas de Fundición",
    zoneEn: "Foundry Boilers",
    role: "Técnica de Presión PK",
    roleEn: "PK Pressure Technician",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_04', 'f_mouth_04', 'eyes_02', 'cool_hair', 'f_blue_jacket', 'f_country_pants', 'classic_shoes', 'black_glove'].map(u),
      skinColor: { r: 0.66, g: 0.48, b: 0.34 },
      hairColor: { r: 0.25, g: 0.1, b: 0.05 },
      eyeColor: { r: 0.8, g: 0.4, b: 0.1 }
    },
    phraseEs: "Las válvulas están al límite. ¡El vapor quema si te acercas demasiado!",
    phraseEn: "The valves are at their limit. Steam burns if you get too close!"
  },
  {
    id: 'NPC-014',
    name: "Harlan el Minero",
    nameEn: "Harlan el Miner",
    title: "Explotador de Vetas",
    titleEn: "Vein Excavator",
    zone: "Reserva de Minería",
    zoneEn: "Mining Reserve",
    role: "Extractor de Éter",
    roleEn: "Aether Extractor",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_05', 'mouth_03', 'eyes_03', 'hair_punk', 'Mustache_Short_Beard', 'black_jacket', 'hip_hop_joggers', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.6, g: 0.42, b: 0.28 },
      hairColor: { r: 0.15, g: 0.15, b: 0.15 },
      eyeColor: { r: 0.4, g: 0.4, b: 0.4 }
    },
    phraseEs: "El terreno es duro, pero el mineral de éter paga cada picada.",
    phraseEn: "The ground is tough, but aether ore pays for every strike."
  },
  {
    id: 'NPC-015',
    name: "Iris la Vigía",
    nameEn: "Iris la Watcher",
    title: "Centinela de Altura",
    titleEn: "High Watch Sentinel",
    zone: "Torre de Radio",
    zoneEn: "Radio Tower",
    role: "Vigía del Horizonte",
    roleEn: "Horizon Watcher",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_06', 'f_mouth_06', 'eyes_04', 'curly_hair', 'f_white_shirt', 'grey_joggers', 'sneakers'].map(u),
      skinColor: { r: 0.72, g: 0.54, b: 0.4 },
      hairColor: { r: 0.1, g: 0.1, b: 0.15 },
      eyeColor: { r: 0.3, g: 0.8, b: 0.6 }
    },
    phraseEs: "El horizonte este luce tranquilo... por ahora.",
    phraseEn: "The eastern horizon looks calm... for now."
  },
  {
    id: 'NPC-016',
    name: "Jarek el Mercenario",
    nameEn: "Jarek el Mercenary",
    title: "Escolta Privado",
    titleEn: "Private Escort",
    zone: "Calderas de Fundición",
    zoneEn: "Foundry Boilers",
    role: "Protector en Zona PK",
    roleEn: "Protector in Zona PK",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_07', 'mouth_00', 'eyes_05', 'cool_hair', 'granpa_beard', 'sport_jacket', 'brown_pants', 'm_mountainshoes.glb', 'piratepatch'].map(u),
      skinColor: { r: 0.58, g: 0.4, b: 0.28 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.3, b: 0.1 }
    },
    phraseEs: "Si vas a entrar a las calderas, asegúrate de tener cobertura.",
    phraseEn: "If you're going into the boilers, make sure you have cover."
  },
  {
    id: 'NPC-017',
    name: "Kira la Chatarrera",
    nameEn: "Kira la Scrapper",
    title: "Clasificadora de Pernos",
    titleEn: "Bolt Sorter",
    zone: "Los Chatarrales",
    zoneEn: "The Scrap Yards",
    role: "Clasificadora de Hardware",
    roleEn: "Hardware Sorter",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_00', 'f_mouth_00', 'eyes_06', 'shoulder_hair', 'puffer_jacket', 'trash_jean', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.72, g: 0.54, b: 0.4 },
      hairColor: { r: 0.4, g: 0.2, b: 0.1 },
      eyeColor: { r: 0.5, g: 0.7, b: 0.3 }
    },
    phraseEs: "Tengo tres cajas llenas de pernos si los necesitas para tu receta.",
    phraseEn: "I've got three boxes full of bolts if you need them for your recipe."
  },
  {
    id: 'NPC-018',
    name: "Leo el Informante",
    nameEn: "Leo el Informant",
    title: "Corredor de Noticias",
    titleEn: "News Runner",
    zone: "Corredores y Vías Sur",
    zoneEn: "South Corridors & Paths",
    role: "Mensajero de Rumores",
    roleEn: "Rumor Messenger",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_01', 'mouth_02', 'eyes_07', 'keanu_hair', 'full_beard', 'puffer_jacket_hoodie', 'comfortablepants', 'classic_shoes'].map(u),
      skinColor: { r: 0.74, g: 0.58, b: 0.44 },
      hairColor: { r: 0.5, g: 0.3, b: 0.15 },
      eyeColor: { r: 0.3, g: 0.6, b: 0.8 }
    },
    phraseEs: "¡Dicen que apareció un corazón primigenio en el desierto norte!",
    phraseEn: "Word is a primordial heart appeared in the northern desert!"
  },
  {
    id: 'NPC-019',
    name: "Mireia la Reparadora",
    nameEn: "Mireia la Repairmana",
    title: "Mantenedora de Pistones",
    titleEn: "Piston Maintainer",
    zone: "Fábrica Abandonada",
    zoneEn: "Abandoned Factory",
    role: "Técnica de Mantenimiento",
    roleEn: "Maintenance Technician",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_02', 'f_mouth_02', 'eyes_08', 'hair_bun', 'red_square_shirt', 'safari_pants', 'sport_black_shoes', 'cyclope'].map(u),
      skinColor: { r: 0.7, g: 0.52, b: 0.38 },
      hairColor: { r: 0.15, g: 0.15, b: 0.15 },
      eyeColor: { r: 0.4, g: 0.8, b: 0.5 }
    },
    phraseEs: "Un ajuste a tiempo evita que el autómata pierda presión en combate.",
    phraseEn: "A timely adjustment keeps the automaton from losing pressure in battle."
  },
  {
    id: 'NPC-020',
    name: "Nesta el Pionero",
    nameEn: "Nesta el Pioneer",
    title: "Geólogo de Maná",
    titleEn: "Mana Geologist",
    zone: "Reserva de Minería",
    zoneEn: "Mining Reserve",
    role: "Científico de Campo",
    roleEn: "Field Scientist",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_03', 'mouth_04', 'eyes_09', 'short_hair', 'short_boxed_beard', 'poloblacktshirt', 'oxford_pants', 'sneakers'].map(u),
      skinColor: { r: 0.78, g: 0.62, b: 0.48 },
      hairColor: { r: 0.6, g: 0.6, b: 0.6 },
      eyeColor: { r: 0.2, g: 0.5, b: 0.7 }
    },
    phraseEs: "Los depósitos de éter laten a la misma frecuencia que la tierra.",
    phraseEn: "The aether deposits pulse at the same frequency as the earth."
  },
  {
    id: 'NPC-021',
    name: "Orla la Piromante",
    nameEn: "Orla la Pyromancer",
    title: "Técnica de Combustión",
    titleEn: "Combustion Tech",
    zone: "Calderas de Fundición",
    zoneEn: "Foundry Boilers",
    role: "Alquimista de Fuego",
    roleEn: "Fire Alchemist",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_04', 'f_mouth_04', 'eyes_00', 'two_tails', 'black_jacket', 'f_country_pants', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.72, g: 0.52, b: 0.38 },
      hairColor: { r: 0.85, g: 0.2, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.5, b: 0.1 }
    },
    phraseEs: "El fuego del crisol no perdona los errores de cálculo.",
    phraseEn: "The furnace fire doesn't forgive calculation errors."
  },
  {
    id: 'NPC-022',
    name: "Phaedra la Cronista",
    nameEn: "Phaedra la Chronicler",
    title: "Historiadora del Páramo",
    titleEn: "Wasteland Historian",
    zone: "Distrito de la Forja",
    zoneEn: "Forge District",
    role: "Registradora de Lore",
    roleEn: "Lore Registrar",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_05', 'f_mouth_05', 'eyes_01', 'short_hair', 'f_red_elegant_jacket', 'f_brown_trousers', 'citycomfortableshoes', 'aviatorstyle'].map(u),
      skinColor: { r: 0.78, g: 0.62, b: 0.5 },
      hairColor: { r: 0.3, g: 0.2, b: 0.1 },
      eyeColor: { r: 0.3, g: 0.6, b: 0.4 }
    },
    phraseEs: "Cada autómata forjado guarda un fragmento de nuestra historia.",
    phraseEn: "Every forged automaton holds a piece of our history."
  },
  {
    id: 'NPC-023',
    name: "Quentin el Electricista",
    nameEn: "Quentin el Electrician",
    title: "Operador de Red",
    titleEn: "Network Operator",
    zone: "Subestación Eléctrica",
    zoneEn: "Electric Substation",
    role: "Técnico de Cableado",
    roleEn: "Wiring Technician",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_06', 'mouth_02', 'eyes_02', 'hair_undere', 'handlebar', 'm_sweater_02', 'safari_pants', 'classic_shoes'].map(u),
      skinColor: { r: 0.68, g: 0.5, b: 0.36 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.2, g: 0.7, b: 0.9 }
    },
    phraseEs: "No toque los aislantes de porcelana sin guantes de goma aislante.",
    phraseEn: "Don't touch the porcelain insulators without rubber gloves."
  },
  {
    id: 'NPC-024',
    name: "Rhea la Gladiadora",
    nameEn: "Rhea la Gladiatora",
    title: "Pretendiente al Título",
    titleEn: "Title Contender",
    zone: "Gran Arena Steampunk",
    zoneEn: "Grand Steampunk Arena",
    role: "Retadora de Arena",
    roleEn: "Arena Challenger",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_07', 'f_mouth_07', 'eyes_03', 'cool_hair', 'f_sweater', 'comfortablepants', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.66, g: 0.48, b: 0.34 },
      hairColor: { r: 0.85, g: 0.65, b: 0.15 },
      eyeColor: { r: 0.4, g: 0.8, b: 0.3 }
    },
    phraseEs: "La agilidad es más destructiva que la fuerza bruta.",
    phraseEn: "Agility is far more destructive than brute force."
  },
  {
    id: 'NPC-025',
    name: "Sam el Asistente",
    nameEn: "Sam el Assistant",
    title: "Hermano Chatarrero",
    titleEn: "Scrapper Brother",
    zone: "Distrito de la Forja",
    zoneEn: "Forge District",
    role: "Logística de Puesto",
    roleEn: "Booth Logistics",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_00', 'mouth_04', 'eyes_04', 'punk', 'beard', 'red_square_shirt', 'grey_joggers', 'sneakers', 'black_glove'].map(u),
      skinColor: { r: 0.72, g: 0.54, b: 0.4 },
      hairColor: { r: 0.35, g: 0.25, b: 0.15 },
      eyeColor: { r: 0.35, g: 0.65, b: 0.85 }
    },
    phraseEs: "Si buscas a mi hermano Silas, está junto al campamento de bienvenida.",
    phraseEn: "If you're looking for Silas, he's by the welcome camp."
  },
  {
    id: 'NPC-026',
    name: "Tess la Centinela",
    nameEn: "Tess la Sentinel",
    title: "Observadora de Frontera",
    titleEn: "Border Watcher",
    zone: "Desierto de Chatarra",
    zoneEn: "Scrap Desert",
    role: "Vigía PK",
    roleEn: "PK Watcher",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_01', 'f_mouth_01', 'eyes_05', 'curly_hair', 'sleeveless_punk_shirt', 'distressed_black_Jeans', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.64, g: 0.46, b: 0.32 },
      hairColor: { r: 0.15, g: 0.15, b: 0.2 },
      eyeColor: { r: 0.8, g: 0.6, b: 0.2 }
    },
    phraseEs: "No bajes la guardia: los cazadores acechan tras las pilas de escombros.",
    phraseEn: "Keep your guard up: hunters lurk behind the rubble piles."
  },
  {
    id: 'NPC-027',
    name: "Urien el Fundidor",
    nameEn: "Urien el Smelter",
    title: "Maestro Metalúrgico",
    titleEn: "Metallurgical Master",
    zone: "Distrito de la Forja",
    zoneEn: "Forge District",
    role: "Operador de Hornos",
    roleEn: "Furnace Operator",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_02', 'mouth_01', 'eyes_06', 'rasta', 'balbo_beard', 'black_jacket', 'brown_pants_02', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.58, g: 0.4, b: 0.26 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.4, b: 0.1 }
    },
    phraseEs: "El metal líquido debe fluir libremente sin burbujas de aire.",
    phraseEn: "Liquid metal must flow freely without air bubbles."
  },
  {
    id: 'NPC-028',
    name: "Vespera la Mística",
    nameEn: "Vespera la Mystic",
    title: "Sabia del Éter",
    titleEn: "Aether Sage",
    zone: "Reserva de Minería",
    zoneEn: "Mining Reserve",
    role: "Sacerdotisa Mística",
    roleEn: "Mystic Priestess",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_03', 'f_mouth_03', 'eyes_07', 'shoulder_hair', 'baggy_pullover', 'f_jeans', 'classic_shoes', 'piratepatch'].map(u),
      skinColor: { r: 0.8, g: 0.68, b: 0.58 },
      hairColor: { r: 0.9, g: 0.9, b: 0.95 },
      eyeColor: { r: 0.7, g: 0.3, b: 0.9 }
    },
    phraseEs: "La energía del vacío resuena con los espíritus de los antiguos golems.",
    phraseEn: "Void energy vibrates with the spirits of ancient golems."
  },
  {
    id: 'NPC-029',
    name: "Wade el Rastreador",
    nameEn: "Wade el Tracker",
    title: "Buscador de Piezas",
    titleEn: "Parts Finder",
    zone: "Los Chatarrales",
    zoneEn: "The Scrap Yards",
    role: "Explorador Urbano",
    roleEn: "Urban Explorer",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_04', 'mouth_03', 'eyes_08', 'hair_coolshortstyle', 'goatee_beard', 'sport_jacket', 'corduroysandypants', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.66, g: 0.48, b: 0.34 },
      hairColor: { r: 0.35, g: 0.2, b: 0.1 },
      eyeColor: { r: 0.4, g: 0.5, b: 0.3 }
    },
    phraseEs: "Las mejores piezas de cobre están sepultadas bajo dos metros de grava.",
    phraseEn: "The finest copper parts are buried under six feet of gravel."
  },
  {
    id: 'NPC-030',
    name: "Xander el Telegrafista",
    nameEn: "Xander el Telegrapher",
    title: "Operador Cifrado",
    titleEn: "Cipher Operator",
    zone: "Torre de Radio",
    zoneEn: "Radio Tower",
    role: "Comunicador Morse",
    roleEn: "Morse Communicator",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_05', 'mouth_04', 'eyes_09', 'keanu_hair', 'Mustache_Short_Beard', 'puffer_jacket', 'oxford_pants', 'sneakers'].map(u),
      skinColor: { r: 0.74, g: 0.58, b: 0.46 },
      hairColor: { r: 0.15, g: 0.1, b: 0.05 },
      eyeColor: { r: 0.3, g: 0.6, b: 0.8 }
    },
    phraseEs: "Punto, punto, raya... la estación del norte confirma recepción.",
    phraseEn: "Dot, dot, dash... the northern station confirms receipt."
  },
  {
    id: 'NPC-031',
    name: "Yara la Soldadora",
    nameEn: "Yara la Welder",
    title: "Especialista en Arco",
    titleEn: "Arc Specialist",
    zone: "Fábrica Abandonada",
    zoneEn: "Abandoned Factory",
    role: "Unidora de Estructuras",
    roleEn: "Structure Joiner",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_06', 'f_mouth_06', 'eyes_00', 'double_bun', 'black_jacket', 'grey_joggers', 'm_mountainshoes.glb', 'cyclope'].map(u),
      skinColor: { r: 0.68, g: 0.5, b: 0.36 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.2, g: 0.8, b: 0.9 }
    },
    phraseEs: "Una buena costura de soldadura aguanta la presión de diez atmósferas.",
    phraseEn: "A tight weld seam holds up under ten atmospheres of pressure."
  },
  {
    id: 'NPC-032',
    name: "Zane el Asaltante",
    nameEn: "Zane el Raider",
    title: "Saqueador del Páramo",
    titleEn: "Wasteland Raider",
    zone: "Desierto de Chatarra",
    zoneEn: "Scrap Desert",
    role: "Bandido PK",
    roleEn: "PK Bandit",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_07', 'mouth_01', 'eyes_01', 'short_hair', 'granpa_beard', 'Red_topcoat', 'distressed_black_Jeans', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.55, g: 0.38, b: 0.24 },
      hairColor: { r: 0.9, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.1, b: 0.1 }
    },
    phraseEs: "Lo que encuentras en el desierto pertenece al más fuerte.",
    phraseEn: "Whatever you find in the desert belongs to the strongest."
  },
  {
    id: 'NPC-033',
    name: "Amara la Botánica",
    nameEn: "Amara la Botanist",
    title: "Conservadora de Oasis",
    titleEn: "Oasis Curator",
    zone: "Los Chatarrales",
    zoneEn: "The Scrap Yards",
    role: "Ecóloga Industrial",
    roleEn: "Industrial Ecologist",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_00', 'f_mouth_00', 'eyes_02', 'short_hair', 'f_blue_jacket', 'trash_jean', 'classic_shoes'].map(u),
      skinColor: { r: 0.72, g: 0.56, b: 0.42 },
      hairColor: { r: 0.4, g: 0.25, b: 0.1 },
      eyeColor: { r: 0.3, g: 0.8, b: 0.4 }
    },
    phraseEs: "Hasta en el metal frío la vida encuentra la forma de florecer.",
    phraseEn: "Even in cold metal, life finds a way to flourish."
  },
  {
    id: 'NPC-034',
    name: "Bruno el Mecánico",
    nameEn: "Bruno el Mechanic",
    title: "Ajustador de Bielas",
    titleEn: "Connecting Rod Adjuster",
    zone: "Distrito de la Forja",
    zoneEn: "Forge District",
    role: "Técnico de Engranajes",
    roleEn: "Gear Technician",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_01', 'mouth_03', 'eyes_03', 'moptop', 'full_beard', 'baggy_pullover', 'hip_hop_joggers', 'sport_black_shoes', 'aviatorstyle'].map(u),
      skinColor: { r: 0.7, g: 0.52, b: 0.38 },
      hairColor: { r: 0.25, g: 0.15, b: 0.05 },
      eyeColor: { r: 0.4, g: 0.6, b: 0.8 }
    },
    phraseEs: "Si escuchas un chirrido metálico, aplica grasa de engranajes inmediatamente.",
    phraseEn: "If you hear a metallic screech, apply gear grease immediately."
  },
  {
    id: 'NPC-035',
    name: "Celeste la Astronomía",
    nameEn: "Celeste la Astronomer",
    title: "Calibradora Óptica",
    titleEn: "Optical Calibrator",
    zone: "Torre de Radio",
    zoneEn: "Radio Tower",
    role: "Observadora Estelar",
    roleEn: "Stargazer",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_02', 'f_mouth_02', 'eyes_04', 'cool_hair', 'f_white_shirt', 'safari_pants', 'sneakers'].map(u),
      skinColor: { r: 0.76, g: 0.6, b: 0.48 },
      hairColor: { r: 0.2, g: 0.2, b: 0.3 },
      eyeColor: { r: 0.5, g: 0.3, b: 0.8 }
    },
    phraseEs: "Las estrellas se ven más nítidas desde la cúspide de la torre.",
    phraseEn: "The stars look sharper from the top of the radio tower."
  },
  {
    id: 'NPC-036',
    name: "Dominic el Fogonero",
    nameEn: "Dominic el Stoker",
    title: "Custodio del Crisol",
    titleEn: "Crucible Custodian",
    zone: "Calderas de Fundición",
    zoneEn: "Foundry Boilers",
    role: "Alimentador de Horno",
    roleEn: "Furnace Feeder",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_03', 'mouth_00', 'eyes_05', 'semi_bold', 'short_boxed_beard', 'm_sweater_02', 'brown_pants', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.58, g: 0.4, b: 0.26 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.3, b: 0.1 }
    },
    phraseEs: "El vapor de esta zona podría impulsar a diez titanes simultáneamente.",
    phraseEn: "Steam in this sector could power ten titans at once."
  },
  {
    id: 'NPC-037',
    name: "Evander el Vendedor",
    nameEn: "Evander el Vendor",
    title: "Mercader de Tubos",
    titleEn: "Pipe Merchant",
    zone: "Corredores y Vías Sur",
    zoneEn: "South Corridors & Paths",
    role: "Comerciante Itinerante",
    roleEn: "Traveling Merchant",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_04', 'mouth_01', 'eyes_06', 'punk', 'goatee_beard', 'green_square_shirt', 'brown_pants_02', 'citycomfortableshoes', 'black_glove'].map(u),
      skinColor: { r: 0.72, g: 0.54, b: 0.4 },
      hairColor: { r: 0.35, g: 0.2, b: 0.1 },
      eyeColor: { r: 0.3, g: 0.5, b: 0.7 }
    },
    phraseEs: "¡Tengo serpentines a prueba de fugas a precios imbatibles!",
    phraseEn: "I've got leak-proof coils at unbeatable prices!"
  },
  {
    id: 'NPC-038',
    name: "Freya la Reclutadora",
    nameEn: "Freya la Recruiter",
    title: "Organizadora de Duetos",
    titleEn: "Duet Organizer",
    zone: "Gran Arena Steampunk",
    zoneEn: "Grand Steampunk Arena",
    role: "Inscriptora de Torneos",
    roleEn: "Tournament Registrar",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_05', 'f_mouth_05', 'eyes_07', 'pony_tail', 'baggy_pullover', 'f_brown_trousers', 'classic_shoes'].map(u),
      skinColor: { r: 0.74, g: 0.56, b: 0.42 },
      hairColor: { r: 0.8, g: 0.65, b: 0.15 },
      eyeColor: { r: 0.2, g: 0.7, b: 0.8 }
    },
    phraseEs: "¿Tienes listo tu escuadrón? El próximo combate está por comenzar.",
    phraseEn: "Is your squad ready? The next battle is about to begin."
  },
  {
    id: 'NPC-039',
    name: "Garrick el Minero",
    nameEn: "Garrick el Miner",
    title: "Barrenador Neumático",
    titleEn: "Pneumatic Driller",
    zone: "Reserva de Minería",
    zoneEn: "Mining Reserve",
    role: "Operador de Taladro",
    roleEn: "Drill Operator",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_06', 'mouth_03', 'eyes_08', 'rasta', 'handlebar', 'croupier_shirt', 'corduroysandypants', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.6, g: 0.44, b: 0.3 },
      hairColor: { r: 0.2, g: 0.15, b: 0.1 },
      eyeColor: { r: 0.4, g: 0.4, b: 0.4 }
    },
    phraseEs: "La veta principal de bronce se extiende hacia el noreste.",
    phraseEn: "The main bronze vein stretches towards the northeast."
  },
  {
    id: 'NPC-040',
    name: "Hesper la Electrónica",
    nameEn: "Hesper la Electronics Tech",
    title: "Reparadora de Diodos",
    titleEn: "Diode Repairer",
    zone: "Subestación Eléctrica",
    zoneEn: "Electric Substation",
    role: "Técnica de Microcircuitos",
    roleEn: "Microcircuit Tech",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_07', 'f_mouth_07', 'eyes_09', 'shoulder_bob_hair', 'black_top', 'comfortablepants', 'sneakers', 'piratepatch'].map(u),
      skinColor: { r: 0.76, g: 0.6, b: 0.48 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.3, g: 0.8, b: 0.7 }
    },
    phraseEs: "Los diodos regulan el pulso luminoso del circuito central.",
    phraseEn: "The diodes regulate the luminous pulse of the core circuit."
  },
  {
    id: 'NPC-041',
    name: "Ignatius el Piromante",
    nameEn: "Ignatius el Pyromancer",
    title: "Alquimista de Fuego",
    titleEn: "Fire Alchemist",
    zone: "Calderas de Fundición",
    zoneEn: "Foundry Boilers",
    role: "Refinador de Carbón",
    roleEn: "Coal Refiner",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'hair_coolshortstyle', 'beard', 'sleeveless_punk_shirt', 'trash_jean', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.62, g: 0.42, b: 0.28 },
      hairColor: { r: 0.9, g: 0.3, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.4, b: 0.1 }
    },
    phraseEs: "El carbón refinado genera el doble de calorías con la mitad de humo.",
    phraseEn: "Refined coal produces double the heat with half the smoke."
  },
  {
    id: 'NPC-042',
    name: "Juno la Cazadora",
    nameEn: "Juno la Hunter",
    title: "Rastreadora de Singularidades",
    titleEn: "Singularity Tracker",
    zone: "Desierto de Chatarra",
    zoneEn: "Scrap Desert",
    role: "Cazadora de Reliquias PK",
    roleEn: "PK Relic Hunter",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_01', 'f_mouth_01', 'eyes_01', 'double_bun', 'f_red_elegant_jacket', 'distressed_black_Jeans', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.58, g: 0.4, b: 0.26 },
      hairColor: { r: 0.15, g: 0.1, b: 0.05 },
      eyeColor: { r: 0.8, g: 0.2, b: 0.8 }
    },
    phraseEs: "La singularidad no se busca, se presiente en el pulso del terreno.",
    phraseEn: "The singularity isn't found, it's felt in the ground's pulse."
  },
  {
    id: 'NPC-043',
    name: "Kael el Chatarrero",
    nameEn: "Kael el Scrapper",
    title: "Vendedor de Cadenas",
    titleEn: "Chain Vendor",
    zone: "Los Chatarrales",
    zoneEn: "The Scrap Yards",
    role: "Recolector de Ferretería",
    roleEn: "Hardware Scavenger",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_02', 'mouth_02', 'eyes_02', 'slicked_hair', 'balbo_beard', 'puffer_jacket', 'safari_pants', 'classic_shoes', 'cyclope'].map(u),
      skinColor: { r: 0.66, g: 0.48, b: 0.34 },
      hairColor: { r: 0.25, g: 0.15, b: 0.08 },
      eyeColor: { r: 0.4, g: 0.5, b: 0.4 }
    },
    phraseEs: "Una buena cadena de hierro frena a cualquier autómata desbocado.",
    phraseEn: "A sturdy iron chain stops any runaway automaton."
  },
  {
    id: 'NPC-044',
    name: "Lora la Guía",
    nameEn: "Lora la Guide",
    title: "Orientadora Comercial",
    titleEn: "Commercial Advisor",
    zone: "Distrito de la Forja",
    zoneEn: "Forge District",
    role: "Guía de Quioscos",
    roleEn: "Kiosk Guide",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_03', 'f_mouth_03', 'eyes_03', 'short_hair', 'f_sweater', 'f_jeans', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.74, g: 0.58, b: 0.44 },
      hairColor: { r: 0.5, g: 0.3, b: 0.15 },
      eyeColor: { r: 0.3, g: 0.7, b: 0.8 }
    },
    phraseEs: "Si buscas transistores o bulbos, visita el Paseo Comercial Oeste.",
    phraseEn: "If you're looking for transistors or vacuum tubes, visit West Market Promenade."
  },
  {
    id: 'NPC-045',
    name: "Milo el Ensamblador",
    nameEn: "Milo el Assembler",
    title: "Ajustador de Bastidores",
    titleEn: "Frame Adjuster",
    zone: "Fábrica Abandonada",
    zoneEn: "Abandoned Factory",
    role: "Ensamblador Chasis",
    roleEn: "Chassis Assembler",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_04', 'mouth_04', 'eyes_04', 'modern_hair', 'goatee_beard', 'Red_topcoat', 'grey_joggers', 'sneakers'].map(u),
      skinColor: { r: 0.62, g: 0.44, b: 0.3 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.4, g: 0.6, b: 0.5 }
    },
    phraseEs: "Los remaches deben colocarse caliente para asegurar el sellado.",
    phraseEn: "Rivets must be set hot to ensure a tight seal."
  },
  {
    id: 'NPC-046',
    name: "Nix la Cazadora",
    nameEn: "Nix la Hunter",
    title: "Tiradora del Páramo",
    titleEn: "Wasteland Marksman",
    zone: "Desierto de Chatarra",
    zoneEn: "Scrap Desert",
    role: "Francotiradora PK",
    roleEn: "PK Sniper",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_05', 'f_mouth_05', 'eyes_05', 'cool_hair', 'sleeveless_punk_shirt', 'f_brown_trousers', 'm_mountainshoes.glb', 'aviatorstyle'].map(u),
      skinColor: { r: 0.6, g: 0.42, b: 0.28 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.8, b: 0.2 }
    },
    phraseEs: "Veo todo lo que se mueve entre la arena y la chatarra.",
    phraseEn: "I see everything moving between the sand and the scrap."
  },
  {
    id: 'NPC-047',
    name: "Odin el Juez",
    nameEn: "Odin el Judge",
    title: "Árbitro de Torneo",
    titleEn: "Tournament Referee",
    zone: "Gran Arena Steampunk",
    zoneEn: "Grand Steampunk Arena",
    role: "Certificador Elo",
    roleEn: "Elo Certifier",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_06', 'mouth_01', 'eyes_06', 'hair_undere', 'handlebar', 'baggy_pullover', 'brown_pants_02', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.72, g: 0.56, b: 0.42 },
      hairColor: { r: 0.85, g: 0.85, b: 0.85 },
      eyeColor: { r: 0.2, g: 0.5, b: 0.8 }
    },
    phraseEs: "En esta arena triunfa la estrategia, no la trampa.",
    phraseEn: "In this arena, strategy wins over trickery."
  },
  {
    id: 'NPC-048',
    name: "Piper la Mensajera",
    nameEn: "Piper la Messenger",
    title: "Estafeta Vacio",
    titleEn: "Void Courier",
    zone: "Corredores y Vías Sur",
    zoneEn: "South Corridors & Paths",
    role: "Repartidora Exprés",
    roleEn: "Express Courier",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_07', 'f_mouth_07', 'eyes_07', 'curly_hair', 'baggy_pullover', 'comfortablepants', 'classic_shoes'].map(u),
      skinColor: { r: 0.72, g: 0.54, b: 0.4 },
      hairColor: { r: 0.85, g: 0.3, b: 0.1 },
      eyeColor: { r: 0.3, g: 0.7, b: 0.5 }
    },
    phraseEs: "Tengo cinco entregas pendientes antes de que caiga la noche.",
    phraseEn: "I've got five deliveries pending before nightfall."
  },
  {
    id: 'NPC-049',
    name: "Quinn el Espectador",
    nameEn: "Quinn el Spectator",
    title: "Aficionado Afanoso",
    titleEn: "Eager Fan",
    zone: "Gran Arena Steampunk",
    zoneEn: "Grand Steampunk Arena",
    role: "Espectador Mad Max",
    roleEn: "Mad Max Spectator",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_00', 'mouth_03', 'eyes_08', 'punk', 'beard', 'm_sweater_02', 'corduroysandypants', 'sport_black_shoes', 'black_glove'].map(u),
      skinColor: { r: 0.68, g: 0.5, b: 0.36 },
      hairColor: { r: 0.4, g: 0.25, b: 0.15 },
      eyeColor: { r: 0.4, g: 0.6, b: 0.3 }
    },
    phraseEs: "¡Ese contraataque galvánico fue sencillamente espectacular!",
    phraseEn: "That galvanic counterattack was nothing short of spectacular!"
  },
  {
    id: 'NPC-050',
    name: "Ronan el Comerciante",
    nameEn: "Ronan el Merchant",
    title: "Mercader de Cristales",
    titleEn: "Crystal Merchant",
    zone: "Reserva de Minería",
    zoneEn: "Mining Reserve",
    role: "Comerciante de Éter",
    roleEn: "Aether Merchant",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_01', 'mouth_04', 'eyes_09', 'hair_punk', 'full_beard', 'green_square_shirt', 'oxford_pants', 'sneakers'].map(u),
      skinColor: { r: 0.7, g: 0.52, b: 0.38 },
      hairColor: { r: 0.2, g: 0.2, b: 0.25 },
      eyeColor: { r: 0.6, g: 0.4, b: 0.8 }
    },
    phraseEs: "Compro cristales puros al mejor precio del mercado norte.",
    phraseEn: "I hold rare components salvaged directly from the northeast mines."
  },
  {
    id: 'NPC-051',
    name: "Aldous el Fogonero",
    nameEn: "Aldous el Stoker",
    title: "Fogonero Mayor",
    titleEn: "Chief Stoker",
    zone: "Distrito de la Forja",
    zoneEn: "Forge District",
    role: "Fogonero Mayor en Distrito de la Forja",
    roleEn: "Chief Stoker in Forge District",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_03', 'mouth_01', 'eyes_01', 'cool_hair', 'Mustache_Short_Beard', 'red_square_shirt', 'brown_pants', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.7, g: 0.5, b: 0.38 },
      hairColor: { r: 0.41, g: 0.3, b: 0.25 },
      eyeColor: { r: 0.56, g: 0.61, b: 0.46 }
    },
    phraseEs: "El vapor a alta presión exige calibración milimétrica constante.",
    phraseEn: "High-pressure steam requires constant millimeter calibration."
  },
  {
    id: 'NPC-052',
    name: "Beatrix la Ingeniera",
    nameEn: "Beatrix la Engineer",
    title: "Ingeniera de Precisión",
    titleEn: "Precision Engineer",
    zone: "Subestación Eléctrica",
    zoneEn: "Electric Substation",
    role: "Ingeniera de Precisión en Subestación Eléctrica",
    roleEn: "Precision Engineer in Electric Substation",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_04', 'f_mouth_04', 'eyes_02', 'curly_hair', 'baggy_pullover', 'tight_pants', 'sneakers'].map(u),
      skinColor: { r: 0.71, g: 0.5, b: 0.38 },
      hairColor: { r: 0.41, g: 0.31, b: 0.26 },
      eyeColor: { r: 0.56, g: 0.61, b: 0.46 }
    },
    phraseEs: "Las bobinas Tesla rugen con más fuerza cuando se aproxima la tormenta.",
    phraseEn: "Tesla coils roar louder when the wasteland storm approaches."
  },
  {
    id: 'NPC-053',
    name: "Cassian el Recolector",
    nameEn: "Cassian el Scavenger",
    title: "Recolector de Tuercas",
    titleEn: "Nut Collector",
    zone: "Los Chatarrales",
    zoneEn: "The Scrap Yards",
    role: "Recolector de Tuercas en Los Chatarrales",
    roleEn: "Nut Collector in The Scrap Yards",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_05', 'mouth_03', 'eyes_03', 'messy_hair', 'bald_beard', 'tshirt_01', 'oxford_pants', 'boots'].map(u),
      skinColor: { r: 0.71, g: 0.51, b: 0.39 },
      hairColor: { r: 0.42, g: 0.31, b: 0.26 },
      eyeColor: { r: 0.57, g: 0.62, b: 0.47 }
    },
    phraseEs: "No dejes tu chatarra desatendida; en el páramo todo cambia de dueño.",
    phraseEn: "Never leave your scrap unattended; everything changes hands out here."
  },
  {
    id: 'NPC-054',
    name: "Delphina la Custodia",
    nameEn: "Delphina la Custodian",
    title: "Custodia de Cristal",
    titleEn: "Crystal Custodian",
    zone: "Reserva de Minería",
    zoneEn: "Mining Reserve",
    role: "Custodia de Cristal en Reserva de Minería",
    roleEn: "Crystal Custodian in Mining Reserve",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_06', 'f_mouth_06', 'eyes_04', 'cornrows', 'f_blue_jacket', 'camo_pants', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.71, g: 0.51, b: 0.39 },
      hairColor: { r: 0.42, g: 0.32, b: 0.26 },
      eyeColor: { r: 0.58, g: 0.62, b: 0.47 }
    },
    phraseEs: "Los cristales de cuarzo guardan resonancias de la antigua sobrecarga.",
    phraseEn: "Quartz crystals retain resonances from the ancient power overload."
  },
  {
    id: 'NPC-055',
    name: "Eldrin el Cazador",
    nameEn: "Eldrin el Hunter",
    title: "Cazador de Éter",
    titleEn: "Aether Hunter",
    zone: "Desierto de Chatarra",
    zoneEn: "Scrap Desert",
    role: "Cazador de Éter en Desierto de Chatarra",
    roleEn: "Aether Hunter in Scrap Desert",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_07', 'mouth_00', 'eyes_05', 'curly_hair', 'full_beard', 'black_jacket', 'camo_pants', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.72, g: 0.51, b: 0.39 },
      hairColor: { r: 0.43, g: 0.32, b: 0.27 },
      eyeColor: { r: 0.58, g: 0.63, b: 0.48 }
    },
    phraseEs: "En el desierto de chatarra, solo la blindada supervivencia es norma.",
    phraseEn: "In the scrap desert, armored survival is the only law that remains."
  },
  {
    id: 'NPC-056',
    name: "Freya la Vendedora",
    nameEn: "Freya la Vendor",
    title: "Vendedora de Latón",
    titleEn: "Brass Vendor",
    zone: "Fábrica Abandonada",
    zoneEn: "Abandoned Factory",
    role: "Vendedora de Latón en Fábrica Abandonada",
    roleEn: "Brass Vendor in Abandoned Factory",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_00', 'f_mouth_00', 'eyes_06', 'bob_hair', 'f_red_elegant_jacket', 'f_country_pants', 'classic_shoes'].map(u),
      skinColor: { r: 0.72, g: 0.51, b: 0.39 },
      hairColor: { r: 0.43, g: 0.32, b: 0.27 },
      eyeColor: { r: 0.59, g: 0.64, b: 0.48 }
    },
    phraseEs: "Un autómata bien lubricado es la diferencia entre la victoria y el desguace.",
    phraseEn: "A well-lubricated automaton is the line between victory and scrap."
  },
  {
    id: 'NPC-057',
    name: "Gideon el Operador",
    nameEn: "Gideon el Operator",
    title: "Operador de Manómetros",
    titleEn: "Gauge Operator",
    zone: "Torre de Radio",
    zoneEn: "Radio Tower",
    role: "Operador de Manómetros en Torre de Radio",
    roleEn: "Gauge Operator in Radio Tower",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_01', 'mouth_02', 'eyes_07', 'hair_punk', 'Mustache_Short_Beard', 'puffer_jacket', 'distressed_black_Jeans', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.72, g: 0.51, b: 0.39 },
      hairColor: { r: 0.44, g: 0.33, b: 0.27 },
      eyeColor: { r: 0.6, g: 0.64, b: 0.49 }
    },
    phraseEs: "Las frecuencias de radio transmiten ecos de instalaciones olvidadas.",
    phraseEn: "Radio frequencies broadcast echoes from long-forgotten facilities."
  },
  {
    id: 'NPC-058',
    name: "Hesper la Desguazadora",
    nameEn: "Hesper la Scrappera",
    title: "Desguazadora de Tuberías",
    titleEn: "Pipe Scrapper",
    zone: "Calderas de Fundición",
    zoneEn: "Foundry Boilers",
    role: "Desguazadora de Tuberías en Calderas de Fundición",
    roleEn: "Pipe Scrapper in Foundry Boilers",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_02', 'f_mouth_02', 'eyes_08', 'long_wavy_hair', 'baggy_pullover', 'comfortablepants', 'sneakers'].map(u),
      skinColor: { r: 0.72, g: 0.52, b: 0.4 },
      hairColor: { r: 0.44, g: 0.33, b: 0.27 },
      eyeColor: { r: 0.61, g: 0.65, b: 0.49 }
    },
    phraseEs: "El carbón de las calderas arde mejor con un chorro de éter comprimido.",
    phraseEn: "Boiler coal burns much hotter when fed with compressed aether."
  },
  {
    id: 'NPC-059',
    name: "Ignis el Transmisor",
    nameEn: "Ignis el Transmitter",
    title: "Transmisor de Señal",
    titleEn: "Signal Transmitter",
    zone: "Gran Arena Steampunk",
    zoneEn: "Grand Steampunk Arena",
    role: "Transmisor de Señal en Gran Arena Steampunk",
    roleEn: "Signal Transmitter in Grand Steampunk Arena",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_03', 'mouth_04', 'eyes_09', 'keanu_hair', 'bald_beard', 'm_sweater', 'brown_pants', 'boots'].map(u),
      skinColor: { r: 0.73, g: 0.52, b: 0.4 },
      hairColor: { r: 0.44, g: 0.34, b: 0.28 },
      eyeColor: { r: 0.61, g: 0.65, b: 0.49 }
    },
    phraseEs: "La arena central no perdona dudas; entra con convicción o retrocede.",
    phraseEn: "The central arena forgives no doubt; step in bold or step back."
  },
  {
    id: 'NPC-060',
    name: "Juno la Gladiadora",
    nameEn: "Juno la Gladiatora",
    title: "Gladiadora de Éter",
    titleEn: "Aether Gladiator",
    zone: "Corredores y Vías Sur",
    zoneEn: "South Corridors & Paths",
    role: "Gladiadora de Éter en Corredores y Vías Sur",
    roleEn: "Aether Gladiator in South Corridors & Paths",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_04', 'f_mouth_04', 'eyes_00', 'straight_hair', 'f_blue_jacket', 'safari_pants', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.73, g: 0.52, b: 0.4 },
      hairColor: { r: 0.45, g: 0.34, b: 0.28 },
      eyeColor: { r: 0.62, g: 0.66, b: 0.5 }
    },
    phraseEs: "Tengo componentes raros traídos directamente de las minas del noreste.",
    phraseEn: "I hold rare components salvaged directly from the northeast mines."
  },
  {
    id: 'NPC-061',
    name: "Kael el Alquimista",
    nameEn: "Kael el Alchemist",
    title: "Alquimista de Plasma",
    titleEn: "Plasma Alchemist",
    zone: "Distrito de la Forja",
    zoneEn: "Forge District",
    role: "Alquimista de Plasma en Distrito de la Forja",
    roleEn: "Plasma Alchemist in Forge District",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_05', 'mouth_01', 'eyes_01', 'short_hair', 'full_beard', 'green_square_shirt', 'oxford_pants', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.73, g: 0.52, b: 0.4 },
      hairColor: { r: 0.45, g: 0.34, b: 0.28 },
      eyeColor: { r: 0.63, g: 0.67, b: 0.51 }
    },
    phraseEs: "El vapor a alta presión exige calibración milimétrica constante.",
    phraseEn: "High-pressure steam requires constant millimeter calibration."
  },
  {
    id: 'NPC-062',
    name: "Lyra la Ayudante",
    nameEn: "Lyra la Helper",
    title: "Ayudante de Forja",
    titleEn: "Forge Helper",
    zone: "Subestación Eléctrica",
    zoneEn: "Electric Substation",
    role: "Ayudante de Forja en Subestación Eléctrica",
    roleEn: "Forge Helper in Electric Substation",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_06', 'f_mouth_06', 'eyes_02', 'ponytail_02', 'f_red_elegant_jacket', 'tight_pants', 'classic_shoes'].map(u),
      skinColor: { r: 0.74, g: 0.52, b: 0.4 },
      hairColor: { r: 0.46, g: 0.35, b: 0.29 },
      eyeColor: { r: 0.63, g: 0.67, b: 0.51 }
    },
    phraseEs: "Las bobinas Tesla rugen con más fuerza cuando se aproxima la tormenta.",
    phraseEn: "Tesla coils roar louder when the wasteland storm approaches."
  },
  {
    id: 'NPC-063',
    name: "Magnus el Técnico",
    nameEn: "Magnus el Technician",
    title: "Técnico Tesla",
    titleEn: "Tesla Technician",
    zone: "Los Chatarrales",
    zoneEn: "The Scrap Yards",
    role: "Técnico Tesla en Los Chatarrales",
    roleEn: "Tesla Technician in The Scrap Yards",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_07', 'mouth_03', 'eyes_03', 'punk', 'Mustache_Short_Beard', 'poloblacktshirt', 'camo_pants', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.74, g: 0.53, b: 0.41 },
      hairColor: { r: 0.46, g: 0.35, b: 0.29 },
      eyeColor: { r: 0.64, g: 0.68, b: 0.52 }
    },
    phraseEs: "No dejes tu chatarra desatendida; en el páramo todo cambia de dueño.",
    phraseEn: "Never leave your scrap unattended; everything changes hands out here."
  },
  {
    id: 'NPC-064',
    name: "Nora la Explotadora",
    nameEn: "Nora la Excavator",
    title: "Explotadora de Vetas",
    titleEn: "Vein Excavator",
    zone: "Reserva de Minería",
    zoneEn: "Mining Reserve",
    role: "Explotadora de Vetas en Reserva de Minería",
    roleEn: "Vein Excavator in Mining Reserve",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_00', 'f_mouth_00', 'eyes_04', 'pony_tail', 'baggy_pullover', 'camo_pants', 'sneakers'].map(u),
      skinColor: { r: 0.74, g: 0.53, b: 0.41 },
      hairColor: { r: 0.47, g: 0.36, b: 0.29 },
      eyeColor: { r: 0.65, g: 0.68, b: 0.52 }
    },
    phraseEs: "Los cristales de cuarzo guardan resonancias de la antigua sobrecarga.",
    phraseEn: "Quartz crystals retain resonances from the ancient power overload."
  },
  {
    id: 'NPC-065',
    name: "Orion el Vigía",
    nameEn: "Orion el Watcher",
    title: "Vigía del Páramo",
    titleEn: "Wasteland Watcher",
    zone: "Desierto de Chatarra",
    zoneEn: "Scrap Desert",
    role: "Vigía del Páramo en Desierto de Chatarra",
    roleEn: "Wasteland Watcher in Scrap Desert",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_01', 'mouth_00', 'eyes_05', 'cool_hair', 'bald_beard', 'tshirt_02', 'distressed_black_Jeans', 'boots'].map(u),
      skinColor: { r: 0.75, g: 0.53, b: 0.41 },
      hairColor: { r: 0.47, g: 0.36, b: 0.3 },
      eyeColor: { r: 0.66, g: 0.69, b: 0.53 }
    },
    phraseEs: "En el desierto de chatarra, solo la blindada supervivencia es norma.",
    phraseEn: "In the scrap desert, armored survival is the only law that remains."
  },
  {
    id: 'NPC-066',
    name: "Phaedra la Soldadora",
    nameEn: "Phaedra la Welder",
    title: "Soldadora de Arco",
    titleEn: "Arc Welder",
    zone: "Fábrica Abandonada",
    zoneEn: "Abandoned Factory",
    role: "Soldadora de Arco en Fábrica Abandonada",
    roleEn: "Arc Welder in Abandoned Factory",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_02', 'f_mouth_02', 'eyes_06', 'pixie_cut', 'f_blue_jacket', 'f_country_pants', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.75, g: 0.53, b: 0.41 },
      hairColor: { r: 0.48, g: 0.36, b: 0.3 },
      eyeColor: { r: 0.66, g: 0.7, b: 0.53 }
    },
    phraseEs: "Un autómata bien lubricado es la diferencia entre la victoria y el desguace.",
    phraseEn: "A well-lubricated automaton is the line between victory and scrap."
  },
  {
    id: 'NPC-067',
    name: "Quillon el Clasificador",
    nameEn: "Quillon el Sorter",
    title: "Clasificador de Chatarra",
    titleEn: "Scrap Sorter",
    zone: "Torre de Radio",
    zoneEn: "Radio Tower",
    role: "Clasificador de Chatarra en Torre de Radio",
    roleEn: "Scrap Sorter in Radio Tower",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_03', 'mouth_02', 'eyes_07', 'messy_hair', 'full_beard', 'sleeveless_punk_shirt', 'brown_pants', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.75, g: 0.53, b: 0.41 },
      hairColor: { r: 0.48, g: 0.37, b: 0.3 },
      eyeColor: { r: 0.67, g: 0.7, b: 0.54 }
    },
    phraseEs: "Las frecuencias de radio transmiten ecos de instalaciones olvidadas.",
    phraseEn: "Radio frequencies broadcast echoes from long-forgotten facilities."
  },
  {
    id: 'NPC-068',
    name: "Rhea la Estafeta",
    nameEn: "Rhea la Courier",
    title: "Estafeta de Noticias",
    titleEn: "News Courier",
    zone: "Calderas de Fundición",
    zoneEn: "Foundry Boilers",
    role: "Estafeta de Noticias en Calderas de Fundición",
    roleEn: "News Courier in Foundry Boilers",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_04', 'f_mouth_04', 'eyes_08', 'braid_hair', 'f_red_elegant_jacket', 'comfortablepants', 'classic_shoes'].map(u),
      skinColor: { r: 0.75, g: 0.54, b: 0.42 },
      hairColor: { r: 0.49, g: 0.37, b: 0.3 },
      eyeColor: { r: 0.68, g: 0.71, b: 0.54 }
    },
    phraseEs: "El carbón de las calderas arde mejor con un chorro de éter comprimido.",
    phraseEn: "Boiler coal burns much hotter when fed with compressed aether."
  },
  {
    id: 'NPC-069',
    name: "Silas el Mantenedor",
    nameEn: "Silas el Maintainer",
    title: "Mantenedor de Pistones",
    titleEn: "Piston Maintainer",
    zone: "Gran Arena Steampunk",
    zoneEn: "Grand Steampunk Arena",
    role: "Mantenedor de Pistones en Gran Arena Steampunk",
    roleEn: "Piston Maintainer in Grand Steampunk Arena",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_05', 'mouth_04', 'eyes_09', 'curly_hair', 'Mustache_Short_Beard', 'Red_topcoat', 'oxford_pants', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.76, g: 0.54, b: 0.42 },
      hairColor: { r: 0.49, g: 0.38, b: 0.31 },
      eyeColor: { r: 0.68, g: 0.71, b: 0.55 }
    },
    phraseEs: "La arena central no perdona dudas; entra con convicción o retrocede.",
    phraseEn: "The central arena forgives no doubt; step in bold or step back."
  },
  {
    id: 'NPC-070',
    name: "Tess la Sabia",
    nameEn: "Tess la Sage",
    title: "Sabia del Resonador",
    titleEn: "Resonator Sage",
    zone: "Corredores y Vías Sur",
    zoneEn: "South Corridors & Paths",
    role: "Sabia del Resonador en Corredores y Vías Sur",
    roleEn: "Resonator Sage in South Corridors & Paths",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_06', 'f_mouth_06', 'eyes_00', 'curly_hair', 'baggy_pullover', 'safari_pants', 'sneakers'].map(u),
      skinColor: { r: 0.76, g: 0.54, b: 0.42 },
      hairColor: { r: 0.5, g: 0.38, b: 0.31 },
      eyeColor: { r: 0.69, g: 0.72, b: 0.55 }
    },
    phraseEs: "Tengo componentes raros traídos directamente de las minas del noreste.",
    phraseEn: "I hold rare components salvaged directly from the northeast mines."
  },
  {
    id: 'NPC-071',
    name: "Ulysses el Especialista",
    nameEn: "Ulysses el Specialist",
    title: "Especialista en Vapor",
    titleEn: "Steam Specialist",
    zone: "Distrito de la Forja",
    zoneEn: "Forge District",
    role: "Especialista en Vapor en Distrito de la Forja",
    roleEn: "Especialista in Vapor",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_07', 'mouth_01', 'eyes_01', 'hair_punk', 'bald_beard', 'm_sweater_02', 'camo_pants', 'boots'].map(u),
      skinColor: { r: 0.76, g: 0.54, b: 0.42 },
      hairColor: { r: 0.51, g: 0.38, b: 0.31 },
      eyeColor: { r: 0.7, g: 0.73, b: 0.55 }
    },
    phraseEs: "El vapor a alta presión exige calibración milimétrica constante.",
    phraseEn: "High-pressure steam requires constant millimeter calibration."
  },
  {
    id: 'NPC-072',
    name: "Vespera la Historiadora",
    nameEn: "Vespera la Historian",
    title: "Historiadora de Chatarra",
    titleEn: "Scrap Historian",
    zone: "Subestación Eléctrica",
    zoneEn: "Electric Substation",
    role: "Historiadora de Chatarra en Subestación Eléctrica",
    roleEn: "Scrap Historian in Electric Substation",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_00', 'f_mouth_00', 'eyes_02', 'cornrows', 'f_blue_jacket', 'tight_pants', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.77, g: 0.54, b: 0.42 },
      hairColor: { r: 0.51, g: 0.39, b: 0.32 },
      eyeColor: { r: 0.7, g: 0.73, b: 0.56 }
    },
    phraseEs: "Las bobinas Tesla rugen con más fuerza cuando se aproxima la tormenta.",
    phraseEn: "Tesla coils roar louder when the wasteland storm approaches."
  },
  {
    id: 'NPC-073',
    name: "Wolf el Reparador",
    nameEn: "Wolf el Repairman",
    title: "Reparador de Cables",
    titleEn: "Cable Repairer",
    zone: "Los Chatarrales",
    zoneEn: "The Scrap Yards",
    role: "Reparador de Cables en Los Chatarrales",
    roleEn: "Cable Repairer in The Scrap Yards",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_01', 'mouth_03', 'eyes_03', 'keanu_hair', 'full_beard', 'red_square_shirt', 'distressed_black_Jeans', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.77, g: 0.55, b: 0.43 },
      hairColor: { r: 0.52, g: 0.39, b: 0.32 },
      eyeColor: { r: 0.71, g: 0.74, b: 0.56 }
    },
    phraseEs: "No dejes tu chatarra desatendida; en el páramo todo cambia de dueño.",
    phraseEn: "Never leave your scrap unattended; everything changes hands out here."
  },
  {
    id: 'NPC-074',
    name: "Xena la Árbitra",
    nameEn: "Xena la Referee",
    title: "Árbitra de Arena",
    titleEn: "Arena Referee",
    zone: "Reserva de Minería",
    zoneEn: "Mining Reserve",
    role: "Árbitra de Arena en Reserva de Minería",
    roleEn: "Arena Referee in Mining Reserve",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_02', 'f_mouth_02', 'eyes_04', 'bob_hair', 'f_red_elegant_jacket', 'camo_pants', 'classic_shoes'].map(u),
      skinColor: { r: 0.77, g: 0.55, b: 0.43 },
      hairColor: { r: 0.52, g: 0.4, b: 0.32 },
      eyeColor: { r: 0.72, g: 0.74, b: 0.57 }
    },
    phraseEs: "Los cristales de cuarzo guardan resonancias de la antigua sobrecarga.",
    phraseEn: "Quartz crystals retain resonances from the ancient power overload."
  },
  {
    id: 'NPC-075',
    name: "Ymir el Mercader",
    nameEn: "Ymir el Merchant",
    title: "Mercader de Relaves",
    titleEn: "Tailings Merchant",
    zone: "Desierto de Chatarra",
    zoneEn: "Scrap Desert",
    role: "Mercader de Relaves en Desierto de Chatarra",
    roleEn: "Tailings Merchant in Scrap Desert",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_03', 'mouth_00', 'eyes_05', 'short_hair', 'Mustache_Short_Beard', 'tshirt_01', 'brown_pants', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.78, g: 0.55, b: 0.43 },
      hairColor: { r: 0.53, g: 0.4, b: 0.33 },
      eyeColor: { r: 0.73, g: 0.75, b: 0.57 }
    },
    phraseEs: "En el desierto de chatarra, solo la blindada supervivencia es norma.",
    phraseEn: "In the scrap desert, armored survival is the only law that remains."
  },
  {
    id: 'NPC-076',
    name: "Zelda la Maestra",
    nameEn: "Zelda la Master",
    title: "Maestra de Calderas",
    titleEn: "Boiler Master",
    zone: "Fábrica Abandonada",
    zoneEn: "Abandoned Factory",
    role: "Maestra de Calderas en Fábrica Abandonada",
    roleEn: "Boiler Master in Abandoned Factory",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_04', 'f_mouth_04', 'eyes_06', 'long_wavy_hair', 'baggy_pullover', 'f_country_pants', 'sneakers'].map(u),
      skinColor: { r: 0.78, g: 0.55, b: 0.43 },
      hairColor: { r: 0.53, g: 0.4, b: 0.33 },
      eyeColor: { r: 0.73, g: 0.76, b: 0.58 }
    },
    phraseEs: "Un autómata bien lubricado es la diferencia entre la victoria y el desguace.",
    phraseEn: "A well-lubricated automaton is the line between victory and scrap."
  },
  {
    id: 'NPC-077',
    name: "Archie el Técnico",
    nameEn: "Archie el Technician",
    title: "Técnico Galvánico",
    titleEn: "Galvanic Technician",
    zone: "Torre de Radio",
    zoneEn: "Radio Tower",
    role: "Técnico Galvánico en Torre de Radio",
    roleEn: "Galvanic Technician in Radio Tower",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_05', 'mouth_02', 'eyes_07', 'punk', 'bald_beard', 'black_jacket', 'oxford_pants', 'boots'].map(u),
      skinColor: { r: 0.78, g: 0.55, b: 0.43 },
      hairColor: { r: 0.54, g: 0.41, b: 0.33 },
      eyeColor: { r: 0.74, g: 0.76, b: 0.58 }
    },
    phraseEs: "Las frecuencias de radio transmiten ecos de instalaciones olvidadas.",
    phraseEn: "Radio frequencies broadcast echoes from long-forgotten facilities."
  },
  {
    id: 'NPC-078',
    name: "Bree la Rastreadora",
    nameEn: "Bree la Tracker",
    title: "Rastreadora de Transistores",
    titleEn: "Transistor Tracker",
    zone: "Calderas de Fundición",
    zoneEn: "Foundry Boilers",
    role: "Rastreadora de Transistores en Calderas de Fundición",
    roleEn: "Transistor Tracker in Foundry Boilers",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_06', 'f_mouth_06', 'eyes_08', 'straight_hair', 'f_blue_jacket', 'comfortablepants', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.78, g: 0.56, b: 0.44 },
      hairColor: { r: 0.54, g: 0.41, b: 0.33 },
      eyeColor: { r: 0.75, g: 0.77, b: 0.59 }
    },
    phraseEs: "El carbón de las calderas arde mejor con un chorro de éter comprimido.",
    phraseEn: "Boiler coal burns much hotter when fed with compressed aether."
  },
  {
    id: 'NPC-079',
    name: "Corvus el Centinela",
    nameEn: "Corvus el Sentinel",
    title: "Centinela de Bóveda",
    titleEn: "Vault Sentinel",
    zone: "Gran Arena Steampunk",
    zoneEn: "Grand Steampunk Arena",
    role: "Centinela de Bóveda en Gran Arena Steampunk",
    roleEn: "Vault Sentinel in Grand Steampunk Arena",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_07', 'mouth_04', 'eyes_09', 'cool_hair', 'full_beard', 'puffer_jacket', 'camo_pants', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.79, g: 0.56, b: 0.44 },
      hairColor: { r: 0.55, g: 0.42, b: 0.34 },
      eyeColor: { r: 0.75, g: 0.77, b: 0.59 }
    },
    phraseEs: "La arena central no perdona dudas; entra con convicción o retrocede.",
    phraseEn: "The central arena forgives no doubt; step in bold or step back."
  },
  {
    id: 'NPC-080',
    name: "Dahlia la Mercenaria",
    nameEn: "Dahlia la Mercenary",
    title: "Mercenaria de Éter",
    titleEn: "Aether Mercenary",
    zone: "Corredores y Vías Sur",
    zoneEn: "South Corridors & Paths",
    role: "Mercenaria de Éter en Corredores y Vías Sur",
    roleEn: "Aether Mercenary in South Corridors & Paths",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_00', 'f_mouth_00', 'eyes_00', 'ponytail_02', 'f_red_elegant_jacket', 'safari_pants', 'classic_shoes'].map(u),
      skinColor: { r: 0.79, g: 0.56, b: 0.44 },
      hairColor: { r: 0.55, g: 0.42, b: 0.34 },
      eyeColor: { r: 0.76, g: 0.78, b: 0.6 }
    },
    phraseEs: "Tengo componentes raros traídos directamente de las minas del noreste.",
    phraseEn: "I hold rare components salvaged directly from the northeast mines."
  },
  {
    id: 'NPC-081',
    name: "Aldous el Ajustador",
    nameEn: "Aldous el Adjuster",
    title: "Ajustador de Presión",
    titleEn: "Pressure Adjuster",
    zone: "Distrito de la Forja",
    zoneEn: "Forge District",
    role: "Ajustador de Presión en Distrito de la Forja",
    roleEn: "Pressure Adjuster in Forge District",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_01', 'mouth_01', 'eyes_01', 'messy_hair', 'Mustache_Short_Beard', 'm_sweater', 'distressed_black_Jeans', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.79, g: 0.56, b: 0.44 },
      hairColor: { r: 0.56, g: 0.42, b: 0.34 },
      eyeColor: { r: 0.77, g: 0.79, b: 0.6 }
    },
    phraseEs: "El vapor a alta presión exige calibración milimétrica constante.",
    phraseEn: "High-pressure steam requires constant millimeter calibration."
  },
  {
    id: 'NPC-082',
    name: "Beatrix la Diseñadora",
    nameEn: "Beatrix la Designer",
    title: "Diseñadora de Autómatas",
    titleEn: "Automaton Designer",
    zone: "Subestación Eléctrica",
    zoneEn: "Electric Substation",
    role: "Diseñadora de Autómatas en Subestación Eléctrica",
    roleEn: "Automaton Designer in Electric Substation",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_02', 'f_mouth_02', 'eyes_02', 'pony_tail', 'baggy_pullover', 'tight_pants', 'sneakers'].map(u),
      skinColor: { r: 0.8, g: 0.56, b: 0.44 },
      hairColor: { r: 0.56, g: 0.43, b: 0.35 },
      eyeColor: { r: 0.77, g: 0.79, b: 0.61 }
    },
    phraseEs: "Las bobinas Tesla rugen con más fuerza cuando se aproxima la tormenta.",
    phraseEn: "Tesla coils roar louder when the wasteland storm approaches."
  },
  {
    id: 'NPC-083',
    name: "Cassian el Desguazador",
    nameEn: "Cassian el Scrapper",
    title: "Desguazador de Calderas",
    titleEn: "Boiler Scrapper",
    zone: "Los Chatarrales",
    zoneEn: "The Scrap Yards",
    role: "Desguazador de Calderas en Los Chatarrales",
    roleEn: "Boiler Scrapper in The Scrap Yards",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_03', 'mouth_03', 'eyes_03', 'curly_hair', 'bald_beard', 'green_square_shirt', 'brown_pants', 'boots'].map(u),
      skinColor: { r: 0.8, g: 0.57, b: 0.45 },
      hairColor: { r: 0.57, g: 0.43, b: 0.35 },
      eyeColor: { r: 0.78, g: 0.8, b: 0.61 }
    },
    phraseEs: "No dejes tu chatarra desatendida; en el páramo todo cambia de dueño.",
    phraseEn: "Never leave your scrap unattended; everything changes hands out here."
  },
  {
    id: 'NPC-084',
    name: "Delphina la Calibradora",
    nameEn: "Delphina la Calibrator",
    title: "Calibradora Óptica",
    titleEn: "Optical Calibrator",
    zone: "Reserva de Minería",
    zoneEn: "Mining Reserve",
    role: "Calibradora Óptica en Reserva de Minería",
    roleEn: "Optical Calibrator in Mining Reserve",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_04', 'f_mouth_04', 'eyes_04', 'pixie_cut', 'f_blue_jacket', 'camo_pants', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.55, g: 0.57, b: 0.45 },
      hairColor: { r: 0.57, g: 0.44, b: 0.35 },
      eyeColor: { r: 0.79, g: 0.8, b: 0.62 }
    },
    phraseEs: "Los cristales de cuarzo guardan resonancias de la antigua sobrecarga.",
    phraseEn: "Quartz crystals retain resonances from the ancient power overload."
  },
  {
    id: 'NPC-085',
    name: "Eldrin el Campeón",
    nameEn: "Eldrin el Champion",
    title: "Campeón de Arena",
    titleEn: "Arena Champion",
    zone: "Desierto de Chatarra",
    zoneEn: "Scrap Desert",
    role: "Campeón de Arena en Desierto de Chatarra",
    roleEn: "Arena Champion in Scrap Desert",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_05', 'mouth_00', 'eyes_05', 'hair_punk', 'full_beard', 'poloblacktshirt', 'oxford_pants', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.56, g: 0.57, b: 0.45 },
      hairColor: { r: 0.57, g: 0.44, b: 0.35 },
      eyeColor: { r: 0.79, g: 0.81, b: 0.63 }
    },
    phraseEs: "En el desierto de chatarra, solo la blindada supervivencia es norma.",
    phraseEn: "In the scrap desert, armored survival is the only law that remains."
  },
  {
    id: 'NPC-086',
    name: "Freya la Química",
    nameEn: "Freya la Chemist",
    title: "Química de Baterías",
    titleEn: "Battery Chemist",
    zone: "Fábrica Abandonada",
    zoneEn: "Abandoned Factory",
    role: "Química de Baterías en Fábrica Abandonada",
    roleEn: "Battery Chemist in Abandoned Factory",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_06', 'f_mouth_06', 'eyes_06', 'braid_hair', 'f_red_elegant_jacket', 'f_country_pants', 'classic_shoes'].map(u),
      skinColor: { r: 0.56, g: 0.57, b: 0.45 },
      hairColor: { r: 0.58, g: 0.44, b: 0.36 },
      eyeColor: { r: 0.8, g: 0.82, b: 0.63 }
    },
    phraseEs: "Un autómata bien lubricado es la diferencia entre la victoria y el desguace.",
    phraseEn: "A well-lubricated automaton is the line between victory and scrap."
  },
  {
    id: 'NPC-087',
    name: "Gideon el Aprendiz",
    nameEn: "Gideon el Apprentice",
    title: "Aprendiz de Latón",
    titleEn: "Brass Apprentice",
    zone: "Torre de Radio",
    zoneEn: "Radio Tower",
    role: "Aprendiz de Latón en Torre de Radio",
    roleEn: "Brass Apprentice in Radio Tower",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_07', 'mouth_02', 'eyes_07', 'keanu_hair', 'Mustache_Short_Beard', 'tshirt_02', 'camo_pants', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.56, g: 0.57, b: 0.45 },
      hairColor: { r: 0.58, g: 0.45, b: 0.36 },
      eyeColor: { r: 0.81, g: 0.82, b: 0.64 }
    },
    phraseEs: "Las frecuencias de radio transmiten ecos de instalaciones olvidadas.",
    phraseEn: "Radio frequencies broadcast echoes from long-forgotten facilities."
  },
  {
    id: 'NPC-088',
    name: "Hesper la Operadora",
    nameEn: "Hesper la Operator",
    title: "Operadora de Presión",
    titleEn: "Pressure Operator",
    zone: "Calderas de Fundición",
    zoneEn: "Foundry Boilers",
    role: "Operadora de Presión en Calderas de Fundición",
    roleEn: "Pressure Operator in Foundry Boilers",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_00', 'f_mouth_00', 'eyes_08', 'curly_hair', 'baggy_pullover', 'comfortablepants', 'sneakers'].map(u),
      skinColor: { r: 0.56, g: 0.58, b: 0.46 },
      hairColor: { r: 0.59, g: 0.45, b: 0.36 },
      eyeColor: { r: 0.82, g: 0.83, b: 0.64 }
    },
    phraseEs: "El carbón de las calderas arde mejor con un chorro de éter comprimido.",
    phraseEn: "Boiler coal burns much hotter when fed with compressed aether."
  },
  {
    id: 'NPC-089',
    name: "Ignis el Barrenador",
    nameEn: "Ignis el Driller",
    title: "Barrenador de Vetas",
    titleEn: "Vein Driller",
    zone: "Gran Arena Steampunk",
    zoneEn: "Grand Steampunk Arena",
    role: "Barrenador de Vetas en Gran Arena Steampunk",
    roleEn: "Vein Driller in Grand Steampunk Arena",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_01', 'mouth_04', 'eyes_09', 'short_hair', 'bald_beard', 'sleeveless_punk_shirt', 'distressed_black_Jeans', 'boots'].map(u),
      skinColor: { r: 0.57, g: 0.58, b: 0.46 },
      hairColor: { r: 0.59, g: 0.46, b: 0.37 },
      eyeColor: { r: 0.82, g: 0.83, b: 0.65 }
    },
    phraseEs: "La arena central no perdona dudas; entra con convicción o retrocede.",
    phraseEn: "The central arena forgives no doubt; step in bold or step back."
  },
  {
    id: 'NPC-090',
    name: "Juno la Centinela",
    nameEn: "Juno la Sentinel",
    title: "Centinela de Frecuencias",
    titleEn: "Frequency Sentinel",
    zone: "Corredores y Vías Sur",
    zoneEn: "South Corridors & Paths",
    role: "Centinela de Frecuencias en Corredores y Vías Sur",
    roleEn: "Frequency Sentinel in South Corridors & Paths",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_02', 'f_mouth_02', 'eyes_00', 'cornrows', 'f_blue_jacket', 'safari_pants', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.57, g: 0.58, b: 0.28 },
      hairColor: { r: 0.6, g: 0.46, b: 0.37 },
      eyeColor: { r: 0.83, g: 0.84, b: 0.65 }
    },
    phraseEs: "Tengo componentes raros traídos directamente de las minas del noreste.",
    phraseEn: "I hold rare components salvaged directly from the northeast mines."
  },
  {
    id: 'NPC-091',
    name: "Kael el Escolta",
    nameEn: "Kael el Escort",
    title: "Escolta Mecanizado",
    titleEn: "Mechanized Escort",
    zone: "Distrito de la Forja",
    zoneEn: "Forge District",
    role: "Escolta Mecanizado en Distrito de la Forja",
    roleEn: "Mechanized Escort in Forge District",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_03', 'mouth_01', 'eyes_01', 'punk', 'full_beard', 'Red_topcoat', 'brown_pants', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.57, g: 0.58, b: 0.28 },
      hairColor: { r: 0.6, g: 0.46, b: 0.37 },
      eyeColor: { r: 0.84, g: 0.85, b: 0.66 }
    },
    phraseEs: "El vapor a alta presión exige calibración milimétrica constante.",
    phraseEn: "High-pressure steam requires constant millimeter calibration."
  },
  {
    id: 'NPC-092',
    name: "Lyra la Clasificadora",
    nameEn: "Lyra la Sorter",
    title: "Clasificadora de Pernos",
    titleEn: "Bolt Sorter",
    zone: "Subestación Eléctrica",
    zoneEn: "Electric Substation",
    role: "Clasificadora de Pernos en Subestación Eléctrica",
    roleEn: "Bolt Sorter in Electric Substation",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_04', 'f_mouth_04', 'eyes_02', 'bob_hair', 'f_red_elegant_jacket', 'tight_pants', 'classic_shoes'].map(u),
      skinColor: { r: 0.58, g: 0.58, b: 0.28 },
      hairColor: { r: 0.61, g: 0.47, b: 0.38 },
      eyeColor: { r: 0.84, g: 0.85, b: 0.66 }
    },
    phraseEs: "Las bobinas Tesla rugen con más fuerza cuando se aproxima la tormenta.",
    phraseEn: "Tesla coils roar louder when the wasteland storm approaches."
  },
  {
    id: 'NPC-093',
    name: "Magnus el Corredor",
    nameEn: "Magnus el Runner",
    title: "Corredor de Alijos",
    titleEn: "Cache Runner",
    zone: "Los Chatarrales",
    zoneEn: "The Scrap Yards",
    role: "Corredor de Alijos en Los Chatarrales",
    roleEn: "Cache Runner in The Scrap Yards",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_05', 'mouth_03', 'eyes_03', 'cool_hair', 'Mustache_Short_Beard', 'm_sweater_02', 'oxford_pants', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.58, g: 0.59, b: 0.29 },
      hairColor: { r: 0.61, g: 0.47, b: 0.38 },
      eyeColor: { r: 0.85, g: 0.86, b: 0.67 }
    },
    phraseEs: "No dejes tu chatarra desatendida; en el páramo todo cambia de dueño.",
    phraseEn: "Never leave your scrap unattended; everything changes hands out here."
  },
  {
    id: 'NPC-094',
    name: "Nora la Mecánica",
    nameEn: "Nora la Mechanic",
    title: "Mecánica de Bastidores",
    titleEn: "Frame Mechanic",
    zone: "Reserva de Minería",
    zoneEn: "Mining Reserve",
    role: "Mecánica de Bastidores en Reserva de Minería",
    roleEn: "Frame Mechanic in Mining Reserve",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_06', 'f_mouth_06', 'eyes_04', 'long_wavy_hair', 'baggy_pullover', 'camo_pants', 'sneakers'].map(u),
      skinColor: { r: 0.58, g: 0.59, b: 0.29 },
      hairColor: { r: 0.62, g: 0.48, b: 0.38 },
      eyeColor: { r: 0.86, g: 0.86, b: 0.67 }
    },
    phraseEs: "Los cristales de cuarzo guardan resonancias de la antigua sobrecarga.",
    phraseEn: "Quartz crystals retain resonances from the ancient power overload."
  },
  {
    id: 'NPC-095',
    name: "Orion el Geólogo",
    nameEn: "Orion el Geologist",
    title: "Geólogo de Maná",
    titleEn: "Mana Geologist",
    zone: "Desierto de Chatarra",
    zoneEn: "Scrap Desert",
    role: "Geólogo de Maná en Desierto de Chatarra",
    roleEn: "Mana Geologist in Scrap Desert",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_07', 'mouth_00', 'eyes_05', 'messy_hair', 'bald_beard', 'red_square_shirt', 'camo_pants', 'boots'].map(u),
      skinColor: { r: 0.59, g: 0.59, b: 0.29 },
      hairColor: { r: 0.63, g: 0.48, b: 0.39 },
      eyeColor: { r: 0.86, g: 0.87, b: 0.68 }
    },
    phraseEs: "En el desierto de chatarra, solo la blindada supervivencia es norma.",
    phraseEn: "In the scrap desert, armored survival is the only law that remains."
  },
  {
    id: 'NPC-096',
    name: "Phaedra la Técnica",
    nameEn: "Phaedra la Technician",
    title: "Técnica de Combustión",
    titleEn: "Combustion Tech",
    zone: "Fábrica Abandonada",
    zoneEn: "Abandoned Factory",
    role: "Técnica de Combustión en Fábrica Abandonada",
    roleEn: "Combustion Tech in Abandoned Factory",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_00', 'f_mouth_00', 'eyes_06', 'straight_hair', 'f_blue_jacket', 'f_country_pants', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.59, g: 0.59, b: 0.29 },
      hairColor: { r: 0.63, g: 0.48, b: 0.39 },
      eyeColor: { r: 0.87, g: 0.88, b: 0.68 }
    },
    phraseEs: "Un autómata bien lubricado es la diferencia entre la victoria y el desguace.",
    phraseEn: "A well-lubricated automaton is the line between victory and scrap."
  },
  {
    id: 'NPC-097',
    name: "Quillon el Cronista",
    nameEn: "Quillon el Chronicler",
    title: "Cronista de Escoria",
    titleEn: "Slag Chronicler",
    zone: "Torre de Radio",
    zoneEn: "Radio Tower",
    role: "Cronista de Escoria en Torre de Radio",
    roleEn: "Slag Chronicler in Radio Tower",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_01', 'mouth_02', 'eyes_07', 'curly_hair', 'full_beard', 'tshirt_01', 'distressed_black_Jeans', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.59, g: 0.59, b: 0.29 },
      hairColor: { r: 0.64, g: 0.49, b: 0.39 },
      eyeColor: { r: 0.88, g: 0.88, b: 0.69 }
    },
    phraseEs: "Las frecuencias de radio transmiten ecos de instalaciones olvidadas.",
    phraseEn: "Radio frequencies broadcast echoes from long-forgotten facilities."
  },
  {
    id: 'NPC-098',
    name: "Rhea la Operadora",
    nameEn: "Rhea la Operator",
    title: "Operadora de Red",
    titleEn: "Network Operator",
    zone: "Calderas de Fundición",
    zoneEn: "Foundry Boilers",
    role: "Operadora de Red en Calderas de Fundición",
    roleEn: "Network Operator in Foundry Boilers",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_02', 'f_mouth_02', 'eyes_08', 'ponytail_02', 'f_red_elegant_jacket', 'comfortablepants', 'classic_shoes'].map(u),
      skinColor: { r: 0.59, g: 0.6, b: 0.3 },
      hairColor: { r: 0.64, g: 0.49, b: 0.39 },
      eyeColor: { r: 0.89, g: 0.89, b: 0.69 }
    },
    phraseEs: "El carbón de las calderas arde mejor con un chorro de éter comprimido.",
    phraseEn: "Boiler coal burns much hotter when fed with compressed aether."
  },
  {
    id: 'NPC-099',
    name: "Silas el Gladiador",
    nameEn: "Silas el Gladiator",
    title: "Gladiador Mecánico",
    titleEn: "Mechanical Gladiator",
    zone: "Gran Arena Steampunk",
    zoneEn: "Grand Steampunk Arena",
    role: "Gladiador Mecánico en Gran Arena Steampunk",
    roleEn: "Mechanical Gladiator in Grand Steampunk Arena",
    gender: 'male' as const,
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_03', 'mouth_04', 'eyes_09', 'hair_punk', 'Mustache_Short_Beard', 'black_jacket', 'brown_pants', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.6, g: 0.6, b: 0.3 },
      hairColor: { r: 0.65, g: 0.5, b: 0.4 },
      eyeColor: { r: 0.89, g: 0.89, b: 0.7 }
    },
    phraseEs: "La arena central no perdona dudas; entra con convicción o retrocede.",
    phraseEn: "The central arena forgives no doubt; step in bold or step back."
  },
  {
    id: 'NPC-100',
    name: "Tess la Conservadora",
    nameEn: "Tess la Curator",
    title: "Conservadora de Oasis",
    titleEn: "Oasis Curator",
    zone: "Corredores y Vías Sur",
    zoneEn: "South Corridors & Paths",
    role: "Conservadora de Oasis en Corredores y Vías Sur",
    roleEn: "Oasis Curator in South Corridors & Paths",
    gender: 'female' as const,
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_04', 'f_mouth_04', 'eyes_00', 'pony_tail', 'baggy_pullover', 'safari_pants', 'sneakers'].map(u),
      skinColor: { r: 0.6, g: 0.4, b: 0.3 },
      hairColor: { r: 0.65, g: 0.5, b: 0.4 },
      eyeColor: { r: 0.2, g: 0.3, b: 0.7 }
    },
    phraseEs: "Tengo componentes raros traídos directamente de las minas del noreste.",
    phraseEn: "I hold rare components salvaged directly from the northeast mines."
  }
]


/**
 * ============================================================================
 * FUNCIONES AUXILIARES DE LOCALIZACIÓN DE NPCS (NPC i18n HELPERS)
 * ============================================================================
 */

import { getLanguage, Language } from '../i18n'

export function getLocalizedNpcName(npcData: NpcDefinition, lang?: Language): string {
  const currentLang = lang || getLanguage()
  if (currentLang === 'en' && npcData.nameEn) {
    return npcData.nameEn
  }
  return npcData.name
}

export function getLocalizedNpcTitle(npcData: NpcDefinition, lang?: Language): string {
  const currentLang = lang || getLanguage()
  if (currentLang === 'en' && npcData.titleEn) {
    return npcData.titleEn
  }
  return npcData.title
}

export function getLocalizedNpcPhrase(npcData: NpcDefinition, lang?: Language): string {
  const currentLang = lang || getLanguage()
  if (currentLang === 'en' && npcData.phraseEn) {
    return npcData.phraseEn
  }
  return npcData.phraseEs
}

export function getLocalizedNpcZone(npcData: NpcDefinition, lang?: Language): string {
  const currentLang = lang || getLanguage()
  if (currentLang === 'en' && npcData.zoneEn) {
    return npcData.zoneEn
  }
  return npcData.zone
}

export function getLocalizedNpcRole(npcData: NpcDefinition, lang?: Language): string {
  const currentLang = lang || getLanguage()
  if (currentLang === 'en' && npcData.roleEn) {
    return npcData.roleEn
  }
  return npcData.role
}
