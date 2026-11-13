/**
 * Decorative Thai landscape (sunset sky, Wat Arun-style prang, palms, river).
 * Pure SVG — no assets to load. `palette` lets each region tint the scene.
 */
export interface ScenePalette {
  skyTop: string;
  skyBottom: string;
  far: string;
  temple: string;
  ground: string;
  water: string;
}

export const SCENE_PALETTES: Record<string, ScenePalette> = {
  Central: { skyTop: "#ffcf8a", skyBottom: "#ffe9c7", far: "#f5b07a", temple: "#b45309", ground: "#86c66b", water: "#38bdb0" },
  North: { skyTop: "#c4b5fd", skyBottom: "#fde4f2", far: "#a78bfa", temple: "#6d28d9", ground: "#6fb36a", water: "#60a5fa" },
  Northeast: { skyTop: "#fdba74", skyBottom: "#fef3c7", far: "#f59e0b", temple: "#b91c1c", ground: "#b5c95a", water: "#2dd4bf" },
  South: { skyTop: "#7dd3fc", skyBottom: "#e0f7ff", far: "#38bdf8", temple: "#0369a1", ground: "#fcd99a", water: "#06b6d4" },
};

export function ThaiScene({ palette = SCENE_PALETTES.Central, className }: { palette?: ScenePalette; className?: string }) {
  const p = palette;
  return (
    <svg viewBox="0 0 800 260" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.skyTop} />
          <stop offset="1" stopColor={p.skyBottom} />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.water} />
          <stop offset="1" stopColor={p.water} stopOpacity="0.75" />
        </linearGradient>
      </defs>

      <rect width="800" height="260" fill="url(#sky)" />

      {/* Sun */}
      <circle cx="640" cy="78" r="46" fill="#fff6cc" opacity="0.9" />
      <circle cx="640" cy="78" r="64" fill="#fff6cc" opacity="0.25" />

      {/* Drifting clouds */}
      <g className="animate-drift" style={{ animationDuration: "55s" }}>
        <g fill="#fff" opacity="0.9">
          <ellipse cx="60" cy="60" rx="44" ry="14" />
          <ellipse cx="88" cy="50" rx="26" ry="14" />
          <ellipse cx="300" cy="36" rx="34" ry="10" />
          <ellipse cx="320" cy="29" rx="18" ry="10" />
        </g>
      </g>
      <g className="animate-drift" style={{ animationDuration: "80s", animationDelay: "-30s" }}>
        <g fill="#fff" opacity="0.7">
          <ellipse cx="120" cy="96" rx="30" ry="9" />
          <ellipse cx="140" cy="89" rx="16" ry="9" />
        </g>
      </g>

      {/* Far hills */}
      <path d="M0 175 C 90 130, 160 150, 240 140 S 400 110, 470 135 S 640 120, 800 150 L800 260 L0 260 Z" fill={p.far} opacity="0.55" />

      {/* Temple: central prang with two side prangs */}
      <g fill={p.temple}>
        {/* side prang left */}
        <path d="M300 200 L300 170 L306 170 L309 150 L313 150 L316 128 L319 150 L323 150 L326 170 L332 170 L332 200 Z" opacity="0.85" />
        {/* side prang right */}
        <path d="M470 200 L470 170 L476 170 L479 150 L483 150 L486 128 L489 150 L493 150 L496 170 L502 170 L502 200 Z" opacity="0.85" />
        {/* main prang */}
        <path d="M352 205 L352 175 L362 175 L362 158 L370 158 L372 138 L380 138 L382 116 L388 116 L390 94 L396 94 L400 46 L404 94 L410 94 L412 116 L418 116 L420 138 L428 138 L430 158 L438 158 L438 175 L448 175 L448 205 Z" />
        <rect x="396" y="168" width="8" height="14" rx="4" fill="#fff" opacity="0.35" />
        {/* base platform */}
        <rect x="280" y="198" width="240" height="10" rx="3" />
      </g>

      {/* Palms */}
      {[{ x: 150, s: 1 }, { x: 620, s: 0.85 }, { x: 700, s: 1.1 }].map(({ x, s }, i) => (
        <g key={i} transform={`translate(${x} 212) scale(${s})`}>
          <path d="M0 0 C 4 -30, 2 -60, 10 -88" stroke="#7c4a1e" strokeWidth="7" fill="none" strokeLinecap="round" />
          <g fill="#2f9e44">
            <path d="M10 -88 C -15 -100, -35 -92, -45 -78 C -25 -88, -5 -88, 10 -86 Z" />
            <path d="M10 -88 C 35 -102, 55 -92, 62 -76 C 42 -88, 25 -88, 10 -86 Z" />
            <path d="M10 -88 C 0 -112, 18 -124, 30 -122 C 18 -114, 12 -102, 12 -88 Z" />
            <path d="M10 -88 C -8 -80, -20 -60, -18 -48 C -10 -64, 0 -78, 10 -86 Z" />
            <path d="M10 -88 C 30 -80, 40 -62, 40 -50 C 30 -66, 20 -78, 10 -86 Z" />
          </g>
        </g>
      ))}

      {/* Ground + river */}
      <path d="M0 210 C 160 200, 300 214, 420 206 S 680 198, 800 208 L800 260 L0 260 Z" fill={p.ground} />
      <path d="M0 232 C 150 222, 300 238, 450 228 S 700 222, 800 230 L800 260 L0 260 Z" fill="url(#water)" />
      <g stroke="#fff" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round">
        <path d="M60 245 h26" /><path d="M210 240 h20" /><path d="M380 248 h30" /><path d="M560 242 h22" /><path d="M720 247 h18" />
      </g>

      {/* Long-tail boat */}
      <g transform="translate(520 236)">
        <path d="M-34 0 Q 0 10 34 -2 L 30 -6 Q 0 2 -30 -4 Z" fill="#7c2d12" />
        <path d="M-30 -4 L -40 -14" stroke="#7c2d12" strokeWidth="3" strokeLinecap="round" />
        <circle cx="4" cy="-8" r="3" fill="#fbbf24" />
      </g>
    </svg>
  );
}
