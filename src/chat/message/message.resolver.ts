import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { GetCurrentUserId } from '../../auth/decorators/get-current-user-id.decorator'
import { MessageUpdateInput } from './dto/message-update.input'
import { NewMessageInput } from './dto/new-message.input'
import { UserMessages } from './dto/user-messages.input'
import { Message } from './entities/message.entity'
import { MessageService } from './message.service'

const pubSub = new PubSub()

@Resolver(() => Message)
export class MessageResolver {
    [x: string]: any
    constructor(private readonly messageService: MessageService) {}

    @Mutation(() => Message)
    async sendMessage(
        @GetCurrentUserId() userId: number,
        @Args('newMessage') newMessage: NewMessageInput,
    ): Promise<Message> {
        const input = { userId, ...newMessage }
        const message: Message = await this.messageService.sendMessage(input)
        pubSub.publish('newMessage', { newMessage: message })
        return message
    }

    @Mutation(() => Message)
    async updateMessage(@GetCurrentUserId() userId: number, input: MessageUpdateInput): Promise<Message> {
        const { id, ...data } = input
        return await this.messageService.updateMessage(userId, { id }, data)
    }

    @Mutation(() => Message)
    async removeMessage(@GetCurrentUserId() userId: number, @Args('id') id: number): Promise<Message> {
        return await this.messageService.removeMessage(userId, { id })
    }

    @Query(() => [Message])
    async getAllMessagesByRoomId(@Args('input') input: UserMessages): Promise<Message[]> {
        return await this.messageService.getAllMessagesByRoomId(input)
    }

    @Subscription(() => Message, {
        filter: (payload, variables: { room: number }) => {
            return payload.newMessage.room === variables.room
        },
        name: 'newMessage',
    })
    async newMessage(@Args('room', { type: () => Int }) roomId: number) {
        this.messageService.validateRoom(roomId)
        return pubSub.asyncIterator('newMessage')
    }
}
