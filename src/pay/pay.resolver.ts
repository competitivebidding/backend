import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetCurrentUserId } from '../auth/decorators'
import { CreatePayInput } from './dto/create-pay.input'
import { Pay } from './entities/pay.entity'
import { PayService } from './pay.service'

@Resolver(() => Pay)
export class PayResolver {
    constructor(private readonly payService: PayService) {}

    @Mutation(() => Pay)
    async payOperation(
        @GetCurrentUserId() user_id: number,
        @Args('createPayInput') createPayInput: CreatePayInput,
    ): Promise<Pay> {
        return await this.payService.payOperation({ ...createPayInput, user: { connect: { id: user_id } } }, user_id)
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
}
