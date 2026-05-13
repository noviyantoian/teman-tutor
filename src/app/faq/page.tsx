import { JsonLd } from '@/components/common/json-ld';
import { CtaSection } from '@/components/sections/cta-section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs, faqCategoryLabel } from '@/content/faqs';
import { buildMetadata, breadcrumbJsonLd, faqPageJsonLd } from '@/lib/seo';
import type { FaqCategory } from '@/types';

export const metadata = buildMetadata({
  title: 'FAQ | Pertanyaan Seputar Les Privat Teman Tutor',
  description:
    'Jawaban dari pertanyaan yang sering ditanyakan tentang program, harga, jadwal, dan area layanan Teman Tutor.',
  path: '/faq',
});

const CATEGORY_ORDER: FaqCategory[] = [
  'umum',
  'tutor',
  'harga-paket',
  'jadwal',
  'area-layanan',
];

export default function FaqPage() {
  const active = faqs.filter((f) => f.isActive);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Beranda', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ]),
          faqPageJsonLd(active.map((f) => ({ question: f.question, answer: f.answer }))),
        ]}
      />

      <section className="section bg-gradient-to-b from-brand-navy-50/60 to-white">
        <div className="container max-w-3xl text-center">
          <span className="eyebrow">FAQ</span>
          <h1 className="balanced mt-4 font-display text-display-2 font-bold text-brand-navy">
            Pertanyaan yang sering ditanyakan
          </h1>
          <p className="mt-5 text-lg text-brand-navy-600">
            Belum menemukan jawabannya? Chat WhatsApp kami atau isi form konsultasi.
          </p>
        </div>
      </section>

      <section className="section-tight bg-white">
        <div className="container max-w-3xl space-y-10">
          {CATEGORY_ORDER.map((cat) => {
            const items = active.filter((f) => f.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat}>
                <h2 className="font-display text-heading-2 font-bold text-brand-navy">
                  {faqCategoryLabel[cat]}
                </h2>
                <Accordion type="single" collapsible className="mt-5 space-y-3">
                  {items.map((f) => (
                    <AccordionItem key={f.id} value={f.id}>
                      <AccordionTrigger>{f.question}</AccordionTrigger>
                      <AccordionContent>{f.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
