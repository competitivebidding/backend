import { Field, InputType, Int } from '@nestjs/graphql'
import { PayOperation } from '@prisma/client'
import { IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreatePayInput {
    @IsString()
    @Field()
    operation: PayOperation

    @IsString()
    @Field()
    typeOperation: string

    @IsInt()
    @Field(() => Int)
    amount: number

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    message?: string | null
}
