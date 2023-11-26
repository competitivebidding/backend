import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'

@Injectable()
export class StatusService {
    constructor(private prisma: PrismaService) {}

    async getAllAuctionStatuses() {
        return this.prisma.auctionStatus.findMany()
    }

    async getAuctionStatusById(statusId: number) {
        return this.prisma.auctionStatus.findUnique({
            where: { id: statusId },
        })
    }
}
