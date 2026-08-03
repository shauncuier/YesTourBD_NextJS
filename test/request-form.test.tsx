import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RequestScreen } from '@/components/screens/RequestScreen.jsx';
import type { QuoteRequestState } from '@/app/request/actions';

// The screen posts a FormData to a server action. These assert the wiring either side of
// that boundary — that every field arrives under the key the validator reads, and that what
// comes back is what the customer is shown — with the action itself stubbed.

function renderForm(result: QuoteRequestState = { status: 'idle' }) {
  const action = vi.fn(async (_previous: QuoteRequestState, formData: FormData) => {
    void _previous;
    void formData;
    return result;
  });
  render(<RequestScreen action={action} />);
  return action;
}

describe('request form', () => {
  it('posts every field under the key the validator expects', async () => {
    const user = userEvent.setup();
    const action = renderForm();

    await user.type(screen.getByLabelText(/Destination/), 'Sylhet + Sreemangal');
    await user.selectOptions(screen.getByLabelText(/Number of travellers/), '10-24');
    await user.type(screen.getByLabelText(/Nights/), '3');
    await user.type(screen.getByLabelText(/Your name/), 'Nusrat Jahan');
    await user.type(screen.getByLabelText(/Mobile/), '01712-345678');
    await user.type(screen.getByLabelText(/Anything else/), 'One vegetarian meal per day.');
    await user.click(screen.getByText('Need hotel'));
    await user.click(screen.getByRole('button', { name: /Group \/ student tour/ }));
    await user.click(screen.getByRole('button', { name: 'Send request' }));

    expect(action).toHaveBeenCalledOnce();
    const formData = action.mock.calls[0]![1];
    expect(Object.fromEntries(formData.entries())).toMatchObject({
      // The picker is buttons, so this rides along as a hidden field — easy to break.
      requestType: 'group',
      destinations: 'Sylhet + Sreemangal',
      paxBand: '10-24',
      nights: '3',
      name: 'Nusrat Jahan',
      phone: '01712-345678',
      notes: 'One vegetarian meal per day.',
      contactPref: 'whatsapp',
      consent: 'on',
    });
    expect(formData.getAll('needs')).toEqual(['Need hotel']);
  });

  it('shows the reference the server generated, not a hard-coded one', async () => {
    const user = userEvent.setup();
    renderForm({ status: 'sent', ref: 'REQ-4821' });

    await user.click(screen.getByRole('button', { name: 'Send request' }));

    expect(await screen.findByText('Request sent — REQ-4821')).toBeInTheDocument();
  });

  it('puts server-side field errors next to the fields they belong to', async () => {
    const user = userEvent.setup();
    renderForm({ status: 'invalid', errors: { phone: 'Enter a Bangladeshi mobile number' } });

    await user.click(screen.getByRole('button', { name: 'Send request' }));

    expect(await screen.findByText('Enter a Bangladeshi mobile number')).toBeInTheDocument();
  });

  it('surfaces a rejected submission rather than pretending it worked', async () => {
    const user = userEvent.setup();
    renderForm({ status: 'error', message: 'We already have your recent requests.' });

    await user.click(screen.getByRole('button', { name: 'Send request' }));

    expect(await screen.findByText('Not sent')).toBeInTheDocument();
    expect(screen.getByText('We already have your recent requests.')).toBeInTheDocument();
  });
});
