import type { Package } from '@/types';

export const packages: Package[] = [
  { id: 'pkg-4', sessionCount: 4, isPopular: false, sortOrder: 1, description: 'Cocok untuk trial bulanan' },
  { id: 'pkg-8', sessionCount: 8, isPopular: true, sortOrder: 2, description: '2x seminggu, ritme stabil' },
  { id: 'pkg-12', sessionCount: 12, isPopular: false, sortOrder: 3, description: '3x seminggu untuk akselerasi' },
  { id: 'pkg-16', sessionCount: 16, isPopular: false, sortOrder: 4, description: 'Intensif sebelum ujian' },
  { id: 'pkg-20', sessionCount: 20, isPopular: false, sortOrder: 5, description: 'Bootcamp persiapan' },
  { id: 'pkg-24', sessionCount: 24, isPopular: false, sortOrder: 6, description: 'Program intensif penuh' },
  { id: 'pkg-28', sessionCount: 28, isPopular: false, sortOrder: 7, description: 'Maksimal, hampir tiap hari' },
];
