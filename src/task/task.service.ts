import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PrismaService } from '../database/prisma.service'
import { seedAuctions } from '../database/seeds/seedAuction'
import OpenAuction from './utils/open-auction.interface'

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService, private readonly config: ConfigService) {}

    bitPrice = Math.floor(Math.random() * 50)
    amoutBids = Math.floor(Math.random() * 10)

    private async close(auction: OpenAuction) {
        if (!auction.bids[0].userId) {
            console.log('There are no bids for this auction and it has been cancelled.')
            await this.prisma.auction.update({
                where: { id: auction.id },
                data: { statusId: +this.config.get<number>('AUCTION_STATUS_CANCELLED') },
            })
        }
        await this.prisma.auction.update({
            where: { id: auction.id },
            data: { wonUserId: auction.bids[0].userId, statusId: +this.config.get<number>('AUCTION_STATUS_CLOSED') },
        })
    }

    @Cron(CronExpression.EVERY_6_HOURS)
    async createAuction() {
        seedAuctions('Cron add auctions', 2)
    }

    @Cron(CronExpression.EVERY_6_HOURS)
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
            select: { id: true, bids: { orderBy: { bitPrice: 'desc' }, take: 1, select: { userId: true } } },
        })
        const rndAuction1 = openAuctions[Math.floor(Math.random() * openAuctions.length)]
        let rndAuction2 = openAuctions[Math.floor(Math.random() * openAuctions.length)]
        while (rndAuction1 === rndAuction2) {
            rndAuction2 = openAuctions[Math.floor(Math.random() * openAuctions.length)]
        }
        await this.close(rndAuction1)
        await this.close(rndAuction2)
        console.log('Cron auctions closed')
    }

    @Cron(CronExpression.EVERY_2_HOURS)
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
