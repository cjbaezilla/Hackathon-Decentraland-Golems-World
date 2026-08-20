/**
 * ============================================================================
 * TIPOS Y ESQUEMA DE INTERNACIONALIZACIÓN (i18n)
 * ============================================================================
 * Define los tipos de lenguaje soportados y la estructura canónica del diccionario
 * de traducciones para la escena de Golems en Decentraland SDK7.
 */

export type Language = 'es' | 'en'

export interface TranslationSchema {
  common: {
    interact: string
    collect: string
    close: string
    open: string
    back: string
    confirm: string
    cancel: string
    level: string
    levelShort: string
    hp: string
    attack: string
    defense: string
    speed: string
    exp: string
    kills: string
    languageToggle: string
    parcel: string
    coords: string
  }
  zones: {
    forgeDistrict: string
    scrapDesert: string
    miningReserve: string
    foundryBoilers: string
    southCorridor: string
    chatarrales: string
    abandonedFactory: string
    substation: string
    radioTower: string
    arena: string
  }
  affinities: {
    steam: string
    galvanic: string
    mechanical: string
    luminous: string
    aether: string
  }
  golems: {
    steamNames: string[]
    galvanicNames: string[]
    mechanicalNames: string[]
    luminousNames: string[]
    aetherNames: string[]
  }
  combat: {
    arenaEnter: string
    arenaExit: string
    attackLog: string
    elementalAdvantage: string
    defeatLog: string
    golemFallen: string
    levelUp: string
    victory: string
    defeat: string
  }
  trampoline: {
    hoverText: string
    signTitle: string
    signSubtitle: string
  }
  radar: {
    searching: string
    cold: string
    warm: string
    hot: string
    detected: string
    distanceMeters: string
  }
  forge: {
    title: string
    subtitle: string
    craftButton: string
    insufficientMaterials: string
    successCraft: string
    slotsCount: string
  }
  npc: {
    name: string
    role: string
    floatingLabel: string
    hoverText: string
    companionName: string
    dialogTitle: string
    dialogIntro: string
    optLore: string
    optGolems: string
    optZones: string
    optTips: string
    optClose: string
    loreText: string
    golemsText: string
    zonesText: string
    tipsText: string
    backButton: string
    optReplayCinematic: string
    firstTimeQuestion: string
    optFirstTimeYes: string
    optFirstTimeNo: string
    veteranFarewell: string
    uiLanguageExplanation: string
    uiMinimapExplanation: string
    mechanicsExplanation: string
    optStartTour: string
    optExploreAlone: string
    nextButton: string
    continueButton: string
    finishTourButton: string
    tourHideoutTitle: string
    tourHideoutText: string
    tourMarketWestTitle: string
    tourMarketWestText: string
    tourFactoryTitle: string
    tourFactoryText: string
    tourMarketSouthTitle: string
    tourMarketSouthText: string
    tourFinishTitle: string
    tourFinishText: string
  }
  tour: {
    speakerBadge: string
    skipTour: string
    subtitleWp1: string
    subtitleWp2: string
    subtitleWp3: string
    subtitleWp4: string
    subtitleWp5: string
    subtitleWp6: string
    subtitleWp7: string
    subtitleWp8: string
    subtitleWp9: string
    subtitleWp10: string
    subtitleWp11: string
  }
  cinematic: {
    title: string
    subtitle: string
    skipButton: string
    hintPrompt: string
    marketWestTitle: string
    marketWestSubtitle: string
    marketSouthTitle: string
    marketSouthSubtitle: string
    hideoutTitle: string
    hideoutSubtitle: string
    factoryTitle: string
    factorySubtitle: string
  }
  map: {
    title: string
    subtitle: string
    enlarge: string
    minimize: string
    close: string
    north: string
    south: string
    east: string
    west: string
    legendTitle: string
    safeZone: string
    pkZone: string
    arenaZone: string
    playerTooltip: string
  }
}


