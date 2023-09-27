import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserPayment } from '@prisma/client'
import { GetCurrentUserId } from '../../auth/decorators'
import { UpdatePaymentInput } from './dto'
import { Payment } from './entities/payment.entity'
import { PaymentService } from './payment.service'

@Resolver(() => Payment)
export class PaymentResolver {
    constructor(private readonly paymentService: PaymentService) {}

    @Mutation(() => Payment)
    async updateUserPayment(
        @GetCurrentUserId() userId: number,
        @Args('input') input: UpdatePaymentInput,
    ): Promise<UserPayment> {
        const paymentInput = { ...input, user: { connect: { id: userId } } }
        const payment = await this.paymentService.findFirst({ userId })
        if (payment) {
            return await this.paymentService.update({
                where: { id: payment.id },
                data: paymentInput,
            })
        }

        return await this.paymentService.create(paymentInput)
    }

    @Query(() => Payment)
    async getUserPayment(@GetCurrentUserId() userId: number): Promise<UserPayment> {
        return await this.paymentService.findFirst({ userId })
    }
}
