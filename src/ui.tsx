import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { GolemAffinity } from './config/golems'
import { t, toggleLanguage, getLanguage } from './i18n'
import { getPlayerLocationInfo } from './utils/location'
import {
  getIsNpcDialogOpen,
  getNpcDialogStep,
  setNpcDialogStep,
  closeNpcDialog,
  getIsCinematicActive,
  getActiveCinematicType,
  getIsSilasTourActive,
  getSilasTourSubtitle,
  NpcDialogStep
} from './state'
import { updateWelcomeNpcLanguage } from './objects/welcomeNpc'
import { playSilasCinematic, stopSilasCinematic } from './cinematics/silasCinematic'
import {
  startSilasGuidedTour,
  advanceSilasTourToNextWaypoint,
  finishSilasGuidedTour
} from './systems/silasTourSystem'
import { MinimapWidget, BigMapModal } from './ui/minimapComponent'

/**
 * ============================================================================
 * INTERFAZ DE USUARIO 2D (REACT-ECS) - BASE LIMPIA Y MULTILINGÜE
 * ============================================================================
 * Configurada con resolución virtual base (1920x1080) optimizada para Mobile First y Desktop.
 * El contenedor raíz utiliza `pointerFilter: 'none'` para garantizar que los controles táctiles,
 * joysticks móviles y clics en el mundo 3D funcionen sin interferencias.
 * Incluye HUD de Tilemap/Ubicación en tiempo real y selector de idioma en zona segura superior derecha.
 */
export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent, { virtualWidth: 1920, virtualHeight: 1080 })
}

/**
 * Devuelve un icono elemental representativo según la afinidad del golem.
 */
export function getAffinityIcon(affinity: string): string {
  switch (affinity.toLowerCase()) {
    case 'vapor':
    case 'steam':
    case GolemAffinity.STEAM.toLowerCase():
      return '♨️'
    case 'galvánico':
    case 'galvanico':
    case 'galvanic':
    case GolemAffinity.GALVANIC.toLowerCase():
      return '⚡'
    case 'mecánico':
    case 'mecanico':
    case 'mechanical':
    case GolemAffinity.MECHANICAL.toLowerCase():
      return '⚙️'
    case 'luminoso':
    case 'luminous':
    case GolemAffinity.LUMINOUS.toLowerCase():
      return '☀️'
    case 'éter':
    case 'eter':
    case 'aether':
    case GolemAffinity.AETHER.toLowerCase():
      return '🔮'
    default:
      return '🤖'
  }
}

/**
 * Componente Indicador de Ubicación y Tilemap en Tiempo Real (Mobile-First / HUD)
 */
export const LocationIndicator = () => {
  const loc = getPlayerLocationInfo()

  return (
    <UiEntity
      uiTransform={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: { top: 6, bottom: 6, left: 16, right: 16 },
        margin: { right: 12 },
        minWidth: 340,
        height: 52,
        pointerFilter: 'none'
      }}
      uiBackground={{
        color: Color4.create(0.08, 0.10, 0.14, 0.92)
      }}
    >
      {/* Fila 1: Tilemap / Parcela y Coordenadas Métricas */}
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 20
        }}
        uiText={{
          value: `🗺️ ${t('common.parcel')} [${loc.parcelX}, ${loc.parcelZ}] • X: ${loc.x.toFixed(1)}m | Z: ${loc.z.toFixed(1)}m`,
          fontSize: 14,
          color: Color4.create(1.0, 0.85, 0.35, 1.0),
          textAlign: 'middle-left'
        }}
      />
      {/* Fila 2: Distrito / Zona Activa */}
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 20
        }}
        uiText={{
          value: `${loc.zoneIcon} ${loc.zoneName}`,
          fontSize: 13,
          color: Color4.create(0.40, 0.90, 1.0, 1.0),
          textAlign: 'middle-left'
        }}
      />
    </UiEntity>
  )
}

/**
 * Componente Selector de Idioma Táctil (Mobile-First / Safe Area)
 */
export const LanguageToggle = () => {
  const currentLang = getLanguage()
  const isEs = currentLang === 'es'

  return (
    <UiEntity
      uiTransform={{
        width: 140,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        pointerFilter: 'block'
      }}
      uiBackground={{
        color: Color4.create(0.12, 0.14, 0.18, 0.92)
      }}
      onMouseDown={() => {
        toggleLanguage()
        updateWelcomeNpcLanguage()
      }}
      uiText={{
        value: isEs ? '🌐 ES | en' : '🌐 es | EN',
        fontSize: 18,
        color: isEs ? Color4.create(1.0, 0.85, 0.3, 1.0) : Color4.create(0.4, 0.9, 1.0, 1.0)
      }}
    />
  )
}

/**
 * Componente de Diálogo Interactivo con Silas el Sobreviviente (Mobile-First / RPG Modal)
 */
export const NpcDialog = () => {
  if (!getIsNpcDialogOpen()) return null

  const step: NpcDialogStep = getNpcDialogStep()

  // Determinar título y contenido narrativo según la rama activa
  let title = t('npc.dialogTitle')
  let bodyContent = t('npc.dialogIntro')

  if (step === 'firstTimeCheck') {
    bodyContent = t('npc.firstTimeQuestion')
  } else if (step === 'veteranFarewell') {
    bodyContent = t('npc.veteranFarewell')
  } else if (step === 'uiLanguage') {
    bodyContent = t('npc.uiLanguageExplanation')
  } else if (step === 'uiMinimap') {
    bodyContent = t('npc.uiMinimapExplanation')
  } else if (step === 'mechanicsOverview') {
    bodyContent = t('npc.mechanicsExplanation')
  } else if (step === 'tourHideout') {
    title = t('npc.tourHideoutTitle')
    bodyContent = t('npc.tourHideoutText')
  } else if (step === 'tourMarketWest') {
    title = t('npc.tourMarketWestTitle')
    bodyContent = t('npc.tourMarketWestText')
  } else if (step === 'tourFactory') {
    title = t('npc.tourFactoryTitle')
    bodyContent = t('npc.tourFactoryText')
  } else if (step === 'tourMarketSouth') {
    title = t('npc.tourMarketSouthTitle')
    bodyContent = t('npc.tourMarketSouthText')
  } else if (step === 'tourFinish') {
    title = t('npc.tourFinishTitle')
    bodyContent = t('npc.tourFinishText')
  } else if (step === 'lore') {
    bodyContent = t('npc.loreText')
  } else if (step === 'golems') {
    bodyContent = t('npc.golemsText')
  } else if (step === 'zones') {
    bodyContent = t('npc.zonesText')
  } else if (step === 'tips') {
    bodyContent = t('npc.tipsText')
  }

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: { bottom: 40 },
        width: 880,
        minHeight: 330,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: { top: 18, bottom: 18, left: 24, right: 24 },
        pointerFilter: 'block'
      }}
      uiBackground={{
        color: Color4.create(0.06, 0.08, 0.12, 0.96)
      }}
    >
      {/* Cabecera del Diálogo: Nombre, Rol y Botón de Cierre */}
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 38,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: { bottom: 12 }
        }}
      >
        <UiEntity
          uiTransform={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <UiEntity
            uiText={{
              value: title,
              fontSize: 18,
              color: Color4.create(1.0, 0.85, 0.35, 1.0),
              textAlign: 'middle-left'
            }}
          />
          <UiEntity
            uiTransform={{ margin: { left: 12 } }}
            uiText={{
              value: `[ ${t('npc.role')} ]`,
              fontSize: 13,
              color: Color4.create(0.4, 0.9, 1.0, 0.85),
              textAlign: 'middle-left'
            }}
          />
        </UiEntity>

        {/* Botón Táctil de Cerrar (✖) */}
        <UiEntity
          uiTransform={{
            width: 38,
            height: 34,
            justifyContent: 'center',
            alignItems: 'center',
            pointerFilter: 'block'
          }}
          uiBackground={{
            color: Color4.create(0.24, 0.1, 0.1, 0.9)
          }}
          onMouseDown={() => {
            closeNpcDialog()
          }}
          uiText={{
            value: '✖',
            fontSize: 16,
            color: Color4.create(1.0, 0.4, 0.4, 1.0)
          }}
        />
      </UiEntity>

      {/* Cuerpo del Diálogo / Narrativa */}
      <UiEntity
        uiTransform={{
          width: '100%',
          minHeight: 110,
          padding: { top: 12, bottom: 12, left: 16, right: 16 },
          margin: { bottom: 16 },
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
        uiBackground={{
          color: Color4.create(0.12, 0.15, 0.2, 0.88)
        }}
      >
        <UiEntity
          uiTransform={{
            width: '100%'
          }}
          uiText={{
            value: bodyContent,
            fontSize: 15,
            color: Color4.create(0.95, 0.95, 0.95, 1.0),
            textAlign: 'top-left'
          }}
        />
      </UiEntity>

      {/* Opciones y Botones según la Rama Activa */}
      {step === 'firstTimeCheck' && (
        <UiEntity
          uiTransform={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <UiEntity
            uiTransform={{
              width: '58%',
              height: 46,
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{
              color: Color4.create(0.16, 0.32, 0.22, 0.95)
            }}
            onMouseDown={() => {
              setNpcDialogStep('uiLanguage')
            }}
            uiText={{
              value: t('npc.optFirstTimeYes'),
              fontSize: 13,
              color: Color4.create(0.4, 1.0, 0.5, 1.0)
            }}
          />
          <UiEntity
            uiTransform={{
              width: '39%',
              height: 46,
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{
              color: Color4.create(0.25, 0.2, 0.22, 0.95)
            }}
            onMouseDown={() => {
              setNpcDialogStep('veteranFarewell')
            }}
            uiText={{
              value: t('npc.optFirstTimeNo'),
              fontSize: 13,
              color: Color4.create(0.9, 0.85, 0.75, 1.0)
            }}
          />
        </UiEntity>
      )}

      {step === 'veteranFarewell' && (
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
            pointerFilter: 'block'
          }}
          uiBackground={{
            color: Color4.create(0.18, 0.28, 0.38, 0.95)
          }}
          onMouseDown={() => {
            closeNpcDialog()
          }}
          uiText={{
            value: t('npc.optClose'),
            fontSize: 14,
            color: Color4.create(1.0, 0.95, 0.5, 1.0)
          }}
        />
      )}

      {step === 'uiLanguage' && (
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
            pointerFilter: 'block'
          }}
          uiBackground={{
            color: Color4.create(0.18, 0.32, 0.44, 0.95)
          }}
          onMouseDown={() => {
            setNpcDialogStep('uiMinimap')
          }}
          uiText={{
            value: t('npc.nextButton'),
            fontSize: 14,
            color: Color4.create(1.0, 0.9, 0.4, 1.0)
          }}
        />
      )}

      {step === 'uiMinimap' && (
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
            pointerFilter: 'block'
          }}
          uiBackground={{
            color: Color4.create(0.18, 0.32, 0.44, 0.95)
          }}
          onMouseDown={() => {
            setNpcDialogStep('mechanicsOverview')
          }}
          uiText={{
            value: t('npc.nextButton'),
            fontSize: 14,
            color: Color4.create(1.0, 0.9, 0.4, 1.0)
          }}
        />
      )}

      {step === 'mechanicsOverview' && (
        <UiEntity
          uiTransform={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <UiEntity
            uiTransform={{
              width: '64%',
              height: 46,
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{
              color: Color4.create(0.16, 0.35, 0.25, 0.95)
            }}
            onMouseDown={() => {
              startSilasGuidedTour()
            }}
            uiText={{
              value: t('npc.optStartTour'),
              fontSize: 14,
              color: Color4.create(0.4, 1.0, 0.6, 1.0)
            }}
          />
          <UiEntity
            uiTransform={{
              width: '33%',
              height: 46,
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{
              color: Color4.create(0.22, 0.2, 0.24, 0.95)
            }}
            onMouseDown={() => {
              closeNpcDialog()
            }}
            uiText={{
              value: t('npc.optExploreAlone'),
              fontSize: 13,
              color: Color4.create(0.85, 0.85, 0.85, 1.0)
            }}
          />
        </UiEntity>
      )}

      {/* Paradas del Tour Guiado */}
      {(step === 'tourHideout' || step === 'tourMarketWest' || step === 'tourFactory' || step === 'tourMarketSouth') && (
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 46,
            justifyContent: 'center',
            alignItems: 'center',
            pointerFilter: 'block'
          }}
          uiBackground={{
            color: Color4.create(0.18, 0.36, 0.48, 0.95)
          }}
          onMouseDown={() => {
            advanceSilasTourToNextWaypoint()
          }}
          uiText={{
            value: t('npc.continueButton'),
            fontSize: 14,
            color: Color4.create(1.0, 0.95, 0.4, 1.0)
          }}
        />
      )}

      {step === 'tourFinish' && (
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 46,
            justifyContent: 'center',
            alignItems: 'center',
            pointerFilter: 'block'
          }}
          uiBackground={{
            color: Color4.create(0.16, 0.38, 0.22, 0.95)
          }}
          onMouseDown={() => {
            finishSilasGuidedTour()
          }}
          uiText={{
            value: t('npc.finishTourButton'),
            fontSize: 14,
            color: Color4.create(1.0, 0.95, 0.4, 1.0)
          }}
        />
      )}

      {/* Menú tradicional de diálogo */}
      {step === 'intro' && (
        <UiEntity
          uiTransform={{
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch'
          }}
        >
          {/* Fila 1: Lore y Golems */}
          <UiEntity
            uiTransform={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: { bottom: 8 }
            }}
          >
            <UiEntity
              uiTransform={{
                width: '49%',
                height: 42,
                justifyContent: 'center',
                alignItems: 'center',
                pointerFilter: 'block'
              }}
              uiBackground={{
                color: Color4.create(0.16, 0.22, 0.3, 0.95)
              }}
              onMouseDown={() => {
                setNpcDialogStep('lore')
              }}
              uiText={{
                value: t('npc.optLore'),
                fontSize: 13,
                color: Color4.create(1.0, 0.9, 0.4, 1.0)
              }}
            />
            <UiEntity
              uiTransform={{
                width: '49%',
                height: 42,
                justifyContent: 'center',
                alignItems: 'center',
                pointerFilter: 'block'
              }}
              uiBackground={{
                color: Color4.create(0.16, 0.22, 0.3, 0.95)
              }}
              onMouseDown={() => {
                setNpcDialogStep('golems')
              }}
              uiText={{
                value: t('npc.optGolems'),
                fontSize: 13,
                color: Color4.create(1.0, 0.9, 0.4, 1.0)
              }}
            />
          </UiEntity>

          {/* Fila 2: Zonas y Consejos */}
          <UiEntity
            uiTransform={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: { bottom: 8 }
            }}
          >
            <UiEntity
              uiTransform={{
                width: '49%',
                height: 42,
                justifyContent: 'center',
                alignItems: 'center',
                pointerFilter: 'block'
              }}
              uiBackground={{
                color: Color4.create(0.16, 0.22, 0.3, 0.95)
              }}
              onMouseDown={() => {
                setNpcDialogStep('zones')
              }}
              uiText={{
                value: t('npc.optZones'),
                fontSize: 13,
                color: Color4.create(1.0, 0.9, 0.4, 1.0)
              }}
            />
            <UiEntity
              uiTransform={{
                width: '49%',
                height: 42,
                justifyContent: 'center',
                alignItems: 'center',
                pointerFilter: 'block'
              }}
              uiBackground={{
                color: Color4.create(0.16, 0.22, 0.3, 0.95)
              }}
              onMouseDown={() => {
                setNpcDialogStep('tips')
              }}
              uiText={{
                value: t('npc.optTips'),
                fontSize: 13,
                color: Color4.create(1.0, 0.9, 0.4, 1.0)
              }}
            />
          </UiEntity>

          {/* Fila 3: Ver Cinemática y Salir */}
          <UiEntity
            uiTransform={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: { bottom: 4 }
            }}
          >
            <UiEntity
              uiTransform={{
                width: '64%',
                height: 38,
                justifyContent: 'center',
                alignItems: 'center',
                pointerFilter: 'block'
              }}
              uiBackground={{
                color: Color4.create(0.18, 0.26, 0.36, 0.95)
              }}
              onMouseDown={() => {
                closeNpcDialog()
                playSilasCinematic()
              }}
              uiText={{
                value: t('npc.optReplayCinematic'),
                fontSize: 13,
                color: Color4.create(0.4, 0.9, 1.0, 1.0)
              }}
            />

            <UiEntity
              uiTransform={{
                width: '34%',
                height: 38,
                justifyContent: 'center',
                alignItems: 'center',
                pointerFilter: 'block'
              }}
              uiBackground={{
                color: Color4.create(0.2, 0.16, 0.18, 0.9)
              }}
              onMouseDown={() => {
                closeNpcDialog()
              }}
              uiText={{
                value: t('npc.optClose'),
                fontSize: 13,
                color: Color4.create(0.85, 0.85, 0.85, 1.0)
              }}
            />
          </UiEntity>
        </UiEntity>
      )}

      {(step === 'lore' || step === 'golems' || step === 'zones' || step === 'tips') && (
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
            pointerFilter: 'block'
          }}
          uiBackground={{
            color: Color4.create(0.18, 0.28, 0.38, 0.95)
          }}
          onMouseDown={() => {
            setNpcDialogStep('intro')
          }}
          uiText={{
            value: t('npc.backButton'),
            fontSize: 14,
            color: Color4.create(1.0, 0.95, 0.5, 1.0)
          }}
        />
      )}
    </UiEntity>
  )
}

/**
 * Barra Flotante de Subtítulos de Silas durante la Marcha del Tour (Mobile-First / HUD)
 */
export const SilasTourSubtitleHUD = () => {
  if (!getIsSilasTourActive()) return null
  if (getIsNpcDialogOpen() || getIsCinematicActive()) return null

  const subtitle = getSilasTourSubtitle()
  if (!subtitle) return null

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: { bottom: 35 },
        width: 820,
        minHeight: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: { top: 8, bottom: 8, left: 16, right: 16 },
        pointerFilter: 'block'
      }}
      uiBackground={{
        color: Color4.create(0.06, 0.08, 0.12, 0.94)
      }}
    >
      {/* Contenedor de Texto y Speaker Badge */}
      <UiEntity
        uiTransform={{
          width: '78%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      >
        <UiEntity
          uiTransform={{
            height: 18,
            margin: { bottom: 2 }
          }}
          uiText={{
            value: t('tour.speakerBadge'),
            fontSize: 12,
            color: Color4.create(1.0, 0.85, 0.35, 1.0),
            textAlign: 'middle-left'
          }}
        />
        <UiEntity
          uiTransform={{
            width: '100%'
          }}
          uiText={{
            value: subtitle,
            fontSize: 14,
            color: Color4.create(0.95, 0.95, 0.95, 1.0),
            textAlign: 'middle-left'
          }}
        />
      </UiEntity>

      {/* Botón Salir / Cancelar Tour */}
      <UiEntity
        uiTransform={{
          width: 140,
          height: 38,
          justifyContent: 'center',
          alignItems: 'center',
          pointerFilter: 'block'
        }}
        uiBackground={{
          color: Color4.create(0.24, 0.14, 0.14, 0.9)
        }}
        onMouseDown={() => {
          finishSilasGuidedTour()
        }}
        uiText={{
          value: t('tour.skipTour'),
          fontSize: 12,
          color: Color4.create(1.0, 0.6, 0.6, 1.0)
        }}
      />
    </UiEntity>
  )
}

/**
 * Superposición Cinemática de Cámara (Letterbox Bars + Banner Narrativo + Botón Táctil de Salto)
 */
export const CinematicOverlay = () => {
  if (!getIsCinematicActive()) return null

  const cinematicType = getActiveCinematicType()

  let title = t('cinematic.title')
  let subtitle = t('cinematic.subtitle')
  let hint: string | null = t('cinematic.hintPrompt')
  let showSkipButton: boolean = true

  if (cinematicType === 'market_west') {
    title = t('cinematic.marketWestTitle')
    subtitle = t('cinematic.marketWestSubtitle')
    hint = null
    showSkipButton = false
  } else if (cinematicType === 'market_south') {
    title = t('cinematic.marketSouthTitle')
    subtitle = t('cinematic.marketSouthSubtitle')
    hint = null
    showSkipButton = false
  } else if (cinematicType === 'hideout') {
    title = t('cinematic.hideoutTitle')
    subtitle = t('cinematic.hideoutSubtitle')
    hint = null
    showSkipButton = false
  } else if (cinematicType === 'factory') {
    title = t('cinematic.factoryTitle')
    subtitle = t('cinematic.factorySubtitle')
    hint = null
    showSkipButton = false
  }

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        width: '100%',
        height: '100%',
        pointerFilter: 'none',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {/* Franja Cinemática Superior */}
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 64,
          pointerFilter: 'none'
        }}
        uiBackground={{
          color: Color4.create(0.02, 0.03, 0.05, 0.88)
        }}
      />

      {/* Franja Cinemática Inferior y Tarjeta Narrativa */}
      <UiEntity
        uiTransform={{
          width: '100%',
          minHeight: 160,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { top: 14, bottom: 18, left: 24, right: 24 },
          pointerFilter: 'none'
        }}
        uiBackground={{
          color: Color4.create(0.04, 0.06, 0.09, 0.94)
        }}
      >
        {/* Título de la Cinemática */}
        <UiEntity
          uiTransform={{
            height: 28,
            margin: { bottom: 4 }
          }}
          uiText={{
            value: title,
            fontSize: 21,
            color: Color4.create(1.0, 0.85, 0.35, 1.0),
            textAlign: 'middle-center'
          }}
        />

        {/* Subtítulo Descriptivo */}
        <UiEntity
          uiTransform={{
            height: 22,
            margin: { bottom: 4 }
          }}
          uiText={{
            value: subtitle,
            fontSize: 14,
            color: Color4.create(0.45, 0.88, 1.0, 0.95),
            textAlign: 'middle-center'
          }}
        />

        {/* Prompt Orientativo (solo si está disponible) */}
        {hint ? (
          <UiEntity
            uiTransform={{
              height: 20,
              margin: { bottom: 10 }
            }}
            uiText={{
              value: hint,
              fontSize: 13,
              color: Color4.create(0.9, 0.95, 0.8, 0.9),
              textAlign: 'middle-center'
            }}
          />
        ) : null}

        {/* Botón Táctil Mobile-First de Salto (Skip) - Solo visible en presentación de Silas */}
        {showSkipButton ? (
          <UiEntity
            uiTransform={{
              width: 170,
              height: 44,
              justifyContent: 'center',
              alignItems: 'center',
              pointerFilter: 'block'
            }}
            uiBackground={{
              color: Color4.create(0.24, 0.16, 0.1, 0.95)
            }}
            onMouseDown={() => {
              stopSilasCinematic()
            }}
            uiText={{
              value: t('cinematic.skipButton'),
              fontSize: 14,
              color: Color4.create(1.0, 0.85, 0.4, 1.0)
            }}
          />
        ) : null}
      </UiEntity>
    </UiEntity>
  )
}

/**
 * Barra Superior Derecha (Safe Area) que agrupa el HUD de Ubicación y el Selector de Idioma.
 */
export const TopHeaderBar = () => {
  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: { top: 20, right: 28 },
        flexDirection: 'row',
        alignItems: 'center',
        pointerFilter: 'none'
      }}
    >
      {/* Indicador de Tilemap / Parcela y Coordenadas */}
      <LocationIndicator />

      {/* Selector de Idioma */}
      <LanguageToggle />
    </UiEntity>
  )
}

/**
 * Componente raíz de UI limpio, listo para albergar los subsistemas del juego final
 * (Radar térmico, Forja de Golems, Inventario de Chatarra, Escuadrón y Diálogo de NPCs).
 */
export const uiComponent = () => {
  return (
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        pointerFilter: 'none',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}
    >
      {/* Barra Superior con Indicador de Tilemap y Selector de Idioma */}
      <TopHeaderBar />

      {/* Widget de Minimapa Compacto (Esquina Superior Derecha, bajo TopHeaderBar) */}
      <MinimapWidget />

      {/* Modal de Diálogo de Silas el Sobreviviente */}
      <NpcDialog />

      {/* Subtítulos Flotantes durante la Marcha del Tour de Silas */}
      <SilasTourSubtitleHUD />

      {/* Superposición Cinemática de Presentación de Silas */}
      <CinematicOverlay />

      {/* Modal de Mapa Grande Ampliado con Fondo Semitransparente */}
      <BigMapModal />
    </UiEntity>
  )
}