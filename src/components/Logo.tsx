// Approximation of the client's logo mark. Replace with the supplied
// logo file (public/logo.svg or .png) when received.
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="lm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#c4c9d1" />
          <stop offset="1" stopColor="#7d848f" />
        </linearGradient>
      </defs>
      <g stroke="url(#lm)" strokeWidth="6" strokeLinecap="butt">
        <path d="M30 24 Q50 12 70 24" />
        <path d="M76 30 Q88 50 76 70" />
        <path d="M70 76 Q50 88 30 76" />
        <path d="M24 70 Q12 50 24 30" />
        <path d="M36 34 Q50 26 64 34" opacity="0.7" />
        <path d="M66 36 Q74 50 66 64" opacity="0.7" />
        <path d="M64 66 Q50 74 36 66" opacity="0.7" />
        <path d="M34 64 Q26 50 34 36" opacity="0.7" />
      </g>
      <path d="M50 42 L53 47 L58 50 L53 53 L50 58 L47 53 L42 50 L47 47 Z" fill="url(#lm)" />
    </svg>
  );
}

export default function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={`text-[15px] font-light tracking-[0.42em] ${
            light ? "text-white" : "text-charcoal"
          }`}
        >
          KHALYVEN
        </span>
        <span
          className={`mt-1.5 text-[8px] font-light tracking-[0.5em] ${
            light ? "text-silver" : "text-steel"
          }`}
        >
          INTERNATIONAL
        </span>
      </span>
    </span>
  );
}
