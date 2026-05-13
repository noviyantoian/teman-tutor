import { ArrowRight, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { MathDoodles } from '@/components/illustrations/math-doodles';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { siteSettings } from '@/content/site-settings';
import { buildWaLink } from '@/lib/wa';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-navy via-brand-navy-600 to-brand-navy text-white">
      <div className="bg-grid-navy absolute inset-0 opacity-30" aria-hidden />
      <MathDoodles className="absolute -left-32 bottom-0 h-[400px] w-[400px] rotate-180 opacity-20" />

      <div className="section container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-yellow-300 backdrop-blur">
              ✦ {siteSettings.brandTagline}
            </span>

            <h1 className="balanced mt-6 font-display text-display-1 font-bold leading-[1.05] tracking-tight">
              Les Privat ke Rumah Terbaik,{' '}
              <span className="text-brand-yellow-500">Lebih Fokus &amp; Efektif</span>
            </h1>

            <p className="balanced mx-auto mt-6 max-w-2xl text-lg text-brand-navy-100 md:text-xl lg:mx-0">
              {siteSettings.heroSubheadline}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Button asChild variant="accent" size="xl" className="w-full sm:w-auto">
                <a
                  href={buildWaLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat WhatsApp untuk konsultasi gratis"
                >
                  <MessageCircle className="size-5" /> Chat WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline-white" size="xl" className="w-full sm:w-auto">
                <Link href="/kontak">
                  Konsultasi Gratis <ArrowRight className="size-5" />
                </Link>
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              {siteSettings.heroTrustBadges.map((b) => (
                <li key={b}>
                  <Badge variant="yellow" className="bg-brand-yellow-500/15 text-brand-yellow-300">
                    {b}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-soft-lg ring-1 ring-white/10">
              <Image
                src={HERO_IMAGE}
                alt="Anak belajar dengan fokus didampingi tutor di rumah"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-xl bg-brand-yellow-500 px-4 py-3 font-semibold text-brand-navy shadow-soft-lg sm:block">
              500+ siswa puas
            </div>
            <div className="absolute -right-3 -top-3 hidden rounded-xl bg-white px-4 py-3 text-sm font-semibold text-brand-navy shadow-soft-lg sm:block">
              ⭐ 4.9 / 5 rating
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
