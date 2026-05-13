import { ArrowRight, Quote } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { testimonials } from '@/content/testimonials';

export function TestimonialsPreviewSection() {
  const items = testimonials.filter((t) => t.isActive && t.type === 'text').slice(0, 3);
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Cerita Klien</span>
          <h2 className="mt-4 font-display text-heading-1 font-bold text-brand-navy">
            Momen-momen{' '}
            <span className="text-brand-yellow-500">kemenangan kecil</span>
          </h2>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((t) => (
            <li
              key={t.id}
              className="relative rounded-2xl border border-brand-navy-50 bg-brand-navy-50/40 p-7 shadow-soft-sm transition-shadow hover:shadow-soft"
            >
              <Quote
                aria-hidden
                className="absolute right-6 top-6 size-10 text-brand-yellow-300"
              />
              <p className="text-base leading-relaxed text-brand-navy">{t.contentText}</p>
              <div className="mt-6 border-t border-brand-navy-100 pt-4">
                <p className="text-sm font-semibold text-brand-navy">{t.giverName}</p>
                {t.giverRole ? (
                  <p className="text-xs text-brand-navy-400">{t.giverRole}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/testimoni">
              Lihat semua cerita <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
