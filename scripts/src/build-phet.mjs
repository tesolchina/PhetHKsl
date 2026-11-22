import { transformFileSync } from "@swc/core";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const source = path.join(root, "phetsims");
const output = path.join(source, "chipper/dist/js");
let count = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (/\.(ts|js)$/.test(file) && !file.endsWith(".d.ts")) {
      const target = path.join(output, path.relative(source, file).replace(/\.ts$/, ".js"));
      const compiled = transformFileSync(file, {
        swcrc: false,
        jsc: {
          parser: { syntax: "typescript" },
          target: "es2016", loose: true, keepClassNames: true,
        },
        sourceMaps: false,
      });
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, compiled.code);
      count++;
    }
  }
}
for (const repo of fs.readdirSync(source, { withFileTypes: true })) {
  if (!repo.isDirectory() || repo.name.startsWith(".")) continue;
  const dirs = ["js", "images", "mipmaps", "sounds", "strings"];
  if (repo.name === "sherpa") dirs.push("lib");
  if (repo.name === "brand") dirs.push("phet", "phet-io", "adapted-from-phet");
  for (const subdir of dirs) {
    const dir = path.join(source, repo.name, subdir);
    if (fs.existsSync(dir)) walk(dir);
  }
}
console.log(`Compiled ${count} PhET modules from repository sources.`);
