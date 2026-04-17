# Integrations quickstart (about 30 minutes)

Blair stays in **messaging and strategy**. Your **lists**, **CRM**, and **sending tools** stay the system of record. This page is the shortest path to a working stack: list tool → CRM → Blair → outbound.

**Full detail:** [integrations-playbook.md](integrations-playbook.md)

---

## Prerequisites

- Blair installed in your repo (`install.sh` / `install.bat`) and `/blair:start` completed so `.claude/cmo/brand.md` exists.
- Accounts you already use (or plan to use) for: prospect data, CRM, and email/LinkedIn sending.

---

## Minute 0–10: Lists and ICP

1. **Define ICP in one paragraph** — paste into `brand.md` (or run `/blair:update`) so every sequence matches how you sell.
2. **Pick your list source** — e.g. Seamless.AI, Apollo, LinkedIn Sales Navigator exports, or manual research.
3. **Export or save a redacted sample** (titles, segment) if you want Blair to mirror tone; do not paste private contact data into chat unless your policy allows it.

**Blair’s job:** copy and angles. **Your tool’s job:** emails, phones, verification.

---

## Minute 10–20: CRM and attribution

1. **Choose where opportunities live** — HubSpot, Salesforce, Pipedrive, or a spreadsheet for early stage.
2. **Weekly habit:** export or note counts — leads in, opps, closed-won — as in [integrations-playbook.md](integrations-playbook.md) pipeline snapshot template.
3. **Paste rough numbers** into `/blair:pipeline-impact` when you want a narrative on marketing vs revenue (see [measurement-playbook.md](measurement-playbook.md)).

**Blair’s job:** interpret and log in `.claude/cmo/pipeline.md` **with your numbers**. **Not:** automatic CRM sync.

---

## Minute 20–30: Blair → copy → send

1. Run **`/blair:cold-outbound`** (or `/blair:email-sequence`) for the asset text.
2. **Paste** emails or DMs into your sequencer, CRM sequence, or inbox — or use optional Gmail draft flow from [setup-gmail-calendar.md](setup-gmail-calendar.md).
3. **Create a CRM note** using the export block in [integrations-playbook.md](integrations-playbook.md) so the asset is traceable.
4. If the sequence names **competitors with facts**, run **`/blair:research-integrity`** first ([research-integrity.md](research-integrity.md)).

---

## Checklist (copy)

- [ ] `brand.md` has ICP and voice
- [ ] List tool chosen; Blair not used as lead DB
- [ ] CRM or spreadsheet is source of truth for pipeline
- [ ] Blair sequences pasted into sender; human approves sends
- [ ] Pipeline snapshots fed to `/blair:pipeline-impact` on a rhythm you can keep

---

## Next

- [integrations-playbook.md](integrations-playbook.md) — pairing patterns, CRM note templates, what Blair is not building
- [measurement-playbook.md](measurement-playbook.md) — baselines, A/B habits, honest attribution
