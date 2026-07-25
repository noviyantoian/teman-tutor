import { GraduationCap } from 'lucide-react';
import Image from 'next/image';

import { universities } from '@/content/universities';

export function UniversityShowcaseSection() {
  const items = universities.filter((u) => u.isActive).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section
      id="kampus-pengajar"
      className="section bg-brand-navy-50/40"
      aria-labelledby="kampus-pengajar-heading"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Kualitas Pengajar</span>
          <h2
            id="kampus-pengajar-heading"
            className="balanced mt-4 font-display text-heading-1 font-bold text-brand-navy"
          >
            Pengajar dari <span className="text-brand-yellow-500">perguruan tinggi terbaik</span>
          </h2>
          <p className="mt-4 text-base text-brand-navy-400 md:text-lg">
            Semua pengajar Teman Tutor telah lulus seleksi akademik dan berpengalaman mengajar,
            berasal dari berbagai universitas terbaik di Indonesia.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 md:mt-12 md:gap-4 lg:grid-cols-6">
          {items.map((u) => (
            <li
              key={u.id}
              className="flex flex-col items-center gap-3 rounded-lg border border-brand-navy-50 bg-white p-4 text-center shadow-soft-sm transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              <div className="relative h-12 w-full md:h-14">
                <Image
                  src={u.logoUrl}
                  alt={`Logo ${u.name}`}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 140px, (min-width: 640px) 20vw, 26vw"
                  // multiply hides the flat white/grey background baked into some JPG logos
                  className="object-contain mix-blend-multiply"
                />
              </div>
              <p className="text-[11px] font-medium leading-snug text-brand-navy-600 md:text-xs">
                {u.name}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-brand-navy-400">
          <GraduationCap className="size-4 shrink-0 text-brand-yellow-500" aria-hidden />
          Setiap pengajar melewati seleksi akademik, wawancara, dan uji cara mengajar.
        </p>
      </div>
    </section>
  );
}
