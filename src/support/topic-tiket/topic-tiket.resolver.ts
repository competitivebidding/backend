import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetCurrentUserId } from '../../auth/decorators'
import { CreateTopicTiketInput } from './dto/create-topic-tiket.input'
import { FindAllTopicInput } from './dto/find-all-topic-tiket.input'
import { UpdateTopicTiketInput } from './dto/update-topic-tiket.input'
import { TopicTiket } from './entities/topic-tiket.entity'
import { TopicTiketService } from './topic-tiket.service'

@Resolver()
export class TopicTiketResolver {
    constructor(private readonly topicTiketService: TopicTiketService) {}

    @Mutation(() => TopicTiket)
    async createTopic(
        @GetCurrentUserId() userId: number,
        @Args('createTopicTiketInput') createTopicTiketInput: CreateTopicTiketInput,
    ) {
        console.log(userId)
        console.log(createTopicTiketInput)
        return await this.topicTiketService.createTopic(createTopicTiketInput, userId)
    }

    @Query(() => [TopicTiket])
    async getAllTopics(@Args('findAllTopic') findAllTopic: FindAllTopicInput) {
        return await this.topicTiketService.findAllTopics(findAllTopic)
    }

    @Query(() => TopicTiket)
    async getTopicById(@Args('topicId', { type: () => Int }) topicId: number) {
        return await this.topicTiketService.findTopicById(topicId)
    }

    @Mutation(() => TopicTiket)
    async updateTopic(
        @GetCurrentUserId() topicId: number,
        @Args('updateTopicTiketInput') updateTopicTiketInput: UpdateTopicTiketInput,
    ) {
        return await this.topicTiketService.updateTopic(updateTopicTiketInput, topicId)
    }

    @Mutation(() => TopicTiket)
    async removeTopic(@Args('topicId', { type: () => Int }) topicId: number) {
        return await this.topicTiketService.removeTopic(topicId)
    }

    @Mutation(() => TopicTiket)
    async markInProcessTopic(
        @GetCurrentUserId() adminId: number,
        @Args('topicId') topicId: number,
    ): Promise<TopicTiket> {
        return await this.topicTiketService.markInProcessTopic(topicId, adminId)
    }

    @Mutation(() => TopicTiket)
    async markDoneTopic(@Args('topicId') topicId: number): Promise<TopicTiket> {
        return await this.topicTiketService.markDoneTopic(topicId)
    }
}
