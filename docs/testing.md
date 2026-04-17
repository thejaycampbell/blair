# Manual smoke test (maintainers)

Run after changing agents or skills, or after `install.sh` / `install.bat` into a clean project.

## Environment

- [ ] Claude Code installed and logged in
- [ ] Test project has Blair installed (`install.sh` / `install.bat` from repo root)

## Core flows

1. **`/blair:start`** (or fast mode if documented) completes and creates `.claude/cmo/brand.md` (or marks `[NEEDS BRIEF]` where expected).
2. **`/blair:status`** reads profile without error.
3. **`/blair:competitor TestCo`** (fictional): researcher attempts tool-based fetch or clearly states **gaps** if tools unavailable.
4. **`/blair:pipeline-impact`**: skill presents **attribution limits** and asks for user numbers or proceeds with logs only.
5. **Docs present:** `docs/security-and-data.md`, `docs/case-studies/README.md` open in repo.

## Multi-brand (optional)

1. `/blair:start client-a` and `/blair:switch client-a` if your install supports slug onboarding.
2. Confirm `active-brand` or equivalent points at the right folder.

## Gmail / Calendar (optional)

- If no Google MCP: confirm email skill still outputs **copy-paste-ready** full text.

Record failures as GitHub issues using the “Bad output / research quality” template.

## v3.1 flows

### `/blair:deliverability-checklist` (standalone)
1. Run `/blair:deliverability-checklist` with no brand profile present — skill must proceed (does not require brand.md).
2. Answer the 6 questions with bad setup (domain under 14 days old, no SPF, no warmup, 500 emails/day planned).
3. Expected output: at least two BLOCK items, at least one WARN item, summary line “X checks need attention before sending.”
4. Run again with good setup (domain 90 days, SPF/DKIM/DMARC configured, subdomain used, warmed 3 weeks, 30/day planned).
5. Expected output: all checks PASS, summary “Ready to send — no blocking issues.”

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
4. Expected: After mapping, Blair writes the map to `.claude/cmo/column-mappings.md` under a user-provided label.
5. Expected: Second run on the same file skips mapping questions.

### `/blair:deliverability-checklist` (auto, after cold-outbound)
1. Run `/blair:cold-outbound VP of Sales at Series B SaaS` through to sequence delivery.
2. Expected: After sequence output, Blair says “Before you send — quick deliverability check.” and runs the 6 questions.
