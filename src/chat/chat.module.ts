import { Module } from '@nestjs/common'
import { MessageModule } from './message/message.module'
import { RoomModule } from './room/room.module'

@Module({
    imports: [RoomModule, MessageModule],
})
export class ChatModule {}
