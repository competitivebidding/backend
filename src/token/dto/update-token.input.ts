import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator'

@InputType()
export class UpdateTokenInput {
    @Field({ nullable: true })
    @IsString()
    @MaxLength(255)
    title?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string

    @Field(() => Float)
    price: number

    @Field(() => Int)
    points: number

    @Field()
    @IsInt()
    @IsOptional()
    sortOrder?: number
}
