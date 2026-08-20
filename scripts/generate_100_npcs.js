const fs = require('fs');
const path = require('path');

// 1. Cargar las 50 entradas originales existentes
const existingCatalogPath = path.join(__dirname, '../src/data/npcCatalog.ts');
const existingCode = fs.readFileSync(existingCatalogPath, 'utf-8');

// Nombres, roles, zonas, frases para generar los nuevos 50 NPCs (051 a 100)
const zones = [
  'Distrito de la Forja',
  'Subestación Eléctrica',
  'Los Chatarrales',
  'Reserva de Minería',
  'Desierto de Chatarra',
  'Fábrica Abandonada',
  'Torre de Radio',
  'Calderas de Fundición',
  'Gran Arena Steampunk',
  'Corredores y Vías Sur'
];

const maleFirstNames = [
  'Aldous', 'Balthazar', 'Cassian', 'Dagon', 'Eldrin', 'Falk', 'Gideon', 'Hector', 'Ignis', 'Joran',
  'Kael', 'Lucius', 'Magnus', 'Nicos', 'Orion', 'Pax', 'Quillon', 'Ragnar', 'Silas', 'Titus',
  'Ulysses', 'Valen', 'Wolf', 'Xerxes', 'Ymir', 'Zane', 'Archie', 'Bram', 'Corvus', 'Drake'
];

const femaleFirstNames = [
  'Astrid', 'Beatrix', 'Cora', 'Delphina', 'Evelyn', 'Freya', 'Gwyneth', 'Hesper', 'Iris', 'Juno',
  'Kira', 'Lyra', 'Maeve', 'Nora', 'Ophelia', 'Phaedra', 'Quinna', 'Rhea', 'Seraphina', 'Tess',
  'Una', 'Vespera', 'Wren', 'Xena', 'Yara', 'Zelda', 'Ada', 'Bree', 'Cleo', 'Dahlia'
];

const titlesMale = [
  'Fogonero Mayor', 'Técnico Galvánico', 'Recolector de Tuercas', 'Centinela de Bóveda', 'Cazador de Éter',
  'Ajustador de Presión', 'Operador de Manómetros', 'Desguazador de Calderas', 'Transmisor de Señal', 'Campeón de Arena',
  'Alquimista de Plasma', 'Aprendiz de Latón', 'Técnico Tesla', 'Barrenador de Vetas', 'Vigía del Páramo',
  'Escolta Mecanizado', 'Clasificador de Chatarra', 'Corredor de Alijos', 'Mantenedor de Pistones', 'Geólogo de Maná',
  'Especialista en Vapor', 'Cronista de Escoria', 'Reparador de Cables', 'Gladiador Mecánico', 'Mercader de Relaves'
];

const titlesFemale = [
  'Maestra de Calderas', 'Ingeniera de Precisión', 'Rastreadora de Transistores', 'Custodia de Cristal', 'Mercenaria de Éter',
  'Vendedora de Latón', 'Diseñadora de Autómatas', 'Desguazadora de Tuberías', 'Calibradora Óptica', 'Gladiadora de Éter',
  'Química de Baterías', 'Ayudante de Forja', 'Operadora de Presión', 'Explotadora de Vetas', 'Centinela de Frecuencias',
  'Soldadora de Arco', 'Clasificadora de Pernos', 'Estafeta de Noticias', 'Mecánica de Bastidores', 'Sabia del Resonador',
  'Técnica de Combustión', 'Historiadora de Chatarra', 'Operadora de Red', 'Árbitra de Arena', 'Conservadora de Oasis'
];

const maleHairOptions = ['punk', 'hair_punk', 'cool_hair', 'keanu_hair', 'messy_hair', 'short_hair', 'curly_hair'];
const maleBeardOptions = ['beard', 'full_beard', 'short_boxed_beard', 'Mustache_Short_Beard', 'goatee', 'bald_beard'];
const femaleHairOptions = ['cornrows', 'pony_tail', 'bob_hair', 'pixie_cut', 'long_wavy_hair', 'braid_hair', 'straight_hair', 'curly_hair', 'ponytail_02'];

const upperMale = ['black_jacket', 'sleeveless_punk_shirt', 'puffer_jacket', 'Red_topcoat', 'm_sweater', 'm_sweater_02', 'green_square_shirt', 'red_square_shirt', 'poloblacktshirt', 'tshirt_01', 'tshirt_02'];
const upperFemale = ['f_blue_jacket', 'f_white_shirt', 'f_red_elegant_jacket', 'puffer_jacket', 'baggy_pullover', 'tshirt_01'];

const lowerMale = ['trash_jean', 'distressed_black_Jeans', 'hip_hop_joggers', 'brown_pants', 'corduroysandypants', 'oxford_pants', 'safari_pants', 'camo_pants'];
const lowerFemale = ['safari_pants', 'f_country_pants', 'tight_pants', 'comfortablepants', 'camo_pants'];

const shoes = ['m_mountainshoes.glb', 'citycomfortableshoes', 'classic_shoes', 'sport_black_shoes', 'sneakers', 'boots'];

// Generación de frases en ES y EN
const phrasesEs = [
  "El vapor a alta presión exige calibración milimétrica constante.",
  "Las bobinas Tesla rugen con más fuerza cuando se aproxima la tormenta.",
  "No dejes tu chatarra desatendida; en el páramo todo cambia de dueño.",
  "Los cristales de cuarzo guardan resonancias de la antigua sobrecarga.",
  "En el desierto de chatarra, solo la blindada supervivencia es norma.",
  "Un autómata bien lubricado es la diferencia entre la victoria y el desguace.",
  "Las frecuencias de radio transmiten ecos de instalaciones olvidadas.",
  "El carbón de las calderas arde mejor con un chorro de éter comprimido.",
  "La arena central no perdona dudas; entra con convicción o retrocede.",
  "Tengo componentes raros traídos directamente de las minas del noreste."
];

const phrasesEn = [
  "High-pressure steam requires constant millimeter calibration.",
  "Tesla coils roar louder when the wasteland storm approaches.",
  "Never leave your scrap unattended; everything changes hands out here.",
  "Quartz crystals retain resonances from the ancient power overload.",
  "In the scrap desert, armored survival is the only law that remains.",
  "A well-lubricated automaton is the line between victory and scrap.",
  "Radio frequencies broadcast echoes from long-forgotten facilities.",
  "Boiler coal burns much hotter when fed with compressed aether.",
  "The central arena forgives no doubt; step in bold or step back.",
  "I hold rare components salvaged directly from the northeast mines."
];

// Extraer entradas 1 a 50 del npcCatalog.ts existente
const startIndex = existingCode.indexOf("export const NPC_CATALOG: NpcDefinition[] = [");
const catalogContent = existingCode.substring(startIndex);
const lastEntryMatch = catalogContent.lastIndexOf("id: 'NPC-050'");
const phraseEnMatch = catalogContent.indexOf("phraseEn:", lastEntryMatch);
const splitPoint = catalogContent.indexOf("}", phraseEnMatch);
const npcs1to50String = catalogContent.substring(catalogContent.indexOf("[") + 1, splitPoint + 1);

let newNpcs = [];

for (let i = 51; i <= 100; i++) {
  const isMale = i % 2 !== 0;
  const gender = isMale ? 'male' : 'female';
  const idStr = `NPC-${String(i).padStart(3, '0')}`;
  
  const firstName = isMale 
    ? maleFirstNames[(i - 51) % maleFirstNames.length] 
    : femaleFirstNames[(i - 51) % femaleFirstNames.length];
  
  const title = isMale 
    ? titlesMale[(i - 51) % titlesMale.length] 
    : titlesFemale[(i - 51) % titlesFemale.length];
    
  const zone = zones[(i - 51) % zones.length];
  const name = `${firstName} ${isMale ? 'el' : 'la'} ${title.split(' ')[0]}`;
  const role = `${title} en ${zone}`;
  
  const eyebrows = `eyebrows_0${(i % 8)}`;
  const mouth = isMale ? `mouth_0${(i % 5)}` : `f_mouth_0${(i % 8)}`;
  const eyes = `eyes_0${(i % 10)}`;
  const hair = isMale 
    ? maleHairOptions[(i % maleHairOptions.length)] 
    : femaleHairOptions[(i % femaleHairOptions.length)];
  const beard = isMale ? maleBeardOptions[(i % maleBeardOptions.length)] : null;
  const upper = isMale ? upperMale[(i % upperMale.length)] : upperFemale[(i % upperFemale.length)];
  const lower = isMale ? lowerMale[(i % lowerMale.length)] : lowerFemale[(i % lowerFemale.length)];
  const shoe = shoes[(i % shoes.length)];

  const wearables = [eyebrows, mouth, eyes, hair];
  if (beard) wearables.push(beard);
  wearables.push(upper, lower, shoe);

  const skinR = parseFloat((0.55 + (i * 0.003) % 0.25).toFixed(2));
  const skinG = parseFloat((0.40 + (i * 0.002) % 0.20).toFixed(2));
  const skinB = parseFloat((0.28 + (i * 0.002) % 0.18).toFixed(2));

  const hairR = parseFloat((0.15 + (i * 0.005) % 0.70).toFixed(2));
  const hairG = parseFloat((0.10 + (i * 0.004) % 0.50).toFixed(2));
  const hairB = parseFloat((0.10 + (i * 0.003) % 0.40).toFixed(2));

  const eyeR = parseFloat((0.20 + (i * 0.007) % 0.70).toFixed(2));
  const eyeG = parseFloat((0.30 + (i * 0.006) % 0.60).toFixed(2));
  const eyeB = parseFloat((0.20 + (i * 0.005) % 0.70).toFixed(2));

  const phraseEs = phrasesEs[(i - 51) % phrasesEs.length];
  const phraseEn = phrasesEn[(i - 51) % phrasesEn.length];

  const bodyShape = isMale ? 'URN_MALE' : 'URN_FEMALE';

  const npcObj = `  {
    id: '${idStr}',
    name: '${name}',
    title: '${title}',
    zone: '${zone}',
    role: '${role}',
    gender: '${gender}' as const,
    avatarSpec: {
      bodyShape: ${bodyShape},
      wearables: [${wearables.map(w => `'${w}'`).join(', ')}].map(u),
      skinColor: { r: ${skinR}, g: ${skinG}, b: ${skinB} },
      hairColor: { r: ${hairR}, g: ${hairG}, b: ${hairB} },
      eyeColor: { r: ${eyeR}, g: ${eyeG}, b: ${eyeB} }
    },
    phraseEs: '${phraseEs}',
    phraseEn: '${phraseEn}'
  }`;

  newNpcs.push(npcObj);
}

const headerText = `/**
 * ============================================================================
 * CATÁLOGO MAESTRO DE 100 NPCS MAD MAX STEAMPUNK (NPC CATALOG) - GOLEMS WORLD
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

const u = (name: string) => \`urn:decentraland:off-chain:base-avatars:\${name}\`

/**
 * Catálogo completo de 100 NPCs con estética Mad Max / Steampunk Wasteland.
 */
export const NPC_CATALOG: NpcDefinition[] = [
`;

const formattedNpcs1to50 = npcs1to50String
  .replace(/gender:\s*'male',/g, "gender: 'male' as const,")
  .replace(/gender:\s*'female',/g, "gender: 'female' as const,")

const fullCatalogContent = headerText + formattedNpcs1to50 + ',\n' + newNpcs.join(',\n') + '\n]\n';

fs.writeFileSync(existingCatalogPath, fullCatalogContent, 'utf-8');
console.log('✅ Catálogo src/data/npcCatalog.ts actualizado exitosamente a 100 NPCs!');
