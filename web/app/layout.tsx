import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

const siteUrl = 'https://blair-steel.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Blair — AI CMO',
    template: '%s | Blair',
  },
  description: 'Brief once. Use forever. Your AI Chief Marketing Officer.',
  openGraph: {
    title: 'Blair — AI CMO',
    description: 'Brief once. Use forever. Your AI Chief Marketing Officer.',
    url: siteUrl,
    siteName: 'Blair',
    type: 'website',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Blair — AI CMO' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blair — AI CMO',
    description: 'Brief once. Use forever. Your AI Chief Marketing Officer.',
    images: ['/api/og'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Blair',
  description: 'Brief once. Use forever. Your AI Chief Marketing Officer.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: siteUrl,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="h-full bg-neutral-950 text-neutral-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
