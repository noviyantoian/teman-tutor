import type { Testimonial } from '@/types';

export const testimonials: Testimonial[] = [
  {
    id: 'testi-wa-1',
    type: 'screenshot',
    mediaUrl: '/images/testimonials/WhatsApp%20Image%202026-05-15%20at%2017.31.12%20(1).jpeg',
    contentText:
      'Anak saya jadi lebih semangat belajar sejak ikut les di Teman Tutor. Cara ngajarnya sabar dan gampang dipahami. Nilainya juga mulai naik di sekolah. Kami puas banget.',
    giverName: 'Orang Tua Murid',
    giverRole: 'Les Akademik, Bandung',
    category: 'akademik',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'testi-wa-2',
    type: 'screenshot',
    mediaUrl: '/images/testimonials/WhatsApp%20Image%202026-05-15%20at%2017.31.12%20(2).jpeg',
    contentText:
      'Nilai matematika umum dan tingkat lanjut 96 di rapor semester 5. Rangking 1 di kelas, nilai rata-rata 96.29, dan siap SNBP.',
    giverName: 'Orang Tua Murid',
    giverRole: 'Persiapan SNBP, SMA',
    category: 'persiapan-khusus',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'testi-wa-3',
    type: 'screenshot',
    mediaUrl: '/images/testimonials/WhatsApp%20Image%202026-05-15%20at%2017.31.12.jpeg',
    contentText:
      'Anak saya sekarang jadi lebih percaya diri kalau ngerjain soal. Biasanya dia takut matematika, tapi setelah les di Teman Tutor jadi lebih ngerti.',
    giverName: 'Orang Tua Murid',
    giverRole: 'Les Matematika, Bandung',
    category: 'akademik',
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 'testi-wa-4',
    type: 'screenshot',
    mediaUrl: '/images/testimonials/WhatsApp%20Image%202026-05-15%20at%2017.31.13.jpeg',
    contentText:
      'Kak aku jadi lebih ngerti pelajaran sekarang, dulu aku bingung banget. Penjelasannya enak banget, jadi kalau di sekolah udah ga terlalu takut lagi.',
    giverName: 'Murid Teman Tutor',
    giverRole: 'Pelajar, Bandung',
    category: 'akademik',
    sortOrder: 4,
    isActive: true,
  },
];
