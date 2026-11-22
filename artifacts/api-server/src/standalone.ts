import express, { type Express } from "express";
import fs from "node:fs";
import path from "node:path";

// Railway starts from the API package; no Replit proxy or Vite server is needed.
export function installStandalone(app: Express) {
  const root = path.resolve(process.cwd(), "../..");
  const web = path.join(root, "artifacts/phet-sims/dist/public");
  const content = path.join(root, "artifacts/phet-sims/content/modules");
  if (!fs.existsSync(path.join(web, "index.html"))) {
    throw new Error("Frontend build missing. Run pnpm build:railway first.");
  }
  app.get("/api/content", (_req, res) => {
    const modules = fs.readdirSync(content, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => {
        const module = JSON.parse(fs.readFileSync(path.join(content, entry.name, "module.json"), "utf8"));
        return { id: entry.name, metadata: module.metadata };
      });
    res.json(modules);
  });
  app.get("/api/content/:id", (req, res) => {
    const id = req.params.id;
    if (!/^[a-z0-9-]+$/.test(id)) {
      res.status(400).json({ error: "Invalid module ID" });
      return;
    }
    const file = path.join(content, id, "module.json");
    if (!fs.existsSync(file)) {
      res.status(404).json({ error: "Module not found" });
      return;
    }
    res.sendFile(file);
  });
  app.use("/api", (_req, res) => { res.status(404).json({ error: "Not found" }); });
  app.use("/phet-local", express.static(path.join(root, "phetsims"), {
    dotfiles: "deny", index: false,
  }));
  app.use("/phet-local", (_req, res) => { res.sendStatus(404); });
  app.use(express.static(web));
  app.get("/{*path}", (_req, res) => { res.sendFile(path.join(web, "index.html")); });
}
