#!/usr/bin/env node
/**
 * Image optimization script - converts all PNG/JPG to WebP
 * - Resizes images wider than 1920px to 1920px max width
 * - Converts PNG and JPG to WebP format
 * - Ensures no image exceeds 200KB (iteratively reduces quality if needed)
 * - Preserves transparency for PNG images (logo, etc.)
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const MAX_WIDTH = 1920;
const MAX_FILE_SIZE_BYTES = 200 * 1024; // 200KB
const INITIAL_QUALITY = 85;
const MIN_QUALITY = 25;

// Directories to process
const DIRS_TO_PROCESS = [
  path.join(ROOT, "public/images"),
  path.join(ROOT, "public"),
];

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getImageFiles() {
  const files = [];
  const seen = new Set();

  for (const dir of DIRS_TO_PROCESS) {
    if (!fs.existsSync(dir)) continue;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory() && dir.includes("public/images")) continue;
      const ext = path.extname(item.name).toLowerCase();
      if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
        const fullPath = path.join(dir, item.name);
        if (seen.has(fullPath)) continue;
        seen.add(fullPath);
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function convertToWebp(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`  ⏭️  Skipped (not found): ${path.basename(filePath)}`);
    return { success: false };
  }

  const ext = path.extname(filePath).toLowerCase();
  const dir = path.dirname(filePath);
  const basename = path.basename(filePath, ext);
  const outputPath = path.join(dir, `${basename}.webp`);

  const stats = fs.statSync(filePath);
  const beforeSize = stats.size;

  try {
    let pipeline = sharp(filePath).rotate();
    const metadata = await pipeline.metadata();
    const hasAlpha = metadata.hasAlpha || ext === ".png";

    const widthsToTry = [MAX_WIDTH, 1600, 1280, 1024, 800];

    for (const width of widthsToTry) {
      for (let q = INITIAL_QUALITY; q >= MIN_QUALITY; q -= 5) {
        let p = sharp(filePath)
          .rotate()
          .resize(width, null, { withoutEnlargement: true });

        const webpOptions = hasAlpha
          ? { quality: q, alphaQuality: q, effort: 6 }
          : { quality: q, effort: 6 };

        const buffer = await p.webp(webpOptions).toBuffer();

        if (buffer.length <= MAX_FILE_SIZE_BYTES) {
          fs.writeFileSync(outputPath, buffer);

          if (outputPath !== filePath) {
            fs.unlinkSync(filePath);
          }

          const extra =
            q < INITIAL_QUALITY || (metadata.width > width && metadata.width > MAX_WIDTH)
              ? " (aggressive)"
              : "";
          console.log(
            `  ✅ ${path.basename(filePath)} → ${basename}.webp | ${formatBytes(beforeSize)} → ${formatBytes(buffer.length)}${extra}`
          );
          return { success: true, outputPath, beforeSize, afterSize: buffer.length };
        }
      }
    }

    const width = Math.min(metadata.width || MAX_WIDTH, 800);
    const p = sharp(filePath)
      .rotate()
      .resize(width, null, { withoutEnlargement: true });
    const webpOptions = hasAlpha
      ? { quality: MIN_QUALITY, alphaQuality: MIN_QUALITY, effort: 6 }
      : { quality: MIN_QUALITY, effort: 6 };
    const buffer = await p.webp(webpOptions).toBuffer();
    fs.writeFileSync(outputPath, buffer);
    if (outputPath !== filePath) fs.unlinkSync(filePath);
    console.log(
      `  ✅ ${path.basename(filePath)} → ${basename}.webp | ${formatBytes(beforeSize)} → ${formatBytes(buffer.length)} (min)`
    );
    return { success: true, outputPath, beforeSize, afterSize: buffer.length };
  } catch (err) {
    console.error(`  ❌ ${path.basename(filePath)}:`, err.message);
    return { success: false, beforeSize };
  }
}

async function main() {
  console.log("\n🖼️  Convert to WebP - Resize & Optimize\n");
  console.log(`  Max width: ${MAX_WIDTH}px | Max size: ${formatBytes(MAX_FILE_SIZE_BYTES)}\n`);

  const files = getImageFiles();
  let totalBefore = 0;
  let totalAfter = 0;

  for (const filePath of files) {
    const result = await convertToWebp(filePath);
    if (result.success && result.beforeSize != null) {
      totalBefore += result.beforeSize;
      totalAfter += result.afterSize;
    }
  }

  console.log("\n--- Summary ---");
  console.log(`  Processed: ${files.length} images`);
  console.log(`  Before: ${formatBytes(totalBefore)}`);
  console.log(`  After:  ${formatBytes(totalAfter)}`);
  if (totalBefore > 0) {
    console.log(
      `  Saved:  ${formatBytes(totalBefore - totalAfter)} (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)\n`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
