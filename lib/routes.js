'use client';

import { useRouter } from 'next/navigation';

// The design system's UI kit is a single-page app that switches screens through a
// `go('<screen>')` callback. The screens are ported verbatim, so this maps those screen
// ids onto real Next.js routes and keeps the call sites unchanged.
export const ROUTES = {
  home: '/',
  search: '/search',
  tickets: '/tickets',
  request: '/request',
  blog: '/guides',
  account: '/account',
  detail: '/tours/coxs-bazar-houseboat-day-tour',
};

export function useGo() {
  const router = useRouter();
  return (target) => {
    router.push(ROUTES[target] || target);
  };
}
