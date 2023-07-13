import { Injectable } from '@nestjs/common'
import { TopicProcess } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { CreateTopicTiketInput } from './dto/create-topic-tiket.input'
import { FindAllTopicInput } from './dto/find-all-topic-tiket.input'
import { UpdateTopicTiketInput } from './dto/update-topic-tiket.input'
import { TopicTiket } from './entities/topic-tiket.entity'

@Injectable()
export class TopicTiketService {
    constructor(private readonly prisma: PrismaService) {}

    async createTopic(createTopicTiketInput: CreateTopicTiketInput, id: number): Promise<TopicTiket> {
        return await this.prisma.topicTiket.create({
            data: {
                userId: id,
                title: createTopicTiketInput.title,
                message: createTopicTiketInput.message,
                process: TopicProcess.pending,
            },
            include: { user: true },
        })
    }

    async findAllTopics(findAllTopic: FindAllTopicInput): Promise<TopicTiket[]> {
        return await this.prisma.topicTiket.findMany({ where: findAllTopic, include: { user: true } })
    }

    async findTopicById(id: number): Promise<TopicTiket> {
        return await this.prisma.topicTiket.findFirst({ where: { id: id }, include: { user: true } })
    }

    async updateTopic(updateTopicTiketInput: UpdateTopicTiketInput, id: number): Promise<TopicTiket> {
        return await this.prisma.topicTiket.update({
            where: { id: id },
            data: updateTopicTiketInput,
            include: { user: true },
        })
    }

    async removeTopic(id: number): Promise<TopicTiket> {
        return await this.prisma.topicTiket.delete({ where: { id: id }, include: { user: true } })
    }

    async markInProcessTopic(topicId: number, adminId): Promise<TopicTiket> {
        return await this.prisma.topicTiket.update({
            where: { id: topicId },
            data: { process: TopicProcess.inProgress, adminId: adminId },
            include: { user: true },
        })
    }

    async markDoneTopic(topicId: number): Promise<TopicTiket> {
        const topic = await this.prisma.topicTiket.findFirst({ where: { id: topicId } })

        if (topic.process === TopicProcess.inProgress) {
            return await this.prisma.topicTiket.update({
                where: { id: topicId },
                data: { process: TopicProcess.done },
                include: { user: true },
            })
        }
        throw new Error('Topic not in progress')
    }
}
