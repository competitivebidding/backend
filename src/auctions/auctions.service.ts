import { Injectable } from '@nestjs/common'
import { Auction, Prisma } from '@prisma/client'
import { PrismaService } from '../database/prisma.service'

@Injectable()
export class AuctionsService {
    constructor(private prisma: PrismaService) {}

    async auction(auctionWhereUniqueInput: Prisma.AuctionWhereUniqueInput): Promise<Auction | null> {
        return this.prisma.auction.findUnique({
            where: auctionWhereUniqueInput,
        })
    }

    async getAllAuctions(): Promise<Auction[]> {
        return this.prisma.auction.findMany()
    }

    async getAuction(id: number): Promise<Auction | null> {
        return this.prisma.auction.findUnique({ where: { id: Number(id) } })
    }

    async auctions(params: {
        skip?: number
        take?: number
        cursor?: Prisma.AuctionWhereUniqueInput
        where?: Prisma.AuctionWhereInput
        orderBy?: Prisma.AuctionOrderByWithRelationInput
    }): Promise<Auction[]> {
        const { skip, take, cursor, where, orderBy } = params
        return this.prisma.auction.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        })
    }

    async createAuction(data: Prisma.AuctionCreateInput): Promise<Auction> {
        return this.prisma.auction.create({
            data,
        })
    }

    // async updateAuction(params: {
    //     where: Prisma.AuctionWhereUniqueInput
    //     data: Prisma.AuctionUpdateInput
    // }): Promise<Auction> {
    //     const { where, data } = params
    //     return this.prisma.auction.update({
    //         data,
    //         where,
    //     })
    // }

    // async deleteAuction(where: Prisma.AuctionWhereUniqueInput): Promise<Auction> {
    //     return this.prisma.auction.delete({
    //         where,
    //     })
    // }
}
