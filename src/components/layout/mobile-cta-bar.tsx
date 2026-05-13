'use client';

import { MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';

import { trackWhatsAppClick } from '@/lib/analytics';
import { buildWaLink } from '@/lib/wa';

/**
 * Sticky bottom CTA bar, only visible on mobile.
 * Contains both WA chat and form CTA, per PRD hybrid CTA strategy.
 */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-navy-50 bg-white/95 px-4 py-3 shadow-soft-lg backdrop-blur md:hidden">
      <div className="flex items-center gap-2">
        <a
          href={buildWaLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('mobile_cta_bar')}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 text-sm font-semibold text-white"
        >
          <MessageCircle className="size-4" />
          Chat WhatsApp
        </a>
        <Link
          href="/kontak"
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md border-2 border-brand-navy bg-white px-4 text-sm font-semibold text-brand-navy"
        >
          <Send className="size-4" />
          Konsultasi
        </Link>
      </div>
    </div>
  );
}
