import { GraduationCap, Music, Target, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { programCategoryLabel, programs } from '@/content/programs';
import type { ProgramCategory } from '@/types';

type Pill = {
  key: ProgramCategory;
  icon: LucideIcon;
  accent: string;
  iconColor: string;
};

const PILLS: Pill[] = [
  {
    key: 'akademik',
    icon: GraduationCap,
    accent: 'from-brand-yellow-100 to-brand-yellow-50',
    iconColor: 'text-brand-navy',
  },
  {
    key: 'persiapan-khusus',
    icon: Target,
    accent: 'from-brand-navy-100 to-brand-navy-50',
    iconColor: 'text-brand-navy',
  },
  {
    key: 'skill',
    icon: Sparkles,
    accent: 'from-emerald-100 to-emerald-50',
    iconColor: 'text-emerald-700',
  },
  {
    key: 'musik',
    icon: Music,
    accent: 'from-rose-100 to-rose-50',
    iconColor: 'text-rose-700',
  },
];

export function ProgramCategoryPills() {
  return (
    <section className="bg-white py-6 lg:hidden" aria-label="Pilih kategori program">
      <div className="container">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-brand-navy">Jelajahi Kategori</h2>
          <span className="text-xs text-brand-navy-400">Geser ke kanan</span>
        </div>
        <div className="-mx-4 overflow-x-auto pb-2">
          <ul className="flex gap-3 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PILLS.map((p) => {
              const Icon = p.icon;
              const count = programs.filter(
                (prog) => prog.category === p.key && prog.isActive,
              ).length;
              return (
                <li key={p.key} className="shrink-0">
                  <Link
                    href={`/program?kategori=${p.key}#marketplace`}
                    className={`group flex w-36 flex-col gap-2 rounded-2xl bg-gradient-to-br ${p.accent} p-4 shadow-soft-sm transition-all active:scale-95`}
                  >
                    <div className="inline-flex size-10 items-center justify-center rounded-xl bg-white/80 shadow-soft-sm">
                      <Icon className={`size-5 ${p.iconColor}`} aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-tight text-brand-navy">
                        {programCategoryLabel[p.key]}
                      </p>
                      <p className="mt-0.5 text-[11px] text-brand-navy-600">{count} program</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
