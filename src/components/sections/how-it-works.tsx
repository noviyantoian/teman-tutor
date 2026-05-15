import { CalendarCheck, MessageCircle, PlayCircle, TrendingUp } from 'lucide-react';
import Image from 'next/image';

const HOW_IT_WORKS_IMAGE =
  'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=80';

const STEPS = [
  {
    icon: MessageCircle,
    title: 'Konsultasi',
    description: 'Chat dengan tim kami untuk diskusi kebutuhan & rekomendasi tutor.',
  },
  {
    icon: PlayCircle,
    title: 'Trial 1 sesi',
    description: 'Coba 1 sesi bersama tutor pilihan, tanpa komitmen.',
  },
  {
    icon: CalendarCheck,
    title: 'Pilih paket',
    description: 'Tentukan jumlah sesi & jadwal yang paling cocok untuk anak.',
  },
  {
    icon: TrendingUp,
    title: 'Belajar & monitor',
    description: 'Anak belajar rutin, orang tua dapat laporan progres berkala.',
  },
] as const;

export function HowItWorksSection() {
  return (
    <section className="section bg-brand-navy-50/40">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-soft-lg">
              <Image
                src={HOW_IT_WORKS_IMAGE}
                alt="Anak fokus belajar dengan buku catatan"
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 70vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 hidden rounded-xl bg-brand-yellow-500 px-5 py-4 font-semibold text-brand-navy shadow-soft-lg md:block">
              Bisa Trial 1 Sesi
            </div>
          </div>

          <div>
            <span className="eyebrow">Cara Mulai</span>
            <h2 className="mt-4 font-display text-heading-1 font-bold text-brand-navy">
              Empat langkah, anak siap belajar
            </h2>
            <p className="mt-3 text-base text-brand-navy-400 md:text-lg">
              Proses sederhana, transparan, dan tanpa komitmen sampai Anda yakin tutor cocok untuk
              anak.
            </p>

            <ol className="mt-8 grid gap-4 sm:grid-cols-2">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <li
                    key={s.title}
                    className="relative flex h-full flex-col rounded-2xl border border-brand-navy-50 bg-white p-5 shadow-soft-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="inline-flex size-9 items-center justify-center rounded-full bg-brand-navy font-display text-sm font-bold text-brand-yellow"
                      >
                        {i + 1}
                      </span>
                      <Icon className="size-5 text-brand-yellow-500" aria-hidden />
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-brand-navy">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-navy-400">
                      {s.description}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
