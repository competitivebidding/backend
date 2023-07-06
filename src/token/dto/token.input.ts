import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { IsDate, IsOptional } from 'class-validator'

@InputType()
export class TokenInput {
    @Field(() => Int)
    id: number

    @Field({ nullable: true })
    title?: string

    @Field({ nullable: true })
    description?: string

    @Field(() => Float)
    price: number

    @Field(() => Int)
    points: number

    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    createdAt?: Date

    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    startedAt?: Date
}
