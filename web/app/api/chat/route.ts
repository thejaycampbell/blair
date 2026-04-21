import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { cookies } from 'next/headers';
import { eq, desc } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { brands, conversations, learnings, messages } from '@/lib/db/schema';
import { detectSpecialist } from '@/lib/orchestrate';
import { formatBrandContext } from '@/lib/brand-context';
import { SPECIALIST_PROMPTS } from '@/lib/agents';
import { ChatRequestSchema } from '@/lib/validation/schemas';
import { getModel } from '@/lib/ai-model';

// Edge runtime is intentional — Neon's serverless driver (@neondatabase/serverless)
// works with edge via HTTP rather than WebSockets. Node runtime is not required.
export const runtime = 'edge';

// Prepended to every system prompt in the web app.
// The CLI orchestrator prompt routes to subagents — those don't exist here.
// Blair must produce the full deliverable directly.
const WEB_DIRECTIVE = `You are Blair, an AI CMO running in a web chat interface.

CRITICAL — YOU ARE THE SPECIALIST. PRODUCE OUTPUT DIRECTLY.
- Do NOT say "I'll route this to [agent name]" — there are no other agents. You do the work.
- Do NOT say "Expect a response shortly", "One moment", or "I'll get [X] right away."
- Do NOT describe what you are about to do — just do it immediately.
- When intent is clear, skip clarifying questions and deliver the full output now.
- One clarifying question is allowed only when the request is genuinely ambiguous (no slash command, no clear deliverable type).
- Be direct, opinionated, and complete. Ship the work.`;

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = ChatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: 'Invalid input', details: parsed.error.flatten() }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { messages: chatMessages, conversationId } = parsed.data;

  const cookieStore = await cookies();
  const brandId = cookieStore.get('blair_brand_id')?.value;
  if (!brandId) {
    return new Response('No brand profile found. Please complete onboarding first.', { status: 400 });
  }

  const [brand] = await db.select().from(brands).where(eq(brands.id, brandId)).limit(1);
  if (!brand) return new Response('Brand not found.', { status: 404 });

  const recentLearnings = await db
    .select()
    .from(learnings)
    .where(eq(learnings.brandId, brandId))
    .orderBy(desc(learnings.createdAt))
    .limit(20);

  const lastUserMessage: { role: string; content: string } = chatMessages.findLast(
    (m: { role: string }) => m.role === 'user'
  ) ?? { role: 'user', content: '' };

  const specialist = detectSpecialist(lastUserMessage.content);
  const specialistPrompt = SPECIALIST_PROMPTS[specialist] ?? SPECIALIST_PROMPTS.orchestrator;
  const brandContext = formatBrandContext(brand, recentLearnings);

  const systemPrompt = `${WEB_DIRECTIVE}

---

${specialistPrompt}

---

${brandContext}`;

  // Persist the user message (if we have a conversationId)
  if (conversationId) {
    const userMsg = chatMessages[chatMessages.length - 1];
    if (userMsg?.role === 'user') {
      await db.insert(messages).values({
        brandId,
        conversationId,
        role: 'user',
        content: userMsg.content,
        specialist,
      });
    }
  }

  const result = streamText({
    model: getModel(),
    system: systemPrompt,
    messages: chatMessages,
    onError: ({ error }) => {
      console.error('[Blair] streamText error:', error);
    },
    onFinish: async ({ text }) => {
      if (!conversationId) return;

      // Persist assistant message
      await db.insert(messages).values({
        brandId,
        conversationId,
        role: 'assistant',
        content: text,
        specialist,
      });

      // Auto-title the conversation from first user message if still "New chat"
      const [conv] = await db
        .select()
        .from(conversations)
        .where(eq(conversations.id, conversationId))
        .limit(1);

      if (conv?.title === 'New chat') {
        const title = lastUserMessage.content.slice(0, 60).trim();
        await db
          .update(conversations)
          .set({ title, updatedAt: new Date(), specialist })
          .where(eq(conversations.id, conversationId));
      } else if (conv) {
        // Keep updatedAt fresh so it sorts to top
        await db
          .update(conversations)
          .set({ updatedAt: new Date(), specialist })
          .where(eq(conversations.id, conversationId));
      }

      // Log to learnings if user made a correction
      if (specialist === 'learn') {
        await db.insert(learnings).values({
          brandId,
          learning: text.slice(0, 500),
        });
      }
    },
  });

  return result.toDataStreamResponse({
    headers: { 'X-Blair-Specialist': specialist },
    getErrorMessage: (error) => {
      const msg = error instanceof Error ? error.message : String(error);
      console.error('[Blair] toDataStreamResponse error:', msg);
      return msg;
    },
  });
}
