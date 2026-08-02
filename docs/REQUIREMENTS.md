# YesTourBD — Product Requirements

Source: client brief. This file is the canonical restatement of it; where the brief was
silent or ambiguous, the gap is marked **[assumption]** or **[open]** rather than quietly
resolved. Implementation status lives in [STATUS.md](./STATUS.md), not here.

## Goal

A modern, responsive, fast, feature-rich travel website offering all major travel services
in one place. Optimised for desktop and mobile.

The brief's own framing governs every trade-off in this document:

> The focus should be on simplicity, reliability, and ease of use rather than unnecessary
> complexity.

and, decisively for scoping:

> If a feature is too complex or not practical for the initial version, it should be
> implemented as an informative page with a request/quotation form, allowing users to submit
> their requirements while keeping the website simple, user-friendly, and easy to manage.

That second sentence is a standing instruction, not a caveat. It is the tie-breaker whenever
a service's "instant booking" path would require an integration the business cannot yet
operate. See [ARCHITECTURE.md](./ARCHITECTURE.md#booking-mode-per-service-v1) for where it
gets applied.

## Service catalogue

Twelve services. Each has a booking mode that drives its UI treatment — the design system
encodes the split visually (instant = teal accents, CTA "Book now"; request = navy accents,
CTA "Request a quote").

| # | Service | Brief's mode | Notes |
|---|---|---|---|
| 1 | Hotel & Resort Booking | Instant | Listed under "fixed availability" |
| 2 | Houseboat Tour Booking | Instant | Listed under "fixed availability" |
| 3 | Saint Martin Ship Ticketing | Instant | Listed under "fixed availability" |
| 4 | Cox's Bazar Houseboat Day Tour | **[assumption]** Instant | Not classified in the brief. Treated as a houseboat product, so instant. |
| 5 | Marine Drive Tour | **[assumption]** Instant | Not classified in the brief. Fixed daily departure, so instant. |
| 6 | Rent a Car (Chader Gari) | Request | Brief says "if availability varies" — treated as always request in v1 |
| 7 | Radiant Fish World Ticketing | Instant | Listed under "fixed availability" |
| 8 | Air Ticket Booking | Instant | Listed under "fixed availability" |
| 9 | Bus Ticket Booking | Instant | Listed under "fixed availability" |
| 10 | Package Tour Booking | Request | Brief's "Custom Tour Packages" |
| 11 | Corporate Tour & Event Management | Request | Brief lists "Corporate Tours" and "Event Management" separately; merged as one service |
| 12 | Visa Assistance | Request | |

The brief's request list also names **Group Tours** separately. There is no twelfth-plus
service tile for it — it is handled as a request *type* inside the quote form, alongside
corporate, visa, package and car. That keeps the service grid at twelve.

**[open]** Items 4 and 5 were classified by the design system, not by the client. Confirm
before building inventory for them.

## Booking system

Two modes, and the distinction is a product rule rather than a UI preference.

### Instant booking

Fixed, known availability. The customer selects, pays, and receives a confirmation and
voucher without a human in the loop. Applies to hotels, houseboats, ship tickets, air
tickets, bus tickets, Fish World tickets.

Requires, per service: a source of truth for availability, a price at time of booking, a
payment capture, and a voucher/ticket artifact.

### Request-based booking

Customised services where price depends on specifics. The customer submits requirements;
an admin responds with a quotation or confirmation. Applies to corporate tours, group tours,
event management, visa assistance, custom tour packages, and car rental where availability
varies.

Requires: a request form, an admin queue, a quotation artifact, and a state machine
(submitted → quoted → negotiating → accepted → converted to booking / lost).

**[open]** The brief does not state a deposit policy. The design system's copy asserts
"Pay 30% to hold, balance before departure" for request bookings. Confirm this is real.

## Website features

- Modern, responsive design
- Mobile-first user experience
- Fast loading speed
- Easy navigation
- Simple booking / request forms
- WhatsApp and call buttons
- Secure online payment integration
- User account and booking history
- Search and filter options
- Photo gallery and tour information
- Reviews and testimonials
- Blog and travel guides
- Promotional offers and banners
- Contact and support page

## Admin panel

Must be simple and easy to manage. Eleven areas:

| Area | Scope |
|---|---|
| Dashboard | Volumes, revenue, pending requests, recent activity |
| Manage Services | The twelve services, their inventory and pricing |
| Booking Management | Instant bookings: view, amend, cancel, refund, re-issue voucher |
| Request Management | The quotation pipeline and its state machine |
| Customer Management | Accounts, contact history, booking history |
| Payment Management | Transactions, settlements, refunds, reconciliation |
| Content & Banner Management | Homepage banners, service copy, static pages |
| Blog Management | Posts, categories, media |
| Offers & Promotions | Promo codes, campaign windows, eligible services |
| Reports & Analytics | Sales by service, conversion, request turnaround |
| User & Staff Management | Staff accounts, roles, permissions |

## Development requirements

- Fully responsive on mobile, tablet and desktop
- SEO-friendly structure
- Secure and scalable architecture
- Easy to maintain and update
- Optimised performance
- Professional UI/UX
- Built with future expansion in mind

## Success criterion

> The website should provide a better overall experience than most travel websites in
> Bangladesh by combining multiple travel services into one platform with a clean interface,
> quick booking process, and request-based options where necessary.

Three testable claims sit inside that sentence, and they are the ones worth measuring:
one platform (a customer books more than one service type per trip), quick booking (time
from landing to confirmation), and request options where necessary (quotation turnaround).
