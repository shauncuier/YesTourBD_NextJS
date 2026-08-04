-- Support enquiries share the request queue rather than getting an inbox of their own: a
-- second queue is a second thing to forget to watch, and the SLA, history and assignment
-- already work here.
--
-- Hand-written: `prisma dev`'s shadow database was unavailable again. Postgres 12+ allows
-- ADD VALUE inside a transaction as long as the new value is not used in the same one, and
-- nothing here uses it.
ALTER TYPE "RequestType" ADD VALUE 'support';

-- A support enquiry is about a booking or a policy, not a place, so neither field applies.
ALTER TABLE "quote_requests"
  ALTER COLUMN "destinations" DROP NOT NULL,
  ALTER COLUMN "pax_band" DROP NOT NULL;
