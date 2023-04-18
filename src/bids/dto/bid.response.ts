import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Auction } from '../../auctions/dto/auction.response'
import { UserResp } from '../../users/entities/user.response'

@ObjectType()
export class Bid {
    @Field(() => UserResp)
    user: UserResp

    @Field(() => Auction)
    auction: Auction

    @Field(() => Int)
    bitPrice: number

    @Field()
    createdAt: Date
}
