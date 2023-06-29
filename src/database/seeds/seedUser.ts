import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedUsers() {
    for (let i = 0; i < 10; i++) {

        const balanceStr = faker.finance.account(4)
        const balance = parseFloat(balanceStr)


        await prisma.user.create({
            data: {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                hashedPassword: '',
                balance: balance
            },
        })
    }
    console.log('Seed Users completed.')
}
