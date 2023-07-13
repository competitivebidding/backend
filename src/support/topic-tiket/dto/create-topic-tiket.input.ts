import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTopicTiketInput {
    @Field()
    title: string

    @Field()
    message: string
}
