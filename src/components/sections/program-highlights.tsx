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
            Program belajar untuk <span className="text-brand-yellow-500">setiap fase</span>
          </h2>
          <p className="mt-3 text-base text-brand-navy-400 md:text-lg">
            Dari calistung hingga persiapan PTN, bahasa asing, dan musik.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:mt-12 md:gap-6 lg:grid-cols-4">
          {CATEGORY_ORDER.map((cat) => {
            const sample = programs.filter((p) => p.category === cat && p.isActive)[0];
            if (!sample) return null;
            const Icon = pickIcon(sample.icon);
            return (
              <article
                key={cat}
                className="group flex flex-col rounded-xl border border-brand-navy-50 bg-white p-4 shadow-soft-sm transition-all hover:-translate-y-1 hover:border-brand-yellow-300 hover:shadow-soft sm:p-5 md:rounded-2xl md:p-6"
              >
                <div className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-yellow-100 text-brand-navy md:size-12 md:rounded-xl">
                  <Icon className="size-5 md:size-6" aria-hidden />
                </div>
                <h3 className="mt-3 text-base font-semibold leading-tight text-brand-navy md:mt-4 md:text-xl">
                  {programCategoryLabel[cat]}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-brand-navy-400 md:line-clamp-none md:text-sm">
                  {programs
                    .filter((p) => p.category === cat)
                    .slice(0, 3)
                    .map((p) => p.name)
                    .join(', ')}
                  {programs.filter((p) => p.category === cat).length > 3 ? '…' : ''}
                </p>
                <div className="mt-3 flex items-center justify-between md:mt-4">
                  <Badge variant="muted" className="text-[11px] md:text-xs">
                    Mulai {formatIDR(sample.priceFrom)}
                  </Badge>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="mt-4 self-start px-2 text-xs md:mt-6 md:px-3 md:text-sm"
                >
                  <Link href={`/program#${cat}`}>
                    Lihat detail <ArrowRight className="size-3.5 md:size-4" />
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
