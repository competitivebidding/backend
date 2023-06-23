import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateStatusInput {
    @Field()
    name: string
}
