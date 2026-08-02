# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev     # dev server (Turbopack, http://localhost:3000)
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint (flat config)
npx tsc --noEmit  # typecheck; there is no npm script for it
npx next typegen  # regenerate PageProps/LayoutProps/RouteContext type helpers
```

No test runner is configured — there are no test files, no test script, and no testing dependency in `package.json`. If tests are needed, pick and install a runner first.

## Stack

Next.js 16.2.12 (App Router) · React 19.2.4 · TypeScript 5 (`strict`) · Tailwind CSS v4 via `@tailwindcss/postcss`.

The app itself is still the `create-next-app` scaffold: `app/layout.tsx` (root layout, Geist fonts as CSS variables), `app/page.tsx`, `app/globals.css`, static SVGs in `public/`. There is no `src/` directory — the App Router lives at `app/` in the repo root.

## design-system/

Imported from the "YesTourBD Design System" Claude Design project (`fa383159-158a-4964-b64e-77c4f9b5bd7c`) via the DesignSync tool. **Not yet wired into the Next.js app** — `app/globals.css` still uses only Tailwind's own theme.

- `readme.md` — the brand contract: booking-mode split (instant = teal / request = navy), copy rules, color/type/spacing/motion/interaction-state rules. Read this before designing any YesTourBD screen.
- `styles.css` + `tokens/*.css` — 133 CSS custom properties. Reference the semantic aliases (`--color-brand-primary`, `--color-text-secondary`, `--color-border`), never the raw scales (`--navy-800`, `--gray-600`).
- `_adherence.oxlintrc.json` — oxlint rules enforcing the above: no raw hex, no raw px, only the five approved font families, and per-component prop/enum whitelists. Not hooked into `npm run lint` (that runs ESLint); run oxlint against it separately if you want the checks.
- `_ds_manifest.json` / `_ds_bundle.js` — machine artifacts for the Design System pane (component index, cards, compiled previews). Generated; don't hand-edit.
- `SKILL.md` — agent-skill front matter for the design project.

The component sources (`components/`), UI kits, and brand assets live in the remote project and were **not** imported. Pull them with DesignSync `get_file` if needed.

## Conventions that differ from older Next.js

`AGENTS.md` says to read `node_modules/next/dist/docs/` before writing code — that is the authoritative reference for this version. The breaking changes most likely to bite:

- **Async request APIs.** `cookies()`, `headers()`, `draftMode()`, `params` (layout/page/route/default/metadata image files), and `searchParams` (page) are Promises. Synchronous access was removed in 16. Use `await props.params` with the generated `PageProps<'/route'>` / `LayoutProps` / `RouteContext` helpers.
- **`middleware` → `proxy`.** Use `proxy.ts` with an exported `proxy` function. The proxy runtime is `nodejs` only (no edge). Config flags renamed too: `skipMiddlewareUrlNormalize` → `skipProxyUrlNormalize`.
- **Turbopack is the default bundler** for both `dev` and `build`. Turbopack config goes in `turbopack` at the top level of `next.config.ts`, not under `experimental`.
- **`next lint` was removed.** `npm run lint` invokes `eslint` directly against `eslint.config.mjs` (flat config composing `eslint-config-next/core-web-vitals` + `/typescript`).
- **Tailwind v4 is CSS-first.** There is no `tailwind.config.js`; theme tokens are declared in `app/globals.css` under `@theme inline`. Add design tokens there, not in a JS config.
- `next/legacy/image` and `images.domains` are deprecated; use `images.remotePatterns`.

## Imports

`@/*` maps to the repo root (`tsconfig.json` paths), so `@/app/...`, `@/components/...` resolve from the top level.
