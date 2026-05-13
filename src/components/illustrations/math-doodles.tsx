import { cn } from '@/lib/utils';

/**
 * Decorative SVG geometric math doodles for hero/sections.
 * Use absolutely positioned. Always wrap with `aria-hidden`.
 */
export function MathDoodles({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 600"
      className={cn('pointer-events-none select-none text-brand-yellow-300', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cube */}
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="M70 110 L140 90 L210 110 L210 180 L140 200 L70 180 Z" />
        <path d="M70 110 L140 130 L210 110" />
        <path d="M140 130 L140 200" />
      </g>

      {/* Triangle */}
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.7">
        <path d="M440 60 L540 120 L420 160 Z" />
      </g>

      {/* Circle + dot */}
      <g stroke="currentColor" strokeWidth="2" fill="none" opacity="0.55">
        <circle cx="500" cy="290" r="38" />
        <circle cx="500" cy="290" r="4" fill="currentColor" />
      </g>

      {/* Equation lines */}
      <g
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="20"
        fill="currentColor"
        opacity="0.7"
      >
        <text x="50" y="320">{`y = mx + b`}</text>
        <text x="60" y="450">{`π · r²`}</text>
        <text x="380" y="500">{`a² + b² = c²`}</text>
      </g>

      {/* Sparkles */}
      <g fill="currentColor" opacity="0.8">
        <circle cx="280" cy="250" r="3" />
        <circle cx="350" cy="380" r="2" />
        <circle cx="120" cy="500" r="2.5" />
      </g>
    </svg>
  );
}
