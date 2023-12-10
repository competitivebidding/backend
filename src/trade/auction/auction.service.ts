import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { Auction } from './entities/auction.entity'

@Injectable()
export class AuctionService {
    constructor(private prisma: PrismaService) {}

    async getAuctionById(auctionId: number): Promise<Auction> {
        return this.prisma.auction.findUnique({
            where: { id: auctionId },
            include: {
                creator: true,
                winner: true,
                status: true,
                bids: {
                    include: {
                        user: true,
                    },
                },
            },
        })
    }

    async getAuctions(
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
                bids: {
                    include: {
                        user: true,
                    },
                },
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
                bids: {
                    include: {
                        user: true,
                    },
                },
            },
        })
    }

    async updateAuction(userId: number, auctionId: number, data: Prisma.AuctionUpdateInput): Promise<Auction> {
        return this.prisma.auction.update({
            data,
            where: { id_createdUserId: { id: auctionId, createdUserId: userId } },
            include: {
                creator: true,
                winner: true,
                status: true,
                bids: {
                    include: {
                        user: true,
                    },
                },
            },
        })
    }

    async deleteAuction(userId: number, auctionId: number): Promise<boolean> {
        return !!this.prisma.auction.delete({
            where: { id_createdUserId: { id: auctionId, createdUserId: userId } },
        })
    }

    async changeTheAuctionStatus(auctionId: number, statusId: number) {
        return await this.prisma.auction.update({ where: { id: auctionId }, data: { statusId } })
    }
}
