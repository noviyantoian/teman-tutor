'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section bg-white">
      <div className="container max-w-xl text-center">
        <p className="font-mono text-7xl font-bold text-destructive">!</p>
        <h1 className="mt-4 font-display text-display-2 font-bold text-brand-navy">
          Terjadi kesalahan
        </h1>
        <p className="mt-4 text-base text-brand-navy-600">
          Maaf, ada masalah di sisi kami. Silakan coba muat ulang halaman atau kembali ke
          beranda.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={reset} variant="accent" size="lg">
            Coba lagi
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Kembali ke beranda</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
