import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Bid } from '../../bids/dto/bid.response'
import { UserResp } from '../../users/entities/user.response'

@ObjectType()
export class Auction {
    @Field((type) => Int)
    id: number

    @Field((type) => UserResp)
    creator: UserResp

    @Field((type) => UserResp, { nullable: true })
    winner?: UserResp

    @Field()
    status: boolean

    @Field()
    creationTime: Date

    @Field()
    validUntil: Date

    @Field((type) => [Bid])
    bids: [Bid]
}

//   bids AuctionBid[]
//   User User[]
