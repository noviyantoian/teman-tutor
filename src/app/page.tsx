import { CtaSection } from '@/components/sections/cta-section';
import { FaqPreviewSection } from '@/components/sections/faq-preview';
import { Hero } from '@/components/sections/hero';
import { HowItWorksSection } from '@/components/sections/how-it-works';
import { ProgramHighlightsSection } from '@/components/sections/program-highlights';
import { ServiceAreaSection } from '@/components/sections/service-area';
import { StatsSection } from '@/components/sections/stats-section';
import { TestimonialsPreviewSection } from '@/components/sections/testimonials-preview';
import { ValuePropsSection } from '@/components/sections/value-props';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValuePropsSection />
      <ProgramHighlightsSection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsPreviewSection />
      <FaqPreviewSection />
      <ServiceAreaSection />
      <CtaSection />
    </>
  );
}
