import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Auction } from '../../auctions/dto/auction.response'
import { Bid } from '../../bids/dto/bid.response'

@ObjectType()
export class UserResp {
    @Field(() => Int)
    id: number

    @Field()
    username: string

    @Field()
    email: string

    @Field((type) => [UserResp])
    winnedAuctions: [Auction]

    @Field((type) => [UserResp])
    createdAuctions: [Auction]

    @Field((type) => [Bid])
    bids: [Bid]
}
