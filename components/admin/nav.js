// Plain data, deliberately outside chrome.jsx: a value exported from a 'use client' module
// reaches a server component as a client reference rather than the array itself, so the
// section page could not read it there.
export const NAV_GROUPS = [
  { title: 'Overview', items: [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', href: '/admin' },
    { id: 'reports', label: 'Reports & analytics', icon: 'chart-column', href: '/admin/reports' },
  ] },
  { title: 'Operations', items: [
    { id: 'bookings', label: 'Bookings', icon: 'ticket', href: '/admin/bookings' },
    { id: 'requests', label: 'Requests', icon: 'message-square-quote', href: '/admin/requests' },
    { id: 'customers', label: 'Customers', icon: 'users', href: '/admin/customers' },
    { id: 'payments', label: 'Payments', icon: 'credit-card', href: '/admin/payments' },
  ] },
  { title: 'Catalogue', items: [
    { id: 'services', label: 'Manage services', icon: 'layers', href: '/admin/services' },
    { id: 'offers', label: 'Offers & promotions', icon: 'percent', href: '/admin/offers' },
  ] },
  { title: 'Content', items: [
    { id: 'banners', label: 'Content & banners', icon: 'image', href: '/admin/banners' },
    { id: 'blog', label: 'Blog', icon: 'newspaper', href: '/admin/blog' },
  ] },
  { title: 'Admin', items: [
    { id: 'staff', label: 'Users & staff', icon: 'shield', href: '/admin/staff' },
  ] },
];
