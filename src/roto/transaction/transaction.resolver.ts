import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetCurrentUserId } from '../../auth/decorators'
import { CreateTransactionInput } from './dto/create-transaction.input'
import { Transaction } from './entities/transaction.entity'
import { TransactionService } from './transaction.service'

@Resolver(() => Transaction)
export class TransactionResolver {
    constructor(private readonly transactionService: TransactionService) {}

    @Mutation(() => Transaction)
    async income(
        @GetCurrentUserId() userId: number,
        @Args('createTransactionInput') createTransactionInput: CreateTransactionInput,
    ) {
        return this.transactionService.income(createTransactionInput, userId)
    }

    @Mutation(() => Transaction)
    async debet(
        @GetCurrentUserId() userId: number,
        @Args('createTransactionInput') createTransactionInput: CreateTransactionInput,
    ) {
        return this.transactionService.debet(createTransactionInput, userId)
    }

    @Query(() => [Transaction], { name: 'transaction' })
    async getAllMyTransaction(@GetCurrentUserId() userId: number) {
        return this.transactionService.getAllMyTransaction(userId)
    }
}
