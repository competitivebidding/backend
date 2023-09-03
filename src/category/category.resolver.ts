import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { Public } from '../auth/decorators'
import { CategoryService } from './category.service'
import { ItemCategory } from './dto/category.response'
import { Category } from './entities/category.entity'

@Resolver(() => Category)
export class CategoryResolver {
    constructor(private readonly categoryService: CategoryService) {}

    @Public()
    @Query(() => ItemCategory)
    async getAllCategories(
        @Args('search', { nullable: true }) search: string,
        @Args('sortBy', { nullable: true }) sortBy: string,
        @Args('sortOrder', { nullable: true, defaultValue: 'asc' }) sortOrder: 'asc' | 'desc',
        @Args('skip', { nullable: true, type: () => Int, defaultValue: 0 }) skip: number,
        @Args('take', { nullable: true, type: () => Int, defaultValue: 10 }) take: number,
    ) {
        const where = search ? { OR: [{ name: { contains: search } }, { description: { contains: search } }] } : {}

        const orderBy = {
            [sortBy || 'createdAt']: sortOrder,
        }

        const categories = await this.categoryService.getAllCategories(where, orderBy, skip, take)

        return {
            items: categories,
        }
    }
}
