import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Bid } from '../../bids/dto/bid.response'
import { UserResp } from '../../users/entities/user.response'

@ObjectType()
export class Auction {
    @Field(() => Int)
    id: number

    @Field(() => UserResp)
    creator: UserResp

    @Field(() => UserResp, { nullable: true })
    winner?: UserResp

    @Field()
    status: boolean

    @Field()
    createdAt: Date

    @Field()
    validUntil: Date

    @Field(() => [Bid])
    bids: [Bid]
}

//   bids AuctionBid[]
//   User User[]
