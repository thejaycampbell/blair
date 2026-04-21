export type Specialist =
  | 'orchestrator'
  | 'strategist'
  | 'researcher'
  | 'campaigns'
  | 'content'
  | 'copy'
  | 'audit'
  | 'calendar'
  | 'repurpose'
  | 'seo'
  | 'email'
  | 'paid'
  | 'pr'
  | 'sales-enablement'
  | 'analytics'
  | 'outbound'
  | 'partnerships'
  | 'learn'
  | 'onboarding';

type RoutingRule = { patterns: (string | RegExp)[]; specialist: Specialist };

// Rules are matched first-wins in order. More specific patterns must come before broad ones.
// E.g. 'cold email' must appear before 'email sequence' to avoid misrouting outbound requests.
const ROUTING_RULES: RoutingRule[] = [
  {
    patterns: ['/blair:strategy', 'positioning', 'icp', 'ideal customer', 'gtm', 'go-to-market', 'messaging', 'differentiat'],
    specialist: 'strategist',
  },
  {
    patterns: ['/blair:competitor', '/blair:research', 'competitor', 'vs ', ' vs.', 'battle card', 'market research', 'competitive'],
    specialist: 'researcher',
  },
  {
    patterns: ['/blair:campaign', '/blair:launch', 'campaign', 'launch plan', 'launch kit'],
    specialist: 'campaigns',
  },
  {
    patterns: ['/blair:calendar', 'content calendar', 'content plan', '30 day', '60 day', '90 day', 'publishing schedule'],
    specialist: 'calendar',
  },
  {
    patterns: ['/blair:cold-outbound', '/blair:outbound', 'cold email', 'cold outbound', 'outbound sequence', 'linkedin dm', 'prospecting'],
    specialist: 'outbound',
  },
  {
    patterns: ['/blair:audit', 'audit my', 'audit the', 'review my', 'score my', 'review the homepage', 'review my homepage'],
    specialist: 'audit',
  },
  {
    patterns: ['/blair:email-sequence', 'email sequence', 'email flow', 'welcome email', 'drip', 'nurture sequence'],
    specialist: 'email',
  },
  {
    patterns: ['/blair:headline', 'headline', 'tagline', 'hero copy', 'subject line'],
    specialist: 'copy',
  },
  {
    patterns: ['/blair:post', '/blair:repurpose', 'linkedin post', 'twitter', 'social post', 'repurpose', 'tweet'],
    specialist: 'content',
  },
  {
    patterns: ['/blair:seo', 'seo', 'keyword', 'search ranking', 'organic', 'aeo'],
    specialist: 'seo',
  },
  {
    patterns: ['/blair:paid', 'google ads', 'meta ads', 'facebook ads', 'linkedin ads', 'paid media', 'ppc'],
    specialist: 'paid',
  },
  {
    patterns: ['/blair:pr', 'press release', 'journalist', 'pr pitch', 'earned media', 'publication'],
    specialist: 'pr',
  },
  {
    patterns: ['battle card', 'objection', 'sales enablement', 'one-pager', 'sales deck'],
    specialist: 'sales-enablement',
  },
  {
    patterns: ['/blair:pipeline-impact', '/blair:weekly-brief', 'pipeline', 'revenue', 'cac', 'attribution', 'what shipped', 'weekly brief'],
    specialist: 'analytics',
  },
  {
    patterns: ['remember that', 'log that', 'never say', 'stop using', "don't say", 'preference', 'always use'],
    specialist: 'learn',
  },
  {
    patterns: ['partnership', 'affiliate', 'co-market', 'guest post', 'authority'],
    specialist: 'partnerships',
  },
];

export function detectSpecialist(message: string): Specialist {
  const lower = message.toLowerCase();
  for (const rule of ROUTING_RULES) {
    for (const pattern of rule.patterns) {
      if (typeof pattern === 'string' ? lower.includes(pattern) : pattern.test(lower)) {
        return rule.specialist;
      }
    }
  }
  return 'orchestrator';
}
