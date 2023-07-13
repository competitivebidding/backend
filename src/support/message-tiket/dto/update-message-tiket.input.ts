import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class UpdateMessageTiketInput {
    @Field(() => Int)
    topicId?: number

    @Field(() => Int)
    fromWhomId?: number

    @Field(() => Int)
    toWhomId?: number

    @Field()
    title?: string

    @Field()
    message?: string
}
