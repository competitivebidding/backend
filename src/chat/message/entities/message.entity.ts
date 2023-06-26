import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserPublic } from '../../../member/user/dto/user-public.response'

@ObjectType()
export class Message {
    @Field(() => Int)
    id: number

    @Field()
    user: UserPublic

    @Field(() => Int)
    roomId: number

    @Field()
    content: string

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
