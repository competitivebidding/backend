import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedToken() {
    // Create 30 news articles with random user IDs
    for (let i = 0; i < 10; i++) {
        const title = faker.lorem.sentence()
        const description = faker.lorem.paragraph()

        const pricesStr = faker.finance.amount(100, 10000)
        const price = parseFloat(pricesStr)

        const pointsStr = faker.finance.account(3)
        const points = parseFloat(pointsStr)

        await prisma.token.create({
            data: {
                title: title,
                description: description,
                points: points,
                price: price,
            },
        })
    }
    console.log('Seed Token completed.')
}
