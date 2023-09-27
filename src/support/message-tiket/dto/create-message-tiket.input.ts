import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsString } from 'class-validator'

@InputType()
export class CreateMessageTiketInput {
    @Field(() => Int)
    @IsInt()
    topicId: number

    @Field(() => Int)
    @IsInt()
    toWhom: number

    @Field()
    @IsString()
    title: string

    @Field()
    @IsString()
    message: string
}
