import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Payment {
    @Field({ nullable: true })
    number: string

    @Field({ nullable: true })
    cvv: string

    @Field({ nullable: true })
    month: string

    @Field({ nullable: true })
    year: string

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
