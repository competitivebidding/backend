/*
  Warnings:

  - Added the required column `name` to the `AuctionManufacturer` table without a default value. This is not possible if the table is not empty.
  - Made the column `price` on table `Token` required. This step will fail if there are existing NULL values in that column.
  - Made the column `points` on table `Token` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AuctionManufacturer" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "points" SET NOT NULL;
