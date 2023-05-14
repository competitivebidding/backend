import { HttpStatus } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { PubSub } from 'graphql-subscriptions'
import { GetCurrentUserId } from '../../auth/decorators/get-current-user-id.decorator'
import { ExeptionEnum } from '../../common/exeptions/exeption.enum'
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
        try {
            const input = { userId, ...newMessage }
            const message: Message = await this.messageService.sendMessage(input)
            if (!message) {
                throw new GraphQLError(ExeptionEnum.ROOM_NOT_FOUND, {
                    extensions: {
                        code: 'NOT_FOUND',
                        http: {
                            code: HttpStatus.NOT_FOUND,
                        },
                    },
                })
            }
            pubSub.publish('newMessage', { newMessage: message })
            return message
        } catch (error) {
            console.log('Error send message: ', error)
            throw new GraphQLError('Failed send message', { extensions: { code: 'SERVER ERROR', http: { code: 500 } } })
        }
    }

    @Mutation(() => Message)
    async updateMessage(@GetCurrentUserId() userId: number, input: MessageUpdateInput): Promise<Message> {
        try {
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
        } catch (error) {
            console.log('Error update message: ', error)
            throw new GraphQLError('Failed update message', {
                extensions: { code: 'SERVER ERROR', http: { code: 500 } },
            })
        }
    }

    @Mutation(() => Message)
    async removeMessage(@GetCurrentUserId() userId: number, @Args('id') id: number): Promise<Message> {
        try {
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
        } catch (error) {
            console.log('Error remove message: ', error)
            throw new GraphQLError('Failed remove message', {
                extensions: { code: 'SERVER ERROR', http: { code: 500 } },
            })
        }
    }

    @Query(() => [Message])
    async getAllMessagesByRoomId(@Args('input') input: UserMessages): Promise<Message[]> {
        try {
            return await this.messageService.getAllMessagesByRoomId(input)
        } catch (error) {
            console.log('Error fetching messages: ', error)
            throw new GraphQLError('Failed fetching messages', {
                extensions: { code: 'SERVER ERROR', http: { code: 500 } },
            })
        }
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
