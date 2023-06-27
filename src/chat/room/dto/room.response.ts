import { Field, ObjectType, PartialType } from '@nestjs/graphql'
import { Room } from '../entities/room.entity'

@ObjectType()
export class RoomResponse extends PartialType(Room) {
    @Field(() => [Messages])
    messages: Messages[]
}

@ObjectType()
class Messages {
    @Field()
    content: string
}
