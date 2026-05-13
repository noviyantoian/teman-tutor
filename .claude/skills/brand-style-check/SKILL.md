---
name: brand-style-check
description: Scans changed files for brand-style violations — hardcoded colors, wrong fonts, missing brand classes, raw HTML elements that should be UI primitives. Use after writing a component or before committing.
---

# Skill — Brand Style Check

## Purpose

Catch brand-style drift before it ships. Teman Tutor's identity is precise — navy + yellow, geometric, professional. Any "off-brand" pixel adds up.

## Run this checklist

### 1. No hardcoded colors

```bash
# Should return empty (or only inside math-doodles.tsx where text-current is used)
grep -rn "#[0-9a-fA-F]\{3,6\}" src/components src/app/**/page.tsx --exclude="*.css"
```

Allowed exceptions:
- WhatsApp green `#25D366` (only in WhatsApp components)
- CSS variables in `globals.css`

### 2. No arbitrary Tailwind values for known tokens

```bash
# Common offenders
grep -rn "\[#\|\[10px\|\[12px\|\[14px\|\[16px\|\[18px\|\[20px\|\[24px" src/components src/app
```

If you find `text-[16px]` → use `text-base`. `bg-[#0A1E3D]` → use `bg-brand-navy`.

### 3. Brand colors only

Verify these classes are NOT used (deprecated / wrong):
- `bg-blue-*` (use `bg-brand-navy-*`)
- `bg-yellow-*` (use `bg-brand-yellow-*`)
- `text-gray-*` (use `text-brand-navy-400` or `text-muted-foreground`)

```bash
grep -rn "bg-blue-\|bg-yellow-\|text-gray-" src/components src/app
```

### 4. Typography uses display tokens

Headings should use `font-display` + a `text-display-*` or `text-heading-*` token.

```bash
grep -rn "<h1\|<h2\|<h3" src/components src/app | grep -v "font-display\|sr-only"
```

(Inspect manually — sometimes acceptable for very tight UI like card title.)

### 5. UI primitives reused

```bash
# Native button — should usually be <Button>
grep -rn "<button " src/components/sections src/components/layout src/app
```

Exceptions: hamburger menu toggle, chip toggles inside forms. Otherwise use the `Button` component.

### 6. Decorative imagery

```bash
# SVGs / decorative <Image> should have aria-hidden
grep -rn "<svg\|MathDoodles" src/components src/app | grep -v "aria-hidden"
```

### 7. Mobile touch targets

Inspect interactive elements — `Button` already enforces min height. For custom anchors / chips:
```bash
grep -rn "rounded-full px-2 py-1\|h-8\|h-9" src/components/common src/components/layout
```

Anything `h-9` or smaller used as a primary action on mobile is a fail.

### 8. Animation guardrails

```bash
# Long animations should be avoided
grep -rn "duration-\[1000\|duration-700\|duration-1000" src/
```

Brand motion: 200–400ms max for delight; 600ms+ feels heavy.

## Output

```
Brand Style Check — <date>
──────────────────────────
✓ No hardcoded hex
✓ No arbitrary pixel values
✗ src/components/sections/foo.tsx:14 — using `bg-blue-500`, replace with `bg-brand-navy`
✓ Typography tokens OK
✗ src/components/sections/foo.tsx:42 — native <button>, swap to <Button>

Severity:
- BLOCKER: hardcoded colors, wrong palette
- WARN: arbitrary pixel values, missing primitive
- INFO: minor inconsistency
```
