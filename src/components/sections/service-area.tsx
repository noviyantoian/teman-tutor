import { MapPin } from 'lucide-react';

import { siteSettings } from '@/content/site-settings';

export function ServiceAreaSection() {
  return (
    <section className="section-tight bg-white">
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-brand-navy-50 bg-brand-navy-50/40 p-8 text-center md:flex-row md:text-left">
          <div className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-yellow-100 text-brand-navy">
            <MapPin className="size-6" aria-hidden />
          </div>
          <div>
            <h2 className="font-display text-heading-3 font-bold text-brand-navy">
              Melayani area {siteSettings.areaServed.join(' & ')}
            </h2>
            <p className="mt-1 text-sm text-brand-navy-400 md:text-base">
              Tutor datang langsung ke rumah. Untuk area di luar jangkauan, silakan
              konsultasikan dahulu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
