import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class NewMessageInputType {
    @Field(() => Int)
    @IsInt()
    @IsNotEmpty()
    id: number

    @Field(() => Int)
    @IsInt()
    @IsNotEmpty()
    user_id: number

    @Field(() => Int)
    @IsNotEmpty()
    @IsInt()
    chat_id: number

    @Field()
    @IsString()
    @IsNotEmpty()
    content: string
}

@InputType()
export class ChatInputType {
    @Field(() => Int)
    id: number

    @Field()
    name: string
}
