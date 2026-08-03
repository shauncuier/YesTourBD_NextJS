-- Notification preferences. Booking updates default on because they are transactional — the
-- customer asked for the trip. Marketing defaults off, which is the only defensible default
-- for something nobody opted into.
--
-- Hand-written: `prisma dev`'s shadow database was unavailable, and this is three additive
-- columns with defaults, so there is nothing to backfill and nothing to get wrong.
ALTER TABLE "users"
  ADD COLUMN "notify_booking_updates" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "notify_offers" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "notify_newsletter" BOOLEAN NOT NULL DEFAULT false;
