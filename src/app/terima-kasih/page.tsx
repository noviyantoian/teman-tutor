import { CheckCircle2, MessageCircle } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';
import { buildWaLink } from '@/lib/wa';

export const metadata = buildMetadata({
  title: 'Terima Kasih, Konsultasi Anda Telah Diterima',
  description: 'Tim Teman Tutor akan segera menghubungi Anda untuk konsultasi gratis.',
  path: '/terima-kasih',
  noindex: true,
});

export default function TerimaKasihPage() {
  return (
    <section className="section bg-white">
      <div className="container max-w-xl text-center">
        <div className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-brand-yellow-100 text-brand-navy">
          <CheckCircle2 className="size-8" aria-hidden />
        </div>
        <h1 className="balanced mt-6 font-display text-display-2 font-bold text-brand-navy">
          Terima kasih! Konsultasi Anda telah{' '}
          <span className="text-brand-yellow-500">diterima</span>
        </h1>
        <p className="mt-4 text-base text-brand-navy-600">
          Tim Teman Tutor akan menghubungi Anda dalam waktu maksimal 1×24 jam (jam kerja).
          Untuk respon lebih cepat, silakan chat WhatsApp kami.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="accent" size="lg">
            <a href={buildWaLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-5" /> Chat WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Kembali ke beranda</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
