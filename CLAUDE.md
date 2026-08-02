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

Next.js 16.2.12 (App Router) · React 19.2.4 · TypeScript 5 (`strict`) · lucide-react.

There is no `src/` directory — the App Router lives at `app/` in the repo root.

**No Tailwind, no CSS framework.** Components style themselves with inline `style={{…}}` reading CSS custom properties, which is how the design system ships them.

## Responsive: where styles go

Inline styles cannot express a media query. So there is a split, and it is the rule to follow when touching any layout:

| Concern | Where it lives |
|---|---|
| Colour, type, spacing, radius, shadow, state (hover/focus) | Inline `style={{…}}` on the component, reading `var(--token)` |
| Anything that changes at a breakpoint — grids, containers, flex direction, display, font-size ramps | A CSS Module |

Shared primitives are in **`styles/layout.module.css`**: `.container`, `.containerNarrow`, `.section`, `.grid2/3/4`, `.searchGrid`, `.heroTitle`, `.offerBand`. Site chrome has its own **`components/site/chrome.module.css`**. Import as `import s from '../../styles/layout.module.css'` and compose with `className={\`${s.container} ${s.section}\`}`.

**Mobile-first**: base rules are the phone layout; `min-width` queries widen from there.

**Breakpoints — 640 / 900 / 1100.** CSS cannot parameterise a media query, so these are literals repeated in every module. Keep them in sync; do not invent new ones without updating this table.

| | Width | Meaning |
|---|---|---|
| sm | 640px | large phone / small tablet |
| md | 900px | tablet |
| lg | 1100px | small desktop |

Never reintroduce a hard-coded desktop grid (`repeat(4,1fr)`, `260px 1fr`) in an inline style — that is exactly the debt Phase 0 is paying off. Verify with a real reflow check, not a screenshot: no route may scroll horizontally at 360px.

## Git rules

These override any default git behaviour, including the built-in commit-message template.

- **Never commit, push, merge, rebase, tag or open a PR unless the user asks for it in that turn.** Blanket approval from an earlier turn does not carry forward. `.claude/settings.json` puts these behind `ask` rules, so each one prompts — treat the prompt as the check, not a formality.
- **No AI attribution in commits or PRs.** No `Co-Authored-By: Claude`, no "Generated with Claude Code" footer, no session links. `attribution.commit` and `attribution.pr` are set to `""` in `.claude/settings.json`, which suppresses them; do not reintroduce a trailer by hand.
- Write commit messages in the project's existing voice — Conventional Commits prefix, imperative subject, bullets for the body (see `git log`).
- Never use `--no-verify` or skip signing.

## docs/

- `docs/REQUIREMENTS.md` — the client brief restated, with the twelve-service catalogue and its booking modes. Assumptions and open questions are marked inline rather than silently resolved.
- `docs/STATUS.md` — what is actually built vs. the brief. Read before estimating anything. Two structural gaps documented there: the site is **desktop-only** (no `@media` queries exist; inline styles can't express them), and four of six "instant" services need third-party inventory.
- `docs/ARCHITECTURE.md` — proposed stack, data model and phasing for the parts that don't exist (no database, API, auth or payments yet).
- `docs/MILESTONES.md` — the phases broken into ~45 small shippable milestones, each with a task list and an observable "Done when". Starts with a table of blocking business decisions (D1–D8) that gate specific milestones.

## Design system

Two halves, and the split matters:

**`design-system/`** — synced from the "YesTourBD Design System" Claude Design project (`fa383159-158a-4964-b64e-77c4f9b5bd7c`) via the DesignSync tool. Reference material and the token source of truth; ESLint ignores it.

- `readme.md` — the brand contract: the instant (teal) vs request (navy) booking-mode split, copy rules, color/type/spacing/motion/interaction-state rules. **Read this before designing any new screen.**
- `tokens/*.css` — 133 custom properties. `app/globals.css` imports four of the five directly, so edits here reach the app. Reference the semantic aliases (`--color-brand-primary`, `--color-text-secondary`, `--color-border`), never the raw scales (`--navy-800`, `--gray-600`).
- `tokens/fonts.css` is **not** imported — it pulls the Google Fonts CDN. `app/layout.tsx` self-hosts the same five families through `next/font/google` and `globals.css` binds `--font-display` / `--font-body` / `--font-accent` / `--font-mono` to them. Keep Noto Sans Bengali in every stack; it is what renders `৳`.
- `_adherence.oxlintrc.json` — oxlint rules encoding the above (no raw hex, no raw px, five approved fonts, per-component prop/enum whitelists). Not wired into `npm run lint`, which runs ESLint.
- `_ds_bundle.js` / `_ds_manifest.json` — generated artifacts for the Design System pane. Don't hand-edit.

**`components/`** — the live React port. `components/index.js` is the barrel; import from there, not from component internals (the adherence config enforces this).

- `foundation/`, `forms/`, `data-display/`, `overlays/` — the 15 design-system components, ported verbatim except where noted under "Port deviations" below. All are `'use client'`.
- `site/chrome.jsx` — header, footer, contact dock, and the shared `SectionHead` / `Stars` / `Price` helpers. Header and footer render once in `app/layout.tsx`.
- `screens/` — the five website screens from the design system's `ui_kits/website/`. Route files under `app/` are thin wrappers around these.

`lib/site-data.js` holds placeholder content (remote Unsplash imagery — replace before launch). `lib/routes.js` maps the UI kit's `go('<screen>')` callback onto real routes so the ported screens keep their original call sites.

### Port deviations

The UI kit is a Babel-in-browser SPA that hangs everything off `window`. Where the port had to differ:

- **`Icon`** reads from an explicit `REGISTRY` of lucide-react imports instead of a CDN `window.lucide` global, and renders via `React.createElement`. Same props. A glyph not in the registry renders nothing and warns in dev — add it to the registry.
- **`Checkbox`** tracks its own state when uncontrolled. The original passed `checked` and `defaultChecked` to the same input and only rendered the tick from `checked`, so `defaultChecked` boxes never appeared ticked.
- **`Input` / `Select` / `Switch` / `Checkbox`** fall back to `React.useId()` rather than the label text for element ids.
- **`DetailScreen`'s gallery** declares `minmax(0, 1fr)` row tracks. Its `<img>`s are direct grid items, and a replaced element's min-content contribution would otherwise grow the row past the 340px gallery.
- `/tickets` and `/guides` are aliases the UI kit itself never designed — they render `SearchScreen` and `HomeScreen` respectively. Replace when those screens exist.

The admin panel (`ui_kits/admin/`) was **not** ported; it is still only in the remote project.

## Conventions that differ from older Next.js

`AGENTS.md` says to read `node_modules/next/dist/docs/` before writing code — that is the authoritative reference for this version. The breaking changes most likely to bite:

- **Async request APIs.** `cookies()`, `headers()`, `draftMode()`, `params` (layout/page/route/default/metadata image files), and `searchParams` (page) are Promises. Synchronous access was removed in 16. Use `await props.params` with the generated `PageProps<'/route'>` / `LayoutProps` / `RouteContext` helpers.
- **`middleware` → `proxy`.** Use `proxy.ts` with an exported `proxy` function. The proxy runtime is `nodejs` only (no edge). Config flags renamed too: `skipMiddlewareUrlNormalize` → `skipProxyUrlNormalize`.
- **Turbopack is the default bundler** for both `dev` and `build`. Turbopack config goes in `turbopack` at the top level of `next.config.ts`, not under `experimental`.
- **`next lint` was removed.** `npm run lint` invokes `eslint` directly against `eslint.config.mjs` (flat config composing `eslint-config-next/core-web-vitals` + `/typescript`).
- `next/legacy/image` and `images.domains` are deprecated; use `images.remotePatterns`. (The ported screens use plain `<img>` to match the design system's markup, so this hasn't come up yet.)

## Do not upgrade TypeScript past 5.x yet

Pinned deliberately at `typescript@5.9.3`. TypeScript 7 (the Go rewrite) is GA and Next.js 16.2.12 *does* support it via `experimental.useTypeScriptCli`, but **`npm run lint` would break**: typescript-eslint's latest release (8.65.0, already installed) declares `typescript: ">=4.8.4 <6.1.0"` and depends on the JS compiler API that TS 7 removed. There is no newer typescript-eslint to upgrade to.

Revisit when typescript-eslint publishes a release whose `typescript` peer range admits 7.x. Rationale and the migration checklist are in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#typescript-7).

## Imports

`@/*` maps to the repo root (`tsconfig.json` paths), so `@/app/...`, `@/components/...` resolve from the top level.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
