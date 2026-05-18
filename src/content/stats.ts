export type Stat = {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: string;
};

export const stats: Stat[] = [
  {
    id: 'stat-students',
    value: '500+',
    label: 'Siswa Terbantu',
    description: 'Anak yang sudah belajar bersama Teman Tutor di Bandung & Cimahi.',
    icon: 'Users',
  },
  {
    id: 'stat-tutors',
    value: '50+',
    label: 'Tutor Terverifikasi',
    description: 'Lulusan PT terbaik, lolos screening pengalaman & kepribadian.',
    icon: 'UserCheck',
  },
  {
    id: 'stat-satisfaction',
    value: '98%',
    label: 'Kepuasan Orang Tua',
    description: 'Berdasarkan feedback rutin setelah sesi belajar.',
    icon: 'ThumbsUp',
  },
  {
    id: 'stat-rating',
    value: '4.9',
    label: 'Rating Rata-rata',
    description: 'Dari skala 5, hasil review siswa & orang tua.',
    icon: 'Star',
  },
];
