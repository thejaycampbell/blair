# Security and data

Blair is a **local markdown bundle** for [Claude Code](https://claude.ai/code). There is **no Blair server**, no separate Blair API, and no vendor database of your brand data.

## What lives on your machine

| Location | Contents | Git |
|----------|----------|-----|
| `.claude/cmo/brand.md` | ICP, positioning, voice, competitors | Ignored by default (see repo `.gitignore`) |
| `.claude/cmo/pipeline.md` | Marketing-attribution log, snapshots | Ignored |
| `.claude/cmo/campaigns.md`, `insights.md`, `learnings.md` | Logs and history | Usually committed (review before push) |
| `.claude/cmo/brands/<slug>/` | Multi-brand / agency profiles | `brand.md` per brand ignored |

Anyone with access to your repo or laptop can read committed files. **Do not put API keys, passwords, or regulated health/financial data in markdown profiles.**

## What leaves your machine

- **Claude / Anthropic:** When you chat in Claude Code, prompts and file contents you include are processed per [Anthropic’s policies](https://www.anthropic.com/legal/privacy) and your account settings.
- **Web tools:** If the agent uses web search or fetch, only what the model requests is retrieved (e.g. public URLs you or the agent open).
- **Google (optional):** Gmail drafts or Calendar events only occur if **you** connect Google tools in your environment and approve the action.

## Enterprise expectations

Blair today is aimed at **individuals and small teams** comfortable with markdown and Claude Code. It does **not** provide:

- SSO, org-wide RBAC, or audit logs beyond your git history
- HIPAA/SOC2 certification of Blair itself (your org’s compliance still applies to how you use AI)

**Enterprise (future — not shipped):** A different product line might add SSO, centralized policy, hosted deployment, or integration marketplaces. This open-source bundle does **not** imply that roadmap or timeline.

A realistic **future** enterprise story might include hosted policies, admin controls, or export-only integrations. That is **not** what this repo ships today.

## Practical rules

1. Treat `brand.md` like **internal strategy**: restrict repo access accordingly.
2. **Redact** customer names in logs if you share snippets publicly.
3. For **EU/UK GDPR** or similar: you remain the data controller for what you paste into chat or store in files.

For agency-specific workflows (ownership, offboarding), see [agency-governance.md](agency-governance.md).
