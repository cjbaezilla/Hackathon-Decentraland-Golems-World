import { GolemAffinity } from '../config/golems'

export interface OfficialRecipeData {
  number: number
  numberStr: string
  name: string
  tier: number
  affinity: GolemAffinity
  modelSrc: string
  scale: number
  components: { id: string; qty: number }[]
}

const rawCatalog: Record<string, any> = {
  "cadenas_hierro:2|manometros:2|palancas_interruptor:2|tornillos_pernos:2|tuercas_gigantes:2": {
    "number": 1,
    "numberStr": "001",
    "name": "Electric Bulwark",
    "tier": 1,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_001.glb",
    "scale": 1.09,
    "components": [
      {
        "id": "palancas_interruptor",
        "qty": 2
      },
      {
        "id": "tuercas_gigantes",
        "qty": 2
      },
      {
        "id": "cadenas_hierro",
        "qty": 2
      },
      {
        "id": "manometros",
        "qty": 2
      },
      {
        "id": "tornillos_pernos",
        "qty": 2
      }
    ]
  },
  "bombillas_filamento:2|cadenas_hierro:1|engranajes_desgastados:2|placas_laton:1|sartenes:2|tuercas_gigantes:1": {
    "number": 2,
    "numberStr": "002",
    "name": "Filament Hunter",
    "tier": 1,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_002.glb",
    "scale": 1.03,
    "components": [
      {
        "id": "placas_laton",
        "qty": 1
      },
      {
        "id": "cadenas_hierro",
        "qty": 1
      },
      {
        "id": "tuercas_gigantes",
        "qty": 1
      },
      {
        "id": "bombillas_filamento",
        "qty": 2
      },
      {
        "id": "engranajes_desgastados",
        "qty": 2
      },
      {
        "id": "sartenes",
        "qty": 2
      }
    ]
  },
  "placas_laton:1|residuos_carbon:1|tornillos_pernos:1|tuercas_gigantes:2": {
    "number": 3,
    "numberStr": "003",
    "name": "Boiler Gunner",
    "tier": 1,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_003.glb",
    "scale": 0.95,
    "components": [
      {
        "id": "residuos_carbon",
        "qty": 1
      },
      {
        "id": "tornillos_pernos",
        "qty": 1
      },
      {
        "id": "tuercas_gigantes",
        "qty": 2
      },
      {
        "id": "placas_laton",
        "qty": 1
      }
    ]
  },
  "alambre_cobre:1|engranajes_desgastados:1|palancas_interruptor:1|sartenes:2|tapas_alcantarilla:2": {
    "number": 4,
    "numberStr": "004",
    "name": "Mechanical Wraith",
    "tier": 1,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_004.glb",
    "scale": 1.1,
    "components": [
      {
        "id": "sartenes",
        "qty": 2
      },
      {
        "id": "tapas_alcantarilla",
        "qty": 2
      },
      {
        "id": "palancas_interruptor",
        "qty": 1
      },
      {
        "id": "engranajes_desgastados",
        "qty": 1
      },
      {
        "id": "alambre_cobre",
        "qty": 1
      }
    ]
  },
  "clavos_oxidados:1|engranajes_desgastados:1|ollas_cocinar:2|residuos_carbon:1|tuercas_gigantes:1": {
    "number": 5,
    "numberStr": "005",
    "name": "Pressurized Colossus",
    "tier": 1,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_005.glb",
    "scale": 0.97,
    "components": [
      {
        "id": "residuos_carbon",
        "qty": 1
      },
      {
        "id": "ollas_cocinar",
        "qty": 2
      },
      {
        "id": "engranajes_desgastados",
        "qty": 1
      },
      {
        "id": "tuercas_gigantes",
        "qty": 1
      },
      {
        "id": "clavos_oxidados",
        "qty": 1
      }
    ]
  },
  "engranajes_desgastados:1|lentes_tv_viejo:2|placas_laton:2|tapas_alcantarilla:2|transistores:1|tubos_vacio:2": {
    "number": 6,
    "numberStr": "006",
    "name": "Bright Destroyer",
    "tier": 1,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_006.glb",
    "scale": 1.01,
    "components": [
      {
        "id": "transistores",
        "qty": 1
      },
      {
        "id": "placas_laton",
        "qty": 2
      },
      {
        "id": "engranajes_desgastados",
        "qty": 1
      },
      {
        "id": "lentes_tv_viejo",
        "qty": 2
      },
      {
        "id": "tubos_vacio",
        "qty": 2
      },
      {
        "id": "tapas_alcantarilla",
        "qty": 2
      }
    ]
  },
  "bombillas_filamento:2|fusibles_fundidos:2|latas_conserva:1|lentes_tv_viejo:1|residuos_carbon:2": {
    "number": 7,
    "numberStr": "007",
    "name": "Igneous Servant",
    "tier": 1,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_007.glb",
    "scale": 0.91,
    "components": [
      {
        "id": "residuos_carbon",
        "qty": 2
      },
      {
        "id": "bombillas_filamento",
        "qty": 2
      },
      {
        "id": "lentes_tv_viejo",
        "qty": 1
      },
      {
        "id": "fusibles_fundidos",
        "qty": 2
      },
      {
        "id": "latas_conserva",
        "qty": 1
      }
    ]
  },
  "cadenas_hierro:2|clavos_oxidados:1|ollas_cocinar:1|tubos_vacio:1|tuercas_gigantes:1": {
    "number": 8,
    "numberStr": "008",
    "name": "Sparkling Forger",
    "tier": 1,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_008.glb",
    "scale": 1.12,
    "components": [
      {
        "id": "clavos_oxidados",
        "qty": 1
      },
      {
        "id": "tuercas_gigantes",
        "qty": 1
      },
      {
        "id": "ollas_cocinar",
        "qty": 1
      },
      {
        "id": "tubos_vacio",
        "qty": 1
      },
      {
        "id": "cadenas_hierro",
        "qty": 2
      }
    ]
  },
  "engranajes_desgastados:1|fusibles_fundidos:1|resortes_reloj:2|sartenes:2|tubos_cobre:2": {
    "number": 9,
    "numberStr": "009",
    "name": "Raying Executor",
    "tier": 1,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_009.glb",
    "scale": 1.05,
    "components": [
      {
        "id": "sartenes",
        "qty": 2
      },
      {
        "id": "fusibles_fundidos",
        "qty": 1
      },
      {
        "id": "resortes_reloj",
        "qty": 2
      },
      {
        "id": "engranajes_desgastados",
        "qty": 1
      },
      {
        "id": "tubos_cobre",
        "qty": 2
      }
    ]
  },
  "alambre_cobre:1|brujulas_magneticas:2|cadenas_hierro:1|engranajes_desgastados:2|manometros:2|sartenes:1": {
    "number": 10,
    "numberStr": "010",
    "name": "Geared Tracker",
    "tier": 1,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_010.glb",
    "scale": 0.92,
    "components": [
      {
        "id": "engranajes_desgastados",
        "qty": 2
      },
      {
        "id": "brujulas_magneticas",
        "qty": 2
      },
      {
        "id": "cadenas_hierro",
        "qty": 1
      },
      {
        "id": "manometros",
        "qty": 2
      },
      {
        "id": "alambre_cobre",
        "qty": 1
      },
      {
        "id": "sartenes",
        "qty": 1
      }
    ]
  },
  "fusibles_fundidos:1|tapas_alcantarilla:1|tuercas_gigantes:1": {
    "number": 11,
    "numberStr": "011",
    "name": "Electric Titan",
    "tier": 1,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_011.glb",
    "scale": 1.19,
    "components": [
      {
        "id": "tapas_alcantarilla",
        "qty": 1
      },
      {
        "id": "tuercas_gigantes",
        "qty": 1
      },
      {
        "id": "fusibles_fundidos",
        "qty": 1
      }
    ]
  },
  "manometros:1|transistores:1|tubos_cobre:2|valvulas_vapor:2": {
    "number": 12,
    "numberStr": "012",
    "name": "Thermal Walker",
    "tier": 1,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_012.glb",
    "scale": 1.24,
    "components": [
      {
        "id": "valvulas_vapor",
        "qty": 2
      },
      {
        "id": "tubos_cobre",
        "qty": 2
      },
      {
        "id": "manometros",
        "qty": 1
      },
      {
        "id": "transistores",
        "qty": 1
      }
    ]
  },
  "cables_deshilachados:1|clavos_oxidados:2|relojes_bolsillo:1|sartenes:1|tornillos_pernos:2": {
    "number": 13,
    "numberStr": "013",
    "name": "Astral Golem",
    "tier": 1,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_013.glb",
    "scale": 0.94,
    "components": [
      {
        "id": "relojes_bolsillo",
        "qty": 1
      },
      {
        "id": "tornillos_pernos",
        "qty": 2
      },
      {
        "id": "cables_deshilachados",
        "qty": 1
      },
      {
        "id": "clavos_oxidados",
        "qty": 2
      },
      {
        "id": "sartenes",
        "qty": 1
      }
    ]
  },
  "alambre_cobre:2|brujulas_magneticas:2|ollas_cocinar:2|residuos_carbon:2|tapas_alcantarilla:1": {
    "number": 14,
    "numberStr": "014",
    "name": "Pneumatic Sentinel",
    "tier": 1,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_014.glb",
    "scale": 0.91,
    "components": [
      {
        "id": "brujulas_magneticas",
        "qty": 2
      },
      {
        "id": "tapas_alcantarilla",
        "qty": 1
      },
      {
        "id": "ollas_cocinar",
        "qty": 2
      },
      {
        "id": "alambre_cobre",
        "qty": 2
      },
      {
        "id": "residuos_carbon",
        "qty": 2
      }
    ]
  },
  "cables_deshilachados:2|placas_laton:1|tubos_cobre:2|tuercas_gigantes:1": {
    "number": 15,
    "numberStr": "015",
    "name": "Singular Defender",
    "tier": 1,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_015.glb",
    "scale": 1.09,
    "components": [
      {
        "id": "cables_deshilachados",
        "qty": 2
      },
      {
        "id": "tuercas_gigantes",
        "qty": 1
      },
      {
        "id": "placas_laton",
        "qty": 1
      },
      {
        "id": "tubos_cobre",
        "qty": 2
      }
    ]
  },
  "bombillas_filamento:1|clavos_oxidados:1|latas_conserva:2|tubos_cobre:2": {
    "number": 16,
    "numberStr": "016",
    "name": "Bright Assembly",
    "tier": 1,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_016.glb",
    "scale": 1.25,
    "components": [
      {
        "id": "clavos_oxidados",
        "qty": 1
      },
      {
        "id": "bombillas_filamento",
        "qty": 1
      },
      {
        "id": "tubos_cobre",
        "qty": 2
      },
      {
        "id": "latas_conserva",
        "qty": 2
      }
    ]
  },
  "clavos_oxidados:2|engranajes_desgastados:1|ollas_cocinar:2|relojes_bolsillo:2|tapas_alcantarilla:2": {
    "number": 17,
    "numberStr": "017",
    "name": "Articulated Guardian",
    "tier": 1,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_017.glb",
    "scale": 1.07,
    "components": [
      {
        "id": "relojes_bolsillo",
        "qty": 2
      },
      {
        "id": "ollas_cocinar",
        "qty": 2
      },
      {
        "id": "engranajes_desgastados",
        "qty": 1
      },
      {
        "id": "clavos_oxidados",
        "qty": 2
      },
      {
        "id": "tapas_alcantarilla",
        "qty": 2
      }
    ]
  },
  "cadenas_hierro:1|manometros:2|palancas_interruptor:2|placas_laton:2|sartenes:2|tuercas_gigantes:1": {
    "number": 18,
    "numberStr": "018",
    "name": "Batterion Crusader",
    "tier": 1,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_018.glb",
    "scale": 1.05,
    "components": [
      {
        "id": "manometros",
        "qty": 2
      },
      {
        "id": "sartenes",
        "qty": 2
      },
      {
        "id": "tuercas_gigantes",
        "qty": 1
      },
      {
        "id": "palancas_interruptor",
        "qty": 2
      },
      {
        "id": "placas_laton",
        "qty": 2
      },
      {
        "id": "cadenas_hierro",
        "qty": 1
      }
    ]
  },
  "cables_deshilachados:1|cadenas_hierro:2|palancas_interruptor:2|tornillos_pernos:2|tubos_vacio:1": {
    "number": 19,
    "numberStr": "019",
    "name": "Mirrored Settler",
    "tier": 1,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_019.glb",
    "scale": 1.05,
    "components": [
      {
        "id": "tubos_vacio",
        "qty": 1
      },
      {
        "id": "cadenas_hierro",
        "qty": 2
      },
      {
        "id": "cables_deshilachados",
        "qty": 1
      },
      {
        "id": "tornillos_pernos",
        "qty": 2
      },
      {
        "id": "palancas_interruptor",
        "qty": 2
      }
    ]
  },
  "resortes_reloj:2|tornillos_pernos:1|tubos_cobre:2|tuercas_gigantes:2": {
    "number": 20,
    "numberStr": "020",
    "name": "Aetheric Smelter",
    "tier": 1,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_020.glb",
    "scale": 0.98,
    "components": [
      {
        "id": "resortes_reloj",
        "qty": 2
      },
      {
        "id": "tubos_cobre",
        "qty": 2
      },
      {
        "id": "tuercas_gigantes",
        "qty": 2
      },
      {
        "id": "tornillos_pernos",
        "qty": 1
      }
    ]
  },
  "palancas_interruptor:2|residuos_carbon:2|sartenes:2|tornillos_pernos:2|tubos_cobre:1|tuercas_gigantes:1": {
    "number": 21,
    "numberStr": "021",
    "name": "Smoky Watcher",
    "tier": 1,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_021.glb",
    "scale": 1.08,
    "components": [
      {
        "id": "palancas_interruptor",
        "qty": 2
      },
      {
        "id": "tornillos_pernos",
        "qty": 2
      },
      {
        "id": "tubos_cobre",
        "qty": 1
      },
      {
        "id": "tuercas_gigantes",
        "qty": 1
      },
      {
        "id": "residuos_carbon",
        "qty": 2
      },
      {
        "id": "sartenes",
        "qty": 2
      }
    ]
  },
  "cables_deshilachados:2|lentes_tv_viejo:2|placas_laton:1|sartenes:2|tapas_alcantarilla:2|tuercas_gigantes:1": {
    "number": 22,
    "numberStr": "022",
    "name": "Reliquary Leviathan",
    "tier": 1,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_022.glb",
    "scale": 1.01,
    "components": [
      {
        "id": "tapas_alcantarilla",
        "qty": 2
      },
      {
        "id": "sartenes",
        "qty": 2
      },
      {
        "id": "tuercas_gigantes",
        "qty": 1
      },
      {
        "id": "lentes_tv_viejo",
        "qty": 2
      },
      {
        "id": "cables_deshilachados",
        "qty": 2
      },
      {
        "id": "placas_laton",
        "qty": 1
      }
    ]
  },
  "alambre_cobre:1|fusibles_fundidos:2|residuos_carbon:2|sartenes:1|tapas_alcantarilla:2": {
    "number": 23,
    "numberStr": "023",
    "name": "Boiler Vanguard",
    "tier": 1,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_023.glb",
    "scale": 1.22,
    "components": [
      {
        "id": "sartenes",
        "qty": 1
      },
      {
        "id": "fusibles_fundidos",
        "qty": 2
      },
      {
        "id": "residuos_carbon",
        "qty": 2
      },
      {
        "id": "alambre_cobre",
        "qty": 1
      },
      {
        "id": "tapas_alcantarilla",
        "qty": 2
      }
    ]
  },
  "alambre_cobre:2|cadenas_hierro:1|resortes_reloj:1|tubos_cobre:2|tuercas_gigantes:1": {
    "number": 24,
    "numberStr": "024",
    "name": "Pneumatic Automaton",
    "tier": 1,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_024.glb",
    "scale": 1.27,
    "components": [
      {
        "id": "resortes_reloj",
        "qty": 1
      },
      {
        "id": "alambre_cobre",
        "qty": 2
      },
      {
        "id": "tuercas_gigantes",
        "qty": 1
      },
      {
        "id": "cadenas_hierro",
        "qty": 1
      },
      {
        "id": "tubos_cobre",
        "qty": 2
      }
    ]
  },
  "cables_deshilachados:2|palancas_interruptor:1|sartenes:1|tubos_cobre:1": {
    "number": 25,
    "numberStr": "025",
    "name": "Rotor Protector",
    "tier": 1,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_025.glb",
    "scale": 0.98,
    "components": [
      {
        "id": "palancas_interruptor",
        "qty": 1
      },
      {
        "id": "tubos_cobre",
        "qty": 1
      },
      {
        "id": "cables_deshilachados",
        "qty": 2
      },
      {
        "id": "sartenes",
        "qty": 1
      }
    ]
  },
  "cables_deshilachados:2|cadenas_hierro:2|clavos_oxidados:1|placas_laton:2|tornillos_pernos:1": {
    "number": 26,
    "numberStr": "026",
    "name": "Pinion Bearer",
    "tier": 1,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_026.glb",
    "scale": 1.05,
    "components": [
      {
        "id": "cables_deshilachados",
        "qty": 2
      },
      {
        "id": "cadenas_hierro",
        "qty": 2
      },
      {
        "id": "tornillos_pernos",
        "qty": 1
      },
      {
        "id": "clavos_oxidados",
        "qty": 1
      },
      {
        "id": "placas_laton",
        "qty": 2
      }
    ]
  },
  "bombillas_filamento:1|cables_deshilachados:1|fusibles_fundidos:1|latas_conserva:2|residuos_carbon:2|tuercas_gigantes:2": {
    "number": 27,
    "numberStr": "027",
    "name": "Igneous Monolith",
    "tier": 1,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_027.glb",
    "scale": 1.05,
    "components": [
      {
        "id": "tuercas_gigantes",
        "qty": 2
      },
      {
        "id": "cables_deshilachados",
        "qty": 1
      },
      {
        "id": "fusibles_fundidos",
        "qty": 1
      },
      {
        "id": "bombillas_filamento",
        "qty": 1
      },
      {
        "id": "residuos_carbon",
        "qty": 2
      },
      {
        "id": "latas_conserva",
        "qty": 2
      }
    ]
  },
  "ollas_cocinar:1|residuos_carbon:2|resortes_reloj:2|valvulas_vapor:1": {
    "number": 28,
    "numberStr": "028",
    "name": "Piston Scavenger",
    "tier": 1,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_028.glb",
    "scale": 0.99,
    "components": [
      {
        "id": "residuos_carbon",
        "qty": 2
      },
      {
        "id": "valvulas_vapor",
        "qty": 1
      },
      {
        "id": "ollas_cocinar",
        "qty": 1
      },
      {
        "id": "resortes_reloj",
        "qty": 2
      }
    ]
  },
  "cables_deshilachados:2|manometros:2|tornillos_pernos:1|tuercas_gigantes:2": {
    "number": 29,
    "numberStr": "029",
    "name": "Mirrored Excavator",
    "tier": 1,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_029.glb",
    "scale": 1,
    "components": [
      {
        "id": "cables_deshilachados",
        "qty": 2
      },
      {
        "id": "tuercas_gigantes",
        "qty": 2
      },
      {
        "id": "manometros",
        "qty": 2
      },
      {
        "id": "tornillos_pernos",
        "qty": 1
      }
    ]
  },
  "engranajes_desgastados:2|manometros:2|ollas_cocinar:1|placas_laton:1|tornillos_pernos:1": {
    "number": 30,
    "numberStr": "030",
    "name": "Luminous Patroller",
    "tier": 1,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_030.glb",
    "scale": 1.07,
    "components": [
      {
        "id": "engranajes_desgastados",
        "qty": 2
      },
      {
        "id": "placas_laton",
        "qty": 1
      },
      {
        "id": "manometros",
        "qty": 2
      },
      {
        "id": "tornillos_pernos",
        "qty": 1
      },
      {
        "id": "ollas_cocinar",
        "qty": 1
      }
    ]
  },
  "bombillas_filamento:1|manometros:1|relojes_bolsillo:2|tapas_alcantarilla:2|valvulas_vapor:2": {
    "number": 31,
    "numberStr": "031",
    "name": "Smoky Basilisk",
    "tier": 1,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_031.glb",
    "scale": 1.12,
    "components": [
      {
        "id": "manometros",
        "qty": 1
      },
      {
        "id": "valvulas_vapor",
        "qty": 2
      },
      {
        "id": "bombillas_filamento",
        "qty": 1
      },
      {
        "id": "tapas_alcantarilla",
        "qty": 2
      },
      {
        "id": "relojes_bolsillo",
        "qty": 2
      }
    ]
  },
  "cables_deshilachados:1|residuos_carbon:2|tapas_alcantarilla:1|tornillos_pernos:2|tubos_vacio:1": {
    "number": 32,
    "numberStr": "032",
    "name": "Thermal Guard",
    "tier": 1,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_032.glb",
    "scale": 0.92,
    "components": [
      {
        "id": "tubos_vacio",
        "qty": 1
      },
      {
        "id": "cables_deshilachados",
        "qty": 1
      },
      {
        "id": "tornillos_pernos",
        "qty": 2
      },
      {
        "id": "residuos_carbon",
        "qty": 2
      },
      {
        "id": "tapas_alcantarilla",
        "qty": 1
      }
    ]
  },
  "cables_deshilachados:1|ollas_cocinar:1|palancas_interruptor:1|residuos_carbon:1|resortes_reloj:1": {
    "number": 33,
    "numberStr": "033",
    "name": "Boiler Bulwark",
    "tier": 1,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_033.glb",
    "scale": 0.9,
    "components": [
      {
        "id": "cables_deshilachados",
        "qty": 1
      },
      {
        "id": "ollas_cocinar",
        "qty": 1
      },
      {
        "id": "palancas_interruptor",
        "qty": 1
      },
      {
        "id": "residuos_carbon",
        "qty": 1
      },
      {
        "id": "resortes_reloj",
        "qty": 1
      }
    ]
  },
  "cadenas_hierro:2|engranajes_desgastados:2|placas_laton:1|sartenes:2|tornillos_pernos:2|tubos_cobre:1": {
    "number": 34,
    "numberStr": "034",
    "name": "Diodic Hunter",
    "tier": 1,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_034.glb",
    "scale": 0.93,
    "components": [
      {
        "id": "sartenes",
        "qty": 2
      },
      {
        "id": "engranajes_desgastados",
        "qty": 2
      },
      {
        "id": "tornillos_pernos",
        "qty": 2
      },
      {
        "id": "placas_laton",
        "qty": 1
      },
      {
        "id": "cadenas_hierro",
        "qty": 2
      },
      {
        "id": "tubos_cobre",
        "qty": 1
      }
    ]
  },
  "alambre_cobre:2|cables_deshilachados:1|manometros:2|ollas_cocinar:2|resortes_reloj:1": {
    "number": 35,
    "numberStr": "035",
    "name": "Sparking Gunner",
    "tier": 1,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_035.glb",
    "scale": 1.15,
    "components": [
      {
        "id": "alambre_cobre",
        "qty": 2
      },
      {
        "id": "manometros",
        "qty": 2
      },
      {
        "id": "resortes_reloj",
        "qty": 1
      },
      {
        "id": "cables_deshilachados",
        "qty": 1
      },
      {
        "id": "ollas_cocinar",
        "qty": 2
      }
    ]
  },
  "alambre_cobre:2|brujulas_magneticas:2|clavos_oxidados:2|resortes_reloj:1|transistores:1|tuercas_gigantes:2": {
    "number": 36,
    "numberStr": "036",
    "name": "Pinion Wraith",
    "tier": 1,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_036.glb",
    "scale": 1.18,
    "components": [
      {
        "id": "clavos_oxidados",
        "qty": 2
      },
      {
        "id": "brujulas_magneticas",
        "qty": 2
      },
      {
        "id": "transistores",
        "qty": 1
      },
      {
        "id": "tuercas_gigantes",
        "qty": 2
      },
      {
        "id": "resortes_reloj",
        "qty": 1
      },
      {
        "id": "alambre_cobre",
        "qty": 2
      }
    ]
  },
  "brujulas_magneticas:1|engranajes_desgastados:1|manometros:1|tornillos_pernos:2": {
    "number": 37,
    "numberStr": "037",
    "name": "Articulated Colossus",
    "tier": 1,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_037.glb",
    "scale": 1.25,
    "components": [
      {
        "id": "engranajes_desgastados",
        "qty": 1
      },
      {
        "id": "manometros",
        "qty": 1
      },
      {
        "id": "brujulas_magneticas",
        "qty": 1
      },
      {
        "id": "tornillos_pernos",
        "qty": 2
      }
    ]
  },
  "cables_deshilachados:2|fusibles_fundidos:2|placas_laton:1|tapas_alcantarilla:2|tornillos_pernos:2": {
    "number": 38,
    "numberStr": "038",
    "name": "Batterion Destroyer",
    "tier": 1,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_038.glb",
    "scale": 1.13,
    "components": [
      {
        "id": "placas_laton",
        "qty": 1
      },
      {
        "id": "cables_deshilachados",
        "qty": 2
      },
      {
        "id": "fusibles_fundidos",
        "qty": 2
      },
      {
        "id": "tapas_alcantarilla",
        "qty": 2
      },
      {
        "id": "tornillos_pernos",
        "qty": 2
      }
    ]
  },
  "cables_deshilachados:1|lentes_tv_viejo:2|residuos_carbon:1|transistores:1|tuercas_gigantes:1|valvulas_vapor:2": {
    "number": 39,
    "numberStr": "039",
    "name": "Vaporized Servant",
    "tier": 1,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_039.glb",
    "scale": 1.19,
    "components": [
      {
        "id": "transistores",
        "qty": 1
      },
      {
        "id": "residuos_carbon",
        "qty": 1
      },
      {
        "id": "cables_deshilachados",
        "qty": 1
      },
      {
        "id": "valvulas_vapor",
        "qty": 2
      },
      {
        "id": "tuercas_gigantes",
        "qty": 1
      },
      {
        "id": "lentes_tv_viejo",
        "qty": 2
      }
    ]
  },
  "bombillas_filamento:1|clavos_oxidados:1|engranajes_desgastados:1|ollas_cocinar:2|relojes_bolsillo:1": {
    "number": 40,
    "numberStr": "040",
    "name": "Luminous Forger",
    "tier": 1,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_040.glb",
    "scale": 1.22,
    "components": [
      {
        "id": "bombillas_filamento",
        "qty": 1
      },
      {
        "id": "ollas_cocinar",
        "qty": 2
      },
      {
        "id": "relojes_bolsillo",
        "qty": 1
      },
      {
        "id": "clavos_oxidados",
        "qty": 1
      },
      {
        "id": "engranajes_desgastados",
        "qty": 1
      }
    ]
  },
  "bobinas_tesla:1|brujulas_magneticas:2|cadenas_hierro:1|condensador_presion:1|engranajes_desgastados:2|fusibles_fundidos:2|tubos_vacio:2": {
    "number": 41,
    "numberStr": "041",
    "name": "Electric Executor",
    "tier": 2,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_041.glb",
    "scale": 1.09,
    "components": [
      {
        "id": "bobinas_tesla",
        "qty": 1
      },
      {
        "id": "brujulas_magneticas",
        "qty": 2
      },
      {
        "id": "engranajes_desgastados",
        "qty": 2
      },
      {
        "id": "cadenas_hierro",
        "qty": 1
      },
      {
        "id": "fusibles_fundidos",
        "qty": 2
      },
      {
        "id": "tubos_vacio",
        "qty": 2
      },
      {
        "id": "condensador_presion",
        "qty": 1
      }
    ]
  },
  "condensador_presion:1|engranajes_desgastados:2|motor_vapor:1|residuos_carbon:1|tornillos_pernos:2|transistores:2": {
    "number": 42,
    "numberStr": "042",
    "name": "Thermal Tracker",
    "tier": 2,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_042.glb",
    "scale": 1.06,
    "components": [
      {
        "id": "residuos_carbon",
        "qty": 1
      },
      {
        "id": "tornillos_pernos",
        "qty": 2
      },
      {
        "id": "motor_vapor",
        "qty": 1
      },
      {
        "id": "engranajes_desgastados",
        "qty": 2
      },
      {
        "id": "transistores",
        "qty": 2
      },
      {
        "id": "condensador_presion",
        "qty": 1
      }
    ]
  },
  "brujulas_magneticas:1|cables_deshilachados:1|lentes_tv_viejo:1|placas_laton:2|valvulas_vapor:1": {
    "number": 43,
    "numberStr": "043",
    "name": "Boiler Titan",
    "tier": 2,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_043.glb",
    "scale": 1.09,
    "components": [
      {
        "id": "cables_deshilachados",
        "qty": 1
      },
      {
        "id": "brujulas_magneticas",
        "qty": 1
      },
      {
        "id": "placas_laton",
        "qty": 2
      },
      {
        "id": "valvulas_vapor",
        "qty": 1
      },
      {
        "id": "lentes_tv_viejo",
        "qty": 1
      }
    ]
  },
  "brujulas_magneticas:2|cables_deshilachados:2|fusibles_fundidos:1|giroscopio_precision:2|relojes_bolsillo:1|valvulas_vapor:2": {
    "number": 44,
    "numberStr": "044",
    "name": "Mechanical Walker",
    "tier": 2,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_044.glb",
    "scale": 1.08,
    "components": [
      {
        "id": "relojes_bolsillo",
        "qty": 1
      },
      {
        "id": "valvulas_vapor",
        "qty": 2
      },
      {
        "id": "fusibles_fundidos",
        "qty": 1
      },
      {
        "id": "giroscopio_precision",
        "qty": 2
      },
      {
        "id": "brujulas_magneticas",
        "qty": 2
      },
      {
        "id": "cables_deshilachados",
        "qty": 2
      }
    ]
  },
  "brujulas_magneticas:2|condensador_presion:2|dinamo_galvanica:2|latas_conserva:2|manometros:1|palancas_interruptor:2": {
    "number": 45,
    "numberStr": "045",
    "name": "Pressurized Golem",
    "tier": 2,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_045.glb",
    "scale": 0.97,
    "components": [
      {
        "id": "brujulas_magneticas",
        "qty": 2
      },
      {
        "id": "latas_conserva",
        "qty": 2
      },
      {
        "id": "dinamo_galvanica",
        "qty": 2
      },
      {
        "id": "manometros",
        "qty": 1
      },
      {
        "id": "palancas_interruptor",
        "qty": 2
      },
      {
        "id": "condensador_presion",
        "qty": 2
      }
    ]
  },
  "bobinas_tesla:1|condensador_presion:1|motor_vapor:1|resortes_reloj:1|tornillos_pernos:1|valvulas_vapor:1": {
    "number": 46,
    "numberStr": "046",
    "name": "Volcanic Sentinel",
    "tier": 2,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_046.glb",
    "scale": 1.19,
    "components": [
      {
        "id": "motor_vapor",
        "qty": 1
      },
      {
        "id": "bobinas_tesla",
        "qty": 1
      },
      {
        "id": "valvulas_vapor",
        "qty": 1
      },
      {
        "id": "resortes_reloj",
        "qty": 1
      },
      {
        "id": "condensador_presion",
        "qty": 1
      },
      {
        "id": "tornillos_pernos",
        "qty": 1
      }
    ]
  },
  "alambre_cobre:1|dinamo_galvanica:2|placas_laton:2|residuos_carbon:2|resortes_reloj:2": {
    "number": 47,
    "numberStr": "047",
    "name": "Conductive Defender",
    "tier": 2,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_047.glb",
    "scale": 0.95,
    "components": [
      {
        "id": "placas_laton",
        "qty": 2
      },
      {
        "id": "residuos_carbon",
        "qty": 2
      },
      {
        "id": "dinamo_galvanica",
        "qty": 2
      },
      {
        "id": "resortes_reloj",
        "qty": 2
      },
      {
        "id": "alambre_cobre",
        "qty": 1
      }
    ]
  },
  "engranajes_bronce:2|fusibles_fundidos:2|latas_conserva:2|ollas_cocinar:1|palancas_interruptor:2|tuercas_gigantes:1": {
    "number": 48,
    "numberStr": "048",
    "name": "Brazen Assembly",
    "tier": 2,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_048.glb",
    "scale": 1.15,
    "components": [
      {
        "id": "fusibles_fundidos",
        "qty": 2
      },
      {
        "id": "palancas_interruptor",
        "qty": 2
      },
      {
        "id": "tuercas_gigantes",
        "qty": 1
      },
      {
        "id": "engranajes_bronce",
        "qty": 2
      },
      {
        "id": "latas_conserva",
        "qty": 2
      },
      {
        "id": "ollas_cocinar",
        "qty": 1
      }
    ]
  },
  "alambre_cobre:2|bobinas_tesla:1|bombillas_filamento:2|clavos_oxidados:1|dinamo_galvanica:2|fusibles_fundidos:2|latas_conserva:1|palancas_interruptor:2": {
    "number": 49,
    "numberStr": "049",
    "name": "Raying Guardian",
    "tier": 2,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_049.glb",
    "scale": 1.07,
    "components": [
      {
        "id": "bombillas_filamento",
        "qty": 2
      },
      {
        "id": "bobinas_tesla",
        "qty": 1
      },
      {
        "id": "fusibles_fundidos",
        "qty": 2
      },
      {
        "id": "palancas_interruptor",
        "qty": 2
      },
      {
        "id": "latas_conserva",
        "qty": 1
      },
      {
        "id": "alambre_cobre",
        "qty": 2
      },
      {
        "id": "clavos_oxidados",
        "qty": 1
      },
      {
        "id": "dinamo_galvanica",
        "qty": 2
      }
    ]
  },
  "dinamo_galvanica:2|fusibles_fundidos:2|residuos_carbon:2|resortes_reloj:1|tubos_cobre:1": {
    "number": 50,
    "numberStr": "050",
    "name": "Galvanic Crusader",
    "tier": 2,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_050.glb",
    "scale": 0.9,
    "components": [
      {
        "id": "resortes_reloj",
        "qty": 1
      },
      {
        "id": "tubos_cobre",
        "qty": 1
      },
      {
        "id": "fusibles_fundidos",
        "qty": 2
      },
      {
        "id": "dinamo_galvanica",
        "qty": 2
      },
      {
        "id": "residuos_carbon",
        "qty": 2
      }
    ]
  },
  "alambre_cobre:1|dinamo_galvanica:1|diodos_led:1|fusibles_fundidos:2|ollas_cocinar:2|sartenes:1|tornillos_pernos:1": {
    "number": 51,
    "numberStr": "051",
    "name": "Electric Settler",
    "tier": 2,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_051.glb",
    "scale": 1.08,
    "components": [
      {
        "id": "diodos_led",
        "qty": 1
      },
      {
        "id": "fusibles_fundidos",
        "qty": 2
      },
      {
        "id": "tornillos_pernos",
        "qty": 1
      },
      {
        "id": "sartenes",
        "qty": 1
      },
      {
        "id": "dinamo_galvanica",
        "qty": 1
      },
      {
        "id": "ollas_cocinar",
        "qty": 2
      },
      {
        "id": "alambre_cobre",
        "qty": 1
      }
    ]
  },
  "clavos_oxidados:1|diodos_led:2|manometros:1|motor_vapor:1|palancas_interruptor:2|placas_laton:2": {
    "number": 52,
    "numberStr": "052",
    "name": "Filament Smelter",
    "tier": 2,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_052.glb",
    "scale": 1.12,
    "components": [
      {
        "id": "placas_laton",
        "qty": 2
      },
      {
        "id": "motor_vapor",
        "qty": 1
      },
      {
        "id": "manometros",
        "qty": 1
      },
      {
        "id": "clavos_oxidados",
        "qty": 1
      },
      {
        "id": "diodos_led",
        "qty": 2
      },
      {
        "id": "palancas_interruptor",
        "qty": 2
      }
    ]
  },
  "alambre_cobre:2|brujulas_magneticas:1|cristal_fuerza:2|engranajes_desgastados:1|ollas_cocinar:1|transistores:1": {
    "number": 53,
    "numberStr": "053",
    "name": "Optical Watcher",
    "tier": 2,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_053.glb",
    "scale": 1.15,
    "components": [
      {
        "id": "cristal_fuerza",
        "qty": 2
      },
      {
        "id": "brujulas_magneticas",
        "qty": 1
      },
      {
        "id": "alambre_cobre",
        "qty": 2
      },
      {
        "id": "transistores",
        "qty": 1
      },
      {
        "id": "engranajes_desgastados",
        "qty": 1
      },
      {
        "id": "ollas_cocinar",
        "qty": 1
      }
    ]
  },
  "baterias_alquimicas:2|condensador_presion:2|engranajes_bronce:1|motor_vapor:2|placas_laton:1|relojes_bolsillo:1|tubos_vacio:1": {
    "number": 54,
    "numberStr": "054",
    "name": "Pneumatic Leviathan",
    "tier": 2,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_054.glb",
    "scale": 1.1,
    "components": [
      {
        "id": "placas_laton",
        "qty": 1
      },
      {
        "id": "baterias_alquimicas",
        "qty": 2
      },
      {
        "id": "tubos_vacio",
        "qty": 1
      },
      {
        "id": "motor_vapor",
        "qty": 2
      },
      {
        "id": "engranajes_bronce",
        "qty": 1
      },
      {
        "id": "relojes_bolsillo",
        "qty": 1
      },
      {
        "id": "condensador_presion",
        "qty": 2
      }
    ]
  },
  "alambre_cobre:1|cadenas_hierro:1|engranajes_bronce:1|fusibles_fundidos:1|motor_vapor:2|relojes_bolsillo:2|resortes_reloj:2": {
    "number": 55,
    "numberStr": "055",
    "name": "Pressurized Vanguard",
    "tier": 2,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_055.glb",
    "scale": 0.94,
    "components": [
      {
        "id": "resortes_reloj",
        "qty": 2
      },
      {
        "id": "alambre_cobre",
        "qty": 1
      },
      {
        "id": "cadenas_hierro",
        "qty": 1
      },
      {
        "id": "engranajes_bronce",
        "qty": 1
      },
      {
        "id": "motor_vapor",
        "qty": 2
      },
      {
        "id": "relojes_bolsillo",
        "qty": 2
      },
      {
        "id": "fusibles_fundidos",
        "qty": 1
      }
    ]
  },
  "baterias_alquimicas:2|bobinas_tesla:2|giroscopio_precision:1|lentes_tv_viejo:2|residuos_carbon:1|transistores:2|tuercas_gigantes:2": {
    "number": 56,
    "numberStr": "056",
    "name": "Plasmatic Automaton",
    "tier": 2,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_056.glb",
    "scale": 1.05,
    "components": [
      {
        "id": "giroscopio_precision",
        "qty": 1
      },
      {
        "id": "lentes_tv_viejo",
        "qty": 2
      },
      {
        "id": "baterias_alquimicas",
        "qty": 2
      },
      {
        "id": "transistores",
        "qty": 2
      },
      {
        "id": "tuercas_gigantes",
        "qty": 2
      },
      {
        "id": "residuos_carbon",
        "qty": 1
      },
      {
        "id": "bobinas_tesla",
        "qty": 2
      }
    ]
  },
  "antenas_radio:2|brujulas_magneticas:1|cristal_fuerza:1|palancas_interruptor:2|relojes_bolsillo:2|tapas_alcantarilla:1|transistores:1|tubos_vacio:2": {
    "number": 57,
    "numberStr": "057",
    "name": "Lumen Protector",
    "tier": 2,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_057.glb",
    "scale": 1.17,
    "components": [
      {
        "id": "tubos_vacio",
        "qty": 2
      },
      {
        "id": "tapas_alcantarilla",
        "qty": 1
      },
      {
        "id": "brujulas_magneticas",
        "qty": 1
      },
      {
        "id": "transistores",
        "qty": 1
      },
      {
        "id": "antenas_radio",
        "qty": 2
      },
      {
        "id": "relojes_bolsillo",
        "qty": 2
      },
      {
        "id": "cristal_fuerza",
        "qty": 1
      },
      {
        "id": "palancas_interruptor",
        "qty": 2
      }
    ]
  },
  "baterias_alquimicas:1|brujulas_magneticas:2|cadenas_hierro:2|fusibles_fundidos:2|latas_conserva:2": {
    "number": 58,
    "numberStr": "058",
    "name": "Batterion Bearer",
    "tier": 2,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_058.glb",
    "scale": 0.92,
    "components": [
      {
        "id": "fusibles_fundidos",
        "qty": 2
      },
      {
        "id": "cadenas_hierro",
        "qty": 2
      },
      {
        "id": "latas_conserva",
        "qty": 2
      },
      {
        "id": "brujulas_magneticas",
        "qty": 2
      },
      {
        "id": "baterias_alquimicas",
        "qty": 1
      }
    ]
  },
  "antenas_radio:2|baterias_alquimicas:2|dinamo_galvanica:1|manometros:1|palancas_interruptor:1|relojes_bolsillo:2|tubos_vacio:1": {
    "number": 59,
    "numberStr": "059",
    "name": "Raying Monolith",
    "tier": 2,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_059.glb",
    "scale": 1.14,
    "components": [
      {
        "id": "manometros",
        "qty": 1
      },
      {
        "id": "antenas_radio",
        "qty": 2
      },
      {
        "id": "relojes_bolsillo",
        "qty": 2
      },
      {
        "id": "tubos_vacio",
        "qty": 1
      },
      {
        "id": "baterias_alquimicas",
        "qty": 2
      },
      {
        "id": "dinamo_galvanica",
        "qty": 1
      },
      {
        "id": "palancas_interruptor",
        "qty": 1
      }
    ]
  },
  "brujulas_magneticas:1|dinamo_galvanica:2|engranajes_bronce:1|palancas_interruptor:1|relojes_bolsillo:1": {
    "number": 60,
    "numberStr": "060",
    "name": "Galvanic Scavenger",
    "tier": 2,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_060.glb",
    "scale": 1.27,
    "components": [
      {
        "id": "engranajes_bronce",
        "qty": 1
      },
      {
        "id": "relojes_bolsillo",
        "qty": 1
      },
      {
        "id": "palancas_interruptor",
        "qty": 1
      },
      {
        "id": "brujulas_magneticas",
        "qty": 1
      },
      {
        "id": "dinamo_galvanica",
        "qty": 2
      }
    ]
  },
  "cadenas_hierro:2|fusibles_fundidos:2|latas_conserva:1|resortes_reloj:1|transistores:2": {
    "number": 61,
    "numberStr": "061",
    "name": "Electric Excavator",
    "tier": 2,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_061.glb",
    "scale": 1.13,
    "components": [
      {
        "id": "cadenas_hierro",
        "qty": 2
      },
      {
        "id": "transistores",
        "qty": 2
      },
      {
        "id": "fusibles_fundidos",
        "qty": 2
      },
      {
        "id": "latas_conserva",
        "qty": 1
      },
      {
        "id": "resortes_reloj",
        "qty": 1
      }
    ]
  },
  "bobinas_tesla:1|bombillas_filamento:2|lentes_tv_viejo:1|manometros:2|motor_vapor:2|transistores:1": {
    "number": 62,
    "numberStr": "062",
    "name": "Thermal Patroller",
    "tier": 2,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_062.glb",
    "scale": 1.29,
    "components": [
      {
        "id": "manometros",
        "qty": 2
      },
      {
        "id": "transistores",
        "qty": 1
      },
      {
        "id": "motor_vapor",
        "qty": 2
      },
      {
        "id": "lentes_tv_viejo",
        "qty": 1
      },
      {
        "id": "bobinas_tesla",
        "qty": 1
      },
      {
        "id": "bombillas_filamento",
        "qty": 2
      }
    ]
  },
  "diodos_led:2|motor_vapor:1|residuos_carbon:2|sartenes:1|valvulas_vapor:2": {
    "number": 63,
    "numberStr": "063",
    "name": "Boiler Basilisk",
    "tier": 2,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_063.glb",
    "scale": 1.03,
    "components": [
      {
        "id": "diodos_led",
        "qty": 2
      },
      {
        "id": "residuos_carbon",
        "qty": 2
      },
      {
        "id": "motor_vapor",
        "qty": 1
      },
      {
        "id": "sartenes",
        "qty": 1
      },
      {
        "id": "valvulas_vapor",
        "qty": 2
      }
    ]
  },
  "brujulas_magneticas:1|condensador_presion:1|cristal_fuerza:2|manometros:1|transistores:2|tuercas_gigantes:1|valvulas_vapor:2": {
    "number": 64,
    "numberStr": "064",
    "name": "Pneumatic Guard",
    "tier": 2,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_064.glb",
    "scale": 1.29,
    "components": [
      {
        "id": "brujulas_magneticas",
        "qty": 1
      },
      {
        "id": "transistores",
        "qty": 2
      },
      {
        "id": "tuercas_gigantes",
        "qty": 1
      },
      {
        "id": "valvulas_vapor",
        "qty": 2
      },
      {
        "id": "manometros",
        "qty": 1
      },
      {
        "id": "condensador_presion",
        "qty": 1
      },
      {
        "id": "cristal_fuerza",
        "qty": 2
      }
    ]
  },
  "baterias_alquimicas:1|brujulas_magneticas:1|diodos_led:2|latas_conserva:1|ollas_cocinar:1|sartenes:2|tubos_vacio:1": {
    "number": 65,
    "numberStr": "065",
    "name": "Resonant Bulwark",
    "tier": 2,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_065.glb",
    "scale": 1.04,
    "components": [
      {
        "id": "latas_conserva",
        "qty": 1
      },
      {
        "id": "sartenes",
        "qty": 2
      },
      {
        "id": "tubos_vacio",
        "qty": 1
      },
      {
        "id": "ollas_cocinar",
        "qty": 1
      },
      {
        "id": "brujulas_magneticas",
        "qty": 1
      },
      {
        "id": "diodos_led",
        "qty": 2
      },
      {
        "id": "baterias_alquimicas",
        "qty": 1
      }
    ]
  },
  "dinamo_galvanica:1|fusibles_fundidos:2|latas_conserva:1|transistores:1|tubos_vacio:2": {
    "number": 66,
    "numberStr": "066",
    "name": "Plasmatic Hunter",
    "tier": 2,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_066.glb",
    "scale": 1.05,
    "components": [
      {
        "id": "tubos_vacio",
        "qty": 2
      },
      {
        "id": "latas_conserva",
        "qty": 1
      },
      {
        "id": "transistores",
        "qty": 1
      },
      {
        "id": "fusibles_fundidos",
        "qty": 2
      },
      {
        "id": "dinamo_galvanica",
        "qty": 1
      }
    ]
  },
  "baterias_alquimicas:2|fusibles_fundidos:2|lentes_tv_viejo:1|placas_laton:1|residuos_carbon:1|valvulas_vapor:1": {
    "number": 67,
    "numberStr": "067",
    "name": "Conductive Gunner",
    "tier": 2,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_067.glb",
    "scale": 1.14,
    "components": [
      {
        "id": "baterias_alquimicas",
        "qty": 2
      },
      {
        "id": "residuos_carbon",
        "qty": 1
      },
      {
        "id": "lentes_tv_viejo",
        "qty": 1
      },
      {
        "id": "valvulas_vapor",
        "qty": 1
      },
      {
        "id": "fusibles_fundidos",
        "qty": 2
      },
      {
        "id": "placas_laton",
        "qty": 1
      }
    ]
  },
  "bombillas_filamento:2|cables_deshilachados:1|palancas_interruptor:1|relojes_bolsillo:2|resortes_reloj:2|tornillos_pernos:2": {
    "number": 68,
    "numberStr": "068",
    "name": "Sparkling Wraith",
    "tier": 2,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_068.glb",
    "scale": 1.18,
    "components": [
      {
        "id": "relojes_bolsillo",
        "qty": 2
      },
      {
        "id": "cables_deshilachados",
        "qty": 1
      },
      {
        "id": "resortes_reloj",
        "qty": 2
      },
      {
        "id": "bombillas_filamento",
        "qty": 2
      },
      {
        "id": "palancas_interruptor",
        "qty": 1
      },
      {
        "id": "tornillos_pernos",
        "qty": 2
      }
    ]
  },
  "brujulas_magneticas:2|cables_deshilachados:2|diodos_led:1|palancas_interruptor:1|placas_laton:1|tornillos_pernos:1|transistores:2": {
    "number": 69,
    "numberStr": "069",
    "name": "Titanic Colossus",
    "tier": 2,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_069.glb",
    "scale": 0.94,
    "components": [
      {
        "id": "cables_deshilachados",
        "qty": 2
      },
      {
        "id": "diodos_led",
        "qty": 1
      },
      {
        "id": "tornillos_pernos",
        "qty": 1
      },
      {
        "id": "placas_laton",
        "qty": 1
      },
      {
        "id": "palancas_interruptor",
        "qty": 1
      },
      {
        "id": "brujulas_magneticas",
        "qty": 2
      },
      {
        "id": "transistores",
        "qty": 2
      }
    ]
  },
  "engranajes_bronce:2|lentes_tv_viejo:2|motor_vapor:1|transistores:2|tubos_vacio:1|tuercas_gigantes:2": {
    "number": 70,
    "numberStr": "070",
    "name": "Geared Destroyer",
    "tier": 2,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_070.glb",
    "scale": 1.25,
    "components": [
      {
        "id": "motor_vapor",
        "qty": 1
      },
      {
        "id": "tuercas_gigantes",
        "qty": 2
      },
      {
        "id": "engranajes_bronce",
        "qty": 2
      },
      {
        "id": "tubos_vacio",
        "qty": 1
      },
      {
        "id": "transistores",
        "qty": 2
      },
      {
        "id": "lentes_tv_viejo",
        "qty": 2
      }
    ]
  },
  "alambre_cobre:2|clavos_oxidados:1|diodos_led:1|giroscopio_precision:1|tornillos_pernos:1|tubos_vacio:2|tuercas_gigantes:2": {
    "number": 71,
    "numberStr": "071",
    "name": "Photonic Servant",
    "tier": 2,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_071.glb",
    "scale": 1.1,
    "components": [
      {
        "id": "tubos_vacio",
        "qty": 2
      },
      {
        "id": "alambre_cobre",
        "qty": 2
      },
      {
        "id": "giroscopio_precision",
        "qty": 1
      },
      {
        "id": "diodos_led",
        "qty": 1
      },
      {
        "id": "tuercas_gigantes",
        "qty": 2
      },
      {
        "id": "clavos_oxidados",
        "qty": 1
      },
      {
        "id": "tornillos_pernos",
        "qty": 1
      }
    ]
  },
  "clavos_oxidados:1|engranajes_bronce:2|lentes_tv_viejo:1|residuos_carbon:1|resortes_reloj:2|tornillos_pernos:2": {
    "number": 72,
    "numberStr": "072",
    "name": "Automaton Forger",
    "tier": 2,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_072.glb",
    "scale": 1.13,
    "components": [
      {
        "id": "engranajes_bronce",
        "qty": 2
      },
      {
        "id": "tornillos_pernos",
        "qty": 2
      },
      {
        "id": "lentes_tv_viejo",
        "qty": 1
      },
      {
        "id": "resortes_reloj",
        "qty": 2
      },
      {
        "id": "clavos_oxidados",
        "qty": 1
      },
      {
        "id": "residuos_carbon",
        "qty": 1
      }
    ]
  },
  "antenas_radio:2|cables_deshilachados:2|giroscopio_precision:1|manometros:2|relojes_bolsillo:2|resortes_reloj:2|sartenes:1": {
    "number": 73,
    "numberStr": "073",
    "name": "Ferrous Executor",
    "tier": 2,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_073.glb",
    "scale": 1.06,
    "components": [
      {
        "id": "antenas_radio",
        "qty": 2
      },
      {
        "id": "relojes_bolsillo",
        "qty": 2
      },
      {
        "id": "giroscopio_precision",
        "qty": 1
      },
      {
        "id": "resortes_reloj",
        "qty": 2
      },
      {
        "id": "manometros",
        "qty": 2
      },
      {
        "id": "cables_deshilachados",
        "qty": 2
      },
      {
        "id": "sartenes",
        "qty": 1
      }
    ]
  },
  "alambre_cobre:2|bobinas_tesla:1|placas_laton:1|resortes_reloj:1|transistores:2|tuercas_gigantes:1": {
    "number": 74,
    "numberStr": "074",
    "name": "Voltaic Tracker",
    "tier": 2,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_074.glb",
    "scale": 1.01,
    "components": [
      {
        "id": "tuercas_gigantes",
        "qty": 1
      },
      {
        "id": "resortes_reloj",
        "qty": 1
      },
      {
        "id": "alambre_cobre",
        "qty": 2
      },
      {
        "id": "placas_laton",
        "qty": 1
      },
      {
        "id": "transistores",
        "qty": 2
      },
      {
        "id": "bobinas_tesla",
        "qty": 1
      }
    ]
  },
  "cadenas_hierro:2|diodos_led:1|placas_laton:2|residuos_carbon:2|resortes_reloj:2|sartenes:1": {
    "number": 75,
    "numberStr": "075",
    "name": "Pressurized Titan",
    "tier": 2,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_075.glb",
    "scale": 1.19,
    "components": [
      {
        "id": "cadenas_hierro",
        "qty": 2
      },
      {
        "id": "resortes_reloj",
        "qty": 2
      },
      {
        "id": "diodos_led",
        "qty": 1
      },
      {
        "id": "placas_laton",
        "qty": 2
      },
      {
        "id": "residuos_carbon",
        "qty": 2
      },
      {
        "id": "sartenes",
        "qty": 1
      }
    ]
  },
  "condensador_presion:2|manometros:1|ollas_cocinar:2|residuos_carbon:1|tornillos_pernos:1|transistores:2|tuercas_gigantes:2": {
    "number": 76,
    "numberStr": "076",
    "name": "Volcanic Walker",
    "tier": 2,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_076.glb",
    "scale": 1.15,
    "components": [
      {
        "id": "condensador_presion",
        "qty": 2
      },
      {
        "id": "tuercas_gigantes",
        "qty": 2
      },
      {
        "id": "transistores",
        "qty": 2
      },
      {
        "id": "manometros",
        "qty": 1
      },
      {
        "id": "residuos_carbon",
        "qty": 1
      },
      {
        "id": "ollas_cocinar",
        "qty": 2
      },
      {
        "id": "tornillos_pernos",
        "qty": 1
      }
    ]
  },
  "bombillas_filamento:2|engranajes_desgastados:1|manometros:1|residuos_carbon:1|sartenes:1": {
    "number": 77,
    "numberStr": "077",
    "name": "Lumen Golem",
    "tier": 2,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_077.glb",
    "scale": 1.2,
    "components": [
      {
        "id": "bombillas_filamento",
        "qty": 2
      },
      {
        "id": "manometros",
        "qty": 1
      },
      {
        "id": "residuos_carbon",
        "qty": 1
      },
      {
        "id": "engranajes_desgastados",
        "qty": 1
      },
      {
        "id": "sartenes",
        "qty": 1
      }
    ]
  },
  "alambre_cobre:2|bombillas_filamento:1|cables_deshilachados:1|engranajes_bronce:2|manometros:2|palancas_interruptor:1|placas_laton:1|residuos_carbon:2": {
    "number": 78,
    "numberStr": "078",
    "name": "Brazen Sentinel",
    "tier": 2,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_078.glb",
    "scale": 1.02,
    "components": [
      {
        "id": "palancas_interruptor",
        "qty": 1
      },
      {
        "id": "manometros",
        "qty": 2
      },
      {
        "id": "engranajes_bronce",
        "qty": 2
      },
      {
        "id": "bombillas_filamento",
        "qty": 1
      },
      {
        "id": "placas_laton",
        "qty": 1
      },
      {
        "id": "cables_deshilachados",
        "qty": 1
      },
      {
        "id": "residuos_carbon",
        "qty": 2
      },
      {
        "id": "alambre_cobre",
        "qty": 2
      }
    ]
  },
  "baterias_alquimicas:1|condensador_presion:1|palancas_interruptor:2|relojes_bolsillo:1|transistores:1|tubos_vacio:1": {
    "number": 79,
    "numberStr": "079",
    "name": "Vaporized Defender",
    "tier": 2,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_079.glb",
    "scale": 1.01,
    "components": [
      {
        "id": "tubos_vacio",
        "qty": 1
      },
      {
        "id": "condensador_presion",
        "qty": 1
      },
      {
        "id": "baterias_alquimicas",
        "qty": 1
      },
      {
        "id": "transistores",
        "qty": 1
      },
      {
        "id": "palancas_interruptor",
        "qty": 2
      },
      {
        "id": "relojes_bolsillo",
        "qty": 1
      }
    ]
  },
  "baterias_alquimicas:1|dinamo_galvanica:1|motor_vapor:1|resortes_reloj:1|sartenes:1|tapas_alcantarilla:2": {
    "number": 80,
    "numberStr": "080",
    "name": "Galvanic Assembly",
    "tier": 2,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_080.glb",
    "scale": 1.17,
    "components": [
      {
        "id": "resortes_reloj",
        "qty": 1
      },
      {
        "id": "tapas_alcantarilla",
        "qty": 2
      },
      {
        "id": "dinamo_galvanica",
        "qty": 1
      },
      {
        "id": "motor_vapor",
        "qty": 1
      },
      {
        "id": "baterias_alquimicas",
        "qty": 1
      },
      {
        "id": "sartenes",
        "qty": 1
      }
    ]
  },
  "cables_deshilachados:2|dinamo_galvanica:2|latas_conserva:1|tapas_alcantarilla:1|transistores:2|tubos_vacio:2": {
    "number": 81,
    "numberStr": "081",
    "name": "Electric Guardian",
    "tier": 2,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_081.glb",
    "scale": 0.93,
    "components": [
      {
        "id": "tapas_alcantarilla",
        "qty": 1
      },
      {
        "id": "latas_conserva",
        "qty": 1
      },
      {
        "id": "tubos_vacio",
        "qty": 2
      },
      {
        "id": "transistores",
        "qty": 2
      },
      {
        "id": "dinamo_galvanica",
        "qty": 2
      },
      {
        "id": "cables_deshilachados",
        "qty": 2
      }
    ]
  },
  "brujulas_magneticas:1|cadenas_hierro:2|engranajes_bronce:2|latas_conserva:1|ollas_cocinar:2|relojes_bolsillo:1|tubos_cobre:2|valvulas_vapor:1": {
    "number": 82,
    "numberStr": "082",
    "name": "Automaton Crusader",
    "tier": 2,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_082.glb",
    "scale": 1.09,
    "components": [
      {
        "id": "latas_conserva",
        "qty": 1
      },
      {
        "id": "ollas_cocinar",
        "qty": 2
      },
      {
        "id": "cadenas_hierro",
        "qty": 2
      },
      {
        "id": "brujulas_magneticas",
        "qty": 1
      },
      {
        "id": "tubos_cobre",
        "qty": 2
      },
      {
        "id": "valvulas_vapor",
        "qty": 1
      },
      {
        "id": "relojes_bolsillo",
        "qty": 1
      },
      {
        "id": "engranajes_bronce",
        "qty": 2
      }
    ]
  },
  "cadenas_hierro:2|condensador_presion:1|fusibles_fundidos:1|latas_conserva:2|lentes_tv_viejo:1|resortes_reloj:1|sartenes:1": {
    "number": 83,
    "numberStr": "083",
    "name": "Boiler Settler",
    "tier": 2,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_083.glb",
    "scale": 1.05,
    "components": [
      {
        "id": "sartenes",
        "qty": 1
      },
      {
        "id": "lentes_tv_viejo",
        "qty": 1
      },
      {
        "id": "fusibles_fundidos",
        "qty": 1
      },
      {
        "id": "condensador_presion",
        "qty": 1
      },
      {
        "id": "resortes_reloj",
        "qty": 1
      },
      {
        "id": "latas_conserva",
        "qty": 2
      },
      {
        "id": "cadenas_hierro",
        "qty": 2
      }
    ]
  },
  "brujulas_magneticas:1|diodos_led:2|engranajes_desgastados:2|latas_conserva:1|palancas_interruptor:1|residuos_carbon:2|resortes_reloj:2": {
    "number": 84,
    "numberStr": "084",
    "name": "Diodic Smelter",
    "tier": 2,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_084.glb",
    "scale": 1.23,
    "components": [
      {
        "id": "latas_conserva",
        "qty": 1
      },
      {
        "id": "resortes_reloj",
        "qty": 2
      },
      {
        "id": "residuos_carbon",
        "qty": 2
      },
      {
        "id": "engranajes_desgastados",
        "qty": 2
      },
      {
        "id": "diodos_led",
        "qty": 2
      },
      {
        "id": "brujulas_magneticas",
        "qty": 1
      },
      {
        "id": "palancas_interruptor",
        "qty": 1
      }
    ]
  },
  "alambre_cobre:2|bobinas_tesla:1|clavos_oxidados:1|latas_conserva:1|manometros:2|ollas_cocinar:2|resortes_reloj:2|valvulas_vapor:2": {
    "number": 85,
    "numberStr": "085",
    "name": "Pressurized Watcher",
    "tier": 2,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_085.glb",
    "scale": 1.06,
    "components": [
      {
        "id": "clavos_oxidados",
        "qty": 1
      },
      {
        "id": "alambre_cobre",
        "qty": 2
      },
      {
        "id": "valvulas_vapor",
        "qty": 2
      },
      {
        "id": "bobinas_tesla",
        "qty": 1
      },
      {
        "id": "latas_conserva",
        "qty": 1
      },
      {
        "id": "resortes_reloj",
        "qty": 2
      },
      {
        "id": "manometros",
        "qty": 2
      },
      {
        "id": "ollas_cocinar",
        "qty": 2
      }
    ]
  },
  "antenas_radio:2|clavos_oxidados:2|dinamo_galvanica:2|latas_conserva:2|ollas_cocinar:2|tubos_cobre:1|tubos_vacio:1|valvulas_vapor:1": {
    "number": 86,
    "numberStr": "086",
    "name": "Plasmatic Leviathan",
    "tier": 2,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_086.glb",
    "scale": 0.98,
    "components": [
      {
        "id": "dinamo_galvanica",
        "qty": 2
      },
      {
        "id": "ollas_cocinar",
        "qty": 2
      },
      {
        "id": "valvulas_vapor",
        "qty": 1
      },
      {
        "id": "antenas_radio",
        "qty": 2
      },
      {
        "id": "tubos_cobre",
        "qty": 1
      },
      {
        "id": "tubos_vacio",
        "qty": 1
      },
      {
        "id": "clavos_oxidados",
        "qty": 2
      },
      {
        "id": "latas_conserva",
        "qty": 2
      }
    ]
  },
  "bombillas_filamento:2|brujulas_magneticas:2|latas_conserva:2|manometros:1|palancas_interruptor:2|residuos_carbon:1|resortes_reloj:2": {
    "number": 87,
    "numberStr": "087",
    "name": "Articulated Vanguard",
    "tier": 2,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_087.glb",
    "scale": 0.93,
    "components": [
      {
        "id": "manometros",
        "qty": 1
      },
      {
        "id": "palancas_interruptor",
        "qty": 2
      },
      {
        "id": "bombillas_filamento",
        "qty": 2
      },
      {
        "id": "resortes_reloj",
        "qty": 2
      },
      {
        "id": "latas_conserva",
        "qty": 2
      },
      {
        "id": "brujulas_magneticas",
        "qty": 2
      },
      {
        "id": "residuos_carbon",
        "qty": 1
      }
    ]
  },
  "cristal_fuerza:1|diodos_led:2|lentes_tv_viejo:2|motor_vapor:1|tuercas_gigantes:2": {
    "number": 88,
    "numberStr": "088",
    "name": "Sparkling Automaton",
    "tier": 2,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_088.glb",
    "scale": 1.29,
    "components": [
      {
        "id": "motor_vapor",
        "qty": 1
      },
      {
        "id": "tuercas_gigantes",
        "qty": 2
      },
      {
        "id": "lentes_tv_viejo",
        "qty": 2
      },
      {
        "id": "diodos_led",
        "qty": 2
      },
      {
        "id": "cristal_fuerza",
        "qty": 1
      }
    ]
  },
  "clavos_oxidados:1|engranajes_bronce:1|engranajes_desgastados:1|palancas_interruptor:2|placas_laton:1|tubos_vacio:2|tuercas_gigantes:2": {
    "number": 89,
    "numberStr": "089",
    "name": "Titanic Protector",
    "tier": 2,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_089.glb",
    "scale": 1.13,
    "components": [
      {
        "id": "engranajes_desgastados",
        "qty": 1
      },
      {
        "id": "engranajes_bronce",
        "qty": 1
      },
      {
        "id": "tubos_vacio",
        "qty": 2
      },
      {
        "id": "placas_laton",
        "qty": 1
      },
      {
        "id": "palancas_interruptor",
        "qty": 2
      },
      {
        "id": "clavos_oxidados",
        "qty": 1
      },
      {
        "id": "tuercas_gigantes",
        "qty": 2
      }
    ]
  },
  "alambre_cobre:2|bombillas_filamento:2|brujulas_magneticas:2|latas_conserva:1|lentes_tv_viejo:2|resortes_reloj:2|tuercas_gigantes:2": {
    "number": 90,
    "numberStr": "090",
    "name": "Geared Bearer",
    "tier": 2,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_090.glb",
    "scale": 1.09,
    "components": [
      {
        "id": "latas_conserva",
        "qty": 1
      },
      {
        "id": "lentes_tv_viejo",
        "qty": 2
      },
      {
        "id": "alambre_cobre",
        "qty": 2
      },
      {
        "id": "brujulas_magneticas",
        "qty": 2
      },
      {
        "id": "tuercas_gigantes",
        "qty": 2
      },
      {
        "id": "bombillas_filamento",
        "qty": 2
      },
      {
        "id": "resortes_reloj",
        "qty": 2
      }
    ]
  },
  "brujulas_magneticas:2|cerebro_automata:1|cristal_fuerza:2|dinamo_galvanica:2|motor_vapor:1|nucleo_mana:2": {
    "number": 91,
    "numberStr": "091",
    "name": "Primordial Monolith",
    "tier": 3,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_091.glb",
    "scale": 1.23,
    "components": [
      {
        "id": "motor_vapor",
        "qty": 1
      },
      {
        "id": "dinamo_galvanica",
        "qty": 2
      },
      {
        "id": "brujulas_magneticas",
        "qty": 2
      },
      {
        "id": "cristal_fuerza",
        "qty": 2
      },
      {
        "id": "nucleo_mana",
        "qty": 2
      },
      {
        "id": "cerebro_automata",
        "qty": 1
      }
    ]
  },
  "antenas_radio:1|bateria_plasma:2|condensador_presion:1|corazon_caldera:2|engranajes_bronce:2|manometros:2|motor_vapor:1|resortes_reloj:2": {
    "number": 92,
    "numberStr": "092",
    "name": "Thermal Scavenger",
    "tier": 3,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_092.glb",
    "scale": 0.94,
    "components": [
      {
        "id": "bateria_plasma",
        "qty": 2
      },
      {
        "id": "motor_vapor",
        "qty": 1
      },
      {
        "id": "condensador_presion",
        "qty": 1
      },
      {
        "id": "antenas_radio",
        "qty": 1
      },
      {
        "id": "resortes_reloj",
        "qty": 2
      },
      {
        "id": "corazon_caldera",
        "qty": 2
      },
      {
        "id": "manometros",
        "qty": 2
      },
      {
        "id": "engranajes_bronce",
        "qty": 2
      }
    ]
  },
  "antenas_radio:2|condensador_presion:2|diodos_led:1|lentes_tv_viejo:2|manometros:1|motor_vapor:2|nucleo_mana:1|palancas_interruptor:2|reactor_eter:1": {
    "number": 93,
    "numberStr": "093",
    "name": "Boiler Excavator",
    "tier": 3,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_093.glb",
    "scale": 1.17,
    "components": [
      {
        "id": "reactor_eter",
        "qty": 1
      },
      {
        "id": "palancas_interruptor",
        "qty": 2
      },
      {
        "id": "motor_vapor",
        "qty": 2
      },
      {
        "id": "condensador_presion",
        "qty": 2
      },
      {
        "id": "antenas_radio",
        "qty": 2
      },
      {
        "id": "manometros",
        "qty": 1
      },
      {
        "id": "lentes_tv_viejo",
        "qty": 2
      },
      {
        "id": "nucleo_mana",
        "qty": 1
      },
      {
        "id": "diodos_led",
        "qty": 1
      }
    ]
  },
  "antenas_radio:1|condensador_presion:1|dinamo_galvanica:2|giroscopio_precision:1|lentes_tv_viejo:2|reactor_eter:2": {
    "number": 94,
    "numberStr": "094",
    "name": "Manatic Patroller",
    "tier": 3,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_094.glb",
    "scale": 1.26,
    "components": [
      {
        "id": "condensador_presion",
        "qty": 1
      },
      {
        "id": "antenas_radio",
        "qty": 1
      },
      {
        "id": "dinamo_galvanica",
        "qty": 2
      },
      {
        "id": "lentes_tv_viejo",
        "qty": 2
      },
      {
        "id": "giroscopio_precision",
        "qty": 1
      },
      {
        "id": "reactor_eter",
        "qty": 2
      }
    ]
  },
  "antenas_radio:2|bateria_plasma:2|bobinas_tesla:1|cristal_fuerza:1|embolo_titanio:1|matriz_optica_solar:2|motor_vapor:1|valvulas_vapor:2": {
    "number": 95,
    "numberStr": "095",
    "name": "Sparking Basilisk",
    "tier": 3,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_095.glb",
    "scale": 1.05,
    "components": [
      {
        "id": "antenas_radio",
        "qty": 2
      },
      {
        "id": "bobinas_tesla",
        "qty": 1
      },
      {
        "id": "bateria_plasma",
        "qty": 2
      },
      {
        "id": "motor_vapor",
        "qty": 1
      },
      {
        "id": "embolo_titanio",
        "qty": 1
      },
      {
        "id": "cristal_fuerza",
        "qty": 1
      },
      {
        "id": "matriz_optica_solar",
        "qty": 2
      },
      {
        "id": "valvulas_vapor",
        "qty": 2
      }
    ]
  },
  "bombillas_filamento:1|cerebro_automata:1|embolo_titanio:2|giroscopio_precision:2|matriz_optica_solar:1|motor_vapor:2|nucleo_mana:2": {
    "number": 96,
    "numberStr": "096",
    "name": "Volcanic Guard",
    "tier": 3,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_096.glb",
    "scale": 1.19,
    "components": [
      {
        "id": "nucleo_mana",
        "qty": 2
      },
      {
        "id": "bombillas_filamento",
        "qty": 1
      },
      {
        "id": "cerebro_automata",
        "qty": 1
      },
      {
        "id": "motor_vapor",
        "qty": 2
      },
      {
        "id": "matriz_optica_solar",
        "qty": 1
      },
      {
        "id": "giroscopio_precision",
        "qty": 2
      },
      {
        "id": "embolo_titanio",
        "qty": 2
      }
    ]
  },
  "antenas_radio:2|bobinas_tesla:2|corazon_caldera:1|giroscopio_precision:2|matriz_optica_solar:1|nucleo_mana:1|resortes_reloj:2|tubos_vacio:2": {
    "number": 97,
    "numberStr": "097",
    "name": "Lumen Bulwark",
    "tier": 3,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_097.glb",
    "scale": 1.02,
    "components": [
      {
        "id": "nucleo_mana",
        "qty": 1
      },
      {
        "id": "antenas_radio",
        "qty": 2
      },
      {
        "id": "matriz_optica_solar",
        "qty": 1
      },
      {
        "id": "tubos_vacio",
        "qty": 2
      },
      {
        "id": "bobinas_tesla",
        "qty": 2
      },
      {
        "id": "corazon_caldera",
        "qty": 1
      },
      {
        "id": "resortes_reloj",
        "qty": 2
      },
      {
        "id": "giroscopio_precision",
        "qty": 2
      }
    ]
  },
  "bobinas_tesla:2|condensador_presion:2|corazon_caldera:2|engranajes_bronce:1|nucleo_mana:2|transistores:1": {
    "number": 98,
    "numberStr": "098",
    "name": "Piston Hunter",
    "tier": 3,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_098.glb",
    "scale": 1.11,
    "components": [
      {
        "id": "nucleo_mana",
        "qty": 2
      },
      {
        "id": "engranajes_bronce",
        "qty": 1
      },
      {
        "id": "bobinas_tesla",
        "qty": 2
      },
      {
        "id": "corazon_caldera",
        "qty": 2
      },
      {
        "id": "transistores",
        "qty": 1
      },
      {
        "id": "condensador_presion",
        "qty": 2
      }
    ]
  },
  "antenas_radio:2|bobinas_tesla:2|dinamo_galvanica:2|diodos_led:2|motor_vapor:2|nucleo_mana:2": {
    "number": 99,
    "numberStr": "099",
    "name": "Raying Gunner",
    "tier": 3,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_099.glb",
    "scale": 1.11,
    "components": [
      {
        "id": "dinamo_galvanica",
        "qty": 2
      },
      {
        "id": "diodos_led",
        "qty": 2
      },
      {
        "id": "motor_vapor",
        "qty": 2
      },
      {
        "id": "bobinas_tesla",
        "qty": 2
      },
      {
        "id": "antenas_radio",
        "qty": 2
      },
      {
        "id": "nucleo_mana",
        "qty": 2
      }
    ]
  },
  "antenas_radio:1|bobinas_tesla:1|corazon_caldera:2|dinamo_galvanica:2|nucleo_mana:2": {
    "number": 100,
    "numberStr": "100",
    "name": "Steamy Wraith",
    "tier": 3,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_100.glb",
    "scale": 1.03,
    "components": [
      {
        "id": "nucleo_mana",
        "qty": 2
      },
      {
        "id": "dinamo_galvanica",
        "qty": 2
      },
      {
        "id": "corazon_caldera",
        "qty": 2
      },
      {
        "id": "bobinas_tesla",
        "qty": 1
      },
      {
        "id": "antenas_radio",
        "qty": 1
      }
    ]
  },
  "antenas_radio:2|brujulas_magneticas:2|cerebro_automata:2|condensador_presion:1|embolo_titanio:2|resortes_reloj:2": {
    "number": 101,
    "numberStr": "101",
    "name": "Smoky Colossus",
    "tier": 3,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_101.glb",
    "scale": 0.93,
    "components": [
      {
        "id": "brujulas_magneticas",
        "qty": 2
      },
      {
        "id": "condensador_presion",
        "qty": 1
      },
      {
        "id": "antenas_radio",
        "qty": 2
      },
      {
        "id": "resortes_reloj",
        "qty": 2
      },
      {
        "id": "cerebro_automata",
        "qty": 2
      },
      {
        "id": "embolo_titanio",
        "qty": 2
      }
    ]
  },
  "bateria_plasma:2|cristal_fuerza:1|dinamo_galvanica:2|embolo_titanio:1|manometros:1|motor_vapor:1": {
    "number": 102,
    "numberStr": "102",
    "name": "Teslic Destroyer",
    "tier": 3,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_102.glb",
    "scale": 1.26,
    "components": [
      {
        "id": "dinamo_galvanica",
        "qty": 2
      },
      {
        "id": "cristal_fuerza",
        "qty": 1
      },
      {
        "id": "manometros",
        "qty": 1
      },
      {
        "id": "embolo_titanio",
        "qty": 1
      },
      {
        "id": "motor_vapor",
        "qty": 1
      },
      {
        "id": "bateria_plasma",
        "qty": 2
      }
    ]
  },
  "bateria_plasma:1|bobinas_tesla:2|condensador_presion:2|embolo_titanio:1|giroscopio_precision:2|matriz_optica_solar:1": {
    "number": 103,
    "numberStr": "103",
    "name": "Boiler Servant",
    "tier": 3,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_103.glb",
    "scale": 0.93,
    "components": [
      {
        "id": "bateria_plasma",
        "qty": 1
      },
      {
        "id": "giroscopio_precision",
        "qty": 2
      },
      {
        "id": "matriz_optica_solar",
        "qty": 1
      },
      {
        "id": "condensador_presion",
        "qty": 2
      },
      {
        "id": "embolo_titanio",
        "qty": 1
      },
      {
        "id": "bobinas_tesla",
        "qty": 2
      }
    ]
  },
  "baterias_alquimicas:2|bombillas_filamento:2|diodos_led:2|engranajes_bronce:1|giroscopio_precision:2|matriz_optica_solar:2|nucleo_mana:2|reactor_eter:1": {
    "number": 104,
    "numberStr": "104",
    "name": "Diodic Forger",
    "tier": 3,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_104.glb",
    "scale": 1.26,
    "components": [
      {
        "id": "reactor_eter",
        "qty": 1
      },
      {
        "id": "nucleo_mana",
        "qty": 2
      },
      {
        "id": "giroscopio_precision",
        "qty": 2
      },
      {
        "id": "baterias_alquimicas",
        "qty": 2
      },
      {
        "id": "bombillas_filamento",
        "qty": 2
      },
      {
        "id": "diodos_led",
        "qty": 2
      },
      {
        "id": "engranajes_bronce",
        "qty": 1
      },
      {
        "id": "matriz_optica_solar",
        "qty": 2
      }
    ]
  },
  "baterias_alquimicas:2|bombillas_filamento:1|corazon_caldera:2|embolo_titanio:1|manometros:1|motor_vapor:1|valvulas_vapor:1": {
    "number": 105,
    "numberStr": "105",
    "name": "Pressurized Executor",
    "tier": 3,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_105.glb",
    "scale": 1,
    "components": [
      {
        "id": "corazon_caldera",
        "qty": 2
      },
      {
        "id": "valvulas_vapor",
        "qty": 1
      },
      {
        "id": "baterias_alquimicas",
        "qty": 2
      },
      {
        "id": "bombillas_filamento",
        "qty": 1
      },
      {
        "id": "embolo_titanio",
        "qty": 1
      },
      {
        "id": "manometros",
        "qty": 1
      },
      {
        "id": "motor_vapor",
        "qty": 1
      }
    ]
  },
  "bateria_plasma:1|baterias_alquimicas:2|bombillas_filamento:2|dinamo_galvanica:2|giroscopio_precision:1|matriz_optica_solar:1|motor_vapor:1|reactor_eter:1": {
    "number": 106,
    "numberStr": "106",
    "name": "Plasmatic Tracker",
    "tier": 3,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_106.glb",
    "scale": 1.03,
    "components": [
      {
        "id": "baterias_alquimicas",
        "qty": 2
      },
      {
        "id": "bateria_plasma",
        "qty": 1
      },
      {
        "id": "matriz_optica_solar",
        "qty": 1
      },
      {
        "id": "reactor_eter",
        "qty": 1
      },
      {
        "id": "giroscopio_precision",
        "qty": 1
      },
      {
        "id": "dinamo_galvanica",
        "qty": 2
      },
      {
        "id": "bombillas_filamento",
        "qty": 2
      },
      {
        "id": "motor_vapor",
        "qty": 1
      }
    ]
  },
  "bateria_plasma:1|baterias_alquimicas:2|condensador_presion:2|corazon_caldera:2|cristal_fuerza:1|manometros:2|reactor_eter:1|resortes_reloj:2": {
    "number": 107,
    "numberStr": "107",
    "name": "Igneous Titan",
    "tier": 3,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_107.glb",
    "scale": 1.04,
    "components": [
      {
        "id": "cristal_fuerza",
        "qty": 1
      },
      {
        "id": "bateria_plasma",
        "qty": 1
      },
      {
        "id": "manometros",
        "qty": 2
      },
      {
        "id": "corazon_caldera",
        "qty": 2
      },
      {
        "id": "reactor_eter",
        "qty": 1
      },
      {
        "id": "baterias_alquimicas",
        "qty": 2
      },
      {
        "id": "resortes_reloj",
        "qty": 2
      },
      {
        "id": "condensador_presion",
        "qty": 2
      }
    ]
  },
  "antenas_radio:2|condensador_presion:1|diodos_led:1|engranajes_bronce:1|fusibles_fundidos:1|nucleo_mana:2|resortes_reloj:1|tubos_vacio:2": {
    "number": 108,
    "numberStr": "108",
    "name": "Dragonic Walker",
    "tier": 3,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_108.glb",
    "scale": 1.17,
    "components": [
      {
        "id": "fusibles_fundidos",
        "qty": 1
      },
      {
        "id": "resortes_reloj",
        "qty": 1
      },
      {
        "id": "condensador_presion",
        "qty": 1
      },
      {
        "id": "antenas_radio",
        "qty": 2
      },
      {
        "id": "diodos_led",
        "qty": 1
      },
      {
        "id": "tubos_vacio",
        "qty": 2
      },
      {
        "id": "nucleo_mana",
        "qty": 2
      },
      {
        "id": "engranajes_bronce",
        "qty": 1
      }
    ]
  },
  "cerebro_automata:1|condensador_presion:2|corazon_caldera:1|cristal_fuerza:1|diodos_led:2|embolo_titanio:1|motor_vapor:1|resortes_reloj:1": {
    "number": 109,
    "numberStr": "109",
    "name": "Vaporized Golem",
    "tier": 3,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_109.glb",
    "scale": 0.92,
    "components": [
      {
        "id": "diodos_led",
        "qty": 2
      },
      {
        "id": "cerebro_automata",
        "qty": 1
      },
      {
        "id": "resortes_reloj",
        "qty": 1
      },
      {
        "id": "motor_vapor",
        "qty": 1
      },
      {
        "id": "embolo_titanio",
        "qty": 1
      },
      {
        "id": "corazon_caldera",
        "qty": 1
      },
      {
        "id": "condensador_presion",
        "qty": 2
      },
      {
        "id": "cristal_fuerza",
        "qty": 1
      }
    ]
  },
  "antenas_radio:1|baterias_alquimicas:1|cristal_fuerza:2|engranajes_bronce:2|giroscopio_precision:1|motor_vapor:2|nucleo_mana:1": {
    "number": 110,
    "numberStr": "110",
    "name": "Geared Sentinel",
    "tier": 3,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_110.glb",
    "scale": 1.25,
    "components": [
      {
        "id": "giroscopio_precision",
        "qty": 1
      },
      {
        "id": "engranajes_bronce",
        "qty": 2
      },
      {
        "id": "nucleo_mana",
        "qty": 1
      },
      {
        "id": "cristal_fuerza",
        "qty": 2
      },
      {
        "id": "motor_vapor",
        "qty": 2
      },
      {
        "id": "baterias_alquimicas",
        "qty": 1
      },
      {
        "id": "antenas_radio",
        "qty": 1
      }
    ]
  },
  "bateria_plasma:1|bombillas_filamento:1|diodos_led:2|engranajes_bronce:2|giroscopio_precision:2|matriz_optica_solar:1|palancas_interruptor:2": {
    "number": 111,
    "numberStr": "111",
    "name": "Clockwork Defender",
    "tier": 3,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_111.glb",
    "scale": 0.91,
    "components": [
      {
        "id": "bateria_plasma",
        "qty": 1
      },
      {
        "id": "giroscopio_precision",
        "qty": 2
      },
      {
        "id": "palancas_interruptor",
        "qty": 2
      },
      {
        "id": "diodos_led",
        "qty": 2
      },
      {
        "id": "engranajes_bronce",
        "qty": 2
      },
      {
        "id": "matriz_optica_solar",
        "qty": 1
      },
      {
        "id": "bombillas_filamento",
        "qty": 1
      }
    ]
  },
  "antenas_radio:2|baterias_alquimicas:2|corazon_caldera:1|manometros:2|matriz_optica_solar:2": {
    "number": 112,
    "numberStr": "112",
    "name": "Filament Assembly",
    "tier": 3,
    "affinityCode": "LUMINOUS",
    "modelSrc": "assets/models/luminous/golem_112.glb",
    "scale": 1.17,
    "components": [
      {
        "id": "baterias_alquimicas",
        "qty": 2
      },
      {
        "id": "corazon_caldera",
        "qty": 1
      },
      {
        "id": "matriz_optica_solar",
        "qty": 2
      },
      {
        "id": "antenas_radio",
        "qty": 2
      },
      {
        "id": "manometros",
        "qty": 2
      }
    ]
  },
  "antenas_radio:2|baterias_alquimicas:1|brujulas_magneticas:1|dinamo_galvanica:1|diodos_led:1|giroscopio_precision:2|motor_vapor:1|transistores:2": {
    "number": 113,
    "numberStr": "113",
    "name": "Ferrous Guardian",
    "tier": 3,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_113.glb",
    "scale": 0.91,
    "components": [
      {
        "id": "antenas_radio",
        "qty": 2
      },
      {
        "id": "baterias_alquimicas",
        "qty": 1
      },
      {
        "id": "brujulas_magneticas",
        "qty": 1
      },
      {
        "id": "dinamo_galvanica",
        "qty": 1
      },
      {
        "id": "transistores",
        "qty": 2
      },
      {
        "id": "giroscopio_precision",
        "qty": 2
      },
      {
        "id": "motor_vapor",
        "qty": 1
      },
      {
        "id": "diodos_led",
        "qty": 1
      }
    ]
  },
  "corazon_caldera:2|cristal_fuerza:1|engranajes_bronce:2|nucleo_mana:2|palancas_interruptor:1|relojes_bolsillo:1|tubos_vacio:1": {
    "number": 114,
    "numberStr": "114",
    "name": "Pneumatic Crusader",
    "tier": 3,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_114.glb",
    "scale": 1.09,
    "components": [
      {
        "id": "engranajes_bronce",
        "qty": 2
      },
      {
        "id": "relojes_bolsillo",
        "qty": 1
      },
      {
        "id": "palancas_interruptor",
        "qty": 1
      },
      {
        "id": "tubos_vacio",
        "qty": 1
      },
      {
        "id": "cristal_fuerza",
        "qty": 1
      },
      {
        "id": "nucleo_mana",
        "qty": 2
      },
      {
        "id": "corazon_caldera",
        "qty": 2
      }
    ]
  },
  "condensador_presion:2|diodos_led:1|engranajes_bronce:1|matriz_optica_solar:1|nucleo_mana:2|valvulas_vapor:1": {
    "number": 115,
    "numberStr": "115",
    "name": "Singular Settler",
    "tier": 3,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_115.glb",
    "scale": 1.08,
    "components": [
      {
        "id": "diodos_led",
        "qty": 1
      },
      {
        "id": "matriz_optica_solar",
        "qty": 1
      },
      {
        "id": "condensador_presion",
        "qty": 2
      },
      {
        "id": "valvulas_vapor",
        "qty": 1
      },
      {
        "id": "engranajes_bronce",
        "qty": 1
      },
      {
        "id": "nucleo_mana",
        "qty": 2
      }
    ]
  },
  "baterias_alquimicas:1|cerebro_automata:1|cristal_fuerza:1|diodos_led:1|nucleo_mana:1|reactor_eter:1": {
    "number": 116,
    "numberStr": "116",
    "name": "Mystic Smelter",
    "tier": 3,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_116.glb",
    "scale": 1.02,
    "components": [
      {
        "id": "baterias_alquimicas",
        "qty": 1
      },
      {
        "id": "reactor_eter",
        "qty": 1
      },
      {
        "id": "diodos_led",
        "qty": 1
      },
      {
        "id": "cerebro_automata",
        "qty": 1
      },
      {
        "id": "cristal_fuerza",
        "qty": 1
      },
      {
        "id": "nucleo_mana",
        "qty": 1
      }
    ]
  },
  "bateria_plasma:2|condensador_presion:1|embolo_titanio:2|engranajes_bronce:2|manometros:1": {
    "number": 117,
    "numberStr": "117",
    "name": "Igneous Watcher",
    "tier": 3,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_117.glb",
    "scale": 1.13,
    "components": [
      {
        "id": "bateria_plasma",
        "qty": 2
      },
      {
        "id": "engranajes_bronce",
        "qty": 2
      },
      {
        "id": "manometros",
        "qty": 1
      },
      {
        "id": "embolo_titanio",
        "qty": 2
      },
      {
        "id": "condensador_presion",
        "qty": 1
      }
    ]
  },
  "antenas_radio:2|cerebro_automata:1|condensador_presion:2|dinamo_galvanica:2|engranajes_bronce:2|motor_vapor:2|reactor_eter:2|relojes_bolsillo:2|resortes_reloj:1": {
    "number": 118,
    "numberStr": "118",
    "name": "Piston Leviathan",
    "tier": 3,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_118.glb",
    "scale": 1.28,
    "components": [
      {
        "id": "motor_vapor",
        "qty": 2
      },
      {
        "id": "relojes_bolsillo",
        "qty": 2
      },
      {
        "id": "cerebro_automata",
        "qty": 1
      },
      {
        "id": "condensador_presion",
        "qty": 2
      },
      {
        "id": "resortes_reloj",
        "qty": 1
      },
      {
        "id": "dinamo_galvanica",
        "qty": 2
      },
      {
        "id": "engranajes_bronce",
        "qty": 2
      },
      {
        "id": "antenas_radio",
        "qty": 2
      },
      {
        "id": "reactor_eter",
        "qty": 2
      }
    ]
  },
  "antenas_radio:2|baterias_alquimicas:2|condensador_presion:2|embolo_titanio:2|manometros:1|matriz_optica_solar:2": {
    "number": 119,
    "numberStr": "119",
    "name": "Vaporized Vanguard",
    "tier": 3,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_119.glb",
    "scale": 1.02,
    "components": [
      {
        "id": "matriz_optica_solar",
        "qty": 2
      },
      {
        "id": "antenas_radio",
        "qty": 2
      },
      {
        "id": "embolo_titanio",
        "qty": 2
      },
      {
        "id": "condensador_presion",
        "qty": 2
      },
      {
        "id": "manometros",
        "qty": 1
      },
      {
        "id": "baterias_alquimicas",
        "qty": 2
      }
    ]
  },
  "bateria_plasma:1|baterias_alquimicas:1|condensador_presion:1|matriz_optica_solar:1|palancas_interruptor:2|transistores:1": {
    "number": 120,
    "numberStr": "120",
    "name": "Galvanic Automaton",
    "tier": 3,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_120.glb",
    "scale": 1.21,
    "components": [
      {
        "id": "bateria_plasma",
        "qty": 1
      },
      {
        "id": "matriz_optica_solar",
        "qty": 1
      },
      {
        "id": "transistores",
        "qty": 1
      },
      {
        "id": "condensador_presion",
        "qty": 1
      },
      {
        "id": "palancas_interruptor",
        "qty": 2
      },
      {
        "id": "baterias_alquimicas",
        "qty": 1
      }
    ]
  },
  "bateria_plasma:1|bobinas_tesla:1|bombillas_filamento:2|condensador_presion:1|engranajes_bronce:1|matriz_optica_solar:1|palancas_interruptor:2|reactor_eter:2|valvulas_vapor:2": {
    "number": 121,
    "numberStr": "121",
    "name": "Primordial Protector",
    "tier": 3,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_121.glb",
    "scale": 1.13,
    "components": [
      {
        "id": "reactor_eter",
        "qty": 2
      },
      {
        "id": "bobinas_tesla",
        "qty": 1
      },
      {
        "id": "bombillas_filamento",
        "qty": 2
      },
      {
        "id": "matriz_optica_solar",
        "qty": 1
      },
      {
        "id": "valvulas_vapor",
        "qty": 2
      },
      {
        "id": "engranajes_bronce",
        "qty": 1
      },
      {
        "id": "bateria_plasma",
        "qty": 1
      },
      {
        "id": "condensador_presion",
        "qty": 1
      },
      {
        "id": "palancas_interruptor",
        "qty": 2
      }
    ]
  },
  "baterias_alquimicas:1|bobinas_tesla:2|cristal_fuerza:1|dinamo_galvanica:2|embolo_titanio:2|motor_vapor:2|reactor_eter:1|tubos_vacio:2": {
    "number": 122,
    "numberStr": "122",
    "name": "Thermal Bearer",
    "tier": 3,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_122.glb",
    "scale": 1.05,
    "components": [
      {
        "id": "tubos_vacio",
        "qty": 2
      },
      {
        "id": "embolo_titanio",
        "qty": 2
      },
      {
        "id": "motor_vapor",
        "qty": 2
      },
      {
        "id": "cristal_fuerza",
        "qty": 1
      },
      {
        "id": "baterias_alquimicas",
        "qty": 1
      },
      {
        "id": "reactor_eter",
        "qty": 1
      },
      {
        "id": "bobinas_tesla",
        "qty": 2
      },
      {
        "id": "dinamo_galvanica",
        "qty": 2
      }
    ]
  },
  "baterias_alquimicas:2|cerebro_automata:2|cristal_fuerza:2|dinamo_galvanica:1|fusibles_fundidos:2|giroscopio_precision:1|motor_vapor:1|nucleo_mana:2": {
    "number": 123,
    "numberStr": "123",
    "name": "Ferrous Monolith",
    "tier": 3,
    "affinityCode": "MECHANICAL",
    "modelSrc": "assets/models/mechanical/golem_123.glb",
    "scale": 0.98,
    "components": [
      {
        "id": "dinamo_galvanica",
        "qty": 1
      },
      {
        "id": "giroscopio_precision",
        "qty": 1
      },
      {
        "id": "cristal_fuerza",
        "qty": 2
      },
      {
        "id": "motor_vapor",
        "qty": 1
      },
      {
        "id": "baterias_alquimicas",
        "qty": 2
      },
      {
        "id": "nucleo_mana",
        "qty": 2
      },
      {
        "id": "fusibles_fundidos",
        "qty": 2
      },
      {
        "id": "cerebro_automata",
        "qty": 2
      }
    ]
  },
  "antenas_radio:2|baterias_alquimicas:2|bobinas_tesla:2|condensador_presion:2|embolo_titanio:1|fusibles_fundidos:1|giroscopio_precision:1|reactor_eter:1": {
    "number": 124,
    "numberStr": "124",
    "name": "Voltaic Scavenger",
    "tier": 3,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_124.glb",
    "scale": 1.16,
    "components": [
      {
        "id": "giroscopio_precision",
        "qty": 1
      },
      {
        "id": "antenas_radio",
        "qty": 2
      },
      {
        "id": "fusibles_fundidos",
        "qty": 1
      },
      {
        "id": "bobinas_tesla",
        "qty": 2
      },
      {
        "id": "baterias_alquimicas",
        "qty": 2
      },
      {
        "id": "condensador_presion",
        "qty": 2
      },
      {
        "id": "embolo_titanio",
        "qty": 1
      },
      {
        "id": "reactor_eter",
        "qty": 1
      }
    ]
  },
  "antenas_radio:1|corazon_caldera:2|dinamo_galvanica:1|engranajes_bronce:2|lentes_tv_viejo:1|nucleo_mana:2|reactor_eter:2|transistores:1|tubos_vacio:1": {
    "number": 125,
    "numberStr": "125",
    "name": "Singular Excavator",
    "tier": 3,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_125.glb",
    "scale": 1.3,
    "components": [
      {
        "id": "engranajes_bronce",
        "qty": 2
      },
      {
        "id": "nucleo_mana",
        "qty": 2
      },
      {
        "id": "corazon_caldera",
        "qty": 2
      },
      {
        "id": "transistores",
        "qty": 1
      },
      {
        "id": "antenas_radio",
        "qty": 1
      },
      {
        "id": "lentes_tv_viejo",
        "qty": 1
      },
      {
        "id": "dinamo_galvanica",
        "qty": 1
      },
      {
        "id": "reactor_eter",
        "qty": 2
      },
      {
        "id": "tubos_vacio",
        "qty": 1
      }
    ]
  },
  "antenas_radio:3|bateria_plasma:3|corazon_caldera:2|diodos_led:3|nucleo_mana:1|reactor_eter:3": {
    "number": 126,
    "numberStr": "126",
    "name": "Mystic Patroller",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_126.glb",
    "scale": 1.06,
    "components": [
      {
        "id": "bateria_plasma",
        "qty": 3
      },
      {
        "id": "reactor_eter",
        "qty": 3
      },
      {
        "id": "antenas_radio",
        "qty": 3
      },
      {
        "id": "diodos_led",
        "qty": 3
      },
      {
        "id": "corazon_caldera",
        "qty": 2
      },
      {
        "id": "nucleo_mana",
        "qty": 1
      }
    ]
  },
  "baterias_alquimicas:3|bobinas_tesla:2|cristal_fuerza:1|dinamo_galvanica:2|matriz_optica_solar:1|nucleo_mana:2": {
    "number": 127,
    "numberStr": "127",
    "name": "Conductive Basilisk",
    "tier": 4,
    "affinityCode": "GALVANIC",
    "modelSrc": "assets/models/galvanic/golem_127.glb",
    "scale": 1.22,
    "components": [
      {
        "id": "cristal_fuerza",
        "qty": 1
      },
      {
        "id": "baterias_alquimicas",
        "qty": 3
      },
      {
        "id": "matriz_optica_solar",
        "qty": 1
      },
      {
        "id": "nucleo_mana",
        "qty": 2
      },
      {
        "id": "dinamo_galvanica",
        "qty": 2
      },
      {
        "id": "bobinas_tesla",
        "qty": 2
      }
    ]
  },
  "bobinas_tesla:1|corazon_caldera:2|diodos_led:1|engranajes_bronce:2|matriz_optica_solar:2|nucleo_mana:3|reactor_eter:2|relicario_astral:3|singularidad_eterica:1": {
    "number": 128,
    "numberStr": "128",
    "name": "Dragonic Guard",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_128.glb",
    "scale": 1.12,
    "components": [
      {
        "id": "matriz_optica_solar",
        "qty": 2
      },
      {
        "id": "corazon_caldera",
        "qty": 2
      },
      {
        "id": "diodos_led",
        "qty": 1
      },
      {
        "id": "engranajes_bronce",
        "qty": 2
      },
      {
        "id": "singularidad_eterica",
        "qty": 1
      },
      {
        "id": "nucleo_mana",
        "qty": 3
      },
      {
        "id": "bobinas_tesla",
        "qty": 1
      },
      {
        "id": "reactor_eter",
        "qty": 2
      },
      {
        "id": "relicario_astral",
        "qty": 3
      }
    ]
  },
  "corazon_caldera:2|corazon_primigenio:2|engranajes_bronce:2|nucleo_mana:2|reactor_eter:3|relicario_astral:3|singularidad_eterica:2": {
    "number": 129,
    "numberStr": "129",
    "name": "Arcane Bulwark",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_129.glb",
    "scale": 1.02,
    "components": [
      {
        "id": "nucleo_mana",
        "qty": 2
      },
      {
        "id": "engranajes_bronce",
        "qty": 2
      },
      {
        "id": "relicario_astral",
        "qty": 3
      },
      {
        "id": "corazon_primigenio",
        "qty": 2
      },
      {
        "id": "singularidad_eterica",
        "qty": 2
      },
      {
        "id": "corazon_caldera",
        "qty": 2
      },
      {
        "id": "reactor_eter",
        "qty": 3
      }
    ]
  },
  "bateria_plasma:2|condensador_presion:3|dinamo_galvanica:1|embolo_titanio:1|motor_vapor:2|ojo_dragon:2|singularidad_eterica:1": {
    "number": 130,
    "numberStr": "130",
    "name": "Steamy Hunter",
    "tier": 4,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_130.glb",
    "scale": 1.02,
    "components": [
      {
        "id": "singularidad_eterica",
        "qty": 1
      },
      {
        "id": "bateria_plasma",
        "qty": 2
      },
      {
        "id": "condensador_presion",
        "qty": 3
      },
      {
        "id": "motor_vapor",
        "qty": 2
      },
      {
        "id": "ojo_dragon",
        "qty": 2
      },
      {
        "id": "embolo_titanio",
        "qty": 1
      },
      {
        "id": "dinamo_galvanica",
        "qty": 1
      }
    ]
  },
  "bateria_plasma:1|bobinas_tesla:2|cerebro_automata:2|corazon_caldera:3|corazon_primigenio:2|cristal_fuerza:2|giroscopio_precision:3|reactor_eter:3": {
    "number": 131,
    "numberStr": "131",
    "name": "Primordial Gunner",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_131.glb",
    "scale": 1.2,
    "components": [
      {
        "id": "corazon_caldera",
        "qty": 3
      },
      {
        "id": "cerebro_automata",
        "qty": 2
      },
      {
        "id": "bobinas_tesla",
        "qty": 2
      },
      {
        "id": "reactor_eter",
        "qty": 3
      },
      {
        "id": "bateria_plasma",
        "qty": 1
      },
      {
        "id": "corazon_primigenio",
        "qty": 2
      },
      {
        "id": "giroscopio_precision",
        "qty": 3
      },
      {
        "id": "cristal_fuerza",
        "qty": 2
      }
    ]
  },
  "bateria_plasma:3|corazon_caldera:1|corazon_primigenio:1|dinamo_galvanica:2|nucleo_mana:2|ojo_dragon:2|relicario_astral:1": {
    "number": 132,
    "numberStr": "132",
    "name": "Reliquary Wraith",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_132.glb",
    "scale": 1,
    "components": [
      {
        "id": "corazon_primigenio",
        "qty": 1
      },
      {
        "id": "ojo_dragon",
        "qty": 2
      },
      {
        "id": "nucleo_mana",
        "qty": 2
      },
      {
        "id": "corazon_caldera",
        "qty": 1
      },
      {
        "id": "relicario_astral",
        "qty": 1
      },
      {
        "id": "dinamo_galvanica",
        "qty": 2
      },
      {
        "id": "bateria_plasma",
        "qty": 3
      }
    ]
  },
  "antenas_radio:1|bateria_plasma:1|bobinas_tesla:1|cerebro_automata:1|corazon_primigenio:3|matriz_optica_solar:1|relicario_astral:3": {
    "number": 133,
    "numberStr": "133",
    "name": "Astral Colossus",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_133.glb",
    "scale": 0.96,
    "components": [
      {
        "id": "corazon_primigenio",
        "qty": 3
      },
      {
        "id": "antenas_radio",
        "qty": 1
      },
      {
        "id": "bateria_plasma",
        "qty": 1
      },
      {
        "id": "relicario_astral",
        "qty": 3
      },
      {
        "id": "bobinas_tesla",
        "qty": 1
      },
      {
        "id": "cerebro_automata",
        "qty": 1
      },
      {
        "id": "matriz_optica_solar",
        "qty": 1
      }
    ]
  },
  "antenas_radio:3|bateria_plasma:3|corazon_caldera:2|matriz_optica_solar:2|motor_vapor:2|nucleo_mana:3|relicario_astral:2|singularidad_eterica:2": {
    "number": 134,
    "numberStr": "134",
    "name": "Manatic Destroyer",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_134.glb",
    "scale": 1.17,
    "components": [
      {
        "id": "corazon_caldera",
        "qty": 2
      },
      {
        "id": "relicario_astral",
        "qty": 2
      },
      {
        "id": "motor_vapor",
        "qty": 2
      },
      {
        "id": "antenas_radio",
        "qty": 3
      },
      {
        "id": "nucleo_mana",
        "qty": 3
      },
      {
        "id": "singularidad_eterica",
        "qty": 2
      },
      {
        "id": "matriz_optica_solar",
        "qty": 2
      },
      {
        "id": "bateria_plasma",
        "qty": 3
      }
    ]
  },
  "antenas_radio:1|bateria_plasma:3|bobinas_tesla:3|condensador_presion:2|corazon_primigenio:1|giroscopio_precision:2|ojo_dragon:2|relicario_astral:3|singularidad_eterica:2": {
    "number": 135,
    "numberStr": "135",
    "name": "Singular Servant",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_135.glb",
    "scale": 1.14,
    "components": [
      {
        "id": "bobinas_tesla",
        "qty": 3
      },
      {
        "id": "relicario_astral",
        "qty": 3
      },
      {
        "id": "singularidad_eterica",
        "qty": 2
      },
      {
        "id": "corazon_primigenio",
        "qty": 1
      },
      {
        "id": "condensador_presion",
        "qty": 2
      },
      {
        "id": "antenas_radio",
        "qty": 1
      },
      {
        "id": "bateria_plasma",
        "qty": 3
      },
      {
        "id": "giroscopio_precision",
        "qty": 2
      },
      {
        "id": "ojo_dragon",
        "qty": 2
      }
    ]
  },
  "baterias_alquimicas:1|bobinas_tesla:1|condensador_presion:2|corazon_caldera:1|corazon_primigenio:3|engranajes_bronce:3|matriz_optica_solar:2|ojo_dragon:3|relicario_astral:3": {
    "number": 136,
    "numberStr": "136",
    "name": "Mystic Forger",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_136.glb",
    "scale": 1.27,
    "components": [
      {
        "id": "condensador_presion",
        "qty": 2
      },
      {
        "id": "relicario_astral",
        "qty": 3
      },
      {
        "id": "baterias_alquimicas",
        "qty": 1
      },
      {
        "id": "corazon_caldera",
        "qty": 1
      },
      {
        "id": "ojo_dragon",
        "qty": 3
      },
      {
        "id": "corazon_primigenio",
        "qty": 3
      },
      {
        "id": "matriz_optica_solar",
        "qty": 2
      },
      {
        "id": "engranajes_bronce",
        "qty": 3
      },
      {
        "id": "bobinas_tesla",
        "qty": 1
      }
    ]
  },
  "bateria_plasma:1|corazon_caldera:2|matriz_optica_solar:1|motor_vapor:3|ojo_dragon:1|reactor_eter:3|relicario_astral:1": {
    "number": 137,
    "numberStr": "137",
    "name": "Cosmic Executor",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_137.glb",
    "scale": 0.93,
    "components": [
      {
        "id": "reactor_eter",
        "qty": 3
      },
      {
        "id": "relicario_astral",
        "qty": 1
      },
      {
        "id": "ojo_dragon",
        "qty": 1
      },
      {
        "id": "bateria_plasma",
        "qty": 1
      },
      {
        "id": "corazon_caldera",
        "qty": 2
      },
      {
        "id": "motor_vapor",
        "qty": 3
      },
      {
        "id": "matriz_optica_solar",
        "qty": 1
      }
    ]
  },
  "antenas_radio:2|baterias_alquimicas:2|condensador_presion:3|corazon_caldera:3|corazon_primigenio:1|embolo_titanio:3|engranajes_bronce:3|reactor_eter:2": {
    "number": 138,
    "numberStr": "138",
    "name": "Piston Tracker",
    "tier": 4,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_138.glb",
    "scale": 1.25,
    "components": [
      {
        "id": "corazon_primigenio",
        "qty": 1
      },
      {
        "id": "corazon_caldera",
        "qty": 3
      },
      {
        "id": "reactor_eter",
        "qty": 2
      },
      {
        "id": "antenas_radio",
        "qty": 2
      },
      {
        "id": "baterias_alquimicas",
        "qty": 2
      },
      {
        "id": "engranajes_bronce",
        "qty": 3
      },
      {
        "id": "embolo_titanio",
        "qty": 3
      },
      {
        "id": "condensador_presion",
        "qty": 3
      }
    ]
  },
  "antenas_radio:2|bateria_plasma:3|cerebro_automata:2|embolo_titanio:2|giroscopio_precision:2|ojo_dragon:1|relicario_astral:3": {
    "number": 139,
    "numberStr": "139",
    "name": "Arcane Titan",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_139.glb",
    "scale": 0.98,
    "components": [
      {
        "id": "cerebro_automata",
        "qty": 2
      },
      {
        "id": "antenas_radio",
        "qty": 2
      },
      {
        "id": "ojo_dragon",
        "qty": 1
      },
      {
        "id": "giroscopio_precision",
        "qty": 2
      },
      {
        "id": "bateria_plasma",
        "qty": 3
      },
      {
        "id": "relicario_astral",
        "qty": 3
      },
      {
        "id": "embolo_titanio",
        "qty": 2
      }
    ]
  },
  "bateria_plasma:1|corazon_primigenio:2|embolo_titanio:3|nucleo_mana:2|reactor_eter:2|singularidad_eterica:1": {
    "number": 140,
    "numberStr": "140",
    "name": "Aetheric Walker",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_140.glb",
    "scale": 0.9,
    "components": [
      {
        "id": "embolo_titanio",
        "qty": 3
      },
      {
        "id": "nucleo_mana",
        "qty": 2
      },
      {
        "id": "singularidad_eterica",
        "qty": 1
      },
      {
        "id": "bateria_plasma",
        "qty": 1
      },
      {
        "id": "reactor_eter",
        "qty": 2
      },
      {
        "id": "corazon_primigenio",
        "qty": 2
      }
    ]
  },
  "cerebro_automata:3|condensador_presion:1|dinamo_galvanica:1|diodos_led:1|ojo_dragon:1|reactor_eter:2|singularidad_eterica:3": {
    "number": 141,
    "numberStr": "141",
    "name": "Primordial Golem",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_141.glb",
    "scale": 0.96,
    "components": [
      {
        "id": "reactor_eter",
        "qty": 2
      },
      {
        "id": "cerebro_automata",
        "qty": 3
      },
      {
        "id": "diodos_led",
        "qty": 1
      },
      {
        "id": "singularidad_eterica",
        "qty": 3
      },
      {
        "id": "dinamo_galvanica",
        "qty": 1
      },
      {
        "id": "ojo_dragon",
        "qty": 1
      },
      {
        "id": "condensador_presion",
        "qty": 1
      }
    ]
  },
  "bateria_plasma:2|dinamo_galvanica:3|engranajes_bronce:3|motor_vapor:1|nucleo_mana:2|ojo_dragon:2|relicario_astral:2": {
    "number": 142,
    "numberStr": "142",
    "name": "Reliquary Sentinel",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_142.glb",
    "scale": 1.01,
    "components": [
      {
        "id": "nucleo_mana",
        "qty": 2
      },
      {
        "id": "ojo_dragon",
        "qty": 2
      },
      {
        "id": "engranajes_bronce",
        "qty": 3
      },
      {
        "id": "relicario_astral",
        "qty": 2
      },
      {
        "id": "bateria_plasma",
        "qty": 2
      },
      {
        "id": "motor_vapor",
        "qty": 1
      },
      {
        "id": "dinamo_galvanica",
        "qty": 3
      }
    ]
  },
  "antenas_radio:1|corazon_caldera:1|dinamo_galvanica:1|diodos_led:3|embolo_titanio:3|ojo_dragon:1|relicario_astral:3|singularidad_eterica:3": {
    "number": 143,
    "numberStr": "143",
    "name": "Astral Defender",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_143.glb",
    "scale": 1.22,
    "components": [
      {
        "id": "relicario_astral",
        "qty": 3
      },
      {
        "id": "antenas_radio",
        "qty": 1
      },
      {
        "id": "corazon_caldera",
        "qty": 1
      },
      {
        "id": "ojo_dragon",
        "qty": 1
      },
      {
        "id": "dinamo_galvanica",
        "qty": 1
      },
      {
        "id": "diodos_led",
        "qty": 3
      },
      {
        "id": "singularidad_eterica",
        "qty": 3
      },
      {
        "id": "embolo_titanio",
        "qty": 3
      }
    ]
  },
  "bateria_plasma:3|corazon_caldera:3|dinamo_galvanica:3|embolo_titanio:1|giroscopio_precision:2|motor_vapor:2|nucleo_mana:3": {
    "number": 144,
    "numberStr": "144",
    "name": "Pneumatic Assembly",
    "tier": 4,
    "affinityCode": "STEAM",
    "modelSrc": "assets/models/steam/golem_144.glb",
    "scale": 1.15,
    "components": [
      {
        "id": "nucleo_mana",
        "qty": 3
      },
      {
        "id": "motor_vapor",
        "qty": 2
      },
      {
        "id": "corazon_caldera",
        "qty": 3
      },
      {
        "id": "giroscopio_precision",
        "qty": 2
      },
      {
        "id": "bateria_plasma",
        "qty": 3
      },
      {
        "id": "dinamo_galvanica",
        "qty": 3
      },
      {
        "id": "embolo_titanio",
        "qty": 1
      }
    ]
  },
  "bateria_plasma:3|cerebro_automata:3|condensador_presion:3|corazon_caldera:3|engranajes_bronce:2|matriz_optica_solar:2|motor_vapor:2|nucleo_mana:1|ojo_dragon:3|singularidad_eterica:3": {
    "number": 145,
    "numberStr": "145",
    "name": "Singular Guardian",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_145.glb",
    "scale": 0.91,
    "components": [
      {
        "id": "condensador_presion",
        "qty": 3
      },
      {
        "id": "singularidad_eterica",
        "qty": 3
      },
      {
        "id": "engranajes_bronce",
        "qty": 2
      },
      {
        "id": "ojo_dragon",
        "qty": 3
      },
      {
        "id": "motor_vapor",
        "qty": 2
      },
      {
        "id": "corazon_caldera",
        "qty": 3
      },
      {
        "id": "matriz_optica_solar",
        "qty": 2
      },
      {
        "id": "nucleo_mana",
        "qty": 1
      },
      {
        "id": "cerebro_automata",
        "qty": 3
      },
      {
        "id": "bateria_plasma",
        "qty": 3
      }
    ]
  },
  "cerebro_automata:1|condensador_presion:2|matriz_optica_solar:1|nucleo_mana:1|relicario_astral:2": {
    "number": 146,
    "numberStr": "146",
    "name": "Mystic Crusader",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_146.glb",
    "scale": 1.01,
    "components": [
      {
        "id": "matriz_optica_solar",
        "qty": 1
      },
      {
        "id": "nucleo_mana",
        "qty": 1
      },
      {
        "id": "cerebro_automata",
        "qty": 1
      },
      {
        "id": "relicario_astral",
        "qty": 2
      },
      {
        "id": "condensador_presion",
        "qty": 2
      }
    ]
  },
  "bateria_plasma:1|cerebro_automata:3|corazon_primigenio:1|dinamo_galvanica:1|diodos_led:1|embolo_titanio:2|giroscopio_precision:2|nucleo_mana:3|relicario_astral:3|singularidad_eterica:3": {
    "number": 147,
    "numberStr": "147",
    "name": "Cosmic Settler",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_147.glb",
    "scale": 0.9,
    "components": [
      {
        "id": "relicario_astral",
        "qty": 3
      },
      {
        "id": "corazon_primigenio",
        "qty": 1
      },
      {
        "id": "singularidad_eterica",
        "qty": 3
      },
      {
        "id": "cerebro_automata",
        "qty": 3
      },
      {
        "id": "dinamo_galvanica",
        "qty": 1
      },
      {
        "id": "diodos_led",
        "qty": 1
      },
      {
        "id": "bateria_plasma",
        "qty": 1
      },
      {
        "id": "nucleo_mana",
        "qty": 3
      },
      {
        "id": "embolo_titanio",
        "qty": 2
      },
      {
        "id": "giroscopio_precision",
        "qty": 2
      }
    ]
  },
  "bateria_plasma:3|condensador_presion:3|corazon_caldera:1|corazon_primigenio:3|diodos_led:3|engranajes_bronce:1|matriz_optica_solar:1|motor_vapor:1|ojo_dragon:2|relicario_astral:1": {
    "number": 148,
    "numberStr": "148",
    "name": "Dragonic Smelter",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_148.glb",
    "scale": 1.14,
    "components": [
      {
        "id": "corazon_primigenio",
        "qty": 3
      },
      {
        "id": "ojo_dragon",
        "qty": 2
      },
      {
        "id": "matriz_optica_solar",
        "qty": 1
      },
      {
        "id": "condensador_presion",
        "qty": 3
      },
      {
        "id": "motor_vapor",
        "qty": 1
      },
      {
        "id": "engranajes_bronce",
        "qty": 1
      },
      {
        "id": "relicario_astral",
        "qty": 1
      },
      {
        "id": "bateria_plasma",
        "qty": 3
      },
      {
        "id": "diodos_led",
        "qty": 3
      },
      {
        "id": "corazon_caldera",
        "qty": 1
      }
    ]
  },
  "antenas_radio:1|bateria_plasma:2|cerebro_automata:3|corazon_caldera:1|cristal_fuerza:2|matriz_optica_solar:3|ojo_dragon:3|reactor_eter:3|relicario_astral:3|singularidad_eterica:2": {
    "number": 149,
    "numberStr": "149",
    "name": "Arcane Watcher",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_149.glb",
    "scale": 0.91,
    "components": [
      {
        "id": "corazon_caldera",
        "qty": 1
      },
      {
        "id": "cerebro_automata",
        "qty": 3
      },
      {
        "id": "matriz_optica_solar",
        "qty": 3
      },
      {
        "id": "reactor_eter",
        "qty": 3
      },
      {
        "id": "bateria_plasma",
        "qty": 2
      },
      {
        "id": "ojo_dragon",
        "qty": 3
      },
      {
        "id": "antenas_radio",
        "qty": 1
      },
      {
        "id": "relicario_astral",
        "qty": 3
      },
      {
        "id": "singularidad_eterica",
        "qty": 2
      },
      {
        "id": "cristal_fuerza",
        "qty": 2
      }
    ]
  },
  "bateria_plasma:2|cerebro_automata:3|corazon_caldera:2|corazon_primigenio:2|dinamo_galvanica:1|motor_vapor:1|ojo_dragon:2|reactor_eter:1": {
    "number": 150,
    "numberStr": "150",
    "name": "Aetheric Leviathan",
    "tier": 4,
    "affinityCode": "AETHER",
    "modelSrc": "assets/models/aether/golem_150.glb",
    "scale": 1.15,
    "components": [
      {
        "id": "corazon_primigenio",
        "qty": 2
      },
      {
        "id": "corazon_caldera",
        "qty": 2
      },
      {
        "id": "ojo_dragon",
        "qty": 2
      },
      {
        "id": "dinamo_galvanica",
        "qty": 1
      },
      {
        "id": "bateria_plasma",
        "qty": 2
      },
      {
        "id": "reactor_eter",
        "qty": 1
      },
      {
        "id": "cerebro_automata",
        "qty": 3
      },
      {
        "id": "motor_vapor",
        "qty": 1
      }
    ]
  }
}

/**
 * Catálogo completo de las 150 recetas deterministas oficiales indexadas por su cadena canónica.
 */
export const OFFICIAL_RECIPES_CATALOG: Record<string, OfficialRecipeData> = {}

for (const [canonical, data] of Object.entries(rawCatalog)) {
  let aff = GolemAffinity.STEAM
  if (data.affinityCode === 'GALVANIC') aff = GolemAffinity.GALVANIC
  else if (data.affinityCode === 'MECHANICAL') aff = GolemAffinity.MECHANICAL
  else if (data.affinityCode === 'LUMINOUS') aff = GolemAffinity.LUMINOUS
  else if (data.affinityCode === 'AETHER') aff = GolemAffinity.AETHER

  OFFICIAL_RECIPES_CATALOG[canonical] = {
    number: data.number,
    numberStr: data.numberStr,
    name: data.name,
    tier: data.tier,
    affinity: aff,
    modelSrc: data.modelSrc,
    scale: data.scale,
    components: data.components
  }
}

/**
 * Busca una receta oficial por su cadena canónica.
 */
export function findOfficialRecipe(canonicalRecipe: string): OfficialRecipeData | undefined {
  return OFFICIAL_RECIPES_CATALOG[canonicalRecipe]
}
