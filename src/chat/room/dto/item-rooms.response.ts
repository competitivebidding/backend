import { Field, Int, ObjectType } from '@nestjs/graphql'
import { RoomResponse } from './room.response'

@ObjectType()
export class ItemRooms {
    @Field(() => [RoomResponse])
    items: RoomResponse[]

    @Field(() => Int)
    totalCount: number
}
