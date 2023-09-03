import { Field, InputType, Int } from '@nestjs/graphql'
import { TypeTransaction } from '@prisma/client'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateTransactionInput {
    @Field(() => Int)
    @IsNotEmpty()
    @IsInt()
    userId: number

    @Field()
    @IsNotEmpty()
    @IsString()
    sum: string

    @Field()
    @IsNotEmpty()
    @IsString()
    type: TypeTransaction

    @Field()
    @IsNotEmpty()
    @IsString()
    comments: string

    @Field(() => Int)
    @IsNotEmpty()
    @IsInt()
    cardId: number
}
