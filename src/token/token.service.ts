import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../database/prisma.service'
import { Token } from '../token/entities/token.entity'

@Injectable()
export class TokenService {
    constructor(private prisma: PrismaService) {}

    async getTokenById(id: number): Promise<Token> {
        const token = await this.prisma.token.findUnique({
            where: {
                id,
            },
        })

        if (!token) {
            throw new NotFoundException('token not found')
        }

        return token
    }

    async createToken(data: Prisma.TokenCreateInput): Promise<Token> {
        return await this.prisma.token.create({ data })
    }

    async updateToken(id: number, data: Prisma.TokenUpdateInput): Promise<Token> {
        const token = await this.prisma.token.findUnique({
            where: {
                id,
            },
        })
        if (!token) {
            throw new NotFoundException('token not found')
        }

        const updatedToken = await this.prisma.token.update({
            where: { id },
            data,
        })

        return updatedToken
    }

    async deleteToken(id: number): Promise<boolean> {
        const token = await this.prisma.token.findUnique({
            where: {
                id,
            },
        })

        if (!token) {
            throw new NotFoundException('token not found')
        }

        await this.prisma.token.delete({
            where: { id },
        })

        return true
    }
}
