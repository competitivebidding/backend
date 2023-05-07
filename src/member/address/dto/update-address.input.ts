import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreateAddressInput } from './create-address.input'

@InputType()
export class UpdateAddressInput extends PartialType(CreateAddressInput) {
    @Field(() => Int, { nullable: true })
    id?: number
}
