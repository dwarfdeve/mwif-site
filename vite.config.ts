import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const projectRoot = import.meta.dirname;
const assetRoot = path.resolve(projectRoot, "mwif-assets");

function contentType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();
  return ({
    ".gif": "image/gif",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".mp3": "audio/mpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
  } as Record<string, string>)[extension] || "application/octet-stream";
}

function vitePluginLocalAssets(): Plugin {
  return {
    name: "mwif-local-assets",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/mwif-assets", (request, response, next) => {
        const requestedPath = decodeURIComponent((request.url || "").replace(/^\//, ""));
        const absolutePath = path.resolve(assetRoot, requestedPath);
        if (!absolutePath.startsWith(`${assetRoot}${path.sep}`) || !fs.existsSync(absolutePath)) {
          next();
          return;
        }
        response.setHeader("Content-Type", contentType(absolutePath));
        response.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        fs.createReadStream(absolutePath).pipe(response);
      });
    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), vitePluginLocalAssets()],
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "client", "src"),
      "@shared": path.resolve(projectRoot, "shared"),
      "@assets": path.resolve(projectRoot, "attached_assets"),
    },
  },
  root: path.resolve(projectRoot, "client"),
  build: {
    outDir: path.resolve(projectRoot, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
  },
});
