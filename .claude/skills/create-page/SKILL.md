---
name: create-page
description: Scaffolds a new public page route for Teman Tutor with proper metadata, breadcrumb JSON-LD, hero section, and CTA. Use when user asks to "buat halaman baru", "add a page", or "scaffold /<slug>". Ensures consistency with existing pages.
---

# Skill — Create a New Public Page

## When to use

User requests a new public route (e.g. `/blog`, `/area/bandung`, `/program/sd-bandung`).
NOT for admin / API routes — those have their own conventions (and admin is out of scope for fase 1).

## Pre-flight

Ask user (or infer):
1. **Slug** — Indonesian, kebab-case (e.g. `area-bandung`)
2. **Page title** — for `<title>` and H1
3. **Description** — for meta + intro paragraph (150–160 chars target)
4. **Target keyword** — for SEO
5. Does this page need to be in **sitemap** & **navigation menu**?
6. Does this need **breadcrumb**?

## Template

Create `src/app/<slug>/page.tsx`:

```tsx
import { JsonLd } from '@/components/common/json-ld';
import { CtaSection } from '@/components/sections/cta-section';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: '<Page title that includes brand>',
  description: '<150–160 char description with target keyword>',
  path: '/<slug>',
  keywords: ['<target keyword>', '<related keyword>'],
});

export default function <PascalName>Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Beranda', path: '/' },
          { name: '<Page label>', path: '/<slug>' },
        ])}
      />

      <section className="section bg-gradient-to-b from-brand-navy-50/60 to-white">
        <div className="container max-w-3xl text-center">
          <span className="eyebrow"><Eyebrow></span>
          <h1 className="balanced mt-4 font-display text-display-2 font-bold text-brand-navy">
            <Heading with <span className="text-brand-yellow-500">accent</span>>
          </h1>
          <p className="mt-5 text-lg text-brand-navy-600">
            <Intro paragraph>
          </p>
        </div>
      </section>

      {/* Add body sections here */}

      <CtaSection />
    </>
  );
}
```

## Post-create checklist

- [ ] Add route to `src/app/sitemap.ts` with appropriate priority (0.6–0.9)
- [ ] If part of main nav, add to `NAV_LINKS` in `src/components/layout/header.tsx`
- [ ] If part of footer, add to relevant `NAV_GROUPS` in `src/components/layout/footer.tsx`
- [ ] Run `pnpm typecheck` + `pnpm lint`
- [ ] Test responsive (mobile, tablet, desktop)
- [ ] Verify metadata in browser devtools (`<head>`)
- [ ] Verify Lighthouse score still ≥ 90

## Common pitfalls

- Forgetting to add to sitemap → page invisible to crawlers
- Description < 120 or > 170 chars → Google truncates
- Missing breadcrumb JSON-LD → no rich result in SERP
- Forgetting `scroll-mt-24` on anchor target sections
