import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Auction } from '../../../auctions/dto/auction.response'
import { Bid } from '../../../bids/dto/bid.response'

@ObjectType()
export class UserResp {
    @Field(() => Int)
    id: number

    @Field()
    username: string

    @Field()
    email: string

    @Field(() => [UserResp])
    winnedAuctions: [Auction]

    @Field(() => [UserResp])
    createdAuctions: [Auction]

    @Field(() => [Bid])
    bids: [Bid]
}
