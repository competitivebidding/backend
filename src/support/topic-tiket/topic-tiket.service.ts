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

    async createTopic(createTopicTiketInput: CreateTopicTiketInput, userId: number): Promise<TopicTiket> {
        return await this.prisma.topicTiket.create({
            data: {
                user: { connect: { id: userId } },
                title: createTopicTiketInput.title,
                message: createTopicTiketInput.message,
                process: TopicProcess.pending,
            },
            include: { user: true },
        })
    }

    async findAllTopics(findAllTopic: FindAllTopicInput): Promise<TopicTiket[]> {
        return await this.prisma.topicTiket.findMany({ where: findAllTopic, include: { user: true, whoIsDoing: true } })
    }

    async findTopicById(id: number): Promise<TopicTiket> {
        const topic = await this.prisma.topicTiket.findFirst({
            where: { id: id },
            include: { user: true, whoIsDoing: true },
        })

        if (!topic) {
            throw new Error('Topic is not exist')
        }
        return topic
    }

    async updateTopic(updateTopicTiketInput: UpdateTopicTiketInput, topicId: number): Promise<TopicTiket> {
        const topic = await this.prisma.topicTiket.update({
            where: { id: topicId },
            data: updateTopicTiketInput,
            include: { user: true, whoIsDoing: true },
        })

        if (!topic) {
            throw new Error('Topic is not exist')
        }
        return topic
    }

    async removeTopic(id: number): Promise<TopicTiket> {
        const topic = await this.prisma.topicTiket.delete({
            where: { id: id },
            include: { user: true, whoIsDoing: true },
        })

        if (!topic) {
            throw new Error('Topic is not exist')
        }
        return topic
    }

    async markInProcessTopic(topicId: number, adminId): Promise<TopicTiket> {
        const topic = await this.prisma.topicTiket.findFirst({ where: { id: topicId } })

        if (!topic) {
            throw new Error('Topic is not exist')
        }

        if (topic.process === TopicProcess.inProgress) {
            throw new Error('The topic is already in progress')
        }
        return await this.prisma.topicTiket.update({
            where: { id: topicId },
            data: { process: TopicProcess.inProgress, whoIsDoing: { connect: { id: adminId } } },
            include: { user: true, whoIsDoing: true },
        })
    }

    async markDoneTopic(topicId: number): Promise<TopicTiket> {
        const topic = await this.prisma.topicTiket.findFirst({
            where: { id: topicId },
            include: { user: true, whoIsDoing: true },
        })

        if (!topic) {
            throw new Error('Topic is not exist')
        }

        if (topic.process === TopicProcess.done) {
            throw new Error('The topic is already done')
        }

        if (topic.process === TopicProcess.inProgress) {
            return await this.prisma.topicTiket.update({
                where: { id: topicId },
                data: { process: TopicProcess.done },
                include: { user: true, whoIsDoing: true },
            })
        }
        throw new Error('Topic not in progress')
    }
}
