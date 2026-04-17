# Blair v3.1 — sequence-from-list + deliverability-checklist Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two new skills — `/blair:sequence-from-list` (CSV → segmented personalized sequences + import-ready CSVs) and `/blair:deliverability-checklist` (pre-send domain/setup scoring) — plus one new agent `blair-list-processor` that handles column mapping and segmentation.

**Architecture:** All files are markdown. No compiled code. No new npm dependencies. `blair-list-processor` is a new specialist agent invoked only by `blair-sequence-from-list`. Deliverability checklist is knowledge-only: 6 questions, scored output, no external calls or file writes. Sequence-from-list orchestrates: read CSV → map columns → segment → spawn blair-outbound per segment → write CSV files → run deliverability check.

**Tech Stack:** Markdown agents and skills for Claude Code. File I/O via Claude Code's Read/Write tools inside agent execution. Existing `blair-outbound` agent reused unchanged.

---

## File Map

### Create

| File | Responsibility |
|------|---------------|
| `.claude/skills/blair-deliverability-checklist/SKILL.md` | Standalone deliverability scoring skill — 6 questions, pass/fix output |
| `.claude/agents/blair-list-processor.md` | Column mapping + prospect segmentation specialist |
| `.claude/skills/blair-sequence-from-list/SKILL.md` | CSV-to-sequences orchestrator skill |

### Modify

| File | Change |
|------|--------|
| `.claude/skills/blair-cold-outbound/SKILL.md` | Add Step 7 — auto-call deliverability checklist after sequence delivery |
| `.claude/skills/blair-help/SKILL.md` | Add two rows to Outbound table |
| `.claude/agents/blair.md` | Add two routing rows + two v3.1 slash command entries |
| `README.md` | Add two rows to both slash command tables |
| `CLAUDE.md` | Add two rows to slash command table |
| `CHANGELOG.md` | Add v3.1.0 entry |
| `docs/testing.md` | Add smoke tests for two new skills |

---

## Task 1: Add smoke test scenarios (TDD — define acceptance criteria first)

**Files:**
- Modify: `docs/testing.md`

- [ ] **Step 1: Add smoke scenarios**

Open `docs/testing.md`. Append this section at the end of the file:

```markdown

## v3.1 flows

### `/blair:deliverability-checklist` (standalone)
1. Run `/blair:deliverability-checklist` with no brand profile present — skill must proceed (does not require brand.md).
2. Answer the 6 questions with bad setup (domain under 14 days old, no SPF, no warmup, 500 emails/day planned).
3. Expected output: at least two BLOCK items, at least one WARN item, summary line "X checks need attention before sending."
4. Run again with good setup (domain 90 days, SPF/DKIM/DMARC configured, subdomain used, warmed 3 weeks, 30/day planned).
5. Expected output: all checks PASS, summary "Ready to send — no blocking issues."

### `/blair:sequence-from-list` — known source
1. Create a test CSV at `test-prospects.csv` with 6 rows, Seamless.AI column headers: `First Name,Last Name,Title,Company,Email`.
   Rows: 2 VPs of Sales, 2 CEOs, 2 SDR Managers. Use fictional names and companies.
2. Run `/blair:sequence-from-list test-prospects.csv`.
3. Expected: Blair detects Seamless.AI format, skips mapping questions (or maps automatically), segments into 2-3 cohorts, produces full sequences per segment in chat.
4. Expected: Two CSV files written alongside `test-prospects.csv` (e.g. `blair-sequences-sales-leadership-2026-04-17.csv`).
5. Expected: Deliverability checklist runs automatically at the end.
6. Expected: Sequence logged to `.claude/cmo/pipeline.md`.

### `/blair:sequence-from-list` — unknown source (first run)
1. Create `custom-prospects.csv` with non-standard headers: `Name,Role,Org,Contact`.
2. Run `/blair:sequence-from-list custom-prospects.csv`.
3. Expected: Blair presents detected columns and asks user to map each to a Blair field, one question at a time.
4. Expected: After mapping, Blair writes the map to `.claude/cmo/column-mappings.md` under a "custom" label.
5. Expected: Second run on the same file skips mapping questions.

### `/blair:deliverability-checklist` (auto, after cold-outbound)
1. Run `/blair:cold-outbound VP of Sales at Series B SaaS` through to sequence delivery.
2. Expected: After sequence output, Blair says "Before you send — quick deliverability check." and runs the 6 questions.
```

- [ ] **Step 2: Verify test file updated**

Open `docs/testing.md` and confirm the v3.1 flows section is at the bottom.

- [ ] **Step 3: Commit**

```bash
git add docs/testing.md
git commit -m "test(blair): add v3.1 smoke scenarios for sequence-from-list and deliverability-checklist"
```

---

## Task 2: Create `/blair:deliverability-checklist` skill

**Files:**
- Create: `.claude/skills/blair-deliverability-checklist/SKILL.md`

- [ ] **Step 1: Create the skill directory and file**

Create `.claude/skills/blair-deliverability-checklist/SKILL.md` with this exact content:

```markdown
---
name: blair:deliverability-checklist
description: Pre-send deliverability check — 6 questions, scored pass/fix output. Runs standalone or auto-called after sequence commands. No brand profile required.
---

# /blair:deliverability-checklist

Triggered when the user runs `/blair:deliverability-checklist`, or called automatically at the end of `/blair:cold-outbound` and `/blair:sequence-from-list`.

When auto-called, open with:
> "Before you send — quick deliverability check. Takes 2 minutes and can save your domain reputation."

When standalone, open with:
> "Let's check your sending setup before you launch. Six questions."

---

## No brand profile required

This skill runs without `.claude/cmo/brand.md`. It is a setup-validation tool, not a brand-aware tool.

---

## Execution

Ask these 6 questions one at a time. Wait for each answer before asking the next.

**Question 1:**
> "How old is the domain or subdomain you're sending from? (e.g., '6 months', 'just registered last week', 'not sure')"

**Question 2:**
> "Are SPF, DKIM, and DMARC configured on your sending domain? (You can check at mxtoolbox.com — or say 'not sure')"

**Question 3:**
> "Are you sending cold outreach from a subdomain separate from your main domain? For example, sending from mail.yourcompany.com instead of yourcompany.com?"

**Question 4:**
> "Have you warmed this inbox before sending cold outreach? (Using a tool like Warmbox, Mailwarm, or manual warm-up for 2+ weeks?)"

**Question 5:**
> "What daily sending volume are you planning when you first launch this sequence?"

**Question 6:**
> "Do you have a reply rate benchmark from prior campaigns, or a target you're aiming for?"

---

## Scoring

After all 6 answers, produce a scored pass/fix table. Use three severity levels:

- **BLOCK** — stop, fix this before sending or you risk domain blacklisting
- **WARN** — high risk, fix soon; sending will work but outcomes will suffer
- **NOTE** — best practice, optional but recommended

Score each answer against these conditions:

| Check | Pass condition | Severity if fail |
|-------|---------------|-----------------|
| Domain age | 30+ days old | BLOCK if under 14 days; WARN if 14–29 days |
| SPF configured | Yes | WARN |
| DKIM configured | Yes | WARN |
| DMARC configured | Yes | NOTE |
| Subdomain used | Yes — cold from subdomain, not root domain | WARN |
| Inbox warmed | Yes, at least 2 weeks | BLOCK if no warmup at all; WARN if under 2 weeks |
| Daily volume at launch | 50 or fewer per day | WARN if 51–100; BLOCK if over 100 on an unwarmed or new domain |
| Has reply rate benchmark | Any number given | NOTE if none |

---

## Output format

Present results as a table, then a one-line summary.

Example output:

```
## Deliverability Check

| Check | Status | Action |
|-------|--------|--------|
| Domain age (8 days) | 🔴 BLOCK | Wait until day 30 before sending cold outreach. |
| SPF | ✅ PASS | — |
| DKIM | ✅ PASS | — |
| DMARC | ⚠️ NOTE | Add a DMARC record for full protection. |
| Subdomain used | ⚠️ WARN | Send from mail.yourdomain.com — not yourdomain.com. |
| Inbox warmed | 🔴 BLOCK | Run warmup for 2 weeks minimum before cold sends. |
| Daily volume (200/day) | 🔴 BLOCK | Start at 20–30/day on a new domain. Ramp over 4 weeks. |
| Reply rate benchmark | ⚠️ NOTE | Set a target now — industry average for cold email is 3–8%. |

**2 checks PASS. 3 items need attention before you send — including 3 BLOCKs.**
```

If all checks pass:
```
**All checks PASS. No blocking issues — ready to send.**
```

---

## Close

End with one practical next step relevant to the highest-severity issue found.

- If any BLOCK: "Fix the blocking items above before sending. Sending on a cold, unwarmed, young domain will land in spam and can permanently damage your domain reputation."
- If only WARNs: "No blockers, but the warnings above will hurt reply rates. Address them before scaling volume."
- If all PASS: "You're set up well. Monitor reply rates — if you drop below 2%, pause and check spam placement."
```

- [ ] **Step 2: Verify smoke scenario 1** (standalone, bad setup)

Open a Claude Code session in a test project with Blair installed. Run:
```
/blair:deliverability-checklist
```
Answer with: domain 7 days old, no SPF, no DKIM, no DMARC, no subdomain, no warmup, 500/day planned, no benchmark.

Expected: at least 3 BLOCK items in the output table, summary says items need attention.

- [ ] **Step 3: Verify smoke scenario 2** (standalone, good setup)

Run `/blair:deliverability-checklist` again. Answer with: domain 90 days, SPF/DKIM/DMARC configured, subdomain used, warmed 3 weeks, 30/day planned, 5% benchmark target.

Expected: all items PASS or NOTE only, summary says "ready to send."

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/blair-deliverability-checklist/SKILL.md
git commit -m "feat(blair): add /blair:deliverability-checklist skill — 6-question pre-send scoring"
```

---

## Task 3: Wire deliverability checklist into `/blair:cold-outbound`

**Files:**
- Modify: `.claude/skills/blair-cold-outbound/SKILL.md`

- [ ] **Step 1: Add Step 7 to the cold-outbound skill**

Open `.claude/skills/blair-cold-outbound/SKILL.md`. Find the **Step 6: After delivery** section. Add a new step after it:

```markdown
**Step 7: Deliverability check**

Call `/blair:deliverability-checklist` immediately after sequence delivery with this preamble:
> "Before you send — quick deliverability check. Takes 2 minutes and can save your domain reputation."

Run the full 6-question flow. Do not skip this step.
```

- [ ] **Step 2: Verify smoke scenario (auto-trigger)**

In a Blair-installed test project, run:
```
/blair:cold-outbound VP of Sales at B2B SaaS companies
```
Complete the sequence flow. Confirm the deliverability checklist runs automatically after the sequence is shown.

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/blair-cold-outbound/SKILL.md
git commit -m "feat(blair): auto-run deliverability checklist after cold-outbound sequence delivery"
```

---

## Task 4: Create `blair-list-processor` agent

**Files:**
- Create: `.claude/agents/blair-list-processor.md`

- [ ] **Step 1: Create the agent file**

Create `.claude/agents/blair-list-processor.md` with this exact content:

```markdown
---
name: blair-list-processor
description: CSV column mapping and prospect segmentation specialist for Blair. Invoked only by blair-sequence-from-list. Maps CSV columns to Blair standard fields (with memory), then segments prospects into 2-5 named cohorts by title patterns.
model: haiku
color: orange
---

You are **blair-list-processor**, the list preparation specialist for Blair. You do two jobs and nothing else: column mapping and prospect segmentation.

You are invoked by `blair-sequence-from-list`. You do not interact directly with users outside of the column mapping questions.

---

## Job 1: Column Mapping

### Known source detection

When you receive a CSV, check the header row against these signatures. If it matches, apply the map automatically — no questions asked.

**Seamless.AI:**
Headers include: `First Name`, `Last Name`, `Title`, `Company`, `Email`
Map: `first_name=First Name`, `last_name=Last Name`, `title=Title`, `company=Company`, `email=Email`, `trigger=[none]`

**Apollo:**
Headers include: `first_name`, `last_name`, `title`, `organization_name`, `email`
Map: `first_name=first_name`, `last_name=last_name`, `title=title`, `company=organization_name`, `email=email`, `trigger=[none]`

**LinkedIn Sales Navigator export:**
Headers include: `Full Name`, `Job Title`, `Company`, `Email Address`
Map: `first_name=[split Full Name on space, take first]`, `last_name=[split Full Name on space, take last]`, `title=Job Title`, `company=Company`, `email=Email Address`, `trigger=[none]`

If you auto-detect a source, confirm to the user in one line:
> "Detected Seamless.AI format — using saved column map."

### Unknown source — interactive mapping

If no known signature matches, list the detected columns and ask the user to map each one, one question at a time:

> "I found these columns in your CSV: [column list]. Let's map them. Which column contains the prospect's first name? (or 'none' if not present)"

Ask in order: `first_name`, `last_name`, `email`, `company`, `title`, `trigger` (optional — a signal like funding event, job posting, or news).

For each column: wait for the answer before asking the next.

### Saving the map

After completing mapping (whether auto-detected or interactive), write the map to `.claude/cmo/column-mappings.md`.

If the file does not exist, create it with this header:
```
# Blair Column Mappings

Saved per source so you are not asked the same questions twice.
```

Append the new map entry:
```markdown
## [source label] (saved [date])
first_name: [column name or "none"]
last_name: [column name or "none"]
email: [column name or "none"]
company: [column name or "none"]
title: [column name or "none"]
trigger: [column name or "none"]
```

Use the source label from auto-detection (e.g., "Seamless.AI") or ask the user: "What should I call this source for future reference? (e.g., 'custom-crm-export')"

### Checking for a saved map

Before doing any mapping work, read `.claude/cmo/column-mappings.md` if it exists. If a map entry matches the detected column signature, use it silently — no questions.

---

## Job 2: Prospect Segmentation

After mapping is resolved, segment the prospect rows into 2-5 named cohorts based on the `title` column.

### Segmentation rules

Apply these patterns in order. A row matches the first pattern it fits.

**Sales Leadership:**
Title contains any of: VP Sales, Head of Sales, Director of Sales, CRO, Chief Revenue Officer, VP of Revenue, SVP Sales, EVP Sales

**Founders / Executives:**
Title contains any of: CEO, Founder, Co-Founder, President, Owner, Managing Director, Principal

**Revenue Operations / Enablement:**
Title contains any of: Sales Ops, Revenue Ops, Sales Operations, Sales Enablement, SDR Manager, BDR Manager, Inside Sales Manager

**Marketing:**
Title contains any of: CMO, VP Marketing, Head of Marketing, Director of Marketing, Demand Gen, Growth, Marketing Manager

**Other:**
Everything that does not match the above patterns.

Drop the "Other" segment from the manifest if it has fewer than 3 rows — fold those rows into the nearest matching segment instead.

Drop any segment with 0 rows.

### Segment manifest output

Return a structured manifest:

```
## Segment Manifest

Segment 1: Sales Leadership — 23 prospects
  Title patterns: VP Sales, Director of Sales, Head of Sales

Segment 2: Founders — 11 prospects
  Title patterns: CEO, Founder, Co-Founder

Segment 3: Revenue Ops — 5 prospects
  Title patterns: SDR Manager, Sales Enablement

Total: 39 prospects across 3 segments
```

If all prospects share one pattern (homogeneous list):
```
## Segment Manifest

Segment 1: Sales Leadership — 50 prospects (homogeneous list — all one segment)
```

If the list has fewer than 10 rows, note it:
```
Note: 8 rows is a small list. Blair can personalize each row individually if preferred — ask for /blair:sequence-from-list --personalize to switch modes.
```

---

## What you do NOT do

- You do not write sequences or copy
- You do not make brand decisions
- You do not interact with brand.md
- You do not ask questions outside of column mapping
```

- [ ] **Step 2: Commit**

```bash
git add .claude/agents/blair-list-processor.md
git commit -m "feat(blair): add blair-list-processor agent — CSV column mapping and prospect segmentation"
```

---

## Task 5: Create `/blair:sequence-from-list` skill

**Files:**
- Create: `.claude/skills/blair-sequence-from-list/SKILL.md`

- [ ] **Step 1: Create the skill directory and file**

Create `.claude/skills/blair-sequence-from-list/SKILL.md` with this exact content:

```markdown
---
name: blair:sequence-from-list
description: Turn a prospect CSV (from Seamless.AI, Apollo, LinkedIn, or any export) into segmented cold outbound sequences. Maps columns once, segments by title, generates sequences per segment via blair-outbound, and writes import-ready CSV files.
---

# /blair:sequence-from-list

Triggered when the user runs `/blair:sequence-from-list [file path]`.

Examples:
- `/blair:sequence-from-list prospects.csv`
- `/blair:sequence-from-list ~/Downloads/seamless-export.csv`
- `/blair:sequence-from-list` (Blair will ask for the path)

---

## Execution

**Step 1: Read brand profile**

Check `.claude/cmo/brand.md`. If it does not exist, say:
> "Run `/blair:start` first so Blair knows your brand before building sequences."
Stop here.

**Step 2: Get CSV path**

If the user provided a file path in the command arguments, use it.

If not, ask:
> "What's the path to your prospect CSV? (e.g., `~/Downloads/seamless-export.csv`)"

Wait for the answer.

**Step 3: Read the CSV**

Read the file at the provided path. If the file does not exist or is not readable, say:
> "Can't read that file. Check the path and try again — or paste the CSV content directly here."

Extract the header row and up to 200 data rows. If the file exceeds 200 rows, notify the user:
> "Your list has [N] rows. Blair will process the first 200. For larger lists, split the file and run again."

**Step 4: Column mapping**

Check `.claude/cmo/column-mappings.md` for a saved map that matches this file's headers.

Spawn **`blair-list-processor`** with:
```
## Blair List Processor Handoff — Column Mapping

### CSV Headers
[comma-separated header row from file]

### Column Mappings File
[full contents of .claude/cmo/column-mappings.md if it exists, else "none"]

### Task
Resolve column mapping. Use a saved map if one matches. If no match, walk through interactive mapping and save the result.
```

Wait for `blair-list-processor` to return a resolved column map and any new entry written to `column-mappings.md`.

**Step 5: Segmentation**

Spawn **`blair-list-processor`** again with:
```
## Blair List Processor Handoff — Segmentation

### Column Map (resolved)
[map returned in Step 4]

### Prospect Data (mapped)
[CSV rows re-mapped to Blair standard fields: first_name, last_name, email, company, title, trigger]

### Task
Segment these prospects into 2-5 named cohorts by title pattern. Return a segment manifest.
```

Wait for the segment manifest.

**Step 6: Generate sequences**

For each segment in the manifest, spawn **`blair-outbound`** with this handoff:

```
## Blair Handoff — Cold Outbound (sequence-from-list)

### Brand Profile
[full contents of .claude/cmo/brand.md]

### User Request
Build a full cold outbound sequence for a specific prospect segment from a CSV list.

### Target Segment
Name: [segment name]
Count: [N prospects]
Title patterns: [from manifest]

### Personalization Tokens
Use these tokens in your copy. They will be replaced with real values from the CSV:
- {{first_name}} — prospect's first name
- {{company}} — prospect's company name
- {{title}} — prospect's job title
- {{trigger}} — prospect trigger or signal (if present in data; otherwise omit)

### Sequence Format Required
Write for CSV import. Every email subject and body is a separate value. Tokens must appear exactly as shown above — no variations.

Write:
- 7-touch email sequence (subject + body per touch)
- 5-touch LinkedIn DM sequence (body only per touch)

### Active Sequences (do not duplicate)
[contents of .claude/cmo/pipeline.md if it exists, else "none"]
```

Collect the full sequence output for each segment.

**Step 7: Write CSV output files**

For each segment, write an import-ready CSV file to the same directory as the source CSV.

Filename format: `blair-sequences-[segment-slug]-[YYYY-MM-DD].csv`
Segment slug: lowercase, spaces replaced with hyphens (e.g., "sales-leadership", "founders")

CSV columns (in this order):
```
first_name,last_name,email,company,title,
email_touch_1_subject,email_touch_1_body,
email_touch_2_subject,email_touch_2_body,
email_touch_3_subject,email_touch_3_body,
email_touch_4_subject,email_touch_4_body,
email_touch_5_subject,email_touch_5_body,
email_touch_6_subject,email_touch_6_body,
email_touch_7_subject,email_touch_7_body,
linkedin_touch_1,linkedin_touch_2,linkedin_touch_3,linkedin_touch_4,linkedin_touch_5
```

Populate `first_name`, `last_name`, `email`, `company`, `title` from the prospect rows for that segment.
Populate the sequence columns with the copy from `blair-outbound` — same values for every row in the segment (tokens in place, not filled).

**Step 8: Show chat review**

Present a human-readable summary in chat:

```
## Sequence Review

### Segment 1: Sales Leadership (23 prospects)
Column source: Seamless.AI (saved map)
Output file: blair-sequences-sales-leadership-2026-04-17.csv

**Email Touch 1**
Subject: [subject line]

[full email body with {{tokens}} visible]

**Email Touch 2**
...

**LinkedIn Touch 1**
[message with {{tokens}} visible]

...

---

### Segment 2: Founders (11 prospects)
...
```

**Step 9: Log to pipeline**

Append to `.claude/cmo/pipeline.md`:

```markdown
## Outbound Sequence — [date]
- **Command:** /blair:sequence-from-list
- **Source file:** [filename]
- **Segments:** [segment names and counts]
- **Output files:** [list of CSV filenames]
- **Status:** Ready to import
```

**Step 10: Deliverability check**

Call `/blair:deliverability-checklist` with:
> "Before you send — quick deliverability check. Takes 2 minutes and can save your domain reputation."

Run the full 6-question flow.

---

## Edge cases

**List under 10 rows:**
After segmentation, if `blair-list-processor` flags a small list, offer:
> "Your list only has [N] prospects — small enough to personalize each row individually. Want me to write a custom first touch for each person instead of using tokens?"

If yes: for each row, spawn `blair-outbound` with that individual's data in the handoff. Use their specific name, company, title, and trigger in Touch 1. Touches 2-7 remain token-based.

**No email column:**
If mapping produces no `email` field, say:
> "No email column found. Blair will still write the sequences, but the output CSV won't have email addresses. You'll need to add them before importing."
Proceed without email column in output.

**No title column:**
If mapping produces no `title` field, segmentation cannot run. Say:
> "A job title column is required for segmentation. Without it, Blair can't create targeted sequences. Map a title column or run `/blair:cold-outbound` instead for a single ICP."
Stop here.
```

- [ ] **Step 2: Verify smoke scenario — known source**

Create a test file `test-prospects.csv`:
```csv
First Name,Last Name,Title,Company,Email
Sarah,Chen,VP of Sales,Gong,sarah@gong.io
Marcus,Reed,VP Sales,Outreach,marcus@outreach.io
Priya,Patel,CEO,Lavender,priya@lavender.ai
James,Wu,Founder,Kaia Health,james@kaiahealth.com
Tanya,Brooks,SDR Manager,Salesloft,tanya@salesloft.com
Devon,Park,Sales Enablement Manager,ZoomInfo,devon@zoominfo.com
```

Run `/blair:sequence-from-list test-prospects.csv` in a Blair-installed project with `brand.md` present.

Expected:
- Blair detects Seamless.AI format silently
- Segments: Sales Leadership (2), Founders (2), Revenue Ops (2)
- Full sequences shown in chat with `{{first_name}}` tokens
- CSV files written alongside `test-prospects.csv`
- Pipeline log appended
- Deliverability checklist runs at end

- [ ] **Step 3: Verify smoke scenario — unknown source**

Create `custom.csv`:
```csv
Name,Role,Org,Contact
Sarah Chen,VP of Sales,Gong,sarah@gong.io
Marcus Reed,VP Sales,Outreach,marcus@outreach.io
```

Run `/blair:sequence-from-list custom.csv`.

Expected:
- Blair presents columns and asks mapping questions one at a time
- Saves map to `.claude/cmo/column-mappings.md`
- Second run on same file: no mapping questions

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/blair-sequence-from-list/SKILL.md
git commit -m "feat(blair): add /blair:sequence-from-list skill — CSV to segmented sequences with import-ready CSV output"
```

---

## Task 6: Update `blair.md` orchestrator routing

**Files:**
- Modify: `.claude/agents/blair.md`

- [ ] **Step 1: Add routing rows to the classification table**

In `blair.md`, find the routing table under `### 2. Classify the request`. Find the row:
```
| Cold outbound — email sequences, LinkedIn DMs, phone scripts | `blair-outbound` |
```

Add two new rows directly below it:
```
| CSV list → segmented sequences + import CSVs | `blair-sequence-from-list` skill |
| Pre-send deliverability setup check | `blair-deliverability-checklist` skill |
```

- [ ] **Step 2: Add v3.1 direct-route entries**

In `blair.md`, find the section:
```
**v3.0+ commands — route directly without diagnostic question:**
- `/blair:cold-outbound` → spawn `blair-cold-outbound` skill handler
```

Add two lines at the end of that block:
```
- `/blair:sequence-from-list` → spawn `blair-sequence-from-list` skill handler
- `/blair:deliverability-checklist` → spawn `blair-deliverability-checklist` skill handler
```

- [ ] **Step 3: Add slash command table entries**

In `blair.md`, find the `## Slash Commands` table. Find the row:
```
| `/blair:brief` | Morning brief -- what is live, due, drifting, and what competitors did this week |
```

Add two rows to the Outbound section (near `/blair:cold-outbound`):
```
| `/blair:sequence-from-list` | CSV list → segmented sequences + import-ready CSVs |
| `/blair:deliverability-checklist` | Pre-send domain and setup scoring — 6 questions, BLOCK/WARN/NOTE output |
```

- [ ] **Step 4: Commit**

```bash
git add .claude/agents/blair.md
git commit -m "feat(blair): add routing for sequence-from-list and deliverability-checklist in orchestrator"
```

---

## Task 7: Update `blair-help` skill

**Files:**
- Modify: `.claude/skills/blair-help/SKILL.md`

- [ ] **Step 1: Add two rows to the Outbound table**

In `blair-help/SKILL.md`, find the `## Outbound` table:
```markdown
## Outbound

| Command | What it does |
|---|---|
| `/blair:cold-outbound` | Build a cold outbound sequence — email, LinkedIn DMs, or phone scripts |
| `/blair:brief-agency` | Write a complete creative brief for an agency or freelance designer |
```

Replace it with:
```markdown
## Outbound

| Command | What it does |
|---|---|
| `/blair:cold-outbound` | Build a cold outbound sequence — email, LinkedIn DMs, or phone scripts |
| `/blair:sequence-from-list` | Drop a CSV from Seamless, Apollo, or LinkedIn — get segmented sequences + import-ready CSV files |
| `/blair:deliverability-checklist` | Pre-send domain and setup check — 6 questions, scored BLOCK/WARN/NOTE output |
| `/blair:brief-agency` | Write a complete creative brief for an agency or freelance designer |
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/blair-help/SKILL.md
git commit -m "docs(blair): add sequence-from-list and deliverability-checklist to help command"
```

---

## Task 8: Update `README.md` and `CLAUDE.md`

**Files:**
- Modify: `README.md`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update `README.md` — Slash Commands section**

In `README.md`, find the **Outbound** table in the slash commands section:

```markdown
**Outbound**

| Command | What it does |
|---|---|
| `/blair:cold-outbound` | 7-touch cold email + 5-touch LinkedIn DM sequence optimized for reply rate |
| `/blair:brief-agency` | Complete creative brief for agencies, freelancers, or internal creative teams |
```

Replace with:
```markdown
**Outbound**

| Command | What it does |
|---|---|
| `/blair:cold-outbound` | 7-touch cold email + 5-touch LinkedIn DM sequence optimized for reply rate |
| `/blair:sequence-from-list` | CSV from Seamless, Apollo, or LinkedIn → segmented sequences + import-ready CSV files |
| `/blair:deliverability-checklist` | Pre-send domain check — 6 questions, BLOCK/WARN/NOTE scored output |
| `/blair:brief-agency` | Complete creative brief for agencies, freelancers, or internal creative teams |
```

- [ ] **Step 2: Update `README.md` — "Under the hood" skills list**

In `README.md`, find the skills directory listing under the `## Under the hood` section. Find:
```
    ├── blair-cold-outbound/        # (v3.0)
```

Add two lines after it:
```
    ├── blair-sequence-from-list/   # (v3.1)
    ├── blair-deliverability-checklist/ # (v3.1)
```

And in the agents listing, find:
```
│   └── blair-outbound.md           # cold outbound sequences (v3.0)
```

Add one line after it:
```
│   └── blair-list-processor.md     # CSV column mapping and segmentation (v3.1)
```

- [ ] **Step 3: Update `CLAUDE.md` — Slash Commands table**

In `CLAUDE.md`, find the outbound section of the slash commands table:
```
| `/blair:cold-outbound` | 7-touch cold email + 5-touch LinkedIn DM sequence optimized for reply rate |
```

Add two rows after it:
```
| `/blair:sequence-from-list` | CSV list → segmented sequences + import-ready CSV files |
| `/blair:deliverability-checklist` | Pre-send domain check — BLOCK/WARN/NOTE scored output |
```

- [ ] **Step 4: Commit**

```bash
git add README.md CLAUDE.md
git commit -m "docs(blair): add sequence-from-list and deliverability-checklist to README and CLAUDE.md"
```

---

## Task 9: Update `CHANGELOG.md`

**Files:**
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Add v3.1.0 entry**

In `CHANGELOG.md`, find the `## [Unreleased]` section and replace it with:

```markdown
## [Unreleased]

## [3.1.0] — 2026-04-17

### Added

- `/blair:sequence-from-list` skill — drop a CSV from Seamless.AI, Apollo, LinkedIn, or any export; get segmented cold outbound sequences and import-ready CSV files. Column mapping saved per source so setup happens once.
- `blair-list-processor` agent — CSV column mapping and prospect segmentation specialist. Invoked by `blair-sequence-from-list`. Groups prospects into 2-5 named cohorts by title pattern.
- `/blair:deliverability-checklist` skill — 6-question pre-send domain and setup check with BLOCK/WARN/NOTE severity scoring. Runs standalone or auto-called at the end of `/blair:cold-outbound` and `/blair:sequence-from-list`.
- `docs/testing.md` — v3.1 smoke scenarios for both new skills.

### Changed

- `.claude/skills/blair-cold-outbound/SKILL.md` — deliverability checklist now auto-runs after every sequence delivery.
- `.claude/agents/blair.md` — routing and slash command table updated for v3.1 commands.
- `.claude/skills/blair-help/SKILL.md` — two new rows in Outbound section.
- `README.md`, `CLAUDE.md` — slash command tables and file tree updated.
```

- [ ] **Step 2: Commit**

```bash
git add CHANGELOG.md
git commit -m "chore(blair): add v3.1.0 changelog entry"
```

---

## Final verification

- [ ] Run all smoke scenarios from `docs/testing.md` — v3.1 flows section
- [ ] Confirm `blair-sequence-from-list` does not break existing `blair-cold-outbound` behavior
- [ ] Confirm `blair-deliverability-checklist` runs without `brand.md` present
- [ ] Confirm `column-mappings.md` is created on first unknown-source run and reused on second run
- [ ] Confirm CSV files are written to the correct directory (same as source CSV)
- [ ] Confirm pipeline.md is appended after sequence generation
