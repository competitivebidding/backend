import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Token } from '../entities/token.entity'

@ObjectType()
export class ItemTokens {
    @Field(() => [Token])
    items: Token[]
}
