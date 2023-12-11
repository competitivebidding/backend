import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { Bid } from './entities/bid.entity'

@Injectable()
export class BidService {
    constructor(private readonly prisma: PrismaService, private readonly config: ConfigService) {}

    async getBidById(id: number): Promise<Bid> {
        return this.prisma.auctionBid.findUnique({
            where: {
                id: id,
            },
            include: {
                user: true,
            },
        })
    }

    async getBids(
        skip?: number,
        take?: number,
        where?: Prisma.AuctionBidWhereInput,
        orderBy?: Prisma.AuctionBidOrderByWithRelationInput,
    ): Promise<Bid[]> {
        return this.prisma.auctionBid.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                user: true,
            },
        })
    }

    async createMyBid(data: Prisma.AuctionBidCreateInput): Promise<Bid> {
        return this.prisma.auctionBid.create({
            data,
            include: {
                user: true,
            },
        })
    }

    async updateMyBid(userId: number, bidId: number, data: Prisma.AuctionBidUpdateInput): Promise<Bid> {
        return this.prisma.auctionBid.update({
            data,
            where: { id_userId: { id: bidId, userId: userId } },
            include: {
                user: true,
            },
        })
    }

    async deleteMyBid(userId: number, bidId: number): Promise<boolean> {
        return !!this.prisma.auctionBid.delete({
            where: { id_userId: { id: bidId, userId: userId } },
        })
    }

    async getBidByUserId(userId: number) {
        return this.prisma.auctionBid.findFirst({ where: { userId } })
    }

    async getHighestPrice(bitPrice: number): Promise<Bid> {
        const high = await this.prisma.auctionBid.findFirst({ where: { bitPrice: { gt: bitPrice } } })
        return high
    }

    async countParticipantsWithoutUser(auctionId: number, userId: number): Promise<number> {
        const uniqueUserCount = await this.prisma.auctionBid.groupBy({
            by: ['userId'],
            _count: {
                userId: true,
            },
            where: {
                auctionId: auctionId,
                userId: {
                    not: userId,
                },
            },
        })

        return uniqueUserCount.length
    }

    async maxBid(auctionId: number) {
        const bid = await this.prisma.auctionBid.findFirst({ where: { auctionId }, orderBy: [{ bitPrice: 'desc' }] })
        return await bid
    }

    async checkAuctionStatus(auctionId: number) {
        const auction = await this.prisma.auction.findUnique({ where: { id: auctionId } })

        if (
            auction.statusId === +this.config.get('AUCTION_STATUS_CLOSED') ||
            auction.statusId === +this.config.get('AUCTION_STATUS_CANCELLED')
        ) {
            throw new Error('Auction already closed or cancelled')
        }
    }
}
