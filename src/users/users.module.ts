import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../database/prisma.service'
import { UsersController } from './users.controller'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
    providers: [UsersService, PrismaService, JwtService, UsersResolver],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
