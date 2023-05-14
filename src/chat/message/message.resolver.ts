import { HttpStatus } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { PubSub } from 'graphql-subscriptions'
import { ExeptionEnum } from 'src/common/exeptions/exeption.enum'
import { GetCurrentUserId } from '../../auth/decorators/get-current-user-id.decorator'
import { RoomService } from '../room/room.service'
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
        const input = { userId, ...newMessage }
        const message: Message = await this.messageService.sendMessage(input)
        pubSub.publish('newMessage', { newMessage: message })
        return message
    }

    @Mutation(() => Message)
    async updateMessage(@GetCurrentUserId() userId: number, input: MessageUpdateInput): Promise<Message> {
        const { id, ...data } = input
        if (this.messageService.isUserMessage(id, userId)) {
            return await this.messageService.updateMessage({ id }, data)
        }
        throw new GraphQLError(ExeptionEnum.USER_NOT_CREAT_MESS, {
            extensions: {
                code: 'FORBIDDEN',
                http: {
                    code: HttpStatus.FORBIDDEN,
                },
            },
        })
    }

    @Mutation(() => Message)
    async removeMessage(@GetCurrentUserId() userId: number, @Args('id') id: number): Promise<Message> {
        if (this.messageService.isUserMessage(id, userId)) {
            return await this.messageService.removeMessage({ id })
        }
        throw new GraphQLError(ExeptionEnum.USER_NOT_CREAT_MESS, {
            extensions: {
                code: 'FORBIDDEN',
                http: {
                    code: HttpStatus.FORBIDDEN,
                },
            },
        })
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
    async newMessage(@Args('room', { type: () => Int }) roomId?: number) {
        const room = await this.roomService.getRoom({ id: roomId })
        if (!room) {
            throw new GraphQLError(ExeptionEnum.ROOM_NOT_FOUND, {
                extensions: {
                    code: 'NOT_FOUND',
                    http: {
                        code: HttpStatus.NOT_FOUND,
                    },
                },
            })
        }
        return pubSub.asyncIterator('newMessage')
    }
}
