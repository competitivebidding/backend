import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Auction } from '../../auctions/dto/auction.response'
import { UserResp } from '../../users/entities/user.response'

@ObjectType()
export class Bid {
    @Field((type) => UserResp)
    user: UserResp

    @Field((type) => Auction)
    auction: Auction

    @Field((type) => Int)
    bitPrice: number

    @Field()
    creationTime: Date
}
