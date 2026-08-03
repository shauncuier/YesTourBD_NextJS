# YesTourBD

All-in-one travel marketplace for Bangladesh — hotels, houseboats, ship and air tickets you
can confirm right now, plus corporate tours, custom packages and visa help handled by a
coordinator.

**Status: front-end only.** The design language, component library and five customer screens
are real, responsive and tested. Everything behind them — database, API, accounts, payments,
admin — does not exist yet, and all content is hard-coded in `lib/site-data.js`. See
[docs/STATUS.md](docs/STATUS.md) before estimating anything.

---

## Quick start

Requires **Node ≥ 20.9** (Next 16's floor; CI runs 22 and 24).

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server, Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint, flat config |
| `npm run typecheck` | `next typegen`, then `tsc --noEmit` |
| `npm test` | Vitest once (`test:watch` to watch) |

There is no `.env` and nothing to configure — the app has no backend yet.

## Routes

| Route | Screen |
|---|---|
| `/` | Home — hero search, 12-service grid, popular listings, offers, reviews |
| `/search` | Search results — filter rail, list / grid / map toggle, sort |
| `/tours/[slug]` | Detail — gallery, content tabs, booking panel, confirm dialog |
| `/request` | Quote request form for the request-based services |
| `/account` | Bookings, requests and profile |
| `/tickets`, `/guides` | Aliases the UI kit never designed; they render Search and Home |

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
