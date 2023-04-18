import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class BidInput {
    @Field(() => Int, { nullable: true })
    userId?: number

    @Field(() => Int, { nullable: true })
    auctionId?: number

    @Field(() => Int, { nullable: true })
    bitPrice?: number

    @Field({ nullable: true })
    createdAt?: Date
}
