import { PrismaClient } from '@prisma/client'
import { seedNews } from './seeds/seedNews'
import { seedUsers } from './seeds/seedUser'

const prisma = new PrismaClient()

async function seed() {
    // generate seed data here
    await seedUsers()
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
