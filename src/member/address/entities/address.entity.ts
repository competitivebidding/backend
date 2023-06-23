import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Address {
    @Field({ nullable: true })
    country: string

    @Field({ nullable: true })
    city: string

    @Field({ nullable: true })
    address: string

    @Field({ nullable: true })
    index: string

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
