import { Module } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { ReferralService } from './referral.service'

@Module({
    providers: [ReferralService, PrismaService],
})
export class ReferralModule {}
