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
| D5 | ORM choice: Prisma or Drizzle | M1.1 |
| D6 | Hosting target | M1.1 |
| D7 | SMS provider for OTP | M2.1 |
| D8 | SSLCommerz merchant account | M3.5 |

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
- [ ] Wire into CI — *no CI configured yet*

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

### M0.4 — Global chrome responsive · M — **MOSTLY DONE**
- [x] Header: hamburger disclosure nav below 900px, phone number hidden below 1100px
      (the fixed contact dock carries it), closes on navigation
- [x] Footer: 1 → 2 → 4 columns, payment row stacks
- [ ] Contact dock: verify it does not cover primary CTAs on small screens — *not yet checked*

**Done when:** header, footer and dock are usable at 390px on every route.

### M0.5 — Home responsive · M — **DONE**
- [x] Hero title ramp (3xl → 4xl → 5xl) and hero search widget stacking
- [x] Service grid 4 → 2 → 1
- [x] Listings, reviews, blog teasers 3 → 2 → 1
- [x] Offer band and trust strip

### M0.6 — Search responsive · M
- [ ] Search band fields stack
- [ ] Filter rail → drawer
- [ ] Result row reflow
- [ ] View toggles and sort tabs

### M0.7 — Detail responsive · M
- [ ] Gallery
- [ ] Tabs: horizontal scroll or a select
- [ ] Booking panel → sticky bottom bar
- [ ] Dialog at mobile width

### M0.8 — Request and Account responsive · M
- [ ] Request: type picker, two-column field grids, sidebar
- [ ] Account: header, tabs, booking rows, sidebar

### M0.9 — Cross-device QA · S
- [ ] Walk all routes at 390 / 768 / 1024 / 1440
- [ ] Check no horizontal page scroll anywhere
- [ ] Keyboard and focus-ring pass
- [ ] Lighthouse mobile ≥ 90 on performance and accessibility

**Done when:** the checks above pass and results are recorded in the PR.

---

## Phase 1 — Request-based booking, end to end

Covers nine of twelve services with no payment gateway. The smallest genuinely useful
product.

### M1.1 — Database foundation · M · needs D5, D6
- [ ] Provision PostgreSQL (dev + staging)
- [ ] Install ORM, configure migrations
- [ ] `User` and `Service` tables
- [ ] Seed the twelve services from `lib/site-data.js`
- [ ] Document local setup in README

**Done when:** a fresh clone can run migrations and seed, and `/` reads services from the DB.

### M1.2 — Quote request persistence · M
- [ ] `QuoteRequest` schema and migration
- [ ] Server action with server-side validation (Zod)
- [ ] Wire the `/request` form to it
- [ ] `REQ-XXXX` reference generation
- [ ] Rate-limit the public endpoint
- [ ] Success state shows the real reference

**Done when:** a submitted form creates a row and the toast shows its actual reference.

### M1.3 — Transactional email · S
- [ ] Email provider configured
- [ ] Customer "we received your request" template
- [ ] Internal new-request notification

**Done when:** submitting a request delivers both emails.

### M1.4 — Staff auth and admin shell · M
- [ ] Staff login
- [ ] Role model and route guard on every `/admin` handler, not only the UI
- [ ] Admin layout ported from the design system's `ui_kits/admin/`

**Done when:** `/admin` is unreachable signed-out and renders the shell signed-in as staff.

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
