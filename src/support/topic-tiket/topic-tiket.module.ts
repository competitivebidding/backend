import { Module } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { TopicTiketResolver } from './topic-tiket.resolver'
import { TopicTiketService } from './topic-tiket.service'

@Module({
    providers: [TopicTiketResolver, TopicTiketService, PrismaService],
})
export class TopicTiketModule {}
