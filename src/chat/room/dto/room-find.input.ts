import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class RoomFindInput {
    @Field({ nullable: true })
    @IsString()
    title?: string

    @Field({ nullable: true })
    @IsString()
    description?: string
}
