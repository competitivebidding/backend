import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { GetCurrentUserId, Public } from './../auth/decorators'
import { Notification } from './entities/notification.entity'
import { NotificationService } from './notification.service'

const pubSub = new PubSub()

@Resolver()
export class NotificationResolver {
    constructor(private readonly notificationService: NotificationService, private eventEmitter: EventEmitter2) {}

    @OnEvent('auctionClose')
    async auctionClose(auctionId: number) {
        const notifications = await this.notificationService.findAllUserByAuctionId(auctionId)
        notifications.forEach((notification) => {
            pubSub.publish('notification', { notification: notification })
        })
    }

    @OnEvent('outbid')
    async outBid(notification: Notification) {
        pubSub.publish('notification', { notification: notification })
    }

    @OnEvent('joinAuction')
    async joinAuction(notification: Notification) {
        console.log(notification)
        pubSub.publish('notification', { notification: notification })
    }

    @Query(() => [Notification])
    findAllNotificationUserByUserId(@GetCurrentUserId() userId: number) {
        return this.notificationService.findAllNotificationUserByUserId(userId)
    }

    @Mutation(() => Notification)
    remove(notificationId: number) {
        return this.notificationService.remove(notificationId)
    }

    @Mutation(() => Notification)
    async readNotification(notificationId: number) {
        return await this.notificationService.readNotification(notificationId)
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
        return await pubSub.asyncIterator('notification')
    }
}
