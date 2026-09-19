// Stylised illustrated portrait. Set SITE.avatar in lib/data.ts to use a real photo instead.
export default function Avatar() {
  return (
    <svg
      viewBox="0 0 400 500"
      className="h-full w-full"
      role="img"
      aria-label="Illustrated portrait of Huzaif Ferooz wearing a gaming headset"
    >
      <defs>
        <linearGradient id="av-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b1450" />
          <stop offset="0.6" stopColor="#0b0d20" />
          <stop offset="1" stopColor="#053040" />
        </linearGradient>
        <linearGradient id="av-skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4a4f7a" />
          <stop offset="1" stopColor="#1d2038" />
        </linearGradient>
        <linearGradient id="av-hood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1e2140" />
          <stop offset="1" stopColor="#0b0d1c" />
        </linearGradient>
        <linearGradient id="av-neon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8b5cff" />
          <stop offset="1" stopColor="#22e1ff" />
        </linearGradient>
        <radialGradient id="av-glow" cx="0.5" cy="0.38" r="0.6">
          <stop offset="0" stopColor="#8b5cff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#8b5cff" stopOpacity="0" />
        </radialGradient>
        <filter id="av-blur">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <rect width="400" height="500" fill="url(#av-bg)" />
      <rect width="400" height="500" fill="url(#av-glow)" />
      <g stroke="rgba(255,255,255,0.06)">
        {[80, 160, 240, 320].map((x) => (
          <path key={x} d={`M${x} 0V500`} />
        ))}
        {[100, 200, 300, 400].map((y) => (
          <path key={y} d={`M0 ${y}H400`} />
        ))}
      </g>

      {/* hoodie */}
      <path
        d="M30 500 C34 410 96 366 168 356 L232 356 C304 366 366 410 370 500 Z"
        fill="url(#av-hood)"
        stroke="url(#av-neon)"
        strokeWidth="2"
      />
      <path d="M176 372 L172 432 M224 372 L228 432" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round" />
      {/* neck */}
      <path d="M172 320 L172 362 C186 380 214 380 228 362 L228 320 Z" fill="#242844" />
      {/* head */}
      <ellipse cx="200" cy="235" rx="78" ry="94" fill="url(#av-skin)" />
      {/* hair */}
      <path
        d="M122 226 C112 140 170 108 214 112 C268 116 292 168 278 226 C262 190 232 168 196 168 C160 168 134 190 122 226 Z"
        fill="#0c0d1a"
        stroke="rgba(255,255,255,0.12)"
      />
      {/* visor glow + visor */}
      <rect x="132" y="214" width="136" height="34" rx="17" fill="url(#av-neon)" opacity="0.6" filter="url(#av-blur)" />
      <rect x="132" y="214" width="136" height="34" rx="17" fill="url(#av-neon)" opacity="0.92" />
      {/* headset band */}
      <path d="M112 236 C108 128 292 128 288 236" fill="none" stroke="#12142a" strokeWidth="14" strokeLinecap="round" />
      <path d="M112 236 C108 128 292 128 288 236" fill="none" stroke="url(#av-neon)" strokeWidth="3" strokeLinecap="round" />
      <rect x="94" y="212" width="34" height="74" rx="16" fill="#12142a" stroke="url(#av-neon)" strokeWidth="2.5" />
      <rect x="272" y="212" width="34" height="74" rx="16" fill="#12142a" stroke="url(#av-neon)" strokeWidth="2.5" />
      {/* mic boom */}
      <path d="M100 280 C102 322 140 328 170 322" fill="none" stroke="#12142a" strokeWidth="6" strokeLinecap="round" />
      <circle cx="172" cy="322" r="7" fill="#22e1ff" />
      <path d="M182 296 Q200 304 218 296" stroke="rgba(255,255,255,0.25)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
