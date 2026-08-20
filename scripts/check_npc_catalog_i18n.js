const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '../src/data/npcCatalog.ts');
const code = fs.readFileSync(catalogPath, 'utf-8');

// Extraer NPC_CATALOG array
const startIndex = code.indexOf('export const NPC_CATALOG: NpcDefinition[] = [');
const catalogStr = code.substring(startIndex);

// Parsear cada objeto NPC usando regex
const npcMatches = [];
const regex = /{\s*id:\s*'([^']+)',[\s\S]*?phraseEn:\s*'([^']+)'\s*}/g;
let match;

let missingNameEnCount = 0;
let missingTitleEnCount = 0;
let missingZoneEnCount = 0;
let missingRoleEnCount = 0;
let missingPhraseEnCount = 0;
let samePhraseCount = 0;

// Buscar campos individualmente por ID
const idRegex = /id:\s*'(NPC-\d+)'/g;
let idMatch;
const ids = [];
while ((idMatch = idRegex.exec(code)) !== null) {
  ids.push(idMatch[1]);
}

console.log(`Encontrados ${ids.length} IDs de NPCs.`);

// Para cada ID, extraer la definición completa
const issues = [];
ids.forEach((id) => {
  const npcStart = code.indexOf(`id: '${id}'`);
  const npcEnd = code.indexOf('}', npcStart + 200);
  const block = code.substring(npcStart, npcEnd + 1);

  const nameMatch = block.match(/name:\s*'([^']+)'/);
  const nameEnMatch = block.match(/nameEn:\s*'([^']+)'/);
  const titleMatch = block.match(/title:\s*'([^']+)'/);
  const titleEnMatch = block.match(/titleEn:\s*'([^']+)'/);
  const zoneMatch = block.match(/zone:\s*'([^']+)'/);
  const zoneEnMatch = block.match(/zoneEn:\s*'([^']+)'/);
  const roleMatch = block.match(/role:\s*'([^']+)'/);
  const roleEnMatch = block.match(/roleEn:\s*'([^']+)'/);
  const phraseEsMatch = block.match(/phraseEs:\s*'([^']+)'/);
  const phraseEnMatch = block.match(/phraseEn:\s*'([^']+)'/);

  const name = nameMatch ? nameMatch[1] : '';
  const nameEn = nameEnMatch ? nameEnMatch[1] : '';
  const title = titleMatch ? titleMatch[1] : '';
  const titleEn = titleEnMatch ? titleEnMatch[1] : '';
  const zone = zoneMatch ? zoneMatch[1] : '';
  const zoneEn = zoneEnMatch ? zoneEnMatch[1] : '';
  const role = roleMatch ? roleMatch[1] : '';
  const roleEn = roleEnMatch ? roleEnMatch[1] : '';
  const phraseEs = phraseEsMatch ? phraseEsMatch[1] : '';
  const phraseEn = phraseEnMatch ? phraseEnMatch[1] : '';

  let hasIssue = false;
  let issueDetails = [];

  if (!nameEn || nameEn === name) {
    missingNameEnCount++;
    issueDetails.push(`nameEn problem ('${name}' vs '${nameEn}')`);
  }
  if (!titleEn || titleEn === title) {
    missingTitleEnCount++;
    issueDetails.push(`titleEn problem ('${title}' vs '${titleEn}')`);
  }
  if (!zoneEn || zoneEn === zone) {
    missingZoneEnCount++;
    issueDetails.push(`zoneEn problem ('${zone}' vs '${zoneEn}')`);
  }
  if (!roleEn || roleEn === role) {
    missingRoleEnCount++;
    issueDetails.push(`roleEn problem ('${role}' vs '${roleEn}')`);
  }
  if (!phraseEn) {
    missingPhraseEnCount++;
    issueDetails.push(`phraseEn missing`);
  } else if (phraseEn === phraseEs) {
    samePhraseCount++;
    issueDetails.push(`phraseEn identical to phraseEs ('${phraseEs}')`);
  }

  if (issueDetails.length > 0) {
    issues.push({ id, name, issueDetails });
  }
});

console.log('--- REPORTE DE AUDITORÍA I18N NPCS ---');
console.log(`Total NPCs analizados: ${ids.length}`);
console.log(`NPCs con faltas/fallas: ${issues.length}`);
console.log(`nameEn faltante o idéntico: ${missingNameEnCount}`);
console.log(`titleEn faltante o idéntico: ${missingTitleEnCount}`);
console.log(`zoneEn faltante o idéntico: ${missingZoneEnCount}`);
console.log(`roleEn faltante o idéntico: ${missingRoleEnCount}`);
console.log(`phraseEn idéntico a phraseEs: ${samePhraseCount}`);

if (issues.length > 0) {
  console.log('\nEjemplos de hallazgos (primeros 15):');
  issues.slice(0, 15).forEach((item) => {
    console.log(`- ${item.id} (${item.name}): ${item.issueDetails.join(', ')}`);
  });
}
