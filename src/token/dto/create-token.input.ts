import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator'

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
    @IsNumber()
    @Min(0)
    price: number

    @Field(() => Int)
    @IsInt()
    points: number

    @Field()
    @IsInt()
    @IsOptional()
    sortOrder?: number
}
