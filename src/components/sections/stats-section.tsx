import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { stats } from '@/content/stats';

function pickIcon(name: string): LucideIcon {
  const I = (Icons as unknown as Record<string, LucideIcon>)[name];
  return I ?? Icons.Sparkles;
}

export function StatsSection() {
  return (
    <section className="relative bg-brand-navy py-16 md:py-20" aria-label="Statistik Teman Tutor">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,197,24,0.18),transparent_60%)]"
      />
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-yellow-500/40 bg-brand-yellow-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-yellow-300">
            Dipercaya Keluarga
          </span>
          <h2 className="mt-4 font-display text-heading-1 font-bold text-white">
            Bukti nyata <span className="text-brand-yellow-400">teman belajar</span> yang bertumbuh
          </h2>
          <p className="mt-3 text-base text-brand-navy-100 md:text-lg">
            Angka-angka ini mewakili momen kemajuan yang kami bantu wujudkan bersama keluarga di
            Bandung & Cimahi.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:gap-5 lg:grid-cols-4">
          {stats.map((s) => {
            const Icon = pickIcon(s.icon);
            return (
              <li
                key={s.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors hover:border-brand-yellow-400/40 md:p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-yellow-400/15 text-brand-yellow-300 ring-1 ring-brand-yellow-400/30 md:size-11">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <p className="font-display text-3xl font-bold leading-none text-white md:text-4xl">
                    {s.value}
                  </p>
                </div>
                <p className="mt-4 text-sm font-semibold text-white md:text-base">{s.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-brand-navy-100 md:text-sm">
                  {s.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
