import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { Public } from '../auth/decorators'
import { AuctionsService } from './auctions.service'
import { AuctionInput } from './dto/auction.input'
import { Auction } from './dto/auction.response'

@Resolver()
export class AuctionsResolver {
    constructor(private readonly auctionsService: AuctionsService) {}

    @Public()
    @Query(() => [Auction])
    async getAllAuctions(
        @Args('sortBy', { nullable: true }) sortBy: string,
        @Args('sortOrder', { nullable: true, defaultValue: 'asc' }) sortOrder: 'asc' | 'desc',
        @Args('skip', { nullable: true, type: () => Int, defaultValue: 0 }) skip: number,
        @Args('take', { nullable: true, type: () => Int, defaultValue: 10 }) take: number,
        @Args('where', { nullable: true, defaultValue: {} }) auctionInput: AuctionInput,
    ) {
        const orderBy = {
            [sortBy || 'creationTime']: sortOrder,
        }
        const auctions = await this.auctionsService.auctions(skip, take, auctionInput, orderBy)
        return auctions
    }

    @Public()
    @Query(() => Auction)
    async getAuction(@Args('id', { type: () => Int }) id: number) {
        const auction = await this.auctionsService.getAuctionById(id)

        if (!auction) {
            throw new Error('Auction not found')
        }

        return auction
    }
}
