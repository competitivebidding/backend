import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserPublic {
    @Field()
    username: string

    @Field({ nullable: true })
    firstname?: string

    @Field({ nullable: true })
    lastname?: string

    @Field({ nullable: true })
    avatarUrl?: string
}
