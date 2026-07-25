import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

import { AnalyticsScripts } from '@/components/common/analytics-scripts';
import { JsonLd } from '@/components/common/json-ld';
import { WhatsAppFloat } from '@/components/common/whatsapp-float';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { MobileCtaBar } from '@/components/layout/mobile-cta-bar';
import { buildMetadata, localBusinessJsonLd, organizationJsonLd } from '@/lib/seo';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

export const viewport: Viewport = {
  themeColor: '#0A1E3D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Teman Tutor: Les Privat 1-on-1 ke Rumah, Tutor Terpercaya',
    description:
      'Les privat 1-on-1 ke rumah untuk SD, SMP, SMA, persiapan PTN, kursus bahasa & musik. Tutor terseleksi, metode personal, mulai Rp130.000/sesi. Hadir di Jabodetabek, Bandung & Cimahi.',
    path: '/',
    keywords: [
      'les privat',
      'les privat ke rumah',
      'les privat 1-on-1',
      'les privat online',
      'tutor privat',
      'tutor ke rumah',
      'guru les privat',
      'guru les ke rumah',
      'bimbel privat',
      'les SD',
      'les SMP',
      'les SMA',
      'les calistung',
      'les matematika',
      'les bahasa Inggris',
      'les fisika',
      'les kimia',
      'persiapan SNBT',
      'persiapan UTBK',
      'les IELTS',
      'les TOEFL',
      'kursus musik',
      'les piano',
      'les gitar',
      'les vokal',
      'les privat Bandung',
      'les privat Cimahi',
      'les privat Jabodetabek',
      'les privat Jakarta',
      'les privat Bogor',
      'les privat Depok',
      'les privat Tangerang',
      'les privat Bekasi',
      'tutor SD Bandung',
      'tutor SMP Bandung',
      'tutor SMA Bandung',
      'guru les ke rumah Bandung',
      'guru les ke rumah Jakarta',
    ],
  }),
  verification: {
    google: 'W3Tq0QXqByFSpG-rel1bDX72OoGG3TP_vjqzISegrd4',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${display.variable}`}>
      <body className="flex min-h-screen flex-col bg-background">
        <Header />
        <main id="main" className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <MobileCtaBar />

        <JsonLd id="ld-organization" data={organizationJsonLd()} />
        <JsonLd id="ld-localbusiness" data={localBusinessJsonLd()} />

        <AnalyticsScripts />
      </body>
    </html>
  );
}
