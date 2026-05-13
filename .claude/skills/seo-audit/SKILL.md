---
name: seo-audit
description: Runs a quick SEO audit checklist on the current state of the project. Use before deploying, after major changes, or when user asks "cek SEO". For deep audits, delegate to the seo-auditor agent.
---

# Skill — SEO Audit Checklist

## Quick audit (5 min)

Run these checks. Report any FAIL immediately.

### A. Per-page metadata

For each `src/app/**/page.tsx`:

```bash
# Show all metadata exports
grep -A 8 "export const metadata" src/app/**/page.tsx
```

Verify:
- Every page has `metadata` export (or `generateMetadata` for dynamic)
- All use `buildMetadata()` helper from `@/lib/seo`
- Titles are 50–60 chars
- Descriptions are 150–160 chars

### B. Sitemap & robots

```bash
cat src/app/sitemap.ts
cat src/app/robots.ts
```

- Sitemap includes every public route
- Robots disallows `/api/` and `/terima-kasih`

### C. Heading hierarchy

```bash
# H1 should be in page or first section, only once per page
grep -rn "<h1" src/app/ src/components/sections/hero.tsx
```

- Exactly one `<h1>` per page (lives in hero for home, in page header for inner pages)

### D. JSON-LD coverage

```bash
grep -rn "JsonLd" src/app/
```

Verify:
- `Organization` + `LocalBusiness` in root layout
- `BreadcrumbList` on inner pages
- `FAQPage` on FAQ page

### E. Image alt text

```bash
grep -rn "<img\|<Image" src/components src/app | grep -v "alt="
```

Should return empty (every image has alt).

### F. Internal linking

- Home → Tentang, Program, Tutor, Testimoni, FAQ, Kontak (via header + footer)
- Each inner page → at least 2 other pages (via header + CTA)

### G. Performance hygiene (SEO-adjacent)

- Hero LCP image has `priority` and `fetchPriority="high"`
- No render-blocking third-party scripts
- Fonts loaded via `next/font`

## Deep audit

For comprehensive audit with file:line issue list, spawn the `seo-auditor` agent.

## Tools to run before deploy

```bash
pnpm build                 # ensures no build error
pnpm typecheck             # no TS error
# Then manually:
# 1. https://search.google.com/test/rich-results — paste each page URL
# 2. Lighthouse (Chrome devtools) — SEO ≥ 95
# 3. https://www.opengraph.xyz/ — paste each URL, verify OG image renders
```

## Quick output format

```
SEO Audit — <date>
─────────────────────
✓ All pages have metadata
✓ Sitemap has 9 routes
✗ /tutor — description is 142 chars (target 150–160)
✓ JSON-LD coverage complete
✓ No images missing alt
✗ Hero image missing `priority` attribute

Action items:
1. Lengthen /tutor description to ~150 chars
2. Add `priority` to hero image at hero.tsx:42
```
