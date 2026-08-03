-- CreateEnum
CREATE TYPE "RequestEventType" AS ENUM ('status_changed', 'assigned', 'note');

-- AlterTable
ALTER TABLE "quote_requests" ADD COLUMN     "assigned_to_id" TEXT;

-- CreateTable
CREATE TABLE "quote_request_events" (
    "id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "type" "RequestEventType" NOT NULL,
    "actor_id" TEXT,
    "actor_name" TEXT NOT NULL,
    "from_status" "QuoteStatus",
    "to_status" "QuoteStatus",
    "body" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quote_request_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "quote_request_events_request_id_created_at_idx" ON "quote_request_events"("request_id", "created_at");

-- CreateIndex
CREATE INDEX "quote_requests_assigned_to_id_status_idx" ON "quote_requests"("assigned_to_id", "status");

-- AddForeignKey
ALTER TABLE "quote_requests" ADD CONSTRAINT "quote_requests_assigned_to_id_fkey" FOREIGN KEY ("assigned_to_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_request_events" ADD CONSTRAINT "quote_request_events_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "quote_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_request_events" ADD CONSTRAINT "quote_request_events_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
