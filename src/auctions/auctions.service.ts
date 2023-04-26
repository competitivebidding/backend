import { Injectable } from '@nestjs/common'
import { Auction, Prisma } from '@prisma/client'
import { PrismaService } from '../database/prisma.service'

@Injectable()
export class AuctionsService {
    constructor(private prisma: PrismaService) {}

    async getAllAuctions(): Promise<Auction[]> {
        return this.prisma.auction.findMany()
    }

    async getAuctionById(id: number): Promise<Auction | null> {
        return this.prisma.auction.findUnique({
            where: { id: Number(id) },
            include: {
                creator: true,
                winner: true,
                status: true,
                bids: true,
                manufacturers: true,
                AuctionReview: true,
            },
        })
    }

    async auctions(
        skip?: number,
        take?: number,
        where?: Prisma.AuctionWhereInput,
        orderBy?: Prisma.AuctionOrderByWithRelationInput,
    ): Promise<Auction[]> {
        return this.prisma.auction.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                creator: true,
                winner: true,
                status: true,
                bids: true,
                manufacturers: true,
                AuctionReview: true,
            },
        })
    }

    async createAuction(data: Prisma.AuctionCreateInput): Promise<Auction> {
        return this.prisma.auction.create({
            data,
            include: {
                creator: true,
                winner: true,
                status: true,
                bids: true,
                manufacturers: true,
                AuctionReview: true,
            },
        })
    }

    async updateAuction(id: number, data: Prisma.AuctionUpdateInput): Promise<Auction> {
        return this.prisma.auction.update({
            data,
            where: { id: id },
        })
    }

    async deleteAuction(id: number): Promise<Auction> {
        return this.prisma.auction.delete({
            where: { id: id },
        })
    }
}
