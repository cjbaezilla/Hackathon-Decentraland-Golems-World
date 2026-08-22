# 🧪 Guía Maestra: Fórmulas, Criterios Deterministas y Algoritmo de Recetas de Golems

> **Estado**: Documento Oficial de Referencia Técnica — **Golems World (Decentraland SDK7)**  
> **Ámbito**: Sistema de Forja Determinista, Hash FNV-1a de 32 bits, Balance de Atributos, Afinidades Elementales y Generación Procedural.  
> **Ficheros de Referencia**: [`GDD-Golems.md`](file:///d:/DECENTRALAND/Scenes/Hackathon/GOLEMS/GDD-Golems.md) / [`GDD-Golems_eng.md`](file:///d:/DECENTRALAND/Scenes/Hackathon/GOLEMS/GDD-Golems_eng.md), [`Golems-Recetas-150.md`](file:///d:/DECENTRALAND/Scenes/Hackathon/GOLEMS/Golems-Recetas-150.md) (ES) / [`Golems-Recetas-150_eng.md`](file:///d:/DECENTRALAND/Scenes/Hackathon/GOLEMS/Golems-Recetas-150_eng.md) (EN)

---

## 📌 1. Introducción y Filosofía del Sistema Determinista

En **Golems World**, la creación de criaturas mecánicas no depende de la aleatoriedad generada en el servidor (*RNG*) ni de datos volátiles no reproducibles. El motor de forja utiliza un **algoritmo determinista estricto** basado en combinaciones de componentes.

### Criterios Clave de Diseño:
1. **Reproducibilidad Absoluta**: Cualquier jugador que introduzca exactamente la misma combinación de materiales en el *Wreckage Lab* obtendrá idéntico golem (mismos atributos base, mismo nombre, misma afinidad, misma escala física y mismo color emisivo).
2. **Diversidad sin Colisiones**: Con un catálogo de 46 materiales de chatarra, el espacio de combinaciones posibles es de millones de variantes. Las 150 recetas del catálogo maestro han sido validadas matemáticamente para garantizar **cero colisiones de hash**.
3. **Progresión por Tiers e Inicio en Nivel 1**: Todos los golems creados en la Forja nacen estrictamente en **Nivel 1**, con estadísticas derivadas de la rareza de sus piezas, la complejidad de la receta ($1.0\times$ a $1.90\times$) y un roll de variabilidad aleatoria ($90\% \le roll \le 115\%$).

> [!TIP]
> **TABLA COMPLETA DE ATRIBUTOS Y FÓRMULAS EN NIVEL 1**:
> Para consultar la matriz técnica exhaustiva de los 46 materiales y el algoritmo de cálculo de estadísticas iniciales, lee la [Guía Maestra: Batallas de Campo y Matrices de Nivel](file:///d:/DECENTRALAND/Scenes/Hackathon/guias/guia-batallas-de-campo-y-matrices-de-nivel.md#5-algoritmo-determinista-de-forja-en-nivel-1-player-golems).

---

## ⚙️ 2. Serialización Canónica y Algoritmo Hash FNV-1a 32-bit

### 2.1 Cadena Canónica de Receta
Para evitar que el orden en que el jugador coloca los materiales en la interfaz de la forja altere el resultado (ej. colocar `alambre_cobre` antes de `manometros` o viceversa), toda receta se serializa previamente en una **cadena canónica alfabética estricta**.

#### Reglas de Serialización:
1. Cada tipo de material se representa por su ID canónico en minúsculas (ej: `alambre_cobre`, `reactor_eter`).
2. Se une el ID con su cantidad mediante dos puntos (`:`).
3. Se ordenan lexicográficamente por ID de material.
4. Se concatenan los pares mediante el carácter tubería (`|`).

$$\text{CanonicalRecipe} = \text{sort}\big(\{ \text{id}_i : \text{count}_i \}\big) . \text{join}('|')$$

*Ejemplo de Cadena Canónica:*
```text
cadenas_hierro:2|manometros:2|palancas_interruptor:2|tornillos_pernos:2|tuercas_gigantes:2
```

---

### 2.2 Función Hash FNV-1a de 32 bits
Se utiliza la variante FNV-1a (Fowler–Noll–Vo) de 32 bits por su excelente distribución de bits, bajísima tasa de colisiones y alto rendimiento sintáctico en TypeScript / JavaScript para la app móvil.

```typescript
/**
 * Calcula el hash FNV-1a de 32 bits para una cadena canónica de receta.
 * @param canonicalRecipe Cadena alfabéticamente ordenada (ej: "alambre_cobre:3|manometros:1")
 * @returns Entero sin signo de 32 bits (0x00000000 a 0xFFFFFFFF)
 */
export function calculateRecipeHash(canonicalRecipe: string): number {
  let hash = 0x811c9dc5 // FNV offset basis 32-bit (2166136261)
  for (let i = 0; i < canonicalRecipe.length; i++) {
    hash ^= canonicalRecipe.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) // FNV prime 32-bit (16777619)
  }
  return hash >>> 0 // Conversión a entero sin signo de 32 bits
}
```

---

## 📊 3. Catálogo de 46 Materiales y Ponderación de Atributos

Los 46 materiales de chatarra rescatan componentes electrónicos, utensilios y artefactos post-industriales. Cada uno otorga bonificaciones fijas a los atributos base y contribuye con puntos a la afinidad elemental:

### Tabla de Contribuciones por Material:

| ID Canónico | Material | Rarity | ATK | DEF | HP | SPD | Afinidad Aportada | Peso Afinidad |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :--- | :---: |
| `alambre_cobre` | Alambre de cobre | Común | 0 | 0 | 0 | +2 | Nivel neutro | 0 |
| `tornillos_pernos` | Tornillos y pernos | Común | 0 | +2 | 0 | 0 | Nivel neutro | 0 |
| `engranajes_desgastados`| Engranajes desgastados | Común | 0 | +1 | 0 | +1 | Nivel neutro | 0 |
| `tubos_cobre` | Tubos de cobre | Común | 0 | 0 | +10 | 0 | Nivel neutro | 0 |
| `sartenes` | Sartenes | Común | 0 | +3 | 0 | 0 | Nivel neutro | 0 |
| `ollas_cocinar` | Ollas de cocinar | Común | 0 | +2 | +5 | 0 | Nivel neutro | 0 |
| `placas_laton` | Placas de latón | Común | 0 | +3 | 0 | 0 | Nivel neutro | 0 |
| `clavos_oxidados` | Clavos oxidados | Común | 0 | +1 | 0 | 0 | Nivel neutro | 0 |
| `latas_conserva` | Latas de conserva | Común | 0 | 0 | +8 | 0 | Nivel neutro | 0 |
| `cadenas_hierro` | Cadenas de hierro | Común | 0 | +2 | 0 | 0 | Nivel neutro | 0 |
| `tuercas_gigantes` | Tuercas gigantes | Común | 0 | +2 | 0 | 0 | Nivel neutro | 0 |
| `tapas_alcantarilla` | Tapas de alcantarilla | Común | 0 | +3 | 0 | 0 | Nivel neutro | 0 |
| `cables_deshilachados` | Cables deshilachados | Común | 0 | 0 | 0 | +2 | Nivel neutro | 0 |
| `residuos_carbon` | Residuos de carbón | Común | 0 | 0 | +6 | 0 | `STEAM` (Vapor) | +1 |
| `transistores` | Transistores | Poco común | +3 | 0 | 0 | 0 | Nivel neutro | 0 |
| `bombillas_filamento` | Bombillas de filamento | Poco común | 0 | 0 | +12 | 0 | `LUMINOUS` (Luminosa) | +1 |
| `resortes_reloj` | Resortes de reloj | Poco común | 0 | 0 | 0 | +4 | Nivel neutro | 0 |
| `manometros` | Manómetros | Poco común | 0 | 0 | +15 | 0 | Nivel neutro | 0 |
| `valvulas_vapor` | Válvulas de vapor | Poco común | +2 | 0 | 0 | 0 | `STEAM` (Vapor) | +1 |
| `lentes_tv_viejo` | Lentes de TV viejo | Poco común | 0 | 0 | 0 | +3 | Nivel neutro | 0 |
| `fusibles_fundidos` | Fusibles fundidos | Poco común | +2 | 0 | 0 | 0 | `GALVANIC` (Galvánica) | +1 |
| `relojes_bolsillo` | Relojes de bolsillo | Poco común | 0 | 0 | 0 | +3 | Nivel neutro | 0 |
| `brujulas_magneticas` | Brújulas magnéticas | Poco común | 0 | 0 | 0 | +3 | `MECHANICAL` (Mecánica) | +1 |
| `tubos_vacio` | Tubos de vacío | Poco común | +3 | 0 | 0 | 0 | `LUMINOUS` (Luminosa) | +1 |
| `palancas_interruptor` | Palancas interruptor | Poco común | 0 | +2 | 0 | 0 | Nivel neutro | 0 |
| `motor_vapor` | Motor de vapor | Raro | +5 | 0 | 0 | 0 | `STEAM` (Vapor) | +2 |
| `bobinas_tesla` | Bobinas de Tesla | Raro | +6 | 0 | 0 | 0 | `GALVANIC` (Galvánica) | +2 |
| `antenas_radio` | Antenas de radio | Raro | 0 | 0 | 0 | +6 | Nivel neutro | 0 |
| `diodos_led` | Diodos LED | Raro | +4 | 0 | 0 | 0 | `LUMINOUS` (Luminosa) | +2 |
| `baterias_alquimicas` | Baterías alquímicas | Raro | 0 | 0 | +25 | 0 | `GALVANIC` (Galvánica) | +2 |
| `engranajes_bronce` | Engranajes de bronce | Raro | 0 | +6 | 0 | 0 | `MECHANICAL` (Mecánica) | +2 |
| `dinamo_galvanica` | Dínamo galvánica | Raro | +5 | 0 | 0 | 0 | `GALVANIC` (Galvánica) | +2 |
| `cristal_fuerza` | Cristal cuarzo | Raro | 0 | 0 | 0 | +5 | `LUMINOUS` (Luminosa) | +2 |
| `giroscopio_precision`| Giróscopo precisión | Raro | 0 | +5 | 0 | 0 | `MECHANICAL` (Mecánica) | +2 |
| `condensador_presion` | Condensador alta presión| Raro | 0 | 0 | +20 | 0 | `STEAM` (Vapor) | +2 |
| `nucleo_mana` | Núcleo de maná | Épico | +8 | 0 | 0 | 0 | `AETHER` (Éter) | +3 |
| `cerebro_automata` | Cerebro de autómata | Épico | +8 | 0 | 0 | 0 | `MECHANICAL` (Mecánica) | +3 |
| `reactor_eter` | Reactor de éter | Épico | +9 | 0 | 0 | 0 | `AETHER` (Éter) | +3 |
| `corazon_caldera` | Corazón de caldera | Épico | 0 | +8 | 0 | 0 | `STEAM` (Vapor) | +3 |
| `bateria_plasma` | Batería plasma | Épico | +8 | 0 | 0 | 0 | `GALVANIC` (Galvánica) | +3 |
| `matriz_optica_solar` | Matriz óptica solar | Épico | 0 | 0 | 0 | +7 | `LUMINOUS` (Luminosa) | +3 |
| `embolo_titanio` | Émbolo titanio | Épico | 0 | +7 | 0 | 0 | `STEAM` (Vapor) | +3 |
| `ojo_dragon` | Ojo de dragón mecánico| Legendario | +14 | 0 | 0 | 0 | `AETHER` (Éter) | +4 |
| `corazon_primigenio` | Corazón primigenio | Legendario | +5 | +5 | +20 | +3 | `AETHER` (Éter / Todos) | +4 |
| `singularidad_eterica`| Singularidad etérica | Legendario | +12 | 0 | 0 | +6 | `AETHER` (Éter) | +4 |
| `relicario_astral` | Relicario engranajes | Legendario | 0 | +10 | +30 | 0 | `AETHER` (Éter) | +4 |

---

## 📈 4. Fórmulas Matemáticas de Derivación de Atributos

El cálculo de las estadísticas finales de un golem sigue tres pasos:

### Paso 1: Offset de Piso de Tier
Cada Tier proporciona un valor base de suelo para garantizar la viabilidad del golem en su respectiva categoría de combate:

$$\text{Floor}_{\text{Tier}} = \begin{cases}
\text{Tier 1:} & \text{ATK: } 16, & \text{DEF: } 8, & \text{HP: } 85, & \text{SPD: } 4 \\
\text{Tier 2:} & \text{ATK: } 22, & \text{DEF: } 12, & \text{HP: } 110, & \text{SPD: } 6 \\
\text{Tier 3:} & \text{ATK: } 28, & \text{DEF: } 16, & \text{HP: } 140, & \text{SPD: } 9 \\
\text{Tier 4:} & \text{ATK: } 36, & \text{DEF: } 22, & \text{HP: } 180, & \text{SPD: } 12
\end{cases}$$

### Paso 2: Acumulación de Componentes
$$\text{Base}_{\text{ATK}} = \text{Floor}_{\text{ATK}} + \sum_{i=1}^{k} (\text{atk}_i \times n_i)$$

$$\text{Base}_{\text{DEF}} = \text{Floor}_{\text{DEF}} + \sum_{i=1}^{k} (\text{def}_i \times n_i)$$

$$\text{Base}_{\text{HP}} = \text{Floor}_{\text{HP}} + \sum_{i=1}^{k} (\text{hp}_i \times n_i)$$

$$\text{Base}_{\text{SPD}} = \text{Floor}_{\text{SPD}} + \sum_{i=1}^{k} (\text{spd}_i \times n_i)$$

### Paso 3: Modificador de Variación por Hash ($\pm 5\%$)
Para dar un toque de individualidad única a cada combinación sin romper el balance de la receta, el hash FNV-1a aplica una variación de entre $-5\%$ y $+5\%$:

$$\Delta_{\text{hash}} = \frac{(\text{hashDecimal} \pmod{11}) - 5}{100} \in [-0.05, +0.05]$$

$$\text{ATK}_{\text{final}} = \max\left(15, \text{round}\left(\text{Base}_{\text{ATK}} \times (1 + \Delta_{\text{hash}})\right)\right)$$

$$\text{DEF}_{\text{final}} = \max\left(5, \text{round}\left(\text{Base}_{\text{DEF}} \times (1 + \Delta_{\text{hash}})\right)\right)$$

$$\text{HP}_{\text{final}} = \max\left(80, \text{round}\left(\text{Base}_{\text{HP}} \times (1 + \Delta_{\text{hash}})\right)\right)$$

$$\text{SPD}_{\text{final}} = \max\left(2, \text{round}\left(\text{Base}_{\text{SPD}} \times (1 + \Delta_{\text{hash}})\right)\right)$$

---

## ⚡ 5. Determinación de Afinidad Elemental y Pentágono Combate

### 5.1 Selección del Elemento Dominante
Se computa la puntuación acumulada para cada una de las 5 afinidades según las piezas de la receta:

$$S_{\text{elemento}} = \sum_{i=1}^{k} (\text{PesoAfinidad}_i \times n_i)$$

El elemento con la puntuación $S_{\text{elemento}}$ mayor se convierte en la **Afinidad Principal** del golem. En caso de empate total (o si la receta no contiene materiales afines), se utiliza la regla de desempate determinista:

$$\text{AfinidadFallback} = \text{ARRAY\_ELEMENTOS}[\text{hashDecimal} \pmod 5]$$

### 5.2 Pentágono de Ventajas y Multiplicadores de Daño
El combate aplica un bonificador de daño según las relaciones elementales:

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

| Atacante | Defensor | Multiplicador | Efecto Visual |
| :--- | :--- | :---: | :--- |
| **Vapor** | Mecánica | $\times 1.40$ (Ventaja) | Explosión de vapor caliente y chispas doradas |
| **Mecánica** | Galvánica | $\times 1.40$ (Ventaja) | Fractura de engranajes y descarga |
| **Galvánica** | Luminosa | $\times 1.40$ (Ventaja) | Arco eléctrico azul de alto voltaje |
| **Luminosa** | Éter | $\times 1.40$ (Ventaja) | Destello fotónico esmeralda |
| **Éter** | Vapor | $\times 1.40$ (Ventaja) | Colapso místico violeta |
| *Desventaja* | *Inverso* | $\times 0.75$ (Penalización) | Impacto mitigado sin resplandor |

---

## 🎨 6. Tintado Emisivo PBR, Escala y Nomenclatura Algorítmica

### 6.1 Color Emisivo y Material PBR
El tintado de las texturas en Decentraland SDK7 se ajusta al color de la afinidad dominante del golem:

| Afinidad | Nombre en Español | Código Hex | RGB | Concepto Estético |
| :--- | :--- | :---: | :---: | :--- |
| `STEAM` | Vapor | `#E67E22` | `230, 126, 34` | Naranja térmico de caldera presurizada |
| `MECHANICAL` | Mecánica | `#F1C40F` | `241, 196, 15` | Dorado latón de relojería antigua |
| `GALVANIC` | Galvánica | `#3498DB` | `52, 152, 219` | Azul eléctrico de alto voltaje |
| `LUMINOUS` | Luminosa | `#2ECC71` | `46, 204, 113` | Verde esmeralda de filamento fotónico |
| `AETHER` | Éter | `#9B59B6` | `155, 89, 182` | Violeta místico de maná primigenio |

### 6.2 Escala de Altura Física ($0.90\text{m}$ a $1.30\text{m}$)
La escala del modelo 3D en `Transform.create(entity, { scale: Vector3.create(s, s, s) })` se deriva directamente del hash:

$$\text{Scale} = 0.90 + \left((\text{hashDecimal} \pmod{41}) \times 0.01\right) \text{ metros}$$

### 6.3 Algoritmo de Nomenclatura Procedural
El nombre público del golem se genera combinando un **Sustantivo Táctico** y un **Prefijo Afín**:

$$\text{NombreGolem} = \text{NOUNS}[(i \times 7) \pmod{\text{length}}] + " " + \text{PREFIXES}[\text{Afinidad}][i \pmod{\text{length}}]$$

*Ejemplos de Nombres Generados:*
- `Baluarte Eléctrico` (Golem #001 - Galvánico)
- `Cazador Filamento` (Golem #002 - Luminoso)
- `Artillero Calderero` (Golem #003 - Vapor)
- `Titán Primigenio` (Golem #150 - Éter)

---

## 🏆 7. Balance y Distribución de los 150 Golems

Las 150 recetas del archivo [`Golems-Recetas-150.md`](file:///d:/DECENTRALAND/Scenes/Hackathon/GOLEMS/Golems-Recetas-150.md) han sido calibradas para ofrecer progresión continua:

1. **Tier 1 (40 Recetas, #001 - #040)**: Accesibles desde los primeros 5 minutos de juego. Requieren 5 a 6 materiales comunes/poco comunes. Atributos típicos: ATK 15-20, DEF 15-25, HP 95-125, SPD 4-8.
2. **Tier 2 (50 Recetas, #041 - #090)**: Para escuadrones de exploración avanzada. Requieren 6 a 8 materiales. Atributos típicos: ATK 22-30, DEF 12-22, HP 120-155, SPD 6-12.
3. **Tier 3 (35 Recetas, #091 - #125)**: Diseñados para la Escalera del Torneo y patrullaje de zonas PK. Requieren 7 a 10 materiales (incluyendo piezas raras/épicas). Atributos típicos: ATK 30-40, DEF 18-28, HP 150-190, SPD 10-16.
4. **Tier 4 (25 Recetas, #126 - #150)**: Los colosos más poderosos del juego. Requieren de 8 a 12 componentes (incluyendo piezas legendarias como `ojo_dragon` o `corazon_primigenio`). Atributos típicos: ATK 40-65, DEF 25-38, HP 200-280, SPD 14-22.

---

## 📄 8. Conclusión y Referencias

Esta metodología matemática garantiza que el sistema de forja de **Golems World** sea 100% determinista, libre de manipulaciones y completamente balanceado para competir en la Gran Arena y explorar el mapa de 400m × 400m en Decentraland.
