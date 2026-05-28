/**
 * Generates LuxRide Elite PWA icons programmatically using Canvas API (node-canvas)
 * Falls back to creating SVG placeholder icons if canvas isn't available.
 */
const fs = require("fs");
const path = require("path");

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const outDir = path.join(__dirname, "../public/icons");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Generate SVG-based icons (works without canvas)
function generateSVGIcon(size) {
  const fontSize = Math.round(size * 0.35);
  const logoSize = Math.round(size * 0.55);
  const padding = Math.round(size * 0.1);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#D4AF37;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#C9A765;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#B8952A;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A0A0A;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1A1A1A;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.18)}" fill="url(#bgGrad)"/>

  <!-- Gold border -->
  <rect x="${Math.round(size * 0.04)}" y="${Math.round(size * 0.04)}"
        width="${Math.round(size * 0.92)}" height="${Math.round(size * 0.92)}"
        rx="${Math.round(size * 0.15)}"
        fill="none" stroke="url(#goldGrad)" stroke-width="${Math.round(size * 0.025)}"/>

  <!-- Car silhouette icon -->
  <g transform="translate(${padding}, ${Math.round(size * 0.28)})">
    <!-- Car body -->
    <rect x="${Math.round(logoSize * 0.05)}" y="${Math.round(logoSize * 0.3)}"
          width="${Math.round(logoSize * 0.9)}" height="${Math.round(logoSize * 0.35)}"
          rx="${Math.round(logoSize * 0.06)}" fill="url(#goldGrad)"/>
    <!-- Car roof -->
    <path d="M${Math.round(logoSize * 0.2)} ${Math.round(logoSize * 0.3)}
             L${Math.round(logoSize * 0.3)} ${Math.round(logoSize * 0.1)}
             L${Math.round(logoSize * 0.7)} ${Math.round(logoSize * 0.1)}
             L${Math.round(logoSize * 0.8)} ${Math.round(logoSize * 0.3)} Z"
          fill="url(#goldGrad)"/>
    <!-- Wheels -->
    <circle cx="${Math.round(logoSize * 0.25)}" cy="${Math.round(logoSize * 0.68)}"
            r="${Math.round(logoSize * 0.1)}" fill="#0A0A0A" stroke="url(#goldGrad)"
            stroke-width="${Math.round(logoSize * 0.03)}"/>
    <circle cx="${Math.round(logoSize * 0.75)}" cy="${Math.round(logoSize * 0.68)}"
            r="${Math.round(logoSize * 0.1)}" fill="#0A0A0A" stroke="url(#goldGrad)"
            stroke-width="${Math.round(logoSize * 0.03)}"/>
  </g>

  <!-- LR text -->
  <text x="${Math.round(size / 2)}" y="${Math.round(size * 0.92)}"
        font-family="Georgia, serif" font-size="${Math.round(size * 0.09)}"
        font-weight="700" fill="url(#goldGrad)"
        text-anchor="middle" letter-spacing="${Math.round(size * 0.02)}">LUXRIDE</text>
</svg>`;
}

// Write SVG icons (we'll note these as PNG equivalents for the manifest)
sizes.forEach((size) => {
  const svgContent = generateSVGIcon(size);
  // Save as SVG first
  fs.writeFileSync(path.join(outDir, `icon-${size}x${size}.svg`), svgContent);
  console.log(`Generated SVG: icon-${size}x${size}.svg`);
});

// Also save a favicon.svg
fs.writeFileSync(path.join(__dirname, "../public/favicon.svg"), generateSVGIcon(32));

console.log("\n✅ All icons generated as SVG in /public/icons/");
console.log("Note: For production PNG icons, use a tool like sharp or an online converter.");
