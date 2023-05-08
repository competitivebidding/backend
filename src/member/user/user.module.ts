import { Module } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { ReferralService } from '../referral/referral.service'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
    providers: [UserResolver, UserService, ReferralService, PrismaService],
})
export class UserModule {}
