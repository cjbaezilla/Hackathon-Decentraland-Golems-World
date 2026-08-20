import { Language, TranslationSchema } from './types'
import { es } from './locales/es'
import { en } from './locales/en'

/**
 * ============================================================================
 * MOTOR DE INTERNACIONALIZACIÓN (i18n)
 * ============================================================================
 * Gestiona el idioma actual, resuelve claves de traducción con interpolación
 * y emite eventos para componentes 3D y sistemas reactivos.
 */

const translations: Record<Language, TranslationSchema> = {
  es,
  en
}

let activeLanguage: Language = 'en'
const listeners: Array<(lang: Language) => void> = []

/**
 * Obtiene el idioma actualmente activo en la escena.
 */
export function getLanguage(): Language {
  return activeLanguage
}

/**
 * Cambia el idioma activo y notifica a todos los suscriptores.
 */
export function setLanguage(lang: Language) {
  if (activeLanguage === lang) return
  activeLanguage = lang
  for (const listener of listeners) {
    try {
      listener(activeLanguage)
    } catch (err) {
      console.error('[i18n] Error en listener de cambio de idioma:', err)
    }
  }
}

/**
 * Alterna entre Español e Inglés.
 */
export function toggleLanguage(): Language {
  const nextLang: Language = activeLanguage === 'es' ? 'en' : 'es'
  setLanguage(nextLang)
  return nextLang
}

/**
 * Suscribe una función para reaccionar al cambio de idioma (ej. actualizar TextShape en 3D).
 * Devuelve una función para cancelar la suscripción.
 */
export function onLanguageChange(listener: (lang: Language) => void): () => void {
  listeners.push(listener)
  return () => {
    const idx = listeners.indexOf(listener)
    if (idx !== -1) {
      listeners.splice(idx, 1)
    }
  }
}

/**
 * Obtiene el esquema completo de traducciones para el idioma activo o uno especificado.
 */
export function getTranslations(lang?: Language): TranslationSchema {
  return translations[lang || activeLanguage]
}

/**
 * Resuelve una clave de traducción por ruta (ej. 'combat.arenaEnter' o 'common.level')
 * con soporte para reemplazo de variables simples {varName}.
 */
export function t(
  path: string,
  params?: Record<string, string | number>,
  lang?: Language
): string {
  const dict = translations[lang || activeLanguage] as any
  const segments = path.split('.')
  let current: any = dict

  for (const segment of segments) {
    if (current && typeof current === 'object' && segment in current) {
      current = current[segment]
    } else {
      console.log(`[i18n] Clave de traducción no encontrada: "${path}" para idioma "${lang || activeLanguage}"`)
      return path
    }
  }

  if (typeof current !== 'string') {
    return path
  }

  if (!params) {
    return current
  }

  let result = current
  for (const key of Object.keys(params)) {
    const val = params[key]
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(val))
  }

  return result
}

/**
 * Obtiene el nombre traducido de una afinidad elemental.
 */
export function getLocalizedAffinity(affinity: string, lang?: Language): string {
  const dict = getTranslations(lang)
  switch (affinity.toLowerCase()) {
    case 'vapor':
    case 'steam':
      return dict.affinities.steam
    case 'galvánico':
    case 'galvanico':
    case 'galvanic':
      return dict.affinities.galvanic
    case 'mecánico':
    case 'mecanico':
    case 'mechanical':
      return dict.affinities.mechanical
    case 'luminoso':
    case 'luminous':
      return dict.affinities.luminous
    case 'éter':
    case 'eter':
    case 'aether':
      return dict.affinities.aether
    default:
      return affinity
  }
}

/**
 * Obtiene la etiqueta traducida de rareza de un elemento/golem.
 */
export function getLocalizedRarity(rarity: string, lang?: Language): string {
  const dict = getTranslations(lang)
  switch (rarity.toLowerCase()) {
    case 'común':
    case 'comun':
    case 'common':
      return dict.rarities.common
    case 'poco común':
    case 'poco comun':
    case 'uncommon':
      return dict.rarities.uncommon
    case 'raro':
    case 'rare':
      return dict.rarities.rare
    case 'épico':
    case 'epico':
    case 'epic':
      return dict.rarities.epic
    case 'legendario':
    case 'legendary':
      return dict.rarities.legendary
    default:
      return rarity
  }
}

/**
 * Obtiene el nombre traducido de un arquetipo de golem según su afinidad y variante (0 a 4).
 */
export function getLocalizedGolemName(affinity: string, variantIndex: number, lang?: Language): string {
  const dict = getTranslations(lang)
  const idx = Math.max(0, Math.min(4, Math.floor(variantIndex)))
  switch (affinity.toLowerCase()) {
    case 'vapor':
    case 'steam':
      return dict.golems.steamNames[idx] || dict.golems.steamNames[0]
    case 'galvánico':
    case 'galvanico':
    case 'galvanic':
      return dict.golems.galvanicNames[idx] || dict.golems.galvanicNames[0]
    case 'mecánico':
    case 'mecanico':
    case 'mechanical':
      return dict.golems.mechanicalNames[idx] || dict.golems.mechanicalNames[0]
    case 'luminoso':
    case 'luminous':
      return dict.golems.luminousNames[idx] || dict.golems.luminousNames[0]
    case 'éter':
    case 'eter':
    case 'aether':
      return dict.golems.aetherNames[idx] || dict.golems.aetherNames[0]
    default:
      return dict.golems.mechanicalNames[idx] || 'Golem'
  }
}

export * from './types'
