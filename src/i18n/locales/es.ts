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
    languageToggle: '🌐 ES | en'
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
  }
}
