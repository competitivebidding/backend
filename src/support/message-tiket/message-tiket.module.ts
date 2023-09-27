import { Module } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { MessageTiketResolver } from './message-tiket.resolver'
import { MessageTiketService } from './message-tiket.service'

@Module({
    providers: [MessageTiketResolver, MessageTiketService, PrismaService],
})
export class MessageTiketModule {}
