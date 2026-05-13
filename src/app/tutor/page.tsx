import Image from 'next/image';

import { JsonLd } from '@/components/common/json-ld';
import { CtaSection } from '@/components/sections/cta-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { tutors } from '@/content/tutors';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { waLinkForTutor } from '@/lib/wa';

export const metadata = buildMetadata({
  title: 'Tutor Kami: Diajar oleh Tutor Terseleksi',
  description:
    'Bertemu dengan tutor Teman Tutor, alumni kampus terbaik, berpengalaman, sabar, dan komunikatif dengan anak. Pilih tutor terbaik untuk anak Anda.',
  path: '/tutor',
  keywords: ['tutor privat Bandung', 'guru privat Bandung', 'tutor matematika Bandung'],
});

export default function TutorPage() {
  const list = tutors.filter((t) => t.isActive);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Beranda', path: '/' },
          { name: 'Tutor', path: '/tutor' },
        ])}
      />

      <section className="section bg-gradient-to-b from-brand-navy-50/60 to-white">
        <div className="container max-w-3xl text-center">
          <span className="eyebrow">Tutor Kami</span>
          <h1 className="balanced mt-4 font-display text-display-2 font-bold text-brand-navy">
            Tutor yang <span className="text-brand-yellow-500">peduli & kompeten</span>
          </h1>
          <p className="mt-5 text-lg text-brand-navy-600">
            Setiap tutor melewati seleksi ketat untuk memastikan kualitas akademik dan kemampuan
            komunikasi yang baik dengan anak.
          </p>
        </div>
      </section>

      <section className="section-tight bg-white">
        <div className="container">
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((t) => (
              <li
                key={t.id}
                className="overflow-hidden rounded-xl border border-brand-navy-50 bg-white shadow-soft-sm transition-all hover:-translate-y-1 hover:shadow-soft md:rounded-2xl"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-brand-navy-100 to-brand-yellow-100">
                  <Image
                    src={t.photoUrl}
                    alt={`Foto ${t.fullName}`}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-3 md:p-5">
                  <h2 className="text-sm font-semibold leading-tight text-brand-navy md:text-lg">
                    {t.fullName}
                  </h2>
                  <p className="mt-1 line-clamp-1 text-xs text-brand-navy-400 md:line-clamp-none md:text-sm">
                    {t.subjects.join(' · ')}
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs leading-snug text-brand-navy-600 md:mt-3 md:line-clamp-none md:text-sm md:leading-relaxed">
                    {t.shortBio}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1 md:mt-4 md:gap-1.5">
                    {t.badges.slice(0, 2).map((b) => (
                      <Badge key={b} variant="muted" className="text-[10px] md:text-xs">
                        {b}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="text-[10px] md:text-xs">
                      {t.experienceYears}+ thn
                    </Badge>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="mt-3 w-full px-2 text-xs md:mt-5 md:px-3 md:text-sm"
                  >
                    <a href={waLinkForTutor(t.fullName)} target="_blank" rel="noopener noreferrer">
                      Tanya {t.fullName.split(' ')[0]}
                    </a>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
