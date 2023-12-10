import { ConfigService } from '@nestjs/config'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetCurrentUserId } from '../../auth/decorators'
import { AuctionService } from './auction.service'
import { AuctionInput } from './dto/auction.input'
import { CreateAuctionInput } from './dto/create-auction.input'
import { UpdateAuctionInput } from './dto/update-auction.input'
import { Auction } from './entities/auction.entity'

@Resolver(() => Auction)
export class AuctionResolver {
    constructor(private readonly auctionsService: AuctionService, private readonly configService: ConfigService) {}

    @Query(() => [Auction])
    async getAuctions(
        @Args('sortBy', { nullable: true }) sortBy: string,
        @Args('sortOrder', { nullable: true, defaultValue: 'asc' }) sortOrder: 'asc' | 'desc',
        @Args('skip', { nullable: true, type: () => Int, defaultValue: 0 }) skip: number,
        @Args('take', { nullable: true, type: () => Int, defaultValue: 10 }) take: number,
        @Args('where', { nullable: true, defaultValue: {} }) auctionInput: AuctionInput,
    ) {
        const orderBy = {
            [sortBy || 'createdAt']: sortOrder,
        }
        const auctions = await this.auctionsService.getAuctions(skip, take, auctionInput, orderBy)
        return auctions
    }

    @Query(() => Auction)
    async getAuction(@Args('auctionId', { type: () => Int }) auctionId: number) {
        const auction = await this.auctionsService.getAuctionById(auctionId)

        if (!auction) {
            throw new Error('Auction not found')
        }

        return auction
    }

    @Query(() => [Auction])
    async getMyCreatedAuctions(
        @GetCurrentUserId() userId: number,
        input: AuctionInput,
        @Args('sortBy', { nullable: true }) sortBy: string,
        @Args('sortOrder', { nullable: true, defaultValue: 'asc' }) sortOrder: 'asc' | 'desc',
        @Args('skip', { nullable: true, type: () => Int, defaultValue: 0 }) skip: number,
        @Args('take', { nullable: true, type: () => Int, defaultValue: 10 }) take: number,
    ) {
        const orderBy = {
            [sortBy || 'createdAt']: sortOrder,
        }
        const auctionInput = {
            ...input,
            createdUserId: userId,
        }
        const auction = await this.auctionsService.getAuctions(skip, take, auctionInput, orderBy)

        if (!auction) {
            throw new Error('Auction not found')
        }

        return auction
    }

    @Query(() => [Auction])
    async getMyWonAuctions(
        @GetCurrentUserId() userId: number,
        input: AuctionInput,
        @Args('sortBy', { nullable: true }) sortBy: string,
        @Args('sortOrder', { nullable: true, defaultValue: 'asc' }) sortOrder: 'asc' | 'desc',
        @Args('skip', { nullable: true, type: () => Int, defaultValue: 0 }) skip: number,
        @Args('take', { nullable: true, type: () => Int, defaultValue: 10 }) take: number,
    ) {
        const orderBy = {
            [sortBy || 'createdAt']: sortOrder,
        }
        const auctionInput = {
            ...input,
            wonUserId: userId,
        }
        const auctions = await this.auctionsService.getAuctions(skip, take, auctionInput, orderBy)

        if (!auctions) {
            throw new Error('Auctions not found')
        }

        return auctions
    }

    @Mutation(() => Auction)
    async createMyAuction(@GetCurrentUserId() userId: number, @Args('input') input: CreateAuctionInput) {
        const statusId = this.configService.get('DEFAULT_AUCTION_STATUS_ID')
        const auctionInput = {
            ...input,
            creator: { connect: { id: userId } },
            status: { connect: { id: statusId } },
        }
        const auction = await this.auctionsService.createAuction(auctionInput)
        if (!auction) {
            throw new Error('Cannot create auction')
        }

        return auction
    }

    @Mutation(() => Auction)
    async updateMyAuction(
        @GetCurrentUserId() userId: number,
        @Args('auctionId', { type: () => Int }) auctionId: number,
        @Args('input') input: UpdateAuctionInput,
    ) {
        const auction = await this.auctionsService.updateAuction(userId, auctionId, input)
        if (!auction) {
            throw new Error('Cannot update auction')
        }
        return auction
    }

    @Mutation(() => Boolean)
    async deleteMyAuction(
        @GetCurrentUserId() userId: number,
        @Args('auctionId', { type: () => Int }) auctionId: number,
    ): Promise<boolean> {
        return this.auctionsService.deleteAuction(userId, auctionId)
    }

    @Mutation(() => Auction)
    async changeTheAuctionStatus(@Args('auctionId') auctionId: number, @Args('status') statusId: number) {
        return this.auctionsService.changeTheAuctionStatus(auctionId, statusId)
    }
}
