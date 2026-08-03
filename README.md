# YesTourBD

All-in-one travel marketplace for Bangladesh — hotels, houseboats, ship and air tickets you
can confirm right now, plus corporate tours, custom packages and visa help handled by a
coordinator.

**Status: front end plus the first slice of a backend.** The design language, component
library and five customer screens are real, responsive and tested. Postgres is wired in: the
home page reads its service catalogue from it, and `/request` genuinely submits — validated,
rate-limited, persisted, with a real reference back. Everything else — accounts, quotations,
payments, admin — does not exist yet, and the rest of the content is still hard-coded in
`lib/site-data.js`. See [docs/STATUS.md](docs/STATUS.md) before estimating
anything.

---

## Quick start

Requires **Node ≥ 20.9** (Next 16's floor; CI runs 22 and 24).

```bash
npm install                    # postinstall runs `prisma generate`
cp .env.example .env           # then set DATABASE_URL (see Database below)
npm run db:deploy              # apply migrations
npm run db:seed                # insert the twelve services
npm run dev                    # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server, Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint, flat config |
| `npm run typecheck` | `next typegen`, then `tsc --noEmit` |
| `npm test` | Vitest once (`test:watch` to watch) |
| `npm run db:migrate` | Create and apply a migration from schema changes |
| `npm run db:deploy` | Apply committed migrations (CI, staging, production) |
| `npm run db:seed` | Seed the service catalogue; idempotent |
| `npm run db:studio` | Browse the database |
| `npm run staff:create` | Create or reset a staff account from `STAFF_*` environment variables |
| `npm run db:seed:dev` | Sample staff, customers and quote requests for local work (`-- --clean` removes them) |

## Database

Postgres via **Prisma 7**. `DATABASE_URL` is the only variable, and `npm run build` needs it
— the home page is prerendered from the service catalogue.

Three ways to get one:

```bash
npx prisma dev            # local Postgres, no Docker; prints a connection string
```

…or a [Neon](https://neon.tech) project (what this deploys against — take the pooled
connection string), or any Postgres you already run.

Worth knowing if you have used older Prisma: configuration lives in `prisma.config.ts`, not
`package.json`; the client is generated into `lib/generated/prisma` (git-ignored, rebuilt by
`postinstall`); and queries go through the `@prisma/adapter-pg` driver adapter rather than an
engine binary, which is why `lib/db.ts` constructs the client the way it does.

The schema is `prisma/schema.prisma`; `prisma/seed.ts` reads `lib/site-data.js`, so that
array stays the single source of truth for the twelve services.

## Customer sign-in

Customers sign in at `/signin` with a mobile number and a six-digit code. With no `SMS_API_KEY`
set the code is printed to the terminal and kept in `sms_messages`, so the whole flow works
locally without spending SMS credits. Set the key and it goes through BulkSMSBD instead — at
which point the code is no longer stored anywhere.

## Email

With no `RESEND_API_KEY` set, mail is not sent — it is written to the `email_messages` table
and printed to the terminal. That keeps the copy, the triggering and the audit trail real
before a provider exists. Set the key (and `EMAIL_FROM`, `DESK_EMAIL`) and the same messages
start going out; nothing else changes.

## Staff panel

`/admin` needs a staff account and `AUTH_SECRET` (both covered by `.env.example`):

```bash
STAFF_EMAIL=you@yestourbd.com STAFF_PASSWORD='something long' \
STAFF_NAME='Your Name' STAFF_PHONE=017XXXXXXXX npm run staff:create
```

Then sign in at `/admin/login`. Re-running with the same email resets that password, which is
the recovery path until there is a real one. Passwords must be at least 12 characters.
Nothing about staff credentials lives in the repo, and nothing should.

### Sample data

For local work, `npm run db:seed:dev` adds three staff, five customers and seven quote
requests spread across the pipeline — two of them deliberately old enough to show the overdue
flag in the queue:

```bash
npm run db:seed:dev              # sign in as sadia@yestourbd.test / devpassword1234
npm run db:seed:dev -- --clean   # removes everything it added
DEV_PASSWORD='your own' npm run db:seed:dev
```

Every sample address ends in `.test` and every sample request is tagged, which is how
`--clean` finds them again. The script refuses to run with `NODE_ENV=production` unless
`ALLOW_DEV_SEED=true` says otherwise. It is separate from `npm run db:seed`, which seeds the
real twelve-service catalogue and is safe anywhere.

## Routes

| Route | Screen |
|---|---|
| `/` | Home — hero search, 12-service grid, popular listings, offers, reviews |
| `/search` | Search results — filter rail, list / grid / map toggle, sort |
| `/tours/[slug]` | Detail — gallery, content tabs, booking panel, confirm dialog |
| `/request` | Quote request form — validated, rate-limited and persisted, returning a real `REQ-XXXX` |
| `/track` | Follow a request by reference + the mobile used; accept a quotation or ask for changes |
| `/account` | Bookings, requests and profile — still hard-coded; real accounts are Phase 2 |
| `/tickets`, `/guides` | Aliases the UI kit never designed; they render Search and Home |
| `/admin` | Staff panel — sign-in, guarded shell. The screens behind it arrive with M1.5 on |

Every route is prerendered as static HTML.

## The one rule to know

Every service is either **instant** (fixed availability, teal, *Book now*) or
**request-based** (a human quotes it, navy, *Request a quote*), and the UI must always say
which. That split runs through the copy, the colour and the components.
[`design-system/readme.md`](design-system/readme.md) is the full brand contract — read it
before designing any screen.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript 5.9 (`strict`) · lucide-react · Vitest +
React Testing Library.

**No Tailwind, no CSS framework.** Components style themselves with inline `style={{…}}`
reading CSS custom properties, exactly as the design system ships them. Because an inline
style cannot express a media query, anything that changes at a breakpoint lives in a CSS
Module instead — mobile-first, breakpoints **640 / 900 / 1100**. That split is the rule when
touching any layout; [CLAUDE.md](CLAUDE.md) explains where each kind of style goes.

## Layout

```
app/                    routes; thin wrappers around components/screens
components/
  foundation/ forms/ data-display/ overlays/   the 15 design-system components
  screens/              the five ported website screens
  site/                 header, footer, contact dock, shared helpers
  index.js              the barrel — import from here, never from internals
design-system/          synced from the Claude Design project; tokens are the source of truth
lib/                    placeholder content and the screen-id → route map
styles/                 shared responsive layout primitives
test/                   Vitest suites, including the keyboard/focus contracts
docs/                   requirements, status, architecture, milestones
```

## Documentation

| File | What it is for |
|---|---|
| [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) | The client brief restated, with the twelve-service catalogue and its booking modes |
| [docs/STATUS.md](docs/STATUS.md) | What is actually built vs. the brief. Read before estimating |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Proposed stack, data model and phasing for the parts that do not exist yet |
| [docs/MILESTONES.md](docs/MILESTONES.md) | ~45 shippable milestones, each with a "Done when", plus the business decisions that gate them |
| [CLAUDE.md](CLAUDE.md) | Conventions for working in this repo |
| [SYSTEM_PROMPT.md](SYSTEM_PROMPT.md) | General engineering standards; CLAUDE.md wins where they disagree |

## Contributing

CI (`.github/workflows/ci.yml`) runs lint, typecheck, test and build on every push to `main`
and every pull request, on Node 22 and 24. Run the same four locally before pushing.

Two things that are easy to get wrong:

- Never hard-code a desktop grid (`repeat(4,1fr)`, `260px 1fr`) in an inline style, and use
  `minmax(0, 1fr)` rather than `1fr` — a `1fr` track has an `auto` minimum, so nowrap content
  pushes it past the viewport. No route may scroll horizontally at 360px.
- Reference the semantic design tokens (`--color-brand-primary`, `--color-text-secondary`),
  never the raw scales (`--navy-800`, `--gray-600`).

## Known gaps

- The photography is remote Unsplash placeholder imagery, which is what holds Lighthouse
  mobile performance at 79–85 against a target of 90 (accessibility is 96 on every route)
- Three brand tokens fall below WCAG AA contrast for small text — a Design project change
- Mobile layouts were decided in code; no mobile artboards exist and the client has not
  signed them off
- Four of six "instant" services need third-party inventory the business may not have

Details for all four are in [docs/STATUS.md](docs/STATUS.md) and
[docs/MILESTONES.md](docs/MILESTONES.md).
