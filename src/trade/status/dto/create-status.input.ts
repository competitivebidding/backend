import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateStatusInput {
    @Field()
    name: string
}
