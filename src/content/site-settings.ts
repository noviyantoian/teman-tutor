import type { SiteSettings } from '@/types';

/**
 * Site-wide settings. In fase 2, this will be replaced by a Supabase row.
 * Override sensitive values (wa number, etc.) via env at runtime.
 */
export const siteSettings: SiteSettings = {
  waNumber: '6281234567890', // ⚠️ Ganti dengan nomor WA resmi
  waDefaultMessage:
    'Halo Teman Tutor, saya ingin konsultasi gratis untuk les privat anak saya.',
  email: 'admin@temantutor.id',
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
    'Gratis Trial 1 Sesi',
    'Gratis Ongkos Transport',
    'Tanpa Biaya Pendaftaran',
  ],
};
