import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { Message } from './entities/message.entity'

@Injectable()
export class MessageService {
    constructor(private readonly prisma: PrismaService) {}

    async isUserMessage(id: number, userId: number): Promise<boolean> {
        const message = await this.prisma.message.findFirst({ where: { id: id } })
        if (message.userId !== userId) {
            return false
        }
        return true
    }

    async sendMessage(data: Prisma.MessageCreateInput): Promise<Message | null> {
        const validateRoom = await this.prisma.userInRoom.findFirst({
            where: { roomId: data.room, userId: data.userId },
        })
        if (validateRoom) {
            return await this.prisma.message.create({ data: data })
        }
        return null
    }

    async updateMessage(where: Prisma.MessageWhereUniqueInput, data: Prisma.MessageUpdateInput): Promise<Message> {
        return await this.prisma.message.update({ where: where, data: data })
    }

    async removeMessage(where: Prisma.MessageWhereUniqueInput): Promise<Message> {
        return await this.prisma.message.delete({ where: where })
    }

    async getAllMessagesByRoomId(where: Prisma.MessageWhereInput): Promise<Message[]> {
        return await this.prisma.message.findMany({ where: where })
    }
}
