import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CreditCard {
    @Field(() => Int)
    exampleField: number
}
