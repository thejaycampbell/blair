[![RepoRanker](https://reporanker.com/badge/thejaycampbell/blair)](https://reporanker.com/repos/thejaycampbell/blair)
# Brief Blair once. Use forever.

Most founders re-explain their brand to AI every single session. Your ICP. Your voice. Your competitors. Every time.

**Blair fixes that.** Answer 7 questions once. Blair writes your brand profile and reads it automatically in every future session — in any AI IDE, in the browser, forever.

**Answer 7 questions. Start generating.

*Claude Code / Cursor user?* [Jump to IDE install ↓](#quick-start--ide-install)

---

## What Blair produces

Blair ran `/blair:strategy` on itself. One run. No editing.

```
Positioning statement:
For solo founders and 1-3 person teams who build with Claude Code or Cursor,
Blair is the AI CMO that replaces the copy-paste brand context problem — so
every marketing task starts from the same brief, not from scratch.

Unlike ChatGPT or Claude (which reset every session), Blair writes your brand
profile once and reads it automatically in every future session, in every
specialist, going forward.

Tier 1 message: "You explained your ICP 47 times last year. Blair remembers it
after one."
```

**[→ See more outputs in GitHub Discussions](https://github.com/thejaycampbell/blair/discussions)** — positioning statements, campaign briefs, cold outbound sequences, competitor battle cards.

---

## What it does

Brief Blair once → it writes your brand profile → reads it automatically in every future session.

| What you type | What you get |
|---|---|
| `/blair:strategy` | Positioning statement, ICP, messaging, GTM plan |
| `/blair:campaigns` | Full campaign brief — channels, copy, timing |
| `/blair:cold-outbound VP Sales at Series B` | 7-touch email + 5-touch LinkedIn sequence |
| `/blair:competitor HubSpot` | Battle card, trap questions, your advantages |
| `/blair:copy` | Landing page, ad, or email copy in your brand voice |
| `/blair:calendar` | 30/60/90-day content calendar for your ICP |
| `/blair:launch` | Full launch kit — positioning, copy, press, pitches |
| `/blair:audit` | Scored marketing audit — fixes applied to your files |

[Full command list ↓](#slash-commands)

---

## What it looks like
<img width="763" height="585" alt="Screenshot 2026-04-21 081205" src="https://github.com/user-attachments/assets/d5b1ac5a-ad1f-4625-8352-aadef2fbcd4e" />
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

## Pricing

**Blair is free and open source (MIT).** You bring your own AI API key — costs go to Anthropic directly, not to Blair.

| Usage | Estimated monthly cost |
|---|---|
| Light (~10 tasks/week: strategy + copy) | ~$3–8 |
| Active (campaigns + outbound + calendar) | ~$10–20 |
| Heavy (daily use, agency volume) | ~$25–50 |

**Blair Pro** — multi-brand workspaces, SSO, team roles. [Join the waitlist →](https://tally.so/r/KYByQX)

---

## Quick Start — IDE Install

**Claude Code — Mac/Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/thejaycampbell/blair/main/install.sh | bash
```

**Claude Code — Windows:**
```powershell
irm https://raw.githubusercontent.com/thejaycampbell/blair/main/install.ps1 | iex
```

**Cursor — Mac/Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/thejaycampbell/blair/main/install-cursor.sh | bash
```

**Cursor — Windows:**
```powershell
irm https://raw.githubusercontent.com/thejaycampbell/blair/main/install-cursor.ps1 | iex
```

**All IDEs — npx:**
```bash
npx blair-cmo               # Claude Code (default)
npx blair-cmo --ide cursor  # Cursor
```

Then start onboarding:
```
/blair:start
```

Blair asks 7 questions. Writes your brand profile. Every future session reads it automatically.

---

## What Blair is / isn't

**Blair is for:** founders doing their own marketing — positioning, copy, campaigns, outbound, content calendars, competitive research. If you're doing this without a CMO or agency budget, Blair gives you senior-marketer output without the headcount.

**Blair is not:** a CRM, a lead database, email verification, or a dialer. It helps you say the right things — your existing stack handles finding the people.

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
| `/blair:research-integrity` | Research with mandatory citations + Competitor Fact Table |

**Campaigns & Content**

| Command | What it does |
|---|---|
| `/blair:campaign` | Full campaign end-to-end |
| `/blair:launch` | Coordinated launch kit — strategy, copy, and PR |
| `/blair:calendar` | 30/60/90-day content calendar |
| `/blair:post` | Platform-native social post — fast |
| `/blair:repurpose` | Repurpose one asset across all channels |

**Copy & Assets**

| Command | What it does |
|---|---|
| `/blair:headline` | 10 headline variations for any surface |
| `/blair:email-sequence` | Full email sequence for any trigger |
| `/blair:review` | Scored copy review with line-by-line rewrites |
| `/blair:audit` | Full marketing audit — fixes applied directly to project files |
| `/blair:mockup` | HTML mockups — ads, email, landing pages, social |

**Revenue & Pipeline**

| Command | What it does |
|---|---|
| `/blair:pipeline-impact` | Attribution from CRM CSV export |
| `/blair:weekly-brief` | Monday CMO standup — what shipped, what's performing, what's next |

**Outbound**

| Command | What it does |
|---|---|
| `/blair:cold-outbound` | 7-touch cold email + 5-touch LinkedIn DM sequence |
| `/blair:sequence-from-list` | CSV to segmented sequences + import-ready files |
| `/blair:deliverability-checklist` | Pre-send domain check — BLOCK/WARN/NOTE scored output |
| `/blair:brief-agency` | Creative brief for agencies, freelancers, or internal teams |

---

## For agencies

```
/blair:start acme-corp     # onboard a client
/blair:switch acme-corp    # make them active
/blair:brands              # see all clients
```

Multi-brand agency workspaces → [Blair Pro waitlist](https://tally.so/r/KYByQX)

---

## How it works under the hood

Blair is an agent bundle. No runtime, no separate server, no extra API keys — it runs inside your IDE using the account you already have. Each specialist is a self-contained markdown agent file. Readable, editable, yours.

```
Claude Code:              Cursor:
.claude/                  .cursor/rules/
+-- agents/               +-- blair.mdc          ← always-on orchestrator
|   +-- blair.md          +-- blair-strategist.mdc
|   +-- blair-*.md        +-- blair-researcher.mdc
+-- cmo/                  +-- [16 more specialists]
    +-- brand.md          +-- cmo/
    +-- campaigns.md          +-- brand.md
    +-- insights.md           +-- campaigns.md
```

Your brand profile and logs are plain markdown under `.claude/cmo/`. Copy them to any project. No lock-in.

---

## Web App

Blair runs in your browser at **localhost)** — no IDE, no install, no terminal. Source is in `web/`. Self-hosting docs and required env vars: [`web/.env.example`](web/.env.example).

---

## Requirements

**IDE:** [Claude Code](https://claude.ai/code) or [Cursor](https://cursor.sh) — free tier covers most tasks.

---

**[CHANGELOG.md](CHANGELOG.md)** · Built by [Jay Campbell](https://thejaycampbell.com) · In the spirit of [Mason](https://github.com/thejaycampbell/mason)
