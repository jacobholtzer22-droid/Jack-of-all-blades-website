const path = require("path");
const { spawn } = require("child_process");

const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public", "videos");
const inputPath = path.join(publicDir, "hero.MOV");
const outputPath = path.join(publicDir, "hero.mp4");

async function main() {
  let ffmpegPath;
  try {
    ffmpegPath = require("ffmpeg-static");
  } catch {
    console.error("Run: npm install ffmpeg-static");
    process.exit(1);
  }

  return new Promise((resolve, reject) => {
    const args = [
      "-i", inputPath,
      "-c:v", "libx264",
      "-an",
      "-movflags", "+faststart",
      "-y",
      outputPath,
    ];
    const proc = spawn(ffmpegPath, args, { stdio: "inherit" });
    proc.on("close", (code) => {
      if (code === 0) {
        console.log("Created public/videos/hero.mp4");
        resolve();
      } else {
        reject(new Error(`ffmpeg exited with code ${code}`));
      }
    });
    proc.on("error", reject);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
