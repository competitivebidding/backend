import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedAuctionCategories() {
    const amount = 10

    for (let i = 0; i < amount; i++) {
        await prisma.auctionCategory.create({
            data: {
                name: faker.commerce.department(),
                description: faker.lorem.sentence(),
                imageUrl: faker.image.imageUrl(),
                slug: faker.helpers.slugify(faker.commerce.department()),
                sortOrder: i,
            },
        })
    }

    console.log('Seed AuctionCategories completed.')
}
