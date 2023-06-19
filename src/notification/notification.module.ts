import { Module } from '@nestjs/common'
import { PrismaService } from './../database/prisma.service'
import { NotificationResolver } from './notification.resolver'
import { NotificationService } from './notification.service'

@Module({
    providers: [NotificationService, NotificationResolver, PrismaService],
    exports: [NotificationService],
    imports: [NotificationModule],
})
export class NotificationModule {}
