/*
  Warnings:

  - Added the required column `startingPrice` to the `Auction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auction" ADD COLUMN     "startingPrice" INTEGER NOT NULL;
