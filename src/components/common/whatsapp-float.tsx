'use client';

import { MessageCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { cloneElement, isValidElement, useState } from 'react';
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

/**
 * Desktop-only floating WhatsApp CTA.
 */
export function WhatsAppFloat() {
  return (
    <WhatsAppDialog source="float">
      <button
        type="button"
        aria-label="Chat WhatsApp Teman Tutor"
        className="group fixed bottom-6 right-6 z-40 hidden h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft-lg transition-transform hover:scale-105 focus-visible:scale-105 md:flex"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
        <MessageCircle className="size-8" strokeWidth={2.25} />
        <span className="sr-only">Chat WhatsApp</span>
      </button>
    </WhatsAppDialog>
  );
}
