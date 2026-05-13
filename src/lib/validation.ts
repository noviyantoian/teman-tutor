import { z } from 'zod';

/**
 * Indonesian phone validation, accepts:
 *  +628xxxxxxxxx, 628xxxxxxxxx, 08xxxxxxxxx
 * Returns normalized 628xxxxxxxxx (no +, no leading 0).
 */
const phoneRegex = /^(\+?62|0)8[1-9][0-9]{6,11}$/;

export const leadFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Nama minimal 2 karakter')
    .max(80, 'Nama terlalu panjang')
    .regex(/^[\p{L}\s.'-]+$/u, 'Nama mengandung karakter tidak valid'),

  phoneWa: z
    .string()
    .trim()
    .regex(phoneRegex, 'Nomor WhatsApp tidak valid (contoh: 081234567890)')
    .transform((val) => {
      // Normalize to 628xxxxxxxx
      const digits = val.replace(/\D/g, '');
      if (digits.startsWith('62')) return digits;
      if (digits.startsWith('0')) return `62${digits.slice(1)}`;
      return digits;
    }),

  email: z
    .union([z.string().trim().email('Email tidak valid'), z.literal('')])
    .optional()
    .transform((v) => (v === '' ? undefined : v)),

  childGrade: z.enum(['balita', 'sd-1-3', 'sd-4-6', 'smp', 'sma', 'mahasiswa', 'umum'], {
    errorMap: () => ({ message: 'Pilih jenjang anak' }),
  }),

  subjectsInterested: z
    .array(z.string().trim().min(1).max(60))
    .min(1, 'Pilih minimal 1 program')
    .max(10),

  area: z.enum(['bandung', 'cimahi', 'lainnya'], {
    errorMap: () => ({ message: 'Pilih area' }),
  }),

  areaDetail: z.string().trim().max(120).optional(),

  message: z.string().trim().max(1000, 'Pesan terlalu panjang').optional(),

  // Honeypot, must be empty/undefined
  website: z
    .string()
    .max(0, 'Spam detected')
    .optional()
    .or(z.literal(''))
    .transform(() => undefined),

  sourcePage: z.string().trim().max(120).optional(),
});

export type LeadFormSchema = z.infer<typeof leadFormSchema>;
