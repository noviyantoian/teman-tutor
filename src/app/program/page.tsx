import { CheckCircle2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { JsonLd } from '@/components/common/json-ld';
import { CtaSection } from '@/components/sections/cta-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { packages } from '@/content/packages';
import { programCategoryLabel, programs } from '@/content/programs';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { formatIDR } from '@/lib/utils';
import { waLinkForProgram } from '@/lib/wa';
import type { ProgramCategory } from '@/types';

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

const CATEGORY_ORDER: ProgramCategory[] = ['akademik', 'persiapan-khusus', 'skill', 'musik'];

function pickIcon(name: string): LucideIcon {
  const I = (Icons as unknown as Record<string, LucideIcon>)[name];
  return I ?? Icons.BookOpen;
}

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
            Program belajar untuk{' '}
            <span className="text-brand-yellow-500">setiap kebutuhan</span>
          </h1>
          <p className="mt-5 text-lg text-brand-navy-600">
            Dari calistung hingga persiapan PTN, kursus bahasa, dan musik. Semua dengan
            pendekatan 1-on-1 ke rumah.
          </p>
          <p className="mt-3 text-sm text-brand-navy-400">
            * Harga dapat menyesuaikan lokasi, kebutuhan khusus, dan kualifikasi tutor.
          </p>
        </div>
      </section>

      {CATEGORY_ORDER.map((cat) => {
        const items = programs.filter((p) => p.category === cat && p.isActive);
        if (items.length === 0) return null;
        return (
          <section
            key={cat}
            id={cat}
            className="section-tight scroll-mt-24 even:bg-brand-navy-50/40"
          >
            <div className="container">
              <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
                <h2 className="font-display text-heading-1 font-bold text-brand-navy">
                  {programCategoryLabel[cat]}
                </h2>
              </div>
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => {
                  const Icon = pickIcon(p.icon);
                  return (
                    <article
                      key={p.id}
                      className="flex flex-col rounded-2xl border border-brand-navy-50 bg-white p-6 shadow-soft-sm transition-all hover:shadow-soft"
                    >
                      <div className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-yellow-100 text-brand-navy">
                        <Icon className="size-6" aria-hidden />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-brand-navy">{p.name}</h3>
                      <p className="mt-1.5 text-sm text-brand-navy-400">{p.description}</p>
                      <ul className="mt-4 space-y-1.5">
                        {p.subjects.slice(0, 4).map((s) => (
                          <li
                            key={s}
                            className="flex items-center gap-2 text-sm text-brand-navy-600"
                          >
                            <CheckCircle2
                              className="size-4 shrink-0 text-brand-yellow-500"
                              aria-hidden
                            />
                            {s}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex items-center justify-between border-t border-brand-navy-50 pt-4">
                        <div>
                          <p className="text-xs text-brand-navy-400">Mulai dari</p>
                          <p className="text-lg font-bold text-brand-navy">
                            {formatIDR(p.priceFrom)}{' '}
                            <span className="text-xs font-normal text-brand-navy-400">
                              / {p.sessionDurationMinutes}min
                            </span>
                          </p>
                        </div>
                        <Button asChild variant="accent" size="sm">
                          <a
                            href={waLinkForProgram(p.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Tanya
                          </a>
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section bg-white">
        <div className="container max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Paket Bulanan</span>
            <h2 className="mt-4 font-display text-heading-1 font-bold text-brand-navy">
              Pilih paket sesuai{' '}
              <span className="text-brand-yellow-500">ritme belajar</span>
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
