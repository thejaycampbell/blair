# Case study: Blair repo documentation and trust layer (named, permissioned)

**Subject:** Jay Campbell — maintainer of the Blair open-source project ([thejaycampbell/blair](https://github.com/thejaycampbell/blair))  
**Publication:** Subject consented to named publication for this case study (maintainer-authored artifact).  
**Period:** Single focused iteration aligned with the measurement habits in [measurement-playbook.md](../measurement-playbook.md).

## Situation

The Blair bundle already shipped strong orchestration and specialist agents. External reviewers still flagged a **trust gap**: competitor and outbound outputs could **feel** authoritative without a **default** Fact Table and explicit pre-flight gates. That risk matters for endorsements and for users who skip web research in session.

## What changed (Blair-on-Blair)

1. **Research integrity spec** — Added `docs/research-integrity.md` with a mandatory **Competitor Fact Table** schema, orchestrator pre-flight rules, and links to examples.
2. **Agent updates** — `blair-researcher` (integrity mode default), `blair` orchestrator (gates + PASS/NEEDS_RESEARCH banners), `blair-sales-enablement` and `blair-outbound` (no invented competitor facts).
3. **First-class command** — `/blair:research-integrity` skill so users can force the Fact Table path before battle cards or outbound.
4. **Integrations quickstart** — `docs/integrations-quickstart.md` tying lists, CRM, and Blair in a 30-minute path, pointing at the full [integrations playbook](../integrations-playbook.md).

## Measurement (honest)

| Metric | Method | Result |
|--------|--------|--------|
| **Structural coverage** | Checklist: doc exists, agents reference it, skill registered | **Met** — reproducible by reading the repo |
| **Behavioral proof** | Requires a human to run `/blair:competitor` and `/blair:research-integrity` in Claude Code | **Not claimed here** — follow [testing.md](../testing.md) locally |
| **Downstream trust** | Fewer confident-wrong competitor statements | **Hypothesis** — validate with 10 manual runs comparing before/after handoffs |

## Artifacts (verifiable in repo)

- [research-integrity.md](../research-integrity.md)
- [.claude/agents/blair-researcher.md](../../.claude/agents/blair-researcher.md) (Research integrity mode section)
- [.claude/agents/blair.md](../../.claude/agents/blair.md) (pre-flight gates)
- [.claude/skills/blair-research-integrity/SKILL.md](../../.claude/skills/blair-research-integrity/SKILL.md)

## Caveats

- This is a **process and documentation** case study, not a lift in demo conversion rate or reply rate. Those metrics belong in `insights.md` when you run real campaigns.
- **Multi-touch attribution** for “trust improved revenue” remains a hypothesis until CRM numbers are pasted into `/blair:pipeline-impact` over time.

## Reproduce

1. Clone Blair, run `/blair:start` in a test project.
2. Run `/blair:research-integrity [CompetitorName]` and confirm Fact Table + gaps appear.
3. Run `/blair:competitor [CompetitorName]` and confirm battle card follows researcher output.

See [measurement-playbook.md](../measurement-playbook.md) for how to log experiments in `.claude/cmo/insights.md`.
