import { ConfigService } from '@nestjs/config'
import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PayOperation } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions'
import { GetCurrentUserId, Public } from '../auth/decorators'
import { UserService } from './../member/user/user.service'
import { CreatePayInput } from './dto/create-pay.input'
import { RotoSub } from './dto/roto-subscription.response'
import { Pay } from './entities/pay.entity'
import { PayService } from './pay.service'
import TypeOperation from './utils/type-operation'

const pubSub = new PubSub()

@Resolver(() => Pay)
export class PayResolver {
    constructor(
        private readonly payService: PayService,
        private readonly config: ConfigService,
        private readonly userService: UserService,
    ) {}

    @Mutation(() => Pay)
    async payOperation(
        @GetCurrentUserId() user_id: number,
        @Args('createPayInput') createPayInput: CreatePayInput,
    ): Promise<Pay> {
        const pay = await this.payService.payOperation(
            {
                ...createPayInput,
                user: { connect: { id: user_id } },
            },
            user_id,
        )
        const user = await this.userService.getUserById(user_id)
        pubSub.publish('rotoSubscription', { rotoSubscription: new RotoSub(pay.user_id, user.balance) })

        return pay
    }

    @Mutation(() => Pay)
    async watchAdvertising(@GetCurrentUserId() user_id: number) {
        const pay = await this.payService.payOperation(
            {
                operation: PayOperation.refil,
                typeOperation: TypeOperation.watchAdvertising,
                amount: +this.config.get('WATCH_ADVERTISING'),
                user: { connect: { id: user_id } },
            },
            user_id,
        )

        const user = await this.userService.getUserById(user_id)
        pubSub.publish('rotoSubscription', { rotoSubscription: new RotoSub(pay.user_id, user.balance) })

        return pay
    }

    @Query(() => [Pay])
    async getAllMyPayOperation(@GetCurrentUserId() user_id: number): Promise<Pay[]> {
        return await this.payService.findAllMyPayOperation(user_id)
    }

    @Query(() => Pay)
    async getOneMyPayOperation(
        @GetCurrentUserId() user_id: number,
        @Args('id', { type: () => Int }) id: number,
    ): Promise<Pay> {
        return await this.payService.findOneMyPayOperation(user_id, id)
    }

    @Public()
    @Subscription(() => RotoSub, {
        filter: (payload, variabl: { user_id: number }) => {
            return payload.rotoSubscription.userId === variabl.user_id
        },
        name: 'rotoSubscription',
    })
    async RotoSubscription(@Args('user_id', { type: () => Int }) user_id: number) {
        console.log(user_id)
        return pubSub.asyncIterator('rotoSubscription')
    }
}
