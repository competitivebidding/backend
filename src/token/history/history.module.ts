import { Module } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { HistoryResolver } from './history.resolver'
import { HistoryService } from './history.service'

@Module({
    providers: [HistoryService, HistoryResolver, PrismaService],
})
export class HistoryModule {}
