import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreateBidInput } from './create-bid.input'

@InputType()
export class UpdateBidInput extends PartialType(CreateBidInput) {
    @Field(() => Int)
    id: number
}
