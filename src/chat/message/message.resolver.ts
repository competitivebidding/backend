import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { PubSub } from 'graphql-subscriptions'
import { Public } from '../../auth/decorators'
import { GetCurrentUserId } from '../../auth/decorators/get-current-user-id.decorator'
import { RoomService } from '../room/room.service'
import { ItemMessages } from './dto/item-message.response'
import { MessageUpdateInput } from './dto/message-update.input'
import { NewMessageInput } from './dto/new-message.input'
import { UserMessages } from './dto/user-messages.input'
import { Message } from './entities/message.entity'
import { MessageService } from './message.service'

const pubSub = new PubSub()

@Resolver(() => Message)
export class MessageResolver {
    constructor(private readonly messageService: MessageService, private readonly roomService: RoomService) {}

    @Mutation(() => Message, { nullable: true })
    async sendMessage(
        @GetCurrentUserId() userId: number,
        @Args('newMessage') newMessage: NewMessageInput,
    ): Promise<Message | null> {
        const input = {
            user: { connect: { id: userId } },
            room: { connect: { id: newMessage.roomId } },
            content: newMessage.content,
        }
        const message: Message = await this.messageService.sendMessage(input, userId, newMessage.roomId)
        if (message === null) {
            return null
        }
        pubSub.publish('newMessage', { newMessage: message })
        return message
    }

    @Mutation(() => Message, { nullable: true })
    async updateMessage(
        @GetCurrentUserId() userId: number,
        @Args('input') input: MessageUpdateInput,
    ): Promise<Message | null> {
        const { id, ...data } = input
        if (this.messageService.isUserMessage(id, userId)) {
            return await this.messageService.updateMessage({ id }, data)
        }
        return null
    }

    @Mutation(() => Message, { nullable: true })
    async removeMessage(@GetCurrentUserId() userId: number, @Args('id') id: number): Promise<Message | null> {
        if (this.messageService.isUserMessage(id, userId)) {
            return await this.messageService.removeMessage({ id })
        }
        return null
    }

    @Query(() => ItemMessages)
    async getAllMessagesByRoomId(
        @Args('skip', { nullable: true, type: () => Int, defaultValue: 0 }) skip: number,
        @Args('take', { nullable: true, type: () => Int, defaultValue: 10 }) take: number,
        @Args('input') input: UserMessages,
    ): Promise<ItemMessages> {
        const [messages, totalCount] = await Promise.all([
            this.messageService.getAllMessagesByRoomId(input, skip, take),
            this.messageService.getTotalCount(input),
        ])

        return {
            items: messages,
            totalCount,
        }
    }

    @Public()
    @Subscription(() => Message, {
        filter: (payload, variables: { roomId: number }, context) => {
            //console.log(context.req.connectionParams)
            return payload.newMessage.roomId === variables.roomId
        },
        name: 'newMessage',
    })
    async newMessage(@Args('roomId', { type: () => Int }) roomId?: number) {
        const room = await this.roomService.getRoom({ id: roomId })
        if (!room) {
            throw new GraphQLError('Room is not found')
        }
        return pubSub.asyncIterator('newMessage')
    }
}
