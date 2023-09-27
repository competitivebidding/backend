import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { IsInt } from 'class-validator'

@InputType()
export class CreateHistoryInput {
    @Field(() => Int)
    @IsInt()
    tokenId: number

    @Field(() => Float)
    @IsInt()
    price: number

    @Field(() => Int)
    @IsInt()
    points: number
}
