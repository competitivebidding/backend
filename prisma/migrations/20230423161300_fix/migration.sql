/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `AuctionStatus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `startedAt` to the `Auction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auction" ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "AuctionStatus_name_key" ON "AuctionStatus"("name");
