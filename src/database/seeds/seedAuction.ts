import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedAuctions() {
    // Get all user IDs from the database
    const users = await prisma.user.findMany({ select: { id: true } })
    const userIds = users.map((user) => user.id)

    // Get all status IDs from the database
    const statuses = await prisma.auctionStatus.findMany({ select: { id: true } })
    const statusIds = statuses.map((status) => status.id)

    for (let i = 0; i < 10; i++) {
        const title = faker.lorem.words(3)
        const description = faker.lorem.paragraphs(3)
        await prisma.auction.create({
            data: {
                title: title,
                description: description,
                creator: { connect: { id: userIds[Math.floor(Math.random() * userIds.length)] } },
                status: { connect: { id: statusIds[Math.floor(Math.random() * statusIds.length)] } },
                finishedAt: faker.date.soon(),
                createdAt: faker.date.past(),
                startedAt: faker.date.past(),
            },
        })
    }

    console.log('Seed Auctions completed.')
}
