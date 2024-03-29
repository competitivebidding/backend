import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { UserMessages } from './dto/user-messages.input'
import { Message } from './entities/message.entity'

@Injectable()
export class MessageService {
    constructor(private readonly prisma: PrismaService) {}

    async isUserMessage(messageId: number, userId: number): Promise<boolean> {
        const message = await this.prisma.message.findFirst({ where: { id: messageId } })
        if (message.userId !== userId) {
            return false
        }
        return true
    }

    async sendMessage(data: Prisma.MessageCreateInput, userId: number, roomId: number): Promise<Message | null> {
        const validateRoom = await this.prisma.userInRoom.findFirst({
            where: { roomId: roomId, userId: userId },
        })
        if (validateRoom) {
            return await this.prisma.message.create({
                data: data,
                include: { user: true, room: { include: { owner: true } } },
            })
        }
        return null
    }

    async updateMessage(where: Prisma.MessageWhereUniqueInput, data: Prisma.MessageUpdateInput): Promise<Message> {
        return await this.prisma.message.update({
            where: where,
            data: data,
            include: { user: true, room: { include: { owner: true } } },
        })
    }

    async removeMessage(where: Prisma.MessageWhereUniqueInput): Promise<Message> {
        return await this.prisma.message.delete({
            where: where,
            include: { user: true, room: { include: { owner: true } } },
        })
    }

    async getAllMessagesByRoomId(where: Prisma.MessageWhereInput, skip: number, take: number): Promise<Message[]> {
        return await this.prisma.message.findMany({
            where,
            skip: skip,
            take: take,
            orderBy: { createdAt: 'desc' },
            include: { user: true, room: { include: { owner: true } } },
        })
    }

    async getTotalCount(where: UserMessages): Promise<number> {
        return this.prisma.message.count({ where: { roomId: where.roomId } })
    }
}
