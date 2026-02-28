#!/usr/bin/env node

/**
 * Generates favicon and app icons from the Jack of All Blades logo.
 * Run: node scripts/generate-favicons.js
 */

const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "public/images/logo-transparent.png");
const OUTPUTS = [
  { path: path.join(ROOT, "public/favicon.ico"), size: 32 },
  { path: path.join(ROOT, "public/icon-192.png"), size: 192 },
  { path: path.join(ROOT, "public/icon-512.png"), size: 512 },
  { path: path.join(ROOT, "public/apple-icon.png"), size: 180 },
];

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`Error: Logo not found at ${SRC}`);
    process.exit(1);
  }

  const image = sharp(SRC);

  for (const { path: outPath, size } of OUTPUTS) {
    try {
      // Browsers accept PNG data in .ico files; sharp outputs PNG
      await image.clone().resize(size, size).png().toFile(outPath);
      console.log(`Created ${path.relative(ROOT, outPath)} (${size}x${size})`);
    } catch (err) {
      console.error(`Failed to create ${outPath}:`, err.message);
      process.exit(1);
    }
  }

  console.log("Done.");
}

main();
