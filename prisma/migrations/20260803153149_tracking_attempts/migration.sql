-- CreateTable
CREATE TABLE "tracking_attempts" (
    "id" TEXT NOT NULL,
    "ip_hash" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tracking_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tracking_attempts_ip_hash_created_at_idx" ON "tracking_attempts"("ip_hash", "created_at");
