The one glyph API for the whole system — a thin wrapper over [Lucide](https://lucide.dev), which the host page loads from CDN.

```html
<script src="https://unpkg.com/lucide@latest"></script>
```

```jsx
<Icon name="map-pin" size={16} />
<Icon name="ship" size={21} color="var(--teal-600)" />
<Icon name="star" size={14} color="var(--gold-500)" filled />
```

- Names are kebab-case; digits work too (`rows-3`, `bar-chart-3`). Renamed Lucide icons (`check-circle`, `alert-circle`, `x-circle`, `more-horizontal`, …) are aliased so both spellings resolve.
- `color` is applied as CSS on the wrapper, so design tokens work. The SVG always strokes `currentColor` — so omitting `color` inherits from the parent, which is the usual case.
- Outline only, `strokeWidth={2}`. `filled` exists for star ratings and nothing else.
- Renders an empty box if the name is unknown or Lucide hasn't loaded yet (it polls briefly, then gives up).
- Icon-only controls still need an `aria-label` on the button — the icon itself is `aria-hidden`.
