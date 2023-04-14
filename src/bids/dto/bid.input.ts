import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class BidInput {
    @Field((type) => Int, { nullable: true })
    userId?: number

    @Field((type) => Int, { nullable: true })
    auctionId?: number

    @Field((type) => Int, { nullable: true })
    bitPrice?: number

    @Field({ nullable: true })
    creationTime?: Date
}
