#!/usr/bin/env node

/**
 * Generates favicon and app icons from the Jack of All Blades logo.
 * Run: node scripts/generate-favicons.js
 */

const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "public/images/logo-transparent.webp");
const OUTPUTS = [
  { path: path.join(ROOT, "public/favicon.ico"), size: 32, format: "png" },
  { path: path.join(ROOT, "public/icon-192.webp"), size: 192, format: "webp" },
  { path: path.join(ROOT, "public/icon-512.webp"), size: 512, format: "webp" },
  { path: path.join(ROOT, "public/apple-icon.webp"), size: 180, format: "webp" },
];

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`Error: Logo not found at ${SRC}`);
    process.exit(1);
  }

  const image = sharp(SRC);

  for (const { path: outPath, size, format } of OUTPUTS) {
    try {
      const pipeline = image.clone().resize(size, size);
      if (format === "webp") {
        await pipeline.webp({ effort: 6 }).toFile(outPath);
      } else {
        await pipeline.png().toFile(outPath);
      }
      console.log(`Created ${path.relative(ROOT, outPath)} (${size}x${size})`);
    } catch (err) {
      console.error(`Failed to create ${outPath}:`, err.message);
      process.exit(1);
    }
  }

  console.log("Done.");
}

main();
