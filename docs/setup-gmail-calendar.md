# Gmail and Google Calendar (optional)

Blair **does not ship a separate OAuth app**. Email drafts and calendar blocks work **only when your Claude Code environment** has the right Google integrations enabled (MCP servers, workspace actions, or manual workflow you configure).

## Preconditions

1. A **Google Cloud** project with the Gmail API and/or Calendar API enabled (if you are wiring your own integration).
2. OAuth consent configured for your workspace or test users.
3. Scopes limited to what you need, for example:
   - Gmail: `gmail.compose` for drafts (not global read if avoidable)
   - Calendar: `calendar.events` for creating events

Exact scope names change with Google’s API versions—verify in [Google’s current docs](https://developers.google.com/gmail/api).

## Failure modes

| Symptom | Likely cause |
|---------|----------------|
| “Permission denied” | Wrong Google account selected; OAuth not completed |
| Draft never appears | MCP server not running; skill invoked without mail tool |
| Calendar in wrong timezone | Default timezone on calendar resource vs local machine |

## Graceful degradation (always available)

If Google is **not** connected:

1. Blair should still output **full email body + subject** in chat for **copy-paste** into Gmail or your sequencer.
2. For calendar, Blair can output **plain-language schedule** (“Tuesday 10:00–10:30 your local time”) or an **ICS-friendly description** you paste into a calendar UI.

Skills such as `/blair:email-sequence` and `/blair:cold-outbound` assume **copy works without automation**.

## Security hygiene

- Prefer **drafts** over auto-send so a human approves every outbound.
- Do not paste **client secrets** into `brand.md` or Blair logs.

See [security-and-data.md](security-and-data.md).
