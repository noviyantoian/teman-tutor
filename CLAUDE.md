# CLAUDE.md — Teman Tutor Web

> Konteks proyek untuk Claude. Selalu baca file ini sebelum mulai mengerjakan task apa pun di repo ini.
> Sumber kebenaran bisnis ada di **`../PRD_Website_Teman_Tutor.docx`** (v1.1+). Jika ada konflik, PRD menang.


---

## 1. Ringkasan Proyek

**Teman Tutor** adalah platform les privat 1-on-1 ke rumah, melayani area Bandung dan Cimahi.
Tagline: *"Teman Belajar, Teman Bertumbuh."*

Repo ini berisi **website marketing publik** (MVP fase 1). Tujuan utama:

1. **Lead generation** — chat WhatsApp + form konsultasi gratis
2. **Kredibilitas brand** — etalase profesional untuk audience iklan & SEO organik
3. **SEO** — ranking untuk keyword "les privat Bandung", "tutor SD/SMP/SMA Bandung", dll

### Scope MVP saat ini (penting)

- ✅ **7 halaman publik**: Home, Tentang, Program & Harga, Tutor, Testimoni, FAQ, Kontak
- ✅ **Halaman pendukung**: `/terima-kasih`, `/privacy-policy`, `/terms`
- ✅ **API route** `/api/leads` untuk submit form (email via Resend)
- ✅ **WhatsApp integration** (floating + CTA + sticky mobile bar)
- ✅ **SEO infrastructure** lengkap (metadata, sitemap, robots, JSON-LD)
- ✅ **Analytics** (GA4 + Meta Pixel + Microsoft Clarity)
- ❌ **Admin panel** — di luar scope MVP fase 1, akan dibangun di fase 2 dengan Supabase
- ❌ **Database** — fase 1 pakai static content (TS files di `src/content/`)

> **Konten dinamis (tutors, testimonials, dll) untuk fase 1 disimpan sebagai static TypeScript files** di `src/content/`. Editing = edit file, commit, redeploy. Tidak ada CMS dulu.
> Migrasi ke Supabase di fase 2 akan straightforward karena struktur data sudah relasional (lihat `src/types/`).

---

## 2. Tech Stack

| Layer            | Choice                                                                  |
| ---------------- | ----------------------------------------------------------------------- |
| Framework        | **Next.js 16** (App Router, RSC default, **Turbopack default**, Server Actions stable) |
| React            | **React 19** (use(), stable Actions, Server Components mature)          |
| Language         | **TypeScript** (strict mode, `noUncheckedIndexedAccess`)                |
| Styling          | **Tailwind CSS** + design tokens via CSS variables                      |
| UI Primitives    | **shadcn/ui** (Radix UI under the hood), copied locally to `src/components/ui` |
| Icons            | **Lucide React**                                                        |
| Animation        | **Framer Motion** (subtle, max 0.4s, respects `prefers-reduced-motion`) |
| Validation       | **Zod** (schemas di `src/lib/validation.ts`)                            |
| Email            | **Resend** (transactional, server-only)                                 |
| Hosting          | **Vercel** (Edge Network, auto image optimization)                      |
| Analytics        | GA4 + Meta Pixel + Microsoft Clarity                                    |
| Package Manager  | **pnpm** (lockfile committed)                                           |
| Node             | **20.9+ wajib** (lihat `.nvmrc`) — Node 18 sudah tidak didukung Next 16 |

### Next.js 16 — yang HARUS diperhatikan

> **Versi aktif**: Next.js **16.2.6** + React **19.2.0** + framer-motion **12.9.4** (upgraded 2026-05-13). ESLint menggunakan flat config (`eslint.config.mjs`) karena `next lint` dihapus di Next 16.

Next.js 16 punya beberapa breaking change vs versi 14/15. Aturan-aturan ini wajib diikuti:

#### 1. Async request APIs (WAJIB await)

`params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` semua return `Promise`. **Synchronous access dihapus total.**

```tsx
// ❌ SALAH (akan error di Next 16)
export default function Page({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>;
}

// ✅ BENAR
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <div>{slug}</div>;
}

// generateMetadata juga:
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // ...
}

// cookies / headers di Server Component / Route Handler:
import { cookies, headers } from 'next/headers';
const cookieStore = await cookies();
const headersList = await headers();
```

Aturan untuk codebase ini: kalau menambah route dinamis (`[slug]`, `[id]`, dll), **selalu** tipekan `params: Promise<…>` dan await.

#### 2. Middleware = Proxy (Node runtime only)

File `middleware.ts` sekarang dinamai **`proxy.ts`** dan hanya jalan di Node runtime. Edge runtime dihapus. Saat ini kita belum punya middleware — kalau nanti perlu (rate limit global, auth gate, dll), pakai `proxy.ts`.

#### 3. Turbopack default

`next dev` dan `next build` pakai Turbopack default. Tidak perlu flag `--turbo`. Webpack masih bisa di-fallback via env var `NEXT_USE_WEBPACK=true` kalau ada bug.

#### 4. revalidateTag butuh cacheLife profile

```tsx
// ❌ SALAH
revalidateTag('tutors');

// ✅ BENAR
revalidateTag('tutors', 'days'); // atau 'hours' | 'weeks' | 'max'
```

#### 5. React 19 features yang boleh dipakai

- `use(promise)` di Server / Client Component untuk unwrap promise inline
- Server Actions sudah stable — pakai untuk form submission alternatif ke API route
- `useFormStatus()`, `useOptimistic()` untuk UX form yang lebih halus
- `<form action={serverAction}>` native support

### Future stack (fase 2)

Supabase (Postgres + Auth + Storage + Realtime) akan ditambahkan untuk admin panel. Saat ini **belum dipakai** — jangan import `@supabase/*` di kode MVP.

---

## 3. Struktur Folder

```
teman-tutor-web/
├── CLAUDE.md                  ← file ini
├── README.md
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── .env.example
├── .claude/
│   ├── agents/                ← custom agents untuk Claude
│   └── skills/                ← custom skills untuk Claude
├── public/
│   ├── images/{tutors,testimonials,illustrations}/
│   └── icons/
└── src/
    ├── app/                   ← Next.js App Router (routes)
    │   ├── layout.tsx         ← root layout (fonts, analytics, providers)
    │   ├── page.tsx           ← Home
    │   ├── globals.css        ← Tailwind base + design tokens
    │   ├── sitemap.ts
    │   ├── robots.ts
    │   ├── tentang/page.tsx
    │   ├── program/page.tsx
    │   ├── tutor/page.tsx
    │   ├── testimoni/page.tsx
    │   ├── faq/page.tsx
    │   ├── kontak/page.tsx
    │   ├── terima-kasih/page.tsx
    │   ├── privacy-policy/page.tsx
    │   ├── terms/page.tsx
    │   └── api/leads/route.ts ← form submission handler
    ├── components/
    │   ├── ui/                ← shadcn primitives (button, input, accordion, ...)
    │   ├── layout/            ← header, footer, mobile-cta-bar
    │   ├── sections/          ← Hero, ValueProps, HowItWorks, dst.
    │   ├── common/            ← whatsapp-float, lead-form, analytics-loader
    │   └── illustrations/     ← SVG geometric math illustrations
    ├── content/               ← static data (replace dengan DB fase 2)
    │   ├── site-settings.ts
    │   ├── value-props.ts
    │   ├── programs.ts
    │   ├── packages.ts
    │   ├── tutors.ts
    │   ├── testimonials.ts
    │   └── faqs.ts
    ├── lib/
    │   ├── utils.ts           ← cn() helper, formatters
    │   ├── seo.ts             ← buildMetadata(), JSON-LD generators
    │   ├── wa.ts              ← WhatsApp link builder
    │   ├── analytics.ts       ← GA4 + Meta Pixel event helpers
    │   ├── validation.ts      ← Zod schemas
    │   └── rate-limit.ts      ← in-memory token bucket
    ├── types/
    │   └── index.ts           ← shared types (mirror future DB schema)
    └── styles/
        └── tokens.css         ← optional extra design tokens
```

### Aturan struktur

- **Konvensi nama file**: `kebab-case.tsx` untuk komponen, default export untuk page/layout, named export untuk komponen biasa.
- **Konvensi nama komponen**: `PascalCase`. Satu komponen utama per file (helper kecil boleh inline).
- **Path alias**: gunakan `@/` (= `src/`). Jangan pakai relative import lebih dari 2 level (`../../`).
- **Server vs Client**: default **Server Component**. Tambahkan `'use client'` HANYA kalau perlu state/event/efek (form, accordion, animasi yang trigger di scroll, dll).
- **Co-location**: tipe yang hanya dipakai 1 komponen taruh di file komponen. Tipe shared masuk ke `src/types/`.

---

## 4. Brand & Design System

### Warna (token wajib pakai dari Tailwind config)

| Token                     | Hex       | Pakai untuk                                  |
| ------------------------- | --------- | -------------------------------------------- |
| `brand-navy` (DEFAULT 500)| `#0A1E3D` | bg hero gelap, heading, body dark            |
| `brand-navy-50…900`       |           | skala untuk hover/border/bg muted            |
| `brand-yellow` (500)      | `#F5C518` | CTA primer, highlight, badge, accent         |
| `brand-yellow-50…900`     |           | skala                                        |

Jangan hardcode hex di komponen. Selalu pakai class Tailwind seperti `bg-brand-navy`, `text-brand-yellow-500`.

### Typography

- **Display / Heading**: Plus Jakarta Sans (variable, di-load via `next/font/google`)
- **Body**: Inter (variable)
- Fluid type scale sudah didefinisikan di `tailwind.config.ts` (`text-display-1`, `text-heading-1`, dll). **Gunakan token ini**, bukan size manual.

### Border radius

| Token   | Pakai untuk            |
| ------- | ---------------------- |
| `rounded-sm` | tag/badge        |
| `rounded-md` | button/input     |
| `rounded-lg` | card             |
| `rounded-2xl` | hero blocks    |

### Shadow

`shadow-soft-sm`, `shadow-soft`, `shadow-soft-lg`. **Jangan pakai shadow hitam pekat.**

### Spacing & layout

- Container max **1280px** via `tailwind.config.ts` (`container`)
- Section padding: **`py-16 md:py-24 lg:py-28`**
- Grid gap: **`gap-6 md:gap-8`**
- Hindari arbitrary value `[12.5px]` — pakai skala Tailwind kecuali ada justifikasi kuat

### Visual language

- **Hero**: heading besar (`text-display-1`), highlight 1–2 kata pakai `text-brand-yellow-500`, ilustrasi geometris matematika (kubus, segitiga, lingkaran, rumus) menempel di sekitar — pakai SVG di `src/components/illustrations/`.
- **Cards**: white bg, border tipis `border-brand-navy-50`, `rounded-lg`, `shadow-soft-sm`, hover lift (`hover:-translate-y-0.5 hover:shadow-soft transition`).
- **Buttons**: primary = navy bg + white text, accent = yellow bg + navy text, ghost = transparent + navy text. Min height **44px** untuk touch target.
- **Motion**: fade-up saat scroll-into-view, durasi ≤ 0.4s, easing `ease-out`. Hormati `prefers-reduced-motion`.

---

## 5. Konvensi Kode

### TypeScript

- **Strict mode** aktif. Jangan disable `noUncheckedIndexedAccess` atau `noUnusedLocals`.
- Hindari `any`. Pakai `unknown` lalu narrow.
- Type, bukan interface, kecuali extends.
- Discriminated unions untuk variant.
- Export type pakai `export type`. Import type pakai `import type`.

### React / Next.js

- **RSC by default**. Tandai client component hanya saat perlu (state/effect/event/browser API).
- **Async request APIs**: SELALU `await` `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()`. Tipe `params: Promise<{…}>` (lihat Section 2 di atas).
- **React 19 features**: boleh pakai `use(promise)`, `useOptimistic()`, `useFormStatus()`, dan Server Actions stable. Pakai dengan bijak — jangan kompleksifikasi MVP.
- **Co-locate data**: page mengambil data dari `src/content/*` (build-time), bukan dari komponen anak.
- **Avoid `useEffect` untuk fetching**. Pakai async RSC. Untuk caching, pakai `unstable_cache` atau React `cache()`.
- **Image**: SELALU `next/image` dengan `alt` yang deskriptif, `width`+`height` atau `fill`+`sizes`, format `avif`/`webp`.
- **Link**: `next/link` untuk navigasi internal. Untuk external → tag `<a>` dengan `rel="noopener noreferrer"` jika `target="_blank"`.
- **Metadata**: setiap page WAJIB export `metadata` (atau `generateMetadata`). Pakai helper `buildMetadata()` di `src/lib/seo.ts`. Untuk dynamic route, `generateMetadata` juga wajib async dengan `params: Promise<…>`.
- **Forms**: pertimbangkan Server Actions sebagai alternatif `/api/leads` jika butuh progressive enhancement (form works tanpa JS).

### Styling

- Tailwind utility-first. Hindari custom CSS kecuali untuk token global di `globals.css`.
- Pakai `cn()` helper (dari `src/lib/utils.ts`) untuk conditional class.
- Tidak ada inline style `style={{...}}` kecuali untuk dynamic value yang mustahil di-Tailwind (mis. gradient angle dinamis).

### Imports order (di-enforce eslint)

1. Node built-in
2. External packages
3. Internal `@/...`
4. Parent `../`
5. Sibling `./`
6. Types

### Komentar

- Bahasa **Inggris** untuk komentar kode. Bahasa **Indonesia** untuk konten user-facing.
- Jangan beri komentar yang menjelaskan "apa" — biarkan kode bicara. Beri komentar untuk "kenapa" (kalau non-obvious).

---

## 6. Security

### Wajib

- **Tidak ada secret di repo**. Semua via env var. `NEXT_PUBLIC_*` hanya untuk yang aman diekspos (analytics ID, WA number).
- **Form `/api/leads`**:
  - Zod validation di server (jangan percaya client)
  - **Honeypot field** (`website` field tersembunyi, di-reject jika terisi)
  - **Rate limit**: max 5 submit per jam per IP (in-memory bucket di `src/lib/rate-limit.ts`)
  - Sanitasi input sebelum email (escape HTML)
  - Tidak ada PII di log production
- **Security headers** sudah di-set di `next.config.mjs`: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy.
- **CSP**: belum strict — fase 1 cukup default Next.js. Fase 2 setup CSP via middleware kalau perlu.
- **Dependency**: lock pinned, jalankan `pnpm audit` di CI. Jangan tambah package yang tidak perlu.

### Larangan

- Jangan `dangerouslySetInnerHTML` kecuali untuk JSON-LD (yang sudah di-sanitize via JSON.stringify).
- Jangan log nomor WA / email user di production.
- Jangan expose `RESEND_API_KEY` ke client (TIDAK pakai prefix `NEXT_PUBLIC_`).

---

## 7. Performance

### Targets

- **Lighthouse Mobile ≥ 90** (Performance, SEO, Accessibility, Best Practices)
- **LCP < 2.5s** | **INP < 200ms** | **CLS < 0.1**
- **JS first-load < 200KB** gzip per route
- Hero image LCP candidate harus `priority` dan `fetchPriority="high"`

### Aturan

- **Image**: format `avif`/`webp`, set `sizes` proper, lazy-load by default. Hero image pakai `priority` + `fetchPriority="high"`.
- **Fonts**: `next/font` (sudah self-hosted, no CLS, no FOIT). Hanya load weight yang dipakai.
- **Code splitting**: dynamic import untuk komponen berat yang di-below-the-fold (mis. testimonials carousel, framer-motion features kompleks).
- **Avoid client JS**: Server Component default. Animasi yang bisa CSS-only → CSS-only.
- **Third-party scripts**: pakai `next/script` dengan `strategy="afterInteractive"` atau `lazyOnload`. GA4 & Meta Pixel ditunda.
- **Hindari large libraries**: jangan import seluruh `lodash` — pakai per-function atau native JS.
- **Turbopack**: default di Next 16 untuk `next dev` & `next build`. Build harusnya 2–5× lebih cepat dari webpack. Kalau ada bug build, fallback: `NEXT_USE_WEBPACK=true pnpm build`.
- **Bundle analyzer**: jalankan `pnpm analyze` sebelum merge fitur besar.

---

## 8. SEO

### Setiap page wajib

- `metadata` export (title 50–60 char, description 150–160 char, keywords opsional, canonical URL, OG image)
- Heading hierarchy benar: 1 `<h1>` per page, `<h2>` untuk section utama, dst.
- Alt text untuk semua image
- Internal linking ke page terkait (mis. /program → /tutor)

### Infrastruktur

- `src/app/sitemap.ts` — auto-generate dari list routes
- `src/app/robots.ts` — allow all, link ke sitemap
- **JSON-LD schemas** (di `src/lib/seo.ts`):
  - `Organization` (root layout)
  - `LocalBusiness` (kontak, area)
  - `EducationalOrganization` (homepage, halaman program)
  - `FAQPage` (halaman FAQ)
  - `BreadcrumbList` (semua page kecuali home)
- **Open Graph + Twitter Card** image 1200×630px per page (generate via `opengraph-image.tsx` per route saat dibutuhkan)
- **URL slug**: bahasa Indonesia, lowercase, dash-separated (`tentang`, `program`, bukan `about`, `programs`)

### Target keyword utama (fase 1)

- "les privat Bandung", "les privat ke rumah Bandung"
- "les privat Cimahi"
- "tutor SD/SMP/SMA Bandung"
- "les matematika Bandung", "les bahasa Inggris Bandung"
- "les IELTS Bandung", "les piano Bandung"

---

## 9. Aksesibilitas (WCAG 2.1 AA)

- Color contrast ≥ 4.5:1 untuk body text, ≥ 3:1 untuk large text & UI components
- Semantic HTML: `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>` proper
- Heading hierarchy logis (tidak skip level)
- Form: semua input punya `<label>` (visible atau `aria-label`)
- Keyboard navigable: focus state visible (jangan disable outline tanpa ganti)
- Touch target min 44×44px di mobile
- `prefers-reduced-motion` di-respect untuk animasi
- `lang="id"` di `<html>`

---

## 10. Commands

```bash
pnpm install            # install deps (pakai pnpm, bukan npm/yarn)
pnpm dev                # dev server (localhost:3000)
pnpm build              # production build
pnpm start              # production server (setelah build)
pnpm lint               # ESLint check
pnpm lint:fix           # auto-fix
pnpm typecheck          # tsc --noEmit
pnpm format             # prettier write
pnpm format:check       # prettier check (CI)
pnpm analyze            # build dengan bundle analyzer
pnpm ci                 # typecheck + lint + format:check (run before push)
```

**Sebelum commit / PR**: jalankan `pnpm ci`. Tidak boleh ada error.

---

## 11. Environment Variables

Lihat `.env.example`. Variable wajib di production:

| Variable                            | Public? | Wajib | Catatan                                |
| ----------------------------------- | ------- | ----- | -------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`              | ✅      | ✅    | URL canonical, tanpa trailing slash    |
| `NEXT_PUBLIC_SITE_NAME`             | ✅      | ✅    |                                        |
| `NEXT_PUBLIC_WA_NUMBER`             | ✅      | ✅    | Format `628xxxxxxxxxx`                 |
| `NEXT_PUBLIC_WA_DEFAULT_MESSAGE`    | ✅      | ⬜    | Default pesan WA                       |
| `RESEND_API_KEY`                    | ❌      | ✅    | Server-only                            |
| `LEAD_NOTIFICATION_EMAIL`           | ❌      | ✅    | Email penerima notifikasi              |
| `LEAD_FROM_EMAIL`                   | ❌      | ✅    | "Teman Tutor <noreply@temantutor.id>"  |
| `NEXT_PUBLIC_GA_ID`                 | ✅      | ⬜    | Production only                        |
| `NEXT_PUBLIC_META_PIXEL_ID`         | ✅      | ⬜    | Production only                        |
| `NEXT_PUBLIC_CLARITY_ID`            | ✅      | ⬜    | Production only                        |
| `APP_SECRET`                        | ❌      | ✅    | 32-byte base64 random                  |

---

## 12. Konten (Static Files)

Konten dinamis (tutors, testimonials, programs, FAQ) disimpan sebagai TypeScript files di `src/content/`. **Struktur datanya MIRROR future database schema** supaya migrasi ke Supabase fase 2 mudah.

Aturan editing konten:

1. Edit file di `src/content/`
2. Tipe wajib match `src/types/index.ts`
3. Field `isActive: false` → tidak ditampilkan di publik
4. `sortOrder` ascending → urutan tampil di UI
5. Untuk gambar: simpan di `public/images/{tutors|testimonials}/`, referensi via path `/images/...`

---

## 13. Workflow & Best Practices untuk Claude

Saat user minta perubahan / fitur baru:

1. **Baca PRD dulu** jika konteks bisnis belum jelas
2. **Cek struktur folder** — apakah sudah ada komponen/util serupa
3. **Pakai skill yang relevan** (lihat `.claude/skills/`) — jangan reinvent
4. **Pakai agent yang relevan** (lihat `.claude/agents/`) untuk review kualitas
5. **Sebelum commit**: jalankan `pnpm typecheck && pnpm lint`
6. **Update CLAUDE.md** kalau ada konvensi baru yang ditetapkan

### Saat menambah page baru

→ Pakai skill **`create-page`** untuk template lengkap (metadata, layout, RSC default, breadcrumb)

### Saat menambah section component

→ Pakai skill **`create-section`** untuk konsistensi struktur (heading, padding, animasi)

### Saat update copy / komponen

→ Cek skill **`brand-style-check`** sebelum submit

### Saat siap deploy

→ Pakai skill **`seo-audit`** + jalankan Lighthouse

---

## 14. Tidak Boleh / Anti-pattern

- ❌ **Akses `params` / `searchParams` / `cookies()` / `headers()` tanpa await** — akan error di Next 16. Selalu `Promise<…>` + `await`.
- ❌ **Bikin file `middleware.ts`** — di Next 16 file ini namanya `proxy.ts` dan Node runtime only.
- ❌ `localStorage` / `sessionStorage` di komponen yang juga RSC-compatible — wrap di client component
- ❌ Import client component dari Server Component tanpa boundary
- ❌ Hardcode warna / spacing — selalu via token Tailwind
- ❌ Bikin komponen wrapper tipis tanpa value (mis. `<MyDiv>` yang cuma `<div>`)
- ❌ Tambah dependency baru tanpa diskusi (cek dulu apakah ada di stack)
- ❌ Disable rule eslint/typescript dengan komentar tanpa alasan
- ❌ Copy-paste kode panjang antar komponen — refactor jadi util / komponen reusable
- ❌ Pakai `<img>` tag native — selalu `next/image`
- ❌ `console.log` di production code — pakai `console.warn`/`error` untuk yang penting
- ❌ Pakai `revalidateTag(tag)` tanpa argumen kedua (`cacheLife` profile) — wajib di Next 16

---

## 15. Roadmap

- **Fase 1 (sekarang)**: Public website MVP, static content, WA + form CTA
- **Fase 2**: Migrasi konten ke Supabase + admin panel custom (lihat PRD Section 6.6)
- **Fase 3**: Halaman detail tutor, blog SEO, advanced lead pipeline
- **Fase 4**: Booking self-service, dashboard ortu, payment gateway

---

## 16. Pertanyaan? Referensi?

- **PRD**: `../PRD_Website_Teman_Tutor.docx`
- **Brand asset**: logo SVG/PNG ada di `public/icons/` (drop dulu, akan replace dengan final)
- **Design reference**: Erulite-style (navy + yellow + geometric math)

Jika ada keraguan struktural, ikuti PRD. Jika ada keraguan implementasi teknis, ikuti dokumen ini (CLAUDE.md). Jika dua-duanya ambigu, **tanya user** sebelum memutuskan.
