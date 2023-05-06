import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { PubSub } from 'graphql-subscriptions'
import { GetCurrentUserId } from '../../auth/decorators/get-current-user-id.decorator'
import { RoomService } from '../room/room.service'
import { MessageUpdateInputType } from './dto/message-update.input'
import { NewMessageInputType } from './dto/new-message.input'
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
        @Args('newMessage') newMessage: NewMessageInputType,
    ): Promise<Message | null> {
        const dto = { userId, ...newMessage }
        const message: Message = await this.messageService.sendMessage(dto)
        pubSub.publish('newMessage', { newMessage: message })
        return message
    }

    @Mutation(() => Message, { nullable: true })
    async updateMessage(@GetCurrentUserId() userId: number, dto: MessageUpdateInputType): Promise<Message | null> {
        const { id, ...data } = dto
        return await this.messageService.updateMessage({ id }, userId, data)
    }

    @Mutation(() => Message, { nullable: true })
    async removeMessage(@GetCurrentUserId() userId: number, @Args('id') id: number): Promise<Message | null> {
        return await this.messageService.removeMessage({ id }, userId)
    }

    @Query(() => [Message])
    async findUserMessagesInRoom(@Args('dto') dto: UserMessages): Promise<Message[]> {
        const { userId, roomId } = dto
        return await this.messageService.findUserMessagesInRoom(userId, roomId)
    }

    @Query(() => [Message])
    async getAllMessagesInRoom(@Args('roomId') roomId: number): Promise<Message[]> {
        return await this.messageService.getAllMessagesInRoom({ id: roomId })
    }

    @Subscription(() => Message, {
        filter: (payload, variables: { roomId: number }) => {
            return payload.newMessage.roomId === variables.roomId
        },
        name: 'newMessage',
    })
    async newMessage(@Args('roomId', { type: () => Int }) roomId?: number) {
        const room = await this.roomService.getRoomById({ id: roomId })
        if (!room) {
            throw new GraphQLError('Room is not found')
        }
        return pubSub.asyncIterator('newMessage')
    }
}
