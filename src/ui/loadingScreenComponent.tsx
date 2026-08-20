import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { getSceneLoadProgress, getIsLoaderActive } from '../systems/sceneLoaderSystem'
import { getLanguage } from '../i18n'

/**
 * ============================================================================
 * PANTALLA DE CARGA STEAMPUNK FULLSCREEN (REACT-ECS SDK7)
 * ============================================================================
 * Mantiene la pantalla bloqueada con estética visual steampunk y barra de
 * progreso dinámico mientras se descargan e instancian los 100 NPCs y la
 * arquitectura 3D de 400m x 400m. Se desinstala automáticamente al 100%.
 */
export const LoadingScreenWidget = () => {
  if (!getIsLoaderActive()) return null

  const progress = getSceneLoadProgress()
  const isEn = getLanguage() === 'en'

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: { top: 0, left: 0, right: 0, bottom: 0 },
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pointerFilter: 'block'
      }}
      uiBackground={{
        color: Color4.create(0.04, 0.05, 0.07, 1.0)
      }}
    >
      {/* Tarjeta Contenedora Principal Steampunk */}
      <UiEntity
        uiTransform={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { top: 36, bottom: 36, left: 52, right: 52 },
          minWidth: 560,
          borderWidth: 2,
          borderColor: Color4.create(0.85, 0.65, 0.25, 0.9)
        }}
        uiBackground={{
          color: Color4.create(0.09, 0.11, 0.15, 0.96)
        }}
      >
        {/* Título Principal */}
        <UiEntity
          uiTransform={{
            margin: { bottom: 12 }
          }}
          uiText={{
            value: '⚙️ GOLEMS WORLD ⚙️',
            fontSize: 34,
            color: Color4.create(1.0, 0.82, 0.3, 1.0)
          }}
        />

        {/* Subtítulo Bilingüe */}
        <UiEntity
          uiTransform={{
            margin: { bottom: 24 }
          }}
          uiText={{
            value: isEn
              ? 'Loading 400x400m Steampunk World & 100 NPCs...'
              : 'Cargando Mundo Steampunk de 400x400m y 100 NPCs...',
            fontSize: 16,
            color: Color4.create(0.85, 0.88, 0.92, 0.95)
          }}
        />

        {/* Marco Exterior de la Barra de Progreso */}
        <UiEntity
          uiTransform={{
            width: 460,
            height: 30,
            padding: { top: 3, bottom: 3, left: 3, right: 3 },
            margin: { bottom: 16 },
            borderWidth: 1,
            borderColor: Color4.create(0.9, 0.7, 0.3, 0.9)
          }}
          uiBackground={{
            color: Color4.create(0.04, 0.05, 0.07, 0.95)
          }}
        >
          {/* Relleno Dorado de Progreso */}
          <UiEntity
            uiTransform={{
              width: `${Math.max(4, progress)}%`,
              height: '100%'
            }}
            uiBackground={{
              color: Color4.create(0.95, 0.72, 0.18, 1.0)
            }}
          />
        </UiEntity>

        {/* Texto de Porcentaje de Progreso */}
        <UiEntity
          uiTransform={{
            margin: { bottom: 12 }
          }}
          uiText={{
            value: `${progress}%`,
            fontSize: 24,
            color: Color4.create(1.0, 0.9, 0.4, 1.0)
          }}
        />

        {/* Detalle del Estado */}
        <UiEntity
          uiText={{
            value: isEn
              ? 'Downloading 100 NPCs, wearables & compiling 3D districts...'
              : 'Descargando 100 avatares de NPCs, accesorios y distritos 3D...',
            fontSize: 13,
            color: Color4.create(0.65, 0.7, 0.75, 0.85)
          }}
        />
      </UiEntity>
    </UiEntity>
  )
}
