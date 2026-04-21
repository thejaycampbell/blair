import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'

export function getModel() {
  // Auto-detect provider from available API keys if not explicitly set
  const provider = process.env.AI_PROVIDER
    ?? (process.env.ANTHROPIC_API_KEY ? 'anthropic' : 'openai')

  const defaultModel = provider === 'anthropic' ? 'claude-sonnet-4-6' : 'gpt-4o'
  const model = process.env.AI_MODEL ?? defaultModel

  switch (provider) {
    case 'anthropic':
      return anthropic(model)
    case 'openai':
    default:
      return openai(model)
  }
}
