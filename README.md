# Blair: your AI CMO Agent

Most founders re-explain their brand to AI every session. Your ICP. Your voice. Your competitors. Every time. Blair fixes that.

Brief Blair once. It writes your brand profile and reads it automatically in every future session -- in any AI IDE. No re-briefing. No re-explaining. It knows who you're targeting, what you sound like, and who you're competing against.

---

## See it in action

*Founder:* `"Define our positioning."`

*Blair:* `"One question -- when a customer tells a colleague about you, what do they lead with: the problem you solved, or the feature they love?"`

*Founder:* `"The problem. They say they stopped losing track of client revisions."`

*Blair:*
```
Positioning statement:
For freelance designers billing $5k-$15k/month, Dispatch is the client management
tool that replaces the Notion + email + invoice patchwork -- so revision hell stops
being the default.

Unlike HoneyBook (built for photographers) and Dubsado (a CRM in disguise),
Dispatch is built for how designers actually work.

Tier 1 message: "Your clients won't remember sending that. You will."
```

Three minutes. Two messages. Something you'd actually use.

---

## Three things that make it different

**It knows your brand.** Brief Blair once with 6 questions. Every future session reads that profile automatically -- strategy, copy, campaigns, outbound, all of it.

**It gets better over time.** Every correction you make is logged. Every specialist reads that log before acting. Tell Blair your brand never uses the word "streamline" -- it never uses it again, in any output, any session, going forward.

**It works in your IDE.** Claude Code, Cursor, and more. One command to install.

---

## What founders are saying

*This section updates as real outputs ship. [See live examples in GitHub Discussions.](https://github.com/thejaycampbell/blair/discussions)*

---

## Quick Start

**Claude Code -- Mac/Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/thejaycampbell/blair/main/install.sh | bash
```

**Claude Code -- Windows:**
```powershell
irm https://raw.githubusercontent.com/thejaycampbell/blair/main/install.ps1 | iex
```

**Cursor -- Mac/Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/thejaycampbell/blair/main/install-cursor.sh | bash
```

**Cursor -- Windows:**
```powershell
irm https://raw.githubusercontent.com/thejaycampbell/blair/main/install-cursor.ps1 | iex
```

**All IDEs -- npx:**
```bash
npx blair-cmo               # Claude Code (default)
npx blair-cmo --ide cursor   # Cursor
```

Then run onboarding:
```
/blair:start
```

Blair asks 6 questions. Writes your brand profile. Ready.

---

## What Blair is / isn't

**Blair is for:** positioning, messaging, campaigns, copy, content calendars, competitive research, battle cards, cold outbound sequences, and performance attribution.

**Blair is not:** a CRM, a lead database, email verification, or a dialer. It helps you say the right things -- your existing stack handles finding the people.

---

## What you can do with it

**Launching something**
`/blair:launch` -- positioning angle, campaign architecture, launch-day copy, press release, journalist pitches. All in one run.

**Competitor shows up in a sales call**
`/blair:competitor HubSpot` -- real weaknesses from G2 and Reddit, your advantages mapped against them, exact trap questions, one-line response to "why not just use them?"

**Homepage isn't converting**
`/blair:audit` -- scored across 6 dimensions, specific line-by-line diagnosis. Say "fix it" and Blair rewrites directly to your project files.

**Need 90 days of content**
`/blair:calendar` -- week-by-week plan with topics, hooks, CTAs, formats, and channels. Built around your ICP and what's working in your category.

**Fill your pipeline with outbound**
`/blair:cold-outbound VP of Sales at Series B SaaS` -- 7-touch cold email + 5-touch LinkedIn DM sequence, optimized for reply rate. Logs to pipeline tracker automatically.

**Starting your week**
`/blair:weekly-brief` -- reads everything Blair knows and tells you the three things to focus on this week. Proactive, not reactive.

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
| `/blair:competitor` | Deep research + battle card for any competitor |
| `/blair:swot` | Marketing SWOT with 90-day priorities |
| `/blair:research-integrity` | Research with mandatory Competitor Fact Table + citations |

**Campaigns & Content**

| Command | What it does |
|---|---|
| `/blair:campaign` | Full campaign end-to-end |
| `/blair:launch` | Coordinated launch kit -- strategy, copy, and PR |
| `/blair:calendar` | 30/60/90-day content calendar |
| `/blair:post` | Platform-native social post -- fast |
| `/blair:repurpose` | Repurpose one asset across all channels |

**Copy & Assets**

| Command | What it does |
|---|---|
| `/blair:headline` | 10 headline variations for any surface |
| `/blair:email-sequence` | Full email sequence for any trigger |
| `/blair:review` | Scored copy review with line-by-line rewrites |
| `/blair:audit` | Full marketing audit -- applies fixes directly to project files |
| `/blair:mockup` | HTML visual mockups -- ads, email, landing pages, social |

**Revenue & Pipeline**

| Command | What it does |
|---|---|
| `/blair:pipeline-impact` | Attribution from CRM CSV export |
| `/blair:weekly-brief` | Monday CMO standup -- what shipped, what's performing, what's next |

**Outbound**

| Command | What it does |
|---|---|
| `/blair:cold-outbound` | 7-touch cold email + 5-touch LinkedIn DM sequence |
| `/blair:sequence-from-list` | CSV to segmented sequences + import-ready files |
| `/blair:deliverability-checklist` | Pre-send domain check -- BLOCK/WARN/NOTE scored output |
| `/blair:brief-agency` | Creative brief for agencies, freelancers, or internal teams |

---

## For agencies

```
/blair:start acme-corp     # onboard a client
/blair:switch acme-corp    # make them active
/blair:brands              # see all clients
```

Blair Pro for agencies -- [join the waitlist](TALLY_URL_PLACEHOLDER).

---

## Under the hood

Blair is an agent bundle -- no runtime, no server, no API keys beyond your IDE account. It's markdown files your IDE reads as agents and rules.

```
Claude Code:              Cursor:
.claude/                  .cursor/rules/
+-- agents/               +-- blair.mdc          <- always-on orchestrator
|   +-- blair.md          +-- blair-strategist.mdc
|   +-- blair-*.md        +-- blair-researcher.mdc
+-- cmo/                  +-- [16 more specialists]
    +-- brand.md          +-- cmo/
    +-- campaigns.md          +-- brand.md
    +-- insights.md           +-- campaigns.md
```

Want to add a specialist or modify behavior? Edit the relevant file. Each agent is self-contained.

---

## Requirements

- An AI IDE: [Claude Code](https://claude.ai/code) or [Cursor](https://cursor.sh)
- Free tier on either covers most tasks

---

## Portability

Your brand profile and logs are plain markdown under `.claude/cmo/` or `.cursor/cmo/`. Copy them to any project. No lock-in.

**Versioned changes:** [CHANGELOG.md](CHANGELOG.md)

---

## Version history

**v4.0** — Multi-IDE: Cursor support, `npx blair-cmo --ide cursor`, one-command Cursor installers. Compound engine: 12-week Blair-on-Blair publishing schedule, founder outreach playbook, Blair Pro agency waitlist. README rewritten pain-first.

**v3.1** — One-command install (`npx blair-cmo`), CSV list-to-sequence, deliverability checklist, HTML visual mockups, CRM pipeline attribution, audit fixes applied directly to files.

**v3.0** — Revenue layer: cold outbound, pipeline tracking, weekly CMO brief, agency briefing, fast onboarding.

**v2.x** — Multi-brand support, slash commands, morning brief, escalation check.

**v1.0** — Core agents: strategy, research, campaigns, copy, content, email, audit, calendar, repurpose, PR, sales enablement, analytics, paid, SEO.

---

Built by [Jay Campbell](https://thejaycampbell.com). In the spirit of [Mason](https://github.com/thejaycampbell/mason).
