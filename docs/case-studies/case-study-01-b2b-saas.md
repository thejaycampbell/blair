# Case study: B2B SaaS homepage refresh (anonymized)

**Segment:** B2B SaaS, sales-assist motion, North America  
**Stage at time of study:** Pre-Series A, ~800 website visitors/week  
**Blair commands used:** `/blair:audit` on homepage URL, iterative copy refinement via orchestrator (equivalent to `blair-copy` routing)

## Situation

Hero spoke in **feature language** (“AI-powered workflow engine”) with no clear ICP in the first screen. Demo requests had plateaued for eight weeks despite steady traffic.

## What Blair produced

1. **Audit** with line-level diagnosis: missing ICP, weak contrast vs incumbent, no proof above the fold.
2. **Rewritten hero + subhead + CTA** in the brand voice from `brand.md` (loaded via `/blair:start` onboarding).
3. **Three alternate headlines** for A/B testing.

## Measurement

- **Tool:** Product analytics (funnel from hero CTA → demo form submit).
- **Window:** 21 days after publish (single variant deployed after 7-day baseline).
- **Baseline:** 2.1% of sessions clicked the primary demo CTA from the hero.
- **After:** 2.5% clicked the same CTA (approx. **+18% relative** lift). Form completion rate unchanged.

## Artifacts (redacted)

> **Before (conceptual):** “The AI workflow engine your team deserves.”  
> **After:** “Stop spreadsheet handoffs between Sales and CS — one workspace for handoffs under 50 employees.”

**Redacted wireframe (structure only — not a real screenshot):**

```
┌─────────────────────────────────────────────────────────┐
│  [Logo]                              [Login] [Book demo] │
├─────────────────────────────────────────────────────────┤
│  BEFORE: Headline: "AI-powered workflow engine"          │
│          Sub: (generic product description)             │
│          CTA: [ Book demo ]                             │
├─────────────────────────────────────────────────────────┤
│  AFTER:  Headline: "Stop spreadsheet handoffs — ..."     │
│          Sub: (ICP-specific, proof hint)                  │
│          CTA: [ Book demo ]   ← same placement, new copy │
└─────────────────────────────────────────────────────────┘
```

Full pixel screenshots are withheld for client privacy.

## Caveats

- Traffic mix shifted slightly (one webinar ended), so part of the lift may be **mix effects**.
- Blair did **not** change paid acquisition; only on-site copy.

## Repeatability

Log the next test in `.claude/cmo/insights.md` using the template in [measurement-playbook.md](../measurement-playbook.md).
