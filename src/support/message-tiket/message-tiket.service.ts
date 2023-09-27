import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { CreateMessageTiketInput } from './dto/create-message-tiket.input'
import { FindAllMessageTiket } from './dto/find-all-message-tiket'
import { UpdateMessageTiketInput } from './dto/update-message-tiket.input'
import { MessageTiket } from './entities/message-tiket.entity'

@Injectable()
export class MessageTiketService {
    constructor(private readonly prisma: PrismaService) {}

    async createMessageTiket(createMessageTiketInput: CreateMessageTiketInput, userId: number): Promise<MessageTiket> {
        return await this.prisma.messageTiket.create({
            data: {
                topicId: createMessageTiketInput.topicId,
                toWhomId: createMessageTiketInput.toWhom,
                fromWhomId: userId,
                title: createMessageTiketInput.title,
                message: createMessageTiketInput.message,
            },
            include: {
                toWhom: true,
                fromWhom: true,
            },
        })
    }

    async findAllMessageTiket(findAllMessageTiket: FindAllMessageTiket): Promise<MessageTiket[]> {
        return await this.prisma.messageTiket.findMany({
            where: findAllMessageTiket,
            include: {
                toWhom: true,
                fromWhom: true,
            },
        })
    }

    async findOneMessageTiket(tiketId: number): Promise<MessageTiket> {
        const message = await this.prisma.messageTiket.findFirst({
            where: { id: tiketId },
            include: {
                toWhom: true,
                fromWhom: true,
            },
        })

        if (!message) {
            throw new Error('Message is not exist')
        }
        return message
    }

    async updateMessageTiket(tiketId: number, updateMessageTiketInput: UpdateMessageTiketInput): Promise<MessageTiket> {
        const message = await this.prisma.messageTiket.update({
            where: { id: tiketId },
            data: updateMessageTiketInput,
            include: { toWhom: true, fromWhom: true },
        })

        if (!message) {
            throw new Error('Message is not exist')
        }
        return message
    }

    async removeMessageTiket(tiketId: number): Promise<MessageTiket> {
        const message = await this.prisma.messageTiket.findFirst({
            where: { id: tiketId },
            include: {
                toWhom: true,
                fromWhom: true,
            },
        })

        if (!message) {
            throw new Error('Message is not exist')
        }
        return await this.prisma.messageTiket.delete({
            where: { id: tiketId },
            include: {
                toWhom: true,
                fromWhom: true,
            },
        })
    }
}
