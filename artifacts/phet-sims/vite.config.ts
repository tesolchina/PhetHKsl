import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

function contentApiServer(): Plugin {
  const CONTENT_ROOT = path.resolve(import.meta.dirname, "content", "modules");
  function handler(req: any, res: any, next: any) {
    if (!req.url?.startsWith("/api/content")) return next();
    const urlPath = req.url.replace(/^\/api\/content\/?/, "").split("?")[0];
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (!urlPath || urlPath === "") {
      const dirs = fs.readdirSync(CONTENT_ROOT, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => {
          const modPath = path.join(CONTENT_ROOT, d.name, "module.json");
          try {
            const data = JSON.parse(fs.readFileSync(modPath, "utf-8"));
            return { id: d.name, metadata: data.metadata };
          } catch { return null; }
        })
        .filter(Boolean);
      res.writeHead(200);
      res.end(JSON.stringify(dirs));
      return;
    }

    const moduleId = urlPath.replace(/\/$/, "");
    const modPath = path.join(CONTENT_ROOT, moduleId, "module.json");
    if (!modPath.startsWith(CONTENT_ROOT + path.sep)) {
      res.writeHead(403);
      res.end(JSON.stringify({ error: "Forbidden" }));
      return;
    }
    try {
      const data = fs.readFileSync(modPath, "utf-8");
      res.writeHead(200);
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Module not found" }));
    }
  }
  return {
    name: "content-api-server",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

function phetLocalServer(): Plugin {
  const PHET_ROOT = path.resolve(import.meta.dirname, "..", "..", "phetsims");
  const MIME: Record<string, string> = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".mjs": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".mp3": "audio/mpeg",
    ".wav": "audio/wav",
    ".ogg": "audio/ogg",
  };
  function handler(req: any, res: any, next: any) {
    if (!req.url?.startsWith("/phet-local/")) return next();
    const urlPath = decodeURIComponent(req.url.replace(/^\/phet-local/, "").split("?")[0]);
    const resolved = path.resolve(PHET_ROOT, "." + urlPath);
    if (!resolved.startsWith(PHET_ROOT + path.sep) && resolved !== PHET_ROOT) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    try {
      const stat = fs.statSync(resolved);
      if (!stat.isFile()) { res.writeHead(404); res.end("Not Found"); return; }
      const ext = path.extname(resolved).toLowerCase();
      res.writeHead(200, {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      });
      fs.createReadStream(resolved).pipe(res);
    } catch {
      res.writeHead(404);
      res.end("Not Found");
    }
  }
  return {
    name: "phet-local-server",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    phetLocalServer(),
    contentApiServer(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@content": path.resolve(import.meta.dirname, "content"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
