import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { NewMessageInputType } from './dto/new-message.input'
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

    async sendMessage(dto: NewMessageInputType, userId): Promise<Message> {
        return await this.prisma.message.create({ data: { content: dto.content, roomId: dto.roomId, userId: userId } })
    }

    async updateMessage(id: number, userId: number, data: Prisma.MessageUpdateInput): Promise<Message> {
        if (this.validateUser(id, userId)) {
            return await this.prisma.message.update({ where: { id: id }, data: data })
        }
        return null
    }

    async removeMessage(id: number, userId: number): Promise<Message> {
        if (this.validateUser(id, userId)) {
            return await this.prisma.message.delete({ where: { id: id } })
        }
        return null
    }

    async findUserMessagesInRoom(userId: number, roomId: number): Promise<Message[]> {
        return await this.prisma.message.findMany({ where: { userId, roomId } })
    }

    async getAllMessagesInRoom(roomId: number): Promise<Message[]> {
        return await this.prisma.message.findMany({ where: { roomId: roomId } })
    }
}
