import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Message {
    @Field(() => Int)
    id: number

    @Field(() => Int)
    user_id: number

    @Field(() => Int)
    chat_id: number

    @Field()
    content: string

    // @Field(() => Int)
    // create_at: number
}
