import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Auction {
    @Field((type) => Int)
    id: number

    // @Field((type) => [User])
    // creator: User
    @Field()
    creatorId: number

    // @Field((type) => [User], { nullable: true })
    // winner?: User
    @Field()
    winnerId?: number

    @Field()
    status: boolean

    @Field()
    creationTime: Date

    @Field()
    validUntil: Date
}

//   bids AuctionBid[]
//   User User[]
