import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber } from 'class-validator'

@InputType()
export class AddUserInput {
    @Field(() => Int)
    @IsNotEmpty()
    @IsNumber()
    userId: number

    @Field(() => Int)
    @IsNotEmpty()
    @IsNumber()
    roomId: number
}
