# Milestones

Decomposition of the phases in [ARCHITECTURE.md](./ARCHITECTURE.md#suggested-phasing) into
small, individually-shippable units. Each milestone has a goal, a task list, and a
**Done when** check that is observable rather than a feeling.

Sizes are rough: **S** ≈ up to a day · **M** ≈ two to four days · **L** ≈ about a week, for
one developer already familiar with the repo. They are estimates, not commitments.

A milestone is finished when its Done-when check passes on a deployed preview, not on a
laptop.

## Where things stand — 4 Aug 2026

**Phases 0, 1 and 2 are done**, except for two things that need credentials rather than code:
M1.3's email provider key, and one live SMS test. Both are marked in place below.

**Next up: Phase 3 — instant booking**, which is the first phase that touches money and needs
**D8** (an SSLCommerz merchant account). Nothing in it can start without that.

If D8 is not ready, the useful unblocked work is **M0.10** (real imagery, which is what holds
Lighthouse performance at 79–85) or the customer-facing gaps in Phase 4.

See [STATUS.md](./STATUS.md) for what actually runs today and what is waiting on whom.

---

## Blocking decisions

Several milestones cannot start until these are answered. They are business calls, not
engineering ones.

| # | Decision | Blocks |
|---|---|---|
| D1 | Confirm booking mode for Marine Drive Tour and Houseboat Day Tour (unclassified in the brief) | M3.1 |
| D2 | Confirm the v1 instant/request split proposed in ARCHITECTURE.md — especially whether hotel inventory exists today | M0.0, M3.x, M5.x |
| D3 | Is "Pay 30% to hold, balance before departure" a real policy? — **no longer blocking**: the deposit is a per-quotation field defaulting to 30%, so an answer changes a default rather than a schema | M1.8 |
| D4 | Mobile layout behaviour for the five screens — needs design, no mobile artboards exist | M0.2 onward |
| D5 | ~~ORM choice: Prisma or Drizzle~~ — **decided: Prisma**, for the migration ergonomics while the schema is still churning | M1.1 |
| D6 | ~~Hosting target~~ — **decided: Vercel, with Neon for Postgres**; Neon's branching gives each preview deploy its own database | M1.1 |
| D7 | ~~SMS provider for OTP~~ — **decided: BulkSMSBD**, wired in `lib/sms/send.ts`; keys live in `.env`, never the repo | M2.1 |
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

### M1.3 — Transactional email · S — **MOSTLY DONE**
- [ ] Email provider configured — **the one thing left, and it needs an account key.** Set
      `RESEND_API_KEY` and messages start going out; the Resend branch in `lib/email/send.ts`
      is already written. Another provider is a second branch in the same function and
      nothing else changes
- [x] Customer "we received your request" template
- [x] Internal new-request notification, with everything the desk needs to act without
      opening anything, and a link straight to the request
- [x] Quotation email (M1.7's missing half), itemised, with the deposit split and the expiry
- [x] Every message is written to `email_messages` whether it was delivered or not, so "did
      the customer get their quotation?" is answerable from our own database rather than a
      third party's dashboard

Two design points. **Mail never fails a customer's action**: it is sent after the row is
committed, and `sendEmail` records a failure rather than throwing, so a mail outage cannot
lose a request. And with no key configured the transport is `console` — the copy, the
triggering, the audit trail and the tests are all real now, so choosing a provider is a
config change rather than a build.

**Done when:** submitting a request delivers both emails. *Not met — nothing is delivered
until a provider key exists.* Everything up to that line is verified: submitting through the
public form wrote a customer acknowledgement and a desk notification, and sending a quotation
wrote the customer's itemised copy, all three with the right content and reference.

The templates are plain text. An HTML version needs brand email artwork that does not exist,
and a plain-text quotation that arrives beats a styled one that waits for a designer.

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

### M1.5 — Admin request queue · M — **DONE**
- [x] List with status filter and sort, ported from the design system's
      `ui_kits/admin/RequestsScreen.jsx` list view. Filters live in the URL, so "everything
      overdue, oldest first" is a link a coordinator can bookmark or send to a colleague
- [x] Age column and an overdue indicator against the two-working-hour SLA
- [x] Search by reference, name or phone. Phone is matched with separators stripped, because
      the stored form has none

**The SLA needed a definition, and this is an assumption.** "Two working hours" is only
enforceable once working hours exist, so the clock counts **09:00–22:00 Asia/Dhaka, seven
days** — the corporate desk hours the site itself advertises. A request arriving at 21:50 is
therefore one working hour old at 09:50 the next morning, not twelve. It is all in `lib/sla.ts`
and covered by tests including the overnight and multi-day cases; if the client says the
window is different, change it there and nowhere else. No weekend exclusion, because the desk
does not take one.

The clock also stops once the customer has been answered: a request only counts as overdue
while it is still `submitted` or `reviewing`.

**Done when:** a submitted request appears in the queue within a page refresh, flagged if overdue.
*Verified* end to end in a browser: a request submitted through the public form appeared in the
staff queue with its reference, name, phone and waiting time; searching by reference and by
phone each found it; an unanswered request planted three days back showed the overdue flag;
and the page does not scroll sideways at 390px, though the dense table scrolls inside its own
panel.

### M1.6 — Request detail and status machine · M — **DONE**
- [x] Detail view of everything the customer submitted — every field, the contact details as
      tap-to-call and mailto links, the selected needs, and their own notes verbatim
- [x] Transitions, as rules rather than prose. `lib/request-pipeline.ts` owns the allowed
      moves and the server re-checks every one, so the buttons are what is *offered*, not
      what is *permitted*
- [x] Internal notes and an audit trail. `QuoteRequestEvent` is append-only: status changes,
      assignments and notes, each with who did it and when. The status write and its history
      row share a transaction — a status that changed with no event explaining it is worse
      than no audit trail, because it looks complete
- [x] Assignment: claim a request or hand it back, recorded like anything else. The queue
      gained the Owner column the design system's list view always had

Two deliberate choices about the pipeline: `quoted → reviewing` and `negotiating → quoted`
are allowed, because a customer coming back with changes is the normal case; and `lost` and
`expired` reopen to `reviewing` rather than forcing a duplicate request, which would split the
history of the same conversation across two records. `booked` is final.

**Done when:** a request can be walked through every transition and the history is visible.
*Verified* in a browser: a request submitted through the public form was claimed, walked
submitted → reviewing → quoted → negotiating → accepted → booked, and every step appeared in
the history with the coordinator's name; a note was added and kept; `booked` then offered
nothing further; and a forged transition posted straight at the server was rejected without
changing the status.

This pass found a real bug in a ported component: the design system's `Button` dropped `name`
and `value`, so every status button submitted an empty field and the pipeline could not move
at all. Fixed and covered by a test.

### M1.7 — Quotation builder · L — **MOSTLY DONE**
- [x] `Quotation` schema with line items. Line items are snapshotted as JSON rather than
      related rows: a quotation must keep reading exactly as it was sent, even after prices
      move underneath it
- [x] Build, total, validity date. The arithmetic runs as the coordinator types — quoting 34
      people should not involve mental multiplication while the customer waits — and the
      server recomputes all of it, because a total posted by a browser is a suggestion
- [x] Deposit terms. **D3 no longer blocks anything**: the deposit is a per-quotation
      percentage defaulting to 30, so confirming the policy changes a default rather than a
      schema. Deposits round up — asking for ৳333.67 is not a thing — and deposit plus
      balance always equals the total exactly
- [x] Record when it was sent, by whom, and for how much. Revising a price writes a **new**
      quotation and supersedes the old one instead of editing it, so what was sent on which
      day stays answerable
- [ ] Send to customer — the delivery itself is M1.3 and needs an email provider. Everything
      up to the transport is done: the row, the status move to `quoted` and the history entry
      are all real, so nothing is redone when a provider is chosen

Money is whole taka held as integers. Floating point has no business near a number a customer
is asked to pay, and the design system quotes in whole taka anyway (৳3,200, no decimals).

**Done when:** a quotation can be built, sent, and read by the customer from the email.
*Half met.* Verified in a browser: an itemised quotation totalled ৳106,000 live as it was
typed, a past expiry date was refused by the server, sending recorded ৳100,000 after discount
with a ৳30,000 deposit, the request moved to `quoted`, the history named who sent it and for
how much, and a revision appeared alongside the original with the original marked superseded.
The customer cannot read it yet — that is the email.

### M1.8 — Customer request tracking · M — **DONE**
- [x] Public status page — reachable by reference **and the mobile it was submitted with**,
      not by reference alone. See the security note below; this changed the design
- [x] Accept, or ask for changes. "Decline" is the wrong verb for this business: a customer
      who wants a cheaper hotel is not rejecting the quotation, they are negotiating, and the
      request moves to `negotiating` with their message on the record
- [x] Accepting marks the quotation accepted, moves the request to `accepted`, and writes the
      event crediting the **customer** rather than whichever coordinator was signed in.
      Converting that into a booking is Phase 3, where payment lives

**A reference alone could not be the key.** `REQ-XXXX` comes from a sequence, so REQ-2262 is
one keystroke from REQ-2261 — a URL-only status page would have handed anyone a stranger's
phone number, itinerary and prices by counting. So: the lookup needs reference plus mobile,
the answer is identical whether the reference exists or not, attempts are rate-limited per IP
(10 per 15 minutes, counted in the database because serverless instances share no memory), and
success sets a signed 30-day cookie **scoped to that one reference**. Every action re-checks
it — a rendered page is not authorisation.

The customer view deliberately shows less than the staff one: no owner, no internal notes, and
the eight-status pipeline collapsed to five phrases a customer can act on. "Lost" is not a
word to put in front of the person who asked.

**Done when:** a customer can follow a request end to end without signing in. *Verified* in a
browser: submitted, opened the status page cold and was turned away, refused with the wrong
mobile, let in with the right one, saw the itemised quotation with its deposit split once
staff sent it, accepted it, and staff saw `Quoted → Accepted` in the history credited to the
customer. A neighbouring reference stayed shut throughout.

---

## Phase 2 — Accounts

### M2.1 — Phone OTP auth · L — **DONE**
- [x] Auth.js configured — a second provider (`phone-otp`) on the same config as staff
      sign-in, so customers and staff share session machinery and differ only in proof
- [x] SMS provider integrated: **BulkSMSBD** (D7 answered). The gateway answers HTTP 200
      whatever happened and puts the verdict in `response_code`, so the transport checks the
      body — trusting the status alone would file "no balance" and "bad number" as delivered
- [x] OTP request, verify, resend, with rate limiting and expiry
- [x] Sessions

The numbers, all in `lib/otp-rules.ts` and covered by tests: six digits, five-minute expiry,
five wrong guesses before the challenge dies (1 in 200,000), 60-second resend cooldown, five
codes per number per hour, twenty per IP per hour. Issuing a new code kills the previous one —
two live codes for one number doubles an attacker's chances and helps nobody. Codes are stored
only as argon2 hashes, so a database leak is not a pile of working sign-ins, and every failure
gives the *same* message: distinguishing "wrong" from "expired" tells an attacker which half
to fix.

**Done when:** a new phone number can sign up, sign out, and sign back in. *Verified* against
the console transport: an unknown number received a code, a wrong code was refused without
losing the code step, the right one created the account and signed in, and a second sign-in
reused the same account rather than duplicating it.

### M2.2 — Auth UI · M — **DONE**
- [x] Sign-in screen in design-system components — two steps on one screen, number then code,
      so a wrong code does not throw the customer back to the start and make them sit out the
      resend cooldown
- [x] Header reflects signed-in state ("Sign in" becomes "My account")
- [x] Protected routes and post-login redirect — `/account` sends a stranger to
      `/signin?next=/account` and lands them back where they meant to go

### M2.3 — Account wired to real data · M — **DONE**
- [x] Requests tab from the DB, scoped by **user id** — never by phone or anything from a
      URL. This is the one page where a scoping mistake shows one customer another's trip
- [x] Empty states that say why, not just "nothing here". The bookings tab admits instant
      booking is not switched on yet rather than implying the customer has simply not booked
      anything; the requests tab explains what a request is and offers to start one
- [x] Link past requests on sign-in by matching phone. Someone who asked for a quote in March
      and signs in for the first time in June finds it waiting. Matching on the number they
      have just proved they control claims nothing they had not already demonstrated

Bookings stay placeholder because there is nothing to book — instant booking and payment are
Phase 3 — and the profile form is inert until M2.4, which is where the identity fields get
encrypted. Both say so on screen rather than looking broken.

**Verified** in a browser: two requests were submitted anonymously from different numbers,
then one number signed in for the first time — its request was waiting on the account, the
other number's was not, the identity was the real customer rather than the design system's
Nusrat Jahan, and the price column said "Quote pending" rather than inventing a figure.

### M2.4 — Profile · M — **DONE**
- [x] Edit name, email, NID/passport
- [x] Encrypt NID/passport at rest, and keep it out of logs. AES-256-GCM in
      `lib/field-crypto.ts`, stored as `v1.iv.tag.ciphertext` so a future key rotation can be
      told apart from corruption
- [x] Notification preferences persisted. Booking updates default on because they are
      transactional; marketing defaults off, which is the only defensible default for
      something nobody opted into

**Why encryption rather than "the database is private":** an NID or passport number cannot be
reissued the way a password can. A dump, a backup on a laptop, or a read-only replica must
leak ciphertext, not identity documents. Consequences, deliberately accepted:

- **A missing key fails the save** instead of quietly storing the document in clear
- **A wrong key returns null**, never a guess — GCM authenticates, so tampering is detected
- **Ciphertext differs every time**, so equal documents are not obvious from the column alone
- **The plaintext never leaves the server.** The page shows `••••3456`; the form field comes
  back empty and takes a new value to replace it
- **Lose the key and those fields are gone.** Nothing else can recover them — noted in
  `.env.example` next to the generator command

**Done when:** profile edits survive a sign-out, and the identity fields are encrypted in the
DB. *Verified* in a browser: name, email, document and both marketing switches were saved,
the column was read directly and contained versioned ciphertext with no trace of the document,
then a full sign-out and sign-in showed everything still there and the document still masked.

This pass found the third form gap in the ported design system: `Switch` renders a
`<span role="switch">` and submitted nothing at all, so every notification choice was silently
lost. Same fix as `Button` and `Input` before it.

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
