/*
  Warnings:

  - You are about to drop the column `creationTime` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `validUntil` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `winnerId` on the `Auction` table. All the data in the column will be lost.
  - The primary key for the `AuctionBid` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `creationTime` on the `AuctionBid` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cuid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdUserId` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishedAt` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `AuctionBid` table without a default value. This is not possible if the table is not empty.
  - The required column `cuid` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Auction" DROP CONSTRAINT "Auction_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Auction" DROP CONSTRAINT "Auction_winnerId_fkey";

-- DropForeignKey
ALTER TABLE "AuctionBid" DROP CONSTRAINT "AuctionBid_userId_fkey";

-- AlterTable
ALTER TABLE "Auction" DROP COLUMN "creationTime",
DROP COLUMN "creatorId",
DROP COLUMN "status",
DROP COLUMN "validUntil",
DROP COLUMN "winnerId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdUserId" INTEGER NOT NULL,
ADD COLUMN     "finishedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "statusId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER,
ADD COLUMN     "wonUserId" INTEGER;

-- AlterTable
ALTER TABLE "AuctionBid" DROP CONSTRAINT "AuctionBid_pkey",
DROP COLUMN "creationTime",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "AuctionBid_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cuid" TEXT NOT NULL,
ADD COLUMN     "firstname" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "lastname" TEXT,
ADD COLUMN     "patronymic" TEXT;

-- CreateTable
CREATE TABLE "UserPayment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "number" TEXT,
    "cvv" TEXT,
    "month" TEXT,
    "year" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserReferral" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserReferral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAddress" (
    "id" SERIAL NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "address" TEXT,
    "index" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuctionManufacturer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "auctionId" INTEGER NOT NULL,

    CONSTRAINT "AuctionManufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuctionStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AuctionStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuctionReview" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "auctionId" INTEGER,
    "countPlace" INTEGER,
    "startAt" TIMESTAMP(3),
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuctionReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuctionCategoriesOnAuction" (
    "auctionId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "AuctionCategoriesOnAuction_pkey" PRIMARY KEY ("auctionId","categoryId")
);

-- CreateTable
CREATE TABLE "AuctionCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "slug" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "parentId" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuctionCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuctionFilterOnAuction" (
    "auctionId" INTEGER NOT NULL,
    "filterId" INTEGER NOT NULL,

    CONSTRAINT "AuctionFilterOnAuction_pkey" PRIMARY KEY ("auctionId","filterId")
);

-- CreateTable
CREATE TABLE "AuctionFilter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "filterGroupId" INTEGER NOT NULL,

    CONSTRAINT "AuctionFilter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilterGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FilterGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenHistory" (
    "id" SERIAL NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "price" INTEGER,
    "points" INTEGER,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cuid_key" ON "User"("cuid");

-- AddForeignKey
ALTER TABLE "UserPayment" ADD CONSTRAINT "UserPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReferral" ADD CONSTRAINT "UserReferral_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionBid" ADD CONSTRAINT "AuctionBid_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_createdUserId_fkey" FOREIGN KEY ("createdUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_wonUserId_fkey" FOREIGN KEY ("wonUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AuctionStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionManufacturer" ADD CONSTRAINT "AuctionManufacturer_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionReview" ADD CONSTRAINT "AuctionReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionReview" ADD CONSTRAINT "AuctionReview_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionCategoriesOnAuction" ADD CONSTRAINT "AuctionCategoriesOnAuction_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionCategoriesOnAuction" ADD CONSTRAINT "AuctionCategoriesOnAuction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "AuctionCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionCategory" ADD CONSTRAINT "AuctionCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "AuctionCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionFilterOnAuction" ADD CONSTRAINT "AuctionFilterOnAuction_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionFilterOnAuction" ADD CONSTRAINT "AuctionFilterOnAuction_filterId_fkey" FOREIGN KEY ("filterId") REFERENCES "AuctionFilter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionFilter" ADD CONSTRAINT "AuctionFilter_filterGroupId_fkey" FOREIGN KEY ("filterGroupId") REFERENCES "FilterGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenHistory" ADD CONSTRAINT "TokenHistory_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenHistory" ADD CONSTRAINT "TokenHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
