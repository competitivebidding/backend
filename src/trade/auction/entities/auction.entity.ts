import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserPublic } from '../../../member/user/dto/user-public.response'
import { Bid } from '../../bid/entities/bid.entity'
import { Status } from '../../status/entities/status.entity'

@ObjectType()
export class Auction {
    @Field(() => Int)
    id: number

    @Field()
    title: string

    @Field()
    description?: string

    @Field(() => Int)
    startingPrice: number

    @Field(() => UserPublic)
    creator: UserPublic

    @Field(() => UserPublic, { nullable: true })
    winner?: UserPublic

    @Field(() => Status)
    status: Status

    @Field(() => Int)
    sortOrder: number

    @Field()
    finishedAt: Date

    @Field()
    startedAt: Date

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    @Field(() => [Bid], { nullable: true })
    bids?: Bid[]

    // @Field(() => AuctionReview)
    // AuctionReview: [AuctionReview]

    // @Field(() => AuctionManufacturer)
    // manufacturers: [AuctionManufacturer]
}
