import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { Public } from '../../auth/decorators'
import { ChatService } from './chat.service'
import { NewMessageInputType } from './dto/chat.input'
import { ChatResponseType } from './dto/chat.response'
import { Message } from './entities/message'

const pubSub = new PubSub()

@Resolver()
export class ChatResolver {
    constructor(private readonly chatService: ChatService) {}

    @Public()
    @Query(() => [ChatResponseType])
    async getAllChats(): Promise<ChatResponseType[]> {
        return await this.chatService.getAllChats()
    }

    // async getChatById() {
    //     return await this.chatService.getChatById()
    // }

    @Public()
    @Mutation(() => Message)
    async sendMessage(@Args('newMessage') newMessage: NewMessageInputType): Promise<Message> {
        const message: Message = await this.chatService.sendMessage(newMessage)
        pubSub.publish('newMessage', message)
        return message
    }

    @Public()
    @Subscription(() => Message, {
        name: 'newMessage',
    })
    newMessage() {
        pubSub.asyncIterator('newMessage')
    }
}
