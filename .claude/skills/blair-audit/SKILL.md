---
name: blair:audit
description: Audit your existing marketing assets. Blair reviews your homepage, emails, social presence, campaigns, or any specific asset for positioning gaps, weak copy, inconsistency, and missed opportunities. Returns a scored report with specific fixes.
---

# Blair: Audit

Get a CMO-level review of your marketing assets. Blair audits what exists, scores it across six dimensions, and tells you exactly what to fix.

## What gets audited

Pass Blair any combination of:
- Your homepage URL
- A landing page URL
- Email copy (paste it or give a file path)
- Ad copy
- Social posts
- A full campaign
- "Everything" — Blair will ask what assets you have

## What you get back

A scored audit report covering:
- **Positioning clarity** — does your marketing communicate what you do and for whom in 5 seconds?
- **Messaging consistency** — does the same story show up across all channels?
- **Copy quality** — is your copy specific, direct, and outcome-focused?
- **Proof and credibility** — do your claims have evidence behind them?
- **ICP alignment** — are you speaking to the right people in their language?
- **Channel fit** — is your content native to the platform it's on?

Each area is scored 1-10. Critical issues, high-priority fixes, and what's working — all in one report.

## Instructions

Read `.claude/cmo/brand.md` first. If it doesn't exist, tell the user to run `/blair:start` before auditing.

If brand.md exists, invoke `blair-audit` with:

> Audit the following marketing assets for [brand name]. Brand profile is in `.claude/cmo/brand.md`. Assets to audit: [list what the user provided — URLs, pasted copy, file paths]. Run the full 6-dimension audit and return a scored report with specific fixes prioritized by impact.

If the user ran `/blair:audit` without specifying assets, ask: "What would you like me to audit? Share a URL, paste some copy, or tell me what marketing assets you want reviewed."
