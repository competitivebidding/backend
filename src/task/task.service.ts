import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PrismaService } from '../database/prisma.service'

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService, private readonly config: ConfigService) {}

    // @Cron(CronExpression.EVERY_30_SECONDS)
    // async createAuction() {
    //     await seedAuctions(2, 'Cron add auctions')
    // }

    @Cron(CronExpression.EVERY_5_SECONDS)
    async closeAuction() {
        const openAuctions = await this.prisma.auction.findMany({
            where: { statusId: { in: [1, 2] } },
            select: { id: true },
        })

        const auctionIds = openAuctions.map((p) => p.id)

        const randomIndex = Math.floor(Math.random() * auctionIds.length)

        const shuffledNumbers = auctionIds.slice() // Create a copy of the array

        // Shuffle the array using the Fisher-Yates algorithm
        for (let i = shuffledNumbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[shuffledNumbers[i], shuffledNumbers[j]] = [shuffledNumbers[j], shuffledNumbers[i]]
        }

        // Get the first two values from the shuffled array
        const randomValue1 = shuffledNumbers[0]
        const randomValue2 = shuffledNumbers[1]

        console.log(`Random values: ${randomValue1}, ${randomValue2}`)
    }
}
