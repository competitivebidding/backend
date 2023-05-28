import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Status {
    @Field(() => Int)
    id: number

    @Field()
    name: string
}
