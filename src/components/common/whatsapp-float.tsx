'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { MessageCircle, Send, X } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { siteSettings } from '@/content/site-settings';
import { trackWhatsAppClick } from '@/lib/analytics';
import { buildWaLink } from '@/lib/wa';

const QUICK_PROMPTS: ReadonlyArray<{ label: string; message: string }> = [
  {
    label: 'Info paket & harga',
    message:
      'Halo Teman Tutor, saya ingin tahu lebih detail soal paket les privat dan harganya. Mohon infonya, terima kasih.',
  },
  {
    label: 'Konsultasi',
    message:
      'Halo Teman Tutor, saya tertarik untuk konsultasi. Anak saya butuh les privat. Bisa bantu rekomendasi tutor?',
  },
];

type WhatsAppDialogProps = {
  source?: string;
  children: ReactNode;
};

/**
 * Shared WhatsApp dialog. Renders a form to compose a message and opens
 * WhatsApp pre-filled when submitted. Accepts a custom trigger via children.
 */
export function WhatsAppDialog({ source = 'float', children }: WhatsAppDialogProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(siteSettings.waDefaultMessage);

  const handleSend = () => {
    trackWhatsAppClick(source);
    const url = buildWaLink({
      messageOverride: message.trim() || siteSettings.waDefaultMessage,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-soft-lg focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <div className="flex items-center gap-3 bg-[#25D366] px-5 py-4 text-white">
            <div className="flex size-10 items-center justify-center rounded-full bg-white/20">
              <MessageCircle className="size-5" strokeWidth={2.25} />
            </div>
            <div className="flex-1">
              <Dialog.Title className="text-base font-semibold leading-tight">
                Chat dengan Teman Tutor
              </Dialog.Title>
              <Dialog.Description className="text-xs text-white/85">
                Tulis pesan, kami balas via WhatsApp.
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Tutup"
              className="rounded-full p-1.5 transition-colors hover:bg-white/15"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>

          <div className="space-y-4 p-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-navy-400">
                Pilihan cepat
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setMessage(p.message)}
                    className="rounded-full border border-brand-navy-100 bg-brand-navy-50/60 px-3 py-1.5 text-xs font-medium text-brand-navy transition-colors hover:border-brand-yellow-300 hover:bg-brand-yellow-100/60"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="wa-float-message"
                className="text-xs font-semibold uppercase tracking-wider text-brand-navy-400"
              >
                Pesan Anda
              </label>
              <Textarea
                id="wa-float-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Tulis pesan singkat di sini..."
                className="resize-none"
              />
              <p className="text-xs text-brand-navy-400">
                Pesan otomatis terisi saat WhatsApp dibuka. Bisa diedit dulu sebelum dikirim.
              </p>
            </div>

            <Button
              type="button"
              variant="accent"
              size="lg"
              onClick={handleSend}
              disabled={!message.trim()}
              className="w-full bg-[#25D366] text-white hover:bg-[#1ebe5a]"
            >
              <Send className="size-4" /> Lanjut ke WhatsApp
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/**
 * Desktop-only floating WhatsApp CTA. Hidden on mobile because the
 * sticky mobile CTA bar already exposes the same dialog.
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
