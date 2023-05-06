import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { Public } from '../../auth/decorators'
import { GetCurrentUser } from '../../auth/decorators/get-current-user.decorator'
import { JwtPayload } from '../../auth/utils/types'
import { FindUserMessagesInRoomInputType } from './dto/findUserMessagesInRoom.input'
import { MessageUpdateInputType } from './dto/message-update.input'
import { NewMessageInputType } from './dto/new-message.input'
import { Message } from './entities/message.entity'
import { MessageService } from './message.service'

const pubSub = new PubSub()

@Resolver(() => Message)
export class MessageResolver {
    constructor(private readonly messageService: MessageService) {}

    @Public()
    @Mutation(() => Message)
    async sendMessage(
        //@GetCurrentUser() user: JwtPayload,
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

    @Public()
    @Subscription(() => Message, {
        filter: (payload, variables: { roomId: number }) => {
            console.log(payload, variables)
            return payload.newMessage.roomId === variables.roomId
        },
        name: 'newMessage',
    })
    newMessage() {
        return pubSub.asyncIterator('newMessage')
    }
}
