const ADMIN_BOOKINGS = [
  { ref: 'YTB-8H2K41', customer: 'Nusrat Jahan', phone: '+880 1712-345678', service: 'Houseboat Day Tour', date: '12 Mar 2026', pax: 2, amount: 6520, status: 'confirmed', pay: 'bKash', channel: 'Website' },
  { ref: 'YTB-8H2K38', customer: 'Rakib Hasan', phone: '+880 1811-220034', service: 'Saint Martin Ship — Bay One', date: '13 Mar 2026', pax: 4, amount: 13600, status: 'confirmed', pay: 'Card', channel: 'Website' },
  { ref: 'YTB-8H2K31', customer: 'Farhana Akter', phone: '+880 1912-778821', service: 'Sayeman Beach Resort — 2N', date: '12–14 Mar 2026', pax: 2, amount: 17800, status: 'pending', pay: 'Awaiting', channel: 'WhatsApp' },
  { ref: 'YTB-8H2K22', customer: 'Imran Chowdhury', phone: '+880 1611-903112', service: 'Air ticket DAC → CXB', date: '15 Mar 2026', pax: 1, amount: 5400, status: 'confirmed', pay: 'Nagad', channel: 'Website' },
  { ref: 'YTB-8H2K19', customer: 'Sabbir Rahman', phone: '+880 1533-664412', service: 'Marine Drive Tour', date: '11 Mar 2026', pax: 6, amount: 14400, status: 'cancelled', pay: 'Refunded', channel: 'Call' },
  { ref: 'YTB-8H2K09', customer: 'Tania Islam', phone: '+880 1722-110098', service: 'Radiant Fish World Entry', date: '10 Mar 2026', pax: 3, amount: 2100, status: 'completed', pay: 'bKash', channel: 'Website' },
];

const ADMIN_REQUESTS = [
  { ref: 'REQ-2261', customer: 'Beacon Pharmaceuticals', contact: 'Tanvir Ahmed', type: 'Corporate tour', pax: 34, dest: 'Sylhet + Sreemangal', when: 'Apr 2026', age: '18 min', status: 'new', owner: null },
  { ref: 'REQ-2258', customer: 'Nadia Sultana', contact: 'Nadia Sultana', type: 'Visa assistance', pax: 2, dest: 'Thailand', when: 'May 2026', age: '2 hours', status: 'quoted', owner: 'Sadia' },
  { ref: 'REQ-2254', customer: 'BUET Civil ’21', contact: 'Mahin Sarker', type: 'Group tour', pax: 48, dest: 'Bandarban', when: 'Mar 2026', age: '5 hours', status: 'negotiating', owner: 'Rafi' },
  { ref: 'REQ-2249', customer: 'Grameen IT', contact: 'Shahriar Kabir', type: 'Event management', pax: 120, dest: 'Cox’s Bazar', when: 'Jun 2026', age: '1 day', status: 'quoted', owner: 'Sadia' },
  { ref: 'REQ-2241', customer: 'Rezaul Karim', contact: 'Rezaul Karim', type: 'Rent a car', pax: 7, dest: 'Sajek (Chader Gari)', when: '20 Mar 2026', age: '2 days', status: 'won', owner: 'Rafi' },
];

const ADMIN_SERVICES = [
  { name: 'Hotel & Resort Booking', mode: 'Instant', items: 342, live: true, updated: '2 days ago' },
  { name: 'Houseboat Tour Booking', mode: 'Instant', items: 28, live: true, updated: 'Today' },
  { name: 'Saint Martin Ship Ticketing', mode: 'Instant', items: 6, live: true, updated: 'Today' },
  { name: 'Cox’s Bazar Houseboat Day Tour', mode: 'Instant', items: 4, live: true, updated: 'Yesterday' },
  { name: 'Marine Drive Tour', mode: 'Instant', items: 9, live: true, updated: '4 days ago' },
  { name: 'Rent a Car (Chader Gari)', mode: 'Request', items: 12, live: true, updated: '1 week ago' },
  { name: 'Radiant Fish World Ticketing', mode: 'Instant', items: 2, live: true, updated: '3 days ago' },
  { name: 'Air Ticket Booking', mode: 'Instant', items: 0, live: true, updated: 'Today' },
  { name: 'Bus Ticket Booking', mode: 'Instant', items: 0, live: false, updated: '2 weeks ago' },
  { name: 'Package Tour Booking', mode: 'Request', items: 17, live: true, updated: 'Yesterday' },
  { name: 'Corporate Tour & Event Management', mode: 'Request', items: 5, live: true, updated: '5 days ago' },
  { name: 'Visa Assistance', mode: 'Request', items: 14, live: true, updated: '1 week ago' },
];

const REVENUE_SERIES = [
  { label: 'Mon', instant: 148, request: 62 },
  { label: 'Tue', instant: 176, request: 44 },
  { label: 'Wed', instant: 132, request: 90 },
  { label: 'Thu', instant: 208, request: 71 },
  { label: 'Fri', instant: 286, request: 118 },
  { label: 'Sat', instant: 254, request: 96 },
  { label: 'Sun', instant: 198, request: 58 },
];

Object.assign(window, { ADMIN_BOOKINGS, ADMIN_REQUESTS, ADMIN_SERVICES, REVENUE_SERIES });
