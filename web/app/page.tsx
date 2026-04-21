import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LandingPage } from '@/components/landing-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blair — AI CMO',
  description:
    'Brief once. Use forever. Blair stores your brand profile once and reads it automatically in every AI marketing session.',
};

export default async function RootPage() {
  const cookieStore = await cookies();
  const brandId = cookieStore.get('blair_brand_id')?.value;
  if (brandId) redirect('/chat');
  return <LandingPage />;
}
