import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AuctionInput {
    // @Field((type) => [User])
    // creator: User
    @Field({ nullable: true })
    creatorId?: number

    // @Field((type) => [User], { nullable: true })
    // winner?: User
    @Field({ nullable: true })
    winnerId?: number

    @Field({ nullable: true })
    status?: boolean

    @Field({ nullable: true })
    creationTime?: Date

    @Field({ nullable: true })
    validUntil?: Date
}
