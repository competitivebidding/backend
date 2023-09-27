import { Module } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { AuctionResolver } from './auction.resolver'
import { AuctionService } from './auction.service'

@Module({
    providers: [AuctionResolver, AuctionService, PrismaService],
})
export class AuctionModule {}
