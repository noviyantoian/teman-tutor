import { Suspense } from 'react';

import { JsonLd } from '@/components/common/json-ld';
import { CtaSection } from '@/components/sections/cta-section';
import { ProgramCategoryPills } from '@/components/sections/program-category-pills';
import { ProgramMarketplace } from '@/components/sections/program-marketplace';
import { Badge } from '@/components/ui/badge';
import { packages } from '@/content/packages';
import { programs } from '@/content/programs';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Program & Harga | Les Privat Bandung & Cimahi',
  description:
    'Daftar lengkap program les privat Teman Tutor: Calistung, SD, SMP, SMA, persiapan SNBT, bahasa asing, dan musik. Mulai Rp169.000/sesi.',
  path: '/program',
  keywords: [
    'harga les privat Bandung',
    'paket les privat',
    'les matematika SD',
    'les SNBT Bandung',
  ],
});

export default function ProgramPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Beranda', path: '/' },
          { name: 'Program & Harga', path: '/program' },
        ])}
      />

      <section className="section bg-gradient-to-b from-brand-navy-50/60 to-white">
        <div className="container max-w-3xl text-center">
          <span className="eyebrow">Program & Harga</span>
          <h1 className="balanced mt-4 font-display text-display-2 font-bold text-brand-navy">
            Program belajar untuk <span className="text-brand-yellow-500">setiap kebutuhan</span>
          </h1>
          <p className="mt-5 text-lg text-brand-navy-600">
            Dari calistung hingga persiapan PTN, kursus bahasa, dan musik. Semua dengan pendekatan
            1-on-1 ke rumah.
          </p>
          <p className="mt-3 text-sm text-brand-navy-400">
            * Harga dapat menyesuaikan lokasi, kebutuhan khusus, dan kualifikasi tutor.
          </p>
        </div>
      </section>

      <ProgramCategoryPills />

      <Suspense fallback={null}>
        <ProgramMarketplace programs={programs} />
      </Suspense>

      <section className="section bg-brand-navy-50/40">
        <div className="container max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Paket Bulanan</span>
            <h2 className="mt-4 font-display text-heading-1 font-bold text-brand-navy">
              Pilih paket sesuai <span className="text-brand-yellow-500">ritme belajar</span>
            </h2>
            <p className="mt-3 text-brand-navy-400">
              Jadwal fleksibel, Anda yang tentukan hari & jam.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {packages.map((p) => (
              <div
                key={p.id}
                className={
                  p.isPopular
                    ? 'relative rounded-2xl border-2 border-brand-yellow-500 bg-white p-6 shadow-soft'
                    : 'rounded-2xl border border-brand-navy-50 bg-white p-6 shadow-soft-sm'
                }
              >
                {p.isPopular ? (
                  <Badge variant="yellow" className="absolute -top-3 left-6">
                    Paling populer
                  </Badge>
                ) : null}
                <p className="text-3xl font-bold text-brand-navy">
                  {p.sessionCount}
                  <span className="ml-1 text-sm font-normal text-brand-navy-400">sesi</span>
                </p>
                <p className="mt-1 text-xs text-brand-navy-400">per bulan</p>
                {p.description ? (
                  <p className="mt-3 text-sm text-brand-navy-600">{p.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
