'use client';

/**
 * Analytics event helpers.
 * All functions are no-ops if the corresponding ID env var is missing.
 */

type Primitive = string | number | boolean | null;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, Primitive>) {
  if (typeof window === 'undefined') return;
  try {
    if (window.gtag) window.gtag('event', name, params ?? {});
    if (window.fbq) window.fbq('trackCustom', name, params ?? {});
  } catch {
    /* swallow, never break UX for analytics */
  }
}

export function trackPageview(url: string) {
  if (typeof window === 'undefined') return;
  try {
    if (window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, { page_path: url });
    }
    if (window.fbq) window.fbq('track', 'PageView');
  } catch {
    /* swallow */
  }
}

// ---------- Convenience wrappers ----------

export const trackWhatsAppClick = (source: string) =>
  trackEvent('whatsapp_click', { source });

export const trackFormStart = (formName: string) => trackEvent('form_start', { form_name: formName });

export const trackFormSubmit = (formName: string) =>
  trackEvent('form_submit', { form_name: formName });

export const trackProgramClick = (programSlug: string) =>
  trackEvent('program_click', { program: programSlug });

export const trackTutorClick = (tutorSlug: string) => trackEvent('tutor_click', { tutor: tutorSlug });
