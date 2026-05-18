import { Instagram, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { siteSettings } from '@/content/site-settings';
import { buildWaLink } from '@/lib/wa';

const NAV_GROUPS = [
  {
    title: 'Eksplorasi',
    links: [
      { href: '/tentang', label: 'Tentang Kami' },
      { href: '/program', label: 'Program & Harga' },
      { href: '/testimoni', label: 'Testimoni' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Layanan',
    links: [
      { href: '/program#akademik', label: 'Les Akademik' },
      { href: '/program#persiapan-khusus', label: 'Persiapan Ujian' },
      { href: '/program#skill', label: 'Bahasa Asing' },
      { href: '/program#musik', label: 'Musik' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Syarat & Ketentuan' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-brand-navy-50 bg-brand-navy text-white">
      <div className="container grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Link href="/" aria-label="Teman Tutor, Beranda" className="inline-flex items-center">
            <Image
              src="/images/logo/logo-full-512-light.webp"
              alt="Teman Tutor"
              width={180}
              height={54}
              className="h-11 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-sm text-sm text-brand-navy-100">
            {siteSettings.brandTagline}. Les privat 1-on-1 ke rumah di area Bandung & Cimahi. Mulai
            dari Rp169.000/sesi.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-brand-navy-100">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-yellow-400" />
              <span>Melayani area {siteSettings.areaServed.join(' & ')}</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand-yellow-400" />
              <a href={`mailto:${siteSettings.email}`} className="hover:text-white">
                {siteSettings.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-brand-yellow-400" />
              <a
                href={buildWaLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Chat WhatsApp
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-yellow-400" />
              <span>{siteSettings.responseHours}</span>
            </li>
          </ul>
        </div>

        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="md:col-span-2">
            <h3 className="text-sm font-semibold text-white">{group.title}</h3>
            <ul className="mt-4 space-y-2">
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-brand-navy-100 transition-colors hover:text-brand-yellow-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {siteSettings.instagramUrl || siteSettings.tiktokUrl || siteSettings.youtubeUrl ? (
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-white">Ikuti Kami</h3>
            <div className="mt-4 flex gap-2">
              {siteSettings.instagramUrl ? (
                <a
                  href={siteSettings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex size-10 items-center justify-center rounded-md bg-brand-navy-600 transition-colors hover:bg-brand-navy-400"
                >
                  <Instagram className="size-4" />
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-t border-brand-navy-600">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-brand-navy-200 md:flex-row">
          <p>© {new Date().getFullYear()} Teman Tutor. All rights reserved.</p>
          <p>Made with care in Bandung.</p>
        </div>
      </div>
    </footer>
  );
}
