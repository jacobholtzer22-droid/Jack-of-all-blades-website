#!/usr/bin/env node
/**
 * Fix EXIF orientation for all images in /public
 *
 * Reads each image into sharp, applies .rotate() with no arguments (auto-orient
 * from EXIF), then overwrites the original file.
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
  const filename = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();

  try {
    const inputBuffer = fs.readFileSync(filePath);
    const image = sharp(inputBuffer);

    const outputFormat = ext === ".png" ? "png" : "jpeg";
    const outputOptions = outputFormat === "jpeg" ? { quality: 92 } : {};
    const outputBuffer = await image
      .rotate()
      .toFormat(outputFormat, outputOptions)
      .toBuffer();

    fs.writeFileSync(filePath, outputBuffer);
    console.log(`  ${filename}`);
    return { fixed: true };
  } catch (err) {
    console.error(`  ❌ ${filename}:`, err.message);
    return { error: true };
  }
}

async function main() {
  console.log("\n🔄 Fix EXIF orientation (sharp .rotate() auto-orient)\n");
  console.log(`  Processing images in: ${PUBLIC_DIR}\n`);

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
