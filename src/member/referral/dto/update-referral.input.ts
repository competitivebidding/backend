import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreateReferralInput } from './create-referral.input'

@InputType()
export class UpdateReferralInput extends PartialType(CreateReferralInput) {
    @Field(() => Int)
    id: number
}
