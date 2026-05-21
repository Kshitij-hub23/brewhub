/**
 * Post-build script for Cloudflare Pages deployment.
 * Copies server worker assets into dist/client/ so Pages can serve the SSR app.
 */
import fs   from "fs";
import path from "path";

const serverAssetsDir = "dist/server/assets";
const clientAssetsDir = "dist/client/assets";

// Copy all server-side JS bundles into the client assets folder
const files = fs.readdirSync(serverAssetsDir);
for (const file of files) {
  fs.copyFileSync(
    path.join(serverAssetsDir, file),
    path.join(clientAssetsDir, file),
  );
}

// Place the worker entry as _worker.js at the root of dist/client/
const workerContent = fs.readFileSync("dist/server/index.js", "utf8");
fs.writeFileSync("dist/client/_worker.js", workerContent);

console.log("✓ Cloudflare Pages worker assembled in dist/client/");
