import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateMessageTiketInput {
    @Field(() => Int)
    topicId: number

    @Field(() => Int)
    toWhom: number

    @Field()
    title: string

    @Field()
    message: string
}
