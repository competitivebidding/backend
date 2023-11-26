import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Token } from '../../entities/token.entity'

@ObjectType()
export class ItemToken {
    @Field(() => [Token])
    items: Token[]

    @Field(() => Int)
    totalCount: number
}
