import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateReferralInput {
    @Field(() => Int, { description: 'Example field (placeholder)' })
    exampleField: number
}
