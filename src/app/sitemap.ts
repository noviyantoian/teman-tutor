import type { MetadataRoute } from 'next';

import { getSiteUrl } from '@/lib/utils';

const ROUTES: Array<{ path: string; priority: number; changeFrequency: 'monthly' | 'weekly' }> = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/tentang', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/program', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/tutor', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/testimoni', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/kontak', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/privacy-policy', priority: 0.2, changeFrequency: 'monthly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();
  return ROUTES.map((r) => ({
    url: `${base}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
