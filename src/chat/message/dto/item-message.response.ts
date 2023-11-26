import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Message } from '../entities/message.entity'

@ObjectType()
export class ItemMessages {
    @Field(() => [Message])
    items: Message[]

    @Field(() => Int)
    totalCount: number
}
