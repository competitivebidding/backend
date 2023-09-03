import { Field, ObjectType } from '@nestjs/graphql'
import { Category } from '../entities/category.entity'

@ObjectType()
export class ItemCategory {
    @Field(() => [Category])
    items: Category[]
}
