import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

@ObjectType()
export class Token {
    @Field(() => Int)
    id: number

    @Field({ nullable: true })
    title?: string

    @Field({ nullable: true })
    description?: string

    @Field()
    price: Prisma.Decimal

    @Field(() => Int)
    points: number

    @Field(() => Int)
    sortOrder: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
