import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserPublic } from '../../../member/user/dto/user-public.response'

@ObjectType()
export class Room {
    @Field(() => Int)
    id: number

    @Field(() => UserPublic)
    owner: UserPublic

    @Field()
    title: string

    @Field({ nullable: true })
    description: string

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
