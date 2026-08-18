# Generador Procedural de Modelos 3D GLB para Golems

Este directorio contiene las herramientas y utilidades en Node.js puro para la generación procedural de modelos 3D binarios **GLB (glTF 2.0)** optimizados para **Decentraland SDK7** y compatibles al 100% con la app móvil de Decentraland (**Mobile First / Godot Explorer**).

---

## 📌 Propósito y Arquitectura

El script [`generate_models.js`](file:///d:/DECENTRALAND/Scenes/Hackathon/scripts/generate_models.js) construye modelos tridimensionales binarios autocontenidos sin depender de librerías externas ni utilidades pesadas de modelado:

1. **Cero Dependencias Externas**: Funciona con Node.js estándar (`fs` y `path`).
2. **Estructura Binaria glTF 2.0 Estricta**:
   - **Encabezado GLB** de 12 bytes (`glTF` magic `0x46546C67`, versión 2, longitud total).
   - **Chunk JSON** estructurado con `scenes`, `nodes`, `materials`, `meshes`, `primitives`, `accessors` y `bufferViews`.
   - **Chunk BIN** con buffers binarios alineados a 4 bytes para posiciones `VEC3` (`FLOAT 5126`), normales `VEC3` (`FLOAT 5126`) e índices triangulares `SCALAR` (`UNSIGNED_SHORT 5123`).
3. **Materiales PBR y Canales Emisivos Puros (Mobile First)**:
   - Cumple con la restricción de **no usar luces dinámicas en escena (`PBPointLight`)** en móvil.
   - Aplica canales `emissiveFactor` nativos en el material PBR para producir visores, calderas, bobinas, faros y núcleos con brillo intenso sin penalización de rendimiento.
4. **Organización Temática**:
   - Crea automáticamente subdirectorios en `assets/models/<tipo>/`.
   - Genera archivos numerados `golem_<tipo>_01.glb` a `golem_<tipo>_05.glb` y mantiene el alias canónico `golem_<tipo>.glb` para compatibilidad transparente.

---

## 💻 Manual de Uso por Línea de Comandos (CLI)

El script cuenta con un analizador de argumentos flexible que admite tanto banderas largas/cortas como sintaxis posicional directa.

### Sintaxis General

```bash
node scripts/generate_models.js [opciones]
node scripts/generate_models.js [tipo] [cantidad]
```

### Tabla de Opciones y Parámetros

| Bandera Larga | Bandera Corta | Valores Posibles | Valor por Defecto | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `--type <tipo>` | `-t <tipo>` | `steam`, `galvanic`, `mechanical`, `luminous`, `aether`, `all` | `all` | Especifica el tipo o afinidad elemental a generar. |
| `--count <num>` | `-c <num>` | `1` a `5` | `5` | Número de variantes a generar por tipo. |
| `--variant <num>`| `-v <num>` | `1` a `5` | *N/A* | Genera exclusivamente una variante específica. |
| `--output-dir <ruta>`| `-o <ruta>` | Ruta válida en disco | `assets/models` | Directorio de salida donde ubicar los modelos. |
| `--help` | `-h` | *N/A* | *N/A* | Despliega el manual de ayuda interactivo. |

---

## 🚀 Ejemplos Prácticos de Ejecución

### 1. Generar el Catálogo Completo (25 Modelos en 5 Carpetas)
```bash
node scripts/generate_models.js
```

### 2. Generar Solo un Tipo Específico con sus 5 Variantes
```bash
# Generar las 5 variantes del tipo Vapor
node scripts/generate_models.js --type steam

# Generar las 5 variantes del tipo Galvánico
node scripts/generate_models.js -t galvanic
```

### 3. Generar un Número Específico de Variantes
```bash
# Generar las 3 primeras variantes del tipo Mecánico
node scripts/generate_models.js -t mechanical -c 3
```

### 4. Generar una Sola Variante de Alta Jerarquía
```bash
# Generar únicamente la Variante 05 (Señor del Éter Primigenio) de tipo Éter
node scripts/generate_models.js --type aether --variant 5
```

### 5. Sintaxis Posicional Rápida
```bash
# Tipo luminoso con 4 variantes
node scripts/generate_models.js luminous 4

# Tipo vapor con 2 variantes
node scripts/generate_models.js steam 2
```

### 6. Consultar la Ayuda
```bash
node scripts/generate_models.js --help
```

---

## 🤖 Catálogo Maestro de los 25 Modelos Generados

Cada tipo cuenta con 5 variantes geométricas y de rol diferenciadas para reflejar distintos niveles de forja y atributos:

```text
assets/models/
├── steam/        # Golems de Vapor (Calderas, chimeneas, fuego naranja)
├── galvanic/     # Golems Galvánicos (Bobinas de Tesla, arcos voltaicos cian)
├── mechanical/   # Golems Mecánicos (Engranajes pesados, blindaje de chatarra, ámbar)
├── luminous/     # Golems Luminosos (Cúpulas de faro, prismas, luz solar amarilla)
└── aether/       # Golems de Éter (Obsidiana mística, resonadores flotantes, violeta amatista)
```

| Tipo | Archivo | Rol / Arquetipo | Paleta PBR y Emisivo | Rasgos Distintivos 3D |
| :--- | :--- | :--- | :--- | :--- |
| **Vapor** | `golem_steam_01.glb` | Equilibrado Base | Cobre / Hierro (`#FF7000`) | Caldera central, chimenea superior de escape y visor incandescente. |
| **Vapor** | `golem_steam_02.glb` | Tanque Blindado | Cobre reforzado (`#FF7000`) | Caldera ancha ensanchada, doble chimenea y hombreras gruesas. |
| **Vapor** | `golem_steam_03.glb` | Vástago a Presión (Ágil) | Cobre pulido (`#FF7000`) | Chasis esbelto, chimenea alta y extremidades de pistón ligero. |
| **Vapor** | `golem_steam_04.glb` | Mortero de Vapor (Artillero) | Cobre / Hierro (`#FF7000`) | Cañones de escape montados en brazos y doble escape trasero. |
| **Vapor** | `golem_steam_05.glb` | Coloso de Fundición (Élite) | Cobre / Aleación (`#FF7000`) | Triple chimenea monumental, torso reforzado y caldera dual. |
| **Galvánico** | `golem_galvanic_01.glb`| Chispazo Base | Acero azul / Cobre (`#00E5FF`) | Bobinas Tesla en hombros y reactor de arco voltaico central. |
| **Galvánico** | `golem_galvanic_02.glb`| Acorazado Dínamo (Tanque)| Acero reforzado (`#00E5FF`) | Bobinas de gran calibre, aislador dorsal y placas pectorales. |
| **Galvánico** | `golem_galvanic_03.glb`| Relámpago Veloz (Ágil) | Acero ligero (`#00E5FF`) | Doble antena de alta frecuencia y chasis estilizado. |
| **Galvánico** | `golem_galvanic_04.glb`| Conductor de Rayos (Artillero)| Acero / Cobre (`#00E5FF`) | Cañones de bobina proyectores de descarga en ambos brazos. |
| **Galvánico** | `golem_galvanic_05.glb`| Titán de Tesla (Élite) | Aleación galvánica (`#00E5FF`) | Cuádruple terminal de alta tensión y corona de descarga. |
| **Mecánico** | `golem_mechanical_01.glb`| Acorazado Base | Chatarra / Latón (`#FFBF00`) | Hombreras de engranaje dentado, visor monóculo y placas remachadas. |
| **Mecánico** | `golem_mechanical_02.glb`| Bastión de Chatarra (Tanque)| Placas de hierro (`#FFBF00`) | Escudo frontal ensanchado y hombreras masivas de blindaje. |
| **Mecánico** | `golem_mechanical_03.glb`| Engranaje Relojero (Ágil) | Latón pulido (`#FFBF00`) | Engranajes de precisión expuestos en hombros y espalda. |
| **Mecánico** | `golem_mechanical_04.glb`| Martillo Neumático (Artillero)| Hierro macizo (`#FFBF00`) | Puños de mazo neumático ensanchados para demolición. |
| **Mecánico** | `golem_mechanical_05.glb`| Gran Autómata (Élite) | Latón / Chatarra (`#FFBF00`) | Rueda dentada monumental en espalda, monóculos múltiples y hombros dobles. |
| **Luminoso** | `golem_luminous_01.glb`| Faro Solar Base | Cromo / Oro (`#FFFF33`) | Cúpula faro reflectante superior, núcleo solar y diodos en hombros. |
| **Luminoso** | `golem_luminous_02.glb`| Reflector Acorazado (Tanque)| Cromo reforzado (`#FFFF33`) | Bloque reflector de prisma frontal y hombreras con bisel dorado. |
| **Luminoso** | `golem_luminous_03.glb`| Centella Fotónica (Ágil) | Cromo ligero (`#FFFF33`) | Cúpula esbelta con prismas estilizados y acelerador de luz. |
| **Luminoso** | `golem_luminous_04.glb`| Proyector de Plasma (Artillero)| Cromo / Oro (`#FFFF33`) | Cañones dobles de enfoque óptico láser en antebrazos. |
| **Luminoso** | `golem_luminous_05.glb`| Corona de Helios (Élite) | Cromo pulido (`#FFFF33`) | Corona de tres puntas luminosas, faro monumental y diodos triples. |
| **Éter** | `golem_aether_01.glb` | Autómata de Éter Base | Obsidiana / Amatista (`#B833FF`)| Cristal de maná central, resonadores en hombros y cuernos arcanos. |
| **Éter** | `golem_aether_02.glb` | Monolito de Vacío (Tanque) | Obsidiana maciza (`#B833FF`)| Chasis de diamante ensanchado y monolitos de resonancia en hombros. |
| **Éter** | `golem_aether_03.glb` | Aparición Astral (Ágil) | Obsidiana estilizada (`#B833FF`)| Silueta esbelta, antena de resonancia dorsal y núcleo cristalino. |
| **Éter** | `golem_aether_04.glb` | Resonador de Fractura (Artillero)| Obsidiana / Runas (`#B833FF`)| Prismas cañón de energía dimensional en ambos brazos. |
| **Éter** | `golem_aether_05.glb` | Señor Primigenio (Élite) | Obsidiana mística (`#B833FF`)| Corona de doble cuerno dimensional, anillo dorsal y núcleo triple. |

---

## 🛠️ Integración con Decentraland SDK7

En el código TypeScript de la escena, cualquier modelo se referencia directamente por su ruta relativa en `GltfContainer`:

```typescript
import { engine, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

const golem = engine.addEntity()
Transform.create(golem, {
  position: Vector3.create(16, 0.1, 16),
  scale: Vector3.create(1.1, 1.1, 1.1)
})

// Cargar variante 03 del Golem Galvánico
GltfContainer.create(golem, {
  src: 'assets/models/galvanic/golem_galvanic_03.glb'
})
```
