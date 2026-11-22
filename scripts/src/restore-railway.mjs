import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import pg from "pg";
import crypto from "node:crypto";

const root = fileURLToPath(new URL("../../", import.meta.url));
const file = process.env.MIGRATION_DATA_FILE
  ? path.resolve(root, process.env.MIGRATION_DATA_FILE)
  : path.join(root, "migration/data/development-simulations.json");
const raw = fs.readFileSync(file);
const rows = JSON.parse(raw);
if (!Array.isArray(rows) || !rows.length) throw new Error("Expected nonempty JSON array.");
if (new Set(rows.map(row => row.id)).size !== rows.length ||
    new Set(rows.map(row => row.slug)).size !== rows.length) throw new Error("Duplicate IDs/slugs.");
const verify = process.argv.includes("--verify");
if (!verify && process.env.CONFIRM_RAILWAY_RESTORE !== "new-empty-database") {
  throw new Error("Set CONFIRM_RAILWAY_RESTORE=new-empty-database after checking the target.");
}
// Never default a real restore to Replit's DATABASE_URL.
const connectionString = verify ? process.env.DATABASE_URL : process.env.RAILWAY_DATABASE_URL;
if (!connectionString) throw new Error("Missing target database variable; see migration/RAILWAY.md.");
const client = new pg.Client({ connectionString });
await client.connect();
try {
  await client.query("BEGIN");
  let schema = fs.readFileSync(path.join(root, "migration/schema.sql"), "utf8");
  const table = verify ? "migration_restore_check" : "public.simulations";
  if (verify) schema = schema.replace("CREATE TABLE public.simulations", "CREATE TEMP TABLE migration_restore_check");
  // CREATE TABLE fails safely if the destination already exists. No overwrite/delete.
  await client.query(schema);
  await client.query(`INSERT INTO ${table} SELECT * FROM json_populate_recordset(NULL::${table}, $1::json)`, [JSON.stringify(rows)]);
  const restored = (await client.query(`SELECT * FROM ${table} ORDER BY id`)).rows;
  const normalize = data => JSON.stringify(data.map(row =>
    Object.fromEntries(Object.entries(row).sort(([a], [b]) => a.localeCompare(b))))
    .sort((a, b) => a.id - b.id));
  if (normalize(restored) !== normalize(rows)) throw new Error("Restored data differs from export.");
  if (!verify) {
    await client.query("SELECT setval(pg_get_serial_sequence('public.simulations','id'), (SELECT max(id) FROM public.simulations), true)");
  }
  await client.query(verify ? "ROLLBACK" : "COMMIT");
  console.log(`${verify ? "Verified (rolled back)" : "Restored"} ${rows.length} complete records.`);
  console.log(`Export SHA256: ${crypto.createHash("sha256").update(raw).digest("hex")}`);
} catch (error) {
  await client.query("ROLLBACK");
  // Do not log connection details.
  console.error("Restore failed:", error.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
