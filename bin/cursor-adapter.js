#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, answer => { rl.close(); resolve(answer.trim()); }));
}

function extractDescription(agentName, content) {
  const lines = content.split('\n');
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line && !line.startsWith('#')) return line.replace(/"/g, "'").slice(0, 120);
  }
  return `Blair ${agentName} specialist agent`;
}

function toMdc(agentName, content, alwaysApply) {
  const description = extractDescription(agentName, content);
  return `---
description: "${description}"
globs:
alwaysApply: ${alwaysApply}
---

${content}`;
}

function copyFile(src, dest, overwrite = true) {
  if (!overwrite && fs.existsSync(dest)) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

async function install(blairDir, target) {
  console.log('\nBlair — AI CMO Agent (Cursor)');
  console.log('─────────────────────────────\n');

  if (!fs.existsSync(target)) {
    console.error(`Error: directory not found: ${target}`);
    process.exit(1);
  }

  const cursorRulesDir = path.join(target, '.cursor', 'rules');
  const cmoDest = path.join(target, '.cursor', 'cmo');

  if (fs.existsSync(cursorRulesDir)) {
    console.log('  A .cursor/rules directory already exists.');
    console.log('  Blair will merge its rules into it. Existing Blair rules will be overwritten.\n');
    const confirm = await ask('Continue? (y/N): ');
    if (!confirm.toLowerCase().startsWith('y')) { console.log('Cancelled.'); process.exit(0); }
  } else {
    const confirm = await ask(`Install Blair for Cursor into ${target}? (y/N): `);
    if (!confirm.toLowerCase().startsWith('y')) { console.log('Cancelled.'); process.exit(0); }
  }

  fs.mkdirSync(cursorRulesDir, { recursive: true });
  fs.mkdirSync(cmoDest, { recursive: true });

  console.log('\nTranslating Blair agents to Cursor rules...');

  const agentsSrc = path.join(blairDir, '.claude', 'agents');
  const agentFiles = fs.readdirSync(agentsSrc).filter(n => n.startsWith('blair') && n.endsWith('.md'));

  for (const agentFile of agentFiles) {
    const agentName = agentFile.replace('.md', '');
    const content = fs.readFileSync(path.join(agentsSrc, agentFile), 'utf8');
    const alwaysApply = agentName === 'blair';
    const mdc = toMdc(agentName, content, alwaysApply);
    fs.writeFileSync(path.join(cursorRulesDir, `${agentName}.mdc`), mdc);
    console.log(`  Wrote .cursor/rules/${agentName}.mdc`);
  }

  // Copy CMO directory (brand profile, examples, logs)
  const cmoSrc = path.join(blairDir, '.claude', 'cmo');
  copyFile(path.join(cmoSrc, 'brand.md.example'), path.join(cmoDest, 'brand.md.example'));
  copyFile(path.join(cmoSrc, 'stakeholders.md.example'), path.join(cmoDest, 'stakeholders.md.example'));
  copyFile(path.join(cmoSrc, 'campaigns.md'), path.join(cmoDest, 'campaigns.md'), false);
  copyFile(path.join(cmoSrc, 'insights.md'), path.join(cmoDest, 'insights.md'), false);
  copyFile(path.join(cmoSrc, 'learnings.md'), path.join(cmoDest, 'learnings.md'), false);

  // .gitignore
  const gitignorePath = path.join(target, '.gitignore');
  if (fs.existsSync(gitignorePath)) {
    const existing = fs.readFileSync(gitignorePath, 'utf8');
    if (!existing.includes('.cursor/cmo/brand.md')) {
      const block = [
        '',
        '# Blair — brand profiles contain private strategy and competitor intel',
        '.cursor/cmo/brand.md',
        '.cursor/cmo/brands/*/brand.md',
        '.cursor/cmo/learnings.md',
        '.cursor/cmo/stakeholders.md',
        '.cursor/cmo/marquee.md',
        '.cursor/cmo/pipeline.md',
      ].join('\n');
      fs.appendFileSync(gitignorePath, block + '\n');
      console.log('  Added Blair entries to .gitignore');
    }
  }

  console.log('\n  Blair installed for Cursor successfully.\n');
  console.log('Next steps:');
  console.log(`  1. Open ${target} in Cursor`);
  console.log('  2. Ask: "Set up my Blair brand profile"');
  console.log('  3. Start any marketing task — Blair handles the rest\n');
  console.log('Tip: rules live in .cursor/rules/blair*.mdc — edit to customize.\n');
}

module.exports = { install };

if (require.main === module) {
  const blairDir = path.resolve(__dirname, '..');
  const target = process.argv[2] || process.cwd();
  install(blairDir, target).catch(err => { console.error(err.message); process.exit(1); });
}
