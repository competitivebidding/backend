import { Module } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { ErrorHandlerService } from '../../errorhandler/error-handler.service'
import { RoomModule } from '../room/room.module'
import { MessageResolver } from './message.resolver'
import { MessageService } from './message.service'

@Module({
    providers: [MessageResolver, MessageService, PrismaService, ErrorHandlerService],
    imports: [RoomModule],
})
export class MessageModule {}
