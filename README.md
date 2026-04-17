# Blair — AI CMO Agent

Most founders are better at building than marketing. Blair bridges the gap.

Blair is an open-source CMO agent for [Claude Code](https://claude.ai/code). Answer 6 questions once. Blair learns your brand — your ICP, your voice, your competitors, your positioning. Every marketing ask after that gets a real, brand-specific answer. Not a generic one.

---

## What makes it different

**It knows your brand.** Brief Blair once with 6 questions. It writes your brand profile and reads it automatically in every future session. No re-explaining. No re-briefing. It knows who you're targeting, what you sound like, and who you're competing against.

**It gets better the longer you use it.** Every correction you make gets logged. Every specialist reads that log before acting. Tell Blair once that your brand never uses the word "streamline" -- it never uses it again, in any output, any session, going forward. Most tools reset. Blair compounds.

**It acts, not just advises.** Email copy goes straight to Gmail as a draft -- you approve and send. Campaign timelines become Google Calendar blocks. The morning brief runs competitive intelligence before you ask.

**It asks before it prescribes.** Tell Blair "we need to grow" and it asks one sharp diagnostic question before routing — not a generic 10-step plan. Diagnosis first. Work second.

**It does the actual work.** Not bullet points about what to consider. Full deliverables: positioning statements, complete email sequences, battle cards with exact scripts, landing page copy section by section, 90-day content calendars with topics and hooks.

---

## See it in action

*Founder:* `"Define our positioning."`

*Blair:* `"One question — when a customer tells a colleague about you, what do they lead with: the problem you solved, or the feature they love?"`

*Founder:* `"The problem. They say they stopped losing track of client revisions."`

*Blair:*
```
Positioning statement:
For freelance designers billing $5k–$15k/month, Dispatch is the client management
tool that replaces the Notion + email + invoice patchwork — so revision hell stops
being the default.

Unlike HoneyBook (built for photographers) and Dubsado (a CRM in disguise),
Dispatch is built for how designers actually work.

Tier 1 message: "Your clients won't remember sending that. You will."
```

Three minutes. Two messages. Something you'd actually use.

---

## What you can do with it

**Launching something**
`/blair:launch` coordinates the full kit — positioning angle, campaign architecture, launch-day copy, press release, and journalist pitch angles — in one run.

**Competitor shows up in a sales call**
`/blair:competitor HubSpot` researches their real weaknesses (from G2 reviews, Reddit, customer feedback), maps your advantages against them, and produces a battle card with exact trap questions and a one-line response to "why not just use them?"

**Homepage isn't converting**
`/blair:audit` scores your marketing across 6 dimensions with specific line-by-line diagnosis. Say "fix it" and Blair rewrites the critical issues immediately.

**Need 90 days of content**
`/blair:calendar` produces a week-by-week plan with topics, hooks, CTAs, formats, and channels — built around your ICP and what's actually working in your category.

**Just shipped a feature**
`/blair:post linkedin` writes the announcement natively for the platform — not a press release in a social post wrapper.

**Deals stalling on objections**
Ask Blair for objection handlers and it produces exact scripts: what to say, what not to say, the follow-up question that keeps the conversation open.

---

## Quick Start

**1. Clone**
```bash
git clone https://github.com/thejaycampbell/blair
cd blair
```

**2. Install into your project**
```bash
bash install.sh /path/to/your/project
```
Windows: `install.bat C:\path\to\your\project`

The installer merges safely with any existing `.claude` directory and adds the brand profile to `.gitignore`.

**3. Open in Claude Code**
```bash
cd /path/to/your/project
claude
```

**4. Run onboarding**
```
/blair:start
```

Blair asks 6 questions, one at a time. Writes your brand profile. Ready.

---

## Slash Commands

**Setup**

| Command | What it does |
|---|---|
| `/blair:start` | Build your brand profile (run once) |
| `/blair:update` | Update specific fields without re-running onboarding |
| `/blair:status` | See what Blair knows and what's been done |
| `/blair:help` | Full command list |

**Strategy & Research**

| Command | What it does |
|---|---|
| `/blair:strategy` | Positioning, ICP, messaging, GTM plan |
| `/blair:research` | Competitive and market intelligence |
| `/blair:swot` | Marketing SWOT with 90-day priorities |
| `/blair:competitor` | Deep research + battle card for any competitor |

**Campaigns & Content**

| Command | What it does |
|---|---|
| `/blair:campaign` | Full campaign end-to-end |
| `/blair:launch` | Coordinated launch kit — strategy, copy, and PR |
| `/blair:calendar` | 30/60/90-day content calendar |
| `/blair:repurpose` | Repurpose one asset across all channels |
| `/blair:post` | Platform-native social post — fast |

**Copy & Assets**

| Command | What it does |
|---|---|
| `/blair:headline` | 10 headline variations for any surface |
| `/blair:email-sequence` | Full email sequence for any trigger |
| `/blair:review` | Scored copy review with rewrites |
| `/blair:audit` | Full marketing audit with scored report |

**Agencies**

| Command | What it does |
|---|---|
| `/blair:brands` | List all brand profiles |
| `/blair:switch` | Switch the active brand |

Or skip the commands entirely and just ask:

> "Write me a welcome email sequence for trial signups"
> "Who are my top 3 competitors and how do I beat them?"
> "Give me 10 subject line options for our product launch"
> "Review this copy: [paste it]"

---

## For agencies

Running Blair across multiple clients? Each brand gets its own profile, campaign log, and insights history.

```
/blair:start acme-corp     # onboard a client
/blair:switch acme-corp    # make them active
/blair:brands              # see all clients
```

Blair always works in the context of the active brand. Switch in one command.

---

## Under the hood

Blair is a Claude Code agent bundle — no runtime, no server, no API keys beyond your Claude account. It's markdown files that Claude Code reads as agents and skills.

```
.claude/
├── agents/
│   ├── blair.md                    # orchestrator — routes every request
│   ├── blair-brief.md              # onboarding — builds brand.md
│   ├── blair-strategist.md         # positioning, ICP, GTM
│   ├── blair-researcher.md         # competitive and market intel
│   ├── blair-campaigns.md          # campaign architecture
│   ├── blair-content.md            # blog, newsletter, social, scripts
│   ├── blair-copy.md               # ads, emails, landing pages, headlines
│   ├── blair-audit.md              # scored marketing audit
│   ├── blair-calendar.md           # content calendar
│   ├── blair-repurpose.md          # cross-channel repurposing
│   ├── blair-seo.md                # SEO and AEO content
│   ├── blair-email.md              # email program strategy
│   ├── blair-paid.md               # Google, Meta, LinkedIn campaigns
│   ├── blair-pr.md                 # press releases, journalist pitches
│   ├── blair-sales-enablement.md   # battle cards, objection handlers
│   └── blair-analytics.md          # performance diagnosis
├── cmo/
│   ├── brand.md                    # your brand profile (gitignored)
│   ├── brand.md.example            # completed example
│   ├── campaigns.md                # campaign log — auto-appended
│   ├── insights.md                 # analytics log — auto-appended
│   └── brands/                     # multi-brand (agencies)
│       └── [brand-name]/
│           ├── brand.md
│           ├── campaigns.md
│           └── insights.md
└── skills/                         # slash command handlers
    ├── blair-start/
    ├── blair-update/
    ├── blair-strategy/
    ├── blair-research/
    ├── blair-campaign/
    ├── blair-audit/
    ├── blair-calendar/
    ├── blair-repurpose/
    ├── blair-launch/
    ├── blair-competitor/
    ├── blair-headline/
    ├── blair-email-sequence/
    ├── blair-swot/
    ├── blair-review/
    ├── blair-post/
    ├── blair-status/
    ├── blair-help/
    ├── blair-brands/
    └── blair-switch/
```

Want to add a specialist or modify behavior? Edit the relevant `.md` file. Each agent is self-contained and documented.

---

## Requirements

- [Claude Code](https://claude.ai/code) — CLI or desktop app
- Claude account — free tier covers most tasks

---

Built by [Jay Campbell](https://thejaycampbell.com). In the spirit of [Mason](https://github.com/thejaycampbell/mason).
