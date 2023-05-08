import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ReferralUser {
    @Field(() => Int)
    id: number

    @Field()
    cuid: string

    @Field()
    email: string

    @Field()
    username: string

    @Field()
    createdAt: Date
}
