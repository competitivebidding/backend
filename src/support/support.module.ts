import { Module } from '@nestjs/common'
import { MessageTiketModule } from './message-tiket/message-tiket.module'
import { TopicTiketModule } from './topic-tiket/topic-tiket.module'

@Module({
    imports: [TopicTiketModule, MessageTiketModule],
})
export class SupportModule {}
