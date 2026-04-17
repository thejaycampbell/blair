# Measurement playbook

Use this to turn Blair outputs into **evidence**, not just artifacts.

## Before you change anything

1. **Baseline** the current asset (screenshot, exported HTML, or pasted copy in `insights.md` with a date).
2. **One variable at a time** when possible: hero only, or subject lines only, not the whole site at once.

## Lightweight A/B habits

| Surface | What to split | What to measure |
|---------|----------------|-----------------|
| Homepage | Headline + subhead | Click-through to primary CTA, or demo requests |
| Cold email | Subject line | Reply rate (not open rate alone) |
| LinkedIn post | Hook line | Comments + saves, or link clicks |

Run each test long enough for **meaningful volume** (rule of thumb: at least dozens of impressions per variant for ads; longer for low-traffic B2B sites).

## Logging in Blair’s files

Append outcomes to `.claude/cmo/insights.md`:

```markdown
## Experiment — [date]
- **Hypothesis:** [one sentence]
- **Blair asset:** [which command / file section]
- **Variant A / B:** [short description]
- **Result:** [metric + period]
- **Decision:** ship winner / iterate / discard
```

Link experiments to campaigns in `.claude/cmo/campaigns.md` by name so `/blair:weekly-brief` and `/blair:pipeline-impact` have context.

## Honest attribution

Blair does not replace your CRM. When you attribute revenue:

- Prefer **self-reported** source (“how did you hear about us?”) plus CRM stage data.
- Label **multi-touch** guesses explicitly as hypotheses.

See the limits section in the `/blair:pipeline-impact` skill and [case studies](case-studies/README.md) for documented examples.
