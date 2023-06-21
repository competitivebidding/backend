import { Field, Float, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Token {
    @Field(() => Int)
    id: number

    @Field({ nullable: true })
    title?: string

    @Field({ nullable: true })
    description?: string

    @Field(() => Float)
    price: number

    @Field(() => Int)
    points: number

    @Field(() => Int)
    sortOrder: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
