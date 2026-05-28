const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const screenshotsDir = path.join(__dirname, "../public/screenshots");
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

// Create a simple gold-on-black placeholder screenshot
const width = 1280;
const height = 720;

const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#0A0A0A"/>
  <text x="${width/2}" y="${height/2 - 20}" font-family="Georgia,serif" font-size="72" fill="#C9A765"
        text-anchor="middle" font-weight="700">LuxRide Elite</text>
  <text x="${width/2}" y="${height/2 + 40}" font-family="Arial,sans-serif" font-size="28" fill="#F5F0E8"
        text-anchor="middle">Miami&apos;s Premier Luxury Transportation</text>
</svg>`;

sharp(Buffer.from(svg))
  .resize(width, height)
  .png()
  .toFile(path.join(screenshotsDir, "home.png"))
  .then(() => console.log("✅ Screenshot placeholder created"))
  .catch(console.error);
