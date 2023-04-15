import { PrismaClient } from '@prisma/client'
import { seedNews } from './seedNews'
import { seedUsers } from './seedUser'

const prisma = new PrismaClient()

async function seed() {
    // generate seed data here
    await seedUsers()
    await seedNews()
}

seed().finally(() => {
    prisma.$disconnect() // disconnect from the database
})
