import { Field, Int, ObjectType } from '@nestjs/graphql'
import { TopicProcess } from '@prisma/client'
import { UserPublic } from '../../../member/user/dto/user-public.response'

@ObjectType()
export class TopicTiket {
    @Field(() => Int)
    id: number

    @Field(() => UserPublic)
    user: UserPublic

    @Field()
    title: string

    @Field()
    message: string

    @Field()
    process: TopicProcess

    @Field(() => Int, { nullable: true })
    adminId: number

    @Field(() => UserPublic, { nullable: true })
    whoIsDoing?: UserPublic
}
