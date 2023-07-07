import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { RoomService } from '../chat/room/room.service'
import { PrismaService } from '../database/prisma.service'
import { MailService } from '../mail/mail.service'
import { ReferralService } from '../member/referral/referral.service'
import { UserService } from '../member/user/user.service'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies'

@Module({
    providers: [
        AuthResolver,
        AuthService,
        UserService,
        ReferralService,
        JwtService,
        PrismaService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
        MailService,
        RoomService,
    ],
})
export class AuthModule {}
