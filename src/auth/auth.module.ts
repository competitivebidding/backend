import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../database/prisma.service'
import { UserService } from '../member/user/user.service'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies'

@Module({
    providers: [
        AuthResolver,
        AuthService,
        UserService,
        JwtService,
        PrismaService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
    ],
})
export class AuthModule {}
