Solid/secondary/outline/ghost/danger button in three sizes — the workhorse CTA across booking flows ("Book Now", "Search", "Submit Request").

```jsx
<Button variant="primary" size="md" onClick={handleBook}>Book Now</Button>
<Button variant="outline" iconLeft={<Icon name="sliders-horizontal" size={16} />}>Filters</Button>
```

Use `primary` (navy) for the one main action per view, `secondary` (teal) for a complementary action shown alongside it, `outline`/`ghost` for lower-emphasis actions, `danger` for destructive/cancel-booking actions.
