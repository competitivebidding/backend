import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedAuctionBids() {
    // Get all user IDs from the database
    const users = await prisma.user.findMany({ select: { id: true } })
    const userIds = users.map((user) => user.id)

    // Get all status IDs from the database
    const auctiones = await prisma.auction.findMany({ select: { id: true } })

    for (const auction of auctiones) {
        const amoutBids = Math.floor(Math.random() * 10)
        for (let i = 0; i < amoutBids; i++) {
            const userId = userIds[Math.floor(Math.random() * userIds.length)]
            const { id: auctionId } = auction
            const bitPrice = Math.floor(Math.random() * 50)
            const inputBid = {
                bitPrice,
                auction: { connect: { id: auctionId } },
                user: { connect: { id: userId } },
            }
            await prisma.auctionBid.create({ data: inputBid })
        }
    }

    console.log('Seed AuctionBids completed.')
}
