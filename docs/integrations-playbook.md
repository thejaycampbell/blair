# Integrations playbook

**New here?** Start with the 30-minute [integrations quickstart](integrations-quickstart.md), then return here for templates and depth.

Blair is **messaging, strategy, and copy**. It is **not** a system of record for contacts, email verification, or CRM.

## One-sentence map

- **Use Blair for:** positioning, campaigns, sequences, battle cards, audits, calendars, creative briefs, and structured logs that *you* interpret.
- **Use a data/sales tool for:** finding leads, verifying emails, dialing, enforcing compliance, and storing opportunities as the source of truth.

## Pairing patterns

### Lists and prospecting

1. Build or buy a list in your tool of choice (e.g. Seamless, Apollo, LinkedIn exports).
2. **Paste** a small, redacted sample ICP description into Blair (or keep it in `brand.md`) so sequences stay on-message.
3. Run `/blair:cold-outbound` for **copy**. Paste sends into your sequencer or CRM; Blair does not send mail by itself unless you wire Gmail yourself.

### CRM and attribution

1. Export weekly or monthly stats (leads, opps, closed-won) from your CRM or spreadsheet.
2. Paste **rough numbers** into `/blair:pipeline-impact` or append snapshots to `.claude/cmo/pipeline.md`.
3. Treat Blair’s output as **analysis and narrative**, not automated CRM sync.

### Blair output → CRM tasks

After Blair produces a sequence or campaign:

- Create **tasks** or **notes** in CRM with the asset link or pasted summary.
- Use a single owner field so follow-up is clear.

### Export block templates (copy into CRM notes or `pipeline.md`)

Use these as-is so you do not improvise structure.

**CRM note (sequence shipped):**

```markdown
## Blair asset — [date]
- **Command:** /blair:cold-outbound or /blair:email-sequence
- **ICP:** [one line from brand.md]
- **Owner:** [name]
- **Paste or link:** [GDoc URL or “see thread 2026-04-17”]
- **Send channel:** [Outreach / HubSpot sequences / manual]
```

**Pipeline snapshot (paste into `/blair:pipeline-impact` or append `pipeline.md`):**

```markdown
## Pipeline snapshot — [period]
- Leads in: [N]
- Opportunities: [N]
- Closed-won: [N] ($[amount] optional)
- Top source (best guess): [channel/campaign]
- Confidence: [high / medium / rough estimate]
```

### Calendar

If Google Calendar integration is not available, use the **ICS-style instructions** or copy-paste blocks Blair provides (see [setup-gmail-calendar.md](setup-gmail-calendar.md)).

## What we are not building without a committed roadmap

- Native Salesforce/HubSpot **bidirectional sync**
- Automatic **email verification** or **deliverability** guarantees

Those require product and compliance work beyond this agent bundle.
