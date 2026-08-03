# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

General engineering standards live in [SYSTEM_PROMPT.md](SYSTEM_PROMPT.md) — deliberately linked, not `@`-imported, so it stays out of every session's context. This file wins wherever the two disagree.

## Commands

```bash
npm run dev        # dev server (Turbopack, http://localhost:3000)
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint (flat config)
npm run typecheck  # next typegen, then tsc --noEmit
npm test           # Vitest once; test:watch to watch
npx next typegen   # regenerate PageProps/LayoutProps/RouteContext on their own
```

Tests run on **Vitest + React Testing Library** (`npm test`, `npm run test:watch`), jsdom environment, config in `vitest.config.mts` and setup in `test/setup.ts` — which stubs `next/navigation` and `window.matchMedia`, neither of which exists outside an App Router tree or a real browser. `test/keyboard.test.tsx` holds the keyboard and focus contracts; break one and it fails.

`.github/workflows/ci.yml` runs lint, typecheck, test and build on every push to `main` and every pull request, on Node 22 and 24. Node 20.9 is the floor Next 16 sets.

## Database

Postgres through **Prisma 7** (decision D5), deploying to Vercel with Neon (D6). `DATABASE_URL`
is the only environment variable, and `npm run build` needs it — `/` is prerendered from the
service catalogue.

Prisma 7 differs from what you probably remember:

- Configuration is in **`prisma.config.ts`**, not a `prisma` key in `package.json`. The seed
  command lives under `migrations.seed` there.
- The client is generated into **`lib/generated/prisma`** — git-ignored, rebuilt by
  `postinstall`, ignored by ESLint. Import it through `lib/db.ts`, never directly.
- Queries go through the **`@prisma/adapter-pg` driver adapter**; `new PrismaClient()` with no
  adapter throws. `lib/db.ts` builds it and memoises the instance on `globalThis` in dev, so
  the dev server's module re-evaluation does not exhaust the connection limit.
- `npx prisma dev` runs a local Postgres with no Docker, which is how this was developed.

## The request pipeline

`lib/request-pipeline.ts` is the only place that says which status may follow which. Server
actions call `checkTransition()` before writing, so what the UI offers and what the server
permits cannot drift apart — a button is a suggestion, never an authorisation.

Every change writes a `QuoteRequestEvent` in the **same transaction** as the change itself.
The table is append-only: nothing edits or deletes history. When a customer says "I was told
X", the record has to be able to answer, and a status column alone cannot say who moved it or
why. Actor names are denormalised onto the event so history still reads correctly after
someone leaves.

## Customer tracking (`/track`)

References are sequential, so **a reference is never sufficient authorisation**. `/track` asks
for the reference plus the mobile the request was submitted with, answers identically whether
the reference exists or not, rate-limits attempts per IP in the database, and on success sets
a signed cookie scoped to that one reference (`lib/tracking.ts`). Every action re-verifies the
cookie — a rendered page is not authorisation.

Anything customer-facing shows less than the staff view: no owner, no internal notes, and the
pipeline collapsed through `customerStatus()`. If you add a status, add its customer wording
there too, or it leaks the internal vocabulary.

## Email

`lib/email/send.ts` is the only seam to a provider. With no `RESEND_API_KEY` set the transport
is `console`: every message is still written to `email_messages` and logged, so copy and
triggering are testable without an account. Adding a provider is a branch in `deliver()`.

Two rules:

- **Mail never fails the action that triggered it.** Send after the row is committed, and let
  `sendEmail` record a failure rather than throw. A mail outage must not lose a customer's
  request.
- **Every attempt is recorded**, delivered or not. "Did the customer get their quotation?"
  should be answerable from our own database, not a third party's dashboard.

Templates live in `lib/email/templates.ts` and are plain text. The design system's content
rules apply there too — sentence case, no emoji, ৳ with comma grouping, day-first dates — and
`test/email-templates.test.ts` asserts them, because nobody reviews an email the way they
review a screen.

## Money

Whole taka, held as **integers**. No floats anywhere near a number a customer will be asked to
pay, and no decimals — the design system quotes ৳3,200, not ৳3,200.00. `lib/quotation.ts` owns
the arithmetic; deposits round up and deposit + balance always equals the total exactly.

A quotation's line items are **snapshotted as JSON**, not related rows, so it keeps reading as
it was sent after prices move. Revising a price writes a new quotation and supersedes the old
one — quotations are never edited in place.

## The two-working-hour SLA

The brief promises a reply within two working hours, and `lib/sla.ts` is the only place that
says what a working hour is: **09:00–22:00 Asia/Dhaka, seven days**, matching the desk hours
the site advertises. Dhaka is treated as a fixed UTC+6 — Bangladesh has not observed DST since
2009. The clock runs only while a request is `submitted` or `reviewing`; once it is answered
it stops.

This is an assumption the client has not confirmed (see M1.5 in MILESTONES). Change the two
constants there and everything downstream follows — never re-derive working hours in a
component or a query.

## Auth and /admin

Staff sign in with email and password through **Auth.js v5** (`auth.ts`); customers will get
phone OTP as a second provider on the same config (M2.1). Passwords are argon2id, sessions are
JWTs, and `AUTH_SECRET` signs them.

Two rules that are not optional:

- **Every `/admin` entry point calls `requireStaff()` itself.** `proxy.ts` guards the route
  tree, but a proxy is a convenience, not a boundary. A page without the call is a public
  endpoint, and that must be visible as a missing line rather than an invisible assumption.
- **No credentials in the repo.** Staff accounts come from `npm run staff:create`, which reads
  `STAFF_EMAIL` / `STAFF_PASSWORD` from the environment. Never seed a password.

Route layout matters here: `app/(site)/` carries the customer chrome, `app/admin/(panel)/`
the guarded shell, and `app/admin/login/` sits outside the panel group so signing in does not
redirect to itself. The root layout is fonts and `<html>` only.

**Writes go through server actions**, one file per route (`app/request/actions.ts`). The
pattern: parse `FormData` with the route's Zod schema in `lib/*`, check the rate limit, write,
and return a discriminated union the screen renders — `sent` / `invalid` / `error`. Screens
take the action as a **prop** rather than importing it, so they can be tested without a
server; the page supplies the real one. Never trust the client to have validated: the same
schema runs server-side regardless.

References (`REQ-XXXX`, `YTB-XXXXXX`) come from Postgres sequences with a column default, not
from application code — two concurrent submissions can generate the same value but cannot draw
the same sequence number. Prisma cannot declare sequences, so they are hand-written in the
migration and referenced from the schema with `dbgenerated`.

`prisma/seed.ts` upserts the twelve services from `lib/site-data.js` on `slug`, so that array
stays the source of truth for the catalogue and re-seeding never duplicates rows. Screens read
data through `lib/*.ts` helpers (`lib/services.ts`), which map rows onto the shapes the ported
components already consume — the components themselves stay unaware of the database.

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

One exception to the "inline styles own everything but breakpoints" rule: the contact dock's
geometry (`--dock-button` / `--dock-gap` / `--dock-offset` / `--dock-reserve`) lives in
`app/globals.css`, because two components have to agree on it — the dock is fixed in the
bottom-right corner and the footer reserves `--dock-reserve` so its last row can be scrolled
clear of it. Change the dock's size there, not in `chrome.jsx`.

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
- **`Switch`** names itself with `aria-labelledby` pointing at its label text. The original relied on the wrapping `<label htmlFor>`, which names nothing: `htmlFor` only applies to labelable form elements, and the control is a `<span role="switch">`. Lighthouse failed all three `/account` switches on `aria-toggle-field-name`.
- **`Dialog`** implements what `aria-modal` claims: focus moves into the surface on open, Tab is trapped inside it, focus returns to whatever opened it on close, and the page behind stops scrolling. The original added the attribute and an Escape handler only. Browsers implement none of this for a `role="dialog"` div.
- **`Input` / `Select` / `Checkbox`** accept `name` (and `Input` also `autoComplete` and `inputMode`), passed to the underlying element. The UI kit never submitted a form, so it had no way to name a field; `/request` posts real FormData.
- **`Button`** accepts `name` and `value`, so a form can tell which button submitted it. Without it, the admin status buttons all posted an empty field and no request could change status.
- **`Card`** marks its image `loading="lazy" decoding="async"`. Every card in this app is below the fold and the images are full-size remote JPEGs.
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
