import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PayOperation } from '@prisma/client'

@ObjectType()
export class Pay {
    @Field(() => Int)
    id: number

    @Field()
    user_id: number

    @Field()
    operation: PayOperation

    @Field()
    typeOperation: string

    @Field(() => Int)
    amount: number

    @Field()
    message?: string

    @Field()
    createAt: Date
}
