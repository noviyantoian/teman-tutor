'use client';

import { CheckCircle2, Search, SlidersHorizontal, X } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { programCategoryLabel } from '@/content/programs';
import { formatIDR } from '@/lib/utils';
import { waLinkForProgram } from '@/lib/wa';
import type { Program, ProgramCategory } from '@/types';

type SortKey = 'default' | 'price-asc' | 'price-desc';

const CATEGORIES: ProgramCategory[] = ['akademik', 'persiapan-khusus', 'skill', 'musik'];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'default', label: 'Paling Relevan' },
  { value: 'price-asc', label: 'Harga Terendah' },
  { value: 'price-desc', label: 'Harga Tertinggi' },
];

function pickIcon(name: string): LucideIcon {
  const I = (Icons as unknown as Record<string, LucideIcon>)[name];
  return I ?? Icons.BookOpen;
}

type Props = {
  programs: Program[];
};

export function ProgramMarketplace({ programs }: Props) {
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<ProgramCategory[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('default');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const raw = searchParams.get('kategori');
    if (!raw) return;
    const requested = raw.split(',').filter((c): c is ProgramCategory =>
      CATEGORIES.includes(c as ProgramCategory),
    );
    if (requested.length > 0) {
      setSelectedCategories(requested);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = programs.filter((p) => p.isActive);

    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.subjects.some((s) => s.toLowerCase().includes(q)),
      );
    }

    if (sort === 'price-asc') {
      list = [...list].sort((a, b) => a.priceFrom - b.priceFrom);
    } else if (sort === 'price-desc') {
      list = [...list].sort((a, b) => b.priceFrom - a.priceFrom);
    } else {
      list = [...list].sort((a, b) => a.sortOrder - b.sortOrder);
    }

    return list;
  }, [programs, selectedCategories, search, sort]);

  function toggleCategory(cat: ProgramCategory) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }

  function clearFilters() {
    setSelectedCategories([]);
    setSearch('');
    setSort('default');
  }

  const categoryCounts = useMemo(() => {
    const counts: Record<ProgramCategory, number> = {
      akademik: 0,
      'persiapan-khusus': 0,
      skill: 0,
      musik: 0,
    };
    for (const p of programs) {
      if (p.isActive) counts[p.category] += 1;
    }
    return counts;
  }, [programs]);

  const hasActiveFilter =
    selectedCategories.length > 0 || search.trim() !== '' || sort !== 'default';

  const sidebar = (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-brand-navy-400">
          Cari Program
        </label>
        <div className="relative mt-2">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-navy-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Matematika, IELTS, piano..."
            className="w-full rounded-md border border-brand-navy-100 bg-white py-2 pl-9 pr-3 text-sm text-brand-navy placeholder:text-brand-navy-300 focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-yellow-200"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-brand-navy-400">
          Kategori
        </label>
        <ul className="mt-3 space-y-2">
          {CATEGORIES.map((cat) => {
            const checked = selectedCategories.includes(cat);
            return (
              <li key={cat}>
                <label className="flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-sm text-brand-navy transition-colors hover:bg-brand-navy-50">
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCategory(cat)}
                      className="size-4 rounded border-brand-navy-200 text-brand-navy focus:ring-brand-yellow-300"
                    />
                    <span>{programCategoryLabel[cat]}</span>
                  </span>
                  <span className="text-xs text-brand-navy-400">{categoryCounts[cat]}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-brand-navy-400">
          Urutkan
        </label>
        <div className="mt-2 space-y-1">
          {SORT_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-brand-navy transition-colors hover:bg-brand-navy-50"
            >
              <input
                type="radio"
                name="sort"
                value={opt.value}
                checked={sort === opt.value}
                onChange={() => setSort(opt.value)}
                className="size-4 border-brand-navy-200 text-brand-navy focus:ring-brand-yellow-300"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilter ? (
        <button
          type="button"
          onClick={clearFilters}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-brand-navy-100 px-3 py-2 text-sm font-medium text-brand-navy transition-colors hover:bg-brand-navy-50"
        >
          <X className="size-4" />
          Hapus semua filter
        </button>
      ) : null}
    </div>
  );

  return (
    <section id="marketplace" className="section-tight scroll-mt-24 bg-white">
      <div className="container">
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <p className="text-sm text-brand-navy-600">
            <span className="font-semibold text-brand-navy">{filtered.length}</span> program
          </p>
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border border-brand-navy-100 bg-white px-3 py-2 text-sm font-medium text-brand-navy"
          >
            <SlidersHorizontal className="size-4" />
            Filter
            {hasActiveFilter ? (
              <span className="ml-1 inline-flex size-5 items-center justify-center rounded-full bg-brand-yellow-500 text-[10px] font-bold text-brand-navy">
                {selectedCategories.length + (search.trim() ? 1 : 0) + (sort !== 'default' ? 1 : 0)}
              </span>
            ) : null}
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24 rounded-2xl border border-brand-navy-50 bg-brand-navy-50/30 p-6">
              {sidebar}
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="mb-6 hidden items-center justify-between lg:flex">
              <p className="text-sm text-brand-navy-600">
                Menampilkan <span className="font-semibold text-brand-navy">{filtered.length}</span>{' '}
                dari {programs.filter((p) => p.isActive).length} program
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-brand-navy-100 bg-white p-12 text-center">
                <p className="text-base font-semibold text-brand-navy">Tidak ada program cocok</p>
                <p className="mt-2 text-sm text-brand-navy-400">
                  Coba ubah filter atau hapus kata kunci pencarian.
                </p>
                <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>
                  Hapus filter
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => {
                  const Icon = pickIcon(p.icon);
                  return (
                    <article
                      key={p.id}
                      className="flex flex-col rounded-2xl border border-brand-navy-50 bg-white p-5 shadow-soft-sm transition-all hover:-translate-y-0.5 hover:shadow-soft"
                    >
                      <div className="flex items-start justify-between">
                        <div className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-yellow-100 text-brand-navy">
                          <Icon className="size-5" aria-hidden />
                        </div>
                        <span className="rounded-full bg-brand-navy-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-navy-600">
                          {programCategoryLabel[p.category]}
                        </span>
                      </div>
                      <h3 className="mt-4 text-base font-semibold leading-tight text-brand-navy">
                        {p.name}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-sm text-brand-navy-400">
                        {p.description}
                      </p>
                      <ul className="mt-3 space-y-1">
                        {p.subjects.slice(0, 3).map((s) => (
                          <li
                            key={s}
                            className="flex items-center gap-2 text-xs text-brand-navy-600"
                          >
                            <CheckCircle2
                              className="size-3.5 shrink-0 text-brand-yellow-500"
                              aria-hidden
                            />
                            <span className="truncate">{s}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto flex items-end justify-between gap-3 border-t border-brand-navy-50 pt-4">
                        <div>
                          <p className="text-[11px] text-brand-navy-400">Mulai dari</p>
                          <p className="text-lg font-bold leading-tight text-brand-navy">
                            {formatIDR(p.priceFrom)}
                          </p>
                          <p className="text-[10px] text-brand-navy-400">
                            / {p.sessionDurationMinutes} menit
                          </p>
                        </div>
                        <Button asChild variant="accent" size="sm">
                          <a
                            href={waLinkForProgram(p.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Tanya
                          </a>
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFilterOpen ? (
        <div
          className="fixed inset-0 z-50 bg-brand-navy/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileFilterOpen(false)}
          role="presentation"
        >
          <div
            className="absolute inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-white p-6 shadow-soft-lg"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Filter program"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-brand-navy">Filter</h2>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Tutup filter"
                className="rounded-md p-2 text-brand-navy hover:bg-brand-navy-50"
              >
                <X className="size-5" />
              </button>
            </div>
            {sidebar}
            <Button
              variant="primary"
              size="lg"
              className="mt-6 w-full"
              onClick={() => setMobileFilterOpen(false)}
            >
              Lihat {filtered.length} program
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
