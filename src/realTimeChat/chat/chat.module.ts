import { Module } from '@nestjs/common'
import { ChatResolver } from './chat.resolver'
import { ChatService } from './chat.service'

@Module({
    providers: [ChatResolver, ChatService],
})
export class ChatModule {}
