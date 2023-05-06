import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class MessageUpdateInputType {
    @Field(() => Int)
    @IsNotEmpty()
    @IsInt()
    id: number

    @Field()
    @IsString()
    @IsNotEmpty()
    content: string
}
