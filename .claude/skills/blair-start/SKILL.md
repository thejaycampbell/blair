---
name: blair:start
description: Run Blair's onboarding interview to create your persistent brand profile. Run this once — Blair uses the profile automatically for every future task. Re-run anytime your brand, product, or goals change.
---

# Blair: Start

Set up Blair for your brand. This runs a one-time intake interview and writes a persistent brand profile that all future Blair sessions use automatically.

## What this does

Spawns `blair-brief`, which will:
1. Ask you focused questions about your product, audience, positioning, voice, competitors, and goals — one at a time
2. Write a complete brand profile to `.claude/cmo/brand.md`
3. Confirm when it's ready

After this runs, Blair knows your brand. You won't be re-interviewed. You can jump straight into any marketing task.

## When to re-run

- You've pivoted the product or positioning
- Your ICP has changed
- You're entering a new market
- You want to update your brand voice or goals
- More than 3 months have passed and the profile feels stale

## Instructions

Check `.claude/cmo/brand.md` before doing anything:

**If `brand.md` does not exist:**
Invoke `blair-brief` with: "Run the full brand onboarding interview. No brand.md exists yet. Ask the 6 critical questions one at a time, write the completed profile to `.claude/cmo/brand.md`, and confirm."

**If `brand.md` exists and has no `[NEEDS BRIEF]` fields:**
Tell the user: "Your brand profile is already set up. Blair is ready — what do you want to work on?" Do not re-run onboarding.

**If `brand.md` exists but has `[NEEDS BRIEF]` fields:**
Tell the user which fields are missing, then invoke `blair-brief` with: "brand.md exists but has [NEEDS BRIEF] in these fields: [list them]. Ask only about those fields. Skip everything else. Update brand.md when done."
