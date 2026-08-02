Surface container for hotel/tour listings, service tiles and admin dashboard panels — use `elevated` on the page background, `outline` inside another card, `flat` for read-only summary blocks.

```jsx
<Card
  image="/assets/houseboat.jpg"
  badge={<Badge tone="gold">20% OFF</Badge>}
  title="Cox's Bazar Houseboat Day Tour"
  subtitle="Full day · lunch included · departs 9:00 AM"
  footer={<Button fullWidth>Book Now</Button>}
  href="#/tours/houseboat"
/>
```

- Only interactive cards (`href`/`onClick`) lift and deepen their shadow on hover; static cards stay put.
- `padding="none"` when the body is a table or list that should run edge to edge.
