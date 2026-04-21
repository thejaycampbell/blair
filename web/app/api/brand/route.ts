import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { eq, and } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { brands } from '@/lib/db/schema';
import { BrandCreateSchema, BrandUpdateSchema } from '@/lib/validation/schemas';
import { auth } from '@/auth';

// Returns the authenticated user's stable identifier (email), or null in local-only mode.
// Email is used because NextAuth v5 without a DB adapter does not expose user.id in the JWT session.
async function getSessionUserId(): Promise<string | null> {
  try {
    const session = await auth();
    return session?.user?.email ?? null;
  } catch {
    // Auth not configured (local-only mode) — proceed without userId enforcement
    return null;
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const brandId = cookieStore.get('blair_brand_id')?.value;
  if (!brandId) return NextResponse.json(null);

  const [brand] = await db.select().from(brands).where(eq(brands.id, brandId)).limit(1);
  if (!brand) return NextResponse.json(null);

  const userId = await getSessionUserId();
  if (userId && brand.userId && brand.userId !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json(brand);
}

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = BrandCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
  }

  const userId = await getSessionUserId();
  const data = parsed.data;

  const [brand] = await db
    .insert(brands)
    .values({
      userId: userId ?? undefined,
      companyName: data.companyName,
      oneLiner: data.oneLiner,
      category: data.category,
      stage: data.stage ?? 'launched',
      audience: data.audience,
      positioning: data.positioning,
      voice: data.voice,
      competitors: data.competitors ?? [],
      goals: data.goals,
      assets: data.assets ?? {},
      researchSources: data.researchSources ?? {},
    })
    .returning();

  const response = NextResponse.json(brand, { status: 201 });
  response.cookies.set('blair_brand_id', brand.id, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  });
  return response;
}

export async function PATCH(req: Request) {
  const cookieStore = await cookies();
  const brandId = cookieStore.get('blair_brand_id')?.value;
  if (!brandId) return NextResponse.json({ error: 'No brand' }, { status: 400 });

  const [brand] = await db.select().from(brands).where(eq(brands.id, brandId)).limit(1);
  if (!brand) return NextResponse.json({ error: 'Brand not found' }, { status: 404 });

  const userId = await getSessionUserId();
  if (userId && brand.userId && brand.userId !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const parsed = BrandUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
  }

  const [updated] = await db
    .update(brands)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(brands.id, brandId))
    .returning();

  return NextResponse.json(updated);
}
