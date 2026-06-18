export function AppLogoIcon({ size = 40 }: { size?: number }) {
  const r = Math.round(size * 0.26);
  return (
    <div
      style={{ width: size, height: size, borderRadius: r, flexShrink: 0 }}
      className="bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-md"
    >
      <svg width={size * 0.74} height={size * 0.74} viewBox="0 0 36 36" fill="none">
        {/* Left page */}
        <path
          d="M4 10C4 8 6.5 7.2 17.2 8.2L17.2 28C7.5 28 4 27 4 25Z"
          fill="white"
        />
        {/* Right page */}
        <path
          d="M32 10C32 8 29.5 7.2 18.8 8.2L18.8 28C28.5 28 32 27 32 25Z"
          fill="white"
          fillOpacity="0.82"
        />
        {/* Spine shadow */}
        <path
          d="M17.2 8.2C17.2 8.2 18 7.8 18.8 8.2L18.8 28L17.2 28Z"
          fill="rgba(194,65,12,0.18)"
        />
        {/* Text lines — left page */}
        <line x1="7" y1="13.5" x2="15" y2="13" stroke="#c2410c" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.35"/>
        <line x1="7" y1="17"   x2="15" y2="16.5" stroke="#c2410c" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.35"/>
        <line x1="7" y1="20.5" x2="15" y2="20"   stroke="#c2410c" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.35"/>
        {/* Text lines — right page */}
        <line x1="21" y1="13.5" x2="29" y2="13" stroke="#c2410c" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.28"/>
        <line x1="21" y1="17"   x2="29" y2="16.5" stroke="#c2410c" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.28"/>
        <line x1="21" y1="20.5" x2="29" y2="20"   stroke="#c2410c" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.28"/>
        {/* Sparkle top-right corner */}
        <path
          d="M27 5L27.6 6.8L29.4 6L28 7.4L29 9L27 8.2L25 9L26 7.4L24.6 6L26.4 6.8Z"
          fill="white"
          fillOpacity="0.9"
        />
      </svg>
    </div>
  );
}
