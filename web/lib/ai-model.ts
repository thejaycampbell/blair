import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'

export function getModel() {
  const provider = process.env.AI_PROVIDER ?? 'openai'
  const model = process.env.AI_MODEL ?? 'gpt-4o'

  switch (provider) {
    case 'anthropic':
      return anthropic(model)
    case 'openai':
    default:
      return openai(model)
  }
}
