import { cookies } from 'next/headers';
import { and, eq, isNull, isNotNull, desc } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { brands, conversations } from '@/lib/db/schema';
import { ConversationCreateSchema } from '@/lib/validation/schemas';

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const brandId = cookieStore.get('blair_brand_id')?.value;
  if (!brandId) return new Response('No brand', { status: 400 });

  const { searchParams } = new URL(req.url);
  const showArchived = searchParams.get('archived') === 'true';

  const rows = await db
    .select()
    .from(conversations)
    .where(
      and(
        eq(conversations.brandId, brandId),
        showArchived ? isNotNull(conversations.archivedAt) : isNull(conversations.archivedAt)
      )
    )
    .orderBy(desc(conversations.updatedAt))
    .limit(50);

  return Response.json(rows);
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const brandId = cookieStore.get('blair_brand_id')?.value;
  if (!brandId) return new Response('No brand', { status: 400 });

  // Confirm brand exists
  const [brand] = await db.select().from(brands).where(eq(brands.id, brandId)).limit(1);
  if (!brand) return new Response('Brand not found', { status: 404 });

  const rawBody = await req.json().catch(() => ({}));
  const parsed = ConversationCreateSchema.safeParse(rawBody);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Invalid input' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const [conversation] = await db
    .insert(conversations)
    .values({ brandId, title: parsed.data.title ?? 'New chat' })
    .returning();

  return Response.json(conversation);
}
