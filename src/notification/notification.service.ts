import { Injectable } from '@nestjs/common'
import { PrismaService } from './../database/prisma.service'
import NotifiInput from './dto/notifi-create.input'

@Injectable()
export class NotificationService {
    constructor(private readonly prisma: PrismaService) {}

    async createNotification(data: NotifiInput) {
        return await this.prisma.notification.create({ data })
    }

    async markNotificationAsRead(notificationId: number) {
        return await this.prisma.notification.update({ where: { id: notificationId }, data: { isRead: true } })
    }

    async getAllUserByAuctionId(auctionId: number) {
        return await this.prisma.notification.findMany({ where: { auctionId } })
    }

    async getAllNotificationUserByUserId(userId: number) {
        return await this.prisma.notification.findMany({ where: { userId } })
    }

    async getNotificationById(notificationId: number) {
        return await this.prisma.notification.findFirst({ where: { id: notificationId } })
    }
}
