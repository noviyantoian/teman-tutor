import { Quote } from 'lucide-react';
import Image from 'next/image';

import { JsonLd } from '@/components/common/json-ld';
import { CtaSection } from '@/components/sections/cta-section';
import { Badge } from '@/components/ui/badge';
import { programCategoryLabel } from '@/content/programs';
import { testimonials } from '@/content/testimonials';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Testimoni | Cerita Murid & Orang Tua Teman Tutor',
  description:
    'Baca cerita nyata orang tua dan siswa yang sudah merasakan manfaat les privat bersama Teman Tutor.',
  path: '/testimoni',
});

export default function TestimoniPage() {
  const items = testimonials.filter((t) => t.isActive);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Beranda', path: '/' },
          { name: 'Testimoni', path: '/testimoni' },
        ])}
      />

      <section className="section bg-gradient-to-b from-brand-navy-50/60 to-white">
        <div className="container max-w-3xl text-center">
          <span className="eyebrow">Testimoni</span>
          <h1 className="balanced mt-4 font-display text-display-2 font-bold text-brand-navy">
            Cerita dari <span className="text-brand-yellow-500">teman-teman kami</span>
          </h1>
          <p className="mt-5 text-lg text-brand-navy-600">
            Beberapa momen yang membuat kami terus semangat menjadi teman belajar.
          </p>
        </div>
      </section>

      <section className="section-tight bg-white">
        <div className="container">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((t) => (
              <li
                key={t.id}
                className="overflow-hidden rounded-2xl border border-brand-navy-50 bg-brand-navy-50/40 shadow-soft-sm"
              >
                {t.type === 'screenshot' && t.mediaUrl ? (
                  <>
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={t.mediaUrl}
                        alt={t.contentText ?? `Testimoni dari ${t.giverName}`}
                        fill
                        className="object-cover object-top"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                    <div className="border-t border-brand-navy-100 p-5">
                      <Badge variant="muted" className="mb-3">
                        {programCategoryLabel[t.category]}
                      </Badge>
                      <p className="text-sm font-semibold text-brand-navy">{t.giverName}</p>
                      {t.giverRole ? (
                        <p className="text-xs text-brand-navy-400">{t.giverRole}</p>
                      ) : null}
                    </div>
                  </>
                ) : (
                  <div className="relative p-7">
                    <Quote
                      aria-hidden
                      className="absolute right-6 top-6 size-10 text-brand-yellow-300"
                    />
                    <Badge variant="muted" className="mb-4">
                      {programCategoryLabel[t.category]}
                    </Badge>
                    <p className="text-base leading-relaxed text-brand-navy">{t.contentText}</p>
                    <div className="mt-6 border-t border-brand-navy-100 pt-4">
                      <p className="text-sm font-semibold text-brand-navy">{t.giverName}</p>
                      {t.giverRole ? (
                        <p className="text-xs text-brand-navy-400">{t.giverRole}</p>
                      ) : null}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
