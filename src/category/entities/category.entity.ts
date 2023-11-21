import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Category {
    @Field(() => Int)
    id: number

    @Field()
    name: string

    @Field()
    description?: string

    @Field()
    imageUrl?: string

    @Field()
    slug?: string

    @Field(() => Int)
    sortOrder: number

    @Field(() => Int, { nullable: true })
    parentId: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    // @Field()
    // AuctionCategoryAuction: string

    // @Field()
    // parent: string

    // @Field()
    // childCategories: string
}
