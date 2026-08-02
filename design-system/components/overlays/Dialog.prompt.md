Modal surface for booking confirmation, quotation request forms and destructive confirms. Renders nothing when `open` is false; scrim click and Escape both call `onClose`.

```jsx
<Dialog open={open} onClose={close}
  title="Confirm your booking"
  description="Saint Martin ship ticket · 12 Mar · 2 passengers"
  footer={<><Button variant="ghost" onClick={close}>Back</Button><Button onClick={pay}>Pay ৳3,400</Button></>}>
  <BookingSummary />
</Dialog>
```

Scrim is navy at 55% with a 3px blur — never plain black.
