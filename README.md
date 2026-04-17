# Blair — AI CMO Agent

Blair is an AI Chief Marketing Officer built as a Claude Code agent bundle. It handles any marketing ask — from go-to-market strategy to paid campaigns to individual copy assets.

Clone it. Drop it into any project. Run `/blair:start`. Done.

---

## What Blair Does

**Strategy** — positioning, ICP definition, messaging hierarchy, GTM plans

**Research** — competitive intelligence, market analysis, audience behavior, channel benchmarks

**Campaigns** — multi-channel architecture, messaging maps, asset lists, timelines

**Content** — blog posts, newsletters, LinkedIn, X threads, YouTube scripts

**Copy** — ad copy, email sequences, landing page copy, headlines, subject lines

**Email programs** — welcome sequences, nurture flows, re-engagement, post-demo sequences

**Paid media** — Google Search, Meta, and LinkedIn campaign structures and creative briefs

**PR and earned media** — press releases, journalist pitches, story angles

**Sales enablement** — battle cards, objection handlers, one-pagers, ROI frameworks

**SEO and AEO** — keyword research, on-page optimization, AI engine visibility

**Analytics** — performance diagnosis, constraint identification, action plans

**Audits** — scored review of existing marketing with specific, prioritized fixes

---

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/thejaycampbell/blair
cd blair
```

### 2. Install Blair into your project

```bash
bash install.sh /path/to/your/project
```

On Windows:
```bat
install.bat C:\path\to\your\project
```

The installer copies all agents and skills, merges safely with any existing `.claude` directory, and adds the brand profile to `.gitignore`. Omit the path and the installer will ask.

### 3. Open your project in Claude Code

```bash
cd /path/to/your/project
claude
```

### 4. Run onboarding

```
/blair:start
```

Blair interviews you about your product, audience, positioning, voice, competitors, and goals — one question at a time. When it's done, your brand profile is saved to `.claude/cmo/brand.md` and Blair is ready to work.

---

## Slash Commands

| Command | What it does |
|---|---|
| `/blair:start` | Run onboarding — build your brand profile |
| `/blair:update` | Update specific brand profile fields without re-running onboarding |
| `/blair:strategy` | Positioning, ICP, messaging, GTM strategy |
| `/blair:research` | Market and competitive intelligence |
| `/blair:campaign` | Build a complete campaign end-to-end |
| `/blair:audit` | Scored audit of existing marketing |
| `/blair:calendar` | 30/60/90-day content calendar |
| `/blair:repurpose` | Repurpose one asset across all channels |
| `/blair:launch` | Coordinated launch kit — strategy, campaign, copy, and PR in one run |
| `/blair:competitor` | Deep competitor research + battle card |
| `/blair:headline` | 10 headline variations for any surface |
| `/blair:email-sequence` | Full email sequence for any trigger type |
| `/blair:swot` | Marketing SWOT with strategic synthesis and 90-day priorities |
| `/blair:review` | Scored copy review with line-by-line diagnosis and rewrites |
| `/blair:post` | Write a social post for any platform — fast |
| `/blair:status` | See what Blair knows, what's been done, and what to do next |
| `/blair:help` | Full command list with descriptions |

**Multi-brand (agencies):**

| Command | What it does |
|---|---|
| `/blair:brands` | List all brand profiles |
| `/blair:switch` | Switch the active brand |

Or just tell Blair what you need — no slash command required:

> "Write me a launch email sequence"
> "Who are my competitors and how do I differentiate?"
> "Build me a 30-day content calendar for LinkedIn"
> "Review this homepage copy"
> "What's our paid media strategy for Q3?"

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
| `blair-copy` | Conversion copy: ads, emails, landing pages, headlines |
| `blair-audit` | Scored marketing audit |
| `blair-calendar` | Content calendar planning |
| `blair-repurpose` | Content repurposing across channels |
| `blair-seo` | Keyword research, on-page SEO, AEO content briefs |
| `blair-email` | Email program strategy and full sequence writing |
| `blair-paid` | Google, Meta, and LinkedIn paid campaign structures |
| `blair-pr` | Press releases, journalist pitches, earned media |
| `blair-sales-enablement` | Battle cards, objection handlers, ROI frameworks |
| `blair-analytics` | Performance diagnosis and action planning |

---

## How It Works

**First time:**
`/blair:start` → `blair-brief` interviews you → writes `.claude/cmo/brand.md` → Blair is ready

**Every session after:**
You make a request → `blair` reads your brand profile → routes to the right specialist(s) → you get usable output

**Multi-step work:**
For complex requests, Blair chains specialists in the right order and passes context forward. A full campaign might run: `blair-researcher` → `blair-strategist` → `blair-campaigns` → `blair-copy`. You get everything synthesized at the end.

**Diagnostic step:**
For vague requests, Blair asks one sharp clarifying question before routing. "We need to grow" gets a specific question back — not a generic plan.

---

## Multi-Brand (Agencies)

Running Blair for multiple clients? Use the multi-brand setup:

```
/blair:start [client-name]    # onboard a new brand
/blair:brands                 # list all brands
/blair:switch [client-name]   # make a brand active
```

Each brand gets its own profile at `.claude/cmo/brands/[name]/brand.md` plus its own campaign log and insights history. Blair always works in the context of the active brand.

---

## File Structure

```
.claude/
├── agents/
│   ├── blair.md                    # orchestrator
│   ├── blair-brief.md              # onboarding
│   ├── blair-strategist.md
│   ├── blair-researcher.md
│   ├── blair-campaigns.md
│   ├── blair-content.md
│   ├── blair-copy.md
│   ├── blair-audit.md
│   ├── blair-calendar.md
│   ├── blair-repurpose.md
│   ├── blair-seo.md
│   ├── blair-email.md
│   ├── blair-paid.md
│   ├── blair-pr.md
│   ├── blair-sales-enablement.md
│   └── blair-analytics.md
├── cmo/
│   ├── brand.md                    # your brand profile (gitignored)
│   ├── brand.md.example            # example of a completed profile
│   ├── campaigns.md                # campaign log (auto-appended)
│   ├── insights.md                 # analytics log (auto-appended)
│   └── brands/                     # multi-brand profiles (agencies)
│       └── [brand-name]/
│           ├── brand.md
│           ├── campaigns.md
│           └── insights.md
└── skills/
    ├── blair-start/SKILL.md
    ├── blair-update/SKILL.md
    ├── blair-strategy/SKILL.md
    ├── blair-research/SKILL.md
    ├── blair-campaign/SKILL.md
    ├── blair-audit/SKILL.md
    ├── blair-calendar/SKILL.md
    ├── blair-repurpose/SKILL.md
    ├── blair-launch/SKILL.md
    ├── blair-competitor/SKILL.md
    ├── blair-headline/SKILL.md
    ├── blair-email-sequence/SKILL.md
    ├── blair-swot/SKILL.md
    ├── blair-review/SKILL.md
    ├── blair-post/SKILL.md
    ├── blair-brands/SKILL.md
    └── blair-switch/SKILL.md
```

---

## Requirements

- [Claude Code](https://claude.ai/code) (CLI or desktop app)
- Claude account (free tier works for most tasks; Research agents use web search)

---

Built by [Jay Campbell](https://thejaycampbell.com). In the spirit of [Mason](https://github.com/thejaycampbell/mason).
