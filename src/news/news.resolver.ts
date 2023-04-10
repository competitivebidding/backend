import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Public } from '../auth/decorators'
import { NewsCreateInput } from './dto/create-news.input'
import { NewsUpdateInput } from './dto/update-news.input'
import { News } from './entities/news.entity'
import { NewsService } from './news.service'

@Resolver(() => News)
export class NewsResolver {
    constructor(private readonly newsService: NewsService) {}

    @Public()
    @Query(() => [News])
    async getAllNews(
        @Args('search', { nullable: true }) search: string,
        @Args('sortBy', { nullable: true }) sortBy: string,
        @Args('sortOrder', { nullable: true, defaultValue: 'asc' }) sortOrder: 'asc' | 'desc',
        @Args('skip', { nullable: true, type: () => Int, defaultValue: 0 }) skip: number,
        @Args('take', { nullable: true, type: () => Int, defaultValue: 10 }) take: number,
    ) {
        const where = search ? { OR: [{ title: { contains: search } }, { description: { contains: search } }] } : {}

        const orderBy = {
            [sortBy || 'createdAt']: sortOrder,
        }

        const news = await this.newsService.getAllNews(where, orderBy, skip, take)

        return news
    }

    @Public()
    @Query(() => News)
    async getNewsById(@Args('id', { type: () => Int }) id: number): Promise<News> {
        const news = await this.newsService.getNewsById(id)

        if (!news) {
            throw new Error('News not found')
        }

        return news
    }

    @Public()
    @Mutation(() => News)
    async createNews(@Args('data') data: NewsCreateInput): Promise<News> {
        const news = await this.newsService.createNews(data)

        return news
    }

    @Public()
    @Mutation(() => News, { nullable: true })
    async updateNews(@Args('id', { type: () => Int }) id: number, @Args('data') data: NewsUpdateInput): Promise<News> {
        const news = await this.newsService.getNewsById(id)
        if (!news) {
            throw new Error('News not found')
        }

        const updatedNews = await this.newsService.updateNews(id, data)

        return updatedNews
    }

    @Public()
    @Mutation(() => Boolean)
    async deleteNews(@Args('id', { type: () => Int }) id: number) {
        const news = await this.newsService.getNewsById(id)

        if (!news) {
            throw new Error('News not found')
        }

        await this.newsService.deleteNews(id)

        return true
    }
}
