import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { valueProps } from '@/content/value-props';

function getIcon(name: string): LucideIcon {
  const I = (Icons as unknown as Record<string, LucideIcon>)[name];
  return I ?? Icons.Sparkles;
}

export function ValuePropsSection() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Kenapa Teman Tutor</span>
          <h2 className="mt-4 font-display text-heading-1 font-bold text-brand-navy">
            Lebih dari sekadar les,{' '}
            <span className="text-brand-yellow-500">teman bertumbuh</span>
          </h2>
          <p className="mt-3 text-base text-brand-navy-400 md:text-lg">
            Pendekatan personal, tutor terseleksi, dan transparansi penuh untuk perkembangan anak.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {valueProps.map((v) => {
            const Icon = getIcon(v.icon);
            return (
              <li
                key={v.id}
                className="group rounded-2xl border border-brand-navy-50 bg-white p-6 shadow-soft-sm transition-all hover:-translate-y-0.5 hover:border-brand-yellow-300 hover:shadow-soft"
              >
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-yellow-100 text-brand-navy transition-colors group-hover:bg-brand-yellow-500">
                  <Icon className="size-6" strokeWidth={2.25} aria-hidden />
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
  );
}
