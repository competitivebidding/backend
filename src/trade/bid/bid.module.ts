import { Module } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { BidResolver } from './bid.resolver'
import { BidService } from './bid.service'

@Module({
    providers: [BidResolver, BidService, PrismaService],
})
export class BidModule {}
