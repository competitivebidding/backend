import { Field, Int, ObjectType } from '@nestjs/graphql'
import { IsInt } from 'class-validator'

@ObjectType()
export class TokenHistory {
    @Field(() => Int)
    @IsInt()
    id: number

    @Field(() => Int)
    @IsInt()
    tokenId: number

    @Field(() => Int)
    @IsInt()
    userId: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
