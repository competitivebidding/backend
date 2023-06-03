import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetCurrentUserId } from '../../auth/decorators'
import { BidService } from './bid.service'
import { BidInput } from './dto/bid.input'
import { CreateBidInput } from './dto/create-bid.input'
import { UpdateBidInput } from './dto/update-bid.input'
import { Bid } from './entities/bid.entity'

@Resolver(() => Bid)
export class BidResolver {
    constructor(private readonly bidsService: BidService) {}

    @Query(() => [Bid])
    async getBidsByAuctionId(
        @Args('auctionId', { type: () => Int }) auctionId: number,
        @Args('sortBy', { nullable: true }) sortBy: string,
        @Args('sortOrder', { nullable: true, defaultValue: 'asc' }) sortOrder: 'asc' | 'desc',
        @Args('skip', { nullable: true, type: () => Int, defaultValue: 0 }) skip: number,
        @Args('take', { nullable: true, type: () => Int, defaultValue: 10 }) take: number,
        @Args('where', { nullable: true, defaultValue: {} }) bidInput: BidInput,
    ) {
        const orderBy = {
            [sortBy || 'createdAt']: sortOrder,
        }
        const where = bidInput ? bidInput : {}
        const bids = await this.bidsService.getBids(skip, take, where, orderBy)
        return bids
    }

    @Query(() => Bid)
    async getBidById(@Args('bidId', { type: () => Int }) bidId: number) {
        const bid = await this.bidsService.getBidById(bidId)

        if (!bid) {
            throw new Error('Bid not found')
        }

        return bid
    }

    @Mutation(() => Bid)
    async createMyBid(@GetCurrentUserId() userId: number, @Args('input') input: CreateBidInput) {
        // TODO - check enough user token to do this
        // TODO - check Auction exists
        const { bitPrice, auctionId } = input
        const inputBid = {
            user: { connect: { id: userId } },
            auction: { connect: { id: auctionId } },
            bitPrice,
        }
        const bid = await this.bidsService.createMyBid(inputBid)
        if (!bid) {
            throw new Error('Cannot create bid')
        }

        return bid
    }

    @Mutation(() => Bid)
    async updateMyBid(
        @GetCurrentUserId() userId: number,
        @Args('bidId', { type: () => Int }) bidId: number,
        @Args('data') data: UpdateBidInput,
    ) {
        // TODO - check enough user token to do this
        const updBid = await this.bidsService.updateMyBid(userId, bidId, data)
        if (!updBid) {
            throw new Error('Cannot update bid')
        }
        return updBid
    }

    @Mutation(() => Boolean)
    async deleteMyBid(@GetCurrentUserId() userId: number, @Args('bidId', { type: () => Int }) bidId: number) {
        const bid = await this.bidsService.getBidById(bidId)
        if (bid.userId !== userId) {
            throw new Error('Cannot delete not your bid')
        }

        // TODO - check is this bit is the last !
        // get last Bid by Auction Id
        /*
        if() {
            throw new Error('Cannot delete record because it has been bitten')
        }
        */
        // TODO - return tokens to user

        if (!bid) {
            throw new Error('Cannot find bid that is being deleted')
        }
        return await this.bidsService.deleteMyBid(userId, bidId)
    }
}
