# YesTourBD Design System

**YesTourBD** is an all-in-one travel marketplace for Bangladesh — hotels and resorts, houseboat tours, Saint Martin ship tickets, Cox's Bazar day tours, Marine Drive trips, car rental (Chader Gari), Radiant Fish World tickets, air and bus tickets, package tours, corporate tours and events, and visa assistance — sold through one clean booking interface.

Two booking modes shape the whole product, and the design system encodes that split everywhere:

- **Instant booking** — fixed availability. Hotels, houseboats, ship/air/bus/attraction tickets. Teal accents, `Badge tone="teal"`, primary CTA reads **Book now**.
- **Request-based booking** — a quotation from a human. Corporate tours, group tours, events, visa assistance, custom packages, some car rentals. Navy accents, `Badge tone="brand" variant="outline"`, CTA reads **Request a quote**.

## Sources given

- `uploads/yestourbd logo.jpeg` — the only visual asset supplied (navy/teal "Y" roundel, wordmark, thin serif tagline, service icon row).
- A written requirements brief (services, website features, booking system, admin panel, development requirements).

No codebase, Figma file, screenshots, brand guide, or font files were provided. Colors are sampled from the logo; type, spacing, elevation and motion are authored from scratch to fit it. **Nothing here was recreated from an existing YesTourBD website — there was none to read.**

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | The single entry point consumers link — `@import` lines only |
| `tokens/colors.css` | Navy + teal scales, cool neutrals, gold/red semantics, role aliases, brand gradients |
| `tokens/typography.css` | Size ramp, weights, line heights, tracking |
| `tokens/spacing.css` | 4px-base scale + container widths |
| `tokens/radius-shadow.css` | Radii, border widths, elevation, easing + durations |
| `tokens/fonts.css` | Font-family tokens + the Google Fonts import |
| `guidelines/*.card.html` | 18 foundation specimen cards (Colors, Type, Spacing, Brand) |
| `assets/logo-full.jpeg` | The supplied lockup, unmodified |
| `assets/logo-mark.png` | Cropped roundel for small placements (a crop, not a redraw) |
| `components/foundation/` | `Icon` |
| `components/forms/` | `Button`, `IconButton`, `Input`, `Select`, `Checkbox`, `Radio`, `Switch` |
| `components/data-display/` | `Card`, `Badge`, `Tag` |
| `components/overlays/` | `Tabs`, `Dialog`, `Toast`, `Tooltip` |
| `ui_kits/website/` | Customer website — home, search, detail + booking, request a quote, account |
| `ui_kits/admin/` | Admin panel — dashboard, bookings, request pipeline, service catalogue |
| `SKILL.md` | Agent-skill entry point |

Each component ships `<Name>.jsx`, `<Name>.d.ts` (props contract) and `<Name>.prompt.md` (what/when + usage). Every component directory has a `@dsCard` HTML showing its real states.

### Intentional additions

- **`Icon`** — a thin wrapper over the CDN-hosted Lucide set. The brand had no icon system of its own and every other component needs a glyph API. See ICONOGRAPHY.

---

## Using this in your code

Two ways in, depending on what you're building.

### 1. Just the design language (any stack)

Copy `styles.css` plus the `tokens/` folder into your project and link it once. That gives you all 133 custom properties — colors, type, spacing, radii, shadows, motion — plus the webfont imports.

```html
<link rel="stylesheet" href="/styles.css">
```

```css
.booking-cta {
  background: var(--color-brand-primary);
  color: var(--color-text-inverse);
  font: var(--weight-semibold) var(--text-base) / 1 var(--font-body);
  padding: 10px 18px;
  border-radius: var(--radius-md);
  transition: background var(--duration-fast) var(--ease-standard);
}
.booking-cta:hover { background: var(--color-brand-primary-hover); }
```

Always reference the **semantic aliases** (`--color-brand-primary`, `--color-text-secondary`, `--color-border`) rather than the raw scales (`--navy-800`, `--gray-600`) — the aliases are the contract; the scales can be retuned.

### 2. The React components (React/Next.js)

Copy the `components/` folder in. Each component is a single self-contained `.jsx` with a named export, importing nothing but React and reading its styling from the CSS custom properties — no CSS-in-JS runtime, no npm dependencies, no build config.

```jsx
import { Button } from './components/forms/Button.jsx';
import { Card } from './components/data-display/Card.jsx';
import { Badge } from './components/data-display/Badge.jsx';

export function TourCard({ tour }) {
  return (
    <Card
      image={tour.photo}
      badge={<Badge tone="teal" variant="solid">Instant</Badge>}
      title={tour.name}
      subtitle={tour.summary}
      footer={<Button fullWidth>Book now</Button>}
      href={`/tours/${tour.slug}`}
    />
  );
}
```

Rename to `.tsx` if you use TypeScript — the sibling `.d.ts` files already describe every prop.

**Icons** need Lucide on the page; the `Icon` component reads it off `window`:

```html
<script src="https://unpkg.com/lucide@latest"></script>
```

In a bundled app, `npm i lucide` and assign it — `import * as lucide from 'lucide'; window.lucide = lucide;` — or swap `Icon.jsx`'s internals for `lucide-react`, keeping the same props.

### Before you ship

- **Self-host the fonts.** They currently come from the Google Fonts CDN because no brand font files were supplied. Keep `Noto Sans Bengali` in every stack — it's what renders `৳`.
- **Replace the imagery.** The UI kits use remote Unsplash photos as placeholders.
- **Replace the logo.** `assets/logo-mark.png` is a crop of the supplied JPEG; there's no vector or reverse version yet.
- Read CONTENT FUNDAMENTALS before writing any copy, and the interaction-states list before building a new control — those two sections are what keep new screens feeling like the same product.

### What the UI kits are for

`ui_kits/website/` and `ui_kits/admin/` are **reference recreations, not production code** — they fake their data and cut corners on behaviour. Read them to see how the components compose into real screens (search band, sticky booking panel, dense admin tables, quotation pipeline), then build your own screens from the primitives.

---

## CONTENT FUNDAMENTALS

The brief's own words set the tone: *"The focus should be on simplicity, reliability, and ease of use rather than unnecessary complexity."* Copy follows that literally — this is a market where travellers are used to phone-call marathons, unclear pricing and "inbox me" bookings. Every sentence should reduce suspicion.

**Voice.** Plainly competent, never salesy. We tell you what happens next and how long it takes. Confidence comes from specificity, not adjectives.

**Person.** Address the reader as **you**; the company is **we**. Never "the user", never "our valued customers", never third-person about ourselves ("YesTourBD offers…").

- ✅ "Tell us the trip. We'll send the quotation."
- ✅ "A coordinator will reply on WhatsApp within two working hours."
- ❌ "YesTourBD provides world-class travel solutions for discerning customers."

**Casing.** Sentence case everywhere — headings, buttons, labels, table headers, nav. The only uppercase is small tracked eyebrow labels (`--tracking-wider`, `--text-xs`) and promo codes (`EID25`). Title Case is never used.

**Numbers and money.** Always concrete. `৳3,200` with the taka sign and comma grouping; ranges as `12–14 Mar` with an en dash. Times as `9:00 AM – 5:30 PM`. Dates as `12 Mar 2026` (day first — the local convention), never `03/12/26`. Counts spelled out under ten in prose ("nine minutes", "two working hours") but numerals in UI ("2 adults", "34 pax").

**Booking references** use the mono font and a fixed shape: `YTB-8H2K41` for bookings, `REQ-2261` for requests. Never wrap them in prose without the mono treatment.

**Buttons** are verb-first and specific to the mode: **Book now**, **Search**, **Send request**, **Request a quote**, **Pay ৳3,400**, **Send quotation**, **Mark confirmed**. Not "Submit", not "Continue", not "Learn more". Destructive actions say what dies: **Cancel booking**, not "Delete".

**Headings** are short sentences with a full stop when they read as a claim, and no full stop when they're a label:

- "Book the whole trip, not just the ticket." (hero claim)
- "Twelve services, two ways to book" (section label)
- "Popular right now" (section label)

**Honesty markers** are a house style. Where a competitor would gloss, we state the awkward part: "Awaiting quotation", "Quote pending", "Bookings for 10 or more? Request a group quote instead — it's usually cheaper.", "Cancel within 48 hours and 50% of the fare is refunded." Blog titles carry the same flavour: *"Chader Gari to Sajek: costs, timings and the honest bits."*

**Bengali place names** keep their common English romanisation with the right punctuation: Cox's Bazar (curly apostrophe), Saint Martin (not St. Martin's), Teknaf, Tanguar Haor, Sreemangal, Chader Gari, Sajek, Bandarban. Service names from the brief are used verbatim as product names.

**Empty states** name the thing that will eventually be there, in one line, then offer one action: "Once a trip is over it moves here with its invoice and photos." Never "No data".

**Errors** say what to do next: "Your card was declined. Try another method." Never a code, never "Something went wrong".

**Emoji: never.** Not in UI, not in marketing copy, not in the admin panel. The brand's warmth comes from photography and plain speech. Unicode symbols are limited to `৳`, `–`, `·`, `→` and the curly apostrophe.

**Length.** Body paragraphs cap at roughly two sentences on marketing pages. Support lines under a heading are one line. If it needs three sentences, it belongs in a travel guide, not on a booking screen.

---

## VISUAL FOUNDATIONS

### Color

Everything derives from the two hues in the logo: a deep **navy** (`--navy-800 #072a52` as `--color-brand-primary`) and a **teal** sampled from the water strokes (`--teal-500 #00988b` as `--color-brand-secondary`). Navy is authority and chrome — dark bands, footers, sidebars, primary buttons, headings. Teal is action and confirmation — secondary buttons, active underlines, "Instant" badges, success states, links (`--color-link` is `--teal-700`).

Neutrals are **cool slate**, tinted toward the navy hue rather than pure gray, so surfaces never look dirty next to the brand blues. Page background is `--gray-50 #f7f9fb`, cards are pure white, sunken areas `--gray-100`.

Two accents sit outside the logo and are used sparingly:
- **Gold** (`--gold-500 #c8912c`) — promotions, star ratings, "Negotiating". Never for navigation or primary actions.
- **Red** (`--red-600 #a83530`), deliberately desaturated so it doesn't scream next to navy — cancellations, failures, destructive buttons.

Hard rules: at most two background colors per composition (a white/`--gray-50` field plus one navy band). Never a purple, never a blue-violet gradient. Never gold and teal as adjacent large fields.

### Typography

Four roles, all substituted from Google Fonts (see the flag below):

| Role | Family | Where |
| --- | --- | --- |
| Display | **Poppins** 500–800 | Headings, prices, KPI numbers, logo wordmark, nav labels at semibold |
| Body / UI | **Public Sans** 400–700 | Everything else: paragraphs, labels, table cells, buttons |
| Accent | **Lora** italic | The tagline, pull quotes, testimonials |
| Mono | **IBM Plex Mono** 500–600 | Booking refs, itinerary times, promo codes, phone numbers in tables |

Display type is set tight: `--tracking-tight (-0.02em)` and `--leading-tight (1.1)` at `--text-3xl` and up. Body copy runs `--leading-relaxed (1.65)` for prose and `--leading-normal (1.5)` in dense UI. Eyebrow labels are `--text-xs`, semibold, uppercase, `--tracking-wider (0.12em)`, in `--teal-600`. Body copy never goes below `--text-sm (14px)`; metadata may use `--text-xs (12px)` but never for anything a booking depends on.

Numbers in tables use `font-variant-numeric: tabular-nums` so columns align.

### Spacing and layout

A 4px base scale (`--space-1` … `--space-32`). Sections on the marketing site are separated by `--space-16 (64px)`; card interiors use `--space-5 (20px)`; form field gaps `--space-4 (16px)`; icon-to-label gaps 6–10px.

Content is capped at `--container-max: 1200px` for the site and `--container-narrow: 760px` for prose (request form intro, blog body). The admin panel is full-width with a fixed **244px** sidebar and `--space-8 (32px)` gutters.

Grids over inline flow, always: `display:grid` with `gap`. The service grid is 4 columns; listing grids 3; admin KPI rows 4; the request-type picker 3.

**Fixed elements.** The site header is sticky and translucent (see blur, below). The booking panel on a detail page and the filter rail on search are `position: sticky; top: 88px`. The WhatsApp + call dock is `position: fixed` bottom-right, 52px circles, `--shadow-lg`, always above content (`z-index: 50`) — it is the brand's single most important affordance in this market and never scrolls away. Toasts sit bottom-right above it. The admin sidebar is full-height and does not scroll with content; its top bar is sticky and translucent.

### Backgrounds

Three treatments, nothing else:

1. **Plain surface** — `--gray-50` page with white cards. The default for 90% of screens.
2. **Photographic hero with a protection gradient** — a full-bleed travel photo under `linear-gradient(180deg, rgba(5,30,61,.82), rgba(5,30,61,.62) 45%, #f7f9fb 100%)`. The gradient is navy-tinted, not black, and resolves into the page background so the hero has no hard edge. Text sits only in the top, darkest third.
3. **Solid navy or brand-gradient band** — `--navy-900`, `--gradient-dusk` (navy-900 → navy-700, vertical) or `--gradient-brand` (navy-700 → navy-600 → teal-500 at 135°) for footers, search bands, account headers and the offer band.

No repeating patterns, no textures, no grain, no noise overlays, no hand-drawn illustration. **No purple/violet gradients — the only gradients in the system are the two brand gradients above.**

### Imagery

Warm, bright, high-sun coastal photography — Cox's Bazar sand, Bay of Bengal blues, houseboats, Marine Drive, green Sylhet haor. Shot in daylight or golden hour; never desaturated, never black and white, never heavy filters or duotones. People appear mid-trip, not posing at a camera. Images always fill their frame with `object-fit: cover` and sit on a `--gray-200` placeholder while loading. Interactive cards scale their image `1.04` on hover.

Corner treatment: image slots inherit the card radius (`--radius-lg`), full-bleed to the card's edges — never an inset image with a visible margin.

### Cards

White surface, **1px `--color-border` (#dee4ea)**, `--radius-lg (16px)`, `--shadow-sm` at rest. That's the canonical card. Variants: `outline` (stronger border, no shadow — for cards nested inside cards) and `flat` (`--gray-100`, no border, no shadow — read-only summary blocks). Never a colored left border as the only accent. Never a card without either a border or a shadow.

### Radii

`--radius-sm 6px` (inputs' inner chrome, small chips, code pills) · `--radius-md 10px` (buttons, inputs, selects, small cards) · `--radius-lg 16px` (cards, panels, dialogs) · `--radius-xl 24px` (large feature bands, the trust strip) · `--radius-2xl 32px` (rare, full-bleed sections) · `--radius-full` (badges, tags, avatars, the contact dock, progress bars). Radii are never mixed within one element's own chrome.

### Borders

One hairline weight for structure: `1px` in `--color-border`. `--color-border-strong (#c5cedb)` marks something you can act on — outline buttons, unselected tags, the guest stepper. `--border-width-md (2px)` appears only as the teal active tab underline and the itinerary's left rail. Dashed borders appear exactly once, above a price total.

### Elevation

Four steps, all navy-tinted (`rgba(5,20,40,…)`) rather than neutral black, so shadows read as depth in a blue room:

- `--shadow-sm` — resting cards, panels, table containers
- `--shadow-md` — hovered cards, the sticky booking panel, toasts
- `--shadow-lg` — the hero search widget, dialogs, the contact dock
- `--shadow-inset` — pressed/sunken wells
- `--shadow-focus` — `0 0 0 3px rgba(40,177,161,.35)`, a teal ring, on every focusable control

Elevation always tracks interactivity: a static card never lifts, an interactive one always does.

### Motion

Fast and unfussy. Three durations — `--duration-fast 120ms` (color/state changes on buttons, tags, nav), `--duration-normal 200ms` (card hover lift, shadow, dialog entrance), `--duration-slow 320ms` (image zoom on hover). Two curves: `--ease-standard cubic-bezier(.4,0,.2,1)` for state changes, `--ease-out cubic-bezier(0,0,.2,1)` for things entering.

The dialog is the only keyframed animation in the system: 8px up + `scale(.985)` → rest, over `--duration-normal`. **No bounces, no spring overshoot, no spinners longer than a moment, no scroll-triggered reveals, no parallax, no auto-playing carousels.** Nothing animates that a traveller is waiting on.

### Interaction states

- **Hover** — buttons darken one step on the scale (`--navy-800` → `--navy-900`; `--teal-500` → `--teal-600`); ghost/outline buttons *gain* a tint (`transparent` → `--navy-50` / `--gray-100`); cards lift `translateY(-2px)` and go `--shadow-sm` → `--shadow-lg`; images scale `1.04`; nav links go `--color-text-secondary` → `--color-text-primary`. Opacity is never used to signal hover.
- **Press** — darken one further step (`--navy-950`, `--teal-700`, `--gray-200`). No shrink, no scale-down.
- **Focus** — the teal `--shadow-focus` ring, always, on every control. Never removed.
- **Selected** — filled navy with inverse text (tags, active pill tabs get white + `--shadow-sm`); the active underline tab gets a 2px teal border and navy semibold label.
- **Disabled** — `opacity: .5` plus `cursor: not-allowed`, keeping the variant's own colors. Disabled copy states the reason where possible ("Sold out").
- **Loading** — skeletons in `--gray-100`, not spinners, wherever a shape is predictable.

### Transparency and blur

Used in exactly three places, never decoratively:

1. **Sticky chrome** — the site header and admin top bar are `rgba(255,255,255,.92–.94)` with `backdrop-filter: blur(8–10px)`, so content dims under them instead of disappearing.
2. **Dialog scrim** — `rgba(5,30,61,.55)` (navy, never black) with `blur(3px)`.
3. **On-photo chrome** — pills and buttons over hero imagery use `rgba(255,255,255,.14)` fills with `rgba(255,255,255,.22)` borders, and image overlays use `rgba(5,30,61,.55)`.

No frosted-glass cards, no translucent panels over plain backgrounds.

### Protection gradients vs. capsules

Both are in use, with a clear division: **gradients** protect long-form text over photography (hero headline, section over an image). **Capsules** — solid or translucent pills at `--radius-full` — protect short chrome on top of an image: promo badges, save buttons, photo counts. Never a gradient behind a single badge; never a capsule behind a headline.

### Typography — flagged substitution

No brand font files were supplied. The nearest Google Fonts matches are in use, loaded from the Google Fonts CDN rather than self-hosted:

| Role | Substitute | Why |
| --- | --- | --- |
| Display | **Poppins** 500–800 | Closest match to the geometric, rounded wordmark in the logo |
| Body / UI | **Public Sans** 400–700 | Humanist, dense-form legibility for booking flows |
| Accent | **Lora** italic | Echoes the thin serif tagline in the logo |
| Mono | **IBM Plex Mono** | Booking references, PNRs, confirmation codes |

**If real brand fonts exist, send the files and these will be swapped and self-hosted.**

### Logo

The only lockup available is a JPEG on an off-white (#f8f8f8) field — no transparent, vector, or single-color version. `assets/logo-mark.png` is a **crop** of the supplied artwork, not a redraw. On dark surfaces the mark is placed on a low-opacity white plate until a proper reverse asset exists, and the wordmark is set in Poppins with "BD" in `--teal-400`. **Vector (SVG/AI) logo files are needed.**

---

## ICONOGRAPHY

**Substitution flagged.** The sources contain no icon set — the logo's small service-icon row is raster artwork inside a JPEG and can't be extracted as usable icons. The system therefore standardises on **[Lucide](https://lucide.dev)**, loaded from CDN (`https://unpkg.com/lucide@latest`), wrapped by the `Icon` component. Lucide was chosen because its 2px round-cap outline weight matches the geometric, even-stroke feel of the logo mark better than Heroicons (thinner, mixed) or Material (filled, heavier). **If YesTourBD has real icon artwork, send it and `Icon` will be repointed at it.**

**Style rules.** Outline only, `strokeWidth={2}`, `currentColor`. Never filled icons, never two-tone, never a mix of outline and solid in one view. Sizes step: **13–14px** inline with `--text-xs` metadata · **15–16px** inside buttons and inputs · **17–18px** in nav and icon buttons · **20–22px** as a feature glyph · **40px** in empty states (in `--gray-300`).

**Color.** Icons inherit text color by default. A service or feature glyph gets the accent that matches its booking mode — teal for instant, navy for request — usually inside a 32–42px `--radius-md` tile tinted `--teal-50` or `--navy-50`. Icons are never the only carrier of meaning: every icon-only control has an `aria-label` and, in dense UI, a `Tooltip`.

**The service vocabulary** is fixed so the same service always reads the same across site and admin:

| Service | Lucide name |
| --- | --- |
| Hotel & Resort | `bed-double` |
| Houseboat Tour | `ship` |
| Saint Martin Ship | `sailboat` |
| Houseboat Day Tour | `sun` |
| Marine Drive Tour | `route` |
| Rent a Car (Chader Gari) | `car-front` |
| Radiant Fish World | `fish` |
| Air Ticket | `plane` |
| Bus Ticket | `bus` |
| Package Tour | `package` |
| Corporate & Events | `briefcase` |
| Visa Assistance | `stamp` |

Recurring UI glyphs: `search`, `map-pin`, `calendar`, `users`, `phone` / `phone-call`, `message-circle` (WhatsApp), `heart` (save), `star` (rating, in `--gold-500`), `check-circle` (success), `alert-circle` (error), `lock` (payment security), `chevron-right` / `chevron-down`, `arrow-right` (forward links), `download` (voucher), `layout-dashboard`, `ticket`, `message-square-quote`, `credit-card`, `layers`.

**Emoji and unicode as icons: never.** No emoji anywhere. Unicode is limited to `৳`, `–`, `·`, `→`, `×` (dismiss buttons) and the curly apostrophe. Star ratings are Lucide `star` glyphs, not `★`.

**No hand-drawn SVG.** Nothing in this system draws its own iconography; if a needed glyph isn't in Lucide, pick the nearest Lucide sibling rather than authoring one.

**Social / brand marks.** Lucide removed brand logos, so Facebook / Instagram / YouTube come from **[Simple Icons](https://simpleicons.org)** via CDN — official marks, requested in white: `https://cdn.simpleicons.org/<slug>/ffffff` in a 34px `--radius-sm` bordered capsule. Never redraw a brand mark by hand.

**The taka sign.** Neither Poppins nor Public Sans carries `৳`, so **Noto Sans Bengali** is appended to every font stack in `tokens/fonts.css` purely to supply it (and any Bangla place names set in the UI). Without it the glyph falls back to a system font at the wrong size and sits like a superscript next to the number.
