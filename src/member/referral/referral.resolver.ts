import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateReferralInput } from './dto/create-referral.input'
import { UpdateReferralInput } from './dto/update-referral.input'
import { Referral } from './entities/referral.entity'
import { ReferralService } from './referral.service'

@Resolver(() => Referral)
export class ReferralResolver {
    constructor(private readonly referralService: ReferralService) {}

    @Mutation(() => Referral)
    createReferral(@Args('createReferralInput') createReferralInput: CreateReferralInput) {
        return this.referralService.create(createReferralInput)
    }

    @Query(() => [Referral], { name: 'referral' })
    findAll() {
        return this.referralService.findAll()
    }

    @Query(() => Referral, { name: 'referral' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.referralService.findOne(id)
    }

    @Mutation(() => Referral)
    updateReferral(@Args('updateReferralInput') updateReferralInput: UpdateReferralInput) {
        return this.referralService.update(updateReferralInput.id, updateReferralInput)
    }

    @Mutation(() => Referral)
    removeReferral(@Args('id', { type: () => Int }) id: number) {
        return this.referralService.remove(id)
    }
}
