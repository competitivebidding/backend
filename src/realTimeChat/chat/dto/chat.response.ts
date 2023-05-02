import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Message } from '../entities/message'

@ObjectType()
export class ChatResponseType {
    @Field(() => Int)
    id: number

    @Field()
    name: string

    @Field(() => [Message])
    Message: Message[]
}

// export class Chat_User {
//     user_id: user
//     chat_id: chat
// }
