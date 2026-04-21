// Agent prompts are synced from .claude/agents/*.md
// To regenerate: npm run sync-agents (from web/ directory)
export { ORCHESTRATOR_PROMPT } from './orchestrator';
export { ONBOARDING_PROMPT } from './onboarding';
export { STRATEGIST_PROMPT } from './strategist';
export { RESEARCHER_PROMPT } from './researcher';
export { CAMPAIGNS_PROMPT } from './campaigns';
export { CONTENT_PROMPT } from './content';
export { COPY_PROMPT } from './copy';
export { AUDIT_PROMPT } from './audit';
export { CALENDAR_PROMPT } from './calendar';
export { REPURPOSE_PROMPT } from './repurpose';
export { SEO_PROMPT } from './seo';
export { EMAIL_PROMPT } from './email';
export { PAID_PROMPT } from './paid';
export { PR_PROMPT } from './pr';
export { SALES_ENABLEMENT_PROMPT } from './sales-enablement';
export { ANALYTICS_PROMPT } from './analytics';
export { OUTBOUND_PROMPT } from './outbound';
export { PARTNERSHIPS_PROMPT } from './partnerships';
export { LEARN_PROMPT } from './learn';

import { ORCHESTRATOR_PROMPT } from './orchestrator';
import { ONBOARDING_PROMPT } from './onboarding';
import { STRATEGIST_PROMPT } from './strategist';
import { RESEARCHER_PROMPT } from './researcher';
import { CAMPAIGNS_PROMPT } from './campaigns';
import { CONTENT_PROMPT } from './content';
import { COPY_PROMPT } from './copy';
import { AUDIT_PROMPT } from './audit';
import { CALENDAR_PROMPT } from './calendar';
import { REPURPOSE_PROMPT } from './repurpose';
import { SEO_PROMPT } from './seo';
import { EMAIL_PROMPT } from './email';
import { PAID_PROMPT } from './paid';
import { PR_PROMPT } from './pr';
import { SALES_ENABLEMENT_PROMPT } from './sales-enablement';
import { ANALYTICS_PROMPT } from './analytics';
import { OUTBOUND_PROMPT } from './outbound';
import { PARTNERSHIPS_PROMPT } from './partnerships';
import { LEARN_PROMPT } from './learn';

export const SPECIALIST_PROMPTS: Record<string, string> = {
  orchestrator: ORCHESTRATOR_PROMPT,
  onboarding: ONBOARDING_PROMPT,
  strategist: STRATEGIST_PROMPT,
  researcher: RESEARCHER_PROMPT,
  campaigns: CAMPAIGNS_PROMPT,
  content: CONTENT_PROMPT,
  copy: COPY_PROMPT,
  audit: AUDIT_PROMPT,
  calendar: CALENDAR_PROMPT,
  repurpose: REPURPOSE_PROMPT,
  seo: SEO_PROMPT,
  email: EMAIL_PROMPT,
  paid: PAID_PROMPT,
  pr: PR_PROMPT,
  'sales-enablement': SALES_ENABLEMENT_PROMPT,
  analytics: ANALYTICS_PROMPT,
  outbound: OUTBOUND_PROMPT,
  partnerships: PARTNERSHIPS_PROMPT,
  learn: LEARN_PROMPT,
};
