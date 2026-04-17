# Research integrity mode

Research integrity is **default** for Blair whenever outputs name **real companies** or make **factual claims** about competitors, markets, or third parties. It keeps battle cards, outbound sequences, and GTM narratives aligned with evidence instead of confident invention.

**Full spec lives in:** `.claude/agents/blair-researcher.md` (Research integrity mode) and `.claude/agents/blair.md` (pre-flight gates).

## When integrity mode applies

| Situation | Requirement |
|-----------|-------------|
| `/blair:competitor [Name]` | Competitor Fact Table + research brief before battle card |
| Battle cards, objection handlers that cite **named** competitors | Fact Table or completed `blair-researcher` brief attached in handoff |
| Cold outbound that **asserts facts** about a named vendor (pricing, weakness, market share) | Either run research first, or strip to **hypothesis** language and label `[UNVERIFIED]` |
| Market size, funding, certifications | Citation + date; else **Gaps / not verified** |

## Competitor Fact Table (one page)

`blair-researcher` produces this **before** narrative findings when a single named competitor is in scope. Downstream agents (`blair-sales-enablement`, `blair-outbound`) must not contradict this table without new research.

```markdown
## Competitor Fact Table: [Competitor legal name]

**Research date:** [YYYY-MM-DD]
**Primary sources checked:** [homepage, pricing page, G2, etc.]

| Fact category | What we claim | Confidence (high / medium / low) | Source (URL) | Date accessed |
|---------------|---------------|----------------------------------|--------------|---------------|
| Positioning (hero) | [exact short quote or "not found"] | | | |
| Pricing (public) | [tiers or "not public"] | | | |
| ICP (stated) | [from site or "inferred"] | | | |
| Named weakness (reviews) | [theme + approx. count or "not reviewed"] | | | |

### Gaps / not verified (required)

- [What we could not confirm on the public web]

### Allowed in battle card / outbound without new research

- Rows with **high** or **medium** confidence and a **source**
- `[HYPOTHESIS]` lines explicitly tied to validation steps

### Not allowed

- New factual claims about the competitor that do not appear in this table or the attached research brief
- Paraphrased "customer quotes" without a link or screenshot reference
```

## Orchestrator pre-flight (summary)

The Blair orchestrator (`blair`):

1. Routes **`blair-researcher`** before **`blair-sales-enablement`** when the deliverable depends on competitor facts.
2. If the user insists on speed, the orchestrator may deliver **only** hypothesis-labeled copy and a visible **Research integrity: NEEDS_RESEARCH** banner.
3. Never presents invented metrics as facts.

## Related docs

- [docs/examples/competitor-battle-card-example.md](examples/competitor-battle-card-example.md)
- [docs/measurement-playbook.md](measurement-playbook.md) (evidence habits for marketing experiments)
