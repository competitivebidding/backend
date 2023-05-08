import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty } from 'class-validator'

@InputType()
export class UserMessages {
    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsNotEmpty()
    userId?: number

    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsNotEmpty()
    room?: number
}
