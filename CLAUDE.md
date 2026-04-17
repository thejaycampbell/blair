# Blair — AI CMO Agent

Blair is a Claude Code agent bundle that handles any marketing ask: strategy, research, campaigns, content, copy, cold outbound, SEO, email, paid media, PR, sales enablement, and performance analytics — with a revenue layer that connects marketing activity to pipeline outcomes.

## Getting Started

**First time:**
```
/blair:start
```
Blair will ask you 6 questions about your brand, then write a persistent profile to `.claude/cmo/brand.md`. Every future session uses that profile automatically.

**After setup — just ask:**
> "Write me a launch email sequence"
> "Who are my competitors and how do I position against them?"
> "Build me a 30-day LinkedIn content plan"
> "Audit my homepage"
> "Review this email draft"

## Slash Commands

| Command | What it does |
|---|---|
| `/blair:start` | Set up your brand profile (run once) |
| `/blair:update` | Update specific brand.md fields without re-running onboarding |
| `/blair:strategy` | Positioning, ICP, messaging, GTM |
| `/blair:research` | Competitive and market intelligence |
| `/blair:research-integrity` | Fact Table + gaps for named competitors (high trust bar) |
| `/blair:campaign` | Build a full campaign end-to-end |
| `/blair:audit` | Score your existing marketing |
| `/blair:calendar` | 30/60/90-day content calendar |
| `/blair:repurpose` | Repurpose one asset across all channels |
| `/blair:launch` | Coordinated launch kit — strategy + campaign + assets + PR |
| `/blair:competitor` | Deep competitor research + battle card |
| `/blair:headline` | 10 headline variations for any surface |
| `/blair:email-sequence` | Full email sequence for any trigger |
| `/blair:swot` | Marketing SWOT with strategic synthesis |
| `/blair:review` | Scored copy review with line-by-line diagnosis and rewrites |
| `/blair:brief` | Morning brief -- live competitive check + what needs attention today |
| `/blair:escalation` | Escalation check -- scores every active campaign for risk |
| `/blair:cold-outbound` | 7-touch cold email + 5-touch LinkedIn DM sequence optimized for reply rate |
| `/blair:sequence-from-list` | CSV list → segmented sequences + import-ready CSV files |
| `/blair:deliverability-checklist` | Pre-send domain check — BLOCK/WARN/NOTE scored output |
| `/blair:pipeline-impact` | Connect marketing outputs to revenue — leads, pipeline, deals, CAC |
| `/blair:weekly-brief` | Monday CMO standup — what shipped, what's performing, what's next |
| `/blair:brief-agency` | Complete creative brief for agencies, freelancers, or internal creative teams |

## How Blair Works

Blair is an orchestrator. It reads your brand profile, classifies your request, and routes to the right specialist agent. You get synthesized output — not raw agent dumps.

**Specialist agents:**
- `blair-brief` — brand onboarding
- `blair-strategist` — positioning, ICP, GTM
- `blair-researcher` — competitive and market intel
- `blair-campaigns` — campaign architecture
- `blair-content` — blogs, newsletters, social, scripts
- `blair-copy` — ads, emails, landing pages, headlines
- `blair-audit` — marketing audit
- `blair-calendar` — content calendar
- `blair-repurpose` — content repurposing
- `blair-seo` — keyword research, on-page SEO, AEO
- `blair-email` — email program strategy and sequences
- `blair-paid` — Google, Meta, LinkedIn paid campaigns
- `blair-pr` — press releases, journalist pitches, earned media
- `blair-sales-enablement` — battle cards, objection handlers, one-pagers
- `blair-analytics` — performance diagnosis and recommendations
- `blair-outbound` — cold outbound sequences (email, LinkedIn DMs, phone)

## Your Brand Profile

Stored at `.claude/cmo/brand.md` — gitignored by default (your strategy stays private). See `.claude/cmo/brand.md.example` for what a completed profile looks like.

## Persistent Context Files

Blair reads these files at the start of every session. They are what makes Blair more useful the longer it runs.

| File | What it is | How it grows |
|---|---|---|
| `.claude/cmo/brand.md` | Brand profile | Set up via `/blair:start`, updated via `/blair:update` |
| `.claude/cmo/campaigns.md` | Campaign log | Auto-appended after every campaign design |
| `.claude/cmo/insights.md` | Performance log | Auto-appended after every analytics review |
| `.claude/cmo/marquee.md` | Locked messaging | Set via `blair-strategist` Marquee Messaging Lock |
| `.claude/cmo/learnings.md` | Correction and preference log | Auto-appended by `blair-learn` |
| `.claude/cmo/stakeholders.md` | Relationship context | User-written; copy from `stakeholders.md.example` |

## Campaign Log

Blair appends to `.claude/cmo/campaigns.md` after each campaign design. This prevents repeated work across sessions and lets Blair reference past campaigns for context.

## Performance Log

`blair-analytics` appends to `.claude/cmo/insights.md` after each performance review — building a running record of what's been tried and what's been learned.
- blair-partnerships -- AI presence audit, partner recruitment, content briefs, outreach pitches, content scoring

## Pipeline Log

`blair-outbound` and `blair-analytics` append to `.claude/cmo/pipeline.md` (gitignored) — tracking active outbound sequences and point-in-time pipeline snapshots. Use `/blair:pipeline-impact` to review and update.
