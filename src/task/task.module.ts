import { Module } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { TasksService } from './task.service'

@Module({
    providers: [TasksService, PrismaService],
})
export class TaskModule {}
