import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreditCardService } from './credit-card.service'
import { CreateRotoInput } from './dto/create-roto.input'
import { CreditCard } from './entities/credit-card.entity'

@Resolver(() => CreditCard)
export class CreditCardResolver {
    constructor(private readonly rotoService: CreditCardService) {}

    @Mutation(() => CreditCard)
    async createCreditCard(@Args('createCardInput') createRotoInput: CreateRotoInput) {
        return await this.rotoService.create(createRotoInput)
    }

    @Query(() => [CreditCard])
    async getAllMyCreditCard() {
        return await this.rotoService.findAll()
    }

    @Mutation(() => CreditCard)
    async removeCreditCard(@Args('id', { type: () => Int }) id: number) {
        return await this.rotoService.remove(id)
    }
}
