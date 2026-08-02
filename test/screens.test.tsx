import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { HomeScreen } from '@/components/screens/HomeScreen.jsx';
import { SearchScreen } from '@/components/screens/SearchScreen.jsx';
import { DetailScreen } from '@/components/screens/DetailScreen.jsx';
import { RequestScreen } from '@/components/screens/RequestScreen.jsx';
import { AccountScreen } from '@/components/screens/AccountScreen.jsx';
import { LISTINGS } from '@/lib/site-data.js';

// Smoke coverage: each screen mounts without throwing and renders its headline content.
// Deliberately shallow — these exist to catch import/render regressions during the
// responsive migration, not to assert layout.
describe('website screens', () => {
  it('Home renders the hero claim and the service grid', () => {
    render(<HomeScreen />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Book the whole trip/,
    );
    expect(screen.getByText(/Twelve services, two ways to book/)).toBeInTheDocument();
  });

  it('Search renders every listing as a result', () => {
    render(<SearchScreen />);
    expect(screen.getByText(`${LISTINGS.length} results · prices include VAT`)).toBeInTheDocument();
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('Detail renders the listing it is given', () => {
    const listing = LISTINGS[0];
    render(<DetailScreen listing={listing} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(listing.title);
    expect(screen.getByRole('button', { name: 'Book now' })).toBeInTheDocument();
  });

  it('Detail prices the default two guests including the service fee', () => {
    const listing = LISTINGS[0];
    render(<DetailScreen listing={listing} />);
    const total = (listing.price * 2 + 120).toLocaleString('en-US');
    expect(screen.getByText(`৳${total}`)).toBeInTheDocument();
  });

  it('Request renders the quote form', () => {
    render(<RequestScreen />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Tell us the trip/);
    expect(screen.getByRole('button', { name: 'Send request' })).toBeInTheDocument();
  });

  it('Account renders the traveller and their upcoming bookings', () => {
    render(<AccountScreen />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Nusrat Jahan');
    expect(screen.getByText('YTB-8H2K41')).toBeInTheDocument();
  });
});
