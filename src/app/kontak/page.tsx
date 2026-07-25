import { Clock, Instagram, Mail, MapPin, MessageCircle } from 'lucide-react';

import { JsonLd } from '@/components/common/json-ld';
import { LeadForm } from '@/components/common/lead-form';
import { Button } from '@/components/ui/button';
import { siteSettings } from '@/content/site-settings';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { formatAreaList } from '@/lib/utils';
import { buildWaLink } from '@/lib/wa';

export const metadata = buildMetadata({
  title: 'Kontak | Konsultasi Les Privat Jabodetabek, Bandung & Cimahi',
  description:
    'Isi form konsultasi atau chat WhatsApp Teman Tutor. Tim kami siap rekomendasikan tutor & paket terbaik untuk anak Anda.',
  path: '/kontak',
});

export default function KontakPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Beranda', path: '/' },
          { name: 'Kontak', path: '/kontak' },
        ])}
      />

      <section className="section bg-gradient-to-b from-brand-navy-50/60 to-white">
        <div className="container max-w-3xl text-center">
          <span className="eyebrow">Kontak</span>
          <h1 className="balanced mt-4 font-display text-display-2 font-bold text-brand-navy">
            Mulai <span className="text-brand-yellow-500">konsultasi</span> hari ini
          </h1>
          <p className="mt-5 text-lg text-brand-navy-600">
            Isi form di bawah atau chat WhatsApp langsung, kami akan respon dalam jam kerja kami.
          </p>
        </div>
      </section>

      <section className="section-tight bg-white">
        <div className="container grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-heading-2 font-bold text-brand-navy">
              Isi form konsultasi
            </h2>
            <p className="mt-2 text-sm text-brand-navy-400">* Field wajib diisi.</p>
            <div className="mt-6 rounded-2xl border border-brand-navy-50 bg-white p-6 shadow-soft-sm md:p-8">
              <LeadForm sourcePage="/kontak" />
            </div>
          </div>

          <aside className="lg:col-span-1">
            <h2 className="font-display text-heading-2 font-bold text-brand-navy">
              Atau langsung chat
            </h2>
            <div className="mt-6 space-y-4 rounded-2xl border border-brand-navy-50 bg-brand-navy-50/40 p-6">
              <div className="flex items-start gap-3">
                <MessageCircle className="mt-1 size-5 shrink-0 text-brand-yellow-500" />
                <div>
                  <p className="text-sm font-semibold text-brand-navy">WhatsApp</p>
                  <p className="text-sm text-brand-navy-600">+{siteSettings.waNumber}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 size-5 shrink-0 text-brand-yellow-500" />
                <div>
                  <p className="text-sm font-semibold text-brand-navy">Email</p>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="text-sm text-brand-navy-600 hover:text-brand-navy"
                  >
                    {siteSettings.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-brand-yellow-500" />
                <div>
                  <p className="text-sm font-semibold text-brand-navy">Area Layanan</p>
                  <p className="text-sm text-brand-navy-600">
                    {formatAreaList(siteSettings.areaServed)}
                  </p>
                </div>
              </div>
              {siteSettings.instagramUrl ? (
                <div className="flex items-start gap-3">
                  <Instagram className="mt-1 size-5 shrink-0 text-brand-yellow-500" />
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">Instagram</p>
                    <a
                      href={siteSettings.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-navy-600 hover:text-brand-navy"
                    >
                      @temantutor_id
                    </a>
                  </div>
                </div>
              ) : null}
              <div className="flex items-start gap-3">
                <Clock className="mt-1 size-5 shrink-0 text-brand-yellow-500" />
                <div>
                  <p className="text-sm font-semibold text-brand-navy">Jam Respon</p>
                  <p className="text-sm text-brand-navy-600">{siteSettings.responseHours}</p>
                </div>
              </div>
              <Button asChild variant="accent" size="lg" className="w-full">
                <a href={buildWaLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-5" /> Chat WhatsApp Sekarang
                </a>
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
