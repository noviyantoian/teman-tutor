import { siteSettings } from '@/content/site-settings';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Syarat & Ketentuan | Teman Tutor',
  description: 'Syarat dan ketentuan penggunaan layanan les privat Teman Tutor.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <article className="section bg-white">
      <div className="prose prose-slate prose-headings:font-display prose-headings:text-brand-navy container max-w-3xl">
        <h1 className="font-display text-display-2 font-bold text-brand-navy">
          Syarat & Ketentuan
        </h1>
        <p className="text-sm text-brand-navy-400">Terakhir diperbarui: 13 Mei 2026</p>

        <h2>1. Penggunaan Layanan</h2>
        <p>
          Dengan menggunakan layanan Teman Tutor, Anda setuju untuk dihubungi tim kami via
          WhatsApp/telepon untuk keperluan konsultasi dan koordinasi jadwal.
        </p>

        <h2>2. Pembayaran</h2>
        <p>
          Pembayaran paket bulanan dilakukan di awal periode. Sesi yang tidak digunakan (cancel
          mendadak &lt; 24 jam) tidak dapat di-refund, namun bisa dijadwalkan ulang sesuai
          ketersediaan tutor.
        </p>

        <h2>3. Pembatalan & Reschedule</h2>
        <p>
          Reschedule wajib diinformasikan minimal 1×24 jam sebelumnya. Pembatalan paket dapat
          dilakukan dengan pemberitahuan minimal 7 hari sebelum siklus berikutnya.
        </p>

        <h2>4. Tanggung Jawab</h2>
        <p>
          Teman Tutor berusaha sebaik mungkin memberikan layanan berkualitas, namun tidak menjamin
          hasil akademik tertentu, karena setiap anak unik dan banyak faktor mempengaruhi.
        </p>

        <h2>5. Perubahan Ketentuan</h2>
        <p>
          Syarat ini dapat diperbarui sewaktu-waktu. Versi terbaru selalu tersedia di halaman ini.
        </p>

        <h2>6. Kontak</h2>
        <p>
          Pertanyaan terkait syarat & ketentuan dapat dikirim ke{' '}
          <a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a>.
        </p>
      </div>
    </article>
  );
}
