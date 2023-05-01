import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserAddress } from '@prisma/client'
import { GetCurrentUserId } from '../../auth/decorators'
import { AddressService } from './address.service'
import { UpdateAddressInput } from './dto/update-address.input'
import { Address } from './entities/address.entity'

@Resolver(() => Address)
export class AddressResolver {
    constructor(private readonly addressService: AddressService) {}

    @Mutation(() => Address)
    async updateUserAddress(
        @GetCurrentUserId() userId: number,
        @Args('data') data: UpdateAddressInput,
    ): Promise<UserAddress> {
        const addressInput = { ...data, user: { connect: { id: userId } } }
        const address = await this.addressService.findFirst({ userId })
        if (address) {
            return await this.addressService.update({
                where: { id: address.id },
                data: addressInput,
            })
        }

        return await this.addressService.create(addressInput)
    }

    @Query(() => Address)
    async getUserAddress(@GetCurrentUserId() userId: number): Promise<UserAddress> {
        return await this.addressService.findFirst({ userId })
    }
}
