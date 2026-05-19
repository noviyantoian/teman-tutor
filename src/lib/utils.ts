import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Conditional className helper, combines clsx + tailwind-merge so
 * conflicting Tailwind classes resolve correctly.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format IDR currency with thousands separator (id-ID locale).
 * @example formatIDR(169000) // "Rp169.000"
 */
export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\s/g, '');
}

/**
 * Slugify Indonesian text, lowercase, dash-separated, alphanum only.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get the absolute site URL.
 * Prefers NEXT_PUBLIC_SITE_URL. Falls back to the canonical production
 * domain in production, and to localhost in development. This prevents
 * sitemap.xml, canonical, and OG URLs from leaking "localhost" when the
 * env var is missing in the build/runtime environment.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  return process.env.NODE_ENV === 'production'
    ? 'https://www.temantutor.com'
    : 'http://localhost:3000';
}

/**
 * Safely truncate text to length, preserving word boundary.
 */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const sliced = text.slice(0, max);
  const lastSpace = sliced.lastIndexOf(' ');
  return `${sliced.slice(0, lastSpace > 0 ? lastSpace : max)}…`;
}
