'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  hiddenCount: number;
};

/**
 * Mobile-only collapsible wrapper for the value-props list.
 * Hosts toggle state + gradient fade. Children are server-rendered.
 */
export function ValuePropsCollapse({ children, hiddenCount }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className={cn(
          'relative mt-8 md:mt-12',
          !expanded && 'max-h-[22rem] overflow-hidden md:max-h-none md:overflow-visible',
        )}
      >
        {children}

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
    </>
  );
}
