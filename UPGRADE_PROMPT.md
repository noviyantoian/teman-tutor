# Upgrade Prompt — Next.js 14 → 16 (+ React 19)

> Copy seluruh isi block "Prompt untuk Claude Code" di bawah ini dan paste ke Claude Code di terminal Anda (`cd teman-tutor-web && claude`).

---

## Prompt untuk Claude Code

````markdown
Tolong upgrade scaffold project ini dari Next.js 14 + React 18 ke **Next.js 16 + React 19**.

## Context
Project ini adalah marketing website Teman Tutor (les privat Bandung & Cimahi). Scaffold awal di-generate dengan Next.js 14 karena keterbatasan knowledge cutoff dari asisten AI sebelumnya. Sekarang perlu di-upgrade ke versi terbaru sebelum mulai development serius.

## Wajib baca dulu
1. `CLAUDE.md` — terutama **Section 2** (Next.js 16 — yang HARUS diperhatikan), Section 5 (React/Next.js conventions), Section 14 (Anti-pattern)
2. `package.json` — versi yang akan diganti
3. `next.config.mjs`, `tsconfig.json`, `.eslintrc.json`

## Tujuan
- Next.js → 16.x (latest stable / LTS)
- React & React DOM → 19.x
- Types React & React DOM → 19.x
- `eslint-config-next` → match major
- `@next/bundle-analyzer` → match major
- Pastikan `next dev`, `next build`, `next start` jalan tanpa error
- `pnpm typecheck` & `pnpm lint` clean
- Tidak ada deprecation warning di console saat dev / build

## Langkah-langkah

### 1. Pre-flight
- Cek Node version: `node -v` — harus ≥ 20.9 (lihat `.nvmrc`)
- Cek `pnpm -v` — harus ≥ 9
- Pastikan working tree clean (`git status`) — kalau ada perubahan uncommitted, commit dulu di branch `chore/pre-upgrade`
- Buat branch baru: `git checkout -b chore/upgrade-next-16`

### 2. Cek versi terbaru
- `npm view next version` — catat versi stable terbaru
- `npm view react version` — catat versi 19.x stable
- `npm view eslint-config-next version`

### 3. Coba codemod official (recommended)
```bash
npx @next/codemod@latest upgrade latest
```
Codemod akan otomatis:
- Update `next`, `react`, `react-dom` di `package.json`
- Convert `params`/`searchParams` ke async di route files
- Convert `cookies()`/`headers()` jadi awaited
- Update `next.config` jika perlu

Kalau codemod gagal / parsial, lanjut manual di langkah 4.

### 4. Manual update (jika perlu)
Edit `package.json` agar:
- `"next": "^16.x.x"` (versi stable terbaru)
- `"react": "^19.x.x"`
- `"react-dom": "^19.x.x"`
- `"@types/react": "^19.x.x"`
- `"@types/react-dom": "^19.x.x"`
- `"eslint-config-next": "^16.x.x"`
- `"@next/bundle-analyzer": "^16.x.x"`

Lalu `pnpm install`.

### 5. Cek dependency kompatibilitas
- **framer-motion** (`^11.x` di package.json): cek di npm apakah versi ini sudah support React 19. Kalau belum, upgrade ke `motion` (rename dari framer-motion v12+) atau ke versi minimum yang kompatibel.
- **@radix-ui/\***: cek setiap package di npm — biasanya sudah support React 19 sejak akhir 2024, tapi verify.
- **resend**: cek major version saat ini.
- Kalau ada peer dependency conflict, gunakan `pnpm install --strict-peer-dependencies=false` SEMENTARA dan investigate root cause.

### 6. Code adjustments

Karena scaffold belum punya dynamic route, **kemungkinan besar tidak ada perubahan code yang diperlukan**. Tapi cek dan konfirmasi:

- `src/app/api/leads/route.ts` — tidak pakai `cookies()`/`headers()` dari `next/headers`, jadi aman
- `src/app/layout.tsx` — `Metadata` & `Viewport` API tetap sama
- Semua `page.tsx` — tidak ada yang pakai `params`/`searchParams`, jadi aman

Hal yang **mungkin** perlu manual fix:
- `next.config.mjs` — opsi `experimental.optimizePackageImports` masih support, tapi cek apakah ada opsi baru yang lebih baik (mis. `turbopack` config block)
- `tsconfig.json` — `moduleResolution: 'bundler'` tetap aman; `target` mungkin perlu naik ke `ES2024` (opsional)
- Kalau ada `middleware.ts` (tidak ada di scaffold ini) — rename ke `proxy.ts`

### 7. Script update (jika perlu)
Di `package.json`, script `dev`/`build` Next 16 sudah pakai Turbopack default. Tidak perlu flag `--turbo`. Tapi:
- Tambah script alternatif: `"dev:webpack": "NEXT_USE_WEBPACK=true next dev"` untuk fallback
- Tambah: `"build:webpack": "NEXT_USE_WEBPACK=true next build"`

### 8. Verifikasi (ACCEPTANCE CRITERIA — wajib lulus semua)
```bash
pnpm install              # ✅ tanpa peer dep error
pnpm typecheck            # ✅ no error
pnpm lint                 # ✅ no error
pnpm build                # ✅ build sukses, no deprecation warning
pnpm dev                  # ✅ home page render di http://localhost:3000
```

Lalu manual check di browser (Chrome devtools console):
- ✅ Tidak ada React warning di console (deprecated API, useEffect warnings, dll)
- ✅ Hot reload bekerja saat edit file
- ✅ Semua route bisa diakses: `/`, `/tentang`, `/program`, `/tutor`, `/testimoni`, `/faq`, `/kontak`, `/terima-kasih`
- ✅ Form di `/kontak` bisa submit (validation jalan)
- ✅ Tombol WhatsApp floating muncul dan bisa di-klik
- ✅ Tidak ada 404 untuk asset (CSS/JS/font)
- ✅ Lighthouse score Performance ≥ 90 di mobile

### 9. Update dokumentasi
- Hapus callout warning di atas `CLAUDE.md` (yang menyebut "Scaffold awal di-generate dengan Next.js 14...") karena upgrade sudah selesai
- Tambah baris di `README.md` Quickstart kalau ada perubahan command
- Tambah baris di `CLAUDE.md` Section 2 untuk note versi spesifik yang dipakai sekarang

### 10. Commit
```bash
git add -A
git commit -m "chore: upgrade to Next.js 16 + React 19"
```
Tulis commit body yang menyebutkan:
- Versi `next`, `react`, `react-dom` yang dipakai sekarang
- Dependency lain yang ikut di-upgrade (framer-motion, radix, dll)
- Manual fix yang dilakukan (jika ada)
- Hasil verifikasi (typecheck, lint, build status)

## Reporting

Setelah selesai, beri saya report singkat:
1. Versi final tiap dep utama
2. Manual fix apa saja yang harus dilakukan (kalau ada)
3. Status acceptance criteria (✅ / ❌ tiap item)
4. Issue / warning yang belum bisa di-resolve (kalau ada)
5. Rekomendasi follow-up (mis. "framer-motion harus diganti ke motion v12 untuk fitur X")

## Tidak boleh
- ❌ Auto-`--legacy-peer-deps` tanpa investigasi (kalau ada conflict, pahami dulu)
- ❌ Disable rule TypeScript / ESLint untuk menutupi error
- ❌ Upgrade ke pre-release / canary kecuali ada alasan kuat — pakai stable
- ❌ Ubah brand styling, layout, atau content di langkah ini — pure dep upgrade only
````

---

## Tips waktu upgrade

1. **Branch terpisah** — selalu di branch `chore/upgrade-next-16`, jangan di `main`.
2. **Test di production build** — `pnpm dev` lebih lenient dari `pnpm build`. Selalu test build sebelum push.
3. **Bookmark upgrade guide official** — [nextjs.org/docs/app/guides/upgrading/version-16](https://nextjs.org/docs/app/guides/upgrading/version-16) untuk reference.
4. **Cek `peerDependencies`** dengan `pnpm why <package>` kalau ada conflict.
5. **Lighthouse before/after** — record score sebelum upgrade, bandingkan setelahnya. Next 16 + Turbopack biasanya lebih cepat.

## Kalau ada masalah

- **Turbopack build error**: fallback ke webpack via env var, file issue, baru lanjut
- **framer-motion incompat**: pakai versi minimum yang support React 19, atau migrate ke `motion` package
- **Type error setelah upgrade types**: codemod biasanya bisa fix; sisanya manual sesuai pesan error
- **Peer dep warning yang tidak bisa hilang**: dokumentasikan di commit message, jangan diabaikan
