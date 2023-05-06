import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class RoomInputType {
    @Field()
    @IsString()
    @IsNotEmpty()
    title: string
}
