import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class StatusResponse {
    @Field(() => Int)
    id: number

    @Field()
    name: string
}
