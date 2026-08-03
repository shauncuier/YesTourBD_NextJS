import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
  matchesViewport = false;
});

// jsdom has no CSSOM, so window.matchMedia does not exist. The components that behave
// differently as a mobile sheet (the search filter rail) ask it whether they are below
// 900px, so install a stub and let a test steer the answer with setViewportMatches().
let matchesViewport = false;

export function setViewportMatches(matches: boolean) {
  matchesViewport = matches;
}

window.matchMedia = ((query: string) => ({
  media: query,
  get matches() {
    return matchesViewport;
  },
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
})) as typeof window.matchMedia;

// The screens call useRouter() through lib/routes.js. Outside an App Router tree that
// throws, so stub the navigation hooks the components actually use.
export const routerPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: routerPush,
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));
