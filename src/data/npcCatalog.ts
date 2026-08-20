/**
 * ============================================================================
 * CATÁLOGO MAESTRO DE 50 NPCS (NPC CATALOG) - GOLEMS WORLD
 * ============================================================================
 * Estructuras de datos tipadas con las especificaciones de AvatarShape,
 * wearables nativos, paletas de colores y frases bilingües de ambientación
 * para los 50 personajes no jugadores del mapa de 25x25 (400m × 400m).
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

/**
 * Catálogo completo ejecutable de los 50 NPCs.
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
      wearables: [
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:mouth_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00',
        'urn:decentraland:off-chain:base-avatars:beard',
        'urn:decentraland:off-chain:base-avatars:messy_hair',
        'urn:decentraland:off-chain:base-avatars:leather_jacket',
        'urn:decentraland:off-chain:base-avatars:brown_pants',
        'urn:decentraland:off-chain:base-avatars:boots'
      ],
      skinColor: { r: 0.82, g: 0.68, b: 0.55 },
      hairColor: { r: 0.42, g: 0.32, b: 0.22 },
      eyeColor: { r: 0.35, g: 0.65, b: 0.85 }
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
      wearables: [
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:mouth_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00',
        'urn:decentraland:off-chain:base-avatars:casual_hair_01',
        'urn:decentraland:off-chain:base-avatars:turtleneck',
        'urn:decentraland:off-chain:base-avatars:denim_pants',
        'urn:decentraland:off-chain:base-avatars:sneakers'
      ],
      skinColor: { r: 0.92, g: 0.82, b: 0.75 },
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
      wearables: [
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:mouth_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00',
        'urn:decentraland:off-chain:base-avatars:short_hair',
        'urn:decentraland:off-chain:base-avatars:jacket_01',
        'urn:decentraland:off-chain:base-avatars:cargo_pants',
        'urn:decentraland:off-chain:base-avatars:boots'
      ],
      skinColor: { r: 0.78, g: 0.62, b: 0.48 },
      hairColor: { r: 0.6, g: 0.4, b: 0.2 },
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
      wearables: [
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:mouth_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00',
        'urn:decentraland:off-chain:base-avatars:beard',
        'urn:decentraland:off-chain:base-avatars:trench_coat',
        'urn:decentraland:off-chain:base-avatars:brown_pants',
        'urn:decentraland:off-chain:base-avatars:shoes_01'
      ],
      skinColor: { r: 0.75, g: 0.6, b: 0.45 },
      hairColor: { r: 0.25, g: 0.2, b: 0.15 },
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
    role: 'Exploradora PK',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: [
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:mouth_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00',
        'urn:decentraland:off-chain:base-avatars:pony_tail',
        'urn:decentraland:off-chain:base-avatars:leather_jacket',
        'urn:decentraland:off-chain:base-avatars:tight_pants',
        'urn:decentraland:off-chain:base-avatars:high_boots'
      ],
      skinColor: { r: 0.7, g: 0.52, b: 0.4 },
      hairColor: { r: 0.1, g: 0.1, b: 0.1 },
      eyeColor: { r: 0.9, g: 0.7, b: 0.2 }
    },
    phraseEs: 'En el desierto no hay reglas. Mantén tu arma lista y tu golem cerca.',
    phraseEn: 'In the desert there are no rules. Keep your weapon ready and your golem close.'
  },
  {
    id: 'NPC-006',
    name: 'Tobias el Comerciante',
    title: 'Mercader Ambulante',
    zone: 'Distrito de la Forja',
    role: 'Vendedor de Chatarra',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: [
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:mouth_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00',
        'urn:decentraland:off-chain:base-avatars:top_hat',
        'urn:decentraland:off-chain:base-avatars:vest',
        'urn:decentraland:off-chain:base-avatars:formal_pants',
        'urn:decentraland:off-chain:base-avatars:oxford_shoes'
      ],
      skinColor: { r: 0.85, g: 0.72, b: 0.6 },
      hairColor: { r: 0.5, g: 0.35, b: 0.2 },
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
      wearables: [
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:mouth_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00',
        'urn:decentraland:off-chain:base-avatars:bob_hair',
        'urn:decentraland:off-chain:base-avatars:overall',
        'urn:decentraland:off-chain:base-avatars:boots',
        'urn:decentraland:off-chain:base-avatars:goggles_01'
      ],
      skinColor: { r: 0.88, g: 0.75, b: 0.65 },
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
      wearables: [
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:mouth_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00',
        'urn:decentraland:off-chain:base-avatars:bald_head',
        'urn:decentraland:off-chain:base-avatars:tshirt_01',
        'urn:decentraland:off-chain:base-avatars:torn_jeans',
        'urn:decentraland:off-chain:base-avatars:work_boots'
      ],
      skinColor: { r: 0.72, g: 0.55, b: 0.42 },
      hairColor: { r: 0.2, g: 0.2, b: 0.2 },
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
      wearables: [
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:mouth_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00',
        'urn:decentraland:off-chain:base-avatars:pixie_cut',
        'urn:decentraland:off-chain:base-avatars:sweater',
        'urn:decentraland:off-chain:base-avatars:skirt_01',
        'urn:decentraland:off-chain:base-avatars:casual_shoes'
      ],
      skinColor: { r: 0.85, g: 0.7, b: 0.6 },
      hairColor: { r: 0.3, g: 0.2, b: 0.4 },
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
    role: 'Gladiador de Cell Ring',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: [
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:mouth_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00',
        'urn:decentraland:off-chain:base-avatars:buzz_cut',
        'urn:decentraland:off-chain:base-avatars:armored_vest',
        'urn:decentraland:off-chain:base-avatars:combat_pants',
        'urn:decentraland:off-chain:base-avatars:heavy_boots'
      ],
      skinColor: { r: 0.68, g: 0.5, b: 0.38 },
      hairColor: { r: 0.15, g: 0.15, b: 0.15 },
      eyeColor: { r: 0.8, g: 0.2, b: 0.2 }
    },
    phraseEs: 'Demuestra tu valor en la arena o regresa a calentar calderas.',
    phraseEn: 'Prove your worth in the arena or go back to warming boilers.'
  },
  // NPCs 011 a 050 estructurados con la misma precisión
  {
    id: 'NPC-011',
    name: 'Eliza la Alquimista',
    title: 'Química de Baterías',
    zone: 'Subestación Eléctrica',
    role: 'Sintetizadora Galvánica',
    gender: 'female',
    avatarSpec: {
      bodyShape: URN_FEMALE,
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'long_wavy_hair', 'lab_coat', 'slacks', 'flats'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.9, g: 0.8, b: 0.72 },
      hairColor: { r: 0.5, g: 0.2, b: 0.6 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'messy_hair', 'tshirt_02', 'shorts', 'sneakers'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.8, g: 0.65, b: 0.52 },
      hairColor: { r: 0.7, g: 0.5, b: 0.2 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'braid_hair', 'heavy_apron', 'thick_pants', 'safety_boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.76, g: 0.58, b: 0.44 },
      hairColor: { r: 0.3, g: 0.15, b: 0.1 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'beard_full', 'miner_helmet', 'overalls', 'heavy_boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.72, g: 0.54, b: 0.4 },
      hairColor: { r: 0.2, g: 0.2, b: 0.2 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'straight_hair', 'jacket_02', 'camo_pants', 'tactical_boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.84, g: 0.68, b: 0.56 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'scar_face', 'tactical_vest', 'cargo_pants', 'combat_boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.65, g: 0.48, b: 0.35 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'curly_hair', 'hoodie', 'jeans', 'canvas_shoes'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.82, g: 0.66, b: 0.54 },
      hairColor: { r: 0.45, g: 0.25, b: 0.1 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'cap', 'windbreaker', 'track_pants', 'running_shoes'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.86, g: 0.72, b: 0.6 },
      hairColor: { r: 0.6, g: 0.4, b: 0.2 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'short_bob', 'work_shirt', 'utility_pants', 'boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.8, g: 0.64, b: 0.5 },
      hairColor: { r: 0.2, g: 0.2, b: 0.2 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'glasses', 'safari_jacket', 'khaki_pants', 'walking_shoes'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.88, g: 0.74, b: 0.62 },
      hairColor: { r: 0.7, g: 0.7, b: 0.7 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'red_hair', 'leather_vest', 'leather_pants', 'boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.82, g: 0.64, b: 0.52 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'bun_hair', 'dress_01', 'flats', 'glasses'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.9, g: 0.78, b: 0.68 },
      hairColor: { r: 0.35, g: 0.25, b: 0.15 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'short_hair_02', 'work_coat', 'dark_jeans', 'work_boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.78, g: 0.6, b: 0.46 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'athletic_cut', 'sports_top', 'leggings', 'athletic_shoes'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.74, g: 0.56, b: 0.42 },
      hairColor: { r: 0.9, g: 0.7, b: 0.2 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'beard', 'flannel_shirt', 'jeans', 'work_boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.82, g: 0.68, b: 0.55 },
      hairColor: { r: 0.4, g: 0.3, b: 0.2 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'ponytail_02', 'camo_jacket', 'tactical_pants', 'combat_boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.7, g: 0.52, b: 0.38 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'bald_beard', 'black_apron', 'work_pants', 'heavy_boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.68, g: 0.48, b: 0.34 },
      hairColor: { r: 0.2, g: 0.2, b: 0.2 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'silver_hair', 'robe', 'sandals', 'pendant'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.92, g: 0.84, b: 0.78 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'fedora_hat', 'trench_coat_02', 'brown_pants', 'boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.76, g: 0.6, b: 0.46 },
      hairColor: { r: 0.4, g: 0.25, b: 0.15 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'neat_hair', 'shirt_and_tie', 'trousers', 'dress_shoes'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.86, g: 0.74, b: 0.64 },
      hairColor: { r: 0.2, g: 0.15, b: 0.1 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'braided_bun', 'welding_mask_neck', 'overalls', 'boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.8, g: 0.62, b: 0.48 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'mohawk_hair', 'spiked_jacket', 'leather_pants', 'heavy_boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.66, g: 0.46, b: 0.32 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'flower_hair', 'gardener_shirt', 'linen_pants', 'sandals'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.84, g: 0.7, b: 0.58 },
      hairColor: { r: 0.5, g: 0.3, b: 0.1 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'cap_02', 'tshirt_black', 'jeans', 'sneakers'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.82, g: 0.66, b: 0.52 },
      hairColor: { r: 0.3, g: 0.2, b: 0.1 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'short_wavy', 'cardigan', 'skirt_long', 'flats'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.88, g: 0.76, b: 0.66 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'shaved_head', 'sleeveless_shirt', 'cargo_pants', 'boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.7, g: 0.5, b: 0.35 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'beret_hat', 'vest_leather', 'trousers', 'shoes'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.84, g: 0.7, b: 0.58 },
      hairColor: { r: 0.4, g: 0.3, b: 0.1 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'sleek_hair', 'formal_suit', 'heels', 'clipboard_prop'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.88, g: 0.74, b: 0.64 },
      hairColor: { r: 0.8, g: 0.7, b: 0.2 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'helmet_lamp', 'heavy_coat', 'miner_pants', 'steel_boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.72, g: 0.54, b: 0.4 },
      hairColor: { r: 0.3, g: 0.2, b: 0.1 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'glasses_02', 'polo_shirt', 'slacks', 'casual_shoes'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.9, g: 0.8, b: 0.7 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'flame_hair', 'dark_coat', 'leather_pants', 'boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.74, g: 0.52, b: 0.38 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'braids_long', 'leather_armor', 'pants_dark', 'boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.68, g: 0.48, b: 0.34 },
      hairColor: { r: 0.2, g: 0.1, b: 0.05 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'messy_beard', 'tshirt_gray', 'torn_shorts', 'sandals'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.78, g: 0.6, b: 0.46 },
      hairColor: { r: 0.3, g: 0.2, b: 0.1 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'friendly_smile_hair', 'dress_casual', 'flats', 'bag'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.86, g: 0.72, b: 0.62 },
      hairColor: { r: 0.6, g: 0.4, b: 0.2 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'bandana', 'work_vest', 'jeans_dark', 'work_boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.74, g: 0.54, b: 0.4 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'short_cropped', 'sniper_coat', 'tactical_pants', 'combat_boots'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.7, g: 0.5, b: 0.36 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'white_hair_beard', 'judge_robe', 'formal_shoes', 'gavel_prop'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.88, g: 0.76, b: 0.66 },
      hairColor: { r: 0.95, g: 0.95, b: 0.95 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'short_hair_red', 'messenger_bag', 'shorts_sport', 'sneakers'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.84, g: 0.7, b: 0.58 },
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
    role: 'Espectador Veterano',
    gender: 'male',
    avatarSpec: {
      bodyShape: URN_MALE,
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'curly_brown_hair', 'jacket_sport', 'jeans', 'casual_shoes'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.82, g: 0.68, b: 0.54 },
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
      wearables: ['eyebrows_00', 'mouth_00', 'eyes_00', 'glasses_round', 'merchant_coat', 'trousers_dark', 'leather_shoes'].map(
        (w) => `urn:decentraland:off-chain:base-avatars:${w}`
      ),
      skinColor: { r: 0.85, g: 0.72, b: 0.62 },
      hairColor: { r: 0.2, g: 0.2, b: 0.25 },
      eyeColor: { r: 0.6, g: 0.4, b: 0.8 }
    },
    phraseEs: 'Compro cristales puros al mejor precio del mercado norte.',
    phraseEn: 'I buy pure crystals at the best price in the northern market.'
  }
]
