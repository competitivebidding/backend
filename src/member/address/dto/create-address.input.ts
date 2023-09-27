import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateAddressInput {
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    country?: string

    @Field({ nullable: true })
    @IsOptional()
    city: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    address: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    index: string

    @Field(() => Int, { nullable: true })
    @IsInt()
    userId?: number
}
