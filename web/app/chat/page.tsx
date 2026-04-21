import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { eq, desc } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { brands, conversations } from '@/lib/db/schema';
import { ChatInterface } from '@/components/chat-interface';
import { BrandSidebar } from '@/components/brand-sidebar';

export const metadata = { title: 'Blair — AI CMO' };

interface ChatPageProps {
  searchParams: Promise<{ c?: string }>;
}

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const cookieStore = await cookies();
  const brandId = cookieStore.get('blair_brand_id')?.value;
  if (!brandId) redirect('/onboarding');

  const [brand] = await db.select().from(brands).where(eq(brands.id, brandId)).limit(1);
  if (!brand) redirect('/onboarding');

  const { c } = await searchParams;

  // If a specific conversation was requested, validate it belongs to this brand
  if (c) {
    const [conv] = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, c))
      .limit(1);

    if (conv?.brandId === brandId) {
      // Valid conversation — render it
      return (
        <div className="flex h-screen bg-neutral-950 text-neutral-100">
          <BrandSidebar activeConversationId={c} />
          <div className="flex-1 flex flex-col min-w-0">
            <ChatInterface conversationId={c} />
          </div>
        </div>
      );
    }
    // Invalid/missing — fall through to auto-create
  }

  // No ?c= param or invalid — find most recent conversation or create one
  const [latest] = await db
    .select()
    .from(conversations)
    .where(eq(conversations.brandId, brandId))
    .orderBy(desc(conversations.updatedAt))
    .limit(1);

  if (latest) {
    redirect(`/chat?c=${latest.id}`);
  }

  // First visit — create an initial conversation
  const [newConv] = await db
    .insert(conversations)
    .values({ brandId, title: 'New chat' })
    .returning();

  redirect(`/chat?c=${newConv.id}`);
}
