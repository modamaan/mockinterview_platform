/**
 * Downloads face-api.js model weights to public/models/
 * Run once: node scripts/download-models.mjs
 */
import { createWriteStream, mkdirSync, existsSync } from "fs";
import { get } from "https";
import { join } from "path";

const BASE_URL =
  "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights";

const FILES = [
  "tiny_face_detector_model-shard1",
  "tiny_face_detector_model-weights_manifest.json",
  "face_expression_model-shard1",
  "face_expression_model-weights_manifest.json",
];

const OUT_DIR = join(process.cwd(), "public", "models");

if (!existsSync(OUT_DIR)) {
  mkdirSync(OUT_DIR, { recursive: true });
  console.log("Created public/models/");
}

const download = (filename) =>
  new Promise((resolve, reject) => {
    const url = `${BASE_URL}/${filename}`;
    const dest = join(OUT_DIR, filename);
    console.log(`Downloading ${filename}...`);
    const file = createWriteStream(dest);
    get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${filename}`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`✓ ${filename}`);
        resolve();
      });
    }).on("error", reject);
  });

(async () => {
  for (const f of FILES) {
    await download(f);
  }
  console.log("\n✅ All models downloaded to public/models/");
})();
