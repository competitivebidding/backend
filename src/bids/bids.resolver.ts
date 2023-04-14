import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { Public } from '../auth/decorators'
import { BidsService } from './bids.service'
import { BidInput } from './dto/bid.input'
import { Bid } from './dto/bid.response'

@Resolver()
export class BidsResolver {
    constructor(private readonly bidsService: BidsService) {}

    @Public()
    @Query(() => [Bid])
    async getAllBids(
        @Args('sortBy', { nullable: true }) sortBy: string,
        @Args('sortOrder', { nullable: true, defaultValue: 'asc' }) sortOrder: 'asc' | 'desc',
        @Args('skip', { nullable: true, type: () => Int, defaultValue: 0 }) skip: number,
        @Args('take', { nullable: true, type: () => Int, defaultValue: 10 }) take: number,
        @Args('where', { nullable: true, defaultValue: {} }) bidInput: BidInput,
    ) {
        const orderBy = {
            [sortBy || 'creationTime']: sortOrder,
        }
        const where = bidInput ? bidInput : {}
        const bids = await this.bidsService.bids(skip, take, where, orderBy)
        return bids
    }

    @Public()
    @Query(() => Bid)
    async getBidById(@Args('id', { type: () => Int }) id: Prisma.AuctionBidWhereUniqueInput) {
        const bid = await this.bidsService.getBidById(id)

        if (!bid) {
            throw new Error('Bid not found')
        }

        return bid
    }
}
