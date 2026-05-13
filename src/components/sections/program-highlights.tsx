import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { programCategoryLabel, programs } from '@/content/programs';
import { formatIDR } from '@/lib/utils';
import type { ProgramCategory } from '@/types';

const CATEGORY_ORDER: ProgramCategory[] = ['akademik', 'persiapan-khusus', 'skill', 'musik'];

function pickIcon(name: string): LucideIcon {
  const I = (Icons as unknown as Record<string, LucideIcon>)[name];
  return I ?? Icons.BookOpen;
}

export function ProgramHighlightsSection() {
  return (
    <section id="program" className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Program</span>
          <h2 className="mt-4 font-display text-heading-1 font-bold text-brand-navy">
            Program belajar untuk{' '}
            <span className="text-brand-yellow-500">setiap fase</span>
          </h2>
          <p className="mt-3 text-base text-brand-navy-400 md:text-lg">
            Dari calistung hingga persiapan PTN, bahasa asing, dan musik.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_ORDER.map((cat) => {
            const sample = programs.filter((p) => p.category === cat && p.isActive)[0];
            if (!sample) return null;
            const Icon = pickIcon(sample.icon);
            return (
              <article
                key={cat}
                className="group flex flex-col rounded-2xl border border-brand-navy-50 bg-white p-6 shadow-soft-sm transition-all hover:-translate-y-1 hover:border-brand-yellow-300 hover:shadow-soft"
              >
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-yellow-100 text-brand-navy">
                  <Icon className="size-6" aria-hidden />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-brand-navy">
                  {programCategoryLabel[cat]}
                </h3>
                <p className="mt-1 text-sm text-brand-navy-400">
                  {programs
                    .filter((p) => p.category === cat)
                    .slice(0, 3)
                    .map((p) => p.name)
                    .join(', ')}
                  {programs.filter((p) => p.category === cat).length > 3 ? '…' : ''}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant="muted">Mulai {formatIDR(sample.priceFrom)}</Badge>
                </div>
                <Button asChild variant="ghost" size="md" className="mt-6 self-start">
                  <Link href={`/program#${cat}`}>
                    Lihat detail <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/program">
              Lihat semua program <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
