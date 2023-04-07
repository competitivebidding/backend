import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '../auth/auth.guard'
import { AuthService } from '../auth/auth.service'
import { PrismaService } from '../prisma/prisma.service'
import { UsersController } from './users.controller'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
    providers: [UsersService, PrismaService, AuthService, JwtService, AuthGuard, UsersResolver],
    controllers: [UsersController],
})
export class UsersModule {}
