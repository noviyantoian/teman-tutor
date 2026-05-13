# Teman Tutor — Website

> Marketing website Teman Tutor — platform les privat 1-on-1 ke rumah, area Bandung & Cimahi.
> *Teman Belajar, Teman Bertumbuh.*

## Stack

- **Next.js 14** (App Router, RSC default)
- **TypeScript** (strict mode)
- **Tailwind CSS** + **shadcn/ui**
- **Framer Motion** for tasteful motion
- **Zod** for validation
- **Resend** for transactional email
- **Vercel** for hosting

## Quickstart

```bash
# 1. Install deps (pakai pnpm)
pnpm install

# 2. Setup environment
cp .env.example .env.local
# isi minimal: NEXT_PUBLIC_WA_NUMBER, RESEND_API_KEY, LEAD_NOTIFICATION_EMAIL

# 3. Dev server
pnpm dev   # → http://localhost:3000
```

## Scripts

| Command                | Purpose                                       |
| ---------------------- | --------------------------------------------- |
| `pnpm dev`             | Dev server with HMR                           |
| `pnpm build`           | Production build                              |
| `pnpm start`           | Run production build locally                  |
| `pnpm lint`            | ESLint                                        |
| `pnpm typecheck`       | TypeScript compile-check                      |
| `pnpm format`          | Prettier write                                |
| `pnpm analyze`         | Build with bundle analyzer                    |
| `pnpm ci`              | typecheck + lint + format:check (run before push) |

## Project structure

```
src/
├── app/                 # Next.js routes (App Router)
├── components/
│   ├── ui/              # shadcn primitives (Button, Card, …)
│   ├── layout/          # Header, Footer, MobileCtaBar
│   ├── sections/        # Hero, ValueProps, HowItWorks, …
│   ├── common/          # WhatsAppFloat, LeadForm, Analytics, JsonLd
│   └── illustrations/   # Decorative SVGs
├── content/             # Static data (replaced by Supabase in fase 2)
├── lib/                 # utils, seo, wa, analytics, validation, rate-limit
├── types/               # Shared types
└── styles/              # Optional extra tokens
```

See [`CLAUDE.md`](./CLAUDE.md) for the full project context — brand system, conventions, security, performance, and SEO rules.

## Pages

| Route              | Purpose                                  |
| ------------------ | ---------------------------------------- |
| `/`                | Home — hero + all section previews       |
| `/tentang`         | About — brand story & values             |
| `/program`         | All programs + monthly packages          |
| `/tutor`           | Tutor grid with bios                     |
| `/testimoni`       | Testimonial gallery                      |
| `/faq`             | Grouped FAQ accordion                    |
| `/kontak`          | Lead form + contact info                 |
| `/terima-kasih`    | Post-submit thank you (noindex)          |
| `/privacy-policy`  | Privacy policy                           |
| `/terms`           | Terms & conditions                       |

## Editing content (fase 1, static)

Konten dinamis ada di `src/content/*.ts`:

- `tutors.ts` — daftar tutor (foto, mata pelajaran, bio)
- `testimonials.ts` — testimoni murid/ortu (DUMMY, ganti dengan asli)
- `programs.ts` — program & harga
- `packages.ts` — paket bulanan
- `faqs.ts` — pertanyaan & jawaban
- `value-props.ts` — keunggulan di section "Kenapa Memilih"
- `site-settings.ts` — WA, email, social, area, hero copy

Workflow editing:

1. Edit file di `src/content/`
2. `pnpm dev` lokal untuk verifikasi
3. Commit + push → auto-deploy via Vercel

Di fase 2 (admin panel), konten akan dipindah ke Supabase. Struktur data sudah dibuat mirror DB schema supaya migrasi mudah.

## Lead form

Form di `/kontak` mengirim ke `POST /api/leads`:

1. **Zod validation** server-side (`src/lib/validation.ts`)
2. **Honeypot** field anti-bot
3. **Rate limit** 5/jam per IP
4. **Email notifikasi** via Resend ke `LEAD_NOTIFICATION_EMAIL`
5. Redirect ke `/terima-kasih`

## SEO

- Per-page metadata via `buildMetadata()` di `src/lib/seo.ts`
- JSON-LD: Organization, LocalBusiness, FAQPage, BreadcrumbList
- `sitemap.ts` + `robots.ts` di App Router
- All images via `next/image` (avif/webp)

## Analytics (production only)

Di-load lewat `<AnalyticsScripts />` dengan strategy `afterInteractive` — no impact on LCP.

- Google Analytics 4 (`NEXT_PUBLIC_GA_ID`)
- Meta Pixel (`NEXT_PUBLIC_META_PIXEL_ID`)
- Microsoft Clarity (`NEXT_PUBLIC_CLARITY_ID`) — heatmap & session recording

## Deployment (Vercel)

1. Push ke repo GitHub
2. Connect ke Vercel — auto-detect Next.js
3. Set environment variables di Vercel project settings (lihat `.env.example`)
4. Setup custom domain — DNS records via Vercel
5. Production deploy: push ke `main`. Preview: any branch / PR.

## Claude Code support

`.claude/` berisi:

- **Agents**: `ui-builder`, `seo-auditor`, `performance-optimizer`, `content-writer-id`
- **Skills**: `create-page`, `create-section`, `seo-audit`, `brand-style-check`

Gunakan agents/skills ini untuk konsistensi saat menambah fitur. Lihat `CLAUDE.md` §13 untuk workflow.

## Roadmap

- **Fase 1 (current)**: Static public website, MVP launch
- **Fase 2**: Supabase + custom admin panel (lihat PRD §6.3 dan §6.6)
- **Fase 3**: Tutor detail pages, blog SEO, advanced lead pipeline
- **Fase 4**: Booking self-service, parent dashboard, payment gateway

## Lisensi

Proprietary — © 2026 Teman Tutor. All rights reserved.
