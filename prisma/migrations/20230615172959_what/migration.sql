/*
  Warnings:

  - You are about to drop the column `userId` on the `Auction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,createdUserId]` on the table `Auction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,userId]` on the table `AuctionBid` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Auction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Auction" DROP CONSTRAINT "Auction_userId_fkey";

-- AlterTable
ALTER TABLE "Auction" DROP COLUMN "userId",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AuctionStatus" ALTER COLUMN "name" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Auction_id_createdUserId_key" ON "Auction"("id", "createdUserId");

-- CreateIndex
CREATE UNIQUE INDEX "AuctionBid_id_userId_key" ON "AuctionBid"("id", "userId");
