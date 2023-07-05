import { OnEvent } from '@nestjs/event-emitter'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { GetCurrentUserId, Public } from './../auth/decorators'
import NotifiInput from './dto/notifi-create.input'
import { Notification } from './entities/notification.entity'
import { NotificationService } from './notification.service'

const pubSub = new PubSub()

@Resolver()
export class NotificationResolver {
    constructor(private readonly notificationService: NotificationService) {}

    @OnEvent('auctionClose')
    async auctionClose(auctionId: number) {
        //пересмотреть реализацию события
        const notifications = await this.notificationService.getAllUserByAuctionId(auctionId)
        notifications.forEach((notification) => {
            pubSub.publish('notification', { notification: notification })
        })
    }

    @OnEvent('outbid')
    async outBid(notifi: Notification) {
        const notification: Notification = await this.notificationService.createNotification(notifi)
        pubSub.publish('notification', { notification: notification })
    }

    @OnEvent('joinAuction')
    async joinAuction(notifi: NotifiInput) {
        const notification: Notification = await this.notificationService.createNotification(notifi)
        pubSub.publish('notification', { notification: notification })
    }

    @Query(() => [Notification])
    async getAllMyNotification(@GetCurrentUserId() userId: number) {
        return await this.notificationService.getAllNotificationUserByUserId(userId)
    }

    @Mutation(() => Notification)
    async readNotification(notificationId: number) {
        return await this.notificationService.markNotificationAsRead(notificationId)
    }

    @Public()
    @Subscription(() => Notification, {
        filter: (payload, variable) => {
            console.log(variable)
            return payload.notification.userId === variable.userId
        },
        name: 'notification',
    })
    async notificationUser(@Args('userId') userId: number) {
        //userId @GetCurentUserId
        return await pubSub.asyncIterator('notification')
    }
}
