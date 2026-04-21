import { cookies } from 'next/headers';
import { and, eq, asc } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { messages } from '@/lib/db/schema';

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const brandId = cookieStore.get('blair_brand_id')?.value;
  if (!brandId) return new Response('No brand', { status: 400 });

  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get('conversationId');
  if (!conversationId) return new Response('conversationId required', { status: 400 });

  const rows = await db
    .select()
    .from(messages)
    .where(
      and(
        eq(messages.brandId, brandId),
        eq(messages.conversationId, conversationId)
      )
    )
    .orderBy(asc(messages.createdAt));

  // Return in useChat message format
  const formatted = rows.map((m) => ({
    id: m.id,
    role: m.role,
    content: m.content,
  }));

  return Response.json(formatted);
}
