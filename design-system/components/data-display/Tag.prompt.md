Interactive chip for search filters and selected facets. Clickable and/or removable — for read-only status use `Badge`.

```jsx
<Tag label="Cox's Bazar" selected onClick={toggle} />
<Tag label="Under ৳5,000" removable onRemove={clear} />
```

Selected tags fill navy; unselected sit on white with a 1px strong border.
