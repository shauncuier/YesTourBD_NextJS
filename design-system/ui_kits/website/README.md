# Customer website UI kit

Click-through recreation of the YesTourBD customer site. Open `index.html`.

| File | Surface |
| --- | --- |
| `site-chrome.jsx` | `SiteHeader`, `SiteFooter`, `ContactDock` (WhatsApp + call), `Logo`, `SectionHead`, `Stars`, `Price` |
| `HomeScreen.jsx` | Hero + multi-service search widget, 12-service grid, popular listings, offer band, trust strip, reviews, blog teasers |
| `SearchScreen.jsx` | Navy search band, sticky filter rail, result rows with per-row pricing |
| `DetailScreen.jsx` | Gallery, tabbed content (overview / itinerary / included / cancellation / reviews), sticky booking panel, confirm dialog, success toast |
| `RequestScreen.jsx` | Request-based booking form: type picker, details, contact preference, "what happens next" rail |
| `AccountScreen.jsx` | Booking history tabs (upcoming / past / requests), empty state, traveller profile, notification switches |
| `site-data.js` | Fake listings, services, reviews, posts, bookings + image URLs |

## Flow to try

1. Home → **Search** (or click any service tile) → a result row's **Book now**
2. Detail → **Book now** → confirm dialog → **Pay** → success toast → **View booking**
3. Any request-based service tile → request form → **Send request** → **Track request**

## Notes

- Photography is remote Unsplash imagery standing in for YesTourBD's own library. Replace with real property/tour photos.
- All prices, refs and reviews are invented sample content.
- Instant vs request is the site's core split: teal "Instant" badges and **Book now**; navy "Request based" badges and **Request a quote**.
