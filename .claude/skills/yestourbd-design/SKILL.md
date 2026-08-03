---
name: yestourbd-design
description: Use this skill to generate well-branded interfaces and assets for YesTourBD, either for production or throwaway prototypes/mocks. Contains the brand contract, colour/type/spacing tokens, the ported React component library, and the responsive rules. Invoke before designing or building any new YesTourBD screen, component or marketing asset.
user-invocable: true
---

# YesTourBD design

Synced from the Claude Design project `fa383159-158a-4964-b64e-77c4f9b5bd7c`. The upstream
skill assumed the whole design system sat inside the skill folder; in this repo it is split
between a reference mirror and a live component library, so the paths below are the ones
that matter.

## Read first

**`design-system/readme.md`** is the brand contract — read it before designing anything. It
covers the booking-mode split, copy rules, colour, type, spacing, elevation, motion,
interaction states and iconography.

The single most important rule in it: **every service is either instant or request-based,
and the UI must say which.**

| Mode | Accent | Badge | CTA |
|---|---|---|---|
| Instant — fixed availability | teal | `<Badge tone="teal">Instant</Badge>` | **Book now** |
| Request — human quotation | navy | `<Badge tone="brand" variant="outline">` | **Request a quote** |

## Building in this repo

Import components from the barrel, never from internals:

```jsx
import { Button, Card, Badge, Icon } from '@/components/index.js';
```

All 15 components are ported and typed — `Button`, `IconButton`, `Input`, `Select`,
`Checkbox`, `Radio`, `Switch`, `Card`, `Badge`, `Tag`, `Tabs`, `Dialog`, `Toast`, `Tooltip`,
`Icon`. Each has a sibling `.d.ts` so prop enums are enforced at compile time, and a
`design-system/components/**/<Name>.prompt.md` explaining when to reach for it over its
neighbour.

**Tokens.** Reference the semantic aliases (`--color-brand-primary`, `--color-text-secondary`,
`--color-border`), never the raw scales (`--navy-800`, `--gray-600`). Defined in
`design-system/tokens/`, imported into the app by `app/globals.css`.

**Where styles go.** Inline `style={{…}}` cannot express a media query, so:

- colour, type, spacing, radius, shadow, hover/focus state → inline on the component
- anything that changes at a breakpoint → a CSS Module

Shared layout primitives are in `styles/layout.module.css` (`.container`, `.section`,
`.grid2/3/4`) and `components/screens/screens.module.css`. Mobile-first, breakpoints
**640 / 900 / 1100**. Never write a fixed desktop grid like `repeat(4,1fr)` in an inline
style, and always use `minmax(0, 1fr)` rather than `1fr` — a `1fr` track has an `auto`
minimum and nowrap content will push it past the viewport.

**Icons** come from `components/foundation/Icon.jsx`, which wraps an explicit lucide-react
registry. A name that is not registered renders nothing and warns in dev — add it to
`REGISTRY` rather than working around it.

## Writing copy

`design-system/readme.md` has a full CONTENT FUNDAMENTALS section. The rules that get broken
most often:

- Sentence case everywhere — headings, buttons, labels, nav. Never Title Case.
- Buttons are verb-first and specific: **Book now**, **Send request**, **Pay ৳3,400**. Never
  "Submit", "Continue" or "Learn more".
- `৳3,200` with the taka sign and comma grouping; `12–14 Mar` with an en dash; `12 Mar 2026`
  day-first, never `03/12/26`.
- Booking refs in the mono font, fixed shape: `YTB-8H2K41`, `REQ-2261`.
- **No emoji.** Anywhere. Unicode is limited to `৳ – · → ×` and the curly apostrophe.
- Say the awkward part out loud — "Awaiting quotation", "Quote pending".

## Prototypes vs production

For throwaway mocks, copy assets out and build static HTML that links
`design-system/styles.css`; that gives you every token without the React layer.

For production, build from `components/` and follow the responsive rules above.

`design-system/ui_kits/` holds the reference recreations of the customer site and the admin
panel. They fake their data and cut corners on behaviour — read them to see how components
compose into real screens, don't copy them wholesale.

## Flagged substitutions

Carried over from the upstream readme and still true:

- Fonts are Google Fonts stand-ins (Poppins, Public Sans, Lora, IBM Plex Mono). Self-hosted
  via `next/font` here. Keep Noto Sans Bengali in every stack — it is what renders `৳`.
- Icons are Lucide; no brand icon set was supplied.
- `design-system/assets/logo-mark.png` is a crop of the supplied JPEG. There is no vector or
  reverse-colour logo yet.
- UI-kit imagery is remote Unsplash placeholder photography.

If the user invokes this skill with no other guidance, ask what they want to build, ask a
couple of clarifying questions, then act as an expert designer — outputting HTML artifacts
or production code depending on the need.
