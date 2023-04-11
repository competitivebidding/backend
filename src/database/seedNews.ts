import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
    // Get all user IDs from the database
    // const users = await prisma.user.findMany({ select: { id: true } })
    // const userIds = users.map((user) => user.id)
    // // Create 30 news articles with random user IDs
    // for (let i = 0; i < 30; i++) {
    //     const imageUrl = faker.image.imageUrl()
    //     const title = faker.lorem.sentence()
    //     const description = faker.lorem.paragraph()
    //     const userId = userIds[Math.floor(Math.random() * userIds.length)]
    //     await prisma.news.create({
    //         data: {
    //             title: title,
    //             description: description,
    //             imageUrl: imageUrl,
    //             userId: userId,
    //         },
    //     })
    // }
    // console.log('Seed completed.')
    // process.exit(0)
}

//seed()
