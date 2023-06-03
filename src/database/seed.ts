import { PrismaClient } from '@prisma/client'
import { seedAuctions } from './seeds/seedAuction'
import { seedAuctionBids } from './seeds/seedAuctionBids'
import { seedAuctionStatus } from './seeds/seedAuctionStatus'
import { seedNews } from './seeds/seedNews'
import { seedUsers } from './seeds/seedUser'

const prisma = new PrismaClient()

async function seed() {
    // User data
    await seedUsers()

    // Auction sata
    await seedAuctionStatus()
    await seedAuctions()
    await seedAuctionBids()

    // static data
    await seedNews()
}

seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
