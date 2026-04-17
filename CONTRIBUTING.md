# Contributing to Blair

Thanks for helping improve Blair. This project is **markdown agents and skills** for Claude Code, plus installers.

## Ways to contribute

- **Bug reports:** Wrong routing, broken slash command behavior, or harmful default instructions in an agent.
- **Research quality:** Instances where a specialist invented citations or ignored the research standards—file with the bad-output template.
- **Docs:** Clearer boundaries (what Blair is / isn’t), safer defaults, or measurement examples.
- **Examples:** Redacted, permissioned case studies with metrics (see `docs/case-studies/`).

## Principles

1. **Do not weaken research discipline** (citations, confidence, gaps). Propose stricter defaults when in doubt.
2. **Do not imply CRM sync or auto-send email** unless the repo actually ships that integration.
3. **Keep changes surgical**—one agent or skill per focused PR unless tightly coupled.

## Development flow

1. Fork or branch (per your workflow).
2. Edit the relevant file under `.claude/agents/` or `.claude/skills/<name>/SKILL.md`.
3. Run the manual checklist in [docs/testing.md](docs/testing.md).
4. Update [CHANGELOG.md](CHANGELOG.md) under `[Unreleased]` if the change is user-visible.

## Triaging

Maintainers optimize for **clarity and safety** over feature count. PRs that add new surface area without docs or tests (manual checklist) may be asked to split.

## Code of conduct

Be direct and respectful. Disagree with the prompt, not the person.
