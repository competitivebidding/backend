import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserPublic {
    @Field(() => Int)
    id: number

    @Field()
    username: string

    @Field({ nullable: true })
    firstname?: string

    @Field({ nullable: true })
    lastname?: string

    @Field({ nullable: true })
    avatarUrl?: string

    @Field(() => Int)
    balance: number
}
