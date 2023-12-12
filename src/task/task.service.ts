import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PrismaService } from '../database/prisma.service'

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService, private readonly config: ConfigService) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async createAuction() {
        const users = await this.prisma.user.findMany({ select: { id: true } })
        const userIds = users.map((user) => user.id)

        const statuses = await this.prisma.auctionStatus.findMany({ select: { id: true } })
        const statusIds = statuses.map((status) => status.id)

        const categories = await this.prisma.auctionCategory.findMany()
        const categoryIds = categories.map((category) => category.id)

        for (let i = 0; i < 2; i++) {
            const title = faker.lorem.words(3)
            const description = faker.lorem.paragraphs(3)
            const startingPrice = faker.datatype.number(2500)
            await this.prisma.auction.create({
                data: {
                    title: title,
                    description: description,
                    startingPrice: startingPrice,
                    creator: { connect: { id: userIds[Math.floor(Math.random() * userIds.length)] } },
                    status: { connect: { id: statusIds[Math.floor(Math.random() * 2)] } },
                    finishedAt: faker.date.soon(),
                    createdAt: faker.date.past(),
                    startedAt: faker.date.past(),
                    AuctionCategoryAuction: {
                        create: [
                            {
                                categoryId: categoryIds[Math.floor(Math.random() * categoryIds.length)],
                            },
                        ],
                    },
                },
            })
        }

        console.log('Cron add auctions')
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    async closeAuction() {
        const arr = []
        const openAuctions = await this.prisma.auction.findMany({
            where: { statusId: { in: [1, 2] } },
            select: { id: true, createdAt: true },
        })

        const closingAuctions = openAuctions.map((auction) => {
            const time = (Date.now() - +auction.createdAt) / (1000 * 60)
            if (time > 2) {
                return auction.id
            }
        })

        for (let i = 0; i < closingAuctions.length - 1; i++) {
            const maxBid = await this.prisma.auctionBid.findFirst({
                where: { id: closingAuctions[i] },
                orderBy: [{ bitPrice: 'desc' }],
            })

            arr.push(
                await this.prisma.auction.update({
                    where: { id: closingAuctions[i] },
                    data: { wonUserId: maxBid.userId, statusId: 3 },
                }),
            )
        }

        console.log('Cron closed auction.')
    }

    @Cron(CronExpression.EVERY_5_SECONDS)
    async auctionBid() {
        const arr = []
        const users = await this.prisma.user.findMany({ select: { id: true } })
        const userIds = users.map((user) => user.id)

        const auctiones = await this.prisma.auction.findMany({
            where: { statusId: { in: [1, 2] } },
            select: { id: true },
        })

        for (const auction of auctiones) {
            const amoutBids = Math.floor(Math.random() * 10)
            for (let i = 0; i < amoutBids; i++) {
                const userId = userIds[Math.floor(Math.random() * userIds.length)]
                const { id: auctionId } = auction
                const bitPrice = Math.floor(Math.random() * 50)
                const inputBid = {
                    bitPrice,
                    auction: { connect: { id: auctionId } },
                    user: { connect: { id: userId } },
                }
                arr.push(await this.prisma.auctionBid.create({ data: inputBid }))
            }
        }

        console.log('Cron add auctionBids.')
    }
}
