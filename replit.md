# Workspace

## Hosting handover

The user intends to delete this Replit project and redeploy on Railway. Preserve
application data and redeployment instructions in GitHub; never include secrets.
See `migration/RAILWAY.md` for the handover and deletion gate.
**Why:** deleting Replit before independently verifying the replacement can lose data.
Production database access was unavailable during the handover; the development
export must not be assumed to cover production. Check the guide's deletion checklist.

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies. The project is a showcase website for PhET Interactive Simulations — free, research-based science and math simulations.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS (dark-first museum theme)
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Architecture

- `artifacts/phet-sims/` — Main website (React + Vite). Presentation-first. Dark museum-inspired theme with warm amber accents. Full bilingual (EN/ZH) support. **Modular architecture** (all files <500 lines): Friction Lab components split into `friction/types.ts`, `friction/constants.ts`, `friction/physics.ts`, `friction/renderers.ts`, `friction/FrictionSimCanvas.tsx`. Teacher Guide data in `pages/teacher-guide/data.ts`, page in `pages/teacher-guide.tsx`. Homepage has curriculum filter button showing count of curriculum-aligned sims. **Original simulations**: Friction Lab (`/friction-lab`) with **7-step cross-curricular flow**. Teacher Guide page (`/teacher-guide`) with 4 tabs. **Content Model System** (`content/`): Standardized JSON-based content format enabling open-source contributions. `content/schema.ts` defines TypeScript interfaces (`LearningModule`, step types). `content/modules/friction-lab/module.json` contains the full friction lab content in bilingual JSON. Content API at `/api/content` (list) and `/api/content/:id` (detail) via Vite middleware (`contentApiServer()` plugin). Content Catalog page (`/content`) shows all modules with metadata, step overview, curriculum alignment, and contribution guide. `@content/*` path alias maps to `content/` directory. Connected to DocAI platform (`aitutor.ink`, repo `tesolchina/Doc-Agent-Flow`) for LANG 2077 course — university students create content on DocAI, contribute here via GitHub PRs.
- `phetsims/` — Cloned PhET simulation source code for secondary development. Contains ~27 PhET library repos (scenery, joist, chipper, etc.) plus two modified simulations: `neuron/` and `equality-explorer/`. Each has an `EducationalGuideOverlay` node added to its ScreenView. After modifying source code, run `npx grunt transpile` inside the sim's directory. The Vite dev server serves these files via a custom `phetLocalServer()` plugin at `/phet-local/` prefix.
- `artifacts/api-server/` — Shared Express API server on port 8080 with `/api/simulations` endpoint (filtering by category, gradeLevel, featured). Input validation rejects invalid filter values with 400. Vite dev server in `phet-sims` proxies `/api/simulations` and `/api/healthz` to this server; `/api/content` is handled by Vite's own `contentApiServer()` middleware plugin.
- `scripts/src/` — Seed script split into modules: `seed-data/types.ts` (interfaces), `seed-data/featured-simulations.ts` (14 featured sims with guides), `seed-data/catalog-simulations.ts` (136 catalog sims with curriculum mappings), `seed-simulations.ts` (logic only, ~180 lines).
- `lib/` — Shared libraries (api-client-react, api-spec, api-zod, db). DB schema includes `simulations` table (150 sims: slug, bilingual names/descriptions, category, gradeLevel, tags JSONB, URLs, thumbnail, isFeatured, guide JSONB, curriculumMappings JSONB). Curriculum mappings store standard ID, region (CN/HK), grade, subject, topic, and description per simulation. 53 sims have initial curriculum alignment to 2022 Chinese standards and HK General Studies.

## Community & Documentation

All community contribution docs are consolidated in `contribute/` folder:
- `contribute/README.md` — File index and navigation guide (for contributors and external tools like DocAI)
- `contribute/CONTRIBUTING.md` — Bilingual contribution guide (fork/branch/PR workflow, content types, quality standards, code of conduct)
- `contribute/CONTENT_GUIDE.md` — Bilingual guide documenting the learning module JSON schema, step types, BilingualText format, file organization
- `contribute/PIPELINE.md` — Complete PR pipeline: submission → automated checks → content review (5 dimensions) → merge → deploy → acknowledgment. Quality control at 3 layers (contributor self-check, maintainer review, automated checks). External tool integration guide for DocAI.
- `contribute/CHANGELOG.md` — Update log recording every contribution and major update (reverse chronological)
- `contribute/CONTRIBUTORS.md` — Contributor acknowledgment list with multi-level recognition (name list, module.json authors, git history)
- `contribute/ROADMAP.md` — Near-term milestones for community participation
- `contribute/hk-curriculum-mapping.md` — Hong Kong (P1-S6) + Mainland China curriculum mapping with cross-reference
- `.github/PULL_REQUEST_TEMPLATE.md` — PR template with contributor checklist (stays in .github/ for GitHub recognition)
- `.github/ISSUE_TEMPLATE/` — Issue templates for curriculum mapping, module proposals, content corrections

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `npx tsx scripts/src/seed-simulations.ts` — seed simulations table (fetches PhET API with static catalog fallback)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
