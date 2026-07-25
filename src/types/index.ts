/**
 * Shared types, mirror future Supabase database schema (PRD §6.3).
 * Keep these in sync so static content files map cleanly to DB rows in fase 2.
 */

export type ProgramCategory = 'akademik' | 'skill' | 'musik' | 'persiapan-khusus';
export type GradeLevel = 'balita' | 'sd-1-3' | 'sd-4-6' | 'smp' | 'sma' | 'mahasiswa' | 'umum';
export type Area = 'bandung' | 'cimahi' | 'lainnya';
export type TestimonialType = 'text' | 'screenshot' | 'video';
export type FaqCategory = 'umum' | 'tutor' | 'harga-paket' | 'jadwal' | 'area-layanan';
export type LeadStatus = 'new' | 'contacted' | 'trial' | 'closed_won' | 'closed_lost';

export type Tutor = {
  id: string;
  slug: string;
  fullName: string;
  photoUrl: string;
  subjects: string[];
  experienceYears: number;
  shortBio: string;
  longBio?: string;
  badges: string[];
  isFeatured: boolean;
  sortOrder: number;
  isActive: boolean;
};

export type Testimonial = {
  id: string;
  type: TestimonialType;
  contentText?: string;
  mediaUrl?: string;
  giverName: string;
  giverRole?: string;
  category: ProgramCategory;
  sortOrder: number;
  isActive: boolean;
};

export type University = {
  id: string;
  name: string;
  logoUrl: string;
  sortOrder: number;
  isActive: boolean;
};

export type Program = {
  id: string;
  slug: string;
  category: ProgramCategory;
  name: string;
  description: string;
  icon: string; // lucide icon name
  imageUrl?: string; // 16:10 cover photo, falls back to the icon when absent
  priceFrom: number; // in IDR
  sessionDurationMinutes: number;
  subjects: string[];
  sortOrder: number;
  isActive: boolean;
};

export type Package = {
  id: string;
  sessionCount: number;
  pricePerSession?: number;
  discountLabel?: string;
  description?: string;
  isPopular: boolean;
  sortOrder: number;
};

export type Faq = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
};

export type SiteSettings = {
  waNumber: string;
  waDefaultMessage: string;
  email: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  areaServed: string[];
  responseHours: string;
  brandTagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroTrustBadges: string[];
};

export type ValueProp = {
  id: string;
  icon: string; // lucide icon name
  title: string;
  description: string;
};

export type LeadFormInput = {
  fullName: string;
  phoneWa: string;
  email?: string;
  childGrade: GradeLevel;
  subjectsInterested: string[];
  area: Area;
  areaDetail?: string;
  message?: string;
  // Honeypot (must be empty)
  website?: string;
  // Optional context for tracking
  sourcePage?: string;
};
