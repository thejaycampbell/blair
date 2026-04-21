import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function RootPage() {
  const cookieStore = await cookies();
  const brandId = cookieStore.get('blair_brand_id')?.value;
  redirect(brandId ? '/chat' : '/onboarding');
}
