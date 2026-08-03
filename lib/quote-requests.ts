import { z } from 'zod';

// Validation lives here rather than in the action so it can be unit-tested without a
// database, and so the admin side (M1.5) can reuse the same rules.

const REQUEST_TYPES = ['corporate', 'group', 'visa', 'package', 'car'] as const;
const CONTACT_PREFS = ['whatsapp', 'call', 'email'] as const;
const PAX_BANDS = ['1-9', '10-24', '25-49', '50+'] as const;
const BUDGET_BANDS = ['under-5k', '5k-15k', '15k-plus'] as const;

/** Bangladeshi mobile numbers: 01XXXXXXXXX, optionally +880- or 880-prefixed. */
const BD_MOBILE = /^(?:\+?880|0)1[3-9]\d{8}$/;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => (value === '' ? undefined : value))
    .optional();

export const quoteRequestSchema = z.object({
  requestType: z.enum(REQUEST_TYPES),
  destinations: z.string().trim().min(2, 'Tell us where you want to go').max(200),
  paxBand: z.enum(PAX_BANDS, { message: 'Choose how many are travelling' }),
  // A date the customer has already passed is a typo, not a plan.
  startDate: z
    .string()
    .trim()
    .transform((value) => (value === '' ? undefined : value))
    .optional()
    .pipe(z.iso.date('Use a real date').optional()),
  nights: z.coerce.number().int().min(1).max(90).optional(),
  budgetBand: z.enum(BUDGET_BANDS).optional(),
  org: optionalText(120),
  needs: z.array(z.string().trim().max(40)).max(10).default([]),
  notes: optionalText(2000),

  name: z.string().trim().min(2, 'We need a name to address the quotation to').max(120),
  // People write 01712-345678, +880 1712 345678, (017) 123... — strip the punctuation
  // before judging it, then store one canonical form so the admin queue can search on it.
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/[\s().-]/g, ''))
    .refine((value) => BD_MOBILE.test(value), 'Enter a Bangladeshi mobile number, e.g. 01712-345678')
    .transform((value) => value.replace(/^(?:\+?880)/, '0')),
  email: z
    .string()
    .trim()
    .transform((value) => (value === '' ? undefined : value))
    .optional()
    .pipe(z.email('Check the email address').optional()),
  contactPref: z.enum(CONTACT_PREFS).default('whatsapp'),
  consent: z
    .string()
    .optional()
    .refine((value) => value === 'on' || value === 'true', {
      message: 'Please agree to be contacted about this request',
    }),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

/** Field-keyed messages, which is the shape the form renders. */
export type FieldErrors = Partial<Record<keyof QuoteRequestInput, string>>;

export function parseQuoteRequest(formData: FormData):
  | { ok: true; data: QuoteRequestInput }
  | { ok: false; errors: FieldErrors } {
  // A field the browser did not send reads as null, which no `.optional()` accepts — so
  // absent and blank both become undefined here rather than in every field's schema.
  const field = (key: string) => {
    const value = formData.get(key);
    if (typeof value !== 'string' || value === '') return undefined;
    return value;
  };

  const raw = {
    requestType: field('requestType'),
    destinations: field('destinations') ?? '',
    paxBand: field('paxBand'),
    startDate: field('startDate'),
    nights: field('nights'),
    budgetBand: field('budgetBand'),
    org: field('org'),
    needs: formData.getAll('needs').filter((value) => typeof value === 'string'),
    notes: field('notes'),
    name: field('name') ?? '',
    phone: field('phone') ?? '',
    email: field('email'),
    contactPref: field('contactPref'),
    consent: field('consent'),
  };

  const result = quoteRequestSchema.safeParse(raw);
  if (result.success) return { ok: true, data: result.data };

  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof QuoteRequestInput | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return { ok: false, errors };
}
