# Blair — AI CMO Agent

Blair is an AI Chief Marketing Officer that handles any marketing ask — from go-to-market strategy to campaign architecture to content and copy. Built as a Claude Code agent bundle.

Tell Blair what you need. Blair routes to the right specialist. You get real, usable marketing output.

---

## What Blair Does

**Strategy**
Positioning frameworks, ICP definitions, messaging hierarchies, and go-to-market plans.

**Research**
Competitive intelligence, market analysis, audience behavior, and channel research.

**Campaigns**
Multi-channel campaign architecture, messaging maps, asset lists, and timelines.

**Content**
Blog posts, newsletters, LinkedIn posts, X threads, YouTube scripts, and podcast outlines.

**Copy**
Ad copy, email sequences, landing page copy, headlines, and CTAs.

**Audits**
Scored reviews of existing marketing with specific, prioritized fixes.

---

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/thejaycampbell/blair
cd blair
```

### 2. Copy Blair into your project

```bash
cp -r .claude /path/to/your/project/
```

### 3. Open your project in Claude Code

```bash
cd /path/to/your/project
claude
```

### 4. Run onboarding

```
/blair:start
```

Blair will interview you about your product, audience, positioning, voice, competitors, and goals — one question at a time. When it's done, your brand profile is saved to `.claude/cmo/brand.md` and Blair is ready to work.

---

## Slash Commands

| Command | What it does |
|---|---|
| `/blair:start` | Run onboarding — build your brand profile |
| `/blair:strategy` | Get positioning, ICP, messaging, or GTM strategy |
| `/blair:research` | Market and competitive intelligence |
| `/blair:campaign` | Build a complete campaign end-to-end |
| `/blair:audit` | Audit existing marketing assets |

Or just tell Blair what you need:

> "Write me a launch email sequence"
> "Who are my competitors and how do I differentiate?"
> "Build me a 30-day content calendar"
> "Audit my homepage copy"

---

## Agent Roster

| Agent | Role |
|---|---|
| `blair` | Orchestrator — routes any marketing ask |
| `blair-brief` | Onboarding — builds the brand profile |
| `blair-strategist` | Positioning, ICP, messaging, GTM strategy |
| `blair-researcher` | Market and competitive intelligence |
| `blair-campaigns` | Campaign architecture and asset planning |
| `blair-content` | Long-form and social content |
| `blair-copy` | Conversion copy: ads, emails, landing pages |
| `blair-audit` | Marketing audit with scored report |

---

## How It Works

**First time:**
`/blair:start` → `blair-brief` interviews you → writes `.claude/cmo/brand.md` → Blair is ready

**Every session after:**
You make a marketing request → `blair` reads your brand profile → routes to the right specialist(s) → you get usable output

**Multi-step work:**
For complex requests, Blair chains specialists in the right order. A full campaign brief might run: `blair-researcher` → `blair-strategist` → `blair-campaigns` → `blair-copy` → `blair-content`. Each specialist passes context forward. You get everything at the end.

---

## Using Blair in Cadence / Jarvis Projects

Blair detects `.claude/identity/`, `.claude/voice/`, and `.claude/memory/` files automatically. If they exist, Blair inherits brand context from them and skips questions those files already answer.

---

## File Structure

```
.claude/
├── agents/
│   ├── blair.md              # orchestrator
│   ├── blair-brief.md        # onboarding
│   ├── blair-strategist.md   # strategy
│   ├── blair-researcher.md   # research
│   ├── blair-campaigns.md    # campaigns
│   ├── blair-content.md      # content
│   ├── blair-copy.md         # copy
│   └── blair-audit.md        # audit
├── cmo/
│   └── brand.md              # your brand profile (written by blair-brief)
└── skills/
    ├── blair-start/SKILL.md
    ├── blair-audit/SKILL.md
    ├── blair-campaign/SKILL.md
    ├── blair-strategy/SKILL.md
    └── blair-research/SKILL.md
```

---

## Requirements

- [Claude Code](https://claude.ai/code) (CLI or desktop app)
- Claude account (free tier works for basic use)

---

Built by [Jay Campbell](https://thejaycampbell.com). In the spirit of [Mason](https://github.com/thejaycampbell/mason).
