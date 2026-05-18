'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/tentang', label: 'Tentang' },
  { href: '/program', label: 'Program' },
  { href: '/testimoni', label: 'Testimoni' },
  { href: '/faq', label: 'FAQ' },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all',
        scrolled ? 'bg-white/85 shadow-soft-sm backdrop-blur-md' : 'bg-white/0 backdrop-blur-0',
      )}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link href="/" aria-label="Teman Tutor, Beranda" className="flex items-center">
          <Image
            src="/images/logo/logo-full-512.webp"
            alt="Teman Tutor"
            width={140}
            height={42}
            priority
            className="h-9 w-auto md:h-10"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'text-brand-navy'
                    : 'text-brand-navy-400 hover:bg-brand-navy-50 hover:text-brand-navy',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="accent" size="md" className="hidden md:inline-flex">
            <Link href="/kontak">Konsultasi</Link>
          </Button>
          <button
            type="button"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-md text-brand-navy hover:bg-brand-navy-50 md:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-brand-navy-50 bg-white shadow-soft md:hidden"
        >
          <nav aria-label="Mobile" className="container flex flex-col py-4">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'group flex items-center justify-between rounded-xl px-4 py-4 font-display text-xl font-semibold tracking-tight transition-colors',
                    active
                      ? 'bg-brand-yellow-100 text-brand-navy'
                      : 'text-brand-navy hover:bg-brand-navy-50',
                  )}
                >
                  <span>{link.label}</span>
                  <span
                    aria-hidden
                    className={cn(
                      'text-brand-navy-300 transition-transform',
                      active ? 'text-brand-navy' : 'group-hover:translate-x-1',
                    )}
                  >
                    →
                  </span>
                </Link>
              );
            })}
            <Button asChild variant="accent" size="lg" className="mt-4 h-14 text-base">
              <Link href="/kontak">Konsultasi Gratis</Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
