import { Injectable } from '@nestjs/common'
import { AuctionBid, Prisma } from '@prisma/client'
import { PrismaService } from '../database/prisma.service'

@Injectable()
export class BidsService {
    constructor(private prisma: PrismaService) {}

    async getBidById(id: number): Promise<AuctionBid | null> {
        return this.prisma.auctionBid.findUnique({
            where: {
                id: id,
            },
            include: {
                user: true,
                auction: true,
            },
        })
    }

    async getAllBids(): Promise<AuctionBid[]> {
        return this.prisma.auctionBid.findMany()
    }

    async bids(
        skip?: number,
        take?: number,
        where?: Prisma.AuctionBidWhereInput,
        orderBy?: Prisma.AuctionBidOrderByWithRelationInput,
    ): Promise<AuctionBid[]> {
        return this.prisma.auctionBid.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                user: true,
                auction: true,
            },
        })
    }

    async createBid(data: Prisma.AuctionBidCreateInput): Promise<AuctionBid> {
        return this.prisma.auctionBid.create({
            data,
            include: {
                user: true,
                auction: true,
            },
        })
    }

    async updateBid(where: Prisma.AuctionBidWhereUniqueInput, data: Prisma.AuctionBidUpdateInput): Promise<AuctionBid> {
        return this.prisma.auctionBid.update({
            data,
            where,
        })
    }

    async deleteBid(where: Prisma.AuctionBidWhereUniqueInput): Promise<AuctionBid> {
        return this.prisma.auctionBid.delete({
            where,
        })
    }
}
