import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const distDir = path.join(root, "dist");
const outFile = path.join(root, "price-sorter-extension.zip");

if (!fs.existsSync(distDir)) {
  console.error("Missing dist/. Run: npm run build");
  process.exit(1);
}

if (fs.existsSync(outFile)) {
  fs.unlinkSync(outFile);
}

try {
  execFileSync("zip", ["-r", outFile, "."], {
    cwd: distDir,
    stdio: "inherit",
  });
} catch {
  console.error(
    "The `zip` command failed. On Windows you may need WSL or create the archive manually from the dist/ folder.",
  );
  process.exit(1);
}

console.log(`Created ${outFile}`);
