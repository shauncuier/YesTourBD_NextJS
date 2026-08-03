# Milestones

Decomposition of the phases in [ARCHITECTURE.md](./ARCHITECTURE.md#suggested-phasing) into
small, individually-shippable units. Each milestone has a goal, a task list, and a
**Done when** check that is observable rather than a feeling.

Sizes are rough: **S** ≈ up to a day · **M** ≈ two to four days · **L** ≈ about a week, for
one developer already familiar with the repo. They are estimates, not commitments.

A milestone is finished when its Done-when check passes on a deployed preview, not on a
laptop.

---

## Blocking decisions

Several milestones cannot start until these are answered. They are business calls, not
engineering ones.

| # | Decision | Blocks |
|---|---|---|
| D1 | Confirm booking mode for Marine Drive Tour and Houseboat Day Tour (unclassified in the brief) | M3.1 |
| D2 | Confirm the v1 instant/request split proposed in ARCHITECTURE.md — especially whether hotel inventory exists today | M0.0, M3.x, M5.x |
| D3 | Is "Pay 30% to hold, balance before departure" a real policy? | M1.8 |
| D4 | Mobile layout behaviour for the five screens — needs design, no mobile artboards exist | M0.2 onward |
| D5 | ~~ORM choice: Prisma or Drizzle~~ — **decided: Prisma**, for the migration ergonomics while the schema is still churning | M1.1 |
| D6 | ~~Hosting target~~ — **decided: Vercel, with Neon for Postgres**; Neon's branching gives each preview deploy its own database | M1.1 |
| D7 | SMS provider for OTP | M2.1 |
| D8 | SSLCommerz merchant account | M3.5 |
| D9 | Three brand tokens fail WCAG AA for small text and are the only accessibility failure left: `--color-text-muted` #7a8ca0 on white is 3.45:1, white on `--teal-500` #00988b is 3.58:1, `--teal-400` #28b1a1 on white is 2.65:1 (AA wants 4.5:1). Darkening them is a brand change and belongs in the Design project, not this repo — the tokens are synced from it | M0.9 |

---

## Phase 0 — Responsive and groundwork

The site is desktop-only today. Everything built before this gets rebuilt after it, so it
goes first. See [STATUS.md](./STATUS.md#structural-gap-1--the-site-is-desktop-only).

### M0.0 — Quick corrections · S — **DONE**
Small pending items, cleared before real work starts.
- [x] Fix the `/request` hero badge stretching full-width (`alignSelf: 'flex-start'`)
- [ ] Apply decision **D2** to `lib/site-data.js` service modes, if it changes them — *still blocked on D2*
- [x] Remove the unused Tailwind dependencies and `postcss.config.mjs`

**Done when:** `npm run build` and `npm run lint` pass and the request hero badge hugs its text.

### M0.1 — Test runner · S — **DONE**
There is no test runner in the repo. Adding one after the backend exists means backfilling.
- [x] Install and configure Vitest + React Testing Library
- [x] Add `test`, `test:watch` and `typecheck` scripts
- [x] One smoke test per screen: renders without throwing
- [x] Port the design system's 15 `.d.ts` files — the components had no prop types, so
      `tsc --noEmit` failed the moment tests consumed them from `.tsx`
- [x] Wire into CI — `.github/workflows/ci.yml` runs lint, typecheck, test and build on
      every push to `main` and every pull request, on Node 22 and 24

**Done when:** `npm test` runs green in CI on a pull request.

### M0.2 — Mobile design decisions · M · needs D4
Not code. Decide and write down what each layout becomes on small screens.
- [ ] Breakpoints (proposal: 640 / 900 / 1200)
- [ ] Header: hamburger vs. bottom nav; where the phone number and Sign in go
- [ ] Hero search widget: stacked fields vs. a "search" sheet
- [ ] Search: filter rail as a drawer or a modal
- [ ] Search result row: how the three-column row reflows
- [ ] Detail: gallery treatment, and booking panel as a sticky bottom bar
- [ ] Request: three-across type picker at mobile width
- [ ] Account: booking row reflow
- [ ] Footer: column stacking

**Done when:** a written spec (or artboards) exists covering all nine, agreed with the client.

### M0.3 — Responsive mechanism · M — **DONE**
Choose and set up the layer that makes breakpoints possible at all.
- [x] Approach: CSS Modules, mobile-first, breakpoints 640 / 900 / 1100
- [x] Shared primitives in `styles/layout.module.css`
- [x] Migrated Home as the reference implementation
- [x] Documented in CLAUDE.md ("Responsive: where styles go")

**Done when:** one section reflows correctly at all breakpoints and the pattern is written down.

### M0.4 — Global chrome responsive · M — **DONE**
- [x] Header: hamburger disclosure nav below 900px, phone number hidden below 1100px
      (the fixed contact dock carries it), closes on navigation
- [x] Footer: 1 → 2 → 4 columns, payment row stacks
- [x] Contact dock: verified it does not cover any control. Measured, not eyeballed — every
      interactive element on all 7 routes at 360 / 390 / 768 / 1024 / 1440 was checked for
      horizontal overlap with the dock's fixed rect, and for whether the remaining scroll can
      lift it clear. It found the footer legal links short by 21–47px on every route and
      width, so `.footerBar` now reserves `--dock-reserve` (the dock's height plus its
      offset, declared once in `globals.css` and read by both). Re-measured: nothing covered.

**Done when:** header, footer and dock are usable at 390px on every route.

### M0.5 — Home responsive · M — **DONE**
- [x] Hero title ramp (3xl → 4xl → 5xl) and hero search widget stacking
- [x] Service grid 4 → 2 → 1
- [x] Listings, reviews, blog teasers 3 → 2 → 1
- [x] Offer band and trust strip

### M0.6 — Search responsive · M — **DONE**
- [x] Search band fields stack
- [x] Filter rail becomes a full-screen sheet below 900px, opened by a "Filters" button
- [x] Result row reflows 3-col → stacked card
- [x] View toggles and sort tabs wrap

### M0.7 — Detail responsive · M — **DONE**
- [x] Gallery drops the thumbnail column below 900px
- [x] Tabs scroll horizontally
- [x] Booking panel drops below the content on a phone rather than sticking
      (a sticky panel would eat most of a 390px viewport)
- [x] Dialog fits at mobile width

### M0.8 — Request and Account responsive · M — **DONE**
- [x] Request: type picker 1 → 2 → 3, field grids pair up from 640px, sidebar unsticks
- [x] Account: header wraps, tabs scroll, booking rows stack, sidebar unsticks

### M0.9 — Cross-device QA · S — **MOSTLY DONE**
- [x] Walk all 7 routes at 360 / 390 / 768 / 1024 / 1440
- [x] No horizontal page scroll anywhere — verified by measuring `scrollWidth` vs
      `clientWidth` in a sized frame, not by eye
- [x] Keyboard and focus-ring pass. Four real defects, all now fixed and covered by
      `test/keyboard.test.tsx`:
      - the `/request` notes `<textarea>` suppressed the browser outline and drew nothing in
        its place, so it had no visible focus at all;
      - the mobile filter sheet could not be entered, dismissed or left by keyboard — it now
        takes focus on open, closes on Escape, locks the page behind it and returns focus to
        the button that opened it;
      - `Dialog` promised `aria-modal` without implementing any of it — now traps Tab, takes
        focus on open, restores it on close and locks the page behind it;
      - the header disclosure nav had no Escape route back to its toggle.
- [ ] Lighthouse mobile ≥ 90 on performance and accessibility — **accessibility passes,
      performance does not.** Run against `next start` (production build), mobile preset,
      390×844, all 7 routes:

      | Route | Perf | A11y | Best practices | SEO |
      |---|---|---|---|---|
      | `/` | 79 | 96 | 100 | 100 |
      | `/search` | 84 | 96 | 100 | 100 |
      | `/tours/[slug]` | 82 | 96 | 100 | 100 |
      | `/request` | 85 | 96 | 100 | 100 |
      | `/account` | 80 | 96 | 100 | 100 |
      | `/tickets` | 80 | 96 | 100 | 100 |
      | `/guides` | 80 | 96 | 100 | 100 |

      Accessibility started at 93 on `/account`: three `Switch`es had no accessible name,
      because a `<label>` cannot name a `<span role="switch">`. Fixed with `aria-labelledby`;
      every route is now 96. The only remaining failure is `color-contrast`, and it is not a
      code defect — it is the token palette. See **D9** below.

      Performance is 79–85 and the blocker is LCP (4.3–5.4s), not scripting (TBT ≤ 40ms,
      CLS 0). Cheap wins are already applied — `fetchPriority` on the two LCP images, lazy
      loading everything below the fold, and a preconnect to the image CDN — and moved the
      score by ~1 point. What is left is inherent to the placeholder imagery: full-size JPEGs
      served from a third-party CDN, 234 KiB of which Lighthouse attributes to missing modern
      formats. Tracked as **M0.10**; it cannot be closed while the photographs are Unsplash
      placeholders.

**Done when:** the checks above pass and results are recorded in the PR.

### M0.10 — Image pipeline · M
Blocks the Lighthouse performance gate in M0.9. Needs the real photography first.
- [ ] Replace the Unsplash placeholders in `lib/site-data.js` with licensed assets
- [ ] Move the ported screens' plain `<img>` onto `next/image` (or a loader), so images are
      resized per breakpoint and served as AVIF/WebP — 234 KiB of savings on `/` alone
- [ ] `images.remotePatterns` for whatever CDN the real assets land on
- [ ] Re-run Lighthouse mobile; the gate is ≥ 90 on performance

**Done when:** every route scores ≥ 90 on Lighthouse mobile performance.

> Two bugs this pass caught, both the same root cause and worth remembering: a `1fr` grid
> track has an `auto` minimum, so any nowrap content (the detail tab strip, the header nav)
> widens the track past the viewport. Every track is now `minmax(0, 1fr)` and flex/grid
> items that hold scrollable content carry `min-width: 0`.

---

## Phase 1 — Request-based booking, end to end

Covers nine of twelve services with no payment gateway. The smallest genuinely useful
product.

### M1.1 — Database foundation · M — **MOSTLY DONE**
- [x] Postgres for development: `npx prisma dev` runs one locally with no Docker, and any
      Neon or plain Postgres URL works instead. CI runs a `postgres:17` service container, so
      migrations and the seed are exercised on every push
- [ ] Staging database — needs a Neon project, which is an account action rather than a code
      one. Put its pooled URL in `DATABASE_URL` and `npm run db:deploy`
- [x] Prisma 7 installed and configured. Two things differ from older Prisma: configuration
      lives in `prisma.config.ts` rather than `package.json`, and the client talks to Postgres
      through the `@prisma/adapter-pg` driver adapter instead of an engine binary
- [x] `User` and `Service` tables, migration `20260803095549_init` committed
- [x] Seed the twelve services from `lib/site-data.js` — idempotent, upserts on slug, so
      the array stays the single source of truth for the catalogue
- [x] Document local setup in README

**Done when:** a fresh clone can run migrations and seed, and `/` reads services from the DB.
*Verified:* changing a service name in the database and rebuilding put that name in the
prerendered `/` markup; restoring the seed took it back out.

### M1.2 — Quote request persistence · M — **DONE**
- [x] `QuoteRequest` schema and migration, with `RequestType`, `ContactPref` and the
      `QuoteStatus` pipeline from ARCHITECTURE as enums
- [x] Server action with server-side validation (Zod). The rules live in
      `lib/quote-requests.ts` so the admin side can reuse them and so they are unit-testable
      without a database
- [x] Wire the `/request` form to it — a real `<form>` posting FormData through
      `useActionState`, which needed a `name` prop on `Input`, `Select` and `Checkbox`
- [x] `REQ-XXXX` from a Postgres sequence starting at 2261, not from application code: a
      generate-then-insert can collide under concurrent submissions and a sequence cannot
- [x] Rate limit: 5 per IP and 3 per phone per hour, counted from the table itself rather
      than from process memory, because serverless instances do not share memory. The IP is
      stored as a SHA-256 hash. It is a floor, not a wall — noted in `lib/rate-limit.ts`
- [x] Success state shows the real reference

**Done when:** a submitted form creates a row and the toast shows its actual reference.
*Verified* by driving the built app in a browser against the database: an invalid phone came
back with the server's message and wrote nothing; a valid submission wrote a row and the
toast read "Request sent — REQ-2262"; the fourth submission from the same number in an hour
was refused. One real bug came out of the unit tests — the phone rule rejected
`01712-345678`, the exact format the field's own placeholder shows, because it validated
before stripping separators.

### M1.3 — Transactional email · S
- [ ] Email provider configured
- [ ] Customer "we received your request" template
- [ ] Internal new-request notification

**Done when:** submitting a request delivers both emails.

### M1.4 — Staff auth and admin shell · M — **DONE**
- [x] Staff login. Auth.js v5 with a credentials provider, argon2id hashes, JWT sessions
      lasting 8 hours. Accounts are created by `npm run staff:create` from environment
      variables — a seeded default password is a published one
- [x] Role model and route guard. `proxy.ts` (Next 16's middleware) turns anonymous `/admin`
      traffic away, and `requireStaff()` runs again inside every admin page. The proxy is a
      convenience; the per-entry-point check is the boundary, so an unguarded route is a
      missing call rather than a silently public endpoint
- [x] Admin layout ported from `ui_kits/admin/admin-chrome.jsx` — sidebar, top bar, `Panel`,
      `StatCard`, table styles. Nav items are real routes, the staff footer shows who is
      signed in, and the 244px rail becomes a drawer below 900px (the kit was drawn at 1440
      and has no small layout)
- [x] Unbuilt sections say so rather than 404 — the same choice the kit made for screens it
      had no design for

**Done when:** `/admin` is unreachable signed-out and renders the shell signed-in as staff.
*Verified* in a browser against the built app: signed out, `/admin` and `/admin/requests`
both redirect to the sign-in page with the intended path preserved and no admin markup in the
response; a wrong password is refused; the right one lands on the panel; the drawer opens at
390px with no horizontal scroll; signing out ends the session.

Two real bugs came out of that pass. The customer header, footer and contact dock were
rendering around the admin panel, because the root layout applied to every route — the public
chrome now lives in an `app/(site)` group. And Auth.js rejects any Host it does not recognise
outside Vercel, so a production build failed every request with `UntrustedHost` until
`trustHost` was set; the guard failed closed, which is the right direction to fail.

### M1.5 — Admin request queue · M
- [ ] List with status filter and sort
- [ ] Age column and an overdue indicator against the two-working-hour SLA
- [ ] Search by reference, name or phone

**Done when:** a submitted request appears in the queue within a page refresh, flagged if overdue.

### M1.6 — Request detail and status machine · M
- [ ] Detail view of everything the customer submitted
- [ ] Transitions: submitted → reviewing → quoted → negotiating → accepted / lost / expired
- [ ] Internal notes and an audit trail of who changed what

**Done when:** a request can be walked through every transition and the history is visible.

### M1.7 — Quotation builder · L · needs D3
- [ ] `Quotation` schema with line items
- [ ] Build, edit, total, validity date
- [ ] Deposit terms per D3
- [ ] Send to customer, and record when it was sent

**Done when:** a quotation can be built, sent, and read by the customer from the email.

### M1.8 — Customer request tracking · M
- [ ] Public status page reachable by reference
- [ ] Accept / decline a quotation
- [ ] Accepted quotation records intent to convert to a booking

**Done when:** a customer can follow a request end to end without signing in.

---

## Phase 2 — Accounts

### M2.1 — Phone OTP auth · L · needs D7
- [ ] Auth.js configured
- [ ] SMS provider integrated
- [ ] OTP request, verify, resend, with rate limiting and expiry
- [ ] Sessions

**Done when:** a new phone number can sign up, sign out, and sign back in.

### M2.2 — Auth UI · M
- [ ] Sign-in screen in design-system components
- [ ] Header reflects signed-in state
- [ ] Protected routes and post-login redirect

### M2.3 — Account wired to real data · M
- [ ] Requests tab from the DB
- [ ] Empty states per the design system's copy rules
- [ ] Link past requests to the account on sign-up by matching phone

### M2.4 — Profile · M
- [ ] Edit name, email, NID/passport
- [ ] Encrypt NID/passport at rest; keep out of logs and analytics
- [ ] Notification preferences persisted

**Done when:** profile edits survive a sign-out, and the identity fields are encrypted in the DB.

---

## Phase 3 — Instant booking

First phase that touches money.

### M3.1 — Listings and inventory schema · L · needs D1, D2
- [ ] `Listing`, `ListingMedia`, `Departure` schemas
- [ ] Admin CRUD for services and listings
- [ ] Admin departure/capacity management
- [ ] Media upload to object storage

**Done when:** staff can create a listing with photos and a month of departures, unaided.

### M3.2 — Public pages from the database · M
- [ ] Detail page reads a real listing
- [ ] Home listings from the DB
- [ ] Retire the hard-coded arrays in `lib/site-data.js`
- [ ] Swap remote Unsplash images for `next/image` on stored media

### M3.3 — Search and filters · L
- [ ] Wire destination, dates and guests
- [ ] Filter rail: service, price, rating, instant-only
- [ ] Sort by popular / price / rating
- [ ] Pagination or load-more
- [ ] Empty state

**Done when:** filters and sort change the result set, and the URL is shareable.

### M3.4 — Booking creation · M
- [ ] `Booking` schema, `YTB-XXXXXX` references
- [ ] Availability check and seat hold with expiry
- [ ] Confirm dialog creates a pending booking

**Done when:** two people cannot book the last seat concurrently.

### M3.5 — Payments · L · needs D8
- [ ] SSLCommerz initiation
- [ ] Callback verified **server-side** against the gateway's validation API
- [ ] Success, failure and cancel paths
- [ ] `Payment` records with the raw payload retained
- [ ] Idempotency on repeated callbacks

**Done when:** a sandbox payment marks a booking paid, and a forged client-side success redirect does not.

### M3.6 — Vouchers · M
- [ ] Voucher generation
- [ ] Email on confirmation
- [ ] Download from the account page

### M3.7 — Admin booking management · L
- [ ] Booking list, filters, detail
- [ ] Amend, cancel, re-issue voucher
- [ ] Refunds through the gateway, honouring the cancellation policy
- [ ] Manifest export per departure

### M3.8 — Payment management · M
- [ ] Transaction list, filters, gateway status
- [ ] Reconciliation view
- [ ] Refund audit trail

---

## Phase 4 — Content and SEO

### M4.1 — Contact & support page · S
- [ ] Route, contact methods, hours, map, support form into the request pipeline

### M4.2 — Service landing pages · L
- [ ] `/services/[slug]` for all twelve
- [ ] Instant services surface availability; request services carry the quote form
- [ ] Admin-editable copy

**Done when:** all twelve resolve, each with its correct booking mode CTA.

### M4.3 — Blog · L
- [ ] `Post` schema, admin CRUD, media
- [ ] `/guides` index and `/guides/[slug]` — replaces the current stub that renders the home page
- [ ] Categories and read time

### M4.4 — Gallery · M
- [ ] Per-listing gallery, wiring up the inert "+14 photos" control
- [ ] Lightbox

### M4.5 — Offers and promotions · L
- [ ] `Offer` schema, promo codes, validity windows, eligible services
- [ ] Apply at checkout and in quotations
- [ ] Admin management

### M4.6 — Banners · M
- [ ] `Banner` schema and placements
- [ ] Admin management; homepage offer band reads from it

### M4.7 — Reviews · M
- [ ] `Review` schema tied to completed bookings
- [ ] Submission after travel
- [ ] Moderation queue
- [ ] Real ratings replace the hard-coded ones

### M4.8 — SEO pass · M
- [ ] `sitemap.xml`, `robots.txt`
- [ ] JSON-LD: Organization, Product/Offer, Article, BreadcrumbList
- [ ] OG images per route
- [ ] Canonicals, and metadata on every route

**Done when:** Search Console accepts the sitemap and rich results validate.

---

## Phase 5 — Expansion

Only after Phase 3 is stable in production.

### M5.1 — Reports and analytics · L
- [ ] Sales by service, conversion, request turnaround against the SLA
- [ ] Admin dashboard fed by real figures

### M5.2 — Staff management · M
- [ ] Staff CRUD, roles, granular permissions, activity log

### M5.3 — Hotel inventory · L
- [ ] Contracted inventory model or a bed-bank integration
- [ ] Move hotels from request to instant

### M5.4 — Ship, air, bus · L each
- [ ] One milestone per integration, taken only when the commercial relationship exists
- [ ] Each moves its service from request to instant

---

## Tracking

These are written to be transferable — one GitHub issue per milestone, labelled by phase,
with the task list as the issue body. The Done-when line becomes the acceptance criterion.
Keep this file as the map; let the issues carry day-to-day state.
