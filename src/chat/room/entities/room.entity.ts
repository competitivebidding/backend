import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Room {
    @Field(() => Int)
    id: number

    @Field(() => Int)
    owner: number

    @Field()
    title: string

    @Field({ nullable: true })
    description: string

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
