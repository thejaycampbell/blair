# Case study: Agency launch kit (anonymized)

**Segment:** Small marketing agency, Blair in multi-brand mode  
**Client:** B2B fintech, single product launch  
**Blair commands used:** `/blair:switch`, `/blair:launch`, `/blair:brief-agency` for handoff deck

## Situation

The agency needed a **coherent launch narrative**, **first-week social posts**, and a **creative brief** for a subcontracted designer—usually three separate meetings and a long Google Doc.

## What Blair produced

1. **Launch kit** from `/blair:launch`: positioning angle, campaign outline, launch-day email, and journalist angle list.
2. **Agency brief** from `/blair:brief-agency`: audience, message hierarchy, deliverables, brand tokens from `brand.md`.
3. **Repurposed hooks** for LinkedIn from `/blair:post` (three variants).

## Measurement

- **Time:** Principal tracked **billable prep time**. Comparable prior launch: ~9 hours internal drafting. This engagement: **~3 hours** including review (approx. **6 hours saved**). Not a controlled experiment; estimate from timesheets.
- **Outcome:** Client approved brief with **one** revision round (typical: two to three).

## Caveats

- Savings depend on how **complete** `brand.md` was before `/blair:launch`.
- Blair does not replace **legal/compliance** review for regulated clients.

## Repeatability

Store each client under `.claude/cmo/brands/<slug>/` and switch with `/blair:switch`. Export `brand.md` at project end per [agency-governance.md](../agency-governance.md).
