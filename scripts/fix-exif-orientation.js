#!/usr/bin/env node
/**
 * Fix EXIF orientation for all images in /public
 *
 * Reads each image, applies EXIF rotation via sharp, and overwrites the original.
 * This bakes correct orientation into the pixel data so images display
 * right-side-up regardless of browser/Next.js handling.
 *
 * Run: npm run fix-exif-orientation
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "../public");
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

function getAllImageFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllImageFiles(fullPath, files);
    } else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function fixOrientation(filePath) {
  const relPath = path.relative(PUBLIC_DIR, filePath);
  const ext = path.extname(filePath).toLowerCase();

  try {
    const image = sharp(filePath);

    // .rotate() with no args applies EXIF orientation and bakes it into pixel data
    let pipeline = image.rotate();
    let buffer;
    if (ext === ".png") {
      buffer = await pipeline.png().toBuffer();
    } else {
      buffer = await pipeline.jpeg({ quality: 92 }).toBuffer();
    }
    fs.writeFileSync(filePath, buffer);
    console.log(`  ✅ ${relPath}`);
    return { fixed: true };
  } catch (err) {
    console.error(`  ❌ ${relPath}:`, err.message);
    return { error: true };
  }
}

async function main() {
  console.log("\n🔄 Fix EXIF Orientation\n");
  console.log(`  Scanning: ${PUBLIC_DIR}\n`);

  const files = getAllImageFiles(PUBLIC_DIR);
  if (files.length === 0) {
    console.log("  No image files found.\n");
    return;
  }

  let fixed = 0;
  let errors = 0;

  for (const filePath of files) {
    const result = await fixOrientation(filePath);
    if (result.fixed) fixed++;
    else if (result.error) errors++;
  }

  console.log("\n--- Summary ---");
  console.log(`  Processed: ${fixed}`);
  if (errors) console.log(`  Errors:    ${errors}`);
  console.log("");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
