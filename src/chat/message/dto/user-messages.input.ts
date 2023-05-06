import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty } from 'class-validator'

@InputType()
export class UserMessages {
    @Field(() => Int)
    @IsInt()
    @IsNotEmpty()
    userId: number

    @Field(() => Int)
    @IsInt()
    @IsNotEmpty()
    roomId: number
}
