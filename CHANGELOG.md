# Changelog

All notable changes to the Blair **repository** (agents, skills, docs, installer) are documented here. Blair follows [Semantic Versioning](https://semver.org/) for tagged releases.

## [Unreleased]

## [3.1.1] — 2026-04-17

### Added

- **One-command install** — `curl | bash` (Mac/Linux), `irm | iex` PowerShell (Windows), and `npx blair-cmo` (all platforms). No `git clone` required. `package.json` + `bin/install.js` added.
- `install.ps1` — Windows PowerShell installer. Downloads from GitHub as a zip, no git dependency.
- **`blair-data-import` agent** — reads `.claude/cmo/data/pipeline-export.csv`, auto-detects CRM source (HubSpot, Salesforce, Pipedrive, Close, generic), maps columns, and returns structured pipeline metrics per source.
- **`blair-visual` agent** — generates self-contained HTML/CSS mockups for ads (5 standard sizes), email templates (table-based, production-ready), landing page sections (responsive), social post graphics, and OG images. Writes files to `.claude/cmo/visuals/`. Includes spec sheet export for designer handoff.
- **`blair-apply` agent** — takes rewritten copy from audit cycle and applies it directly to project files (`.html`, `.jsx`, `.tsx`, `.md`, `.vue`, `.svelte`). Exact-match replacement, one fix at a time, logs all changes.
- `/blair:mockup` skill — generates HTML visual mockups on demand. Supports `ad linkedin`, `ad instagram`, `ad story`, `email [type]`, `hero`, `pricing`, `social`, `og`.
- `docs/crm-export-guide.md` — step-by-step export instructions for HubSpot, Salesforce, Pipedrive, Close, and spreadsheet/manual tracking.
- `.claude/cmo/data/` directory — drop CRM exports here for `/blair:pipeline-impact` to read automatically.

### Changed

- `/blair:pipeline-impact` skill — now checks for `.claude/cmo/data/pipeline-export.csv` first. Spawns `blair-data-import` for real data. Falls back to manual intake with a prompt pointing to the new CRM export guide.
- `/blair:audit` skill — after delivering the scored report, Blair asks for file paths and applies fixes directly via `blair-copy` → `blair-apply` pipeline. No more copy-paste loop.
- `blair-audit` agent — added "After delivering the audit report" section with three fix paths: apply to files, show copy blocks, or route strategic issues to `blair-strategist`.
- `README.md` — install section now leads with one-command paths. Slash command table updated with `/blair:mockup` and revised `/blair:pipeline-impact` and `/blair:audit` descriptions.
- `install.sh` — creates `.claude/cmo/data/` directory and adds `pipeline.md` to `.gitignore`.
- `blair.md` orchestrator — routing table updated with visual mockup path (`blair-copy` → `blair-visual`).

## [3.1.0] — 2026-04-17

### Added

- `/blair:sequence-from-list` skill — drop a CSV from Seamless.AI, Apollo, LinkedIn, or any export; get segmented cold outbound sequences and import-ready CSV files. Column mapping saved per source so setup happens once.
- `blair-list-processor` agent — CSV column mapping and prospect segmentation specialist. Invoked by `blair-sequence-from-list`. Groups prospects into 2-5 named cohorts by title pattern.
- `/blair:deliverability-checklist` skill — 6-question pre-send domain and setup check with BLOCK/WARN/NOTE severity scoring. Runs standalone or auto-called at the end of `/blair:cold-outbound` and `/blair:sequence-from-list`.
- `docs/testing.md` — v3.1 smoke scenarios for both new skills.

### Changed

- `.claude/skills/blair-cold-outbound/SKILL.md` — deliverability checklist now auto-runs after every sequence delivery.
- `.claude/agents/blair.md` — routing and slash command table updated for v3.1 commands.
- `.claude/skills/blair-help/SKILL.md` — two new rows in Outbound section.
- `README.md`, `CLAUDE.md` — slash command tables and file tree updated.

## [3.0.2] — 2026-04-17

### Added

- `docs/research-integrity.md` — Competitor Fact Table schema, orchestrator pre-flight rules, and trust defaults.
- `/blair:research-integrity` skill — forces Fact Table + gaps before battle cards or competitor-heavy outbound.
- `docs/integrations-quickstart.md` — ~30-minute list → CRM → Blair → send checklist (links to integrations playbook).
- `docs/case-studies/case-study-03-jay-campbell-blair-dogfood.md` — named, permissioned maintainer case study using measurement-playbook habits.

### Changed

- `.claude/agents/blair-researcher.md` — Research integrity mode default for named competitors; Fact Table before matrix.
- `.claude/agents/blair.md` — Pre-flight gates, PASS/NEEDS_RESEARCH banners, slash command table entry.
- `.claude/agents/blair-sales-enablement.md`, `.claude/agents/blair-outbound.md` — No invented competitor facts without research handoff.
- `.claude/skills/blair-competitor/SKILL.md`, `.claude/skills/blair-cold-outbound/SKILL.md`, `.claude/skills/blair-help/SKILL.md` — Aligned with integrity flow.
- `docs/integrations-playbook.md` — Quickstart link at top.
- `docs/case-studies/README.md` — Third case study row.

## [3.0.1] — 2026-04-17

### Added

- `docs/` library: security, agency governance, integrations and measurement playbooks, case studies, research examples, setup and testing guides, roadmap, partner one-pager.
- `CHANGELOG.md`, `CONTRIBUTING.md`, GitHub issue template for bad outputs.
- Orchestrator scope boundaries; researcher citation/confidence/gaps standards; pipeline-impact honesty block; competitor verification step; email/outbound graceful degradation; optional `Research sources` in brand profile and `/blair:update sources`.

### Changed

- `docs/integrations-playbook.md`: copy-paste export block templates for CRM notes and pipeline snapshots.
- `docs/case-studies/case-study-01-b2b-saas.md`: redacted ASCII wireframe artifact (plan acceptance).
- `docs/security-and-data.md`: explicit **Enterprise (future)** non-shipped bullet.

## [3.0.0] — 2025 (tagged)

- Revenue layer: cold outbound, pipeline-impact, weekly brief, agency brief, fast onboarding, LinkedIn grammar updates.
- See git tag `v3.0.0` for the exact tree.

## [2.x]

- Multi-brand, slash commands, morning brief, escalation, partnerships agent.

## [1.0]

- Core agents: strategy, research, campaigns, copy, content, email, audit, calendar, repurpose, PR, sales enablement, analytics, paid, SEO.
