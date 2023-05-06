import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { Message } from './entities/message.entity'

@Injectable()
export class MessageService {
    constructor(private readonly prisma: PrismaService) {}

    async validateUser(id: number, userId: number) {
        const message = await this.prisma.message.findFirst({ where: { id: id } })
        if (message.userId !== userId) {
            return null
        }
        return true
    }

    async sendMessage(data: Prisma.MessageCreateInput): Promise<Message | null> {
        const validateRoom = await this.prisma.userInRoom.findFirst({ where: data })
        if (validateRoom) {
            return await this.prisma.message.create({ data: data })
        }
        return null
    }

    async updateMessage(
        where: Prisma.MessageWhereUniqueInput,
        userId: number,
        data: Prisma.MessageUpdateInput,
    ): Promise<Message | null> {
        if (this.validateUser(where.id, userId)) {
            return await this.prisma.message.update({ where: where, data: data })
        }
        return null
    }

    async removeMessage(where: Prisma.MessageWhereUniqueInput, userId: number): Promise<Message | null> {
        if (this.validateUser(where.id, userId)) {
            return await this.prisma.message.delete({ where: where })
        }
        return null
    }

    async findUserMessagesInRoom(userId: number, roomId: number): Promise<Message[]> {
        return await this.prisma.message.findMany({ where: { userId, roomId } })
    }

    async getAllMessagesInRoom(where: Prisma.MessageWhereUniqueInput): Promise<Message[]> {
        return await this.prisma.message.findMany({ where: where })
    }
}
