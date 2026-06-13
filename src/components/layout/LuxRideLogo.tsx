interface LuxRideLogoProps {
  size?: "sm" | "md" | "lg";
}

export default function LuxRideLogo({ size = "md" }: LuxRideLogoProps) {
  const emblem  = size === "sm" ? 40 : size === "lg" ? 62 : 50;
  const divH    = size === "sm" ? 38 : size === "lg" ? 56 : 46;
  const gap     = size === "sm" ? 14 : size === "lg" ? 22 : 18;
  const word    = size === "sm" ? "text-lg"   : size === "lg" ? "text-3xl" : "text-2xl";
  const subSize = size === "sm" ? "text-[8px]" : size === "lg" ? "text-[11px]" : "text-[9px]";
  const lineW   = size === "sm" ? 28 : size === "lg" ? 48 : 36;
  const diamond = size === "sm" ? 5  : size === "lg" ? 8  : 6;

  return (
    <div className="flex items-center" style={{ gap: 0 }}>
      {/* LR Diamond emblem */}
      <svg
        width={emblem}
        height={emblem}
        viewBox="0 0 72 72"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <polygon points="36,3 69,36 36,69 3,36" fill="none" stroke="#C9A765" strokeWidth="1.5" />
        <polygon points="36,17 52,36 36,55 20,36" fill="none" stroke="#C9A765" strokeWidth="0.75" opacity="0.4" />
        <text
          x="36" y="43"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="19"
          fontWeight="700"
          fill="#C9A765"
          letterSpacing="1.5"
        >
          LR
        </text>
      </svg>

      {/* Vertical divider */}
      <div style={{ width: 1, height: divH, background: "#C9A765", opacity: 0.25, margin: `0 ${gap}px`, flexShrink: 0 }} />

      {/* Right: LUXRIDE / line+diamond / ELITE */}
      <div className="flex flex-col items-stretch">
        <div
          className={`font-display font-black text-white leading-none ${word}`}
          style={{ letterSpacing: "0.18em", marginBottom: size === "sm" ? 5 : 7 }}
        >
          LUXRIDE
        </div>
        <div className="flex items-center" style={{ gap: 8, marginBottom: size === "sm" ? 5 : 7 }}>
          <div style={{ height: "0.5px", width: lineW, background: "#C9A765", opacity: 0.7 }} />
          <svg width={diamond} height={diamond} viewBox="0 0 7 7" aria-hidden="true">
            <polygon points="3.5,0 7,3.5 3.5,7 0,3.5" fill="#C9A765" />
          </svg>
          <div style={{ height: "0.5px", width: lineW, background: "#C9A765", opacity: 0.7 }} />
        </div>
        <div
          className={`text-gold font-sans font-light leading-none text-center ${subSize}`}
          style={{ letterSpacing: "0.6em", textIndent: "0.6em" }}
        >
          ELITE
        </div>
      </div>
    </div>
  );
}
