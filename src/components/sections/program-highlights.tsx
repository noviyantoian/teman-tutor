import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { programCategoryLabel, programs } from '@/content/programs';
import { formatIDR } from '@/lib/utils';
import type { ProgramCategory } from '@/types';

const CATEGORY_ORDER: ProgramCategory[] = ['akademik', 'persiapan-khusus', 'skill', 'musik'];

const CATEGORY_IMAGE: Record<ProgramCategory, string> = {
  akademik: '/images/category/akademik.webp',
  'persiapan-khusus': '/images/category/persipan-khsusu.webp',
  skill: '/images/category/bahasa.webp',
  musik: '/images/category/musik.webp',
};

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
            return (
              <article
                key={cat}
                className="group flex flex-col overflow-hidden rounded-xl border border-brand-navy-50 bg-white shadow-soft-sm transition-all hover:-translate-y-1 hover:border-brand-yellow-300 hover:shadow-soft md:rounded-2xl"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-navy-50">
                  <Image
                    src={CATEGORY_IMAGE[cat]}
                    alt={programCategoryLabel[cat]}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-brand-navy/0 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
                  <h3 className="text-base font-semibold leading-tight text-brand-navy md:text-xl">
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
                    className="mt-auto self-start px-2 pt-4 text-xs md:px-3 md:pt-6 md:text-sm"
                  >
                    <Link href={`/program?kategori=${cat}#marketplace`}>
                      Lihat detail <ArrowRight className="size-3.5 md:size-4" />
                    </Link>
                  </Button>
                </div>
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
