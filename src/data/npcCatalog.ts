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
  title: string
  zone: string
  role: string
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
    name: 'Vance el Forjador',
    title: 'Maestro de Calderas',
    zone: 'Distrito de la Forja',
    role: 'Maestro Metalúrgico',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'punk', 'beard', 'black_jacket', 'trash_jean', 'm_mountainshoes.glb', 'black_glove'].map(u),
      skinColor: { r: 0.65, g: 0.48, b: 0.35 },
      hairColor: { r: 0.3, g: 0.2, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.4, b: 0.1 }
    },
    phraseEs: 'Si la chispa no prende en tres golpes, agrega carbón extra.',
    phraseEn: "If the spark doesn't catch in three hits, add extra coal."
  },
  {
    id: 'NPC-002',
    name: 'Kaelen el Galvánico',
    title: 'Técnico Tesla',
    zone: 'Subestación Eléctrica',
    role: 'Especialista en Alta Tensión',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_01', 'mouth_01', 'eyes_01', 'hair_punk', 'full_beard', 'sleeveless_punk_shirt', 'distressed_black_Jeans', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.72, g: 0.58, b: 0.44 },
      hairColor: { r: 0.15, g: 0.15, b: 0.2 },
      eyeColor: { r: 0.2, g: 0.8, b: 0.9 }
    },
    phraseEs: '¡Cuidado donde pisas! Las bobinas acumulan carga estática residual.',
    phraseEn: 'Watch your step! The coils build up residual static charge.'
  },
  {
    id: 'NPC-003',
    name: 'Nora la Recolectora',
    title: 'Rastreadora de Piezas',
    zone: 'Los Chatarrales',
    role: 'Recolectora de Repuestos',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_02', 'f_mouth_02', 'eyes_02', 'cornrows', 'f_blue_jacket', 'safari_pants', 'classic_shoes'].map(u),
      skinColor: { r: 0.68, g: 0.5, b: 0.36 },
      hairColor: { r: 0.5, g: 0.3, b: 0.15 },
      eyeColor: { r: 0.4, g: 0.7, b: 0.4 }
    },
    phraseEs: 'Un ojo entrenado ve oro donde otros solo ven latas oxidadas.',
    phraseEn: 'A trained eye sees gold where others only see rusted cans.'
  },
  {
    id: 'NPC-004',
    name: 'Gideon el Guardián',
    title: 'Custodio de Bóveda',
    zone: 'Reserva de Minería',
    role: 'Guardián de Yacimiento',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_03', 'mouth_03', 'eyes_03', 'cool_hair', 'short_boxed_beard', 'puffer_jacket', 'hip_hop_joggers', 'sport_black_shoes', 'piratepatch'].map(u),
      skinColor: { r: 0.62, g: 0.45, b: 0.32 },
      hairColor: { r: 0.2, g: 0.15, b: 0.1 },
      eyeColor: { r: 0.3, g: 0.5, b: 0.7 }
    },
    phraseEs: 'Esta reserva está protegida. Ningún asaltante tocará los cristales.',
    phraseEn: 'This reserve is protected. No raider will touch the crystals.'
  },
  {
    id: 'NPC-005',
    name: 'Sora la Cazadora',
    title: 'Mercenaria de Éter',
    zone: 'Desierto de Chatarra',
    role: 'Exploradora PK Mad Max',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_04', 'f_mouth_04', 'eyes_04', 'pony_tail', 'f_white_shirt', 'f_country_pants', 'sneakers'].map(u),
      skinColor: { r: 0.64, g: 0.46, b: 0.32 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.7, b: 0.2 }
    },
    phraseEs: 'En el desierto no hay reglas. Mantén tu arma lista y tu golem cerca.',
    phraseEn: 'In the desert there are no rules. Keep your weapon ready and your golem close.'
  },
  {
    id: 'NPC-006',
    name: 'Tobias el Comerciante',
    title: 'Mercader de Bronce',
    zone: 'Distrito de la Forja',
    role: 'Vendedor de Chatarra',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_05', 'mouth_00', 'eyes_05', 'keanu_hair', 'Mustache_Short_Beard', 'Red_topcoat', 'brown_pants', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.7, g: 0.52, b: 0.38 },
      hairColor: { r: 0.4, g: 0.25, b: 0.1 },
      eyeColor: { r: 0.4, g: 0.6, b: 0.3 }
    },
    phraseEs: '¡Tengo los mejores engranajes de bronce de todo el distrito!',
    phraseEn: "I've got the finest bronze gears in the entire district!"
  },
  {
    id: 'NPC-007',
    name: 'Lyra la Ingeniera',
    title: 'Mecánica de Precisión',
    zone: 'Fábrica Abandonada',
    role: 'Diseñadora de Autómatas',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_06', 'f_mouth_06', 'eyes_06', 'shoulder_bob_hair', 'puffer_jacket', 'grey_joggers', 'citycomfortableshoes', 'cyclope'].map(u),
      skinColor: { r: 0.74, g: 0.56, b: 0.42 },
      hairColor: { r: 0.75, g: 0.25, b: 0.15 },
      eyeColor: { r: 0.3, g: 0.7, b: 0.9 }
    },
    phraseEs: 'El secreto de una buena articulación radica en la viscosidad del aceite.',
    phraseEn: 'The secret of a good joint lies in the viscosity of the oil.'
  },
  {
    id: 'NPC-008',
    name: 'Barton el Chatarrero',
    title: 'Desguazador de Tuberías',
    zone: 'Los Chatarrales',
    role: 'Desmontador Metalúrgico',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_07', 'mouth_02', 'eyes_07', 'short_hair', 'granpa_beard', 'baggy_pullover', 'comfortablepants', 'classic_shoes'].map(u),
      skinColor: { r: 0.6, g: 0.42, b: 0.28 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.5, g: 0.4, b: 0.3 }
    },
    phraseEs: 'Todo se reutiliza en el páramo. Nada se tira a la basura.',
    phraseEn: 'Everything is reused in the wasteland. Nothing goes to waste.'
  },
  {
    id: 'NPC-009',
    name: 'Cora la Operadora',
    title: 'Transmisora de Ondas',
    zone: 'Torre de Radio',
    role: 'Operadora de Baliza',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_00', 'f_mouth_00', 'eyes_08', 'double_bun', 'red_square_shirt', 'trash_jean', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.72, g: 0.54, b: 0.4 },
      hairColor: { r: 0.25, g: 0.15, b: 0.3 },
      eyeColor: { r: 0.2, g: 0.6, b: 0.8 }
    },
    phraseEs: 'Las antenas captan susurros de otros mundos entre la estática.',
    phraseEn: 'The antennas pick up whispers of other worlds through the static.'
  },
  {
    id: 'NPC-010',
    name: 'Darius el Gladiador',
    title: 'Campeón Veterano',
    zone: 'Gran Arena Steampunk',
    role: 'Gladiador Mad Max',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_01', 'mouth_04', 'eyes_09', 'moptop', 'full_beard', 'm_sweater_02', 'oxford_pants', 'sneakers', 'aviatorstyle'].map(u),
      skinColor: { r: 0.58, g: 0.4, b: 0.26 },
      hairColor: { r: 0.85, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.2, b: 0.1 }
    },
    phraseEs: 'Demuestra tu valor en la arena o regresa a calentar calderas.',
    phraseEn: 'Prove your worth in the arena or go back to warming boilers.'
  },
  {
    id: 'NPC-011',
    name: 'Eliza la Alquimista',
    title: 'Química de Baterías',
    zone: 'Subestación Eléctrica',
    role: 'Sintetizadora Galvánica',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_02', 'f_mouth_02', 'eyes_00', 'short_hair', 'black_jacket', 'safari_pants', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.76, g: 0.6, b: 0.48 },
      hairColor: { r: 0.4, g: 0.15, b: 0.5 },
      eyeColor: { r: 0.3, g: 0.8, b: 0.7 }
    },
    phraseEs: 'Una gota mal calculada y la reacción galvánica fundirá el crisol.',
    phraseEn: 'One miscalculated drop and the galvanic reaction will melt the crucible.'
  },
  {
    id: 'NPC-012',
    name: 'Finn el Aprendiz',
    title: 'Ayudante de Silas',
    zone: 'Distrito de la Forja',
    role: 'Aprendiz de Forjador',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_03', 'mouth_01', 'eyes_01', 'semi_bold', 'short_boxed_beard', 'red_square_shirt', 'distressed_black_Jeans', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.7, g: 0.52, b: 0.38 },
      hairColor: { r: 0.6, g: 0.4, b: 0.15 },
      eyeColor: { r: 0.4, g: 0.6, b: 0.8 }
    },
    phraseEs: 'Silas me enseñó que la paciencia forja los mejores autómatas.',
    phraseEn: 'Silas taught me that patience forges the finest automatons.'
  },
  {
    id: 'NPC-013',
    name: 'Greta la Fogonera',
    title: 'Operadora de Presión',
    zone: 'Calderas de Fundición',
    role: 'Técnica de Presión PK',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_04', 'f_mouth_04', 'eyes_02', 'cool_hair', 'f_blue_jacket', 'f_country_pants', 'classic_shoes', 'black_glove'].map(u),
      skinColor: { r: 0.66, g: 0.48, b: 0.34 },
      hairColor: { r: 0.25, g: 0.1, b: 0.05 },
      eyeColor: { r: 0.8, g: 0.4, b: 0.1 }
    },
    phraseEs: 'Las válvulas están al límite. ¡El vapor quema si te acercas demasiado!',
    phraseEn: 'The valves are at their limit. Steam burns if you get too close!'
  },
  {
    id: 'NPC-014',
    name: 'Harlan el Minero',
    title: 'Explotador de Vetas',
    zone: 'Reserva de Minería',
    role: 'Extractor de Éter',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_05', 'mouth_03', 'eyes_03', 'hair_punk', 'Mustache_Short_Beard', 'black_jacket', 'hip_hop_joggers', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.6, g: 0.42, b: 0.28 },
      hairColor: { r: 0.15, g: 0.15, b: 0.15 },
      eyeColor: { r: 0.4, g: 0.4, b: 0.4 }
    },
    phraseEs: 'El terreno es duro, pero el mineral de éter paga cada picada.',
    phraseEn: 'The ground is hard, but the aether ore pays for every pickaxe strike.'
  },
  {
    id: 'NPC-015',
    name: 'Iris la Vigía',
    title: 'Centinela de Altura',
    zone: 'Torre de Radio',
    role: 'Vigía del Horizonte',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_06', 'f_mouth_06', 'eyes_04', 'curly_hair', 'f_white_shirt', 'grey_joggers', 'sneakers'].map(u),
      skinColor: { r: 0.72, g: 0.54, b: 0.4 },
      hairColor: { r: 0.1, g: 0.1, b: 0.15 },
      eyeColor: { r: 0.3, g: 0.8, b: 0.6 }
    },
    phraseEs: 'El horizonte este luce tranquilo... por ahora.',
    phraseEn: 'The eastern horizon looks clear... for now.'
  },
  {
    id: 'NPC-016',
    name: 'Jarek el Mercenario',
    title: 'Escolta Privado',
    zone: 'Calderas de Fundición',
    role: 'Protector en Zona PK',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_07', 'mouth_00', 'eyes_05', 'cool_hair', 'granpa_beard', 'sport_jacket', 'brown_pants', 'm_mountainshoes.glb', 'piratepatch'].map(u),
      skinColor: { r: 0.58, g: 0.4, b: 0.28 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.3, b: 0.1 }
    },
    phraseEs: 'Si vas a entrar a las calderas, asegúrate de tener cobertura.',
    phraseEn: "If you're entering the boilers, make sure you have coverage."
  },
  {
    id: 'NPC-017',
    name: 'Kira la Chatarrera',
    title: 'Clasificadora de Pernos',
    zone: 'Los Chatarrales',
    role: 'Clasificadora de Hardware',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_00', 'f_mouth_00', 'eyes_06', 'shoulder_hair', 'puffer_jacket', 'trash_jean', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.72, g: 0.54, b: 0.4 },
      hairColor: { r: 0.4, g: 0.2, b: 0.1 },
      eyeColor: { r: 0.5, g: 0.7, b: 0.3 }
    },
    phraseEs: 'Tengo tres cajas llenas de pernos si los necesitas para tu receta.',
    phraseEn: "I've got three boxes full of bolts if you need them for your recipe."
  },
  {
    id: 'NPC-018',
    name: 'Leo el Informante',
    title: 'Corredor de Noticias',
    zone: 'Corredores y Vías Sur',
    role: 'Mensajero de Rumores',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_01', 'mouth_02', 'eyes_07', 'keanu_hair', 'full_beard', 'puffer_jacket_hoodie', 'comfortablepants', 'classic_shoes'].map(u),
      skinColor: { r: 0.74, g: 0.58, b: 0.44 },
      hairColor: { r: 0.5, g: 0.3, b: 0.15 },
      eyeColor: { r: 0.3, g: 0.6, b: 0.8 }
    },
    phraseEs: '¡Dicen que apareció un corazón primigenio en el desierto norte!',
    phraseEn: 'Word is a primordial heart spawned in the northern desert!'
  },
  {
    id: 'NPC-019',
    name: 'Mireia la Reparadora',
    title: 'Mantenedora de Pistones',
    zone: 'Fábrica Abandonada',
    role: 'Técnica de Mantenimiento',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_02', 'f_mouth_02', 'eyes_08', 'hair_bun', 'red_square_shirt', 'safari_pants', 'sport_black_shoes', 'cyclope'].map(u),
      skinColor: { r: 0.7, g: 0.52, b: 0.38 },
      hairColor: { r: 0.15, g: 0.15, b: 0.15 },
      eyeColor: { r: 0.4, g: 0.8, b: 0.5 }
    },
    phraseEs: 'Un ajuste a tiempo evita que el autómata pierda presión en combate.',
    phraseEn: 'A timely adjustment prevents the automaton from losing pressure in combat.'
  },
  {
    id: 'NPC-020',
    name: 'Nesta el Pionero',
    title: 'Geólogo de Maná',
    zone: 'Reserva de Minería',
    role: 'Científico de Campo',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_03', 'mouth_04', 'eyes_09', 'short_hair', 'short_boxed_beard', 'poloblacktshirt', 'oxford_pants', 'sneakers'].map(u),
      skinColor: { r: 0.78, g: 0.62, b: 0.48 },
      hairColor: { r: 0.6, g: 0.6, b: 0.6 },
      eyeColor: { r: 0.2, g: 0.5, b: 0.7 }
    },
    phraseEs: 'Los depósitos de éter laten a la misma frecuencia que la tierra.',
    phraseEn: 'The aether deposits pulse at the same frequency as the earth.'
  },
  {
    id: 'NPC-021',
    name: 'Orla la Piromante',
    title: 'Técnica de Combustión',
    zone: 'Calderas de Fundición',
    role: 'Alquimista de Fuego',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_04', 'f_mouth_04', 'eyes_00', 'two_tails', 'black_jacket', 'f_country_pants', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.72, g: 0.52, b: 0.38 },
      hairColor: { r: 0.85, g: 0.2, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.5, b: 0.1 }
    },
    phraseEs: 'El fuego del crisol no perdona los errores de cálculo.',
    phraseEn: 'The fire of the crucible does not forgive miscalculations.'
  },
  {
    id: 'NPC-022',
    name: 'Phaedra la Cronista',
    title: 'Historiadora del Páramo',
    zone: 'Distrito de la Forja',
    role: 'Registradora de Lore',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_05', 'f_mouth_05', 'eyes_01', 'short_hair', 'f_red_elegant_jacket', 'f_brown_trousers', 'citycomfortableshoes', 'aviatorstyle'].map(u),
      skinColor: { r: 0.78, g: 0.62, b: 0.5 },
      hairColor: { r: 0.3, g: 0.2, b: 0.1 },
      eyeColor: { r: 0.3, g: 0.6, b: 0.4 }
    },
    phraseEs: 'Cada autómata forjado guarda un fragmento de nuestra historia.',
    phraseEn: 'Every forged automaton holds a piece of our history.'
  },
  {
    id: 'NPC-023',
    name: 'Quentin el Electricista',
    title: 'Operador de Red',
    zone: 'Subestación Eléctrica',
    role: 'Técnico de Cableado',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_06', 'mouth_02', 'eyes_02', 'hair_undere', 'handlebar', 'm_sweater_02', 'safari_pants', 'classic_shoes'].map(u),
      skinColor: { r: 0.68, g: 0.5, b: 0.36 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.2, g: 0.7, b: 0.9 }
    },
    phraseEs: 'No toque los aislantes de porcelana sin guantes de goma aislante.',
    phraseEn: "Don't touch the porcelain insulators without insulated rubber gloves."
  },
  {
    id: 'NPC-024',
    name: 'Rhea la Gladiadora',
    title: 'Pretendiente al Título',
    zone: 'Gran Arena Steampunk',
    role: 'Retadora de Arena',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_07', 'f_mouth_07', 'eyes_03', 'cool_hair', 'f_sweater', 'comfortablepants', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.66, g: 0.48, b: 0.34 },
      hairColor: { r: 0.85, g: 0.65, b: 0.15 },
      eyeColor: { r: 0.4, g: 0.8, b: 0.3 }
    },
    phraseEs: 'La agilidad es más destructiva que la fuerza bruta.',
    phraseEn: 'Agility is more destructive than brute force.'
  },
  {
    id: 'NPC-025',
    name: 'Sam el Asistente',
    title: 'Hermano Chatarrero',
    zone: 'Distrito de la Forja',
    role: 'Logística de Puesto',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_00', 'mouth_04', 'eyes_04', 'punk', 'beard', 'red_square_shirt', 'grey_joggers', 'sneakers', 'black_glove'].map(u),
      skinColor: { r: 0.72, g: 0.54, b: 0.4 },
      hairColor: { r: 0.35, g: 0.25, b: 0.15 },
      eyeColor: { r: 0.35, g: 0.65, b: 0.85 }
    },
    phraseEs: 'Si buscas a mi hermano Silas, está junto al campamento de bienvenida.',
    phraseEn: "If you're looking for my brother Silas, he's by the welcome camp."
  },
  {
    id: 'NPC-026',
    name: 'Tess la Centinela',
    title: 'Observadora de Frontera',
    zone: 'Desierto de Chatarra',
    role: 'Vigía PK',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_01', 'f_mouth_01', 'eyes_05', 'curly_hair', 'sleeveless_punk_shirt', 'distressed_black_Jeans', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.64, g: 0.46, b: 0.32 },
      hairColor: { r: 0.15, g: 0.15, b: 0.2 },
      eyeColor: { r: 0.8, g: 0.6, b: 0.2 }
    },
    phraseEs: 'No bajes la guardia: los cazadores acechan tras las pilas de escombros.',
    phraseEn: "Don't drop your guard: hunters lurk behind the rubble piles."
  },
  {
    id: 'NPC-027',
    name: 'Urien el Fundidor',
    title: 'Maestro Metalúrgico',
    zone: 'Distrito de la Forja',
    role: 'Operador de Hornos',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_02', 'mouth_01', 'eyes_06', 'rasta', 'balbo_beard', 'black_jacket', 'brown_pants_02', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.58, g: 0.4, b: 0.26 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.4, b: 0.1 }
    },
    phraseEs: 'El metal líquido debe fluir libremente sin burbujas de aire.',
    phraseEn: 'Molten metal must flow freely without air bubbles.'
  },
  {
    id: 'NPC-028',
    name: 'Vespera la Mística',
    title: 'Sabia del Éter',
    zone: 'Reserva de Minería',
    role: 'Sacerdotisa Mística',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_03', 'f_mouth_03', 'eyes_07', 'shoulder_hair', 'baggy_pullover', 'f_jeans', 'classic_shoes', 'piratepatch'].map(u),
      skinColor: { r: 0.8, g: 0.68, b: 0.58 },
      hairColor: { r: 0.9, g: 0.9, b: 0.95 },
      eyeColor: { r: 0.7, g: 0.3, b: 0.9 }
    },
    phraseEs: 'La energía del vacío resuena con los espíritus de los antiguos golems.',
    phraseEn: 'The energy of the void resonates with the spirits of ancient golems.'
  },
  {
    id: 'NPC-029',
    name: 'Wade el Rastreador',
    title: 'Buscador de Piezas',
    zone: 'Los Chatarrales',
    role: 'Explorador Urbano',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_04', 'mouth_03', 'eyes_08', 'hair_coolshortstyle', 'goatee_beard', 'sport_jacket', 'corduroysandypants', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.66, g: 0.48, b: 0.34 },
      hairColor: { r: 0.35, g: 0.2, b: 0.1 },
      eyeColor: { r: 0.4, g: 0.5, b: 0.3 }
    },
    phraseEs: 'Las mejores piezas de cobre están sepultadas bajo dos metros de grava.',
    phraseEn: 'The best copper parts are buried under two meters of gravel.'
  },
  {
    id: 'NPC-030',
    name: 'Xander el Telegrafista',
    title: 'Operador Cifrado',
    zone: 'Torre de Radio',
    role: 'Comunicador Morse',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_05', 'mouth_04', 'eyes_09', 'keanu_hair', 'Mustache_Short_Beard', 'puffer_jacket', 'oxford_pants', 'sneakers'].map(u),
      skinColor: { r: 0.74, g: 0.58, b: 0.46 },
      hairColor: { r: 0.15, g: 0.1, b: 0.05 },
      eyeColor: { r: 0.3, g: 0.6, b: 0.8 }
    },
    phraseEs: 'Punto, punto, raya... la estación del norte confirma recepción.',
    phraseEn: 'Dot, dot, dash... northern station confirms reception.'
  },
  {
    id: 'NPC-031',
    name: 'Yara la Soldadora',
    title: 'Especialista en Arco',
    zone: 'Fábrica Abandonada',
    role: 'Unidora de Estructuras',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_06', 'f_mouth_06', 'eyes_00', 'double_bun', 'black_jacket', 'grey_joggers', 'm_mountainshoes.glb', 'cyclope'].map(u),
      skinColor: { r: 0.68, g: 0.5, b: 0.36 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.2, g: 0.8, b: 0.9 }
    },
    phraseEs: 'Una buena costura de soldadura aguanta la presión de diez atmósferas.',
    phraseEn: 'A solid weld seam holds ten atmospheres of pressure.'
  },
  {
    id: 'NPC-032',
    name: 'Zane el Asaltante',
    title: 'Saqueador del Páramo',
    zone: 'Desierto de Chatarra',
    role: 'Bandido PK',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_07', 'mouth_01', 'eyes_01', 'short_hair', 'granpa_beard', 'Red_topcoat', 'distressed_black_Jeans', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.55, g: 0.38, b: 0.24 },
      hairColor: { r: 0.9, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.1, b: 0.1 }
    },
    phraseEs: 'Lo que encuentras en el desierto pertenece al más fuerte.',
    phraseEn: 'Whatever you find in the desert belongs to the strongest.'
  },
  {
    id: 'NPC-033',
    name: 'Amara la Botánica',
    title: 'Conservadora de Oasis',
    zone: 'Los Chatarrales',
    role: 'Ecóloga Industrial',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_00', 'f_mouth_00', 'eyes_02', 'short_hair', 'f_blue_jacket', 'trash_jean', 'classic_shoes'].map(u),
      skinColor: { r: 0.72, g: 0.56, b: 0.42 },
      hairColor: { r: 0.4, g: 0.25, b: 0.1 },
      eyeColor: { r: 0.3, g: 0.8, b: 0.4 }
    },
    phraseEs: 'Hasta en el metal frío la vida encuentra la forma de florecer.',
    phraseEn: 'Even on cold metal, life finds a way to bloom.'
  },
  {
    id: 'NPC-034',
    name: 'Bruno el Mecánico',
    title: 'Ajustador de Bielas',
    zone: 'Distrito de la Forja',
    role: 'Técnico de Engranajes',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_01', 'mouth_03', 'eyes_03', 'moptop', 'full_beard', 'baggy_pullover', 'hip_hop_joggers', 'sport_black_shoes', 'aviatorstyle'].map(u),
      skinColor: { r: 0.7, g: 0.52, b: 0.38 },
      hairColor: { r: 0.25, g: 0.15, b: 0.05 },
      eyeColor: { r: 0.4, g: 0.6, b: 0.8 }
    },
    phraseEs: 'Si escuchas un chirrido metálico, aplica grasa de engranajes inmediatamente.',
    phraseEn: 'If you hear a metallic squeak, apply gear grease immediately.'
  },
  {
    id: 'NPC-035',
    name: 'Celeste la Astronomía',
    title: 'Calibradora Óptica',
    zone: 'Torre de Radio',
    role: 'Observadora Estelar',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_02', 'f_mouth_02', 'eyes_04', 'cool_hair', 'f_white_shirt', 'safari_pants', 'sneakers'].map(u),
      skinColor: { r: 0.76, g: 0.6, b: 0.48 },
      hairColor: { r: 0.2, g: 0.2, b: 0.3 },
      eyeColor: { r: 0.5, g: 0.3, b: 0.8 }
    },
    phraseEs: 'Las estrellas se ven más nítidas desde la cúspide de la torre.',
    phraseEn: 'The stars look sharper from the top of the tower.'
  },
  {
    id: 'NPC-036',
    name: 'Dominic el Fogonero',
    title: 'Custodio del Crisol',
    zone: 'Calderas de Fundición',
    role: 'Alimentador de Horno',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_03', 'mouth_00', 'eyes_05', 'semi_bold', 'short_boxed_beard', 'm_sweater_02', 'brown_pants', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.58, g: 0.4, b: 0.26 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.3, b: 0.1 }
    },
    phraseEs: 'El vapor de esta zona podría impulsar a diez titanes simultáneamente.',
    phraseEn: 'The steam in this area could power ten titans simultaneously.'
  },
  {
    id: 'NPC-037',
    name: 'Evander el Vendedor',
    title: 'Mercader de Tubos',
    zone: 'Corredores y Vías Sur',
    role: 'Comerciante Itinerante',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_04', 'mouth_01', 'eyes_06', 'punk', 'goatee_beard', 'green_square_shirt', 'brown_pants_02', 'citycomfortableshoes', 'black_glove'].map(u),
      skinColor: { r: 0.72, g: 0.54, b: 0.4 },
      hairColor: { r: 0.35, g: 0.2, b: 0.1 },
      eyeColor: { r: 0.3, g: 0.5, b: 0.7 }
    },
    phraseEs: '¡Tengo serpentines a prueba de fugas a precios imbatibles!',
    phraseEn: 'I have leak-proof cooling coils at unbeatable prices!'
  },
  {
    id: 'NPC-038',
    name: 'Freya la Reclutadora',
    title: 'Organizadora de Duetos',
    zone: 'Gran Arena Steampunk',
    role: 'Inscriptora de Torneos',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_05', 'f_mouth_05', 'eyes_07', 'pony_tail', 'baggy_pullover', 'f_brown_trousers', 'classic_shoes'].map(u),
      skinColor: { r: 0.74, g: 0.56, b: 0.42 },
      hairColor: { r: 0.8, g: 0.65, b: 0.15 },
      eyeColor: { r: 0.2, g: 0.7, b: 0.8 }
    },
    phraseEs: '¿Tienes listo tu escuadrón? El próximo combate está por comenzar.',
    phraseEn: 'Is your squad ready? The next match is about to begin.'
  },
  {
    id: 'NPC-039',
    name: 'Garrick el Minero',
    title: 'Barrenador Neumático',
    zone: 'Reserva de Minería',
    role: 'Operador de Taladro',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_06', 'mouth_03', 'eyes_08', 'rasta', 'handlebar', 'croupier_shirt', 'corduroysandypants', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.6, g: 0.44, b: 0.3 },
      hairColor: { r: 0.2, g: 0.15, b: 0.1 },
      eyeColor: { r: 0.4, g: 0.4, b: 0.4 }
    },
    phraseEs: 'La veta principal de bronce se extiende hacia el noreste.',
    phraseEn: 'The main bronze vein extends toward the northeast.'
  },
  {
    id: 'NPC-040',
    name: 'Hesper la Electrónica',
    title: 'Reparadora de Diodos',
    zone: 'Subestación Eléctrica',
    role: 'Técnica de Microcircuitos',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_07', 'f_mouth_07', 'eyes_09', 'shoulder_bob_hair', 'black_top', 'comfortablepants', 'sneakers', 'piratepatch'].map(u),
      skinColor: { r: 0.76, g: 0.6, b: 0.48 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.3, g: 0.8, b: 0.7 }
    },
    phraseEs: 'Los diodos regulan el pulso luminoso del circuito central.',
    phraseEn: 'The diodes regulate the luminous pulse of the main circuit.'
  },
  {
    id: 'NPC-041',
    name: 'Ignatius el Piromante',
    title: 'Alquimista de Fuego',
    zone: 'Calderas de Fundición',
    role: 'Refinador de Carbón',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'hair_coolshortstyle', 'beard', 'sleeveless_punk_shirt', 'trash_jean', 'm_mountainshoes.glb'].map(u),
      skinColor: { r: 0.62, g: 0.42, b: 0.28 },
      hairColor: { r: 0.9, g: 0.3, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.4, b: 0.1 }
    },
    phraseEs: 'El carbón refinado genera el doble de calorías con la mitad de humo.',
    phraseEn: 'Refined coal yields twice the calories with half the smoke.'
  },
  {
    id: 'NPC-042',
    name: 'Juno la Cazadora',
    title: 'Rastreadora de Singularidades',
    zone: 'Desierto de Chatarra',
    role: 'Cazadora de Reliquias PK',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_01', 'f_mouth_01', 'eyes_01', 'double_bun', 'f_red_elegant_jacket', 'distressed_black_Jeans', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.58, g: 0.4, b: 0.26 },
      hairColor: { r: 0.15, g: 0.1, b: 0.05 },
      eyeColor: { r: 0.8, g: 0.2, b: 0.8 }
    },
    phraseEs: 'La singularidad no se busca, se presiente en el pulso del terreno.',
    phraseEn: "The singularity is not sought; it is felt in the terrain's pulse."
  },
  {
    id: 'NPC-043',
    name: 'Kael el Chatarrero',
    title: 'Vendedor de Cadenas',
    zone: 'Los Chatarrales',
    role: 'Recolector de Ferretería',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_02', 'mouth_02', 'eyes_02', 'slicked_hair', 'balbo_beard', 'puffer_jacket', 'safari_pants', 'classic_shoes', 'cyclope'].map(u),
      skinColor: { r: 0.66, g: 0.48, b: 0.34 },
      hairColor: { r: 0.25, g: 0.15, b: 0.08 },
      eyeColor: { r: 0.4, g: 0.5, b: 0.4 }
    },
    phraseEs: 'Una buena cadena de hierro frena a cualquier autómata desbocado.',
    phraseEn: 'A sturdy iron chain stops any runaway automaton.'
  },
  {
    id: 'NPC-044',
    name: 'Lora la Guía',
    title: 'Orientadora Comercial',
    zone: 'Distrito de la Forja',
    role: 'Guía de Quioscos',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_03', 'f_mouth_03', 'eyes_03', 'short_hair', 'f_sweater', 'f_jeans', 'sport_black_shoes'].map(u),
      skinColor: { r: 0.74, g: 0.58, b: 0.44 },
      hairColor: { r: 0.5, g: 0.3, b: 0.15 },
      eyeColor: { r: 0.3, g: 0.7, b: 0.8 }
    },
    phraseEs: 'Si buscas transistores o bulbos, visita el Paseo Comercial Oeste.',
    phraseEn: "If you're looking for transistors or bulbs, visit West Market Walk."
  },
  {
    id: 'NPC-045',
    name: 'Milo el Ensamblador',
    title: 'Ajustador de Bastidores',
    zone: 'Fábrica Abandonada',
    role: 'Ensamblador Chasis',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_04', 'mouth_04', 'eyes_04', 'modern_hair', 'goatee_beard', 'Red_topcoat', 'grey_joggers', 'sneakers'].map(u),
      skinColor: { r: 0.62, g: 0.44, b: 0.3 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.4, g: 0.6, b: 0.5 }
    },
    phraseEs: 'Los remaches deben colocarse caliente para asegurar el sellado.',
    phraseEn: 'Rivets must be placed hot to ensure a tight seal.'
  },
  {
    id: 'NPC-046',
    name: 'Nix la Cazadora',
    title: 'Tiradora del Páramo',
    zone: 'Desierto de Chatarra',
    role: 'Francotiradora PK',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_05', 'f_mouth_05', 'eyes_05', 'cool_hair', 'sleeveless_punk_shirt', 'f_brown_trousers', 'm_mountainshoes.glb', 'aviatorstyle'].map(u),
      skinColor: { r: 0.6, g: 0.42, b: 0.28 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.8, b: 0.2 }
    },
    phraseEs: 'Veo todo lo que se mueve entre la arena y la chatarra.',
    phraseEn: 'I see everything that moves between the sand and the scrap.'
  },
  {
    id: 'NPC-047',
    name: 'Odin el Juez',
    title: 'Árbitro de Torneo',
    zone: 'Gran Arena Steampunk',
    role: 'Certificador Elo',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_06', 'mouth_01', 'eyes_06', 'hair_undere', 'handlebar', 'baggy_pullover', 'brown_pants_02', 'citycomfortableshoes'].map(u),
      skinColor: { r: 0.72, g: 0.56, b: 0.42 },
      hairColor: { r: 0.85, g: 0.85, b: 0.85 },
      eyeColor: { r: 0.2, g: 0.5, b: 0.8 }
    },
    phraseEs: 'En esta arena triunfa la estrategia, no la trampa.',
    phraseEn: 'In this arena strategy triumphs, not trickery.'
  },
  {
    id: 'NPC-048',
    name: 'Piper la Mensajera',
    title: 'Estafeta Vacio',
    zone: 'Corredores y Vías Sur',
    role: 'Repartidora Exprés',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_07', 'f_mouth_07', 'eyes_07', 'curly_hair', 'baggy_pullover', 'comfortablepants', 'classic_shoes'].map(u),
      skinColor: { r: 0.72, g: 0.54, b: 0.4 },
      hairColor: { r: 0.85, g: 0.3, b: 0.1 },
      eyeColor: { r: 0.3, g: 0.7, b: 0.5 }
    },
    phraseEs: 'Tengo cinco entregas pendientes antes de que caiga la noche.',
    phraseEn: 'I have five deliveries pending before nightfall.'
  },
  {
    id: 'NPC-049',
    name: 'Quinn el Espectador',
    title: 'Aficionado Afanoso',
    zone: 'Gran Arena Steampunk',
    role: 'Espectador Mad Max',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_00', 'mouth_03', 'eyes_08', 'punk', 'beard', 'm_sweater_02', 'corduroysandypants', 'sport_black_shoes', 'black_glove'].map(u),
      skinColor: { r: 0.68, g: 0.5, b: 0.36 },
      hairColor: { r: 0.4, g: 0.25, b: 0.15 },
      eyeColor: { r: 0.4, g: 0.6, b: 0.3 }
    },
    phraseEs: '¡Ese contraataque galvánico fue sencillamente espectacular!',
    phraseEn: 'That galvanic counterattack was simply spectacular!'
  },
  {
    id: 'NPC-050',
    name: 'Ronan el Comerciante',
    title: 'Mercader de Cristales',
    zone: 'Reserva de Minería',
    role: 'Comerciante de Éter',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_01', 'mouth_04', 'eyes_09', 'hair_punk', 'full_beard', 'green_square_shirt', 'oxford_pants', 'sneakers'].map(u),
      skinColor: { r: 0.7, g: 0.52, b: 0.38 },
      hairColor: { r: 0.2, g: 0.2, b: 0.25 },
      eyeColor: { r: 0.6, g: 0.4, b: 0.8 }
    },
    phraseEs: 'Compro cristales puros al mejor precio del mercado norte.',
    phraseEn: 'I buy pure crystals at the best price in the northern market.'
  }
]
