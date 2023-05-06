import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { PubSub } from 'graphql-subscriptions'
import { GetCurrentUser } from '../../auth/decorators/get-current-user.decorator'
import { JwtPayload } from '../../auth/utils/types'
import { RoomService } from '../room/room.service'
import { FindUserMessagesInRoomInputType } from './dto/findUserMessagesInRoom.input'
import { MessageUpdateInputType } from './dto/message-update.input'
import { NewMessageInputType } from './dto/new-message.input'
import { Message } from './entities/message.entity'
import { MessageService } from './message.service'

const pubSub = new PubSub()

@Resolver(() => Message)
export class MessageResolver {
    constructor(private readonly messageService: MessageService, private readonly roomService: RoomService) {}

    @Mutation(() => Message)
    async sendMessage(
        @GetCurrentUser() user: JwtPayload,
        @Args('newMessage') newMessage: NewMessageInputType,
    ): Promise<Message> {
        const message: Message = await this.messageService.sendMessage(newMessage, 1 /*user.userId*/)
        pubSub.publish('newMessage', { newMessage: message })
        return message
    }

    @Mutation(() => Message)
    async updateMessage(@GetCurrentUser() user: JwtPayload, dto: MessageUpdateInputType): Promise<Message> {
        const { id, ...data } = dto
        return await this.messageService.updateMessage(id, user.userId, data)
    }

    @Mutation(() => Message)
    async removeMessage(@GetCurrentUser() user: JwtPayload, @Args('id') id: number): Promise<Message> {
        return await this.messageService.removeMessage(id, user.userId)
    }

    @Query(() => [Message])
    async findUserMessagesInRoom(@Args('dto') dto: FindUserMessagesInRoomInputType): Promise<Message[]> {
        const { userId, roomId } = dto
        return await this.messageService.findUserMessagesInRoom(userId, roomId)
    }

    @Query(() => [Message])
    async getAllMessagesInRoom(@Args('roomId') roomId: number): Promise<Message[]> {
        return await this.messageService.getAllMessagesInRoom(roomId)
    }

    @Subscription(() => Message, {
        filter: (payload, variables: { roomId: number }) => {
            return payload.newMessage.roomId === variables.roomId
        },
        name: 'newMessage',
    })
    async newMessage(@Args('roomId', { type: () => Int }) roomId?: number) {
        const room = await this.roomService.getRoomById(roomId)
        if (!room) {
            throw new GraphQLError('Room is not found')
        }
        return pubSub.asyncIterator('newMessage')
    }
}
