import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Referral {
    @Field(() => Int, { description: 'Example field (placeholder)' })
    exampleField: number
}
