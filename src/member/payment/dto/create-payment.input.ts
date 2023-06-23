import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreatePaymentInput {
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    firstname?: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    lastname?: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    patronymic?: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    number?: string

    @Field({ nullable: true })
    @IsOptional()
    cvv?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    month?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    year?: string

    @Field(() => Int, { nullable: true })
    @IsInt()
    userId?: number
}
