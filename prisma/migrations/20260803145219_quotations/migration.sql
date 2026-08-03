-- CreateEnum
CREATE TYPE "QuotationStatus" AS ENUM ('draft', 'sent', 'accepted', 'expired', 'superseded');

-- AlterEnum
ALTER TYPE "RequestEventType" ADD VALUE 'quotation_sent';

-- CreateTable
CREATE TABLE "quotations" (
    "id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "lineItems" JSONB NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL,
    "deposit_percent" INTEGER NOT NULL DEFAULT 30,
    "deposit_amount" INTEGER NOT NULL,
    "valid_until" DATE NOT NULL,
    "notes" TEXT,
    "status" "QuotationStatus" NOT NULL DEFAULT 'draft',
    "created_by_id" TEXT,
    "created_by_name" TEXT NOT NULL,
    "sent_at" TIMESTAMP(3),
    "accepted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quotations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "quotations_request_id_created_at_idx" ON "quotations"("request_id", "created_at");

-- AddForeignKey
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "quote_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
