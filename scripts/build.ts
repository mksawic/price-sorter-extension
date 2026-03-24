import esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, "../src");
const publicDir = path.join(__dirname, "../public");
const distDir = path.join(__dirname, "../dist");

async function run() {
  const isWatch = process.argv.includes("--watch");

  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  fs.mkdirSync(distDir);

  const ctx = await esbuild.context({
    entryPoints: [
      path.join(srcDir, "index.ts"),
      path.join(srcDir, "background.ts"),
      path.join(srcDir, "popup.ts"),
    ],
    bundle: true,
    minify: !isWatch,
    outdir: distDir,
    format: "iife",
    target: ["chrome100"],
    platform: "browser",
    splitting: false,
    plugins: [
      {
        name: "watch-plugin",
        setup(build) {
          build.onEnd(async (result) => {
            if (result.errors.length === 0) {
              // Copy public assets
              if (fs.existsSync(publicDir)) {
                fs.cpSync(publicDir, distDir, { recursive: true });
                console.log("📂 Public assets copied to dist/");
              }

              console.log(
                `✅ Build updated at: ${new Date().toLocaleTimeString()}`,
              );
            }
          });
        },
      },
    ],
  });

  if (isWatch) {
    console.log("👀 Watching for changes in src/...");
    await ctx.watch();
  } else {
    console.log("⚡ Building for production...");
    await ctx.rebuild();
    await ctx.dispose();

    console.log("✨ Build finished!");
  }
}

try {
  await run();
} catch (err) {
  console.error("❌ Error:", err);
  process.exit(1);
}
