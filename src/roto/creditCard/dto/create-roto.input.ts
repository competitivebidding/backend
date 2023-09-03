import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateRotoInput {
    @Field(() => Int, { description: 'Example field (placeholder)' })
    exampleField: number
}
