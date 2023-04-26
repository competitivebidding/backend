import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Auction } from './auction.response'

@ObjectType()
export class AuctionStatus {
    @Field(() => Int)
    id: number

    @Field()
    name: string

    @Field(() => [Auction])
    auctions: [Auction]
}
