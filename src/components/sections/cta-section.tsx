import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

import { MathDoodles } from '@/components/illustrations/math-doodles';
import { Button } from '@/components/ui/button';
import { buildWaLink } from '@/lib/wa';

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-20 text-white md:py-24">
      <MathDoodles className="absolute -right-10 -top-10 h-[400px] w-[400px] opacity-30" />
      <MathDoodles className="absolute -bottom-10 -left-10 h-[400px] w-[400px] rotate-180 opacity-20" />

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="balanced font-display text-display-2 font-bold leading-tight">
            Mulai perjalanan belajar anak <span className="text-brand-yellow-500">hari ini</span>
          </h2>
          <p className="mt-4 text-base text-brand-navy-100 md:text-lg">
            Konsultasi tanpa komitmen. Kami siap rekomendasikan tutor & paket terbaik untuk anak
            Anda.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="accent" size="xl" className="w-full sm:w-auto">
              <a
                href={buildWaLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat WhatsApp untuk konsultasi gratis"
              >
                <MessageCircle className="size-5" /> Chat WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline-white" size="xl" className="w-full sm:w-auto">
              <Link href="/kontak">
                Isi Form Konsultasi <ArrowRight className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
