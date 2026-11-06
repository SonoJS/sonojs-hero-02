import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "out");
if (existsSync(outDir)) {
  writeFileSync(join(outDir, ".nojekyll"), "");
  console.log("Wrote out/.nojekyll for GitHub Pages");
}
