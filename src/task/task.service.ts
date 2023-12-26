import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PrismaService } from '../database/prisma.service'
import { seedAuctions } from '../database/seeds/seedAuction'

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService, private readonly config: ConfigService) {}

    bitPrice = Math.floor(Math.random() * 50)
    amoutBids = Math.floor(Math.random() * 10)

    private async getMaxBid(auctionId: number) {
        const maxBid = await this.prisma.auctionBid.findFirst({
            where: { id: auctionId },
            orderBy: { bitPrice: 'desc' },
        })

        await this.prisma.auction.update({
            where: { id: auctionId },
            data: { wonUserId: maxBid.userId, statusId: +this.config.get<number>('AUCTION_STATUS_CLOSED') },
        })
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    async createAuction() {
        seedAuctions('Cron add auctions', 2)
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    async closeAuction() {
        const openAuctions = await this.prisma.auction.findMany({
            where: {
                statusId: {
                    in: [
                        +this.config.get<number>('AUCTION_STATUS_NEW'),
                        +this.config.get<number>('AUCTION_STATUS_OPEN'),
                    ],
                },
                finishedAt: { gt: new Date(Date.now()) },
            },
            select: { id: true },
        })

        const rndAuction1 = openAuctions[Math.floor(Math.random() * openAuctions.length)]
        let rndAuction2 = openAuctions[Math.floor(Math.random() * openAuctions.length)]

        while (rndAuction1 === rndAuction2) {
            rndAuction2 = openAuctions[Math.floor(Math.random() * openAuctions.length)]
        }

        await this.getMaxBid(rndAuction1.id)
        await this.getMaxBid(rndAuction2.id)

        console.log('Cron auctions closed')
    }

    @Cron(CronExpression.EVERY_6_HOURS)
    async auctionBid() {
        const users = await this.prisma.user.findMany({ select: { id: true } })
        const userIds = users.map((user) => user.id)

        const auctiones = await this.prisma.auction.findMany({
            where: {
                statusId: {
                    in: [
                        +this.config.get<number>('AUCTION_STATUS_NEW'),
                        +this.config.get<number>('AUCTION_STATUS_OPEN'),
                    ],
                },
            },
            select: { id: true },
        })

        for (const auction of auctiones) {
            for (let i = 0; i < this.amoutBids; i++) {
                const userId = userIds[Math.floor(Math.random() * userIds.length)]
                const { id: auctionId } = auction
                const inputBid = {
                    bitPrice: this.bitPrice,
                    auction: { connect: { id: auctionId } },
                    user: { connect: { id: userId } },
                }
                await this.prisma.auctionBid.create({ data: inputBid })
            }
        }

        console.log('Cron add auctionBids.')
    }
}
