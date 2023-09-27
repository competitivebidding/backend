import { Module } from '@nestjs/common'
import { AuctionModule } from './auction/auction.module'
import { BidModule } from './bid/bid.module'
import { StatusModule } from './status/status.module'

@Module({
    providers: [],
    imports: [BidModule, StatusModule, AuctionModule],
})
export class TradeModule {}
