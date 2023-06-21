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
        //пересмотреть реализацию события
        const notifications = await this.notificationService.getAllUserByAuctionId(auctionId)
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
    async getMyAllNotificationUserByUserId(@GetCurrentUserId() userId: number) {
        return await this.notificationService.getAllNotificationUserByUserId(userId)
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
        //userId @GetCurentUserId
        return await pubSub.asyncIterator('notification')
    }
}
