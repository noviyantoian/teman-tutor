import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { tutors } from '@/content/tutors';

export function TutorPreviewSection() {
  const featured = tutors.filter((t) => t.isActive && t.isFeatured).slice(0, 4);

  return (
    <section id="tutor" className="section bg-brand-navy-50/40">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Tutor Pilihan</span>
            <h2 className="mt-4 font-display text-heading-1 font-bold text-brand-navy">
              Diajar oleh <span className="text-brand-yellow-500">tutor terseleksi</span>
            </h2>
            <p className="mt-3 text-base text-brand-navy-400 md:text-lg">
              Tidak hanya kompeten di mata pelajarannya, tapi juga sabar dan komunikatif dengan
              anak.
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="hidden md:inline-flex">
            <Link href="/tutor">
              Lihat semua tutor <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <ul
          className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
          aria-label="Daftar tutor pilihan"
        >
          {featured.map((t) => (
            <li
              key={t.id}
              className="w-[68vw] max-w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-brand-navy-50 bg-white shadow-soft-sm transition-all hover:-translate-y-1 hover:shadow-soft sm:w-[40vw] md:w-auto md:max-w-none md:shrink"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-brand-navy-100 to-brand-yellow-100">
                <Image
                  src={t.photoUrl}
                  alt={`Foto ${t.fullName}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 68vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4 md:p-5">
                <h3 className="text-base font-semibold text-brand-navy md:text-lg">{t.fullName}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-brand-navy-400 md:text-sm">
                  {t.subjects.join(' · ')}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {t.badges.slice(0, 2).map((b) => (
                    <Badge key={b} variant="muted" className="text-[11px] md:text-xs">
                      {b}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="text-[11px] md:text-xs">
                    {t.experienceYears}+ tahun
                  </Badge>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center text-xs text-brand-navy-400 md:hidden" aria-hidden>
          ← geser untuk lihat tutor lain →
        </p>

        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline" size="lg">
            <Link href="/tutor">
              Lihat semua tutor <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
