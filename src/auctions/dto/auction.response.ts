import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Bid } from '../../bids/dto/bid.response'
import { UserResp } from '../../users/entities/user.response'
import { AuctionStatus } from './status.response'

@ObjectType()
export class Auction {
    @Field(() => Int)
    id: number

    @Field(() => UserResp)
    creator: UserResp

    @Field(() => UserResp, { nullable: true })
    winner?: UserResp

    @Field(() => AuctionStatus)
    status: AuctionStatus

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    @Field()
    finishedAt: Date

    @Field()
    startedAt: Date

    @Field(() => [Bid])
    bids: [Bid]

    // @Field(() => AuctionReview)
    // AuctionReview: [AuctionReview]

    // @Field(() => AuctionManufacturer)
    // manufacturers: [AuctionManufacturer]
}
