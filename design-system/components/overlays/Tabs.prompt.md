Horizontal section switcher. `underline` for page-level navigation (service categories, admin record panes); `pill` for compact in-card toggles.

```jsx
<Tabs
  items={[{id:'upcoming',label:'Upcoming',count:3},{id:'past',label:'Past'},{id:'requests',label:'Requests',count:1}]}
  value={tab} onChange={setTab}
/>
```

The active underline is teal; the active label is navy. Tabs render labels only — you own the panel below.
