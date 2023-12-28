import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RotoSub {
    constructor(userId: number, balanse: number) {
        ;(this.userId = userId), (this.balance = balanse)
    }

    @Field(() => Int)
    userId: number

    @Field(() => Int)
    balance: number
}
