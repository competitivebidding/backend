import { Injectable } from '@nestjs/common'
import { AuctionCategory } from '@prisma/client'
import { PrismaService } from '../database/prisma.service'

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async getAllCategories(where: any, orderBy: any, skip: number, take: number): Promise<AuctionCategory[]> {
        const categories = await this.prisma.auctionCategory.findMany({
            where,
            orderBy,
            skip: skip || 0,
            take: take || 10,
        })

        return categories
    }
}
