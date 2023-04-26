import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Public } from '../auth/decorators'
import { AuctionsService } from './auctions.service'
import { AuctionCreateInput, AuctionInput } from './dto/auction.input'
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
            [sortBy || 'createdAt']: sortOrder,
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

    @Public()
    @Mutation(() => Auction)
    async createAuction(@Args('data') data: AuctionCreateInput) {
        const auction = await this.auctionsService.createAuction(data)
        if (!auction) {
            throw new Error('Cannot create auction')
        }

        return auction
    }

    @Public()
    @Mutation(() => Auction)
    async updateAuction(@Args('id', { type: () => Int }) id: number, @Args('data') data: AuctionInput) {
        const auction = await this.auctionsService.getAuctionById(id)
        if (!auction) {
            throw new Error('Cannot find auction that is being updated')
        }
        const updAuction = await this.auctionsService.updateAuction(id, data)
        if (!updAuction) {
            throw new Error('Cannot update auction')
        }
        return updAuction
    }

    @Public()
    @Mutation(() => Auction)
    async deleteAuction(@Args('id', { type: () => Int }) id: number) {
        const auction = await this.auctionsService.getAuctionById(id)
        if (!auction) {
            throw new Error('Cannot find auction that is being deleted')
        }
        return this.auctionsService.deleteAuction(id)
    }
}
