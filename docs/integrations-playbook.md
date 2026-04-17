# Integrations playbook

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

### Calendar

If Google Calendar integration is not available, use the **ICS-style instructions** or copy-paste blocks Blair provides (see [setup-gmail-calendar.md](setup-gmail-calendar.md)).

## What we are not building without a committed roadmap

- Native Salesforce/HubSpot **bidirectional sync**
- Automatic **email verification** or **deliverability** guarantees

Those require product and compliance work beyond this agent bundle.
