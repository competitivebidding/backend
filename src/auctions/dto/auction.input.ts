import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AuctionInput {
    // @Field((type) => [User])
    // creator: User
    @Field(() => Int, { nullable: true })
    createdUserId?: number

    // @Field((type) => [User], { nullable: true })
    // winner?: User
    @Field(() => Int, { nullable: true })
    wonUserId?: number

    //@Field({ nullable: true })
    //status?: boolean

    @Field({ nullable: true })
    createdAt?: Date

    @Field({ nullable: true })
    finishedAt?: Date
}
