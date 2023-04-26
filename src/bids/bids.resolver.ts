import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Public } from '../auth/decorators'
import { BidsService } from './bids.service'
import { BidCreateInput, BidInput, BidUpdateInput } from './dto/bid.input'
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
            [sortBy || 'createdAt']: sortOrder,
        }
        const where = bidInput ? bidInput : {}
        const bids = await this.bidsService.bids(skip, take, where, orderBy)
        return bids
    }

    @Public()
    @Query(() => Bid)
    async getBidById(@Args('id', { type: () => Int }) id: number) {
        const bid = await this.bidsService.getBidById(id)

        if (!bid) {
            throw new Error('Bid not found')
        }

        return bid
    }

    @Public()
    @Mutation(() => Bid)
    async createBid(@Args('data') data: BidCreateInput) {
        const bid = await this.bidsService.createBid(data)
        if (!bid) {
            throw new Error('Cannot create bid')
        }

        return bid
    }

    @Public()
    @Mutation(() => Bid)
    async updateBid(@Args('id', { type: () => Int }) id: number, @Args('data') data: BidUpdateInput) {
        const bid = await this.bidsService.getBidById(id)
        if (!bid) {
            throw new Error('Cannot find bid that is being updated')
        }
        const updBid = await this.bidsService.updateBid(id, data)
        if (!updBid) {
            throw new Error('Cannot update bid')
        }
        return updBid
    }

    @Public()
    @Mutation(() => Bid)
    async deleteBid(@Args('id', { type: () => Int }) id: number) {
        const bid = await this.bidsService.getBidById(id)
        if (!bid) {
            throw new Error('Cannot find bid that is being deleted')
        }
        return await this.bidsService.deleteBid(id)
    }
}
