# Workspace

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

- `artifacts/phet-sims/` — Main website (React + Vite). Presentation-first. Features embedded PhET simulation iframes organized by category (Physics, Chemistry, Biology). Dark museum-inspired theme with warm amber accents. Full bilingual (EN/ZH) support including simulation iframe URLs (PhET's `_zh_CN.html` variants). Enhanced simulation viewer with split-pane layout: simulation iframe on left, scrollable Learning Guide panel on right with step-by-step educational content and Web Speech API audio narration (text-to-speech in both languages). Locally modified simulations (Neuron, Equality Explorer) are served from `phetsims/` with integrated educational guide overlays built directly into the PhET simulation source code. **Original simulations**: Custom-built interactive experiences using HTML Canvas, not PhET iframes. First: Friction Lab (`/friction-lab`) with **7-step cross-curricular flow**: Story Intro → Prediction Quiz (with images) → Canvas Simulation (3D textured blocks, atom zoom view, sparks, force arrows) → Challenge Quiz (with images) → Language Arts (语文 writing + English vocabulary flashcards + English friction song) → Hands-On Experiment (materials list, checklist steps, record table, curriculum-aligned) → Reflection (learning journey, science journal, self-assessment). Simulations with `customRoute` in `simulations.ts` navigate to their dedicated page. Components in `src/components/friction/`. Cross-curricular framework: science sim (understanding) → 语文 (expression/writing) → English (vocabulary/song) → hands-on (physical verification). Teacher Guide page (`/teacher-guide`) with 4 tabs: curriculum standards alignment (2022 science/语文/English by grade), school visit interview questions (for teachers and students), university volunteer team role definitions (4 roles), and implementation/deployment plans (3 scenarios + 4-phase timeline).
- `phetsims/` — Cloned PhET simulation source code for secondary development. Contains ~27 PhET library repos (scenery, joist, chipper, etc.) plus two modified simulations: `neuron/` and `equality-explorer/`. Each has an `EducationalGuideOverlay` node added to its ScreenView. After modifying source code, run `npx grunt transpile` inside the sim's directory. The Vite dev server serves these files via a custom `phetLocalServer()` plugin at `/phet-local/` prefix.
- `artifacts/api-server/` — Shared Express API server (currently only health check endpoint).
- `lib/` — Shared libraries (api-client-react, api-spec, api-zod, db).

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
