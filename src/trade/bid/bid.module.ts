import { Module } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { PayService } from '../../pay/pay.service'
import { BidResolver } from './bid.resolver'
import { BidService } from './bid.service'

@Module({
    providers: [BidResolver, BidService, PrismaService, PayService],
})
export class BidModule {}
