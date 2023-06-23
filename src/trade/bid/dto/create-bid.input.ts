import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt } from 'class-validator'

@InputType()
export class CreateBidInput {
    @Field(() => Int)
    @IsInt()
    auctionId: number

    @Field(() => Int)
    @IsInt()
    bitPrice: number
}
