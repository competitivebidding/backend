import { Injectable } from '@nestjs/common'
import { ChatResponseType } from './dto/chat.response'
import { Message } from './entities/message'

const chats: ChatResponseType[] = []
const messages: Message[] = []
@Injectable()
export class ChatService {
    async getAllChats(): Promise<ChatResponseType[]> {
        return await chats
    }

    // async getChatById() {

    // }

    async sendMessage(dto: Message): Promise<Message> {
        messages.push(dto)
        return dto
    }
}
