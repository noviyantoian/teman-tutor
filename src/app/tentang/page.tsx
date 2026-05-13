import { Heart, Sparkles, Target, Users } from 'lucide-react';

import { JsonLd } from '@/components/common/json-ld';
import { CtaSection } from '@/components/sections/cta-section';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Tentang Teman Tutor | Teman Belajar, Teman Bertumbuh',
  description:
    'Teman Tutor adalah platform les privat 1-on-1 di Bandung & Cimahi dengan pendekatan personal, teman belajar, teman bertumbuh untuk setiap anak.',
  path: '/tentang',
});

const VALUES = [
  {
    icon: Users,
    title: 'Personal',
    description:
      'Setiap anak unik. Kami menyesuaikan metode dengan karakter & kebutuhan masing-masing.',
  },
  {
    icon: Heart,
    title: 'Empati',
    description: 'Tutor kami bukan hanya mengajar, tapi menjadi teman bertumbuh yang sabar.',
  },
  {
    icon: Target,
    title: 'Terarah',
    description: 'Setiap sesi memiliki tujuan jelas, dengan laporan progres yang transparan.',
  },
  {
    icon: Sparkles,
    title: 'Berdampak',
    description: 'Kami mengukur keberhasilan dari kepercayaan diri & nilai yang naik bersama.',
  },
];

export default function TentangPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Beranda', path: '/' },
          { name: 'Tentang', path: '/tentang' },
        ])}
      />

      <section className="section bg-gradient-to-b from-brand-navy-50/60 to-white">
        <div className="container max-w-3xl text-center">
          <span className="eyebrow">Tentang Kami</span>
          <h1 className="balanced mt-4 font-display text-display-2 font-bold text-brand-navy">
            Teman Belajar,{' '}
            <span className="text-brand-yellow-500">Teman Bertumbuh</span>
          </h1>
          <p className="mt-5 text-lg text-brand-navy-600">
            Teman Tutor lahir dari keyakinan bahwa setiap anak punya potensi unik, yang
            dibutuhkan adalah teman yang tepat untuk membantunya bertumbuh.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-display text-heading-1 font-bold text-brand-navy">
            Cerita kami
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-brand-navy-600">
            <p>
              Banyak orang tua merasa kesulitan menemukan tutor privat yang bukan hanya pintar,
              tapi juga sabar, komunikatif, dan benar-benar peduli dengan perkembangan anak.
              Belum lagi urusan jadwal, ongkos transport, dan biaya pendaftaran yang sering
              membebani.
            </p>
            <p>
              Karena itu kami hadir, platform les privat 1-on-1 yang fokus pada kebutuhan
              spesifik setiap anak, dengan tutor terseleksi yang datang langsung ke rumah Anda
              di area Bandung dan Cimahi.
            </p>
            <p>
              Misi kami sederhana: membuat belajar terasa seperti ngobrol dengan teman dekat
              yang lebih pintar, santai tapi serius, sabar tapi tetap menantang.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-brand-navy-50/40">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Nilai Kami</span>
            <h2 className="mt-4 font-display text-heading-1 font-bold text-brand-navy">
              Empat nilai yang memandu kami
            </h2>
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <li
                  key={v.title}
                  className="rounded-2xl border border-brand-navy-50 bg-white p-6 shadow-soft-sm"
                >
                  <div className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-yellow-100 text-brand-navy">
                    <Icon className="size-6" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-brand-navy">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-navy-400">
                    {v.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
