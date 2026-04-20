#!/usr/bin/env node
/**
 * Blair installer — works via npx blair-cmo or direct node execution.
 * Copies the .claude agent bundle into your project. No git required.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const BLAIR_DIR = path.resolve(__dirname, '..');

const _args = process.argv.slice(2);
const _ideFlagIndex = _args.findIndex(a => a === '--ide');
const IDE_TARGET = (_ideFlagIndex !== -1 && _ideFlagIndex + 1 < _args.length)
  ? _args[_ideFlagIndex + 1]
  : null;
if (_ideFlagIndex !== -1) _args.splice(_ideFlagIndex, 2);
process.argv = [...process.argv.slice(0, 2), ..._args];

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, answer => { rl.close(); resolve(answer.trim()); }));
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyFile(src, dest, overwrite = true) {
  if (!overwrite && fs.existsSync(dest)) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function appendGitignore(target, entries) {
  const gitignorePath = path.join(target, '.gitignore');
  if (!fs.existsSync(gitignorePath)) return;
  const existing = fs.readFileSync(gitignorePath, 'utf8');
  if (existing.includes('cmo/brand.md')) return;
  const block = [
    '',
    '# Blair — brand profiles contain private strategy and competitor intel',
    ...entries,
  ].join('\n');
  fs.appendFileSync(gitignorePath, block + '\n');
  console.log('  Added Blair entries to .gitignore');
}

async function main() {
  console.log('\nBlair — AI CMO Agent');
  console.log('────────────────────\n');

  // Resolve target directory
  let target = process.argv[2];
  if (!target) {
    const answer = await ask('Where is your project? (path, or press Enter for current directory): ');
    target = answer || process.cwd();
  }

  target = path.resolve(target);

  if (!fs.existsSync(target)) {
    console.error(`Error: directory not found: ${target}`);
    process.exit(1);
  }

  console.log(`\nInstalling Blair into: ${target}\n`);

  // Warn if .claude already exists
  if (fs.existsSync(path.join(target, '.claude'))) {
    console.log('  A .claude directory already exists in this project.');
    console.log('  Blair will merge its agents and skills into it.');
    console.log('  Existing Blair files will be overwritten.\n');
    const confirm = await ask('Continue? (y/N): ');
    if (!confirm.toLowerCase().startsWith('y')) { console.log('Cancelled.'); process.exit(0); }
  } else {
    const confirm = await ask(`Install Blair into ${target}? (y/N): `);
    if (!confirm.toLowerCase().startsWith('y')) { console.log('Cancelled.'); process.exit(0); }
  }

  if (IDE_TARGET === 'cursor') {
    const cursorAdapter = require('./cursor-adapter');
    await cursorAdapter.install(BLAIR_DIR, target);
    return;
  } else if (IDE_TARGET !== null) {
    console.error(`Unknown IDE: "${IDE_TARGET}". Supported: cursor`);
    process.exit(1);
  }

  console.log('\nCopying Blair agents and skills...');

  const blairClaude = path.join(BLAIR_DIR, '.claude');

  // Agents
  const agentsSrc = path.join(blairClaude, 'agents');
  const agentsDest = path.join(target, '.claude', 'agents');
  fs.mkdirSync(agentsDest, { recursive: true });
  for (const f of fs.readdirSync(agentsSrc).filter(n => n.startsWith('blair') && n.endsWith('.md'))) {
    fs.copyFileSync(path.join(agentsSrc, f), path.join(agentsDest, f));
  }

  // Skills
  const skillsSrc = path.join(blairClaude, 'skills');
  const skillsDest = path.join(target, '.claude', 'skills');
  for (const skillName of fs.readdirSync(skillsSrc).filter(n => n.startsWith('blair-'))) {
    const skillSrc = path.join(skillsSrc, skillName);
    if (!fs.statSync(skillSrc).isDirectory()) continue;
    const destSkillDir = path.join(skillsDest, skillName);
    fs.mkdirSync(destSkillDir, { recursive: true });
    fs.copyFileSync(path.join(skillSrc, 'SKILL.md'), path.join(destSkillDir, 'SKILL.md'));
  }

  // CMO directory — never overwrite existing brand.md
  const cmoSrc = path.join(blairClaude, 'cmo');
  const cmoDest = path.join(target, '.claude', 'cmo');
  fs.mkdirSync(cmoDest, { recursive: true });
  copyFile(path.join(cmoSrc, 'brand.md.example'), path.join(cmoDest, 'brand.md.example'));
  copyFile(path.join(cmoSrc, 'stakeholders.md.example'), path.join(cmoDest, 'stakeholders.md.example'));
  copyFile(path.join(cmoSrc, 'campaigns.md'), path.join(cmoDest, 'campaigns.md'), false);
  copyFile(path.join(cmoSrc, 'insights.md'), path.join(cmoDest, 'insights.md'), false);
  copyFile(path.join(cmoSrc, 'learnings.md'), path.join(cmoDest, 'learnings.md'), false);

  // .gitignore
  appendGitignore(target, [
    '.claude/cmo/brand.md',
    '.claude/cmo/brands/*/brand.md',
    '.claude/cmo/active-brand',
    '.claude/cmo/learnings.md',
    '.claude/cmo/stakeholders.md',
    '.claude/cmo/marquee.md',
    '.claude/cmo/pipeline.md',
  ]);

  console.log('\n  Blair installed successfully.\n');
  console.log('Next steps:');
  console.log(`  1. Open ${target} in Claude Code`);
  console.log('  2. Run /blair:start to set up your brand profile');
  console.log('  3. Start any marketing task — Blair handles the rest\n');
  console.log('Full command list: /blair:help\n');
}

main().catch(err => { console.error(err.message); process.exit(1); });
