#!/usr/bin/env node
/**
 * Image optimization script for jackofallbladeslandscaping.com
 * - Converts PNGs (except logo-transparent.png) to JPEG at 85% quality
 * - Resizes images wider than 1920px to 1920px max width
 * - Recompresses JPG files to 80% quality
 * - Ensures no image exceeds 300KB (iteratively reduces quality if needed)
 * - Outputs optimized versions to public/images/
 * - Deletes original PNG files after conversion
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const IMAGES_DIR = path.join(__dirname, "../public/images");
const MAX_WIDTH = 1920;
const PNG_QUALITY = 85;
const JPG_QUALITY = 80;
const MAX_FILE_SIZE_BYTES = 300 * 1024; // 300KB
const EXCLUDE_FILES = ["logo-transparent.png"];

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath, ext);
  const dir = path.dirname(filePath);

  const stats = fs.statSync(filePath);
  const beforeSize = stats.size;

  if (EXCLUDE_FILES.includes(path.basename(filePath))) {
    console.log(`  ⏭️  Skipped (excluded): ${path.basename(filePath)}`);
    return { skipped: true, beforeSize };
  }

  try {
    let pipeline = sharp(filePath);
    const metadata = await pipeline.metadata();

    const tryOptimize = async (width, q, flatten = false) => {
      let p = sharp(filePath)
        .rotate(); // Apply EXIF orientation so images don't display sideways on mobile
      if (metadata.width > width) {
        p = p.resize(width, null, { withoutEnlargement: true });
      }
      if (flatten) {
        p = p.flatten({ background: { r: 255, g: 255, b: 255 } });
      }
      return p.jpeg({ quality: q, mozjpeg: true }).toBuffer();
    };

    const widthsToTry = [MAX_WIDTH, 1600, 1280, 1024];
    const minQuality = 30;

    if (ext === ".png") {
      const outputPath = path.join(dir, `${basename}.jpg`);
      let buffer;
      let usedWidth = MAX_WIDTH;
      let usedQuality = PNG_QUALITY;

      outer: for (const w of widthsToTry) {
        for (let q = PNG_QUALITY; q >= minQuality; q -= 5) {
          buffer = await tryOptimize(w, q, true);
          if (buffer.length <= MAX_FILE_SIZE_BYTES) {
            usedWidth = w;
            usedQuality = q;
            break outer;
          }
        }
      }
      if (!buffer) buffer = await tryOptimize(1280, minQuality, true);

      fs.writeFileSync(outputPath, buffer);
      fs.unlinkSync(filePath);
      const extra = usedQuality < PNG_QUALITY || usedWidth < MAX_WIDTH ? " (aggressive)" : "";
      console.log(
        `  ✅ ${path.basename(filePath)} → ${basename}.jpg | ${formatBytes(beforeSize)} → ${formatBytes(buffer.length)}${extra}`
      );
      return { beforeSize, afterSize: buffer.length, converted: true };
    }

    if (ext === ".jpg" || ext === ".jpeg") {
      let buffer;
      let usedWidth = MAX_WIDTH;
      let usedQuality = JPG_QUALITY;

      outer: for (const w of widthsToTry) {
        for (let q = JPG_QUALITY; q >= minQuality; q -= 5) {
          buffer = await tryOptimize(w, q);
          if (buffer.length <= MAX_FILE_SIZE_BYTES) {
            usedWidth = w;
            usedQuality = q;
            break outer;
          }
        }
      }
      if (!buffer) buffer = await tryOptimize(1280, minQuality);

      fs.writeFileSync(filePath, buffer);
      const extra = usedQuality < JPG_QUALITY || usedWidth < MAX_WIDTH ? " (aggressive)" : "";
      console.log(
        `  ✅ ${path.basename(filePath)} | ${formatBytes(beforeSize)} → ${formatBytes(buffer.length)}${extra}`
      );
      return { beforeSize, afterSize: buffer.length };
    }

    console.log(`  ⏭️  Skipped (unsupported format): ${path.basename(filePath)}`);
    return { skipped: true, beforeSize };
  } catch (err) {
    console.error(`  ❌ Error processing ${path.basename(filePath)}:`, err.message);
    return { error: true, beforeSize };
  }
}

async function main() {
  console.log("\n🖼️  Image Optimization Script\n");
  console.log(`  Directory: ${IMAGES_DIR}`);
  console.log(`  Max width: ${MAX_WIDTH}px | PNG→JPG: ${PNG_QUALITY}% | JPG: ${JPG_QUALITY}%`);
  console.log(`  Target max size: ${formatBytes(MAX_FILE_SIZE_BYTES)}\n`);

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error("❌ Images directory not found:", IMAGES_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(IMAGES_DIR);
  const imageExtensions = [".png", ".jpg", ".jpeg"];
  const imageFiles = files
    .filter((f) => imageExtensions.includes(path.extname(f).toLowerCase()))
    .map((f) => path.join(IMAGES_DIR, f));

  let totalBefore = 0;
  let totalAfter = 0;

  for (const filePath of imageFiles) {
    const result = await optimizeImage(filePath);
    if (result.skipped) {
      totalBefore += result.beforeSize || 0;
    } else if (!result.error) {
      totalBefore += result.beforeSize || 0;
      totalAfter += result.afterSize || 0;
    }
  }

  console.log("\n--- Summary ---");
  console.log(`  Before: ${formatBytes(totalBefore)}`);
  console.log(`  After:  ${formatBytes(totalAfter)}`);
  console.log(`  Saved:  ${formatBytes(totalBefore - totalAfter)} (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
