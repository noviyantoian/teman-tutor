'use client';

import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { cloneElement, isValidElement, useEffect, useState } from 'react';

import { WhatsAppIcon } from '@/components/common/whatsapp-icon';

import type { ReactElement, ReactNode } from 'react';

const WhatsAppDialogContent = dynamic(() => import('./whatsapp-dialog-content'), {
  ssr: false,
});

type WhatsAppDialogProps = {
  source?: string;
  children: ReactNode;
};

type TriggerProps = {
  onClick?: (e: React.MouseEvent) => void;
};

/**
 * Thin wrapper. Renders the trigger inline and only loads the Radix Dialog
 * chunk after the user actually clicks the trigger — keeps the initial JS
 * payload small for Lighthouse TBT.
 */
export function WhatsAppDialog({ source = 'float', children }: WhatsAppDialogProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const openDialog = () => {
    setMounted(true);
    setOpen(true);
  };

  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<TriggerProps>, {
        onClick: (e: React.MouseEvent) => {
          (children as ReactElement<TriggerProps>).props.onClick?.(e);
          openDialog();
        },
      })
    : children;

  return (
    <>
      {trigger}
      {mounted ? (
        <WhatsAppDialogContent open={open} onOpenChange={setOpen} source={source} />
      ) : null}
    </>
  );
}

const NUDGE_DISMISS_KEY = 'tt-wa-nudge-dismissed';
const NUDGE_SCROLL_RATIO = 0.5;
const DESKTOP_QUERY = '(min-width: 768px)';

/**
 * Shows the "we're online" nudge once the visitor has read past half the page.
 * Desktop only, fires at most once per tab session.
 */
function useNudgeAfterHalfPage(): [boolean, () => void] {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia(DESKTOP_QUERY).matches) return;

    try {
      if (window.sessionStorage.getItem(NUDGE_DISMISS_KEY)) return;
    } catch {
      // sessionStorage blocked (private mode) — still fine to show the nudge.
    }

    let frame = 0;

    const evaluate = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= NUDGE_SCROLL_RATIO) {
        setVisible(true);
        window.removeEventListener('scroll', onScroll);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(evaluate);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.sessionStorage.setItem(NUDGE_DISMISS_KEY, '1');
    } catch {
      // ignore, dismissal just won't persist for this tab
    }
  };

  return [visible, dismiss];
}

/**
 * Desktop-only floating WhatsApp CTA.
 */
export function WhatsAppFloat() {
  const [nudgeVisible, dismissNudge] = useNudgeAfterHalfPage();

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 md:flex">
      {nudgeVisible ? (
        <div
          role="status"
          className="relative w-[288px] animate-fade-up rounded-2xl border border-brand-navy-50 bg-white p-4 pr-8 shadow-soft-lg"
        >
          <button
            type="button"
            onClick={dismissNudge}
            aria-label="Tutup pesan"
            className="absolute right-2 top-2 rounded-full p-1 text-brand-navy-300 transition-colors hover:bg-brand-navy-50 hover:text-brand-navy"
          >
            <X className="size-4" />
          </button>

          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-600">
            <span className="relative flex size-2.5" aria-hidden>
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            Online sekarang
          </p>

          <p className="mt-2 text-sm font-semibold leading-snug text-brand-navy">
            Halo! 👋 Ada yang bisa kami bantu?
          </p>
          <p className="mt-1 text-xs leading-relaxed text-brand-navy-400">
            Tim Teman Tutor siap bantu pilih program & tutor yang cocok. Konsultasi gratis, tanpa
            komitmen.
          </p>

          <WhatsAppDialog source="float_nudge">
            <button
              type="button"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5a]"
            >
              <WhatsAppIcon className="size-4" /> Chat sekarang
            </button>
          </WhatsAppDialog>
        </div>
      ) : null}

      <WhatsAppDialog source="float">
        <button
          type="button"
          aria-label="Chat WhatsApp Teman Tutor"
          className="group relative flex size-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft-lg transition-transform hover:scale-105 focus-visible:scale-105"
        >
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20"
          />
          <WhatsAppIcon className="size-8" />
          {nudgeVisible ? (
            <span
              aria-hidden
              className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white ring-2 ring-white"
            >
              1
            </span>
          ) : null}
          <span className="sr-only">Chat WhatsApp</span>
        </button>
      </WhatsAppDialog>
    </div>
  );
}
