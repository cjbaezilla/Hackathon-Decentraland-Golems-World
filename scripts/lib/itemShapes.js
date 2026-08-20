/**
 * ============================================================================
 * itemShapes — Catálogo de siluetas low-poly de los 46 materiales coleccionables
 * ============================================================================
 * Fuente única de las "formas" de cada ítem, expresadas como descriptores de
 * primitivas independientes de cualquier material o color. Cada descriptor se
 * interpreta en el ensamblador (generate_models.js) con la paleta de afinidad.
 *
 * Formato de descriptor: { t, ...params }
 *   t: 'box' | 'cyl' | 'cone' | 'sphere' | 'torus' | 'gear' | 'hex' | 'octa'
 */

// Helpers para construir descriptores de forma legible y compacta.
const box = (w, h, d, x = 0, y = 0, z = 0) => ({ t: 'box', w, h, d, x, y, z })
const cyl = (rT, rB, h, seg = 12, x = 0, y = 0, z = 0, axis = 'y', capTop = true, capBottom = true) => ({
  t: 'cyl', rT, rB, h, seg, x, y, z, axis, capTop, capBottom
})
const cone = (r, h, seg = 8, x = 0, y = 0, z = 0, axis = 'y') => ({ t: 'cone', r, h, seg, x, y, z, axis })
const sphere = (r, lat = 8, lon = 12, x = 0, y = 0, z = 0) => ({ t: 'sphere', r, lat, lon, x, y, z })
const torus = (R, r, sR = 16, sT = 8, x = 0, y = 0, z = 0, axis = 'y') => ({ t: 'torus', R, r, sR, sT, x, y, z, axis })
const gear = (outer, root, h, teeth, x = 0, y = 0, z = 0, axis = 'z') => ({ t: 'gear', outer, root, h, teeth, x, y, z, axis })
const hex = (r, h, x = 0, y = 0, z = 0, axis = 'y') => ({ t: 'hex', r, h, x, y, z, axis })
const octa = (size, x = 0, y = 0, z = 0) => ({ t: 'octa', size, x, y, z })

/**
 * Devuelve las siluetas de un ítem: { body: [], detail: [], glow: [] }.
 * Cada array contiene descriptores de primitivas en coordenadas de ítem.
 */
function getItemShapes(itemId) {
  const body = []
  const detail = []
  const glow = []

  switch (itemId) {
    // ========================================================================
    // COMUNES (14)
    // ========================================================================
    case 'alambre_cobre': {
      body.push(
        cyl(0.14, 0.14, 0.02, 16, 0, 0.02, 0),
        cyl(0.14, 0.14, 0.02, 16, 0, 0.2, 0),
        cyl(0.05, 0.05, 0.16, 12, 0, 0.11, 0)
      )
      detail.push(
        torus(0.09, 0.012, 20, 8, 0, 0.11, 0, 'y'),
        cyl(0.008, 0.008, 0.1, 6, 0.1, 0.16, 0)
      )
      break
    }

    case 'tornillos_pernos': {
      const offsets = [[-0.06, 0], [0.06, 0.03], [0, -0.05]]
      for (const [dx, dz] of offsets) {
        body.push(
          cyl(0.018, 0.018, 0.16, 8, dx, 0.08, dz),
          hex(0.032, 0.03, dx, 0.18, dz, 'y')
        )
        detail.push(
          cyl(0.021, 0.021, 0.012, 8, dx, 0.14, dz),
          cyl(0.021, 0.021, 0.012, 8, dx, 0.115, dz)
        )
      }
      break
    }

    case 'engranajes_desgastados': {
      body.push(gear(0.2, 0.16, 0.05, 8, 0, 0.05, 0, 'z'))
      detail.push(
        gear(0.12, 0.095, 0.05, 6, 0.16, 0.05, 0.02, 'z'),
        box(0.06, 0.05, 0.05, 0.2, 0.05, 0)
      )
      break
    }

    case 'tubos_cobre': {
      body.push(
        cyl(0.03, 0.03, 0.3, 10, -0.07, 0.15, 0),
        cyl(0.03, 0.03, 0.3, 10, 0.07, 0.15, 0)
      )
      detail.push(
        cyl(0.035, 0.035, 0.16, 10, 0, 0.12, 0, 'x'),
        cyl(0.04, 0.04, 0.02, 10, 0, 0.12, 0)
      )
      break
    }

    case 'sartenes': {
      body.push(cyl(0.15, 0.13, 0.05, 16, 0, 0.03, 0))
      detail.push(
        box(0.03, 0.03, 0.22, 0.16, 0.04, 0),
        torus(0.15, 0.008, 20, 8, 0, 0.06, 0, 'y')
      )
      break
    }

    case 'ollas_cocinar': {
      body.push(cyl(0.13, 0.12, 0.18, 16, 0, 0.09, 0))
      detail.push(
        cyl(0.14, 0.14, 0.02, 16, 0, 0.19, 0),
        torus(0.05, 0.011, 14, 8, -0.14, 0.11, 0, 'x'),
        torus(0.05, 0.011, 14, 8, 0.14, 0.11, 0, 'x'),
        cyl(0.04, 0.04, 0.02, 10, 0, 0.21, 0)
      )
      break
    }

    case 'placas_laton': {
      body.push(
        box(0.3, 0.03, 0.22, 0, 0.02, 0),
        box(0.27, 0.03, 0.19, 0, 0.05, 0)
      )
      detail.push(
        cyl(0.014, 0.014, 0.02, 8, -0.11, 0.07, -0.07),
        cyl(0.014, 0.014, 0.02, 8, 0.11, 0.07, -0.07),
        cyl(0.014, 0.014, 0.02, 8, -0.11, 0.07, 0.07),
        cyl(0.014, 0.014, 0.02, 8, 0.11, 0.07, 0.07)
      )
      break
    }

    case 'clavos_oxidados': {
      for (let i = 0; i < 5; i++) {
        const dx = (i - 2) * 0.045
        const dz = (i % 2 === 0 ? 1 : -1) * 0.015
        body.push(cyl(0.013, 0.013, 0.14, 8, dx, 0.08, dz))
        detail.push(
          cone(0.013, 0.05, 8, dx, 0.175, dz),
          cyl(0.022, 0.022, 0.012, 8, dx, 0.155, dz)
        )
      }
      break
    }

    case 'latas_conserva': {
      body.push(
        cyl(0.06, 0.06, 0.16, 12, -0.06, 0.08, 0),
        cyl(0.055, 0.055, 0.14, 12, 0.06, 0.07, 0.03)
      )
      detail.push(
        cyl(0.062, 0.062, 0.015, 12, -0.06, 0.15, 0),
        cyl(0.057, 0.057, 0.015, 12, 0.06, 0.13, 0.03)
      )
      break
    }

    case 'cadenas_hierro': {
      body.push(torus(0.05, 0.013, 14, 8, 0, 0.04, 0, 'y'))
      detail.push(
        torus(0.05, 0.013, 14, 8, 0, 0.11, 0, 'x'),
        torus(0.05, 0.013, 14, 8, 0, 0.18, 0, 'y')
      )
      break
    }

    case 'tuercas_gigantes': {
      body.push(hex(0.12, 0.08, 0, 0.04, 0, 'y'))
      detail.push(
        cyl(0.05, 0.05, 0.09, 12, 0, 0.04, 0),
        hex(0.13, 0.015, 0, 0.09, 0, 'y')
      )
      break
    }

    case 'tapas_alcantarilla': {
      body.push(cyl(0.2, 0.2, 0.03, 20, 0, 0.02, 0))
      detail.push(
        box(0.36, 0.02, 0.03, 0, 0.045, 0),
        box(0.03, 0.02, 0.36, 0, 0.045, 0),
        torus(0.2, 0.01, 20, 8, 0, 0.02, 0, 'y')
      )
      break
    }

    case 'cables_deshilachados': {
      body.push(
        cyl(0.02, 0.02, 0.28, 8, 0, 0.16, 0),
        cyl(0.016, 0.016, 0.26, 8, -0.02, 0.16, 0.02),
        cyl(0.016, 0.016, 0.24, 8, 0.02, 0.16, -0.02)
      )
      detail.push(
        cyl(0.007, 0.007, 0.1, 6, -0.05, 0.32, 0.03),
        cyl(0.007, 0.007, 0.1, 6, 0.05, 0.32, -0.03),
        torus(0.035, 0.008, 12, 8, 0, 0.02, 0, 'y')
      )
      break
    }

    case 'residuos_carbon': {
      body.push(
        octa(0.18, -0.06, 0.08, 0),
        octa(0.14, 0.06, 0.08, 0.04),
        octa(0.12, 0, 0.12, -0.05),
        octa(0.1, 0.09, 0.05, -0.03)
      )
      detail.push(octa(0.08, -0.02, 0.03, 0.06))
      break
    }

    // ========================================================================
    // POCO COMUNES (11)
    // ========================================================================
    case 'transistores': {
      body.push(box(0.1, 0.06, 0.08, 0, 0.1, 0))
      detail.push(
        cyl(0.006, 0.006, 0.1, 6, -0.02, 0.05, 0),
        cyl(0.006, 0.006, 0.1, 6, 0, 0.05, 0),
        cyl(0.006, 0.006, 0.1, 6, 0.02, 0.05, 0)
      )
      break
    }

    case 'bombillas_filamento': {
      body.push(cyl(0.03, 0.03, 0.08, 12, 0, 0.04, 0))
      detail.push(
        sphere(0.085, 10, 14, 0, 0.13, 0),
        cyl(0.008, 0.008, 0.05, 6, 0, 0.15, 0)
      )
      break
    }

    case 'resortes_reloj': {
      body.push(
        torus(0.1, 0.012, 22, 8, 0, 0.015, 0, 'y'),
        torus(0.068, 0.012, 18, 8, 0, 0.015, 0, 'y'),
        torus(0.038, 0.012, 14, 8, 0, 0.015, 0, 'y')
      )
      detail.push(box(0.02, 0.012, 0.12, 0.1, 0.015, 0.05))
      break
    }

    case 'manometros': {
      body.push(
        cyl(0.09, 0.09, 0.04, 16, 0, 0.06, 0, 'z'),
        cyl(0.014, 0.014, 0.1, 8, 0, 0.01, -0.08, 'y')
      )
      detail.push(
        torus(0.09, 0.008, 16, 8, 0, 0.06, 0, 'z'),
        box(0.012, 0.07, 0.012, 0, 0.06, 0.005),
        cyl(0.012, 0.012, 0.02, 8, 0, 0.06, 0.04, 'z')
      )
      break
    }

    case 'valvulas_vapor': {
      body.push(cyl(0.05, 0.06, 0.16, 12, 0, 0.08, 0))
      detail.push(
        torus(0.09, 0.011, 16, 8, 0, 0.18, 0, 'y'),
        box(0.17, 0.015, 0.015, 0, 0.18, 0),
        box(0.015, 0.015, 0.17, 0, 0.18, 0),
        cyl(0.02, 0.02, 0.04, 8, 0, 0.2, 0)
      )
      break
    }

    case 'lentes_tv_viejo': {
      body.push(cyl(0.09, 0.09, 0.05, 16, 0, 0.05, 0, 'z'))
      detail.push(
        sphere(0.09, 6, 12, 0, 0.05, -0.04),
        torus(0.09, 0.008, 16, 8, 0, 0.05, 0, 'z')
      )
      break
    }

    case 'fusibles_fundidos': {
      body.push(cyl(0.02, 0.02, 0.16, 10, 0, 0.08, 0, 'x'))
      detail.push(
        cyl(0.024, 0.024, 0.03, 10, -0.09, 0.08, 0, 'x'),
        cyl(0.024, 0.024, 0.03, 10, 0.09, 0.08, 0, 'x'),
        box(0.14, 0.004, 0.004, 0, 0.08, 0)
      )
      break
    }

    case 'relojes_bolsillo': {
      body.push(cyl(0.08, 0.08, 0.03, 16, 0, 0.04, 0, 'z'))
      detail.push(
        cyl(0.015, 0.015, 0.025, 8, 0, 0.065, 0, 'y'),
        torus(0.02, 0.005, 12, 8, 0, 0.09, 0, 'z')
      )
      break
    }

    case 'brujulas_magneticas': {
      body.push(cyl(0.09, 0.09, 0.03, 16, 0, 0.03, 0))
      detail.push(
        box(0.12, 0.008, 0.02, 0, 0.05, 0),
        box(0.02, 0.008, 0.12, 0, 0.05, 0),
        cyl(0.01, 0.01, 0.02, 8, 0, 0.06, 0)
      )
      break
    }

    case 'tubos_vacio': {
      body.push(cyl(0.045, 0.045, 0.18, 12, 0, 0.09, 0))
      detail.push(
        cyl(0.02, 0.02, 0.08, 8, 0, 0.1, 0),
        cyl(0.007, 0.007, 0.06, 6, -0.02, 0.005, 0),
        cyl(0.007, 0.007, 0.06, 6, 0, 0.005, 0),
        cyl(0.007, 0.007, 0.06, 6, 0.02, 0.005, 0)
      )
      break
    }

    case 'palancas_interruptor': {
      body.push(box(0.12, 0.04, 0.09, 0, 0.02, 0))
      detail.push(
        cyl(0.012, 0.012, 0.16, 8, 0.03, 0.09, 0),
        sphere(0.025, 8, 10, 0.05, 0.17, 0)
      )
      break
    }

    // ========================================================================
    // RAROS (10)
    // ========================================================================
    case 'motor_vapor': {
      body.push(box(0.2, 0.14, 0.16, 0, 0.09, 0))
      detail.push(
        cyl(0.09, 0.09, 0.04, 16, 0, 0.07, 0.11, 'z'),
        cyl(0.03, 0.03, 0.14, 8, -0.08, 0.12, -0.06),
        cyl(0.03, 0.03, 0.14, 8, 0.08, 0.12, -0.06),
        cyl(0.04, 0.04, 0.12, 10, 0, 0.16, 0)
      )
      glow.push(box(0.08, 0.08, 0.04, 0, 0.09, 0.09))
      break
    }

    case 'bobinas_tesla': {
      body.push(
        cyl(0.035, 0.045, 0.24, 12, 0, 0.12, 0),
        cyl(0.07, 0.07, 0.02, 14, 0, 0.01, 0)
      )
      detail.push(
        torus(0.035, 0.007, 12, 8, 0, 0.06, 0, 'y'),
        torus(0.04, 0.007, 12, 8, 0, 0.12, 0, 'y'),
        torus(0.045, 0.007, 12, 8, 0, 0.18, 0, 'y')
      )
      glow.push(
        torus(0.06, 0.012, 16, 8, 0, 0.24, 0, 'y'),
        sphere(0.03, 8, 10, 0, 0.26, 0)
      )
      break
    }

    case 'antenas_radio': {
      body.push(box(0.14, 0.03, 0.1, 0, 0.02, 0))
      detail.push(
        cyl(0.008, 0.008, 0.4, 8, -0.03, 0.22, 0),
        cyl(0.008, 0.008, 0.34, 8, 0.03, 0.19, 0),
        cyl(0.09, 0.07, 0.03, 16, -0.03, 0.42, 0, 'y')
      )
      glow.push(
        sphere(0.018, 8, 10, -0.03, 0.42, 0),
        sphere(0.018, 8, 10, 0.03, 0.36, 0)
      )
      break
    }

    case 'diodos_led': {
      body.push(cyl(0.05, 0.05, 0.03, 12, 0, 0.04, 0))
      detail.push(
        cyl(0.006, 0.006, 0.07, 6, -0.015, 0.005, 0),
        cyl(0.006, 0.006, 0.07, 6, 0.015, 0.005, 0)
      )
      glow.push(sphere(0.045, 8, 12, 0, 0.08, 0))
      break
    }

    case 'baterias_alquimicas': {
      body.push(cyl(0.07, 0.07, 0.24, 12, 0, 0.12, 0))
      detail.push(
        cyl(0.075, 0.075, 0.03, 12, 0, 0.23, 0),
        cyl(0.075, 0.075, 0.03, 12, 0, 0.01, 0),
        sphere(0.022, 8, 10, 0, 0.27, 0)
      )
      glow.push(torus(0.075, 0.012, 14, 8, 0, 0.12, 0, 'y'))
      break
    }

    case 'engranajes_bronce': {
      body.push(gear(0.18, 0.14, 0.05, 9, 0, 0.05, 0, 'z'))
      detail.push(gear(0.12, 0.09, 0.05, 6, 0.16, 0.05, 0.04, 'z'))
      glow.push(cyl(0.02, 0.02, 0.06, 8, 0, 0.05, 0, 'z'))
      break
    }

    case 'dinamo_galvanica': {
      body.push(cyl(0.08, 0.08, 0.18, 12, 0, 0.09, 0, 'x'))
      detail.push(
        torus(0.08, 0.014, 14, 8, -0.04, 0.09, 0, 'x'),
        torus(0.08, 0.014, 14, 8, 0.04, 0.09, 0, 'x'),
        cyl(0.02, 0.02, 0.12, 8, 0.12, 0.09, 0, 'x')
      )
      glow.push(cyl(0.085, 0.085, 0.02, 12, -0.1, 0.09, 0, 'x'))
      break
    }

    case 'cristal_fuerza': {
      body.push(cyl(0.08, 0.08, 0.02, 12, 0, 0.01, 0))
      detail.push(
        cyl(0, 0.03, 0.09, 8, -0.09, 0.08, 0.02),
        cyl(0, 0.025, 0.07, 8, 0.09, 0.07, -0.02)
      )
      glow.push(
        cyl(0, 0.07, 0.14, 10, 0, 0.12, 0),
        cyl(0.07, 0, 0.08, 10, 0, 0.04, 0)
      )
      break
    }

    case 'giroscopio_precision': {
      body.push(
        torus(0.11, 0.012, 16, 8, 0, 0.1, 0, 'y'),
        torus(0.09, 0.012, 16, 8, 0, 0.1, 0, 'x'),
        torus(0.07, 0.012, 16, 8, 0, 0.1, 0, 'z')
      )
      glow.push(sphere(0.04, 8, 10, 0, 0.1, 0))
      break
    }

    case 'condensador_presion': {
      body.push(cyl(0.09, 0.09, 0.2, 12, 0, 0.1, 0, 'x'))
      detail.push(
        sphere(0.09, 8, 12, -0.1, 0.1, 0),
        sphere(0.09, 8, 12, 0.1, 0.1, 0),
        cyl(0.02, 0.02, 0.1, 8, 0, 0.16, 0)
      )
      glow.push(cyl(0.03, 0.03, 0.04, 8, 0, 0.22, 0))
      break
    }

    // ========================================================================
    // ÉPICOS (7)
    // ========================================================================
    case 'nucleo_mana': {
      body.push(cyl(0.09, 0.1, 0.03, 14, 0, 0.02, 0))
      detail.push(torus(0.13, 0.008, 20, 8, 0, 0.16, 0, 'x'))
      glow.push(
        sphere(0.1, 10, 14, 0, 0.16, 0),
        torus(0.13, 0.006, 20, 8, 0, 0.16, 0, 'y')
      )
      break
    }

    case 'cerebro_automata': {
      body.push(
        sphere(0.08, 8, 10, -0.05, 0.12, 0),
        sphere(0.08, 8, 10, 0.05, 0.12, 0),
        sphere(0.06, 8, 10, 0, 0.16, 0)
      )
      detail.push(
        cyl(0.012, 0.012, 0.1, 6, -0.1, 0.08, 0),
        cyl(0.012, 0.012, 0.1, 6, 0.1, 0.08, 0),
        cyl(0.012, 0.012, 0.08, 6, 0, 0.04, 0)
      )
      glow.push(
        torus(0.12, 0.006, 18, 8, 0, 0.14, 0, 'y'),
        sphere(0.022, 8, 10, 0, 0.12, 0.085)
      )
      break
    }

    case 'reactor_eter': {
      body.push(cyl(0.09, 0.09, 0.16, 14, 0, 0.08, 0))
      detail.push(
        torus(0.09, 0.012, 14, 8, 0, 0.03, 0, 'y'),
        torus(0.09, 0.012, 14, 8, 0, 0.13, 0, 'y')
      )
      glow.push(sphere(0.07, 8, 12, 0, 0.18, 0))
      break
    }

    case 'corazon_caldera': {
      body.push(sphere(0.1, 10, 14, 0, 0.14, 0))
      detail.push(
        cyl(0.04, 0.05, 0.14, 10, 0, 0.24, 0),
        cyl(0.035, 0.035, 0.12, 10, -0.08, 0.06, 0, 'x'),
        cyl(0.035, 0.035, 0.12, 10, 0.08, 0.06, 0, 'x')
      )
      glow.push(torus(0.12, 0.01, 16, 8, 0, 0.14, 0, 'y'))
      break
    }

    case 'bateria_plasma': {
      body.push(cyl(0.09, 0.09, 0.22, 14, 0, 0.12, 0))
      detail.push(
        cyl(0.1, 0.1, 0.03, 14, 0, 0.22, 0),
        cyl(0.1, 0.1, 0.03, 14, 0, 0.02, 0),
        cyl(0.015, 0.015, 0.06, 8, -0.04, 0.26, 0)
      )
      glow.push(
        torus(0.1, 0.012, 14, 8, 0, 0.12, 0, 'y'),
        sphere(0.03, 8, 10, 0, 0.27, 0)
      )
      break
    }

    case 'matriz_optica_solar': {
      body.push(box(0.28, 0.24, 0.05, 0, 0.12, 0))
      for (let x = -0.09; x <= 0.09; x += 0.09) {
        for (let y = -0.07; y <= 0.07; y += 0.07) {
          detail.push(cyl(0.035, 0.035, 0.02, 12, x, y + 0.12, 0.03, 'z'))
        }
      }
      glow.push(
        sphere(0.02, 8, 10, -0.09, 0.12, 0.05),
        sphere(0.02, 8, 10, 0.09, 0.12, 0.05),
        sphere(0.02, 8, 10, 0, 0.19, 0.05)
      )
      break
    }

    case 'embolo_titanio': {
      body.push(
        cyl(0.07, 0.07, 0.14, 12, 0, 0.12, 0),
        cyl(0.03, 0.03, 0.16, 8, 0, 0.26, 0)
      )
      detail.push(
        cyl(0.075, 0.075, 0.02, 12, 0, 0.05, 0),
        cyl(0.05, 0.05, 0.03, 12, 0, 0.34, 0)
      )
      glow.push(cyl(0.04, 0.04, 0.02, 10, 0, 0.2, 0))
      break
    }

    // ========================================================================
    // LEGENDARIOS (4)
    // ========================================================================
    case 'ojo_dragon': {
      body.push(sphere(0.1, 10, 14, 0, 0.12, 0))
      detail.push(
        torus(0.12, 0.012, 18, 8, 0, 0.12, 0, 'x'),
        torus(0.12, 0.012, 18, 8, 0, 0.12, 0, 'y')
      )
      glow.push(box(0.03, 0.1, 0.05, 0, 0.12, 0.12))
      break
    }

    case 'corazon_primigenio': {
      body.push(sphere(0.12, 10, 14, 0, 0.14, 0))
      detail.push(
        cyl(0.035, 0.035, 0.14, 8, 0, 0.26, 0),
        cyl(0.03, 0.03, 0.12, 8, -0.09, 0.2, 0, 'x'),
        cyl(0.03, 0.03, 0.12, 8, 0.09, 0.2, 0, 'x')
      )
      glow.push(
        torus(0.15, 0.006, 20, 8, 0, 0.14, 0, 'y'),
        torus(0.15, 0.006, 20, 8, 0, 0.14, 0, 'x')
      )
      break
    }

    case 'singularidad_eterica': {
      body.push(cyl(0.08, 0.08, 0.02, 12, 0, 0.01, 0))
      detail.push(torus(0.11, 0.008, 16, 8, 0, 0.14, 0, 'y'))
      glow.push(
        sphere(0.1, 10, 14, 0, 0.14, 0),
        torus(0.14, 0.006, 20, 8, 0, 0.14, 0, 'x'),
        torus(0.14, 0.006, 20, 8, 0, 0.14, 0, 'y'),
        torus(0.14, 0.006, 20, 8, 0, 0.14, 0, 'z')
      )
      break
    }

    case 'relicario_astral': {
      body.push(
        box(0.24, 0.16, 0.18, 0, 0.08, 0),
        box(0.26, 0.06, 0.2, 0, 0.16, 0)
      )
      detail.push(
        gear(0.08, 0.06, 0.03, 8, 0, 0.05, 0.11, 'z'),
        cyl(0.015, 0.015, 0.04, 8, 0, 0.1, 0.1, 'z')
      )
      glow.push(
        sphere(0.03, 8, 10, 0, 0.05, 0.11),
        cyl(0.02, 0.02, 0.06, 8, 0, 0.12, 0.1, 'z')
      )
      break
    }

    default:
      body.push(box(0.2, 0.2, 0.2, 0, 0.1, 0))
      detail.push(octa(0.12, 0, 0.22, 0))
      break
  }

  return { body, detail, glow }
}

module.exports = { getItemShapes }
