const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public", "videos");
const inputPaths = [
  path.join(publicDir, "Interview.MOV"),
  path.join(publicDir, "Interview.mov"),
];
const outputPath = path.join(publicDir, "Interview.mp4");

async function main() {
  const inputPath = inputPaths.find((p) => fs.existsSync(p));
  if (!inputPath) {
    console.error(
      "No Interview source found. Add Interview.MOV or Interview.mov to public/videos/"
    );
    process.exit(1);
  }

  let ffmpegPath;
  try {
    ffmpegPath = require("ffmpeg-static");
  } catch {
    console.error("Run: npm install ffmpeg-static");
    process.exit(1);
  }

  console.log("Converting Interview video to MP4 (this can take a few minutes)...");
  return new Promise((resolve, reject) => {
    const args = [
      "-i",
      inputPath,
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-c:a",
      "aac",
      "-movflags",
      "+faststart",
      "-y",
      outputPath,
    ];
    const proc = spawn(ffmpegPath, args, { stdio: "inherit" });
    proc.on("close", (code) => {
      if (code === 0) {
        console.log("Created public/videos/Interview.mp4");
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
