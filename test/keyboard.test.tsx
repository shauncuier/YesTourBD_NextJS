import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dialog } from '@/components/overlays/Dialog.jsx';
import { SiteHeader } from '@/components/site/chrome.jsx';
import { SearchScreen } from '@/components/screens/SearchScreen.jsx';
import { RequestScreen } from '@/components/screens/RequestScreen.jsx';
import { setViewportMatches } from './setup';

// M0.9's keyboard pass. Everything here is a route out of a surface a pointer can leave by
// tapping outside — a keyboard cannot, so each needs Escape, an entry point and a way back.
describe('keyboard access', () => {
  it('Dialog moves focus in, traps Tab and closes on Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Dialog open title="Booking confirmed" onClose={onClose} footer={<button type="button">Done</button>}>
        <button type="button">Inside</button>
      </Dialog>,
    );

    const close = screen.getByRole('button', { name: 'Close' });
    expect(close).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('button', { name: 'Inside' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Done' })).toHaveFocus();
    // Wraps back to the first control rather than escaping to the page behind.
    await user.tab();
    expect(close).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Done' })).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('Dialog locks the page behind it and restores focus to whatever opened it', async () => {
    const user = userEvent.setup();
    function Harness() {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>Book now</button>
          <Dialog open={open} title="Confirm" onClose={() => setOpen(false)} />
        </>
      );
    }
    render(<Harness />);

    const opener = screen.getByRole('button', { name: 'Book now' });
    opener.focus();
    await user.click(opener);
    expect(document.body.style.overflow).toBe('hidden');

    await user.keyboard('{Escape}');
    expect(document.body.style.overflow).toBe('');
    expect(opener).toHaveFocus();
  });

  it('header menu closes on Escape and hands focus back to its toggle', async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const toggle = screen.getByRole('button', { name: 'Open menu' });
    await user.click(toggle);
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus();
  });

  it('search filter sheet takes focus, closes on Escape and gives focus back', async () => {
    setViewportMatches(true); // below 900px: the rail is a full-screen sheet
    const user = userEvent.setup();
    render(<SearchScreen />);

    const toggle = screen.getByRole('button', { name: 'Filters' });
    await user.click(toggle);
    const rail = screen.getByRole('complementary', { name: 'Filters' });
    expect(rail).toHaveAttribute('data-open', 'true');
    expect(rail.contains(document.activeElement)).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');

    await user.keyboard('{Escape}');
    expect(rail).toHaveAttribute('data-open', 'false');
    expect(document.body.style.overflow).toBe('');
    expect(toggle).toHaveFocus();
  });

  it('Switch exposes its label as its accessible name', () => {
    render(<SearchScreen />);
    // A <label> cannot name a <span role="switch">, so the switch names itself with
    // aria-labelledby — Lighthouse flagged all three account switches before this.
    expect(screen.getByRole('switch', { name: 'Instant booking only' })).toBeInTheDocument();
  });

  it('request notes textarea shows a focus ring, since it suppresses the browser outline', async () => {
    const user = userEvent.setup();
    render(<RequestScreen />);

    const notes = screen.getByLabelText(/Anything else we should plan around/);
    expect(notes).toHaveStyle({ boxShadow: 'none' });
    await user.click(notes);
    expect(notes).toHaveStyle({ boxShadow: 'var(--shadow-focus)' });
  });
});
