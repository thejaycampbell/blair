import type { Brand, Learning } from './db/schema';

function toStringRecord(val: unknown): Record<string, string> {
  if (val && typeof val === 'object' && !Array.isArray(val)) {
    return val as Record<string, string>;
  }
  return {};
}

function toArray(val: unknown): Record<string, string>[] {
  if (Array.isArray(val)) return val as Record<string, string>[];
  return [];
}

export function formatBrandContext(brand: Brand, learnings: Learning[]): string {
  const competitors = toArray(brand.competitors);
  const goals = toStringRecord(brand.goals);
  const voice = toStringRecord(brand.voice);
  const positioning = toStringRecord(brand.positioning);
  const audience = toStringRecord(brand.audience);

  const competitorLines = competitors
    .map((c) => `- ${c.name ?? JSON.stringify(c)}${c.differentiation ? `: ${c.differentiation}` : ''}`)
    .join('\n');

  const learningLines = learnings.length
    ? learnings.map((l) => `- ${l.learning}`).join('\n')
    : 'None logged yet.';

  return `## Blair Handoff Context

**Active brand:** ${brand.companyName}

**Brand Profile:**

### Product
- Name: ${brand.companyName}
- One-liner: ${brand.oneLiner ?? '[not set]'}
- Category: ${brand.category ?? '[not set]'}
- Stage: ${brand.stage ?? '[not set]'}

### Audience
- Primary ICP: ${audience.primaryIcp ?? '[not set]'}
- Secondary segments: ${audience.secondarySegments ?? 'none'}
- Not for: ${audience.notFor ?? '[not set]'}

### Positioning
- Key differentiator: ${(positioning as Record<string, string>).keyDifferentiator ?? '[not set]'}
- Proof points: ${JSON.stringify((positioning as Record<string, unknown>).proofPoints ?? [])}

### Voice & Tone
- Personality: ${voice.personality ?? '[not set]'}
- Hard bans: ${voice.hardBans ?? '[not set]'}
- Reference brand: ${voice.referenceBrand ?? '[not set]'}

### Competitors
${competitorLines || 'None listed.'}

### Goals
- Current priority: ${goals.currentPriority ?? '[not set]'}
- Active channels: ${goals.activeChannels ?? '[not set]'}
- Constraints: ${goals.constraints ?? 'none'}

**Persistent Learnings (apply these in every response):**
${learningLines}`;
}
