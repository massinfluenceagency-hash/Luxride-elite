interface LuxRideLogoProps {
  size?: "sm" | "md" | "lg";
}

export default function LuxRideLogo({ size = "md" }: LuxRideLogoProps) {
  const wordmark = size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl";
  const sub = size === "sm" ? "text-[8px]" : size === "lg" ? "text-[11px]" : "text-[10px]";
  const lineW = size === "sm" ? 32 : size === "lg" ? 52 : 42;
  const diamond = size === "sm" ? 6 : size === "lg" ? 9 : 7;

  return (
    <div className="flex flex-col items-center">
      {/* LUXRIDE wordmark */}
      <div
        className={`font-display font-black text-white leading-none ${wordmark}`}
        style={{ letterSpacing: "0.18em" }}
      >
        LUXRIDE
      </div>

      {/* Gold line + diamond divider */}
      <div className="flex items-center gap-2 my-1.5">
        <div style={{ height: "0.5px", width: lineW, background: "#C9A765", opacity: 0.7 }} />
        <svg width={diamond} height={diamond} viewBox="0 0 7 7" aria-hidden="true">
          <polygon points="3.5,0 7,3.5 3.5,7 0,3.5" fill="#C9A765" />
        </svg>
        <div style={{ height: "0.5px", width: lineW, background: "#C9A765", opacity: 0.7 }} />
      </div>

      {/* ELITE subtitle */}
      <div
        className={`text-gold font-sans font-light leading-none ${sub}`}
        style={{ letterSpacing: "0.65em", textIndent: "0.65em" }}
      >
        ELITE
      </div>
    </div>
  );
}
