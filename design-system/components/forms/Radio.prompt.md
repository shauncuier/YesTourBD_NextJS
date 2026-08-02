One option in a mutually-exclusive group — share the same `name`, different `value`.

```jsx
<Radio name="booking-type" value="instant" label="Instant booking" checked={type==='instant'} onChange={() => setType('instant')} />
<Radio name="booking-type" value="request" label="Request a quotation" checked={type==='request'} onChange={() => setType('request')} />
```
