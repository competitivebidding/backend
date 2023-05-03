import { Module } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { ReferralResolver } from './referral.resolver'
import { ReferralService } from './referral.service'

@Module({
    providers: [ReferralResolver, ReferralService, PrismaService],
})
export class ReferralModule {}
