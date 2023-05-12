import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { TokenHistory } from '../../token/history/entities/token-history.entity'

@Injectable()
export class TokenHistoryService {
    constructor(private prisma: PrismaService) {}

    async getMyTokenHistoryById(id: number): Promise<TokenHistory> {
        const tokenHistoryId = await this.prisma.tokenHistory.findUnique({
            where: {
                id,
            },
        })

        if (!tokenHistoryId) {
            throw new NotFoundException('token not found')
        }

        return tokenHistoryId
    }

    async createMyTokenHistory(data: Prisma.TokenHistoryCreateInput): Promise<TokenHistory> {
        const tokenHistory = await this.prisma.tokenHistory.create({ data })

        return tokenHistory
    }

    async updateMyTokenHistory(id: number, data: Prisma.TokenHistoryUpdateInput): Promise<TokenHistory> {
        const tokenHistory = await this.prisma.tokenHistory.findUnique({
            where: {
                id,
            },
        })
        if (!tokenHistory) {
            throw new NotFoundException('token not found')
        }

        const updatedTokenHistory = await this.prisma.tokenHistory.update({
            where: { id },
            data,
        })

        return updatedTokenHistory
    }

    async deleteMyTokenHistory(id: number): Promise<boolean> {
        const tokenHistory = await this.prisma.tokenHistory.findUnique({
            where: {
                id,
            },
        })

        if (!tokenHistory) {
            throw new NotFoundException('token not found')
        }

        await this.prisma.tokenHistory.delete({
            where: { id },
        })

        return true
    }
}
