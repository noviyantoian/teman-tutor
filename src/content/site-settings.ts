import type { SiteSettings } from '@/types';

/**
 * Site-wide settings. In fase 2, this will be replaced by a Supabase row.
 * Override sensitive values (wa number, etc.) via env at runtime.
 */
export const siteSettings: SiteSettings = {
  waNumber: '6281180892201',
  waDefaultMessage: 'Halo Teman Tutor, saya ingin konsultasi untuk les privat anak saya.',
  email: 'temantutorindonesia@gmail.com',
  instagramUrl: 'https://instagram.com/temantutor.id',
  tiktokUrl: undefined,
  youtubeUrl: undefined,
  areaServed: ['Bandung', 'Cimahi'],
  responseHours: 'Senin–Sabtu, 08.00–20.00 WIB',
  brandTagline: 'Teman Belajar, Teman Bertumbuh',
  heroHeadline: 'Les Privat ke Rumah Terbaik, Lebih Fokus & Efektif',
  heroSubheadline:
    'Teman Tutor hadir sebagai teman belajar, teman bertumbuh untuk setiap anak. Tatap muka langsung ke rumah di area Bandung & Cimahi.',
  heroTrustBadges: [
    'Mulai Rp169rb/sesi',
    'Bisa Trial 1 Sesi',
    'Gratis Ongkos Transport',
    'Tanpa Biaya Pendaftaran',
  ],
};
