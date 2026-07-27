import type { Faq } from '@/types';

export const faqs: Faq[] = [
  {
    id: 'faq-1',
    category: 'umum',
    question: 'Apa itu Teman Tutor?',
    answer:
      'Teman Tutor adalah platform les privat 1-on-1 yang melayani pengajaran tatap muka langsung ke rumah, untuk segala jenjang mulai dari calistung anak hingga persiapan ujian masuk PTN. Kami melayani area Jabodetabek, Bandung, dan Cimahi.',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'faq-2',
    category: 'harga-paket',
    question: 'Berapa biaya les privat di Teman Tutor?',
    answer:
      'Biaya bervariasi tergantung jenjang dan program. Untuk Calistung mulai Rp135.000/sesi, SD Rp130.000/sesi, SMP Rp165.000/sesi, SMA Rp210.000/sesi, dan persiapan ujian mulai Rp165.000/sesi. Tidak ada biaya pendaftaran dan tidak ada biaya transport tambahan.',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'faq-3',
    category: 'tutor',
    question: 'Bagaimana proses pemilihan tutor?',
    answer:
      'Semua tutor Teman Tutor melalui seleksi ketat berdasarkan kompetensi akademik, pengalaman mengajar, dan kemampuan komunikasi dengan anak. Setelah konsultasi, kami akan rekomendasikan tutor terbaik sesuai kebutuhan dan karakter anak.',
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 'faq-4',
    category: 'umum',
    question: 'Bisakah saya trial dulu sebelum ambil paket?',
    answer:
      'Tentu! Kami menyediakan 1 sesi trial sebelum Anda memutuskan untuk mengambil paket. Trial ini bertujuan agar anak dan tutor bisa saling menyesuaikan terlebih dahulu.',
    sortOrder: 4,
    isActive: true,
  },
  {
    id: 'faq-5',
    category: 'jadwal',
    question: 'Apakah jadwal les bisa fleksibel?',
    answer:
      'Ya, jadwal sangat fleksibel. Anda bisa memilih hari dan jam yang paling cocok, termasuk akhir pekan. Jika ada perubahan jadwal, cukup koordinasi dengan tutor minimal 1×24 jam sebelumnya.',
    sortOrder: 5,
    isActive: true,
  },
  {
    id: 'faq-6',
    category: 'jadwal',
    question: 'Berapa lama durasi setiap sesi?',
    answer:
      'Durasi tergantung program: Calistung & kelas bahasa/skill 60 menit, SD/SMP/SMA akademik dan persiapan kedinasan/olimpiade 90 menit, persiapan SNBT/UTBK dan IELTS/TOEFL 120 menit, serta musik 45 menit per sesi.',
    sortOrder: 6,
    isActive: true,
  },
  {
    id: 'faq-7',
    category: 'area-layanan',
    question: 'Apakah Teman Tutor melayani area saya?',
    answer:
      'Saat ini kami melayani area Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi), Bandung, dan Cimahi. Untuk area di luar kota tersebut, silakan konsultasikan dahulu, kami akan cek ketersediaan tutor di area Anda.',
    sortOrder: 7,
    isActive: true,
  },
  {
    id: 'faq-8',
    category: 'harga-paket',
    question: 'Pilihan paket per bulan ada apa saja?',
    answer:
      'Kami menyediakan paket fleksibel: 4, 8, 12, 16, 20, 24, hingga 28 sesi per bulan. Semakin banyak sesi, biasanya ada harga khusus. Konsultasikan kebutuhan anak Anda untuk dapat rekomendasi paket terbaik.',
    sortOrder: 8,
    isActive: true,
  },
  {
    id: 'faq-9',
    category: 'tutor',
    question: 'Apakah tutor mendukung kurikulum internasional?',
    answer:
      'Ya, kami mendukung kurikulum nasional (K13, Kurikulum Merdeka) dan internasional (Cambridge, IB, dll). Beri tahu kurikulum yang anak Anda gunakan saat konsultasi.',
    sortOrder: 9,
    isActive: true,
  },
  {
    id: 'faq-10',
    category: 'umum',
    question: 'Apakah ada laporan perkembangan belajar?',
    answer:
      'Ya. Orang tua akan mendapat laporan singkat dari tutor secara berkala, mencakup materi yang telah dipelajari, evaluasi, dan rekomendasi untuk sesi berikutnya.',
    sortOrder: 10,
    isActive: true,
  },
  {
    id: 'faq-11',
    category: 'harga-paket',
    question: 'Bagaimana cara pembayaran?',
    answer:
      'Pembayaran dilakukan di awal tiap paket bulanan via transfer bank atau e-wallet. Detail metode pembayaran akan dikirim saat Anda konfirmasi paket. Tidak ada biaya admin atau biaya tersembunyi.',
    sortOrder: 11,
    isActive: true,
  },
  {
    id: 'faq-12',
    category: 'umum',
    question: 'Bagaimana cara mulai konsultasi?',
    answer:
      'Cukup chat WhatsApp kami atau isi form konsultasi di halaman Kontak. Tim kami akan menghubungi balik dalam jam kerja (Senin–Minggu, 09.00–21.00 WIB) untuk diskusi kebutuhan anak Anda.',
    sortOrder: 12,
    isActive: true,
  },
];

export const faqCategoryLabel: Record<Faq['category'], string> = {
  umum: 'Umum',
  tutor: 'Tutor',
  'harga-paket': 'Harga & Paket',
  jadwal: 'Jadwal',
  'area-layanan': 'Area Layanan',
};
