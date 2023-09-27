import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedAuctionStatus() {
    const auctionStatusData = [{ name: 'New' }, { name: 'Open' }, { name: 'Closed' }, { name: 'Cancelled' }]

    await prisma.auctionStatus.createMany({
        data: auctionStatusData,
    })

    console.log('Seed AuctionStatus completed.')
}
