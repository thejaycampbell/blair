# Example: competitor research excerpt (illustrative)

This shows the **structure** `blair-researcher` and `/blair:competitor` aim for. Names are fictional.

---

## Source log (researcher)

| Claim | Confidence | Source | Accessed |
|-------|--------------|--------|----------|
| AcmeCo lists “Enterprise” tier from $499/mo | High | `https://acmeco.example/pricing` | 2026-04-10 |
| G2 reviews cite “slow support” in 12 of last 50 reviews | Medium | `https://g2.example/products/acmeco/reviews` | 2026-04-10 |
| AcmeCo shipped “Workflow 3.0” in Q1 | High | `https://acmeco.example/blog/workflow-30` press post | 2026-04-10 |

## Gaps / not verified

- **SOC2 status:** Public site says “security whitepaper on request” — certification level **not verified** (Hypothesis: SOC2 Type II unless confirmed by trust portal).
- **Win rate vs us:** No public data. **Do not invent** win/loss; ask sales for internal stats.

## Hypothesis (clearly labeled)

- **[HYPOTHESIS]** Mid-market buyers may perceive AcmeCo as **overkill** for teams under 30 seats based on pricing page emphasis on enterprise features — needs **two customer interviews** to validate.

---

## Battle card snippet (sales-enablement)

**Trap question:** “When your team last filed a priority-1 ticket, how long until a human engineer acknowledged it?”

**If they cannot answer:** Their support story may be weaker than the website claims — probe gently.

**One-line response to “Why not AcmeCo?”:** “They’re built for enterprise procurement cycles; we’re built for teams that need [specific outcome] in under two weeks.”

---

This excerpt pairs with the standards in `.claude/agents/blair-researcher.md`: **citations**, **confidence**, **gaps**, and **hypothesis** language instead of fake precision.
