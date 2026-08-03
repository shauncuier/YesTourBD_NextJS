# Implementation status

What exists in this repo today, measured against [REQUIREMENTS.md](./REQUIREMENTS.md).
Last verified: 3 Aug 2026, against a passing `npm run build` and a browser walkthrough of
every route.

## Summary

The repo is a **static front-end shell**. The design language, component library and five
customer-facing screens are real and working. Everything behind them — data, accounts,
payments, admin — does not exist yet. No database, no API routes, no auth, no server state
of any kind. All content is hard-coded in `lib/site-data.js`.

Two gaps were structural rather than "not started yet", and they are called out in full
below. The first — **the site is desktop-only** — was closed in Phase 0; the site is now
responsive, keyboard-usable and free of horizontal scroll on every route, with two residual
items (no mobile artboards, and three brand tokens below WCAG AA contrast) noted there. The
second stands: **four of the six instant-booking services need integrations the business may
not be able to operate**.

## Built

| Area | State |
|---|---|
| Design tokens | 133 custom properties wired into the app from `design-system/tokens/` |
| Component library | 15 components (`components/index.js`), ported from the design system |
| Fonts | Poppins / Public Sans / Lora / IBM Plex Mono / Noto Sans Bengali, self-hosted via `next/font` |
| Home page | Hero + search widget, 12-service grid, popular listings, offer band, trust strip, reviews, blog teasers |
| Search page | Navy search band, sticky filter rail, list / grid / map toggle, sort tabs, removable chips |
| Detail page | Gallery, five content tabs, sticky booking panel, guest stepper, confirm dialog, success toast |
| Request page | Five request types, three-step form, "what happens next" rail. **Submits for real**: validated server-side, rate-limited, persisted, and the toast shows the reference the database issued |
| Account page | Upcoming / past / requests tabs, booking rows, profile form, notification switches |
| WhatsApp + call dock | Fixed bottom-right, present on every page |
| SEO basics | Per-route `<title>` and description; 15 routes prerendered as static HTML |
| Responsive layer | CSS Modules, mobile-first, breakpoints 640 / 900 / 1100 (`styles/layout.module.css`, `components/site/chrome.module.css`, `components/screens/screens.module.css`) |
| Tests | Vitest + React Testing Library, 20 tests: component behaviour, one smoke test per screen, and the keyboard/focus contracts in `test/keyboard.test.tsx` |
| CI | GitHub Actions: lint, typecheck, test and build on every push to `main` and every PR, on Node 22 and 24 |

## Not built

Nothing in this section is started. Ordered roughly by how much else depends on it.

### Foundation

| Requirement | Notes |
|---|---|
| Database + schema | **Started (M1.1).** Postgres via Prisma 7; `User` and `Service` tables migrated and the twelve services seeded; `/` reads the catalogue from the database. Every other table in the sketch is still unbuilt |
| API layer | **Started (M1.2).** One server action: `/request` validates with Zod, rate-limits and persists a `QuoteRequest`. No route handlers yet |
| Auth / user accounts | "Sign in" is a link to `/account`; the account page shows a hard-coded customer |
| Payment integration | The confirm dialog's "Pay ৳6,520" sets a React state flag and nothing else |
| Media storage | Every image is a remote Unsplash URL |

### Customer-facing

| Requirement | Notes |
|---|---|
| Real search + filters | The filter rail renders but is not wired; results are a fixed array of 6 |
| Booking history | Three hard-coded bookings |
| Contact & support page | No route |
| Photo gallery | The detail page's "+14 photos" button is inert |
| Blog / travel guides | `/guides` renders the home page as a stub |
| Promotional offers | The offer band is static; no promo code engine |
| Reviews & testimonials | Three hard-coded reviews; no submission path |
| Service landing pages | Twelve services, no per-service page — tiles link to `/search` or `/request` |

### Admin

The entire admin panel — all eleven areas. The design system contains an admin UI kit
(`ui_kits/admin/`: dashboard, bookings, request queue, service catalogue) that was **not**
ported; it is still only in the remote Claude Design project and can be pulled with
DesignSync when the backend is ready to support it.

## Structural gap 1 — the site is desktop-only — **CLOSED in Phase 0**

> **Resolved.** Approach (1) below was taken: layout moved to CSS Modules, mobile-first, with
> breakpoints at 640 / 900 / 1100. All 7 routes reflow and none scrolls horizontally at 360px
> — measured, per width, not eyeballed. The fixed contact dock no longer covers any control.
> A keyboard pass fixed four real defects (focus ring, filter sheet, `Dialog`, header nav).
> Lighthouse mobile: accessibility 96 on every route, performance 79–85 against the ≥ 90 gate
> — the shortfall is placeholder imagery, tracked as M0.10 in MILESTONES.md.
>
> Two things the phase did **not** resolve. The mobile layouts were decided in code rather
> than designed: there are still no mobile artboards, so decision **D4** stands and the
> client has not signed off on what each screen becomes on a phone. And three brand tokens
> fail WCAG AA for small text (**D9**) — the only accessibility failure left, and a Design
> project change rather than a repo one.
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

On a phone these do not reflow; they overflow or crush. The header nav has no mobile
treatment either — five links, a phone number and a button on one 72px row.

This is not an oversight in the port. The design system's UI kit was authored as fixed
desktop artboards (1280×760 for the website, 1440×820 for admin), and its components style
themselves with inline `style={{…}}`. **Inline styles cannot express a media query at all** —
so responsiveness cannot be retrofitted by editing values. It needs a mechanism change.

Three viable approaches, in my order of preference:

1. **Move layout to CSS Modules / a stylesheet, keep tokens.** Components keep their inline
   token-driven styling for colour, type and spacing; the page-level grids move to real CSS
   classes with breakpoints. Most faithful to the design system, and the layout code is the
   part that actually needs breakpoints.
2. **Container queries.** Fits a component library well and avoids viewport coupling, but
   still needs a stylesheet — same mechanism change as (1), with a steeper learning curve.
3. **A `useMediaQuery` hook driving inline styles.** Keeps everything in JS, but costs a
   hydration mismatch risk and re-renders on resize, and puts breakpoints in fifteen
   different files. Least attractive of the three.

Whichever route is chosen, the mobile layouts themselves are **undesigned** — the design
system has no mobile artboards. Someone has to decide what the search widget, the filter
rail, the result row and the booking panel become on a 390px screen. That is a design task
before it is an engineering one.

## Structural gap 2 — instant booking needs integrations

The brief classes six services as instant. Four of them cannot be made genuinely instant
without third-party inventory:

| Service | What instant booking actually requires |
|---|---|
| Air tickets | A GDS or consolidator (Amadeus / Sabre / Travelport), or an airline aggregator |
| Bus tickets | Per-operator APIs or a local aggregator |
| Saint Martin ship | Operator APIs (Karnaphuli, Bay One, Keari Sindbad) — these are typically phone/agent bookings in practice |
| Hotels | Either owned contracted inventory, or a bed bank / channel manager |

Two are genuinely feasible in-house because YesTourBD controls the inventory: **houseboat
day tours** and **Radiant Fish World tickets**. Marine Drive tours likewise, if confirmed as
a fixed-departure product.

The brief already supplies the answer to this: *"If a feature is too complex or not practical
for the initial version, it should be implemented as an informative page with a
request/quotation form."* Applying that rule shrinks v1 enormously. See
[ARCHITECTURE.md](./ARCHITECTURE.md#booking-mode-per-service-v1) for the concrete proposal.

Note the knock-on: `lib/site-data.js` currently marks air, bus and ship as `mode: 'instant'`,
which paints teal "Book now" CTAs on services that would be request-based in that v1. That
data needs to change with the decision — it is a one-line edit per service, but it changes
what the homepage promises.

## Known cosmetic issue

The `/request` hero badge stretches to full width instead of hugging its text. The design
system's source omits `alignSelf: 'flex-start'` there, where the home hero includes it. Left
faithful to the source pending a call; it is a one-line fix in
`components/screens/RequestScreen.jsx`.
