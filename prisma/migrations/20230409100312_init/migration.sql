-- CreateTable
CREATE TABLE "Auction" (
    "id" SERIAL NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "winnerId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "price" INTEGER NOT NULL,
    "creation_time" TIMESTAMP(3) NOT NULL,
    "validity" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
