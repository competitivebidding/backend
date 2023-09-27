import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class News {
    @Field(() => Int)
    id: number

    @Field()
    title: string

    @Field({ nullable: true })
    description: string

    @Field(() => Int)
    userId: number

    @Field({ nullable: true })
    imageUrl?: string

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
