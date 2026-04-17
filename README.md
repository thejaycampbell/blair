# Blair — AI CMO Agent

Most founders are better at building than marketing. Blair bridges the gap.

Blair is an open-source CMO agent for [Claude Code](https://claude.ai/code). Answer 6 questions once. Blair learns your brand — your ICP, your voice, your competitors, your positioning. Every marketing ask after that gets a real, brand-specific answer. Not a generic one.

v3.1 adds: one-command install (no git required), real pipeline attribution from CRM exports, HTML visual mockups for ads and email, and audit fixes applied directly to project files — no copy-paste loop.

---

## What Blair is / isn’t

**Blair is for:** positioning and messaging, campaign and content plans, copy and sequences, competitive research and battle cards, audits, calendars, creative briefs, and **structured logs** you use to interpret performance.

**Blair is not:** a CRM system of record, a lead database, email verification, dialers, or legal/compliance automation for outbound. Use your existing sales and data stack for those jobs. See [docs/integrations-playbook.md](docs/integrations-playbook.md).

**One sentence:** Blair helps you **say the right things** to the market and keep memory in one place; it does not replace **finding prospects** or **storing opportunities**.

---

## Results

Documented examples with metrics and caveats: [docs/case-studies/README.md](docs/case-studies/README.md) (includes one **named, permissioned** maintainer case study). To reproduce the measurement pattern: [docs/measurement-playbook.md](docs/measurement-playbook.md).

---

## Documentation

| Doc | Purpose |
|-----|---------|
| [Security and data](docs/security-and-data.md) | What stays local, what leaves your machine, enterprise limits |
| [Agency governance](docs/agency-governance.md) | Multi-brand ownership and offboarding |
| [Integrations playbook](docs/integrations-playbook.md) | How Blair pairs with lists, CRM, calendar |
| [Integrations quickstart](docs/integrations-quickstart.md) | ~30-minute list → CRM → Blair → send checklist |
| [Research integrity](docs/research-integrity.md) | Competitor Fact Table, pre-flight gates, trust defaults |
| [Setup: Gmail / Calendar](docs/setup-gmail-calendar.md) | Optional Google wiring and fallbacks |
| [Manual testing](docs/testing.md) | Maintainer smoke checklist |
| [Roadmap](docs/roadmap.md) | Non-binding future directions |
| [Partner one-pager](docs/partner-one-pager.md) | Short external summary |
| [Contributing](CONTRIBUTING.md) | How to contribute and triage |

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

**Need to fill your pipeline with outbound**
`/blair:cold-outbound VP of Sales at Series B SaaS` writes a full 7-touch cold email sequence and a 5-touch LinkedIn DM sequence — personalized to that ICP, optimized for reply rate. Logs to your pipeline tracker automatically.

**Want to know if your marketing is actually driving revenue**
`/blair:pipeline-impact` connects **your** campaign log and **numbers you provide** (CRM export, spreadsheet, or rough estimates) into a structured review. It does **not** auto-sync your CRM. Attribution stays honest: see the skill and [docs/measurement-playbook.md](docs/measurement-playbook.md).

**Starting your week**
`/blair:weekly-brief` reads everything Blair knows — active campaigns, outbound sequences, last performance review — and tells you the three things to do this week. Proactive, not reactive.

**Handing off to an agency or designer**
`/blair:brief-agency homepage redesign` produces a complete, structured creative brief — audience, message, deliverables, brand specs, timeline — ready to email. No reformatting needed.

---

## Quick Start

**Mac / Linux — one command, no git required:**
```bash
curl -fsSL https://raw.githubusercontent.com/thejaycampbell/blair/main/install.sh | bash
```

**Windows — one command in PowerShell:**
```powershell
irm https://raw.githubusercontent.com/thejaycampbell/blair/main/install.ps1 | iex
```

**npm / npx (all platforms):**
```bash
npx blair-cmo
```

Each installer asks where your project lives, merges safely with any existing `.claude` directory, and adds the brand profile to `.gitignore`.

**Prefer git?**
```bash
git clone https://github.com/thejaycampbell/blair
bash blair/install.sh /path/to/your/project
```

**Then open your project in Claude Code and run onboarding:**
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
| `/blair:research-integrity` | Research with mandatory Competitor Fact Table + gaps |
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
| `/blair:audit` | Full marketing audit — scored report + applies fixes directly to project files |
| `/blair:mockup` | HTML visual mockup — ads, email templates, landing page sections, social graphics |

**Revenue & Pipeline**

| Command | What it does |
|---|---|
| `/blair:pipeline-impact` | Real attribution from CRM CSV export (HubSpot, Salesforce, Pipedrive, or manual) |
| `/blair:weekly-brief` | Monday CMO standup — what shipped, what's performing, what's next |

**Outbound**

| Command | What it does |
|---|---|
| `/blair:cold-outbound` | 7-touch cold email + 5-touch LinkedIn DM sequence optimized for reply rate |
| `/blair:sequence-from-list` | CSV from Seamless, Apollo, or LinkedIn → segmented sequences + import-ready CSV files |
| `/blair:deliverability-checklist` | Pre-send domain check — 6 questions, BLOCK/WARN/NOTE scored output |
| `/blair:brief-agency` | Complete creative brief for agencies, freelancers, or internal creative teams |

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
│   ├── blair-analytics.md          # performance diagnosis
│   ├── blair-outbound.md           # cold outbound sequences (v3.0)
│   └── blair-list-processor.md     # CSV column mapping and segmentation (v3.1)
├── cmo/
│   ├── brand.md                    # your brand profile (gitignored)
│   ├── brand.md.example            # completed example
│   ├── campaigns.md                # campaign log — auto-appended
│   ├── insights.md                 # analytics log — auto-appended
│   ├── pipeline.md                 # pipeline tracker — auto-appended (gitignored, v3.0)
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
    ├── blair-research-integrity/   # Fact Table + gaps (named competitors)
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
    ├── blair-switch/
    ├── blair-cold-outbound/        # (v3.0)
    ├── blair-sequence-from-list/   # (v3.1)
    ├── blair-deliverability-checklist/ # (v3.1)
    ├── blair-pipeline-impact/      # (v3.0)
    ├── blair-weekly-brief/         # (v3.0)
    └── blair-brief-agency/         # (v3.0)
```

Want to add a specialist or modify behavior? Edit the relevant `.md` file. Each agent is self-contained and documented.

**Repository docs** (case studies, security, measurement): see the `docs/` folder in this repo.

---

## Requirements

- [Claude Code](https://claude.ai/code) — CLI or desktop app
- Claude account — free tier covers most tasks

---

## Portability and lock-in

- **Your brand profile and logs are plain markdown** under `.claude/cmo/`. You can copy them into another project or paste relevant sections into any chat UI.
- **Blair’s logic is files in this repo** (`agents/`, `skills/`). There is no separate Blair runtime.
- **Anthropic / Claude Code** is the execution environment today. See [docs/roadmap.md](docs/roadmap.md) for non-binding future ideas.
- **Versioned changes:** [CHANGELOG.md](CHANGELOG.md).

---

## Version history

**v3.0.2** — Research integrity (`docs/research-integrity.md`, `/blair:research-integrity`), integrations quickstart, named maintainer case study.

**v3.0** — Revenue layer: cold outbound (`/blair:cold-outbound`), pipeline tracking (`/blair:pipeline-impact`), weekly CMO brief (`/blair:weekly-brief`), agency briefing (`/blair:brief-agency`), fast-lane onboarding (`/blair:start --fast`), LinkedIn native grammar overhaul.

**v2.x** — Multi-brand support, slash commands, morning brief, escalation check, partnerships agent.

**v1.0** — Core agents: strategy, research, campaigns, copy, content, email, audit, calendar, repurpose, PR, sales enablement, analytics, paid, SEO.

---

Built by [Jay Campbell](https://thejaycampbell.com). In the spirit of [Mason](https://github.com/thejaycampbell/mason).
