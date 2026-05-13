import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="section bg-white">
      <div className="container max-w-xl text-center">
        <p className="font-mono text-7xl font-bold text-brand-yellow-500">404</p>
        <h1 className="mt-4 font-display text-display-2 font-bold text-brand-navy">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-4 text-base text-brand-navy-600">
          Mungkin halaman sudah dipindah atau Anda salah ketik URL. Kembali ke beranda atau
          jelajahi program kami.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="accent" size="lg">
            <Link href="/">Kembali ke beranda</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/program">Lihat program</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
