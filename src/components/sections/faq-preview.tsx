import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { faqs } from '@/content/faqs';

export function FaqPreviewSection() {
  const items = faqs.filter((f) => f.isActive).slice(0, 5);
  return (
    <section className="section bg-brand-navy-50/40">
      <div className="container max-w-3xl">
        <div className="text-center">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 font-display text-heading-1 font-bold text-brand-navy">
            Pertanyaan yang sering ditanyakan
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {items.map((f) => (
            <AccordionItem key={f.id} value={f.id}>
              <AccordionTrigger>{f.question}</AccordionTrigger>
              <AccordionContent>{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/faq">Lihat semua FAQ</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
