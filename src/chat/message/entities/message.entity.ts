import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserPublic } from '../../../member/user/dto/user-public.response'
import { Room } from '../../room/entities/room.entity'

@ObjectType()
export class Message {
    @Field(() => Int)
    id: number

    @Field()
    user: UserPublic

    @Field()
    room: Room

    @Field()
    content: string

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
