import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Privacy Policy | Teman Tutor',
  description: 'Kebijakan privasi Teman Tutor terkait pengumpulan dan penggunaan data pribadi.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <article className="section bg-white">
      <div className="container max-w-3xl prose prose-slate prose-headings:font-display prose-headings:text-brand-navy">
        <h1 className="font-display text-display-2 font-bold text-brand-navy">
          Privacy Policy
        </h1>
        <p className="text-sm text-brand-navy-400">Terakhir diperbarui: 13 Mei 2026</p>

        <p>
          Teman Tutor (&ldquo;kami&rdquo;) menghormati privasi Anda. Kebijakan ini menjelaskan
          bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi yang Anda
          berikan melalui website ini.
        </p>

        <h2>1. Data yang Kami Kumpulkan</h2>
        <ul>
          <li>Nama, nomor WhatsApp, email yang Anda isi di form konsultasi</li>
          <li>Jenjang anak, area layanan, mata pelajaran yang diminati</li>
          <li>Pesan tambahan yang Anda kirim</li>
          <li>Data anonim trafik website (via Google Analytics & Meta Pixel)</li>
        </ul>

        <h2>2. Penggunaan Data</h2>
        <ul>
          <li>Menghubungi Anda untuk konsultasi & follow-up</li>
          <li>Menyesuaikan rekomendasi tutor & paket</li>
          <li>Analitik agregat untuk meningkatkan layanan</li>
        </ul>

        <h2>3. Pembagian Data</h2>
        <p>
          Kami tidak menjual atau membagikan data pribadi Anda kepada pihak ketiga, kecuali
          tutor yang akan mengajar anak Anda (sesuai kesepakatan) atau diwajibkan oleh hukum
          yang berlaku.
        </p>

        <h2>4. Keamanan</h2>
        <p>
          Data dikirim via koneksi terenkripsi (HTTPS) dan disimpan di sistem dengan akses
          terbatas. Kami menerapkan praktik keamanan standar industri.
        </p>

        <h2>5. Hak Anda</h2>
        <p>
          Anda berhak meminta akses, koreksi, atau penghapusan data pribadi Anda. Hubungi
          kami via email untuk permintaan tersebut.
        </p>

        <h2>6. Kontak</h2>
        <p>
          Untuk pertanyaan terkait privasi, hubungi kami di{' '}
          <a href="mailto:admin@temantutor.id">admin@temantutor.id</a>.
        </p>
      </div>
    </article>
  );
}
