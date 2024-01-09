import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RotoSub {
    @Field(() => Int)
    userId: number

    @Field(() => Int)
    balance: number
}
