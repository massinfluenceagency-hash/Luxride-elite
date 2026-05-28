const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, "../public/icons");

async function convertAll() {
  for (const size of sizes) {
    const svgPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
    const pngPath = path.join(iconsDir, `icon-${size}x${size}.png`);
    const svgContent = fs.readFileSync(svgPath);
    await sharp(svgContent).resize(size, size).png().toFile(pngPath);
    console.log(`✅ PNG: icon-${size}x${size}.png`);
  }
  console.log("\nAll PNG icons created!");
}

convertAll().catch(console.error);
