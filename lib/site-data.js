// Placeholder content for the YesTourBD website, carried over from the design system's
// `ui_kits/website/site-data.js`. Imagery is remote Unsplash — replace before launch.
export const IMG = {
  hero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=70',
  houseboat: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=70',
  marine: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&q=70',
  saintMartin: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=70',
  resort: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=70',
  sylhet: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=900&q=70',
  fishWorld: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=70',
  car: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&q=70',
  sunset: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&q=70',
};

export const SERVICES = [
  { id: 'hotels', icon: 'bed-double', label: 'Hotel & Resort', mode: 'instant', blurb: '340+ properties in Cox’s Bazar, Sylhet, Bandarban' },
  { id: 'houseboat', icon: 'ship', label: 'Houseboat Tour', mode: 'instant', blurb: 'Tanguar Haor & Cox’s Bazar houseboats' },
  { id: 'stmartin', icon: 'sailboat', label: 'Saint Martin Ship', mode: 'instant', blurb: 'Karnaphuli, Bay One, Keari Sindbad' },
  { id: 'daytour', icon: 'sun', label: 'Houseboat Day Tour', mode: 'instant', blurb: 'Cox’s Bazar, departs 9:00 AM daily' },
  { id: 'marine', icon: 'route', label: 'Marine Drive Tour', mode: 'instant', blurb: 'Inani, Himchari, Patuartek' },
  { id: 'car', icon: 'car-front', label: 'Rent a Car', mode: 'request', blurb: 'Chader Gari, microbus, sedan with driver' },
  { id: 'fish', icon: 'fish', label: 'Radiant Fish World', mode: 'instant', blurb: 'Skip-the-counter entry tickets' },
  { id: 'air', icon: 'plane', label: 'Air Ticket', mode: 'instant', blurb: 'Domestic & international fares' },
  { id: 'bus', icon: 'bus', label: 'Bus Ticket', mode: 'instant', blurb: 'AC & non-AC coaches nationwide' },
  { id: 'package', icon: 'package', label: 'Package Tour', mode: 'request', blurb: 'Family, honeymoon & student packages' },
  { id: 'corporate', icon: 'briefcase', label: 'Corporate & Events', mode: 'request', blurb: 'Retreats, conferences, group logistics' },
  { id: 'visa', icon: 'stamp', label: 'Visa Assistance', mode: 'request', blurb: 'Documents, appointment & submission' },
];

export const LISTINGS = [
  { id: 1, slug: 'coxs-bazar-houseboat-day-tour', title: 'Cox’s Bazar Houseboat Day Tour', place: 'Cox’s Bazar', img: IMG.houseboat, price: 3200, was: 4000, rating: 4.8, reviews: 214, tags: ['Full day', 'Lunch included'], mode: 'instant', offer: '20% OFF' },
  { id: 2, slug: 'saint-martin-ship-bay-one', title: 'Saint Martin Ship — Bay One', place: 'Teknaf → Saint Martin', img: IMG.saintMartin, price: 3400, rating: 4.6, reviews: 431, tags: ['Business deck', 'Return ticket'], mode: 'instant' },
  { id: 3, slug: 'sayeman-beach-resort', title: 'Sayeman Beach Resort', place: 'Kolatoli, Cox’s Bazar', img: IMG.resort, price: 8900, was: 11500, rating: 4.7, reviews: 1280, tags: ['Sea view', 'Breakfast'], mode: 'instant', offer: 'Deal' },
  { id: 4, slug: 'marine-drive-full-day-tour', title: 'Marine Drive Full-Day Tour', place: 'Inani → Patuartek', img: IMG.marine, price: 2400, rating: 4.5, reviews: 96, tags: ['AC car', '8 hours'], mode: 'instant' },
  { id: 5, slug: 'tanguar-haor-houseboat-2n', title: 'Tanguar Haor Houseboat — 2N', place: 'Sunamganj, Sylhet', img: IMG.sylhet, price: 6500, rating: 4.9, reviews: 152, tags: ['2 nights', 'All meals'], mode: 'instant' },
  { id: 6, slug: 'radiant-fish-world-entry', title: 'Radiant Fish World Entry', place: 'Cox’s Bazar', img: IMG.fishWorld, price: 700, rating: 4.3, reviews: 58, tags: ['Skip counter'], mode: 'instant' },
];

export const REVIEWS = [
  { name: 'Nusrat Jahan', place: 'Dhaka', text: 'Booked the houseboat day tour at 11 PM and had the confirmation in nine minutes. The pickup was exactly where they said it would be.', rating: 5 },
  { name: 'Tanvir Ahmed', place: 'Chattogram', text: 'We needed 34 seats and three rooms for an office retreat. Sent the request, got a quotation the same afternoon.', rating: 5 },
  { name: 'Shahriar Kabir', place: 'Sylhet', text: 'Ship tickets to Saint Martin are usually a phone-call marathon. This was two screens.', rating: 4 },
];

export const POSTS = [
  { title: 'Saint Martin in December: what the ship schedule actually looks like', cat: 'Travel guide', read: '6 min', img: IMG.saintMartin },
  { title: 'Chader Gari to Sajek: costs, timings and the honest bits', cat: 'Rent a car', read: '4 min', img: IMG.car },
  { title: 'Nine things to pack for a Tanguar Haor houseboat night', cat: 'Houseboat', read: '3 min', img: IMG.sylhet },
];

export const BOOKINGS = [
  { ref: 'YTB-8H2K41', title: 'Cox’s Bazar Houseboat Day Tour', date: '12 Mar 2026', pax: '2 adults', total: 6400, status: 'confirmed', img: IMG.houseboat },
  { ref: 'YTB-7QW903', title: 'Sayeman Beach Resort — 2 nights', date: '12–14 Mar 2026', pax: 'Deluxe sea view', total: 17800, status: 'paid', img: IMG.resort },
  { ref: 'YTB-5RT188', title: 'Corporate retreat — 34 pax', date: 'Apr 2026 (tentative)', pax: 'Awaiting quotation', total: null, status: 'request', img: IMG.sylhet },
];

export function listingBySlug(slug) {
  return LISTINGS.find((l) => l.slug === slug) || LISTINGS[0];
}
