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
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((t) => (
              <li
                key={t.id}
                className="overflow-hidden rounded-2xl border border-brand-navy-50 bg-white shadow-soft-sm transition-all hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-brand-navy-100 to-brand-yellow-100">
                  <Image
                    src={t.photoUrl}
                    alt={`Foto ${t.fullName}`}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-brand-navy">{t.fullName}</h2>
                  <p className="mt-1 text-sm text-brand-navy-400">{t.subjects.join(' · ')}</p>
                  <p className="mt-3 text-sm leading-relaxed text-brand-navy-600">{t.shortBio}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {t.badges.slice(0, 2).map((b) => (
                      <Badge key={b} variant="muted">
                        {b}
                      </Badge>
                    ))}
                    <Badge variant="outline">{t.experienceYears}+ tahun</Badge>
                  </div>
                  <Button asChild variant="outline" size="sm" className="mt-5 w-full">
                    <a href={waLinkForTutor(t.fullName)} target="_blank" rel="noopener noreferrer">
                      Tanya tentang {t.fullName.split(' ')[0]}
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
