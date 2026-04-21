#!/usr/bin/env node
// Syncs .claude/agents/blair-*.md → web/lib/agents/*.ts
// Run from web/ directory: npm run sync-agents

const fs = require('fs')
const path = require('path')

const AGENTS_MD = path.resolve(__dirname, '../../.claude/agents')
const AGENTS_TS = path.resolve(__dirname, '../lib/agents')

function stripFrontmatter(content) {
  if (!content.startsWith('---')) return content
  const end = content.indexOf('---', 3)
  if (end === -1) return content
  return content.slice(end + 3).trimStart()
}

function getFrontmatterField(content, field) {
  const match = content.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'))
  return match ? match[1].trim() : null
}

function agentNameToConst(name) {
  // blair-content → CONTENT_PROMPT
  // blair-sales-enablement → SALES_ENABLEMENT_PROMPT
  // blair → ORCHESTRATOR_PROMPT
  const stripped = name === 'blair' ? 'orchestrator' : name.replace(/^blair-/, '')
  return stripped.replace(/-/g, '_').toUpperCase() + '_PROMPT'
}

function agentNameToFile(name) {
  // blair-content → content.ts
  // blair-sales-enablement → sales-enablement.ts
  // blair → orchestrator.ts
  const stripped = name === 'blair' ? 'orchestrator' : name.replace(/^blair-/, '')
  return stripped + '.ts'
}

const mdFiles = fs.readdirSync(AGENTS_MD)
  .filter(f => f.endsWith('.md'))

const synced = []
const skipped = []

for (const file of mdFiles) {
  const raw = fs.readFileSync(path.join(AGENTS_MD, file), 'utf8')
  const name = getFrontmatterField(raw, 'name')
  if (!name) {
    skipped.push({ file, reason: 'no name in frontmatter' })
    continue
  }

  const content = stripFrontmatter(raw)
  const constName = agentNameToConst(name)
  const tsFile = agentNameToFile(name)
  const escaped = content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
  const tsContent = [
    `// Auto-generated from .claude/agents/${file} — do not edit manually`,
    `// Run npm run sync-agents from web/ to regenerate`,
    `export const ${constName} = \`${escaped}\``,
    '',
  ].join('\n')

  fs.writeFileSync(path.join(AGENTS_TS, tsFile), tsContent)
  synced.push({ file, tsFile, constName })
}

console.log(`\nBlair agent sync complete`)
console.log(`  Synced: ${synced.length} agents`)
for (const { file, tsFile } of synced) {
  console.log(`    ${file} → ${tsFile}`)
}

if (skipped.length > 0) {
  console.log(`  Skipped: ${skipped.length} files`)
  for (const { file, reason } of skipped) {
    console.log(`    ${file} — ${reason}`)
  }
}

// Check for new agents not yet in index.ts
const indexPath = path.join(AGENTS_TS, 'index.ts')
const indexContent = fs.readFileSync(indexPath, 'utf8')
const newAgents = synced.filter(({ constName }) => !indexContent.includes(constName))

if (newAgents.length > 0) {
  console.log(`\n  ⚠️  New agents detected — add to lib/agents/index.ts:`)
  for (const { tsFile, constName } of newAgents) {
    const exportName = tsFile.replace('.ts', '')
    console.log(`    export { ${constName} } from './${exportName}';`)
  }
}
