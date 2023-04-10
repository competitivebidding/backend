import { Injectable } from '@nestjs/common'
import { News } from '@prisma/client'
import { PrismaService } from '../database/prisma.service'
import { NewsCreateInput } from './dto/create-news.input'
import { NewsUpdateInput } from './dto/update-news.input'

@Injectable()
export class NewsService {
    constructor(private prisma: PrismaService) {}

    async getAllNews(where: any, orderBy: any, skip: number, take: number): Promise<News[]> {
        const news = await this.prisma.news.findMany({
            where,
            orderBy,
            skip: skip || 0,
            take: take || 10,
            include: { user: true },
        })

        return news
    }

    async getNewsById(id: number): Promise<News> {
        const news = await this.prisma.news.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            },
        })

        if (!news) {
            throw new Error('News not found')
        }

        return news
    }

    async createNews(data: NewsCreateInput): Promise<News> {
        const news = await this.prisma.news.create({ data })

        return news
    }

    async updateNews(id: number, data: NewsUpdateInput): Promise<News> {
        const news = await this.prisma.news.findUnique({
            where: {
                id,
            },
        })
        if (!news) {
            throw new Error('News not found')
        }

        const updatedNews = await this.prisma.news.update({
            where: { id },
            data,
        })

        return updatedNews
    }

    async deleteNews(id: number): Promise<boolean> {
        const news = await this.prisma.news.findUnique({
            where: {
                id,
            },
        })

        if (!news) {
            throw new Error('News not found')
        }

        await this.prisma.news.delete({
            where: { id },
        })

        return true
    }
}
