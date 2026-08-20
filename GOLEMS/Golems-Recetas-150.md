# Catálogo Maestro de Recetas de Golems (150 Diseños Deterministas)

![cover](golems_cover.png)

> **Documento Oficial de Recetas y Especificación Algorítmica**
> Este catálogo contiene la especificación detallada de **150 golems únicos** forjables en el *Wreckage Lab* de Decentraland (*world*: `golems.dcl.eth`).
> Cada golem deriva sus estadísticas, nombre algorítmico, afinidad elemental, escala visual y tintado PBR directamente del hash **FNV-1a 32-bit** de su receta canónica serializada.

---

## 📊 1. Resumen Ejecutivo y Distribución por Tiers

| Tier | Clasificación | Rango Golems | Piezas por Receta | Rareza Dominante | Enfoque Táctico |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | Chatarreros Básicos | `#001` a `#040` (40) | 5 a 6 piezas | Común / Poco Común | Iniciación, exploración segura, combate temprano |
| **Tier 2** | Mecatrónicos Medios | `#041` a `#090` (50) | 6 a 8 piezas | Poco Común / Raro | Escuadrones versátiles, combate de zonas medias |
| **Tier 3** | Veteranos Electromecánicos | `#091` a `#125` (35) | 7 a 10 piezas | Raro / Épico | Torneo Escalera, incursión en zonas PK |
| **Tier 4** | Titanes y Reactores Éter | `#126` a `#150` (25) | 8 a 12 piezas | Épico / Legendario | Dominación de la Gran Arena y Desierto Chatarra |

---

## ⚡ 2. El Pentágono de Afinidades Elementales

```text
         [ VAPOR ] (Steam)
          /       \
         /         \  (Vence a Mecánica x1.40)
   [ ÉTER ]        [ MECÁNICA ]
   (Aether)          (Mechanical)
       \             /
        \           /   (Vence a Galvánica x1.40)
     [ LUMINOSA ]---[ GALVÁNICA ]
     (Luminous)      (Galvanic)
```

---

## 🛠️ 3. Catálogo Completo de las 150 Recetas

### Golem #001 — Baluarte Eléctrico

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.09m` (Relación visual en escena)
- **Rol Táctico**: *Sostenimiento térmico y control de caldera*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **2x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **2x** Cadenas de hierro (`cadenas_hierro`) — *[Común]*
- **2x** Manómetros (`manometros`) — *[Poco común]*
- **2x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cadenas_hierro:2|manometros:2|palancas_interruptor:2|tornillos_pernos:2|tuercas_gigantes:2`
- **Hash FNV-1a Hexadecimal**: `0x3192BC8B` | **Decimal**: `831700107`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **24** | **117** | **4** |

---

### Golem #002 — Cazador Filamento

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.03m` (Relación visual en escena)
- **Rol Táctico**: *Autómata polivalente de exploración*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Placas de latón (`placas_laton`) — *[Común]*
- **1x** Cadenas de hierro (`cadenas_hierro`) — *[Común]*
- **1x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **2x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*
- **2x** Engranajes desgastados (`engranajes_desgastados`) — *[Común]*
- **2x** Sartenes (`sartenes`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bombillas_filamento:2|cadenas_hierro:1|engranajes_desgastados:2|placas_laton:1|sartenes:2|tuercas_gigantes:1`
- **Hash FNV-1a Hexadecimal**: `0x5E2836C9` | **Decimal**: `1579693769`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **23** | **109** | **6** |

---

### Golem #003 — Artillero Calderero

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `0.95m` (Relación visual en escena)
- **Rol Táctico**: *Coloso impenetrable de contención*

#### 🧩 Componentes Requeridos (4 Tipos de Piezas):
- **1x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **1x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*
- **2x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **1x** Placas de latón (`placas_laton`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `placas_laton:1|residuos_carbon:1|tornillos_pernos:1|tuercas_gigantes:2`
- **Hash FNV-1a Hexadecimal**: `0xC437C53B` | **Decimal**: `3291989307`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **16** | **88** | **4** |

---

### Golem #004 — Espectro Mecánico

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `1.10m` (Relación visual en escena)
- **Rol Táctico**: *Disruptor galvánico de alta frecuencia*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Sartenes (`sartenes`) — *[Común]*
- **2x** Tapas de alcantarilla (`tapas_alcantarilla`) — *[Común]*
- **1x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **1x** Engranajes desgastados (`engranajes_desgastados`) — *[Común]*
- **1x** Alambre de cobre (`alambre_cobre`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `alambre_cobre:1|engranajes_desgastados:1|palancas_interruptor:1|sartenes:2|tapas_alcantarilla:2`
- **Hash FNV-1a Hexadecimal**: `0x7E59D602` | **Decimal**: `2119816706`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **23** | **87** | **7** |

---

### Golem #005 — Coloso Presurizado

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `0.97m` (Relación visual en escena)
- **Rol Táctico**: *Unidad de vanguardia para zonas de PK*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **1x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **2x** Ollas de cocinar (`ollas_cocinar`) — *[Común]*
- **1x** Engranajes desgastados (`engranajes_desgastados`) — *[Común]*
- **1x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **1x** Clavos oxidados (`clavos_oxidados`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `clavos_oxidados:1|engranajes_desgastados:1|ollas_cocinar:2|residuos_carbon:1|tuercas_gigantes:1`
- **Hash FNV-1a Hexadecimal**: `0x01713109` | **Decimal**: `24195337`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **15** | **15** | **97** | **5** |

---

### Golem #006 — Destructor Brillante

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.01m` (Relación visual en escena)
- **Rol Táctico**: *Asesino ágil de choque veloz*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Transistores (`transistores`) — *[Poco común]*
- **2x** Placas de latón (`placas_laton`) — *[Común]*
- **1x** Engranajes desgastados (`engranajes_desgastados`) — *[Común]*
- **2x** Lentes de televisor viejo (`lentes_tv_viejo`) — *[Poco común]*
- **2x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **2x** Tapas de alcantarilla (`tapas_alcantarilla`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `engranajes_desgastados:1|lentes_tv_viejo:2|placas_laton:2|tapas_alcantarilla:2|transistores:1|tubos_vacio:2`
- **Hash FNV-1a Hexadecimal**: `0xEF9D26EE` | **Decimal**: `4020053742`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **24** | **20** | **82** | **11** |

---

### Golem #007 — Servidor Ígneo

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `0.91m` (Relación visual en escena)
- **Rol Táctico**: *Atacante rápido de primera línea*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **2x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*
- **1x** Lentes de televisor viejo (`lentes_tv_viejo`) — *[Poco común]*
- **2x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **1x** Latas de conserva (`latas_conserva`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bombillas_filamento:2|fusibles_fundidos:2|latas_conserva:1|lentes_tv_viejo:1|residuos_carbon:2`
- **Hash FNV-1a Hexadecimal**: `0xD352DC01` | **Decimal**: `3545422849`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **19** | **8** | **124** | **7** |

---

### Golem #008 — Forjador Centellante

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.12m` (Relación visual en escena)
- **Rol Táctico**: *Francotirador de pulso fotónico*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **1x** Clavos oxidados (`clavos_oxidados`) — *[Común]*
- **1x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **1x** Ollas de cocinar (`ollas_cocinar`) — *[Común]*
- **1x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **2x** Cadenas de hierro (`cadenas_hierro`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cadenas_hierro:2|clavos_oxidados:1|ollas_cocinar:1|tubos_vacio:1|tuercas_gigantes:1`
- **Hash FNV-1a Hexadecimal**: `0xD169D26D` | **Decimal**: `3513373293`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **18** | **16** | **86** | **4** |

---

### Golem #009 — Ejecutor Rayante

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.05m` (Relación visual en escena)
- **Rol Táctico**: *Resistencia pesada para combate de arena*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Sartenes (`sartenes`) — *[Común]*
- **1x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **2x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **1x** Engranajes desgastados (`engranajes_desgastados`) — *[Común]*
- **2x** Tubos de cobre (`tubos_cobre`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `engranajes_desgastados:1|fusibles_fundidos:1|resortes_reloj:2|sartenes:2|tubos_cobre:2`
- **Hash FNV-1a Hexadecimal**: `0xC159E906` | **Decimal**: `3243895046`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **18** | **15** | **107** | **13** |

---

### Golem #010 — Rastreador Engranado

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `0.92m` (Relación visual en escena)
- **Rol Táctico**: *Tanque defensivo frontal de alto blindaje*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Engranajes desgastados (`engranajes_desgastados`) — *[Común]*
- **2x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **1x** Cadenas de hierro (`cadenas_hierro`) — *[Común]*
- **2x** Manómetros (`manometros`) — *[Poco común]*
- **1x** Alambre de cobre (`alambre_cobre`) — *[Común]*
- **1x** Sartenes (`sartenes`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `alambre_cobre:1|brujulas_magneticas:2|cadenas_hierro:1|engranajes_desgastados:2|manometros:2|sartenes:1`
- **Hash FNV-1a Hexadecimal**: `0x55BF77CD` | **Decimal**: `1438611405`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **15** | **14** | **109** | **13** |

---

### Golem #011 — Titán Eléctrico

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.19m` (Relación visual en escena)
- **Rol Táctico**: *Sostenimiento térmico y control de caldera*

#### 🧩 Componentes Requeridos (3 Tipos de Piezas):
- **1x** Tapas de alcantarilla (`tapas_alcantarilla`) — *[Común]*
- **1x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **1x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `fusibles_fundidos:1|tapas_alcantarilla:1|tuercas_gigantes:1`
- **Hash FNV-1a Hexadecimal**: `0x7CBED73C` | **Decimal**: `2092881724`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **19** | **14** | **89** | **4** |

---

### Golem #012 — Caminante Térmico

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.24m` (Relación visual en escena)
- **Rol Táctico**: *Autómata polivalente de exploración*

#### 🧩 Componentes Requeridos (4 Tipos de Piezas):
- **2x** Válvulas de vapor (`valvulas_vapor`) — *[Poco común]*
- **2x** Tubos de cobre (`tubos_cobre`) — *[Común]*
- **1x** Manómetros (`manometros`) — *[Poco común]*
- **1x** Transistores (`transistores`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `manometros:1|transistores:1|tubos_cobre:2|valvulas_vapor:2`
- **Hash FNV-1a Hexadecimal**: `0x9BA4AFBF` | **Decimal**: `2611261375`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **24** | **8** | **124** | **4** |

---

### Golem #013 — Gólem Astral

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `0.94m` (Relación visual en escena)
- **Rol Táctico**: *Coloso impenetrable de contención*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **1x** Relojes de bolsillo rotos (`relojes_bolsillo`) — *[Poco común]*
- **2x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*
- **1x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **2x** Clavos oxidados (`clavos_oxidados`) — *[Común]*
- **1x** Sartenes (`sartenes`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cables_deshilachados:1|clavos_oxidados:2|relojes_bolsillo:1|sartenes:1|tornillos_pernos:2`
- **Hash FNV-1a Hexadecimal**: `0xA046639B` | **Decimal**: `2688967579`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **15** | **16** | **82** | **9** |

---

### Golem #014 — Centinela Neumático

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `0.91m` (Relación visual en escena)
- **Rol Táctico**: *Disruptor galvánico de alta frecuencia*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **1x** Tapas de alcantarilla (`tapas_alcantarilla`) — *[Común]*
- **2x** Ollas de cocinar (`ollas_cocinar`) — *[Común]*
- **2x** Alambre de cobre (`alambre_cobre`) — *[Común]*
- **2x** Residuos de carbón (`residuos_carbon`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `alambre_cobre:2|brujulas_magneticas:2|ollas_cocinar:2|residuos_carbon:2|tapas_alcantarilla:1`
- **Hash FNV-1a Hexadecimal**: `0x942182D0` | **Decimal**: `2485224144`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **15** | **109** | **14** |

---

### Golem #015 — Defensor Singular

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.09m` (Relación visual en escena)
- **Rol Táctico**: *Unidad de vanguardia para zonas de PK*

#### 🧩 Componentes Requeridos (4 Tipos de Piezas):
- **2x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **1x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **1x** Placas de latón (`placas_laton`) — *[Común]*
- **2x** Tubos de cobre (`tubos_cobre`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cables_deshilachados:2|placas_laton:1|tubos_cobre:2|tuercas_gigantes:1`
- **Hash FNV-1a Hexadecimal**: `0xEBBBA912` | **Decimal**: `3954944274`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **13** | **106** | **8** |

---

### Golem #016 — Ensamblaje Brillante

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.25m` (Relación visual en escena)
- **Rol Táctico**: *Asesino ágil de choque veloz*

#### 🧩 Componentes Requeridos (4 Tipos de Piezas):
- **1x** Clavos oxidados (`clavos_oxidados`) — *[Común]*
- **1x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*
- **2x** Tubos de cobre (`tubos_cobre`) — *[Común]*
- **2x** Latas de conserva (`latas_conserva`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bombillas_filamento:1|clavos_oxidados:1|latas_conserva:2|tubos_cobre:2`
- **Hash FNV-1a Hexadecimal**: `0x018349FC` | **Decimal**: `25381372`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **9** | **133** | **4** |

---

### Golem #017 — Guardián Articulado

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `1.07m` (Relación visual en escena)
- **Rol Táctico**: *Atacante rápido de primera línea*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Relojes de bolsillo rotos (`relojes_bolsillo`) — *[Poco común]*
- **2x** Ollas de cocinar (`ollas_cocinar`) — *[Común]*
- **1x** Engranajes desgastados (`engranajes_desgastados`) — *[Común]*
- **2x** Clavos oxidados (`clavos_oxidados`) — *[Común]*
- **2x** Tapas de alcantarilla (`tapas_alcantarilla`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `clavos_oxidados:2|engranajes_desgastados:1|ollas_cocinar:2|relojes_bolsillo:2|tapas_alcantarilla:2`
- **Hash FNV-1a Hexadecimal**: `0x3712FB9D` | **Decimal**: `923990941`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **21** | **95** | **11** |

---

### Golem #018 — Cruzado Baterión

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.05m` (Relación visual en escena)
- **Rol Táctico**: *Francotirador de pulso fotónico*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Manómetros (`manometros`) — *[Poco común]*
- **2x** Sartenes (`sartenes`) — *[Común]*
- **1x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **2x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **2x** Placas de latón (`placas_laton`) — *[Común]*
- **1x** Cadenas de hierro (`cadenas_hierro`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cadenas_hierro:1|manometros:2|palancas_interruptor:2|placas_laton:2|sartenes:2|tuercas_gigantes:1`
- **Hash FNV-1a Hexadecimal**: `0x8A8EB1CD` | **Decimal**: `2324607437`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **17** | **29** | **120** | **4** |

---

### Golem #019 — Poblador Espejado

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.05m` (Relación visual en escena)
- **Rol Táctico**: *Resistencia pesada para combate de arena*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **1x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **2x** Cadenas de hierro (`cadenas_hierro`) — *[Común]*
- **1x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **2x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*
- **2x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cables_deshilachados:1|cadenas_hierro:2|palancas_interruptor:2|tornillos_pernos:2|tubos_vacio:1`
- **Hash FNV-1a Hexadecimal**: `0xA27E4485` | **Decimal**: `2726184069`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **19** | **20** | **84** | **6** |

---

### Golem #020 — Fundidor Etéreo

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `0.98m` (Relación visual en escena)
- **Rol Táctico**: *Tanque defensivo frontal de alto blindaje*

#### 🧩 Componentes Requeridos (4 Tipos de Piezas):
- **2x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **2x** Tubos de cobre (`tubos_cobre`) — *[Común]*
- **2x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **1x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `resortes_reloj:2|tornillos_pernos:1|tubos_cobre:2|tuercas_gigantes:2`
- **Hash FNV-1a Hexadecimal**: `0xBD867C61` | **Decimal**: `3179707489`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **14** | **102** | **12** |

---

### Golem #021 — Vigía Humeante

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.08m` (Relación visual en escena)
- **Rol Táctico**: *Sostenimiento térmico y control de caldera*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **2x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*
- **1x** Tubos de cobre (`tubos_cobre`) — *[Común]*
- **1x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **2x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **2x** Sartenes (`sartenes`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `palancas_interruptor:2|residuos_carbon:2|sartenes:2|tornillos_pernos:2|tubos_cobre:1|tuercas_gigantes:1`
- **Hash FNV-1a Hexadecimal**: `0x93C44D85` | **Decimal**: `2479115653`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **24** | **105** | **4** |

---

### Golem #022 — Leviatán Relicario

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.01m` (Relación visual en escena)
- **Rol Táctico**: *Autómata polivalente de exploración*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Tapas de alcantarilla (`tapas_alcantarilla`) — *[Común]*
- **2x** Sartenes (`sartenes`) — *[Común]*
- **1x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **2x** Lentes de televisor viejo (`lentes_tv_viejo`) — *[Poco común]*
- **2x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **1x** Placas de latón (`placas_laton`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cables_deshilachados:2|lentes_tv_viejo:2|placas_laton:1|sartenes:2|tapas_alcantarilla:2|tuercas_gigantes:1`
- **Hash FNV-1a Hexadecimal**: `0xFA46FC3E` | **Decimal**: `4198956094`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **25** | **83** | **14** |

---

### Golem #023 — Vanguardia Calderero

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.22m` (Relación visual en escena)
- **Rol Táctico**: *Coloso impenetrable de contención*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **1x** Sartenes (`sartenes`) — *[Común]*
- **2x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **2x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **1x** Alambre de cobre (`alambre_cobre`) — *[Común]*
- **2x** Tapas de alcantarilla (`tapas_alcantarilla`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `alambre_cobre:1|fusibles_fundidos:2|residuos_carbon:2|sartenes:1|tapas_alcantarilla:2`
- **Hash FNV-1a Hexadecimal**: `0xCA17E69A` | **Decimal**: `3390563994`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **20** | **17** | **96** | **6** |

---

### Golem #024 — Autómata Neumático

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.27m` (Relación visual en escena)
- **Rol Táctico**: *Disruptor galvánico de alta frecuencia*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **1x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **2x** Alambre de cobre (`alambre_cobre`) — *[Común]*
- **1x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **1x** Cadenas de hierro (`cadenas_hierro`) — *[Común]*
- **2x** Tubos de cobre (`tubos_cobre`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `alambre_cobre:2|cadenas_hierro:1|resortes_reloj:1|tubos_cobre:2|tuercas_gigantes:1`
- **Hash FNV-1a Hexadecimal**: `0x40794150` | **Decimal**: `1081688400`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **15** | **12** | **101** | **12** |

---

### Golem #025 — Protector Rotor

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `0.98m` (Relación visual en escena)
- **Rol Táctico**: *Unidad de vanguardia para zonas de PK*

#### 🧩 Componentes Requeridos (4 Tipos de Piezas):
- **1x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **1x** Tubos de cobre (`tubos_cobre`) — *[Común]*
- **2x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **1x** Sartenes (`sartenes`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cables_deshilachados:2|palancas_interruptor:1|sartenes:1|tubos_cobre:1`
- **Hash FNV-1a Hexadecimal**: `0x1C52735B` | **Decimal**: `475165531`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **13** | **95** | **8** |

---

### Golem #026 — Portador Engrane

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `1.05m` (Relación visual en escena)
- **Rol Táctico**: *Asesino ágil de choque veloz*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **2x** Cadenas de hierro (`cadenas_hierro`) — *[Común]*
- **1x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*
- **1x** Clavos oxidados (`clavos_oxidados`) — *[Común]*
- **2x** Placas de latón (`placas_laton`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cables_deshilachados:2|cadenas_hierro:2|clavos_oxidados:1|placas_laton:2|tornillos_pernos:1`
- **Hash FNV-1a Hexadecimal**: `0x14B6C49E` | **Decimal**: `347522206`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **17** | **22** | **88** | **8** |

---

### Golem #027 — Monolito Ígneo

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.05m` (Relación visual en escena)
- **Rol Táctico**: *Atacante rápido de primera línea*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **1x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **1x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **1x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*
- **2x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **2x** Latas de conserva (`latas_conserva`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bombillas_filamento:1|cables_deshilachados:1|fusibles_fundidos:1|latas_conserva:2|residuos_carbon:2|tuercas_gigantes:2`
- **Hash FNV-1a Hexadecimal**: `0xC9BFF469` | **Decimal**: `3384800361`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **19** | **12** | **129** | **6** |

---

### Golem #028 — Chatarrero Pistón

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `0.99m` (Relación visual en escena)
- **Rol Táctico**: *Francotirador de pulso fotónico*

#### 🧩 Componentes Requeridos (4 Tipos de Piezas):
- **2x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **1x** Válvulas de vapor (`valvulas_vapor`) — *[Poco común]*
- **1x** Ollas de cocinar (`ollas_cocinar`) — *[Común]*
- **2x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `ollas_cocinar:1|residuos_carbon:2|resortes_reloj:2|valvulas_vapor:1`
- **Hash FNV-1a Hexadecimal**: `0xC6F5FDE9` | **Decimal**: `3338010089`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **18** | **10** | **104** | **12** |

---

### Golem #029 — Excavador Espejado

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.00m` (Relación visual en escena)
- **Rol Táctico**: *Resistencia pesada para combate de arena*

#### 🧩 Componentes Requeridos (4 Tipos de Piezas):
- **2x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **2x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **2x** Manómetros (`manometros`) — *[Poco común]*
- **1x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cables_deshilachados:2|manometros:2|tornillos_pernos:1|tuercas_gigantes:2`
- **Hash FNV-1a Hexadecimal**: `0x02EF7032` | **Decimal**: `49246258`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **14** | **116** | **8** |

---

### Golem #030 — Patrullero Luminoso

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.07m` (Relación visual en escena)
- **Rol Táctico**: *Tanque defensivo frontal de alto blindaje*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Engranajes desgastados (`engranajes_desgastados`) — *[Común]*
- **1x** Placas de latón (`placas_laton`) — *[Común]*
- **2x** Manómetros (`manometros`) — *[Poco común]*
- **1x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*
- **1x** Ollas de cocinar (`ollas_cocinar`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `engranajes_desgastados:2|manometros:2|ollas_cocinar:1|placas_laton:1|tornillos_pernos:1`
- **Hash FNV-1a Hexadecimal**: `0xE77B23C2` | **Decimal**: `3883606978`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **17** | **18** | **125** | **6** |

---

### Golem #031 — Basilisco Humeante

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.12m` (Relación visual en escena)
- **Rol Táctico**: *Sostenimiento térmico y control de caldera*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **1x** Manómetros (`manometros`) — *[Poco común]*
- **2x** Válvulas de vapor (`valvulas_vapor`) — *[Poco común]*
- **1x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*
- **2x** Tapas de alcantarilla (`tapas_alcantarilla`) — *[Común]*
- **2x** Relojes de bolsillo rotos (`relojes_bolsillo`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bombillas_filamento:1|manometros:1|relojes_bolsillo:2|tapas_alcantarilla:2|valvulas_vapor:2`
- **Hash FNV-1a Hexadecimal**: `0x793BAEF5` | **Decimal**: `2033954549`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **19** | **13** | **106** | **10** |

---

### Golem #032 — Guardia Térmico

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `0.92m` (Relación visual en escena)
- **Rol Táctico**: *Autómata polivalente de exploración*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **1x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **1x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **2x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*
- **2x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **1x** Tapas de alcantarilla (`tapas_alcantarilla`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cables_deshilachados:1|residuos_carbon:2|tapas_alcantarilla:1|tornillos_pernos:2|tubos_vacio:1`
- **Hash FNV-1a Hexadecimal**: `0x55377679` | **Decimal**: `1429698169`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **20** | **16** | **101** | **6** |

---

### Golem #033 — Baluarte Calderero

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `0.90m` (Relación visual en escena)
- **Rol Táctico**: *Coloso impenetrable de contención*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **1x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **1x** Ollas de cocinar (`ollas_cocinar`) — *[Común]*
- **1x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **1x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **1x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cables_deshilachados:1|ollas_cocinar:1|palancas_interruptor:1|residuos_carbon:1|resortes_reloj:1`
- **Hash FNV-1a Hexadecimal**: `0x122D70F2` | **Decimal**: `304967922`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **12** | **97** | **10** |

---

### Golem #034 — Cazador Diódico

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `0.93m` (Relación visual en escena)
- **Rol Táctico**: *Disruptor galvánico de alta frecuencia*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Sartenes (`sartenes`) — *[Común]*
- **2x** Engranajes desgastados (`engranajes_desgastados`) — *[Común]*
- **2x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*
- **1x** Placas de latón (`placas_laton`) — *[Común]*
- **2x** Cadenas de hierro (`cadenas_hierro`) — *[Común]*
- **1x** Tubos de cobre (`tubos_cobre`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cadenas_hierro:2|engranajes_desgastados:2|placas_laton:1|sartenes:2|tornillos_pernos:2|tubos_cobre:1`
- **Hash FNV-1a Hexadecimal**: `0xEC1A4F0C` | **Decimal**: `3961147148`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **26** | **92** | **6** |

---

### Golem #035 — Artillero Chispeante

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.15m` (Relación visual en escena)
- **Rol Táctico**: *Unidad de vanguardia para zonas de PK*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Alambre de cobre (`alambre_cobre`) — *[Común]*
- **2x** Manómetros (`manometros`) — *[Poco común]*
- **1x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **1x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **2x** Ollas de cocinar (`ollas_cocinar`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `alambre_cobre:2|cables_deshilachados:1|manometros:2|ollas_cocinar:2|resortes_reloj:1`
- **Hash FNV-1a Hexadecimal**: `0x36BFF5CA` | **Decimal**: `918549962`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **15** | **11** | **119** | **13** |

---

### Golem #036 — Espectro Engrane

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `1.18m` (Relación visual en escena)
- **Rol Táctico**: *Asesino ágil de choque veloz*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Clavos oxidados (`clavos_oxidados`) — *[Común]*
- **2x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **1x** Transistores (`transistores`) — *[Poco común]*
- **2x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **1x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **2x** Alambre de cobre (`alambre_cobre`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `alambre_cobre:2|brujulas_magneticas:2|clavos_oxidados:2|resortes_reloj:1|transistores:1|tuercas_gigantes:2`
- **Hash FNV-1a Hexadecimal**: `0xBC9AE523` | **Decimal**: `3164267811`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **18** | **13** | **82** | **17** |

---

### Golem #037 — Coloso Articulado

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `1.25m` (Relación visual en escena)
- **Rol Táctico**: *Atacante rápido de primera línea*

#### 🧩 Componentes Requeridos (4 Tipos de Piezas):
- **1x** Engranajes desgastados (`engranajes_desgastados`) — *[Común]*
- **1x** Manómetros (`manometros`) — *[Poco común]*
- **1x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **2x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `brujulas_magneticas:1|engranajes_desgastados:1|manometros:1|tornillos_pernos:2`
- **Hash FNV-1a Hexadecimal**: `0x08CC7119` | **Decimal**: `147616025`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **13** | **102** | **8** |

---

### Golem #038 — Destructor Baterión

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.13m` (Relación visual en escena)
- **Rol Táctico**: *Francotirador de pulso fotónico*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **1x** Placas de latón (`placas_laton`) — *[Común]*
- **2x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **2x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **2x** Tapas de alcantarilla (`tapas_alcantarilla`) — *[Común]*
- **2x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cables_deshilachados:2|fusibles_fundidos:2|placas_laton:1|tapas_alcantarilla:2|tornillos_pernos:2`
- **Hash FNV-1a Hexadecimal**: `0x51093E24` | **Decimal**: `1359560228`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **20** | **21** | **84** | **8** |

---

### Golem #039 — Servidor Vaporizado

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.19m` (Relación visual en escena)
- **Rol Táctico**: *Resistencia pesada para combate de arena*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Transistores (`transistores`) — *[Poco común]*
- **1x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **1x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **2x** Válvulas de vapor (`valvulas_vapor`) — *[Poco común]*
- **1x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **2x** Lentes de televisor viejo (`lentes_tv_viejo`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cables_deshilachados:1|lentes_tv_viejo:2|residuos_carbon:1|transistores:1|tuercas_gigantes:1|valvulas_vapor:2`
- **Hash FNV-1a Hexadecimal**: `0xADE1CE82` | **Decimal**: `2917256834`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **24** | **10** | **94** | **12** |

---

### Golem #040 — Forjador Luminoso

- **Clasificación**: Tier 1 (Básico)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.22m` (Relación visual en escena)
- **Rol Táctico**: *Tanque defensivo frontal de alto blindaje*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **1x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*
- **2x** Ollas de cocinar (`ollas_cocinar`) — *[Común]*
- **1x** Relojes de bolsillo rotos (`relojes_bolsillo`) — *[Poco común]*
- **1x** Clavos oxidados (`clavos_oxidados`) — *[Común]*
- **1x** Engranajes desgastados (`engranajes_desgastados`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bombillas_filamento:1|clavos_oxidados:1|engranajes_desgastados:1|ollas_cocinar:2|relojes_bolsillo:1`
- **Hash FNV-1a Hexadecimal**: `0x41BF626D` | **Decimal**: `1103061613`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **16** | **14** | **107** | **8** |

---

### Golem #041 — Ejecutor Eléctrico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.09m` (Relación visual en escena)
- **Rol Táctico**: *Sostenimiento térmico y control de caldera*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **1x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*
- **2x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **2x** Engranajes desgastados (`engranajes_desgastados`) — *[Común]*
- **1x** Cadenas de hierro (`cadenas_hierro`) — *[Común]*
- **2x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **2x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **1x** Condensador alta presión (`condensador_presion`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bobinas_tesla:1|brujulas_magneticas:2|cadenas_hierro:1|condensador_presion:1|engranajes_desgastados:2|fusibles_fundidos:2|tubos_vacio:2`
- **Hash FNV-1a Hexadecimal**: `0xEA25E45E` | **Decimal**: `3928351838`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **38** | **16** | **129** | **14** |

---

### Golem #042 — Rastreador Térmico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.06m` (Relación visual en escena)
- **Rol Táctico**: *Autómata polivalente de exploración*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **2x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **2x** Engranajes desgastados (`engranajes_desgastados`) — *[Común]*
- **2x** Transistores (`transistores`) — *[Poco común]*
- **1x** Condensador alta presión (`condensador_presion`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `condensador_presion:1|engranajes_desgastados:2|motor_vapor:1|residuos_carbon:1|tornillos_pernos:2|transistores:2`
- **Hash FNV-1a Hexadecimal**: `0xC37B9C33` | **Decimal**: `3279658035`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **33** | **18** | **136** | **8** |

---

### Golem #043 — Titán Calderero

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.09m` (Relación visual en escena)
- **Rol Táctico**: *Coloso impenetrable de contención*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **1x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **1x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **2x** Placas de latón (`placas_laton`) — *[Común]*
- **1x** Válvulas de vapor (`valvulas_vapor`) — *[Poco común]*
- **1x** Lentes de televisor viejo (`lentes_tv_viejo`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `brujulas_magneticas:1|cables_deshilachados:1|lentes_tv_viejo:1|placas_laton:2|valvulas_vapor:1`
- **Hash FNV-1a Hexadecimal**: `0x5EE50887` | **Decimal**: `1592068231`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **24** | **18** | **111** | **14** |

---

### Golem #044 — Caminante Mecánico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `1.08m` (Relación visual en escena)
- **Rol Táctico**: *Disruptor galvánico de alta frecuencia*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Relojes de bolsillo rotos (`relojes_bolsillo`) — *[Poco común]*
- **2x** Válvulas de vapor (`valvulas_vapor`) — *[Poco común]*
- **1x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **2x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **2x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **2x** Cables deshilachados (`cables_deshilachados`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `brujulas_magneticas:2|cables_deshilachados:2|fusibles_fundidos:1|giroscopio_precision:2|relojes_bolsillo:1|valvulas_vapor:2`
- **Hash FNV-1a Hexadecimal**: `0x48CCFE74` | **Decimal**: `1221394036`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **28** | **22** | **110** | **19** |

---

### Golem #045 — Gólem Presurizado

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `0.97m` (Relación visual en escena)
- **Rol Táctico**: *Unidad de vanguardia para zonas de PK*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **2x** Latas de conserva (`latas_conserva`) — *[Común]*
- **2x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **1x** Manómetros (`manometros`) — *[Poco común]*
- **2x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **2x** Condensador alta presión (`condensador_presion`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `brujulas_magneticas:2|condensador_presion:2|dinamo_galvanica:2|latas_conserva:2|manometros:1|palancas_interruptor:2`
- **Hash FNV-1a Hexadecimal**: `0xE052941B` | **Decimal**: `3763508251`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **33** | **16** | **186** | **12** |

---

### Golem #046 — Centinela Volcánico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.19m` (Relación visual en escena)
- **Rol Táctico**: *Asesino ágil de choque veloz*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **1x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*
- **1x** Válvulas de vapor (`valvulas_vapor`) — *[Poco común]*
- **1x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **1x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **1x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bobinas_tesla:1|condensador_presion:1|motor_vapor:1|resortes_reloj:1|tornillos_pernos:1|valvulas_vapor:1`
- **Hash FNV-1a Hexadecimal**: `0x9D737C1D` | **Decimal**: `2641591325`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **37** | **15** | **137** | **11** |

---

### Golem #047 — Defensor Conductivo

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `0.95m` (Relación visual en escena)
- **Rol Táctico**: *Atacante rápido de primera línea*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Placas de latón (`placas_laton`) — *[Común]*
- **2x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **2x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **2x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **1x** Alambre de cobre (`alambre_cobre`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `alambre_cobre:1|dinamo_galvanica:2|placas_laton:2|residuos_carbon:2|resortes_reloj:2`
- **Hash FNV-1a Hexadecimal**: `0xDD374926` | **Decimal**: `3711387942`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **33** | **19** | **127** | **17** |

---

### Golem #048 — Ensamblaje Broncíneo

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `1.15m` (Relación visual en escena)
- **Rol Táctico**: *Francotirador de pulso fotónico*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **2x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **1x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **2x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **2x** Latas de conserva (`latas_conserva`) — *[Común]*
- **1x** Ollas de cocinar (`ollas_cocinar`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `engranajes_bronce:2|fusibles_fundidos:2|latas_conserva:2|ollas_cocinar:1|palancas_interruptor:2|tuercas_gigantes:1`
- **Hash FNV-1a Hexadecimal**: `0x069AE1ED` | **Decimal**: `110813677`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **27** | **33** | **134** | **6** |

---

### Golem #049 — Guardián Rayante

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.07m` (Relación visual en escena)
- **Rol Táctico**: *Resistencia pesada para combate de arena*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **2x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*
- **1x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*
- **2x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **2x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **1x** Latas de conserva (`latas_conserva`) — *[Común]*
- **2x** Alambre de cobre (`alambre_cobre`) — *[Común]*
- **1x** Clavos oxidados (`clavos_oxidados`) — *[Común]*
- **2x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `alambre_cobre:2|bobinas_tesla:1|bombillas_filamento:2|clavos_oxidados:1|dinamo_galvanica:2|fusibles_fundidos:2|latas_conserva:1|palancas_interruptor:2`
- **Hash FNV-1a Hexadecimal**: `0x6F105FC9` | **Decimal**: `1863344073`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **43** | **18** | **146** | **10** |

---

### Golem #050 — Cruzado Galvánico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `0.90m` (Relación visual en escena)
- **Rol Táctico**: *Tanque defensivo frontal de alto blindaje*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **1x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **1x** Tubos de cobre (`tubos_cobre`) — *[Común]*
- **2x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **2x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **2x** Residuos de carbón (`residuos_carbon`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `dinamo_galvanica:2|fusibles_fundidos:2|residuos_carbon:2|resortes_reloj:1|tubos_cobre:1`
- **Hash FNV-1a Hexadecimal**: `0x0D74AB87` | **Decimal**: `225749895`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **37** | **12** | **136** | **10** |

---

### Golem #051 — Poblador Eléctrico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.08m` (Relación visual en escena)
- **Rol Táctico**: *Sostenimiento térmico y control de caldera*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **1x** Diodos LED (`diodos_led`) — *[Raro]*
- **2x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **1x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*
- **1x** Sartenes (`sartenes`) — *[Común]*
- **1x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **2x** Ollas de cocinar (`ollas_cocinar`) — *[Común]*
- **1x** Alambre de cobre (`alambre_cobre`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `alambre_cobre:1|dinamo_galvanica:1|diodos_led:1|fusibles_fundidos:2|ollas_cocinar:2|sartenes:1|tornillos_pernos:1`
- **Hash FNV-1a Hexadecimal**: `0xDADD71ED` | **Decimal**: `3671945709`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **34** | **21** | **118** | **8** |

---

### Golem #052 — Fundidor Filamento

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.12m` (Relación visual en escena)
- **Rol Táctico**: *Autómata polivalente de exploración*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Placas de latón (`placas_laton`) — *[Común]*
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **1x** Manómetros (`manometros`) — *[Poco común]*
- **1x** Clavos oxidados (`clavos_oxidados`) — *[Común]*
- **2x** Diodos LED (`diodos_led`) — *[Raro]*
- **2x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `clavos_oxidados:1|diodos_led:2|manometros:1|motor_vapor:1|palancas_interruptor:2|placas_laton:2`
- **Hash FNV-1a Hexadecimal**: `0xF6C2A1FA` | **Decimal**: `4139950586`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **34** | **22** | **121** | **6** |

---

### Golem #053 — Vigía Óptico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.15m` (Relación visual en escena)
- **Rol Táctico**: *Coloso impenetrable de contención*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Cristal cuarzo resonante (`cristal_fuerza`) — *[Raro]*
- **1x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **2x** Alambre de cobre (`alambre_cobre`) — *[Común]*
- **1x** Transistores (`transistores`) — *[Poco común]*
- **1x** Engranajes desgastados (`engranajes_desgastados`) — *[Común]*
- **1x** Ollas de cocinar (`ollas_cocinar`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `alambre_cobre:2|brujulas_magneticas:1|cristal_fuerza:2|engranajes_desgastados:1|ollas_cocinar:1|transistores:1`
- **Hash FNV-1a Hexadecimal**: `0xFEEE95BF` | **Decimal**: `4277048767`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **24** | **15** | **112** | **23** |

---

### Golem #054 — Leviatán Neumático

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.10m` (Relación visual en escena)
- **Rol Táctico**: *Disruptor galvánico de alta frecuencia*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **1x** Placas de latón (`placas_laton`) — *[Común]*
- **2x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **1x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **2x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **1x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **1x** Relojes de bolsillo rotos (`relojes_bolsillo`) — *[Poco común]*
- **2x** Condensador alta presión (`condensador_presion`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `baterias_alquimicas:2|condensador_presion:2|engranajes_bronce:1|motor_vapor:2|placas_laton:1|relojes_bolsillo:1|tubos_vacio:1`
- **Hash FNV-1a Hexadecimal**: `0x3FA91689` | **Decimal**: `1068045961`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **35** | **21** | **198** | **9** |

---

### Golem #055 — Vanguardia Presurizado

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `0.94m` (Relación visual en escena)
- **Rol Táctico**: *Unidad de vanguardia para zonas de PK*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **2x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **1x** Alambre de cobre (`alambre_cobre`) — *[Común]*
- **1x** Cadenas de hierro (`cadenas_hierro`) — *[Común]*
- **1x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **2x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **2x** Relojes de bolsillo rotos (`relojes_bolsillo`) — *[Poco común]*
- **1x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `alambre_cobre:1|cadenas_hierro:1|engranajes_bronce:1|fusibles_fundidos:1|motor_vapor:2|relojes_bolsillo:2|resortes_reloj:2`
- **Hash FNV-1a Hexadecimal**: `0x67ABCE41` | **Decimal**: `1739312705`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **35** | **21** | **114** | **23** |

---

### Golem #056 — Autómata Plasmático

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.05m` (Relación visual en escena)
- **Rol Táctico**: *Asesino ágil de choque veloz*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **1x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **2x** Lentes de televisor viejo (`lentes_tv_viejo`) — *[Poco común]*
- **2x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **2x** Transistores (`transistores`) — *[Poco común]*
- **2x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **1x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **2x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `baterias_alquimicas:2|bobinas_tesla:2|giroscopio_precision:1|lentes_tv_viejo:2|residuos_carbon:1|transistores:2|tuercas_gigantes:2`
- **Hash FNV-1a Hexadecimal**: `0xEA386292` | **Decimal**: `3929563794`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **39** | **20** | **161** | **12** |

---

### Golem #057 — Protector Lúmen

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.17m` (Relación visual en escena)
- **Rol Táctico**: *Atacante rápido de primera línea*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **2x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **1x** Tapas de alcantarilla (`tapas_alcantarilla`) — *[Común]*
- **1x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **1x** Transistores (`transistores`) — *[Poco común]*
- **2x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **2x** Relojes de bolsillo rotos (`relojes_bolsillo`) — *[Poco común]*
- **1x** Cristal cuarzo resonante (`cristal_fuerza`) — *[Raro]*
- **2x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:2|brujulas_magneticas:1|cristal_fuerza:1|palancas_interruptor:2|relojes_bolsillo:2|tapas_alcantarilla:1|transistores:1|tubos_vacio:2`
- **Hash FNV-1a Hexadecimal**: `0x72168904` | **Decimal**: `1914079492`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **31** | **19** | **111** | **32** |

---

### Golem #058 — Portador Baterión

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `0.92m` (Relación visual en escena)
- **Rol Táctico**: *Francotirador de pulso fotónico*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **2x** Cadenas de hierro (`cadenas_hierro`) — *[Común]*
- **2x** Latas de conserva (`latas_conserva`) — *[Común]*
- **2x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **1x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `baterias_alquimicas:1|brujulas_magneticas:2|cadenas_hierro:2|fusibles_fundidos:2|latas_conserva:2`
- **Hash FNV-1a Hexadecimal**: `0x22D62172` | **Decimal**: `584458610`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **27** | **17** | **159** | **13** |

---

### Golem #059 — Monolito Rayante

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.14m` (Relación visual en escena)
- **Rol Táctico**: *Resistencia pesada para combate de arena*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **1x** Manómetros (`manometros`) — *[Poco común]*
- **2x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **2x** Relojes de bolsillo rotos (`relojes_bolsillo`) — *[Poco común]*
- **1x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **2x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **1x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **1x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:2|baterias_alquimicas:2|dinamo_galvanica:1|manometros:1|palancas_interruptor:1|relojes_bolsillo:2|tubos_vacio:1`
- **Hash FNV-1a Hexadecimal**: `0xE0A1785B` | **Decimal**: `3768678491`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **30** | **14** | **177** | **24** |

---

### Golem #060 — Chatarrero Galvánico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.27m` (Relación visual en escena)
- **Rol Táctico**: *Tanque defensivo frontal de alto blindaje*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **1x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **1x** Relojes de bolsillo rotos (`relojes_bolsillo`) — *[Poco común]*
- **1x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **1x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **2x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `brujulas_magneticas:1|dinamo_galvanica:2|engranajes_bronce:1|palancas_interruptor:1|relojes_bolsillo:1`
- **Hash FNV-1a Hexadecimal**: `0x070BE752` | **Decimal**: `118220626`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **33** | **20** | **112** | **12** |

---

### Golem #061 — Excavador Eléctrico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.13m` (Relación visual en escena)
- **Rol Táctico**: *Sostenimiento térmico y control de caldera*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Cadenas de hierro (`cadenas_hierro`) — *[Común]*
- **2x** Transistores (`transistores`) — *[Poco común]*
- **2x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **1x** Latas de conserva (`latas_conserva`) — *[Común]*
- **1x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cadenas_hierro:2|fusibles_fundidos:2|latas_conserva:1|resortes_reloj:1|transistores:2`
- **Hash FNV-1a Hexadecimal**: `0x19196226` | **Decimal**: `421093926`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **30** | **15** | **112** | **10** |

---

### Golem #062 — Patrullero Térmico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.29m` (Relación visual en escena)
- **Rol Táctico**: *Autómata polivalente de exploración*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Manómetros (`manometros`) — *[Poco común]*
- **1x** Transistores (`transistores`) — *[Poco común]*
- **2x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **1x** Lentes de televisor viejo (`lentes_tv_viejo`) — *[Poco común]*
- **1x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*
- **2x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bobinas_tesla:1|bombillas_filamento:2|lentes_tv_viejo:1|manometros:2|motor_vapor:2|transistores:1`
- **Hash FNV-1a Hexadecimal**: `0xA99305D7` | **Decimal**: `2844984791`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **39** | **11** | **156** | **9** |

---

### Golem #063 — Basilisco Calderero

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.03m` (Relación visual en escena)
- **Rol Táctico**: *Coloso impenetrable de contención*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Diodos LED (`diodos_led`) — *[Raro]*
- **2x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **1x** Sartenes (`sartenes`) — *[Común]*
- **2x** Válvulas de vapor (`valvulas_vapor`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `diodos_led:2|motor_vapor:1|residuos_carbon:2|sartenes:1|valvulas_vapor:2`
- **Hash FNV-1a Hexadecimal**: `0x7E9FD10F` | **Decimal**: `2124402959`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **40** | **15** | **126** | **6** |

---

### Golem #064 — Guardia Neumático

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.29m` (Relación visual en escena)
- **Rol Táctico**: *Disruptor galvánico de alta frecuencia*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **1x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **2x** Transistores (`transistores`) — *[Poco común]*
- **1x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **2x** Válvulas de vapor (`valvulas_vapor`) — *[Poco común]*
- **1x** Manómetros (`manometros`) — *[Poco común]*
- **1x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **2x** Cristal cuarzo resonante (`cristal_fuerza`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `brujulas_magneticas:1|condensador_presion:1|cristal_fuerza:2|manometros:1|transistores:2|tuercas_gigantes:1|valvulas_vapor:2`
- **Hash FNV-1a Hexadecimal**: `0x23D16696` | **Decimal**: `600925846`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **32** | **14** | **144** | **19** |

---

### Golem #065 — Baluarte Resonante

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.04m` (Relación visual en escena)
- **Rol Táctico**: *Unidad de vanguardia para zonas de PK*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **1x** Latas de conserva (`latas_conserva`) — *[Común]*
- **2x** Sartenes (`sartenes`) — *[Común]*
- **1x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **1x** Ollas de cocinar (`ollas_cocinar`) — *[Común]*
- **1x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **2x** Diodos LED (`diodos_led`) — *[Raro]*
- **1x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `baterias_alquimicas:1|brujulas_magneticas:1|diodos_led:2|latas_conserva:1|ollas_cocinar:1|sartenes:2|tubos_vacio:1`
- **Hash FNV-1a Hexadecimal**: `0x315EEEC9` | **Decimal**: `828305097`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **33** | **20** | **147** | **9** |

---

### Golem #066 — Cazador Plasmático

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.05m` (Relación visual en escena)
- **Rol Táctico**: *Asesino ágil de choque veloz*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **1x** Latas de conserva (`latas_conserva`) — *[Común]*
- **1x** Transistores (`transistores`) — *[Poco común]*
- **2x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **1x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `dinamo_galvanica:1|fusibles_fundidos:2|latas_conserva:1|transistores:1|tubos_vacio:2`
- **Hash FNV-1a Hexadecimal**: `0x82BC15A3` | **Decimal**: `2193364387`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **40** | **12** | **118** | **6** |

---

### Golem #067 — Artillero Conductivo

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.14m` (Relación visual en escena)
- **Rol Táctico**: *Atacante rápido de primera línea*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **1x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **1x** Lentes de televisor viejo (`lentes_tv_viejo`) — *[Poco común]*
- **1x** Válvulas de vapor (`valvulas_vapor`) — *[Poco común]*
- **2x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **1x** Placas de latón (`placas_laton`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `baterias_alquimicas:2|fusibles_fundidos:2|lentes_tv_viejo:1|placas_laton:1|residuos_carbon:1|valvulas_vapor:1`
- **Hash FNV-1a Hexadecimal**: `0xC64D4AE0` | **Decimal**: `3326954208`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **28** | **15** | **168** | **9** |

---

### Golem #068 — Espectro Centellante

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.18m` (Relación visual en escena)
- **Rol Táctico**: *Francotirador de pulso fotónico*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Relojes de bolsillo rotos (`relojes_bolsillo`) — *[Poco común]*
- **1x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **2x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **2x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*
- **1x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **2x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bombillas_filamento:2|cables_deshilachados:1|palancas_interruptor:1|relojes_bolsillo:2|resortes_reloj:2|tornillos_pernos:2`
- **Hash FNV-1a Hexadecimal**: `0x2D7E7A02` | **Decimal**: `763263490`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **21** | **17** | **127** | **21** |

---

### Golem #069 — Coloso Titánico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `0.94m` (Relación visual en escena)
- **Rol Táctico**: *Resistencia pesada para combate de arena*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **2x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **1x** Diodos LED (`diodos_led`) — *[Raro]*
- **1x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*
- **1x** Placas de latón (`placas_laton`) — *[Común]*
- **1x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **2x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **2x** Transistores (`transistores`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `brujulas_magneticas:2|cables_deshilachados:2|diodos_led:1|palancas_interruptor:1|placas_laton:1|tornillos_pernos:1|transistores:2`
- **Hash FNV-1a Hexadecimal**: `0x94618C19` | **Decimal**: `2489420825`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **31** | **18** | **106** | **15** |

---

### Golem #070 — Destructor Engranado

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `1.25m` (Relación visual en escena)
- **Rol Táctico**: *Tanque defensivo frontal de alto blindaje*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **2x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **2x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **1x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **2x** Transistores (`transistores`) — *[Poco común]*
- **2x** Lentes de televisor viejo (`lentes_tv_viejo`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `engranajes_bronce:2|lentes_tv_viejo:2|motor_vapor:1|transistores:2|tubos_vacio:1|tuercas_gigantes:2`
- **Hash FNV-1a Hexadecimal**: `0x19CCD6B2` | **Decimal**: `432854706`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **37** | **29** | **114** | **12** |

---

### Golem #071 — Servidor Fotonico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.10m` (Relación visual en escena)
- **Rol Táctico**: *Sostenimiento térmico y control de caldera*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **2x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **2x** Alambre de cobre (`alambre_cobre`) — *[Común]*
- **1x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **1x** Diodos LED (`diodos_led`) — *[Raro]*
- **2x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **1x** Clavos oxidados (`clavos_oxidados`) — *[Común]*
- **1x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `alambre_cobre:2|clavos_oxidados:1|diodos_led:1|giroscopio_precision:1|tornillos_pernos:1|tubos_vacio:2|tuercas_gigantes:2`
- **Hash FNV-1a Hexadecimal**: `0x2C1F137E` | **Decimal**: `740234110`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **30** | **23** | **105** | **10** |

---

### Golem #072 — Forjador Autómata

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `1.13m` (Relación visual en escena)
- **Rol Táctico**: *Autómata polivalente de exploración*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **2x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*
- **1x** Lentes de televisor viejo (`lentes_tv_viejo`) — *[Poco común]*
- **2x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **1x** Clavos oxidados (`clavos_oxidados`) — *[Común]*
- **1x** Residuos de carbón (`residuos_carbon`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `clavos_oxidados:1|engranajes_bronce:2|lentes_tv_viejo:1|residuos_carbon:1|resortes_reloj:2|tornillos_pernos:2`
- **Hash FNV-1a Hexadecimal**: `0x8020B8C0` | **Decimal**: `2149628096`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **21** | **28** | **110** | **16** |

---

### Golem #073 — Ejecutor Férreo

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `1.06m` (Relación visual en escena)
- **Rol Táctico**: *Coloso impenetrable de contención*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **2x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **2x** Relojes de bolsillo rotos (`relojes_bolsillo`) — *[Poco común]*
- **1x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **2x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **2x** Manómetros (`manometros`) — *[Poco común]*
- **2x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **1x** Sartenes (`sartenes`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:2|cables_deshilachados:2|giroscopio_precision:1|manometros:2|relojes_bolsillo:2|resortes_reloj:2|sartenes:1`
- **Hash FNV-1a Hexadecimal**: `0x43C2713E` | **Decimal**: `1136816446`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **22** | **20** | **143** | **37** |

---

### Golem #074 — Rastreador Voltaico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.01m` (Relación visual en escena)
- **Rol Táctico**: *Disruptor galvánico de alta frecuencia*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **1x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **2x** Alambre de cobre (`alambre_cobre`) — *[Común]*
- **1x** Placas de latón (`placas_laton`) — *[Común]*
- **2x** Transistores (`transistores`) — *[Poco común]*
- **1x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `alambre_cobre:2|bobinas_tesla:1|placas_laton:1|resortes_reloj:1|transistores:2|tuercas_gigantes:1`
- **Hash FNV-1a Hexadecimal**: `0xD3BBA169` | **Decimal**: `3552289129`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **34** | **17** | **109** | **14** |

---

### Golem #075 — Titán Presurizado

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.19m` (Relación visual en escena)
- **Rol Táctico**: *Unidad de vanguardia para zonas de PK*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Cadenas de hierro (`cadenas_hierro`) — *[Común]*
- **2x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **1x** Diodos LED (`diodos_led`) — *[Raro]*
- **2x** Placas de latón (`placas_laton`) — *[Común]*
- **2x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **1x** Sartenes (`sartenes`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cadenas_hierro:2|diodos_led:1|placas_laton:2|residuos_carbon:2|resortes_reloj:2|sartenes:1`
- **Hash FNV-1a Hexadecimal**: `0x0B3A4B96` | **Decimal**: `188369814`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **26** | **25** | **123** | **14** |

---

### Golem #076 — Caminante Volcánico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.15m` (Relación visual en escena)
- **Rol Táctico**: *Asesino ágil de choque veloz*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **2x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **2x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **2x** Transistores (`transistores`) — *[Poco común]*
- **1x** Manómetros (`manometros`) — *[Poco común]*
- **1x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **2x** Ollas de cocinar (`ollas_cocinar`) — *[Común]*
- **1x** Tornillos y pernos (`tornillos_pernos`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `condensador_presion:2|manometros:1|ollas_cocinar:2|residuos_carbon:1|tornillos_pernos:1|transistores:2|tuercas_gigantes:2`
- **Hash FNV-1a Hexadecimal**: `0xB138A6E0` | **Decimal**: `2973279968`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **29** | **23** | **190** | **6** |

---

### Golem #077 — Gólem Lúmen

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.20m` (Relación visual en escena)
- **Rol Táctico**: *Atacante rápido de primera línea*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*
- **1x** Manómetros (`manometros`) — *[Poco común]*
- **1x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **1x** Engranajes desgastados (`engranajes_desgastados`) — *[Común]*
- **1x** Sartenes (`sartenes`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bombillas_filamento:2|engranajes_desgastados:1|manometros:1|residuos_carbon:1|sartenes:1`
- **Hash FNV-1a Hexadecimal**: `0xD4D903CD` | **Decimal**: `3570992077`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **22** | **16** | **153** | **7** |

---

### Golem #078 — Centinela Broncíneo

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `1.02m` (Relación visual en escena)
- **Rol Táctico**: *Francotirador de pulso fotónico*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **1x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **2x** Manómetros (`manometros`) — *[Poco común]*
- **2x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **1x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*
- **1x** Placas de latón (`placas_laton`) — *[Común]*
- **1x** Cables deshilachados (`cables_deshilachados`) — *[Común]*
- **2x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **2x** Alambre de cobre (`alambre_cobre`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `alambre_cobre:2|bombillas_filamento:1|cables_deshilachados:1|engranajes_bronce:2|manometros:2|palancas_interruptor:1|placas_laton:1|residuos_carbon:2`
- **Hash FNV-1a Hexadecimal**: `0xFAB261F3` | **Decimal**: `4205994483`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **23** | **30** | **171** | **12** |

---

### Golem #079 — Defensor Vaporizado

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.01m` (Relación visual en escena)
- **Rol Táctico**: *Resistencia pesada para combate de arena*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **1x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **1x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **1x** Transistores (`transistores`) — *[Poco común]*
- **2x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **1x** Relojes de bolsillo rotos (`relojes_bolsillo`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `baterias_alquimicas:1|condensador_presion:1|palancas_interruptor:2|relojes_bolsillo:1|transistores:1|tubos_vacio:1`
- **Hash FNV-1a Hexadecimal**: `0x1AC5AFA2` | **Decimal**: `449163170`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **28** | **16** | **155** | **9** |

---

### Golem #080 — Ensamblaje Galvánico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.17m` (Relación visual en escena)
- **Rol Táctico**: *Tanque defensivo frontal de alto blindaje*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **2x** Tapas de alcantarilla (`tapas_alcantarilla`) — *[Común]*
- **1x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **1x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **1x** Sartenes (`sartenes`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `baterias_alquimicas:1|dinamo_galvanica:1|motor_vapor:1|resortes_reloj:1|sartenes:1|tapas_alcantarilla:2`
- **Hash FNV-1a Hexadecimal**: `0x2C2BA939` | **Decimal**: `741058873`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **32** | **21** | **135** | **10** |

---

### Golem #081 — Guardián Eléctrico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `0.93m` (Relación visual en escena)
- **Rol Táctico**: *Sostenimiento térmico y control de caldera*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Tapas de alcantarilla (`tapas_alcantarilla`) — *[Común]*
- **1x** Latas de conserva (`latas_conserva`) — *[Común]*
- **2x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **2x** Transistores (`transistores`) — *[Poco común]*
- **2x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **2x** Cables deshilachados (`cables_deshilachados`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cables_deshilachados:2|dinamo_galvanica:2|latas_conserva:1|tapas_alcantarilla:1|transistores:2|tubos_vacio:2`
- **Hash FNV-1a Hexadecimal**: `0x089550F7` | **Decimal**: `144003319`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **46** | **16** | **123** | **10** |

---

### Golem #082 — Cruzado Autómata

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `1.09m` (Relación visual en escena)
- **Rol Táctico**: *Autómata polivalente de exploración*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **1x** Latas de conserva (`latas_conserva`) — *[Común]*
- **2x** Ollas de cocinar (`ollas_cocinar`) — *[Común]*
- **2x** Cadenas de hierro (`cadenas_hierro`) — *[Común]*
- **1x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **2x** Tubos de cobre (`tubos_cobre`) — *[Común]*
- **1x** Válvulas de vapor (`valvulas_vapor`) — *[Poco común]*
- **1x** Relojes de bolsillo rotos (`relojes_bolsillo`) — *[Poco común]*
- **2x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `brujulas_magneticas:1|cadenas_hierro:2|engranajes_bronce:2|latas_conserva:1|ollas_cocinar:2|relojes_bolsillo:1|tubos_cobre:2|valvulas_vapor:1`
- **Hash FNV-1a Hexadecimal**: `0x7630071A` | **Decimal**: `1982859034`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **23** | **31** | **144** | **12** |

---

### Golem #083 — Poblador Calderero

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.05m` (Relación visual en escena)
- **Rol Táctico**: *Coloso impenetrable de contención*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **1x** Sartenes (`sartenes`) — *[Común]*
- **1x** Lentes de televisor viejo (`lentes_tv_viejo`) — *[Poco común]*
- **1x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **1x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **1x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **2x** Latas de conserva (`latas_conserva`) — *[Común]*
- **2x** Cadenas de hierro (`cadenas_hierro`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cadenas_hierro:2|condensador_presion:1|fusibles_fundidos:1|latas_conserva:2|lentes_tv_viejo:1|resortes_reloj:1|sartenes:1`
- **Hash FNV-1a Hexadecimal**: `0x7FB6CCFC` | **Decimal**: `2142686460`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **23** | **18** | **142** | **13** |

---

### Golem #084 — Fundidor Diódico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.23m` (Relación visual en escena)
- **Rol Táctico**: *Disruptor galvánico de alta frecuencia*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **1x** Latas de conserva (`latas_conserva`) — *[Común]*
- **2x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **2x** Residuos de carbón (`residuos_carbon`) — *[Común]*
- **2x** Engranajes desgastados (`engranajes_desgastados`) — *[Común]*
- **2x** Diodos LED (`diodos_led`) — *[Raro]*
- **1x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **1x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `brujulas_magneticas:1|diodos_led:2|engranajes_desgastados:2|latas_conserva:1|palancas_interruptor:1|residuos_carbon:2|resortes_reloj:2`
- **Hash FNV-1a Hexadecimal**: `0x1D84CBF7` | **Decimal**: `495242231`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **29** | **15** | **124** | **18** |

---

### Golem #085 — Vigía Presurizado

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.06m` (Relación visual en escena)
- **Rol Táctico**: *Unidad de vanguardia para zonas de PK*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **1x** Clavos oxidados (`clavos_oxidados`) — *[Común]*
- **2x** Alambre de cobre (`alambre_cobre`) — *[Común]*
- **2x** Válvulas de vapor (`valvulas_vapor`) — *[Poco común]*
- **1x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*
- **1x** Latas de conserva (`latas_conserva`) — *[Común]*
- **2x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **2x** Manómetros (`manometros`) — *[Poco común]*
- **2x** Ollas de cocinar (`ollas_cocinar`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `alambre_cobre:2|bobinas_tesla:1|clavos_oxidados:1|latas_conserva:1|manometros:2|ollas_cocinar:2|resortes_reloj:2|valvulas_vapor:2`
- **Hash FNV-1a Hexadecimal**: `0xBBEA32B8` | **Decimal**: `3152687800`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **33** | **18** | **164** | **19** |

---

### Golem #086 — Leviatán Plasmático

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `0.98m` (Relación visual en escena)
- **Rol Táctico**: *Asesino ágil de choque veloz*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **2x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **2x** Ollas de cocinar (`ollas_cocinar`) — *[Común]*
- **1x** Válvulas de vapor (`valvulas_vapor`) — *[Poco común]*
- **2x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **1x** Tubos de cobre (`tubos_cobre`) — *[Común]*
- **1x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **2x** Clavos oxidados (`clavos_oxidados`) — *[Común]*
- **2x** Latas de conserva (`latas_conserva`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:2|clavos_oxidados:2|dinamo_galvanica:2|latas_conserva:2|ollas_cocinar:2|tubos_cobre:1|tubos_vacio:1|valvulas_vapor:1`
- **Hash FNV-1a Hexadecimal**: `0xC7F44E8B` | **Decimal**: `3354676875`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **35** | **17** | **139** | **17** |

---

### Golem #087 — Vanguardia Articulado

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `0.93m` (Relación visual en escena)
- **Rol Táctico**: *Atacante rápido de primera línea*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **1x** Manómetros (`manometros`) — *[Poco común]*
- **2x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **2x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*
- **2x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **2x** Latas de conserva (`latas_conserva`) — *[Común]*
- **2x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **1x** Residuos de carbón (`residuos_carbon`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bombillas_filamento:2|brujulas_magneticas:2|latas_conserva:2|manometros:1|palancas_interruptor:2|residuos_carbon:1|resortes_reloj:2`
- **Hash FNV-1a Hexadecimal**: `0x915AC831` | **Decimal**: `2438645809`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **22** | **16** | **173** | **20** |

---

### Golem #088 — Autómata Centellante

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.29m` (Relación visual en escena)
- **Rol Táctico**: *Francotirador de pulso fotónico*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **2x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **2x** Lentes de televisor viejo (`lentes_tv_viejo`) — *[Poco común]*
- **2x** Diodos LED (`diodos_led`) — *[Raro]*
- **1x** Cristal cuarzo resonante (`cristal_fuerza`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cristal_fuerza:1|diodos_led:2|lentes_tv_viejo:2|motor_vapor:1|tuercas_gigantes:2`
- **Hash FNV-1a Hexadecimal**: `0x895DA93B` | **Decimal**: `2304616763`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **36** | **17** | **114** | **18** |

---

### Golem #089 — Protector Titánico

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `1.13m` (Relación visual en escena)
- **Rol Táctico**: *Resistencia pesada para combate de arena*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **1x** Engranajes desgastados (`engranajes_desgastados`) — *[Común]*
- **1x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **2x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **1x** Placas de latón (`placas_laton`) — *[Común]*
- **2x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **1x** Clavos oxidados (`clavos_oxidados`) — *[Común]*
- **2x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `clavos_oxidados:1|engranajes_bronce:1|engranajes_desgastados:1|palancas_interruptor:2|placas_laton:1|tubos_vacio:2|tuercas_gigantes:2`
- **Hash FNV-1a Hexadecimal**: `0x1A48A703` | **Decimal**: `440968963`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **28** | **31** | **111** | **7** |

---

### Golem #090 — Portador Engranado

- **Clasificación**: Tier 2 (Intermedio)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `1.09m` (Relación visual en escena)
- **Rol Táctico**: *Tanque defensivo frontal de alto blindaje*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **1x** Latas de conserva (`latas_conserva`) — *[Común]*
- **2x** Lentes de televisor viejo (`lentes_tv_viejo`) — *[Poco común]*
- **2x** Alambre de cobre (`alambre_cobre`) — *[Común]*
- **2x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **2x** Tuercas gigantes (`tuercas_gigantes`) — *[Común]*
- **2x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*
- **2x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `alambre_cobre:2|bombillas_filamento:2|brujulas_magneticas:2|latas_conserva:1|lentes_tv_viejo:2|resortes_reloj:2|tuercas_gigantes:2`
- **Hash FNV-1a Hexadecimal**: `0xC7FDE643` | **Decimal**: `3355305539`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **22** | **16** | **139** | **29** |

---

### Golem #091 — Monolito Primigenio

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.23m` (Relación visual en escena)
- **Rol Táctico**: *Sostenimiento térmico y control de caldera*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **2x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **2x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **2x** Cristal cuarzo resonante (`cristal_fuerza`) — *[Raro]*
- **2x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **1x** Cerebro de autómata (`cerebro_automata`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `brujulas_magneticas:2|cerebro_automata:1|cristal_fuerza:2|dinamo_galvanica:2|motor_vapor:1|nucleo_mana:2`
- **Hash FNV-1a Hexadecimal**: `0xE35B53CE` | **Decimal**: `3814413262`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **64** | **15** | **133** | **24** |

---

### Golem #092 — Chatarrero Térmico

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `0.94m` (Relación visual en escena)
- **Rol Táctico**: *Autómata polivalente de exploración*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **2x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **1x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **1x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **2x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **2x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **2x** Manómetros (`manometros`) — *[Poco común]*
- **2x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:1|bateria_plasma:2|condensador_presion:1|corazon_caldera:2|engranajes_bronce:2|manometros:2|motor_vapor:1|resortes_reloj:2`
- **Hash FNV-1a Hexadecimal**: `0x88272D78` | **Decimal**: `2284268920`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **51** | **46** | **200** | **24** |

---

### Golem #093 — Excavador Calderero

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.17m` (Relación visual en escena)
- **Rol Táctico**: *Coloso impenetrable de contención*

#### 🧩 Componentes Requeridos (9 Tipos de Piezas):
- **1x** Reactor de éter (`reactor_eter`) — *[Épico]*
- **2x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **2x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **2x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **2x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **1x** Manómetros (`manometros`) — *[Poco común]*
- **2x** Lentes de televisor viejo (`lentes_tv_viejo`) — *[Poco común]*
- **1x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **1x** Diodos LED (`diodos_led`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:2|condensador_presion:2|diodos_led:1|lentes_tv_viejo:2|manometros:1|motor_vapor:2|nucleo_mana:1|palancas_interruptor:2|reactor_eter:1`
- **Hash FNV-1a Hexadecimal**: `0x8734D83C` | **Decimal**: `2268387388`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **58** | **20** | **191** | **26** |

---

### Golem #094 — Patrullero Manático

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.26m` (Relación visual en escena)
- **Rol Táctico**: *Disruptor galvánico de alta frecuencia*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **1x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **2x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **2x** Lentes de televisor viejo (`lentes_tv_viejo`) — *[Poco común]*
- **1x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **2x** Reactor de éter (`reactor_eter`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:1|condensador_presion:1|dinamo_galvanica:2|giroscopio_precision:1|lentes_tv_viejo:2|reactor_eter:2`
- **Hash FNV-1a Hexadecimal**: `0xA0D37A02` | **Decimal**: `2698213890`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **58** | **22** | **166** | **22** |

---

### Golem #095 — Basilisco Chispeante

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.05m` (Relación visual en escena)
- **Rol Táctico**: *Unidad de vanguardia para zonas de PK*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **2x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **1x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*
- **2x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **1x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*
- **1x** Cristal cuarzo resonante (`cristal_fuerza`) — *[Raro]*
- **2x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **2x** Válvulas de vapor (`valvulas_vapor`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:2|bateria_plasma:2|bobinas_tesla:1|cristal_fuerza:1|embolo_titanio:1|matriz_optica_solar:2|motor_vapor:1|valvulas_vapor:2`
- **Hash FNV-1a Hexadecimal**: `0xC9C46A2A` | **Decimal**: `3385092650`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **59** | **23** | **140** | **40** |

---

### Golem #096 — Guardia Volcánico

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.19m` (Relación visual en escena)
- **Rol Táctico**: *Asesino ágil de choque veloz*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **2x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **1x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*
- **1x** Cerebro de autómata (`cerebro_automata`) — *[Épico]*
- **2x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **1x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **2x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **2x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bombillas_filamento:1|cerebro_automata:1|embolo_titanio:2|giroscopio_precision:2|matriz_optica_solar:1|motor_vapor:2|nucleo_mana:2`
- **Hash FNV-1a Hexadecimal**: `0xC0CBE35E` | **Decimal**: `3234587486`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **64** | **42** | **158** | **17** |

---

### Golem #097 — Baluarte Lúmen

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.02m` (Relación visual en escena)
- **Rol Táctico**: *Atacante rápido de primera línea*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **1x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **2x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **1x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **2x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **2x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*
- **1x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **2x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **2x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:2|bobinas_tesla:2|corazon_caldera:1|giroscopio_precision:2|matriz_optica_solar:1|nucleo_mana:1|resortes_reloj:2|tubos_vacio:2`
- **Hash FNV-1a Hexadecimal**: `0x2F0FC2A6` | **Decimal**: `789562022`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **55** | **35** | **143** | **37** |

---

### Golem #098 — Cazador Pistón

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.11m` (Relación visual en escena)
- **Rol Táctico**: *Francotirador de pulso fotónico*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **1x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **2x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*
- **2x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **1x** Transistores (`transistores`) — *[Poco común]*
- **2x** Condensador alta presión (`condensador_presion`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bobinas_tesla:2|condensador_presion:2|corazon_caldera:2|engranajes_bronce:1|nucleo_mana:2|transistores:1`
- **Hash FNV-1a Hexadecimal**: `0x5642F67A` | **Decimal**: `1447229050`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **58** | **37** | **176** | **9** |

---

### Golem #099 — Artillero Rayante

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.11m` (Relación visual en escena)
- **Rol Táctico**: *Resistencia pesada para combate de arena*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **2x** Diodos LED (`diodos_led`) — *[Raro]*
- **2x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **2x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*
- **2x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **2x** Núcleo de maná (`nucleo_mana`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:2|bobinas_tesla:2|dinamo_galvanica:2|diodos_led:2|motor_vapor:2|nucleo_mana:2`
- **Hash FNV-1a Hexadecimal**: `0xE5DE43B2` | **Decimal**: `3856548786`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **81** | **16** | **136** | **20** |

---

### Golem #100 — Espectro Vaporoso

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.03m` (Relación visual en escena)
- **Rol Táctico**: *Tanque defensivo frontal de alto blindaje*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **2x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **2x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **1x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*
- **1x** Antenas de radio (`antenas_radio`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:1|bobinas_tesla:1|corazon_caldera:2|dinamo_galvanica:2|nucleo_mana:2`
- **Hash FNV-1a Hexadecimal**: `0xE2898353` | **Decimal**: `3800662867`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **58** | **31** | **134** | **14** |

---

### Golem #101 — Coloso Humeante

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `0.93m` (Relación visual en escena)
- **Rol Táctico**: *Sostenimiento térmico y control de caldera*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **1x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **2x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **2x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **2x** Cerebro de autómata (`cerebro_automata`) — *[Épico]*
- **2x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:2|brujulas_magneticas:2|cerebro_automata:2|condensador_presion:1|embolo_titanio:2|resortes_reloj:2`
- **Hash FNV-1a Hexadecimal**: `0xD2ED5188` | **Decimal**: `3538768264`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **46** | **31** | **166** | **36** |

---

### Golem #102 — Destructor Teslico

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.26m` (Relación visual en escena)
- **Rol Táctico**: *Autómata polivalente de exploración*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **1x** Cristal cuarzo resonante (`cristal_fuerza`) — *[Raro]*
- **1x** Manómetros (`manometros`) — *[Poco común]*
- **1x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **2x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:2|cristal_fuerza:1|dinamo_galvanica:2|embolo_titanio:1|manometros:1|motor_vapor:1`
- **Hash FNV-1a Hexadecimal**: `0x55212E29` | **Decimal**: `1428237865`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **62** | **24** | **163** | **15** |

---

### Golem #103 — Servidor Calderero

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `0.93m` (Relación visual en escena)
- **Rol Táctico**: *Coloso impenetrable de contención*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **2x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **1x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **2x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **1x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*
- **2x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:1|bobinas_tesla:2|condensador_presion:2|embolo_titanio:1|giroscopio_precision:2|matriz_optica_solar:1`
- **Hash FNV-1a Hexadecimal**: `0x972E38B0` | **Decimal**: `2536388784`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **48** | **33** | **182** | **16** |

---

### Golem #104 — Forjador Diódico

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.26m` (Relación visual en escena)
- **Rol Táctico**: *Disruptor galvánico de alta frecuencia*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **1x** Reactor de éter (`reactor_eter`) — *[Épico]*
- **2x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **2x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **2x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **2x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*
- **2x** Diodos LED (`diodos_led`) — *[Raro]*
- **1x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **2x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `baterias_alquimicas:2|bombillas_filamento:2|diodos_led:2|engranajes_bronce:1|giroscopio_precision:2|matriz_optica_solar:2|nucleo_mana:2|reactor_eter:1`
- **Hash FNV-1a Hexadecimal**: `0x2758BCFD` | **Decimal**: `660126973`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **58** | **30** | **203** | **22** |

---

### Golem #105 — Ejecutor Presurizado

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.00m` (Relación visual en escena)
- **Rol Táctico**: *Unidad de vanguardia para zonas de PK*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **2x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **1x** Válvulas de vapor (`valvulas_vapor`) — *[Poco común]*
- **2x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **1x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*
- **1x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*
- **1x** Manómetros (`manometros`) — *[Poco común]*
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `baterias_alquimicas:2|bombillas_filamento:1|corazon_caldera:2|embolo_titanio:1|manometros:1|motor_vapor:1|valvulas_vapor:1`
- **Hash FNV-1a Hexadecimal**: `0x87458522` | **Decimal**: `2269480226`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **34** | **38** | **210** | **9** |

---

### Golem #106 — Rastreador Plasmático

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.03m` (Relación visual en escena)
- **Rol Táctico**: *Asesino ágil de choque veloz*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **2x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **1x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **1x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **1x** Reactor de éter (`reactor_eter`) — *[Épico]*
- **1x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **2x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **2x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:1|baterias_alquimicas:2|bombillas_filamento:2|dinamo_galvanica:2|giroscopio_precision:1|matriz_optica_solar:1|motor_vapor:1|reactor_eter:1`
- **Hash FNV-1a Hexadecimal**: `0xF2F666F6` | **Decimal**: `4076234486`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **60** | **21** | **214** | **16** |

---

### Golem #107 — Titán Ígneo

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.04m` (Relación visual en escena)
- **Rol Táctico**: *Atacante rápido de primera línea*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **1x** Cristal cuarzo resonante (`cristal_fuerza`) — *[Raro]*
- **1x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **2x** Manómetros (`manometros`) — *[Poco común]*
- **2x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **1x** Reactor de éter (`reactor_eter`) — *[Épico]*
- **2x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **2x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **2x** Condensador alta presión (`condensador_presion`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:1|baterias_alquimicas:2|condensador_presion:2|corazon_caldera:2|cristal_fuerza:1|manometros:2|reactor_eter:1|resortes_reloj:2`
- **Hash FNV-1a Hexadecimal**: `0x7511FBA4` | **Decimal**: `1964112804`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **45** | **32** | **260** | **22** |

---

### Golem #108 — Caminante Dragónico

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.17m` (Relación visual en escena)
- **Rol Táctico**: *Francotirador de pulso fotónico*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **1x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **1x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **1x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **2x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **1x** Diodos LED (`diodos_led`) — *[Raro]*
- **2x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **2x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **1x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:2|condensador_presion:1|diodos_led:1|engranajes_bronce:1|fusibles_fundidos:1|nucleo_mana:2|resortes_reloj:1|tubos_vacio:2`
- **Hash FNV-1a Hexadecimal**: `0x6CE36B1F` | **Decimal**: `1826843423`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **58** | **23** | **166** | **26** |

---

### Golem #109 — Gólem Vaporizado

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `0.92m` (Relación visual en escena)
- **Rol Táctico**: *Resistencia pesada para combate de arena*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **2x** Diodos LED (`diodos_led`) — *[Raro]*
- **1x** Cerebro de autómata (`cerebro_automata`) — *[Épico]*
- **1x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **1x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*
- **1x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **2x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **1x** Cristal cuarzo resonante (`cristal_fuerza`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cerebro_automata:1|condensador_presion:2|corazon_caldera:1|cristal_fuerza:1|diodos_led:2|embolo_titanio:1|motor_vapor:1|resortes_reloj:1`
- **Hash FNV-1a Hexadecimal**: `0xF332D8E5` | **Decimal**: `4080195813`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **47** | **30** | **173** | **17** |

---

### Golem #110 — Centinela Engranado

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `1.25m` (Relación visual en escena)
- **Rol Táctico**: *Tanque defensivo frontal de alto blindaje*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **1x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **2x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **1x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **2x** Cristal cuarzo resonante (`cristal_fuerza`) — *[Raro]*
- **2x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **1x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **1x** Antenas de radio (`antenas_radio`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:1|baterias_alquimicas:1|cristal_fuerza:2|engranajes_bronce:2|giroscopio_precision:1|motor_vapor:2|nucleo_mana:1`
- **Hash FNV-1a Hexadecimal**: `0xC5E014C3` | **Decimal**: `3319796931`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **44** | **31** | **157** | **24** |

---

### Golem #111 — Defensor Relojero

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `0.91m` (Relación visual en escena)
- **Rol Táctico**: *Sostenimiento térmico y control de caldera*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **1x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **2x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **2x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **2x** Diodos LED (`diodos_led`) — *[Raro]*
- **2x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **1x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **1x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:1|bombillas_filamento:1|diodos_led:2|engranajes_bronce:2|giroscopio_precision:2|matriz_optica_solar:1|palancas_interruptor:2`
- **Hash FNV-1a Hexadecimal**: `0x50F44EBF` | **Decimal**: `1358188223`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **45** | **43** | **155** | **16** |

---

### Golem #112 — Ensamblaje Filamento

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Luminosa** (`LUMINOUS`) — *Fotónica de vacío, vence a Éter (+40%)*
- **Color Emisivo PBR**: `#2ECC71` (RGB: `46, 204, 113`)
- **Escala de Altura**: `1.17m` (Relación visual en escena)
- **Rol Táctico**: *Autómata polivalente de exploración*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **1x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **2x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **2x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **2x** Manómetros (`manometros`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:2|baterias_alquimicas:2|corazon_caldera:1|manometros:2|matriz_optica_solar:2`
- **Hash FNV-1a Hexadecimal**: `0xA23FCBAF` | **Decimal**: `2722089903`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **28** | **24** | **220** | **35** |

---

### Golem #113 — Guardián Férreo

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `0.91m` (Relación visual en escena)
- **Rol Táctico**: *Coloso impenetrable de contención*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **2x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **1x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **1x** Brújulas magnéticas (`brujulas_magneticas`) — *[Poco común]*
- **1x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **2x** Transistores (`transistores`) — *[Poco común]*
- **2x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **1x** Diodos LED (`diodos_led`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:2|baterias_alquimicas:1|brujulas_magneticas:1|dinamo_galvanica:1|diodos_led:1|giroscopio_precision:2|motor_vapor:1|transistores:2`
- **Hash FNV-1a Hexadecimal**: `0x911E9C5B` | **Decimal**: `2434702427`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **47** | **25** | **162** | **24** |

---

### Golem #114 — Cruzado Neumático

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.09m` (Relación visual en escena)
- **Rol Táctico**: *Disruptor galvánico de alta frecuencia*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **2x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **1x** Relojes de bolsillo rotos (`relojes_bolsillo`) — *[Poco común]*
- **1x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **1x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **1x** Cristal cuarzo resonante (`cristal_fuerza`) — *[Raro]*
- **2x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **2x** Corazón de caldera (`corazon_caldera`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `corazon_caldera:2|cristal_fuerza:1|engranajes_bronce:2|nucleo_mana:2|palancas_interruptor:1|relojes_bolsillo:1|tubos_vacio:1`
- **Hash FNV-1a Hexadecimal**: `0x09594F6B` | **Decimal**: `156847979`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **46** | **45** | **136** | **16** |

---

### Golem #115 — Poblador Singular

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.08m` (Relación visual en escena)
- **Rol Táctico**: *Unidad de vanguardia para zonas de PK*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Diodos LED (`diodos_led`) — *[Raro]*
- **1x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **2x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **1x** Válvulas de vapor (`valvulas_vapor`) — *[Poco común]*
- **1x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **2x** Núcleo de maná (`nucleo_mana`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `condensador_presion:2|diodos_led:1|engranajes_bronce:1|matriz_optica_solar:1|nucleo_mana:2|valvulas_vapor:1`
- **Hash FNV-1a Hexadecimal**: `0x59F38689` | **Decimal**: `1509131913`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **49** | **22** | **176** | **16** |

---

### Golem #116 — Fundidor Místico

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.02m` (Relación visual en escena)
- **Rol Táctico**: *Asesino ágil de choque veloz*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **1x** Reactor de éter (`reactor_eter`) — *[Épico]*
- **1x** Diodos LED (`diodos_led`) — *[Raro]*
- **1x** Cerebro de autómata (`cerebro_automata`) — *[Épico]*
- **1x** Cristal cuarzo resonante (`cristal_fuerza`) — *[Raro]*
- **1x** Núcleo de maná (`nucleo_mana`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `baterias_alquimicas:1|cerebro_automata:1|cristal_fuerza:1|diodos_led:1|nucleo_mana:1|reactor_eter:1`
- **Hash FNV-1a Hexadecimal**: `0x64A8237A` | **Decimal**: `1688740730`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **58** | **16** | **167** | **14** |

---

### Golem #117 — Vigía Ígneo

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.13m` (Relación visual en escena)
- **Rol Táctico**: *Atacante rápido de primera línea*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **2x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **2x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **1x** Manómetros (`manometros`) — *[Poco común]*
- **2x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*
- **1x** Condensador alta presión (`condensador_presion`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:2|condensador_presion:1|embolo_titanio:2|engranajes_bronce:2|manometros:1`
- **Hash FNV-1a Hexadecimal**: `0xCFFB2DBD` | **Decimal**: `3489344957`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **46** | **44** | **184** | **9** |

---

### Golem #118 — Leviatán Pistón

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.28m` (Relación visual en escena)
- **Rol Táctico**: *Francotirador de pulso fotónico*

#### 🧩 Componentes Requeridos (9 Tipos de Piezas):
- **2x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **2x** Relojes de bolsillo rotos (`relojes_bolsillo`) — *[Poco común]*
- **1x** Cerebro de autómata (`cerebro_automata`) — *[Épico]*
- **2x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **1x** Resortes de reloj (`resortes_reloj`) — *[Poco común]*
- **2x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **2x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **2x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **2x** Reactor de éter (`reactor_eter`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:2|cerebro_automata:1|condensador_presion:2|dinamo_galvanica:2|engranajes_bronce:2|motor_vapor:2|reactor_eter:2|relojes_bolsillo:2|resortes_reloj:1`
- **Hash FNV-1a Hexadecimal**: `0xE0B894BE` | **Decimal**: `3770193086`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **70** | **27** | **171** | **29** |

---

### Golem #119 — Vanguardia Vaporizado

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.02m` (Relación visual en escena)
- **Rol Táctico**: *Resistencia pesada para combate de arena*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **2x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **2x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **2x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*
- **2x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **1x** Manómetros (`manometros`) — *[Poco común]*
- **2x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:2|baterias_alquimicas:2|condensador_presion:2|embolo_titanio:2|manometros:1|matriz_optica_solar:2`
- **Hash FNV-1a Hexadecimal**: `0xD900D358` | **Decimal**: `3640709976`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **27** | **29** | **238** | **34** |

---

### Golem #120 — Autómata Galvánico

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.21m` (Relación visual en escena)
- **Rol Táctico**: *Tanque defensivo frontal de alto blindaje*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **1x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **1x** Transistores (`transistores`) — *[Poco común]*
- **1x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **2x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*
- **1x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:1|baterias_alquimicas:1|condensador_presion:1|matriz_optica_solar:1|palancas_interruptor:2|transistores:1`
- **Hash FNV-1a Hexadecimal**: `0x4555E4A0` | **Decimal**: `1163256992`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **40** | **20** | **189** | **16** |

---

### Golem #121 — Protector Primigenio

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.13m` (Relación visual en escena)
- **Rol Táctico**: *Sostenimiento térmico y control de caldera*

#### 🧩 Componentes Requeridos (9 Tipos de Piezas):
- **2x** Reactor de éter (`reactor_eter`) — *[Épico]*
- **1x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*
- **2x** Bombillas de filamento (`bombillas_filamento`) — *[Poco común]*
- **1x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **2x** Válvulas de vapor (`valvulas_vapor`) — *[Poco común]*
- **1x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **1x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **1x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **2x** Palancas de interruptor (`palancas_interruptor`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:1|bobinas_tesla:1|bombillas_filamento:2|condensador_presion:1|engranajes_bronce:1|matriz_optica_solar:1|palancas_interruptor:2|reactor_eter:2|valvulas_vapor:2`
- **Hash FNV-1a Hexadecimal**: `0x8E4F5829` | **Decimal**: `2387564585`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **67** | **27** | **193** | **17** |

---

### Golem #122 — Portador Térmico

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.05m` (Relación visual en escena)
- **Rol Táctico**: *Autómata polivalente de exploración*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **2x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*
- **2x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*
- **2x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **1x** Cristal cuarzo resonante (`cristal_fuerza`) — *[Raro]*
- **1x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **1x** Reactor de éter (`reactor_eter`) — *[Épico]*
- **2x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*
- **2x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `baterias_alquimicas:1|bobinas_tesla:2|cristal_fuerza:1|dinamo_galvanica:2|embolo_titanio:2|motor_vapor:2|reactor_eter:1|tubos_vacio:2`
- **Hash FNV-1a Hexadecimal**: `0xB7CA0C0E` | **Decimal**: `3083471886`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **71** | **29** | **157** | **13** |

---

### Golem #123 — Monolito Férreo

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Mecánica** (`MECHANICAL`) — *Estructura rígida de relojería, vence a Galvánica (+40%)*
- **Color Emisivo PBR**: `#F1C40F` (RGB: `241, 196, 15`)
- **Escala de Altura**: `0.98m` (Relación visual en escena)
- **Rol Táctico**: *Coloso impenetrable de contención*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **1x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **1x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **2x** Cristal cuarzo resonante (`cristal_fuerza`) — *[Raro]*
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **2x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **2x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **2x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **2x** Cerebro de autómata (`cerebro_automata`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `baterias_alquimicas:2|cerebro_automata:2|cristal_fuerza:2|dinamo_galvanica:1|fusibles_fundidos:2|giroscopio_precision:1|motor_vapor:1|nucleo_mana:2`
- **Hash FNV-1a Hexadecimal**: `0x4FE69888` | **Decimal**: `1340512392`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **78** | **22** | **200** | **20** |

---

### Golem #124 — Chatarrero Voltaico

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.16m` (Relación visual en escena)
- **Rol Táctico**: *Disruptor galvánico de alta frecuencia*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **1x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **2x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **1x** Fusibles fundidos (`fusibles_fundidos`) — *[Poco común]*
- **2x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*
- **2x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **2x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **1x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*
- **1x** Reactor de éter (`reactor_eter`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:2|baterias_alquimicas:2|bobinas_tesla:2|condensador_presion:2|embolo_titanio:1|fusibles_fundidos:1|giroscopio_precision:1|reactor_eter:1`
- **Hash FNV-1a Hexadecimal**: `0xC64DC114` | **Decimal**: `3326984468`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **51** | **28** | **230** | **21** |

---

### Golem #125 — Excavador Singular

- **Clasificación**: Tier 3 (Avanzado)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.30m` (Relación visual en escena)
- **Rol Táctico**: *Unidad de vanguardia para zonas de PK*

#### 🧩 Componentes Requeridos (9 Tipos de Piezas):
- **2x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **2x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **2x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **1x** Transistores (`transistores`) — *[Poco común]*
- **1x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **1x** Lentes de televisor viejo (`lentes_tv_viejo`) — *[Poco común]*
- **1x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **2x** Reactor de éter (`reactor_eter`) — *[Épico]*
- **1x** Tubos de vacío (`tubos_vacio`) — *[Poco común]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:1|corazon_caldera:2|dinamo_galvanica:1|engranajes_bronce:2|lentes_tv_viejo:1|nucleo_mana:2|reactor_eter:2|transistores:1|tubos_vacio:1`
- **Hash FNV-1a Hexadecimal**: `0x6D27819E` | **Decimal**: `1831305630`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **69** | **42** | **133** | **17** |

---

### Golem #126 — Patrullero Místico

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.06m` (Relación visual en escena)
- **Rol Táctico**: *Asesino ágil de choque veloz*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **3x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **3x** Reactor de éter (`reactor_eter`) — *[Épico]*
- **3x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **3x** Diodos LED (`diodos_led`) — *[Raro]*
- **2x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **1x** Núcleo de maná (`nucleo_mana`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:3|bateria_plasma:3|corazon_caldera:2|diodos_led:3|nucleo_mana:1|reactor_eter:3`
- **Hash FNV-1a Hexadecimal**: `0xEBCFA13F` | **Decimal**: `3956252991`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **111** | **40** | **187** | **31** |

---

### Golem #127 — Basilisco Conductivo

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Galvánica** (`GALVANIC`) — *Alto voltaje impulsivo, vence a Luminosa (+40%)*
- **Color Emisivo PBR**: `#3498DB` (RGB: `52, 152, 219`)
- **Escala de Altura**: `1.22m` (Relación visual en escena)
- **Rol Táctico**: *Atacante rápido de primera línea*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **1x** Cristal cuarzo resonante (`cristal_fuerza`) — *[Raro]*
- **3x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **1x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **2x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **2x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **2x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `baterias_alquimicas:3|bobinas_tesla:2|cristal_fuerza:1|dinamo_galvanica:2|matriz_optica_solar:1|nucleo_mana:2`
- **Hash FNV-1a Hexadecimal**: `0x24CAA3B0` | **Decimal**: `617259952`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **71** | **21** | **245** | **23** |

---

### Golem #128 — Guardia Dragónico

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.12m` (Relación visual en escena)
- **Rol Táctico**: *Francotirador de pulso fotónico*

#### 🧩 Componentes Requeridos (9 Tipos de Piezas):
- **2x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **2x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **1x** Diodos LED (`diodos_led`) — *[Raro]*
- **2x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **1x** Singularidad etérica (`singularidad_eterica`) — *[Legendario]*
- **3x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **1x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*
- **2x** Reactor de éter (`reactor_eter`) — *[Épico]*
- **3x** Relicario engranajes (`relicario_astral`) — *[Legendario]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bobinas_tesla:1|corazon_caldera:2|diodos_led:1|engranajes_bronce:2|matriz_optica_solar:2|nucleo_mana:3|reactor_eter:2|relicario_astral:3|singularidad_eterica:1`
- **Hash FNV-1a Hexadecimal**: `0x46D47FAB` | **Decimal**: `1188331435`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **100** | **80** | **270** | **32** |

---

### Golem #129 — Baluarte Arcano

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.02m` (Relación visual en escena)
- **Rol Táctico**: *Resistencia pesada para combate de arena*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **2x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **2x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **3x** Relicario engranajes (`relicario_astral`) — *[Legendario]*
- **2x** Corazón primigenio (`corazon_primigenio`) — *[Legendario]*
- **2x** Singularidad etérica (`singularidad_eterica`) — *[Legendario]*
- **2x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **3x** Reactor de éter (`reactor_eter`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `corazon_caldera:2|corazon_primigenio:2|engranajes_bronce:2|nucleo_mana:2|reactor_eter:3|relicario_astral:3|singularidad_eterica:2`
- **Hash FNV-1a Hexadecimal**: `0x19B207C0` | **Decimal**: `431097792`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **112** | **89** | **307** | **30** |

---

### Golem #130 — Cazador Vaporoso

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.02m` (Relación visual en escena)
- **Rol Táctico**: *Tanque defensivo frontal de alto blindaje*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **1x** Singularidad etérica (`singularidad_eterica`) — *[Legendario]*
- **2x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **3x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **2x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **2x** Ojo de dragón mecánico (`ojo_dragon`) — *[Legendario]*
- **1x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*
- **1x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:2|condensador_presion:3|dinamo_galvanica:1|embolo_titanio:1|motor_vapor:2|ojo_dragon:2|singularidad_eterica:1`
- **Hash FNV-1a Hexadecimal**: `0x583C0DB6` | **Decimal**: `1480330678`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **104** | **28** | **233** | **17** |

---

### Golem #131 — Artillero Primigenio

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.20m` (Relación visual en escena)
- **Rol Táctico**: *Sostenimiento térmico y control de caldera*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **3x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **2x** Cerebro de autómata (`cerebro_automata`) — *[Épico]*
- **2x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*
- **3x** Reactor de éter (`reactor_eter`) — *[Épico]*
- **1x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **2x** Corazón primigenio (`corazon_primigenio`) — *[Legendario]*
- **3x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **2x** Cristal cuarzo resonante (`cristal_fuerza`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:1|bobinas_tesla:2|cerebro_automata:2|corazon_caldera:3|corazon_primigenio:2|cristal_fuerza:2|giroscopio_precision:3|reactor_eter:3`
- **Hash FNV-1a Hexadecimal**: `0xBC507BAE` | **Decimal**: `3159391150`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **107** | **70** | **216** | **27** |

---

### Golem #132 — Espectro Relicario

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.00m` (Relación visual en escena)
- **Rol Táctico**: *Autómata polivalente de exploración*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **1x** Corazón primigenio (`corazon_primigenio`) — *[Legendario]*
- **2x** Ojo de dragón mecánico (`ojo_dragon`) — *[Legendario]*
- **2x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **1x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **1x** Relicario engranajes (`relicario_astral`) — *[Legendario]*
- **2x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **3x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:3|corazon_caldera:1|corazon_primigenio:1|dinamo_galvanica:2|nucleo_mana:2|ojo_dragon:2|relicario_astral:1`
- **Hash FNV-1a Hexadecimal**: `0x570CD718` | **Decimal**: `1460459288`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **115** | **44** | **223** | **15** |

---

### Golem #133 — Coloso Astral

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `0.96m` (Relación visual en escena)
- **Rol Táctico**: *Coloso impenetrable de contención*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **3x** Corazón primigenio (`corazon_primigenio`) — *[Legendario]*
- **1x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **1x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **3x** Relicario engranajes (`relicario_astral`) — *[Legendario]*
- **1x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*
- **1x** Cerebro de autómata (`cerebro_automata`) — *[Épico]*
- **1x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:1|bateria_plasma:1|bobinas_tesla:1|cerebro_automata:1|corazon_primigenio:3|matriz_optica_solar:1|relicario_astral:3`
- **Hash FNV-1a Hexadecimal**: `0x95B790BA` | **Decimal**: `2511835322`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **74** | **68** | **337** | **35** |

---

### Golem #134 — Destructor Manático

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.17m` (Relación visual en escena)
- **Rol Táctico**: *Disruptor galvánico de alta frecuencia*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **2x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **2x** Relicario engranajes (`relicario_astral`) — *[Legendario]*
- **2x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **3x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **3x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **2x** Singularidad etérica (`singularidad_eterica`) — *[Legendario]*
- **2x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **3x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:3|bateria_plasma:3|corazon_caldera:2|matriz_optica_solar:2|motor_vapor:2|nucleo_mana:3|relicario_astral:2|singularidad_eterica:2`
- **Hash FNV-1a Hexadecimal**: `0x846868FB` | **Decimal**: `2221435131`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **116** | **57** | **235** | **55** |

---

### Golem #135 — Servidor Singular

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.14m` (Relación visual en escena)
- **Rol Táctico**: *Unidad de vanguardia para zonas de PK*

#### 🧩 Componentes Requeridos (9 Tipos de Piezas):
- **3x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*
- **3x** Relicario engranajes (`relicario_astral`) — *[Legendario]*
- **2x** Singularidad etérica (`singularidad_eterica`) — *[Legendario]*
- **1x** Corazón primigenio (`corazon_primigenio`) — *[Legendario]*
- **2x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **1x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **3x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **2x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **2x** Ojo de dragón mecánico (`ojo_dragon`) — *[Legendario]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:1|bateria_plasma:3|bobinas_tesla:3|condensador_presion:2|corazon_primigenio:1|giroscopio_precision:2|ojo_dragon:2|relicario_astral:3|singularidad_eterica:2`
- **Hash FNV-1a Hexadecimal**: `0x53641CE0` | **Decimal**: `1399069920`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **136** | **68** | **333** | **33** |

---

### Golem #136 — Forjador Místico

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.27m` (Relación visual en escena)
- **Rol Táctico**: *Asesino ágil de choque veloz*

#### 🧩 Componentes Requeridos (9 Tipos de Piezas):
- **2x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **3x** Relicario engranajes (`relicario_astral`) — *[Legendario]*
- **1x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **1x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **3x** Ojo de dragón mecánico (`ojo_dragon`) — *[Legendario]*
- **3x** Corazón primigenio (`corazon_primigenio`) — *[Legendario]*
- **2x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **3x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **1x** Bobinas de Tesla (`bobinas_tesla`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `baterias_alquimicas:1|bobinas_tesla:1|condensador_presion:2|corazon_caldera:1|corazon_primigenio:3|engranajes_bronce:3|matriz_optica_solar:2|ojo_dragon:3|relicario_astral:3`
- **Hash FNV-1a Hexadecimal**: `0xD9CCF339` | **Decimal**: `3654087481`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **94** | **88** | **375** | **33** |

---

### Golem #137 — Ejecutor Cósmico

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `0.93m` (Relación visual en escena)
- **Rol Táctico**: *Atacante rápido de primera línea*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **3x** Reactor de éter (`reactor_eter`) — *[Épico]*
- **1x** Relicario engranajes (`relicario_astral`) — *[Legendario]*
- **1x** Ojo de dragón mecánico (`ojo_dragon`) — *[Legendario]*
- **1x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **2x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **3x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **1x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:1|corazon_caldera:2|matriz_optica_solar:1|motor_vapor:3|ojo_dragon:1|reactor_eter:3|relicario_astral:1`
- **Hash FNV-1a Hexadecimal**: `0xCED90932` | **Decimal**: `3470330162`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **97** | **47** | **204** | **18** |

---

### Golem #138 — Rastreador Pistón

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.25m` (Relación visual en escena)
- **Rol Táctico**: *Francotirador de pulso fotónico*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **1x** Corazón primigenio (`corazon_primigenio`) — *[Legendario]*
- **3x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **2x** Reactor de éter (`reactor_eter`) — *[Épico]*
- **2x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **2x** Baterías alquímicas (`baterias_alquimicas`) — *[Raro]*
- **3x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **3x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*
- **3x** Condensador alta presión (`condensador_presion`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:2|baterias_alquimicas:2|condensador_presion:3|corazon_caldera:3|corazon_primigenio:1|embolo_titanio:3|engranajes_bronce:3|reactor_eter:2`
- **Hash FNV-1a Hexadecimal**: `0xE9896061` | **Decimal**: `3918094433`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **56** | **86** | **295** | **26** |

---

### Golem #139 — Titán Arcano

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `0.98m` (Relación visual en escena)
- **Rol Táctico**: *Resistencia pesada para combate de arena*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **2x** Cerebro de autómata (`cerebro_automata`) — *[Épico]*
- **2x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **1x** Ojo de dragón mecánico (`ojo_dragon`) — *[Legendario]*
- **2x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **3x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **3x** Relicario engranajes (`relicario_astral`) — *[Legendario]*
- **2x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:2|bateria_plasma:3|cerebro_automata:2|embolo_titanio:2|giroscopio_precision:2|ojo_dragon:1|relicario_astral:3`
- **Hash FNV-1a Hexadecimal**: `0xC94B6412` | **Decimal**: `3377161234`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **92** | **78** | **275** | **24** |

---

### Golem #140 — Caminante Etéreo

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `0.90m` (Relación visual en escena)
- **Rol Táctico**: *Tanque defensivo frontal de alto blindaje*

#### 🧩 Componentes Requeridos (6 Tipos de Piezas):
- **3x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*
- **2x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **1x** Singularidad etérica (`singularidad_eterica`) — *[Legendario]*
- **1x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **2x** Reactor de éter (`reactor_eter`) — *[Épico]*
- **2x** Corazón primigenio (`corazon_primigenio`) — *[Legendario]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:1|corazon_primigenio:2|embolo_titanio:3|nucleo_mana:2|reactor_eter:2|singularidad_eterica:1`
- **Hash FNV-1a Hexadecimal**: `0xB5270716` | **Decimal**: `3039233814`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **96** | **51** | **211** | **23** |

---

### Golem #141 — Gólem Primigenio

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `0.96m` (Relación visual en escena)
- **Rol Táctico**: *Sostenimiento térmico y control de caldera*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **2x** Reactor de éter (`reactor_eter`) — *[Épico]*
- **3x** Cerebro de autómata (`cerebro_automata`) — *[Épico]*
- **1x** Diodos LED (`diodos_led`) — *[Raro]*
- **3x** Singularidad etérica (`singularidad_eterica`) — *[Legendario]*
- **1x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **1x** Ojo de dragón mecánico (`ojo_dragon`) — *[Legendario]*
- **1x** Condensador alta presión (`condensador_presion`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cerebro_automata:3|condensador_presion:1|dinamo_galvanica:1|diodos_led:1|ojo_dragon:1|reactor_eter:2|singularidad_eterica:3`
- **Hash FNV-1a Hexadecimal**: `0x63744B5E` | **Decimal**: `1668565854`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **144** | **23** | **210** | **32** |

---

### Golem #142 — Centinela Relicario

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.01m` (Relación visual en escena)
- **Rol Táctico**: *Autómata polivalente de exploración*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **2x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **2x** Ojo de dragón mecánico (`ojo_dragon`) — *[Legendario]*
- **3x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **2x** Relicario engranajes (`relicario_astral`) — *[Legendario]*
- **2x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **3x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:2|dinamo_galvanica:3|engranajes_bronce:3|motor_vapor:1|nucleo_mana:2|ojo_dragon:2|relicario_astral:2`
- **Hash FNV-1a Hexadecimal**: `0xAAA9CD70` | **Decimal**: `2863254896`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **118** | **61** | **245** | **12** |

---

### Golem #143 — Defensor Astral

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.22m` (Relación visual en escena)
- **Rol Táctico**: *Coloso impenetrable de contención*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **3x** Relicario engranajes (`relicario_astral`) — *[Legendario]*
- **1x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **1x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **1x** Ojo de dragón mecánico (`ojo_dragon`) — *[Legendario]*
- **1x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **3x** Diodos LED (`diodos_led`) — *[Raro]*
- **3x** Singularidad etérica (`singularidad_eterica`) — *[Legendario]*
- **3x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:1|corazon_caldera:1|dinamo_galvanica:1|diodos_led:3|embolo_titanio:3|ojo_dragon:1|relicario_astral:3|singularidad_eterica:3`
- **Hash FNV-1a Hexadecimal**: `0x12A99ACD` | **Decimal**: `313105101`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **99** | **78** | **259** | **35** |

---

### Golem #144 — Ensamblaje Neumático

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Vapor** (`STEAM`) — *Fuerza térmica presurizada, vence a Mecánica (+40%)*
- **Color Emisivo PBR**: `#E67E22` (RGB: `230, 126, 34`)
- **Escala de Altura**: `1.15m` (Relación visual en escena)
- **Rol Táctico**: *Disruptor galvánico de alta frecuencia*

#### 🧩 Componentes Requeridos (7 Tipos de Piezas):
- **3x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **2x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **3x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **2x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*
- **3x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **3x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **1x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:3|corazon_caldera:3|dinamo_galvanica:3|embolo_titanio:1|giroscopio_precision:2|motor_vapor:2|nucleo_mana:3`
- **Hash FNV-1a Hexadecimal**: `0xA273016D` | **Decimal**: `2725445997`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **114** | **66** | **189** | **13** |

---

### Golem #145 — Guardián Singular

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `0.91m` (Relación visual en escena)
- **Rol Táctico**: *Unidad de vanguardia para zonas de PK*

#### 🧩 Componentes Requeridos (10 Tipos de Piezas):
- **3x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **3x** Singularidad etérica (`singularidad_eterica`) — *[Legendario]*
- **2x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **3x** Ojo de dragón mecánico (`ojo_dragon`) — *[Legendario]*
- **2x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **3x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **2x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **1x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **3x** Cerebro de autómata (`cerebro_automata`) — *[Épico]*
- **3x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:3|cerebro_automata:3|condensador_presion:3|corazon_caldera:3|engranajes_bronce:2|matriz_optica_solar:2|motor_vapor:2|nucleo_mana:1|ojo_dragon:3|singularidad_eterica:3`
- **Hash FNV-1a Hexadecimal**: `0x6AEFA1B7` | **Decimal**: `1794089399`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **176** | **57** | **235** | **43** |

---

### Golem #146 — Cruzado Místico

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.01m` (Relación visual en escena)
- **Rol Táctico**: *Asesino ágil de choque veloz*

#### 🧩 Componentes Requeridos (5 Tipos de Piezas):
- **1x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **1x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **1x** Cerebro de autómata (`cerebro_automata`) — *[Épico]*
- **2x** Relicario engranajes (`relicario_astral`) — *[Legendario]*
- **2x** Condensador alta presión (`condensador_presion`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `cerebro_automata:1|condensador_presion:2|matriz_optica_solar:1|nucleo_mana:1|relicario_astral:2`
- **Hash FNV-1a Hexadecimal**: `0xAB1270DA` | **Decimal**: `2870112474`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **54** | **44** | **291** | **20** |

---

### Golem #147 — Poblador Cósmico

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `0.90m` (Relación visual en escena)
- **Rol Táctico**: *Atacante rápido de primera línea*

#### 🧩 Componentes Requeridos (10 Tipos de Piezas):
- **3x** Relicario engranajes (`relicario_astral`) — *[Legendario]*
- **1x** Corazón primigenio (`corazon_primigenio`) — *[Legendario]*
- **3x** Singularidad etérica (`singularidad_eterica`) — *[Legendario]*
- **3x** Cerebro de autómata (`cerebro_automata`) — *[Épico]*
- **1x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **1x** Diodos LED (`diodos_led`) — *[Raro]*
- **1x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **3x** Núcleo de maná (`nucleo_mana`) — *[Épico]*
- **2x** Émbolo titanio forjado (`embolo_titanio`) — *[Épico]*
- **2x** Giróscopo de precisión (`giroscopio_precision`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:1|cerebro_automata:3|corazon_primigenio:1|dinamo_galvanica:1|diodos_led:1|embolo_titanio:2|giroscopio_precision:2|nucleo_mana:3|relicario_astral:3|singularidad_eterica:3`
- **Hash FNV-1a Hexadecimal**: `0xB12A5C7D` | **Decimal**: `2972343421`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **139** | **79** | **284** | **32** |

---

### Golem #148 — Fundidor Dragónico

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.14m` (Relación visual en escena)
- **Rol Táctico**: *Francotirador de pulso fotónico*

#### 🧩 Componentes Requeridos (10 Tipos de Piezas):
- **3x** Corazón primigenio (`corazon_primigenio`) — *[Legendario]*
- **2x** Ojo de dragón mecánico (`ojo_dragon`) — *[Legendario]*
- **1x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **3x** Condensador alta presión (`condensador_presion`) — *[Raro]*
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*
- **1x** Engranajes de bronce (`engranajes_bronce`) — *[Raro]*
- **1x** Relicario engranajes (`relicario_astral`) — *[Legendario]*
- **3x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **3x** Diodos LED (`diodos_led`) — *[Raro]*
- **1x** Corazón de caldera (`corazon_caldera`) — *[Épico]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:3|condensador_presion:3|corazon_caldera:1|corazon_primigenio:3|diodos_led:3|engranajes_bronce:1|matriz_optica_solar:1|motor_vapor:1|ojo_dragon:2|relicario_astral:1`
- **Hash FNV-1a Hexadecimal**: `0xF16CF4BD` | **Decimal**: `4050449597`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **122** | **62** | **337** | **29** |

---

### Golem #149 — Vigía Arcano

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `0.91m` (Relación visual en escena)
- **Rol Táctico**: *Resistencia pesada para combate de arena*

#### 🧩 Componentes Requeridos (10 Tipos de Piezas):
- **1x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **3x** Cerebro de autómata (`cerebro_automata`) — *[Épico]*
- **3x** Matriz óptica solar (`matriz_optica_solar`) — *[Épico]*
- **3x** Reactor de éter (`reactor_eter`) — *[Épico]*
- **2x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **3x** Ojo de dragón mecánico (`ojo_dragon`) — *[Legendario]*
- **1x** Antenas de radio (`antenas_radio`) — *[Raro]*
- **3x** Relicario engranajes (`relicario_astral`) — *[Legendario]*
- **2x** Singularidad etérica (`singularidad_eterica`) — *[Legendario]*
- **2x** Cristal cuarzo resonante (`cristal_fuerza`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `antenas_radio:1|bateria_plasma:2|cerebro_automata:3|corazon_caldera:1|cristal_fuerza:2|matriz_optica_solar:3|ojo_dragon:3|reactor_eter:3|relicario_astral:3|singularidad_eterica:2`
- **Hash FNV-1a Hexadecimal**: `0xCB04388B` | **Decimal**: `3406051467`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **169** | **60** | **270** | **61** |

---

### Golem #150 — Leviatán Etéreo

- **Clasificación**: Tier 4 (Legendario)
- **Afinidad Elemental**: **Éter** (`AETHER`) — *Resonancia primordial, vence a Vapor (+40%)*
- **Color Emisivo PBR**: `#9B59B6` (RGB: `155, 89, 182`)
- **Escala de Altura**: `1.15m` (Relación visual en escena)
- **Rol Táctico**: *Tanque defensivo frontal de alto blindaje*

#### 🧩 Componentes Requeridos (8 Tipos de Piezas):
- **2x** Corazón primigenio (`corazon_primigenio`) — *[Legendario]*
- **2x** Corazón de caldera (`corazon_caldera`) — *[Épico]*
- **2x** Ojo de dragón mecánico (`ojo_dragon`) — *[Legendario]*
- **1x** Dínamo galvánica (`dinamo_galvanica`) — *[Raro]*
- **2x** Batería plasma cargada (`bateria_plasma`) — *[Épico]*
- **1x** Reactor de éter (`reactor_eter`) — *[Épico]*
- **3x** Cerebro de autómata (`cerebro_automata`) — *[Épico]*
- **1x** Motor de vapor (`motor_vapor`) — *[Raro]*

#### ⚙️ Serialización y Hash Determinista FNV-1a:
- **Cadena Canónica**: `bateria_plasma:2|cerebro_automata:3|corazon_caldera:2|corazon_primigenio:2|dinamo_galvanica:1|motor_vapor:1|ojo_dragon:2|reactor_eter:1`
- **Hash FNV-1a Hexadecimal**: `0xAF891A74` | **Decimal**: `2944998004`

#### 📈 Atributos y Estadísticas Base:
| Ataque (ATK) | Defensa (DEF) | Vitalidad (HP) | Velocidad (SPD) |
| :---: | :---: | :---: | :---: |
| **130** | **47** | **216** | **18** |

---
