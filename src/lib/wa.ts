import { siteSettings } from '@/content/site-settings';

/**
 * Build a WhatsApp click-to-chat URL.
 * @param messageOverride, custom message, defaults to siteSettings.waDefaultMessage
 * @param contextSuffix  , optional suffix appended to the default message
 */
export function buildWaLink(opts?: { messageOverride?: string; contextSuffix?: string }): string {
  const number = (process.env.NEXT_PUBLIC_WA_NUMBER ?? siteSettings.waNumber).replace(/\D/g, '');
  const base = opts?.messageOverride ?? siteSettings.waDefaultMessage;
  const message = opts?.contextSuffix ? `${base} ${opts.contextSuffix}` : base;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Pre-filled WA message for a specific program / subject context.
 */
export function waLinkForProgram(programName: string): string {
  return buildWaLink({
    messageOverride: `Halo Teman Tutor, saya tertarik dengan program ${programName} dan ingin konsultasi.`,
  });
}

/**
 * Pre-filled WA message for a specific tutor.
 */
export function waLinkForTutor(tutorName: string): string {
  return buildWaLink({
    messageOverride: `Halo Teman Tutor, saya tertarik untuk les dengan Tutor ${tutorName}. Bisakah konsultasi terlebih dahulu?`,
  });
}
