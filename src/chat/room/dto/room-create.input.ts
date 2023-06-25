import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class RoomCreateInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    title: string

    @Field()
    @IsString()
    @IsNotEmpty()
    description: string
}
