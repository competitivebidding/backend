import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsString } from 'class-validator'

@InputType()
export class RoomUpdateInputType {
    @Field(() => Int, { nullable: true })
    @IsInt()
    owner?: number

    @Field({ nullable: true })
    @IsString()
    title?: string

    @Field({ nullable: true })
    @IsString()
    description?: string
}
