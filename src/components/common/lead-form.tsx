'use client';

import { Loader2, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { programs } from '@/content/programs';
import { trackFormStart, trackFormSubmit } from '@/lib/analytics';

type FormState = 'idle' | 'submitting' | 'error';

export function LeadForm({ sourcePage }: { sourcePage?: string }) {
  const router = useRouter();
  const [state, setState] = useState<FormState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [subjects, setSubjects] = useState<string[]>([]);

  const onFirstFocus = () => {
    if (!touched) {
      trackFormStart('lead');
      setTouched(true);
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      fullName: String(fd.get('fullName') ?? ''),
      phoneWa: String(fd.get('phoneWa') ?? ''),
      email: String(fd.get('email') ?? ''),
      age: String(fd.get('age') ?? ''),
      gender: String(fd.get('gender') ?? ''),
      classAndCurriculum: String(fd.get('classAndCurriculum') ?? ''),
      schoolName: String(fd.get('schoolName') ?? ''),
      subjectsInterested: subjects,
      sessionsPerWeek: String(fd.get('sessionsPerWeek') ?? ''),
      schedulePreference: String(fd.get('schedulePreference') ?? ''),
      teacherCriteria: String(fd.get('teacherCriteria') ?? ''),
      locationAddress: String(fd.get('locationAddress') ?? ''),
      locationLandmark: String(fd.get('locationLandmark') ?? ''),
      website: String(fd.get('website') ?? ''), // honeypot
      sourcePage: sourcePage ?? '/',
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error ?? 'Terjadi kesalahan. Coba lagi atau chat WhatsApp.');
      }
      trackFormSubmit('lead');
      router.push('/terima-kasih');
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    }
  }

  const toggleSubject = (subject: string) => {
    setSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject],
    );
  };

  // Client-approved option list (REVISI 1, 2026-07-25).
  const subjectOptions = [
    'Calistung',
    'Akademik (Matematika, IPA, IPS, Bahasa Inggris, Bahasa Indonesia, dll)',
    'SNBT / UTBK',
    'Tes Kedinasan (STAN, STIS, dll)',
    'Olimpiade',
    'Bahasa Inggris',
    'Khusus IELTS / TOEFL',
    'Bahasa Mandarin',
    'Bahasa Jepang',
    'Bahasa Korea',
    'Musik Piano',
    'Musik Gitar',
    'Musik Biola',
    'Musik Vocal',
  ];

  const selectClass =
    'mt-1.5 flex h-11 w-full rounded-md border border-input bg-white px-3 text-sm shadow-soft-sm focus-visible:border-brand-yellow-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500/40';

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={onFirstFocus}
      className="space-y-5"
      noValidate
      aria-busy={state === 'submitting'}
    >
      {/* Honeypot, hidden from real users */}
      <div className="absolute -left-[10000px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Nama + WA */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Nama Lengkap *</Label>
          <Input
            id="fullName"
            name="fullName"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            placeholder="Contoh: Budi Santoso"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="phoneWa">No WhatsApp *</Label>
          <Input
            id="phoneWa"
            name="phoneWa"
            type="tel"
            inputMode="numeric"
            required
            autoComplete="tel"
            placeholder="081234567890"
            className="mt-1.5"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">Email (opsional)</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="email@contoh.com"
          className="mt-1.5"
        />
      </div>

      {/* Umur + Jenis Kelamin */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="age">Umur *</Label>
          <Input
            id="age"
            name="age"
            type="number"
            inputMode="numeric"
            required
            min={1}
            max={100}
            placeholder="Contoh: 14"
            className="mt-1.5"
          />
        </div>
        <div>
          <fieldset>
            <legend className="text-sm font-medium text-brand-navy">Jenis Kelamin *</legend>
            <div className="mt-2 flex flex-wrap gap-3">
              {(['laki-laki', 'perempuan'] as const).map((g) => (
                <label
                  key={g}
                  className="inline-flex items-center gap-2 rounded-md border border-input bg-white px-3 py-2 text-sm capitalize"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    required
                    className="accent-brand-yellow-500"
                  />
                  {g === 'laki-laki' ? 'Laki-laki' : 'Perempuan'}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      {/* Kelas & Kurikulum + Nama Sekolah */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="classAndCurriculum">Kelas & Kurikulum (opsional)</Label>
          <Input
            id="classAndCurriculum"
            name="classAndCurriculum"
            maxLength={100}
            placeholder="Contoh: Kelas 10, Kurikulum Merdeka"
            className="mt-1.5"
          />
          <p className="mt-1 text-xs text-brand-navy-400">Jika masih bersekolah / kuliah.</p>
        </div>
        <div>
          <Label htmlFor="schoolName">Nama Sekolah / Universitas (opsional)</Label>
          <Input
            id="schoolName"
            name="schoolName"
            maxLength={120}
            placeholder="Contoh: SMA Negeri 3 Bandung"
            className="mt-1.5"
          />
        </div>
      </div>

      {/* Mata Pelajaran */}
      <div>
        <fieldset>
          <legend className="text-sm font-medium text-brand-navy">
            Ingin Les Mata Pelajaran Apa? *
          </legend>
          <p className="mt-1 text-xs text-brand-navy-400">Pilih satu atau lebih.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {subjectOptions.map((s) => {
              const active = subjects.includes(s);
              return (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleSubject(s)}
                  className={
                    active
                      ? 'max-w-full whitespace-normal rounded-2xl border-2 border-brand-navy bg-brand-navy px-3.5 py-1.5 text-left text-xs font-semibold text-white'
                      : 'max-w-full whitespace-normal rounded-2xl border-2 border-brand-navy-100 bg-white px-3.5 py-1.5 text-left text-xs font-medium text-brand-navy-600 transition-colors hover:border-brand-navy-300'
                  }
                  aria-pressed={active}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-brand-navy-400">
            Tidak ada di daftar? Tulis di kriteria pengajar ({programs.length} program tersedia).
          </p>
        </fieldset>
      </div>

      {/* Paket Sesi */}
      <div>
        <Label htmlFor="sessionsPerWeek">Paket Sesi per Bulan (berapa kali per minggu) *</Label>
        <select
          id="sessionsPerWeek"
          name="sessionsPerWeek"
          required
          defaultValue=""
          className={selectClass}
        >
          <option value="" disabled>
            Pilih frekuensi les…
          </option>
          <option value="1">1x seminggu</option>
          <option value="2">2x seminggu</option>
          <option value="3">3x seminggu</option>
          <option value="4">4x seminggu</option>
          <option value="5">5x seminggu</option>
        </select>
      </div>

      {/* Jadwal Les */}
      <div>
        <Label htmlFor="schedulePreference">Jadwal Les (ingin mulai kapan?) *</Label>
        <Textarea
          id="schedulePreference"
          name="schedulePreference"
          required
          minLength={2}
          maxLength={300}
          placeholder="Contoh: Ingin mulai minggu depan, hari Senin & Rabu sore sekitar jam 15.00–17.00"
          className="mt-1.5"
        />
      </div>

      {/* Kriteria Pengajar */}
      <div>
        <Label htmlFor="teacherCriteria">Kriteria Pengajar (opsional)</Label>
        <Textarea
          id="teacherCriteria"
          name="teacherCriteria"
          maxLength={500}
          placeholder="Contoh: Pengajar perempuan, sabar, berpengalaman mengajar anak SD"
          className="mt-1.5"
        />
      </div>

      {/* Lokasi Les */}
      <div>
        <Label htmlFor="locationAddress">Lokasi Les — Alamat Lengkap *</Label>
        <Textarea
          id="locationAddress"
          name="locationAddress"
          required
          minLength={5}
          maxLength={500}
          placeholder="Contoh: Jl. Cihampelas No. 123, RT 04/RW 02, Kel. Cipaganti, Kec. Coblong, Bandung 40131"
          className="mt-1.5"
        />
      </div>

      <div>
        <Label htmlFor="locationLandmark">Patokan Alamat (opsional)</Label>
        <Input
          id="locationLandmark"
          name="locationLandmark"
          maxLength={200}
          placeholder="Contoh: Dekat Masjid Al-Ikhlas, seberang Indomaret Cihampelas"
          className="mt-1.5"
        />
        <p className="mt-1 text-xs text-brand-navy-400">
          Bisa kirimkan share location via WhatsApp setelah form ini dikirim.
        </p>
      </div>

      {error ? (
        <div
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
        >
          {error}
        </div>
      ) : null}

      <Button
        type="submit"
        variant="accent"
        size="lg"
        disabled={state === 'submitting' || subjects.length === 0}
        className="w-full sm:w-auto"
      >
        {state === 'submitting' ? (
          <>
            <Loader2 className="size-5 animate-spin" /> Mengirim…
          </>
        ) : (
          <>
            <Send className="size-5" /> Kirim Konsultasi Gratis
          </>
        )}
      </Button>
      <p className="text-xs text-brand-navy-400">
        Dengan mengirim form, Anda setuju dihubungi tim kami via WhatsApp/telepon.
      </p>
    </form>
  );
}
