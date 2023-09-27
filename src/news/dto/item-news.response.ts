import { Field, Int, ObjectType } from '@nestjs/graphql'
import { News } from '../entities/news.entity'

@ObjectType()
export class ItemNews {
    @Field(() => [News])
    items: News[]

    @Field(() => Int)
    totalCount: number
}
