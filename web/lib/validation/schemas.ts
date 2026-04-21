import { z } from 'zod'

const AudienceSchema = z.object({
  primaryIcp: z.string().max(1000).optional(),
  secondarySegments: z.string().max(500).optional(),
  notFor: z.string().max(500).optional(),
}).optional()

const PositioningSchema = z.object({
  keyDifferentiator: z.string().max(1000).optional(),
  proofPoints: z.array(z.string().max(500)).max(10).optional(),
}).optional()

const VoiceSchema = z.object({
  personality: z.string().max(200).optional(),
  hardBans: z.string().max(500).optional(),
  referenceBrand: z.string().max(200).optional(),
}).optional()

const CompetitorSchema = z.object({
  name: z.string().max(200),
  differentiation: z.string().max(500).optional(),
})

const GoalsSchema = z.object({
  currentPriority: z.enum(['awareness', 'acquisition', 'retention', 'revenue']).optional(),
  activeChannels: z.string().max(500).optional(),
  constraints: z.string().max(500).optional(),
}).optional()

const AssetsSchema = z.record(z.string(), z.unknown()).optional()

const ResearchSourcesSchema = z.record(z.string(), z.unknown()).optional()

export const BrandCreateSchema = z.object({
  companyName: z.string().min(1).max(200),
  oneLiner: z.string().max(500).optional(),
  category: z.string().max(100).optional(),
  stage: z.string().max(100).optional(),
  audience: AudienceSchema,
  positioning: PositioningSchema,
  voice: VoiceSchema,
  competitors: z.array(CompetitorSchema).max(20).optional(),
  goals: GoalsSchema,
  assets: AssetsSchema,
  researchSources: ResearchSourcesSchema,
})

export const BrandUpdateSchema = z.object({
  companyName: z.string().min(1).max(200).optional(),
  oneLiner: z.string().max(500).optional(),
  category: z.string().max(100).optional(),
  stage: z.string().max(100).optional(),
  audience: AudienceSchema,
  positioning: PositioningSchema,
  voice: VoiceSchema,
  competitors: z.array(CompetitorSchema).max(20).optional(),
  goals: GoalsSchema,
  assets: AssetsSchema,
  researchSources: ResearchSourcesSchema,
})

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().max(100000),
})

export const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageSchema).min(1).max(200),
  conversationId: z.string().uuid().optional(),
})

export const ConversationCreateSchema = z.object({
  title: z.string().min(1).max(100).optional(),
})
