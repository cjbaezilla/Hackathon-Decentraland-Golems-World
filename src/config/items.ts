/**
 * ============================================================================
 * CONFIGURACIÓN CENTRALIZADA DE ÍTEMS COLECCIONABLES (MATERIALES) - 46 ÍTEMS
 * ============================================================================
 * Catálogo completo de los 46 materiales de chatarra, maquinaria y utensilios
 * descritos en el GDD de Golems (Sección 5).
 *
 * Incluye metadatos de rareza, peso de spawn (suma exactamente 100.0%), tiempos
 * de respawn, zonas de aparición, rutas de modelos 3D (.glb) por rareza y contribución
 * de atributos para la Forja.
 */

export enum ItemRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary'
}

export interface ItemStatsContribution {
  attackBonus?: number
  defenseBonus?: number
  hpBonus?: number
  speedBonus?: number
  affinityFocus?: string
}

export interface ItemConfig {
  id: string
  rarity: ItemRarity
  nameEs: string
  nameEn: string
  zone: string
  spawnWeight: number
  respawnTimeMinMinutes: number
  respawnTimeMaxMinutes: number
  isUniqueInstance: boolean
  modelSrc: string
  colorHex: string
  statsContribution: ItemStatsContribution
}

export const RARITY_COLOR_MAP: Record<ItemRarity, { hex: string; rgb: [number, number, number] }> = {
  [ItemRarity.COMMON]: { hex: '#A0A0A0', rgb: [0.65, 0.65, 0.70] },
  [ItemRarity.UNCOMMON]: { hex: '#00FF44', rgb: [0.0, 1.0, 0.27] },
  [ItemRarity.RARE]: { hex: '#00D4FF', rgb: [0.0, 0.83, 1.0] },
  [ItemRarity.EPIC]: { hex: '#C038FF', rgb: [0.75, 0.22, 1.0] },
  [ItemRarity.LEGENDARY]: { hex: '#FFAA00', rgb: [1.0, 0.67, 0.0] }
}

export const COLLECTABLE_ITEMS: Record<string, ItemConfig> = {
  // --------------------------------------------------------------------------
  // COMUNES (14 Ítems) - Los Chatarrales (Peso Total: 50.0% / 0.500)
  // --------------------------------------------------------------------------
  alambre_cobre: {
    id: 'alambre_cobre',
    rarity: ItemRarity.COMMON,
    nameEs: 'Alambre de cobre',
    nameEn: 'Copper Wire',
    zone: 'Los Chatarrales',
    spawnWeight: 0.037,
    respawnTimeMinMinutes: 1,
    respawnTimeMaxMinutes: 3,
    isUniqueInstance: false,
    modelSrc: 'assets/items/common/alambre_cobre.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.COMMON].hex,
    statsContribution: { speedBonus: 2 }
  },
  tornillos_pernos: {
    id: 'tornillos_pernos',
    rarity: ItemRarity.COMMON,
    nameEs: 'Tornillos y pernos',
    nameEn: 'Screws & Bolts',
    zone: 'Los Chatarrales',
    spawnWeight: 0.037,
    respawnTimeMinMinutes: 1,
    respawnTimeMaxMinutes: 3,
    isUniqueInstance: false,
    modelSrc: 'assets/items/common/tornillos_pernos.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.COMMON].hex,
    statsContribution: { defenseBonus: 2 }
  },
  engranajes_desgastados: {
    id: 'engranajes_desgastados',
    rarity: ItemRarity.COMMON,
    nameEs: 'Engranajes desgastados',
    nameEn: 'Worn Gears',
    zone: 'Los Chatarrales',
    spawnWeight: 0.037,
    respawnTimeMinMinutes: 1,
    respawnTimeMaxMinutes: 3,
    isUniqueInstance: false,
    modelSrc: 'assets/items/common/engranajes_desgastados.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.COMMON].hex,
    statsContribution: { speedBonus: 1, defenseBonus: 1 }
  },
  tubos_cobre: {
    id: 'tubos_cobre',
    rarity: ItemRarity.COMMON,
    nameEs: 'Tubos de cobre',
    nameEn: 'Copper Pipes',
    zone: 'Los Chatarrales',
    spawnWeight: 0.037,
    respawnTimeMinMinutes: 1,
    respawnTimeMaxMinutes: 3,
    isUniqueInstance: false,
    modelSrc: 'assets/items/common/tubos_cobre.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.COMMON].hex,
    statsContribution: { hpBonus: 10 }
  },
  sartenes: {
    id: 'sartenes',
    rarity: ItemRarity.COMMON,
    nameEs: 'Sartenes',
    nameEn: 'Frying Pans',
    zone: 'Los Chatarrales',
    spawnWeight: 0.037,
    respawnTimeMinMinutes: 1,
    respawnTimeMaxMinutes: 3,
    isUniqueInstance: false,
    modelSrc: 'assets/items/common/sartenes.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.COMMON].hex,
    statsContribution: { defenseBonus: 3 }
  },
  ollas_cocinar: {
    id: 'ollas_cocinar',
    rarity: ItemRarity.COMMON,
    nameEs: 'Ollas de cocinar',
    nameEn: 'Cooking Pots',
    zone: 'Los Chatarrales',
    spawnWeight: 0.037,
    respawnTimeMinMinutes: 1,
    respawnTimeMaxMinutes: 3,
    isUniqueInstance: false,
    modelSrc: 'assets/items/common/ollas_cocinar.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.COMMON].hex,
    statsContribution: { defenseBonus: 2, hpBonus: 5 }
  },
  placas_laton: {
    id: 'placas_laton',
    rarity: ItemRarity.COMMON,
    nameEs: 'Placas de latón',
    nameEn: 'Brass Plates',
    zone: 'Los Chatarrales',
    spawnWeight: 0.037,
    respawnTimeMinMinutes: 1,
    respawnTimeMaxMinutes: 3,
    isUniqueInstance: false,
    modelSrc: 'assets/items/common/placas_laton.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.COMMON].hex,
    statsContribution: { defenseBonus: 3 }
  },
  clavos_oxidados: {
    id: 'clavos_oxidados',
    rarity: ItemRarity.COMMON,
    nameEs: 'Clavos oxidados',
    nameEn: 'Rusty Nails',
    zone: 'Los Chatarrales',
    spawnWeight: 0.037,
    respawnTimeMinMinutes: 1,
    respawnTimeMaxMinutes: 3,
    isUniqueInstance: false,
    modelSrc: 'assets/items/common/clavos_oxidados.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.COMMON].hex,
    statsContribution: { defenseBonus: 1 }
  },
  latas_conserva: {
    id: 'latas_conserva',
    rarity: ItemRarity.COMMON,
    nameEs: 'Latas de conserva',
    nameEn: 'Tin Cans',
    zone: 'Los Chatarrales',
    spawnWeight: 0.034,
    respawnTimeMinMinutes: 1,
    respawnTimeMaxMinutes: 3,
    isUniqueInstance: false,
    modelSrc: 'assets/items/common/latas_conserva.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.COMMON].hex,
    statsContribution: { hpBonus: 8 }
  },
  cadenas_hierro: {
    id: 'cadenas_hierro',
    rarity: ItemRarity.COMMON,
    nameEs: 'Cadenas de hierro',
    nameEn: 'Iron Chains',
    zone: 'Los Chatarrales',
    spawnWeight: 0.034,
    respawnTimeMinMinutes: 1,
    respawnTimeMaxMinutes: 3,
    isUniqueInstance: false,
    modelSrc: 'assets/items/common/cadenas_hierro.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.COMMON].hex,
    statsContribution: { defenseBonus: 2 }
  },
  tuercas_gigantes: {
    id: 'tuercas_gigantes',
    rarity: ItemRarity.COMMON,
    nameEs: 'Tuercas gigantes',
    nameEn: 'Giant Nuts',
    zone: 'Los Chatarrales',
    spawnWeight: 0.034,
    respawnTimeMinMinutes: 1,
    respawnTimeMaxMinutes: 3,
    isUniqueInstance: false,
    modelSrc: 'assets/items/common/tuercas_gigantes.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.COMMON].hex,
    statsContribution: { defenseBonus: 2 }
  },
  tapas_alcantarilla: {
    id: 'tapas_alcantarilla',
    rarity: ItemRarity.COMMON,
    nameEs: 'Tapas de alcantarilla',
    nameEn: 'Manhole Covers',
    zone: 'Los Chatarrales',
    spawnWeight: 0.034,
    respawnTimeMinMinutes: 1,
    respawnTimeMaxMinutes: 3,
    isUniqueInstance: false,
    modelSrc: 'assets/items/common/tapas_alcantarilla.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.COMMON].hex,
    statsContribution: { defenseBonus: 3 }
  },
  cables_deshilachados: {
    id: 'cables_deshilachados',
    rarity: ItemRarity.COMMON,
    nameEs: 'Cables deshilachados',
    nameEn: 'Frayed Cables',
    zone: 'Los Chatarrales',
    spawnWeight: 0.034,
    respawnTimeMinMinutes: 1,
    respawnTimeMaxMinutes: 3,
    isUniqueInstance: false,
    modelSrc: 'assets/items/common/cables_deshilachados.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.COMMON].hex,
    statsContribution: { speedBonus: 2 }
  },
  residuos_carbon: {
    id: 'residuos_carbon',
    rarity: ItemRarity.COMMON,
    nameEs: 'Residuos de carbón',
    nameEn: 'Coal Residue',
    zone: 'Los Chatarrales',
    spawnWeight: 0.034,
    respawnTimeMinMinutes: 1,
    respawnTimeMaxMinutes: 3,
    isUniqueInstance: false,
    modelSrc: 'assets/items/common/residuos_carbon.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.COMMON].hex,
    statsContribution: { hpBonus: 6, affinityFocus: 'STEAM' }
  },

  // --------------------------------------------------------------------------
  // POCO COMUNES (11 Ítems) - Fábrica Abandonada (Peso Total: 28.0% / 0.280)
  // --------------------------------------------------------------------------
  transistores: {
    id: 'transistores',
    rarity: ItemRarity.UNCOMMON,
    nameEs: 'Transistores',
    nameEn: 'Transistors',
    zone: 'Fábrica Abandonada',
    spawnWeight: 0.026,
    respawnTimeMinMinutes: 4,
    respawnTimeMaxMinutes: 7,
    isUniqueInstance: false,
    modelSrc: 'assets/items/uncommon/transistores.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.UNCOMMON].hex,
    statsContribution: { attackBonus: 3 }
  },
  bombillas_filamento: {
    id: 'bombillas_filamento',
    rarity: ItemRarity.UNCOMMON,
    nameEs: 'Bombillas de filamento',
    nameEn: 'Filament Bulbs',
    zone: 'Fábrica Abandonada',
    spawnWeight: 0.026,
    respawnTimeMinMinutes: 4,
    respawnTimeMaxMinutes: 7,
    isUniqueInstance: false,
    modelSrc: 'assets/items/uncommon/bombillas_filamento.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.UNCOMMON].hex,
    statsContribution: { hpBonus: 12, affinityFocus: 'LUMINOUS' }
  },
  resortes_reloj: {
    id: 'resortes_reloj',
    rarity: ItemRarity.UNCOMMON,
    nameEs: 'Resortes de reloj',
    nameEn: 'Clock Springs',
    zone: 'Fábrica Abandonada',
    spawnWeight: 0.026,
    respawnTimeMinMinutes: 4,
    respawnTimeMaxMinutes: 7,
    isUniqueInstance: false,
    modelSrc: 'assets/items/uncommon/resortes_reloj.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.UNCOMMON].hex,
    statsContribution: { speedBonus: 4 }
  },
  manometros: {
    id: 'manometros',
    rarity: ItemRarity.UNCOMMON,
    nameEs: 'Manómetros',
    nameEn: 'Pressure Gauges',
    zone: 'Fábrica Abandonada',
    spawnWeight: 0.026,
    respawnTimeMinMinutes: 4,
    respawnTimeMaxMinutes: 7,
    isUniqueInstance: false,
    modelSrc: 'assets/items/uncommon/manometros.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.UNCOMMON].hex,
    statsContribution: { hpBonus: 15 }
  },
  valvulas_vapor: {
    id: 'valvulas_vapor',
    rarity: ItemRarity.UNCOMMON,
    nameEs: 'Válvulas de vapor',
    nameEn: 'Steam Valves',
    zone: 'Fábrica Abandonada',
    spawnWeight: 0.026,
    respawnTimeMinMinutes: 4,
    respawnTimeMaxMinutes: 7,
    isUniqueInstance: false,
    modelSrc: 'assets/items/uncommon/valvulas_vapor.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.UNCOMMON].hex,
    statsContribution: { affinityFocus: 'STEAM', attackBonus: 2 }
  },
  lentes_tv_viejo: {
    id: 'lentes_tv_viejo',
    rarity: ItemRarity.UNCOMMON,
    nameEs: 'Lentes de televisor viejo',
    nameEn: 'Old TV Lens',
    zone: 'Fábrica Abandonada',
    spawnWeight: 0.026,
    respawnTimeMinMinutes: 4,
    respawnTimeMaxMinutes: 7,
    isUniqueInstance: false,
    modelSrc: 'assets/items/uncommon/lentes_tv_viejo.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.UNCOMMON].hex,
    statsContribution: { speedBonus: 3 }
  },
  fusibles_fundidos: {
    id: 'fusibles_fundidos',
    rarity: ItemRarity.UNCOMMON,
    nameEs: 'Fusibles fundidos',
    nameEn: 'Blown Fuses',
    zone: 'Fábrica Abandonada',
    spawnWeight: 0.026,
    respawnTimeMinMinutes: 4,
    respawnTimeMaxMinutes: 7,
    isUniqueInstance: false,
    modelSrc: 'assets/items/uncommon/fusibles_fundidos.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.UNCOMMON].hex,
    statsContribution: { attackBonus: 2, affinityFocus: 'GALVANIC' }
  },
  relojes_bolsillo: {
    id: 'relojes_bolsillo',
    rarity: ItemRarity.UNCOMMON,
    nameEs: 'Relojes de bolsillo rotos',
    nameEn: 'Broken Pocket Watches',
    zone: 'Fábrica Abandonada',
    spawnWeight: 0.0245,
    respawnTimeMinMinutes: 4,
    respawnTimeMaxMinutes: 7,
    isUniqueInstance: false,
    modelSrc: 'assets/items/uncommon/relojes_bolsillo.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.UNCOMMON].hex,
    statsContribution: { speedBonus: 3 }
  },
  brujulas_magneticas: {
    id: 'brujulas_magneticas',
    rarity: ItemRarity.UNCOMMON,
    nameEs: 'Brújulas magnéticas',
    nameEn: 'Magnetic Compasses',
    zone: 'Fábrica Abandonada',
    spawnWeight: 0.0245,
    respawnTimeMinMinutes: 4,
    respawnTimeMaxMinutes: 7,
    isUniqueInstance: false,
    modelSrc: 'assets/items/uncommon/brujulas_magneticas.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.UNCOMMON].hex,
    statsContribution: { speedBonus: 3, affinityFocus: 'MECHANICAL' }
  },
  tubos_vacio: {
    id: 'tubos_vacio',
    rarity: ItemRarity.UNCOMMON,
    nameEs: 'Tubos de vacío',
    nameEn: 'Vacuum Tubes',
    zone: 'Fábrica Abandonada',
    spawnWeight: 0.0245,
    respawnTimeMinMinutes: 4,
    respawnTimeMaxMinutes: 7,
    isUniqueInstance: false,
    modelSrc: 'assets/items/uncommon/tubos_vacio.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.UNCOMMON].hex,
    statsContribution: { attackBonus: 3, affinityFocus: 'LUMINOUS' }
  },
  palancas_interruptor: {
    id: 'palancas_interruptor',
    rarity: ItemRarity.UNCOMMON,
    nameEs: 'Palancas de interruptor',
    nameEn: 'Switch Levers',
    zone: 'Fábrica Abandonada',
    spawnWeight: 0.0245,
    respawnTimeMinMinutes: 4,
    respawnTimeMaxMinutes: 7,
    isUniqueInstance: false,
    modelSrc: 'assets/items/uncommon/palancas_interruptor.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.UNCOMMON].hex,
    statsContribution: { defenseBonus: 2 }
  },

  // --------------------------------------------------------------------------
  // RAROS (10 Ítems) - Subestación / Torre / Reserva (Peso Total: 15.0% / 0.150)
  // --------------------------------------------------------------------------
  motor_vapor: {
    id: 'motor_vapor',
    rarity: ItemRarity.RARE,
    nameEs: 'Motor de vapor',
    nameEn: 'Steam Engine',
    zone: 'Subestación Eléctrica',
    spawnWeight: 0.015,
    respawnTimeMinMinutes: 10,
    respawnTimeMaxMinutes: 15,
    isUniqueInstance: false,
    modelSrc: 'assets/items/rare/motor_vapor.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.RARE].hex,
    statsContribution: { attackBonus: 5, affinityFocus: 'STEAM' }
  },
  bobinas_tesla: {
    id: 'bobinas_tesla',
    rarity: ItemRarity.RARE,
    nameEs: 'Bobinas de Tesla',
    nameEn: 'Tesla Coils',
    zone: 'Subestación Eléctrica',
    spawnWeight: 0.015,
    respawnTimeMinMinutes: 10,
    respawnTimeMaxMinutes: 15,
    isUniqueInstance: false,
    modelSrc: 'assets/items/rare/bobinas_tesla.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.RARE].hex,
    statsContribution: { attackBonus: 6, affinityFocus: 'GALVANIC' }
  },
  antenas_radio: {
    id: 'antenas_radio',
    rarity: ItemRarity.RARE,
    nameEs: 'Antenas de radio',
    nameEn: 'Radio Antennas',
    zone: 'Torre de Radio',
    spawnWeight: 0.015,
    respawnTimeMinMinutes: 10,
    respawnTimeMaxMinutes: 15,
    isUniqueInstance: false,
    modelSrc: 'assets/items/rare/antenas_radio.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.RARE].hex,
    statsContribution: { speedBonus: 6 }
  },
  diodos_led: {
    id: 'diodos_led',
    rarity: ItemRarity.RARE,
    nameEs: 'Diodos LED',
    nameEn: 'LED Diodes',
    zone: 'Torre de Radio',
    spawnWeight: 0.015,
    respawnTimeMinMinutes: 10,
    respawnTimeMaxMinutes: 15,
    isUniqueInstance: false,
    modelSrc: 'assets/items/rare/diodos_led.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.RARE].hex,
    statsContribution: { affinityFocus: 'LUMINOUS', attackBonus: 4 }
  },
  baterias_alquimicas: {
    id: 'baterias_alquimicas',
    rarity: ItemRarity.RARE,
    nameEs: 'Baterías alquímicas',
    nameEn: 'Alchemical Batteries',
    zone: 'Subestación Eléctrica',
    spawnWeight: 0.015,
    respawnTimeMinMinutes: 10,
    respawnTimeMaxMinutes: 15,
    isUniqueInstance: false,
    modelSrc: 'assets/items/rare/baterias_alquimicas.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.RARE].hex,
    statsContribution: { hpBonus: 25, affinityFocus: 'GALVANIC' }
  },
  engranajes_bronce: {
    id: 'engranajes_bronce',
    rarity: ItemRarity.RARE,
    nameEs: 'Engranajes de bronce perfectos',
    nameEn: 'Perfect Bronze Gears',
    zone: 'Reserva de Minería',
    spawnWeight: 0.015,
    respawnTimeMinMinutes: 10,
    respawnTimeMaxMinutes: 15,
    isUniqueInstance: false,
    modelSrc: 'assets/items/rare/engranajes_bronce.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.RARE].hex,
    statsContribution: { defenseBonus: 6, affinityFocus: 'MECHANICAL' }
  },
  dinamo_galvanica: {
    id: 'dinamo_galvanica',
    rarity: ItemRarity.RARE,
    nameEs: 'Dínamo galvánica',
    nameEn: 'Galvanic Dynamo',
    zone: 'Subestación Eléctrica',
    spawnWeight: 0.015,
    respawnTimeMinMinutes: 10,
    respawnTimeMaxMinutes: 15,
    isUniqueInstance: false,
    modelSrc: 'assets/items/rare/dinamo_galvanica.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.RARE].hex,
    statsContribution: { attackBonus: 5, affinityFocus: 'GALVANIC' }
  },
  cristal_fuerza: {
    id: 'cristal_fuerza',
    rarity: ItemRarity.RARE,
    nameEs: 'Cristal de cuarzo resonante',
    nameEn: 'Resonating Quartz Crystal',
    zone: 'Torre de Radio',
    spawnWeight: 0.015,
    respawnTimeMinMinutes: 10,
    respawnTimeMaxMinutes: 15,
    isUniqueInstance: false,
    modelSrc: 'assets/items/rare/cristal_fuerza.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.RARE].hex,
    statsContribution: { speedBonus: 5, affinityFocus: 'LUMINOUS' }
  },
  giroscopio_precision: {
    id: 'giroscopio_precision',
    rarity: ItemRarity.RARE,
    nameEs: 'Giróscopo de precisión',
    nameEn: 'Precision Gyroscope',
    zone: 'Reserva de Minería',
    spawnWeight: 0.015,
    respawnTimeMinMinutes: 10,
    respawnTimeMaxMinutes: 15,
    isUniqueInstance: false,
    modelSrc: 'assets/items/rare/giroscopio_precision.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.RARE].hex,
    statsContribution: { defenseBonus: 5, affinityFocus: 'MECHANICAL' }
  },
  condensador_presion: {
    id: 'condensador_presion',
    rarity: ItemRarity.RARE,
    nameEs: 'Condensador de alta presión',
    nameEn: 'High-Pressure Condenser',
    zone: 'Subestación Eléctrica',
    spawnWeight: 0.015,
    respawnTimeMinMinutes: 10,
    respawnTimeMaxMinutes: 15,
    isUniqueInstance: false,
    modelSrc: 'assets/items/rare/condensador_presion.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.RARE].hex,
    statsContribution: { hpBonus: 20, affinityFocus: 'STEAM' }
  },

  // --------------------------------------------------------------------------
  // ÉPICOS (7 Ítems) - Reserva / Calderas PK / Torre (Peso Total: 5.6% / 0.056 - Límite 1)
  // --------------------------------------------------------------------------
  nucleo_mana: {
    id: 'nucleo_mana',
    rarity: ItemRarity.EPIC,
    nameEs: 'Núcleo de maná condensado',
    nameEn: 'Condensed Mana Core',
    zone: 'Reserva de Minería',
    spawnWeight: 0.008,
    respawnTimeMinMinutes: 20,
    respawnTimeMaxMinutes: 30,
    isUniqueInstance: true,
    modelSrc: 'assets/items/epic/nucleo_mana.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.EPIC].hex,
    statsContribution: { affinityFocus: 'AETHER', attackBonus: 8 }
  },
  cerebro_automata: {
    id: 'cerebro_automata',
    rarity: ItemRarity.EPIC,
    nameEs: 'Cerebro de autómata',
    nameEn: 'Automaton Brain',
    zone: 'Reserva de Minería',
    spawnWeight: 0.008,
    respawnTimeMinMinutes: 20,
    respawnTimeMaxMinutes: 30,
    isUniqueInstance: true,
    modelSrc: 'assets/items/epic/cerebro_automata.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.EPIC].hex,
    statsContribution: { attackBonus: 8, affinityFocus: 'MECHANICAL' }
  },
  reactor_eter: {
    id: 'reactor_eter',
    rarity: ItemRarity.EPIC,
    nameEs: 'Reactor de éter',
    nameEn: 'Aether Reactor',
    zone: 'Calderas de la Fundición (PK)',
    spawnWeight: 0.008,
    respawnTimeMinMinutes: 20,
    respawnTimeMaxMinutes: 30,
    isUniqueInstance: true,
    modelSrc: 'assets/items/epic/reactor_eter.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.EPIC].hex,
    statsContribution: { attackBonus: 9, affinityFocus: 'AETHER' }
  },
  corazon_caldera: {
    id: 'corazon_caldera',
    rarity: ItemRarity.EPIC,
    nameEs: 'Corazón de caldera',
    nameEn: 'Boiler Heart',
    zone: 'Calderas de la Fundición (PK)',
    spawnWeight: 0.008,
    respawnTimeMinMinutes: 20,
    respawnTimeMaxMinutes: 30,
    isUniqueInstance: true,
    modelSrc: 'assets/items/epic/corazon_caldera.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.EPIC].hex,
    statsContribution: { defenseBonus: 8, affinityFocus: 'STEAM' }
  },
  bateria_plasma: {
    id: 'bateria_plasma',
    rarity: ItemRarity.EPIC,
    nameEs: 'Batería de plasma supercargada',
    nameEn: 'Supercharged Plasma Battery',
    zone: 'Subestación Eléctrica',
    spawnWeight: 0.008,
    respawnTimeMinMinutes: 20,
    respawnTimeMaxMinutes: 30,
    isUniqueInstance: true,
    modelSrc: 'assets/items/epic/bateria_plasma.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.EPIC].hex,
    statsContribution: { attackBonus: 8, affinityFocus: 'GALVANIC' }
  },
  matriz_optica_solar: {
    id: 'matriz_optica_solar',
    rarity: ItemRarity.EPIC,
    nameEs: 'Matriz óptica solar',
    nameEn: 'Solar Optical Array',
    zone: 'Torre de Radio',
    spawnWeight: 0.008,
    respawnTimeMinMinutes: 20,
    respawnTimeMaxMinutes: 30,
    isUniqueInstance: true,
    modelSrc: 'assets/items/epic/matriz_optica_solar.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.EPIC].hex,
    statsContribution: { speedBonus: 7, affinityFocus: 'LUMINOUS' }
  },
  embolo_titanio: {
    id: 'embolo_titanio',
    rarity: ItemRarity.EPIC,
    nameEs: 'Émbolo de titanio forjado',
    nameEn: 'Forged Titanium Piston',
    zone: 'Calderas de la Fundición (PK)',
    spawnWeight: 0.008,
    respawnTimeMinMinutes: 20,
    respawnTimeMaxMinutes: 30,
    isUniqueInstance: true,
    modelSrc: 'assets/items/epic/embolo_titanio.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.EPIC].hex,
    statsContribution: { defenseBonus: 7, affinityFocus: 'STEAM' }
  },

  // --------------------------------------------------------------------------
  // LEGENDARIOS (4 Ítems) - Desierto de Chatarra PK (Peso Total: 1.4% / 0.014 - Límite 1)
  // --------------------------------------------------------------------------
  ojo_dragon: {
    id: 'ojo_dragon',
    rarity: ItemRarity.LEGENDARY,
    nameEs: 'Ojo de dragón mecánico',
    nameEn: 'Mechanical Dragon Eye',
    zone: 'Desierto de Chatarra (PK)',
    spawnWeight: 0.0035,
    respawnTimeMinMinutes: 45,
    respawnTimeMaxMinutes: 60,
    isUniqueInstance: true,
    modelSrc: 'assets/items/legendary/ojo_dragon.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.LEGENDARY].hex,
    statsContribution: { attackBonus: 14, affinityFocus: 'AETHER' }
  },
  corazon_primigenio: {
    id: 'corazon_primigenio',
    rarity: ItemRarity.LEGENDARY,
    nameEs: 'Corazón de golem primigenio',
    nameEn: 'Primordial Golem Heart',
    zone: 'Desierto de Chatarra (PK)',
    spawnWeight: 0.0035,
    respawnTimeMinMinutes: 45,
    respawnTimeMaxMinutes: 60,
    isUniqueInstance: true,
    modelSrc: 'assets/items/legendary/corazon_primigenio.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.LEGENDARY].hex,
    statsContribution: { attackBonus: 8, defenseBonus: 8, hpBonus: 35, speedBonus: 8 }
  },
  singularidad_eterica: {
    id: 'singularidad_eterica',
    rarity: ItemRarity.LEGENDARY,
    nameEs: 'Singularidad etérica',
    nameEn: 'Aetheric Singularity',
    zone: 'Desierto de Chatarra (PK)',
    spawnWeight: 0.0035,
    respawnTimeMinMinutes: 45,
    respawnTimeMaxMinutes: 60,
    isUniqueInstance: true,
    modelSrc: 'assets/items/legendary/singularidad_eterica.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.LEGENDARY].hex,
    statsContribution: { attackBonus: 12, speedBonus: 6, affinityFocus: 'AETHER' }
  },
  relicario_astral: {
    id: 'relicario_astral',
    rarity: ItemRarity.LEGENDARY,
    nameEs: 'Relicario de engranajes astrales',
    nameEn: 'Celestial Gear Reliquary',
    zone: 'Desierto de Chatarra (PK)',
    spawnWeight: 0.0035,
    respawnTimeMinMinutes: 45,
    respawnTimeMaxMinutes: 60,
    isUniqueInstance: true,
    modelSrc: 'assets/items/legendary/relicario_astral.glb',
    colorHex: RARITY_COLOR_MAP[ItemRarity.LEGENDARY].hex,
    statsContribution: { defenseBonus: 10, hpBonus: 30, affinityFocus: 'AETHER' }
  }
}

/**
 * Obtiene la configuración de un ítem por su ID canónico.
 */
export function getItemConfig(itemId: string): ItemConfig | undefined {
  return COLLECTABLE_ITEMS[itemId]
}

/**
 * Devuelve la lista de todos los ítems pertenecientes a un nivel de rareza.
 */
export function getItemsByRarity(rarity: ItemRarity): ItemConfig[] {
  return Object.values(COLLECTABLE_ITEMS).filter((item) => item.rarity === rarity)
}

/**
 * Devuelve el código de color hexadecimal para una rareza.
 */
export function getRarityColorHex(rarity: ItemRarity): string {
  return RARITY_COLOR_MAP[rarity]?.hex ?? '#FFFFFF'
}
