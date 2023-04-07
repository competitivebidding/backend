import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../database/prisma.service'
import { UsersService } from '../users/users.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
    providers: [AuthService, UsersService, JwtService, PrismaService],
    controllers: [AuthController],
    exports: [JwtService, AuthService],
})
export class AuthModule {}
