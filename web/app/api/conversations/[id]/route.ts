import { cookies } from 'next/headers';
import { and, eq } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { conversations, messages } from '@/lib/db/schema';

type Params = Promise<{ id: string }>;

// Verify conversation belongs to the current brand before any mutation
async function resolveConversation(id: string, brandId: string) {
  const [conv] = await db
    .select()
    .from(conversations)
    .where(and(eq(conversations.id, id), eq(conversations.brandId, brandId)))
    .limit(1);
  return conv ?? null;
}

/** PATCH — rename or archive/unarchive */
export async function PATCH(req: Request, { params }: { params: Params }) {
  const cookieStore = await cookies();
  const brandId = cookieStore.get('blair_brand_id')?.value;
  if (!brandId) return new Response('Unauthorized', { status: 401 });

  const { id } = await params;
  const conv = await resolveConversation(id, brandId);
  if (!conv) return new Response('Not found', { status: 404 });

  const body = await req.json().catch(() => ({}));
  const updates: Partial<typeof conv> = {};

  if (typeof body.title === 'string' && body.title.trim()) {
    updates.title = body.title.trim().slice(0, 100);
  }

  if (body.archived === true) {
    updates.archivedAt = new Date();
  } else if (body.archived === false) {
    updates.archivedAt = null;
  }

  if (Object.keys(updates).length === 0) {
    return new Response('No valid fields to update', { status: 400 });
  }

  const [updated] = await db
    .update(conversations)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(conversations.id, id))
    .returning();

  return Response.json(updated);
}

/** DELETE — permanently remove conversation and all its messages */
export async function DELETE(_req: Request, { params }: { params: Params }) {
  const cookieStore = await cookies();
  const brandId = cookieStore.get('blair_brand_id')?.value;
  if (!brandId) return new Response('Unauthorized', { status: 401 });

  const { id } = await params;
  const conv = await resolveConversation(id, brandId);
  if (!conv) return new Response('Not found', { status: 404 });

  // Delete messages first (FK constraint)
  await db.delete(messages).where(eq(messages.conversationId, id));
  await db.delete(conversations).where(eq(conversations.id, id));

  return new Response(null, { status: 204 });
}
