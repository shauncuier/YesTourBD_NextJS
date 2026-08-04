# Implementation status

What exists in this repo today, measured against [REQUIREMENTS.md](./REQUIREMENTS.md).

**Last verified: 4 Aug 2026** — against a passing `npm run build`, 137 tests, and browser
walkthroughs of every flow described below (not screenshots; scripted checks against the built
app and a real database).

## Summary

Phases 0, 1 and 2 of [MILESTONES.md](./MILESTONES.md) are complete, with two things waiting on
credentials rather than code.

The repo is no longer a front-end shell. A customer can ask for a quote, follow it without an
account, sign in with a phone code, and see their own history; staff can sign in, work a queue
against a two-working-hour SLA, move a request through a pipeline with an audit trail, and
send an itemised quotation. Postgres, Auth.js, server actions, encryption at rest and CI all
exist.

**The one thing that does not work end to end is delivery.** Emails and SMS are composed,
triggered and recorded, but nothing leaves the building without provider keys — see
[Waiting on you](#waiting-on-you).

Everything to do with **money is unbuilt**: no payments, no bookings, no vouchers. That is
Phase 3 and it needs an SSLCommerz merchant account (**D8**).

## Where the code lives

| | |
|---|---|
| Branch | `main`, pushed to `github.com/shauncuier/YesTourBD_NextJS` |
| CI | GitHub Actions on every push and PR: lint, typecheck, test, build, on Node 22 and 24, against a real `postgres:17` service container |
| Tests | 137, `npm test` |
| Local database | `npx prisma dev` (local Postgres, no Docker). It has wedged mid-session a few times with "Connection terminated unexpectedly" — `npx prisma dev stop yestourbd` then `npx prisma dev -d -n yestourbd` fixes it and the data survives |
| Sample data | `npm run db:seed:dev` — staff, customers and requests spread across the pipeline (`-- --clean` removes them) |

**A running dev server never picks up a regenerated Prisma client.** After any migration,
stop it, `Remove-Item -Recurse -Force .next`, and start again. `npm run dev` runs
`prisma generate` first, which covers generation but not a process already running. Two
separate debugging sessions were lost to this.

## Built

| Area | State |
|---|---|
| Design tokens | 133 custom properties wired in from `design-system/tokens/` |
| Component library | 15 components (`components/index.js`), ported from the design system |
| Responsive layer | CSS Modules, mobile-first, breakpoints 640 / 900 / 1100. No route scrolls horizontally at 360px |
| Home page | Hero, 12-service grid **read from the database**, listings, offers, reviews, blog teasers |
| Search page | Renders; filters and results are **not** wired to data |
| Detail page | Gallery, tabs, booking panel, confirm dialog — all still placeholder data |
| Request page | Submits for real: Zod validation server-side, rate-limited, persisted, `REQ-XXXX` from a Postgres sequence |
| Request tracking | `/track` — reference **plus** the mobile used; shows the itemised quotation; accept or ask for changes. No account needed |
| Contact & support | `/contact` — methods, hours, and a form that files into the **same** request queue with its own reference and SLA. No map: there is no real address yet |
| Customer sign-in | `/signin` — phone + six-digit code (Auth.js `phone-otp`), argon2-hashed codes, expiry, attempt cap, resend cooldown, per-phone and per-IP limits |
| Account | Requests tab reads the customer's own rows, including ones sent before the account existed; profile editable (name, email, notification choices, NID/passport **encrypted at rest**). Bookings remain placeholder and say why |
| Staff sign-in | `/admin/login` — email + password, argon2id, 8-hour JWT sessions. Accounts via `npm run staff:create`; no credentials in the repo |
| Admin shell | Ported from the design system's admin kit; 244px rail becomes a drawer below 900px. Unbuilt sections name the milestone that brings them instead of 404ing |
| Request queue | `/admin/requests` — status filters, sort, search by ref/name/phone, overdue flag against the SLA, all driven by the URL |
| Request pipeline | Detail page: claim, move through statuses, internal notes, **append-only audit trail** of who did what |
| Quotation builder | Itemised lines, live totals, discount, deposit split, expiry. Revising supersedes rather than edits |
| Email | Three templates (acknowledgement, desk notification, quotation), every attempt recorded in `email_messages`. **Not delivered** — no provider key |
| SMS | BulkSMSBD wired, `Your YesTourBD OTP is …` per the gateway's required format, recorded in `sms_messages` |
| Encryption at rest | AES-256-GCM for identity documents (`lib/field-crypto.ts`) |
| Search-engine metadata | Generated `robots.txt` and `sitemap.xml`, a self-referencing canonical on every route, Open Graph and Twitter cards, and JSON-LD for the business and each listing. Only the production deployment is crawlable; preview serves `Disallow: /` and `noindex`. **Needs the real domain** — see below |
| CI | lint, typecheck, test, build on Node 22 and 24 with a real Postgres |

## Not built

Ordered by how much else depends on it.

### Money — the whole of Phase 3

| Requirement | Notes |
|---|---|
| Payments | Nothing. The detail page's "Pay ৳6,520" still sets a React flag. Needs **D8** (SSLCommerz merchant account) |
| Bookings | No `Booking`, `Departure`, `Payment` or `Voucher` tables. An accepted quotation records intent and stops there |
| Instant availability | No inventory, no departures, no seat counts — see [structural gap 2](#structural-gap-2--instant-booking-needs-integrations) |
| Refunds / cancellations | Not started |

### Customer-facing

| Requirement | Notes |
|---|---|
| Real search + filters | The rail renders but is not wired; results are a fixed array of 6 |
| Media storage | Every image is still a remote Unsplash URL, now served through `next/image` (AVIF, per-breakpoint sizing). Lighthouse performance is 80–94; `/`, `/guides` and `/search` remain under the 90 gate, and the cause is client-side hydration rather than bytes — see M0.10 |
| Service landing pages | Twelve services, no per-service page — tiles link to `/search` or `/request` |
| Blog / travel guides | `/guides` renders the home page as a stub. It now canonicalises to `/` and is kept out of the sitemap, so it is not competing with the home page while it waits for M4.3 |
| Photo gallery | The detail page's "+14 photos" button is inert |
| Reviews, offers | Hard-coded; no submission path, no promo engine |

### Admin

Everything past the request pipeline. `DashboardScreen`, `BookingsScreen` and `ServicesScreen`
exist in the remote Claude Design project and can be pulled with DesignSync as their
milestones land. Customers, payments, reports, banners, blog, offers and staff management are
all placeholder pages naming their milestone.

## Waiting on you

Nothing below is blocked on engineering.

| # | Needed | Unblocks |
|---|---|---|
| — | **Email provider key** (`RESEND_API_KEY`) | Customers actually receive acknowledgements and quotations. Everything else is done |
| — | **A live SMS test** — one message to a number you name | Confirms BulkSMSBD end to end. Never attempted: development refuses to send |
| **D8** | SSLCommerz merchant account | All of Phase 3 |
| **D4** | Sign-off on mobile layouts | They were decided in code; no artboards exist |
| **D9** | Three brand tokens fail WCAG AA for small text | The only accessibility failure left. A Design project change, not a repo one |
| **D2** | Whether hotel inventory exists today | `lib/site-data.js` still marks air, bus and ship `instant`, painting "Book now" on services that would be request-based |
| — | **Real photography** | The last of M0.10. The image pipeline itself is done |
| — | **The production domain** | Set `NEXT_PUBLIC_SITE_URL`, or deploy to the production Vercel project, which supplies it. Every canonical and sitemap URL follows from it; until then they all read `http://localhost:3000` and the sitemap cannot be submitted to Search Console |

Two housekeeping notes: the BulkSMSBD API key was pasted into a chat transcript, so rotate it
when convenient; and `STAFF_PASSWORD` in `.env` must be at least 12 characters or
`npm run staff:create` refuses it.

## Structural gap 1 — the site is desktop-only — **CLOSED in Phase 0**

> **Resolved.** Layout moved to CSS Modules, mobile-first, breakpoints 640 / 900 / 1100. All 7
> routes reflow and none scrolls horizontally at 360px — measured per width, not eyeballed.
> The fixed contact dock no longer covers any control. A keyboard pass fixed four real
> defects. Lighthouse mobile: accessibility 96 everywhere; performance 79–85 against the ≥ 90
> gate, the shortfall being placeholder imagery (M0.10).
>
> Two things it did **not** resolve: mobile layouts were decided in code rather than designed
> (**D4**), and three brand tokens fail WCAG AA (**D9**).
>
> The rest of this section is the original finding, kept because it explains why the fix had
> to be a mechanism change rather than an edit.

**This was the largest single gap, and it contradicted the brief's first two feature bullets
("modern and responsive design", "mobile-first user experience") and its first development
requirement ("fully responsive on mobile, tablet and desktop").**

Verified by inspection at the time: there were **zero `@media` queries** anywhere in `app/`,
`components/` or `lib/`. Every layout grid hard-coded a desktop column count:

- `repeat(4,1fr)` — service grid, trust strip, detail-page fact tiles
- `repeat(3,1fr)` — listing grids, reviews, blog teasers, request-type picker
- `1.4fr 1fr 1fr .9fr auto` — the hero and search-band search widgets
- `260px 1fr 220px` — search result rows
- `260px 1fr` / `1fr 360px` / `1fr 320px` / `1fr 300px` — page shells with sticky rails
- `1.4fr 1fr 1fr 1fr` — footer

On a phone these do not reflow; they overflow or crush. The header nav had no mobile treatment
either — five links, a phone number and a button on one 72px row.

This was not an oversight in the port. The design system's UI kit was authored as fixed
desktop artboards (1280×760 for the website, 1440×820 for admin), and its components style
themselves with inline `style={{…}}`. **Inline styles cannot express a media query at all** —
so responsiveness could not be retrofitted by editing values. It needed a mechanism change,
which is what `styles/layout.module.css` and the `*.module.css` files beside each screen are.

## Structural gap 2 — instant booking needs integrations

The brief classes six services as instant. Four of them cannot be made genuinely instant
without third-party inventory:

| Service | What instant booking actually requires |
|---|---|
| Air tickets | A GDS or consolidator (Amadeus / Sabre / Travelport), or an airline aggregator |
| Bus tickets | Per-operator APIs or a local aggregator |
| Saint Martin ship | Operator APIs (Karnaphuli, Bay One, Keari Sindbad) — typically phone/agent bookings in practice |
| Hotels | Either owned contracted inventory, or a bed bank / channel manager |

Two are genuinely feasible in-house because YesTourBD controls the inventory: **houseboat day
tours** and **Radiant Fish World tickets**. Marine Drive tours likewise, if confirmed as a
fixed-departure product.

The brief already supplies the answer: *"If a feature is too complex or not practical for the
initial version, it should be implemented as an informative page with a request/quotation
form."* Applying that rule shrinks v1 enormously, and the request pipeline that would serve it
is now **built and working**. See
[ARCHITECTURE.md](./ARCHITECTURE.md#booking-mode-per-service-v1).

Knock-on, still outstanding: `lib/site-data.js` marks air, bus and ship as `mode: 'instant'`,
which paints teal "Book now" CTAs on services that would be request-based in that v1. One line
per service, but it changes what the homepage promises — blocked on **D2**.
