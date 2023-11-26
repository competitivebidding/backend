import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class CreateTopicTiketInput {
    @Field()
    @IsString()
    title: string

    @Field()
    @IsString()
    message: string
}
