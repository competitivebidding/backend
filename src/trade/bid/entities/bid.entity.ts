import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserPublic } from '../../../member/user/dto/user-public.response'

@ObjectType()
export class Bid {
    @Field(() => Int)
    id: number

    @Field(() => Int)
    userId: number

    @Field(() => Int)
    auctionId: number

    @Field(() => Int)
    bitPrice: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    @Field(() => UserPublic, { nullable: true })
    user?: UserPublic

    // @Field(() => Auction, { nullable: true })
    // auction: Auction
}
