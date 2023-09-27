import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserPublic } from '../../../member/user/dto/user-public.response'

@ObjectType()
export class MessageTiket {
    @Field(() => Int)
    id: number

    @Field(() => Int)
    topicId: number

    @Field(() => UserPublic)
    toWhom: UserPublic

    @Field(() => UserPublic)
    fromWhom: UserPublic

    @Field()
    title: string

    @Field()
    message: string
}
