import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from '../../users/entities/user.entity'
import { Auction } from './auction.response'

@ObjectType()
export class Bid {
    @Field((type) => User)
    user: User
    // @Field()
    // userId: number

    @Field((type) => Auction)
    auction: Auction
    // @Field()
    //auctionId: number

    @Field((type) => Int)
    bitPrice: number

    @Field()
    creationTime: Date
}
