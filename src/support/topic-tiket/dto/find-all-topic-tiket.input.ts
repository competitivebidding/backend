import { Field, InputType, Int } from '@nestjs/graphql'
import { TopicProcess } from '@prisma/client'

@InputType()
export class FindAllTopicInput {
    @Field()
    title?: string

    @Field(() => Int)
    userId?: number

    @Field(() => Int)
    whoIsDoingId?: number

    @Field()
    process?: TopicProcess
}
