# Changelog

All notable changes to the Blair **repository** (agents, skills, docs, installer) are documented here. Blair follows [Semantic Versioning](https://semver.org/) for tagged releases.

## [Unreleased]

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
