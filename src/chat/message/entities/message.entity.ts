import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Message {
    @Field(() => Int)
    id: number

    @Field(() => Int)
    userId: number

    @Field(() => Int)
    roomId: number

    @Field()
    content: string

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
