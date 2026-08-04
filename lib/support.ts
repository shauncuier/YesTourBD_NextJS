import { z } from 'zod';

// Validation for the contact form. Pure and import-free, so it can be tested without the
// database — see the note in CLAUDE.md about keeping rules out of database modules.

export const SUPPORT_TOPICS = [
  { value: 'booking', label: 'An existing booking or request' },
  { value: 'payment', label: 'Payment or refund' },
  { value: 'corporate', label: 'Corporate or group travel' },
  { value: 'visa', label: 'Visa assistance' },
  { value: 'other', label: 'Something else' },
] as const;

const TOPIC_VALUES = SUPPORT_TOPICS.map((topic) => topic.value) as [string, ...string[]];

/** Same rule as the quote form: separators stripped before judging, one stored shape after. */
const BD_MOBILE = /^(?:\+?880|0)1[3-9]\d{8}$/;

export const supportSchema = z.object({
  name: z.string().trim().min(2, 'Tell us who you are').max(120),
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
  topic: z.enum(TOPIC_VALUES, { message: 'Pick what this is about' }),
  /** The reference is optional, and only useful when the enquiry is about one. */
  ref: z
    .string()
    .trim()
    .max(20)
    .transform((value) => (value === '' ? undefined : value.toUpperCase()))
    .optional(),
  message: z.string().trim().min(10, 'A sentence or two, so we can actually help').max(2000),
});

export type SupportInput = z.infer<typeof supportSchema>;
export type SupportFieldErrors = Partial<Record<keyof SupportInput, string>>;

export function parseSupportMessage(formData: FormData):
  | { ok: true; data: SupportInput }
  | { ok: false; errors: SupportFieldErrors } {
  const field = (key: string) => {
    const value = formData.get(key);
    if (typeof value !== 'string' || value === '') return undefined;
    return value;
  };

  const result = supportSchema.safeParse({
    name: field('name') ?? '',
    phone: field('phone') ?? '',
    email: field('email'),
    topic: field('topic'),
    ref: field('ref'),
    message: field('message') ?? '',
  });

  if (result.success) return { ok: true, data: result.data };

  const errors: SupportFieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof SupportInput | undefined;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return { ok: false, errors };
}

/**
 * What the coordinator reads in the queue. The topic and any reference go into the note
 * itself, because a support enquiry has no destination or traveller count to identify it by.
 */
export function supportNote(input: SupportInput): string {
  const topic = SUPPORT_TOPICS.find((t) => t.value === input.topic)?.label ?? input.topic;
  const about = input.ref ? `${topic} · about ${input.ref}` : topic;
  return `${about}\n\n${input.message}`;
}
