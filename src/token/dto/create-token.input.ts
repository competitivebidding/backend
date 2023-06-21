import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateTokenInput {
    @Field()
    @IsString()
    @IsOptional()
    title?: string

    @Field()
    @IsString()
    @IsOptional()
    description?: string

    @Field(() => Float)
    @IsInt()
    price: number

    @Field(() => Int)
    @IsInt()
    points: number

    @Field()
    @IsInt()
    @IsOptional()
    sortOrder?: number
}
