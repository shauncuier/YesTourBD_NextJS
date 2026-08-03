-- CreateEnum
CREATE TYPE "SmsStatus" AS ENUM ('queued', 'sent', 'failed');

-- CreateTable
CREATE TABLE "otp_challenges" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "code_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "consumed_at" TIMESTAMP(3),
    "ip_hash" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sms_messages" (
    "id" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "status" "SmsStatus" NOT NULL DEFAULT 'queued',
    "transport" TEXT NOT NULL,
    "error" TEXT,
    "sent_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sms_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "otp_challenges_phone_created_at_idx" ON "otp_challenges"("phone", "created_at");

-- CreateIndex
CREATE INDEX "otp_challenges_ip_hash_created_at_idx" ON "otp_challenges"("ip_hash", "created_at");

-- CreateIndex
CREATE INDEX "sms_messages_status_created_at_idx" ON "sms_messages"("status", "created_at");
