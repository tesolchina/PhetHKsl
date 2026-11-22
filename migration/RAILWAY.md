# Replit → Railway handover

## Database preservation complete; verify Railway before deletion

This repository preserves development and production database exports, source code,
educational content, images, and modified PhET sources. After the database was
unpaused, production was queried successfully: its simulations table has **0 rows**.
Use the **150-row development export** to populate Railway.

Audit date: 2026-11-22 (UTC).

- GitHub: https://github.com/tesolchina/PhetHKsl
- Replit's registered public URL: https://phethk.replit.app
- Deployment metadata: autoscale, public, current build not successful.
- HTTP check returned 404, “This app isn't live yet”. This is not a working
  frontend URL, and it will not be a replacement for a Railway domain.
- Production database SELECT now succeeds after unpausing. The earlier access
  blocker is resolved. Production contains zero simulation rows and one internal
  Replit migration-history row.
- No Railway deployment was created by this handover.

## What is preserved

| Item | Repository location |
| --- | --- |
| All 150 accessible development records, including IDs and every column | `migration/data/development-simulations.json` |
| Verified empty production simulations table | `migration/data/production-simulations.json` |
| One internal Replit migration-history record, archival only | `migration/data/production-system-migrations.json` |
| PostgreSQL schema (checked against live columns) | `migration/schema.sql` |
| Empty-database restore and full-record verification | `scripts/src/restore-railway.mjs` |
| Bilingual module content | `artifacts/phet-sims/content/` |
| Frontend and illustrations | `artifacts/phet-sims/src/`, `artifacts/phet-sims/public/`, `attached_assets/` |
| Backend and shared libraries | `artifacts/api-server/`, `lib/` |
| Locally modified PhET simulations and dependency source trees | `phetsims/` |
| Contribution and curriculum documentation | `contribute/`, project Markdown files |
| Reproducible PhET compilation | `scripts/src/build-phet.mjs` |

Export SHA256:
`4f8d37a3509e7d8d00c4b0790483666d8e6272df5100f88184c2fd0f4675e1da`

Development inventory: only `public.simulations` was listed as an application base
table. The export has 150 unique IDs and slugs, with all 20 columns, including
JSON guides and curriculum mappings. The schema and JSON were restored into a
temporary test table, compared field-for-field, then rolled back without changing
application records.

Production inventory: `public.simulations` and
`_system.replit_database_migrations_v1` are the only non-PostgreSQL-system base
tables returned. The simulations schema matches `migration/schema.sql`.
The `_system` record is platform bookkeeping, not application content; retain its
JSON as an archive but do not recreate Replit's internal schema on Railway.
Production export SHA256:
`37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570`.
System-history export SHA256:
`f8bb45c5f975d53af0273e03ccedaef56def33bae20878c1b4dd0c25f3ed68ae`.

No application object-storage integration or server-side file uploads were found.
Browser language preference (`phet-lang`) is local to each browser and is not a
database record. PhET originals, remote thumbnails, web fonts, and other
third-party URLs remain network dependencies; this is not an offline mirror of
external websites. Upstream PhET licenses remain in the source trees.

Dependencies and generated build output are intentionally excluded from Git.
Railway regenerates the frontend, backend, and `phetsims/chipper/dist/js/`.
The visual mockup sandbox is an authoring tool, not required by the live website.

## Production export completed

The unpaused production database was exported using read-only SELECTs. A separate
COUNT query confirmed zero simulation rows. There are no additional production
application records to merge into the development catalog. The earlier failed
connection was not used to infer this result.

If either database receives writes after this export, export it again before
deletion. Do not restore the empty production JSON over the development dataset.

Official export help:
https://docs.replit.com/features/data-and-storage/work-with-your-data

## Railway deployment (one web service + PostgreSQL)

Use Node **24.x**, pnpm **10.26.1** (pinned in root `package.json`).

1. Create a Railway project and add **PostgreSQL**.
2. Add a service from GitHub: `tesolchina/PhetHKsl`, branch `main`.
3. Keep the service **Root Directory at the repository root**, not an artifact
   subfolder: shared packages and PhET sources are required.
4. Use Railpack and set these service settings:
   - Build command: `pnpm install --frozen-lockfile && pnpm build:railway`
   - Start command: `pnpm start:railway`
   - Healthcheck path: `/api/healthz`
   - Healthcheck timeout: 300 seconds
5. Set service variables:
   - `DATABASE_URL`: reference the Railway PostgreSQL service's `DATABASE_URL`
     using Railway's variable picker (commonly `${{Postgres.DATABASE_URL}}`;
     use your actual database service name).
   - `NODE_ENV=production`
   - `BASE_PATH=/`
   - `RAILPACK_NODE_VERSION=24`
   - Railway supplies `PORT`; the API listens on that port.
   - Build must install development dependencies, which include Vite and SWC.
     If install pruning is enabled, disable it for the build.
6. Restore the database once using the instructions below. Do not run the old
   seed script: it replaces catalog data and is not an exact restore.
7. Deploy, then use **Settings → Networking → Generate Domain**. That generated
   HTTPS domain is the new frontend URL. No Railway URL is known yet.

The production command serves the React build, `/api/simulations`,
`/api/healthz`, `/api/content`, `/api/content/:id`, `/phet-local/*`, and client-side
routes from one Express process. No Replit proxy, Vite development server,
special Replit hostname, or separate frontend service is needed.

Railway settings are documented here rather than relying on legacy
`railway.toml` configuration. Consult current Railway docs:
- https://docs.railway.com/guides/monorepo
- https://docs.railway.com/variables
- https://docs.railway.com/builds/build-and-start-commands
- https://docs.railway.com/infrastructure-as-code

## Restore on a new, empty Railway database

Clone this repository on your computer and install Node/pnpm as above:

```sh
git clone https://github.com/tesolchina/PhetHKsl.git
cd PhetHKsl
corepack enable
pnpm install --frozen-lockfile
```

Use a secure environment-variable manager, or a hidden shell prompt, to set
`RAILWAY_DATABASE_URL` to Railway's **public PostgreSQL connection URL** when
running from your computer. Inside Railway use its private connection URL.
Never put connection strings in GitHub, chat, command arguments, or documentation.

```sh
# Bash: reads without echoing and does not store the value in shell history.
read -rsp 'Railway database URL: ' RAILWAY_DATABASE_URL; echo
export RAILWAY_DATABASE_URL
export CONFIRM_RAILWAY_RESTORE=new-empty-database
# Production is empty; preserve the populated development catalog:
export MIGRATION_DATA_FILE=migration/data/development-simulations.json
pnpm restore:railway
unset RAILWAY_DATABASE_URL CONFIRM_RAILWAY_RESTORE MIGRATION_DATA_FILE
```

The production JSON is an archival empty array, not the restore input.
The restore tool intentionally rejects empty arrays. It refuses to
overwrite an existing table, restores in one transaction, verifies every field,
and advances the ID sequence. Failure rolls back. It never defaults a real
restore to Replit's `DATABASE_URL`.

If the table already exists, restore into another new database; do not drop a
database with valuable data. Normal redeployments must NOT rerun the restore.

`SESSION_SECRET` exists in Replit, but current app code does not consume it.
No auth/payment/AI integration is required by current code. Generate new secrets
if adding those later; never copy Replit-managed database credentials to Railway.
Credentials are deliberately not included in this repository.

## Verification and deletion checklist

Completed during handover:
- Pushed the migration package to GitHub and cloned it back into a separate directory.
- Installed dependencies from the frozen lockfile in that fresh clone.
- Built the frontend, backend, and 2,513 PhET modules from that clone successfully.
- Rechecked the cloned export's SHA256 and restored/compared all 150 records in
  a temporary table, then rolled back.
- Confirmed preview HTTP 200 responses for health, simulations, content listing,
  friction module content, neuron HTML, and both local simulation entry modules.
- Confirmed the homepage renders in the preview. Actual Railway deployment and
  interactive simulation behavior on Railway remain to be verified.

- [x] Resolve production-data uncertainty and preserve any additional records.
- [ ] Fresh clone contains the migration export and all source/asset files.
- [ ] `pnpm build:railway` completes.
- [ ] Restore finishes with the expected count and full-record comparison.
- [ ] Railway `/api/healthz` responds successfully.
- [ ] `/api/simulations` returns the expected restored records (150 for development).
- [ ] Home page, curriculum filter, teacher guide, content catalog and friction lab work.
- [ ] Local neuron and equality-explorer simulations load, including their guides.
- [ ] `/api/content/friction-lab` and direct client-side route reloads work.
- [ ] Record Railway domain here and move any custom DNS records.
- [ ] Verify the final GitHub commit from a separate clone/account.
- [ ] Only then delete Replit. Its preview, deployment, and database must no longer
      be relied upon.

Build and restore checks in Replit do not substitute for testing Railway itself.
The production-data blocker is resolved. Railway deployment verification remains.
