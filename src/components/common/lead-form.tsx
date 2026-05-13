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
      childGrade: String(fd.get('childGrade') ?? ''),
      subjectsInterested: subjects,
      area: String(fd.get('area') ?? ''),
      areaDetail: String(fd.get('areaDetail') ?? ''),
      message: String(fd.get('message') ?? ''),
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

  const popularSubjects = [
    'Matematika SD',
    'Matematika SMP',
    'Matematika SMA',
    'IPA',
    'Bahasa Inggris',
    'IELTS',
    'Persiapan SNBT',
    'Calistung',
    'Piano',
    'Gitar',
  ];

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
            placeholder="Contoh: Bu Sinta"
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

      <div>
        <Label htmlFor="childGrade">Jenjang Anak *</Label>
        <select
          id="childGrade"
          name="childGrade"
          required
          defaultValue=""
          className="mt-1.5 flex h-11 w-full rounded-md border border-input bg-white px-3 text-sm shadow-soft-sm focus-visible:border-brand-yellow-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500/40"
        >
          <option value="" disabled>
            Pilih jenjang…
          </option>
          <option value="balita">Balita / TK</option>
          <option value="sd-1-3">SD Kelas 1–3</option>
          <option value="sd-4-6">SD Kelas 4–6</option>
          <option value="smp">SMP</option>
          <option value="sma">SMA</option>
          <option value="mahasiswa">Mahasiswa</option>
          <option value="umum">Umum / Dewasa</option>
        </select>
      </div>

      <div>
        <fieldset>
          <legend className="text-sm font-medium text-brand-navy">
            Mata Pelajaran / Program *
          </legend>
          <p className="mt-1 text-xs text-brand-navy-400">Pilih satu atau lebih.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {popularSubjects.map((s) => {
              const active = subjects.includes(s);
              return (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleSubject(s)}
                  className={
                    active
                      ? 'rounded-full border-2 border-brand-navy bg-brand-navy px-3.5 py-1.5 text-xs font-semibold text-white'
                      : 'rounded-full border-2 border-brand-navy-100 bg-white px-3.5 py-1.5 text-xs font-medium text-brand-navy-600 hover:border-brand-navy-300'
                  }
                  aria-pressed={active}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-brand-navy-400">
            Tidak ada di daftar? Tulis di kolom pesan ({programs.length} program tersedia).
          </p>
        </fieldset>
      </div>

      <div>
        <fieldset>
          <legend className="text-sm font-medium text-brand-navy">Area *</legend>
          <div className="mt-2 flex flex-wrap gap-3">
            {(['bandung', 'cimahi', 'lainnya'] as const).map((a) => (
              <label
                key={a}
                className="inline-flex items-center gap-2 rounded-md border border-input bg-white px-3 py-2 text-sm capitalize"
              >
                <input
                  type="radio"
                  name="area"
                  value={a}
                  required
                  className="accent-brand-yellow-500"
                />
                {a}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div>
        <Label htmlFor="areaDetail">Detail Area (opsional)</Label>
        <Input
          id="areaDetail"
          name="areaDetail"
          maxLength={120}
          placeholder="Contoh: Antapani, Bandung Timur"
          className="mt-1.5"
        />
      </div>

      <div>
        <Label htmlFor="message">Pesan Tambahan (opsional)</Label>
        <Textarea
          id="message"
          name="message"
          maxLength={1000}
          placeholder="Ceritakan sedikit kebutuhan anak Anda…"
          className="mt-1.5"
        />
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
