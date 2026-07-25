import type { Metadata } from 'next';

import { getSiteUrl } from '@/lib/utils';
import { siteSettings } from '@/content/site-settings';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Teman Tutor';
const DEFAULT_DESCRIPTION =
  'Teman Tutor | Les privat 1-on-1 ke rumah untuk SD, SMP, SMA, persiapan PTN, kursus bahasa & musik. Tutor terseleksi, metode personal, mulai Rp130.000/sesi.';

type BuildMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  keywords?: string[];
};

/**
 * Build Next.js Metadata for a page with sensible defaults.
 * Always call this in every page's `metadata` export.
 *
 * OG/Twitter images: when `image` is not provided, the image fields are
 * omitted so Next.js can pick up the file-based `opengraph-image.tsx`
 * convention (root or per-route) automatically.
 */
export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image,
  noindex = false,
  keywords,
}: BuildMetadataInput): Metadata {
  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  const ogImages = image ? [{ url: image, width: 1200, height: 630, alt: SITE_NAME }] : undefined;
  const twitterImages = image ? [image] : undefined;

  return {
    title: fullTitle,
    description,
    keywords,
    metadataBase: new URL(siteUrl),
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      url: canonical,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      ...(twitterImages ? { images: twitterImages } : {}),
    },
    other: {
      'theme-color': '#0A1E3D',
    },
  };
}

// ---------- JSON-LD generators ----------

export function organizationJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: siteUrl,
    logo: `${siteUrl}/icons/logo-mark.png`,
    sameAs: [siteSettings.instagramUrl, siteSettings.tiktokUrl, siteSettings.youtubeUrl].filter(
      Boolean,
    ),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: `+${siteSettings.waNumber}`,
        availableLanguage: ['Indonesian'],
        areaServed: siteSettings.areaServed,
      },
    ],
  };
}

export function localBusinessJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_NAME,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    description: DEFAULT_DESCRIPTION,
    telephone: `+${siteSettings.waNumber}`,
    areaServed: siteSettings.areaServed.map((a) => ({
      '@type': 'City',
      name: a,
    })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bandung',
      addressRegion: 'Jawa Barat',
      addressCountry: 'ID',
    },
  };
}

export function faqPageJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}

export function breadcrumbJsonLd(crumbs: Array<{ name: string; path: string }>) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${siteUrl}${c.path}`,
    })),
  };
}
