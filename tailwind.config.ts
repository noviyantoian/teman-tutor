import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem', xl: '3rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        // Brand tokens — Teman Tutor
        brand: {
          navy: {
            DEFAULT: '#0A1E3D',
            50: '#E8EBF1',
            100: '#C6CDDB',
            200: '#929FBA',
            300: '#5E7199',
            400: '#2F4470',
            500: '#0A1E3D',
            600: '#081832',
            700: '#061227',
            800: '#040D1B',
            900: '#020610',
          },
          yellow: {
            DEFAULT: '#F5C518',
            50: '#FEF9E1',
            100: '#FDF1B8',
            200: '#FCE787',
            300: '#FADC55',
            400: '#F8D034',
            500: '#F5C518',
            600: '#C99C0B',
            700: '#937108',
            800: '#5E4805',
            900: '#2E2302',
          },
        },
        // Semantic tokens (also exposed via CSS vars)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid type scale
        'display-1': ['clamp(2.5rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-2': ['clamp(2rem, 3.5vw + 1rem, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading-1': ['clamp(1.75rem, 2.5vw + 1rem, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'heading-2': ['clamp(1.5rem, 2vw + 0.75rem, 2rem)', { lineHeight: '1.2' }],
        'heading-3': ['clamp(1.25rem, 1.5vw + 0.5rem, 1.5rem)', { lineHeight: '1.3' }],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
        '3xl': 'calc(var(--radius) + 16px)',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(10, 30, 61, 0.08)',
        soft: '0 4px 20px -4px rgba(10, 30, 61, 0.10)',
        'soft-lg': '0 12px 40px -8px rgba(10, 30, 61, 0.14)',
        glow: '0 0 0 6px rgba(245, 197, 24, 0.18)',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.4s ease-out both',
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [animate],
} satisfies Config;

export default config;
