import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class NewMessageInput {
    @Field(() => Int)
    @IsNotEmpty()
    @IsInt()
    room: number

    @Field()
    @IsString()
    @IsNotEmpty()
    content: string
}
