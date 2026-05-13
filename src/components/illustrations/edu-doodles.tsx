import { cn } from '@/lib/utils';

export function EduDoodles({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 640 640"
      className={cn('pointer-events-none select-none text-brand-yellow-300', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Open book */}
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.75">
        <path d="M80 200 Q120 180 160 200 L160 310 Q120 290 80 310 Z" />
        <path d="M160 200 Q200 180 240 200 L240 310 Q200 290 160 310 Z" />
        <path d="M160 200 L160 310" />
        <line x1="90" y1="230" x2="150" y2="230" strokeWidth="1.5" />
        <line x1="90" y1="250" x2="150" y2="250" strokeWidth="1.5" />
        <line x1="90" y1="270" x2="140" y2="270" strokeWidth="1.5" />
        <line x1="170" y1="230" x2="230" y2="230" strokeWidth="1.5" />
        <line x1="170" y1="250" x2="230" y2="250" strokeWidth="1.5" />
        <line x1="170" y1="270" x2="220" y2="270" strokeWidth="1.5" />
      </g>

      {/* Pencil */}
      <g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.6"
        transform="rotate(-30 430 120)"
      >
        <rect x="400" y="60" width="20" height="90" rx="2" />
        <polygon points="400,150 420,150 410,175" />
        <rect x="400" y="60" width="20" height="15" rx="2" fill="currentColor" fillOpacity="0.3" />
        <line x1="400" y1="150" x2="420" y2="150" />
      </g>

      {/* Graduation cap */}
      <g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.65"
        transform="translate(450 350)"
      >
        <polygon points="60,0 120,30 60,60 0,30" />
        <line x1="60" y1="60" x2="60" y2="100" />
        <path d="M30 48 L30 80 Q60 95 90 80 L90 48" />
        <circle cx="60" cy="100" r="5" fill="currentColor" />
        <line x1="120" y1="30" x2="120" y2="60" />
        <path d="M120 60 Q130 65 120 75" strokeLinecap="round" />
      </g>

      {/* Star */}
      <g fill="currentColor" opacity="0.7">
        <path d="M320 80 L327 102 L351 102 L332 116 L339 138 L320 124 L301 138 L308 116 L289 102 L313 102 Z" />
      </g>

      {/* Math formulas */}
      <g
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="18"
        fill="currentColor"
        opacity="0.6"
      >
        <text x="50" y="420">{`y = mx + b`}</text>
        <text x="460" y="220">{`π · r²`}</text>
        <text x="340" y="540">{`a² + b² = c²`}</text>
        <text x="55" y="510">{`E = mc²`}</text>
      </g>

      {/* Dotted grid accent */}
      <g fill="currentColor" opacity="0.4">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <circle key={`${row}-${col}`} cx={490 + col * 18} cy={80 + row * 18} r="2" />
          )),
        )}
      </g>

      {/* Sparkle dots */}
      <g fill="currentColor" opacity="0.8">
        <circle cx="280" cy="460" r="3" />
        <circle cx="380" cy="160" r="2.5" />
        <circle cx="130" cy="140" r="2" />
        <circle cx="570" cy="460" r="2.5" />
      </g>

      {/* Cube (math) */}
      <g stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5">
        <path d="M50 540 L90 525 L130 540 L130 580 L90 595 L50 580 Z" />
        <path d="M50 540 L90 555 L130 540" />
        <path d="M90 555 L90 595" />
      </g>
    </svg>
  );
}
