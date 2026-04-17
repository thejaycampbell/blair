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

Invoke `blair-brief` now with this context:

> Run a full brand onboarding interview for a new Blair user. Check `.claude/cmo/brand.md` first — if it exists, only ask about missing or `[NEEDS BRIEF]` fields. If it doesn't exist, run the full intake. One question at a time. When complete, write the brand profile to `.claude/cmo/brand.md` and confirm.
