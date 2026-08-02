# Admin panel UI kit

Click-through recreation of the YesTourBD staff panel. Open `index.html`.

| File | Surface |
| --- | --- |
| `admin-chrome.jsx` | `AdminSidebar` (grouped nav, staff footer), `AdminTopBar`, `StatCard`, `Panel`, shared `TH`/`TD` table styles, `STATUS_TONE` map |
| `DashboardScreen.jsx` | Four KPI cards, stacked instant-vs-request revenue chart, bookings-by-service bars, latest bookings table, request queue |
| `BookingsScreen.jsx` | Status tabs, filter bar, dense bookings table, booking detail dialog with activity log, update toast |
| `RequestsScreen.jsx` | Quotation pipeline board (New / Quoted / Negotiating / Won) + list view, request detail dialog with quotation fields |
| `ServicesScreen.jsx` | Service catalogue with booking-mode and live toggles, banner slot, offer codes, edit-service dialog |
| `admin-data.js` | Fake bookings, requests, services, revenue series |

## Flow to try

1. Dashboard → a request card's **Claim** → request board → open a card → **Send quotation** → toast
2. **Bookings** → any row's eye icon → detail dialog → **Mark confirmed** → toast
3. **Manage services** → pencil icon → edit dialog; toggle **Live** switches inline

## Deliberately unbuilt

Sidebar sections with no screen (Customers, Payments, Reports, Banners, Blog, Offers, Staff) render an explicit "not part of this UI kit" placeholder. They are in the brief but no design was supplied, so nothing was invented for them.
