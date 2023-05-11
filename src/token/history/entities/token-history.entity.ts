import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TokenHistory {
    @Field(() => Int)
    id: number

    @Field(() => Int)
    tokenId: number

    @Field(() => Int)
    userId: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
