const fs = require('fs')
const path = require('path')

/**
 * ============================================================================
 * GENERADOR AUTOMÁTICO DE FICHAS TÉCNICAS HTML BILINGÜES (DEFAULT: ENGLISH)
 * ============================================================================
 * Genera 1 página HTML estática por cada modelo 3D (.glb) en showcase/
 * con soporte bilingüe (English por defecto / Español opcional) en la cabecera,
 * persistencia en localStorage, navegación por teclado/gestos y fuentes ampliadas.
 */

const RARITY_MAP = {
  common: {
    labelEs: 'Común',
    labelEn: 'Common',
    colorHex: '#A0A0A0',
    glowColor: 'rgba(160, 160, 160, 0.4)',
    bgGradient: 'linear-gradient(135deg, #1e2024 0%, #121316 100%)'
  },
  uncommon: {
    labelEs: 'Poco Común',
    labelEn: 'Uncommon',
    colorHex: '#00FF44',
    glowColor: 'rgba(0, 255, 68, 0.4)',
    bgGradient: 'linear-gradient(135deg, #14281c 0%, #0d1712 100%)'
  },
  rare: {
    labelEs: 'Raro',
    labelEn: 'Rare',
    colorHex: '#00D4FF',
    glowColor: 'rgba(0, 212, 255, 0.4)',
    bgGradient: 'linear-gradient(135deg, #122838 0%, #0a1622 100%)'
  },
  epic: {
    labelEs: 'Épico',
    labelEn: 'Epic',
    colorHex: '#C038FF',
    glowColor: 'rgba(192, 56, 255, 0.4)',
    bgGradient: 'linear-gradient(135deg, #261438 0%, #140b20 100%)'
  },
  legendary: {
    labelEs: 'Legendario',
    labelEn: 'Legendary',
    colorHex: '#FFAA00',
    glowColor: 'rgba(255, 170, 0, 0.5)',
    bgGradient: 'linear-gradient(135deg, #382810 0%, #1c1306 100%)'
  }
}

const AFFINITY_MAP = {
  STEAM: { nameEs: 'Vapor 💨', nameEn: 'Steam 💨', color: '#00D4FF' },
  MECHANICAL: { nameEs: 'Mecánico ⚙️', nameEn: 'Mechanical ⚙️', color: '#FFAA00' },
  GALVANIC: { nameEs: 'Galvánico ⚡', nameEn: 'Galvanic ⚡', color: '#00FF44' },
  LUMINOUS: { nameEs: 'Luminoso ✨', nameEn: 'Luminous ✨', color: '#FFFF00' },
  AETHER: { nameEs: 'Éter 🔮', nameEn: 'Aether 🔮', color: '#C038FF' }
}

const ITEMS_DATA = {
  // COMUNES (14)
  alambre_cobre: {
    id: 'alambre_cobre',
    rarity: 'common',
    nameEs: 'Alambre de cobre',
    nameEn: 'Copper Wire',
    zoneEs: 'Los Chatarrales',
    zoneEn: 'The Junkyards',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.037,
    respawnMin: 1,
    respawnMax: 3,
    isUnique: false,
    stats: { speedBonus: 2 },
    descEs: 'Filamento dúctil de cobre recuperado de viejas instalaciones eléctricas. Aporta una mejora ligera en la velocidad de articulación de los golems.',
    descEn: 'Ductile copper filament recovered from old electrical installations. Provides a slight speed boost to golem joints.'
  },
  tornillos_pernos: {
    id: 'tornillos_pernos',
    rarity: 'common',
    nameEs: 'Tornillos y pernos',
    nameEn: 'Screws & Bolts',
    zoneEs: 'Los Chatarrales',
    zoneEn: 'The Junkyards',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.037,
    respawnMin: 1,
    respawnMax: 3,
    isUnique: false,
    stats: { defenseBonus: 2 },
    descEs: 'Cierre básico de fijación para ensamblar placas y carcasas. Refuerza la solidez estructural del golem.',
    descEn: 'Basic fasteners for assembling plates and casings. Reinforces the golem\'s structural solidity.'
  },
  engranajes_desgastados: {
    id: 'engranajes_desgastados',
    rarity: 'common',
    nameEs: 'Engranajes desgastados',
    nameEn: 'Worn Gears',
    zoneEs: 'Los Chatarrales',
    zoneEn: 'The Junkyards',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.037,
    respawnMin: 1,
    respawnMax: 3,
    isUnique: false,
    stats: { speedBonus: 1, defenseBonus: 1 },
    descEs: 'Ruedas dentadas rescatadas de mecanismos de cuerda abandonados. Aportan equilibrio cinético y resistencia moderada.',
    descEn: 'Toothed wheels salvaged from abandoned clockwork mechanisms. Provide kinetic balance and moderate resistance.'
  },
  tubos_cobre: {
    id: 'tubos_cobre',
    rarity: 'common',
    nameEs: 'Tubos de cobre',
    nameEn: 'Copper Pipes',
    zoneEs: 'Los Chatarrales',
    zoneEn: 'The Junkyards',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.037,
    respawnMin: 1,
    respawnMax: 3,
    isUnique: false,
    stats: { hpBonus: 10 },
    descEs: 'Conductos huecos para fluidos y aire a presión. Aumentan la reserva de vitalidad estructural de la forja.',
    descEn: 'Hollow conduits for fluids and pressurized air. Increase the forge\'s structural vitality capacity.'
  },
  sartenes: {
    id: 'sartenes',
    rarity: 'common',
    nameEs: 'Sartenes',
    nameEn: 'Frying Pans',
    zoneEs: 'Los Chatarrales',
    zoneEn: 'The Junkyards',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.037,
    respawnMin: 1,
    respawnMax: 3,
    isUnique: false,
    stats: { defenseBonus: 3 },
    descEs: 'Utensilios de hierro fundido reutilizados como escudos rudimentarios para las extremidades.',
    descEn: 'Cast iron cookware repurposed as rudimentary arm and leg shields.'
  },
  ollas_cocinar: {
    id: 'ollas_cocinar',
    rarity: 'common',
    nameEs: 'Ollas de cocinar',
    nameEn: 'Cooking Pots',
    zoneEs: 'Los Chatarrales',
    zoneEn: 'The Junkyards',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.037,
    respawnMin: 1,
    respawnMax: 3,
    isUnique: false,
    stats: { defenseBonus: 2, hpBonus: 5 },
    descEs: 'Recipientes metálicos de gran volumen que sirven como cavidad protectora para el tórax del golem.',
    descEn: 'Large volume metal containers serving as a protective chest cavity for the golem.'
  },
  placas_laton: {
    id: 'placas_laton',
    rarity: 'common',
    nameEs: 'Placas de latón',
    nameEn: 'Brass Plates',
    zoneEs: 'Los Chatarrales',
    zoneEn: 'The Junkyards',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.037,
    respawnMin: 1,
    respawnMax: 3,
    isUnique: false,
    stats: { defenseBonus: 3 },
    descEs: 'Láminas de aleación de cobre y zinc con gran acabado visual y buena absorción de impactos.',
    descEn: 'Copper-zinc alloy sheets with a striking finish and great impact absorption.'
  },
  clavos_oxidados: {
    id: 'clavos_oxidados',
    rarity: 'common',
    nameEs: 'Clavos oxidados',
    nameEn: 'Rusty Nails',
    zoneEs: 'Los Chatarrales',
    zoneEn: 'The Junkyards',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.037,
    respawnMin: 1,
    respawnMax: 3,
    isUnique: false,
    stats: { defenseBonus: 1 },
    descEs: 'Puntas de hierro con patina de óxido usadas para fijaciones secundarias en esqueletos mecatrónicos.',
    descEn: 'Iron spikes with rusty patina used for secondary fasteners in mechatronic skeletons.'
  },
  latas_conserva: {
    id: 'latas_conserva',
    rarity: 'common',
    nameEs: 'Latas de conserva',
    nameEn: 'Tin Cans',
    zoneEs: 'Los Chatarrales',
    zoneEn: 'The Junkyards',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.034,
    respawnMin: 1,
    respawnMax: 3,
    isUnique: false,
    stats: { hpBonus: 8 },
    descEs: 'Envases metálicos cilíndricos reutilizados como recubrimiento liviano de articulaciones.',
    descEn: 'Cylindrical tin containers repurposed as lightweight joint plating.'
  },
  cadenas_hierro: {
    id: 'cadenas_hierro',
    rarity: 'common',
    nameEs: 'Cadenas de hierro',
    nameEn: 'Iron Chains',
    zoneEs: 'Los Chatarrales',
    zoneEn: 'The Junkyards',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.034,
    respawnMin: 1,
    respawnMax: 3,
    isUnique: false,
    stats: { defenseBonus: 2 },
    descEs: 'Eslabones entrelazados resistentes que refuerzan las extremidades inferiores del golem.',
    descEn: 'Sturdy interlocking links reinforcing the lower limbs of the golem.'
  },
  tuercas_gigantes: {
    id: 'tuercas_gigantes',
    rarity: 'common',
    nameEs: 'Tuercas gigantes',
    nameEn: 'Giant Nuts',
    zoneEs: 'Los Chatarrales',
    zoneEn: 'The Junkyards',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.034,
    respawnMin: 1,
    respawnMax: 3,
    isUnique: false,
    stats: { defenseBonus: 2 },
    descEs: 'Piezas roscadas masivas de maquinaria pesada. Otorgan gran solidez y peso en combate.',
    descEn: 'Massive threaded parts from heavy machinery. Grant great solidity and weight in battle.'
  },
  tapas_alcantarilla: {
    id: 'tapas_alcantarilla',
    rarity: 'common',
    nameEs: 'Tapas de alcantarilla',
    nameEn: 'Manhole Covers',
    zoneEs: 'Los Chatarrales',
    zoneEn: 'The Junkyards',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.034,
    respawnMin: 1,
    respawnMax: 3,
    isUnique: false,
    stats: { defenseBonus: 3 },
    descEs: 'Discos pesados de hierro forjado reutilizados como peto frontal o broquel de defensa.',
    descEn: 'Heavy cast iron discs repurposed as frontal chestplates or defensive bucklers.'
  },
  cables_deshilachados: {
    id: 'cables_deshilachados',
    rarity: 'common',
    nameEs: 'Cables deshilachados',
    nameEn: 'Frayed Cables',
    zoneEs: 'Los Chatarrales',
    zoneEn: 'The Junkyards',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.034,
    respawnMin: 1,
    respawnMax: 3,
    isUnique: false,
    stats: { speedBonus: 2 },
    descEs: 'Tiras de cables multifilamento que mejoran la agilidad y respuesta del sistema motriz.',
    descEn: 'Multistrand cable strips improving drive system agility and response.'
  },
  residuos_carbon: {
    id: 'residuos_carbon',
    rarity: 'common',
    nameEs: 'Residuos de carbón',
    nameEn: 'Coal Residue',
    zoneEs: 'Los Chatarrales',
    zoneEn: 'The Junkyards',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.034,
    respawnMin: 1,
    respawnMax: 3,
    isUnique: false,
    stats: { hpBonus: 6, affinityFocus: 'STEAM' },
    descEs: 'Combustible mineral comprimido que potencia la cámara de combustión y otorga afinidad al Vapor.',
    descEn: 'Compressed mineral fuel boosting the combustion chamber and granting Steam affinity.'
  },

  // POCO COMUNES (11)
  transistores: {
    id: 'transistores',
    rarity: 'uncommon',
    nameEs: 'Transistores',
    nameEn: 'Transistors',
    zoneEs: 'Fábrica Abandonada',
    zoneEn: 'Abandoned Factory',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.026,
    respawnMin: 4,
    respawnMax: 7,
    isUnique: false,
    stats: { attackBonus: 3 },
    descEs: 'Semiconductores para la amplificación de pulsos de respuesta. Incrementan la potencia ofensiva del golem.',
    descEn: 'Semiconductors for response pulse amplification. Increase the golem\'s offensive power.'
  },
  bombillas_filamento: {
    id: 'bombillas_filamento',
    rarity: 'uncommon',
    nameEs: 'Bombillas de filamento',
    nameEn: 'Filament Bulbs',
    zoneEs: 'Fábrica Abandonada',
    zoneEn: 'Abandoned Factory',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.026,
    respawnMin: 4,
    respawnMax: 7,
    isUnique: false,
    stats: { hpBonus: 12, affinityFocus: 'LUMINOUS' },
    descEs: 'Lámparas incandescentes que proyectan destellos de luz e influyen en la afinidad Luminosa.',
    descEn: 'Incandescent lamps emitting bright flashes of light, influencing Luminous affinity.'
  },
  resortes_reloj: {
    id: 'resortes_reloj',
    rarity: 'uncommon',
    nameEs: 'Resortes de reloj',
    nameEn: 'Clock Springs',
    zoneEs: 'Fábrica Abandonada',
    zoneEn: 'Abandoned Factory',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.026,
    respawnMin: 4,
    respawnMax: 7,
    isUnique: false,
    stats: { speedBonus: 4 },
    descEs: 'Muelles espirales de acero templado que almacenan energía mecánica para reflejos ultra rápidos.',
    descEn: 'Tempered steel spiral springs storing mechanical energy for lightning-fast reflexes.'
  },
  manometros: {
    id: 'manometros',
    rarity: 'uncommon',
    nameEs: 'Manómetros',
    nameEn: 'Pressure Gauges',
    zoneEs: 'Fábrica Abandonada',
    zoneEn: 'Abandoned Factory',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.026,
    respawnMin: 4,
    respawnMax: 7,
    isUnique: false,
    stats: { hpBonus: 15 },
    descEs: 'Instrumentos de medición de presión hidráulica que optimizan la vitalidad estructural del núcleo.',
    descEn: 'Hydraulic pressure gauges optimizing the core\'s structural vitality.'
  },
  valvulas_vapor: {
    id: 'valvulas_vapor',
    rarity: 'uncommon',
    nameEs: 'Válvulas de vapor',
    nameEn: 'Steam Valves',
    zoneEs: 'Fábrica Abandonada',
    zoneEn: 'Abandoned Factory',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.026,
    respawnMin: 4,
    respawnMax: 7,
    isUnique: false,
    stats: { attackBonus: 2, affinityFocus: 'STEAM' },
    descEs: 'Mecanismos de regulación de flujo térmico que liberan ráfagas de vapor durante los ataques.',
    descEn: 'Thermal flow control valves unleashing steam bursts during attacks.'
  },
  lentes_tv_viejo: {
    id: 'lentes_tv_viejo',
    rarity: 'uncommon',
    nameEs: 'Lentes de televisor viejo',
    nameEn: 'Old TV Lens',
    zoneEs: 'Fábrica Abandonada',
    zoneEn: 'Abandoned Factory',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.026,
    respawnMin: 4,
    respawnMax: 7,
    isUnique: false,
    stats: { speedBonus: 3 },
    descEs: 'Cristales ópticos curvos que mejoran la velocidad de procesamiento de entorno y fijación de objetivos.',
    descEn: 'Curved glass lenses improving environmental tracking and target lock speed.'
  },
  fusibles_fundidos: {
    id: 'fusibles_fundidos',
    rarity: 'uncommon',
    nameEs: 'Fusibles fundidos',
    nameEn: 'Blown Fuses',
    zoneEs: 'Fábrica Abandonada',
    zoneEn: 'Abandoned Factory',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.026,
    respawnMin: 4,
    respawnMax: 7,
    isUnique: false,
    stats: { attackBonus: 2, affinityFocus: 'GALVANIC' },
    descEs: 'Cilindros de cuarzo con carga residual eléctrica. Potencian la afinidad Galvánica.',
    descEn: 'Quartz cylinders holding residual electrical charge. Boost Galvanic affinity.'
  },
  relojes_bolsillo: {
    id: 'relojes_bolsillo',
    rarity: 'uncommon',
    nameEs: 'Relojes de bolsillo rotos',
    nameEn: 'Broken Pocket Watches',
    zoneEs: 'Fábrica Abandonada',
    zoneEn: 'Abandoned Factory',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.0245,
    respawnMin: 4,
    respawnMax: 7,
    isUnique: false,
    stats: { speedBonus: 3 },
    descEs: 'Cronómetros de precisión descalibrados cuyo tictac residual sincroniza el ritmo de ataque.',
    descEn: 'Uncalibrated precision timers whose residual ticking syncs attack cadence.'
  },
  brujulas_magneticas: {
    id: 'brujulas_magneticas',
    rarity: 'uncommon',
    nameEs: 'Brújulas magnéticas',
    nameEn: 'Magnetic Compasses',
    zoneEs: 'Fábrica Abandonada',
    zoneEn: 'Abandoned Factory',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.0245,
    respawnMin: 4,
    respawnMax: 7,
    isUnique: false,
    stats: { speedBonus: 3, affinityFocus: 'MECHANICAL' },
    descEs: 'Agujas imantadas que estabilizan el equilibrio rotacional del golem en movimiento.',
    descEn: 'Magnetic needles stabilizing the golem\'s rotational balance in motion.'
  },
  tubos_vacio: {
    id: 'tubos_vacio',
    rarity: 'uncommon',
    nameEs: 'Tubos de vacío',
    nameEn: 'Vacuum Tubes',
    zoneEs: 'Fábrica Abandonada',
    zoneEn: 'Abandoned Factory',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.0245,
    respawnMin: 4,
    respawnMax: 7,
    isUnique: false,
    stats: { attackBonus: 3, affinityFocus: 'LUMINOUS' },
    descEs: 'Válvulas termoiónicas de vidrio que amplifican pulsos fotónicos y afinidad Luminosa.',
    descEn: 'Glass thermionic valves amplifying photonic pulses and Luminous affinity.'
  },
  palancas_interruptor: {
    id: 'palancas_interruptor',
    rarity: 'uncommon',
    nameEs: 'Palancas de interruptor',
    nameEn: 'Switch Levers',
    zoneEs: 'Fábrica Abandonada',
    zoneEn: 'Abandoned Factory',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.0245,
    respawnMin: 4,
    respawnMax: 7,
    isUnique: false,
    stats: { defenseBonus: 2 },
    descEs: 'Conmutadores mecánicos de hierro con empuñadura aislante que bloquean sobrecargas externas.',
    descEn: 'Heavy iron switches with insulated grips blocking external overloads.'
  },

  // RAROS (10)
  motor_vapor: {
    id: 'motor_vapor',
    rarity: 'rare',
    nameEs: 'Motor de vapor',
    nameEn: 'Steam Engine',
    zoneEs: 'Subestación Eléctrica',
    zoneEn: 'Power Substation',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.015,
    respawnMin: 10,
    respawnMax: 15,
    isUnique: false,
    stats: { attackBonus: 5, affinityFocus: 'STEAM' },
    descEs: 'Unidad de potencia termo-mecánica de alta compresión. Genera un empuje de ataque masivo y afinidad al Vapor.',
    descEn: 'High-compression thermo-mechanical power unit. Grants massive attack thrust and Steam affinity.'
  },
  bobinas_tesla: {
    id: 'bobinas_tesla',
    rarity: 'rare',
    nameEs: 'Bobinas de Tesla',
    nameEn: 'Tesla Coils',
    zoneEs: 'Subestación Eléctrica',
    zoneEn: 'Power Substation',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.015,
    respawnMin: 10,
    respawnMax: 15,
    isUnique: false,
    stats: { attackBonus: 6, affinityFocus: 'GALVANIC' },
    descEs: 'Transformadores resonantes que emiten arcos voltaicos continuos. Otorga un devastador bonificador Galvánico.',
    descEn: 'Resonant transformers emitting continuous electric arcs. Grants a devastating Galvanic bonus.'
  },
  antenas_radio: {
    id: 'antenas_radio',
    rarity: 'rare',
    nameEs: 'Antenas de radio',
    nameEn: 'Radio Antennas',
    zoneEs: 'Torre de Radio',
    zoneEn: 'Radio Tower',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.015,
    respawnMin: 10,
    respawnMax: 15,
    isUnique: false,
    stats: { speedBonus: 6 },
    descEs: 'Receptores hertzianos de largo alcance que aceleran drásticamente los impulsos de respuesta.',
    descEn: 'Long-range hertzian receivers drastically accelerating response impulses.'
  },
  diodos_led: {
    id: 'diodos_led',
    rarity: 'rare',
    nameEs: 'Diodos LED',
    nameEn: 'LED Diodes',
    zoneEs: 'Torre de Radio',
    zoneEn: 'Radio Tower',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.015,
    respawnMin: 10,
    respawnMax: 15,
    isUnique: false,
    stats: { attackBonus: 4, affinityFocus: 'LUMINOUS' },
    descEs: 'Emisores semiconductores de luz focalizada. Proyectan haces fotónicos de gran potencia.',
    descEn: 'Focused semiconductor light emitters projecting high-power photonic beams.'
  },
  baterias_alquimicas: {
    id: 'baterias_alquimicas',
    rarity: 'rare',
    nameEs: 'Baterías alquímicas',
    nameEn: 'Alchemical Batteries',
    zoneEs: 'Subestación Eléctrica',
    zoneEn: 'Power Substation',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.015,
    respawnMin: 10,
    respawnMax: 15,
    isUnique: false,
    stats: { hpBonus: 25, affinityFocus: 'GALVANIC' },
    descEs: 'Celdas galvánicas rellenas de electrolito alquímico. Otorgan una inmensa reserva de vida.',
    descEn: 'Galvanic cells filled with alchemical electrolyte, granting a massive health pool.'
  },
  engranajes_bronce: {
    id: 'engranajes_bronce',
    rarity: 'rare',
    nameEs: 'Engranajes de bronce perfectos',
    nameEn: 'Perfect Bronze Gears',
    zoneEs: 'Reserva de Minería',
    zoneEn: 'Mining Reserve',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.015,
    respawnMin: 10,
    respawnMax: 15,
    isUnique: false,
    stats: { defenseBonus: 6, affinityFocus: 'MECHANICAL' },
    descEs: 'Piezas mecánicas talladas con precisión milimétrica. Elevan la resistencia física al máximo exponente.',
    descEn: 'Precision-milled mechanical gears boosting physical defense to peak levels.'
  },
  dinamo_galvanica: {
    id: 'dinamo_galvanica',
    rarity: 'rare',
    nameEs: 'Dínamo galvánica',
    nameEn: 'Galvanic Dynamo',
    zoneEs: 'Subestación Eléctrica',
    zoneEn: 'Power Substation',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.015,
    respawnMin: 10,
    respawnMax: 15,
    isUnique: false,
    stats: { attackBonus: 5, affinityFocus: 'GALVANIC' },
    descEs: 'Generador de corriente continua accionado por rotación. Alimenta sistemas de choque voltaico.',
    descEn: 'Rotary DC generator powering voltaic shock systems.'
  },
  cristal_fuerza: {
    id: 'cristal_fuerza',
    rarity: 'rare',
    nameEs: 'Cristal de cuarzo resonante',
    nameEn: 'Resonating Quartz Crystal',
    zoneEs: 'Torre de Radio',
    zoneEn: 'Radio Tower',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.015,
    respawnMin: 10,
    respawnMax: 15,
    isUnique: false,
    stats: { speedBonus: 5, affinityFocus: 'LUMINOUS' },
    descEs: 'Mineral de estructura cristalina oscilante. Sincroniza las pulsaciones de ataque y movimiento.',
    descEn: 'Oscillating crystal mineral syncing attack and movement pulses.'
  },
  giroscopio_precision: {
    id: 'giroscopio_precision',
    rarity: 'rare',
    nameEs: 'Giróscopo de precisión',
    nameEn: 'Precision Gyroscope',
    zoneEs: 'Reserva de Minería',
    zoneEn: 'Mining Reserve',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.015,
    respawnMin: 10,
    respawnMax: 15,
    isUnique: false,
    stats: { defenseBonus: 5, affinityFocus: 'MECHANICAL' },
    descEs: 'Rotor suspendido sobre ejes de baja fricción. Impide que el golem pierda el equilibrio al recibir impactos.',
    descEn: 'Low-friction suspended rotor preventing the golem from losing balance upon impact.'
  },
  condensador_presion: {
    id: 'condensador_presion',
    rarity: 'rare',
    nameEs: 'Condensador de alta presión',
    nameEn: 'High-Pressure Condenser',
    zoneEs: 'Subestación Eléctrica',
    zoneEn: 'Power Substation',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.015,
    respawnMin: 10,
    respawnMax: 15,
    isUnique: false,
    stats: { hpBonus: 20, affinityFocus: 'STEAM' },
    descEs: 'Cámara estanque reforzada que almacena fluidos a presiones extremas, incrementando la durabilidad.',
    descEn: 'Reinforced sealed chamber storing extreme-pressure fluids, increasing durability.'
  },

  // ÉPICOS (7 - Límite 1 instancia)
  nucleo_mana: {
    id: 'nucleo_mana',
    rarity: 'epic',
    nameEs: 'Núcleo de maná condensado',
    nameEn: 'Condensed Mana Core',
    zoneEs: 'Reserva de Minería',
    zoneEn: 'Mining Reserve',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.008,
    respawnMin: 20,
    respawnMax: 30,
    isUnique: true,
    stats: { attackBonus: 8, affinityFocus: 'AETHER' },
    descEs: 'Orbe radiante de energía arcana cristalizada. Otorga una inmensa concentración de afinidad al Éter.',
    descEn: 'Radiant orb of crystallized arcane energy granting immense Aether affinity focus.'
  },
  cerebro_automata: {
    id: 'cerebro_automata',
    rarity: 'epic',
    nameEs: 'Cerebro de autómata',
    nameEn: 'Automaton Brain',
    zoneEs: 'Reserva de Minería',
    zoneEn: 'Mining Reserve',
    zoneRiskEs: 'Zona Segura',
    zoneRiskEn: 'Safe Zone',
    spawnWeight: 0.008,
    respawnMin: 20,
    respawnMax: 30,
    isUnique: true,
    stats: { attackBonus: 8, affinityFocus: 'MECHANICAL' },
    descEs: 'Procesador lógico diferencial de alta complejidad. Dota al golem de tácticas de combate calculadas.',
    descEn: 'Complex differential logic processor endowing the golem with calculated combat tactics.'
  },
  reactor_eter: {
    id: 'reactor_eter',
    rarity: 'epic',
    nameEs: 'Reactor de éter',
    nameEn: 'Aether Reactor',
    zoneEs: 'Calderas de la Fundición (PK)',
    zoneEn: 'Foundry Boilers (PK)',
    zoneRiskEs: 'Peligro PK',
    zoneRiskEn: 'PK Hazard',
    spawnWeight: 0.008,
    respawnMin: 20,
    respawnMax: 30,
    isUnique: true,
    stats: { attackBonus: 9, affinityFocus: 'AETHER' },
    descEs: 'Generador de partículas místicas extraído de las calderas profundas. Desata ataques devastadores.',
    descEn: 'Mystical particle generator extracted from deep boilers unleashing devastating attacks.'
  },
  corazon_caldera: {
    id: 'corazon_caldera',
    rarity: 'epic',
    nameEs: 'Corazón de caldera',
    nameEn: 'Boiler Heart',
    zoneEs: 'Calderas de la Fundición (PK)',
    zoneEn: 'Foundry Boilers (PK)',
    zoneRiskEs: 'Peligro PK',
    zoneRiskEn: 'PK Hazard',
    spawnWeight: 0.008,
    respawnMin: 20,
    respawnMax: 30,
    isUnique: true,
    stats: { defenseBonus: 8, affinityFocus: 'STEAM' },
    descEs: 'Núcleo térmico blindado que soporta temperaturas de fundición. Brinda defensas impenetrables.',
    descEn: 'Armored thermal core withstanding furnace temperatures. Grants impenetrable defense.'
  },
  bateria_plasma: {
    id: 'bateria_plasma',
    rarity: 'epic',
    nameEs: 'Batería de plasma supercargada',
    nameEn: 'Supercharged Plasma Battery',
    zoneEs: 'Subestación Eléctrica',
    zoneEn: 'Power Substation',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.008,
    respawnMin: 20,
    respawnMax: 30,
    isUnique: true,
    stats: { attackBonus: 8, affinityFocus: 'GALVANIC' },
    descEs: 'Contenedor magnético de gas ionizado. Impregna las extremidades con descargas de plasma.',
    descEn: 'Magnetic container of ionized gas infusing limbs with plasma discharges.'
  },
  matriz_optica_solar: {
    id: 'matriz_optica_solar',
    rarity: 'epic',
    nameEs: 'Matriz óptica solar',
    nameEn: 'Solar Optical Array',
    zoneEs: 'Torre de Radio',
    zoneEn: 'Radio Tower',
    zoneRiskEs: 'Zona Abierta',
    zoneRiskEn: 'Open Zone',
    spawnWeight: 0.008,
    respawnMin: 20,
    respawnMax: 30,
    isUnique: true,
    stats: { speedBonus: 7, affinityFocus: 'LUMINOUS' },
    descEs: 'Conjunto de espejos concéntricos de alta refracción. Maximiza la agilidad fotónica.',
    descEn: 'Concentric high-refraction mirror array maximizing photonic agility.'
  },
  embolo_titanio: {
    id: 'embolo_titanio',
    rarity: 'epic',
    nameEs: 'Émbolo de titanio forjado',
    nameEn: 'Forged Titanium Piston',
    zoneEs: 'Calderas de la Fundición (PK)',
    zoneEn: 'Foundry Boilers (PK)',
    zoneRiskEs: 'Peligro PK',
    zoneRiskEn: 'PK Hazard',
    spawnWeight: 0.008,
    respawnMin: 20,
    respawnMax: 30,
    isUnique: true,
    stats: { defenseBonus: 7, affinityFocus: 'STEAM' },
    descEs: 'Componente mecánico indestructible de titanio puro. Absorbe los impactos más violentos.',
    descEn: 'Indestructible pure titanium mechanical piston absorbing violent blows.'
  },

  // LEGENDARIOS (4 - Límite 1 instancia)
  ojo_dragon: {
    id: 'ojo_dragon',
    rarity: 'legendary',
    nameEs: 'Ojo de dragón mecánico',
    nameEn: 'Mechanical Dragon Eye',
    zoneEs: 'Desierto de Chatarra (PK)',
    zoneEn: 'Scrap Desert (PK)',
    zoneRiskEs: 'Peligro Máximo PK',
    zoneRiskEn: 'Max PK Hazard',
    spawnWeight: 0.0035,
    respawnMin: 45,
    respawnMax: 60,
    isUnique: true,
    stats: { attackBonus: 14, affinityFocus: 'AETHER' },
    descEs: 'Reliquia legendaria con lente de zafiro sintético y pulso de éter. Confiere un poder ofensivo cataclísmico.',
    descEn: 'Legendary relic featuring synthetic sapphire lens and Aether pulse. Grants cataclysmic offensive power.'
  },
  corazon_primigenio: {
    id: 'corazon_primigenio',
    rarity: 'legendary',
    nameEs: 'Corazón de golem primigenio',
    nameEn: 'Primordial Golem Heart',
    zoneEs: 'Desierto de Chatarra (PK)',
    zoneEn: 'Scrap Desert (PK)',
    zoneRiskEs: 'Peligro Máximo PK',
    zoneRiskEn: 'Max PK Hazard',
    spawnWeight: 0.0035,
    respawnMin: 45,
    respawnMax: 60,
    isUnique: true,
    stats: { attackBonus: 8, defenseBonus: 8, hpBonus: 35, speedBonus: 8 },
    descEs: 'El Santo Grial de la mecatrónica. Un motor de movimiento perpetuo que eleva todas las estadísticas a niveles colosales.',
    descEn: 'The Holy Grail of mechatronics. A perpetual motion engine boosting all stats to colossal heights.'
  },
  singularidad_eterica: {
    id: 'singularidad_eterica',
    rarity: 'legendary',
    nameEs: 'Singularidad etérica',
    nameEn: 'Aetheric Singularity',
    zoneEs: 'Desierto de Chatarra (PK)',
    zoneEn: 'Scrap Desert (PK)',
    zoneRiskEs: 'Peligro Máximo PK',
    zoneRiskEn: 'Max PK Hazard',
    spawnWeight: 0.0035,
    respawnMin: 45,
    respawnMax: 60,
    isUnique: true,
    stats: { attackBonus: 12, speedBonus: 6, affinityFocus: 'AETHER' },
    descEs: 'Vórtice gravítaco estabilizado en una esfera de cristal astral. Desgarra la defensa enemiga.',
    descEn: 'Gravitational vortex stabilized in an astral crystal sphere, tearing enemy defenses apart.'
  },
  relicario_astral: {
    id: 'relicario_astral',
    rarity: 'legendary',
    nameEs: 'Relicario de engranajes astrales',
    nameEn: 'Celestial Gear Reliquary',
    zoneEs: 'Desierto de Chatarra (PK)',
    zoneEn: 'Scrap Desert (PK)',
    zoneRiskEs: 'Peligro Máximo PK',
    zoneRiskEn: 'Max PK Hazard',
    spawnWeight: 0.0035,
    respawnMin: 45,
    respawnMax: 60,
    isUnique: true,
    stats: { defenseBonus: 10, hpBonus: 30, affinityFocus: 'AETHER' },
    descEs: 'Caja fuerte mecatrónica de origen estelar. Otorga una coraza impenetrable y vitalidad infinita.',
    descEn: 'Stellar-origin mechatronic vault granting an impenetrable shell and infinite vitality.'
  }
}

/**
 * Genera el documento HTML completo para 1 material con ENGLISH por defecto.
 */
function generateHtmlForItem(item, currentIndex, totalItems, prevItem, nextItem) {
  const rarity = RARITY_MAP[item.rarity] || RARITY_MAP.common
  const affinity = item.stats.affinityFocus ? AFFINITY_MAP[item.stats.affinityFocus] : null
  const spawnWeightPercent = (item.spawnWeight * 100).toFixed(2)

  const i18nClientData = {
    es: {
      badgeCounter: `Ítem ${currentIndex + 1} de ${totalItems}`,
      rarity: rarity.labelEs,
      unique: '⚠️ Instancia Única (Límite 1)',
      title: item.nameEs,
      subtitle: `${item.nameEn} • ID: ${item.id}`,
      locLabel: 'Zona de Aparición',
      locValue: `📍 ${item.zoneEs}`,
      locRisk: item.zoneRiskEs,
      statsTitle: '🔨 Aporte de Atributos para la Forja',
      attack: '⚔️ Ataque',
      defense: '🛡️ Defensa',
      hp: '❤️ Vitalidad (HP)',
      speed: '⚡ Velocidad',
      affinity: '✨ Elemento de Afinidad',
      affinityName: affinity ? affinity.nameEs : '',
      metaWeightKey: 'Peso Spawn',
      metaRespawnKey: 'Tiempo Respawn',
      metaModelKey: 'Modelo 3D',
      respawnVal: `${item.respawnMin}-${item.respawnMax} min`,
      desc: item.descEs,
      copyBtn: '📋 Copiar Foto Renderizada',
      downloadBtn: '💾 Descargar PNG',
      catalogLabel: 'Catálogo',
      prevLabel: `◀ ${prevItem.nameEs}`,
      nextLabel: `${nextItem.nameEs} ▶`,
      toastCopy: '¡Foto del material copiada al portapapeles! 📸',
      toastLocal: 'Imagen guardada localmente',
      toastDownload: '¡Foto renderizada descargada! 💾'
    },
    en: {
      badgeCounter: `Item ${currentIndex + 1} of ${totalItems}`,
      rarity: rarity.labelEn,
      unique: '⚠️ Unique Instance (Limit 1)',
      title: item.nameEn,
      subtitle: `${item.nameEs} • ID: ${item.id}`,
      locLabel: 'Spawn Location',
      locValue: `📍 ${item.zoneEn}`,
      locRisk: item.zoneRiskEn,
      statsTitle: '🔨 Forge Attribute Contribution',
      attack: '⚔️ Attack',
      defense: '🛡️ Defense',
      hp: '❤️ Vitality (HP)',
      speed: '⚡ Speed',
      affinity: '✨ Element Affinity',
      affinityName: affinity ? affinity.nameEn : '',
      metaWeightKey: 'Spawn Rate',
      metaRespawnKey: 'Respawn Time',
      metaModelKey: '3D Model',
      respawnVal: `${item.respawnMin}-${item.respawnMax} mins`,
      desc: item.descEn,
      copyBtn: '📋 Copy Rendered Photo',
      downloadBtn: '💾 Download PNG',
      catalogLabel: 'Catalog',
      prevLabel: `◀ ${prevItem.nameEn}`,
      nextLabel: `${nextItem.nameEn} ▶`,
      toastCopy: 'Material photo copied to clipboard! 📸',
      toastLocal: 'Image saved locally',
      toastDownload: 'Rendered photo downloaded! 💾'
    }
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${item.nameEn} - Material Spec Sheet | Golems Decentraland</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Outfit:wght@400;600;800;900&display=swap" rel="stylesheet">
  
  <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>

  <style>
    :root {
      --rarity-color: ${rarity.colorHex};
      --rarity-glow: ${rarity.glowColor};
      --bg-gradient: ${rarity.bgGradient};
      --font-main: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      user-select: none;
      -webkit-user-select: none;
    }

    body {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background: var(--bg-gradient);
      font-family: var(--font-main);
      color: #f0f4f8;
      display: flex;
      flex-direction: column;
    }

    header {
      height: 62px;
      padding: 0 20px;
      background: rgba(10, 12, 16, 0.92);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 20;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .brand-title {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: #fff;
      font-weight: 900;
      font-size: 1.1rem;
      letter-spacing: 0.5px;
    }

    .brand-badge {
      background: rgba(255, 255, 255, 0.12);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.85rem;
      font-family: var(--font-mono);
      color: #00D4FF;
      font-weight: 800;
    }

    .lang-switcher {
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      padding: 2px;
      gap: 2px;
    }

    .lang-btn {
      background: transparent;
      border: none;
      color: #7b8fa8;
      font-family: var(--font-mono);
      font-weight: 800;
      font-size: 0.78rem;
      padding: 4px 10px;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .lang-btn.active {
      background: var(--rarity-color);
      color: #080a0f;
      box-shadow: 0 0 10px var(--rarity-glow);
    }

    .nav-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-btn {
      color: #e0e8f5;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      padding: 8px 16px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      white-space: nowrap;
    }

    .nav-btn:hover {
      background: rgba(255, 255, 255, 0.22);
      color: #fff;
      transform: translateY(-1px);
      border-color: var(--rarity-color);
      box-shadow: 0 0 12px var(--rarity-glow);
    }

    .nav-btn.center-catalog {
      background: var(--rarity-color);
      color: #080a0f;
      border: none;
      font-weight: 900;
    }

    main {
      flex: 1;
      display: grid;
      grid-template-columns: 55% 45%;
      height: calc(100vh - 62px);
      overflow: hidden;
    }

    .viewer-column {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at center, rgba(255, 255, 255, 0.06) 0%, transparent 75%);
      border-right: 1px solid rgba(255, 255, 255, 0.12);
      padding: 20px;
    }

    model-viewer {
      width: 100%;
      height: 100%;
      max-height: calc(100vh - 135px);
      --poster-color: transparent;
    }

    .action-toolbar {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 12px;
      background: rgba(10, 12, 18, 0.95);
      backdrop-filter: blur(20px);
      padding: 10px 18px;
      border-radius: 40px;
      border: 1px solid var(--rarity-color);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.7), 0 0 20px var(--rarity-glow);
      z-index: 10;
    }

    .btn-action {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: #fff;
      padding: 10px 22px;
      border-radius: 25px;
      font-family: var(--font-main);
      font-size: 0.95rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn-action.primary {
      background: var(--rarity-color);
      color: #080a0f;
      border: none;
      box-shadow: 0 0 16px var(--rarity-glow);
    }

    .btn-action.primary:hover {
      transform: translateY(-2px) scale(1.04);
      filter: brightness(1.2);
    }

    .btn-action:hover {
      background: rgba(255, 255, 255, 0.25);
    }

    .details-column {
      padding: 28px 32px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .details-column::-webkit-scrollbar { width: 8px; }
    .details-column::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.25); }
    .details-column::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.25); border-radius: 4px; }

    .item-header { display: flex; flex-direction: column; gap: 8px; }
    .badge-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

    .rarity-pill {
      background: var(--rarity-color);
      color: #080a0f;
      font-weight: 900;
      font-size: 0.85rem;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 14px;
      letter-spacing: 0.8px;
    }

    .unique-pill {
      background: rgba(255, 77, 77, 0.25);
      color: #ff5555;
      border: 1px solid #ff4444;
      font-weight: 800;
      font-size: 0.85rem;
      padding: 4px 12px;
      border-radius: 14px;
    }

    .item-title {
      font-size: 2.2rem;
      font-weight: 900;
      line-height: 1.15;
      color: #ffffff;
      text-shadow: 0 3px 15px rgba(0, 0, 0, 0.6);
    }

    .item-subtitle {
      font-size: 1.05rem;
      color: #9ab0c8;
      font-family: var(--font-mono);
      font-weight: 700;
    }

    .location-box {
      background: rgba(255, 255, 255, 0.05);
      border-left: 5px solid var(--rarity-color);
      padding: 14px 18px;
      border-radius: 0 10px 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .loc-label {
      font-size: 0.82rem;
      color: #90a4be;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      font-weight: 800;
    }

    .loc-value {
      font-size: 1.15rem;
      font-weight: 900;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 2px;
    }

    .loc-risk {
      font-size: 0.85rem;
      font-weight: 800;
      padding: 5px 12px;
      border-radius: 6px;
      background: rgba(255, 200, 0, 0.15);
      color: #ffcc00;
      border: 1px solid rgba(255, 200, 0, 0.3);
    }

    .stats-section { display: flex; flex-direction: column; gap: 12px; }

    .section-title {
      font-size: 0.95rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #9ab0c8;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .stat-card {
      background: rgba(16, 20, 28, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 12px 16px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .stat-name { font-size: 1.02rem; font-weight: 700; color: #b8cbe0; }
    .stat-val { font-family: var(--font-mono); font-size: 1.3rem; font-weight: 900; color: var(--rarity-color); }

    .meta-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      background: rgba(0, 0, 0, 0.3);
      padding: 14px 18px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .meta-item { display: flex; flex-direction: column; gap: 4px; }
    .meta-key { font-size: 0.78rem; color: #7b8fa8; text-transform: uppercase; font-weight: 800; }
    .meta-val { font-family: var(--font-mono); font-size: 1.1rem; font-weight: 800; color: #e8f0f8; }

    .desc-box {
      font-size: 1.05rem;
      line-height: 1.55;
      color: #c8d8ea;
      background: rgba(255, 255, 255, 0.04);
      padding: 16px 20px;
      border-radius: 10px;
      border: 1px dashed rgba(255, 255, 255, 0.15);
    }

    .toast {
      position: fixed;
      top: 75px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      background: rgba(10, 230, 110, 0.95);
      color: #051a0d;
      font-weight: 900;
      font-size: 0.95rem;
      padding: 12px 24px;
      border-radius: 30px;
      box-shadow: 0 6px 20px rgba(0, 255, 100, 0.5);
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      z-index: 100;
    }

    .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

    .quick-nav-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .quick-nav-link {
      color: #8fa0b5;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: color 0.2s;
    }

    .quick-nav-link:hover { color: var(--rarity-color); }

    @media (max-width: 850px) and (orientation: portrait) {
      main { grid-template-columns: 1fr; grid-template-rows: 45vh auto; overflow-y: auto; }
      body { height: auto; overflow: auto; }
      .item-title { font-size: 1.7rem; }
    }
  </style>
</head>
<body>

  <!-- BARRA DE NAVEGACIÓN SUPERIOR (ENGLISH DEFAULT) -->
  <header>
    <div class="header-left">
      <a href="../index.html" class="brand-title">
        ⚙️ GOLEMS <span class="brand-badge" id="badge-counter">Item ${currentIndex + 1} of ${totalItems}</span>
      </a>

      <div class="lang-switcher">
        <button id="btn-lang-es" class="lang-btn" onclick="setLanguage('es')">ES</button>
        <button id="btn-lang-en" class="lang-btn active" onclick="setLanguage('en')">EN</button>
      </div>
    </div>

    <div class="nav-controls">
      <a href="../${prevItem.rarity}/${prevItem.id}.html" class="nav-btn" id="link-prev">
        <span id="label-prev">◀ ${prevItem.nameEn}</span>
      </a>
      <a href="../index.html" class="nav-btn center-catalog" id="link-cat">
        <span id="label-cat">☰ Catalog</span>
      </a>
      <a href="../${nextItem.rarity}/${nextItem.id}.html" class="nav-btn" id="link-next">
        <span id="label-next">${nextItem.nameEn} ▶</span>
      </a>
    </div>
  </header>

  <main>
    <section class="viewer-column">
      <model-viewer 
        id="item-viewer"
        src="../../assets/items/${item.rarity}/${item.id}.glb"
        alt="3D Model of ${item.nameEn}"
        auto-rotate
        camera-controls
        shadow-intensity="1.5"
        shadow-softness="0.8"
        exposure="1.2"
        environment-image="neutral"
        interaction-prompt="none">
      </model-viewer>

      <div class="action-toolbar">
        <button class="btn-action primary" id="btn-copy-photo" onclick="copyRenderedPhoto()">
          📋 Copy Rendered Photo
        </button>
        <button class="btn-action" id="btn-download" onclick="downloadSnapshot()">
          💾 Download PNG
        </button>
      </div>
    </section>

    <section class="details-column">
      <div class="item-header">
        <div class="badge-row">
          <span class="rarity-pill" id="rarity-tag">${rarity.labelEn}</span>
          ${item.isUnique ? '<span class="unique-pill" id="unique-tag">⚠️ Unique Instance (Limit 1)</span>' : ''}
        </div>
        <h1 class="item-title" id="item-title">${item.nameEn}</h1>
        <div class="item-subtitle" id="item-subtitle">${item.nameEs} • ID: ${item.id}</div>
      </div>

      <div class="location-box">
        <div>
          <div class="loc-label" id="loc-label">Spawn Location</div>
          <div class="loc-value" id="loc-value">📍 ${item.zoneEn}</div>
        </div>
        <span class="loc-risk" id="loc-risk">${item.zoneRiskEn}</span>
      </div>

      <div class="stats-section">
        <div class="section-title" id="stats-title">🔨 Forge Attribute Contribution</div>
        <div class="stats-grid">
          ${item.stats.attackBonus ? `
          <div class="stat-card">
            <span class="stat-name" id="label-att">⚔️ Attack</span>
            <span class="stat-val">+${item.stats.attackBonus}</span>
          </div>` : ''}
          ${item.stats.defenseBonus ? `
          <div class="stat-card">
            <span class="stat-name" id="label-def">🛡️ Defense</span>
            <span class="stat-val">+${item.stats.defenseBonus}</span>
          </div>` : ''}
          ${item.stats.hpBonus ? `
          <div class="stat-card">
            <span class="stat-name" id="label-hp">❤️ Vitality (HP)</span>
            <span class="stat-val">+${item.stats.hpBonus}</span>
          </div>` : ''}
          ${item.stats.speedBonus ? `
          <div class="stat-card">
            <span class="stat-name" id="label-spd">⚡ Speed</span>
            <span class="stat-val">+${item.stats.speedBonus}</span>
          </div>` : ''}
          ${affinity ? `
          <div class="stat-card" style="grid-column: span 2; border-color: ${affinity.color}">
            <span class="stat-name" id="label-aff">✨ Element Affinity</span>
            <span class="stat-val" id="val-aff" style="color: ${affinity.color}">${affinity.nameEn}</span>
          </div>` : ''}
        </div>
      </div>

      <div class="meta-grid">
        <div class="meta-item">
          <span class="meta-key" id="key-meta-weight">Spawn Rate</span>
          <span class="meta-val">${spawnWeightPercent}%</span>
        </div>
        <div class="meta-item">
          <span class="meta-key" id="key-meta-respawn">Respawn Time</span>
          <span class="meta-val" id="val-meta-respawn">${item.respawnMin}-${item.respawnMax} mins</span>
        </div>
        <div class="meta-item">
          <span class="meta-key" id="key-meta-model">3D Model</span>
          <span class="meta-val">.GLB 2.0</span>
        </div>
      </div>

      <div class="desc-box" id="desc-box">
        ${item.descEn}
      </div>

      <div class="quick-nav-footer">
        <a href="../${prevItem.rarity}/${prevItem.id}.html" class="quick-nav-link" id="quick-prev">
          ◀ ${prevItem.nameEn}
        </a>
        <a href="../${nextItem.rarity}/${nextItem.id}.html" class="quick-nav-link" id="quick-next">
          ${nextItem.nameEn} ▶
        </a>
      </div>
    </section>
  </main>

  <div id="toast" class="toast">
    Material photo copied to clipboard! 📸
  </div>

  <script>
    const i18nData = ${JSON.stringify(i18nClientData)};
    const modelViewer = document.getElementById('item-viewer');
    const toast = document.getElementById('toast');
    let currentLang = 'en';

    function setLanguage(lang) {
      currentLang = lang;
      localStorage.setItem('golems_lang', lang);
      document.documentElement.lang = lang;

      document.getElementById('btn-lang-es').classList.toggle('active', lang === 'es');
      document.getElementById('btn-lang-en').classList.toggle('active', lang === 'en');

      const d = i18nData[lang];
      document.getElementById('badge-counter').textContent = d.badgeCounter;
      document.getElementById('rarity-tag').textContent = d.rarity;
      const uniqueEl = document.getElementById('unique-tag');
      if (uniqueEl) uniqueEl.textContent = d.unique;
      document.getElementById('item-title').textContent = d.title;
      document.getElementById('item-subtitle').textContent = d.subtitle;
      document.getElementById('loc-label').textContent = d.locLabel;
      document.getElementById('loc-value').textContent = d.locValue;
      document.getElementById('loc-risk').textContent = d.locRisk;
      document.getElementById('stats-title').textContent = d.statsTitle;
      document.getElementById('key-meta-weight').textContent = d.metaWeightKey;
      document.getElementById('key-meta-respawn').textContent = d.metaRespawnKey;
      document.getElementById('key-meta-model').textContent = d.metaModelKey;
      document.getElementById('val-meta-respawn').textContent = d.respawnVal;
      document.getElementById('desc-box').textContent = d.desc;
      document.getElementById('btn-copy-photo').textContent = d.copyBtn;
      document.getElementById('btn-download').textContent = d.downloadBtn;
      document.getElementById('label-cat').textContent = '☰ ' + d.catalogLabel;
      document.getElementById('label-prev').textContent = d.prevLabel;
      document.getElementById('label-next').textContent = d.nextLabel;
      document.getElementById('quick-prev').textContent = d.prevLabel;
      document.getElementById('quick-next').textContent = d.nextLabel;

      const attL = document.getElementById('label-att'); if (attL) attL.textContent = d.attack;
      const defL = document.getElementById('label-def'); if (defL) defL.textContent = d.defense;
      const hpL = document.getElementById('label-hp'); if (hpL) hpL.textContent = d.hp;
      const spdL = document.getElementById('label-spd'); if (spdL) spdL.textContent = d.speed;
      const affL = document.getElementById('label-aff'); if (affL) affL.textContent = d.affinity;
      const affV = document.getElementById('val-aff'); if (affV) affV.textContent = d.affinityName;
    }

    function showToast(msg) {
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2800);
    }

    async function copyRenderedPhoto() {
      try {
        const blob = await modelViewer.toBlob({
          mimeType: 'image/png',
          idealAspect: true,
          qualityArgument: 0.95
        });

        if (!blob) throw new Error('Blob non-existent');

        if (navigator.clipboard && window.ClipboardItem) {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          showToast(i18nData[currentLang].toastCopy);
        } else {
          downloadBlob(blob, '${item.id}_render.png');
          showToast(i18nData[currentLang].toastLocal);
        }
      } catch (err) {
        try {
          const canvas = modelViewer.shadowRoot.querySelector('canvas');
          if (canvas) {
            canvas.toBlob(async (blob) => {
              if (blob && navigator.clipboard && window.ClipboardItem) {
                await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
                showToast(i18nData[currentLang].toastCopy);
              } else if (blob) {
                downloadBlob(blob, '${item.id}_render.png');
              }
            });
          } else {
            showToast('Error copying snapshot.');
          }
        } catch (e) {
          showToast('Clipboard access error.');
        }
      }
    }

    async function downloadSnapshot() {
      try {
        const blob = await modelViewer.toBlob({
          mimeType: 'image/png',
          idealAspect: true
        });
        downloadBlob(blob, '${item.id}_render.png');
        showToast(i18nData[currentLang].toastDownload);
      } catch (e) {
        console.error(e);
      }
    }

    function downloadBlob(blob, filename) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        window.location.href = '../${prevItem.rarity}/${prevItem.id}.html';
      } else if (e.key === 'ArrowRight') {
        window.location.href = '../${nextItem.rarity}/${nextItem.id}.html';
      }
    });

    let touchStartX = 0;
    document.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
    document.addEventListener('touchend', (e) => {
      let touchEndX = e.changedTouches[0].screenX;
      if (touchEndX - touchStartX > 80) {
        window.location.href = '../${prevItem.rarity}/${prevItem.id}.html';
      } else if (touchStartX - touchEndX > 80) {
        window.location.href = '../${nextItem.rarity}/${nextItem.id}.html';
      }
    }, {passive: true});

    // Auto-inicializar idioma guardado (Default: English)
    const savedLang = localStorage.getItem('golems_lang') || 'en';
    setLanguage(savedLang);
  </script>
</body>
</html>`
}

/**
 * Genera la página del catálogo principal showcase/index.html bilingüe (DEFAULT: EN)
 */
function generateIndexHtml(itemsList) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Master Materials Catalog - Golems Decentraland</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Outfit:wght@400;700;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0b0d12;
      color: #f0f4f8;
      font-family: 'Outfit', sans-serif;
      padding: 28px;
      min-height: 100vh;
    }
    header {
      max-width: 1300px;
      margin: 0 auto 35px auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
    }
    h1 {
      font-size: 2.3rem;
      font-weight: 900;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .tag {
      background: rgba(0, 212, 255, 0.15);
      color: #00D4FF;
      border: 1px solid #00D4FF;
      padding: 5px 14px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-family: 'JetBrains Mono', monospace;
    }

    .lang-switcher {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      padding: 3px;
      gap: 4px;
    }

    .lang-btn {
      background: transparent;
      border: none;
      color: #7b8fa8;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 800;
      font-size: 0.85rem;
      padding: 5px 12px;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .lang-btn.active {
      background: #00D4FF;
      color: #080a0f;
      box-shadow: 0 0 10px rgba(0, 212, 255, 0.4);
    }

    .controls {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }
    input, select {
      background: #161a23;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      padding: 12px 18px;
      border-radius: 10px;
      font-family: inherit;
      font-size: 1rem;
      outline: none;
    }
    input:focus, select:focus {
      border-color: #00D4FF;
      box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
    }
    .grid {
      max-width: 1300px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 20px;
    }
    .card {
      background: #141822;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      padding: 20px;
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.7);
      border-color: rgba(255, 255, 255, 0.25);
    }
    .card-rarity {
      font-size: 0.75rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 3px 10px;
      border-radius: 6px;
      align-self: flex-start;
    }
    .card-title {
      font-size: 1.25rem;
      font-weight: 900;
      color: #fff;
    }
    .card-zone {
      font-size: 0.88rem;
      color: #9ab0c8;
      font-weight: 600;
    }
    .card-footer {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.85rem;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 800;
      color: #00D4FF;
    }
  </style>
</head>
<body>
  <header>
    <div class="header-top">
      <h1 id="page-title">⚙️ Master Materials Catalog <span class="tag">46 Items</span></h1>

      <div class="lang-switcher">
        <button id="btn-lang-es" class="lang-btn" onclick="setLanguage('es')">ES</button>
        <button id="btn-lang-en" class="lang-btn active" onclick="setLanguage('en')">EN</button>
      </div>
    </div>
    <div class="controls">
      <input type="text" id="search" placeholder="🔍 Search by name or zone..." oninput="filterItems()">
      <select id="filter-rarity" onchange="filterItems()">
        <option value="all" id="opt-all">All Rarities</option>
        <option value="common" id="opt-common">Commons</option>
        <option value="uncommon" id="opt-uncommon">Uncommons</option>
        <option value="rare" id="opt-rare">Rares</option>
        <option value="epic" id="opt-epic">Epics</option>
        <option value="legendary" id="opt-legendary">Legendaries</option>
      </select>
    </div>
  </header>

  <main class="grid" id="items-grid">
    ${itemsList.map(item => {
      const rarity = RARITY_MAP[item.rarity] || RARITY_MAP.common
      return `
    <a href="./${item.rarity}/${item.id}.html" class="card" data-name-es="${item.nameEs.toLowerCase()} ${item.zoneEs.toLowerCase()}" data-name-en="${item.nameEn.toLowerCase()} ${item.zoneEn.toLowerCase()}" data-rarity="${item.rarity}" style="border-top: 4px solid ${rarity.colorHex}">
      <span class="card-rarity" style="background: ${rarity.colorHex}; color: #000" data-rarity-es="${rarity.labelEs}" data-rarity-en="${rarity.labelEn}">${rarity.labelEn}</span>
      <div class="card-title" data-title-es="${item.nameEs}" data-title-en="${item.nameEn}">${item.nameEn}</div>
      <div class="card-zone" data-zone-es="📍 ${item.zoneEs}" data-zone-en="📍 ${item.zoneEn}">📍 ${item.zoneEn}</div>
      <div class="card-footer">
        <span class="view-label" data-view-es="Ver Ficha 3D ➔" data-view-en="View 3D Card ➔">View 3D Card ➔</span>
      </div>
    </a>`
    }).join('\n')}
  </main>

  <script>
    let currentLang = 'en';

    function setLanguage(lang) {
      currentLang = lang;
      localStorage.setItem('golems_lang', lang);
      document.documentElement.lang = lang;

      document.getElementById('btn-lang-es').classList.toggle('active', lang === 'es');
      document.getElementById('btn-lang-en').classList.toggle('active', lang === 'en');

      if (lang === 'en') {
        document.getElementById('page-title').childNodes[0].nodeValue = '⚙️ Master Materials Catalog ';
        document.getElementById('search').placeholder = '🔍 Search by name or zone...';
        document.getElementById('opt-all').textContent = 'All Rarities';
        document.getElementById('opt-common').textContent = 'Commons';
        document.getElementById('opt-uncommon').textContent = 'Uncommons';
        document.getElementById('opt-rare').textContent = 'Rares';
        document.getElementById('opt-epic').textContent = 'Epics';
        document.getElementById('opt-legendary').textContent = 'Legendaries';
      } else {
        document.getElementById('page-title').childNodes[0].nodeValue = '⚙️ Catálogo Maestro de Materiales ';
        document.getElementById('search').placeholder = '🔍 Buscar por nombre o zona...';
        document.getElementById('opt-all').textContent = 'Todas las Rarezas';
        document.getElementById('opt-common').textContent = 'Comunes';
        document.getElementById('opt-uncommon').textContent = 'Poco Comunes';
        document.getElementById('opt-rare').textContent = 'Raros';
        document.getElementById('opt-epic').textContent = 'Épicos';
        document.getElementById('opt-legendary').textContent = 'Legendarios';
      }

      document.querySelectorAll('.card').forEach(card => {
        const rEl = card.querySelector('.card-rarity');
        const tEl = card.querySelector('.card-title');
        const zEl = card.querySelector('.card-zone');
        const vEl = card.querySelector('.view-label');

        rEl.textContent = rEl.getAttribute('data-rarity-' + lang);
        tEl.textContent = tEl.getAttribute('data-title-' + lang);
        zEl.textContent = zEl.getAttribute('data-zone-' + lang);
        vEl.textContent = vEl.getAttribute('data-view-' + lang);
      });

      filterItems();
    }

    function filterItems() {
      const q = document.getElementById('search').value.toLowerCase();
      const r = document.getElementById('filter-rarity').value;
      const cards = document.querySelectorAll('.card');

      cards.forEach(card => {
        const nameMatch = card.getAttribute('data-name-' + currentLang).includes(q);
        const rarityMatch = r === 'all' || card.dataset.rarity === r;
        if (nameMatch && rarityMatch) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // Auto-inicializar idioma guardado (Default: English)
    const savedLang = localStorage.getItem('golems_lang') || 'en';
    setLanguage(savedLang);
  </script>
</body>
</html>`
}

/**
 * Función Principal de Generación
 */
function main() {
  const baseDir = path.join(__dirname, '..', 'showcase')
  let generatedCount = 0

  const itemsList = Object.values(ITEMS_DATA)
  const totalItems = itemsList.length

  for (let i = 0; i < totalItems; i++) {
    const item = itemsList[i]
    const prevItem = itemsList[(i - 1 + totalItems) % totalItems]
    const nextItem = itemsList[(i + 1) % totalItems]

    const targetFolder = path.join(baseDir, item.rarity)
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true })
    }

    const htmlPath = path.join(targetFolder, `${item.id}.html`)
    const htmlContent = generateHtmlForItem(item, i, totalItems, prevItem, nextItem)

    fs.writeFileSync(htmlPath, htmlContent, 'utf8')
    console.log(`[HTML Item Showcase Default EN] Generado (${i + 1}/${totalItems} - ${item.rarity}): ${htmlPath}`)
    generatedCount++
  }

  const indexPath = path.join(baseDir, 'index.html')
  fs.writeFileSync(indexPath, generateIndexHtml(itemsList), 'utf8')
  console.log(`[Index Showcase Catalog Default EN] Generado: ${indexPath}`)

  console.log(`\n✅ Proceso completado con éxito: ${generatedCount} fichas HTML creadas con English por defecto.`)
}

main()
