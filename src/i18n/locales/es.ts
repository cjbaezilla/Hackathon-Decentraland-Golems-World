import { TranslationSchema } from '../types'

/**
 * ============================================================================
 * DICCIONARIO EN ESPAÑOL (CANÓNICO)
 * ============================================================================
 */
export const es: TranslationSchema = {
  common: {
    interact: 'Interactuar',
    collect: 'Recolectar',
    close: 'Cerrar',
    open: 'Abrir',
    back: 'Volver',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    level: 'Nivel',
    levelShort: 'Nv.',
    hp: 'Salud',
    attack: 'Ataque',
    defense: 'Defensa',
    speed: 'Velocidad',
    exp: 'EXP',
    kills: 'Bajas',
    languageToggle: '🌐 ES | en',
    parcel: 'Parcela',
    coords: 'Coord.'
  },
  zones: {
    forgeDistrict: 'Distrito de la Forja',
    scrapDesert: 'Desierto de Chatarra',
    miningReserve: 'Reserva de Minería',
    foundryBoilers: 'Calderas de la Fundición',
    southCorridor: 'Corredor y Gran Vía Sur',
    chatarrales: 'Los Chatarrales',
    abandonedFactory: 'Fábrica Abandonada',
    substation: 'Subestación Eléctrica',
    radioTower: 'Torre de Radio',
    arena: 'Gran Arena de Torneo Steampunk'
  },
  affinities: {
    steam: 'Vapor',
    galvanic: 'Galvánico',
    mechanical: 'Mecánico',
    luminous: 'Luminoso',
    aether: 'Éter'
  },
  golems: {
    steamNames: [
      'Calderón de Vapor',
      'Fogonero Cobrizo',
      'Vaporizador Blindado',
      'Termotanque Autómata',
      'Titán de Presión'
    ],
    galvanicNames: [
      'Chispazo Galvánico',
      'Voltamperio Centella',
      'Bobina Electrificada',
      'Arco Galvanoide',
      'Centella de Inducción'
    ],
    mechanicalNames: [
      'Acorazado Mecánico',
      'Engranaje Férreo',
      'Brazo de Chatarra',
      'Autómata Remachado',
      'Bastión de Bielas'
    ],
    luminousNames: [
      'Faro Solar Luminoso',
      'Prisma Refractor',
      'Centinela de Filamento',
      'Baliza de Cuarzo',
      'Destello Espectral'
    ],
    aetherNames: [
      'Autómata de Éter',
      'Resonador Místico',
      'Espectro de Vacío',
      'Orbe de Maná Fósil',
      'Vórtice Alquímico'
    ]
  },
  combat: {
    arenaEnter: '⚔️ ¡Entraste a la Arena! Tus golems inician combate FFA.',
    arenaExit: '🛡️ Saliste de la Arena. Tus golems vuelven a seguirte.',
    attackLog: '⚔️ {attacker} atacó a {target} (-{damage} HP) {advantage}',
    elementalAdvantage: '⚡ [VENTAJA ELEMENTAL]',
    defeatLog: '🏆 ¡{attacker} destruyó a {target}! (+{exp} EXP)',
    golemFallen: '💥 ¡Un golem ha caído en la arena!',
    levelUp: '⭐ ¡{name} subió al Nivel {level}!',
    victory: '¡Victoria!',
    defeat: 'Derrota'
  },
  trampoline: {
    hoverText: '¡Saltar por los aires! (Trampolín de Vapor)',
    signTitle: '♨️ TRAMPOLÍN DE VAPOR ⚡',
    signSubtitle: '¡Pisa o toca para volar por los aires!'
  },
  radar: {
    searching: 'Buscando señales térmicas...',
    cold: 'Señal lejana detectada',
    warm: 'Señal térmica en las proximidades',
    hot: '¡Material a escasos metros!',
    detected: '¡Pieza emergida del terreno!',
    distanceMeters: '{distance}m de distancia'
  },
  forge: {
    title: 'FORJA DE GOLEMS',
    subtitle: 'Combina entre 5 y 12 piezas de chatarra',
    craftButton: 'Insuflar Vida',
    insufficientMaterials: 'Se requieren entre 5 y 12 materiales',
    successCraft: '¡Nuevo golem forjado exitosamente!',
    slotsCount: 'Piezas: {count}/12'
  },
  npc: {
    name: 'Silas',
    role: 'Sobreviviente del Páramo',
    floatingLabel: '⚙️ Silas • Sobreviviente del Páramo',
    hoverText: 'Hablar con Silas',
    companionName: 'Pistón',
    dialogTitle: '⚙️ SILAS, EL SOBREVIVIENTE',
    dialogIntro: '¡Vaya, otro forastero que llega entero a la Forja! Soy Silas. Llevo años sobreviviendo en este páramo de chatarra y vapor. Si quieres durar aquí más de dos días con vida, te conviene escuchar con atención.',
    optLore: '📖 ¿Qué es este lugar y cómo sobrevivo?',
    optGolems: '🤖 ¿Cómo creo y combato con Golems?',
    optZones: '🗺️ ¿Qué peligros y zonas hay en el mapa?',
    optTips: '💡 Dame un consejo de supervivencia',
    optClose: '🚪 ¡Gracias Silas, volveré luego!',
    loreText: 'Antes de la Gran Sobrecarga, este mundo era una red colosal de fundiciones y talleres. Cuando los reactores colapsaron, la energía mágica residual se fusionó con la chatarra, dando vida a los primeros autómatas. Para sobrevivir, usa tu radar de calor: detectará piezas enterradas que emergen cuando te acercas.',
    golemsText: 'No podrás explorar muy lejos sin un escuadrón. En la Forja puedes combinar entre 5 y 12 piezas de chatarra. Cada receta única engendra un golem con afinidad elemental: Vapor vence a Mecánico, Mecánico a Galvánico, Galvánico a Luminoso, Luminoso a Éter y Éter a Vapor. ¡En la Gran Arena central (200m, 200m) probarás su valía!',
    zonesText: 'El Distrito de la Forja (Suroeste) y la Reserva Minera (Noreste) son zonas seguras. Pero ten mucho cuidado si vas al Desierto de Chatarra (Noroeste) o a las Calderas (Sureste): son zonas PK sin ley donde los materiales legendarios y los combates a muerte están a la orden del día.',
    tipsText: 'Consejo de viejo chatarrero: aprovecha los trampolines de vapor para desplazarte a toda velocidad. Y jamás descartes piezas comunes como tubos o resortes: una buena combinación puede crear un golem más veloz y equilibrado que un coloso pesado.',
    backButton: '◀ Volver a preguntar',
    optReplayCinematic: '🎬 Ver presentación del campamento'
  },
  cinematic: {
    title: '⚙️ SILAS, EL SOBREVIVIENTE',
    subtitle: 'Tu guía y mentor en el Distrito de la Forja y los Páramos',
    skipButton: 'Saltar ⏭️',
    hintPrompt: '💡 ¡Toca a Silas para iniciar tu aventura de forja!'
  }
}

