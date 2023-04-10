/*
  Warnings:

  - You are about to drop the column `creation_time` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `validity` on the `Auction` table. All the data in the column will be lost.
  - Added the required column `creationTime` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validUntil` to the `Auction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Auction" DROP CONSTRAINT "Auction_winnerId_fkey";

-- AlterTable
ALTER TABLE "Auction" DROP COLUMN "creation_time",
DROP COLUMN "price",
DROP COLUMN "validity",
ADD COLUMN     "creationTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "validUntil" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "winnerId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "AuctionBid" (
    "userId" INTEGER NOT NULL,
    "auctionId" INTEGER NOT NULL,
    "bitPrice" INTEGER NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuctionBid_pkey" PRIMARY KEY ("userId","auctionId")
);

-- AddForeignKey
ALTER TABLE "AuctionBid" ADD CONSTRAINT "AuctionBid_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionBid" ADD CONSTRAINT "AuctionBid_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
