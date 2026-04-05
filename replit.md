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

- `artifacts/phet-sims/` — Main website (React + Vite). Presentation-first, no backend required. Features embedded PhET simulation iframes organized by category (Physics, Chemistry, Biology). Dark museum-inspired theme with warm amber accents. Full bilingual (EN/ZH) support including simulation iframe URLs (PhET's `_zh_CN.html` variants). Enhanced simulation viewer with split-pane layout: simulation iframe on left, scrollable Learning Guide panel on right with step-by-step educational content and Web Speech API audio narration (text-to-speech in both languages).
- `artifacts/api-server/` — Shared Express API server (currently only health check endpoint).
- `lib/` — Shared libraries (api-client-react, api-spec, api-zod, db).

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
