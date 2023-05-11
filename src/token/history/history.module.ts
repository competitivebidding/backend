import { Module } from '@nestjs/common'
import { HistoryController } from './history.resolver'
import { HistoryService } from './history.service'

@Module({
    controllers: [HistoryController],
    providers: [HistoryService],
})
export class HistoryModule {}
