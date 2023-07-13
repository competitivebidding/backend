import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetCurrentUserId } from '../../auth/decorators'
import { CreateMessageTiketInput } from './dto/create-message-tiket.input'
import { UpdateMessageTiketInput } from './dto/update-message-tiket.input'
import { MessageTiket } from './entities/message-tiket.entity'
import { MessageTiketService } from './message-tiket.service'

@Resolver()
export class MessageTiketResolver {
    constructor(private readonly messageTiketService: MessageTiketService) {}

    @Mutation(() => MessageTiket)
    async createMessageTiket(
        @GetCurrentUserId() userId: number,
        @Args('createMessageTiketInput') createMessageTiketInput: CreateMessageTiketInput,
    ): Promise<MessageTiket> {
        return await this.messageTiketService.createMessageTiket(createMessageTiketInput, userId)
    }

    @Query(() => [MessageTiket])
    async getAllMessageTiket(): Promise<MessageTiket[]> {
        return await this.messageTiketService.findAllMessageTiket()
    }

    @Query(() => MessageTiket)
    async getMessageTiketById(@Args('tiketId', { type: () => Int }) tiketId: number): Promise<MessageTiket> {
        return await this.messageTiketService.findOneMessageTiket(tiketId)
    }

    @Mutation(() => MessageTiket)
    async updateMessageTiket(
        @Args('updateMessageTiketInput') updateMessageTiketInput: UpdateMessageTiketInput,
        @Args('tiketId') tiketId: number,
    ): Promise<MessageTiket> {
        return await this.messageTiketService.updateMessageTiket(tiketId, updateMessageTiketInput)
    }

    @Mutation(() => MessageTiket)
    async removeMessageTiket(@Args('tiketId', { type: () => Int }) tiketId: number): Promise<MessageTiket> {
        return await this.messageTiketService.removeMessageTiket(tiketId)
    }
}
