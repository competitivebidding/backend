import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { ErrorHandlerService } from '../../errorhandler/error-handler.service'
import { ExeptionEnum } from '../../errorhandler/exeption.enum'
import { RoomService } from '../room/room.service'
import { Message } from './entities/message.entity'

@Injectable()
export class MessageService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly roomService: RoomService,
        private readonly errorHandler: ErrorHandlerService,
    ) {}

    async isUserMessage(messageId: number, userId: number): Promise<boolean> {
        const message = await this.prisma.message.findFirst({ where: { id: messageId } })
        if (message.userId !== userId) {
            return false
        }
        return true
    }

    async validateRoom(roomId: number) {
        try {
            const room = await this.roomService.getRoom({ id: roomId })
            if (!room) {
                this.errorHandler.errorHandler(ExeptionEnum.CANT_SEND_MESS)
            }
        } catch (error) {
            console.log('Error sending message')
            this.errorHandler.errorHandler('Failed sending message')
        }
    }

    async sendMessage(data: Prisma.MessageCreateInput): Promise<Message | null> {
        try {
            const validateRoom = await this.prisma.userInRoom.findFirst({
                where: { roomId: data.roomId, userId: data.userId },
            })
            if (!validateRoom) {
                this.errorHandler.errorHandler(ExeptionEnum.ROOM_NOT_FOUND)
            }
            return await this.prisma.message.create({ data: data })
        } catch (error) {
            console.log('Error send message: ', error)
            this.errorHandler.errorHandler('Failed send message')
        }
    }

    async updateMessage(
        userId: number,
        where: Prisma.MessageWhereUniqueInput,
        data: Prisma.MessageUpdateInput,
    ): Promise<Message> {
        try {
            if (!this.isUserMessage(where.id, userId)) {
                this.errorHandler.errorHandler(ExeptionEnum.USER_NOT_CREAT_MESS)
            }
            return await this.prisma.message.update({ where: where, data: data })
        } catch (error) {
            console.log('Error update message: ', error)
            this.errorHandler.errorHandler('Failed update message')
        }
    }

    async removeMessage(userId: number, where: Prisma.MessageWhereUniqueInput): Promise<Message> {
        try {
            if (!this.isUserMessage(where.id, userId)) {
                this.errorHandler.errorHandler(ExeptionEnum.USER_NOT_CREAT_MESS)
            }
            return await this.prisma.message.delete({ where: where })
        } catch (error) {
            console.log('Error remove message: ', error)
            this.errorHandler.errorHandler('Failed remove message')
        }
    }

    async getAllMessagesByRoomId(where: Prisma.MessageWhereInput): Promise<Message[]> {
        try {
            return await this.prisma.message.findMany({ where: where })
        } catch (error) {
            console.log('Error fetching messages: ', error)
            this.errorHandler.errorHandler('Failed fetching messages')
        }
    }
}
