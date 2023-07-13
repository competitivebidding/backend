import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateTopicTiketInput {
    @Field()
    title?: string

    @Field()
    message?: string
}
