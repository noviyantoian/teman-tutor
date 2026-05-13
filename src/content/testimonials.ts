import type { Testimonial } from '@/types';

/**
 * Testimonials, DUMMY untuk MVP launch.
 * Wajib diganti dengan testimoni asli (screenshot WA / video) dalam 14–30 hari.
 * Lihat /admin tidak ada di fase 1; edit langsung file ini lalu redeploy.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'testi-1',
    type: 'text',
    contentText:
      'Saya pilih Teman Tutor karena anak saya jadi lebih semangat belajar matematika. Tutornya sabar dan dekat dengan anak. Setelah 2 bulan, nilai matematika anak naik dari 60 ke 85.',
    giverName: 'Ibu Sinta',
    giverRole: 'Orang tua siswa SD kelas 4, Bandung',
    category: 'akademik',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'testi-2',
    type: 'text',
    contentText:
      'Anak saya persiapan SNBT dengan Kak Bayu. Sistem belajarnya terstruktur, ada try-out rutin, dan tutor selalu kasih insight strategi soal. Alhamdulillah lolos PTN!',
    giverName: 'Pak Andi',
    giverRole: 'Orang tua siswa SMA kelas 12, Cimahi',
    category: 'persiapan-khusus',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'testi-3',
    type: 'text',
    contentText:
      'Belajar IELTS dengan Kak Sasha sangat membantu. Speaking-ku yang dulunya minder, sekarang lebih percaya diri. Dapat skor 7.5 di percobaan pertama.',
    giverName: 'Dinda',
    giverRole: 'Mahasiswa, persiapan studi ke Australia',
    category: 'skill',
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 'testi-4',
    type: 'text',
    contentText:
      'Anak saya yang sebelumnya bosan dengan piano, sekarang minta tambah jam belajar. Kak Rio bawa metode yang fun dan tetap disiplin.',
    giverName: 'Ibu Marlin',
    giverRole: 'Orang tua siswa kelas 5 SD, Bandung',
    category: 'musik',
    sortOrder: 4,
    isActive: true,
  },
  {
    id: 'testi-5',
    type: 'text',
    contentText:
      'Saya orang tua bekerja, jadi sangat terbantu dengan tutor yang datang ke rumah. Tidak perlu antar-jemput, dan ada laporan progres tiap bulan.',
    giverName: 'Bu Ratna',
    giverRole: 'Orang tua siswa SMP kelas 8, Bandung',
    category: 'akademik',
    sortOrder: 5,
    isActive: true,
  },
  {
    id: 'testi-6',
    type: 'text',
    contentText:
      'Trial sesi yang gratis sangat membantu saya yakin sebelum ambil paket. Tutornya benar-benar punya chemistry dengan anak saya sejak hari pertama.',
    giverName: 'Pak Hadi',
    giverRole: 'Orang tua siswa SD kelas 2, Cimahi',
    category: 'akademik',
    sortOrder: 6,
    isActive: true,
  },
];
