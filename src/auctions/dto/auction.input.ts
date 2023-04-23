import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AuctionInput {
    @Field(() => Int, { nullable: true })
    createdUserId?: number

    @Field(() => Int, { nullable: true })
    wonUserId?: number

    @Field({ nullable: true })
    statusName?: string

    @Field({ nullable: true })
    statusId?: number

    @Field({ nullable: true })
    createdAt?: Date

    @Field({ nullable: true })
    finishedAt?: Date

    @Field({ nullable: true })
    startedAt?: Date
}

@InputType()
export class AuctionUniqueInput {
    @Field(() => Int)
    id: number
}
