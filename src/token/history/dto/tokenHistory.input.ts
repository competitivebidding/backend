import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { IsInt } from 'class-validator'

@InputType()
export class TokenHistoryInput {
    @Field(() => Int)
    @IsInt()
    id: number

    @Field(() => Int)
    @IsInt()
    tokenId: number

    @Field(() => Int)
    @IsInt()
    userId: number

    @Field(() => Float)
    @IsInt()
    price: number

    @Field(() => Int)
    @IsInt()
    points: number
}
