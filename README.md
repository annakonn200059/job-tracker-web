# Job Tracker Web
 
Turborepo monorepo with the two Next.js frontends for the job search tracker.
 
Part of four repositories — **`job-tracker-web`**, `job-tracker-api`,
`job-tracker-worker`, `job-tracker-infra`.
 
> **Current state:** landing page built; the application UI is minimal — enough
> to create a vacancy and list vacancies end to end.
 
## Layout
 
```
apps/
├── landing/    marketing page          → :3001
└── web/        the application         → :3000
packages/
├── ui/                shared components (shadcn/ui, Tailwind)
├── eslint-config/
└── typescript-config/
```
 
## Stack
 
Next.js (App Router) · TypeScript · Tailwind · shadcn/ui · Turborepo
 
## Quick start
 
```bash
npm ci
cp apps/web/.env.example apps/web/.env
npm run dev
```
 
The API must be running — see `job-tracker-infra`:
 
```bash
cd ../job-tracker-infra && make up-db
cd ../job-tracker-api && make run
```
 
## Configuration
 
| Variable | Description |
|---|---|
| `API_URL` | base URL of the Go API, server-side only |
| `AUTH_SECRET` | NextAuth session secret |
 
**No `NEXT_PUBLIC_*` variables.** Anything with that prefix is inlined into the
JavaScript bundle at build time, which would mean a separate image per
environment. Browser calls go to relative `/api/*` paths and are proxied to the
API through a rewrite in `next.config.mjs`, so the backend URL never leaves the
server.
 
## Container images
 
Built from the **monorepo root**, since the Dockerfiles copy `packages/`:
 
```bash
make image-web
make image-landing
make sizes
```
 
Tagged with the short git SHA, plus `-dirty` when built from uncommitted changes.
 
Each Dockerfile is three stages: dependencies (cached until a `package.json`
changes), Turborepo build, then a runtime stage holding only the Next.js
standalone output. Runs as non-root, UID 1001.
 
Two things that are easy to get wrong:
 
- **`outputFileTracingRoot`** must point at the monorepo root, or standalone
  output misses files from `packages/*` and the container fails at runtime.
- **Build-only packages are stripped in the builder stage, not the runner.**
  Deleting files in a later layer only adds whiteout markers — the bytes stay in
  the layer below and the image doesn't shrink.
## Development
 
```bash
npm run dev      # all apps
npm run build
npm run lint
```