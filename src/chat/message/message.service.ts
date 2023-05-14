import { HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { GraphQLError } from 'graphql'
import { ExeptionEnum } from '../../common/exeptions/exeption.enum'
import { PrismaService } from '../../database/prisma.service'
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

    async sendMessage(data: Prisma.MessageCreateInput): Promise<Message | null> {
        const validateRoom = await this.prisma.userInRoom.findFirst({
            where: { roomId: data.roomId, userId: data.userId },
        })
        if (validateRoom) {
            return await this.prisma.message.create({ data: data })
        }
        throw new GraphQLError(ExeptionEnum.ROOM_NOT_FOUND, {
            extensions: {
                code: 'NOT_FOUND',
                http: {
                    code: HttpStatus.NOT_FOUND,
                },
            },
        })
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
