import { formatTaka } from '../quotation';

// Plain-text templates. The design system's content rules apply to email as much as to the
// UI: sentence case, no emoji, ৳ with comma grouping, day-first dates, and the awkward part
// said out loud rather than dressed up.
//
// Text only for now — an HTML version needs the brand's email design, which does not exist.
// A plain-text quotation that arrives beats a styled one that waits for artwork.

export type EmailTemplate = {
  template: string;
  subject: string;
  body: string;
};

const SIGNATURE = `
—
YesTourBD
+880 1XXX-XXXXXX · 9 AM to 10 PM, seven days`;

const dhakaDate = (value: Date) =>
  value.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Dhaka' });

/** What the customer gets the moment their request lands. */
export function quoteRequestReceived(params: {
  ref: string;
  name: string;
  destinations: string;
  contactPref: string;
  trackUrl: string;
}): EmailTemplate {
  const channel =
    params.contactPref === 'call' ? 'call you' : params.contactPref === 'email' ? 'email you' : 'message you on WhatsApp';

  return {
    template: 'quote_request_received',
    subject: `We have your request — ${params.ref}`,
    body: `${params.name},

Thank you — your request for ${params.destinations} is with us, and its reference is ${params.ref}.

A coordinator will read it and ${channel} with a written, itemised quotation within two working hours. Our desk is open 9 AM to 10 PM, seven days, so a request sent late in the evening is answered the next morning.

Nothing is booked and nothing is owed yet. The quotation comes first, and you can change anything in it.

You can follow it any time at ${params.trackUrl} — your reference and this mobile number are all it needs.

Quote ${params.ref} if you call us before then.${SIGNATURE}`,
  };
}

/** What the desk gets, so nobody has to be watching the queue to know work arrived. */
export function quoteRequestInternal(params: {
  ref: string;
  name: string;
  phone: string;
  email: string | null;
  requestType: string;
  destinations: string;
  paxBand: string;
  notes: string | null;
  queueUrl: string;
}): EmailTemplate {
  return {
    template: 'quote_request_internal',
    subject: `New ${params.requestType} request — ${params.ref} · ${params.destinations}`,
    body: `${params.ref} came in and the two-hour clock is running.

Customer   ${params.name}
Phone      ${params.phone}
Email      ${params.email ?? 'not given'}
Type       ${params.requestType}
Where      ${params.destinations}
Travellers ${params.paxBand}

Their notes:
${params.notes?.trim() || 'None.'}

Open it: ${params.queueUrl}`,
  };
}

/** The quotation itself, itemised, in the customer's inbox. */
export function quotationSent(params: {
  ref: string;
  name: string;
  lines: { description: string; quantity: number; unitPrice: number; amount: number }[];
  subtotal: number;
  discount: number;
  total: number;
  depositPercent: number;
  depositAmount: number;
  balance: number;
  validUntil: Date;
  notes: string | null;
  trackUrl: string;
}): EmailTemplate {
  const lines = params.lines
    .map((line) => `  ${line.description} — ${line.quantity} × ${formatTaka(line.unitPrice)} = ${formatTaka(line.amount)}`)
    .join('\n');

  const discountLine = params.discount ? `\n  Discount — −${formatTaka(params.discount)}` : '';

  return {
    template: 'quotation_sent',
    subject: `Your quotation — ${params.ref} · ${formatTaka(params.total)}`,
    body: `${params.name},

Here is the itemised quotation for ${params.ref}.

${lines}${discountLine}

  Total ${formatTaka(params.total)}
  ${params.depositPercent}% to hold — ${formatTaka(params.depositAmount)}
  Balance before departure — ${formatTaka(params.balance)}

This price holds until ${dhakaDate(params.validUntil)}.
${params.notes?.trim() ? `\n${params.notes.trim()}\n` : ''}
Accept it, or ask for changes, at ${params.trackUrl}. Accepting tells us to hold it; payment is arranged afterwards and nothing is taken there.

Anything here can change — swap the hotel, move the dates, add or drop a line. Reply and say what you want different and we will send a revised quotation.${SIGNATURE}`,
  };
}
