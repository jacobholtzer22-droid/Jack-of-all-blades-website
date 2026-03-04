#!/usr/bin/env node
/**
 * Rotate the 2nd and 3rd About page gallery images 90° counter-clockwise
 * and strip EXIF so orientation is baked in. Fixes sideways display.
 *
 * Run: node scripts/rotate-about-images.js
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const IMAGES_DIR = path.join(__dirname, "../public/images");
const FILES = ["walkway-front-house.webp", "mike-paver-patio.webp"];
const ROTATE_DEGREES = -90; // counter-clockwise

async function rotateImage(filename) {
  const filePath = path.join(IMAGES_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`  ❌ Not found: ${filename}`);
    return { error: true };
  }

  try {
    const inputBuffer = fs.readFileSync(filePath);
    const outputBuffer = await sharp(inputBuffer)
      .rotate(ROTATE_DEGREES)
      .webp({ quality: 75 })
      .toBuffer();

    fs.writeFileSync(filePath, outputBuffer);
    console.log(`  ✓ ${filename}`);
    return { ok: true };
  } catch (err) {
    console.error(`  ❌ ${filename}:`, err.message);
    return { error: true };
  }
}

async function main() {
  console.log("\n🔄 Rotating About gallery images 90° counter-clockwise\n");

  let ok = 0;
  let errors = 0;
  for (const filename of FILES) {
    const result = await rotateImage(filename);
    if (result.ok) ok++;
    else if (result.error) errors++;
  }

  console.log("\n--- Summary ---");
  console.log(`  Processed: ${ok}`);
  if (errors) console.log(`  Errors:    ${errors}`);
  console.log("");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
