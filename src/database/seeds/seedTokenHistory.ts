import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedTokenHistory() {
    // Get all user IDs from the database
    const users = await prisma.user.findMany({ select: { id: true } })
    const userIds = users.map((user) => user.id)

    // const prices = await prisma.tokenHistory.findMany({select: {price: true}})
    // const points= await prisma.token.findMany({ select: {points: true } })
    
    // const pricesArr = prices.map((price) => price.price)
    // const pointsArr = points.map((point) => point.points)

    const tokens = await prisma.token.findMany({ select: { id: true } })
    const tokensIds = tokens.map((token) => token.id)


    for (const userId of userIds) {

        for (let i = 0; i < 10; i++) {

            const priceStr = faker.finance.amount(500, 10000)
            const price = parseFloat(priceStr)
    
            const pointsStr = faker.finance.account(5)
            const points = parseFloat(pointsStr)
    
            const tokenId = tokensIds[Math.floor(Math.random() * tokensIds.length)]
           
            await prisma.tokenHistory.create({
                data: {
                    tokenId: tokenId,
                    userId: userId,
                    points: points,
                    price: price
                },
            })
        }


    }

    // Create 30 news articles with random user IDs
   
    console.log('Seed TokenHistory completed.')
}
