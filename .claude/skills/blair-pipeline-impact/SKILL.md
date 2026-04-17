---
name: blair:pipeline-impact
description: Review the revenue impact of your marketing — leads generated, pipeline created, deals closed, and which campaigns drove results. Connects marketing outputs to business outcomes.
---

# /blair:pipeline-impact

Triggered when the user runs `/blair:pipeline-impact`.

This command answers one question: **Is our marketing creating revenue?**

Not impressions. Not engagement. Revenue.

---

## Honest limits (read first)

- **No CRM sync:** Blair reads markdown logs (`campaigns.md`, `pipeline.md`, `insights.md`) and **numbers the user supplies**. It does **not** connect to Salesforce, HubSpot, or other APIs unless **you** wire that outside this repo.
- **Attribution is narrative, not accounting:** Multi-touch attribution, channel mix, and CAC are **only as good as the inputs**. Label guesses as **hypotheses**.
- **Rough numbers are OK:** Spreadsheets and estimates are valid if the user labels uncertainty.
- **Output is a decision brief** for the founder or marketer, not a financial statement.

Point users to `docs/measurement-playbook.md` in the Blair repo for how to log experiments honestly.

---

## Execution

**Step 1: Read all log files**

Read in order:
1. `.claude/cmo/brand.md` — current goal and stage
2. `.claude/cmo/campaigns.md` — what campaigns have run
3. `.claude/cmo/pipeline.md` — outbound sequences and their status
4. `.claude/cmo/insights.md` — prior performance reviews

**Step 2: Check for pipeline data**

Ask: "Do you have CRM or pipeline data to share? Even rough numbers — leads in, opportunities created, deals closed this period."

If yes: take the data, proceed to Step 4.
If no: go to Step 3.

**Step 3: Pipeline data intake (if no data provided)**

Ask these questions one at a time:

1. "How many leads did marketing generate this month/quarter?"
2. "How many of those became sales opportunities?"
3. "How many closed? What was the average deal size?"
4. "Which campaign, channel, or sequence drove the most leads?"
5. "What's your current CAC — cost to acquire a customer — if you know it?"

**Step 4: Spawn blair-analytics with pipeline focus**

Invoke `blair-analytics` with this handoff:

```
## Blair Handoff — Pipeline Impact Review

### Brand Profile
[full contents of .claude/cmo/brand.md]

### Focus
Pipeline impact review. Prioritize revenue attribution, lead-to-close conversion, and CAC analysis over traffic or engagement metrics.

### Campaign History
[contents of .claude/cmo/campaigns.md]

### Outbound Sequences
[contents of .claude/cmo/pipeline.md]

### Prior Insights
[contents of .claude/cmo/insights.md]

### Pipeline Data
[data from user]
```

**Step 5: After delivery**

Offer: "Want to update the pipeline log with today's numbers so you can track trends over time?"

If yes, append to `.claude/cmo/pipeline.md`:

```markdown
## Pipeline Snapshot — [date]
- **Period:** [time range]
- **Leads generated:** [N]
- **Lead → opportunity rate:** [%]
- **Opportunity → close rate:** [%]
- **Revenue attributed:** $[N]
- **Top channel:** [channel]
- **CAC:** $[N or unknown]
```
