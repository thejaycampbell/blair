---
name: blair:cold-outbound
description: Build a cold outbound sequence — cold email, LinkedIn DMs, or phone scripts — optimized for reply rate. Pass a target description or leave blank to be prompted.
---

# /blair:cold-outbound

Triggered when the user runs `/blair:cold-outbound` with an optional target description.

Examples:
- `/blair:cold-outbound`
- `/blair:cold-outbound VP of Sales at Series B SaaS companies`
- `/blair:cold-outbound SDRs at staffing agencies`

---

## Execution

**Step 1: Read brand profile**

Check `.claude/cmo/brand.md`. If it doesn't exist, tell the user:
> "Run `/blair:start` first so Blair knows your brand before building outbound sequences."
Stop here.

**Step 2: Check pipeline log**

If `.claude/cmo/pipeline.md` exists, read it. Note any active sequences to avoid duplicating.

**Step 3: Gather target context**

If the user provided a target in the command arguments, use it.

If not, ask one question:
> "Who are you reaching out to? Give me the role, company type, and ideally a trigger — e.g., 'VP of Sales at Series B SaaS companies who just posted a job for an SDR manager.'"

Wait for the answer.

**Step 4: Ask channel preference**

> "Which channel — cold email, LinkedIn DMs, phone scripts, or all three?"

Wait for the answer.

**Step 5: Spawn blair-outbound**

Invoke `blair-outbound` with this handoff:

```
## Blair Handoff — Cold Outbound

### Brand Profile
[full contents of .claude/cmo/brand.md]

### User Request
Build a cold outbound sequence.

### Target
[target description from user]

### Channel
[channel preference from user]

### Active Sequences (do not duplicate)
[contents of .claude/cmo/pipeline.md if exists, else "none"]
```

**Step 6: After delivery**

Confirm the sequence was logged to `.claude/cmo/pipeline.md`.

Offer:
> "Want me to also build a `/blair:pipeline-impact` baseline so you can track replies and revenue attributed to this sequence?"
