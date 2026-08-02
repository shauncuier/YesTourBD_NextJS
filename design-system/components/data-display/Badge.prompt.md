Read-only status or metadata label — booking states, promo flags, availability. Never interactive; use `Tag` for anything clickable or removable.

```jsx
<Badge tone="success" dot>Confirmed</Badge>
<Badge tone="warning" dot>Awaiting quotation</Badge>
<Badge tone="gold" variant="solid">20% OFF</Badge>
```

Convention: `success` = confirmed/paid, `warning` = pending/request submitted, `danger` = cancelled/failed, `gold` = promotional, `teal` = instant booking, `brand` = request-based.
