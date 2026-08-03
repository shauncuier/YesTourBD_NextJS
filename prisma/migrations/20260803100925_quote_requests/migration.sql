-- References are REQ-XXXX and have to be unique under concurrent submissions, so they come
-- from a sequence rather than from application code. Starting at 2261 matches the design
-- system's worked example (REQ-2261) and keeps the reference four digits for years.
-- Hand-written: Prisma's schema language has no sequence declaration.
CREATE SEQUENCE "quote_request_ref_seq" START 2261;

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('corporate', 'group', 'visa', 'package', 'car');

-- CreateEnum
CREATE TYPE "ContactPref" AS ENUM ('whatsapp', 'call', 'email');

-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('submitted', 'reviewing', 'quoted', 'negotiating', 'accepted', 'booked', 'expired', 'lost');

-- CreateTable
CREATE TABLE "quote_requests" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL DEFAULT ('REQ-'::text || nextval('quote_request_ref_seq'::regclass)),
    "user_id" TEXT,
    "request_type" "RequestType" NOT NULL,
    "destinations" TEXT NOT NULL,
    "pax_band" TEXT NOT NULL,
    "start_date" DATE,
    "nights" INTEGER,
    "budget_band" TEXT,
    "org" TEXT,
    "needs" TEXT[],
    "notes" TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "contact_pref" "ContactPref" NOT NULL,
    "status" "QuoteStatus" NOT NULL DEFAULT 'submitted',
    "ip_hash" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quote_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quote_requests_ref_key" ON "quote_requests"("ref");

-- CreateIndex
CREATE INDEX "quote_requests_status_created_at_idx" ON "quote_requests"("status", "created_at");

-- CreateIndex
CREATE INDEX "quote_requests_ip_hash_created_at_idx" ON "quote_requests"("ip_hash", "created_at");

-- CreateIndex
CREATE INDEX "quote_requests_phone_created_at_idx" ON "quote_requests"("phone", "created_at");

-- AddForeignKey
ALTER TABLE "quote_requests" ADD CONSTRAINT "quote_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
