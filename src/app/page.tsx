import { CtaSection } from '@/components/sections/cta-section';
import { FaqPreviewSection } from '@/components/sections/faq-preview';
import { Hero } from '@/components/sections/hero';
import { HowItWorksSection } from '@/components/sections/how-it-works';
import { ProgramHighlightsSection } from '@/components/sections/program-highlights';
import { ServiceAreaSection } from '@/components/sections/service-area';
import { TestimonialsPreviewSection } from '@/components/sections/testimonials-preview';
import { TutorPreviewSection } from '@/components/sections/tutor-preview';
import { ValuePropsSection } from '@/components/sections/value-props';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValuePropsSection />
      <HowItWorksSection />
      <ProgramHighlightsSection />
      <TutorPreviewSection />
      <TestimonialsPreviewSection />
      <FaqPreviewSection />
      <ServiceAreaSection />
      <CtaSection />
    </>
  );
}
