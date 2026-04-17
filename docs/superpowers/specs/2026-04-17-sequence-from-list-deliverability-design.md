# Blair v3.1 — sequence-from-list + deliverability-checklist

**Date:** 2026-04-17
**Status:** Approved for implementation
**Scope:** Two new skills, one new agent, zero new dependencies

---

## Problem

`/blair:cold-outbound` writes great sequences for personas ("VP of Sales at Series B SaaS") but real outbound targets specific humans with specific context. The gap between persona-copy and deployable-outbound requires manual work: export a list, describe the ICP by hand, get copy, paste it back. Every handoff is a drop-off.

Additionally, Blair produces no deliverability guidance — a founder can write perfect copy and land in spam every time.

---

## What We're Building

### 1. `/blair:sequence-from-list`

Takes a CSV export from any data source (Seamless.AI, Apollo, LinkedIn Sales Nav, spreadsheet). Groups prospects into 2-5 micro-segments by shared title patterns. Generates a full 7-touch email + 5-touch LinkedIn sequence per segment using `blair-outbound`. Outputs a human-readable chat review and import-ready CSV files.

### 2. `/blair:deliverability-checklist`

A knowledge-only skill that asks 6 targeted questions about sending setup and returns a scored pass/fix list with severity levels. Runs standalone and auto-appended at the end of `/blair:cold-outbound` and `/blair:sequence-from-list`.

---

## Architecture

### New files

```
.claude/skills/
  blair-sequence-from-list/SKILL.md
  blair-deliverability-checklist/SKILL.md

.claude/agents/
  blair-list-processor.md

.claude/cmo/
  column-mappings.md              (created on first run, persists across sessions)
```

### Modified files

```
.claude/skills/blair-cold-outbound/SKILL.md   — add deliverability checklist call at end
.claude/skills/blair-help/SKILL.md            — add two new commands to table
.claude/agents/blair.md                        — add routing for new slash commands
README.md                                      — add two rows to slash command table
CLAUDE.md                                      — add two rows to slash command table
CHANGELOG.md                                   — v3.1.0 entry
```

No new npm dependencies. No external API calls. No changes to existing agent behavior.

---

## Detailed Design

### `/blair:sequence-from-list` — Skill

**Trigger:** `/blair:sequence-from-list [file path]`

**Execution flow:**

1. **Read brand profile** — check `.claude/cmo/brand.md`. If missing, prompt `/blair:start` and stop.

2. **Read CSV** — user passes file path as argument, or Blair asks for it.

3. **Column mapping**
   - Check `.claude/cmo/column-mappings.md` for a saved map matching the source
   - Auto-detect source by column header signature:
     - Seamless.AI: `First Name, Last Name, Title, Company, Email`
     - Apollo: `first_name, last_name, title, organization_name, email`
     - LinkedIn Sales Nav: `Full Name, Job Title, Company, Email Address`
   - If no saved map found: spawn `blair-list-processor` to walk through mapping
   - Save completed map to `column-mappings.md` for future runs

4. **Segmentation** — spawn `blair-list-processor` with mapped data. Returns 2-5 named segments with prospect counts and shared characteristics.

5. **Sequence generation** — for each segment, spawn `blair-outbound` with:
   - Full brand profile
   - Segment description (title patterns, company type, any trigger column data)
   - Personalization tokens to use: `{{first_name}}`, `{{company}}`, `{{title}}`, `{{trigger}}` (if present)
   - Instruction to write for import: tokens must be valid CSV column values

6. **Output** — two artifacts per segment:
   - **Chat review:** full sequence with tokens visible, human-readable
   - **CSV file:** written to the same directory as the source CSV, filename `blair-sequences-[segment-slug]-[date].csv`

7. **Pipeline log** — append sequence metadata to `.claude/cmo/pipeline.md`

8. **Deliverability handoff** — call `/blair:deliverability-checklist` inline with message: *"Before you send — quick deliverability check."*

**CSV output columns:**
`first_name`, `last_name`, `email`, `company`, `title`, `email_touch_1_subject`, `email_touch_1_body`, `email_touch_2_subject`, `email_touch_2_body` ... through touch 7, then `linkedin_touch_1` through `linkedin_touch_5`

**Limits:**
- Rows processed per run: up to 200 (segmentation scales; per-row personalization does not)
- Segments: 2-5 (fewer produces generic output; more fragments uselessly)
- If fewer than 10 rows: Blair notes the list is small enough for manual personalization and offers to do row-by-row first-touch customization instead

---

### `blair-list-processor` — Agent

**Role:** CSV column mapping and prospect segmentation specialist.

**Invoked by:** `blair-sequence-from-list` skill only.

**Column mapping behavior:**
- Presents detected columns to user
- Maps each to Blair standard fields: `first_name`, `last_name`, `email`, `company`, `title`, `trigger` (optional), `notes` (optional)
- Asks one mapping question at a time
- On completion, writes map to `.claude/cmo/column-mappings.md` under a source label

**Segmentation behavior:**
- Groups prospects by `title` column into 2-5 cohorts using pattern matching:
  - Sales leadership: VP/Head/Director of Sales, CRO, Chief Revenue Officer
  - Founders/Executives: CEO, Founder, Co-Founder, President, Owner
  - Revenue ops/enablement: Sales Ops, Revenue Ops, Sales Enablement, SDR Manager
  - Marketing: CMO, VP Marketing, Head of Marketing, Demand Gen
  - Other: anything that doesn't fit above gets grouped together
- Returns a structured segment manifest:
  ```
  Segment 1: Sales Leadership — 23 prospects
  Segment 2: Founders — 11 prospects
  Segment 3: Revenue Ops — 8 prospects
  ```
- If all prospects share one title pattern: returns single segment, notes homogeneity

---

### `/blair:deliverability-checklist` — Skill

**Trigger:** `/blair:deliverability-checklist` or auto-called at end of sequence commands

**Execution — 6 questions asked one at a time:**

1. How old is your sending domain or subdomain?
2. Are SPF, DKIM, and DMARC configured on your sending domain?
3. Are you sending cold outbound from a subdomain (e.g. `mail.company.com`) separate from your main domain?
4. Have you warmed this inbox? (Tool like Warmbox/Mailwarm, or manual warm-up?)
5. What daily sending volume are you planning at launch?
6. What reply rate are you targeting, and do you have a benchmark from prior campaigns?

**Output — scored pass/fix list:**

Each item rated: **BLOCK** (stop, fix before sending) / **WARN** (high risk, fix soon) / **NOTE** (best practice, optional).

| Check | Pass condition | Fail severity |
|-------|---------------|---------------|
| Domain age | 30+ days old | BLOCK if under 14 days, WARN if 14-30 |
| SPF configured | Yes | WARN |
| DKIM configured | Yes | WARN |
| DMARC configured | Yes | NOTE |
| Subdomain used | Yes | WARN (main domain reputation at risk) |
| Inbox warmed | Yes, 2+ weeks | BLOCK if no warmup at all |
| Daily volume | Under 50/day at launch | WARN if over 100/day cold start |
| Reply rate benchmark | Has a number | NOTE if none (can't diagnose later) |

Closes with one-line summary: *"X checks passed, Y need attention before sending."*

No external calls. No file writes (informational output only). Runs in under 2 minutes.

---

### Modified: `/blair:cold-outbound`

Add one step after sequence delivery:

```
**Step 7: Deliverability check**

Before closing, call `/blair:deliverability-checklist` with:
> "Before you send — quick deliverability check. Takes 2 minutes and can save your domain reputation."
```

---

## Data File: `column-mappings.md`

Created at `.claude/cmo/column-mappings.md` on first `/blair:sequence-from-list` run.

Format:
```markdown
# Blair Column Mappings

## Seamless.AI (saved 2026-04-17)
first_name: First Name
last_name: Last Name
email: Email
company: Company
title: Title
trigger: [none]

## Apollo (saved 2026-04-20)
first_name: first_name
last_name: last_name
email: email
company: organization_name
title: title
trigger: [none]
```

Gitignored alongside `brand.md` — contains prospect data.

---

## Success Criteria

- A founder with a 50-row Seamless export can go from CSV to two import-ready sequence CSVs in one Blair session
- Column mapping for a known source takes zero questions on second run
- Deliverability checklist surfaces at least one actionable fix for 80% of first-time cold outbound users
- No changes to behavior of existing skills or agents

---

## Out of Scope

- Bidirectional CRM sync
- Email sending (Blair does not send mail)
- Email verification or bounce handling
- Per-row personalization for lists over 20 rows (addressed by segmentation + tokens)
- Support for non-CSV formats (Google Sheets, Excel) — user exports to CSV first

---

## Files Changed Summary

| File | Action |
|------|--------|
| `.claude/skills/blair-sequence-from-list/SKILL.md` | Create |
| `.claude/skills/blair-deliverability-checklist/SKILL.md` | Create |
| `.claude/agents/blair-list-processor.md` | Create |
| `.claude/skills/blair-cold-outbound/SKILL.md` | Modify — add deliverability step |
| `.claude/skills/blair-help/SKILL.md` | Modify — add two rows |
| `.claude/agents/blair.md` | Modify — add routing |
| `README.md` | Modify — add two rows to slash command table |
| `CLAUDE.md` | Modify — add two rows to slash command table |
| `CHANGELOG.md` | Modify — v3.1.0 entry |
