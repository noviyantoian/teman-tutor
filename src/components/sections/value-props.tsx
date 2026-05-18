'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';

import { valueProps } from '@/content/value-props';
import { cn } from '@/lib/utils';

function getIcon(name: string): LucideIcon {
  const I = (Icons as unknown as Record<string, LucideIcon>)[name];
  return I ?? Icons.Sparkles;
}

export function ValuePropsSection() {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = Math.max(valueProps.length - 4, 0);

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Kenapa Teman Tutor</span>
          <h2 className="mt-4 font-display text-heading-1 font-bold text-brand-navy">
            Lebih dari sekadar les, <span className="text-brand-yellow-500">teman bertumbuh</span>
          </h2>
          <p className="mt-3 text-base text-brand-navy-400 md:text-lg">
            Pendekatan personal, tutor terseleksi, dan transparansi penuh untuk perkembangan anak.
          </p>
        </div>

        <div
          className={cn(
            'relative mt-8 md:mt-12',
            !expanded && 'max-h-[22rem] overflow-hidden md:max-h-none md:overflow-visible',
          )}
        >
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {valueProps.map((v) => {
              const Icon = getIcon(v.icon);
              return (
                <li
                  key={v.id}
                  className="group rounded-xl border border-brand-navy-50 bg-white p-3.5 shadow-soft-sm transition-all hover:-translate-y-0.5 hover:border-brand-yellow-300 hover:shadow-soft md:rounded-2xl md:p-6"
                >
                  <div className="inline-flex size-9 items-center justify-center rounded-lg bg-brand-yellow-100 text-brand-navy transition-colors group-hover:bg-brand-yellow-500 md:size-12 md:rounded-xl">
                    <Icon className="size-4 md:size-6" strokeWidth={2.25} aria-hidden />
                  </div>
                  <h3 className="mt-2.5 text-sm font-semibold leading-tight text-brand-navy md:mt-4 md:text-lg">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-[12px] leading-snug text-brand-navy-400 md:mt-1.5 md:text-sm md:leading-relaxed">
                    {v.description}
                  </p>
                </li>
              );
            })}
          </ul>

          {!expanded ? (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent md:hidden"
            />
          ) : null}
        </div>

        {hiddenCount > 0 ? (
          <div className="mt-4 flex justify-center md:hidden">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-brand-navy-100 bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy shadow-soft-sm transition-all hover:border-brand-yellow-300 hover:shadow-soft active:scale-95"
              aria-expanded={expanded}
            >
              {expanded ? (
                <>
                  Sembunyikan
                  <ChevronUp className="size-4" aria-hidden />
                </>
              ) : (
                <>
                  Lihat {hiddenCount} benefit lainnya
                  <ChevronDown className="size-4" aria-hidden />
                </>
              )}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
