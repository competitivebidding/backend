import { Module } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { CategoryResolver } from './category.resolver'
import { CategoryService } from './category.service'

@Module({
    providers: [CategoryResolver, CategoryService, PrismaService],
})
export class CategoryModule {}
