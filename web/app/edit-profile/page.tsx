import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { brands } from '@/lib/db/schema';
import { EditProfileForm } from '@/components/edit-profile-form';

export const metadata = { title: 'Edit Brand Profile — Blair' };

export default async function EditProfilePage() {
  const cookieStore = await cookies();
  const brandId = cookieStore.get('blair_brand_id')?.value;
  if (!brandId) redirect('/onboarding');

  const [brand] = await db.select().from(brands).where(eq(brands.id, brandId)).limit(1);
  if (!brand) redirect('/onboarding');

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="text-neutral-400 text-sm font-medium">Blair — Brand Profile</span>
        </div>
        <EditProfileForm brand={brand} />
      </div>
    </div>
  );
}
