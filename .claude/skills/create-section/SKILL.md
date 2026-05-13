---
name: create-section
description: Scaffolds a new section component for Teman Tutor with proper brand styling, RSC default, semantic HTML, and animation pattern. Use when user asks to "add a section", "buat section <name>", or "tambah blok <X>".
---

# Skill — Create a Section Component

## When to use

User requests a new section component (e.g. "blog preview section", "stats showcase", "testimonial highlight"). Sections live in `src/components/sections/` and are composed by page files.

## Pre-flight

Confirm:
1. **Name** (PascalCase): `BlogPreviewSection`
2. **Where** will it be used? (Home, /program, /tutor, etc.)
3. **Data source**: from `src/content/` or hardcoded?
4. **Background**: white / muted (`bg-brand-navy-50/40`) / dark navy?
5. **Has CTA** button to another page?

## Template (RSC by default)

`src/components/sections/<kebab-name>.tsx`:

```tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function <PascalName>Section() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow"><Eyebrow></span>
          <h2 className="mt-4 font-display text-heading-1 font-bold text-brand-navy">
            <Heading with <span className="text-brand-yellow-500">accent</span>>
          </h2>
          <p className="mt-3 text-base text-brand-navy-400 md:text-lg">
            <Subhead, optional>
          </p>
        </div>

        {/* Section body — grid / list / etc. */}
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {/* items */}
        </ul>

        {/* Optional CTA */}
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/<target>">
              <CTA label> <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
```

## Variations

### Dark hero-style section (navy bg)
```tsx
<section className="relative overflow-hidden bg-brand-navy py-20 text-white md:py-24">
  {/* Optional <MathDoodles className="absolute …" /> */}
  <div className="container relative">
    {/* white-text content */}
  </div>
</section>
```

### Alternating muted background (for vertical rhythm)
```tsx
<section className="section bg-brand-navy-50/40">
```

## Content patterns

| Type            | Layout                                                              |
| --------------- | ------------------------------------------------------------------- |
| Feature grid    | `grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`           |
| Step / timeline | `grid gap-6 md:grid-cols-4` + dotted connector                      |
| Testimonial    | `grid gap-5 md:grid-cols-2 lg:grid-cols-3` (carousel for >6 items)  |
| Stats          | `grid gap-6 md:grid-cols-3 lg:grid-cols-4` centered numbers         |

## Self-review

- [ ] Semantic `<section>` wrapper
- [ ] Single `<h2>` (only home page has `<h1>` per page)
- [ ] Padding via `.section` or `py-16 md:py-24 lg:py-28`
- [ ] Card hover lift: `hover:-translate-y-0.5 hover:shadow-soft transition-all`
- [ ] Mobile-first responsive
- [ ] No `'use client'` unless absolutely required
- [ ] Decorative SVG has `aria-hidden`
- [ ] Touch targets ≥ 44px

## Integration

After creating, import in the relevant page:
```tsx
import { <PascalName>Section } from '@/components/sections/<kebab-name>';

// in JSX:
<<PascalName>Section />
```

If you used new content, add it to the relevant file under `src/content/` and update `src/types/index.ts` if a new shape was introduced.
