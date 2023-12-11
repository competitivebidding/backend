import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name)

    @Cron(CronExpression.EVERY_30_SECONDS)
    async handleCron() {
        await this.logger.debug('Called when the current second is 45')
        this.logger.debug('Called when the current second is 45123')
    }
}
