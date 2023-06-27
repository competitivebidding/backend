import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Room } from './../entities/room.entity'

@ObjectType()
export class ItemRooms {
    @Field(() => [Room])
    items: Room[]

    @Field(() => Int)
    totalCount: number
}
