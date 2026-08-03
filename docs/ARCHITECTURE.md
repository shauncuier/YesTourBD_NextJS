# Proposed architecture

Nothing here is built yet — see [STATUS.md](./STATUS.md). This is a proposal for the parts
the brief requires and the repo does not have. Decisions marked **[decide]** need a human
before anyone writes code against them.

Guiding constraint, from the brief: *simplicity, reliability and ease of use rather than
unnecessary complexity*, and *easy to maintain and update*. That pushes consistently toward
one deployable, one database, and one team's worth of surface area — not microservices.

## Booking mode per service (v1)

The brief's fallback rule — *"if a feature is too complex or not practical for the initial
version, it should be implemented as an informative page with a request/quotation form"* —
resolves most of the scope question by itself. Applied:

| Service | Brief's mode | **Proposed v1** | Why |
|---|---|---|---|
| Houseboat day tour | Instant | **Instant** | YesTourBD controls the boat and the manifest |
| Radiant Fish World | Instant | **Instant** | Fixed-price entry ticket, own allocation |
| Marine Drive tour | Instant | **Instant** | Fixed departure, own vehicles |
| Hotel & resort | Instant | **Request** → instant later | Needs contracted inventory or a bed bank |
| Saint Martin ship | Instant | **Request** | Operators book by phone/agent in practice |
| Air ticket | Instant | **Request** | Needs a GDS/consolidator contract |
| Bus ticket | Instant | **Request** | Needs per-operator APIs |
| Houseboat tour (multi-day) | Instant | **Request** | Itinerary varies |
| Rent a car | Request | **Request** | Unchanged |
| Package tour | Request | **Request** | Unchanged |
| Corporate & events | Request | **Request** | Unchanged |
| Visa assistance | Request | **Request** | Unchanged |

Three genuinely instant services in v1, nine request-based. That is a shippable product with
one payment integration and one operational workflow, and it is honest with customers —
which the design system's own copy rules already insist on.

**[decide]** This is a material narrowing of what the brief's service table implies. If the
business already has hotel contracts or a consolidator relationship, move those rows back to
instant and the plan below absorbs it without restructuring.

## Stack

| Layer | Proposal | Reasoning |
|---|---|---|
| App | Next.js 16 App Router (already here) | One deployable serves marketing, booking, account and admin. Server Components keep the public pages static and fast, which is the SEO and speed requirement. |
| API | Route handlers + server actions in the same app | No separate API service to operate. Revisit if a mobile app is ever built. |
| Database | PostgreSQL | Bookings and payments are relational and need real transactions. |
| ORM | **Prisma 7** (decided, D5) | Migration ergonomics while the schema churns. Note v7 configures from `prisma.config.ts` and requires the `@prisma/adapter-pg` driver adapter. |
| Auth | Auth.js, phone-OTP primary | Bangladesh is a phone-first market. Email as secondary. |
| Payments | SSLCommerz | One integration covers bKash, Nagad, and cards — which is exactly the set the design system's footer and checkout copy already promise. |
| Media | S3-compatible object storage (e.g. Cloudflare R2) + `next/image` | Replaces the Unsplash placeholders; `next/image` gets the performance requirement mostly for free. |
| Transactional messaging | Email for vouchers/quotations; SMS for OTP | WhatsApp is a human channel here, not automated. |
| Hosting | **Vercel + Neon Postgres** (decided, D6) | Least-friction fit for Next 16, and Neon's branching gives each preview deploy its own database. |

Admin lives at `/admin` inside the same app behind a role guard, reusing the same component
library. The design system already contains an admin UI kit to port when the backend exists.

## TypeScript 7

**Decision: stay on TypeScript 5.x for now.** Evaluated 3 Aug 2026 against the
[TS 7.0 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).

TypeScript 7 is GA (`typescript@7.0.2` is npm latest) and is a Go rewrite claiming 8–12×
faster checking. Next.js is not the obstacle — 16.2.12 already ships
`experimental.useTypeScriptCli`, which runs the project-local `tsc` binary instead of the
JS compiler API that TS 7 dropped. Verified in `node_modules/next/dist/docs/`.

The blocker is **typescript-eslint**. Its latest release — 8.65.0, which this project
already has — declares:

```
"peerDependencies": { "typescript": ">=4.8.4 <6.1.0" }
```

It does not support TS 6, let alone 7, and it reads the JS compiler API that TS 7 removes.
There is no newer version to move to. Installing TS 7 today gives a working `next build`
and a broken `npm run lint`.

Two smaller costs also apply:

- The `plugins: [{ "name": "next" }]` language-service plugin in `tsconfig.json` needs the
  same JS API, so editor route-type IntelliSense would go dark.
- This project is on 5.9.3, so it is a two-major jump (5 → 6 → 7); the official migration
  guide only covers 6 → 7.

The upside is small at this size — the current `next build` spends about 15s in TypeScript
across ~30 source files. Not worth trading `npm run lint` for.

**Revisit when** typescript-eslint publishes a release whose `typescript` peer range admits
7.x. Then:

1. `npm i -D typescript@^7 typescript-eslint@<version that supports it>`
2. Set `experimental.useTypeScriptCli: true` in `next.config.ts`
3. `tsconfig.json` — TS 7 changes defaults: `types` now defaults to `[]`, so list them
   explicitly (`["node", "react", "react-dom"]`); `strict` and `module: esnext` become
   defaults; `rootDir` defaults to `./`. This project uses no `baseUrl`, no `target: es5`,
   no `downlevelIteration` and no `moduleResolution: node`, so none of the *removed*
   options apply.
4. Confirm the Next language-service plugin works, or drop it.
5. `npm run build && npm run lint && npx tsc --noEmit` must all pass.

## Data model sketch

Enough to show the shape; not a schema.

```
User            id, phone, email, name, nid_passport, role, created_at
Service         id, slug, name, icon, mode(instant|request), summary, active
Listing         id, service_id, slug, title, place, description, base_price, rating, active
ListingMedia    id, listing_id, url, alt, sort
Departure       id, listing_id, date, capacity, seats_taken, price_override
                  -- instant services only: the availability source of truth

Booking         id, ref(YTB-XXXXXX), user_id, listing_id, departure_id, pax,
                  unit_price, fee, total, status, created_at
Payment         id, booking_id, gateway, gateway_txn_id, amount, status, raw_payload
Voucher         id, booking_id, url, issued_at

QuoteRequest    id, ref(REQ-XXXX), user_id, request_type, destinations, pax_band,
                  start_date, nights, budget_band, org, notes, contact_pref, status
Quotation       id, request_id, line_items(json), total, valid_until, sent_at, accepted_at
                  -- accepted quotation converts to a Booking

Review          id, user_id, listing_id, rating, body, status(pending|published)
Post            id, slug, title, category, body, hero_url, read_minutes, published_at
Offer           id, code, description, discount, service_ids, starts_at, ends_at, active
Banner          id, placement, image_url, headline, cta_label, cta_href, sort, active
```

Two things worth noting. `Departure` is the whole instant/request distinction in one table —
services with departures can be booked instantly; services without can only be requested.
And `Quotation` converting into a `Booking` is what makes the admin's request pipeline and
the customer's booking history the same story rather than two disconnected lists.

Booking and request reference formats (`YTB-8H2K41`, `REQ-2261`) are fixed by the design
system's content rules and are already used in the UI.

## Request pipeline

The state machine behind nine of twelve services, so it deserves to be explicit:

```
submitted → reviewing → quoted → negotiating → accepted → booked
                            ↘ expired
                            ↘ lost
```

The customer sees a simplified view of this — the design system's account screen shows
"Awaiting quotation" and "Quote pending". The brief's promise of a reply within two working
hours is an operational SLA, so the admin queue needs sort-by-age and an overdue indicator
or the promise is unenforceable.

## Security notes

- Payment callbacks from SSLCommerz must be verified server-side against the gateway's
  validation API. Never trust a client-side success redirect to mark a booking paid.
- NID / passport numbers are stored for ship and air bookings. Encrypt at rest, restrict to
  staff roles that need them, and keep them out of logs and analytics.
- Admin is a role check on every route handler, not only on the UI. Staff roles per the
  brief's "User & Staff Management" area.
- Rate-limit OTP requests and the public quote form.

## Suggested phasing

Ordered so each phase is independently shippable and the riskiest unknowns surface early.

**Phase 0 — make it responsive.** Before adding features. Resolve the mechanism question in
[STATUS.md](./STATUS.md#structural-gap-1--the-site-is-desktop-only), get mobile layouts
designed, and apply them across the five screens. Everything built after this inherits the
fix; everything built before it has to be redone.

**Phase 1 — request-based booking, end to end.** Database, quote form persistence, admin
request queue, quotation send, email. Covers nine of twelve services and needs no payment
gateway. This is the smallest thing that is genuinely useful to the business.

**Phase 2 — accounts.** Phone OTP, booking/request history, profile. Turns the account
screen real.

**Phase 3 — instant booking.** Departures and inventory for the three owned services,
SSLCommerz, vouchers, refunds. The first phase that touches money.

**Phase 4 — content.** Blog, service landing pages, contact/support page, gallery, offers,
banners, reviews, and the CMS-ish admin areas behind them. Mostly SEO surface area.

**Phase 5 — expand instant.** Hotel contracts or a bed bank; revisit ship/air/bus if the
commercial relationships land. This is where the brief's original service table gets fully
honoured.
