# Blair — AI CMO Agent

Blair is a Claude Code agent bundle that handles any marketing ask: strategy, research, campaigns, content, copy, and audits.

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

## Slash Commands

| Command | What it does |
|---|---|
| `/blair:start` | Set up your brand profile (run once) |
| `/blair:strategy` | Positioning, ICP, messaging, GTM |
| `/blair:research` | Competitive and market intelligence |
| `/blair:campaign` | Build a full campaign end-to-end |
| `/blair:audit` | Score your existing marketing |

## How Blair Works

Blair is an orchestrator. It reads your brand profile, classifies your request, and routes to the right specialist agent. You get synthesized output — not raw agent dumps.

Specialists: `blair-brief` (onboarding), `blair-strategist`, `blair-researcher`, `blair-campaigns`, `blair-content`, `blair-copy`, `blair-audit`.

## Your Brand Profile

Stored at `.claude/cmo/brand.md` — gitignored by default (your strategy stays private). See `.claude/cmo/brand.md.example` for what a completed profile looks like.
