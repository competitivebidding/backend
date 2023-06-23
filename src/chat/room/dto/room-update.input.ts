import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsString } from 'class-validator'

@InputType()
export class RoomUpdateInput {
    @Field(() => Int, { nullable: true })
    @IsInt()
    ownerId?: number

    @Field({ nullable: true })
    @IsString()
    title?: string

    @Field({ nullable: true })
    @IsString()
    description?: string
}
