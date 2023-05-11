import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { TokenHistory } from '../../token/history/entities/token-history.entity'

@Injectable()
export class HistoryTokenService {
    constructor(private prisma: PrismaService) {}

    async getMyRoomById(id: number): Promise<TokenHistory> {
        const token = await this.prisma.tokenHistory.findUnique({
            where: {
                id,
            },
        })

        if (!token) {
            throw new NotFoundException('token not found')
        }

        return token
    }

    async createMyRoom(data: Prisma.TokenHistoryCreateInput): Promise<TokenHistory> {
        const tokens = await this.prisma.tokenHistory.create({ data })

        return tokens
    }

    async updateMyRoom(id: number, data: Prisma.TokenHistoryUpdateInput): Promise<TokenHistory> {
        const token = await this.prisma.tokenHistory.findUnique({
            where: {
                id,
            },
        })
        if (!token) {
            throw new NotFoundException('token not found')
        }

        const updatedToken = await this.prisma.tokenHistory.update({
            where: { id },
            data,
        })

        return updatedToken
    }

    async deleteMyRoom(id: number): Promise<boolean> {
        const token = await this.prisma.tokenHistory.findUnique({
            where: {
                id,
            },
        })

        if (!token) {
            throw new NotFoundException('token not found')
        }

        await this.prisma.tokenHistory.delete({
            where: { id },
        })

        return true
    }
}
